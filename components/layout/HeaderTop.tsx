import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useMounted, useUserInfo } from '../../utils/custom-hook'
import { useTranslation } from 'react-i18next'
import { VNTRIP_INFO } from '../../constants/common'
import { IconHeadPhone, IconLogoBlack, IconSearch } from '../../constants/icons'
import UserInfo from './UserInfo'
import LoginBtn from '../user/LoginBtn'
import RegisterBtn from './RegisterBtn'
import ChangeCurrency from '../common/ChangeCurrency'
import ChangeLanguage from '../common/ChangeLanguage'

interface Props {
    isHome?: boolean
}

const HeaderTop: React.FC<Props> = ({ isHome }) => {
    const { t } = useTranslation('common')
    const userInfo = useUserInfo()
    const isMounted = useMounted()
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

    useEffect(() => {
        if (isMounted) {
            setIsLoggedIn(!!userInfo)
        }
    }, [isMounted, userInfo])

    return (
        <div className="header__top">
            <div className="container">
                {isHome ? (
                    <h1 className="header__logo">
                        <Link href="/" passHref>
                            <a className="logo">
                                {t('Đặt phòng khách sạn - vé máy bay - combo du lịch giá rẻ')}
                                <IconLogoBlack />
                            </a>
                        </Link>
                    </h1>
                ) : (
                    <div className="header__logo">
                        <Link href="/" passHref>
                            <a className="logo">
                                {t('Đặt phòng khách sạn - vé máy bay - combo du lịch giá rẻ')}
                                <IconLogoBlack />
                            </a>
                        </Link>
                    </div>
                )}
                <ul className="header__list">
                    {!userInfo && (
                        <li>
                            <a className={`black-1`} href={`/tra-cuu-don-hang`}>
                                <IconSearch height={10} width={10} />
                                &nbsp;{t('Tra cứu đơn hàng')}
                            </a>
                        </li>
                    )}
                    <li>
                        <a href={`tel:${VNTRIP_INFO.hotline.trim()}`} className="hotline">
                            <IconHeadPhone />
                            <span>{VNTRIP_INFO.hotline}</span>
                        </a>
                    </li>
                    <li>
                        <ChangeCurrency />
                    </li>
                    <li>
                        <ChangeLanguage />
                    </li>
                    <li>
                        {/* header__login show before login*/}
                        {!isLoggedIn && (
                            <div className="header__login">
                                <LoginBtn btnClass={'btnLink formLogin__click'} />
                                <RegisterBtn btnClass="btn btn_orange btn_sm formLogin__click" />
                            </div>
                        )}

                        {/* header__menu show after login*/}
                        <UserInfo />
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default HeaderTop
