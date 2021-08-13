import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import moment, { Moment } from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { IconMarker } from '../../../constants/icons'
import { PATH_HOTEL_DETAIL, PATH_HOTEL_SEARCH, YYYYMMDD } from '../../../constants/common'
import { getHotelDetail } from '../../../api/hotel-services'
import { convertUnicode, toggleClassNoScroll, removeHtmlTag, isMobileScreen } from '../../../utils/common'
import {
    setAdultCountHotel,
    setCheckInDatePickerHotel,
    setCheckOutDatePickerHotel,
    setDataHeaderHotel,
    setPriceOneNight,
    setRoomCountHotel,
    toggleSearchBoxMobile,
    toggleViewHotelInMap,
} from '../../../store/hotel/action'
import { useRouter } from 'next/router'
import { getHotelDetailLink, getUrlHotelImage, handleCalendarChange } from '../../../utils/hotel'
import { roomsAvailability } from '../../../api/search-engine-services'
import { useUserInfo } from '../../../utils/custom-hook'
import SearchBoxHotel from '../../../components/search-box-hotel/SearchBoxHotel'
import FacebookLikeShare from '../../../components/facebook/FacebookLikeShare'

const Layout = dynamic(() => import('../../../components/layout/Layout'))
const BoxUpdateRoom = dynamic(() => import('../../../components/hotel-detail/BoxUpdateRoom'))
const ShowAdultAndRoomMobile = dynamic(() => import('../../../components/hotel-detail/ShowAdultAndRoomMobile'))
const HotelGallery = dynamic(() => import('../../../components/hotel-detail/HotelGallery'))
const HotelDetailDescription = dynamic(() => import('../../../components/hotel-detail/HotelDetailDescription'))
const ListRoom = dynamic(() => import('../../../components/hotel-detail/ListRoom'))
const HotelDetailReview = dynamic(() => import('../../../components/hotel-detail/HotelDetailReview'))
const RenderStarRate = dynamic(() => import('../../../components/hotel-list/RenderStarRate'))
const RenderReviewPoint = dynamic(() => import('../../../components/hotel-list/RenderReviewPoint'))

interface Props {
    hotel: any
    hotelId: number
    isOpenSearchBoxMobile: boolean
}

