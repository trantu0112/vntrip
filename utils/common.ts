import { message } from 'antd'
import { i18n } from '../i18n'
import { HOTEL_NO_IMAGE, STATIC2_VNTRIP } from '../constants/common'
import * as googleLibphonenumber from 'google-libphonenumber'
import Cookies from 'js-cookie'

const phoneUtil = googleLibphonenumber.PhoneNumberUtil.getInstance()
const PNF = googleLibphonenumber.PhoneNumberFormat

const ALLOW_TYPE = ['success', 'info', 'warning', 'error']

export const saveCurrency = (currency: 'VND' | 'USD') => {
    return window.localStorage.setItem('currency', currency)
}

export const getCurrency = () => {
    return typeof window !== 'undefined' && window.localStorage.getItem('currency') === 'USD' ? 'USD' : 'VND'
}

export const saveExChangeRate = (exchangerate: any) => {
    return window.localStorage.setItem('exchange_rate', JSON.stringify(exchangerate))
}

export const getExChangeRate = () => {
    const changerate = typeof window !== 'undefined' ? window.localStorage.getItem('exchange_rate') : null
    return changerate ? JSON.parse(changerate) : null
}

export const saveRecentSearch = (dataRecent: any) => {
    let current_data = getRecentSearch()
    if (Array.isArray(current_data)) {
        const is_new_search =
            current_data.length === 0 ||
            !current_data.find((item: any) => Number(item.pathname) === Number(dataRecent.pathname))
        if (is_new_search) current_data.unshift(dataRecent)
        if (current_data.length > 3) {
            current_data.pop()
        }
        return window.localStorage.setItem('recent_search', JSON.stringify(current_data))
    } else {
        return window.localStorage.setItem('recent_search', JSON.stringify([dataRecent]))
    }
}

export const getRecentSearch = () => {
    const listRecent = typeof window !== 'undefined' ? window.localStorage.getItem('recent_search') : null
    return listRecent ? JSON.parse(listRecent) : null
}

export const getHeaders = () => {
    const accessToken = Cookies.get('accessToken')
    return {
        'Content-Type': 'application/json',
        Authorization: accessToken ? 'Bearer ' + accessToken : '',
        'Accept-Language': i18n.language || 'vi',
        deviceid: getCookie('_ga'),
    }
}

export const isWideScreen = () => {
    return window.innerWidth >= 1200
}

export const isDesktopScreen = () => {
    return window.innerWidth >= 992 && window.innerWidth < 1200
}

export const isTableScreen = () => {
    return window.innerWidth >= 768 && window.innerWidth < 992
}

export const isMobileScreen = () => {
    return window.innerWidth < 768
}

export const showMessage = (type: string, text: string) => {
    if (ALLOW_TYPE.includes(type)) {
        // @ts-ignore
        message[type](text, 4.5)
    }
}

export const convertUnicode = (slug: string) => {
    if (slug) {
        slug = slug.toLowerCase()
        slug = slug.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???|??|??|??/gi, 'a')
        slug = slug.replace(/??|??|???|???|???|??|???|???|???|???|???|??|??|??|??|??/gi, 'e')
        slug = slug.replace(/i|??|??|???|??|???|??|??|??|??/gi, 'i')
        slug = slug.replace(/??|??|???|??|???|??|???|???|???|???|???|??|???|???|???|???|???|??|??|??|??/gi, 'o')
        slug = slug.replace(/??|??|???|??|???|??|???|???|???|???|???|??|??|??|??/gi, 'u')
        slug = slug.replace(/??|???|???|???|???/gi, 'y')
        slug = slug.replace(/??/gi, 'd')
        slug = slug.replace(/??|??|??/gi, 'c')
        slug = slug.replace(/??|??|??|??/gi, 'n')
        slug = slug.replace(/??|??|??/gi, 's')
        slug = slug.replace(/??/gi, 'y')
        slug = slug.replace(/??|???|??|??/gi, 'z')
        slug = slug.replace(/??|??|??|??|??|??/gi, 'r')
        slug = slug.replace(/??/gi, 'k')
        slug = slug.replace(/??/gi, 'g')
        slug = slug.replace(/??|??|??|??/gi, 'l')
        slug = slug.replace(/??|??/gi, 't')
        slug = slug.replace(/??/gi, 'y')
        // slug = slug.replace(/`|~|!|@|#|\||\$|%|\^|&|\*|\(|\)|\+|=|,|.|\?|>|<|'|"|:|;|_/g, '');
        slug = slug.replace(/(\/)+/g, '')
        slug = slug
            .replace(/[^a-z0-9-]/gi, '-')
            .replace(/(-)+/g, '-')
            .replace(/^-|-$/g, '')
        slug = slug.replace(/(\s)+/g, '???').replace(/(-)+/g, '-')
        slug = '@' + slug + '@'
        slug = slug.replace(/@-|-@|@/g, '')
    }
    return slug
}

