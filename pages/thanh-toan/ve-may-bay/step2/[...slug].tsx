import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'antd'
import { IconClose } from '../../../../constants/icons'
import { getBookingRequestData, getReservationStatus } from '../../../../api/flight-services'
import { setCouponInfo, setOpenCheckoutHotelInfo, setPaymemtMethodSelected } from '../../../../store/checkout/action'
import { setListPassenger } from '../../../../store/flight/action'
import { showMessage } from '../../../../utils/common'
import { setLoading } from '../../../../store/common/action'
import { addOrder } from '../../../../api/order-services'
import { handleResultAddOrder } from '../../../../utils/checkout'
import { PATH_TRANSACTION_CONFIRM_FLIGHT } from '../../../../constants/common'
import { PAYMENT_METHODS } from '../../../../constants/enums'
import { getFinalPrice, getPhoneNotMember, removePhoneNotMember } from '../../../../utils/user'
import VerifyPhone from '../../../../components/user/verifyPhone'
import { useUserInfo } from '../../../../utils/custom-hook'
import { USER_IDENTIFIER } from '../../../../constants/userIdentifier'
import { updateBookerData } from '../../../../api/partner-service'
import { getIdentifiers } from '../../../../api/user-services'
import Cookies from 'js-cookie'
import CouponBox from '../../../../components/checkout-common/CouponBox'

const LayoutCheckout = dynamic(() => import('../../../../components/layout/LayoutCheckout'))
const HeaderCheckout = dynamic(() => import('../../../../components/checkout-common/HeaderCheckout'))
// @ts-ignore
const ListPaymentMethod = dynamic(() => import('../../../../components/checkout-common/ListPaymentMethod'))
const FlightInfo = dynamic(() => import('../../../../components/checkout-flight/FlightInfo'))
const ShowPassenger = dynamic(() => import('../../../../components/checkout-flight/ShowPassenger'))
const FlightLoading = dynamic(() => import('../../../../components/checkout-flight/FlightLoading'))
const ReservationInfo = dynamic(() => import('../../../../components/checkout-flight/ReservationInfo'))

