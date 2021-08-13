import React from 'react'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import { IconClose } from '../../constants/icons'
import { convertAirportCodeToName, convertMinsToHrsMins } from '../../utils/flight'
import DisplayPrice from '../common/DisplayPrice'
import RenderFlightPolicy from './RenderFlightPolicy'

interface Props {
    data: any
    index?: number
    toggleViewDetail?: () => void
}

const FlightDetail: React.FC<Props> = ({ data, toggleViewDetail }) => {
    const { t } = useTranslation('flight')
    if (data) {
        const flight = Array.isArray(data.listFlight) && data.listFlight.length > 0 ? data.listFlight[0] : null
        return (
            <div className="flightTicket__detail">
                <div className="headerPopup">
                    <p>{t('Thông tin chi tiết')}</p>
                    <button type="button" className="headerPopup__close" onClick={toggleViewDetail}>
                        <IconClose />
                    </button>
                </div>
                <div className="ticketDetail">
                    <div className="ticketDetail__item">
                        <p className="semibold size-18 mb15 ticketDetail__title">{t('HÀNH TRÌNH')}</p>

                        {Array.isArray(flight.listSegment) &&
                            flight.listSegment.length > 0 &&
                            flight.listSegment.map((segment: any) => {
                                return (
                                    <div className="ticketDetail__list" key={`segment_${segment.id}`}>
                                        <ul>
                                            <li>
                                                <p className="p1">{t('Điểm đi')}:</p>
                                                <p className="semibold">
                                                    {convertAirportCodeToName(segment.startPoint)} ({segment.startPoint}
                                                    )
                                                </p>
                                            </li>
                                            <li>
                                                <p className="p1">{t('Điểm đến')}:</p>
                                                <p className="semibold">
                                                    {convertAirportCodeToName(segment.endPoint)} ({segment.endPoint})
                                                </p>
                                            </li>
                                            <li>
                                                <p className="p1">{t('Mã chuyến bay')}:</p>
                                                <p className="semibold">{segment.flightNumber}</p>
                                            </li>
                                            <li>
                                                <p className="p1">{t('Giờ cất cánh')}:</p>
                                                <p className="semibold">
                                                    {moment(segment.startTime).format('HH:mm | DD-MM-YYYY')}
                                                </p>
                                            </li>
                                            <li>
                                                <p className="p1">{t('Giờ hạ cánh')}:</p>
                                                <p className="semibold">
                                                    {moment(segment.endTime).format('HH:mm | DD-MM-YYYY')}
                                                </p>
                                            </li>
                                            <li>
                                                <p className="p1">{t('Thời gian bay')}:</p>
                                                <p className="semibold">{convertMinsToHrsMins(segment.duration)}</p>
                                            </li>
                                            <li>
                                                <p className="p1">{t('Hành lý xách tay')}:</p>
                                                <p className="semibold">{segment.handBaggage}</p>
                                            </li>
                                            <li>
                                                <p className="p1">{t('Hành lý ký gửi')}:</p>
                                                <p className="semibold">{segment.allowanceBaggage}</p>
                                            </li>
                                            <li>
                                                <p className="p1">{t('Hạng đặt chỗ')}:</p>
                                                <p className="semibold">{segment.class}</p>
                                            </li>
                                        </ul>
                                    </div>
                                )
                            })}
                    </div>

                    <div className="ticketDetail__item">
                        <p className="semibold size-18 mb15 ticketDetail__title">{t('THÔNG TIN VỀ GIÁ')}</p>
                        <div className="ticketDetail__table">
                            <div className="ticketDetail__table__header">
                                <div className="ticketDetail__table__cell">
                                    <p className="semibold">{t('Hành khách')}</p>
                                </div>
                                <div className="ticketDetail__table__cell">
                                    <p className="semibold">{t('Số lượng')}</p>
                                </div>
                                <div className="ticketDetail__table__cell">
                                    <p className="semibold">{t('Giá vé')}</p>
                                </div>
                                <div className="ticketDetail__table__cell">
                                    <p className="semibold">{t('Thuế và phí')}</p>
                                </div>
                                <div className="ticketDetail__table__cell">
                                    <p className="semibold">{t('Chi phí vận hành')}</p>
                                </div>
                                <div className="ticketDetail__table__cell">
                                    <p className="semibold">{t('Tổng giá')}</p>
                                </div>
                            </div>
                            <div className="ticketDetail__table__body">
                                {data.adt > 0 && (
                                    <div className="ticketDetail__table__row">
                                        <div className="ticketDetail__table__cell">
                                            <p className="titleMobile">{t('Hành khách')}</p>
                                            <p>{t('Người lớns')}</p>
                                        </div>
                                        <div className="ticketDetail__table__cell">
                                            <p className="titleMobile">{t('Số lượng')}</p>
                                            <p>{data.adt}</p>
                                        </div>
                                        <div className="ticketDetail__table__cell">
                                            <p className="titleMobile">{t('Giá vé')}</p>
                                            <p>
                                                <DisplayPrice price={data.fareAdt} />
                                            </p>
                                        </div>
                                        <div className="ticketDetail__table__cell">
                                            <p className="titleMobile">{t('Thuế và phí')}</p>
                                            <p>
                                                <DisplayPrice price={data.feeAdt + data.taxAdt} />
                                            </p>
                                        </div>
                                        <div className="ticketDetail__table__cell">
                                            <p className="titleMobile">{t('Chi phí vận hành')}</p>
                                            <p>
                                                <DisplayPrice price={data.serviceFeeAdt} />
                                            </p>
                                        </div>
                                        <div className="ticketDetail__table__cell">
                                            <p className="titleMobile">{t('Tổng giá')}</p>
                                            <p>
                                                <DisplayPrice
                                                    price={
                                                        (data.fareAdt +
                                                            data.feeAdt +
                                                            data.taxAdt +
                                                            data.serviceFeeAdt) *
                                                        data.adt
                                                    }
                                                />
                                            </p>
                                        </div>
                                    </div>
                                )}
                                {data.chd > 0 && (
                                    <div className="ticketDetail__table__row">
                                        <div className="ticketDetail__table__cell">
                                            <p className="titleMobile">{t('Hành khách')}</p>
                                            <p>{t('Trẻ em')}</p>
                                        </div>
                                        <div className="ticketDetail__table__cell">
                                            <p className="titleMobile">{t('Số lượng')}</p>
                                            <p>{data.chd}</p>
                                        </div>
                                        <div className="ticketDetail__table__cell">
                                            <p className="titleMobile">{t('Giá vé')}</p>
                                            <p>
                                                <DisplayPrice price={data.fareChd} />
                                            </p>
                                        </div>
                                        <div className="ticketDetail__table__cell">
                                            <p className="titleMobile">{t('Thuế và phí')}</p>
                                            <p>
                                                <DisplayPrice price={data.feeChd + data.taxChd} />
                                            </p>
                                        </div>
                                        <div className="ticketDetail__table__cell">
                                            <p className="titleMobile">{t('Chi phí vận hành')}</p>
                                            <p>
                                                <DisplayPrice price={data.serviceFeeChd} />
                                            </p>
                                        </div>
                                        <div className="ticketDetail__table__cell">
                                            <p className="titleMobile">{t('Tổng giá')}</p>
                                            <p>
                                                <DisplayPrice
                                                    price={
                                                        (data.fareChd +
                                                            data.feeChd +
                                                            data.taxChd +
                                                            data.serviceFeeChd) *
                                                        data.chd
                                                    }
                                                />
                                            </p>
                                        </div>
                                    </div>
                                )}
                                {data.inf > 0 && (
                                    <div className="ticketDetail__table__row">
                                        <div className="ticketDetail__table__cell">
                                            <p className="titleMobile">{t('Hành khách')}</p>
                                            <p>{t('Trẻ sơ sinh')}</p>
                                        </div>
                                        <div className="ticketDetail__table__cell">
                                            <p className="titleMobile">{t('Số lượng')}</p>
                                            <p>{data.inf}</p>
                                        </div>
                                        <div className="ticketDetail__table__cell">
                                            <p className="titleMobile">{t('Giá vé')}</p>
                                            <p>
                                                <DisplayPrice price={data.fareInf} />
                                            </p>
                                        </div>
                                        <div className="ticketDetail__table__cell">
                                            <p className="titleMobile">{t('Thuế và phí')}</p>
                                            <p>
                                                <DisplayPrice price={data.feeInf + data.taxInf} />
                                            </p>
                                        </div>
                                        <div className="ticketDetail__table__cell">
                                            <p className="titleMobile">{t('Chi phí vận hành')}</p>
                                            <p>
                                                <DisplayPrice price={data.serviceFeeInf} />
                                            </p>
                                        </div>
                                        <div className="ticketDetail__table__cell">
                                            <p className="titleMobile">{t('Tổng giá')}</p>
                                            <p>
                                                <DisplayPrice
                                                    price={
                                                        (data.fareInf +
                                                            data.feeInf +
                                                            data.taxInf +
                                                            data.serviceFeeInf) *
                                                        data.inf
                                                    }
                                                />
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="ticketDetail__table__total">
                                <span className="span1">{t('Tổng chi phi')}́:&nbsp;</span>
                                <span className="yellow-1">
                                    <DisplayPrice price={data.totalPrice} />
                                </span>
                            </div>
                        </div>
                    </div>
                    <RenderFlightPolicy airline={flight.airline} />
                </div>
            </div>
        )
    }
    return null
}

export default FlightDetail
