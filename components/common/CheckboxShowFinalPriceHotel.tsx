import React from 'react'
import { Checkbox } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { setIsShowFinalPriceHotel } from '../../store/hotel/action'
import { setShowFinalPriceHotelToLS } from '../../utils/hotel'

const CheckboxShowFinalPriceHotel = () => {
    const dispatch = useDispatch()
    const { t } = useTranslation(['hotel'])
    const isShowFinalPriceHotel = useSelector((state: any) => state.hotel.isShowFinalPriceHotel || false)
    // handle checkbox xem giá cuối: move to /page/_app để đảm bảo mọi page đều có dữ liệu

    const handleChangeShowFinalPrice = (checked: boolean) => {
        dispatch(setIsShowFinalPriceHotel(checked)) // save to redux store
        setShowFinalPriceHotelToLS(checked) // save to localStorage
    }

    return (
        <Checkbox
            checked={isShowFinalPriceHotel}
            onChange={(event) => handleChangeShowFinalPrice(event.target.checked)}
        >
            {t('Xem giá cuối')}&nbsp;<i>({t('Bao gồm phí dịch vụ khách sạn')})</i>
        </Checkbox>
    )
}

export default CheckboxShowFinalPriceHotel