const FlightCheckoutStep2 = () => {
    const router = useRouter()
    const userInfo = useUserInfo()
    const dispatch = useDispatch()
    const { t } = useTranslation(['common', 'flight'])
    const { listPassenger, paymentSelected, isOpenInfo, refreshTime } = useSelector((state: any) => {
        return {
            isOpenInfo: state.checkout.isOpenCheckoutHotelInfo,
            listPassenger: state.flight.listPassenger || [],
            paymentSelected: state.checkout.paymentMethodSelected,
            refreshTime: state.common.refreshTime,
        }
    })
    const [bookingRequestId, setBookingRequestId] = useState<string>('')
    const [bookingSuggestionId, setBookingSuggestionId] = useState<string>('')
    const [data, setData] = useState<any>(null)
    const [orderCode, setOrderCode] = useState<string>('')
    const [departData, setDepartData] = useState<any>(null)
    const [returnData, setReturnData] = useState<any>(null)
    const [reservationData, setReservationData] = useState<any>(null)
    const [isProcessing, setIsProcessing] = useState<boolean>(true)
    const [coupon, setCoupon] = useState<string>('')
    const [userId, setUserId] = useState<number>(0)
    const [showVerifyPhone, setShowVerifyPhone] = useState<boolean>(false)
    const [presetPhone, setPresetPhone] = useState<string>('')
    const accessToken = Cookies.get('accessToken')

    useEffect(() => {
        removePhoneNotMember()
        if (Array.isArray(router.query.slug)) {
            const [brId, bsId] = router.query.slug
            setBookingRequestId(String(brId))
            setBookingSuggestionId(String(bsId))
        }
    }, [router.query.slug])

    // set user id ( for loyalty )
    useEffect(() => {
        setUserId(data?.booker_data?.user_id || userInfo?.user_id || 0)
    }, [data?.booker_data?.user_id, userInfo?.user_id])

    // fetch data from booking request
    useEffect(() => {
        if (bookingRequestId && bookingSuggestionId) {
            fetchDataFlight(bookingRequestId, bookingSuggestionId)
        }
        async function fetchDataFlight(booking_request_id: string, booking_suggestion_id: string) {
            try {
                dispatch(setLoading(true))
                const response = await getBookingRequestData({
                    token_id: '',
                    booking_request_id,
                    booking_suggestion_id,
                })
                dispatch(setLoading(false))
                if (response.status === 'success') {
                    setData(response.data)
                    const { flight, payment_method, order_code, coupon_info } = response.data
                    // setData(response.data)
                    setOrderCode(order_code)
                    // set coupon
                    setCoupon(coupon_info?.coupon_code)
                    dispatch(setCouponInfo(coupon_info))
                    // set payment method
                    dispatch(setPaymemtMethodSelected(payment_method))
                    const _depart = flight.find((item: any) => item.leg === 0)
                    const _return = flight.find((item: any) => item.leg === 1)
                    setDepartData(_depart ? { ..._depart.rate, id: _depart.id } : null)
                    setReturnData(_return ? { ..._return.rate, id: _return.id } : null)
                    if (_depart) {
                        // set lại list passengers từ booking request
                        dispatch(setListPassenger(_depart.passengers))
                    }
                }
            } catch (error) {
                throw error
            }
        }
    }, [bookingRequestId, bookingSuggestionId, paymentSelected, refreshTime])

    // get reservation status
    useEffect(() => {
        let interval: any
        if (bookingRequestId && bookingSuggestionId) {
            interval = setInterval(function () {
                getReservationStatus({
                    bookingRequestId: bookingRequestId,
                    suggestionId: bookingSuggestionId,
                })
                    .then((res) => res.data)
                    .then((data) => {
                        data.sort((item1: any, item2: any) => item1['leg'] - item2['leg'])
                        setReservationData(data)
                        if (data && data.length > 0) {
                            if (data.every((item: any) => item['packageStatus'] !== 'PROCESSING')) {
                                clearInterval(interval)
                                setIsProcessing(false)
                            }
                        } else {
                            clearInterval(interval)
                            setIsProcessing(false)
                        }
                    })
                    .catch(() => {
                        clearInterval(interval)
                        setIsProcessing(false)
                    })
            }, 3000)
        }

        return () => clearInterval(interval)
    }, [bookingRequestId, bookingSuggestionId])

    // click Continue
    const handleAddOrder = async () => {
        const finalPrice = JSON.parse(getFinalPrice())
        if (!paymentSelected) {
            showMessage('error', t('notification:Vui lòng chọn hình thức thanh toán'))
            return
        }
        if (paymentSelected === PAYMENT_METHODS.PAYMENT_METHOD_PAY_LATER_LFVN) {
            const phoneIdentifier = await getPhoneIdentifier()
            if (!phoneIdentifier) {
                if (!getPhoneNotMember()) {
                    setShowVerifyPhone(true)
                    return
                }
            } else if (phoneIdentifier.status !== USER_IDENTIFIER.STATUS.VERIFIED) {
                setShowVerifyPhone(true)
                setPresetPhone(phoneIdentifier.identifier_value)
                return
            }

            if (!accessToken) {
                if (!getPhoneNotMember()) {
                    setShowVerifyPhone(true)
                    return
                }
                await updateBookerData({ bookingRequest: bookingRequestId, phone: getPhoneNotMember() })
            }
        }
        let data = {
            redirect_url: process.env.NEXT_PUBLIC_ROOT_DOMAIN + PATH_TRANSACTION_CONFIRM_FLIGHT,
            update_order: !!orderCode,
        }
        try {
            dispatch(setLoading(true))
            const res = await addOrder(bookingRequestId, data)
            dispatch(setLoading(false))
            if (res.status === 'success') {
                setOrderCode(res.data.order_data.order_code) // set order code
                handleResultAddOrder(res.data)
            } else {
                showMessage('error', res.message + `${res.error_code ? ` (${res.error_code})` : ''}`)
            }
        } catch (err) {
            showMessage('error', err.message + `${err.error_code ? ` (${err.error_code})` : ''}`)
            throw err
        }
    }

    const closeInfo = () => {
        dispatch(setOpenCheckoutHotelInfo(false))
    }

    const getPhoneIdentifier = async () => {
        if (accessToken) {
            const res = await getIdentifiers()
            if (res.status === 'success') {
                const data = res.data
                return data.find((item: any) => item.identifier_source === USER_IDENTIFIER.SOURCE.PHONE)
            }
        } else {
            return null
        }
    }

    return (
        <>
            <LayoutCheckout>
                <section className="checkoutLayout">
                    <HeaderCheckout step={2} type={'flight'} />

                    <div className="checkoutLayout__body">
                        <div className="container">
                            <div className="checkoutLayout__main">
                                <div className="checkoutLayout__left">
                                    <div className="checkoutPayment">
                                        <h2 className="mb15">{t('THÔNG TIN THANH TOÁN')}</h2>
                                        <div className="checkoutPayment__body">
                                            <ListPaymentMethod
                                                bookingRequestId={bookingRequestId}
                                                totalPrice={
                                                    data?.total_price -
                                                    (data?.coupon_info?.status?.toLowerCase() === 'success'
                                                        ? data?.coupon_info?.final_discount_value
                                                        : 0)
                                                }
                                                orderType={'flight'}
                                            />
                                        </div>
                                        <div className="checkoutLayout__btn">
                                            <p className="gray-5 italic mb10">
                                                {t('common:Bằng việc chọn thanh toán')},&nbsp;
                                                {t('common:tôi xác nhận đã đọc và đồng ý với')}&nbsp;
                                                <a href="https://www.vntrip.vn/dieu-khoan-su-dung" target="_blank">
                                                    {t('common:Điều khoản và Điều kiện')}
                                                </a>
                                                &nbsp;{t('common:của Vntrip.vn')}
                                            </p>
                                            <Button type="primary" className="btn_orange" onClick={handleAddOrder}>
                                                <span>{t('common:Tiếp tục')}</span>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                <div className={`checkoutLayout__right ${isOpenInfo ? 'open' : ''}`}>
                                    <div className="headerPopup">
                                        <p>
                                            {t('Vé của bạn')} ({listPassenger.length}{' '}
                                            {t(listPassenger.length > 1 ? 'hành kháchs' : 'hành khách')}))
                                        </p>
                                        <button onClick={closeInfo} type="button" className="headerPopup__close">
                                            <IconClose />
                                        </button>
                                    </div>
                                    <div className="checkoutLayout__sidebar">
                                        <FlightInfo
                                            totalPassenger={listPassenger.length}
                                            departData={departData}
                                            returnData={returnData}
                                            data={data}
                                            coupon={coupon}
                                        />
                                        <CouponBox
                                            bookingRequestId={bookingRequestId}
                                            coupon={coupon}
                                            setCoupon={setCoupon}
                                            data={data}
                                        />
                                        <ShowPassenger />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {isProcessing ? (
                        <FlightLoading />
                    ) : (
                        <ReservationInfo
                            departData={departData}
                            returnData={returnData}
                            reservationData={reservationData}
                        />
                    )}
                </section>
            </LayoutCheckout>
            {showVerifyPhone ? (
                <VerifyPhone
                    bookerDataRoot={data?.booker_data}
                    presetPhone={presetPhone}
                    onClose={() => {
                        setShowVerifyPhone(false)
                    }}
                />
            ) : null}
        </>
    )
}

export default FlightCheckoutStep2
