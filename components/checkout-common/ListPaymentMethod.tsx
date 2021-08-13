import React, { useEffect, useState } from 'react'
import { getPaymentMethod, updatePaymentMethod } from '../../api/common-services'
import { getLimitLotte, handlePaymentMethods } from '../../utils/checkout'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { setListPaymentMethodReducer, setPaymemtMethodSelected } from '../../store/checkout/action'
import { displayPrice, showMessage } from '../../utils/common'
import DisplayPrice from '../common/DisplayPrice'
import { PAYMENT_METHODS } from '../../constants/enums'
import { useAuth } from '../contexts/authContext'
import { getPLToken, getSlotId, getUserLotteLoanLimit, updateToken } from '../../api/partner-service'
import { getBookerAndPassengers, getBookerAndReceiver, saveMinPriceLotte } from '../../utils/user'
import Cookies from 'js-cookie'
interface iProps {
    bookingRequestId: string
    totalPrice: number
    orderType: 'hotel' | 'flight'
}

const ListPaymentMethod: React.FC<iProps> = ({ bookingRequestId, totalPrice, orderType }) => {
    const dispatch = useDispatch()
    const auth = useAuth()
    const { t, i18n } = useTranslation(['common', 'payment', 'flight'])
    const paymentSelected = useSelector((state: any) => state.checkout.paymentMethodSelected)
    const [rootPaymentMethod, setRootPaymentMethod] = useState<any[]>([])
    const [listPaymentMethod, setListPaymentMethod] = useState<any[]>([])
    const [lotteEnable, setLotteEnable] = useState<boolean>(false)
    const [lotteLoanLimit, setLotteLoanLimit] = useState<any>({})
    const [minLotte, setMinLotte] = useState<any>(0)
    const [maxLotte, setMaxLotte] = useState<any>(null)
    const [textLotteError, setTextLotteError] = useState<string>('')
    const accessToken = Cookies.get('accessToken')

    // fetch data
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await getPaymentMethod({ request_from: 'FE_BASIC' })
                if (res.status === 'success') {
                    await getSlotId(null)
                    setRootPaymentMethod(res.data)
                    dispatch(setListPaymentMethodReducer(res.data))
                }
            } catch (e) {
                throw e
            }
        }

        fetchData()
    }, [])

    useEffect(() => {
        if (listPaymentMethod.find((item) => item.payment_method === PAYMENT_METHODS.PAYMENT_METHOD_PAY_LATER_LFVN)) {
            getDataLF()
        }
        for (let item of listPaymentMethod) {
            if (item.payment_method === PAYMENT_METHODS.PAYMENT_METHOD_PAY_LATER_LFVN) {
                saveMinPriceLotte(item.payment_limit.min)
                if (totalPrice < item.payment_limit.min) {
                    setLotteEnable(true)
                }
                setMinLotte(item.payment_limit.min)
            }
        }
        async function getDataLF() {
            let booker
            if (getBookerAndReceiver() && orderType === 'hotel') {
                booker = getBookerAndReceiver()['booker']
            } else if (getBookerAndPassengers() && orderType === 'flight') {
                booker = getBookerAndPassengers()['booker']
            }

            if (
                booker &&
                !booker.email.includes('@vntrip.vn') &&
                !booker.email.includes('@lottefinance.vn') &&
                !booker.email.includes('@esi.vn') &&
                !booker.email.includes('@openwaygroup.com')
            ) {
                const newListPaymentMethod: any = listPaymentMethod.filter(
                    (item) => item.payment_method !== PAYMENT_METHODS.PAYMENT_METHOD_PAY_LATER_LFVN
                )
                dispatch(setListPaymentMethodReducer(newListPaymentMethod))
                setListPaymentMethod(newListPaymentMethod)
                setRootPaymentMethod(newListPaymentMethod)
            }
            if (auth && auth.user && accessToken) {
                const userId = auth.user.user_id
                const phone = auth.user.phone
                const email = auth.user.email
                const params = { userId, phone, email }
                try {
                    let resPlToken = await getPLToken(params)
                    if (resPlToken.data) {
                        resPlToken = resPlToken.data
                    }
                    if (resPlToken && resPlToken.token) {
                        await updateToken(resPlToken.token, { phone: phone })
                        if (resPlToken.PLallowed) {
                            const limitLotte = await getUserLotteLoanLimit()
                            if (limitLotte && limitLotte.limitAmount) {
                                setMaxLotte(limitLotte.limitAmount)
                                setLotteLoanLimit(limitLotte)
                                if (totalPrice > limitLotte.limitAmount) {
                                    setLotteEnable(true)
                                }
                            }
                        }
                    } else {
                        setLotteEnable(true)
                        setTextLotteError(t('common:Lỗi trong quá trình thanh toán'))
                    }
                } catch (e) {
                    throw e
                }
            } else {
                setLotteLoanLimit(null)
            }
        }
    }, [listPaymentMethod])

    useEffect(() => {
        let textAlert = ''
        if (totalPrice < minLotte) {
            setLotteEnable(true)
            const minLotteFormat = displayPrice(minLotte, 'VND')
            textAlert += t('common:minPrice', { price: minLotteFormat })
        } else if (maxLotte) {
            if (totalPrice > maxLotte) {
                setLotteEnable(true)
                const maxLotteFormat = displayPrice(maxLotte, 'VND')
                textAlert += t('common:maxPrice', { price: maxLotteFormat })
            }
        }
        setTextLotteError(textAlert)
    }, [totalPrice, minLotte, maxLotte])

    // convert payment method
    useEffect(() => {
        if (Array.isArray(rootPaymentMethod) && rootPaymentMethod.length > 0) {
            const convertPm = handlePaymentMethods(rootPaymentMethod, totalPrice, orderType)
            setListPaymentMethod(convertPm)
        }
    }, [rootPaymentMethod, totalPrice, orderType])

    const handleChangePaymentMethod = async (paymentMethod: string) => {
        // call api update payment method
        try {
            if (paymentMethod === PAYMENT_METHODS.PAYMENT_METHOD_PAY_LATER_LFVN && lotteEnable) {
                showMessage('error', t('common:Giá trị đơn hàng không hợp lệ') + `(${textLotteError})`)
                return
            }
            const data = {
                booking_request_id: bookingRequestId,
                payment_method: paymentMethod,
                user_type: 'person',
            }
            const result = await updatePaymentMethod(data)
            if (result && result.status === 'success') {
                dispatch(setPaymemtMethodSelected(paymentMethod))
            } else if (result && result.status === 'error') {
                if (result.error_code === 'BK1057') {
                    showMessage('error', result.message)
                }
            }
        } catch (e) {
            throw e
        }
    }

    return (
        <>
            <div className="checkoutLayout__title">
                <span>{t('payment:Chọn hình thức thanh toán')}</span>
            </div>
            <div className="checkoutPayment__list">
                {paymentSelected === 'payment_method_voucher' && (
                    <div key={'payment_method_voucher'} className="checkoutPayment__item">
                        <div className="paymentItem">
                            <div className="radio">
                                <input
                                    id={'payment_method_voucher'}
                                    disabled={true}
                                    type="radio"
                                    name="payments"
                                    checked={true}
                                    value={'payment_method_voucher'}
                                />
                                <label htmlFor={'payment_method_voucher'}>
                                    <div className="paymentItem__logo" style={{ width: 30 }}>
                                        <img
                                            src={'https://statics.vntrip.vn/images/checkout/image-voucher.png'}
                                            className="i-card"
                                            alt={'Thanh toán bằng voucher'}
                                        />
                                    </div>
                                    <div className="paymentItem__text">
                                        <p className="p1">{t('Thanh toán bằng voucher')}</p>
                                        <p className="size-12 gray-5 mb0">{t('Đơn hàng 0đ')}</p>
                                        <p className={`size-12`}>
                                            {t(`flight:Phí thanh toán`)}:&nbsp;
                                            <i className={`yellow-1`}>{<DisplayPrice price={0} />}</i>
                                        </p>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                )}
                {paymentSelected !== 'payment_method_voucher' &&
                    listPaymentMethod.map((item) => {
                        return (
                            <>
                                <div key={item.id} className="checkoutPayment__item">
                                    <div className="paymentItem">
                                        <div className="radio">
                                            <input
                                                id={item.payment_method}
                                                // disabled={
                                                //     item.payment_method === PAYMENT_METHODS.PAYMENT_METHOD_PAY_LATER_LFVN &&
                                                //     lotteEnable
                                                // }
                                                type="radio"
                                                name="payments"
                                                checked={item.payment_method === paymentSelected}
                                                value={item.payment_method}
                                                onChange={(event) => handleChangePaymentMethod(event.target.value)}
                                            />
                                            <label htmlFor={item.payment_method}>
                                                <div className="paymentItem__logo">
                                                    <img src={item.logo} className="i-card" alt={item.name_vi} />
                                                </div>
                                                <div className="paymentItem__text">
                                                    <p className="p1">
                                                        {i18n.language === 'vi' ? item.name_vi : item.name_en}
                                                    </p>
                                                    {item.payment_method ===
                                                    PAYMENT_METHODS.PAYMENT_METHOD_PAY_LATER_LFVN ? (
                                                        <p className="p1">
                                                            {lotteLoanLimit && lotteLoanLimit.availLimitAmount ? (
                                                                <>
                                                                    {t('common:Hạn mức')}
                                                                    <i className={`yellow-1`}>
                                                                        <DisplayPrice
                                                                            price={lotteLoanLimit.availLimitAmount}
                                                                        />
                                                                    </i>
                                                                </>
                                                            ) : (
                                                                <>{t('common:Hạn mức chưa được thiết lập')}</>
                                                            )}
                                                        </p>
                                                    ) : null}
                                                    <p className="size-12 gray-5 mb0">
                                                        {
                                                            item[
                                                                i18n.language === 'vi'
                                                                    ? 'short_desc_vi'
                                                                    : 'short_desc_en'
                                                            ]
                                                        }
                                                    </p>
                                                    <p className={`size-12`}>
                                                        {t(`flight:Phí thanh toán`)}:&nbsp;
                                                        <i className={`yellow-1`}>
                                                            {<DisplayPrice price={item.markupAmount} />}
                                                        </i>
                                                    </p>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })}
            </div>
        </>
    )
}

export default ListPaymentMethod
