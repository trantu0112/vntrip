import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { getOrderByTransactionId } from '../../api/order-services'
import { getBankAccount } from '../../api/common-services'
import { setLoading } from '../../store/common/action'
import { setOpenCheckoutHotelInfo } from '../../store/checkout/action'
import { copyToClipboard, showMessage } from '../../utils/common'
import { IconClose, IconCopyClipboard, IconOrangeChecked } from '../../constants/icons'
import { PATH_PAY_WAITING_CONFIRM } from '../../constants/common'
import DisplayPrice from '../../components/common/DisplayPrice'
import { setListPassenger } from '../../store/flight/action'

const LayoutCheckout = dynamic(() => import('../../components/layout/LayoutCheckout'))
const HeaderCheckout = dynamic(() => import('../../components/checkout-common/HeaderCheckout'))
const HotelInfo = dynamic(() => import('../../components/checkout-hotel/HotelInfo'))
const FlightInfo = dynamic(() => import('../../components/checkout-flight/FlightInfo'))

const PayBankTransfer = () => {
    const dispatch = useDispatch()
    const { t } = useTranslation(['payment'])
    const router = useRouter()
    const { isOpenInfo, listPassenger } = useSelector((state: any) => {
        return {
            isOpenInfo: state.checkout.isOpenCheckoutHotelInfo,
            listPassenger: state.flight.listPassenger || [],
        }
    })
    const [transactionId, setTransactionId] = useState<string>('')
    const [listBank, setListBank] = useState<any[]>([])
    const [selectedBank, setSelectedBank] = useState<any>(null)
    const [orderData, setOrderData] = useState<any>(null)
    const [orderTranData, setOrderTranData] = useState<any>(null)
    const [orderType, setOrderType] = useState<'hotel' | 'flight'>('hotel')
    const [priceRound, setPriceRound] = useState<any>({})
    const [checkoutData, setCheckoutData] = useState<any>(null)
    const [tranferPrice, setTranferPrice] = useState<number>(0)
    const [totalPrice, setTotalPrice] = useState<number>(0)
    const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false)
    const [departData, setDepartData] = useState<any>(null)
    const [returnData, setReturnData] = useState<any>(null)

    useEffect(() => {
        async function fetchData() {
            dispatch(setLoading(true))
            const transaction_id = router.query.transaction_id
            const [res_banks, res_order] = await Promise.all([
                getBankAccount(),
                getOrderByTransactionId(String(transaction_id)),
            ])
            console.log(res_order)
            dispatch(setLoading(false))
            setTransactionId(String(transaction_id))
            if (res_banks.status === 'success') {
                setSelectedBank(Array.isArray(res_banks.data) && res_banks.data.length > 0 ? res_banks.data[0] : null)
                setListBank(res_banks.data)
            }
            if (res_order.status === 'success') {
                if (res_order.data.order_appliedcoupon_data && Array.isArray(res_order.data.order_appliedcoupon_data)) {
                    res_order.data.order_appliedcoupon_data.forEach((coupon: any) => {
                        coupon.coupon_policy = JSON.parse(coupon.coupon_policy)
                    })
                }
                setOrderData(res_order.data)
                const {
                    order_item_hotel_data,
                    order_transaction_data,
                    order_item_flight_data,
                    order_type,
                    // final_price,
                } = res_order.data
                setOrderType(order_type)
                const tranData = order_transaction_data.find((item: any) => item.transaction_id === transaction_id)
                if (tranData.status === 'tran_error') {
                    if (res_order.data.order_status === 'order_pending_payment') {
                        await router.push({
                            pathname: `/thanh-toan${
                                res_order.data.order_type === 'hotel' ? '/khach-san' : '/ve-may-bay'
                            }/step2/${
                                res_order.data.order_type === 'hotel'
                                    ? res_order.data.booking_request_id
                                    : res_order.data.booking_request_id + '/' + res_order.data.suggestion_id[0]
                            }`,
                        })
                        return
                    }
                    if (res_order.data.order_status === 'order_success') {
                        await router.push({ pathname: '', query: '' })
                        return
                    }
                }
                if (tranData.status === 'tran_success') {
                    await router.push({ pathname: '', query: '' })
                }
                const priceTranfer = Number(tranData.gw_transaction_id)
                const price = Number(tranData.price)
                setTotalPrice(price)
                setTranferPrice(priceTranfer)
                setOrderTranData(tranData)
                setPriceRound({
                    thousandUp: Math.ceil(res_order.data?.final_price + (priceTranfer - price) / 1000) * 1000,
                    thousandDo: Math.floor(res_order.data?.final_price + (priceTranfer - price) / 1000) * 1000,
                    hundredUp: Math.ceil(res_order.data?.final_price + (priceTranfer - price) / 100) * 1000,
                    hundredDo: Math.floor(res_order.data?.final_price + (priceTranfer - price) / 100) * 1000,
                })
                if (order_type === 'hotel') {
                    // hotel
                    // setTotalPriceHotel(final_price)
                    if (order_item_hotel_data.length > 0) {
                        const orderItem = order_item_hotel_data[0]
                        const { hotel_extra_data, hotel_images, extra_rate_data } = orderItem
                        const image = hotel_images.find((item: any) => item.is_delete === false)
                        setCheckoutData({
                            hotel: {
                                hotelId: orderItem.hotel_id,
                                hotelName: hotel_extra_data.hotel_name,
                                hotelNameVi: hotel_extra_data.hotel_name,
                                thumbImage: image.slug,
                                starRate: hotel_extra_data.hotel_star_rate,
                                fullAddress: hotel_extra_data.hotel_address,
                                latitude: hotel_extra_data.latitude,
                                longitude: hotel_extra_data.longitude,
                            },
                            roomName: extra_rate_data.room_name,
                            roomCount: orderItem.rooms,
                            checkInDate: orderItem.check_in_date,
                            checkOutDate: orderItem.check_out_date,
                            nights: orderItem.nights,
                            showPrices: orderItem.reservation_data.show_prices,
                            orderItem: order_item_hotel_data,
                        })
                    }
                } else {
                    // flight
                    dispatch(
                        setListPassenger(
                            Array.isArray(order_item_flight_data) && order_item_flight_data.length > 0
                                ? order_item_flight_data[0].passengers
                                : []
                        )
                    )
                    const _depart = order_item_flight_data?.find((item: any) => item.calculated_price.leg === 0)
                    const _return = order_item_flight_data?.find((item: any) => item.calculated_price.leg === 1)
                    if (!_depart && _return) {
                        // case đặc biệt: đặt 2 chiều, chỉ giữ chỗ thành công chiều về -> setDepartData = returnData
                        setDepartData(_return.price_info.rate)
                        setReturnData(null)
                    } else {
                        setDepartData(_depart?.price_info.rate)
                        setReturnData(_return?.price_info.rate)
                    }
                }
            }
        }

        fetchData()
    }, [dispatch, router.pathname, router.query])

    const handleSelectBank = (bank: any) => () => {
        setSelectedBank(bank)
    }

    const handleClickCopy = (text: string) => {
        copyToClipboard(text)
        showMessage('success', 'Copied to clipboard')
    }

    const closeInfo = () => {
        dispatch(setOpenCheckoutHotelInfo(false))
    }

    const handleSubmit = () => {
        setLoadingSubmit(true)
        setTimeout(() => {
            setLoadingSubmit(false)
            router.push(PATH_PAY_WAITING_CONFIRM + '?transaction_id=' + transactionId)
        }, 500)
    }

    return (
        <LayoutCheckout>
            <section className="checkoutLayout">
                <HeaderCheckout step={3} type={orderType} />

                <div className="checkoutLayout__body">
                    <div className="container">
                        <div className="checkoutLayout__main">
                            <div className="checkoutLayout__left">
                                <div className="checkoutTransfer">
                                    <h2 className="mb15">{t('HƯỚNG DẪN CHUYỂN KHOẢN')}</h2>
                                    <div className="checkoutTransfer__banks">
                                        <div className="checkoutLayout__title">
                                            <span>{t('Danh sách ngân hàng')}</span>
                                        </div>
                                        <ul className="listBank">
                                            {listBank.map((bank) => {
                                                return (
                                                    <li
                                                        className={`listBank__item ${
                                                            selectedBank && selectedBank.id === bank.id ? 'active' : ''
                                                        }`}
                                                        key={bank.id}
                                                    >
                                                        <button
                                                            type="button"
                                                            className="listBank__btn"
                                                            onClick={handleSelectBank(bank)}
                                                        >
                                                            <img src={bank.bank_icon} alt={bank.bank_short_name} />
                                                            <p>{bank.bank_short_name}</p>
                                                            <IconOrangeChecked />
                                                        </button>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                    <div className="checkoutTransfer__info">
                                        <div className="checkoutLayout__title">
                                            <span>{t('Vui lòng chuyển khoản theo thông tin')}</span>
                                        </div>
                                        <div className="bankInfo">
                                            {selectedBank && (
                                                <ul className="bankInfo__list">
                                                    <li>
                                                        <p className="p1">{t('Ngân hàng')}:</p>
                                                        <p className="p2">{selectedBank.bank_display_name}</p>
                                                    </li>
                                                    <li>
                                                        <p className="p1">{t('Số tài khoản')}:</p>
                                                        <p className="p2">
                                                            {selectedBank.account_number}
                                                            &nbsp;
                                                            <button
                                                                onClick={() => {
                                                                    handleClickCopy(selectedBank.account_number)
                                                                }}
                                                                className="btnCopy"
                                                            >
                                                                <IconCopyClipboard />
                                                            </button>
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <p className="p1">{t('Chi nhánh')}:</p>
                                                        <p className="p2">{selectedBank.branch_name}</p>
                                                    </li>
                                                    <li>
                                                        <p className="p1">{t('Chủ tài khoản')}:</p>
                                                        <p className="p2">{selectedBank.owner_name}</p>
                                                    </li>
                                                    <li>
                                                        <p className="p1">{t('Nội dung chuyển khoản')}:</p>
                                                        {orderData && (
                                                            <p className="p2">
                                                                {orderData.order_code}
                                                                &nbsp;
                                                                <button
                                                                    onClick={() => {
                                                                        handleClickCopy(orderData.order_code)
                                                                    }}
                                                                    className="btnCopy"
                                                                >
                                                                    <IconCopyClipboard />
                                                                </button>
                                                            </p>
                                                        )}
                                                    </li>
                                                </ul>
                                            )}

                                            <div className="bankInfo__price">
                                                <div className="d-block">
                                                    <div className="p1 mb0">
                                                        {t('Số tiền bạn cần phải chuyển khoản')}
                                                    </div>
                                                </div>
                                                <div className="d-block">
                                                    <div className="d-inline-block">
                                                        <div className="tooltipNote">
                                                            <div className="tooltipNote__box">
                                                                {t(
                                                                    'Đơn hàng của bạn không được đảm bảo nếu số tiền bạn chuyển không chính xác'
                                                                )}
                                                            </div>
                                                            <div className="tooltipNote__line" />
                                                            <div className="tooltipNote__dots">
                                                                <div className="ringContainer">
                                                                    <div className="ringContainer__ringring" />
                                                                    <div className="ringContainer__circle" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <p className="yellow-1 bold size-24 mb0">
                                                            {orderTranData && (
                                                                <>
                                                                    <DisplayPrice
                                                                        price={
                                                                            orderData?.final_price +
                                                                            (tranferPrice - totalPrice)
                                                                        }
                                                                    />
                                                                    &nbsp;
                                                                    <button
                                                                        onClick={() => {
                                                                            handleClickCopy(
                                                                                orderTranData.gw_transaction_id
                                                                            )
                                                                        }}
                                                                        className="btnCopy pl5"
                                                                    >
                                                                        <IconCopyClipboard />
                                                                    </button>
                                                                </>
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bankInfo__note">
                                                <p className="red-1">
                                                    <strong className="pr5">{t('common:LƯU Ý')}!</strong>
                                                    {t('Chuyển chính xác số tiền')}&nbsp;
                                                    <DisplayPrice
                                                        price={orderData?.final_price + (tranferPrice - totalPrice)}
                                                    />{' '}
                                                    {t('trong mọi trường hợp')}
                                                </p>
                                                <p className="italic mb0 red-1">
                                                    (
                                                    {t(
                                                        'Vui lòng không cộng gộp nhiều ĐƠN HÀNG, KHÔNG làm tròn 3 số cuối'
                                                    )}
                                                    &nbsp;
                                                    <s>
                                                        <DisplayPrice price={priceRound?.thousandDo} />
                                                    </s>
                                                    ,&nbsp;
                                                    <s>
                                                        <DisplayPrice price={priceRound?.thousandUp} />
                                                    </s>
                                                    ,&nbsp;
                                                    <s>
                                                        <DisplayPrice price={priceRound?.hundredDo} />
                                                    </s>
                                                    ,&nbsp;
                                                    <s>
                                                        <DisplayPrice price={priceRound?.hundredUp} />
                                                    </s>
                                                    &nbsp;
                                                    {t('Vì đây là cách duy nhất để Vntrip đảm bảo đơn hàng của bạn')})
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="checkoutLayout__btn">
                                        <p className="gray-5 italic mb10">
                                            {t('Sau khi xác nhận dùng số tiền thanh toán')},&nbsp;
                                            {t('Vntrip.vn sẽ gửi biên nhận và vé điện tử tới email của quý khách')}.
                                        </p>
                                        <Button type="primary" onClick={handleSubmit} loading={loadingSubmit}>
                                            <span>{t('Tôi đã chuyển khoản xong')}</span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className={`checkoutLayout__right ${isOpenInfo ? 'open' : ''}`}>
                                {/* Header for mobile */}
                                <div className="headerPopup">
                                    <p>{t('Thông tin đơn phòng')}</p>
                                    <button type="button" className="headerPopup__close" onClick={closeInfo}>
                                        <IconClose />
                                    </button>
                                </div>
                                <div className="checkoutLayout__sidebar">
                                    {orderType === 'hotel' ? (
                                        <div className="bookingInfo">
                                            <HotelInfo
                                                hotel={checkoutData?.hotel}
                                                roomName={checkoutData?.roomName}
                                                roomCount={checkoutData?.roomCount}
                                                adultCount={checkoutData?.adultCount}
                                                checkInDate={checkoutData?.checkInDate}
                                                checkOutDate={checkoutData?.checkOutDate}
                                                nights={checkoutData?.nights}
                                                // orderItem={checkoutData?.orderItem}
                                                step={3}
                                            />
                                            {/*<PriceInfo*/}
                                            {/*    step={3}*/}
                                            {/*    showPrices={checkoutData?.rate?.show_prices}*/}
                                            {/*    basePrice={checkoutData?.rate?.pretty_prices?.base_price}*/}
                                            {/*    baseNetPrice={checkoutData?.rate?.pretty_prices?.base_net_price}*/}
                                            {/*    isLoggedInFromDetail={!!checkoutData?.userInfo}*/}
                                            {/*    listItem={checkoutData?.orderItem}*/}
                                            {/*    finalPrice={orderData?.final_price}*/}
                                            {/*/>*/}
                                            <div className="bookingInfo__price">
                                                <ul>
                                                    <li>
                                                        <p className="semibold mb0 size-18">{t('common:Giá tổng')}</p>
                                                        <p className="yellow-1 semibold mb0 text-right size-18">
                                                            <DisplayPrice price={orderData?.final_price} />
                                                        </p>
                                                        <ul>
                                                            <li
                                                                className={`${
                                                                    tranferPrice - totalPrice ? 'gray-5' : 'green-1'
                                                                }`}
                                                            >
                                                                <p className="mb0">{t('payment:Phí tiện ích')}</p>
                                                                <p className="semibold mb0 text-right">
                                                                    <DisplayPrice price={tranferPrice - totalPrice} />
                                                                </p>
                                                            </li>
                                                            {/*{orderData?.order_appliedcoupon_data &&*/}
                                                            {/*    orderData?.order_appliedcoupon_data.length && (*/}
                                                            {/*        <li className="green-1">*/}
                                                            {/*            <p className="mb0">*/}
                                                            {/*                {t('payment:Mã giảm giá') +*/}
                                                            {/*                    ' (' +*/}
                                                            {/*                    orderData?.order_appliedcoupon_data?.[0]*/}
                                                            {/*                        ?.coupon_policy?.coupon_code +*/}
                                                            {/*                    ')'}*/}
                                                            {/*            </p>*/}
                                                            {/*            <p className="semibold mb0 text-right">*/}
                                                            {/*                -*/}
                                                            {/*                <DisplayPrice*/}
                                                            {/*                    price={*/}
                                                            {/*                        orderData*/}
                                                            {/*                            ?.order_appliedcoupon_data?.[0]*/}
                                                            {/*                            ?.coupon_price*/}
                                                            {/*                    }*/}
                                                            {/*                />*/}
                                                            {/*            </p>*/}
                                                            {/*        </li>*/}
                                                            {/*    )}*/}
                                                        </ul>
                                                    </li>
                                                </ul>
                                                <div className="bookingInfo__total">
                                                    <div className="flexGroup">
                                                        <p className="size-20 semibold mb0">
                                                            {t('payment:Chuyển khoản')}:
                                                        </p>
                                                        <p className="yellow-1 semibold size-20 mb0 text-right">
                                                            <DisplayPrice
                                                                price={
                                                                    orderData?.final_price +
                                                                    (tranferPrice - orderData?.final_price)
                                                                }
                                                            />
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <FlightInfo
                                            totalPassenger={listPassenger.length}
                                            departData={departData}
                                            returnData={returnData}
                                            tranferPrice={tranferPrice}
                                            totalPrice={totalPrice}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </LayoutCheckout>
    )
}

export default PayBankTransfer
