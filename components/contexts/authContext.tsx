import moment from 'moment'
import { createContext, useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import {
    getListCoupon,
    getLoyaltyProgram,
    getMembershipInfo,
    getUserProfile,
    joinLoyaltyProgram,
} from '../../api/user-services'
import { clearUserSession } from '../../utils/user'

const authContext = createContext<any>(0)

export const useAuth = () => {
    return useContext(authContext)
}

export const ProvideAuth = (props: any) => {
    const [checkProfile, setCheckProfile] = useState<boolean>(false)
    const [user, setUser] = useState<any>(null)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = Cookies.get('accessToken')
                if (!accessToken) {
                    setCheckProfile(true)
                    return
                }
                let userProfile = null
                try {
                    const resProfile = await getUserProfile()
                    if (resProfile['status'] === 'error') {
                        setCheckProfile(true)
                        return
                    }
                    userProfile = resProfile.data
                } catch (error) {
                    if (error.response && error.response.status === 401) {
                        clearUserSession()
                        logout()
                        setCheckProfile(true)
                    }
                    return
                }

                /* ------------------------START GET LOYALTY INFO------------------------*/
                let couponCodes: any[] = []
                let roomNights = 0
                let membershipInfo = null
                const [resProgram, resCoupon] = await Promise.all([getLoyaltyProgram(), getListCoupon(accessToken)])
                if (resCoupon.status === 'success') {
                    roomNights = resCoupon.data.room_nights || 0
                    couponCodes = Array.isArray(resCoupon.data.coupon_codes)
                        ? resCoupon.data.coupon_codes.filter((item: any) => item.coupon_status == 'available')
                        : []
                }
                if (resProgram.status === 'success') {
                    const internalPrograms = resProgram.data.filter((item: any) => !item['is_third_party'])
                    if (
                        internalPrograms.length &&
                        ['ACTIVE', 'SUSPENSION_REQUESTED'].includes(internalPrograms[0]['status'])
                    ) {
                        let resInfo = await getMembershipInfo(internalPrograms[0]['id'], accessToken)
                        if (resInfo.status === 'success' && resInfo.data) {
                            membershipInfo = resInfo.data
                        } else {
                            await joinLoyaltyProgram(internalPrograms[0].id, accessToken) // auto join loyalty (included register)
                            resInfo = await getMembershipInfo(internalPrograms[0]['id'], accessToken) // get member ship info once again
                            if (resInfo.status === 'success' && resInfo.data) {
                                membershipInfo = resInfo.data
                            }
                        }
                    }
                }
                /* ------------------------END GET LOYALTY INFO------------------------*/

                const dataSession: any = {
                    user_id: userProfile?.user_id,
                    first_name: userProfile?.first_name,
                    last_name: userProfile?.last_name,
                    gender: userProfile?.gender,
                    phone: userProfile?.phone,
                    email: userProfile?.email,
                    access_token: accessToken,
                    expired_at: moment().add(4, 'day').toDate(), // add thêm ngày expired dưới client (4 ngày)
                    loyalty: {
                        room_night: roomNights,
                        coupon_codes: couponCodes,
                        member_id: membershipInfo?.member_id,
                        level_name: membershipInfo?.level_name,
                        available_point: membershipInfo?.available_point,
                        next_expiring_points: membershipInfo?.next_expiring_points,
                    },
                }
                login(dataSession)
                setCheckProfile(true)
            } catch (err) {
                // console.log('-----err-----', err)
                // console.log('-----err-----', err.response)
                setCheckProfile(true)
                // throw err
            }
        }

        fetchData()
    }, [])

    const login = (user: any) => {
        setIsAuthenticated(true)
        setUser(user)
    }

    const logout = () => {
        setIsAuthenticated(false)
        setUser(null)
    }

    return (
        <authContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {checkProfile ? props.children : null}
        </authContext.Provider>
    )
}
