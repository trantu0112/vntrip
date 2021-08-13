import React from 'react'
import moment from 'moment'
import { IconSoldOut } from '../../constants/icons'

interface iProps {
    checkInDate: Date
    checkOutDate: Date
}

const HotelSoldOut: React.FC<iProps> = ({ checkInDate, checkOutDate }) => {
    return (
        <div className="soldOut">
            <div className="soldOut__icon">
                <IconSoldOut />
            </div>
            <div className="soldOut__text">
                <p className="p1">Rất tiếc, chúng tôi đã hết phòng</p>
                <p className="p2">
                    Rất tiếc, chúng tôi đã hết phòng trong ngày bạn chọn: {moment(checkInDate).format('DD/MM/YYYY')} -{' '}
                    {moment(checkOutDate).format('DD/MM/YYYY')}.
                    <br />
                    Bạn vui lòng chọn lại ngày khác để thực hiện việc đặt phòng
                </p>
                {/*<button type="button" className="btn btn_orange">*/}
                {/*    <span>Chọn lại ngày</span>*/}
                {/*</button>*/}
            </div>
        </div>
    )
}

export default HotelSoldOut
