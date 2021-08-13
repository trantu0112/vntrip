import React from 'react'
import { useTranslation } from 'react-i18next'

interface iProps {
    isHaveTopHotel: boolean
}

const RenderNotiTopHotel: React.FC<iProps> = ({ isHaveTopHotel }) => {
    const { t } = useTranslation(['common'])
    if (isHaveTopHotel) {
        return (
            <div className="hotelItem__highlight">
                <span>{t('common:Khách sạn nổi bật')}</span>
            </div>
        )
    }
    return null
}

export default RenderNotiTopHotel
