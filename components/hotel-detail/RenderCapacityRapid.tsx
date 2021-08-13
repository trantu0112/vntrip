import React from 'react'
import { IconCapacity } from '../../constants/icons'
import { useTranslation } from 'react-i18next'

interface Props {
    adultCount: number
    roomCount: number
}

const RenderCapacityRapid: React.FC<Props> = ({ adultCount, roomCount }) => {
    const { t } = useTranslation(['hotel', 'flight'])
    return (
        <div className="roomPolicy__item green-1">
            <div className="roomPolicy__icon">
                <IconCapacity />
            </div>
            <div className="roomPolicy__text">
                <span>{t('Sức chứa')}</span>
                <span>
                    {adultCount / roomCount} {t(adultCount / roomCount > 1 ? 'flight:người lớns' : 'flight:người lớn')}
                </span>
                <span className={`yellow-1 size-12 italic`}>
                    x&nbsp;{roomCount}&nbsp;{t(roomCount > 1 ? `phòngs` : `phòng`)}
                </span>
            </div>
        </div>
    )
}

export default RenderCapacityRapid
