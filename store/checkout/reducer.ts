export default function reducer(state = {}, action: { type: string; payload: any }) {
    switch (action.type) {
        case 'SET_BOOKER_DATA':
            return { ...state, bookerData: action.payload }
        case 'SET_RECEIVER_DATA':
            return { ...state, receiverData: action.payload }
        case 'SET_BOOKER_DATA_ROOT':
            return { ...state, bookerDataRoot: action.payload }
        case 'SET_RECEIVER_DATA_ROOT':
            return { ...state, receiverDataRoot: action.payload }
        case 'SET_OPEN_CHECKOUT_HOTEL_INFO':
            return { ...state, isOpenCheckoutHotelInfo: action.payload }
        case 'SET_OPEN_POPUP_CHANGE_ROOM':
            return { ...state, isOpenPopupChangeRoom: action.payload }
        case 'SET_OPEN_POPUP_CHANGE_PERSON':
            return { ...state, isOpenPopupChangePerson: action.payload }
        case 'SET_CUSTOMER_NOTE':
            return { ...state, customerNote: action.payload }
        case 'SET_PAYMENT_METHOD_SELECTED':
            return { ...state, paymentMethodSelected: action.payload }
        case 'SET_COUPON_CODE':
            return { ...state, couponCode: action.payload }
        case 'SET_COUPON_INFO':
            return { ...state, couponInfo: action.payload }
        case 'VALIDATE_BOOKER_DATA':
            return { ...state, validateBooker: action.payload }
        case 'SET_LIST_PAYMENT_METHOD':
            return { ...state, listPaymentMethod: action.payload }
        default:
            return state
    }
}
