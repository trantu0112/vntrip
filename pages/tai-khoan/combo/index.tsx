import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { PATH_USER } from '../../../constants/common'
import { IconDonggia, IconFlight, IconHotel } from '../../../constants/icons'
import { Pagination } from 'antd'
import dynamic from 'next/dist/next-server/lib/dynamic'
import { useRouter } from 'next/router'
import * as queryString from 'query-string'
import { setLoading } from '../../../store/common/action'
import { getOrdersByUser } from '../../../api/order-services'
const Layout = dynamic(() => import('../../../components/layout/Layout'))
const ProfileNavbar = dynamic(() => import('../../../components/user/ProfileNavbar'))
const OrderItemCombo = dynamic(() => import('../../../components/order/OrderItemCombo'))

const MyBookingCombo = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const { t } = useTranslation(['common', 'hotel', 'flight'])
    const [listOrder, setListOrder] = useState<any[]>([])
    const [page, setPage] = useState<number>(1)
    const [total, setTotal] = useState<number>(0)

    useEffect(() => {
        async function fetchData(params: any) {
            try {
                dispatch(setLoading(true))
                const res = await getOrdersByUser(params)
                dispatch(setLoading(false))
                if (res.status === 'success') {
                    setListOrder(res.data)
                    setTotal(res.paging.total)
                }
            } catch (e) {
                dispatch(setLoading(false))
                throw e
            }
        }

        // get query from url
        const { page, filter } = router.query
        setPage(page ? Number(page) : 1)
        let params = {
            order_type: 'combo',
            page: page ? Number(page) : 1,
            page_size: 10,
            order_status: '',
            stay_status: '',
        }
        if (filter === 'cancelled') {
            params.order_status = 'order_cancel'
        } else if (filter === 'incoming') {
            params.stay_status = 'order_upcoming'
            delete params.order_status
        } else if (filter === 'arrived') {
            params.stay_status = 'order_departed'
            params.order_status = 'order_success'
        }

        fetchData(params)
    }, [router.pathname, router.query])

    const handleChangeFilter = (value: string) => {
        const new_query: any = { ...router.query, filter: value }
        if (!value) {
            delete new_query.filter
        }
        delete new_query.page
        const stringify = queryString.stringify(new_query, { encode: false, skipNull: true }) // build query string
        router.push(`${PATH_USER.COMBO}${stringify ? '?' : ''}${stringify}`, undefined, { shallow: true })
    }
    const handleChangePaging = (_page: number) => {
        const new_query: any = { ...router.query, page: _page }
        const stringify = queryString.stringify(new_query, { encode: false, skipNull: true }) // build query string
        router.push(`${PATH_USER.COMBO}${stringify ? '?' : ''}${stringify}`, undefined, { shallow: true })
    }
    return (
        <Layout>
            <section className="profileWrapper">
                <div className="container">
                    <ProfileNavbar />
                    <div className="profileOrder profileCombo">
                        <div className="profileOrder__left">
                            <ul className="profileTab">
                                <li>
                                    <Link href={PATH_USER?.HOTEL}>
                                        <a>
                                            <IconHotel />
                                            <span>{t('hotel:Khách sạns')}</span>
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={PATH_USER.FLIGHT}>
                                        <a>
                                            <IconFlight />
                                            <span>{t('flight:Máy bay')}</span>
                                        </a>
                                    </Link>
                                </li>
                                <li className="active">
                                    <Link href={PATH_USER.COMBO}>
                                        <a>
                                            <IconDonggia />
                                            <span>{t('Combo')}</span>
                                        </a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="profileOrder__right">
                            <div className="profileHotel">
                                <div className="profileFilter">
                                    <div className="profileFilter__item">
                                        <p className="mb0 semibold size-16">{t('Lọc theo')}:</p>
                                    </div>
                                    {[
                                        { key: '', label: 'Toàn bộ' },
                                        { key: 'incoming', label: 'Sắp tới' },
                                        { key: 'arrived', label: 'Đã ở' },
                                        { key: 'cancelled', label: 'Đã hủy' },
                                    ].map((item) => {
                                        return (
                                            <div className="profileFilter__item" key={'filter_' + item.key}>
                                                <div className="radio">
                                                    <input
                                                        id={'filter_' + item.key}
                                                        type="radio"
                                                        name="filterBooking"
                                                        checked={
                                                            router.query.filter
                                                                ? router.query.filter === item.key
                                                                : item.key === ''
                                                        }
                                                        value={item.key}
                                                        onChange={(event) => handleChangeFilter(event.target.value)}
                                                    />
                                                    <label htmlFor={'filter_' + item.key}>{t(item.label)}</label>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="profileHotel__body">
                                    {/*include jades/blocks/_hotelAnimated*/}
                                    <div className="listOrder">
                                        {Array.isArray(listOrder) &&
                                            listOrder.length > 0 &&
                                            listOrder.map((res: any) => {
                                                return <OrderItemCombo data={res} key={res.id} />
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
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default MyBookingCombo
