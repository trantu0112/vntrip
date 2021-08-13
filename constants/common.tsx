import React from 'react'
import {
    IconActivity,
    IconBlog,
    IconBusiness,
    IconCoupon,
    IconDashBoard,
    IconDonggia,
    IconFlight,
    IconHotel,
    IconHunting,
    IconMotel,
    IconMyReview,
    IconUser,
    IconVoucher,
} from './icons'
import { Bank, BankBranch, ValidationForm } from './interface'

export const PAGE_SIZE = 20

export const PATH_HOME = '/'

export const PATH_HOTEL_DETAIL = '/hotel'

export const PATH_HOTEL_SEARCH = '/tim-khach-san'

export const PATH_HOTEL_HUNT = '/san-khach-san-gia-tot-nhat'

export const PATH_HOTEL_DETAIL_INTERNATIONAL = '/khach-san-quoc-te'

export const PATH_HOTEL_CHECKOUT_STEP1 = '/thanh-toan/khach-san/step1'

export const PATH_HOTEL_CHECKOUT_STEP2 = '/thanh-toan/khach-san/step2'

export const PATH_FLIGHT_CHECKOUT_STEP1 = '/thanh-toan/ve-may-bay/step1'

export const PATH_FLIGHT_CHECKOUT_STEP2 = '/thanh-toan/ve-may-bay/step2'

export const PATH_PAY_ZALO_WALLET = '/thanh-toan/zalo-wallet'

export const PATH_PAY_BANK_TRANSFER = '/thanh-toan/chuyen-khoan'

export const PATH_PAY_WAITING_CONFIRM = '/thanh-toan/cho-xac-nhan'

export const PATH_PAY_WAITING_APPROVAL = '/thanh-toan/cho-duyet'

export const PATH_PAY_SUCCESS = '/thanh-toan/thanh-cong'

export const PATH_PAY_FAIL = '/thanh-toan/that-bai'

export const PATH_PAY_REQUEST = '/thanh-toan/gui-yeu-cau'

export const PATH_TRANSACTION_CONFIRM = '/thank-you'

export const PATH_TRANSACTION_CONFIRM_FLIGHT = '/thanh-toan/hoan-thanh'

export const PATH_DEAL_LIST = '/khuyen-mai'
export const PATH_VOUCHER_LIST = '/voucher'

export const PATH_POLICY = '/dieu-khoan-su-dung'

export const PATH_TERM_AND_CONDITION = '/chinh-sach-bao-mat'

export const PATH_VOUCHER_CHECKOUT_STEP1 = '/thanh-toan/voucher/step1'
export const PATH_VOUCHER_CHECKOUT_STEP2 = '/thanh-toan/voucher/step2'

export const PATH_USER = {
    DASHBOARD: '/tai-khoan/dashboard',
    HOTEL: '/tai-khoan/dat-phong',
    HOTEL_DETAIL: '/tai-khoan/dat-phong/[id]',
    FLIGHT: '/tai-khoan/chuyen-bay',
    FLIGHT_DETAIL: '/tai-khoan/chuyen-bay/[id]',
    COMBO: '/tai-khoan/combo',
    COMBO_DETAIL: '/tai-khoan/combo/[id]',
    COUPON: '/tai-khoan/coupon',
    VOUCHER: '/tai-khoan/voucher',
    VOUCHER_DETAIL: '/tai-khoan/voucher/[code]',
    ACTIVITY: '/tai-khoan/hoat-dong',
    REVIERW: '/tai-khoan/danh-gia',
    INVOICE: '/tai-khoan/hoa-don',
    CARD: '/tai-khoan/the-thanh-vien',
}

export const DEFAULT_VALIDATION: ValidationForm = {
    status: 'success',
    text: '',
}

export const HOTEL_NO_IMAGE = 'https://statics.vntrip.vn/website/images/no-image.165x177.png'

// export const STATIC2_VNTRIP = 'https://statics2.vntrip.vn'
export const STATIC2_VNTRIP = 'https://i.vntrip.vn'
export const STATIC_VNTRIP = 'https://statics.vntrip.vn'

export const YYYYMMDD = 'YYYYMMDD'

export const VNTRIP_INFO = {
    name: 'CÔNG TY TNHH VNTRIP.VN',
    nameEn: 'VNTRIP Co Ltd.,.',
    address1: 'Tầng 2 Tòa nhà 17T4 Hapulico Complex',
    address1En: 'Floor 2, Building 17T4 Hapulico Complex',
    address2: 'Số 1 Nguyễn Huy Tưởng, Thanh Xuân, Hà Nội',
    address2En: '1 Nguyen Huy Tuong Str., Thanh Xuan Dist., Hanoi',
    bankName: 'Vietcombank',
    bankNumber: '0491000136688',
    bankBranch: 'Thăng Long',
    businessRegistrationDate: '9/5/2016',
    email: 'cs@vntrip.vn',
    hotline: '096 326 6688',
    facebookLink: 'https://www.facebook.com/vntrip',
    instagramLink: 'https://www.instagram.com/vntrip.vn/',
    appStore: 'https://itunes.apple.com/us/app/vntrip-at-phong-khach-san/id1046183734?ls=1&mt=8',
    googlePlay: 'https://play.google.com/store/apps/details?id=vn.vntrip.hotel',
}

