import React, { useEffect, useState } from 'react'
import dynamic from 'next/dist/next-server/lib/dynamic'
import { getDeals } from '../../api/common-services'
import { useRouter } from 'next/router'
import { Pagination } from 'antd'
import * as queryString from 'query-string'
const Layout = dynamic(() => import('../../components/layout/Layout'))
const VoucherItem = dynamic(() => import('../../components/voucher/VoucherItem'))

const Voucher = () => {
    const router = useRouter()
    const [listDeal, setListDeal] = useState<any>([])
    const [total, setTotal] = useState<number>(0)
    const [page, setPage] = useState<number>(1)

    useEffect(() => {
        const fetchDeals = async () => {
            try {
                const page = router.query.page ? Number(router.query.page) : 1

                let params = {
                    page_size: 10,
                    page,
                    deal_type: 'voucher',
                }
                const result = await getDeals(params)
                if (result.status === 'success') {
                    setListDeal(result.data)
                    setTotal(result.paging.total)
                }
            } catch (e) {
                throw e
            }
        }
        fetchDeals()
    }, [])

    const handleChangePaging = async (_page: number) => {
        const new_query: any = { ...router.query, page: _page }
        const stringify = queryString.stringify(new_query, { encode: false, skipNull: true }) // build query string
        await router.push(`${router.pathname}${stringify ? '?' : ''}${stringify}`, undefined, { shallow: true })
    }
    return (
        <Layout canonical={process.env.NEXT_PUBLIC_ROOT_DOMAIN + '/voucher'}>
            <section className="voucherList hotDeal">
                <div className="container">
                    <div className="listDeal">
                        {listDeal.map((deal: any) => {
                            return <VoucherItem key={deal.id} data={deal} />
                        })}
                    </div>
                    <ul className="pagination">
                        <Pagination
                            current={page || 1}
                            pageSize={10}
                            total={total}
                            showSizeChanger={false}
                            onChange={handleChangePaging}
                        />
                    </ul>
                </div>
            </section>
        </Layout>
    )
}

export default Voucher
