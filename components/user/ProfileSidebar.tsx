import React from 'react'
import Link from 'next/link'
import { SIDEBAR_PROFILE } from '../../constants/common'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

const ProfileSideBar = () => {
    const router = useRouter()
    const { t } = useTranslation(['user'])
    return (
        <ul className="profileTab">
            {SIDEBAR_PROFILE.map(({ key, path, label, icon: Icon }: any) => {
                return (
                    <li className={router.pathname === path ? 'active' : ''} key={key}>
                        <Link href={path}>
                            <a>
                                <Icon />
                                <span>{t(label)}</span>
                            </a>
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}

export default ProfileSideBar
