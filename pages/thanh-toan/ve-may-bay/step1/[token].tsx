import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { isMobile } from 'react-device-detect'
import { Button } from 'antd'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { getFlightSelected, insertFlightRate } from '../../../../api/flight-services'
import { IconClose } from '../../../../constants/icons'
import { PASSENGER } from '../../../../constants/enums'
import { getCookie, showMessage } from '../../../../utils/common'
import { setLoading } from '../../../../store/common/action'
import { PATH_FLIGHT_CHECKOUT_STEP2 } from '../../../../constants/common'
import { getBookerAndPassengers, saveBookerAndPassengers, splitFirstAndLastName } from '../../../../utils/user'
import { isBookerDataValid, isPasengerValid } from '../../../../utils/checkout'
import { setBookerData, setOpenCheckoutHotelInfo } from '../../../../store/checkout/action'
import { useMounted, useUserInfo } from '../../../../utils/custom-hook'
import { Booker } from '../../../../constants/interface'

const LayoutCheckout = dynamic(() => import('../../../../components/layout/LayoutCheckout'))
const HeaderCheckout = dynamic(() => import('../../../../components/checkout-common/HeaderCheckout'))
const BookerInfo = dynamic(() => import('../../../../components/checkout-common/BookerInfo'))
const TokenExpired = dynamic(() => import('../../../../components/checkout-common/TokenExpired'))
const PassengerInfo = dynamic(() => import('../../../../components/checkout-flight/PassengerInfo'))
const FlightInfo = dynamic(() => import('../../../../components/checkout-flight/FlightInfo'))

