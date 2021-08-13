import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import {
    getLoyaltyDiscountByOrderId,
    getLoyaltyInfoByOrderId,
    getLoyaltyRedemptionByOrderId,
    getOrderDetailByPinCode,
} from '../../api/order-services'
import moment from 'moment'
import BookingDetail from '../../components/order/BookingDetail'
import { Alert } from 'antd'
import Link from 'next/link'

const bookingLookupDetail = () => {
    const router = useRouter()
    const { t } = useTranslation(['common', 'hotel'])
    const [data, setData] = useState<any>([])
    const [dataLoyaltyRedem, setDataLoyaltyRedem] = useState<any>(null)
    const [dataLoyaltyDiscount, setDataLoyaltyDiscount] = useState<any>(null)
    const [dataLoyaltyInfo, setDataLoyaltyInfo] = useState<any>(null)
    const [images, setImages] = useState<any[]>([])
    const [hotel, setHotel] = useState<any>(null)
    const [isOpenInfoMobile, setIsOpenInfoMobile] = useState<boolean>(false)
    const [isShowPaymentLink, setIsShowPaymentLink] = useState<boolean>(false)
    const refreshTime = useSelector((state: any) => state.common.refreshTime)

    const openInfoMobile = () => {
        setIsOpenInfoMobile(true)
    }

    const closeInfoMobile = () => {
        setIsOpenInfoMobile(false)
    }

    useEffect(() => {
        const pinCode = Number(router.query.pin_code)
        const orderCode = router.query.order_code
        const source = router.query.source

        if (pinCode && orderCode && source) {
            fetchData(pinCode, orderCode, source)
        }
    }, [refreshTime, router.query])

    async function fetchData(pinCode: any, orderCode: any, source: any) {
        try {
            const res = await getOrderDetailByPinCode(pinCode, orderCode, source)
            if (res.status === 'success') {
                console.log(res)
                // fetchLoyaltyRedemptionByOrderId(res.data.id)
                // fetchLoyaltyDiscountByOrderId(res.data.id)
                // fetchDataLoyal(res.data.id)

                setData(res.data)
                const { order_item_hotel_data: orderItem } = res.data
                if (Array.isArray(orderItem) && orderItem.length > 0) {
                    setImages(orderItem[0].hotel_images)
                    setHotel(orderItem[0].hotel_extra_data)

                    // order trạng thái pending payment và trước ngày check in thì show link thanh toán (step2)
                    setIsShowPaymentLink(
                        res.data.order_status === 'order_pending_payment' &&
                            moment().isBefore(moment(orderItem[0].check_in_date))
                    )
                }
            }
        } catch (e) {
            console.log('errorrrrr', e)
            throw e
        }
    }

    async function fetchDataLoyal(orderId: number) {
        try {
            const res = await getLoyaltyInfoByOrderId(orderId)
            if (res.status === 'success') {
                setDataLoyaltyInfo(res.data)
            }
        } catch (e) {
            throw e
        }
    }

    const fetchLoyaltyRedemptionByOrderId = async (orderId: number) => {
        try {
            const res = await getLoyaltyRedemptionByOrderId(orderId)
            if (res && res.status === 'success') {
                setDataLoyaltyRedem(res.data)
            }
        } catch (e) {
            throw e
        }
    }

    const fetchLoyaltyDiscountByOrderId = async (orderId: number) => {
        try {
            const res = await getLoyaltyDiscountByOrderId(orderId)
            if (res && res.status === 'success') {
                setDataLoyaltyDiscount(res.data)
            }
        } catch (e) {
            throw e
        }
    }

    const orderItem = data?.order_item_hotel_data?.[0]
    console.log(data)
    return (
        <>
            <Layout>
                <section className="profileWrapper">
                    <div className="container">
                        <ul className="breadcrumb">
                            <li>
                                <a href="/">
                                    <span>Trang chủ</span>
                                </a>
                            </li>
                            <li>
                                <a href="/tra-cuu-don-hang">
                                    <span>Tra cứu đơn hàng</span>
                                </a>
                            </li>
                            <li className="active">Chi tiết đơn hàng</li>
                        </ul>

                        {data ? (
                            data.order_type === 'hotel' ? (
                                <BookingDetail
                                    hotel={hotel}
                                    images={images}
                                    openInfoMobile={openInfoMobile}
                                    data={data}
                                    dataLoyaltyInfo={dataLoyaltyInfo}
                                    dataLoyaltyRedem={dataLoyaltyRedem}
                                    isShowPaymentLink={isShowPaymentLink}
                                    orderItem={orderItem}
                                    dataLoyaltyDiscount={dataLoyaltyDiscount}
                                    isOpenInfoMobile={isOpenInfoMobile}
                                    closeInfoMobile={closeInfoMobile}
                                    cancelOrderToken={data?.cancel_order_token}
                                />
                            ) : (
                                ''
                            )
                        ) : (
                            <>
                                <Alert
                                    message="Đơn hàng không tồn tại!"
                                    description="Vui lòng kiểm tra lại thông tin đơn hàng."
                                    type="warning"
                                    style={{ marginBottom: 10 }}
                                />
                                <Link href="/tra-cuu-don-hang">
                                    <a className="btn btn_orange">Quay lại</a>
                                </Link>
                            </>
                        )}
                    </div>
                </section>
            </Layout>
        </>
    )
}

export async function getStaticProps() {
    return {
        props: {},
    }
}

export default bookingLookupDetail
