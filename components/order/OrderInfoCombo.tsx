import React from 'react'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import { convertClass, convertOrderStatus, convertPaymentMethod } from '../../utils/common'
import DisplayPrice from '../common/DisplayPrice'
import { IconClose } from '../../constants/icons'

interface Props {
    orderData: any
}

const OrderInfoCombo: React.FC<Props> = ({ orderData }) => {
    const { t } = useTranslation(['hotel', 'payment', 'common'])
    const orderItemFlight = orderData?.order_item_flight_data
    return (
        <div className="profileHotelDetail__right">
            <div className="headerPopup">
                <p>{t('Thông tin combo')}</p>
                <button type="button" className="headerPopup__close">
                    <IconClose />
                </button>
            </div>
            <div className="checkoutLayout__sidebar">
                <div className="bookingInfo">
                    <div className="bookingInfo__detail">
                        <p className="size-16 semibold mb15 pTitle">{t('Thông tin combo')}</p>
                        <ul>
                            <li>
                                <div className="text-left">{t('Mã đơn hàng')}</div>
                                <div className="text-right">
                                    <p className="semibold yellow-1">{orderData?.order_code}</p>
                                </div>
                            </li>
                            <li>
                                <div className="text-left">{t('Ngày đặt')}</div>
                                <div className="text-right">
                                    <p>{moment(orderData?.created_at).format('ddd, LL')}</p>
                                </div>
                            </li>
                            <li>
                                <div className="text-left">{t('Ngày đi')}</div>
                                <div className="text-right">
                                    <span className="d-block">
                                        {moment(orderItemFlight?.[0]?.departure_date).format('ddd, LL')} &nbsp;
                                    </span>
                                    <span className="d-block">
                                        {moment(orderItemFlight?.[0]?.departure_time).format('HH:mm')}
                                    </span>
                                </div>
                            </li>
                            <li>
                                <div className="text-left">{t('Ngày về')}</div>
                                <div className="text-right">
                                    <span className="d-block">
                                        {moment(orderItemFlight?.[1]?.departure_date).format('ddd, LL')} &nbsp;
                                    </span>
                                    <span className="d-block">
                                        {moment(orderItemFlight?.[1]?.departure_time).format('HH:mm')}
                                    </span>
                                </div>
                            </li>
                            <li>
                                <div className="text-left">{t('Thời gian combo')}</div>
                                <div className="text-right">
                                    <p>
                                        {orderData?.deal_options?.deal_data?.days} ngày ,{' '}
                                        {orderData?.deal_options?.deal_data?.nights} đêm
                                    </p>
                                </div>
                            </li>
                            <li>
                                <div className="text-left">{t('Người đặt')}</div>
                                <div className="text-right">
                                    <span className="d-block">
                                        {orderData?.extra_customer_data?.last_name}{' '}
                                        {orderData?.extra_customer_data?.first_name}
                                    </span>
                                    <span className="d-block">{orderData?.extra_customer_data?.email}</span>
                                </div>
                            </li>
                            <li>
                                <div className="text-left">{t('payment:Thanh toán')}</div>
                                <div className="text-right">
                                    <p className="yellow-1">{convertPaymentMethod(orderData?.payment_method)}</p>
                                </div>
                            </li>
                            <li>
                                <div className="text-left">{t('common:Trạng thái')}</div>
                                <div className="text-right">
                                    {/* Thành công là green-1, Hủy là red-1, chờ thanh toán là yellow-1*/}
                                    <p className={convertClass(orderData?.order_status)}>
                                        {convertOrderStatus(orderData?.order_status)}
                                    </p>
                                </div>
                            </li>
                            {orderData?.payment_method === 'payment_method_bank_transfer' && (
                                <li>
                                    <div className="text-left">{t('payment:Phí tiện ích')}</div>
                                    <div className="text-right">
                                        <p className="yellow-1">
                                            {
                                                <DisplayPrice
                                                    price={
                                                        orderData?.order_transaction_data?.[0]?.['gw_transaction_id'] -
                                                        orderData?.order_transaction_data?.[0]?.['price']
                                                    }
                                                />
                                            }
                                        </p>
                                    </div>
                                </li>
                            )}
                        </ul>
                        <div className="bookingInfo__price">
                            <div className="bookingInfo__total">
                                <div className="flexGroup">
                                    <p className="size-20 semibold mb0">{t('payment:Tổng cộng')}:</p>
                                    <p className="yellow-1 semibold size-20 mb0 text-right">
                                        <DisplayPrice price={orderData?.final_price} />
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/*<div className="bookingInfo__note">*/}
                        {/*    <p className="mb0 size-12">*/}
                        {/*        {t('hotel:Thuế, phí')}: {t('TXT_VNT_RATE_INCLUDE_TAX_INCLUDE_SERVICE_CHARGE')}.*/}
                        {/*    </p>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderInfoCombo
