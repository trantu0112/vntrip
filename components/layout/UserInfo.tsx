import React from 'react'
import { useTranslation } from 'react-i18next'
import { useUserInfo } from '../../utils/custom-hook'
import { Menu, Dropdown } from 'antd'
import { getFullName } from '../../utils/user'
import { convertPhone } from '../../utils/common'
import { IconReward } from '../../constants/icons'
import DisplayPrice from '../common/DisplayPrice'
import ProfileLink from './ProfileLink'
import LogoutBtn from '../user/LogoutBtn'

const UserInfo = () => {
    const { t } = useTranslation(['user', 'hotel'])
    const userInfo = useUserInfo()
    const menu = (
        <Menu>
            <div className="menuDesktop">
                <div className="menuDesktop__header">
                    <p>
                        <span>{t(`ID Thành viên`)}</span>
                        <strong>{userInfo?.loyalty?.['member_id']}</strong>
                    </p>
                    <p>
                        <span>{t(`Hạng hiện tại`)}</span>
                        <strong>{userInfo?.loyalty?.['level_name']}</strong>
                    </p>
                    <p>
                        <span>{t(`Hoàn tiền khả dụng`)}</span>
                        <strong>
                            <DisplayPrice price={userInfo?.loyalty?.['available_point']} />
                        </strong>
                    </p>
                    {userInfo?.loyalty?.['next_expiring_points'] &&
                    userInfo?.loyalty?.['next_expiring_points']['points'] > 0 ? (
                        <p className="expired">
                            (*) {userInfo?.loyalty?.next_expiring_points.points}
                            {userInfo?.loyalty?.expiring_note}{' '}
                            {userInfo?.loyalty?.expiring_date ? userInfo?.loyalty?.expiring_date : ''}
                        </p>
                    ) : (
                        ''
                    )}
                </div>
                <div className="menuDesktop__body">
                    <ul className="menuDesktop__list">
                        {/* a Bình bảo ẩn */}
                        {/*<li>*/}
                        {/*    <div className="accumText">*/}
                        {/*        <p className="p1">*/}
                        {/*            <IconReward />*/}
                        {/*            <strong className="pl5">{t('Tích lũy hạng phòng')}</strong>*/}
                        {/*        </p>*/}
                        {/*        <progress*/}
                        {/*            value={*/}
                        {/*                userInfo?.loyalty?.['room_night'] ? userInfo?.loyalty?.['room_night'] * 10 : 0*/}
                        {/*            }*/}
                        {/*            max={100}*/}
                        {/*        />*/}
                        {/*        <p className="p2">*/}
                        {/*            {t('Bạn đang có')}&nbsp;*/}
                        {/*            <strong>*/}
                        {/*                {userInfo?.loyalty?.['room_night'] ? userInfo?.loyalty?.['room_night'] : 0}*/}
                        {/*                /10&nbsp;*/}
                        {/*                {t('hotel:đêms')}*/}
                        {/*            </strong>*/}
                        {/*            , {t('tích lũy thêm để nhận')}&nbsp;*/}
                        {/*            <strong>{t('1 đêm miễn phí')}</strong>*/}
                        {/*        </p>*/}
                        {/*    </div>*/}
                        {/*</li>*/}
                        <ProfileLink />
                        <li>
                            <div className="menuDesktop__logout">
                                <LogoutBtn btnClass="btn_orange btn_sm w100" />
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </Menu>
    )

    if (userInfo)
        return (
            <div key={`two`} className={`header__menu dropdown dropdown-open`}>
                <Dropdown
                    overlay={menu}
                    trigger={['click']}
                    placement="bottomRight"
                    arrow={true}
                    getPopupContainer={(trigger: any) => trigger.parentNode}
                >
                    <button type="button" data-toggle="dropdown" className="dropdown-toggle">
                        <img
                            src="https://statics.vntrip.vn/uploads/loyalty_program/20180710_483500_Standardlogo.png"
                            alt={'Standardlogo'}
                        />
                        <p className="mb0 ml10">
                            <span className="span1 semibold">
                                {getFullName(userInfo.first_name, userInfo.last_name) ||
                                    userInfo.email ||
                                    convertPhone(userInfo.phone)}
                            </span>
                            {userInfo?.loyalty?.['available_point'] > 0 && (
                                <span className="span2 d-block size-12">
                                    {userInfo?.loyalty?.['level_name']}&nbsp; (
                                    <DisplayPrice price={userInfo?.loyalty?.['available_point']} />)
                                </span>
                            )}
                        </p>
                    </button>
                </Dropdown>
            </div>
        )
    return null
}

export default UserInfo
