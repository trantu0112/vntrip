import ApiMicroService from './request-micro-service'
import { getHeaders } from '../utils/common'

export const getListAirports = async ({
    keyword,
    page,
    page_size,
}: {
    keyword: string
    page?: number
    page_size?: number
}) => {
    try {
        const results = await ApiMicroService.get('/flight-service/v1/airports', {
            params: { keyword, page, page_size },
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const searchFlight = async (data: any) => {
    try {
        const results = await ApiMicroService.post('/flight-service/v1/search', data, {
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}
//https://test-micro-services.vntrip.vn/flight-inventory/v1/search-day
export const searchDay = async (params: any) => {
    try {
        const results = await ApiMicroService.get('/flight-inventory/v1/search-day', {
            headers: getHeaders(),
            params: params,
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const searchMinFlight = async (data: any) => {
    try {
        const results = await ApiMicroService.post('/flight-service/v1/search-min', data, {
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const getFlightSelected = async (flight_token: string) => {
    try {
        const results = await ApiMicroService.get('/v1-flight/flight-selected/' + flight_token, {
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const insertFlightSelected = async (data: any) => {
    try {
        const results = await ApiMicroService.post('/v1-flight/flight-selected', data, {
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const insertFlightRate = async (data: any) => {
    try {
        const results = await ApiMicroService.post('/flight-service/v1/flight-rates', data, {
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const getFarerules = async (data: any) => {
    try {
        const results = await ApiMicroService.post('/flight-service/v1/farerules', data, {
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const getAirBaggage = async (data: any) => {
    try {
        const results = await ApiMicroService.post('/flight-service/v1/flight-baggage', data, {
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const getReservationStatus = async (data: any) => {
    try {
        const results = await ApiMicroService.post('/flight-service/v1/reservation-status', data, {
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const sendEmailBooked = async (data: any) => {
    try {
        const results = await ApiMicroService.post('/flight-service/v1/rate-confirm', data, {
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const getBookingRequestData = async (params: any) => {
    try {
        const results = await ApiMicroService.get('/v3-booking/fe/checkout/review/', {
            params: params,
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const searchMonth = async (params: any) => {
    try {
        const results = await ApiMicroService.get('/flight-inventory/v1/search-month/', {
            headers: getHeaders(),
            params: params,
        })
        return results.data
    } catch (e) {
        throw e
    }
}
export const sendMailConfirm = async (data: any) => {
    try {
        const results = await ApiMicroService.post('/flight-service/v1/rate-confirm/', data, {
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}
