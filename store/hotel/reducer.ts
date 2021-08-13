export default function reducer(state = { isShowFinalPriceHotel: true }, action: { type: string; payload: any }) {
    switch (action.type) {
        case 'SET_DATA_HEADER_HOTEL':
            return { ...state, dataHeaderHotel: action.payload }
        case 'TOGGLE_SEARCH_BOX_MOBILE':
            return { ...state, isOpenSearchBoxMobile: action.payload }
        case 'TOGGLE_VIEW_HOTEL_IN_MAP':
            return { ...state, gMapDataHotel: action.payload }
        case 'SET_PRICE_ONE_NIGHT':
            return { ...state, isPriceOneNight: action.payload }
        case 'SET_CHECK_IN_DATE_PICKER_HOTEL':
            return { ...state, checkInHotel: action.payload }
        case 'SET_CHECK_OUT_DATE_PICKER_HOTEL':
            return { ...state, checkOutHotel: action.payload }
        case 'SET_ROOM_COUNT_HOTEL':
            return { ...state, roomCount: action.payload }
        case 'SET_ADULT_COUNT_HOTEL':
            return { ...state, adultCount: action.payload }
        case 'IS_OPEN_FILTER_MOBILE':
            return { ...state, isOpenFilterMobile: action.payload }
        case 'IS_OPEN_SORT_MOBILE':
            return { ...state, isOpenSortMobile: action.payload }
        case 'IS_OPEN_UPDATE_ROOM':
            return { ...state, isOpenUpdateRoom: action.payload }
        case 'SET_MAP_CENTER':
            return { ...state, mapCenter: action.payload }
        case 'SET_LIST_ROOM_STEP_1':
            return { ...state, listRoomStep1: action.payload }
        case 'SET_LOADING_ROOM_STEP_1':
            return { ...state, loadingRoomStep1: action.payload }
        default:
            return state
    }
}
