import React, { useEffect, useState } from 'react'
import { getOrderDetailByUser } from '../../../api/order-services'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import OrderDetailFlightComponent from '../../../components/common/OrderDetailFlight'

const Layout = dynamic(() => import('../../../components/layout/Layout'))
const ProfileNavbar = dynamic(() => import('../../../components/user/ProfileNavbar'))

const OrderDetailFlight = () => {
    const router = useRouter()
    const [dataOrder, setDataOrder] = useState<any>(null)
    useEffect(() => {
        let orderId = router.query.id
        if (orderId) {
            fetchData(orderId)
        }
        async function fetchData(orderId: any) {
            try {
                const res = await getOrderDetailByUser(orderId)
                if (res.status === 'success' && res.data) {
                    setDataOrder(res.data)
                }
            } catch (e) {
                throw e
            }
        }
    }, [])
    return (
        <Layout>
            <section className="profileWrapper">
                <div className="container">
                    <ProfileNavbar />
                    <OrderDetailFlightComponent dataOrder={dataOrder} />
                </div>
            </section>
        </Layout>
    )
}

export default OrderDetailFlight
