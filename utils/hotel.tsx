import moment, { Moment } from 'moment'
import { convertUnicode } from './common'
import { PATH_HOTEL_SEARCH, YYYYMMDD } from '../constants/common'
import { i18n } from '../i18n'
import { HOTEL_FILTER_BY_PRICE } from '../constants/hotel'
import { STATIC2_VNTRIP, HOTEL_NO_IMAGE, PATH_HOTEL_DETAIL, STATIC_VNTRIP } from '../constants/common'
import * as queryString from 'query-string'

export const convertRegionType = (regionsType?: string) => {
    let title = 'Khu vực'
    if (regionsType === 'vntrip city') title = 'Quận huyện'
    if (regionsType === 'vntrip province') title = 'Tỉnh thành'
    return title
}

export const getUrlHotelImage = ({
    slug,
    hotelId,
    size,
}: {
    hotelId: string | number
    slug: string
    size?: string
}) => {
    if (slug && hotelId) {
        if (slug.includes('https://') || slug.includes('http://')) {
            return slug
        }
        if (!size || size === 'max' || size === 'MAX') {
            return `${STATIC_VNTRIP}/data-v2/hotels/${hotelId}/img_max/${slug}`
        } else {
            return `${STATIC2_VNTRIP}/${size}/smart/${STATIC_VNTRIP}/data-v2/hotels/${hotelId}/img_max/${slug}`
        }
    } else {
        return HOTEL_NO_IMAGE
    }
}

export const getHotelDetailLink = ({
    hotelId,
    hotelName,
    countryCode,
    checkInDate,
    nights,
    keyword,
    regionId,
    onlyReturnPath,
    huntMode,
}: {
    hotelId: number
    hotelName: string
    countryCode: string
    checkInDate?: Date
    nights?: number
    keyword?: string
    regionId?: number
    onlyReturnPath?: boolean
    huntMode?: boolean
}) => {
    const path = `${PATH_HOTEL_DETAIL}/${(countryCode || 'VN').toLowerCase()}/${convertUnicode(hotelName)}-${hotelId}`
    if (onlyReturnPath) {
        return path
    }
    const queryObj: any = {
        checkInDate: checkInDate ? moment(checkInDate).format(YYYYMMDD) : null,
        nights: nights ? nights : null,
        keyword: keyword ? keyword : null,
        regionId: regionId ? regionId : null,
    }
    if (huntMode) queryObj.hunt_mode = '1'
    const stringify = queryString.stringify(queryObj, { encode: false, skipNull: true }) // build query string
    return `${path}${stringify ? '?' : ''}${stringify}`
}

export const convertBedType = (reformat_bed_types: any[], isDomestic?: boolean) => {
    let bed_list: any[] = []
    let bed: any
    if (Array.isArray(reformat_bed_types) && reformat_bed_types.length > 0) {
        reformat_bed_types.forEach(function (element) {
            let bed_type, bed_group_id
            let bed_data = element.bed_data
            if (!isDomestic) bed_data = element.bed_choice_data
            if (bed_data) {
                if (bed_data.length > 1) {
                    let type1 = ''
                    bed_data.forEach(function (element1: any, index1: number) {
                        if (index1 === 0) {
                            if (isDomestic) type1 += element1.count + ' ' + element1.type
                            else type1 += element1.count + ' ' + element1.description
                        } else {
                            if (isDomestic) type1 += type1 += ' & ' + element1.count + ' ' + element1.type
                            else type1 += type1 += ' & ' + element1.count + ' ' + element1.description
                        }
                    })
                    bed_type = type1
                    bed_group_id = element.group_id
                } else {
                    if (isDomestic) bed_type = bed_data[0].count + ' ' + bed_data[0].type
                    else bed_type = bed_data[0].count + ' ' + bed_data[0].description
                    bed_group_id = element.group_id
                }
                bed = {
                    bed_type: bed_type,
                    bed_group_id: bed_group_id,
                }
            }
            bed_list.push(bed)
        })
    }
    // bed_list.bed_number = Number(bed_list.length);
    return bed_list
}

