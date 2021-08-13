import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useDispatch } from 'react-redux'
import { setLoading } from '../../store/common/action'
import { useRouter } from 'next/router'
import { getOrderByTokenPaymentLink } from '../../api/order-services'
import { Button, Modal } from 'antd'
import { PATH_HOME, PATH_PAY_BANK_TRANSFER, PATH_PAY_SUCCESS, PATH_PAY_ZALO_WALLET } from '../../constants/common'
import { useTranslation } from 'react-i18next'
import { isMobile } from 'react-device-detect'
import { uToA } from '../../utils/common'

const LayoutCheckout = dynamic(() => import('../../components/layout/LayoutCheckout'))
const HeaderCheckout = dynamic(() => import('../../components/checkout-common/HeaderCheckout'))

const ContinuePayment = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const { t } = useTranslation(['payment', 'common'])
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [checkLFVN, setCheckLFVN] = useState<boolean>(false)
    const [errorLFVN, setErrorLFVN] = useState<string>('')
    const [toStep2, setToStep2] = useState<string>('')

    useEffect(() => {
        dispatch(setLoading(true))
    }, [])

    useEffect(() => {
        const token = router.query.token ? String(router.query.token) : ''
        if (token) {
            fetchData(token)
        }

        async function fetchData(token: string) {
            try {
                const res = await getOrderByTokenPaymentLink(token)
                console.log('res', res)
                if (res.status === 'error') {
                    if (
                        res.data &&
                        res.data.payment_method &&
                        res.data.payment_method === 'payment_method_pay_later_lfvn'
                    ) {
                        setErrorLFVN(res.message)
                        setCheckLFVN(true)
                        setToStep2(res.data.backStep2)
                    }
                    setIsOpen(true) // open popup back to home
                } else {
                    const { redirect_url, redirect_url_mobile, payment_method, transaction_id } = res.data
                    if (payment_method === 'payment_method_zalopay_wallet') {
                        if (isMobile && redirect_url_mobile) {
                            window.location.href = redirect_url_mobile
                        } else if (transaction_id) {
                            window.location.href = `${PATH_PAY_ZALO_WALLET}?transaction_id=${transaction_id}&code=${uToA(
                                redirect_url
                            )}`
                        }
                    } else if (payment_method === 'payment_method_bank_transfer') {
                        window.location.href = PATH_PAY_BANK_TRANSFER + '?transaction_id=' + transaction_id
                    } else if (redirect_url) {
                        window.location.href = redirect_url
                    } else {
                        window.location.href = PATH_PAY_SUCCESS + '?transaction_id=' + transaction_id
                    }
                }
            } catch (e) {
                throw e
            }
        }
    }, [router.pathname, router.query.token])

    const backToHome = () => {
        setIsOpen(false)
        router.push(PATH_HOME)
    }

    const backStep2 = () => {
        setIsOpen(false)
        router.push(toStep2)
    }

    return (
        <LayoutCheckout>
            <section className="checkoutLayout">
                <HeaderCheckout step={3} type={'hotel'} />
                <div className="checkoutLayout__body"></div>

                <Modal
                    width={750}
                    maskClosable={false}
                    visible={isOpen}
                    footer={
                        checkLFVN ? (
                            <>
                                <Button onClick={backStep2} type={'primary'}>
                                    {t('payment:Chọn hình thức thanh toán')}
                                </Button>
                                <Button onClick={backToHome} type={'primary'}>
                                    {t('common:Quay về trang chủ')}
                                </Button>
                            </>
                        ) : (
                            <Button onClick={backToHome} type={'primary'}>
                                {t('common:Quay về trang chủ')}
                            </Button>
                        )
                    }
                    onCancel={backToHome}
                    onOk={backToHome}
                >
                    <p className="paymentExpired">
                        {checkLFVN ? (
                            errorLFVN
                        ) : (
                            <>
                                {t('Liên kết đã hết hạn')}. {t('Quý khách vui lòng gọi Hotline')}
                                <a href="tel:0963 266 688">0963 266 688</a>
                                {t('để được hỗ trợ')}.
                            </>
                        )}
                    </p>
                </Modal>
            </section>
        </LayoutCheckout>
    )
}

export default ContinuePayment
