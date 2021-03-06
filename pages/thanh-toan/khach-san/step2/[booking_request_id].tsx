import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Input, Form, Button, Modal, Checkbox } from 'antd'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useUserInfo } from '../../../../utils/custom-hook'
import {
    setCouponInfo,
    setBookerData,
    setReceiverData,
    setBookerDataRoot,
    setReceiverDataRoot,
    setPaymemtMethodSelected,
    setOpenCheckoutHotelInfo,
} from '../../../../store/checkout/action'
import { setLoading, setRefreshTime } from '../../../../store/common/action'
import { showMessage } from '../../../../utils/common'
import { handleResultAddOrder } from '../../../../utils/checkout'
import { addOrder, applyCoupon, earnPointLoyalty } from '../../../../api/order-services'
import { getBookingRequest, setExportVAT } from '../../../../api/hotel-services'
import { IconClose, IconVerifiedVoucher } from '../../../../constants/icons'
import { ValidationForm } from '../../../../constants/interface'
import { PATH_PAY_REQUEST, PATH_TRANSACTION_CONFIRM, VNTRIP_INFO } from '../../../../constants/common'
import { getIdentifiers, sendVerificationVoucher } from '../../../../api/user-services'
import { Statistic } from 'antd'

const { Countdown } = Statistic
import moment from 'moment'
import { PAYMENT_METHODS } from '../../../../constants/enums'
import { USER_IDENTIFIER } from '../../../../constants/userIdentifier'
import VerifyPhone from '../../../../components/user/verifyPhone'
import { getFinalPrice, getPhoneNotMember, removePhoneNotMember } from '../../../../utils/user'
import { updateBookerData } from '../../../../api/partner-service'
import Cookies from 'js-cookie'

import CouponBox from '../../../../components/checkout-common/CouponBox'
const LayoutCheckout = dynamic(() => import('../../../../components/layout/LayoutCheckout'))
const HeaderCheckout = dynamic(() => import('../../../../components/checkout-common/HeaderCheckout'))
const ListPaymentMethod = dynamic(() => import('../../../../components/checkout-common/ListPaymentMethod'))
const BookForMe = dynamic(() => import('../../../../components/common/BookForMe'))
const HotelInfo = dynamic(() => import('../../../../components/checkout-hotel/HotelInfo'))
const PriceInfo = dynamic(() => import('../../../../components/checkout-hotel/PriceInfo'))
const ExtraCharge = dynamic(() => import('../../../../components/checkout-hotel/ExtraCharge'))
const LoyaltyEarnPoint = dynamic(() => import('../../../../components/checkout-hotel/LoyaltyEarnPoint'))
const LoyaltyRedemtion = dynamic(() => import('../../../../components/checkout-hotel/LoyaltyRedemtion'))
const BookerAndReceiverInfo = dynamic(() => import('../../../../components/checkout-hotel/BookerAndReceiverInfo'))

