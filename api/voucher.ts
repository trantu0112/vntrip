import ApiMicroService from './request-micro-service'

// ** set data redis cho voucher **
export const setRedisVoucher = async (params: any) => {
    try {
        const results = await ApiMicroService.post('/v2-hotel/redis/combo', params)
        return results.data
    } catch (e) {
        throw e
    }
}

// ** get data redis cho voucher **
export const getRedisVoucher = async (token: string) => {
    try {
        const results = await ApiMicroService.get('/v2-hotel/redis/combo/' + token)
        return results.data
    } catch (e) {
        throw e
    }
}
