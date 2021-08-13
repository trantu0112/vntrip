import React, { useEffect, useState } from 'react'
import { PATH_FLIGHT_CHECKOUT_STEP2, PATH_PAY_FAIL, PATH_PAY_SUCCESS, VNTRIP_INFO } from '../../../constants/common'
import LayoutCheckout from '../../../components/layout/LayoutCheckout'
import { useTranslation } from 'react-i18next'
import HeaderCheckout from '../../../components/checkout-common/HeaderCheckout'
import { copyToClipboard, getLinkOrderDetail, showMessage } from '../../../utils/common'
import { setLoading } from '../../../store/common/action'
import { transactionConfirmation } from '../../../api/order-services'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
const TransactionConfirmFlight = () => {
    const { t } = useTranslation(['common', 'payment'])
    const [orderLink, setOrderLink] = useState<string>('')
    const dispatch = useDispatch()
    const [orderData, setOrderData] = useState<any>({})
    const [statusTran, setStatusTran] = useState<any>('')
    const router = useRouter()

    useEffect(() => {
        const query = router.query
        const paygate = router.query.slug?.[0]
        let transaction_id: string = ''
        switch (paygate) {
            case '123pay':
                transaction_id = String(query['transactionID'])
                break
            case 'momo':
                transaction_id = String(query['orderId'])
                break
            case 'bankplus':
                transaction_id = String(query['merchant_trans_id'])
                break
            case 'airpay':
                transaction_id = String(query['transaction_id'])
                break
            case 'zalopay':
                transaction_id = String(query['apptransid'])
                break
            case 'lotte':
                transaction_id = String(query['transaction_id'])
                break
            default:
                break
        }
        async function fetchData(transaction_id: string) {
            let countInterval = 0
            dispatch(setLoading(true))
            let intervalGetTransaction = window.setInterval(function () {
                countInterval++
                if (countInterval < 6) {
                    transactionConfirmation(transaction_id)
                        .then((res) => {
                            dispatch(setLoading(false))
                            if (res['status'] === 'error') {
                                window.clearInterval(intervalGetTransaction)
                                router.push(`${PATH_PAY_FAIL}?transaction_id=${transaction_id}&status=tran_error`)
                            } else {
                                if (res['data']['transaction_id']) {
                                    setStatusTran(res['data']['status'])
                                    if (res['data']['status'] === 'tran_success') {
                                        window.clearInterval(intervalGetTransaction)
                                        router.push(
                                            `${PATH_PAY_SUCCESS}?transaction_id=${transaction_id}&status=tran_success`
                                        )
                                    } else if (res['data']['status'] === 'tran_pending' && countInterval === 5) {
                                        window.clearInterval(intervalGetTransaction)
                                        router.push(
                                            `${PATH_FLIGHT_CHECKOUT_STEP2}/${res['data']['order_data']['booking_request_id']}/${res['data']['order_data']['suggestion_id'][0]}`
                                        )
                                    } else if (res['data']['status'] === 'tran_error') {
                                        window.clearInterval(intervalGetTransaction)
                                        router.push(
                                            `${PATH_PAY_FAIL}?transaction_id=${transaction_id}&status=tran_error`
                                        )
                                    } else {
                                    }
                                }
                            }
                        })
                        .catch((err) => {
                            window.clearInterval(intervalGetTransaction)
                            router.push(`${PATH_PAY_FAIL}?transaction_id=${transaction_id}&status=tran_error`)
                        })
                } else {
                    window.clearInterval(intervalGetTransaction)
                    router.push(`${PATH_PAY_FAIL}?transaction_id=${transaction_id}&status=tran_error`)
                }
            }, 3000)
        }
        fetchData(transaction_id).then()
    }, [router])

    const handleClickCopy = (text: string) => {
        copyToClipboard(text)
        showMessage('success', 'Copied to clipboard')
    }
    return (
        <LayoutCheckout>
            <section className="checkoutLayout">
                <HeaderCheckout step={3} type={'hotel'} />
            </section>
        </LayoutCheckout>
    )
}
export default TransactionConfirmFlight
