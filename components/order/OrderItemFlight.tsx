import React, { useEffect, useState } from 'react'
import { IconFlightTrip } from '../../constants/icons'
import Link from 'next/link'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import { convertOrderStatus, convertClass } from '../../utils/common'
import DisplayPrice from '../common/DisplayPrice'
import { convertAirportCodeToCityName, convertMinsToHrsMins, showLogoAirProvider } from '../../utils/flight'
import { PATH_FLIGHT_CHECKOUT_STEP2, PATH_USER } from '../../constants/common'

interface Props {
    type: 'booking_request' | 'order'
    orderCode: string
    orderId: string
    bookingSuggestionId: string
    orderStatus: string
    totalPrice: number
    flightItems: any[]
}

const OrderItemFlight: React.FC<Props> = ({
    type,
    orderCode,
    orderStatus,
    totalPrice,
    flightItems,
    orderId,
    bookingSuggestionId,
}) => {
    const { t } = useTranslation(['flight', 'payment', 'common', 'hotel'])
    const { i18n } = useTranslation()
    const [items, setItems] = useState<any[]>([])
    const [isExpiredPayment, setIsExpiredPayment] = useState<boolean>(false)
    const [totalPriceBr, setTotalPriceBr] = useState<number>(0)
    useEffect(() => {
        if (Array.isArray(flightItems) && flightItems.length > 0) {
            const _sorted = flightItems.sort((item1, item2) => {
                return type === 'order'
                    ? item1.is_return - item2.is_return
                    : item1.flight_rate.leg - item2.flight_rate.leg
            })
            let totalPrice = 0
            setItems(
                _sorted.map((item: any, index: number) => {
                    totalPrice += item?.flight_reservation?.total_price
                    if (index === 0) {
                        item.flight_rate?.['passengers'].forEach((passenger: any, indexRate: number) => {
                            passenger?.['listBaggage'].forEach((baggage: any) => {
                                totalPrice += baggage?.['price']
                            })
                        })
                    }
                    return type === 'order'
                        ? {
                              ...item,
                              data: item.calculated_price,
                              providerBookingCode: item?.atadi_provider_booking_code,
                          }
                        : {
                              ...item.flight_rate,
                              data: item.flight_rate && item.flight_rate.rate,
                              providerBookingCode:
                                  item.flight_reservation && item.flight_reservation.atadi_provider_booking_code,
                          }
                })
            )
            setTotalPriceBr(totalPrice)
            setIsExpiredPayment(
                type === 'booking_request' &&
                    flightItems.some((item) =>
                        moment().isAfter(item.flight_reservation && item.flight_reservation.atadi_order_expired_at)
                    )
            )
        } else {
            setItems([])
        }
    }, [flightItems, type])

    if (!isExpiredPayment) {
        return (
            <div className="profileFlight__item">
                <div className="ticketInfo">
                    <div className="ticketInfo__item">
                        <div className="boxTitle__item d-flex">
                            <p className="mb0 semibold gray-5">{t('hotel:Mã đơn hàng')}:&nbsp;</p>
                            <p className="mb0 semibold">{orderCode}</p>
                        </div>
                        <div className="boxTitle__item d-flex">
                            <p className="mb0 semibold gray-5">{t('Tình trạng đặt vé')}:&nbsp;</p>
                            <p className={`mb0 semibold ${convertClass(orderStatus)}`}>
                                {convertOrderStatus(orderStatus)}{' '}
                                {isExpiredPayment && (
                                    <span className="red-1">
                                        {isExpiredPayment && ` (${t('payment:Đã hết hạn thanh toán')})`}
                                    </span>
                                )}
                            </p>
                        </div>
                        <div className="boxTitle__item d-flex">
                            <p className="mb0 semibold gray-5">{t('payment:Tổng cộng')}:&nbsp;</p>
                            <p className="mb0 bold yellow-1">
                                {' '}
                                <DisplayPrice price={totalPriceBr ? totalPriceBr : totalPrice} />
                            </p>
                        </div>
                    </div>
                    <div className="ticketInfo__item">
                        {items.map((item) => {
                            const flight = item?.data?.flightItem
                            return (
                                <div key={item.id} className="ticketInfo__flight flexGroup">
                                    <div className="ticketInfo__flight__logo">
                                        <div style={{ width: 60, height: 35 }} className="ticketInfo__flight__logo">
                                            <img
                                                style={{ objectFit: 'contain' }}
                                                src={showLogoAirProvider(item.data.airline)}
                                                alt={item.data.airline}
                                            />
                                        </div>
                                    </div>
                                    <div className="ticketInfo__flight__info">
                                        <div className="tripBox">
                                            <div className="tripBox__item">
                                                <p className="p1">{flight?.startPoint}</p>
                                                <p className="p2">{convertAirportCodeToCityName(flight?.startPoint)}</p>
                                            </div>
                                            <div className="tripBox__item">
                                                <p className="p3">{convertMinsToHrsMins(flight?.duration)}</p>
                                                <div className="tripBox__icon">
                                                    <IconFlightTrip />
                                                </div>
                                                <p className="p3">{flight?.flightNumber}</p>
                                            </div>
                                            <div className="tripBox__item">
                                                <p className="p1">{flight?.endPoint}</p>
                                                <p className="p2">{convertAirportCodeToCityName(flight?.endPoint)}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ticketInfo__flight__date">
                                        <p className="p1">
                                            {moment(flight?.startDate)
                                                .locale(i18n.language === 'vi' ? 'vi' : 'en-gb')
                                                .format('dddd, DD/MM/YYYY')}
                                        </p>
                                        <p className="p2">
                                            {moment(flight?.startDate).format('HH:mm')} -{' '}
                                            {moment(flight?.endDate).format('HH:mm')}
                                        </p>
                                    </div>
                                    {item?.providerBookingCode && (
                                        <div className="ticketInfo__flight__code">
                                            <div className="holdResult__code">
                                                {t('Mã đặt chỗ')}:{' '}
                                                <strong style={{ wordBreak: 'break-all' }} className="green-1">
                                                    {item?.providerBookingCode}
                                                </strong>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                        <div className="ticketInfo__btn text-right">
                            {type === 'booking_request' ? (
                                <Link href={PATH_FLIGHT_CHECKOUT_STEP2 + '/' + orderId + '/' + bookingSuggestionId}>
                                    <a className="btn btn_orange">{t('common:Tiếp tục thanh toán')}</a>
                                </Link>
                            ) : (
                                <Link href={PATH_USER.FLIGHT_DETAIL} as={`${PATH_USER.FLIGHT}/${orderId}`}>
                                    <a className="btn btn_orange">{t('common:Quản lý')}</a>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return null
}

export default OrderItemFlight
