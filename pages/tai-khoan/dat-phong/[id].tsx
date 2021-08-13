import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Space } from 'antd'
import { withAuth } from '../../../utils/custom-hoc'
import {
    getLoyaltyDiscountByOrderId,
    getLoyaltyInfoByOrderId,
    getLoyaltyRedemptionByOrderId,
    getOrderDetailByUser,
} from '../../../api/order-services'
import { useRouter } from 'next/router'
import { IconClose, IconDownOutline } from '../../../constants/icons'
import { getFullName } from '../../../utils/user'
import { convertMealPlan, converVatAndFee } from '../../../utils/hotel'
import { useTranslation } from 'react-i18next'
import DisplayPrice from '../../../components/common/DisplayPrice'
import RenderStarRate from '../../../components/hotel-list/RenderStarRate'
import RenderRewviewPoint from '../../../components/hotel-list/RenderReviewPoint'
import { useSelector } from 'react-redux'
import { PATH_HOTEL_CHECKOUT_STEP2 } from '../../../constants/common'
import moment from 'moment'
import BookingDetail from '../../../components/order/BookingDetail'

const Layout = dynamic(() => import('../../../components/layout/Layout'))
const ProfileNavbar = dynamic(() => import('../../../components/user/ProfileNavbar'))
const HotelGallery = dynamic(() => import('../../../components/hotel-detail/HotelGallery'))
const HotelAddress = dynamic(() => import('../../../components/common/HotelAddress'))
const OrderInfoHotel = dynamic(() => import('../../../components/order/OrderInfoHotel'))
const CancelBooking = dynamic(() => import('../../../components/order/CancelBooking'))
const ExportInvoice = dynamic(() => import('../../../components/order/ExportInvoice'))

const OrderDetailHotel = () => {
    const router = useRouter()
    const { t } = useTranslation(['common', 'hotel'])
    const [data, setData] = useState<any>(null)
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
        const orderId = Number(router.query.id)
        fetchData(orderId)
        fetchLoyaltyRedemptionByOrderId(orderId)
        fetchLoyaltyDiscountByOrderId(orderId)
        fetchDataLoyal(orderId)
        async function fetchData(_id: number) {
            try {
                const res = await getOrderDetailByUser(_id)
                if (res.status === 'success') {
                    console.log('res: ', res)
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
                throw e
            }
        }
    }, [refreshTime])

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

    return (
        <Layout>
            <section className="profileWrapper">
                <div className="container">
                    <ProfileNavbar />

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
                    />
                </div>
            </section>
        </Layout>
    )
}

export default withAuth()(OrderDetailHotel)
