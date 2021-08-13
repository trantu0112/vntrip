import React, { useEffect } from 'react'
import { Checkbox } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { setPriceOneNight } from '../../store/hotel/action'

interface Props {
    nights: number
}

const ChangeModePriceOneNight: React.FC<Props> = ({ nights }) => {
    const dispatch = useDispatch()
    const { t } = useTranslation(['hotel'])
    const isPriceOneNight = useSelector((state: any) => state.hotel.isPriceOneNight || false)

    useEffect(() => {
        // mặc định set hiển thị giá 1 đêm  = true
        dispatch(setPriceOneNight(true))
    }, [])

    const handleChangePriceMode = (checked: boolean) => {
        dispatch(setPriceOneNight(checked))
    }

    return (
        <Checkbox
            checked={isPriceOneNight}
            disabled={nights === 1}
            onChange={(event) => handleChangePriceMode(event.target.checked)}
        >
            {t('hotel:Hiển thị giá')}
            <strong>&nbsp;1&nbsp;</strong>
            {t('đêm')}
        </Checkbox>
    )
}

export default ChangeModePriceOneNight
