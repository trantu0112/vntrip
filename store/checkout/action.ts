export const setBookerData = (data: any) => ({
    type: 'SET_BOOKER_DATA',
    payload: data,
})

export const setReceiverData = (data: any) => ({
    type: 'SET_RECEIVER_DATA',
    payload: data,
})

export const setBookerDataRoot = (data: any) => ({
    type: 'SET_BOOKER_DATA_ROOT',
    payload: data,
})

export const setReceiverDataRoot = (data: any) => ({
    type: 'SET_RECEIVER_DATA_ROOT',
    payload: data,
})

export const setOpenCheckoutHotelInfo = (isOpen: any) => ({
    type: 'SET_OPEN_CHECKOUT_HOTEL_INFO',
    payload: isOpen,
})

export const setOpenPopupChangeRoom = (isOpen: any) => ({
    type: 'SET_OPEN_POPUP_CHANGE_ROOM',
    payload: isOpen,
})

export const setOpenPopupChangePerson = (isOpen: any) => ({
    type: 'SET_OPEN_POPUP_CHANGE_PERSON',
    payload: isOpen,
})

export const setCustomerNote = (note: string) => ({
    type: 'SET_CUSTOMER_NOTE',
    payload: note,
})

export const setPaymemtMethodSelected = (paymentMethod: string) => ({
    type: 'SET_PAYMENT_METHOD_SELECTED',
    payload: paymentMethod,
})
export const setListPaymentMethodReducer = (listPaymentMethod: []) => ({
    type: 'SET_LIST_PAYMENT_METHOD',
    payload: listPaymentMethod,
})

export const setCouponCode = (couponCode: string) => ({
    type: 'SET_COUPON_CODE',
    payload: couponCode,
})

export const setCouponInfo = (info: any) => ({
    type: 'SET_COUPON_INFO',
    payload: info,
})

export const validateBookerData = (data: any) => ({
    type: 'VALIDATE_BOOKER_DATA',
    payload: data,
})
