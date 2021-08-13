import ApiMicroService from './request-micro-service'
import { getHeaders } from '../utils/common'
import axios from 'axios'

export const getUserLotteLoanLimit = async () => {
    try {
        const results = await ApiMicroService.get('/core-partner/lotte-finance/userLoanLimit', {
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const getSlotId = async (phone: any) => {
    try {
        const results = await ApiMicroService.get('/core-partner/lotte-finance/userSlotId/' + phone, {
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const updateToken = async (token: any, params: any) => {
    try {
        const results = await ApiMicroService.get('/core-partner/lotte-finance/userUpdateTokenLF/' + token, {
            headers: getHeaders(),
            params,
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const updateBookerData = async (body: any) => {
    try {
        const results = await ApiMicroService.put('/core-partner/lotte-finance/phone-not-member/', body, {
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const getPLToken = async (params: any) => {
    try {
        const results = await ApiMicroService.get('/core-partner/lotte-finance/getPLToken/', {
            headers: getHeaders(),
            params,
        })
        return results.data
    } catch (e) {
        throw e
    }
}
