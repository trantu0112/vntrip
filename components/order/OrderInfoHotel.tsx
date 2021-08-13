import React from 'react'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import { getFullName } from '../../utils/user'
import { convertClass, convertOrderStatus, convertPaymentMethod } from '../../utils/common'
import DisplayPrice from '../common/DisplayPrice'
import { IconTooltip } from '../../constants/icons'
import { VNTRIP_INFO } from '../../constants/common'

interface Props {
    orderData: any
    dataLoyaltyRedem: any
    dataLoyaltyDiscount: any
}

const OrderInfoHotel: React.FC<Props> = ({ orderData, dataLoyaltyRedem, dataLoyaltyDiscount }) => {
    const { t } = useTranslation(['hotel', 'payment', 'common'])
    const { i18n } = useTranslation()
    const orderItem = orderData?.order_item_hotel_data?.[0]
    const renderNote = () => {
        if (['payment_method_pay_at_hotel', 'payment_method_credit_card'].includes(orderData?.payment_method)) {
            return (
                <>
                    <p className="mb0 size-12">{t('hotel:TXT_BAN_SE_THANH_TOAN_CHO_KHACH_SAN')}.</p>
                    <p className="mb0 size-12">{t('hotel:TXT_P_151')}.</p>
                    <p className="mb0 size-12">{t('hotel:TXT_P_152')}.</p>
                </>
            )
        }
        return (
            <>
                <p className="mb0 size-12">{t('hotel:TXT_P_153')}.</p>
                <p className="mb0 size-12">{t('hotel:TXT_P_154')}.</p>
                <p className="mb0 size-12">{t('hotel:TXT_P_155')}.</p>
            </>
        )
    }

    return (
        <div className="bookingInfo">
            <div className="bookingInfo__detail">
                <p className="size-16 semibold mb15 pTitle">{t('hotel:Thông tin đơn đặt phòng')}</p>
                <ul>
                    <li>
                        <div className="text-left">{t('hotel:Mã đơn hàng')}</div>
                        <div className="text-right">
                            <p className="semibold yellow-1">{orderData?.order_code}</p>
                        </div>
                    </li>
                    <li>
                        <div className="text-left">{t('hotel:Ngày đặt')}</div>
                        <div className="text-right">
                            <p>{moment(orderData?.created_at).format('ddd, LL')}</p>
                        </div>
                    </li>
                    <li>
                        <div className="text-left">{t('hotel:Nhận phòng')}</div>
                        <div className="text-right">
                            <div className="d-block">
                                {moment(orderItem?.check_in_date).format('ddd, LL')}
                                {/* nếu checkin date trước ngày hiện tại, show tooltip hướng dẫn hủy phòng */}
                                {moment().isBefore(moment(orderItem?.check_in_date)) && (
                                    <div className="tooltipBox d-inline-flex text-center">
                                        &nbsp;
                                        <IconTooltip />
                                        <div className="tooltipBox__cont size-12">
                                            {t(
                                                'common:Để đổi ngày đặt phòng, vui lòng liên hệ với số hotline dưới đây'
                                            )}
                                            :&nbsp;
                                            <strong>{VNTRIP_INFO.hotline}</strong>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="text-left">{t('hotel:Trả phòng')}</div>
                        <div className="text-right">
                            <span className="d-block">{moment(orderItem?.check_out_date).format('ddd, LL')}</span>
                        </div>
                    </li>
                    <li>
                        <div className="text-left">
                            {t('hotel:Số đêm')}, {t('hotel:phòng')}
                        </div>
                        <div className="text-right">
                            <p>
                                {orderItem?.rooms} {orderItem?.rooms > 1 ? t('hotel:phòngs') : t('hotel:phòng')} ,{' '}
                                {orderItem?.nights} {orderItem?.nights > 1 ? t('hotel:đêms') : t('hotel:đêm')}
                            </p>
                        </div>
                    </li>
                    <li>
                        <div className="text-left">{t('hotel:Người đặt')}</div>
                        <div
                            className="text-right"
                            style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                        >
                            {getFullName(
                                orderData?.extra_customer_data?.first_name,
                                orderData?.extra_customer_data?.last_name
                            )}
                            (<span>{orderData?.extra_customer_data?.email}</span>)
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
                            <p className={convertClass(orderData?.order_status)}>
                                {convertOrderStatus(orderData?.order_status)}
                            </p>
                        </div>
                    </li>
                </ul>
                <div className="bookingInfo__price">
                    <div className="bookingInfo__total">
                        {orderData?.total_price > orderData?.final_price && (
                            <>
                                <div className="flexGroup mb5">
                                    <p className=" semibold mb0">{t('hotel:Tổng giá phòng')}</p>
                                    <p className="yellow-1 semibold size-20 mb0 text-right">
                                        <DisplayPrice price={orderData?.total_price} />
                                    </p>
                                </div>
                                {orderData?.order_appliedcoupon_data && (
                                    <div className="flexGroup mb5">
                                        <p className="semibold mb0">{t('hotel:Giảm giá')}</p>
                                        <p className="text-right green-1 mb0">
                                            {/* Thành công là green-1, Hủy là red-1, chờ thanh toán là yellow-1*/}-{' '}
                                            <DisplayPrice
                                                price={orderData?.order_appliedcoupon_data?.[0].coupon_price}
                                            />
                                        </p>
                                    </div>
                                )}
                                {orderData?.order_tax_data && (
                                    <div className="flexGroup mb5">
                                        <p className="semibold mb0">{t('common:Thuế')}</p>
                                        <p className="text-right yellow-1 mb0">
                                            <DisplayPrice price={orderData?.order_tax_data?.[0].value} />
                                        </p>
                                    </div>
                                )}
                                {dataLoyaltyDiscount && (
                                    <div className="flexGroup mb5">
                                        <p className=" semibold mb0">
                                            {i18n.language === 'vi'
                                                ? dataLoyaltyDiscount.benefit_name
                                                : dataLoyaltyDiscount.benefit_name_en}
                                            {dataLoyaltyDiscount.discount_type === 'PERCENT'
                                                ? `(${dataLoyaltyDiscount.discount_value_setting}%)`
                                                : ''}
                                        </p>
                                        <p className="yellow-1 semibold size-20 mb0 text-right">
                                            - <DisplayPrice price={dataLoyaltyDiscount.actual_discount_value} />
                                        </p>
                                    </div>
                                )}

                                {dataLoyaltyRedem && (
                                    <div className="flexGroup mb5">
                                        <p className=" semibold mb0">{t('hotel:Sử dụng hoàn tiền')}</p>
                                        <p className="yellow-1 semibold size-20 mb0 text-right">
                                            {/* Thành công là green-1, Hủy là red-1, chờ thanh toán là yellow-1*/}
                                            - <DisplayPrice price={dataLoyaltyRedem.redeem_price} />
                                        </p>
                                    </div>
                                )}

                                {orderData?.payment_method === 'payment_method_bank_transfer' && (
                                    <div className="flexGroup mb5">
                                        <p className="semibold mb0">{t('payment:Phí tiện ích')}</p>
                                        <p
                                            className={`text-right ${
                                                Number(orderData?.order_transaction_data?.[0]?.['gw_transaction_id']) >
                                                orderData?.order_transaction_data?.[0]?.['price']
                                                    ? 'red-1'
                                                    : 'green-1'
                                            } mb0`}
                                        >
                                            <DisplayPrice
                                                price={
                                                    orderData?.order_transaction_data?.[0]?.['gw_transaction_id'] -
                                                    orderData?.order_transaction_data?.[0]?.['price']
                                                }
                                            />
                                        </p>
                                    </div>
                                )}
                                {orderData?.payment_fee && (
                                    <div className="flexGroup mb5">
                                        <p className="semibold mb0">{t('payment:Phí thanh toán')}</p>
                                        <p className="text-right red-1 mb0">
                                            <DisplayPrice price={orderData?.payment_fee?.total_price} />
                                        </p>
                                    </div>
                                )}
                            </>
                        )}
                        <div className="flexGroup">
                            <p className="size-20 semibold mb0">{t('payment:Tổng cộng')}:</p>
                            <p className="yellow-1 semibold size-20 mb0 text-right">
                                <DisplayPrice price={orderData?.final_price} />
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bookingInfo__note" style={{ paddingTop: '15px' }}>
                    {renderNote()}
                </div>
            </div>
        </div>
    )
}

export default OrderInfoHotel
