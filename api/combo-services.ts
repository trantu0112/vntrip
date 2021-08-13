import ApiMicroService from './request-micro-service'

export const getListComBo = async (params: any) => {
    try {
        const results = await ApiMicroService.get('/v2-hotel/deals', {
            params,
        })
        return results.data
    } catch (e) {
        throw e
    }
}

export const getListComboVin = async () => {
    try {
        const results = await ApiMicroService.get(`/v2-hotel/deals?deal_type=dynamic-combo&combo_type=combo-vin`)
        return results.data
    } catch (e) {
        throw e
    }
}
