import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../components/layout/Layout'
import { Input, Form, Button } from 'antd'
import { useRouter } from 'next/router'
import { isEmailValid, isPhoneValid, showMessage } from '../../utils/common'
import { useTranslation } from 'react-i18next'
import { getOrderDetailByPinCode } from '../../api/order-services'
import BookingDetail from '../../components/order/BookingDetail'
import OrderDetailComboComponent from '../../components/common/OrderDetailCombo'
import OrderDetailFlightComponent from '../../components/common/OrderDetailFlight'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { setLoading } from '../../store/common/action'

const bookingLookup = () => {
    const { t } = useTranslation(['notification', 'error'])
    const dispatch = useDispatch()
    const router = useRouter()
    const [pinCode, setPinCode] = useState(null)
    const [orderCode, setOrderCode] = useState(null)
    const [email, setEmail] = useState<any>()
    const [dataOrder, setDataOrder] = useState<any>()
    const [isLoadingBtn, setIsLoadingBtn] = useState<boolean>(false)
    const [validateOrderCode, setValidateOrderCode] = useState<any>({ status: 'success', text: '' })
    const [validatePinCode, setValidatePinCode] = useState<any>({ status: 'success', text: '' })
    const [validateEmailOrPhone, setValidateEmailOrPhone] = useState<any>({ status: 'success', text: '' })
    const [isOpenInfoMobile, setIsOpenInfoMobile] = useState<boolean>(false)
    const [isShowPaymentLink, setIsShowPaymentLink] = useState<boolean>(false)
    useEffect(() => {
        setLoading(true)
        if (router.query.pin_code && router.query.order_code && router.query.source) {
            fectData(router.query.pin_code, router.query.order_code, router.query.source)
        } else {
            dispatch(setLoading(false))
        }
    }, [router.query])
    const openInfoMobile = () => {
        setIsOpenInfoMobile(true)
    }

    const closeInfoMobile = () => {
        setIsOpenInfoMobile(false)
    }
    const handleClickSubmit = async () => {
        if (!orderCode) {
            setValidateOrderCode({ status: 'error', text: t('Vui lòng nhập mã đơn hàng') })
            return
        }

        if (!email) {
            setValidateEmailOrPhone({ status: 'error', text: t('Vui lòng nhập địa chỉ email hoặc số điện thoại') })
            return
        } else {
            if (isNaN(email * 1)) {
                if (!isEmailValid(email)) {
                    setValidateEmailOrPhone({ status: 'error', text: t('Vui lòng nhập định dạng email') })
                    return
                }
            } else {
                if (!isPhoneValid(email)) {
                    setValidateEmailOrPhone({ status: 'error', text: t('Vui lòng nhập định dạng số điện thoại') })
                    return
                }
            }
        }
        if (!pinCode) {
            setValidatePinCode({ status: 'error', text: t('Vui lòng nhập mã pin') })
            return
        }

        try {
            setIsLoadingBtn(true)
            const res = await getOrderDetailByPinCode(pinCode, orderCode, email)
            setIsLoadingBtn(false)
            if (res.status === 'success') {
                setDataOrder(res['data'])
                setIsShowPaymentLink(
                    res.data.order_status === 'order_pending_payment' &&
                        moment().isBefore(moment(res['data']['order_item_hotel_data'][0].check_in_date))
                )
            } else {
                showMessage('error', t(`error:${res.error_code}`))
            }
        } catch (e) {
            setIsLoadingBtn(false)
            showMessage('error', t('notification:Đã có lỗi xảy ra'))
        }
    }
    async function fectData(pin_code: string | string[], order_code: string | string[], source: string | string[]) {
        try {
            dispatch(setLoading(true))
            const res = await getOrderDetailByPinCode(pin_code, order_code, source)
            dispatch(setLoading(false))
            if (res['status'] === 'error') {
                showMessage('error', t(`error:${res.error_code}`))
            } else {
                setDataOrder(res['data'])
                setIsShowPaymentLink(
                    res.data.order_status === 'order_pending_payment' &&
                        moment().isBefore(moment(res['data']['order_item_hotel_data'][0].check_in_date))
                )
            }
        } catch (e) {
            console.log(e)
            throw e
        }
    }
    return (
        <Layout>
            {!dataOrder ? (
                <section className="homeWrapper">
                    <div className="lookUpOrder">
                        <div className="lookUpOrder__form">
                            <h2>Tra cứu đơn hàng</h2>
                            <Form layout={'vertical'}>
                                <Form.Item
                                    label={t('Mã đơn hàng')}
                                    validateStatus={validateOrderCode.status}
                                    help={validateOrderCode.text}
                                    className={'form-group'}
                                >
                                    <Input
                                        type="text"
                                        placeholder={t('Nhập mã đơn hàng')}
                                        className="form-control"
                                        onChange={(event: any) => {
                                            setOrderCode(event.target.value)
                                            setValidateOrderCode({ status: 'success', text: '' })
                                        }}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label={t('Email hoặc số điện thoại')}
                                    validateStatus={validateEmailOrPhone.status}
                                    help={validateEmailOrPhone.text}
                                    className={'form-group'}
                                >
                                    <Input
                                        type="text"
                                        placeholder={t('Nhập email hoặc số điện thoại')}
                                        className="form-control"
                                        onChange={(event: any) => {
                                            setEmail(event.target.value)
                                            setValidateEmailOrPhone({ status: 'success', text: '' })
                                        }}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label={t('Mã PIN')}
                                    validateStatus={validatePinCode.status}
                                    help={validatePinCode.text}
                                    className={'form-group'}
                                >
                                    <Input
                                        type="text"
                                        placeholder="Nhập mã PIN"
                                        className="form-control"
                                        onChange={(event: any) => {
                                            setPinCode(event.target.value)
                                            setValidatePinCode({ status: 'success', text: '' })
                                        }}
                                    />
                                </Form.Item>
                            </Form>
                            <div className="lookUpOrder__btn">
                                <Button loading={isLoadingBtn} type={'primary'} onClick={handleClickSubmit}>
                                    Tra cứu đơn hàng
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <div className="profileWrapper">
                    <div className={'container'}>
                        {dataOrder['order_type'] === 'hotel' ? (
                            <BookingDetail
                                hotel={dataOrder['order_item_hotel_data'][0]['hotel_extra_data']}
                                images={dataOrder['order_item_hotel_data'][0]['hotel_images']}
                                openInfoMobile={openInfoMobile}
                                data={dataOrder}
                                isShowPaymentLink={isShowPaymentLink}
                                orderItem={dataOrder['order_item_hotel_data'][0]}
                                isOpenInfoMobile={isOpenInfoMobile}
                                closeInfoMobile={closeInfoMobile}
                                cancelOrderToken={dataOrder?.cancel_order_token}
                            />
                        ) : (
                            ''
                        )}
                        {dataOrder['order_type'] === 'flight' ? (
                            <section className="profileWrapper">
                                <div className="container">
                                    <OrderDetailFlightComponent dataOrder={dataOrder} />
                                </div>
                            </section>
                        ) : (
                            ''
                        )}
                        {dataOrder['order_type'] === 'combo' ? (
                            <section className="profileWrapper">
                                <div className="container">
                                    <OrderDetailComboComponent
                                        dataCombo={dataOrder}
                                        hotel={dataOrder['order_item_hotel_data'][0]['hotel_extra_data']}
                                        images={dataOrder['order_item_hotel_data'][0]['hotel_images']}
                                    />
                                </div>
                            </section>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            )}
        </Layout>
    )
}

export async function getStaticProps() {
    return {
        props: {},
    }
}

export default bookingLookup
