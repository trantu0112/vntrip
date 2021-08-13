import ApiMicroService from './request-micro-service'
import ApiService from './request-service'
import { getHeaders } from '../utils/common'

export const getHotelDetail = async (hotelId: string | number) => {
    try {
        // https://test-micro-services.vntrip.vn/core-hotel-service/hotel/hotel-detail?hotel_ids=6026
        const results = await ApiMicroService.get('/core-hotel-service/hotel/hotel-detail', {
            params: { hotel_ids: hotelId },
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const getHotelDetailInter = async (hotelId: string | number, request_from?: 'WEBMOBILE' | 'WEBSITE') => {
    try {
        //eps-rapid/properties/content/${ean_hotel_id}
        const results = await ApiMicroService.get(`/eps-rapid/properties/content/${hotelId}`, {
            params: { hotel_ids: hotelId, request_from: request_from || 'WEBSITE' },
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const hotel360Images = async (hotelId: string | number) => {
    try {
        const results = await ApiMicroService.get(`/v3/hotel/image/hotel360image/${hotelId}`, {
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const getHotelReview = async (params: any) => {
    try {
        const results = await ApiMicroService.get('/v2-user/review/get-review/', {
            params,
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const getHotelReviewSummary = async (hotelId: string | number) => {
    try {
        const results = await ApiMicroService.get(`/v2-user/review/get-hotel-review-summary/?hotel_id=${hotelId}`, {
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const availableSuggest = async (params: any) => {
    try {
        const results = await ApiService.get('/v2/available_suggest/', {
            params: params,
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

// for  hotel checkout step1
export const getDataCheckout = async (token: string) => {
    try {
        const results = await ApiMicroService.get('/v2-common/checkout-order/' + token, {
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const insertDataCheckout = async (data: any) => {
    try {
        const results = await ApiMicroService.post('/v2-common/checkout-order', data, {
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const updateDataCheckout = async (token: string, data: any) => {
    try {
        const results = await ApiMicroService.post('/v2-common/checkout-order' + token, data, {
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const collectInfo = async (data: any) => {
    try {
        const results = await ApiMicroService.post('/v3-booking/fe/checkout/collect-info', data, {
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const getBookingRequest = async (bookingRequestId: string) => {
    try {
        const results = await ApiMicroService.get('/v3-booking/booking-requests/' + bookingRequestId, {
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const setExportVAT = async (bookingRequestId: string, data: any) => {
    try {
        const results = await ApiMicroService.patch(
            '/v3-booking/booking-requests/' + bookingRequestId + '/require-invoice',
            data,
            {
                headers: getHeaders(),
            }
        )
        return results.data
    } catch (e) {
        throw e
    }
}
