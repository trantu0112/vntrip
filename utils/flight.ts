import moment from 'moment'
import { AIR_PROVIDER, AIRPORT } from '../constants/airport-config'

export const showLogoAirProvider = (provider: string) => {
    if (provider) {
        if (provider === 'VN') {
            return 'https://statics.vntrip.vn/images/icons/vietnamairline.png'
        } else if (provider === 'VJ') {
            return 'https://statics.vntrip.vn/images/icons/vietjet-air.png'
        } else if (['JQ', 'BL'].includes(provider)) {
            return 'https://statics.vntrip.vn/images/icons/jetstar.png'
        } else if (provider === 'QH') {
            return 'https://statics.vntrip.vn/images/icons/bambooairways.png'
        } else {
            return 'https://statics.vntrip.vn/logo/airline/' + provider.toLocaleLowerCase() + '.gif'
        }
    }
}

export const convertMinsToHrsMins = (mins: number) => {
    const hour: number = Math.floor(mins / 60)
    const minute: number = mins % 60
    const str_hour: string = hour < 10 ? '0' + hour : String(hour)
    const str_minute: string = minute < 10 ? '0' + minute : String(minute)
    return `${str_hour}h:${str_minute}m`
}

export const convertProviderCodeToName = (code: string) => {
    // @ts-ignore
    const obj = AIR_PROVIDER[code]
    if (obj) {
        return obj['name']
    }
    return ''
}

export const convertAirportCodeToName = (code: string, lang = 'vi') => {
    // @ts-ignore
    const obj = AIRPORT[code]
    if (obj) {
        return obj[lang === 'en' ? 'airportNameEn' : 'airportNameVi']
    }
    return ''
}

export const convertAirportCodeToCityName = (code: string, lang = 'vi') => {
    // @ts-ignore
    const obj = AIRPORT[code]
    if (obj) {
        return obj[lang === 'en' ? 'cityNameEn' : 'cityNameVi']
    }
    return ''
}

export const airportIsDomestic = (code: string) => {
    // @ts-ignore
    const obj = AIRPORT[code]
    return obj && obj['countryCode'] === 'VN'
}

export const parseQueryFlight = (query: any) => {
    const { ap, dt, ps, leg }: any = query
    if (!ap || !dt || !ps) {
        throw new Error('missing params')
    }
    const ap_split = ap.split('.')
    const dt_split = dt.split('.')
    const ps_split = ps.split('.')
    const listFlight = [
        {
            startPoint: ap_split[0],
            endPoint: ap_split[1],
            departDate: dt_split[0],
        },
    ]
    if (leg === '1') {
        listFlight.push({
            startPoint: ap_split[1],
            endPoint: ap_split[0],
            departDate: dt_split[1],
        })
    }
    const isDomestic: boolean = airportIsDomestic(ap_split[0]) && airportIsDomestic(ap_split[1])
    return {
        isDomestic,
        listFlight,
        adultCount: Number(ps_split[0]),
        childCount: Number(ps_split[1]),
        infantCount: Number(ps_split[2]),
        originCode: ap_split[0],
        destinCode: ap_split[1],
        departDate: moment(dt_split[0], 'YYYYMMDD').toDate(),
        returnDate: moment(dt_split[1], 'YYYYMMDD').toDate(),
        leg: Number(leg) || 0,
    }
}

// keys: Array ['before_8h', 'from_8h_to_12h', 'from_12h_to_18h' , 'after_18h']
export const compareTimeFilter = (date: Date, keys: string[]) => {
    const _08h = moment(date)
    _08h.set({ hour: 8, minute: 0, second: 0, millisecond: 0 })
    const _12h = moment(date)
    _12h.set({ hour: 12, minute: 0, second: 0, millisecond: 0 })
    const _18h = moment(date)
    _18h.set({ hour: 18, minute: 0, second: 0, millisecond: 0 })

    const is_valid_before_8h = moment(date).isBefore(_08h)
    const is_valid_from_8h_to_12h = moment(date).isSameOrAfter(_08h) && moment(date).isBefore(_12h)
    const is_valid_from_12h_to_18h = moment(date).isSameOrAfter(_12h) && moment(date).isBefore(_18h)
    const is_valid_after_18h = moment(date).isSameOrAfter(_18h)
    return (
        (keys.includes('before_8h') && is_valid_before_8h) ||
        (keys.includes('from_8h_to_12h') && is_valid_from_8h_to_12h) ||
        (keys.includes('from_12h_to_18h') && is_valid_from_12h_to_18h) ||
        (keys.includes('after_18h') && is_valid_after_18h)
    )
}