export const LIST_PROVINCE__HUNT = [33, 67, 66, 92, 86, 90, 125, 119]
export const LIST_CITY_HUNT = [980, 1032, 1329, 960, 1003, 1378]

export const LIST_LINK_FOOTER = [
    {
        link: '/ve-vntrip',
        label: 'Về Vntrip',
        isOpenNewTab: false,
    },
    {
        link: '/lien-he',
        label: 'Liên hệ',
        isOpenNewTab: false,
    },
    {
        link: '/dieu-khoan-su-dung',
        label: 'Điều khoản sử dụng',
        isOpenNewTab: false,
    },
    {
        link: '/quy-che-hoat-dong',
        label: 'Quy chế hoạt động',
        isOpenNewTab: false,
    },
    {
        link: '/chinh-sach-bao-mat',
        label: 'Chính sách bảo mật',
        isOpenNewTab: false,
    },
    // {
    //     link: 'https://www.vntrip.vn/specialhotels/',
    //     label: 'Hợp tác khách sạn',
    //     isOpenNewTab: true,
    // },
    {
        link: 'https://www.vntrip.vn/cam-nang',
        label: 'Blog du lịch',
        isOpenNewTab: true,
    },
    {
        link: 'http://hr.vntrip.vn/',
        label: 'Tuyển dụng',
        isOpenNewTab: true,
    },
    {
        link: 'https://policy.vntrip.vn/loyalty-vntrip',
        label: 'Hoàn tiền thành viên',
        isOpenNewTab: true,
    },
    {
        link: 'https://partner.vntrip.vn/',
        label: 'Hợp tác đại lý',
        isOpenNewTab: true,
    },
]

export const LIST_ROUTER_MENU_MOBILE = [
    {
        key: 'hunting',
        label: 'Săn giá rẻ',
        link: '/',
        translate: 'common',
        isOpenNewTab: false,
        icon: () => <IconHunting />,
    },
    {
        key: 'hotel',
        label: 'Khách sạns',
        link: '/khach-san',
        translate: 'hotel',
        isOpenNewTab: false,
        icon: () => <IconHotel width={18} height={18} />,
    },
    {
        key: 'flight',
        label: 'Vé máy bay',
        link: '/ve-may-bay',
        translate: 'flight',
        isOpenNewTab: false,
        icon: () => <IconFlight />,
    },
    // {
    //     key: 'voucher',
    //     label: 'Voucher',
    //     link: '/voucher',
    //     translate: 'voucher',
    //     isOpenNewTab: false,
    //     icon: () => <IconVoucher />,
    // },
    {
        key: 'quickstay',
        label: 'Nhà nghỉ',
        link: 'https://quickstay.vntrip.vn/',
        translate: 'common',
        isOpenNewTab: true,
        icon: () => <IconMotel />,
    },
    {
        key: 'business',
        label: 'Doanh nghiệp',
        link: 'https://tms.vntrip.vn/?utm_source=Menu_bar&utm_medium=Mobile',
        translate: 'common',
        isOpenNewTab: true,
        icon: () => <IconBusiness />,
    },
    {
        key: 'blog',
        label: 'Cẩm nang',
        link: 'https://www.vntrip.vn/cam-nang',
        translate: 'common',
        isOpenNewTab: true,
        icon: () => <IconBlog />,
    },
    {
        key: 'search order',
        label: 'Tra cứu đơn hàng',
        link: '/tra-cuu-don-hang',
        translate: 'common',
        isOpenNewTab: false,
        icon: () => <IconHunting />,
    },
]

