import React from 'react'
import { useTranslation } from 'react-i18next'

interface iProps {
    isHaveRefundFree: boolean
}

const RenderNotiRefundFree: React.FC<iProps> = ({ isHaveRefundFree }) => {
    const { t } = useTranslation(['common'])
    if (isHaveRefundFree) {
        return (
            <div className="hotelItem__highlight bgGreen">
                <span>{t('common:Miễn phí hoàn hủy 24h')}</span>
            </div>
        )
    }
    return null
}

export default RenderNotiRefundFree