export const convertMealPlan = (mealPlan: string, t: any) => {
    switch (mealPlan) {
        case 'breakfast':
            return t('hotel:Bao gồm ăn sáng')
        case 'half-board':
            return t('hotel:Bao gồm ăn sáng và 1 bữa chính (trưa hoặc tối)')
        case 'full-board':
            return t('hotel:Bao gồm ăn sáng, ăn trưa và ăn tối')
        case 'all-inclusive':
            return t('hotel:Bao gồm ăn sáng, ăn trưa, ăn tối và các bữa phụ nếu có')
        case 'no_meal':
            return t('hotel:Không bao gồm')
        default:
            return t('hotel:Không bao gồm')
    }
}

export const convertReviewToText = (key: string) => {
    switch (key) {
        case 'very_good':
            return 'Rất tốt'
        case 'good':
            return 'Tốt'
        case 'normal':
            return 'Hài lòng'
        case 'bad':
            return 'Kém'
        case 'very_bad':
            return 'Rất kém'
        case 'total':
            return 'Tổng'
        default:
            return ''
    }
}

export const convertReviewRatingToText = (key: string) => {
    switch (key) {
        case 'cleanliness':
            return 'Sạch sẽ'
        case 'price':
            return 'Giá cả'
        case 'comfort':
            return 'Thoải mái'
        case 'facilities':
            return 'Tiện nghi'
        case 'location':
            return 'Vị trí'
        case 'staffs':
            return 'Nhân viên'
        case 'average':
            return 'Trung bình'
        default:
            return ''
    }
}

export const convertReviewPointToText = (point: number, isVietnamese = true) => {
    let reviewPoint = point % 1 === 0 ? point : point.toFixed(1)
    let text = ''
    let text_en = ''
    if (reviewPoint >= 9.5) {
        text = 'Xuất sắc'
        text_en = 'Perfect'
    } else if (9 <= reviewPoint && reviewPoint < 9.5) {
        text = 'Tuyệt hảo'
        text_en = 'Perfect'
    } else if (8.6 <= reviewPoint && reviewPoint < 9) {
        text = 'Tuyệt vời'
        text_en = 'Good'
    } else if (8 <= reviewPoint && reviewPoint < 8.6) {
        text = 'Rất tốt'
        text_en = 'Good'
    } else if (7 <= reviewPoint && reviewPoint < 8) {
        text = 'Tốt'
        text_en = 'Good'
    } else if (4 <= reviewPoint && reviewPoint < 7) {
        text = 'Điểm đánh giá'
        text_en = 'Review score'
    }
    return isVietnamese ? text : text_en
}

export const converVatAndFee = (provider: string, included_VAT: number, included_service_fee: number, vat: boolean) => {
    if (provider?.toUpperCase() === 'EXPEDIA') {
        return vat
            ? i18n.t('hotel:TXT_EAN_RATE_INCLUDE_TAX_INCLUDE_SERVICE_CHARGE')
            : i18n.t('hotel:TXT_EAN_RATE_EXCLUDE_TAX_EXCLUDE_SERVICE_CHARGE')
    } else {
        // VNTRIP and BOOKING
        if (included_VAT && included_service_fee) {
            return i18n.t('hotel:Đã bao gồm VAT và phí dịch vụ khách sạn')
        } else if (included_VAT && !included_service_fee) {
            return i18n.t('hotel:TXT_VNT_RATE_INCLUDE_TAX_EXCLUDE_SERVICE_CHARGE')
        } else if (!included_VAT && included_service_fee) {
            return i18n.t('hotel:TXT_VNT_RATE_EXCLUDE_TAX_INCLUDE_SERVICE_CHARGE')
        } else if (!included_VAT && !included_service_fee) {
            return i18n.t('hotel:TXT_VNT_RATE_EXCLUDE_TAX_EXCLUDE_SERVICE_CHARGE')
        }
    }
}

