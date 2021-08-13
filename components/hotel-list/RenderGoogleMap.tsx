import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMapCenter } from '../../store/hotel/action'
import GoogleMapReact from 'google-map-react'
import CustomMarker from './CustomMarker'

interface Props {
    hotels: any[]
    nights: number
    checkInDate: Date
    isDomestic: boolean
    keyword?: string
    regionId?: number
}

const RenderGoogleMap: React.FC<Props> = ({ hotels, nights, checkInDate, isDomestic, keyword, regionId }) => {
    const dispatch = useDispatch()
    const { activeHotelId, latitude, longitude } = useSelector(
        (state: any) => state.hotel.mapCenter || { activeHotelId: 0, latitude: 16.0627397, longitude: 108.2422757 }
    )
    const center = { lat: latitude, lng: longitude }

    const handleCloseMaker = (latitude: number, longitude: number) => {
        dispatch(setMapCenter(0, latitude, longitude))
    }

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{
                    // @ts-ignore
                    key: process.env.NEXT_PUBLIC_GMAP_API_KEY,
                }}
                center={{ lat: latitude, lng: longitude }}
                zoom={center ? 13 : 7}
            >
                {hotels.map((hotel) => {
                    return (
                        <CustomMarker
                            key={hotel.id || hotel.vntrip_id}
                            lat={hotel.location?.lat}
                            lng={hotel.location?.lon}
                            hotel={hotel}
                            isActive={(hotel.id || hotel.vntrip_id) === activeHotelId}
                            isDomestic={isDomestic}
                            nights={nights}
                            checkInDate={checkInDate}
                            handleCloseMaker={handleCloseMaker}
                            keyword={keyword}
                            regionId={regionId}
                        />
                    )
                })}
            </GoogleMapReact>
        </div>
    )
}

export default RenderGoogleMap
