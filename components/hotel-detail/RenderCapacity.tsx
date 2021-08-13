import React from 'react'
import { IconCapacity } from '../../constants/icons'
import { useTranslation } from 'react-i18next'

interface Props {
    adultCount: number
}

const RenderCapacity: React.FC<Props> = ({ adultCount }) => {
    const { t } = useTranslation(['hotel', 'flight'])
    return (
        <div className="roomPolicy__item green-1">
            <div className="roomPolicy__icon">
                <IconCapacity />
            </div>
            <div className="roomPolicy__text">
                <span>{t('Sức chứa')}</span>
                <span>
                    {adultCount} {t(adultCount > 1 ? 'flight:người lớns' : 'flight:người lớn')}
                </span>
            </div>
        </div>
    )
}

export default RenderCapacity
