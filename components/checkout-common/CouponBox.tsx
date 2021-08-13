import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Form, Input } from 'antd'
import { applyCoupon } from '../../api/order-services'
import { setCouponInfo } from '../../store/checkout/action'
import { setRefreshTime } from '../../store/common/action'
import { ValidationForm } from '../../constants/interface'
import { useDispatch, useSelector } from 'react-redux'
interface Props {
    bookingRequestId: string
    coupon: string
    setCoupon: (value: string) => void
    setIsVisible?: any
    data?: any
}
const CouponBox: React.FC<Props> = ({ bookingRequestId, coupon, setCoupon, setIsVisible, data }) => {
    const dispatch = useDispatch()
    const { t } = useTranslation(['common', 'hotel', 'notification', 'payment', 'notification', 'error'])
    const [validateCoupon, setValidateCoupon] = useState<ValidationForm>({ status: 'success', text: '' })
    const [loadingCoupon, setLoadingCoupon] = useState<boolean>(false)
    const { couponInfo, listPaymentMethod, paymentSelected } = useSelector((state: any) => {
        return {
            couponInfo: state.checkout.couponInfo || null,
            listPaymentMethod: state.checkout.listPaymentMethod,
            paymentSelected: state.checkout.paymentMethodSelected,
        }
    })
    /* xử lý coupon */
    useEffect(() => {
        if (couponInfo && listPaymentMethod) {
            let checkPayment = listPaymentMethod.every(
                (element: any) => couponInfo.condition_bank.indexOf(element.payment_method) > -1
            )
            if (checkPayment) {
                if (couponInfo.status === 'SUCCESS') {
                    setValidateCoupon({ status: 'success', text: '' })
                }
                // coupon ko chap nhan redeem & co diem redeem
                // if (
                //     !data?.bonus_cashback?.allowRedeem &&
                //     data?.loyalty_redeem_info &&
                //     data?.loyalty_redeem_info.additional_settings.actual_redeem_point &&
                //     data?.loyalty_redeem_info.status == 'DRAFT'
                // ) {
                //     setValidateCoupon({
                //         status: 'warning',
                //         text: t(`payment:Mã giảm giá không áp dụng đồng thời với tiêu tiền Cashback cho đơn hàng`),
                //     })
                // }
                if (couponInfo.status === 'TEMPORARY') {
                    setValidateCoupon({
                        status: 'warning',
                        text: couponInfo?.temporary_reason?.message,
                    })
                }
            } else {
                let condition_bank_i18n = []

                for (let item of couponInfo?.condition_bank) {
                    condition_bank_i18n.push(t(`payment:${item}`))
                }
                if (couponInfo?.temporary_reason && couponInfo?.temporary_reason?.error_code) {
                    if (paymentSelected) {
                        setValidateCoupon({
                            status: 'warning',
                            text: t(`error:${couponInfo?.temporary_reason?.error_code}`),
                        })
                    } else {
                        setValidateCoupon({
                            status: 'warning',
                            text: t(`payment:Thanh toán bằng để hưởng mã giảm giá này`, {
                                listPayment: condition_bank_i18n,
                            }),
                        })
                    }
                } else {
                    if (couponInfo?.status === 'SUCCESS') {
                        setValidateCoupon({ status: 'success', text: '' })
                    }
                }
                let dataValidation = data?.validations?.coupon_info
                if (dataValidation && dataValidation?.temporary_reason?.error_code == 'E4012') {
                    setValidateCoupon({
                        status: 'error',
                        text: t(`Mã giảm giá không được áp dụng chung với số điểm cashback đã tiêu`),
                    })
                }
                if (dataValidation && dataValidation?.temporary_reason?.error_code == 'E1423') {
                    setValidateCoupon({
                        status: 'error',
                        text: t(`payment:Email không hợp lệ`),
                    })
                }
            }
        }
    }, [couponInfo, paymentSelected, data, listPaymentMethod])

    /* change coupon */
    const onChangeCoupon = (value: string) => {
        setCoupon(value)
        setValidateCoupon({ status: 'success', text: '' })
    }

    /* submit coupon */
    const handleSubmitCoupon = async (value: string) => {
        if (!value || !value.trim()) {
            setValidateCoupon({ status: 'error', text: t('notification:Vui lòng nhập mã giảm giá') })
            return
        }
        try {
            setLoadingCoupon(true)
            const res = await applyCoupon(bookingRequestId, { coupon_code: value.trim() })
            setLoadingCoupon(false)
            if (res.status === 'success') {
                dispatch(setCouponInfo(res.data))
                dispatch(setRefreshTime(+new Date()))
                if (res.data.status.toLowerCase() === 'success') {
                    setValidateCoupon({ status: 'success', text: t('notification:Áp dụng mã giảm giá thành công') })
                    // clear message after 4s
                    setTimeout(() => {
                        setValidateCoupon({ status: 'success', text: '' })
                    }, 4000)
                }
            } else {
                setLoadingCoupon(false)
                if (res.error_code == 'E1460') {
                    setIsVisible(true)
                } else if (res.error_code == 'E1423') {
                    setValidateCoupon({
                        status: 'error',
                        text: t('payment:Email không hợp lệ'),
                    })
                } else {
                    setValidateCoupon({
                        status: 'error',
                        text: t(
                            res.error_code === 400 ? 'notification:Mã giảm giá không hợp lệ' : `error:${res.error_code}`
                        ),
                    })
                }
                return
            }
        } catch (e) {
            throw e
        }
    }

    /* remove coupon */
    const handleRemoveCoupon = async () => {
        try {
            setLoadingCoupon(true)
            const res = await applyCoupon(bookingRequestId, { coupon_code: '' })
            setLoadingCoupon(false)
            if (res.status === 'success') {
                setCoupon('')
                dispatch(setRefreshTime(+new Date()))
                dispatch(setCouponInfo(null))
                setValidateCoupon({ status: 'success', text: t('notification:Hủy bỏ mã giảm giá thành công') })
                // clear message after 4s
                setTimeout(() => {
                    setValidateCoupon({ status: 'success', text: '' })
                }, 4000)
            } else {
                setLoadingCoupon(false)
                if (res.error_code === 'E1460') {
                    setValidateCoupon({ status: 'error', text: res.message })
                } else {
                    setValidateCoupon({ status: 'error', text: t(`error:${res.error_code}`) })
                }
                return
            }
        } catch (e) {
            throw e
        }
    }

    return (
        <div className="couponBox">
            <Form.Item validateStatus={validateCoupon.status} help={validateCoupon.text}>
                <div className="formInline">
                    <Input
                        placeholder={t('payment:Nhập mã giảm giá')}
                        disabled={!!couponInfo}
                        size="large"
                        value={coupon}
                        onChange={(event) => onChangeCoupon(event.target.value)}
                        onKeyUp={(event: any) => {
                            if (event.keyCode === 13) {
                                handleSubmitCoupon(event.target.value)
                            }
                        }}
                    />
                    <Button
                        size={'large'}
                        type="primary"
                        loading={loadingCoupon}
                        onClick={() => (couponInfo ? handleRemoveCoupon() : handleSubmitCoupon(coupon))}
                    >
                        <span>{t(couponInfo ? 'common:Hủy bỏ' : 'common:Áp dụng')}</span>
                    </Button>
                </div>
            </Form.Item>
        </div>
    )
}

export default CouponBox