const HotelCheckoutStep2 = () => {
    const dispatch = useDispatch()
    const { t } = useTranslation(['common', 'hotel', 'notification', 'payment', 'notification', 'error'])
    const router = useRouter()
    const userInfo = useUserInfo()
    const [hotel, setHotel] = useState<any>(null)
    const [data, setData] = useState<any>(null)
    const [bookingRequestId, setBookingRequestId] = useState<string>('')
    const [confirmVoucher, setConfirmVoucher] = useState<string>('')
    const [userId, setUserId] = useState<number>(0)
    const [orderCode, setOrderCode] = useState<string>('')
    const [coupon, setCoupon] = useState<string>('')
    const [validateConfirmVoucher, setValidateConfirmVoucher] = useState<ValidationForm>({
        status: 'success',
        text: '',
    })
    const [isTaRate, setIsTaRate] = useState<boolean>(false)
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [isLoadingVerification, setIsLoadingVerification] = useState<boolean>(false)
    const [stepVerificationVoucher, setStepVerificationVoucher] = useState<number>(1)
    const [isCountDownAfterConfirm, setIsCountDownAfterConfirm] = useState<boolean>(false)
    const [isCheckboxVat, setIsCheckboxVat] = useState<boolean>(false)
    const [isShowCheckboxVat, setIsShowCheckboxVat] = useState<boolean>(false)
    const [isResend, setIsResend] = useState<boolean>(false)
    const [expiredTime, setExpiredTime] = useState<Date>()
    const [timeAfterConfirmVoucherSuccess, setTimeAfterConfirmVoucherSuccess] = useState<Date>()
    const [timeResendConfirmVoucher, setTimeResendConfirmVoucher] = useState<Date>()
    const [showVerifyPhone, setShowVerifyPhone] = useState<boolean>(false)
    const [presetPhone, setPresetPhone] = useState<string>('')
    const [requestFrom, setRequestFrom] = useState<string>('')
    const accessToken = Cookies.get('accessToken')
    const { isOpenInfo, paymentSelected, couponInfo, refreshTime, bookerDataRoot, listPaymentMethod } = useSelector(
        (state: any) => {
            return {
                isOpenInfo: state.checkout.isOpenCheckoutHotelInfo,
                paymentSelected: state.checkout.paymentMethodSelected,
                listPaymentMethod: state.checkout.listPaymentMethod,
                couponInfo: state.checkout.couponInfo || null,
                refreshTime: state.common.refreshTime,
                bookerDataRoot: state.checkout.bookerDataRoot,
            }
        }
    )
    // fetch data from booking request
    useEffect(() => {
        removePhoneNotMember()
        const booking_request_id = router.query.booking_request_id
        if (booking_request_id) {
            setBookingRequestId(String(booking_request_id))
            fetchData(String(booking_request_id))
        }

        async function fetchData(bookingRequestId: string) {
            try {
                dispatch(setLoading(true))
                const res = await getBookingRequest(bookingRequestId)
                dispatch(setLoading(false))
                if (res.status === 'success') {
                    console.log('....')
                    setRequestFrom(res.data.request_from)
                    setData(res.data)
                    const { booker_data, payment_method, hotel, order_code, coupon_code, coupon_info } = res.data
                    setOrderCode(order_code)
                    // set coupon
                    setCoupon(coupon_info?.coupon_code)
                    dispatch(setCouponInfo(coupon_info))
                    // set payment method if have

                    // set booker data
                    const _booker = {
                        user_id: booker_data?.user_id,
                        first_name: booker_data?.first_name,
                        last_name: booker_data?.last_name,
                        email: booker_data?.email,
                        phone: booker_data?.phone,
                        gender: booker_data?.gender,
                        is_receiver: true,
                    }
                    dispatch(setBookerData(_booker))
                    dispatch(setBookerDataRoot(_booker)) // d??ng cho tr?????ng h???p user s???a d??? li???u ??? popup r???i ???n "H???y"
                    setIsCheckboxVat(res.data.vat > 0)
                    // set hotel
                    if (Array.isArray(hotel) && hotel.length > 0) {
                        setHotel(hotel[0])
                        setIsShowCheckboxVat(
                            !hotel.filter((hotel: any) => hotel.token_data.rate_info.included_VAT > 0).length
                        )
                        // set receiver data
                        const _receiver = hotel[0].receiver_data.map((item: any) => {
                            return {
                                first_name: item.first_name,
                                last_name: item.last_name,
                                phone: item.phone,
                                country_code: '84',
                            }
                        })
                        if (!order_code && hotel[0]?.token_data?.rate_info?.is_ta_rate) {
                            setIsTaRate(hotel[0]?.token_data?.rate_info?.is_ta_rate)
                            dispatch(setPaymemtMethodSelected('book_for_me'))
                        } else {
                            setIsTaRate(false)
                            dispatch(setPaymemtMethodSelected(payment_method || ''))
                        }
                        dispatch(setReceiverData(_receiver))
                        dispatch(setReceiverDataRoot(_receiver))
                    }
                }
            } catch (e) {
                dispatch(setLoading(false))
                throw e
            }
        }
    }, [router.query.booking_request_id, refreshTime, paymentSelected])

    // set user id ( for loyalty )
    useEffect(() => {
        setUserId(data?.booker_data?.user_id || userInfo?.user_id || 0)
    }, [data?.booker_data?.user_id, userInfo?.user_id])

    useEffect(() => {
        setValidateConfirmVoucher({ status: 'success', text: '' })
    }, [isVisible])

    const closeInfo = () => {
        dispatch(setOpenCheckoutHotelInfo(false))
    }

    // click Continue
    const handleAddOrder = async () => {
        const finalPrice = JSON.parse(getFinalPrice())
        if (!paymentSelected) {
            showMessage('error', t('notification:Vui l??ng ch???n h??nh th???c thanh to??n'))
            return
        }
        if (paymentSelected === PAYMENT_METHODS.PAYMENT_METHOD_BOOK_FOR_ME) {
            await router.push(`${PATH_PAY_REQUEST}?transaction_id=book_for_me&request=${bookingRequestId}`)
            return
        }
        if (paymentSelected === PAYMENT_METHODS.PAYMENT_METHOD_PAY_LATER_LFVN) {
            const phoneIdentifier = await getPhoneIdentifier()
            if (!phoneIdentifier && requestFrom !== 'ADMIN') {
                if (!getPhoneNotMember()) {
                    setShowVerifyPhone(true)
                    return
                }
            } else if (
                phoneIdentifier &&
                requestFrom !== 'ADMIN' &&
                phoneIdentifier.status !== USER_IDENTIFIER.STATUS.VERIFIED
            ) {
                setShowVerifyPhone(true)
                setPresetPhone(phoneIdentifier.identifier_value)
                return
            }

            if (!accessToken && requestFrom !== 'ADMIN') {
                if (!getPhoneNotMember()) {
                    setShowVerifyPhone(true)
                    return
                }
                await updateBookerData({ bookingRequest: bookingRequestId, phone: getPhoneNotMember() })
            }
        }
        let data = {
            redirect_url: process.env.NEXT_PUBLIC_ROOT_DOMAIN + PATH_TRANSACTION_CONFIRM,
            update_order: !!orderCode,
        }
        document.body.scrollIntoView({ block: 'center', behavior: 'smooth' })
        try {
            dispatch(setLoading(true))
            const res = await addOrder(bookingRequestId, data)
            dispatch(setLoading(false))
            if (res.status === 'success') {
                await earnPointLoyalty({ order_id: res.data.order_id })
                dispatch(setRefreshTime(+new Date())) // trigger call api again to get order code
                handleResultAddOrder(res.data)
            } else {
                if (res.error_code === 'OH227') {
                    showMessage('error', t('notification:Kh??ch s???n h???t ph??ng ho???c b??? thay ?????i gi??'))
                } else if (res.error_code === 'OH000') {
                    showMessage('error', t('notification:H??? th???ng ??ang b???n, vui l??ng th??? l???i sau'))
                } else {
                    showMessage('error', res.message)
                }
            }
        } catch (err) {
            showMessage('error', err.message + `${err.error_code ? ` (${err.error_code})` : ''}`)
            throw err
        }
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

    const toggleModal = () => {
        setIsVisible(!isVisible)
        setStepVerificationVoucher(1)
    }
    const sendMailVoucher = async () => {
        try {
            setIsLoadingVerification(true)
            let res = await sendVerificationVoucher({ coupon_code: coupon, booking_request_id: bookingRequestId })
            setIsLoadingVerification(false)
            if (res.status === 'success') {
                setStepVerificationVoucher(2)
                setExpiredTime(res.data.expiry_time)
                setTimeResendConfirmVoucher(moment().add(30, 'seconds').toDate())
            } else {
                showMessage('error', res.message)
            }
        } catch (e) {
            throw e
        }
    }
    const confirmCodeVerification = async () => {
        try {
            if (!confirmVoucher || !confirmVoucher.trim()) {
                setValidateConfirmVoucher({ status: 'error', text: t('common:Vui l??ng nh???p m?? x??c nh???n') })
            }
            setIsLoadingVerification(true)
            let res = await applyCoupon(bookingRequestId, { coupon_code: coupon, verification_code: confirmVoucher })
            setIsLoadingVerification(false)
            if (res['status'] === 'success') {
                setValidateConfirmVoucher({ status: 'success', text: t('common:X??c nh???n th??nh c??ng') })
                setIsCountDownAfterConfirm(true)
                setStepVerificationVoucher(3)
                setTimeAfterConfirmVoucherSuccess(moment().add(10, 'seconds').toDate())
            } else {
                setValidateConfirmVoucher({ status: 'success', text: t('common:X??c nh???n kh??ng th??nh c??ng') })
            }
        } catch (e) {
            throw e
        }
    }
    const onFinish = () => {
        setValidateConfirmVoucher({ status: 'error', text: t('common:M?? x??c nh???n h???t h???n') })
    }
    const onFinishResend = () => {
        setIsResend(true)
    }
    const onFinishAfterConfirmSuccess = () => {
        setStepVerificationVoucher(1)
        setIsVisible(false)
        setValidateConfirmVoucher({ status: 'success', text: '' })
        dispatch(setRefreshTime(+new Date()))
    }
    const onChangeConfirmVoucher = (value: string) => {
        setConfirmVoucher(value)
    }
    const handlerCheckBoxVat = async (event: any) => {
        try {
            let res = await setExportVAT(bookingRequestId, { require_invoice: event.target.checked })
            dispatch(setRefreshTime(+new Date()))
            if (res['status'] === 'success') {
                setIsCheckboxVat(event.target.checked)
            } else {
                setIsCheckboxVat(!event.target.checked)
            }
        } catch (e) {
            setIsCheckboxVat(!event.target.checked)
        }
    }
    return (
        <>
            <LayoutCheckout>
                <section className="checkoutLayout">
                    <HeaderCheckout step={2} type={'hotel'} />
                    <div className="checkoutLayout__body">
                        <div className="container">
                            <div className="checkoutLayout__main">
                                <div className="checkoutLayout__left">
                                    <div className="checkoutPayment">
                                        <h2 className="mb15">{t('TH??NG TIN THANH TO??N')}</h2>
                                        <div className="checkoutPayment__body">
                                            {isTaRate ? (
                                                <BookForMe
                                                    bookerData={data?.booker_data}
                                                    bookingRequestId={bookingRequestId}
                                                />
                                            ) : (
                                                <ListPaymentMethod
                                                    bookingRequestId={bookingRequestId}
                                                    totalPrice={data?.final_price}
                                                    orderType={'hotel'}
                                                />
                                            )}

                                            <LoyaltyEarnPoint
                                                userId={userId}
                                                bookingRequestId={bookingRequestId}
                                                cashbackInfo={data?.loyalty_cashback_info}
                                            />

                                            <LoyaltyRedemtion
                                                bookingRequestId={bookingRequestId}
                                                orderCode={orderCode || ''}
                                                redeemInfo={data?.loyalty_redeem_info}
                                                bookerData={data?.booker_data}
                                                couponInfo={data?.coupon_info}
                                                businessAccountId={data?.business_account_id}
                                            />
                                            {isShowCheckboxVat ? (
                                                <>
                                                    <div className="checkoutLayout__title mt10">
                                                        <span>{t('Xu???t h??a ????n')}</span>
                                                    </div>
                                                    <div className="checkoutPayment__vat">
                                                        <Checkbox
                                                            disabled={!!orderCode}
                                                            checked={isCheckboxVat}
                                                            onChange={(event) => handlerCheckBoxVat(event)}
                                                        >
                                                            {t('hotel:T??i mu???n xu???t h??a ????n VAT')}
                                                        </Checkbox>
                                                        <p className={'size-12 italic'} style={{ opacity: '0.8' }}>
                                                            {t('hotel:Do nh?? cung c???p kh??ng h??? tr??? xu???t h??a ????n', {
                                                                percent: '10',
                                                            })}
                                                            <br />
                                                            {t('hotel:B???n c?? th??? b??? sung th??ng tin xu???t h??a ????n')}
                                                        </p>
                                                    </div>
                                                </>
                                            ) : (
                                                ''
                                            )}
                                        </div>
                                        <div className="checkoutLayout__btn">
                                            <p className="gray-5 italic mb10">
                                                {t('B???ng vi???c ch???n thanh to??n')},&nbsp;
                                                {t('t??i x??c nh???n ???? ?????c v?? ?????ng ?? v???i')}&nbsp;
                                                <a href="https://www.vntrip.vn/dieu-khoan-su-dung" target="_blank">
                                                    {t('??i???u kho???n v?? ??i???u ki???n')}
                                                </a>
                                                &nbsp;{t('c???a Vntrip.vn')}
                                            </p>
                                            <button type="button" className="btn btn_orange" onClick={handleAddOrder}>
                                                <span>{t('Ti???p t???c')}</span>
                                            </button>
                                            <p className="gray-5 mb0 mt10 italic">
                                                {t(
                                                    'payment:To??n b??? gi?? tr??? ????n h??ng s??? c???n ???????c thanh to??n tr?????c khi b???n ?????t kh??ch s???n n??y'
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className={`checkoutLayout__right ${isOpenInfo ? 'open' : ''}`}>
                                    {/* Header for mobile */}
                                    <div className="headerPopup">
                                        <p>{t('Th??ng tin ????n ph??ng')}</p>
                                        <button type="button" className="headerPopup__close" onClick={closeInfo}>
                                            <IconClose />
                                        </button>
                                    </div>
                                    <div className="checkoutLayout__sidebar">
                                        <div className="bookingInfo">
                                            <HotelInfo
                                                hotel={{
                                                    hotelId: hotel?.extra_info.hotel_id,
                                                    hotelName: hotel?.extra_info.hotel_name,
                                                    hotelNameVi: hotel?.extra_info.hotel_name,
                                                    thumbImage:
                                                        Array.isArray(hotel?.token_data.room_info.photos) &&
                                                        hotel?.token_data.room_info.photos.length > 0
                                                            ? hotel?.token_data.room_info.photos[0].thumb_image
                                                            : '',
                                                    starRate: hotel?.extra_info.hotel_star_rate,
                                                    fullAddress: hotel?.extra_info.hotel_address,
                                                    latitude: hotel?.extra_info.latitude,
                                                    longitude: hotel?.extra_info.longitude,
                                                    isDomestic:
                                                        hotel?.extra_info?.country_code &&
                                                        hotel?.extra_info?.country_code !== 'VN',
                                                }}
                                                roomName={hotel?.room_name}
                                                roomCount={hotel?.rooms}
                                                adultCount={hotel?.receiver_data.length}
                                                checkInDate={hotel?.check_in_date}
                                                checkOutDate={hotel?.check_out_date}
                                                nights={hotel?.token_data?.raw_info?.pretty_prices?.nights}
                                                step={2}
                                            />

                                            {/* Show price */}
                                            <PriceInfo
                                                step={2}
                                                isVat={isCheckboxVat}
                                                isVatInclude={hotel?.token_data?.rate_info?.included_VAT}
                                                hotel={hotel}
                                                redeemInfo={data?.loyalty_redeem_info}
                                                loyaltyBenefit={data?.loyalty_benefit}
                                                loyaltyBenefitPrice={data?.loyalty_benefit_price}
                                                provider={hotel?.token_data.rate_info.provider}
                                                rate={hotel?.token_data?.rate_info}
                                                prices={data?.prices}
                                                finalPrice={data?.final_price}
                                                showPrices={hotel?.show_prices}
                                                showPrettyPrice={hotel?.token_data.rate_info?.pretty_prices}
                                            />
                                        </div>

                                        {/* Coupon box */}
                                        <CouponBox
                                            bookingRequestId={bookingRequestId}
                                            coupon={coupon}
                                            data={data}
                                            setCoupon={setCoupon}
                                            setIsVisible={setIsVisible}
                                        />

                                        {/*Ph?? ph??? thu t???i kh??ch s???n*/}
                                        {hotel?.token_data?.rate_info?.provider !== 'VNTRIP' &&
                                            hotel?.token_data?.rate_info?.price_details?.extra_charges_breakdown?.extra_charge.filter(
                                                (item: any) => !item.excluded
                                            ).length > 0 && <ExtraCharge rate={hotel?.token_data?.rate_info} />}

                                        <Modal
                                            visible={isVisible}
                                            width={800}
                                            footer={null}
                                            onCancel={toggleModal}
                                            className={`text-center`}
                                        >
                                            {stepVerificationVoucher === 1 && (
                                                <div className="confirm-send-voucher">
                                                    <div className="vnt-voucher__icon">
                                                        <IconVerifiedVoucher />
                                                    </div>
                                                    <div
                                                        dangerouslySetInnerHTML={{
                                                            __html: t('common:B???n c???n x??c th???c voucher', {
                                                                mail: bookerDataRoot?.email,
                                                            }),
                                                        }}
                                                    />
                                                    <div className="text-center">
                                                        <p className="err-send-code red" />
                                                        <Button
                                                            type={'primary'}
                                                            loading={isLoadingVerification}
                                                            className="btn btn_orange "
                                                            onClick={sendMailVoucher}
                                                        >
                                                            <span>{t('G???i m?? x??c th???c')}</span>
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}
                                            {stepVerificationVoucher === 2 && (
                                                <div className="vnt-voucher">
                                                    <div className="vnt-voucher__icon">
                                                        <IconVerifiedVoucher />
                                                    </div>
                                                    <h5 className="vnt-voucher__title">
                                                        {t('common:B???n v???a s??? d???ng voucher')}
                                                    </h5>
                                                    <div
                                                        className="vnt-voucher__text p1"
                                                        dangerouslySetInnerHTML={{
                                                            __html: t('common:Vui l??ng x??c th???c voucher', {
                                                                mail: bookerDataRoot?.email,
                                                            }),
                                                        }}
                                                    />
                                                    <p className="vnt-voucher__text txt-countdown is-success">
                                                        {t('M?? h???t h???n sau')}
                                                    </p>
                                                    <div className="vnt-voucher__countdown txt-countdown is-success d-flex flexGroup3">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="20"
                                                            height="20"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <g fill="none" fillRule="evenodd">
                                                                <path fill="#000" d="M-666-452H774V572H-666z" />
                                                                <path fill="#FFF" d="M-246-280h600v470h-600z" />
                                                                <path
                                                                    fill="#E83F30"
                                                                    fillRule="nonzero"
                                                                    d="M9.996 0a10 10 0 1 1 0 20 9.968 9.968 0 0 1-7.066-2.928A9.96 9.96 0 0 1 0 10a9.96 9.96 0 0 1 2.93-7.072A9.97 9.97 0 0 1 9.996 0zm5.099 9.454c.3 0 .538.246.538.546 0 .3-.238.546-.538.546H9.996a.546.546 0 0 1-.469-.277l-.007-.007-.008-.016v-.008l-.008-.015-.008-.016V10.2l-.007-.016-.008-.008v-.015l-.008-.016v-.007l-.008-.016v-.031l-.007-.008V3.49c0-.3.238-.538.538-.538.3 0 .546.238.546.538v5.964h4.553zm1.207-5.757a8.887 8.887 0 0 0-6.306-2.605c-2.46 0-4.69.99-6.305 2.605A8.912 8.912 0 0 0 1.084 10c0 2.46 1 4.689 2.607 6.303a8.887 8.887 0 0 0 6.305 2.606c2.46 0 4.69-.992 6.306-2.606A8.887 8.887 0 0 0 18.916 10c0-2.46-1-4.689-2.614-6.303z"
                                                                />
                                                            </g>
                                                        </svg>
                                                        <Countdown
                                                            valueStyle={{ color: '#f05959' }}
                                                            style={{ color: '#f05959', marginLeft: '5px' }}
                                                            value={moment(expiredTime).valueOf()}
                                                            onFinish={onFinish}
                                                        />
                                                    </div>
                                                    <div className="vnt-voucher__form">
                                                        <Form.Item
                                                            validateStatus={validateConfirmVoucher?.status}
                                                            help={validateConfirmVoucher?.text}
                                                        >
                                                            <Input.Group compact>
                                                                <Input
                                                                    style={{ width: '50%' }}
                                                                    placeholder={t('Nh???p m?? x??c th???c')}
                                                                    type={'text'}
                                                                    className={`form-control`}
                                                                    value={confirmVoucher}
                                                                    onChange={(event) =>
                                                                        onChangeConfirmVoucher(event.target.value)
                                                                    }
                                                                />
                                                                <Button
                                                                    style={{ width: '30%' }}
                                                                    type={'primary'}
                                                                    loading={isLoadingVerification}
                                                                    className="btn btn_orange "
                                                                    onClick={confirmCodeVerification}
                                                                >
                                                                    <span> {t('??p d???ng')}</span>
                                                                </Button>
                                                            </Input.Group>
                                                        </Form.Item>
                                                    </div>
                                                    <div className="vnt-voucher__text p2 flexGroup3">
                                                        {t('B???n ch??a nh???n ???????c')}&nbsp;
                                                        {isResend ? (
                                                            <Button
                                                                type="link"
                                                                onClick={sendMailVoucher}
                                                                loading={isLoadingVerification}
                                                            >
                                                                {t('G???i l???i')}
                                                            </Button>
                                                        ) : (
                                                            <>
                                                                {t('G???i l???i sau')} &nbsp;
                                                                <Countdown
                                                                    valueStyle={{ fontSize: '14px' }}
                                                                    value={moment(timeResendConfirmVoucher).valueOf()}
                                                                    onFinish={onFinishResend}
                                                                    format={'ss'}
                                                                />
                                                            </>
                                                        )}
                                                    </div>
                                                    <div
                                                        className="vnt-voucher__note"
                                                        dangerouslySetInnerHTML={{ __html: t('common:H??? tr???') }}
                                                    />
                                                </div>
                                            )}
                                            {stepVerificationVoucher === 3 && (
                                                <div className="vnt-voucher">
                                                    <div className="vnt-voucher__icon">
                                                        <IconVerifiedVoucher />
                                                    </div>
                                                    <h3>{t(`common:X??c nh???n th??nh c??ng`)}</h3>
                                                    <div className={'flexGroup3'}>
                                                        {t('Quay tr??? l???i trang thanh to??n trong ...')}
                                                        <Countdown
                                                            valueStyle={{ color: '#f05959', fontSize: '14px' }}
                                                            style={{ color: '#f05959', marginLeft: '5px' }}
                                                            value={moment(timeAfterConfirmVoucherSuccess).valueOf()}
                                                            onFinish={onFinishAfterConfirmSuccess}
                                                            format={'ss'}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </Modal>
                                        {/* Th??ng tin ng?????i ?????t ph??ng, nh???n ph??ng nh???p ???? ??? step1 */}
                                        {hotel && (
                                            <BookerAndReceiverInfo
                                                roomCount={hotel.rooms}
                                                availToken={hotel.token_data.rate_info.avail_token}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </LayoutCheckout>
            {showVerifyPhone ? (
                <VerifyPhone
                    presetPhone={presetPhone}
                    bookerDataRoot={bookerDataRoot}
                    onClose={() => {
                        setShowVerifyPhone(false)
                    }}
                />
            ) : null}
        </>
    )
}

export default HotelCheckoutStep2
