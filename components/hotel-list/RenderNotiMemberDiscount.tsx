import React from 'react'
import { useTranslation } from 'react-i18next'
import { IconMemberDiscount } from '../../constants/icons'

interface iProps {
    isHaveMemberDiscount: boolean
}

const RenderNotiMemberDiscount: React.FC<iProps> = ({ isHaveMemberDiscount }) => {
    const { t } = useTranslation(['common'])
    if (isHaveMemberDiscount) {
        return (
            <div className="notiText notiText_blue">
                <IconMemberDiscount />
                <span>{t('common:Ưu đãi đặc biệt cho thành viên')}</span>
            </div>
        )
    }
    return null
}

export default RenderNotiMemberDiscount
