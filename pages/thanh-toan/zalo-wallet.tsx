import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import HeaderCheckout from '../../components/checkout-common/HeaderCheckout'
import LayoutCheckout from '../../components/layout/LayoutCheckout'
import { useTranslation } from 'react-i18next'
import { Button, Spin } from 'antd'
import { getOrderByTransactionId } from '../../api/order-services'
import { PATH_PAY_FAIL, PATH_PAY_SUCCESS, VNTRIP_INFO } from '../../constants/common'
import { showMessage } from '../../utils/common'

const PayZaloWallet = () => {
    const router = useRouter()
    const { t } = useTranslation(['payment'])
    const [qrCode, setQrCode] = useState<any>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false)
    const [orderType, setOrderType] = useState<'hotel' | 'flight'>('hotel')
    useEffect(() => {
        const code = router.query.code
        const transactionId = router.query.transaction_id
        if (typeof code === 'string') {
            setQrCode(decodeURIComponent(escape(window.atob(code))))
        }
        setIsLoading(true)
        getOrderByTransactionId(String(transactionId))
            .then((res) => {
                setIsLoading(false)
                setOrderType(res['order_type'])
                if (res['data']['order_transaction_data'][0]['status'] === 'tran_success') {
                    router.push({
                        pathname: PATH_PAY_SUCCESS,
                        query: { transaction_id: router?.query?.transaction_id },
                    })
                } else if (res['data']['order_transaction_data'][0]['status'] === 'tran_error') {
                    router.push({
                        pathname: PATH_PAY_FAIL,
                        query: { transaction_id: router?.query?.transaction_id, status: `tran_error` },
                    })
                } else {
                }
            })
            .catch((err) => {
                setIsLoading(false)
                console.log(err)
            })
    }, [router])
    const handleSubmit = () => {
        setLoadingSubmit(true)
        let countInterval = 0
        let interval = window.setInterval(() => {
            countInterval++
            if (countInterval < 20) {
                getOrderByTransactionId(String(router?.query?.transaction_id))
                    .then((res) => {
                        if (res.status === 'success') {
                            if (res['data']['order_transaction_data'][0]['status'] === 'tran_success') {
                                setLoadingSubmit(false)
                                window.clearInterval(interval)
                                router.push({
                                    pathname: PATH_PAY_SUCCESS,
                                    query: { transaction_id: router?.query?.transaction_id },
                                })
                            } else if (res['data']['order_transaction_data'][0]['status'] === 'tran_error') {
                                setLoadingSubmit(false)
                                window.clearInterval(interval)
                                router.push({
                                    pathname: PATH_PAY_FAIL,
                                    query: { transaction_id: router?.query?.transaction_id, status: `tran_error` },
                                })
                            } else {
                                setLoadingSubmit(true)
                            }
                        } else {
                            setLoadingSubmit(false)
                            window.clearInterval(interval)
                            showMessage('error', res.message)
                        }
                    })
                    .catch((err) => {
                        window.clearInterval(interval)
                        setLoadingSubmit(false)
                        console.log(err)
                    })
            } else {
                window.clearInterval(interval)
                setLoadingSubmit(false)
                showMessage(
                    'error',
                    t(`notification:Hệ thống vẫn chưa nhận được thông tin giao dịch của bạn`) +
                        '\n' +
                        t(
                            `notification:Vui lòng quét mã QR để thanh toán đơn hàng hoặc liên hệ Hotline để được hỗ trợ`,
                            { hotline: VNTRIP_INFO.hotline }
                        )
                )
            }
        }, 3000)
    }
    return (
        <LayoutCheckout>
            <Spin spinning={isLoading}>
                <section className="checkoutLayout">
                    <HeaderCheckout step={3} type={orderType} />

                    <div className="checkoutLayout__body">
                        <div className="container">
                            <h4 className={`text-center mb30`}>
                                {t(`Vui lòng mở app ZaloPay quét mã QR Code để thanh toán!`)}
                            </h4>
                            {qrCode && <img style={{ margin: 'auto', display: 'block' }} src={qrCode} alt={`qrCode`} />}
                            <div className="form-transfer__btn text-center mt30">
                                <Button type="primary" onClick={handleSubmit} loading={loadingSubmit}>
                                    <span>{t('Tôi đã thanh toán xong')}</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </Spin>
        </LayoutCheckout>
    )
}
export default PayZaloWallet
