import React, { useEffect, useState } from 'react'
import dynamic from 'next/dist/next-server/lib/dynamic'
import { useTranslation } from 'react-i18next'
import { Button } from 'antd'
import moment from 'moment'
import { isBookerDataValid } from '../../../../utils/checkout'
import { isMobile } from 'react-device-detect'
import { getCookie, showMessage } from '../../../../utils/common'
import { collectInfo } from '../../../../api/hotel-services'
import { getBookerAndReceiver, saveBookerAndReceiver } from '../../../../utils/user'
import { PATH_VOUCHER_CHECKOUT_STEP2 } from '../../../../constants/common'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { setBookerData, setOpenCheckoutHotelInfo } from '../../../../store/checkout/action'
import { getRedisVoucher } from '../../../../api/voucher'
import { getDealById } from '../../../../api/common-services'
import { useMounted, useUserInfo } from '../../../../utils/custom-hook'
import { Booker } from '../../../../constants/interface'
const LayoutCheckout = dynamic(() => import('../../../../components/layout/LayoutCheckout'))
const HeaderCheckout = dynamic(() => import('../../../../components/checkout-common/HeaderCheckout'))
const BookerInfo = dynamic(() => import('../../../../components/checkout-common/BookerInfo'))
const TokenExpired = dynamic(() => import('../../../../components/checkout-common/TokenExpired'))
const ReviewInfo = dynamic(() => import('../../../../components/voucher/ReviewInfo'))

const VoucherCheckOut1 = () => {
    const dispatch = useDispatch()
    const isMounted = useMounted()
    const userInfo = useUserInfo()
    const router = useRouter()
    const { t } = useTranslation(['payment', 'common', 'notification', 'voucher'])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isTokenExpired, setIsTokenExpired] = useState<boolean>(false)
    const [data, setData] = useState<any>(null)

    const { isOpenInfo, customerNote, bookerData, validateBooker } = useSelector((state: any) => {
        return {
            isOpenInfo: state.checkout.isOpenCheckoutHotelInfo,
            customerNote: state.checkout.customerNote || '',
            bookerData: state.checkout.bookerData,
            receiverData: state.checkout.receiverData,
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

    // ** get data từ redis ***//
    useEffect(() => {
        const token = router.query.token || ''
        const fetchDealById = async (id: number, quantity: number) => {
            try {
                const result = await getDealById(id)
                if (result?.status === 'success') {
                    result.data.quantity = quantity
                    setData(result?.data)
                }
            } catch (e) {
                throw e
            }
        }
        const fetchDataCheckout1 = async (token: string) => {
            try {
                const result = await getRedisVoucher(token)
                if (result?.data) {
                    fetchDealById(Number(result?.data?.deal_id), Number(result?.data?.quantity))
                }
            } catch (e) {
                if (e?.response?.data?.error_code === 404) {
                    setIsTokenExpired(true)
                }
                throw e
            }
        }
        if (token) {
            fetchDataCheckout1(String(token))
        }
    }, [])

    // set booker data
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
                const historyBooker = getBookerAndReceiver()?.booker // get data from localStorage -> auto fill
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

    const handleContinueStep1 = async () => {
        if (!isBookerDataValid(bookerData, validateBooker, dispatch, t)) {
            return
        }
        let otherExpense = {
            input_price: Number(data?.price_deal?.[0].origin_price || 0),
            sell_price: Number(data?.price_deal?.[0].sell_price || 0),
            total_price: data?.price_deal?.[0].sell_price * data?.quantity,
            quantity: data?.quantity,
            name: data?.name,
            created_at: moment(),
            updated_at: moment(),
            type: 'other',
            id: data?.id,
        }
        const dataCollect: any = {
            booker_data: { ...bookerData, reference_url: 'vntrip.vn-nextjs' },
            customer_request: customerNote,
            coupon_code: '',
            request_from: isMobile ? 'WEBMOBILE' : 'WEBSITE',
            other: {},
            deal_id: data?.id,
            other_expense: [otherExpense],
        }
        if (getCookie('publisher')) {
            dataCollect.publisher_data = JSON.parse(getCookie('publisher'))
        }

        try {
            setIsLoading(true)
            const res = await collectInfo(dataCollect)
            if (res.status === 'success') {
                const booking_request_id = res.data.booking_request_id

                saveBookerAndReceiver({
                    booker: bookerData,
                })
                await router.push(
                    PATH_VOUCHER_CHECKOUT_STEP2 + '/[br_id]',
                    PATH_VOUCHER_CHECKOUT_STEP2 + '/' + booking_request_id
                )
            } else {
                showMessage('error', res.message)
            }
            setIsLoading(false)
        } catch (e) {
            setIsLoading(false)
            throw e
        }
    }

    // close info mobile
    const closeInfo = () => {
        dispatch(setOpenCheckoutHotelInfo(false))
    }

    return (
        <LayoutCheckout>
            <HeaderCheckout step={1} type={'voucher'} />
            <div className="checkoutLayout__body">
                <div className="container">
                    {isTokenExpired ? (
                        <TokenExpired type={'hotel'} />
                    ) : (
                        <div className="checkoutLayout__main">
                            <div className="checkoutLayout__left">
                                <div className="checkoutInfo">
                                    <h2 className="mb15">{t('common:Thông tin liên hệ')}</h2>
                                    <div className="checkoutInfo__body">
                                        <div className="checkoutInfo__group">
                                            {/*<div className="checkoutLayout__title">*/}
                                            {/*    <span>{t('voucher:Thông tin người đặt voucher')}</span>*/}
                                            {/*</div>*/}
                                            <div className="checkoutInfo__form">
                                                <BookerInfo />
                                                {/*<ReceiverInfo />*/}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="checkoutLayout__btn">
                                        <Button
                                            type="primary"
                                            className="btn_orange"
                                            loading={isLoading}
                                            onClick={handleContinueStep1}
                                        >
                                            <span>{t('common:Tiếp tục')}</span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className={`checkoutLayout__right ${isOpenInfo ? 'open' : ''}`}>
                                <ReviewInfo data={data} quantity={data?.quantity || 1} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </LayoutCheckout>
    )
}

export default VoucherCheckOut1
