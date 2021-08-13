import React from 'react'
import { Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { clearUserSession } from '../../utils/user'
import { useAuth } from '../contexts/authContext'
import { useDispatch } from 'react-redux'
import { toggleSidearMobile } from '../../store/common/action'

interface iProps {
    btnClass?: string
}

const LogoutBtn: React.FC<iProps> = ({ btnClass }) => {
    const { t } = useTranslation(['common'])
    const dispatch = useDispatch()
    const auth = useAuth()

    const handleLogOut = () => {
        clearUserSession()
        dispatch(toggleSidearMobile(false)) // close sidebar mobile
        auth.logout()
        document.body.classList.remove('noScroll')
    }

    return (
        <Button type="primary" className={btnClass || ''} onClick={handleLogOut}>
            <span>{t('Đăng xuất')}</span>
        </Button>
    )
}

export default LogoutBtn
