import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import { PATH_HOTEL_SEARCH, YYYYMMDD } from '../../constants/common'
import { hotelAvailability, topHotelsHunt } from '../../api/search-engine-services'
import { useRouter } from 'next/router'
import { useMounted, useUserInfo } from '../../utils/custom-hook'
import LoadingHotelListHunt from '../../components/hunt/LoadingHotelListHunt'
import { Pagination } from 'antd'
import { isMobileScreen } from '../../utils/common'

const Layout = dynamic(() => import('../../components/layout/Layout'))
const SearchBoxHotel = dynamic(() => import('../../components/search-box-hotel/SearchBoxHotel'))
const HotelItemHunt = dynamic(() => import('../../components/hunt/HotelItemHunt'))
const HuntCommitment = dynamic(() => import('../../components/hunt/HuntCommitment'))
const MemberShipBox = dynamic(() => import('../../components/hunt/MemberShipBox'))
const AppInfo = dynamic(() => import('../../components/hunt/AppInfo'))

interface Props {}

const HuntHotelBestPrice: React.FC<Props> = () => {
    const router = useRouter()
    const { t } = useTranslation(['hotel'])
    const [hotelsTop, setHotelsTop] = useState<any[]>([])
    const [hotelsProvince, setHotelsProvince] = useState<any[]>([])
    const [nights, setNights] = useState<number>(1)
    const [checkInDate, setCheckInDate] = useState<Date>(new Date())
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [seoCode, setSeoCode] = useState<string>('')
    const [provinceName, setProvinceName] = useState<string>('')
    const userInfo = useUserInfo()
    const isMounted = useMounted()
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [paging, setPaging] = useState<{ page: number; pageSize: number; total: number }>({
        page: 1,
        pageSize: 6,
        total: 0,
    })

    useEffect(() => {
        if (isMounted) {
            setIsLoggedIn(!!userInfo)
        }
    }, [isMounted, userInfo])

    useEffect(() => {
        async function fetchData() {
            try {
                const query = router.query
                const nights = query.nights ? Number(query.nights) : 1
                const checkInDate = query.checkInDate ? moment(query.checkInDate, YYYYMMDD).toDate() : moment().toDate()
                const seoCode = Array.isArray(query.slug) ? query.slug.join('/') : ''
                setNights(nights)
                setCheckInDate(checkInDate)
                setSeoCode(seoCode)
                setIsLoading(true)
                const [dataTop, dataProvince] = await Promise.all([
                    topHotelsHunt({
                        checkin_date: moment(checkInDate).format(YYYYMMDD),
                        nights,
                        seo_code: seoCode,
                        page_size: paging.pageSize,
                        page: paging.page,
                    }),
                    hotelAvailability({
                        seo_code: seoCode,
                        check_in_date: moment(checkInDate).format(YYYYMMDD),
                        nights: nights,
                        page_size: 4,
                        page: 1,
                        request_source: isMobileScreen() ? 'webmobile' : 'web_frontend',
                    }),
                ])
                setIsLoading(false)
                if (dataTop.status === 'success') {
                    setHotelsTop(dataTop.data)
                    setPaging({
                        ...paging,
                        page: dataTop.page,
                        total: dataTop.total,
                    })
                }
                if (dataProvince.status === 'success') {
                    setProvinceName(
                        dataProvince?.ext_data?.location_info?.city_name ||
                            dataProvince?.ext_data?.location_info?.province_name ||
                            ''
                    )
                    setHotelsProvince(dataProvince.data)
                }
            } catch (e) {
                setIsLoading(false)
                throw e
            }
        }

        fetchData()
    }, [isLoggedIn, paging.pageSize, paging.page, router.pathname, router.query])

    const handleChangePaging = (_page: number) => {
        setPaging({ ...paging, page: _page })
    }

    return (
        <Layout>
            <section className="hotelResult">
                <div className="hotelList__search">
                    <div className="hotelList__search__backdrop" />
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
                <div className="hotelResult__group">
                    {Array.isArray(hotelsTop) && hotelsTop.length > 0 && (
                        <div className="hotelBox">
                            <div className="container">
                                <h2 className="size-24 text-center mb25 bold">
                                    {t(`Giá phòng ưu đãi theo ngày`, { provinceName: provinceName })}
                                    <span className="d-block size-14 regular">
                                        {t('Đặt ngay kẻo lỡ, giá chỉ có tại Vntrip')} !
                                    </span>
                                </h2>

                                {/* LOADING */}
                                {isLoading ? (
                                    <LoadingHotelListHunt />
                                ) : (
                                    <div className="row">
                                        {hotelsTop.map((item: any) => {
                                            return (
                                                <div className={'col-xs-12 col-sm-6 col-lg-4'} key={item.id}>
                                                    <HotelItemHunt
                                                        id={item.id}
                                                        thumbImage={item.thumbImage}
                                                        name={item.nameVi}
                                                        nameEn={item.name}
                                                        starRate={item.starRate}
                                                        reviewCount={item.countReviews}
                                                        reviewPoint={item.reviewPoint}
                                                        fullAddress={item.fullAddress}
                                                        fullAddressEn={item.fullAddressEn}
                                                        location={item.location}
                                                        finalPrice={item.finalPrice}
                                                        promotion={item.savingAmount}
                                                        basePrice={0}
                                                        isLoggedIn={isLoggedIn}
                                                        checkInDate={checkInDate}
                                                        nights={nights}
                                                        huntMode={true}
                                                    />
                                                </div>
                                            )
                                        })}
                                    </div>
                                )}
                                <div className="flexGroup3">
                                    <Pagination
                                        current={paging?.page || 1}
                                        pageSize={paging.pageSize}
                                        total={paging.total}
                                        showSizeChanger={false}
                                        onChange={handleChangePaging}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="hotelBox">
                        <div className="container">
                            <h2 className="size-24 text-center mb25 bold">
                                {t('Khách sạn tại')} {provinceName}
                            </h2>
                            <div className="row">
                                {Array.isArray(hotelsProvince) &&
                                    hotelsProvince.length > 0 &&
                                    hotelsProvince.map((item: any) => {
                                        return (
                                            <div className="col-xs-12 col-sm-6 col-lg-3" key={item.id}>
                                                <HotelItemHunt
                                                    id={item.id}
                                                    thumbImage={item.thumb_image}
                                                    name={item.name_vi}
                                                    nameEn={item.name}
                                                    starRate={item.star_rate}
                                                    reviewCount={item.count_reviews}
                                                    reviewPoint={item.review_point}
                                                    fullAddress={item.full_address}
                                                    fullAddressEn={item.full_address_en}
                                                    location={item.location}
                                                    finalPrice={
                                                        item.show_prices.final_price['incl_vat_fee_price'] / nights
                                                    }
                                                    promotion={item.show_prices.final_price['incl_discount_value']}
                                                    basePrice={item.price / nights}
                                                    isLoggedIn={isLoggedIn}
                                                    checkInDate={checkInDate}
                                                    nights={nights}
                                                    huntMode={false}
                                                />
                                            </div>
                                        )
                                    })}
                            </div>
                            <div className="text-center">
                                <a
                                    className="btn btn_outlineOrange btn_lg"
                                    href={`${PATH_HOTEL_SEARCH}?keyword=${seoCode}&checkInDate=${moment(
                                        checkInDate
                                    ).format(YYYYMMDD)}&nights=${nights}`}
                                >
                                    <span>{t('Xem tất cả')}</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <HuntCommitment />

                <MemberShipBox />

                <AppInfo />
            </section>
        </Layout>
    )
}

// export const getServerSideProps = async ({ req, params, query }: any) => {
//     const UA = req.headers['user-agent']
//     console.log('-----params-----', params)
//     console.log('-----query-----', query)
//     const nights = query.nights ? Number(query.nights) : 1
//     const checkInDateString = query.checkInDate ? moment(query.checkInDate).format(YYYYMMDD) : moment().format(YYYYMMDD)
//     const seoCode = Array.isArray(params.slug) ? params.slug.join('/') : ''
//     const [dataTop, dataProvince] = await Promise.all([
//         topHotelsHunt({
//             checkin_date: checkInDateString,
//             nights,
//             seo_code: seoCode,
//             page_size: 6,
//             page: 1,
//         }),
//         hotelAvailability({
//             seo_code: seoCode,
//             check_in_date: checkInDateString,
//             nights: nights,
//             page_size: 4,
//             page: 1,
//             request_source: 'web_frontend',
//         }),
//     ])
//     return {
//         props: {
//             isMobile: isMobileByUserAgent(UA),
//             nights,
//             checkInDateString,
//             seoCode,
//             dataTop: typeof dataTop !== 'undefined' ? dataTop : null,
//             dataProvince: typeof dataProvince !== 'undefined' ? dataProvince : null,
//         },
//     }
// }

export default HuntHotelBestPrice
