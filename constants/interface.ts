export interface ValidationForm {
    status: 'success' | 'error' | 'warning' | 'validating' | undefined
    text: string
}

export interface ShowPriceHotel {
    promotion: {
        title: string
        discount_type: string
        discount_value: string
        incl_vat_fee_price: number
        excl_vat_fee_price: number
        order: number
        end_time: number // -1
        show: boolean
    }
    member_discount: {
        title: string //'SECRET_DEALS'
        discount_type: string
        discount_value: string
        incl_vat_fee_price: number
        excl_vat_fee_price: number
        order: number
        show: boolean
    }
    mobile_rate: {
        title: string //"MOBILE_RATE",
        discount_type: string
        discount_value: string
        incl_vat_fee_price: number
        excl_vat_fee_price: number
        order: number
        show: boolean
    }
    loyalty_discount: {
        title: string
        discount_type: string
        discount_value: string
        incl_vat_fee_price: number
        excl_vat_fee_price: number
        order: number
        show: boolean
    }
    discount_coupon: {
        title: string // ''
        discount_type: string
        discount_value: string
        incl_vat_fee_price: number
        excl_vat_fee_price: number
        order: number
        show: boolean
    }
    final_price: {
        title: string // 'Giá cuối'
        discount_type: string // 'PERCENT'
        incl_discount_value: number
        excl_discount_value: number
        incl_vat_fee_price: number
        excl_vat_fee_price: number
        order: number
        show: boolean
    }
}

export interface BedType {
    group_id: string // "0", "1", "2" ...
    bed_data: {
        count: string // "1"
        type: string // "Giường cỡ King (rộng 180 - 199cm)"
        description: string // ""
    }[]
}

export interface Booker {
    user_id: number
    first_name: string
    last_name: string
    email: string
    phone: string
    gender: number
    is_receiver?: boolean
    type?: 'person' | 'corporate' | 'affiliate'
    full_name?: string
}

export interface Receiver {
    key: number
    first_name: string
    last_name: string
    phone: string
    country_code: '84'
    name_status: 'success' | 'error' | 'warning' | 'validating' | undefined
    name_text: string
    phone_status: 'success' | 'error' | 'warning' | 'validating' | undefined
    phone_text: string
}

export interface HotelCheckout {
    hotelId: number
    hotelName: string
    hotelNameVi: string
    thumbImage: string
    starRate: number
    reviewCount?: number
    reviewPoint?: number
    fullAddress: string
    latitude?: number | string
    longitude?: number | string
    isDomestic: boolean
}

export interface RequestInvoice {
    order_id: number
    order_code: string
    order_token: string
    invoice_customer_tax_code: string
    invoice_company_name: string
    invoice_company_address: string
    note?: string
}

export interface Bank {
    code: string //"SCBLVNVX"
    display_name: string // "Ngân Hàng TNHH Một Thành Viên Standard Chartered (Việt Nam)"
    icon: string //"https://statics.vntrip.vn/images/bank-logo/scbank-logo.png"
    id: number // 5
    short_name: string //"Standard Chartered"
    transfer_name: string //"Ngan Hang TNHH Mot Thanh Vien Standard Chartered (Viet Nam)"
    updated_at?: Date //"2017-12-14T07:54:31.716Z"
    created_at?: Date //"2017-12-14T07:54:34.814Z"
}

export interface BankBranch {
    bank_id: number //101
    code: string // "10101001"
    id: number //1
    name: string // "NH NHA NUOC CN TINH LAO CAI"
    province_id: number //92
    updated_at?: Date //"2017-02-15T08:13:20.987Z"
    created_at?: Date // "2017-02-15T08:13:20.987Z"
}

export interface ComboVin {
    provinceId: number //1
    name: string
    image: string
    quantity: number
}
