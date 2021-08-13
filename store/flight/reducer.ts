export default function reducer(state = {}, action: { type: string; payload: any }) {
    switch (action.type) {
        case 'SET_ORIGIN_CODE':
            return { ...state, originCode: action.payload }
        case 'SET_DESTINATION_CODE':
            return { ...state, destinCode: action.payload }
        case 'SET_VALIDATE_ORIGIN':
            return { ...state, validateOrigin: action.payload }
        case 'SET_VALIDATE_DESTINATION':
            return { ...state, validateDestin: action.payload }
        case 'SET_DEPARTURE_DATE':
            return { ...state, departDate: action.payload }
        case 'SET_RETURN_DATE':
            return { ...state, returnDate: action.payload }
        case 'SET_ADULT_COUNT':
            return { ...state, adultCount: action.payload }
        case 'SET_CHILD_COUNT':
            return { ...state, childCount: action.payload }
        case 'SET_INFANT_COUNT':
            return { ...state, infantCount: action.payload }
        case 'SET_FLIGHT_LEG':
            return { ...state, leg: action.payload }
        case 'IS_OPEN_FILTER_MOBILE':
            return { ...state, isOpenFilterMobile: action.payload }
        case 'IS_OPEN_SORT_MOBILE':
            return { ...state, isOpenSortMobile: action.payload }
        case 'IS_OPEN_DATE_SLIDE_MOBILE':
            return { ...state, isOpenDateSlideMobile: action.payload }
        case 'SET_ACTION_TYPE_FLIGHT':
            return { ...state, actionType: action.payload }
        case 'SET_DEPART_SELECTED':
            return { ...state, departSelected: action.payload }
        case 'SET_RETURN_SELECTED':
            return { ...state, returnSelected: action.payload }
        case 'SET_FILTER_BY_PROVIDER':
            return { ...state, filterByProvider: action.payload }
        case 'SET_FILTER_BY_TIME':
            return { ...state, filterByTime: action.payload }
        case 'SET_SORT_FLIGHT':
            return { ...state, sortFlight: action.payload }
        case 'SET_INCLUDE_TAX_AND_FEE':
            return { ...state, isInclTaxAndFee: action.payload }
        case 'SET_IS_SHOW_PRICE_EACH_PASSENGER':
            return { ...state, isShowPriceEachPassenger: action.payload }
        case 'SET_LIST_PASSENGER':
            return { ...state, listPassenger: action.payload }
        default:
            return state
    }
}
