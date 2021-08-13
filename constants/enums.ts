export enum ORDER_TYPE {
    HOTEL = 'hotel',
    FLIGHT = 'flight',
}

export enum PAYMENT_METHODS {
    PAYMENT_METHOD_INLAND_123PAY = 'payment_method_inland_123pay',
    PAYMENT_METHOD_GLOBAL_123PAY = 'payment_method_global_123pay',
    PAYMENT_METHOD_INLAND_NAPAS = 'payment_method_inland_napas',
    PAYMENT_METHOD_GLOBAL_NAPAS = 'payment_method_global_napas',
    PAYMENT_METHOD_UNION = 'payment_method_union',
    PAYMENT_METHOD_OTHER = 'payment_method_other',
    PAYMENT_METHOD_BANK_TRANSFER = 'payment_method_bank_transfer',
    PAYMENT_METHOD_PAY_AT_HOTEL = 'payment_method_pay_at_hotel',
    PAYMENT_METHOD_CREDIT_CARD = 'payment_method_credit_card',
    PAYMENT_METHOD_COD = 'payment_method_cod',
    PAYMENT_METHOD_DEBIT = 'payment_method_debit',
    PAYMENT_METHOD_ALL = 'payment_method_all',
    PAYMENT_METHOD_BITCOIN = 'payment_method_bitcoin',
    PAYMENT_METHOD_MOMO = 'payment_method_momo',
    PAYMENT_METHOD_AIRPAY = 'payment_method_airpay',
    PAYMENT_METHOD_MOMO_IN_APP = 'payment_method_momo_in_app',
    PAYMENT_METHOD_BANKPLUS = 'payment_method_bankplus',
    PAYMENT_METHOD_BANKPLUS_IN_APP = 'payment_method_bankplus_in_app',
    PAYMENT_METHOD_BOOK_FOR_ME = 'book_for_me',
    PAYMENT_METHOD_PAY_LATER_LFVN = 'payment_method_pay_later_lfvn',
}

export enum HOTEL_FILTER {
    FILTER_BY_PRICE = 'filter_by_price',
    FILTER_BY_STAR = 'filter_star_rates',
    FILTER_BY_CITY = 'filter_city_ids',
    FILTER_BY_AREA = 'filter_area_ids',
    FILTER_BY_FACILITY = 'filter_facility_ids',
    FILTER_BY_TYPE = 'filter_hotel_types',
    FILTER_BY_MIN_PRICE = 'filter_min_price',
    FILTER_BY_MAX_PRICE = 'filter_max_price',
    FILTER_BY_MIN_STAR = 'filter_min_star',
    FILTER_BY_MAX_STAR = 'filter_max_star',
}

export enum FlightActionType {
    DEPART = 0,
    RETURN = 1,
    FINISH = -1,
}

export enum ShowPriceType {
    BASE_NET = 'base_net',
    PRICE_HOTEL = 'price_hotel',
    TAX_AND_FEE = 'tax_and_fee',
    FINAL_PRICE = 'final_price',
    PROMOTION = 'promotion',
    MEMBER = 'member_discount',
    LOYALTY = 'loyalty_discount',
    MOBILE = 'mobile_rate',
    COUPON = 'discount_coupon',
}

export enum PASSENGER {
    ADT = 'ADT',
    CHD = 'CHD',
    INF = 'INF',
}

export enum DEAL_FILTER {
    BY_CATEGORY = 'categories',
    BY_TOPIC = 'subjects',
    BY_DESTINATION = 'filter_by_destination',
    BY_PRICE = 'price_range',
    BY_PERCENT = 'price_percent',
    BY_RATING = 'filter_by_rating',
}

export enum VERIFICATION_FEATURES {
    REGISTER = 'register',
    LOGIN = 'login',
    PROFILE_VERIFIED = 'profile_verified',
    RESET_PASSWORD = 'reset_password',
    FORGOT_PASSWORD = 'forgot_password',
}
