import React, { useEffect, useState, memo } from 'react'
import dynamic from 'next/dynamic'
import moment from 'moment'
import { isMobile } from 'react-device-detect'
import { Button, Checkbox } from 'antd'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import {
    setBookerData,
    setCustomerNote,
    setOpenCheckoutHotelInfo,
    setReceiverData,
} from '../../../../store/checkout/action'
import { setLoading } from '../../../../store/common/action'
import { getReceiverData, isRoomReceiverValid, isBookerDataValid } from '../../../../utils/checkout'
import { getCookie, showMessage } from '../../../../utils/common'
import { PATH_HOTEL_CHECKOUT_STEP2, PATH_PAY_REQUEST, YYYYMMDD } from '../../../../constants/common'
import { getBookerAndReceiver, saveBookerAndReceiver } from '../../../../utils/user'
import { Booker, HotelCheckout } from '../../../../constants/interface'
import { getDataCheckout, collectInfo } from '../../../../api/hotel-services'
import { IconClose } from '../../../../constants/icons'
import { useMounted, useUserInfo } from '../../../../utils/custom-hook'
import ExtraCharge from '../../../../components/checkout-hotel/ExtraCharge'

const LayoutCheckout = dynamic(() => import('../../../../components/layout/LayoutCheckout'))
const HeaderCheckout = dynamic(() => import('../../../../components/checkout-common/HeaderCheckout'))
const TokenExpired = dynamic(() => import('../../../../components/checkout-common/TokenExpired'))
const BookerInfo = dynamic(() => import('../../../../components/checkout-common/BookerInfo'))
const ReceiverInfo = dynamic(() => import('../../../../components/checkout-hotel/ReceiverInfo'))
const HotelInfo = dynamic(() => import('../../../../components/checkout-hotel/HotelInfo'))
const PriceInfo = dynamic(() => import('../../../../components/checkout-hotel/PriceInfo'))
const OtherInfo = dynamic(() => import('../../../../components/checkout-hotel/OtherInfo'))
const PopupChangeRoom = dynamic(() => import('../../../../components/checkout-hotel/PopupChangeRoom'))

const HOTEL_DETAUL = {
    hotelId: 0,
    hotelName: '',
    hotelNameVi: '',
    thumbImage: '',
    starRate: 0,
    reviewCount: 0,
    reviewPoint: 0,
    fullAddress: '',
    latitude: 0,
    longitude: 0,
    isDomestic: true,
}

