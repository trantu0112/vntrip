import React from 'react'
import { useTranslation } from 'react-i18next'
import { IconMobileRate } from '../../constants/icons'

interface iProps {
    isHaveMobileRate: boolean
}

const RenderNotiMobileRate: React.FC<iProps> = ({ isHaveMobileRate }) => {
    const { t } = useTranslation(['common'])
    if (isHaveMobileRate) {
        return (
            <div className="mobileRate notiText notiText_orange">
                <IconMobileRate />
                <span>{t('common:Giá chỉ áp dụng trên điện thoại')}</span>
            </div>
        )
    }
    return null
}

export default RenderNotiMobileRate
