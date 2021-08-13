import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { PAGE_SIZE } from '../../constants/common'
import { YYYYMMDD } from '../../constants/common'
import { HOTEL_FILTER } from '../../constants/enums'
import { formatSeoMetaHotelList, genLinkHotelList } from '../../utils/hotel'
import { hotelAvailability, parseSeoCode } from '../../api/search-engine-services'
import { setDataHeaderHotel, toggleSearchBoxMobile } from '../../store/hotel/action'

const Layout = dynamic(() => import('../../components/layout/Layout'))
const ListView = dynamic(() => import('../../components/hotel-list/ListView'))
const MapView = dynamic(() => import('../../components/hotel-list/MapView'))
import NotFound from '../404'

interface Props {
    // params: string[]
    keyword: string
    hotels: any[]
    extraData: any
    total: number
    page: number
    nights: number
    checkInDateString: string
    view: string
    params: any
    query: any
    seoData: any
    isNotFound: boolean
}

const HotelListStatics: React.FC<Props> = React.memo(
    ({ keyword, hotels, extraData, page, total, nights, checkInDateString, view, seoData, isNotFound }) => {
        if (isNotFound) {
            return <NotFound />
        }

        const dispatch = useDispatch()
        const router = useRouter()
        const { t } = useTranslation(['hotel'])
        const [checkInDate, setCheckInDate] = useState<Date>(new Date())
        const [checkOutDate, setCheckOutDate] = useState<Date>(moment().add(1, 'day').toDate())
        const { isOpenSearchBoxMobile } = useSelector((state: any) => {
            return {
                isOpenSearchBoxMobile: state.hotel.isOpenSearchBoxMobile || false,
            }
        })

        // set check-in, check-out date
        useEffect(() => {
            setCheckInDate(moment(checkInDateString, YYYYMMDD).toDate())
            setCheckOutDate(moment(checkInDateString, YYYYMMDD).add(nights).toDate())
        }, [checkInDateString, nights])

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
                schemaList={seoData.schema_data}
                title={seoData.seo_title}
                description={seoData.seo_description}
                canonical={`${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/khach-san/${keyword}`}
                keyword={seoData.seo_keyword}
            >
                {view && view.toLowerCase() === 'map' ? (
                    <MapView
                        keyword={keyword}
                        regionId={0}
                        isOpenSearchBoxMobile={isOpenSearchBoxMobile}
                        closeSearchBoxMobile={closeSearchBoxMobile}
                        extraData={extraData}
                        total={total}
                        checkInDate={checkInDate}
                        checkOutDate={checkOutDate}
                        nights={nights}
                        isLoading={false}
                        isDomestic={true}
                        hotels={hotels}
                        page={page}
                        handleChangePaging={handleChangePaging}
                        handleSwitchMap={handleSwitchMap}
                    />
                ) : (
                    <ListView
                        keyword={keyword}
                        regionId={0}
                        isOpenSearchBoxMobile={isOpenSearchBoxMobile}
                        closeSearchBoxMobile={closeSearchBoxMobile}
                        extraData={extraData}
                        total={total}
                        checkInDate={checkInDate}
                        checkOutDate={checkOutDate}
                        nights={nights}
                        isLoading={false}
                        isDomestic={true}
                        hotels={hotels}
                        page={page}
                        handleChangePaging={handleChangePaging}
                        handleSwitchMap={handleSwitchMap}
                        seoCode={seoData.seo_code}
                    />
                )}
            </Layout>
        )
    }
)

// const HotelListStatics: React.FC<Props> = ({ params }) => {
//     return (
//         <Layout>
//             <section className="hotelList">
//                 <div className="hotelList__search">
//                     <div role="button" tabIndex={0} className="hotelList__search__backdrop"></div>
//                     <div className="vntSearch">
//                         <div className="container">
//                             <div className="vntSearch__body">
//                                 <div className="vntSearch__main">
//                                     <SearchBoxHotel isShow={true} />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//
//                 <div className="hotelList__body">
//                     <div className="container">{Array.isArray(params) && <p>Khách sạn tại {params.join(', ')}</p>}</div>
//                 </div>
//             </section>
//         </Layout>
//     )
// }

