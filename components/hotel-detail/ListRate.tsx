import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { Button } from 'antd'
import { useRouter } from 'next/router'
import { insertDataCheckout } from '../../api/hotel-services'
import { PATH_HOTEL_CHECKOUT_STEP1, YYYYMMDD } from '../../constants/common'
import RenderRefundable from './RenderRefundable'
import RenderMealPlan from './RenderMealPlan'
import RenderCapacity from './RenderCapacity'
import ShowPrice from './ShowPrice'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useUserInfo } from '../../utils/custom-hook'
import RenderCapacityRapid from './RenderCapacityRapid'

interface Props {
    rates: any[]
    room: any
    hotel: any
    nights: number
}

const ListRate: React.FC<Props> = ({ rates, room, hotel, nights }) => {
    const router = useRouter()
    const userInfo = useUserInfo()
    const { t } = useTranslation(['hotel'])
    const [rateLoading, setRateLoading] = useState<boolean[]>([])
    const { isInclVatAndFee } = useSelector((state: any) => {
        return {
            isInclVatAndFee: state.hotel.isShowFinalPriceHotel || false,
            isPriceOneNight: state.hotel.isPriceOneNight || false,
        }
    })

    useEffect(() => {
        if (Array.isArray(rates) && rates.length > 0) {
            setRateLoading(rates.map(() => false))
        }
    }, [rates])

    const handleBookItem = (hotel: any, rate: any, index: number) => async () => {
        const hotelInfo = {
            id: hotel.id || hotel.vntrip_id,
            name: hotel.name,
            name_vi: hotel.name_vi,
            star_rate: hotel.star_rate,
            latitude: hotel.latitude,
            longitude: hotel.longitude,
            full_address: hotel.full_address,
            review_point: hotel.review_point,
            count_reviews: hotel.count_reviews,
            thumb_image: hotel.thumb_image,
            isDomestic: !hotel.country_code || hotel.country_code === 'VN',
        }
        const checkInDate = router.query.checkInDate
            ? moment(router.query.checkInDate, YYYYMMDD).toDate()
            : moment().toDate()
        const nights = Number(router.query.nights) || 1
        const checkOutDate = moment(checkInDate).add(nights, 'day').toDate()
        const roomCount = Number(router.query.roomCount) || 1
        const adultCount = Number(router.query.adultCount) || 1
        const data: any = {
            key: rate.avail_token,
            value: {
                hotel: hotelInfo,
                checkInDate,
                checkOutDate,
                nights,
                roomCount,
                adultCount,
                checkInDateString: moment(checkInDate).format(YYYYMMDD),
                checkOutDateString: moment(checkOutDate).format(YYYYMMDD),
                room,
                rate,
                avail_token: rate.avail_token,
                userInfo: userInfo,
            },
        }
        try {
            setRateLoading((prevState: boolean[]) => {
                const _rateLoading = [...prevState]
                _rateLoading[index] = true
                return _rateLoading
            })
            await insertDataCheckout(data)
            setRateLoading((prevState: boolean[]) => {
                const _rateLoading = [...prevState]
                _rateLoading[index] = false
                return _rateLoading
            })
            await router.push(
                PATH_HOTEL_CHECKOUT_STEP1 + '/[token]',
                PATH_HOTEL_CHECKOUT_STEP1 + '/' + rate.avail_token
            )
        } catch (e) {
            throw e
        }
    }

    return (
        <div className="roomItem__body">
            {rates.map((item, index) => {
                if (item['provider'] === 'rapid') {
                    return (
                        <div className={`flexGroup2 groupRapid`} key={`groupRapid-${index}`}>
                            <div className={`groupRateRapid`}>
                                {item['room_rates'].map((roomRate: any, indexRate: number) => {
                                    return (
                                        <div key={`rate-${index}-${indexRate}`} className="roomItem__row">
                                            <div className="roomItem__policy">
                                                <div className="roomPolicy">
                                                    <RenderRefundable
                                                        refundable={roomRate.refundable}
                                                        cancelPolicies={roomRate.cancel_policies}
                                                        provider={roomRate.provider}
                                                        rateIdentifier={item.rate_identifier}
                                                        isNoneAllotment={item.is_none_allotment}
                                                    />

                                                    <RenderMealPlan mealPlan={roomRate.meal_plan} />

                                                    <RenderCapacityRapid
                                                        adultCount={roomRate.adult_count}
                                                        roomCount={roomRate.room_count}
                                                    />
                                                </div>
                                            </div>

                                            <div className="roomItem__price">
                                                <ShowPrice
                                                    showPrices={roomRate.show_prices}
                                                    basePrice={roomRate.pretty_prices.base_price}
                                                    baseNetPrice={roomRate.pretty_prices.base_net_price}
                                                    nights={nights}
                                                    isInclVatAndFee={isInclVatAndFee}
                                                    isPriceOneNight={true}
                                                    provider={item.provider}
                                                    includedFee={roomRate.included_service_fee}
                                                    includedVAT={roomRate.included_VAT}
                                                />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="roomItem__btn">
                                <Button
                                    type="primary"
                                    onClick={handleBookItem(hotel, item, index)}
                                    loading={rateLoading[index]}
                                >
                                    <span>{t('Đặt phòng')}</span>
                                </Button>
                                <p className={`size-12 mb0 mt5`}>
                                    {item.room_count}&nbsp;{t(item.room_count > 1 ? `phòngs` : `phòng`)},{' '}
                                    {item.adult_count}&nbsp;{t(item.adult_count > 1 ? `người lớns` : `người lớn`)}
                                </p>
                            </div>
                        </div>
                    )
                } else {
                    return (
                        <div key={`rate-${index}`} className="roomItem__row">
                            <div className="roomItem__policy">
                                <div className="roomPolicy">
                                    <RenderRefundable
                                        refundable={item.refundable}
                                        cancelPolicies={item.cancel_policies}
                                        provider={item.provider}
                                        rateIdentifier={item.rate_identifier}
                                        isNoneAllotment={item.is_none_allotment}
                                    />

                                    <RenderMealPlan mealPlan={item.meal_plan} />

                                    <RenderCapacity adultCount={item.adult_count} />
                                </div>
                            </div>

                            <div className="roomItem__price">
                                <ShowPrice
                                    showPrices={item.show_prices}
                                    basePrice={item.pretty_prices.base_price}
                                    baseNetPrice={item.pretty_prices.base_net_price}
                                    nights={nights}
                                    isInclVatAndFee={isInclVatAndFee}
                                    isPriceOneNight={true}
                                    provider={item.provider}
                                    includedFee={item.included_service_fee}
                                    includedVAT={item.included_VAT}
                                />
                            </div>

                            <div className="roomItem__btn">
                                <Button
                                    type="primary"
                                    onClick={handleBookItem(hotel, item, index)}
                                    loading={rateLoading[index]}
                                >
                                    <span>{t('Đặt phòng')}</span>
                                </Button>
                            </div>
                        </div>
                    )
                }
            })}
        </div>
    )
}

export default ListRate
