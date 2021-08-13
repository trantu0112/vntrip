import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { useMounted, useUserInfo } from '../utils/custom-hook'
import { PAGE_SIZE } from '../constants/common'
import { YYYYMMDD } from '../constants/common'
import { HOTEL_FILTER } from '../constants/enums'
import { isMobileScreen, toggleClassNoScroll } from '../utils/common'
import { genLinkHotelList, getMinMaxFilterPriceInter, getMinMaxFilterStarInter } from '../utils/hotel'
import { hotelAvailability, hotelAvailabilityInterV2 } from '../api/search-engine-services'
import { setDataHeaderHotel, setMapCenter, toggleSearchBoxMobile } from '../store/hotel/action'

const Layout = dynamic(() => import('../components/layout/Layout'))
const ListView = dynamic(() => import('../components/hotel-list/ListView'))
const MapView = dynamic(() => import('../components/hotel-list/MapView'))

interface Props {}

const HotelList: React.FC<Props> = React.memo(() => {
    const dispatch = useDispatch()
    const router = useRouter()
    const { t } = useTranslation(['hotel'])
    const [loading, setLoading] = useState<boolean>(false)
    const [hotels, setHotels] = useState<any[]>([])
    const [keyword, setKeyword] = useState<string>('')
    const [extraData, setExtraData] = useState<any | null>(null)
    const [total, setTotal] = useState<number>(0)
    const [page, setPage] = useState<number>(1)
    const [checkInDate, setCheckInDate] = useState<Date>(new Date())
    const [checkOutDate, setCheckOutDate] = useState<Date>(moment().add(1, 'day').toDate())
    const [nights, setNights] = useState<number>(1)
    const [isMapView, setIsMapView] = useState<boolean>(false)
    const [isDomestic, setIsDomestic] = useState<boolean>(true)
    const [regionId, setRegionId] = useState<number>(0) // only for hotel inter
    const { isOpenSearchBoxMobile } = useSelector((state: any) => {
        return {
            isOpenSearchBoxMobile: state.hotel.isOpenSearchBoxMobile || false,
        }
    })
    const userInfo = useUserInfo()

    useEffect(() => {
        setIsMapView(String(router.query.view).toLowerCase() === 'map')
    }, [router.pathname, router.query.view])

    // fetch data
    useEffect(() => {
        const query = router.query
        if (moment(query.checkInDate, YYYYMMDD).startOf('day') < moment().startOf('day')) {
            // trường hợp search với ngày quá khứ => sửa url về ngày hiện tại
            const new_query: any = { ...router.query, checkInDate: moment().format(YYYYMMDD) }
            router.push(genLinkHotelList(new_query), undefined, { shallow: true })
        }
        const check_in_date =
            moment(query.checkInDate).isValid() && moment(query.checkInDate, 'YYYYMMDD') > moment()
                ? moment(query.checkInDate, YYYYMMDD).toDate()
                : moment().toDate()
        const nights = Number(query.nights || 1)
        const check_out_date = moment(check_in_date).add(nights, 'day').toDate()
        // const seo_code = Array.isArray(query.slug) ? query.slug.join('/') : ''
        const countryCode = query.countryCode ? query.countryCode.toString() : ''
        setCheckInDate(check_in_date)
        setNights(nights)
        setCheckOutDate(check_out_date)
        setKeyword(query.keyword ? query.keyword.toString() : '')
        setRegionId(query.regionId ? Number(query.regionId) : 0)

        if (countryCode && countryCode.toUpperCase() !== 'VN') {
            fetchDataInternational(query)
            setIsDomestic(false)
        } else {
            fetchDataDomestic(query)
            setIsDomestic(true)
        }

        async function fetchDataDomestic(query: any) {
            try {
                setLoading(true)
                const params: any = {
                    seo_code: query.keyword,
                    check_in_date: moment(check_in_date).format(YYYYMMDD),
                    nights: nights,
                    page_size: PAGE_SIZE,
                    page: query.page || 1,
                    request_source: isMobileScreen() ? 'webmobile' : 'web_frontend',
                }
                if (userInfo) {
                    params.acc_type = 'member'
                }
                if (query[HOTEL_FILTER.FILTER_BY_PRICE]) {
                    params[HOTEL_FILTER.FILTER_BY_PRICE] = query[HOTEL_FILTER.FILTER_BY_PRICE]
                }
                if (query[HOTEL_FILTER.FILTER_BY_STAR]) {
                    params[HOTEL_FILTER.FILTER_BY_STAR] = query[HOTEL_FILTER.FILTER_BY_STAR]
                }
                if (query[HOTEL_FILTER.FILTER_BY_AREA]) {
                    params[HOTEL_FILTER.FILTER_BY_AREA] = query[HOTEL_FILTER.FILTER_BY_AREA]
                }
                if (query[HOTEL_FILTER.FILTER_BY_CITY]) {
                    params[HOTEL_FILTER.FILTER_BY_CITY] = query[HOTEL_FILTER.FILTER_BY_CITY]
                }
                if (query[HOTEL_FILTER.FILTER_BY_FACILITY]) {
                    params[HOTEL_FILTER.FILTER_BY_FACILITY] = query[HOTEL_FILTER.FILTER_BY_FACILITY]
                }
                if (query[HOTEL_FILTER.FILTER_BY_TYPE]) {
                    params[HOTEL_FILTER.FILTER_BY_TYPE] = query[HOTEL_FILTER.FILTER_BY_TYPE]
                }
                if (query.sort_by && query.sort_mode) {
                    params.sort_by = query.sort_by
                    params.sort_mode = query.sort_mode
                }
                const res = await hotelAvailability(params)
                setLoading(false)
                if (res.status === 'success') {
                    setHotels(res.data)
                    setTotal(res.total)
                    setPage(res.page)
                    setExtraData(res.ext_data)
                    const firstHotel = res.data[0]
                    // set map center, set hotelId = 0 when don't want active any hotel
                    dispatch(setMapCenter(0, firstHotel?.location?.lat, firstHotel?.location?.lon))
                }
            } catch (err) {
                setLoading(false)
                throw err
            }
        }

        async function fetchDataInternational(query: any) {
            try {
                setLoading(true)
                const params: any = {
                    region_id: query.regionId,
                    check_in_date: moment(check_in_date).format(YYYYMMDD),
                    nights: nights,
                    page_size: PAGE_SIZE,
                    page: query.page || 1,
                    request_source: isMobileScreen() ? 'webmobile' : 'web_frontend',
                }
                if (query[HOTEL_FILTER.FILTER_BY_PRICE]) {
                    const parseFilterPrice = getMinMaxFilterPriceInter(query[HOTEL_FILTER.FILTER_BY_PRICE])
                    params[HOTEL_FILTER.FILTER_BY_MIN_PRICE] = parseFilterPrice.filter_min_price
                    params[HOTEL_FILTER.FILTER_BY_MAX_PRICE] = parseFilterPrice.filter_max_price
                }
                if (query[HOTEL_FILTER.FILTER_BY_STAR]) {
                    const parseFilterStar = getMinMaxFilterStarInter(query[HOTEL_FILTER.FILTER_BY_STAR])
                    params[HOTEL_FILTER.FILTER_BY_MIN_STAR] = parseFilterStar.filter_min_star
                    params[HOTEL_FILTER.FILTER_BY_MAX_STAR] = parseFilterStar.filter_max_star
                }
                if (query.sort_by === 'price' && query.sort_mode) {
                    params.sort = query.sort_mode.toLowerCase() === 'desc' ? 'PRICE_REVERSE' : 'PRICE_AVERAGE'
                }

                const res = await hotelAvailabilityInterV2(params)
                setLoading(false)
                if (res.status === 'success') {
                    setHotels(res.data)
                    setTotal(res.total)
                    setPage(res.page)
                    const firstHotel = res.data[0]
                    // set map center, set hotelId = 0 when don't want active any hotel
                    dispatch(setMapCenter(0, firstHotel?.location?.lat, firstHotel?.location?.lon))
                }
            } catch (e) {
                throw e
            }
        }
    }, [router.pathname, router.query, !!userInfo])

    // set infomations header mobile
    useEffect(() => {
        dispatch(
            setDataHeaderHotel({
                title1: extraData?.location_info?.full_addr,
                title2: `${moment(checkInDate).format('DD/MM')} - ${moment(checkOutDate).format(
                    'DD/MM'
                )}, ${nights} ${t(nights > 1 ? 'đêms' : 'đêm')}`,
            })
        )
    }, [checkInDate, checkOutDate, extraData])

    const closeSearchBoxMobile = () => {
        toggleClassNoScroll('remove')
        dispatch(toggleSearchBoxMobile(false))
    }

    const handleChangePaging = (_page: number) => {
        router.push(genLinkHotelList({ ...router.query, page: _page }), undefined, { shallow: true })
    }

    const handleSwitchMap = (type: 'list' | 'map') => {
        const new_query: any = { ...router.query, view: 'map' }
        if (type === 'list') {
            delete new_query.view
        }
        router.push(genLinkHotelList(new_query), undefined, { shallow: true })
    }

    return (
        <Layout
            title={'Tìm khách sạn giá rẻ bất cứ nơi nào bạn muốn | Vntrip.vn'}
            description={
                'Hơn 12.000 khách sạn trong nước đang có giá cực tốt, chọn địa điểm và thời gian của bạn tìm ngay. Đặt trực tuyến hoặc gọi 0963266688'
            }
            keyword={'khách sạn, đặt phòng khách sạn, đặt phòng khách sạn giá rẻ'}
            canonical={process.env.NEXT_PUBLIC_ROOT_DOMAIN + '/tim-khach-san'}
        >
            {isMapView ? (
                <MapView
                    keyword={keyword}
                    regionId={regionId}
                    isOpenSearchBoxMobile={isOpenSearchBoxMobile}
                    closeSearchBoxMobile={closeSearchBoxMobile}
                    extraData={extraData}
                    total={total}
                    checkInDate={checkInDate}
                    checkOutDate={checkOutDate}
                    nights={nights}
                    isLoading={loading}
                    isDomestic={isDomestic}
                    hotels={hotels}
                    page={page}
                    handleChangePaging={handleChangePaging}
                    handleSwitchMap={handleSwitchMap}
                />
            ) : (
                <ListView
                    keyword={keyword}
                    regionId={regionId}
                    isOpenSearchBoxMobile={isOpenSearchBoxMobile}
                    closeSearchBoxMobile={closeSearchBoxMobile}
                    extraData={extraData}
                    total={total}
                    checkInDate={checkInDate}
                    checkOutDate={checkOutDate}
                    nights={nights}
                    isLoading={loading}
                    isDomestic={isDomestic}
                    hotels={hotels}
                    page={page}
                    handleChangePaging={handleChangePaging}
                    handleSwitchMap={handleSwitchMap}
                />
            )}
        </Layout>
    )
})

export default HotelList
