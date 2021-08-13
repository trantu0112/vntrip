import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { getUrlHotelImage, getHotelDetailLink } from '../../utils/hotel'
import { setMapCenter } from '../../store/hotel/action'
import { isMobile } from 'react-device-detect'
import RenderLastMinute from './RenderLastMinute'
import RenderIcon360 from './RenderIcon360'
import RenderSpecialHotel from './RenderSpecialHotel'
import RenderFacilites from './RenderFacilites'
import RenderStarRate from './RenderStarRate'
import RenderRewviewPoint from './RenderReviewPoint'
import HotelAddress from '../common/HotelAddress'
import ShowPrice from '../hotel-detail/ShowPrice'
import ShowPriceInter from '../hotel-detail/ShowPriceInter'
import RenderNotiMemberDiscount from './RenderNotiMemberDiscount'
import RenderNotiMobileRate from './RenderNotiMobileRate'
import RenderNotiTopHotel from './RenderNotiTopHotel'
import RenderNotiRefundFree from './RenderNotiRefundFree'
import RenderIconBigSale from './RenderIconBigSale'

interface Props {
    hotel: any
    nights: number
    checkInDate: Date
    elementId?: string
    isMapView: boolean
    isDomestic: boolean
    keyword?: string
    regionId?: number
}

const HotelItem: React.FC<Props> = React.memo(
    ({ hotel, nights, checkInDate, elementId, isMapView, isDomestic, keyword, regionId }) => {
        const dispatch = useDispatch()
        const { i18n, t } = useTranslation(['hotel'])
        const isVietnamese = i18n.language === 'vi'
        const imageSize = isMobile ? '120x180' : '200x200'
        const [thumbImage, setThumbImage] = useState<string>('')
        const { isInclVatAndFee, isPriceOneNight } = useSelector((state: any) => {
            return {
                isInclVatAndFee: state.hotel.isShowFinalPriceHotel || false,
                isPriceOneNight: state.hotel.isPriceOneNight || false,
            }
        })

        useEffect(() => {
            if (isDomestic) {
                setThumbImage(getUrlHotelImage({ slug: hotel.thumb_image, hotelId: hotel.id, size: imageSize }))
            } else {
                setThumbImage(hotel.thumb_image)
            }
        }, [hotel, isDomestic])

        const handleClickItem = (hotelId: number, latitude: number, longitude: number) => {
            dispatch(setMapCenter(hotelId, latitude, longitude))
        }

        const isShowNoti = () => {
            if (hotel?.tags?.includes('big-sale')) {
                return <RenderIconBigSale isHaveBigSale={hotel?.tags?.includes('big-sale')} />
            } else if (hotel?.tags?.includes('top-hotel')) {
                return <RenderNotiTopHotel isHaveTopHotel={hotel?.tags?.includes('top-hotel')} />
            } else {
                return <RenderNotiRefundFree isHaveRefundFree={hotel?.tags?.includes('covid-free-cancel')} />
            }
        }

        return (
            <div className="listHotel__item" id={elementId ? elementId : ''}>
                <div className="hotelItem">
                    {isDomestic && <RenderLastMinute promotion={hotel?.show_prices?.promotion} />}

                    <div className="hotelItem__img">
                        <img src={thumbImage} alt={hotel.name} className={!isDomestic ? 'h200px' : ''} />
                        {Array.isArray(hotel?.tags) && (
                            <RenderIcon360 isHave360img={hotel?.tags?.includes('has-360img')} />
                        )}
                        {Array.isArray(hotel?.tags) && (
                            <RenderSpecialHotel isSpecial={hotel?.tags?.includes('special-hotel')} />
                        )}
                        {isShowNoti()}
                    </div>
                    <div className="hotelItem__cont">
                        <div className="hotelItem__left">
                            <h3 className="hotelName">
                                {hotel[isVietnamese ? 'name_vi' : 'name']}
                                <RenderStarRate starRate={Number(hotel.star_rate)} />
                            </h3>
                            <RenderRewviewPoint point={hotel.review_point} count={hotel.count_reviews} />
                            <HotelAddress
                                fullAddress={hotel.full_address}
                                fullAddressEn={hotel.full_address_en}
                                latitude={hotel.location.lat}
                                longitude={hotel.location.lon}
                            />
                            <div className="hotelItem__facilities">
                                <RenderFacilites groupFacilities={hotel?.groupFacilities} />
                            </div>
                            <RenderNotiMobileRate isHaveMobileRate={hotel?.show_prices?.mobile_rate.show} />

                            <RenderNotiMemberDiscount isHaveMemberDiscount={hotel?.show_prices?.member_discount.show} />
                        </div>
                        <div className="hotelItem__right">
                            <div className="hotelItem__bottom">
                                {isDomestic ? (
                                    <ShowPrice
                                        showPrices={hotel.show_prices}
                                        basePrice={hotel.price}
                                        baseNetPrice={hotel.net_price}
                                        isFromDetail={false}
                                        nights={nights}
                                        isInclVatAndFee={isInclVatAndFee}
                                        isPriceOneNight={isPriceOneNight}
                                        disabledPromotion={true}
                                        provider={hotel.provider}
                                        includedFee={hotel.included_service_fee}
                                        includedVAT={hotel?.vat?.vat_rate}
                                    />
                                ) : (
                                    <ShowPriceInter
                                        discount={hotel.discount}
                                        finalPrice={hotel.final_price}
                                        nights={nights}
                                    />
                                )}
                                <div className="hotelItem__btn">
                                    <a
                                        href={getHotelDetailLink({
                                            hotelId: Number(hotel.id || hotel.vntrip_id),
                                            hotelName: hotel.name,
                                            countryCode: hotel.country_code || 'VN',
                                            checkInDate,
                                            nights,
                                            keyword: isDomestic ? '' : keyword,
                                            regionId,
                                            onlyReturnPath: false,
                                        })}
                                        target={isMobile ? '' : '_blank'}
                                        className="btn btn_orange"
                                    >
                                        <span>{t('common:Xem phòng')}</span>
                                    </a>
                                </div>

                                {isDomestic && hotel.rooms_available <= 5 && (
                                    <div className="hotelItem__amount red-1">
                                        {t('hotel:Chỉ còn')} {hotel.rooms_available} {t('phòngs')}!
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {isMapView ? (
                        // eslint-disable-next-line jsx-a11y/anchor-is-valid
                        <a
                            role="button"
                            tabIndex={hotel.id}
                            className="hotelItem__link"
                            onClick={() =>
                                handleClickItem(hotel.id || hotel.vntrip_id, hotel?.location?.lat, hotel?.location?.lon)
                            }
                            onKeyUp={() =>
                                handleClickItem(hotel.id || hotel.vntrip_id, hotel?.location?.lat, hotel?.location?.lon)
                            }
                        >
                            &nbsp;
                        </a>
                    ) : (
                        <a
                            className="hotelItem__link"
                            href={getHotelDetailLink({
                                hotelId: Number(hotel.id || hotel.vntrip_id),
                                hotelName: hotel.name,
                                countryCode: hotel.country_code || 'VN',
                                checkInDate,
                                nights,
                                keyword: isDomestic ? '' : keyword,
                                regionId,
                                onlyReturnPath: false,
                            })}
                            target={isMobile ? '' : '_blank'}
                        >
                            &nbsp;
                        </a>
                    )}
                </div>
            </div>
        )
    }
)

export default HotelItem
