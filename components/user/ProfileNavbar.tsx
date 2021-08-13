import React, { useEffect, useState } from 'react'
import { Menu, Dropdown } from 'antd'
import { NAVBAR_PROFILE, PATH_USER } from '../../constants/common'
import { IconDown } from '../../constants/icons'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'

const ProfileNavbar = () => {
    const router = useRouter()
    const { t } = useTranslation(['user'])
    const [selectedLabel, setSelectedLabel] = useState<string>('Dashboard')
    const [selectedKey, setSelectedKey] = useState<string>('dashboard')

    useEffect(() => {
        if ([PATH_USER.CARD].includes(router.pathname)) {
            setSelectedLabel('Thẻ thành viên')
            setSelectedKey('member_card')
        } else {
            const _item = NAVBAR_PROFILE.find((item) => item.activeWith.includes(router.pathname))
            setSelectedLabel(_item ? _item.label : 'Dashboard')
            setSelectedKey(_item ? _item.key : 'Dashboard')
        }
    }, [router.pathname])

    const handleClickMenu = ({ key }: any) => {
        router.push(key)
    }

    const menu = (
        <Menu
            style={{ width: 'auto' }}
            onClick={handleClickMenu}
            selectedKeys={[router.pathname]}
            triggerSubMenuAction={'click'}
        >
            {NAVBAR_PROFILE.map((item) => {
                return <Menu.Item key={item.path}>{item.label}</Menu.Item>
            })}
        </Menu>
    )

    return (
        <div className="profileWrapper__navbar">
            {/* MOBILE */}
            <div className="profileNavbarMobile">
                <Dropdown
                    overlay={menu}
                    trigger={['click']}
                    placement="bottomRight"
                    arrow={true}
                    getPopupContainer={(trigger: any) => trigger.parentNode}
                >
                    <button type="button" className="dropdown-toggle">
                        <span>{t(selectedLabel)}</span>
                        <IconDown />
                    </button>
                </Dropdown>
            </div>

            {/* DESKTOP */}
            <ul className="profileNavbar">
                {NAVBAR_PROFILE.map((item) => {
                    return (
                        <li
                            className={`profileNavbar__item ${selectedKey === item.key ? 'active' : ''}`}
                            key={item.key}
                        >
                            <Link href={item.path}>
                                <a className="profileNavbar__link">
                                    <span>{t(item.label)}</span>
                                </a>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
export default ProfileNavbar
