import React, { useEffect, useState } from 'react'
import moment, { Moment } from 'moment'
import { Modal, Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { useUserInfo } from '../../utils/custom-hook'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { IconMarker, IconTooltip } from '../../constants/icons'
import { convertMealPlan, getUrlHotelImage, handleCalendarChange } from '../../utils/hotel'
import {
    setAdultCountHotel,
    setListRoomStep1,
    setLoadingRoomStep1,
    setRoomCountHotel,
    toggleViewHotelInMap,
} from '../../store/hotel/action'
import { setOpenPopupChangeRoom } from '../../store/checkout/action'
import { insertDataCheckout } from '../../api/hotel-services'
import { PATH_HOTEL_CHECKOUT_STEP1, YYYYMMDD } from '../../constants/common'
import { HotelCheckout } from '../../constants/interface'
import { roomsAvailability } from '../../api/search-engine-services'
import DisplayPrice from '../common/DisplayPrice'
import RenderStarRate from '../hotel-list/RenderStarRate'
import BoxUpdateRoom from '../hotel-detail/BoxUpdateRoom'
import ShowAdultAndRoomMobile from '../hotel-detail/ShowAdultAndRoomMobile'
import ListRoomLoading from '../hotel-detail/ListRoomLoading'
import { isMobileScreen } from '../../utils/common'

interface Props {
    hotel: HotelCheckout
    roomCountRoot: number
    adultCountRoot: number
    nightsRoot: number
    checkInDateRoot: string // YYYYMMDD
}

const PopupChangeRoom: React.FC<Props> = ({ hotel, roomCountRoot, adultCountRoot, nightsRoot, checkInDateRoot }) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const userInfo = useUserInfo()
    const { t, i18n } = useTranslation(['hotel', 'flight', 'common'])
    const [loading, setLoading] = useState<boolean>(false)
    const [checkInDate, setCheckInDate] = useState<string>(moment().format(YYYYMMDD))
    const [nights, setNights] = useState<number>(1)
    /*
        thêm 4 fields checkInUpdated, nightsUpdated, roomCountUpdated, adultCountUpdated để tránh trường hợp:
        user mở popup, thay đổi ngày checkin, checkout, room count .. nhưng ko ấn update
        các field này dùng để lưu data khi user ấn book 1 rate
    */
    const [checkInUpdated, setCheckInUpdated] = useState<string>(moment().format(YYYYMMDD))
    const [nightsUpdated, setNightsUpdated] = useState<number>(1)
    const [roomCountUpdated, setRoomCountUpdated] = useState<number>(1)
    const [adultCountUpdated, setAdultCountUpdated] = useState<number>(1)
    const { rooms, loadingRoom, isOpen, roomCountPicker, adultCountPicker } = useSelector((state: any) => {
        return {
            rooms: state.hotel.listRoomStep1 || [],
            loadingRoom: state.hotel.loadingRoomStep1 || false,
            isOpen: state.checkout.isOpenPopupChangeRoom || false,
            roomCountPicker: state.hotel.roomCount || 1,
            adultCountPicker: state.hotel.adultCount || 1,
        }
    })

    useEffect(() => {
        setRoomCountUpdated(roomCountRoot)
        setAdultCountUpdated(adultCountRoot)
        setNightsUpdated(nightsRoot)
        setCheckInUpdated(checkInDateRoot)
        //---------------------------------
        setCheckInDate(checkInDateRoot) // for current date range
        setNights(nightsRoot)
        dispatch(setRoomCountHotel(roomCountRoot))
        dispatch(setAdultCountHotel(adultCountRoot))
    }, [isOpen, roomCountRoot, adultCountRoot, nightsRoot, checkInDateRoot])

    // handle change datepicker
    const onChangeDate = (dates: [Moment, Moment]) => {
        setCheckInDate(dates[0].format(YYYYMMDD))
        setNights(Math.abs(dates[1].diff(dates[0], 'days')))
    }
    const onCalendarChange = (
        dates: [Moment, Moment],
        dateStrings: [string, string],
        info: { range: 'start' | 'end' }
    ) => {
        if (dates[0] && !dates[1]) {
            setCheckInDate(moment(dates[0]).format(YYYYMMDD))
            setNights(2)
        } else if (!dates[0] && dates[1]) {
            setCheckInDate(moment(dates[1]).add(-2, 'days').format(YYYYMMDD))
            setNights(2)
        } else {
            // this case: rơi vào trường hợp onChangeDate
        }
    }

    // close popup change room
    const closePopup = () => {
        dispatch(setOpenPopupChangeRoom(false))
    }

    // click address => open popup google map
    const handleClickAddress = () => {
        dispatch(toggleViewHotelInMap(true, hotel.latitude, hotel.longitude))
    }

    const handleSearch = () => {
        // khi ấn Search: set checkIn, nights updated
        setCheckInUpdated(checkInDate)
        setNightsUpdated(nights)
        setRoomCountUpdated(roomCountPicker)
        setAdultCountUpdated(adultCountPicker)
        fetchRoom(hotel.hotelId, hotel.isDomestic, checkInDate, nights, roomCountPicker, adultCountPicker)

        async function fetchRoom(
            hotel_id: number,
            isDomestic: boolean,
            check_in: string,
            nights: number,
            room_count: number,
            adult_count: number
        ) {
            dispatch(setLoadingRoomStep1(true))
            const res = await roomsAvailability({
                checkin_date: check_in,
                room_count: room_count,
                adult_count: adult_count,
                hotel_id,
                days: nights,
                request_from: isMobileScreen() ? 'webmobile' : 'website',
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

    const handleBookItem = (room: any, rate: any) => async () => {
        const hotelInfo = {
            id: hotel.hotelId,
            name: hotel.hotelName,
            name_vi: hotel.hotelNameVi,
            star_rate: hotel.starRate,
            latitude: hotel.latitude,
            longitude: hotel.longitude,
            full_address: hotel.fullAddress,
            review_point: hotel.reviewPoint,
            count_reviews: hotel.reviewCount,
            thumb_image: hotel.thumbImage,
            isDomestic: hotel.isDomestic,
        }
        const data: any = {
            key: rate.avail_token,
            value: {
                hotel: hotelInfo,
                checkInDate: checkInUpdated,
                checkOutDate: moment(checkInUpdated, YYYYMMDD).add(nightsUpdated, 'days'),
                nights: nightsUpdated,
                roomCount: roomCountUpdated,
                adultCount: adultCountUpdated,
                checkInDateString: moment(checkInDate).format(YYYYMMDD),
                checkOutDateString: moment(checkInUpdated, YYYYMMDD).add(nightsUpdated, 'days').format(YYYYMMDD),
                room,
                rate,
                avail_token: rate.avail_token,
                userInfo: userInfo,
            },
        }
        try {
            setLoading(true)
            await insertDataCheckout(data)
            await router.push(
                PATH_HOTEL_CHECKOUT_STEP1 + '/[token]',
                PATH_HOTEL_CHECKOUT_STEP1 + '/' + rate.avail_token
            )
            setLoading(false)
            closePopup()
        } catch (e) {
            setLoading(false)
            throw e
        }
    }

    return (
        <Modal visible={isOpen} maskClosable={false} footer={null} width={1140} onCancel={closePopup}>
            <div className="bookingEdit">
                <div className="hotelCard">
                    <div className="hotelCard__img">
                        <img
                            src={getUrlHotelImage({ slug: hotel.thumbImage, hotelId: hotel.hotelId, size: '345x180' })}
                            alt={hotel.hotelName}
                        />
                    </div>
                    <div className="hotelCard__cont">
                        <h3 className="hotelName">
                            {hotel.hotelName}
                            <RenderStarRate starRate={hotel.starRate} />
                        </h3>
                        <div className="hotelAddress mb0">
                            <div className="hotelAddress__icon">
                                <IconMarker />
                            </div>
                            <div className="hotelAddress__text">
                                <p className="mb0">
                                    {hotel.fullAddress}
                                    <button type="button" onClick={handleClickAddress}>
                                        {t('common:Xem bản đồ')}
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <ShowAdultAndRoomMobile />

                {hotel ? (
                    <BoxUpdateRoom
                        checkInDate={checkInDate}
                        nights={nights}
                        onCalendarChange={handleCalendarChange(setCheckInDate, setNights)}
                        onSubmit={handleSearch}
                    />
                ) : null}

                <div className="bookingEdit__table">
                    <div className="bookingEdit__table__header">
                        <div className="bookingEdit__table__cell">
                            <p className="mb0 semibold">{t('Loại phòng')}</p>
                        </div>
                        <div className="bookingEdit__table__cell">
                            <p className="mb0 semibold">{t('Sức chứa')}</p>
                        </div>
                        <div className="bookingEdit__table__cell">
                            <p className="mb0 semibold">{t('Giá')}</p>
                        </div>
                        <div className="bookingEdit__table__cell">
                            <p className="mb0 semibold">&nbsp;</p>
                        </div>
                    </div>
                    <div className="bookingEdit__table__body">
                        {loadingRoom ? (
                            <ListRoomLoading />
                        ) : (
                            Array.isArray(rooms) &&
                            rooms.map((room, indexRoom) => {
                                return (
                                    <div key={`room-${indexRoom}`} className="bookingEdit__table__item">
                                        <div className="bookingEdit__table__title semibold">
                                            <span>{room.name}</span>
                                        </div>
                                        {room.rates.map((rate: any, index: number) => {
                                            return (
                                                <div key={`rate-${index}`} className="bookingEdit__table__row">
                                                    <div className="bookingEdit__table__cell">
                                                        <div className="titleMobile">
                                                            <span>{t('Loại phòng')}</span>
                                                        </div>
                                                        <div className="d-block">
                                                            {/*<p>Superior ( Day use 4 hours)</p>*/}
                                                            <ul className="bookingEdit__table__list">
                                                                <li
                                                                    className={`${rate.refundable ? 'green' : 'red'}-1`}
                                                                >
                                                                    {rate.refundable ? 'Có hoàn hủy' : 'Không hoàn hủy'}
                                                                    <div className="tooltipBox">
                                                                        <IconTooltip />
                                                                        <div className="tooltipBox__cont">
                                                                            <p className="semibold">
                                                                                {t('Chính sách hủy phòng')}
                                                                            </p>
                                                                            <p className="mb0">
                                                                                {rate.cancel_policies}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li
                                                                    className={`${
                                                                        rate.meal_plan === 'no_meal' ? 'red' : 'green'
                                                                    }-1`}
                                                                >
                                                                    {t('Bữa ăn')}: {convertMealPlan(rate.meal_plan, t)}
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="bookingEdit__table__cell">
                                                        <div className="titleMobile">
                                                            <span>{t('Sức chứa')}</span>
                                                        </div>
                                                        <div className="d-block">
                                                            <p className="mb0">
                                                                {rate.adult_count}{' '}
                                                                {t(
                                                                    rate.adult_count > 1
                                                                        ? 'flight:người lớns'
                                                                        : 'flight:người lớn'
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="bookingEdit__table__cell">
                                                        <div className="titleMobile">
                                                            <span>{t('Giá')}</span>
                                                        </div>
                                                        <div className="d-block">
                                                            <p className="mb0 yellow-1 semibold size-20">
                                                                <DisplayPrice
                                                                    price={
                                                                        rate.show_prices['final_price'][
                                                                            'incl_vat_fee_price'
                                                                        ]
                                                                    }
                                                                />
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="bookingEdit__table__cell">
                                                        <div className="bookingEdit__table__btn">
                                                            <Button
                                                                loading={loading}
                                                                type="primary"
                                                                className="btn_orange"
                                                                onClick={handleBookItem(room, rate)}
                                                            >
                                                                <span>{t('Đặt phòng')}</span>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            })
                        )}
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default PopupChangeRoom