export const getUrlDealImage = (link: string, size?: string) => {
    return link ? `${STATIC2_VNTRIP}/${size || '260x150'}/smart/${link}` : HOTEL_NO_IMAGE
}

export function changeAlias(alias: string) {
    let str = alias
    str = str.toLowerCase()
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, 'a')
    str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, 'e')
    str = str.replace(/??|??|???|???|??/g, 'i')
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, 'o')
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, 'u')
    str = str.replace(/???|??|???|???|???/g, 'y')
    str = str.replace(/??/g, 'd')
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, ' ')
    str = str.replace(/ + /g, ' ')
    str = str.trim().toUpperCase()
    return str
}

export const isMobileByUserAgent = (userAgent: any) => {
    return (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
            userAgent
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
            userAgent.substr(0, 4)
        )
    )
}

export const displayPrice = (price: number, currency: 'VND' | 'USD') => {
    if (price) {
        price = Number(price)
        const currencies = {
            USD: ['$', 2, ',', 'before', 'United States dollar'],
            VND: ['???', 0, '.', 'after', 'Vietnamese dong'],
        }
        const formatCurr = (xx: number, curr: 'VND' | 'USD') => {
            if (!curr) curr = 'VND'
            let sym = currencies[curr][0]
            let dec = currencies[curr][1]

            let yy = Number(Math.round(Number(xx + 'e' + dec)) + 'e-' + dec)
            // let y = x.toFixed(dec);
            let zz = yy.toString().replace(/\B(?=(\d{3})+(?!\d))/g, String(currencies[curr][2]))
            return currencies[curr][3] === 'before' ? sym + zz : zz + sym
        }
        const formatPrice = () => {
            let rate = 1
            if (currency === 'USD') {
                let exChangeRate = getExChangeRate()
                rate = exChangeRate['transfer']
            }
            return formatCurr(price / rate, currency)
        }
        return formatPrice()
    }
    return ''
}

export const blurPrice = (str: string) => {
    if (str && str.length > 0) {
        let showNumber = 4,
            minPart = 3
        const strLength = str.length
        let eos = strLength - 1
        let arr = str.split('')
        showNumber = showNumber > Math.floor(strLength / minPart) ? Math.floor(strLength / minPart) : showNumber
        if (arr[showNumber] === '.') showNumber++
        let i = 0
        for (i; i < eos; i++) {
            if (i > showNumber - 1 && !isNaN(Number(arr[i]))) arr[i] = 'x'
        }
        return arr.join('')
    }
    return ''
}

export const convertDiscountCode = (code: string, lang: 'vi' | 'en' = 'vi') => {
    const arrCode: any = {
        LAST_MINUTE: {
            vi: 'Khuy???n m???i gi??? ch??t',
            en: 'Last minute deal',
        },
        NORMAL: {
            vi: 'Khuy???n m???i',
            en: 'Promotion',
        },
        EARLY_BIRD: {
            vi: '??u ????i ?????t s???m',
            en: 'Early bird deal',
        },
        SECRET_DEALS: {
            vi: '??u ????i d??nh cho th??nh vi??n Vntrip',
            en: 'Secret deal for Vntrip member',
        },
    }
    return ['LAST_MINUTE', 'NORMAL', 'EARLY_BIRD', 'SECRET_DEALS'].includes(code)
        ? arrCode[code][lang]
        : arrCode['NORMAL'][lang]
}

