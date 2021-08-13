import React from 'react'
import { IconMarker } from '../../constants/icons'
import { useTranslation } from 'react-i18next'
import { toggleViewHotelInMap } from '../../store/hotel/action'
import { useDispatch } from 'react-redux'

interface Props {
    fullAddress: string
    fullAddressEn?: string
    latitude?: number | string
    longitude?: number | string
}

const HotelAddress: React.FC<Props> = ({ fullAddress, fullAddressEn, latitude, longitude }) => {
    const dispatch = useDispatch()
    const { t, i18n } = useTranslation(['hotel', 'common'])
    const isVietnamese = i18n.language === 'vi'

    const handleClickAddress = () => {
        dispatch(toggleViewHotelInMap(true, latitude, longitude))
    }

    return (
        <div className="hotelAddress">
            <div className="hotelAddress">
                <div className="hotelAddress__icon">
                    <IconMarker />
                </div>
                <div className="hotelAddress__text">
                    <p className="mb0">
                        {isVietnamese ? fullAddress : fullAddressEn || fullAddress}
                        <button type="button" onClick={handleClickAddress}>
                            {t('common:Xem bản đồ')}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default HotelAddress
