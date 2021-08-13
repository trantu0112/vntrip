import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { setLoading } from '../../store/common/action'
import { PAYMENT_METHODS } from '../../constants/enums'
import { PATH_PAY_FAIL, PATH_PAY_SUCCESS } from '../../constants/common'
import { transactionConfirmation, getOrderByTransactionId } from '../../api/order-services'

const LayoutCheckout = dynamic(() => import('../../components/layout/LayoutCheckout'))
const HeaderCheckout = dynamic(() => import('../../components/checkout-common/HeaderCheckout'))

let intervalGetOrder: any

const ACCEPTED_METHODS = [
    PAYMENT_METHODS['PAYMENT_METHOD_BANK_TRANSFER'],
    PAYMENT_METHODS['PAYMENT_METHOD_CREDIT_CARD'],
    PAYMENT_METHODS['PAYMENT_METHOD_PAY_AT_HOTEL'],
]

const TransactionConfirm = () => {
    const router = useRouter()
    const dispatch = useDispatch()

    useEffect(() => {
        const query = router.query
        const paygate = query.paygate
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

        if (transaction_id) {
            fetchData(transaction_id)
        }

        async function fetchData(transaction_id: string) {
            dispatch(setLoading(true))
            const res = await transactionConfirmation(transaction_id)
            dispatch(setLoading(false))
            if (res.status === 'success') {
                const confirm = res.data
                if (confirm) {
                    const order_type = confirm.order_data.order_type
                    const trans_status = confirm.status
                    // redirect to check-out success
                    if (order_type && order_type.toUpperCase() === 'FLIGHT') {
                        if (trans_status !== 'tran_success') {
                            // query_param.status = 'tran_error'; // api tra ve loi => thong bao khac
                            await router.push(`${PATH_PAY_FAIL}?transaction_id=${transaction_id}&status=tran_error`)
                        } else {
                            await router.push(`/thanh-toan/ve-may-bay/xuat-ve?transaction_id=${transaction_id}`)
                        }
                    } else {
                        // hotel
                        intervalGetOrder = intervalGetPaymenttStatus(transaction_id)
                    }
                } else {
                    await router.push(`${PATH_PAY_FAIL}?transaction_id=${transaction_id}&status=tran_error`)
                }
            } else {
                await router.push(`${PATH_PAY_FAIL}?transaction_id=${transaction_id}&status=tran_error`)
            }
        }
    }, [])

    const intervalGetPaymenttStatus = (transactionId: string) => {
        let countInterval = 0
        return window.setInterval(function () {
            countInterval++
            if (countInterval < 6) {
                getOrderByTransactionId(transactionId)
                    .then((result) => {
                        if (result.status === 'success') {
                            // accepted_methods.includes(res.data.payment_method)
                            // dict.set("orderData", result.data);
                            const paymentMethod: any = result.data.payment_method
                            if (ACCEPTED_METHODS.includes(paymentMethod)) {
                                // bank transfer, creadit card, pay at hotel
                                window.clearInterval(intervalGetOrder)
                                router.push(`${PATH_PAY_SUCCESS}?transaction_id=${transactionId}`)
                            } else {
                                // thanh toan online
                                const orderStatus = result.data.order_status
                                if (orderStatus === 'order_pending_payment') {
                                } else {
                                    // Order không đang ở trạng thái payment pending => không chay interval
                                    window.clearInterval(intervalGetOrder)
                                    dispatch(setLoading(false))
                                    if (orderStatus === 'order_success' || orderStatus === 'order_pending_supplier') {
                                        router.push(`${PATH_PAY_SUCCESS}?transaction_id=${transactionId}`)
                                    } else {
                                        router.push(`${PATH_PAY_SUCCESS}?transaction_id=${transactionId}&status=fail`)
                                    }
                                }
                            }
                        } else {
                            window.clearInterval(intervalGetOrder)
                            dispatch(setLoading(false))
                            router.push(`${PATH_PAY_FAIL}?transaction_id=${transactionId}&status=error`)
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                        window.clearInterval(intervalGetOrder)
                        dispatch(setLoading(false))
                        router.push(`${PATH_PAY_FAIL}?transaction_id=${transactionId}&status=error`)
                    })
            } else {
                window.clearInterval(intervalGetOrder)
                router.push(`${PATH_PAY_FAIL}?transaction_id=${transactionId}&status=error`)
            }
        }, 3000)
    }

    return (
        <LayoutCheckout>
            <section className="checkoutLayout">
                <HeaderCheckout step={3} type={'hotel'} />
            </section>
        </LayoutCheckout>
    )
}

export default TransactionConfirm
