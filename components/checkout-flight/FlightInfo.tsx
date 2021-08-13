import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import FlightInfoItem from './FlightInfoItem'
import DisplayPrice from '../common/DisplayPrice'
import { useSelector } from 'react-redux'

interface Props {
    totalPassenger: number
    departData: any
    returnData?: any
    tranferPrice?: number
    totalPrice?: number
    data?: any
    coupon?: string
}

const FlightInfo: React.FC<Props> = ({
    totalPassenger,
    departData,
    returnData,
    tranferPrice,
    totalPrice,
    data,
    coupon,
}) => {
    const { t } = useTranslation(['flight', 'payment'])
    const [totalBaggage, setTotalBaggage] = useState<number>(0)
    const { listPassenger, couponInfo } = useSelector((state: any) => {
        return {
            listPassenger: state.flight.listPassenger || [],
            couponInfo: state.checkout.couponInfo || null,
        }
    })
    useEffect(() => {
        let priceTotalBaggage = 0
        listPassenger.forEach((passenger: any) => {
            passenger['listBaggage'].forEach((baggage: any) => {
                priceTotalBaggage += baggage['price']
            })
        })
        setTotalBaggage(priceTotalBaggage)
    }, [listPassenger])
    return (
        <div className="bookingInfo">
            <div className="bookingInfo__flight">
                <p className="size-16 semibold mb5 pTitle">
                    {t('VÉ CỦA BẠN')} ({totalPassenger} {t(totalPassenger > 1 ? 'HÀNH KHÁCHS' : 'HÀNH KHÁCH')})
                </p>

                <FlightInfoItem data={departData} passengers={listPassenger} />
                <FlightInfoItem data={returnData} passengers={listPassenger} />
            </div>
            {couponInfo?.status?.toLowerCase() === 'success' && (
                <div className="bookingInfo__total" style={{ borderTop: '1px dashed #ddd' }}>
                    <div className="flexGroup">
                        <p className="size-14 semibold mb0">{t('Tổng giá vé')}:</p>

                        <p className="mb0 text-right yellow-1 semibold">
                            <DisplayPrice price={data?.total_price} />
                        </p>
                    </div>
                    <div className="flexGroup green-1">
                        <p className="mb0">
                            {t('Mã giảm giá')}: {coupon}
                        </p>
                        <p className="mb0 text-right green-1 semibold">
                            -<DisplayPrice price={couponInfo?.final_discount_value} />
                        </p>
                    </div>
                </div>
            )}
            {typeof tranferPrice !== 'undefined' && typeof totalPrice !== 'undefined' ? (
                <div className="bookingInfo__total">
                    <div className="flexGroup">
                        <p className="mb0 semibold">{t('payment:Tổng cộng')}:</p>
                        <p className="mb0 text-right yellow-1 semibold">
                            <DisplayPrice price={totalPrice} />
                        </p>
                    </div>
                    <div className="flexGroup">
                        <p className="mb0">{t('payment:Phí tiện ích')}:</p>
                        <p className="mb0 text-right green-1">
                            <DisplayPrice price={tranferPrice - totalPrice} />
                        </p>
                    </div>
                    <div className="flexGroup">
                        <p className="size-18 semibold mb0">{t('payment:Thanh toán')}:</p>
                        <p className="yellow-1 semibold size-18 mb0 text-right">
                            <DisplayPrice price={tranferPrice} />
                        </p>
                    </div>
                </div>
            ) : (
                <div className="bookingInfo__total">
                    {data?.payment_method && data?.payment_method_fee ? (
                        <div className="flexGroup">
                            <p className="size-14 semibold mb0">{t('Phí thanh toán')}:</p>
                            <p className="black-1 size-14 mb0 text-right">
                                <DisplayPrice
                                    price={
                                        ((data?.total_price -
                                            (couponInfo?.status?.toLowerCase() === 'success'
                                                ? couponInfo?.final_discount_value
                                                : 0)) *
                                            data?.payment_method_fee) /
                                        100
                                    }
                                />
                            </p>
                        </div>
                    ) : (
                        ''
                    )}
                    <div className="flexGroup">
                        <p className="size-20 semibold mb0">{t('Tổng cộng')}:</p>
                        <p className="yellow-1 semibold size-20 mb0 text-right">
                            {data?.payment_method && data?.payment_method_fee ? (
                                <DisplayPrice price={data?.final_price} />
                            ) : (
                                <DisplayPrice
                                    price={
                                        data?.total_price +
                                        (data?.booking_request_id ? 0 : totalBaggage) -
                                        (couponInfo?.status?.toLowerCase() === 'success'
                                            ? couponInfo?.final_discount_value
                                            : 0)
                                    }
                                />
                            )}
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default FlightInfo
