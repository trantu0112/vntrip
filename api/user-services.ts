import ApiMicroService from './request-micro-service'
import { getHeaders } from '../utils/common'
import { getLoyaltyDiscountByOrderId, getLoyaltyInfoByOrderId, getLoyaltyRedemptionByOrderId } from './order-services'

export const getUserProfile = async () => {
    try {
        const results = await ApiMicroService.get('/core-user-service/person/profile', {
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const getIdentifiers = async () => {
    const results = await ApiMicroService.get('/core-user-service/user/identifiers', {
        headers: getHeaders(),
    })
    return results.data
}

export const verificationRequestEmail = async (data: { feature: string; email: string }) => {
    const results = await ApiMicroService.post('/core-user-service/verification/request/email', data, {
        headers: getHeaders(),
    })
    return results.data
}

export const verificationRequestPhoneNotMember = async (data: { feature: string; phone: string }) => {
    const results = await ApiMicroService.post('/core-user-service/verification/request/phone-not-member', data, {
        headers: getHeaders(),
    })
    return results.data
}

export const verificationRequestPhone = async (data: { feature: string; phone: string }) => {
    const results = await ApiMicroService.post('/core-user-service/verification/request/phone', data, {
        headers: getHeaders(),
    })
    return results.data
}

export const confirmVerification = async (data: { verificationId: number; feature: string; code: string }) => {
    const results = await ApiMicroService.post('/core-user-service/verification/confirm', data, {
        headers: getHeaders(),
    })
    return results.data
}

export const verifyPhoneNotMember = async (data: { verificationId: number; phone: string }) => {
    const results = await ApiMicroService.post('/core-user-service/user/verify/phone-not-member', data, {
        headers: getHeaders(),
    })
    return results.data
}

export const verifyPhone = async (data: { verificationId: number; phone: string }) => {
    const results = await ApiMicroService.post('/core-user-service/user/verify/phone', data, {
        headers: getHeaders(),
    })
    return results.data
}

export const getListCountryCode = async () => {
    try {
        const results = await ApiMicroService.get('/v2-common/countries-phone-code')
        return results.data
    } catch (e) {
        throw e
    }
}

export const getLotusUser = async (user_id: number) => {
    try {
        const results = await ApiMicroService.get(`/marketing/lotus_miles/user/${user_id}`)
        return results.data
    } catch (e) {
        throw e
    }
}

export const getLoyaltyProgram = async () => {
    try {
        const results = await ApiMicroService.get('/v2-user/loyalties/active', {
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const getMembershipInfo = async (program_id: string, accessToken?: string) => {
    try {
        const results = await ApiMicroService.get('/v2-user/loyalties/membership-account/detail', {
            headers: accessToken ? { ...getHeaders(), Authorization: `Bearer ${accessToken}` } : getHeaders(),
            params: { program_id: program_id },
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const getListCoupon = async (accessToken?: string) => {
    try {
        const results = await ApiMicroService.get('/campaign/coupon-cashback/codes', {
            headers: accessToken ? { ...getHeaders(), Authorization: `Bearer ${accessToken}` } : getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const getListVoucher = async () => {
    try {
        const results = await ApiMicroService.get('/campaign/coupons/my-codes', {
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const getVoucherDetailByCode = async (code: string) => {
    try {
        const results = await ApiMicroService.get(`/campaign/coupons/my-codes/${code}?type=voucher`, {
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const joinLoyaltyProgram = async (program_id: string, accessToken?: string) => {
    try {
        const results = await ApiMicroService.get(`/v2-user/loyalties/join-program/${program_id}`, {
            headers: accessToken ? { ...getHeaders(), Authorization: `Bearer ${accessToken}` } : getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const activeMembershipCard = async (member_id: string, card_number: string) => {
    try {
        const results = await ApiMicroService.patch(
            '/v2-user/loyalties/membership-cards/active',
            {
                member_id: member_id,
                card_number: card_number,
            },
            {
                headers: getHeaders(),
            }
        )
        return results.data
    } catch (e) {
        throw e
    }
}

export const updateProfile = async (data: {
    gender: number
    firstName: string
    lastName: string
    birthday: string
}) => {
    try {
        const results = await ApiMicroService.post('/core-user-service/user/profile', data, {
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

// v2-user/loyalties/membership-account/activity/
export const membershipActivity = async () => {
    try {
        const results = await ApiMicroService.get('/v2-user/loyalties/membership-account/activity', {
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const applyRedemption = async (bookingRequestId: string, expect_redeem_point: number) => {
    try {
        const results = await ApiMicroService.patch(
            '/v3-booking/booking-requests/' + bookingRequestId + '/apply-redeem',
            { expect_redeem_point },
            {
                headers: getHeaders(),
            }
        )
        return results.data
    } catch (e) {
        throw e
    }
}

export const removeRedemption = async (bookingRequestId: string) => {
    try {
        const results = await ApiMicroService.delete(
            '/v3-booking/booking-requests/' + bookingRequestId + '/apply-redeem',
            {
                headers: getHeaders(),
            }
        )
        return results.data
    } catch (e) {
        throw e
    }
}

export const deletePoints = async (bookingRequestId: string, resetType: string) => {
    try {
        const results = await ApiMicroService.put(
            '/v2-user/loyalties/reset-order',
            { booking_request_id: bookingRequestId, transaction_type: resetType },
            {
                headers: getHeaders(),
            }
        )
        return results.data
    } catch (e) {
        throw e
    }
}

export const listMyReview = async (params: any) => {
    try {
        const results = await ApiMicroService.get('/v2-user/review/get-review-by-user', {
            params: params,
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}
export const countListMyReview = async (params: any) => {
    try {
        const results = await ApiMicroService.get('/v2-user/review/get-count-review-by-user', {
            params: params,
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}
export const checkReviewWoLogin = async (params: any) => {
    try {
        const results = await ApiMicroService.get('/v2-hotel/reviews/wo-login', {
            params: params,
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}
export const submitReviewWoLogin = async (token: string | string[] | undefined, data: any) => {
    try {
        const results = await ApiMicroService.post('/order-hotel/reviews/' + token, data)
        return results.data
    } catch (e) {
        throw e
    }
}
export const sendVerificationVoucher = async (data: any) => {
    try {
        const results = await ApiMicroService.post('/campaign/vouchers/send-verification-code/', data, {
            headers: getHeaders(),
        })
        return results.data
    } catch (e) {
        throw e
    }
}
export const fetchDataLoyal = async (orderId: number) => {
    try {
        const res = await getLoyaltyInfoByOrderId(orderId)
        if (res.status === 'success') {
            return res.data
        }
    } catch (e) {
        throw e
    }
}
export const fetchLoyaltyRedemptionByOrderId = async (orderId: number) => {
    try {
        const res = await getLoyaltyRedemptionByOrderId(orderId)
        if (res && res.status === 'success') {
            return res.data
        }
    } catch (e) {
        throw e
    }
}

export const fetchLoyaltyDiscountByOrderId = async (orderId: number) => {
    try {
        const res = await getLoyaltyDiscountByOrderId(orderId)
        if (res && res.status === 'success') {
            return res.data
        }
    } catch (e) {
        throw e
    }
}
