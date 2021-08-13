import React from 'react'
import { useTranslation } from 'react-i18next'
import { Menu, Dropdown } from 'antd'
import { IconVietnamese, IconEnglish, IconDown } from '../../constants/icons'

const ChangeLanguage = () => {
    const { i18n } = useTranslation('common')
    const handleChangeLanguage = (lang: 'vi' | 'en') => {
        i18n.changeLanguage(lang)
    }

    const menuLanguage = (
        <Menu selectedKeys={[i18n.language]}>
            <Menu.Item key="vi">
                <button
                    className="language__link"
                    onClick={() => {
                        handleChangeLanguage('vi')
                    }}
                >
                    <IconVietnamese />
                    <span>Tiếng Việt</span>
                </button>
            </Menu.Item>
            <Menu.Item key="en">
                <button
                    className="language__link"
                    onClick={() => {
                        handleChangeLanguage('en')
                    }}
                >
                    <IconEnglish />
                    <span>English</span>
                </button>
            </Menu.Item>
        </Menu>
    )

    return (
        <div className="dropdown language">
            <Dropdown
                overlay={menuLanguage}
                trigger={['click']}
                getPopupContainer={(trigger: any) => trigger.parentNode}
            >
                <button className="dropdown-toggle">
                    {i18n.language === 'vi' ? <IconVietnamese /> : <IconEnglish />}
                    <span>{i18n.language === 'vi' ? 'Tiếng Việt' : 'English'}</span>
                    <IconDown />
                </button>
            </Dropdown>
        </div>
    )
}

export default ChangeLanguage
