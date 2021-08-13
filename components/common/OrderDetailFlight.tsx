import React from 'react'
import { convertClass, convertOrderStatus, convertPaymentMethod } from '../../utils/common'
import moment from 'moment'
import { convertAirportCodeToName, convertMinsToHrsMins, showLogoAirProvider } from '../../utils/flight'
import { IconFlightTrip } from '../../constants/icons'
import DisplayPrice from './DisplayPrice'
import ExportInvoice from '../order/ExportInvoice'
import { useTranslation } from 'react-i18next'

interface Props {
    dataOrder: any
}

const OrderDetailFlightComponent: React.FC<Props> = ({ dataOrder }) => {
    const { t, i18n } = useTranslation(['hotel', 'payment', 'common', 'flight'])
    const totalPriceBaggage = (passengers: any, leg: number) => {
        let total = 0
        Array.isArray(passengers) &&
            dataOrder['booking_request']['type'] === 'flight' &&
            passengers.length > 0 &&
            passengers.map((res) => {
                let filterBaggage = res?.listBaggage.filter((baggage: any) => baggage['leg'] === leg)
                total += filterBaggage.length > 0 ? filterBaggage[0].price : 0
            })
        return total
    }
    const totalPriceOfflineFlight = (index: number) => {
        let price = 0
        dataOrder.order_item_flight_data[index].passengers.forEach((passenger: any) => {
            let filterFee = dataOrder.order_item_flight_data[index].price_info.priceFeeList.filter(
                (fee: any) => fee['code'] === 'FARE_' + passenger['type']
            )
            price += filterFee.length ? filterFee[0].fee : 0
        })
        return price
    }
    return (
        <>
            {dataOrder && (
                <div className="profileFlightDetail">
                    <h3 className={`mb30`}>{t(`Chi tiết đơn hàng`)}</h3>
                    <div className="ticketDetail__item">
                        <div className="d-flex">
                            <div className="text-left">{t('hotel:Mã đơn hàng')}:</div>
                            <div className="text-right">
                                <p className="semibold yellow-1">{dataOrder?.order_code}</p>
                            </div>
                        </div>
                        <div className="d-flex">
                            <div className="text-left">{t('payment:Thanh toán')}:</div>
                            <div className="text-right">
                                <p className="semibold">{convertPaymentMethod(dataOrder?.payment_method)}</p>
                            </div>
                        </div>
                        <div className="d-flex">
                            <div className="text-left">{t('common:Trạng thái')}:</div>
                            <div className="text-right">
                                <p className={`semibold ${convertClass(dataOrder?.order_status)}`}>
                                    {convertOrderStatus(dataOrder?.order_status)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {Array.isArray(dataOrder.order_item_flight_data) &&
                        dataOrder.order_item_flight_data.length > 0 &&
                        dataOrder.order_item_flight_data.map((item: any, index: number) => {
                            return (
                                <div
                                    className={`flightActive__item borderRadius4px`}
                                    key={`order_item_flight_${index}`}
                                >
                                    {item?.atadi_provider_booking_code && (
                                        <span
                                            className={`floatRight white-1 bgYellow1 borderRadius0px4px0px0px`}
                                            style={{ padding: '12px 15px' }}
                                        >
                                            {t('Mã đặt chỗ')}:
                                            <span className={`semibold d-inline-block`}>
                                                {' '}
                                                {item?.atadi_provider_booking_code}
                                            </span>
                                        </span>
                                    )}

                                    <p className="flightActive__title">
                                        {t('Chuyến bay')} :{' '}
                                        {dataOrder['booking_request']['type'] === 'flight'
                                            ? item?.flight_number
                                            : item?.origin_code + '->' + item?.destination_code}{' '}
                                        -&nbsp;
                                        {t('Thời gian khởi hành')}:&nbsp;
                                        {moment(item.departure_time)
                                            .locale(i18n.language === 'vi' ? 'vi' : 'en-gb')
                                            .format('HH:mm, ddd, DD/MM/YYYY')}
                                    </p>
                                    <div className={`flightTicket open`}>
                                        <div className="flightTicket__box">
                                            <div className="flightTicket__left">
                                                <div className="flightTicket__logo">
                                                    <img
                                                        src={showLogoAirProvider(item.airline_provider)}
                                                        alt={item.airline_provider}
                                                    />
                                                </div>
                                                <div className="flightTicket__info">
                                                    <div className="tripBox">
                                                        <div className="tripBox__item">
                                                            <p className="p1">{item?.origin_code}</p>
                                                            <p className="p2">
                                                                {convertAirportCodeToName(item?.origin_code)}
                                                            </p>
                                                        </div>
                                                        <div className="tripBox__item">
                                                            <p className="p3">&nbsp;</p>
                                                            <div className="tripBox__icon">
                                                                <IconFlightTrip />
                                                            </div>
                                                        </div>
                                                        <div className="tripBox__item">
                                                            <p className="p1">{item?.destination_code}</p>
                                                            <p className="p2">
                                                                {convertAirportCodeToName(item?.destination_code)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flightTicket__date">
                                                    <span className="yellow-1 semibold size-16">
                                                        <DisplayPrice price={item?.total_price} />
                                                    </span>
                                                    <br />
                                                    <span className={`italic size-12`} style={{ whiteSpace: 'nowrap' }}>
                                                        {t(`Đã bao gồm hành lý ký gửi`)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flightTicket__detail">
                                            {dataOrder['booking_request']['type'] === 'flight' && (
                                                <div className="ticketDetail__item">
                                                    <p className={'semibold size-18 yellow-1'}>
                                                        {t('Thông tin chi tiết chặng bay')}
                                                    </p>
                                                    {item?.calculated_price?.flightItem?.listSegment &&
                                                        item?.calculated_price?.flightItem?.listSegment.map(
                                                            (segment: any, indexSegment: number) => {
                                                                return (
                                                                    <div
                                                                        className={`box-segment d-flex ${
                                                                            indexSegment !== 0 ? 'mt10' : ''
                                                                        }`}
                                                                        key={'segment' + index + indexSegment}
                                                                    >
                                                                        <div className="d-flex w33 justify-content-space-between">
                                                                            <p className="p1">{t('Cất cánh')}:</p>
                                                                            <p className={'semibold text-right'}>
                                                                                {convertAirportCodeToName(
                                                                                    segment?.startPoint
                                                                                )}
                                                                            </p>
                                                                        </div>

                                                                        <div className="d-flex w33 justify-content-space-between pl30">
                                                                            <p className="p1">{t('Hạ cánh')}:</p>
                                                                            <p className={'semibold text-right'}>
                                                                                {convertAirportCodeToName(
                                                                                    segment?.endPoint
                                                                                )}
                                                                            </p>
                                                                        </div>
                                                                        <div className="d-flex w33 justify-content-space-between pl30">
                                                                            <p className="p1">{t('Thời gian bay')}:</p>
                                                                            <p className={'semibold text-right'}>
                                                                                {convertMinsToHrsMins(
                                                                                    segment?.duration
                                                                                )}
                                                                            </p>
                                                                        </div>
                                                                        <div className="d-flex w33 justify-content-space-between">
                                                                            <p className="p1">
                                                                                {t('Thời gian cất cánh')}:
                                                                            </p>
                                                                            <p className={'semibold text-right'}>
                                                                                {moment(segment?.startTime)
                                                                                    .locale(
                                                                                        i18n.language === 'vi'
                                                                                            ? 'vi'
                                                                                            : 'en-gb'
                                                                                    )
                                                                                    .format('HH:mm, ddd, DD/MM/YYYY')}
                                                                            </p>
                                                                        </div>
                                                                        <div className="d-flex w33 justify-content-space-between pl30">
                                                                            <p className="p1">
                                                                                {t('Thời gian hạ cánh')}:
                                                                            </p>
                                                                            <p className={'semibold text-right'}>
                                                                                {moment(segment?.endTime)
                                                                                    .locale(
                                                                                        i18n.language === 'vi'
                                                                                            ? 'vi'
                                                                                            : 'en-gb'
                                                                                    )
                                                                                    .format('HH:mm, ddd, DD/MM/YYYY')}
                                                                            </p>
                                                                        </div>

                                                                        <div className="d-flex w33 pl30 justify-content-space-between">
                                                                            <p className="p1">{t('Chuyến bay')}:</p>
                                                                            <p className={'semibold text-right'}>
                                                                                {segment?.flightNumber}
                                                                            </p>
                                                                        </div>
                                                                        <div className="d-flex w33 justify-content-space-between">
                                                                            <p className="p1">
                                                                                {t('Hành lý xách tay')}:
                                                                            </p>
                                                                            <p className="semibold text-right">
                                                                                {segment?.handBaggage}
                                                                            </p>
                                                                        </div>
                                                                        <div className="d-flex w33 pl30 justify-content-space-between">
                                                                            <p className="p1">{t('Hạng đặt chỗ')}:</p>
                                                                            <p className="semibold text-right">
                                                                                {segment?.class}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            }
                                                        )}
                                                </div>
                                            )}
                                            <div className="ticketDetail">
                                                {dataOrder['booking_request']['type'] === 'flight' && (
                                                    <div className="ticketDetail__item">
                                                        <p className="semibold size-18 mb15 ticketDetail__title">
                                                            {t('Chi tiết giá vé')}
                                                        </p>

                                                        <div className="ticketDetail__table">
                                                            <div className="ticketDetail__table__header">
                                                                <div className="ticketDetail__table__cell">
                                                                    <p className="semibold">{t('Hành khách')}</p>
                                                                </div>
                                                                <div className="ticketDetail__table__cell">
                                                                    <p className="semibold">{t('Số lượng')}</p>
                                                                </div>
                                                                <div className="ticketDetail__table__cell text-right">
                                                                    <p className="semibold">{t('Giá vé')}</p>
                                                                </div>
                                                                <div className="ticketDetail__table__cell text-right">
                                                                    <p className="semibold">{t('Thuế và phí')}</p>
                                                                </div>
                                                                <div className="ticketDetail__table__cell text-right">
                                                                    <p className="semibold">{t('Chi phí vận hành')}</p>
                                                                </div>
                                                                <div className="ticketDetail__table__cell text-right">
                                                                    <p className="semibold">{t('Tổng giá')}</p>
                                                                </div>
                                                            </div>
                                                            <div className="ticketDetail__table__body">
                                                                {item?.calculated_price?.adt > 0 && (
                                                                    <div className="ticketDetail__table__row">
                                                                        <div className="ticketDetail__table__cell">
                                                                            <p className="titleMobile">
                                                                                {t('flight:Hành khách')}
                                                                            </p>
                                                                            <p>{t('flight:Người lớns')}</p>
                                                                        </div>
                                                                        <div className="ticketDetail__table__cell">
                                                                            <p className="titleMobile">
                                                                                {t('flight:Số lượng')}
                                                                            </p>
                                                                            <p>{item?.calculated_price?.adt}</p>
                                                                        </div>
                                                                        <div className="ticketDetail__table__cell text-right">
                                                                            <p className="titleMobile">
                                                                                {t('flight:Giá vé')}
                                                                            </p>
                                                                            <p>
                                                                                <DisplayPrice
                                                                                    price={
                                                                                        item?.calculated_price?.fareAdt
                                                                                    }
                                                                                />
                                                                            </p>
                                                                        </div>
                                                                        <div className="ticketDetail__table__cell text-right">
                                                                            <p className="titleMobile">
                                                                                {t('flight:Thuế và phí')}
                                                                            </p>
                                                                            <p>
                                                                                <DisplayPrice
                                                                                    price={
                                                                                        item?.calculated_price?.feeAdt +
                                                                                        item?.calculated_price?.taxAdt
                                                                                    }
                                                                                />
                                                                            </p>
                                                                        </div>
                                                                        <div className="ticketDetail__table__cell text-right">
                                                                            <p className="titleMobile">
                                                                                {t('flight:Chi phí vận hành')}
                                                                            </p>
                                                                            <p>
                                                                                <DisplayPrice
                                                                                    price={
                                                                                        item?.calculated_price
                                                                                            ?.serviceFeeAdt
                                                                                    }
                                                                                />
                                                                            </p>
                                                                        </div>
                                                                        <div className="ticketDetail__table__cell text-right">
                                                                            <p className="titleMobile">
                                                                                {t('flight:Tổng giá')}
                                                                            </p>
                                                                            <p>
                                                                                <DisplayPrice
                                                                                    price={
                                                                                        (item?.calculated_price
                                                                                            ?.fareAdt +
                                                                                            item?.calculated_price
                                                                                                ?.feeAdt +
                                                                                            item?.calculated_price
                                                                                                ?.taxAdt +
                                                                                            item?.calculated_price
                                                                                                ?.serviceFeeAdt) *
                                                                                        item?.calculated_price?.adt
                                                                                    }
                                                                                />
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                {item?.calculated_price?.chd > 0 && (
                                                                    <div className="ticketDetail__table__row">
                                                                        <div className="ticketDetail__table__cell">
                                                                            <p className="titleMobile">
                                                                                {t('flight:Hành khách')}
                                                                            </p>
                                                                            <p>{t('flight:Trẻ em')}</p>
                                                                        </div>
                                                                        <div className="ticketDetail__table__cell">
                                                                            <p className="titleMobile">
                                                                                {t('flight:Số lượng')}
                                                                            </p>
                                                                            <p>{item?.calculated_price?.adt}</p>
                                                                        </div>
                                                                        <div className="ticketDetail__table__cell text-right">
                                                                            <p className="titleMobile">
                                                                                {t('flight:Giá vé')}
                                                                            </p>
                                                                            <p>
                                                                                <DisplayPrice
                                                                                    price={
                                                                                        item?.calculated_price?.fareChd
                                                                                    }
                                                                                />
                                                                            </p>
                                                                        </div>
                                                                        <div className="ticketDetail__table__cell text-right">
                                                                            <p className="titleMobile">
                                                                                {t('flight:Thuế và phí')}
                                                                            </p>
                                                                            <p>
                                                                                <DisplayPrice
                                                                                    price={
                                                                                        item?.calculated_price?.feeChd +
                                                                                        item?.calculated_price?.taxChd
                                                                                    }
                                                                                />
                                                                            </p>
                                                                        </div>
                                                                        <div className="ticketDetail__table__cell text-right">
                                                                            <p className="titleMobile">
                                                                                {t('flight:Chi phí vận hành')}
                                                                            </p>
                                                                            <p>
                                                                                <DisplayPrice
                                                                                    price={
                                                                                        item?.calculated_price
                                                                                            ?.serviceFeeChd
                                                                                    }
                                                                                />
                                                                            </p>
                                                                        </div>
                                                                        <div className="ticketDetail__table__cell text-right">
                                                                            <p className="titleMobile">
                                                                                {t('flight:Tổng giá')}
                                                                            </p>
                                                                            <p>
                                                                                <DisplayPrice
                                                                                    price={
                                                                                        (item?.calculated_price
                                                                                            ?.fareChd +
                                                                                            item?.calculated_price
                                                                                                ?.feeChd +
                                                                                            item?.calculated_price
                                                                                                ?.taxChd +
                                                                                            item?.calculated_price
                                                                                                ?.serviceFeeChd) *
                                                                                        item?.calculated_price?.chd
                                                                                    }
                                                                                />
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                {item?.calculated_price?.inf > 0 && (
                                                                    <div className="ticketDetail__table__row">
                                                                        <div className="ticketDetail__table__cell">
                                                                            <p className="titleMobile">
                                                                                {t('flight:Hành khách')}
                                                                            </p>
                                                                            <p>{t('flight:Trẻ sơ sinh')}</p>
                                                                        </div>
                                                                        <div className="ticketDetail__table__cell">
                                                                            <p className="titleMobile">
                                                                                {t('flight:Số lượng')}
                                                                            </p>
                                                                            <p>{item?.calculated_price?.inf}</p>
                                                                        </div>
                                                                        <div className="ticketDetail__table__cell text-right">
                                                                            <p className="titleMobile">
                                                                                {t('flight:Giá vé')}
                                                                            </p>
                                                                            <p>
                                                                                <DisplayPrice
                                                                                    price={
                                                                                        item?.calculated_price?.fareInf
                                                                                    }
                                                                                />
                                                                            </p>
                                                                        </div>
                                                                        <div className="ticketDetail__table__cell text-right">
                                                                            <p className="titleMobile">
                                                                                {t('flight:Thuế và phí')}
                                                                            </p>
                                                                            <p>
                                                                                <DisplayPrice
                                                                                    price={
                                                                                        item?.calculated_price?.feeInf +
                                                                                        item?.calculated_price?.taxInf
                                                                                    }
                                                                                />
                                                                            </p>
                                                                        </div>
                                                                        <div className="ticketDetail__table__cell text-right">
                                                                            <p className="titleMobile">
                                                                                {t('flight:Chi phí vận hành')}
                                                                            </p>
                                                                            <p>
                                                                                <DisplayPrice
                                                                                    price={
                                                                                        item?.calculated_price
                                                                                            ?.serviceFeeInf
                                                                                    }
                                                                                />
                                                                            </p>
                                                                        </div>
                                                                        <div className="ticketDetail__table__cell text-right">
                                                                            <p className="titleMobile">
                                                                                {t('flight:Tổng giá')}
                                                                            </p>
                                                                            <p>
                                                                                <DisplayPrice
                                                                                    price={
                                                                                        (item?.calculated_price
                                                                                            ?.fareInf +
                                                                                            item?.calculated_price
                                                                                                ?.feeInf +
                                                                                            item?.calculated_price
                                                                                                ?.taxInf +
                                                                                            item?.calculated_price
                                                                                                ?.serviceFeeInf) *
                                                                                        item?.calculated_price?.inf
                                                                                    }
                                                                                />
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="ticketDetail__table__total">
                                                                <span className="span1">
                                                                    {t('flight:Tổng giá vé')}:&nbsp;
                                                                </span>
                                                                <span className="yellow-1">
                                                                    <DisplayPrice price={item?.request_price} />
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                                <div className="ticketDetail__item">
                                                    <p className="semibold size-18 mb15 ticketDetail__title">
                                                        {t(
                                                            dataOrder['booking_request']['type'] === 'flight'
                                                                ? 'flight:Hành lý'
                                                                : 'flight:Thông tin hành khách'
                                                        )}
                                                    </p>
                                                    <div className="ticketDetail__table">
                                                        <div className="ticketDetail__table__header">
                                                            <div className="ticketDetail__table__cell">
                                                                <p className="semibold">{t('flight:Hành khách')}</p>
                                                            </div>
                                                            <div className="ticketDetail__table__cell">
                                                                <p className="semibold">{t('common:Họ và tên')}</p>
                                                            </div>
                                                            <div className="ticketDetail__table__cell">
                                                                <p className="semibold">
                                                                    {t(
                                                                        dataOrder['booking_request']['type'] ===
                                                                            'flight'
                                                                            ? 'flight:Tên gói hành lý'
                                                                            : 'flight:Mã vé'
                                                                    )}
                                                                </p>
                                                            </div>
                                                            <div className="ticketDetail__table__cell">
                                                                <p className="semibold">
                                                                    {t(
                                                                        dataOrder['booking_request']['type'] ===
                                                                            'flight'
                                                                            ? 'flight:Giá hành lý'
                                                                            : 'flight:Giá tiền'
                                                                    )}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="ticketDetail__table__body">
                                                            {Array.isArray(item?.passengers) &&
                                                                item?.passengers.length > 0 &&
                                                                item?.passengers.map(
                                                                    (res: any, indexPassenger: number) => {
                                                                        return (
                                                                            <div
                                                                                className="ticketDetail__table__row"
                                                                                key={`passenger_${index}${indexPassenger}`}
                                                                            >
                                                                                <div className="ticketDetail__table__cell">
                                                                                    <p className="titleMobile">
                                                                                        {t('flight:Hành khách')}
                                                                                    </p>
                                                                                    <p>
                                                                                        {res.type === 'ADT' &&
                                                                                            t('flight:Người lớns')}
                                                                                        {res.type === 'CHD' &&
                                                                                            t('flight:Trẻ em')}
                                                                                        {res.type === 'INF' &&
                                                                                            t('flight:Trẻ sơ sinh')}
                                                                                    </p>
                                                                                </div>
                                                                                <div className="ticketDetail__table__cell">
                                                                                    <p className="titleMobile">
                                                                                        {t('flight:Họ và tên')}
                                                                                    </p>
                                                                                    <p>
                                                                                        {dataOrder['booking_request'][
                                                                                            'type'
                                                                                        ] === 'flight'
                                                                                            ? res?.lastName +
                                                                                              ' ' +
                                                                                              res?.firstName
                                                                                            : res?.name}
                                                                                    </p>
                                                                                </div>
                                                                                <div className="ticketDetail__table__cell">
                                                                                    <p className="titleMobile">
                                                                                        {t(
                                                                                            dataOrder[
                                                                                                'booking_request'
                                                                                            ]['type'] === 'flight'
                                                                                                ? 'flight:Tên gói hành lý'
                                                                                                : 'flight:Mã vé'
                                                                                        )}
                                                                                    </p>
                                                                                    <p>
                                                                                        {dataOrder['booking_request'][
                                                                                            'type'
                                                                                        ] === 'flight'
                                                                                            ? res?.listBaggage.filter(
                                                                                                  (baggage: any) =>
                                                                                                      baggage['leg'] ===
                                                                                                      item
                                                                                                          ?.calculated_price
                                                                                                          ?.leg
                                                                                              ).length
                                                                                                ? res?.listBaggage.filter(
                                                                                                      (baggage: any) =>
                                                                                                          baggage[
                                                                                                              'leg'
                                                                                                          ] ===
                                                                                                          item
                                                                                                              ?.calculated_price
                                                                                                              ?.leg
                                                                                                  )[0]['name']
                                                                                                : ''
                                                                                            : res?.ticketNumber}
                                                                                    </p>
                                                                                </div>
                                                                                <div className="ticketDetail__table__cell">
                                                                                    <p className="titleMobile">
                                                                                        {t('flight:Giá hành lý')}
                                                                                    </p>
                                                                                    <p>
                                                                                        {dataOrder['booking_request'][
                                                                                            'type'
                                                                                        ] === 'flight' ? (
                                                                                            <DisplayPrice
                                                                                                price={
                                                                                                    res?.listBaggage.filter(
                                                                                                        (
                                                                                                            baggage: any
                                                                                                        ) =>
                                                                                                            baggage[
                                                                                                                'leg'
                                                                                                            ] ===
                                                                                                            item
                                                                                                                ?.calculated_price
                                                                                                                ?.leg
                                                                                                    ).length
                                                                                                        ? res?.listBaggage.filter(
                                                                                                              (
                                                                                                                  baggage: any
                                                                                                              ) =>
                                                                                                                  baggage[
                                                                                                                      'leg'
                                                                                                                  ] ===
                                                                                                                  item
                                                                                                                      ?.calculated_price
                                                                                                                      ?.leg
                                                                                                          )[0]['price']
                                                                                                        : 0
                                                                                                }
                                                                                            />
                                                                                        ) : (
                                                                                            Array.isArray(
                                                                                                item?.price_info
                                                                                                    ?.priceFeeList
                                                                                            ) &&
                                                                                            item?.price_info?.priceFeeList.filter(
                                                                                                (priceInfo: any) =>
                                                                                                    priceInfo[
                                                                                                        'code'
                                                                                                    ] ===
                                                                                                    'FARE_' +
                                                                                                        res['type']
                                                                                            ).length && (
                                                                                                <DisplayPrice
                                                                                                    price={
                                                                                                        item?.price_info?.priceFeeList.filter(
                                                                                                            (
                                                                                                                priceInfo: any
                                                                                                            ) =>
                                                                                                                priceInfo[
                                                                                                                    'code'
                                                                                                                ] ===
                                                                                                                'FARE_' +
                                                                                                                    res[
                                                                                                                        'type'
                                                                                                                    ]
                                                                                                        )[0]['fee']
                                                                                                    }
                                                                                                />
                                                                                            )
                                                                                        )}
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    }
                                                                )}
                                                        </div>
                                                        <div className="ticketDetail__table__total">
                                                            <span className="span1">
                                                                {t(
                                                                    dataOrder['booking_request']['type'] === 'flight'
                                                                        ? 'flight:Tổng chi phí hành lý'
                                                                        : 'flight:Tổng chi phí'
                                                                )}
                                                                :&nbsp;
                                                            </span>
                                                            <span className="yellow-1">
                                                                <DisplayPrice
                                                                    price={
                                                                        dataOrder['booking_request']['type'] ===
                                                                        'flight'
                                                                            ? totalPriceBaggage(
                                                                                  item?.passengers,
                                                                                  item?.calculated_price?.leg
                                                                              )
                                                                            : totalPriceOfflineFlight(index)
                                                                    }
                                                                />
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    <div className="ticketDetail__item text-right">
                        {dataOrder?.payment_fee && (
                            <div className="ticketDetail__total paymentFee text-right">
                                <span className="span1">{t('flight:Phí thanh toán')}:&nbsp;</span>
                                <span className="yellow-1">
                                    <DisplayPrice price={dataOrder?.payment_fee?.total_price} />
                                </span>
                            </div>
                        )}
                        <div className="ticketDetail__total">
                            <span className="span1">{t('flight:Tổng tiền')}:&nbsp;</span>
                            <span className="yellow-1">
                                <DisplayPrice price={dataOrder?.final_price} />
                            </span>
                        </div>
                    </div>
                </div>
            )}
            <ExportInvoice
                customerData={dataOrder?.extra_customer_data}
                orderId={dataOrder?.id}
                orderCode={dataOrder?.order_code}
                orderToken={dataOrder?.order_token_invoice}
            />
        </>
    )
}
export default OrderDetailFlightComponent