const HotelDetail: React.FC<Props> = ({ hotelId, hotel }) => {
    const { t, i18n } = useTranslation(['common', 'hotel'])
    const dispatch = useDispatch()
    const router = useRouter()
    const [checkInDateInUrl, setCheckInDateInUrl] = useState<string>(moment().format(YYYYMMDD))
    const [nightsInUrl, setNightsInUrl] = useState<number>(1)
    const [checkInDate, setCheckInDate] = useState<string>(moment().format(YYYYMMDD))
    const [nights, setNights] = useState<number>(1)
    const [roomData, setRoomData] = useState<any[]>([])
    const [roomLoading, setRoomLoading] = useState<boolean>(false)
    const [huntMode, setHuntMode] = useState<number>(0)
    const { roomCountPicker, adultCountPicker } = useSelector((state: any) => {
        return {
            roomCountPicker: state.hotel.roomCount || 1,
            adultCountPicker: state.hotel.adultCount || 1,
        }
    })
    const userInfo = useUserInfo()
    const { isOpenSearchBoxMobile } = useSelector((state: any) => {
        return {
            isOpenSearchBoxMobile: state.hotel.isOpenSearchBoxMobile || false,
        }
    })

    // Schema for hotel detail
    const hotel_desc = removeHtmlTag(hotel.des_content)
    const schemaData = [
        {
            '@type': 'Hotel',
            name: hotel.name,
            description: hotel_desc?.substring(0, 155),
            telephone: `+84 ${hotel.phone}`,
            url: `${process.env.NEXT_PUBLIC_ROOT_DOMAIN + PATH_HOTEL_DETAIL}/${(
                hotel.country_code || 'VN'
            ).toLowerCase()}/${convertUnicode(hotel.name)}-${hotelId}`,
            address: {
                '@type': 'PostalAddress',
                addressCountry: 'Việt Nam',
                addressLocality: '',
                addressRegion: hotel.province_name,
                streetAddress: hotel.full_address,
                postalCode: '',
            },
            image: getUrlHotelImage({ slug: hotel.thumb_image, hotelId: hotel.id, size: '800x550' }),
            aggregateRating: {
                '@type': 'AggregateRating',
                bestRating: 10,
                reviewCount: hotel.count_reviews * 1 || 1,
                ratingValue: hotel?.review_point ? hotel?.review_point?.toFixed(1) * 1 : 10,
            },
            priceRange: `Đặt phòng ${hotel.name} giá tốt trên Vntrip`,
        },
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Khách sạn',
                    item: `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/khach-san`,
                },
                {
                    '@type': 'ListItem',
                    position: 2,
                    name: hotel.province_name,
                    item: `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/khach-san/${hotel.province_code}`,
                },
                {
                    '@type': 'ListItem',
                    position: 3,
                    name: hotel.city_name,
                    item: `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/khach-san/${hotel.province_code}/${hotel.city_code}`,
                },
            ],
        },
    ]

    useEffect(() => {
        const _mode = router.query.hunt_mode ? Number(router.query.hunt_mode) : 0
        setHuntMode(_mode)
    }, [router.query.hunt_mode])

    // fetch room data from api
    useEffect(() => {
        const _checkInDate = moment(router.query.checkInDate, YYYYMMDD, true).isValid()
            ? String(router.query.checkInDate)
            : moment().format(YYYYMMDD)
        const _nights = router.query.nights ? Number(router.query.nights) : 1
        const _roomCount = router.query.roomCount ? Number(router.query.roomCount) : 1
        const _adultCount = router.query.adultCount ? Number(router.query.adultCount) : 1
        const _mode = router.query.hunt_mode ? Number(router.query.hunt_mode) : 0
        dispatch(setCheckInDatePickerHotel(moment(router.query.checkInDate).toDate()))
        dispatch(setCheckOutDatePickerHotel(moment(router.query.checkInDate).add(_nights, 'days').toDate()))
        // set to state
        setCheckInDate(_checkInDate)
        setNights(_nights)
        setCheckInDateInUrl(_checkInDate)
        setNightsInUrl(_nights)
        // set to store
        dispatch(setRoomCountHotel(_roomCount))
        dispatch(setAdultCountHotel(_adultCount))
        if (hotelId) {
            fetchRoomDomestic(hotelId, _checkInDate, _nights, _roomCount, _adultCount, _mode)
        }

        async function fetchRoomDomestic(
            hotel_id: number,
            check_in: string,
            nights: number,
            room_count: number,
            adult_count: number,
            hunt_mode: number
        ) {
            setRoomLoading(true)
            const res = await roomsAvailability({
                checkin_date: check_in,
                room_count: room_count,
                adult_count: adult_count,
                hotel_id: hotel_id,
                days: nights,
                request_from: isMobileScreen() ? 'webmobile' : 'website',
                locale: i18n.language,
                currency_code: 'vnd',
                hotel_min_price: '0',
                is_international: false,
                hunt_mode: hunt_mode === 1 ? '1' : '0',
            })
                .then((res) => res.data)
                .then((data) => (Array.isArray(data) && data.length > 0 ? data[0] : null))
                .then((obj) => (obj ? obj.room_data : []))
                .catch((err) => console.log(err.response))

            setRoomLoading(false)
            setRoomData(res)
        }
    }, [router.query, huntMode, router.pathname, hotelId, i18n.language, !!userInfo])

    useEffect(() => {
        // show price one night foi hotel detail
        dispatch(setPriceOneNight(true))
    }, [router.pathname])

    useEffect(() => {
        window?.FB?.XFBML?.parse()
    }, [router])

    // open map
    const handleOpenMap = (latitude: number, longitude: number) => {
        dispatch(toggleViewHotelInMap(true, latitude, longitude))
    }

    const handleScrollToReview = () => {
        let elmnt = document.getElementById('hotelReview')
        elmnt?.scrollIntoView({ behavior: 'smooth' })
    }

    // handle change datepicker
    const onChangeDate = (dates: [Moment, Moment], dateStrings: [string, string], info: { range: 'start' | 'end' }) => {
        setCheckInDate(dates[0].format(YYYYMMDD))
        setNights(Math.abs(dates[1].diff(dates[0], 'days')))
    }
    const onCalendarChange = (dates: [Moment, Moment]) => {
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

    // submit in
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
        <Layout
            title={`${hotel.name_vi}, ${hotel.city_name}, ${hotel.province_name} | Vntrip.vn`}
            description={`${hotel.name_vi}, ${hotel.city_name}, ${hotel.province_name}: Giá tốt ưu đãi tới 75%, đặt phòng trực tuyến trên Vntrip.vn hoặc gọi ngay 0963266688.`}
            keyword={`${hotel.name_vi}, đặt phòng ${hotel.name_vi} giá rẻ`}
            canonical={`${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/hotel/vn/${convertUnicode(hotel.name)}-${hotelId}`}
            schemaList={schemaData}
        >
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
                                    <li>
                                        <Link
                                            href={`${PATH_HOTEL_SEARCH}?keyword=${
                                                hotel?.province_code
                                            }&checkInDate=${moment(checkInDate).format(YYYYMMDD)}&nights=${nights}`}
                                        >
                                            <a>
                                                <span>
                                                    {t('hotel:Khách sạn tại')} {hotel.province_name}
                                                </span>
                                            </a>
                                        </Link>
                                    </li>
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
                                        <div
                                            className="hotelDetail__rate"
                                            onClick={handleScrollToReview}
                                            onKeyUp={handleScrollToReview}
                                            role={'button'}
                                            tabIndex={0}
                                        >
                                            <RenderReviewPoint
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
                                    isDomestic={true}
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
                                    checkInDate={checkInDateInUrl}
                                    nights={nightsInUrl}
                                    roomData={roomData}
                                    isLoading={roomLoading}
                                />

                                <HotelDetailDescription
                                    name={i18n.language === 'en' ? hotel?.name : hotel?.name_vi}
                                    content={hotel?.des_content}
                                    categories={hotel?.categories}
                                    facilitiesPerCat={hotel?.facilities_per_categories}
                                    checkInTime={hotel?.check_in_time}
                                    checkOutTime={hotel?.check_out_time}
                                />

                                <HotelDetailReview
                                    hotelId={hotelId}
                                    hotelName={i18n.language === 'en' ? hotel?.name : hotel?.name_vi}
                                />

                                {/*<HotelSimilar />*/}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export const getServerSideProps = async ({ params, query, res, req }: any) => {
    const id_split = params?.id?.split('-')
    const hotel_id = id_split?.[id_split?.length - 1]
    const hotel_data = await getHotelDetail(hotel_id)
        .then((res) => res?.data)
        .then((data) => data?.results?.[0])
    const nights = query.nights ? Number(query.nights) : 1
    const isPastDay = moment(query?.checkInDate, YYYYMMDD).startOf('day').isBefore(moment().startOf('day'))
    const _checkInDate = moment(query?.checkInDate, YYYYMMDD).isValid()
        ? moment(query?.checkInDate, YYYYMMDD).toDate()
        : moment().toDate()
    const url = getHotelDetailLink({
        hotelId: Number(hotel_data?.id || hotel_data?.vntrip_id),
        hotelName: hotel_data?.name,
        countryCode: 'VN',
        checkInDate: isPastDay ? new Date() : _checkInDate,
        nights: nights <= 0 ? 1 : nights,
        onlyReturnPath: false,
    })
    if (
        isPastDay ||
        nights <= 0 ||
        params?.id !== convertUnicode(hotel_data?.name) + '-' + Number(hotel_data?.id || hotel_data?.vntrip_id)
    ) {
        res.setHeader('location', url)
        res.statusCode = 301
        res.end()
    }

    return {
        props: {
            namespacesRequired: ['common', 'hotel'],
            hotel: hotel_data,
            hotelId: hotel_id,
        },
    }
}

export default HotelDetail
