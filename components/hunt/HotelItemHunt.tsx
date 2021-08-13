import React from 'react'
import RenderStarRate from '../hotel-list/RenderStarRate'
import { useTranslation } from 'react-i18next'
import HotelAddress from '../common/HotelAddress'
import RenderRewviewPoint from '../hotel-list/RenderReviewPoint'
import LazyLoad from 'react-lazyload'
import { getHotelDetailLink, getUrlHotelImage } from '../../utils/hotel'
import DisplayPrice from '../common/DisplayPrice'
import { displayPrice } from '../../utils/common'
import { isMobile } from 'react-device-detect'

interface Props {
    id: number
    thumbImage: string
    name: string
    nameEn: string
    starRate: number
    reviewPoint: number
    reviewCount: number
    fullAddress: string
    fullAddressEn: string
    location: {
        lat: number
        lon: number
    }
    finalPrice: number
    basePrice: number
    promotion: number
    isLoggedIn: boolean
    checkInDate: Date
    nights: number
    huntMode: boolean
}

const HotelItemHunt: React.FC<Props> = ({
    id,
    thumbImage,
    name,
    nameEn,
    starRate,
    reviewPoint,
    reviewCount,
    fullAddress,
    fullAddressEn,
    location,
    huntMode,
    promotion,
    basePrice,
    finalPrice,
    isLoggedIn,
    checkInDate,
    nights,
}) => {
    const { i18n, t } = useTranslation(['hotel'])
    const isVietnamese = i18n.language === 'vi'
    const onClickHotel = (event: any) => {
        if (!isLoggedIn && huntMode) {
            event.preventDefault()
            window.location.href = `${process.env.NEXT_PUBLIC_SSO_URL}/login?callbackUrl=${encodeURIComponent(
                window.location.href
            )}`
        }
    }
    if (huntMode && !isLoggedIn) {
        return (
            <div className={`hotelVertical ${huntMode ? '' : 'hotelVertical_sm'}`}>
                <div className="hotelVertical__img">
                    <LazyLoad>
                        <img src={getUrlHotelImage({ slug: thumbImage, hotelId: id, size: '360x216' })} alt={name} />
                    </LazyLoad>
                    {promotion > 0 && (
                        <div className="hotelVertical__label">
                            {t('Tiết kiệm đến')} {promotion}%
                        </div>
                    )}
                </div>
                <div className="hotelVertical__cont">
                    <h3 className="hotelName size-16 mb5">
                        {isVietnamese ? name : nameEn}
                        <RenderStarRate starRate={Number(starRate)} />
                    </h3>
                    <HotelAddress
                        fullAddress={fullAddress}
                        fullAddressEn={fullAddressEn}
                        latitude={location.lat}
                        longitude={location.lon}
                    />
                    <div className="hotelVertical__price">
                        {huntMode ? (
                            <p className="size-24 bold yellow-1 mb0">
                                {isLoggedIn
                                    ? displayPrice(finalPrice, 'VND')
                                    : String(finalPrice).replace(/\B(?=((\d|x){3})+(?!(\d|x)))/g, ',') + ' đ/đêm'}
                            </p>
                        ) : (
                            <p className="mb0">
                                Giá từ:&nbsp;
                                <span className="semibold">
                                    <DisplayPrice price={finalPrice} />
                                </span>
                                {promotion > 0 && (
                                    <span className="text-through ml10">
                                        <DisplayPrice price={basePrice} />
                                    </span>
                                )}
                            </p>
                        )}
                    </div>
                    <RenderRewviewPoint point={reviewPoint} count={reviewCount} />
                </div>
                <a
                    className={`hotelVertical_link`}
                    onClick={(event) => {
                        onClickHotel(event)
                    }}
                ></a>
            </div>
        )
    }

    return (
        <div className={`hotelVertical ${huntMode ? '' : 'hotelVertical_sm'}`}>
            <div className="hotelVertical__img">
                <LazyLoad>
                    <img src={getUrlHotelImage({ slug: thumbImage, hotelId: id, size: '360x216' })} alt={name} />
                </LazyLoad>
                {promotion > 0 && (
                    <div className="hotelVertical__label">
                        {t('Tiết kiệm đến')} {promotion}%
                    </div>
                )}
            </div>
            <div className="hotelVertical__cont">
                <h3 className="hotelName size-16 mb5">
                    {isVietnamese ? name : nameEn}
                    <RenderStarRate starRate={Number(starRate)} />
                </h3>
                <HotelAddress
                    fullAddress={fullAddress}
                    fullAddressEn={fullAddressEn}
                    latitude={location.lat}
                    longitude={location.lon}
                />
                <div className="hotelVertical__price">
                    {huntMode ? (
                        <p className="size-24 bold yellow-1 mb0">
                            {isLoggedIn
                                ? displayPrice(finalPrice, 'VND')
                                : String(finalPrice).replace(/\B(?=((\d|x){3})+(?!(\d|x)))/g, ',') + ' đ/đêm'}
                        </p>
                    ) : (
                        <p className="mb0">
                            Giá từ:&nbsp;
                            <span className="semibold">
                                <DisplayPrice price={finalPrice} />
                            </span>
                            {promotion > 0 && (
                                <span className="text-through ml10">
                                    <DisplayPrice price={basePrice} />
                                </span>
                            )}
                        </p>
                    )}
                </div>
                <RenderRewviewPoint point={reviewPoint} count={reviewCount} />
            </div>
            <a
                className={`hotelVertical_link`}
                href={getHotelDetailLink({
                    hotelId: Number(id),
                    hotelName: name,
                    countryCode: 'VN',
                    checkInDate,
                    nights,
                    onlyReturnPath: false,
                    huntMode: huntMode,
                })}
                target={isMobile && huntMode ? '' : '_blank'}
                onClick={(event) => {
                    onClickHotel(event)
                }}
            ></a>
        </div>
    )
}

export default HotelItemHunt
