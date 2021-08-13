import { isMobile } from 'react-device-detect'
import { PATH_PAY_SUCCESS, PATH_PAY_ZALO_WALLET, PATH_PAY_BANK_TRANSFER } from '../constants/common'
import { Booker, Receiver } from '../constants/interface'
import { setReceiverData, validateBookerData } from '../store/checkout/action'
import { isEmailValid, isPhoneValid } from './common'
import { PASSENGER } from '../constants/enums'
import { setListPassenger } from '../store/flight/action'
import { getPLToken, updateToken } from '../api/partner-service'
import { getBookerAndPassengers, getBookerAndReceiver, getPhoneNotMember } from './user'
import jsonp from 'jsonp'
import base64url from 'base64url'
import crypto from 'crypto'

export const getReceiverData = (bookerData: Booker, receiverData: Receiver[], roomCount: number) => {
    const { first_name, last_name, phone, is_receiver } = bookerData
    if (is_receiver) {
        let receiver = []
        for (let i = 0; i < roomCount; i++) {
            receiver.push({
                first_name: first_name,
                last_name: last_name,
                phone: phone,
                country_code: '84',
            })
        }
        return receiver
    } else {
        return receiverData.map((item: any) => {
            return {
                first_name: item.first_name,
                last_name: item.last_name,
                phone: item.phone,
                country_code: '84',
            }
        })
    }
}

export const handlePaymentMethods = (
    paymentMethods: any[],
    totalPrice: number,
    type: 'hotel' | 'flight',
    rateType?: string
) => {
    return paymentMethods
        .map((it) => {
            let item = { ...it }
            let available = rateType
                ? item.order_type.includes(type.toUpperCase()) && item.rate_type.includes(rateType)
                : item.order_type.includes(type.toUpperCase())
            const payLimit = item.payment_limit
            if (available && payLimit) {
                // check by payment limit
                if (payLimit.hasOwnProperty('min') && payLimit.hasOwnProperty('max')) {
                    available = payLimit.min <= totalPrice && totalPrice <= payLimit.max
                } else if (payLimit.hasOwnProperty('min') && !payLimit.hasOwnProperty('max')) {
                    available = payLimit.min <= totalPrice
                } else if (!payLimit.hasOwnProperty('min') && payLimit.hasOwnProperty('max')) {
                    available = totalPrice <= payLimit.max
                }
            }
            item.available = available
            item.code = item.payment_method
            const markupItem = Array.isArray(item.markup)
                ? item.markup.find((m: any) => m.type === type.toUpperCase())
                : null
            item.haveMarkup = !!markupItem // true | false
            item.markupAmount = markupItem ? (totalPrice * markupItem.percentage) / 100 + markupItem.amount : null
            return item
        })
        .filter((item) => !['book_for_me'].includes(item.payment_method)) // bỏ hình thức thanh toán gọi cho tôi và zalo wallet (chưa làm)
        .sort((a, b) => {
            return a['rank'] < b['rank'] ? -1 : a['rank'] > b['rank'] ? 1 : 0
        })
}

export const handleResultAddOrder = (dataAddOrder: any) => {
    const { redirect_url, redirect_url_mobile, transaction_id, order_data } = dataAddOrder
    const { payment_method } = order_data

    if (payment_method === 'payment_method_zalopay_wallet') {
        // pay online wallet
        if (isMobile && redirect_url_mobile) {
            window.location.href = redirect_url_mobile
        } else if (transaction_id) {
            window.location.href = `${PATH_PAY_ZALO_WALLET}?transaction_id=${transaction_id}&code=${window.btoa(
                unescape(encodeURIComponent(redirect_url))
            )}`
        }
    } else if (payment_method === 'payment_method_bank_transfer') {
        // pay bank transfer
        window.location.href = `${PATH_PAY_BANK_TRANSFER}?transaction_id=${transaction_id}`
    } else if (redirect_url) {
        // pay online
        window.location.href = redirect_url
    } else {
        window.location.href = `${PATH_PAY_SUCCESS}?transaction_id=${transaction_id}`
    }
}

