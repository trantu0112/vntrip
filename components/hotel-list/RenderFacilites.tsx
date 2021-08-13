import React from 'react'
import {
    IconCoffee,
    IconGolf,
    IconGym,
    IconLaudary,
    IconMassage,
    IconParking,
    IconRestaurant,
    IconSpa,
    IconTennis,
    IconWifi,
    IconPool,
} from '../../constants/icons-facilities'
import { useTranslation } from 'react-i18next'

interface iProps {
    groupFacilities: any[]
}

const RenderFacilities: React.FC<iProps> = ({ groupFacilities }) => {
    const { t } = useTranslation(['user'])
    const mapKeyToIcon = (key: string) => {
        switch (key) {
            case 'parking':
                return <IconParking />
            case 'wifi':
                return <IconWifi />
            case 'pool':
                return <IconPool color={''} />
            case 'restaurant':
                return <IconRestaurant />
            case 'spa':
                return <IconSpa />
            case 'tenis':
                return <IconTennis />
            case 'laundry':
                return <IconLaudary />
            case 'fitness':
                return <IconGym />
            case 'massage':
                return <IconMassage />
            case 'golf':
                return <IconGolf />
            case 'coffee':
                return <IconCoffee />
            default:
                return null
        }
    }

    return (
        <>
            <div className="facilities">
                {Array.isArray(groupFacilities) &&
                    groupFacilities.map((item) => {
                        if (item.key)
                            return (
                                <div className="facilities__item" key={item.key}>
                                    <div data-tooltip={item.group_name} className="tooltip">
                                        {mapKeyToIcon(item.key)}
                                    </div>
                                </div>
                            )
                        return null
                    })}
            </div>
            {groupFacilities.length > 6 ? (
                <p className="semibold yellow-1 ml5">
                    <span>
                        {groupFacilities.length - 1} {t('user:Tiện nghi')}
                    </span>
                </p>
            ) : (
                ''
            )}
        </>
    )
}

export default RenderFacilities