const HotelCheckoutStep1 = memo(() => {
    const dispatch = useDispatch()
    const router = useRouter()
    const isMounted = useMounted()
    const userInfo = useUserInfo()
    const { t } = useTranslation(['payment', 'common', 'notification'])
    const { isOpenInfo, customerNote, bookerData, receiverData, validateBooker } = useSelector((state: any) => {
        return {
            isOpenInfo: state.checkout.isOpenCheckoutHotelInfo,
            customerNote: state.checkout.customerNote || '',
            bookerData: state.checkout.bookerData,
            receiverData: state.checkout.receiverData,
            validateBooker: state.checkout.validateBooker || {
                gender: { status: 'success', text: '' },
                firstName: { status: 'success', text: '' },
                lastName: { status: 'success', text: '' },
                fullName: { status: 'success', text: '' },
                phone: { status: 'success', text: '' },
                email: { status: 'success', text: '' },
            },
        }
    })
    const [data, setData] = useState<any>(null)
    const [hotel, setHotel] = useState<HotelCheckout>(HOTEL_DETAUL)
    const [isExpired, setIsExpired] = useState<boolean>(false)
    const [bedTypeSelected, setBedTypeSelected] = useState<any>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isVat] = useState<boolean>(false)

    useEffect(() => {
        const token = router.query.token
        if (token) {
            fetchData(String(token))
        }
        async function fetchData(token: string) {
            try {
                dispatch(setLoading(true))
                const res = await getDataCheckout(token)
                dispatch(setLoading(false))
                if (res.status === 'success') {
                    const data = res.data
                    console.log('data', data)
                    if (data.hasOwnProperty('rate')) {
                        setData(res.data)
                        setBedTypeSelected(data.room.bedTypeSelected || data.room.reformat_bed_types[0])
                        dispatch(setCustomerNote(data.customer_request || ''))
                        setHotel({
                            hotelId: data.hotel.id,
                            hotelName: data.hotel.name,
                            hotelNameVi: data.hotel.name_vi,
                            thumbImage: data.hotel.thumb_image,
                            starRate: data.hotel.star_rate,
                            reviewCount: data.hotel.count_reviews,
                            reviewPoint: data.hotel.review_point,
                            fullAddress: data.hotel.full_address,
                            latitude: data.hotel.latitude,
                            longitude: data.hotel.longitude,
                            isDomestic: data.hotel.isDomestic,
                        })
                    } else {
                        setIsExpired(true)
                    }
                }
            } catch (e) {
                setIsExpired(true)
                dispatch(setLoading(false))
                throw e
            }
        }
    }, [router.query.token])

    // set booker data
    useEffect(() => {
        if (isMounted) {
            if (userInfo) {
                let first_name = userInfo.first_name
                let last_name = userInfo.last_name
                if (userInfo.last_name === '') {
                    const full_name = userInfo.first_name.trim().split(' ')
                    first_name = full_name[0]
                    last_name = full_name[1]
                }
                const booker: Booker = {
                    user_id: userInfo.user_id,
                    first_name: first_name,
                    last_name: last_name,
                    email: userInfo.email,
                    phone: userInfo.phone,
                    gender: userInfo.gender,
                    is_receiver: true,
                }
                dispatch(setBookerData(booker))
            } else {
                const historyBooker = getBookerAndReceiver()?.booker // get data from localStorage -> auto fill
                const booker: Booker = {
                    user_id: 0,
                    first_name: historyBooker?.first_name || '',
                    last_name: historyBooker?.last_name || '',
                    email: historyBooker?.email || '',
                    phone: historyBooker?.phone || '',
                    gender: historyBooker?.gender || 1,
                    is_receiver: true,
                }
                dispatch(setBookerData(booker))
            }
        }
    }, [userInfo, isMounted])

    // set receiver data
    useEffect(() => {
        if (isMounted && data?.roomCount > 0) {
            const historyReceiver = getBookerAndReceiver()?.receiver // get data from localStorage -> auto fill
            let receiver = []
            for (let i = 0; i < data?.roomCount; i++) {
                receiver.push({
                    first_name: historyReceiver?.[i]?.first_name || '',
                    last_name: historyReceiver?.[i]?.last_name || '',
                    phone: historyReceiver?.[i]?.phone || '',
                    country_code: '84',
                    name_status: 'success',
                    name_text: '',
                    phone_status: 'success',
                    phone_text: '',
                })
            }
            dispatch(setReceiverData(receiver))
        }
    }, [data?.roomCount, isMounted])

    const handleSelectBedType = (bedData: any) => {
        setBedTypeSelected(bedData)
    }

    // close info mobile
    const closeInfo = () => {
        dispatch(setOpenCheckoutHotelInfo(false))
    }

    // submit
    const handleContinueStep1 = async () => {
        console.log(bookerData)
        if (!isBookerDataValid(bookerData, validateBooker, dispatch, t)) {
            return
        }
        if (!bookerData.is_receiver && !isRoomReceiverValid(receiverData, dispatch, t)) {
            return
        }
        const receiver = getReceiverData(bookerData, receiverData, data.roomCount)
        const dataCollect: any = {
            booker_data: { ...bookerData, reference_url: 'vntrip.vn-nextjs' },
            customer_request: customerNote,
            coupon_code: '',
            request_from: isMobile ? 'WEBMOBILE' : 'WEBSITE',
            hotel: {
                token_id: data.rate.avail_token,
                receiver_data: receiver,
                bed_type_group_id: bedTypeSelected?.group_id,
            },
            // require_invoice: isVat,
        }
        if (getCookie('publisher')) {
            dataCollect.publisher_data = JSON.parse(getCookie('publisher'))
        }

        try {
            setIsLoading(true)
            const res = await collectInfo(dataCollect)
            if (res.status === 'success') {
                saveBookerAndReceiver({
                    booker: bookerData,
                    receiver: receiver,
                })
                if (data.rate.instant_book) {
                    const booking_request_id = res.data.booking_request_id
                    await router.push(
                        PATH_HOTEL_CHECKOUT_STEP2 + '/[booking_request_id]',
                        PATH_HOTEL_CHECKOUT_STEP2 + '/' + booking_request_id
                    )
                } else {
                    await router.push(PATH_PAY_REQUEST)
                }
            } else {
                showMessage('error', res.message)
            }
            setIsLoading(false)
        } catch (e) {
            setIsLoading(false)
            throw e
        }
    }
    return (
        <LayoutCheckout>
            <section className="checkoutLayout">
                <HeaderCheckout step={1} type={'hotel'} />

                <div className="checkoutLayout__body">
                    <div className="container">
                        {isExpired ? (
                            <TokenExpired type={'hotel'} />
                        ) : (
                            <div className="checkoutLayout__main">
                                <div className="checkoutLayout__left">
                                    {/*<SignInCheckout />*/}

                                    <div className="checkoutInfo">
                                        <h2 className="mb15">{t('Thông tin đặt phòng')}</h2>
                                        <div className="checkoutInfo__body">
                                            <div className="checkoutInfo__group">
                                                <div className="checkoutLayout__title">
                                                    <span>{t('Thông tin người đặt phòng')}</span>
                                                </div>
                                                <div className="checkoutInfo__form">
                                                    <BookerInfo />
                                                    <ReceiverInfo />
                                                </div>
                                            </div>

                                            <OtherInfo
                                                reformatBedTypes={data?.room.reformat_bed_types}
                                                bedTypeSelected={bedTypeSelected}
                                                handleSelectBedType={handleSelectBedType}
                                                data={data}
                                            />
                                            {/*{!data?.rate?.vat && (*/}
                                            {/*    <div className={'boxVat'}>*/}
                                            {/*        <Checkbox*/}
                                            {/*            className="mb15"*/}
                                            {/*            checked={isVat}*/}
                                            {/*            onChange={(event) => handlerSetVat(event.target.checked)}*/}
                                            {/*        >*/}
                                            {/*            {t('hotel:Tôi muốn xuất hóa đơn VAT')}*/}
                                            {/*        </Checkbox>*/}
                                            {/*        <p className={'size-12 italic'} style={{ opacity: '0.8' }}>*/}
                                            {/*            {t(*/}
                                            {/*                'hotel:Do nhà cung cấp không hỗ trợ xuất hóa đơn, bạn sẽ phải trả thêm phí xuất hóa đơn bằng 12% tổng giá trị đơn hàng.'*/}
                                            {/*            )}*/}
                                            {/*            <br />*/}
                                            {/*            {t(*/}
                                            {/*                'hotel:Bạn có thể bổ sung thông tin xuất hóa đơn sau khi đặt hàng thành công.'*/}
                                            {/*            )}*/}
                                            {/*        </p>*/}
                                            {/*    </div>*/}
                                            {/*)}*/}
                                        </div>
                                        <div className="checkoutLayout__btn">
                                            <Button
                                                type="primary"
                                                className="btn_orange"
                                                loading={isLoading}
                                                onClick={handleContinueStep1}
                                            >
                                                <span>{t('common:Tiếp tục')}</span>
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
                                        <div className="bookingInfo">
                                            <HotelInfo
                                                hotel={hotel}
                                                roomName={data?.room.name}
                                                roomCount={data?.roomCount}
                                                adultCount={data?.adultCount}
                                                checkInDate={data?.checkInDate}
                                                checkOutDate={data?.checkOutDate}
                                                nights={data?.nights}
                                                step={1}
                                            />

                                            {/* Show price */}
                                            <PriceInfo
                                                step={1}
                                                hotel={data}
                                                provider={data?.rate.provider}
                                                isVat={isVat}
                                                isVatInclude={data?.rate?.included_VAT}
                                                rate={data?.rate}
                                                finalPrice={data?.rate?.show_prices?.final_price?.incl_vat_fee_price}
                                                showPrices={data?.rate.show_prices}
                                                showPrettyPrice={data?.rate.pretty_prices}
                                            />
                                        </div>
                                        {data?.rate?.provider !== 'VNTRIP' &&
                                            data?.rate?.price_details?.extra_charges_breakdown?.extra_charge.filter(
                                                (item: any) => !item.excluded
                                            ).length > 0 && <ExtraCharge rate={data?.rate} />}
                                        <div className="couponBox">
                                            <p className="mb0">
                                                {t('payment:Giá còn rẻ hơn khi nhập mã giảm giá (nếu có) ở bước sau')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sửa thông tin phòng (đặt lại vs token khác) */}
                <PopupChangeRoom
                    hotel={hotel}
                    roomCountRoot={data?.roomCount}
                    adultCountRoot={data?.adultCount}
                    checkInDateRoot={moment(data?.checkInDate).format(YYYYMMDD)}
                    nightsRoot={data?.nights}
                />
            </section>
        </LayoutCheckout>
    )
})

export default HotelCheckoutStep1