// key: String (time_asc, time_desc, price_asc)
export const sortFlightByKey = (
    flights: any[],
    key:
        | 'time_asc'
        | 'time_desc'
        | 'price_asc'
        | 'price_asc_taxFee_all'
        | 'price_asc_noTaxFee_all'
        | 'price_asc_noTaxFee_one'
        | 'price_asc_taxFee_one'
) => {
    if (Array.isArray(flights)) {
        switch (key) {
            case 'time_asc':
                return [...flights].sort((item1, item2) => {
                    if (moment(item1.listFlight[0]?.startDate).isAfter(moment(item2.listFlight[0]?.startDate))) {
                        return 1
                    } else if (
                        moment(item1.listFlight[0]?.startDate).isBefore(moment(item2.listFlight[0]?.startDate))
                    ) {
                        return -1
                    } else {
                        return 0
                    }
                })
            case 'time_desc':
                return [...flights].sort((item1, item2) => {
                    if (moment(item1.listFlight[0]?.startDate).isAfter(moment(item2.listFlight[0]?.startDate))) {
                        return -1
                    } else if (
                        moment(item1.listFlight[0]?.startDate).isBefore(moment(item2.listFlight[0]?.startDate))
                    ) {
                        return 1
                    } else {
                        return 0
                    }
                })
            case 'price_asc':
            case 'price_asc_taxFee_all':
                return [...flights].sort((item1, item2) => {
                    if (item1['totalPrice'] < item2['totalPrice']) {
                        return -1
                    } else if (item1['totalPrice'] > item2['totalPrice']) {
                        return 1
                    } else {
                        return 0
                    }
                })
            case 'price_asc_noTaxFee_all':
                return [...flights].sort((item1, item2) => {
                    let priceItem1 =
                        item1['adt'] * item1['fareAdt'] +
                        item1['chd'] * item1['fareChd'] +
                        item1['inf'] * item1['fareInf']
                    let priceItem2 =
                        item2['adt'] * item2['fareAdt'] +
                        item2['chd'] * item2['fareChd'] +
                        item2['inf'] * item2['fareInf']
                    if (priceItem1 < priceItem2) {
                        return -1
                    } else if (priceItem1 > priceItem2) {
                        return 1
                    } else {
                        return 0
                    }
                })
            case 'price_asc_noTaxFee_one':
                return [...flights].sort((item1, item2) => {
                    let priceItem1 = item1['adt'] * item1['fareAdt']
                    let priceItem2 = item2['adt'] * item2['fareAdt']
                    if (priceItem1 < priceItem2) {
                        return -1
                    } else if (priceItem1 > priceItem2) {
                        return 1
                    } else {
                        return 0
                    }
                })
            case 'price_asc_taxFee_one':
                return [...flights].sort((item1, item2) => {
                    let priceItem1 =
                        item1['adt'] * (item1['fareAdt'] + item1['taxAdt'] + item1['feeAdt'] + item1['serviceFeeAdt'])
                    let priceItem2 =
                        item2['adt'] * (item2['fareAdt'] + item2['taxAdt'] + item2['feeAdt'] + item2['serviceFeeAdt'])
                    if (priceItem1 < priceItem2) {
                        return -1
                    } else if (priceItem1 > priceItem2) {
                        return 1
                    } else {
                        return 0
                    }
                })
            default:
                return [...flights]
        }
    }
    return []
}
