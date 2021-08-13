import React from 'react'
import { useTranslation } from 'react-i18next'

interface iProps {
    isHaveBigSale: boolean
}

const RenderIconBigSale: React.FC<iProps> = ({ isHaveBigSale }) => {
    if (isHaveBigSale) {
        return (
            <div className="hotelItem__bigSale">
                <img src="https://statics.vntrip.vn/images/sale-sticker.png" alt="big-sale" />
            </div>
        )
    }
    return null
}

export default RenderIconBigSale