export const setShowFinalPriceHotelToLS = (isShowFinal: boolean) => {
    if (typeof window !== 'undefined') {
        return window.localStorage.setItem('isShowFinalPriceHotel', JSON.stringify(isShowFinal))
    }
    return null
}

export const getShowFinalPriceHotelFromLS = () => {
    if (typeof window !== 'undefined') {
        const data = window.localStorage.getItem('isShowFinalPriceHotel')
        return data ? JSON.parse(data) : false
    }
    return false
}

export const getMinMaxFilterPriceInter = (queryFilterPrices: string) => {
    const array_query = queryFilterPrices ? queryFilterPrices.split(',') : []
    const array_min = array_query.map((key) => {
        const findItem = HOTEL_FILTER_BY_PRICE.find((item) => item.key === key)
        return findItem ? findItem.min : Number.MAX_SAFE_INTEGER
    })
    const array_max = array_query.map((key) => {
        const findItem = HOTEL_FILTER_BY_PRICE.find((item) => item.key === key)
        return findItem ? findItem.max : Number.MIN_SAFE_INTEGER
    })
    const min_of_min = Math.min.apply(null, array_min)
    const max_of_max = Math.max.apply(null, array_max)
    return {
        filter_min_price: min_of_min,
        filter_max_price: max_of_max,
    }
}

export const getMinMaxFilterStarInter = (queryFilterStar: string) => {
    const array_query = queryFilterStar ? queryFilterStar.split(',').map((item) => Number(item)) : []
    return {
        filter_min_star: Math.min.apply(null, array_query),
        filter_max_star: Math.max.apply(null, array_query),
    }
}

export const genLinkHotelList = (query: any) => {
    const new_query = { ...query }
    if (new_query.hasOwnProperty('slug') && Array.isArray(query.slug)) {
        new_query.keyword = query.slug.join('/')
        delete new_query.slug
    }
    const stringify = queryString.stringify(new_query, { encode: false, skipNull: true }) // build query string
    return `${PATH_HOTEL_SEARCH}${stringify ? '?' : ''}${stringify}`
}

/**
 * format SEOMeta for hotel list
 * @param keyword
 * @param seoCode
 */