// add class noScroll to body ( use for mobile )
export const toggleClassNoScroll = (type?: 'add' | 'remove') => {
    if (typeof document !== 'undefined') {
        if (type === 'add') {
            if (!document.body.classList.contains('noScroll')) {
                document.body.classList.add('noScroll')
            }
        } else if (type === 'remove') {
            document.body.classList.remove('noScroll')
        } else {
            if (document.body.classList.contains('noScroll')) {
                document.body.classList.remove('noScroll')
            } else {
                document.body.classList.add('noScroll')
            }
        }
    }
}

export const copyToClipboard = (text: string) => {
    const $body = document.getElementsByTagName('body')[0]
    const $tempInput = document.createElement('INPUT') as HTMLInputElement
    $body.appendChild($tempInput)
    $tempInput.setAttribute('value', text)
    $tempInput.select()
    document.execCommand('copy')
    $body.removeChild($tempInput)
}

export const getLinkOrderDetail = (orderType: 'hotel' | 'flight', orderId: number) => {
    if (orderType === 'flight') {
        return process.env.NEXT_PUBLIC_ROOT_DOMAIN + '/tai-khoan/chuyen-bay/' + orderId
    } else {
        return process.env.NEXT_PUBLIC_ROOT_DOMAIN + '/tai-khoan/dat-phong/' + orderId
    }
}

export const getUrl = () => {
    return window.location.protocol + '//' + window.location.hostname + window.location.pathname
}

export const convertOrderStatus = (status: string) => {
    const isVietnamese = i18n.language === 'vi'
    switch (status) {
        case 'order_new':
            return isVietnamese ? '??ang x??? l?? y??u c???u' : 'Request processing'
        case 'order_collecting':
            return isVietnamese ? '??ang x??? l?? y??u c???u' : 'Request processing'
        case 'order_full':
            return isVietnamese ? '???? g???i y??u c???u thanh to??n' : 'Payment request sent'
        case 'order_pending_payment':
            return isVietnamese ? 'Ch??? thanh to??n' : 'Waiting for payment'
        case 'order_pending_approve':
            return isVietnamese ? 'Ch??? ph?? duy???t' : 'Waiting approval'
        case 'order_disapprove':
            return isVietnamese ? 'T??? ch???i' : 'Rejected'
        case 'order_paid':
            return isVietnamese ? 'Th??nh c??ng' : 'Success'
        case 'order_success':
            return isVietnamese ? 'Th??nh c??ng' : 'Success'
        case 'order_fail':
            return isVietnamese ? 'Th???t b???i' : 'Failed'
        case 'order_cancel':
            return isVietnamese ? '???? h???y' : 'Cancelled'
        case 'waiting_cancel':
            return isVietnamese ? 'Ch??? h???y' : 'Waiting for cancel'
        default:
            return isVietnamese ? '??ang x??c nh???n' : 'Confirming'
    }
}

export const convertClass = (status: string) => {
    switch (status) {
        case 'order_success':
            return 'green-1'
        case 'order_fail':
            return 'red-1'
        case 'order_cancel':
            return 'red-1'
        default:
            return 'yellow-1'
    }
}