export const isPasengerValid = (_passenger: any[], dispatch: any, t: any) => {
    let isError = false
    for (let passenger of _passenger) {
        const { fullName, birthday, type } = passenger
        if (!fullName || !fullName.trim() || fullName.split(' ').length < 2) {
            passenger.validateName = {
                status: 'error',
                text: t('notification:Vui lòng nhập họ và tên'),
            }
            document
                .getElementById(`full_name_${passenger.index}`)
                ?.scrollIntoView({ block: 'center', behavior: 'smooth' })
            isError = true
            break
        }
        // trẻ em và trẻ sơ sinh mới có ngày sinh
        if (type !== PASSENGER.ADT && !birthday) {
            passenger.validateBirthday = { status: 'error', text: t('notification:Vui lòng nhập ngày sinh') }
            document
                .getElementById(`birthday_${passenger.index}`)
                ?.scrollIntoView({ block: 'center', behavior: 'smooth' })
            isError = true
            break
        }
    }

    if (isError) {
        dispatch(setListPassenger(_passenger))
        return false
    }
    return true
}

export const isBookerDataValid = (bookerData: Booker, validateBooker: any, dispatch: any, t: any) => {
    if (![0, 1, 2].includes(bookerData?.gender)) {
        dispatch(
            validateBookerData({
                ...validateBooker,
                gender: { status: 'error', text: t('notification:Vui lòng chọn giới tính') },
            })
        )
        return false
    }
    if (!bookerData?.first_name || !bookerData?.last_name) {
        dispatch(
            validateBookerData({
                ...validateBooker,
                fullName: { status: 'error', text: t('notification:Vui lòng nhập đầy đủ họ tên') },
            })
        )
        return false
    }
    if (!bookerData?.phone) {
        dispatch(
            validateBookerData({
                ...validateBooker,
                phone: { status: 'error', text: t('notification:Vui lòng nhập số điện thoại') },
            })
        )
        return false
    }
    if (!isPhoneValid(bookerData?.phone)) {
        dispatch(
            validateBookerData({
                ...validateBooker,
                phone: { status: 'error', text: t('notification:Số điện thoại không hợp lệ') },
            })
        )
        return false
    }
    if (!bookerData?.email) {
        dispatch(
            validateBookerData({
                ...validateBooker,
                email: { status: 'error', text: t('notification:Vui lòng nhập email') },
            })
        )
        return false
    }
    if (!isEmailValid(bookerData?.email)) {
        dispatch(
            validateBookerData({
                ...validateBooker,
                email: { status: 'error', text: t('notification:Email không hợp lệ') },
            })
        )
        return false
    }
    return true
}

export const isRoomReceiverValid = (receiverData: Receiver[], dispatch: any, t: any) => {
    if (Array.isArray(receiverData) && receiverData.length > 0) {
        let is_valid: boolean = true
        const _clone: Receiver[] = [...receiverData]
        for (let i = 0; i < _clone.length; i++) {
            const { first_name, last_name, phone } = _clone[i]
            if (!first_name || !last_name) {
                _clone[i].name_status = 'error'
                _clone[i].name_text = t('notification:Vui lòng nhập đầy đủ họ tên')
                is_valid = false
                break
            }
            if (!phone) {
                _clone[i].phone_status = 'error'
                _clone[i].phone_text = t('notification:Vui lòng nhập số điện thoại')
                is_valid = false
                break
            } else if (phone && !isPhoneValid(phone)) {
                _clone[i].phone_status = 'error'
                _clone[i].phone_text = t('notification:Số điện thoại không hợp lệ')
                is_valid = false
                break
            }
        }
        dispatch(setReceiverData(_clone))
        return is_valid
    }
    return false
}

export const getLimitLotte = async (data: any) => {
    let userId = ''
    let phone = ''
    let email
    let booker
    if (getBookerAndReceiver()) {
        booker = getBookerAndReceiver()
    } else {
        booker = getBookerAndPassengers()
    }
    if (booker && booker['booker']) {
        booker = booker['booker']
    }
    if (data) {
        if (data) {
            userId = data.userId === 0 ? '' : data.user_id
            phone = getPhoneNotMember() ? getPhoneNotMember() : data.phone
            email = data.email
        } else if (getPhoneNotMember()) {
            phone = getPhoneNotMember()
            email = data?.email || ''
        } else {
            phone = data?.phone || ''
            email = data?.email || ''
        }
    } else if (booker) {
        if (booker) {
            userId = booker.userId === 0 ? '' : booker.user_id
            phone = getPhoneNotMember() ? getPhoneNotMember() : booker.phone
            email = booker.email
        } else if (getPhoneNotMember()) {
            phone = getPhoneNotMember()
            email = booker?.email || ''
        } else {
            phone = booker?.phone || ''
            email = booker?.email || ''
        }
    }
    const params = { userId, phone, email }

    try {
        const resPlToken = await getPLToken(params)
        if (resPlToken && resPlToken.token) {
            await updateToken(resPlToken.token, { phone: phone })
        }
    } catch (e) {
        throw e
    }
}
