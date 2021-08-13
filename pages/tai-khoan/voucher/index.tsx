import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { withAuth } from '../../../utils/custom-hoc'
import { getListVoucher } from '../../../api/user-services'
import Link from 'next/link'
import { PATH_USER } from '../../../constants/common'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import DisplayPrice from '../../../components/common/DisplayPrice'
import moment from 'moment'
import { Pagination } from 'antd'
import * as queryString from 'query-string'

const Layout = dynamic(() => import('../../../components/layout/Layout'))
const ProfileNavbar = dynamic(() => import('../../../components/user/ProfileNavbar'))

const MyVoucher = () => {
    const { t } = useTranslation(['common'])
    const router = useRouter()
    const [listVoucher, setListVoucher] = useState<any>([])
    const [page, setPage] = useState<number>(1)
    const [total, setTotal] = useState<number>(0)
    useEffect(() => {
        async function fetchVoucher() {
            try {
                const res = await getListVoucher()
                if (res.status === 'success') {
                    setListVoucher(res.data.data)
                    setTotal(res?.data?.paging?.total)
                    console.log('data', res)
                }
            } catch (e) {
                throw e
            }
        }
        const { page } = router.query
        setPage(page ? Number(page) : 1)

        fetchVoucher()
    }, [router])

    const handleChangePaging = (_page: number) => {
        const new_query: any = { ...router.query, page: _page }
        const stringify = queryString.stringify(new_query, { encode: false, skipNull: true }) // build query string
        router.push(`${PATH_USER.VOUCHER}${stringify ? '?' : ''}${stringify}`, undefined, { shallow: true })
    }

    return (
        <Layout>
            <section className="profileWrapper">
                <div className="container">
                    <ProfileNavbar />
                    <div className="profileOrder">
                        <div className="profileOrder__right" style={{ display: 'block', width: '100%', padding: 0 }}>
                            <div className="listVoucher">
                                {listVoucher
                                    .filter((voucher: any) => moment(voucher.expiry_date) > moment())
                                    .map((item: any, index: number) => {
                                        return (
                                            <div className="listVoucher__item" key={index}>
                                                <div className="voucherItem">
                                                    <div className="voucherItem__left">
                                                        <p className="size-16 semibold mb10">
                                                            {item.type === 'partner_voucher'
                                                                ? item.metadata.promotion.name
                                                                : item.metadata.campaign_name}
                                                        </p>
                                                        <p className="gray-5">
                                                            HSD: {moment(item.expiry_date).format('DD/MM/YYYY')}
                                                        </p>
                                                        <p className="gray-5">
                                                            {item.type === 'partner_voucher' || item.type === 'coupon'
                                                                ? ''
                                                                : `ID: ${item.metadata.serial}`}
                                                        </p>
                                                    </div>
                                                    <div className="voucherItem__right">
                                                        <div className="d-block">
                                                            {item.type === 'partner_voucher' ||
                                                            item.type === 'coupon' ? (
                                                                ''
                                                            ) : (
                                                                <p className="white-1 mb0 uppercase size-12">
                                                                    {t('common:Giảm')}
                                                                </p>
                                                            )}

                                                            <p className="semibold mb10 white-1 size-18">
                                                                {item.type === 'partner_voucher' ||
                                                                item.type === 'coupon' ? (
                                                                    ''
                                                                ) : (
                                                                    <DisplayPrice price={item.metadata.coupon_value} />
                                                                )}
                                                            </p>
                                                            {item.type === 'partner_voucher' ||
                                                            item.type === 'coupon' ? (
                                                                <a className="btn btn_white btn_sm">
                                                                    <span>{t('common:Không hỗ trợ')}</span>
                                                                </a>
                                                            ) : (
                                                                <Link
                                                                    href={PATH_USER.VOUCHER_DETAIL}
                                                                    as={`${PATH_USER.VOUCHER}/${item.code}`}
                                                                >
                                                                    <a className="btn btn_white btn_sm">
                                                                        <span>{t('common:Chi tiết')}</span>
                                                                    </a>
                                                                </Link>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                            </div>
                            {total ? (
                                <ul className="pagination">
                                    <Pagination
                                        current={page || 1}
                                        pageSize={25}
                                        total={total}
                                        showSizeChanger={false}
                                        onChange={handleChangePaging}
                                    />
                                </ul>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
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

export default withAuth()(MyVoucher)
