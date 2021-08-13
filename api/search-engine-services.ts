import ApiMicroService from './request-micro-service'
import { getHeaders } from '../utils/common'

export const suggestionV2 = async (keyword: string) => {
    try {
        const results = await ApiMicroService.get('/search-engine/search/suggestion-v2', {
            params: { keyword },
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

// search-engine/search/b2b/suggestion
export const suggestionV3 = async (keyword: string) => {
    try {
        const results = await ApiMicroService.get('/search-engine/search/b2b/suggestion', {
            params: { keyword },
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const hotelAvailability = async (params: any) => {
    try {
        const results = await ApiMicroService.get('/search-engine/search/vntrip-hotel-availability/', {
            params: params,
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

// GET: search-engine/search/hotel-availability-int
export const hotelAvailabilityInter = async (params: any) => {
    try {
        const results = await ApiMicroService.get('/search-engine/search/hotel-availability-int/', {
            params: params,
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

// GET: /eps-rapid/properties/availability?region_id=553248627840640457&check_in_date=20191201&nights=2&page=1&page_size=20&request_from=WEBSITE
export const hotelAvailabilityInterV2 = async (params: any) => {
    try {
        const results = await ApiMicroService.get('/eps-rapid/properties/availability', {
            params: params,
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const parseSeoCode = async (seo_code: string) => {
    try {
        const results = await ApiMicroService.get('/search-engine/search/parse-seocode', {
            params: { seo_code },
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

//  let api = 'search-engine/search/rooms-availability/',
//  query_string = `?hotels=[${hotelId}]&checkin_date=${checkinDate}&days=${days}&room_count=${roomCount}&person_count=${personCount}&request_from=${requestFrom}`;
export const roomsAvailability = async (params: any) => {
    try {
        const results = await ApiMicroService.get('/search-engine/v3/rooms-availability/', {
            params: params,
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const topHotelsHunt = async (params: any) => {
    try {
        const response = await ApiMicroService.get('/search-engine/v1/top-hotels', {
            params: params,
            headers: getHeaders(),
        })
        return response.data
    } catch (e) {
        throw e
    }
}
