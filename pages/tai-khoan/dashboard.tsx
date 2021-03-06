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
                                                <p className="mb0">{t('ID Th??nh vi??n')}</p>
                                            </div>
                                            <div className="d-block">
                                                <p className="semibold mb0 text-right">{membershipInfo?.member_id}</p>
                                            </div>
                                        </div>
                                        <div className="profileBox__line">
                                            <div className="d-block">
                                                <p className="mb0">{t('H???ng hi???n t???i')}</p>
                                            </div>
                                            <div className="d-block">
                                                <p className="semibold mb0 text-right">{membershipInfo?.level_name}</p>
                                            </div>
                                        </div>
                                        <div className="profileBox__line">
                                            <div className="d-block">
                                                <p className="mb0">{t('Ho??n ti???n kh??? d???ng')}</p>
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
                                                            ? `${t('H???t h???n v??o')} ${moment(
                                                                  membershipInfo?.next_expiring_points?.expired_at
                                                              ).format('DD/MM/YYYY')}`
                                                            : ''}
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        <div className="profileBox__line">
                                            <div className="d-block">
                                                <p className="mb0">{t('T???ng ti???n ???? t??ch lu???')}</p>
                                            </div>
                                            <div className="d-block">
                                                <p className="semibold mb0 text-right">
                                                    <DisplayPrice price={membershipInfo?.total_gained_point} />
                                                </p>
                                            </div>
                                        </div>
                                        <div className="profileBox__line">
                                            <div className="d-block">
                                                <p className="mb0">{t('T???ng ti???n ???? s??? d???ng')}</p>
                                            </div>
                                            <div className="d-block">
                                                <p className="semibold mb0 text-right">
                                                    <DisplayPrice price={membershipInfo?.used_point} />
                                                </p>
                                            </div>
                                        </div>
                                        <div className="profileBox__line">
                                            <div className="d-block">
                                                <p className="mb0">{t('Ti???n ???? h???t h???n')}</p>
                                            </div>
                                            <div className="d-block">
                                                <p className="semibold mb0 text-right">
                                                    <DisplayPrice price={membershipInfo?.expired_point} />
                                                </p>
                                            </div>
                                        </div>
                                        <div className="profileBox__line">
                                            <div className="d-block">
                                                <p className="mb0">{t('Ti???n ??ang ch???')} *</p>
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
                                                        'Ti???n ??ang ch??? c???a qu?? kh??ch s??? kh??? d???ng khi nh???ng ho???t ?????ng nh???n ho??n ti???n ???????c ph?? duy???t'
                                                    )}
                                                    .
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="profileBox__link">
                                        <Link href={PATH_USER.ACTIVITY}>
                                            <a className="btnLink w100 d-block">
                                                <span>{t('Xem l???ch s??? ho??n ti???n v?? ti??u ti???n')}</span>
                                            </a>
                                        </Link>

                                        {/*<a className="btnLink w100 d-block">*/}
                                        {/*    <span>Vntrip ?????i th?????ng</span>*/}
                                        {/*</a>*/}
                                    </div>
                                </div>
                                <div className="profileBox">
                                    {/* a B??nh b???o ???n */}
                                    {/*<div className="accumText">*/}
                                    {/*    <p className="p1">*/}
                                    {/*        <IconReward />*/}
                                    {/*        <strong className="pl5">{t('T??ch l??y h???ng ph??ng')}</strong>*/}
                                    {/*    </p>*/}
                                    {/*    <progress value={roomNight} max={10} />*/}
                                    {/*    <p className="p2">*/}
                                    {/*        {t('B???n ??ang c??')}&nbsp;*/}
                                    {/*        <strong>*/}
                                    {/*            {roomNight}/10 {t('hotel:????ms')}*/}
                                    {/*        </strong>*/}
                                    {/*        , {t('t??ch l??y th??m ????? nh???n')}&nbsp;*/}
                                    {/*        <strong>{t('1 ????m mi???n ph??')}</strong>*/}
                                    {/*    </p>*/}
                                    {/*</div>*/}
                                    <div className="profileBox__link">
                                        <Link href={PATH_USER.VOUCHER}>
                                            <a className="btnLink w100 d-block">
                                                <span>
                                                    {t('B???n ??ang c??')} {couponAvail.length} coupon {t('ch??a s??? d???ng')}
                                                </span>
                                            </a>
                                        </Link>
                                        <a
                                            target="_blank"
                                            href="https://policy.vntrip.vn/dieukhoansudung"
                                            className="btnLink w100 d-block"
                                        >
                                            <span>{t('Th??? l??? ch????ng tr??nh')}</span>
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
