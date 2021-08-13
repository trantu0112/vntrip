import React, { useEffect, useState } from 'react'
import moment from 'moment'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { setLoading } from '../../store/common/action'
import { membershipActivity } from '../../api/user-services'
import DisplayPrice from '../common/DisplayPrice'
import { PATH_USER } from '../../constants/common'

interface Props {
    isFullColumns?: boolean
}

const ListMemberShipActivity: React.FC<Props> = ({ isFullColumns }) => {
    const dispatch = useDispatch()
    const { t } = useTranslation(['user'])
    const [listActivity, setListActivity] = useState<any[]>([])

    useEffect(() => {
        async function fetchData() {
            try {
                dispatch(setLoading(true))
                const res = await membershipActivity()
                dispatch(setLoading(false))
                if (res.status === 'success') {
                    setListActivity(res.data)
                }
            } catch (e) {
                dispatch(setLoading(false))
                throw e
            }
        }
        fetchData()
    }, [])

    const renderType = (type: string) => {
        switch (type) {
            case 'CREDIT':
                return t('Hoàn tiền từ đơn hàng')
            case 'DEBIT':
                return t('Tiêu tiền cho đơn hàng')
            default:
                return ''
        }
    }

    const renderStatus = (status: string) => {
        switch (status) {
            case 'PENDING':
                return t('Chờ duyệt')
            case 'POSTED':
                return t('Đã duyệt')
            case 'EXPIRED':
                return t('Đã hết hạn')
            case 'CANCELLED':
                return t('Đã hủy')
            default:
                return ''
        }
    }
    const renderColorText = (status: string) => {
        switch (status) {
            case 'PENDING':
                return 'yellow-1'
            case 'POSTED':
                return 'green-1'
            case 'EXPIRED':
                return 'red-1'
            case 'CANCELLED':
                return 'gray-5'
            default:
                return ''
        }
    }

    return (
        <div className="profileBox__table">
            <div className="profileBox__title">
                <span>{t('Hoạt động gần đây')}</span>
                {!isFullColumns && (
                    <Link href={PATH_USER.ACTIVITY}>
                        <a className="btnLink">
                            <span>{t('Xem tất cả')}</span>
                        </a>
                    </Link>
                )}
            </div>

            <div className="vntTable">
                <div className="vntTable__header">
                    <div className="vntTable__cell">
                        <p className="mb0 semibold">{t('Ngày tạo')}</p>
                    </div>
                    <div className="vntTable__cell">
                        <p className="mb0 semibold">{t('Trạng thái')}</p>
                    </div>
                    <div className="vntTable__cell">
                        <p className="mb0 semibold">{t('Mô tả')}</p>
                    </div>
                    <div className="vntTable__cell">
                        <p className="mb0 semibold">{t('Giá trị')}</p>
                    </div>
                    {isFullColumns && (
                        <>
                            <div className="vntTable__cell">
                                <p className="mb0 semibold">{t('Số dư')}</p>
                            </div>
                            <div className="vntTable__cell">
                                <p className="mb0 semibold">{t('Hết hạn')}</p>
                            </div>
                            <div className="vntTable__cell">
                                <p className="mb0 semibold">{t('Tham chiếu')}</p>
                            </div>
                            <div className="vntTable__cell">
                                <p className="mb0 semibold">{t('Ngày duyệt')}</p>
                            </div>
                        </>
                    )}
                </div>
                <div className="vntTable__body">
                    {Array.isArray(listActivity) &&
                        listActivity.slice(0, isFullColumns ? listActivity.length : 5).map((item) => {
                            return (
                                <div className="vntTable__row" key={item.id}>
                                    <div className="vntTable__cell">
                                        <p className="vntTable__titleMobile">{t('Ngày tạo')}</p>
                                        <p className="mb0">{moment(item.created_at).format('DD/MM/YYYY')}</p>
                                    </div>
                                    <div className="vntTable__cell">
                                        <p className="vntTable__titleMobile">{t('Trạng thái')}</p>
                                        <p className={`mb0 ${renderColorText(item.status)}`}>
                                            {renderStatus(item.status)}
                                        </p>
                                    </div>
                                    <div className="vntTable__cell">
                                        <p className="vntTable__titleMobile">{t('Mô tả')}</p>
                                        <p className="mb0">{renderType(item.type)}</p>
                                    </div>
                                    <div className="vntTable__cell">
                                        <p className="vntTable__titleMobile">{t('Giá trị')}</p>
                                        <p className="mb0 yellow-1">
                                            <DisplayPrice
                                                price={
                                                    item.type === 'CREDIT' ? item.available_value : item.redeemed_value
                                                }
                                            />
                                        </p>
                                    </div>

                                    {isFullColumns && (
                                        <>
                                            {/*<div className="vntTable__cell">*/}
                                            {/*    <p className="vntTable__titleMobile">{t('Số dư')}</p>*/}
                                            {/*    <p className="mb0">*/}
                                            {/*        <DisplayPrice price={item.total_available_balance} />*/}
                                            {/*    </p>*/}
                                            {/*</div>*/}
                                            <div className="vntTable__cell">
                                                <p className="vntTable__titleMobile">{t('Hết hạn')}</p>
                                                <p className="mb0">
                                                    {item.expired_at
                                                        ? moment(item.expired_at).format('DD/MM/YYYY')
                                                        : ''}
                                                </p>
                                            </div>
                                            <div className="vntTable__cell">
                                                <p className="vntTable__titleMobile">{t('Tham chiếu')}</p>
                                                <p className="mb0">{item.order_number}</p>
                                            </div>
                                            <div className="vntTable__cell">
                                                <p className="vntTable__titleMobile">{t('Ngày duyệt')}</p>
                                                <p className="mb0">
                                                    {item.posted_at ? moment(item.posted_at).format('DD/MM/YYYY') : ''}
                                                </p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            )
                        })}
                </div>
            </div>
        </div>
    )
}

export default ListMemberShipActivity
