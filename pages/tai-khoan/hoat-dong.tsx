import React from 'react'

import dynamic from 'next/dynamic'
import { withAuth } from '../../utils/custom-hoc'

const Layout = dynamic(() => import('../../components/layout/Layout'))
const ProfileNavbar = dynamic(() => import('../../components/user/ProfileNavbar'))
const ListMemberShipActivity = dynamic(() => import('../../components/user/ListMemberShipActivity'))

const MyActivity = () => {
    return (
        <Layout>
            <section className="profileWrapper">
                <div className="container">
                    <ProfileNavbar />
                    <div className="profileRecent">
                        <div className="profileBox">
                            <ListMemberShipActivity isFullColumns={true} />
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default withAuth()(MyActivity)
