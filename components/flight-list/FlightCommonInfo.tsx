import React from 'react'
import { IconArrowFlight, IconFlightBlack } from '../../constants/icons'
import { convertAirportCodeToCityName } from '../../utils/flight'
import moment from 'moment'
import { useTranslation } from 'react-i18next'

interface iProps {
    originCode: string
    destinCode: string
    departDate: Date
    total?: number
}

const FlightCommonInfo: React.FC<iProps> = ({ destinCode, originCode, departDate, total }) => {
    const { t, i18n } = useTranslation('flight')
    return (
        <div className="flightGroup__info">
            <div className="dIcon">
                <IconFlightBlack />
            </div>
            <div className="dText">
                <div className="flightName mb5">
                    <p>
                        {originCode} - {convertAirportCodeToCityName(originCode)}
                    </p>
                    <IconArrowFlight />
                    <p>
                        {destinCode} - {convertAirportCodeToCityName(destinCode)}
                    </p>
                </div>
                <p className="p1 mb0">
                    <span>
                        <strong>{moment(departDate).format('DD-MM-YYYY')}</strong>&nbsp;(
                        {moment(departDate)
                            .locale(i18n.language === 'vi' ? 'vi' : 'en-gb')
                            .format('dddd')}
                        )
                    </span>
                    <span>
                        {typeof total === 'number' && (
                            <>
                                <strong>{total}</strong>&nbsp;{t(total > 1 ? 'chuyến bays' : 'chuyến bay')}
                            </>
                        )}
                    </span>
                </p>
            </div>
        </div>
    )
}

export default FlightCommonInfo