const FlightCheckoutStep1 = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const isMounted = useMounted()
    const userInfo = useUserInfo()
    const { t } = useTranslation(['flight', 'payment', 'common', 'notification'])
    const [isExpired, setIsExpired] = useState<boolean>(false)
    const [data, setData] = useState<any>(null)
    const { isOpenInfo, listPassenger, bookerData, validateBooker } = useSelector((state: any) => {
        return {
            isOpenInfo: state.checkout.isOpenCheckoutHotelInfo,
            listPassenger: state.flight.listPassenger || [],
            bookerData: state.checkout.bookerData,
            validateBooker: state.checkout.validateBooker || {
                gender: { status: 'success', text: '' },
                firstName: { status: 'success', text: '' },
                lastName: { status: 'success', text: '' },
                fullName: { status: 'success', text: '' },
                phone: { status: 'success', text: '' },
                email: { status: 'success', text: '' },
            },
        }
    })

    useEffect(() => {
        const token = router.query.token
        if (token) {
            fetchData(String(token))
        }

        async function fetchData(token: string) {
            try {
                const res = await getFlightSelected(token)
                if (res?.status === 'success') {
                    res.total_price =
                        res['departData']['totalPrice'] + (res['returnData'] ? res['returnData']['totalPrice'] : 0)
                    setData(res)
                } else {
                    setIsExpired(true)
                }
            } catch (e) {
                setIsExpired(true)
                throw e
            }
        }
    }, [router.query.token])
    useEffect(() => {
        if (isMounted) {
            if (userInfo) {
                let first_name = userInfo.first_name
                let last_name = userInfo.last_name
                if (userInfo.last_name === '') {
                    const full_name = userInfo.first_name.trim().split(' ')
                    first_name = full_name[0]
                    last_name = full_name[1]
                }
                const booker: Booker = {
                    user_id: userInfo.user_id,
                    first_name: first_name,
                    last_name: last_name,
                    email: userInfo.email,
                    phone: userInfo.phone,
                    gender: userInfo.gender,
                    is_receiver: true,
                }
                dispatch(setBookerData(booker))
            } else {
                const historyBooker = getBookerAndPassengers()?.booker // get data from localStorage -> auto fill
                const booker: Booker = {
                    user_id: 0,
                    first_name: historyBooker?.first_name || '',
                    last_name: historyBooker?.last_name || '',
                    email: historyBooker?.email || '',
                    phone: historyBooker?.phone || '',
                    gender: historyBooker?.gender || 1,
                    is_receiver: true,
                }
                dispatch(setBookerData(booker))
            }
        }
    }, [userInfo, isMounted])
    const closeInfo = () => {
        dispatch(setOpenCheckoutHotelInfo(false))
    }

    // next to step2
    const handleSubmit = async () => {
        const _passenger = [...listPassenger]
        if (!isPasengerValid(_passenger, dispatch, t)) {
            return
        }
        if (!isBookerDataValid(bookerData, validateBooker, dispatch, t)) {
            return
        }

        const _passengerData = _passenger.map((item) => {
            const { first_name, last_name } = splitFirstAndLastName(item.fullName)
            const object: any = {
                index: item.index,
                type: item.type,
                gender: item.gender === 1, // male = true, female = false,
                lastName: last_name,
                firstName: first_name,
                listBaggage: item.listBaggage.filter((baggage: any) => baggage.value),
            }
            if ([PASSENGER.CHD, PASSENGER.INF].includes(item.type)) {
                object.birthday = item.birthday
            }
            return object
        })
        saveBookerAndPassengers({ booker: bookerData, passengers: listPassenger })
        const { departData, returnData, isDomestic, sessionDomes, sessionInter } = data

        // convert ListFareData
        let convertListFareData = []
        if (departData) {
            const clone = { ...departData } // clone data, tránh ghi đè vào object cũ
            if (isDomestic) {
                clone.session = sessionDomes.VN
                clone.flightItem = clone.listFlight[0]
            }
            convertListFareData.push(clone)
        }
        if (returnData) {
            const clone = { ...returnData } // clone data, tránh ghi đè vào object cũ
            if (isDomestic) {
                clone.session = sessionDomes.VN
                clone.flightItem = clone.listFlight[0]
            }
            convertListFareData.push(clone)
        }

        // convert booker data
        const booker = {
            phone: bookerData.phone,
            email: bookerData.email,
            gender: bookerData.gender,
            firstName: bookerData.first_name,
            lastName: bookerData.last_name,
            userId: bookerData.user_id,
        }

        const dataFlight: any = {
            flightType: isDomestic ? 'domestic' : 'international',
            session: isDomestic ? '' : sessionInter,
            itinerary: returnData ? 2 : 1,
            listPassenger: _passengerData,
            listFareData: convertListFareData,
            booker: booker,
            requestFrom: isMobile ? 'WEBMOBILE' : 'WEBSITE',
        }
        if (getCookie('publisher')) {
            dataFlight.publisher_data = JSON.parse(getCookie('publisher'))
        }
        try {
            dispatch(setLoading(true))
            const response = await insertFlightRate(dataFlight)
            dispatch(setLoading(false))
            if (response?.status === 201) {
                const { bookingRequestId, bookingRequestSuggestionId } = response.data
                await router.push(
                    PATH_FLIGHT_CHECKOUT_STEP2 + '/' + bookingRequestId + '/' + bookingRequestSuggestionId
                )
            }
        } catch (e) {
            dispatch(setLoading(false))
            showMessage('error', t('Đã có lỗi. Vui lòng liên hệ tổng đài'))
            throw e
        }
    }

    const getTotalPassenger = (adt: number) => (chd: number) => (inf: number) => {
        return adt + chd + inf
    }

    return (
        <LayoutCheckout>
            <section className="checkoutLayout">
                <HeaderCheckout step={1} type={'flight'} />

                <div className="checkoutLayout__body">
                    <div className="container">
                        {isExpired ? (
                            <TokenExpired type={'flight'} />
                        ) : (
                            <div className="checkoutLayout__main">
                                <div className="checkoutLayout__left">
                                    <PassengerInfo
                                        adultCount={data?.adultCount}
                                        childCount={data?.childCount}
                                        infantCount={data?.infantCount}
                                        departData={data?.departData}
                                        returnData={data?.returnData}
                                        sessionDomes={data?.sessionDomes}
                                        sessionInter={data?.sessionInter}
                                        isDomestic={data?.isDomestic}
                                    />
                                    <div className="checkoutInfo">
                                        <h2 className="mb15">{t('payment:THÔNG TIN LIÊN HỆ')}</h2>
                                        <div className="checkoutInfo__body">
                                            <div className="checkoutInfo__form">
                                                <BookerInfo />
                                            </div>
                                            <div className="checkoutLayout__btn">
                                                <p className="gray-5 italic mb10">
                                                    {t('common:Bằng việc chọn thanh toán')},&nbsp;
                                                    {t('common:tôi xác nhận đã đọc và đồng ý với')}&nbsp;
                                                    <a href="https://www.vntrip.vn/dieu-khoan-su-dung" target="_blank">
                                                        {t('common:Điều khoản và Điều kiện')}
                                                    </a>
                                                    &nbsp;{t('common:của Vntrip.vn')}
                                                </p>
                                                <Button
                                                    type="primary"
                                                    className="btn_orange"
                                                    loading={false}
                                                    onClick={handleSubmit}
                                                >
                                                    <span>{t('common:Tiếp tục')}</span>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`checkoutLayout__right ${isOpenInfo ? 'open' : ''}`}>
                                    <div className="headerPopup">
                                        <p>
                                            {t('Vé của bạn')} (
                                            {getTotalPassenger(data?.adultCount)(data?.childCount)(data?.infantCount)}{' '}
                                            {t('hành khách')})
                                        </p>
                                        <button type="button" className="headerPopup__close" onClick={closeInfo}>
                                            <IconClose />
                                        </button>
                                    </div>
                                    <div className="checkoutLayout__sidebar">
                                        <FlightInfo
                                            totalPassenger={getTotalPassenger(data?.adultCount)(data?.childCount)(
                                                data?.infantCount
                                            )}
                                            departData={data?.departData}
                                            returnData={data?.returnData}
                                            data={data}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </LayoutCheckout>
    )
}

export default FlightCheckoutStep1
