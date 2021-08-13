import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import moment from 'moment'
import { getHotelDetailInter } from '../../../api/hotel-services'
import { isMobileByUserAgent, isMobileScreen, toggleClassNoScroll } from '../../../utils/common'
import { handleCalendarChange } from '../../../utils/hotel'
import Link from 'next/link'
import { PATH_HOTEL_DETAIL, PATH_HOTEL_SEARCH, YYYYMMDD } from '../../../constants/common'
import { IconMarker } from '../../../constants/icons'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import {
    setAdultCountHotel,
    setDataHeaderHotel,
    setPriceOneNight,
    setRoomCountHotel,
    toggleSearchBoxMobile,
    toggleViewHotelInMap,
} from '../../../store/hotel/action'
import { useRouter } from 'next/router'
import { roomsAvailability } from '../../../api/search-engine-services'
import FacebookLikeShare from '../../../components/facebook/FacebookLikeShare'
import SearchBoxHotel from '../../../components/search-box-hotel/SearchBoxHotel'

const Layout = dynamic(() => import('../../../components/layout/Layout'))
const BoxUpdateRoom = dynamic(() => import('../../../components/hotel-detail/BoxUpdateRoom'))
const ShowAdultAndRoomMobile = dynamic(() => import('../../../components/hotel-detail/ShowAdultAndRoomMobile'))
const HotelGallery = dynamic(() => import('../../../components/hotel-detail/HotelGallery'))
const HotelDetailDescription = dynamic(() => import('../../../components/hotel-detail/HotelDetailDescription'))
const ListRoom = dynamic(() => import('../../../components/hotel-detail/ListRoom'))
const RenderStarRate = dynamic(() => import('../../../components/hotel-list/RenderStarRate'))
const RenderRewviewPoint = dynamic(() => import('../../../components/hotel-list/RenderReviewPoint'))

interface Props {
    hotel: any
    hotelId: number
    nights: number
    checkInDate: string
    checkOutDate: string
    roomCount: number
    adultCount: number
    isMobile?: boolean
    keyword?: string
    regionId?: number
    isOpenSearchBoxMobile: boolean
}

