import ApiMicroService from './request-micro-service'
import { getHeaders } from '../utils/common'

export const addOrder = async (bookingRequestId: string, data = {}) => {
    try {
        const results = await ApiMicroService.post('/order-hotel/order/booking-request-fe/' + bookingRequestId, data, {
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const transactionConfirmation = async (transactionId: string) => {
    try {
        const results = await ApiMicroService.get('/payment-service/payment/v2/' + transactionId, {
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const getOrderByTransactionId = async (transactionId: string) => {
    try {
        const results = await ApiMicroService.get('order-hotel/order/' + transactionId + '/by-transaction', {
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const getOrderByTokenPaymentLink = async (token: string) => {
    try {
        const results = await ApiMicroService.get('order-hotel/order/create-payment-link/' + token, {
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const earnPointLoyalty = async (data: any) => {
    try {
        const results = await ApiMicroService.post('/v2-user/loyalties/earn-point', data, {
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const applyCoupon = async (bookingRequestId: string, data: object) => {
    try {
        const results = await ApiMicroService.patch(
            `/v3-booking/booking-requests/${bookingRequestId}/apply-coupon/`,
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

export const getOrdersByUser = async (params: any) => {
    try {
        const results = await ApiMicroService.get('/order-hotel/order/by-user/', {
            params: params,
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const getOrderDetailByUser = async (orderId: number) => {
    try {
        const results = await ApiMicroService.get(`/order-hotel/order/${orderId}/by-user/`, {
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const getLoyaltyRedemptionByOrderId = async (orderId: number) => {
    try {
        const results = await ApiMicroService.post(
            `/v2-user/loyalty-redeem-discount/${orderId}`,
            {},
            {
                headers: getHeaders(),
            }
        )
        return results.data
    } catch (e) {
        throw e
    }
}

export const getLoyaltyDiscountByOrderId = async (orderId: number) => {
    try {
        const results = await ApiMicroService.get(`v2-user/loyalty-benefit-transaction/${orderId}`, {
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const getLoyaltyInfoByOrderId = async (orderId: number) => {
    try {
        const results = await ApiMicroService.get(`/v2-user/loyalties/transaction/${orderId}`, {
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const getBookingRequests = async (params: any) => {
    try {
        const results = await ApiMicroService.get('/v3-booking/booking-requests/', {
            params: params,
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const getReasonCancelBooking = async () => {
    try {
        const results = await ApiMicroService.get('/booking/reasons/frontend/', {
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const cancelTicket = async (data: any) => {
    try {
        const results = await ApiMicroService.post('/booking/cancel-ticket/v3/process-order-cancel/', data, {
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}
export const createBookingRequestBlank = async (data: any) => {
    try {
        const results = await ApiMicroService.post('/v3-booking/booking-requests/request-price/', data, {
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const cancelTicketByToken = async (data: any) => {
    try {
        const results = await ApiMicroService.post('/booking/cancel-ticket/v3/process-order-cancel-by-token/', data, {
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const getOrderDetailByPinCode = async (pinCode: any, orderCode: any, source: any) => {
    try {
        const results = await ApiMicroService.get(
            `/order-hotel/get-order-by/?pin_code=${pinCode}&order_code=${orderCode}&source=${source}`,
            {
                headers: getHeaders(),
            }
        )
        return results.data
    } catch (e) {
        throw e
    }
}
