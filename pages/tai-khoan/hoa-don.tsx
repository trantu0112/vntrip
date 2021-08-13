import React from 'react'
import dynamic from 'next/dynamic'
import { withAuth } from '../../utils/custom-hoc'

const Layout = dynamic(() => import('../../components/layout/Layout'))
const ProfileNavbar = dynamic(() => import('../../components/user/ProfileNavbar'))

const MyInvoice = () => {
    return (
        <Layout>
            <section className="profileWrapper">
                <div className="container">
                    <ProfileNavbar />
                    Invoice
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

export default withAuth()(MyInvoice)