const HotelDetailInternational: React.FC<Props> = ({ hotelId, hotel, keyword, regionId }) => {
    const { t, i18n } = useTranslation(['common', 'hotel'])
    const dispatch = useDispatch()
    const router = useRouter()
    const [checkInDateInUrl, setCheckInDateInUrl] = useState<string>(moment().format(YYYYMMDD))
    const [nightsInUrl, setNightsInUrl] = useState<number>(1)
    const [checkInDate, setCheckInDate] = useState<string>(moment().format(YYYYMMDD))
    const [nights, setNights] = useState<number>(1)
    const [roomData, setRoomData] = useState<any[]>([])
    const [roomLoading, setRoomLoading] = useState<boolean>(false)
    const { roomCountPicker, adultCountPicker } = useSelector((state: any) => {
        return {
            roomCountPicker: state.hotel.roomCount || 1,
            adultCountPicker: state.hotel.adultCount || 1,
        }
    })
    const { isOpenSearchBoxMobile } = useSelector((state: any) => {
        return {
            isOpenSearchBoxMobile: state.hotel.isOpenSearchBoxMobile || false,
        }
    })

    // fetch room data from api
    useEffect(() => {
        const _checkInDate = moment(router.query.checkInDate, YYYYMMDD, true).isValid()
            ? String(router.query.checkInDate)
            : moment().format(YYYYMMDD)
        const _nights = router.query.nights ? Number(router.query.nights) : 1
        const _roomCount = router.query.roomCount ? Number(router.query.roomCount) : 1
        const _adultCount = router.query.adultCount ? Number(router.query.adultCount) : 1
        // set to state
        setCheckInDate(_checkInDate)
        setNights(_nights)
        setCheckInDateInUrl(_checkInDate)
        setNightsInUrl(_nights)
        // set to store
        dispatch(setRoomCountHotel(_roomCount))
        dispatch(setAdultCountHotel(_adultCount))

        if (hotelId) {
            fetchRoomDomestic(hotelId, _checkInDate, _nights, _roomCount, _adultCount)
        }

        async function fetchRoomDomestic(
            hotel_id: number,
            check_in: string,
            nights: number,
            room_count: number,
            adult_count: number
        ) {
            setRoomLoading(true)
            const res = await roomsAvailability({
                checkin_date: check_in,
                room_count: room_count,
                adult_count: adult_count,
                hotel_id: hotel_id,
                days: nights,
                request_from: isMobileScreen() ? 'mobileweb' : 'website',
                locale: i18n.language,
                currency_code: 'vnd',
                hotel_min_price: '0',
                is_international: true,
            })
                .then((res) => res.data)
                .then((data) => (Array.isArray(data) && data.length > 0 ? data[0] : null))
                .then((obj) => (obj ? obj.room_data : []))
                .catch((err) => console.log(err.response))

            setRoomLoading(false)
            setRoomData(res)
        }
    }, [
        hotelId,
        router.pathname,
        router.asPath,
        router.query.checkInDate,
        router.query.nights,
        router.query.roomCount,
        router.query.adultCount,
    ])

    useEffect(() => {
        window?.FB?.XFBML?.parse()
    }, [router])

    useEffect(() => {
        // show price one night foi hotel detail
        dispatch(setPriceOneNight(true))
    }, [])

    // open map
    const handleOpenMap = (latitude: number, longitude: number) => {
        dispatch(toggleViewHotelInMap(true, latitude, longitude))
    }

    const handleSearch = () => {
        const stringify = `checkInDate=${checkInDate}&nights=${nights}&roomCount=${roomCountPicker}&adultCount=${adultCountPicker}`
        // change router if hotel detail
        router.push(`${router.pathname}?${stringify}`, `${PATH_HOTEL_DETAIL}/vn/${router.query.id}?${stringify}`, {
            shallow: true,
        })
    }

    const closeSearchBoxMobile = () => {
        toggleClassNoScroll('remove')
        dispatch(toggleSearchBoxMobile(false))
    }

    // set infomations header mobile
    useEffect(() => {
        dispatch(
            setDataHeaderHotel({
                title1: i18n.language === 'en' ? hotel?.name : hotel?.name_vi,
                title2: `${moment(checkInDate, YYYYMMDD).format('DD/MM')} - ${moment(checkInDate, YYYYMMDD)
                    .add(nights, 'days')
                    .format('DD/MM')}, ${nights} ${t(nights > 1 ? 'đêms' : 'đêm')}`,
            })
        )
    }, [checkInDate, nights, hotel])

    return (
        <Layout>
            <section className="hotelDetail">
                <div className={`hotelList__search${isOpenSearchBoxMobile ? ' open' : ''}`}>
                    <div
                        role="button"
                        tabIndex={0}
                        className="hotelList__search__backdrop"
                        onClick={closeSearchBoxMobile}
                        onKeyDown={closeSearchBoxMobile}
                    />
                    <div className="vntSearch">
                        <div className="container">
                            <div className="vntSearch__body">
                                <div className="vntSearch__main">
                                    <SearchBoxHotel isShow={true} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="hotelDetail__body">
                    <div className="container">
                        <div className="hotelDetail__main">
                            <div className="d-flex" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                                <ul className="breadcrumb">
                                    <li>
                                        <Link href="/">
                                            <a>
                                                <span>{t('Trang chủ')}</span>
                                            </a>
                                        </Link>
                                    </li>

                                    {keyword && regionId ? (
                                        <li>
                                            <Link
                                                href={`${PATH_HOTEL_SEARCH}?keyword=${keyword}&regionId=${regionId}&checkInDate=${moment(
                                                    checkInDate
                                                ).format(YYYYMMDD)}&nights=${nights}`}
                                            >
                                                <a>
                                                    <span>
                                                        {t('hotel:Khách sạn tại')} {keyword}
                                                    </span>
                                                </a>
                                            </Link>
                                        </li>
                                    ) : null}

                                    <li className="active">{i18n.language === 'en' ? hotel?.name : hotel?.name_vi}</li>
                                </ul>
                                <FacebookLikeShare />
                            </div>
                            {/*<HotelInforLoading />*/}
                            <div className="hotelDetail__header">
                                <div className="hotelDetail__info">
                                    <h1 className="hotelName mb5">
                                        {i18n.language === 'en' ? hotel?.name : hotel?.name_vi}
                                        <RenderStarRate starRate={hotel?.ratings} />
                                    </h1>
                                    <div className="hotelAddress">
                                        <div className="hotelAddress__icon">
                                            <IconMarker />
                                        </div>
                                        <div className="hotelAddress__text">
                                            <p className="mb0">{hotel?.full_address}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="hotelDetail__action">
                                    {hotel?.review_point > 0 && (
                                        <div className="hotelDetail__rate">
                                            <RenderRewviewPoint
                                                point={hotel?.review_point}
                                                count={hotel?.count_reviews}
                                            />
                                        </div>
                                    )}
                                    {/* FOR MOBILE */}
                                    <ShowAdultAndRoomMobile />
                                </div>

                                <HotelGallery
                                    hotelId={hotel?.id}
                                    hotelName={hotel?.name}
                                    images={hotel?.images}
                                    images360={hotel?.images_360}
                                    latitude={hotel?.latitude}
                                    longitude={hotel?.longitude}
                                    isDomestic={false}
                                    isCombo={false}
                                />
                            </div>
                            <div className="hotelDetail__body">
                                <BoxUpdateRoom
                                    checkInDate={checkInDate}
                                    nights={nights}
                                    onCalendarChange={handleCalendarChange(setCheckInDate, setNights)}
                                    onSubmit={handleSearch}
                                />

                                {/*<RoomAvailLoading />*/}

                                <ListRoom
                                    hotel={hotel}
                                    roomData={roomData}
                                    checkInDate={checkInDateInUrl}
                                    nights={nightsInUrl}
                                    isLoading={roomLoading}
                                />

                                <HotelDetailDescription
                                    name={i18n.language === 'en' ? hotel?.name : hotel?.name_vi}
                                    content={hotel?.des_content}
                                    categories={hotel?.facilities?.categories}
                                    facilitiesPerCat={hotel?.facilities?.list}
                                    checkInTime={hotel?.check_in_time}
                                    checkOutTime={hotel?.check_out_time}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export const getServerSideProps = async ({ query, params, req }: any) => {
    const UA = req?.headers['user-agent']
    const checkInDate = moment(query?.checkInDate, YYYYMMDD).isValid() ? query?.checkInDate : moment().format(YYYYMMDD)
    const nights = Number(query?.nights || 1)
    const checkOutDate = moment(checkInDate, 'YYYYMMDD').add(nights, 'day').format('YYYYMMDD')
    const keyword = query?.keyword || ''
    const regionId = query?.regionId ? Number(query?.regionId) : 0
    const isMobile = isMobileByUserAgent(UA)
    const id_split = params?.id?.split('-')
    const hotel_id = id_split?.[id_split?.length - 1]
    const hotel_data = await getHotelDetailInter(hotel_id, isMobile ? 'WEBMOBILE' : 'WEBSITE').then((res) => res?.data)

    return {
        props: {
            namespacesRequired: ['common', 'hotel'],
            checkInDate,
            checkOutDate,
            nights,
            isMobile: isMobileByUserAgent(UA),
            hotel: hotel_data,
            hotelId: hotel_id,
            roomCount: Number(query?.room_count) || 1,
            adultCount: Number(query?.adult_count) || 2,
            keyword,
            regionId,
        },
    }
}

export default HotelDetailInternational
