import React from 'react'
import { IconClock } from '../../constants/icons'

interface Props {
    promotion: any
}

const RenderLastMinute: React.FC<Props> = ({ promotion }) => {
    // if (promotion?.title === 'LAST_MINUTE') {
    //     return (
    //         <div className="hotelItem__countdown">
    //             <p>
    //                 <IconClock />
    //                 <span>&nbsp;Deal giờ chót:</span>
    //             </p>
    //             <div id="countdown" className="countdown">
    //                 <div className="days countdown__item">00</div>
    //                 <div className="hours countdown__item">09</div>
    //                 <div className="minutes countdown__item">41</div>
    //                 <div className="seconds countdown__item">16</div>
    //             </div>
    //         </div>
    //     )
    // }
    return null
}

export default RenderLastMinute
