import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { useMounted, useUserInfo } from '../../utils/custom-hook'
import { useTranslation } from 'react-i18next'
import { toggleSidearMobile } from '../../store/common/action'
import { LIST_ROUTER_MENU_MOBILE, VNTRIP_INFO } from '../../constants/common'
import { IconMail, IconAboutVntrip, IconContact, IconPhone, IconMedal } from '../../constants/icons'
import { getFullName } from '../../utils/user'
import ProfileLink from './ProfileLink'
import LogoutBtn from '../user/LogoutBtn'
import LoginBtn from '../user/LoginBtn'
import RegisterBtn from './RegisterBtn'
import ChangeCurrency from '../common/ChangeCurrency'
import ChangeLanguage from '../common/ChangeLanguage'
import DisplayPrice from '../common/DisplayPrice'

interface Props {}

const MenuMobile: React.FC<Props> = () => {
    const dispatch = useDispatch()
    const { t } = useTranslation(['hotel', 'flight', 'common', 'user'])
    const isOpenSideBar = useSelector((state: any) => state.common.isOpenSideBar)
    const userInfo = useUserInfo()
    const mount = useMounted()
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    useEffect(() => {
        if (mount && userInfo) {
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }
    }, [mount, userInfo])

    const closeSideBar = () => {
        dispatch(toggleSidearMobile(false))
        document.body.classList.remove('noScroll')
    }

    const handleClickLink = ({ link, isOpenNewTab }: any) => () => {
        if (isOpenNewTab) {
            if (typeof window !== 'undefined') {
                window.open(`${link}`)
            }
        } else {
            Router.push({
                pathname: link,
            })
        }
        closeSideBar()
    }

    return (
        <div className={`menuMobile ${isOpenSideBar ? 'open' : ''}`}>
            <div className="menuMobile__cont">
                <div className="menuMobile__header">
                    <div className="menuMobile__avatar">
                        <img src="https://statics.vntrip.vn/images/default-avatar.png" alt="avatar" />
                    </div>
                    <div className="menuMobile__right">
                        {/* menuMobile__btn show before login*/}
                        {!isLoggedIn && (
                            <div className="menuMobile__btn">
                                <LoginBtn btnClass="btn btn_outlineOrange btn_sm formLogin__click" />
                                <RegisterBtn btnClass="btn btn_orange btn_sm formLogin__click" />
                            </div>
                        )}

                        {/* menuMobile__info show after login*/}
                        {isLoggedIn && (
                            <div className="menuMobile__info">
                                <p className="p1">
                                    {t('user:ID Th??nh vi??n')}: <strong>{userInfo?.loyalty?.['member_id']}</strong>
                                </p>
                                <p className="p2">{getFullName(userInfo?.first_name, userInfo?.last_name)}</p>
                                <p className="p3">{userInfo?.loyalty?.level_name}</p>
                                <p className="p4">
                                    {t('user:Ho??n ti???n kh??? d???ng')}:&nbsp;
                                    <strong className={`yellow-1`}>
                                        {' '}
                                        <DisplayPrice price={userInfo?.loyalty?.['available_point']} />
                                    </strong>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="menuMobile__body">
                    {/* Hidden accum text */}

                    {/*{userInfo && (*/}
                    {/*    <ul className="menuMobile__list">*/}
                    {/*        <li>*/}
                    {/*            <div className="accumText">*/}
                    {/*                <p className="p1">*/}
                    {/*                    <IconMedal />*/}
                    {/*                    <strong className="pl5">{t('user:T??ch l??y h???ng ph??ng')}</strong>*/}
                    {/*                </p>*/}
                    {/*                <p className="p2">*/}
                    {/*                    {t('user:B???n ??ang c??')}&nbsp;*/}
                    {/*                    <strong>*/}
                    {/*                        {userInfo?.loyalty?.['room_night'] ? userInfo?.loyalty?.['room_night'] : 0}*/}
                    {/*                        /10&nbsp;*/}
                    {/*                        {t('hotel:????ms')}*/}
                    {/*                    </strong>*/}
                    {/*                    , {t('user:t??ch l??y th??m ????? nh???n')}&nbsp;*/}
                    {/*                    <strong>{t('user:1 ????m mi???n ph??')}</strong>*/}
                    {/*                </p>*/}
                    {/*            </div>*/}
                    {/*        </li>*/}
                    {/*    </ul>*/}
                    {/*)}*/}
                    <ul className="menuMobile__list">
                        {LIST_ROUTER_MENU_MOBILE.map(({ key, label, link, translate, isOpenNewTab, icon: Icon }) => {
                            return (
                                <li key={key}>
                                    <button onClick={handleClickLink({ key, label, link, isOpenNewTab })}>
                                        <Icon />
                                        <span>{t(`${translate}:${label}`)}</span>
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                    {userInfo && (
                        <ul className="menuMobile__list">
                            <ProfileLink />
                        </ul>
                    )}
                    <ul className="menuMobile__list">
                        <li>
                            <ChangeLanguage />
                        </li>
                        <li>
                            <ChangeCurrency />
                        </li>
                    </ul>
                    {/*<ul className="menuMobile__list">*/}
                    {/*    <li>*/}
                    {/*        <div className="checkbox">*/}
                    {/*            <input id="lastPrice" type="checkbox" />*/}
                    {/*            <label htmlFor="lastPrice">*/}
                    {/*                {t('Xem gi?? cu???i')}&nbsp;*/}
                    {/*                <i className="size-12">({t('Bao g???m ph?? d???ch v??? kh??ch s???n')})</i>*/}
                    {/*            </label>*/}
                    {/*        </div>*/}
                    {/*    </li>*/}
                    {/*</ul>*/}
                    <ul className="menuMobile__list">
                        <li>
                            <Link href={'/ve-vntrip'}>
                                <a onClick={closeSideBar} href="/#">
                                    <IconAboutVntrip />
                                    <span>{t('common:V??? Vntrip')}</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/lien-he'}>
                                <a onClick={closeSideBar} href="/#">
                                    <IconContact />
                                    <span>{t('common:Li??n h???')}</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <a href={`mailto:${VNTRIP_INFO.email}`}>
                                <IconMail />
                                <span>{VNTRIP_INFO.email}</span>
                            </a>
                        </li>
                        <li>
                            <a href={`tel:${VNTRIP_INFO.hotline}`}>
                                <IconPhone />
                                <span>{VNTRIP_INFO.hotline}</span>
                            </a>
                        </li>
                    </ul>
                    {userInfo ? (
                        <ul className="menuMobile__list">
                            <li>
                                <div className="menuMobile__logout">
                                    <LogoutBtn btnClass="btn_orange btn_sm w100" />
                                </div>
                            </li>
                        </ul>
                    ) : null}
                </div>
            </div>
            <div
                className="menuMobile__backdrop"
                onClick={closeSideBar}
                onKeyUp={closeSideBar}
                role={'button'}
                tabIndex={0}
            />
        </div>
    )
}

export default MenuMobile
