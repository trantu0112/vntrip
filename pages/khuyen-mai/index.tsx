import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { IconFilter, IconSort } from '../../constants/icons'
import { useRouter } from 'next/router'
import { useMounted, useUserInfo } from '../../utils/custom-hook'
import { toggleFilterDeal, toggleSortDeal, setLoading } from '../../store/common/action'
import { useDispatch } from 'react-redux'
import { PATH_DEAL_LIST } from '../../constants/common'
import { Pagination } from 'antd'
import * as queryString from 'query-string'
import { getDeals } from '../../api/common-services'
import { useTranslation } from 'react-i18next'
import { toggleClassNoScroll } from '../../utils/common'

const Layout = dynamic(() => import('../../components/layout/Layout'))
const DealItem = dynamic(() => import('../../components/deal/DealItem'))
const DealFilter = dynamic(() => import('../../components/deal/DealFilter'))
const DealSort = dynamic(() => import('../../components/deal/DealSort'))

const Deal: React.FC = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const { t } = useTranslation(['common'])
    const [listDeal, setListDeal] = useState<any[]>([])
    const [total, setTotal] = useState<number>(0)
    const [page, setPage] = useState<number>(1)
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const userInfo = useUserInfo()
    const isMounted = useMounted()

    useEffect(() => {
        if (isMounted) {
            setIsLoggedIn(!!userInfo)
        }
    }, [isMounted, userInfo])

    useEffect(() => {
        async function fetchData() {
            try {
                dispatch(setLoading(true))
                const page = router.query.page ? Number(router.query.page) : 1
                const res = await getDeals({ ...router.query, page_size: 10 })
                dispatch(setLoading(false))
                setPage(page)
                if (res.status === 'success') {
                    setListDeal(res.data)
                    setTotal(res.paging.total)
                }
            } catch (e) {
                dispatch(setLoading(false))
                throw e
            }
        }

        fetchData()
    }, [router.pathname, router.query])

    const openPopupSignIn = () => {
        window.location.href = `${process.env.NEXT_PUBLIC_SSO_URL}/login?callbackUrl=${encodeURIComponent(
            window.location.href
        )}`
    }

    const handleChangePaging = (_page: number) => {
        const new_query: any = { ...router.query, page: _page }
        const stringify = queryString.stringify(new_query, { encode: false, skipNull: true }) // build query string
        router.push(`${PATH_DEAL_LIST}${stringify ? '?' : ''}${stringify}`, undefined, { shallow: true })
    }

    const handleClickFilterMobile = () => {
        dispatch(toggleFilterDeal(true)) // open filter on mobilee
    }
    const handleClickSortMobile = () => {
        dispatch(toggleSortDeal(true)) // open sort on mobilee
        toggleClassNoScroll('add') // add class noScroll to fixed layout
    }

    return (
        <Layout
            title={'Khuyến mãi hot - Săn Deal khách sạn giá siêu rẻ | Vntrip.vn'}
            description={
                'Săn khuyến mãi khách sạn & nghỉ dưỡng chưa bao giờ có giá tốt đến thế tại Vntrip.vn, đặt trực tuyến hoặc gọi ngay 0963266688.'
            }
            keyword={'deal khách sạn, khuyến mãi khách sạn'}
            canonical={`${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/khuyen-mai`}
        >
            <section className="dealList">
                <div className="container d-flex mt20">
                    <div className="dealList__left">
                        <DealFilter />
                    </div>
                    <div className="dealList__right">
                        {isLoggedIn ? null : (
                            <div className="alert alert_green">
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                                <a onClick={openPopupSignIn} className="w100 text-center">
                                    {t('Đăng nhập để xem ưu đãi cho thành viên')}
                                </a>
                            </div>
                        )}

                        <DealSort />

                        <div className="listDeal">
                            {listDeal.map((deal) => {
                                return <DealItem key={deal.id} data={deal} />
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
                    <div className="dealList__tab">
                        <ul className="d-flex">
                            <li>
                                <button type="button" className="btnFilter" onClick={handleClickFilterMobile}>
                                    <IconFilter />
                                    <span>{t('Lọc')}</span>
                                </button>
                            </li>
                            <li>
                                <button type="button" className="btnSort" onClick={handleClickSortMobile}>
                                    <IconSort />
                                    <span>{t('Sắp xếp')}</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default Deal
