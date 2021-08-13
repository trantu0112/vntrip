import React from 'react'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { setOpenPopupChangeRoom } from '../../store/checkout/action'
import { getUrlHotelImage } from '../../utils/hotel'
import { HotelCheckout } from '../../constants/interface'
import RenderStarRate from '../hotel-list/RenderStarRate'
import HotelAddress from '../common/HotelAddress'
import { setListRoomStep1, setLoadingRoomStep1 } from '../../store/hotel/action'
import { roomsAvailability } from '../../api/search-engine-services'
import { isMobileScreen } from '../../utils/common'

interface Props {
    hotel: HotelCheckout
    roomName: string
    roomCount: number
    adultCount: number
    checkInDate: Date
    checkOutDate: Date
    nights: number
    step: number
    orderItem?: []
}

const HotelInfo: React.FC<Props> = React.memo(
    ({ hotel, roomName, roomCount, adultCount, checkInDate, checkOutDate, nights, step, orderItem }) => {
        const dispatch = useDispatch()
        const { i18n, t } = useTranslation(['hotel', 'common', 'payment'])
        const openPopupChangeRoom = async () => {
            // set open popup
            dispatch(setOpenPopupChangeRoom(true))
            // set check-in, check-out, room count, adult count
            // set từ url: đối vs hotel detail
            // set từ props đối vs step1
            // dispatch(setRoomCountHotel(roomCount))
            // dispatch(setAdultCountHotel(adultCount))
            await fetchRoom(hotel?.hotelId, hotel?.isDomestic, checkInDate, nights, roomCount, adultCount)
            // call api fetch room data
            async function fetchRoom(
                hotel_id: number,
                isDomestic: boolean,
                check_in: Date,
                nights: number,
                room_count: number,
                adult_count: number
            ) {
                dispatch(setLoadingRoomStep1(true))
                const res = await roomsAvailability({
                    checkin_date: moment(check_in).format('YYYYMMDD'),
                    room_count: room_count,
                    adult_count: adult_count,
                    hotel_id,
                    days: nights,
                    request_from: isMobileScreen() ? 'mobileweb' : 'website',
                    locale: i18n.language,
                    currency_code: 'vnd',
                    hotel_min_price: '0',
                    is_international: String(!isDomestic),
                })
                    .then((res) => {
                        dispatch(setLoadingRoomStep1(false))
                        return res.data
                    })
                    .then((data) => (Array.isArray(data) && data.length > 0 ? data[0] : null))
                    .then((obj) => (obj ? obj.room_data : []))
                    .catch((err) => console.log(err.response))
                dispatch(setListRoomStep1(res))
            }
        }

        return (
            <>
                <div className="bookingInfo__img">
                    <img
                        src={getUrlHotelImage({
                            slug: hotel?.thumbImage,
                            hotelId: hotel?.hotelId,
                            size: '345x180',
                        })}
                        alt={hotel?.hotelName}
                    />
                </div>
                <div className="bookingInfo__detail">
                    <h3 className="hotelName">
                        {i18n.language === 'vi' ? hotel?.hotelNameVi : hotel?.hotelName}
                        <RenderStarRate starRate={hotel?.starRate} />
                    </h3>

                    <HotelAddress
                        fullAddress={hotel?.fullAddress}
                        latitude={hotel?.latitude}
                        longitude={hotel?.longitude}
                    />
                    <ul className="bookingInfo__room pb0">
                        <li className={`pb5`}>
                            <p>{t('Ngày nhận phòng')}</p>
                            <p className="text-right">{moment(checkInDate).format('DD-MM-YYYY')}</p>
                        </li>
                        <li className={`pb5`}>
                            <p>{t('Ngày trả phòng')}</p>
                            <p className="text-right">{moment(checkOutDate).format('DD-MM-YYYY')}</p>
                        </li>
                        <li className={`pb5`}>
                            <p>{t('Số đêm')}</p>
                            <p className="text-right">
                                {nights} {t(nights > 1 ? 'đêms' : 'đêm')}
                            </p>
                        </li>
                        {/* Hiển thị cho step1: mở popup change room avail */}
                        {step === 1 && (
                            <li>
                                <p className="text-right">
                                    <button type="button" className="btnLink" onClick={openPopupChangeRoom}>
                                        <span>{t('common:Sửa')}</span>
                                    </button>
                                </p>
                            </li>
                        )}
                    </ul>
                </div>
            </>
        )
    }
)

export default HotelInfo