export const formatSeoMetaHotelList = (keyword: string, seoCode: any, slug: any) => {
    // console.log('=== locationInfo: ', locationInfo)
    // console.log('=== seoCode: ', seoCode)

    // Schema for hotel list
    let itemListElement = [
        {
            '@type': 'ListItem',
            position: '1',
            name: 'Trang chủ',
            item: process.env.NEXT_PUBLIC_ROOT_DOMAIN,
        },
        {
            '@type': 'ListItem',
            position: '2',
            name: 'Khách sạn',
            item: `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/khach-san`,
        },
        {
            '@type': 'ListItem',
            position: '3',
            name: seoCode.province_name,
            item: `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/khach-san/${slug[0]}`,
        },
    ]

    if (slug?.length > 1) {
        if (seoCode.area_id) {
            itemListElement.push({
                '@type': 'ListItem',
                position: '4',
                name: seoCode.area_name,
                item: `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/khach-san/${slug[0]}/${slug[1]}`,
            })
        }
        if (seoCode.city_id) {
            itemListElement.push({
                '@type': 'ListItem',
                position: '4',
                name: seoCode.city_name,
                item: `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/khach-san/${slug[0]}/${slug[1]}`,
            })
        }
    }

    const schemaData = [
        {
            '@context': 'https://schema.org/',
            '@type': 'BreadcrumbList',
            itemListElement: itemListElement,
        },
    ]

    let seoTitle = ''
    let seoDescription = ''
    let seoKeyword = ''

    // Kiểm tra nếu có filter star
    //const regex_filter_star = /\b(\w*sao\w*)\b/g
    if (seoCode?.star_rating) {
        if (seoCode.area_id) {
            // có star + khu vực (ex url: /ha-noi/pho-co-ha-noi/5-sao)
            seoTitle = `Khách sạn ${seoCode.star_rating} Sao gần ${seoCode.full_addr} giá rẻ, ưu đãi tới 75% - Vntrip.vn`
            seoDescription = `Danh sách khách sạn ${seoCode.star_rating} Sao gần ${seoCode.full_addr} tốt nhất. Đặt phòng trực tuyến tiết kiệm hơn 75% kèm nhiều ưu đãi hấp dẫn chỉ có tại Vntrip.vn`
        } else if (seoCode.city_id) {
            // có star + quận huyện (ex url: /ha-noi/pho-co-ha-noi/5-sao)
            seoTitle = `Khách sạn ${seoCode.star_rating} Sao ${seoCode.full_addr} giá rẻ -  Vntrip.vn`
            seoDescription = `Danh sách khách sạn ${seoCode.star_rating} Sao ${seoCode.full_addr} tốt nhất. Đặt phòng trực tuyến tiết kiệm hơn 80% kèm nhiều ưu đãi hấp dẫn chỉ có tại Vntrip.vn`
        } else {
            // có star + không có khu vực & quận huyện (ex url: /ha-noi/5-sao)
            seoTitle = `Khách sạn ${seoCode.star_rating} Sao ở ${seoCode.full_addr} giá rẻ, ưu đãi tới 75% - Vntrip.vn`
            seoDescription = `Xem ngay các khách sạn ${seoCode.star_rating} Sao tại ${seoCode.full_addr} đang có giá rẻ, đặt phòng giảm giá tới 75%, thanh toán đơn giản, linh hoạt, hỗ trợ khách hàng 24/7.`
        }
    } else {
        // không có filter star
        if (seoCode.area_id) {
            // có filter city || area (ex url: /ha-noi/pho-co-ha-noi)
            // dùng description ngắn hơn vì keyword dài hơn, description bị giới hạn ký tự
            seoTitle = `Khách sạn gần ${seoCode.full_addr} giá rẻ, ưu đãi tới 75% - Vntrip.vn`
            seoDescription = `Tìm kiếm các khách sạn ở ${seoCode.full_addr} đang có giá tốt, đặt phòng giảm giá tới 75%, thanh toán đơn giản, linh hoạt, hỗ trợ khách hàng 24/7 chỉ có tại Vntrip.`
            seoKeyword = `khách sạn gần ${seoCode.full_addr}, khách sạn gần ${seoCode.full_addr} giá rẻ, khách sạn tốt nhất gần ${seoCode.full_addr}, đặt phòng khách sạn gần ${seoCode.full_addr}`
        } else {
            // không có filter (ex url: /ha-noi)
            seoTitle = `Khách sạn ở ${seoCode.full_addr} giá rẻ, ưu đãi tới 75% - Vntrip.vn`
            seoDescription = `Xem ngay các khách sạn ở ${seoCode.full_addr} đang có giá tốt, đặt phòng giảm giá tới 75%, thanh toán đơn giản, linh hoạt, hỗ trợ khách hàng 24/7 chỉ có tại Vntrip.`
            seoKeyword = `khách sạn ${seoCode.full_addr}, khách sạn ${seoCode.full_addr} giá rẻ, đặt phòng khách sạn ${seoCode.full_addr}, khách sạn ở ${seoCode.full_addr}, khách sạn tại ${seoCode.full_addr}`
        }
    }

    return {
        schema_data: schemaData,
        seo_title: seoTitle,
        seo_description: seoDescription,
        seo_keyword: seoKeyword,
        seo_code: seoCode,
    }
}

export const handleCalendarChange = (setCheckInDate: any, setNights: any) => (
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
        const diffDay = dates[1].diff(dates[0], 'days')
        if (diffDay > 30) {
            if (info.range === 'start') {
                setCheckInDate(moment(dates[0]).format(YYYYMMDD))
                setNights(2) // set nights = current nights
            } else {
                // info.range === 'end'
                setCheckInDate(moment(dates[1]).add(-2, 'days').format(YYYYMMDD))
                setNights(2) // set nights = current nights
            }
        } else {
            setCheckInDate(moment(dates[0]).format(YYYYMMDD))
            setNights(Math.abs(dates[1].diff(dates[0], 'days')))
        }
    }
}
