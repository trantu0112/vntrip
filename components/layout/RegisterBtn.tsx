import React from 'react'
import { useTranslation } from 'react-i18next'

interface iProps {
    btnClass?: string
}

const RegisterBtn: React.FC<iProps> = ({ btnClass }) => {
    const { t } = useTranslation('common')

    const openPopupSignUp = () => {
        window.location.href = `${process.env.NEXT_PUBLIC_SSO_URL}/register?callbackUrl=${encodeURIComponent(
            window.location.href
        )}`
    }

    return (
        <button type="button" className={btnClass || ''} onClick={openPopupSignUp}>
            <span>{t('Đăng ký')}</span>
        </button>
    )
}

export default RegisterBtn
