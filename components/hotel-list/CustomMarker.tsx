import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMapCenter } from '../../store/hotel/action'
import DisplayPrice from '../common/DisplayPrice'
import { IconClose } from '../../constants/icons'
import HotelItem from './HotelItem'
import ShowPrice from '../hotel-detail/ShowPrice'

interface Props {
    hotel: any
    lat: any
    lng: any
    isActive: boolean
    isDomestic: boolean
    nights: number
    checkInDate: Date
    keyword?: string
    regionId?: number
    handleCloseMaker: (latitude: number, longitude: number) => void
}

const CustomMarker: React.FC<Props> = ({
    hotel,
    isActive,
    isDomestic,
    nights,
    checkInDate,
    handleCloseMaker,
    keyword,
    regionId,
}) => {
    const dispatch = useDispatch()

    const { isIncl, isPriceOneNight } = useSelector((state: any) => {
        return {
            isIncl: state.hotel.isShowFinalPriceHotel || false,
            isPriceOneNight: state.hotel.isPriceOneNight || false,
        }
    })

    const handleClickMarker = (hotelId: number, latitude: number, longitude: number) => () => {
        const listHotelItem: NodeListOf<any> = document.querySelectorAll('.listHotel .listHotel__item')

        for (let i = 0; i < listHotelItem.length; i++) {
            // remove class active
            listHotelItem[i].classList.remove('active')
        }

        const ele = document.getElementById(`hotel_item_${hotelId}_in_map`)
        if (ele) {
            ele.scrollIntoView({ block: 'center', behavior: 'smooth' })
            ele.classList.add('active')
        }
        dispatch(setMapCenter(hotelId, latitude, longitude))
    }

    return (
        <div
            role="button"
            tabIndex={hotel.vntrip_id}
            className={`mapPin ${isActive ? 'active' : ''}`}
            onClick={handleClickMarker(hotel.id || hotel.vntrip_id, hotel.location.lat, hotel.location.lon)}
            onKeyUp={handleClickMarker(hotel.id || hotel.vntrip_id, hotel.location.lat, hotel.location.lon)}
        >
            <div className="mapPin__price">
                {isDomestic ? (
                    <ShowPrice
                        showPrices={hotel.show_prices}
                        basePrice={hotel.price}
                        baseNetPrice={hotel.net_price}
                        isFromDetail={false}
                        onlyShowFinal={true}
                        nights={nights}
                        isInclVatAndFee={isIncl}
                        isPriceOneNight={isPriceOneNight}
                        provider={hotel.provider}
                        includedFee={hotel.included_service_fee}
                        includedVAT={hotel.included_VAT}
                    />
                ) : (
                    <DisplayPrice
                        price={
                            hotel.final_price?.[isPriceOneNight ? 'nightly' : 'total']?.[
                                isIncl ? 'inclusive' : 'exclusive'
                            ]
                        }
                    />
                )}
            </div>
            <div className="mapPin__hotel">
                <button
                    type="button"
                    className="mapPin__close"
                    onClick={(event) => {
                        event.stopPropagation()
                        handleCloseMaker(hotel.location.lat, hotel.location.lon)
                    }}
                >
                    <IconClose />
                </button>
                <HotelItem
                    hotel={hotel}
                    key={hotel.id || hotel.vntrip_id}
                    nights={nights}
                    checkInDate={checkInDate}
                    isMapView={false}
                    isDomestic={isDomestic}
                    keyword={keyword}
                    regionId={regionId}
                />
            </div>
        </div>
    )
}

export default CustomMarker