// export async function getStaticPaths() {
//     return {
//         paths: [
//             { params: { slug: ['ha-noi'] } },
//             { params: { slug: ['quang-nam', 'hoi-an'] } },
//             { params: { slug: ['kien-giang', 'phu-quoc'] } },
//             { params: { slug: ['an-giang'] } },
//             { params: { slug: ['binh-thuan'] } },
//             { params: { slug: ['lam-dong'] } },
//             { params: { slug: ['phu-yen'] } },
//             { params: { slug: ['thai-nguyen'] } },
//             { params: { slug: ['ba-ria-vung-tau'] } },
//             { params: { slug: ['can-tho'] } },
//             { params: { slug: ['ha-tinh'] } },
//             { params: { slug: ['lang-son'] } },
//             { params: { slug: ['quang-binh'] } },
//             { params: { slug: ['thanh-hoa'] } },
//             { params: { slug: ['bac-giang'] } },
//             { params: { slug: ['da-nang'] } },
//             { params: { slug: ['hai-phong'] } },
//             { params: { slug: ['quang-nam'] } },
//             { params: { slug: ['thua-thien-hue'] } },
//             { params: { slug: ['ben-tre'] } },
//             { params: { slug: ['dak-lak'] } },
//             { params: { slug: ['hoa-binh'] } },
//             { params: { slug: ['nghe-an'] } },
//             { params: { slug: ['quang-ngai'] } },
//             { params: { slug: ['tien-giang'] } },
//             { params: { slug: ['binh-dinh'] } },
//             { params: { slug: ['dien-bien'] } },
//             { params: { slug: ['khanh-hoa'] } },
//             { params: { slug: ['ninh-binh'] } },
//             { params: { slug: ['quang-ninh'] } },
//             { params: { slug: ['sai-gon-ho-chi-minh'] } },
//             { params: { slug: ['binh-duong'] } },
//             { params: { slug: ['dong-nai'] } },
//             { params: { slug: ['lai-chau'] } },
//             { params: { slug: ['ninh-thuan'] } },
//             { params: { slug: ['quang-tri'] } },
//             { params: { slug: ['vinh-phuc'] } },
//         ],
//         fallback: true, //or false // See the "fallback" section below
//     }
// }

export async function getServerSideProps({ params, query, res }: any) {
    const keyword = params.slug.join('/')
    if (params.slug.length === 1 && (/^(.*)(-)(\d+)$/.test(keyword) || /(\d+)$/.test(keyword))) {
        // match format old hotel detail
        res.setHeader('location', `/hotel/vn/${keyword}`)
        res.statusCode = 301
        res.end()
    }
    const parseCode = await parseSeoCode(keyword)
    if (typeof parseCode !== 'object' || Object.keys(parseCode).length === 0) {
        // seo_code invalid
        res.statusCode = 404
        return {
            props: {
                isNotFound: true,
            },
        }
    }
    const nights = query.nights ? Number(query.nights) : 1
    const checkInDateString = query.checkInDate ? query.checkInDate : moment().format(YYYYMMDD)
    const paramsApi: any = {
        seo_code: keyword,
        check_in_date: checkInDateString,
        nights: nights,
        page_size: PAGE_SIZE,
        page: query.page || 1,
        request_source: 'web_frontend',
    }

    if (query[HOTEL_FILTER.FILTER_BY_PRICE]) {
        paramsApi[HOTEL_FILTER.FILTER_BY_PRICE] = query[HOTEL_FILTER.FILTER_BY_PRICE]
    }
    if (query[HOTEL_FILTER.FILTER_BY_STAR]) {
        paramsApi[HOTEL_FILTER.FILTER_BY_STAR] = query[HOTEL_FILTER.FILTER_BY_STAR]
    }
    if (query[HOTEL_FILTER.FILTER_BY_AREA]) {
        paramsApi[HOTEL_FILTER.FILTER_BY_AREA] = query[HOTEL_FILTER.FILTER_BY_AREA]
    }
    if (query[HOTEL_FILTER.FILTER_BY_CITY]) {
        paramsApi[HOTEL_FILTER.FILTER_BY_CITY] = query[HOTEL_FILTER.FILTER_BY_CITY]
    }
    if (query[HOTEL_FILTER.FILTER_BY_FACILITY]) {
        paramsApi[HOTEL_FILTER.FILTER_BY_FACILITY] = query[HOTEL_FILTER.FILTER_BY_FACILITY]
    }
    if (query[HOTEL_FILTER.FILTER_BY_TYPE]) {
        paramsApi[HOTEL_FILTER.FILTER_BY_TYPE] = query[HOTEL_FILTER.FILTER_BY_TYPE]
    }
    if (query.sort_by && query.sort_mode) {
        paramsApi.sort_by = query.sort_by
        paramsApi.sort_mode = query.sort_mode
    }
    const response = await hotelAvailability(paramsApi)

    let hotels = []
    let total = 0
    let page = 1
    let extraData: any = {}

    if (response.status === 'success') {
        hotels = response.data
        total = response.total
        page = response.page
        extraData = response.ext_data
    }

    /**
     * SEO META
     */
    const seoData =
        extraData?.location_info && Object.keys(extraData.location_info).length
            ? formatSeoMetaHotelList(keyword, parseCode, params?.slug)
            : {}

    return {
        props: {
            params,
            query,
            keyword,
            hotels,
            total,
            page,
            extraData,
            checkInDateString,
            nights,
            view: query.view ? query.view : 'list',
            seoData,
            isNotFound: false,
        }, // will be passed to the page component as props
    }
}

export default HotelListStatics