export const LIST_LINK_PROFILE = [
    {
        link: PATH_USER.DASHBOARD,
        label: 'Dashboard',
        icon: <IconDashBoard />,
    },
    {
        link: PATH_USER.HOTEL,
        label: 'Quản lý đơn hàng',
        icon: <IconBusiness width={18} height={18} />,
    },

    // {
    //     link: PATH_USER.HOTEL,
    //     label: 'Khách sạn',
    //     icon: <IconHotel width={18} height={18} />,
    // },
    //
    // {
    //     link: PATH_USER.FLIGHT,
    //     label: 'Vé máy bay',
    //     icon: <IconFlight width={13} height={15} />,
    // },
    // {
    //     link: PATH_USER.COMBO,
    //     label: 'Combo',
    //     icon: <IconDonggia width={13} height={15} />,
    // },
    // {
    //     link: PATH_USER.COUPON,
    //     label: 'Coupon của bạn',
    //     icon: <IconCoupon />,
    // },
    {
        link: PATH_USER.VOUCHER,
        label: 'Voucher của bạn',
        icon: <IconCoupon />,
    },
    {
        link: PATH_USER.ACTIVITY,
        label: 'Hoạt động gần đây',
        icon: <IconActivity />,
    },
    {
        link: PATH_USER.REVIERW,
        label: 'Quản lý đánh giá',
        icon: <IconMyReview />,
    },
    {
        link: `${process.env.NEXT_PUBLIC_SSO_URL}/profile`,
        openNewTab: true,
        label: 'Thông tin cá nhân',
        icon: <IconUser />,
    },
    {
        link: PATH_USER.CARD,
        label: 'Thẻ thành viên',
        icon: (
            <svg width={16} height={16} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <path fill="#595959" d="m60 211h30v30h-30z" />
                <path fill="#595959" d="m120 211h30v30h-30z" />
                <path fill="#595959" d="m180 211h30v30h-30z" />
                <path fill="#595959" d="m60 271h150v30h-150z" />
                <path fill="#595959" d="m60 331h150v30h-150z" />
                <path fill="#595959" d="m392 211h-152v150h152zm-30 120h-92v-90h92z" />
                <path
                    fill="#595959"
                    d="m60 121h-60v330h452v-60h60v-330h-452zm362 300h-392v-270h392zm60-330v270h-30v-240h-362v-30z"
                />
            </svg>
        ),
    },
]

export const NAVBAR_PROFILE = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: PATH_USER.DASHBOARD,
        activeWith: [PATH_USER.DASHBOARD],
    },
    {
        key: 'my_voucher',
        label: 'Voucher của bạn',
        path: PATH_USER.VOUCHER,
        activeWith: [PATH_USER.VOUCHER, PATH_USER.VOUCHER_DETAIL, PATH_USER.COUPON],
    },
    {
        key: 'my_order',
        label: 'Quản lý đơn hàng',
        path: PATH_USER.HOTEL,
        activeWith: [PATH_USER.HOTEL, PATH_USER.FLIGHT, PATH_USER.HOTEL_DETAIL],
    },
    {
        key: 'review',
        label: 'Đánh giá',
        path: PATH_USER.REVIERW,
        activeWith: [PATH_USER.REVIERW],
    },
    {
        key: 'member_card',
        label: 'Thẻ thành viên',
        path: PATH_USER.CARD,
        activeWith: [PATH_USER.CARD],
    },
]

export const SIDEBAR_PROFILE = [
    {
        key: 'member_card',
        label: 'Thẻ thành viên',
        path: PATH_USER.CARD,
        icon: () => (
            <svg width={16} height={16} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <path fill="#595959" d="m60 211h30v30h-30z" />
                <path fill="#595959" d="m120 211h30v30h-30z" />
                <path fill="#595959" d="m180 211h30v30h-30z" />
                <path fill="#595959" d="m60 271h150v30h-150z" />
                <path fill="#595959" d="m60 331h150v30h-150z" />
                <path fill="#595959" d="m392 211h-152v150h152zm-30 120h-92v-90h92z" />
                <path
                    fill="#595959"
                    d="m60 121h-60v330h452v-60h60v-330h-452zm362 300h-392v-270h392zm60-330v270h-30v-240h-362v-30z"
                />
            </svg>
        ),
    },
]

export const DEAL_FILTER_BY_PERCENT = [
    {
        value: '10',
        label: 'Dưới 10%',
        checked: false,
    },
    {
        value: '10_20',
        label: '10% - 20%',
        checked: false,
    },
    {
        value: '20_30',
        label: '20% - 30%',
        checked: false,
    },
    {
        value: '30_40',
        label: '30% - 40%',
        checked: false,
    },
    {
        value: '40',
        label: 'Trên 40%',
        checked: false,
    },
]

export const DEAL_FILTER_BY_PRICE = [
    {
        value: '0-500k',
        label: 'Dưới 500000 ₫',
        checked: false,
    },
    {
        value: '500k-1m',
        label: '500.000 ₫ – 1.000.000 ₫',
        checked: false,
    },
    {
        value: '1m-2m',
        label: '1.000.000 ₫ – 2.000.000 ₫',
        checked: false,
    },
    {
        value: '2m',
        label: 'Trên 2000000 ₫',
        checked: false,
    },
]

export const BANK: Bank = {
    code: '',
    display_name: 'Chọn ngân hàng',
    icon: '',
    id: 0,
    short_name: '',
    transfer_name: '',
}

export const BANK_BRANCH: BankBranch = {
    id: 0,
    bank_id: 0,
    code: '',
    name: 'Chọn chi nhánh',
    province_id: 92,
}
