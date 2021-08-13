import React, { useEffect, useState } from 'react'
import dynamic from 'next/dist/next-server/lib/dynamic'
import { withAuth } from '../../../utils/custom-hoc'
import { getLoyaltyInfoByOrderId, getOrderDetailByUser } from '../../../api/order-services'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import OrderDetailComboComponent from '../../../components/common/OrderDetailCombo'
const Layout = dynamic(() => import('../../../components/layout/Layout'))
const ProfileNavbar = dynamic(() => import('../../../components/user/ProfileNavbar'))

const OrderDetailCombo = () => {
    const [images, setImages] = useState<any[]>([])
    const [hotel, setHotel] = useState<any>(null)
    const [dataCombo, setDataCombo] = useState<any>(null)
    const [loyaltyInfo, setLoyaltyInfo] = useState<any>(null)
    const router = useRouter()
    const refreshTime = useSelector((state: any) => state.common.refreshTime)
    const { t } = useTranslation(['common', 'hotel'])

    useEffect(() => {
        const orderId = Number(router.query.id)
        fetchData(orderId)
        fetchDataLoyal(orderId)

        async function fetchData(_id: number) {
            try {
                const res = await getOrderDetailByUser(_id)
                // console.log('---getOrderDetailByUser---', res.data)
                if (res.status === 'success') {
                    setDataCombo(res.data)
                    const { order_item_hotel_data: orderItemHotel } = res.data
                    if (Array.isArray(orderItemHotel) && orderItemHotel.length > 0) {
                        setImages(orderItemHotel[0].hotel_images)
                        setHotel(orderItemHotel[0])
                    }
                }
            } catch (e) {
                throw e
            }
        }

        async function fetchDataLoyal(_id: number) {
            try {
                const res = await getLoyaltyInfoByOrderId(_id)
                if (res.status === 'success') {
                    setLoyaltyInfo(res.data)
                }
            } catch (e) {
                throw e
            }
        }
    }, [refreshTime])

    return (
        <Layout>
            <section className="profileWrapper">
                <div className="container">
                    <ProfileNavbar />
                    <OrderDetailComboComponent
                        dataCombo={dataCombo}
                        hotel={hotel}
                        images={images}
                        loyaltyInfo={loyaltyInfo}
                    />
                </div>
            </section>
        </Layout>
    )
}
export default withAuth()(OrderDetailCombo)
