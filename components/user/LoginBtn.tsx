import React from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
    btnClass?: string
}

const LoginBtn: React.FC<Props> = ({ btnClass }) => {
    const { t } = useTranslation(['common'])

    const openPopupSignIn = () => {
        window.location.href = `${process.env.NEXT_PUBLIC_SSO_URL}/login?callbackUrl=${encodeURIComponent(
            window.location.href
        )}`
    }
    return (
        <button type="button" className="btn btn_outlineOrange btn_sm formLogin__click" onClick={openPopupSignIn}>
            <span>{t('Đăng nhập')}</span>
        </button>
    )
}

export default LoginBtn
