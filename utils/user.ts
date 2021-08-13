import Cookies from 'js-cookie'

export const splitFirstAndLastName = (full_name: string) => {
    let arr_name = full_name.trim().split(' ')
    const last_name = arr_name[0] || ''
    const first_name = arr_name.slice(1).join(' ') || ''
    return { first_name, last_name }
}

export const convertFullNameToFirstLastName = (full_name: string, type: 'LAST' | 'FIRST') => {
    let arr_name = full_name.split(' ')
    if (arr_name.length > 1) {
        if (type === 'LAST') return arr_name[0]
        else if (type === 'FIRST') {
            return arr_name.slice(1).join(' ')
        }
    }
    return ''
}

export const getFullName = (first_name = '', last_name = '') => {
    if (!first_name && !last_name) {
        return ''
    }
    return (last_name || '') + ' ' + (first_name || '')
}

export const getSymbolName = (first_name = '', last_name = '') => {
    return (last_name ? last_name[0].toUpperCase() : '') + (first_name ? first_name[0].toUpperCase() : '')
}

// export const saveUserSession = async (accessToken: string) => {
//     try {
//         const resProfile = await getUserProfileByAccessToken(accessToken)
//         if (resProfile['status'] === 'error') {
//             showMessage('error', i18n.t('notification:Đăng nhập không thành công'))
//             return false
//         }
//         const userProfile = resProfile.data

//         /* ------------------------START GET LOYALTY INFO------------------------*/
//         let couponCodes: any[] = []
//         let roomNights = 0
//         let membershipInfo = null
//         const [resProgram, resCoupon] = await Promise.all([getLoyaltyProgram(), getListCoupon(accessToken)])
//         if (resCoupon.status === 'success') {
//             roomNights = resCoupon.data.room_nights || 0
//             couponCodes = Array.isArray(resCoupon.data.coupon_codes)
//                 ? resCoupon.data.coupon_codes.filter((item: any) => item.coupon_status == 'available')
//                 : []
//         }
//         if (resProgram.status === 'success') {
//             const internalPrograms = resProgram.data.filter((item: any) => !item['is_third_party'])
//             if (internalPrograms.length && ['ACTIVE', 'SUSPENSION_REQUESTED'].includes(internalPrograms[0]['status'])) {
//                 const resInfo = await getMembershipInfo(internalPrograms[0]['id'], accessToken)
//                 if (resInfo.status === 'success' && resInfo.data) {
//                     membershipInfo = resInfo.data
//                 } else {
//                     await joinLoyaltyProgram(internalPrograms[0].id, accessToken) // auto join loyalty (included register)
//                 }
//             }
//         }
//         /* ------------------------END GET LOYALTY INFO------------------------*/

//         const dataSession: any = {
//             user_id: userProfile?.user_id,
//             first_name: userProfile?.first_name,
//             last_name: userProfile?.last_name,
//             gender: userProfile?.gender,
//             phone: userProfile?.phone,
//             email: userProfile?.email,
//             access_token: accessToken,
//             expired_at: moment().add(4, 'day').toDate(), // add thêm ngày expired dưới client (4 ngày)
//             loyalty: {
//                 room_night: roomNights,
//                 coupon_codes: couponCodes,
//                 member_id: membershipInfo?.member_id,
//                 level_name: membershipInfo?.level_name,
//                 available_point: membershipInfo?.available_point,
//                 next_expiring_points: membershipInfo?.next_expiring_points,
//             },
//         }
//         window.localStorage.setItem('user_info', JSON.stringify(dataSession))
//         return true
//     } catch (e) {
//         showMessage('error', i18n.t('notification:Đăng nhập không thành công'))
//         return false
//     }
// }

export const clearUserSession = () => {
    Cookies.remove('accessToken', { domain: process.env.NEXT_PUBLIC_SSO_DOMAIN })
}

export const saveBookerAndReceiver = (data: any) => {
    return window.localStorage.setItem('booker_and_receiver', JSON.stringify(data))
}

export const getBookerAndReceiver = () => {
    if (typeof window !== 'undefined') {
        const data = window.localStorage.getItem('booker_and_receiver')
        return data ? JSON.parse(data) : null
    }
    return null
}
export const saveBookerAndPassengers = (data: any) => {
    return window.localStorage.setItem('booker_and_passengers', JSON.stringify(data))
}

export const getBookerAndPassengers = () => {
    if (typeof window !== 'undefined') {
        const data = window.localStorage.getItem('booker_and_passengers')
        return data ? JSON.parse(data) : null
    }
    return null
}

export const savePhoneNotMember = (data: any) => {
    return window.sessionStorage.setItem('phone_not_member', data)
}

export const removePhoneNotMember = () => {
    return window.sessionStorage.removeItem('phone_not_member')
}

export const getPhoneNotMember = () => {
    const data = window.sessionStorage.getItem('phone_not_member')
    return data ? data : ''
}

export const saveMinPriceLotte = (data: any) => {
    return window.sessionStorage.setItem('lotte_min', data)
}

export const removeMinPriceLotte = () => {
    return window.sessionStorage.removeItem('lotte_min')
}

export const getMinPriceLotte = () => {
    const data = window.sessionStorage.getItem('lotte_min')
    return data ? data : ''
}

export const getFinalPrice = () => {
    const data = window.localStorage.getItem('total-cart-amount')
    return data ? data : ''
}
