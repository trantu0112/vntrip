import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { withAuth } from '../../utils/custom-hoc'
import { getListCoupon } from '../../api/user-services'

const Layout = dynamic(() => import('../../components/layout/Layout'))
const ProfileNavbar = dynamic(() => import('../../components/user/ProfileNavbar'))

const MyCoupon = () => {
    useEffect(() => {
        async function fetchCoupon() {
            try {
                const res = await getListCoupon()
                if (res.status === 'success' && Array.isArray(res.data.coupon_codes)) {
                }
            } catch (e) {
                throw e
            }
        }

        fetchCoupon()
    }, [])

    return (
        <Layout>
            <section className="profileWrapper">
                <div className="container">
                    <ProfileNavbar />
                    Coupon
                </div>
            </section>
        </Layout>
    )
}

export async function getStaticProps() {
    return {
        props: {},
    }
}

export default withAuth()(MyCoupon)
