export default function reducer(state = {}, action: { type: string; payload: any }) {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, isLoading: action.payload }
        case 'TOGGLE_SIDE_BAR_MOBILE':
            return { ...state, isOpenSideBar: action.payload }
        case 'SET_SEARCH_DATA':
            return { ...state, searchData: action.payload }
        case 'SET_DATE_PICKER_CHECK_IN':
            return { ...state, datePickerCheckIn: action.payload }
        case 'SET_DATE_PICKER_CHECK_OUT':
            return { ...state, datePickerCheckOut: action.payload }
        case 'SET_VALIDATE_AUTO_COMPLETE':
            return { ...state, validateAutoComplete: action.payload }
        case 'SET_INPUT_VALUE_SEARCH_BOX':
            return { ...state, inputValue: action.payload }
        case 'SET_LIST_REGION_SEARCH_BOX':
            return { ...state, listRegionsSearchBox: action.payload }
        case 'SET_LIST_HOTEL_SEARCH_BOX':
            return { ...state, listHotelsSearchBox: action.payload }
        case 'SET_REFRESH_TIME':
            return { ...state, refreshTime: action.payload }
        case 'SET_CURRENCY':
            return { ...state, currency: action.payload }
        case 'TOGGLE_POPUP_BY_DEAL':
            return { ...state, isOpenPopupByDeal: action.payload }
        case 'SET_STEP_BUY_DEAL':
            return { ...state, stepBuyDeal: action.payload }
        case 'SET_IS_OPEN_FILTER_DEAL':
            return { ...state, isOpenFilterDeal: action.payload } // mobile
        case 'SET_IS_OPEN_SORT_DEAL':
            return { ...state, isOpenSortDeal: action.payload } // mobile
        case 'SHOW_COUNT_DOWN_60S':
            return { ...state, isShowCd60s: action.payload }
        case 'SET_TIME_LEFT_COUNT_DOWN':
            return { ...state, timeLeftCd: action.payload }
        case 'SET_OPEN_SEARCH_BOX_HUNT':
            return { ...state, isOpenSearchBoxHunt: action.payload }
        case 'SET_LOADING_SIGN_IN':
            return { ...state, isLoadingSignIn: action.payload }
        default:
            return state
    }
}
