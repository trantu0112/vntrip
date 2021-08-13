import React from 'react'
import { useTranslation } from 'react-i18next'
import { IconSuperBox } from '../../constants/icons'
import { useAuth } from '../contexts/authContext'

const SignInCheckout = () => {
    const { t } = useTranslation(['hotel', 'common'])
    const auth = useAuth()

    const handleOpenPopupSignIn = () => {
        window.location.href = `${process.env.NEXT_PUBLIC_SSO_URL}/login?callbackUrl=${encodeURIComponent(
            window.location.href
        )}`
    }

    const handleOpenPopupSignUp = () => {
        window.location.href = `${process.env.NEXT_PUBLIC_SSO_URL}/register?callbackUrl=${encodeURIComponent(
            window.location.href
        )}`
    }

    if (!auth.isAuthenticated) return null

    return (
        <div className="checkoutLogin">
            <div className="checkoutLogin__icon">
                <IconSuperBox />
            </div>
            <div className="checkoutLogin__cont">
                <p className="size-16 semibold">
                    {t('Đăng nhập hoặc đăng kí và tận hưởng ưu đãi dành riêng cho thành viên')}
                </p>
                <p className="gray-5">
                    <span>{t('Đặt phòng nhanh và dễ dàng')}</span>
                </p>
                <p className="d-flex mb0">
                    <button type="button" className="btnLink" onClick={handleOpenPopupSignIn}>
                        <span>{t('common:Đăng nhập')}</span>
                    </button>
                    &nbsp;{t('common:hoặc')}&nbsp;
                    <button type="button" className="btnLink" onClick={handleOpenPopupSignUp}>
                        <span>{t('common:Đăng ký')}</span>
                    </button>
                </p>
            </div>
        </div>
    )
}

export default SignInCheckout