export const convertPaymentMethod = (paymentMethod: string) => {
    const isVietnamese = i18n.language === 'vi'
    switch (paymentMethod) {
        case 'banknet_inland':
            return isVietnamese ? 'Thanh to??n tr???c tuy???n' : 'Online payment'
        case 'banknet_global':
            return isVietnamese ? 'Thanh to??n tr???c tuy???n' : 'Online payment'
        case 'payment_method_union':
            return isVietnamese ? 'Thanh to??n tr???c tuy???n' : 'Online payment'
        case 'payment_method_bank_transfer':
            return isVietnamese ? 'Thanh to??n chuy???n kho???n' : 'Bank transfer'
        case 'payment_method_pay_at_hotel':
            return isVietnamese ? 'Thanh to??n t???i kh??ch s???n' : 'Pay at hotel'
        case 'payment_method_credit_card':
            return isVietnamese ? 'Thanh to??n t???i kh??ch s???n b???ng th???' : 'Pay by credit card at the hotel'
        case 'payment_method_cod':
            return isVietnamese ? 'Ti???n m???t' : 'Cash'
        case 'payment_method_debit':
            return isVietnamese ? 'C??ng n???' : 'Debit'
        case 'payment_method_bankplus':
            return isVietnamese ? 'Thanh to??n tr???c tuy???n b???ng Bankplus' : 'Pay by BankPlus'
        case 'payment_method_momo':
            return isVietnamese ? 'V?? Momo' : 'Momo wallet'
        case 'payment_method_inland_napas':
            return isVietnamese ? 'Th??? n???i ?????a qua Napas' : 'Domestic card through Napas'
        case 'payment_method_global_napas':
            return isVietnamese ? 'Th??? qu???c t??? qua Napas' : 'International card through Napas'
        case 'payment_method_inland_123pay':
            return isVietnamese ? 'Th??? n???i ?????a qua 123Pay' : 'Domestic card through 123Pay'
        case 'payment_method_global_123pay':
            return isVietnamese ? 'Th??? qu???c t??? qua 123Pay' : 'International card through 123Pay'
        case 'payment_method_airpay':
            return isVietnamese ? 'V?? Airpay' : 'Pay by Airpay'
        case 'payment_method_zalopay':
            return isVietnamese ? 'Thanh to??n qua v?? ZaloPay' : 'Pay online with Zalopay Wallet'
        case 'payment_method_zalopay_wallet':
            return isVietnamese ? 'V?? Zalopay' : 'Zalo wallet'
        case 'payment_method_pay_later_lfvn':
            return isVietnamese ? 'LOTTE Finance Paylater' : 'LOTTE Finance Paylater'
        default:
            // status = i18n.t('payment:H??nh th???c kh??c')
            return isVietnamese ? 'H??nh th???c kh??c' : 'Other method'
    }
}

export const sum = (a: number) => (b: number) => {
    return (a || 0) + (b || 0)
}

export const isEmailValid = (email: string) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
}

export const isPhoneValid = (phone: string) => {
    try {
        const phoneNumber = phoneUtil.parse(phone, 'VN')
        return phoneUtil.isValidNumber(phoneNumber)
    } catch (e) {
        return false
    }
}

export const convertPhone = (phone: string): string => {
    try {
        const phoneNumber = phoneUtil.parse(phone, 'VN')
        if (phoneUtil.isValidNumber(phoneNumber)) {
            return phoneUtil.format(phoneNumber, PNF.E164)
        }
        return phone
    } catch (e) {
        return phone
    }
}

export const renderGender = (type: string, gender: boolean) => {
    switch (type) {
        case 'ADT':
            return !gender ? 'B??' : '??ng'
        case 'CHD':
            return !gender ? 'B?? g??i' : 'B?? trai'
        case 'INF':
            return !gender ? 'B?? g??i' : 'B?? trai'
        default:
            return !gender ? 'B??' : '??ng'
    }
}

export const uToA = (str: string) => {
    return window.btoa(unescape(encodeURIComponent(str)))
}

export const setCookie = (cname: string, cvalue: string, exdays: number) => {
    if (typeof document !== 'undefined') {
        const d = new Date()
        d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
        const expires = 'expires=' + d.toUTCString()
        document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
    }
}

export const getCookie = (cname: string) => {
    if (typeof document !== 'undefined') {
        const name = cname + '='
        const decodedCookie = decodeURIComponent(document.cookie)
        const ca = decodedCookie.split(';')
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i]
            while (c.charAt(0) == ' ') {
                c = c.substring(1)
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length)
            }
        }
        return ''
    }
    return ''
}

export const removeHtmlTag = (str: any) => {
    if (str === null || str === '') return ''
    else str = str.toString()
    return str.replace(/(<([^>]+)>)/gi, '').replace(/\n/g, '')
}

export const cutWord = (str: string, number_words: number) => {
    return str.split(' ').splice(0, number_words).join(' ')
}

export const calculatorDiscount = (originPrice: number, sellPrice: number) => {
    if (originPrice) {
        return Math.round(((originPrice - sellPrice) / originPrice) * 100)
    }
    return 0
}
