import ApiMicroService from './request-micro-service'
import ApiService from './request-service'
import axios from 'axios'
import { getHeaders, saveExChangeRate, getExChangeRate } from '../utils/common'
import { RequestInvoice } from '../constants/interface'
import moment from 'moment'
import { YYYYMMDD } from '../constants/common'

export const getBanners = async (params: any) => {
    try {
        const results = await ApiMicroService.get('/v2-common/banners/', {
            params: params,
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const getPaymentMethod = async (params: any) => {
    try {
        const results = await ApiMicroService.get('/payment-service/fe/payment-method', {
            params: params,
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const updatePaymentMethod = async (data: any) => {
    try {
        const results = await ApiMicroService.patch(
            `/v3-booking/booking-requests/${data.booking_request_id}/choose-payment-method`,
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

export const getBankAccount = async () => {
    try {
        const results = await ApiMicroService.get('/v2-common/bank-account', {
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const getExchangeRatesAndStore = async () => {
    try {
        const yesterday = new Date().setDate(new Date().getDate() - 1)
        const exchange_rate = getExChangeRate()
        if (exchange_rate === null || (exchange_rate && exchange_rate.updated_at < yesterday)) {
            const results = await ApiMicroService.get('/common/exchange-rates/transfer/usd', {
                headers: getHeaders(),
            })
            if (results.data.status === 'success') {
                const data = results.data.data
                saveExChangeRate({
                    ...data,
                    updated_at: new Date().getTime(),
                })
            }
        }
    } catch (e) {
        throw e
    }
}

export const getDealCategoryByType = async (type: string) => {
    try {
        const results = await ApiMicroService.get('/v2-hotel/deal/category', {
            headers: getHeaders(),
            params: {
                type,
            },
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const getDeals = async (params: any) => {
    try {
        const results = await ApiMicroService.get('/v2-hotel/deals/', {
            headers: getHeaders(),
            params,
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const getDealById = async (id: number) => {
    try {
        const results = await ApiMicroService.get(`/v2-hotel/deal-detail/fe/${id}`, {
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const updateDeal = async (data: any, id: number) => {
    try {
        const results = await ApiMicroService.put('/v2-hotel/deal/' + id, data, {
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const buyDeal = async (data: any) => {
    try {
        const results = await ApiMicroService.post('/v3-booking/fe/deal', data, {
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const getFlightPromotion = async (limit?: number) => {
    try {
        let url = 'https://www.vntrip.vn/cam-nang/wp-json/flight/v1/promotions'
        if (limit) {
            url += '?limit=' + limit
        }
        const results = await fetch(url)
        return results.json()
    } catch (e) {
        throw e
    }
}

export const getFlightExperience = async (limit?: number) => {
    try {
        let url = 'https://www.vntrip.vn/cam-nang/wp-json/flight/v1/posts'
        if (limit) {
            url += '?limit=' + limit
        }
        const results = await fetch(url)
        return results.json()
    } catch (e) {
        throw e
    }
}

export const articles = async () => {
    try {
        const results = await ApiMicroService.get('/common/articles/', {
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const getCompanyByTaxCode = async (taxCode: string) => {
    try {
        const results = await axios.get(`https://app.meinvoice.vn/other/getcompanyinfobytaxcode?taxcode=${taxCode}`)
        return results.data
    } catch (e) {
        throw e
    }
}

export const getInvoiceByOrderToken = async (order_token: string) => {
    try {
        const results = await ApiMicroService.get(`/core-accounting/invoice/${order_token}`, {
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const sendRequestInvoice = async (data: RequestInvoice) => {
    try {
        const results = await ApiMicroService.put('/core-accounting/invoice', data, {
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const getBanks = async () => {
    try {
        const results = await ApiMicroService.get('/common/hotel/banks/', {
            headers: getHeaders(),
        })
        return results.data
    } catch (err) {
        throw err
    }
}

export const getBranchsByBankId = async (bankId: number) => {
    try {
        const results = await ApiMicroService.get(`/booking/refund/get-branch-by-bank-id/${bankId}`, {
            headers: getHeaders(),
        })
        return results.data
    } catch (err) {
        throw err
    }
}
export const sendInternalEmail = async (data: any) => {
    try {
        const results = await ApiMicroService.post('/common/email/send-internal/', data, {
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}
export const addSubcriber = async (data: any) => {
    try {
        const results = await ApiService.post('/users/add-subscriber/', data, {
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const getAtadiProdash = async () => {
    try {
        const startDate = moment().startOf('month').format(YYYYMMDD)
        const endDate = moment().add(9, 'month').endOf('month').format(YYYYMMDD)
        const response = await axios.post('https://www.atadi.vn/addon/prodash/getlist', {
            startDate: startDate, //'20201023', ng??y ?????u th??ng hi???n t???i
            endDate: endDate, //'20210731', ng??y cu???i thang x. x = th??ng hi???n t???i + 9
            minPrice: 0, // kh??ng thay ?????i
            maxPrice: 900000, // kh??ng thay ?????i
            providers: ['VJ', 'BL', 'VN'], // khi n??o b??o th??m QH th?? ?????i th??nh ['VJ', 'BL', 'VN', 'QH']
            routes: ['SGNHAN', 'HANSGN', 'HANPQC', 'SGNPQC', 'HANDLI'], // thay ?????i t??y ??, t???t c??? c??c ch???ng atadi m??? b??n, t???i ??a 10 ch???ng
            type: 'month', // kh??ng thay ?????i
        })
        return response.data
    } catch (e) {
        throw e
    }
}
