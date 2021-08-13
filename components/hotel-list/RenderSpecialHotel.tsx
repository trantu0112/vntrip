import React from 'react'
import { IconHotelSpecial } from '../../constants/icons'

interface iProps {
    isSpecial: boolean
}

const RenderSpecialHotel: React.FC<iProps> = ({ isSpecial }) => {
    return isSpecial ? (
        <div className="tooltipSpecial">
            <div className="tooltipBox">
                <IconHotelSpecial />
                <div className="tooltipBox__cont">
                    <p className="semibold">
                        Khách sạn đang bán chạy, cùng những ưu đãi duy nhất chỉ có tại Vntrip.vn:
                    </p>
                    <p className="mb0">
                        - Giá luôn tốt cùng các chương trình giảm giá đặc biệt
                        <br />- Hỗ trợ đón sân bay
                        <br />- Nhiều lựa chọn thanh toán
                        <br />- Hỗ trợ chuyên nghiệp
                    </p>
                </div>
            </div>
        </div>
    ) : null
}

export default RenderSpecialHotel
