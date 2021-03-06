import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import dynamic from 'next/dist/next-server/lib/dynamic'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { setLoading, setRefreshTime } from '../../../../store/common/action'
import { getBookingRequest } from '../../../../api/hotel-services'
import {
    setBookerData,
    setBookerDataRoot,
    setCouponInfo,
    setPaymemtMethodSelected,
} from '../../../../store/checkout/action'
import { showMessage } from '../../../../utils/common'
import { PAYMENT_METHODS } from '../../../../constants/enums'
import { PATH_PAY_REQUEST, PATH_TRANSACTION_CONFIRM } from '../../../../constants/common'
import { getPhoneNotMember } from '../../../../utils/user'
import { USER_IDENTIFIER } from '../../../../constants/userIdentifier'
import { updateBookerData } from '../../../../api/partner-service'
import { addOrder, earnPointLoyalty } from '../../../../api/order-services'
import { handleResultAddOrder } from '../../../../utils/checkout'
import { getIdentifiers } from '../../../../api/user-services'
import CouponBox from '../../../../components/checkout-common/CouponBox'
import { useUserInfo } from '../../../../utils/custom-hook'
import CheckOutBookerInfo from '../../../../components/voucher/CheckOutBookerInfo'

const LayoutCheckout = dynamic(() => import('../../../../components/layout/LayoutCheckout'))
const HeaderCheckout = dynamic(() => import('../../../../components/checkout-common/HeaderCheckout'))
const ListPaymentMethod = dynamic(() => import('../../../../components/checkout-common/ListPaymentMethod'))
const LoyaltyEarnPoint = dynamic(() => import('../../../../components/checkout-hotel/LoyaltyEarnPoint'))
const LoyaltyRedemtion = dynamic(() => import('../../../../components/checkout-hotel/LoyaltyRedemtion'))
const ReviewInfo = dynamic(() => import('../../../../components/voucher/ReviewInfo'))
const VerifyPhone = dynamic(() => import('../../../../components/user/verifyPhone'))

const VoucherCheckOut2 = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const userInfo = useUserInfo()
    const { t } = useTranslation(['common', 'hotel', 'notification', 'payment', 'notification', 'error'])
    const [data, setData] = useState<any>(null)
    const [bookingRequestId, setBookingRequestId] = useState<string>('')
    const [userId, setUserId] = useState<number>(0)
    const [orderCode, setOrderCode] = useState<string>('')
    const [coupon, setCoupon] = useState<string>('')
    const [showVerifyPhone, setShowVerifyPhone] = useState<boolean>(false)
    const [presetPhone, setPresetPhone] = useState<string>('')
    const accessToken = Cookies.get('accessToken')

    const { isOpenInfo, paymentSelected, refreshTime, bookerDataRoot } = useSelector((state: any) => {
        return {
            isOpenInfo: state.checkout.isOpenCheckoutHotelInfo,
            paymentSelected: state.checkout.paymentMethodSelected,
            listPaymentMethod: state.checkout.listPaymentMethod,
            couponInfo: state.checkout.couponInfo || null,
            refreshTime: state.common.refreshTime,
            bookerDataRoot: state.checkout.bookerDataRoot,
        }
    })

    useEffect(() => {
        const booking_request_id = router.query.br_id
        async function fetchData(bookingRequestId: string) {
            try {
                dispatch(setLoading(true))
                const res = await getBookingRequest(bookingRequestId)
                dispatch(setLoading(false))
                if (res.status === 'success') {
                    console.log('....')
                    setData(res.data)
                    const { booker_data, payment_method, order_code, coupon_info } = res.data
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

                    dispatch(setPaymemtMethodSelected(payment_method || ''))
                    dispatch(setBookerData(_booker))
                    dispatch(setBookerDataRoot(_booker)) // d??ng cho tr?????ng h???p user s???a d??? li???u ??? popup r???i ???n "H???y"
                    // setIsCheckboxVat(res.data.vat > 0)
                }
            } catch (e) {
                dispatch(setLoading(false))
                throw e
            }
        }
        if (booking_request_id) {
            setBookingRequestId(String(booking_request_id))
            fetchData(String(booking_request_id))
        }
    }, [router.query.booking_request_id, refreshTime, paymentSelected])

    // set user id ( for loyalty )
    useEffect(() => {
        setUserId(data?.booker_data?.user_id || userInfo?.user_id || 0)
    }, [data?.booker_data?.user_id, userInfo?.user_id])

    // click Continue
    const handleAddOrder = async () => {
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
            redirect_url: process.env.NEXT_PUBLIC_ROOT_DOMAIN + PATH_TRANSACTION_CONFIRM,
            update_order: !!orderCode,
        }
        document.body.scrollIntoView({ block: 'center', behavior: 'smooth' })
        try {
            dispatch(setLoading(true))
            const res = await addOrder(bookingRequestId, data)
            dispatch(setLoading(false))
            if (res.status === 'success') {
                await earnPointLoyalty({ order_id: res.data.id })
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

    return (
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
                                        <ListPaymentMethod
                                            bookingRequestId={bookingRequestId}
                                            totalPrice={data?.final_price}
                                            orderType={'hotel'}
                                        />

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
                                        {/*{isShowCheckboxVat ? (*/}
                                        {/*    <>*/}
                                        {/*        <div className="checkoutLayout__title mt10">*/}
                                        {/*            <span>{t('Xu???t h??a ????n')}</span>*/}
                                        {/*        </div>*/}
                                        {/*        <div className="checkoutPayment__vat">*/}
                                        {/*            <Checkbox*/}
                                        {/*                disabled={!!orderCode}*/}
                                        {/*                checked={isCheckboxVat}*/}
                                        {/*                // onChange={(event) => handlerCheckBoxVat(event)}*/}
                                        {/*            >*/}
                                        {/*                {t('hotel:T??i mu???n xu???t h??a ????n VAT')}*/}
                                        {/*            </Checkbox>*/}
                                        {/*            <p className={'size-12 italic'} style={{ opacity: '0.8' }}>*/}
                                        {/*                {t('hotel:Do nh?? cung c???p kh??ng h??? tr??? xu???t h??a ????n', {*/}
                                        {/*                    percent: '10',*/}
                                        {/*                })}*/}
                                        {/*                <br />*/}
                                        {/*                {t('hotel:B???n c?? th??? b??? sung th??ng tin xu???t h??a ????n')}*/}
                                        {/*            </p>*/}
                                        {/*        </div>*/}
                                        {/*    </>*/}
                                        {/*) : (*/}
                                        {/*    ''*/}
                                        {/*)}*/}
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
                                <ReviewInfo data={data?.deal_data} quantity={data?.other_expense?.[0]?.quantity || 1} />
                                {/* Coupon box */}
                                <CouponBox
                                    bookingRequestId={bookingRequestId}
                                    coupon={coupon}
                                    data={data}
                                    setCoupon={setCoupon}
                                    setIsVisible={() => {}}
                                />
                                {/* Th??ng tin ng?????i ?????t voucher, nh???n ph??ng nh???p ???? ??? step1 */}
                                <CheckOutBookerInfo dealId={data?.deal_data?.id} otherExpanse={data?.other_expense} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {showVerifyPhone && (
                <VerifyPhone
                    presetPhone={presetPhone}
                    bookerDataRoot={bookerDataRoot}
                    onClose={() => {
                        setShowVerifyPhone(false)
                    }}
                />
            )}
        </LayoutCheckout>
    )
}
export default VoucherCheckOut2
