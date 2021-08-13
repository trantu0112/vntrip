import React, { FC } from 'react'
import RenderStarRate from '../hotel-list/RenderStarRate'
import RenderRewviewPoint from '../hotel-list/RenderReviewPoint'
import { IconClose, IconDownOutline } from '../../constants/icons'
import { getFullName } from '../../utils/user'
import DisplayPrice from '../common/DisplayPrice'
import { convertMealPlan, converVatAndFee } from '../../utils/hotel'
import { Space } from 'antd'
import Link from 'next/link'
import { PATH_HOTEL_CHECKOUT_STEP2 } from '../../constants/common'
import dynamic from 'next/dynamic'
import { useTranslation } from 'react-i18next'

const HotelGallery = dynamic(() => import('../../components/hotel-detail/HotelGallery'))
const HotelAddress = dynamic(() => import('../../components/common/HotelAddress'))
const OrderInfoHotel = dynamic(() => import('../../components/order/OrderInfoHotel'))
const CancelBooking = dynamic(() => import('../../components/order/CancelBooking'))
const ExportInvoice = dynamic(() => import('../../components/order/ExportInvoice'))

interface Props {
    hotel: any
    images: any
    openInfoMobile: any
    data: any
    dataLoyaltyInfo?: any
    dataLoyaltyRedem?: any
    isShowPaymentLink: any
    orderItem: any
    dataLoyaltyDiscount?: any
    isOpenInfoMobile: any
    closeInfoMobile: any
    cancelOrderToken?: any
}

const BookingDetail: FC<Props> = ({
    hotel,
    images,
    openInfoMobile,
    data,
    dataLoyaltyInfo,
    dataLoyaltyRedem,
    isShowPaymentLink,
    orderItem,
    dataLoyaltyDiscount,
    isOpenInfoMobile,
    closeInfoMobile,
    cancelOrderToken,
}) => {
    const { t } = useTranslation(['common', 'hotel'])
    return (
        <section className="profileWrapper">
            <div className="container">
                <div className="profileHotelDetail">
                    <div className="hotelDetail__header">
                        <div className="hotelDetail__info">
                            <h2 className="hotelName mb5">
                                {hotel?.hotel_name}
                                <RenderStarRate starRate={hotel?.hotel_star_rate} />
                            </h2>
                            <HotelAddress
                                fullAddress={hotel?.hotel_address}
                                latitude={hotel?.latitude}
                                longitude={hotel?.longitude}
                            />
                        </div>
                        {hotel?.review_point > 0 && (
                            <div className="hotelDetail__rate">
                                <RenderRewviewPoint point={hotel?.review_point} count={hotel?.count_reviews} />
                            </div>
                        )}

                        <HotelGallery
                            hotelId={hotel?.hotel_id}
                            hotelName={hotel?.hotel_name}
                            images={images}
                            images360={hotel?.images_360}
                            latitude={hotel?.latitude}
                            longitude={hotel?.longitude}
                            isDomestic={true}
                            isCombo={false}
                        />
                    </div>
                    <div
                        className="showBookingMobile"
                        onClick={openInfoMobile}
                        onKeyUp={openInfoMobile}
                        role={'button'}
                        tabIndex={0}
                    >
                        <span>{t('hotel:Thông tin đơn đặt phòng')}</span>
                        <IconDownOutline />
                    </div>
                    <div className="profileHotelDetail__body">
                        <div className="profileHotelDetail__main">
                            <div className="profileHotelDetail__left">
                                {Array.isArray(data?.order_item_hotel_data) &&
                                    data?.order_item_hotel_data.map((item: any, index: number) => {
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
                                                                    {t('Tối đa')} {item?.extra_rate_data?.max_adult}
                                                                </p>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="d-block">
                                                                <p className="mb0">{t('Giá phòng')}</p>
                                                            </div>
                                                            <div className="d-block">
                                                                <p className="mb0 semibold yellow-1">
                                                                    {item.provider === 'VNTRIP' && (
                                                                        <DisplayPrice
                                                                            price={
                                                                                item?.reservation_data?.show_prices
                                                                                    ?.final_price?.incl_vat_fee_price
                                                                            }
                                                                        />
                                                                    )}
                                                                    {item.provider === 'bookingcom' && (
                                                                        <DisplayPrice
                                                                            price={
                                                                                item?.reservation_data?.deal_tagging
                                                                                    ? item.total_price -
                                                                                      (item.total_price / 100) *
                                                                                          item.reservation_data
                                                                                              .deal_tagging
                                                                                              .discount_percentage
                                                                                    : item.total_price
                                                                            }
                                                                        />
                                                                    )}
                                                                    {item.provider === 'rapid' && (
                                                                        <DisplayPrice
                                                                            price={
                                                                                item.reservation_data?.room_rate
                                                                                    ?.show_prices?.final_price
                                                                                    ?.incl_vat_fee_price
                                                                            }
                                                                        />
                                                                    )}
                                                                    {item.provider === 'expedia' && (
                                                                        <DisplayPrice
                                                                            price={
                                                                                item.reservation_data?.promotion?.detail
                                                                                    ? ''
                                                                                    : item.total_price
                                                                            }
                                                                        />
                                                                    )}
                                                                </p>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="profileHotelDetail__note">
                                                                <p className="mb0 size-12">
                                                                    {item.extra_rate_data.cancel_policies}
                                                                </p>
                                                                <p className="mb0 size-12">
                                                                    {t('hotel:Bữa ăn')}:{' '}
                                                                    {convertMealPlan(item.extra_rate_data.meal_plan, t)}
                                                                </p>
                                                                <p className="mb0 size-12">
                                                                    {t('Thuế và phí')}:{' '}
                                                                    {converVatAndFee(
                                                                        item.provider,
                                                                        item.reservation_data.included_VAT,
                                                                        item.reservation_data.included_service_fee,
                                                                        item.reservation_data.vat
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
                                                        <DisplayPrice price={dataLoyaltyInfo?.loyalty?.value} />
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
                                            <CancelBooking
                                                orderId={data?.id}
                                                cancelPolicies={orderItem?.extra_rate_data?.cancel_policies}
                                                roomCount={orderItem?.rooms}
                                                roomName={orderItem?.extra_rate_data?.room_name}
                                                orderStatus={data?.order_status}
                                                checkInDate={orderItem?.check_in_date}
                                                cancelOrderToken={cancelOrderToken}
                                            />

                                            <Space>&nbsp;&nbsp;&nbsp;</Space>

                                            <ExportInvoice
                                                customerData={data?.extra_customer_data}
                                                orderId={data?.id}
                                                orderCode={data?.order_code}
                                                orderToken={data?.order_token_invoice}
                                            />

                                            <Space>&nbsp;&nbsp;&nbsp;</Space>
                                            {isShowPaymentLink && (
                                                <Link href={PATH_HOTEL_CHECKOUT_STEP2 + '/' + data?.booking_request_id}>
                                                    <a className="btn btn_orange">{t('Tiếp tục thanh toán')}</a>
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`profileHotelDetail__right ${isOpenInfoMobile ? 'open' : ''}`}>
                                <div className="headerPopup">
                                    <p>{t('hotel:Thông tin đơn đặt phòng')}</p>
                                    <button type="button" className="headerPopup__close" onClick={closeInfoMobile}>
                                        <IconClose />
                                    </button>
                                </div>
                                <div className="checkoutLayout__sidebar">
                                    <OrderInfoHotel
                                        orderData={data}
                                        dataLoyaltyRedem={dataLoyaltyRedem}
                                        dataLoyaltyDiscount={dataLoyaltyDiscount}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BookingDetail
