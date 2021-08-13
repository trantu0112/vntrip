import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { withAuth } from '../../utils/custom-hoc'
import { getListCoupon, getLoyaltyProgram, getMembershipInfo } from '../../api/user-services'
import { useDispatch } from 'react-redux'
import { setLoading } from '../../store/common/action'
import DisplayPrice from '../../components/common/DisplayPrice'
import moment from 'moment'
import { PATH_USER } from '../../constants/common'
import { IconReward } from '../../constants/icons'
import { useTranslation } from 'react-i18next'
const Layout = dynamic(() => import('../../components/layout/Layout'))
const ProfileNavbar = dynamic(() => import('../../components/user/ProfileNavbar'))
const ListMemberShipActivity = dynamic(() => import('../../components/user/ListMemberShipActivity'))

const MyDashBoard = () => {
    const dispatch = useDispatch()
    const { t } = useTranslation(['user', 'hotel'])
    const [membershipInfo, setMembershipInfo] = useState<any>(null)
    const [roomNight, setRoomNight] = useState<number>(0)
    const [couponAvail, setCouponAvail] = useState<any[]>([])

    useEffect(() => {
        async function fetchLoyalty() {
            try {
                dispatch(setLoading(true))
                const [resProgram, resCoupon] = await Promise.all([getLoyaltyProgram(), getListCoupon()])
                if (resCoupon.status === 'success') {
                    setRoomNight(resCoupon.data.room_nights || 0)
                    if (Array.isArray(resCoupon.data.coupon_codes)) {
                        setCouponAvail(
                            resCoupon.data.coupon_codes.filter((item: any) => item.coupon_status == 'available')
                        )
                    }
                }
                if (resProgram.status === 'success') {
                    const internalProgram = resProgram.data.filter((item: any) => !item['is_third_party'])
                    if (
                        internalProgram.length &&
                        ['ACTIVE', 'SUSPENSION_REQUESTED'].includes(internalProgram[0]['status'])
                    ) {
                        const resInfo = await getMembershipInfo(internalProgram[0]['id'])
                        dispatch(setLoading(false))
                        if (resInfo.status === 'error') {
                            return
                        }
                        setMembershipInfo(resInfo.data)
                    }
                }
            } catch (e) {
                dispatch(setLoading(false))
                throw e
            }
        }
        fetchLoyalty()
    }, [])

    return (
        <Layout>
            <section className="profileWrapper">
                <div className="container">
                    <ProfileNavbar />
                    <div className="profileDasboard">
                        <div className="row">
                            <div className="col-xs-12 col-sm-5 col-lg-4">
                                <div className="profileBox">
                                    <div className="profileBox__cont">
                                        <div className="profileBox__line">
                                            <div className="d-block">
                                                <p className="mb0">{t('ID Thành viên')}</p>
                                            </div>
                                            <div className="d-block">
                                                <p className="semibold mb0 text-right">{membershipInfo?.member_id}</p>
                                            </div>
                                        </div>
                                        <div className="profileBox__line">
                                            <div className="d-block">
                                                <p className="mb0">{t('Hạng hiện tại')}</p>
                                            </div>
                                            <div className="d-block">
                                                <p className="semibold mb0 text-right">{membershipInfo?.level_name}</p>
                                            </div>
                                        </div>
                                        <div className="profileBox__line">
                                            <div className="d-block">
                                                <p className="mb0">{t('Hoàn tiền khả dụng')}</p>
                                            </div>
                                            <div className="d-block">
                                                <p className="semibold mb0 text-right">
                                                    <DisplayPrice price={membershipInfo?.available_point} />
                                                </p>
                                            </div>
                                        </div>
                                        {membershipInfo?.next_expiring_points?.points && (
                                            <div className="profileBox__line">
                                                <div className="d-block">
                                                    <p className="mb0 red-1 text-right">
                                                        (*){' '}
                                                        <DisplayPrice
                                                            price={membershipInfo?.next_expiring_points?.points}
                                                        />{' '}
                                                        {membershipInfo?.next_expiring_points?.expired_at
                                                            ? `${t('Hết hạn vào')} ${moment(
                                                                  membershipInfo?.next_expiring_points?.expired_at
                                                              ).format('DD/MM/YYYY')}`
                                                            : ''}
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        <div className="profileBox__line">
                                            <div className="d-block">
                                                <p className="mb0">{t('Tổng tiền đã tích luỹ')}</p>
                                            </div>
                                            <div className="d-block">
                                                <p className="semibold mb0 text-right">
                                                    <DisplayPrice price={membershipInfo?.total_gained_point} />
                                                </p>
                                            </div>
                                        </div>
                                        <div className="profileBox__line">
                                            <div className="d-block">
                                                <p className="mb0">{t('Tổng tiền đã sử dụng')}</p>
                                            </div>
                                            <div className="d-block">
                                                <p className="semibold mb0 text-right">
                                                    <DisplayPrice price={membershipInfo?.used_point} />
                                                </p>
                                            </div>
                                        </div>
                                        <div className="profileBox__line">
                                            <div className="d-block">
                                                <p className="mb0">{t('Tiền đã hết hạn')}</p>
                                            </div>
                                            <div className="d-block">
                                                <p className="semibold mb0 text-right">
                                                    <DisplayPrice price={membershipInfo?.expired_point} />
                                                </p>
                                            </div>
                                        </div>
                                        <div className="profileBox__line">
                                            <div className="d-block">
                                                <p className="mb0">{t('Tiền đang chờ')} *</p>
                                            </div>
                                            <div className="d-block">
                                                <p className="semibold mb0 text-right">
                                                    <DisplayPrice price={membershipInfo?.pending_point} />
                                                </p>
                                            </div>
                                        </div>
                                        <div className="profileBox__line">
                                            <div className="d-block">
                                                <p className="mb0 size-12 gray-5">
                                                    (*){' '}
                                                    {t(
                                                        'Tiền đang chờ của quý khách sẽ khả dụng khi những hoạt động nhận hoàn tiền được phê duyệt'
                                                    )}
                                                    .
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="profileBox__link">
                                        <Link href={PATH_USER.ACTIVITY}>
                                            <a className="btnLink w100 d-block">
                                                <span>{t('Xem lịch sử hoàn tiền và tiêu tiền')}</span>
                                            </a>
                                        </Link>

                                        {/*<a className="btnLink w100 d-block">*/}
                                        {/*    <span>Vntrip đổi thưởng</span>*/}
                                        {/*</a>*/}
                                    </div>
                                </div>
                                <div className="profileBox">
                                    {/* a Bình bảo ẩn */}
                                    {/*<div className="accumText">*/}
                                    {/*    <p className="p1">*/}
                                    {/*        <IconReward />*/}
                                    {/*        <strong className="pl5">{t('Tích lũy hạng phòng')}</strong>*/}
                                    {/*    </p>*/}
                                    {/*    <progress value={roomNight} max={10} />*/}
                                    {/*    <p className="p2">*/}
                                    {/*        {t('Bạn đang có')}&nbsp;*/}
                                    {/*        <strong>*/}
                                    {/*            {roomNight}/10 {t('hotel:đêms')}*/}
                                    {/*        </strong>*/}
                                    {/*        , {t('tích lũy thêm để nhận')}&nbsp;*/}
                                    {/*        <strong>{t('1 đêm miễn phí')}</strong>*/}
                                    {/*    </p>*/}
                                    {/*</div>*/}
                                    <div className="profileBox__link">
                                        <Link href={PATH_USER.VOUCHER}>
                                            <a className="btnLink w100 d-block">
                                                <span>
                                                    {t('Bạn đang có')} {couponAvail.length} coupon {t('chưa sử dụng')}
                                                </span>
                                            </a>
                                        </Link>
                                        <a
                                            target="_blank"
                                            href="https://policy.vntrip.vn/dieukhoansudung"
                                            className="btnLink w100 d-block"
                                        >
                                            <span>{t('Thể lệ chương trình')}</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-7 col-lg-8">
                                <div className="profileBox">
                                    <ListMemberShipActivity />
                                </div>
                            </div>
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

export default withAuth()(MyDashBoard)
