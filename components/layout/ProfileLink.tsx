import React from 'react'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { toggleSidearMobile } from '../../store/common/action'
import { LIST_LINK_PROFILE } from '../../constants/common'

const ProfileLink = () => {
    const dispatch = useDispatch()
    const { t } = useTranslation(['user'])

    const closeSideBar = () => {
        dispatch(toggleSidearMobile(false))
        document.body.classList.remove('noScroll')
    }

    return (
        <>
            {LIST_LINK_PROFILE.map(({ link, openNewTab, icon, label }) => {
                return (
                    <li key={link}>
                        <Link href={link}>
                            <a target={openNewTab ? '_blank' : ''} onMouseEnter={closeSideBar}>
                                {icon}
                                <span>{t(label)}</span>
                            </a>
                        </Link>
                    </li>
                )
            })}
        </>
    )
}

export default ProfileLink
