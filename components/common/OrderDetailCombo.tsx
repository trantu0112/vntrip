import React from 'react'
import { getFullName } from '../../utils/user'
import DisplayPrice from './DisplayPrice'
import { convertMealPlan, converVatAndFee } from '../../utils/hotel'
import { showLogoAirProvider } from '../../utils/flight'
import moment from 'moment'
import { IconRight } from '../../constants/icons'
import { Space } from 'antd'
import { useTranslation } from 'react-i18next'
import dynamic from 'next/dist/next-server/lib/dynamic'
const HotelGallery = dynamic(() => import('../hotel-detail/HotelGallery'))
const OrderInfoCombo = dynamic(() => import('../order/OrderInfoCombo'))
const ExportInvoice = dynamic(() => import('../order/ExportInvoice'))
interface Props {
    dataCombo: any
    hotel: any
    images: any
    loyaltyInfo?: any
}
const OrderDetailComboComponent: React.FC<Props> = ({ dataCombo, hotel, images, loyaltyInfo }) => {
    const { t } = useTranslation(['hotel', ''])
    return (
        <>
            <div className="profileHotelDetail profileComboDetail">
                <div className="hotelDetail__header">
                    <div className="hotelDetail__info">
                        <h2 className="hotelName mb5">{dataCombo?.deal_options?.deal_data?.name}</h2>
                    </div>
                    <HotelGallery
                        hotelId={hotel?.hotel_id}
                        hotelName={hotel?.hotel_name}
                        images={images}
                        images360={hotel?.images_360}
                        latitude={hotel?.latitude}
                        longitude={hotel?.longitude}
                        isDomestic={true}
                        isCombo={true}
                    />
                </div>
                <div className="profileHotelDetail__body">
                    <div className="profileHotelDetail__main">
                        <div className="profileHotelDetail__left">
                            {Array.isArray(dataCombo?.order_item_hotel_data) &&
                                dataCombo?.order_item_hotel_data.map((item: any, index: number) => {
                                    return (
                                        <div className="profileHotelDetail__item" key={item.id || index}>
                                            <div className="checkoutLayout__title">
                                                <span>
                                                    {t('hotel:Chi tiết phòng')} {index + 1}
                                                </span>
                                            </div>
                                            <div className="profileHotelDetail__cont">
                                                <ul className="profileHotelDetail__list">
                                                    <li>
                                                        <p className="w100 mb0 semibold">
                                                            {item.rooms} x {item.extra_rate_data.room_name}
                                                        </p>
                                                    </li>
                                                    {Array.isArray(item.room_receiver) &&
                                                        item.room_receiver.map(
                                                            (receiver: any, indexReceiver: number) => (
                                                                <li key={indexReceiver}>
                                                                    <div className="d-block">
                                                                        <p className="mb0">
                                                                            {t('hotel:Người nhận phòng')}{' '}
                                                                            {indexReceiver + 1}
                                                                        </p>
                                                                    </div>
                                                                    <div className="d-block">
                                                                        <p className="mb0">
                                                                            {getFullName(
                                                                                receiver.first_name,
                                                                                receiver.last_name
                                                                            )}
                                                                        </p>
                                                                    </div>
                                                                </li>
                                                            )
                                                        )}
                                                    <li>
                                                        <div className="d-block">
                                                            <p className="mb0">{t('hotel:Số khách')}</p>
                                                        </div>
                                                        <div className="d-block">
                                                            <p className="mb0">
                                                                {t('Tối đa')} {item.reservation_data.adult_count}
                                                            </p>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="d-block">
                                                            <p className="mb0">{t('Giá phòng')}</p>
                                                        </div>
                                                        <div className="d-block">
                                                            <p className="mb0 yellow-1">
                                                                <DisplayPrice price={item.base_price} />
                                                            </p>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="profileHotelDetail__note">
                                                            <p className="mb0 size-12">
                                                                {t('hotel:Bữa ăn')}:{' '}
                                                                {convertMealPlan(item.extra_rate_data.meal_plan, t)}
                                                            </p>
                                                            <p className="mb0 size-12">
                                                                {t('Thuế và phí')}:{' '}
                                                                {converVatAndFee(
                                                                    item.provider,
                                                                    item.extra_rate_data.included_VAT,
                                                                    item.extra_rate_data.included_service_fee,
                                                                    item.extra_rate_data.vat
                                                                )}
                                                            </p>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    )
                                })}
                            <div className="profileHotelDetail__item">
                                <div className="checkoutLayout__title">
                                    <span>{t('hotel:Thông tin chuyến bay')}</span>
                                </div>
                                <div className="profileHotelDetail__cont">
                                    <ul className="profileHotelDetail__list">
                                        {Array.isArray(dataCombo?.order_item_flight_data) &&
                                            dataCombo?.order_item_flight_data.map((flight: any) => {
                                                return (
                                                    <div key={flight.id}>
                                                        <li className="pb0">
                                                            <div className="">
                                                                <p className="mb0">
                                                                    {flight.is_return
                                                                        ? t('hotel:Thông tin chuyến về')
                                                                        : t('hotel:Thông tin chuyến đi')}
                                                                    :
                                                                </p>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="p-logo mr5">
                                                                <img
                                                                    style={{
                                                                        width: '100%',
                                                                        height: '100%',
                                                                        objectFit: 'contain',
                                                                    }}
                                                                    src={showLogoAirProvider(flight.airline_provider)}
                                                                    alt={flight.airline_provider}
                                                                />
                                                            </div>
                                                            <div className="bold mr5">
                                                                <p className="semibold mb0">
                                                                    {moment(flight.departure_time).format(
                                                                        'HH:mm DD/MM/YYYY'
                                                                    )}
                                                                </p>
                                                            </div>
                                                            <div className="p-flight">
                                                                <span>
                                                                    <span className="text-center mr5">
                                                                        <strong className="mr5">
                                                                            {flight.origin_code}
                                                                        </strong>
                                                                        {flight.origin_name}
                                                                    </span>{' '}
                                                                    <span className="mr5">
                                                                        <IconRight />
                                                                    </span>
                                                                    <span className="text-center mr5">
                                                                        <strong className="mr5">
                                                                            {flight.destination_code}
                                                                        </strong>
                                                                        {flight.destination_name}
                                                                    </span>
                                                                </span>
                                                            </div>
                                                        </li>
                                                    </div>
                                                )
                                            })}
                                    </ul>
                                </div>
                            </div>

                            <div className="profileHotelDetail__item">
                                <div className="checkoutLayout__title">
                                    <span>{t('hotel:Thông tin tích lũy')}</span>
                                </div>
                                <div className="profileHotelDetail__cont">
                                    <ul className="profileHotelDetail__list">
                                        <li>
                                            <div className="d-block">
                                                <p className="mb0">{t('hotel:Hoàn tiền VNTRIP')}</p>
                                            </div>
                                            <div className="d-block">
                                                <p className="mb0 yellow-1">
                                                    <DisplayPrice price={loyaltyInfo?.loyalty?.value} />
                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="profileHotelDetail__item">
                                <div className="checkoutLayout__title">
                                    <span>Actions</span>
                                </div>
                                <div className="profileHotelDetail__cont">
                                    <div className="profileHotelDetail__btn">
                                        <ExportInvoice
                                            customerData={dataCombo?.extra_customer_data}
                                            orderId={dataCombo?.id}
                                            orderCode={dataCombo?.order_code}
                                            orderToken={dataCombo?.order_token_invoice}
                                        />
                                        <Space>&nbsp;&nbsp;&nbsp;</Space>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <OrderInfoCombo orderData={dataCombo} />
                    </div>
                </div>
            </div>
        </>
    )
}
export default OrderDetailComboComponent
