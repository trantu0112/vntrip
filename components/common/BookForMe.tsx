import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { setPaymemtMethodSelected } from '../../store/checkout/action'
import { updatePaymentMethod } from '../../api/common-services'
import { showMessage } from '../../utils/common'

interface Props {
    bookerData: any
    bookingRequestId: string
}

const BookForMe: React.FC<Props> = ({ bookerData, bookingRequestId }) => {
    const dispatch = useDispatch()
    const { t } = useTranslation(['common'])
    const paymentSelected = useSelector((state: any) => state.checkout.paymentMethodSelected)

    const handleChangePaymentMethod = async (paymentMethod: string) => {
        //  update payment method
        try {
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
                <div key="book_for_me" className="checkoutPayment__item">
                    <div className="paymentItem">
                        <div className="radio">
                            <input
                                id="book_for_me"
                                type="radio"
                                name="payments"
                                checked={'book_for_me' === paymentSelected}
                                value="book_for_me"
                                onChange={(event) => handleChangePaymentMethod(event.target.value)}
                            />
                            <label htmlFor="book_for_me">
                                <div className="paymentItem__logo">
                                    <img
                                        src={'https://statics.vntrip.vn/images/checkout/i-callme.png'}
                                        className="i-card"
                                        alt="Hỗ trợ cho tôi"
                                    />
                                </div>
                                <div className="paymentItem__text">
                                    <p className="p1">{t('Hỗ trợ cho tôi')}</p>
                                    <p className="size-12 gray-5 mb0">{t('Quý khách có thể chọn hỗ trợ cho tôi')}</p>
                                    <div className="checkoutPayment__call">
                                        <i>
                                            {t('Chúng tôi sẽ liên hệ cho bạn qua số điện thoại')} {bookerData?.phone}
                                        </i>
                                    </div>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BookForMe
