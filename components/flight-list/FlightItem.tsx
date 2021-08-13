import React, { useState } from 'react'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { IconDown, IconFlightOperating, IconFlightTrip } from '../../constants/icons'
import {
    convertAirportCodeToCityName,
    convertMinsToHrsMins,
    convertProviderCodeToName,
    showLogoAirProvider,
} from '../../utils/flight'
import DisplayPrice from '../common/DisplayPrice'
import FlightDetail from './FlightDetail'

interface Props {
    data: any
    index?: number
    handleSelectItem?: (data: any) => void // for select item
    handleSelectedChange?: (data: any) => void // for change selected
    isFromCheckout?: boolean
    isHiddenPrice?: boolean
}

const FlightItem: React.FC<Props> = ({
    data,
    index,
    handleSelectItem,
    handleSelectedChange,
    isFromCheckout,
    isHiddenPrice,
}) => {
    const { t } = useTranslation(['common', 'flight'])
    const { isInclTaxAndFee, isShowPriceOne } = useSelector((state: any) => {
        return {
            isInclTaxAndFee: state.flight.isInclTaxAndFee || false,
            isShowPriceOne: state.flight.isShowPriceEachPassenger || false,
        }
    })
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const toggleViewDetail = () => {
        setIsOpen((prevState) => !prevState)
    }

    const showPrice = (data: any) => (isIclVat: boolean) => (isShowPriceOne: boolean) => (
        isFromCheckout: boolean | undefined
    ) => {
        if (isFromCheckout) {
            return data.totalPrice
        }
        if (isIclVat && isShowPriceOne) {
            return data.fareAdt + data.feeAdt + data.serviceFeeAdt + data.taxAdt
        } else if (isIclVat && !isShowPriceOne) {
            return data.totalPrice
        } else if (!isIclVat && isShowPriceOne) {
            return data.fareAdt
        } else if (!isIclVat && !isShowPriceOne) {
            return data.fareAdt * data.adt + data.fareChd * data.chd + data.fareInf * data.inf
        }
        return data.totalPrice
    }

    const flight = Array.isArray(data?.listFlight) && data?.listFlight.length > 0 ? data.listFlight[0] : null

    if (flight) {
        const isHasOperating = flight.operating && flight.operating !== flight.airline
        return (
            <div className={`flightTicket ${isOpen ? 'open' : ''}`}>
                <div className={`flightTicket__box ${isHasOperating ? 'operating' : ''}`}>
                    <div className="flightTicket__left">
                        <div className="flightTicket__logo">
                            <img src={showLogoAirProvider(data.airline)} alt={data.airline} />
                        </div>
                        <div className="flightTicket__info">
                            <div className="tripBox">
                                <div className="tripBox__item">
                                    <p className="p1">{flight.startPoint}</p>
                                    <p className="p2">{convertAirportCodeToCityName(flight.startPoint)}</p>
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
                                    <p className="p2">{convertAirportCodeToCityName(flight.endPoint)}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flightTicket__date">
                            <p className="p1">{moment(flight.startDate).format('dd, DD-MM')}</p>
                            <p className="p2">
                                {moment(flight.startDate).format('HH:mm')} - {moment(flight.endDate).format('HH:mm')}
                            </p>
                        </div>
                    </div>
                    <div className="flightTicket__right">
                        {!isHiddenPrice && (
                            <div className="flightTicket__price">
                                <p className="size-18 yellow-1 bold">
                                    <DisplayPrice
                                        price={showPrice(data)(isInclTaxAndFee)(isShowPriceOne)(isFromCheckout)}
                                    />
                                </p>
                                <div className="flightTicket__label">{flight.groupClass}</div>
                            </div>
                        )}

                        <div className="flightTicket__btn">
                            {typeof handleSelectItem !== 'undefined' && (
                                <button type="button" className="btn btn_orange" onClick={() => handleSelectItem(data)}>
                                    {t('Chọn')}
                                </button>
                            )}
                            {typeof handleSelectedChange !== 'undefined' && (
                                <button
                                    type="button"
                                    className="btn btn_outlineOrange"
                                    onClick={() => handleSelectedChange(data)}
                                >
                                    {t('Thay đổi')}
                                </button>
                            )}

                            <div className="flightTicket__show">
                                <button type="button" className="btnAdd">
                                    <span>{isOpen ? t('Thu gọn') : t('Xem chi tiết')}</span>
                                    <IconDown />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div
                        tabIndex={index || 0}
                        role={'button'}
                        className="flightTicket__click"
                        onClick={toggleViewDetail}
                        onKeyUp={toggleViewDetail}
                    />

                    {isHasOperating && (
                        <div className="operatingText">
                            <IconFlightOperating />
                            <span>
                                {t('flight:Chuyến bay được điều hành bởi')}:{' '}
                                {convertProviderCodeToName(flight.operating)}
                            </span>
                        </div>
                    )}
                </div>
                <FlightDetail data={data} toggleViewDetail={toggleViewDetail} />
            </div>
        )
    }
    return null
}

export default FlightItem
