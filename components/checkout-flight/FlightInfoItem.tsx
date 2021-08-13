import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IconDownOutline, IconFlightTrip } from '../../constants/icons'
import { convertAirportCodeToCityName, convertMinsToHrsMins, showLogoAirProvider } from '../../utils/flight'
import DisplayPrice from '../common/DisplayPrice'
import moment from 'moment'

interface Props {
    data: any
    passengers: any
}

const FlightInfoItem: React.FC<Props> = ({ data, passengers }) => {
    const { t } = useTranslation(['flight', 'payment'])
    const [isBreakPrice, setIsBreakPrice] = useState<boolean>(false)
    const [totalBaggage, setTotalBaggage] = useState<number>(0)
    const toggleBreakPrice = () => {
        setIsBreakPrice((prevState) => !prevState)
    }
    useEffect(() => {
        let priceBaggage = 0
        if (data) {
            passengers.forEach((passenger: any) => {
                passenger['listBaggage'].forEach((baggage: any) => {
                    if (baggage['leg'] === data['leg']) {
                        priceBaggage += baggage['price']
                    }
                })
            })
            setTotalBaggage(priceBaggage)
        }
    }, [passengers, data])
    const flight = Array.isArray(data?.listFlight) && data.listFlight.length > 0 ? data.listFlight[0] : null

    if (flight)
        return (
            <div className="bookingInfo__item">
                <div className="flexGroup mb15 mt10">
                    <p className="semibold mb0">{data?.leg === 0 ? t('Chuyến đi') : t('Chuyến về')}</p>
                    <div className="bookingInfo__logo">
                        <img src={showLogoAirProvider(data?.airline)} alt={data?.airline} />
                    </div>
                </div>
                <div className="tripBox">
                    <div className="tripBox__item">
                        <p className="p1">{flight.startPoint}</p>
                        <p className="p2">
                            {convertAirportCodeToCityName(flight.startPoint)}
                            <br />
                            <span className="size-12">{moment(flight.startDate).format('HH:mm | DD/MM')}</span>
                        </p>
                    </div>
                    <div className="tripBox__item">
                        <p className="p3">{convertMinsToHrsMins(flight.duration)}</p>
                        <div className="tripBox__icon">
                            <IconFlightTrip />
                        </div>
                        <p className="p3">{flight.flightNumber}</p>
                    </div>
                    <div className="tripBox__item">
                        <p className="p1">{flight.endPoint}</p>
                        <p className="p2">
                            {convertAirportCodeToCityName(flight.endPoint)}
                            <br />
                            <span className="size-12">{moment(flight.endDate).format('HH:mm | DD/MM')}</span>
                        </p>
                    </div>
                </div>
                {/*<div className="bookingInfo__cost">*/}
                {/*    <ul>*/}
                {/*        <li>*/}
                {/*            <p>*/}
                {/*                <button*/}
                {/*                    type="button"*/}
                {/*                    className={`btnTicket ${isBreakPrice ? 'rotate' : ''}`}*/}
                {/*                    onClick={toggleBreakPrice}*/}
                {/*                >*/}
                {/*                    <span>{t('Giá vé')}</span>*/}
                {/*                    <IconDownOutline />*/}
                {/*                </button>*/}
                {/*            </p>*/}
                {/*            <p className="text-right">*/}
                {/*                <DisplayPrice*/}
                {/*                    price={data.fareAdt * data.adt + data.fareChd * data.chd + data.fareInf * data.inf}*/}
                {/*                />*/}
                {/*            </p>*/}
                {/*            <ul className={`ulSub ${isBreakPrice ? 'open' : ''}`}>*/}
                {/*                <li>*/}
                {/*                    <p>*/}
                {/*                        {t('Giá vé người lớn')} (x{data.adt})*/}
                {/*                    </p>*/}
                {/*                    <p className="text-right">*/}
                {/*                        <DisplayPrice price={data.fareAdt * data.adt} />*/}
                {/*                    </p>*/}
                {/*                </li>*/}
                {/*                {data.chd > 0 && (*/}
                {/*                    <li>*/}
                {/*                        <p>*/}
                {/*                            {t('Giá vé trẻ em')} (x{data.chd})*/}
                {/*                        </p>*/}
                {/*                        <p className="text-right">*/}
                {/*                            <DisplayPrice price={data.fareChd * data.chd} />*/}
                {/*                        </p>*/}
                {/*                    </li>*/}
                {/*                )}*/}
                {/*                {data.inf > 0 && (*/}
                {/*                    <li>*/}
                {/*                        <p>*/}
                {/*                            {t('Giá vé em bé')} (x{data.inf})*/}
                {/*                        </p>*/}
                {/*                        <p className="text-right">*/}
                {/*                            <DisplayPrice price={data.fareInf * data.inf} />*/}
                {/*                        </p>*/}
                {/*                    </li>*/}
                {/*                )}*/}
                {/*            </ul>*/}
                {/*        </li>*/}
                {/*        <li>*/}
                {/*            <p>{t('Thuế và phí')}</p>*/}
                {/*            <p className="text-right">*/}
                {/*                <DisplayPrice*/}
                {/*                    price={*/}
                {/*                        (data.taxAdt + data.feeAdt) * data.adt +*/}
                {/*                        (data.taxChd + data.feeChd) * data.chd +*/}
                {/*                        (data.taxInf + data.feeInf) * data.inf*/}
                {/*                    }*/}
                {/*                />*/}
                {/*            </p>*/}
                {/*        </li>*/}
                {/*        <li>*/}
                {/*            <p>{t('Chi phí vận hành')}</p>*/}
                {/*            <p className="text-right">*/}
                {/*                {' '}*/}
                {/*                <DisplayPrice*/}
                {/*                    price={*/}
                {/*                        data.serviceFeeAdt * data.adt +*/}
                {/*                        data.serviceFeeChd * data.chd +*/}
                {/*                        data.serviceFeeInf * data.inf*/}
                {/*                    }*/}
                {/*                />*/}
                {/*            </p>*/}
                {/*        </li>*/}
                {/*        {totalBaggage ? (*/}
                {/*            <li>*/}
                {/*                <p>{t('Hành lý ký gửi')}</p>*/}
                {/*                <p className="text-right">*/}
                {/*                    <DisplayPrice price={totalBaggage} />*/}
                {/*                </p>*/}
                {/*            </li>*/}
                {/*        ) : (*/}
                {/*            ''*/}
                {/*        )}*/}

                {/*        <li>*/}
                {/*            <p className="semibold mb0">{t('payment:Tổng cộng')}</p>*/}
                {/*            <p className="yellow-1 semibold mb0 text-right">*/}
                {/*                <DisplayPrice price={data.totalPrice + totalBaggage} />*/}
                {/*            </p>*/}
                {/*        </li>*/}
                {/*    </ul>*/}
                {/*</div>*/}
            </div>
        )
    return null
}

export default FlightInfoItem
