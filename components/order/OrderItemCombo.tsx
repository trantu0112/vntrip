import React from 'react'
import moment from 'moment'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { convertClass, convertOrderStatus } from '../../utils/common'
import { PATH_USER } from '../../constants/common'
import DisplayPrice from '../common/DisplayPrice'
import { showLogoAirProvider } from '../../utils/flight'

interface Props {
    data: any
}

const OrderItemCombo: React.FC<Props> = ({ data }) => {
    const { t } = useTranslation(['hotel', 'common', 'flight'])
    return (
        <div className="listOrder__item">
            <div className="hotelOrder">
                <div className="hotelOrder__img">
                    <div className="lazyload-wrapper">
                        <img
                            src={
                                data?.order_data?.deal_options.deal_data?.image_deal?.[0].image ||
                                'https://statics.vntrip.vn/website/images/upload/no-image.png'
                            }
                            alt={data?.order_data?.deal_options.deal_data?.name}
                        />
                    </div>
                </div>
                <div className="hotelOrder__cont">
                    <div className="hotelOrder__left">
                        <h3 className="hotelName">{data?.order_data?.deal_options.deal_data?.name}</h3>
                        <ul className="hotelOrder__list">
                            <li>
                                <p className="mb0 gray-5">{t('Mã đơn hàng')}:</p>
                                <p className="mb0 yellow-1 semibold">{data?.order_data?.order_code}</p>
                            </li>
                            <li>
                                <p className="mb0 gray-5">{t('Thời gian combo')}:</p>
                                <p className="mb0 semibold">
                                    {data?.order_data?.deal_options?.deal_data?.days} ngày{' '}
                                    {data?.order_data?.deal_options?.deal_data?.nights} đêm
                                </p>
                            </li>
                            <li>
                                <p className="mb0 gray-5">{t('Ngày khởi hành')}:</p>
                                <p className="mb0 semibold">
                                    {moment(data?.flight_item[0]?.departure_date).format('dddd, LL')}
                                </p>
                            </li>
                            {Array.isArray(data.flight_item) &&
                                data.flight_item.length > 0 &&
                                data.flight_item.map((flight: any) => {
                                    return (
                                        <li key={flight.id}>
                                            <p className="mb0 gray-5">
                                                {flight.is_return ? t('flight:Chuyến về') : t('flight:Chuyến đi')}:
                                            </p>
                                            <div className="flight">
                                                <div className="mr5">
                                                    <img
                                                        className="p-logo"
                                                        src={showLogoAirProvider(flight.airline_provider)}
                                                        alt={flight.airline_provider}
                                                    />
                                                </div>
                                                <div className="p-flight">
                                                    <span>
                                                        {flight.origin_code} - {flight.destination_code} ({' '}
                                                        {moment(flight.departure_time).format('HH:mm DD/MM/YYYY')} )
                                                    </span>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })}
                            <li>
                                <p className="mb0 gray-5">{t('common:Tình trạng')}:</p>
                                <p className={`mb0 semibold ${convertClass(data.order_data.order_status)}`}>
                                    {' '}
                                    {convertOrderStatus(data.order_data.order_status)}
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div className="hotelOrder__right">
                        <div className="hotelOrder__price">
                            <p className="mb0 p1 gray-5">{t('common:Tổng cộng')}</p>
                            <p className="mb0 yellow-1 bold size-20 p2">
                                <DisplayPrice price={data?.order_data?.final_price} />
                            </p>
                        </div>
                        <div className="hotelOrder__btn">
                            <Link href={PATH_USER.COMBO_DETAIL} as={`${PATH_USER.COMBO}/${data?.order_data?.id}`}>
                                <a className="btn btn_orange w100">
                                    <span>{t('common:Quản lý')}</span>
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderItemCombo
