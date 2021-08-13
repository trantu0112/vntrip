import { ValidationForm } from '../../constants/interface'

export const setLoading = (isLoading: boolean) => ({
    type: 'SET_LOADING',
    payload: isLoading,
})

export const toggleSidearMobile = (isOpen: boolean) => ({
    type: 'TOGGLE_SIDE_BAR_MOBILE',
    payload: isOpen,
})

export const setSearchData = (data: any) => ({
    type: 'SET_SEARCH_DATA',
    payload: data,
})

export const setDatePickerCheckIn = (date: Date) => ({
    type: 'SET_DATE_PICKER_CHECK_IN',
    payload: date,
})

export const setDatePickerCheckOut = (date: Date) => ({
    type: 'SET_DATE_PICKER_CHECK_OUT',
    payload: date,
})

export const setValidateAutoComplete = (data: ValidationForm) => ({
    type: 'SET_VALIDATE_AUTO_COMPLETE',
    payload: data,
})

export const setInputValue = (inputValue: string) => ({
    type: 'SET_INPUT_VALUE_SEARCH_BOX',
    payload: inputValue,
})

export const setListRegionSearchBox = (regions: any[]) => ({
    type: 'SET_LIST_REGION_SEARCH_BOX',
    payload: regions,
})

export const setListHotelSearchBox = (hotels: any[]) => ({
    type: 'SET_LIST_HOTEL_SEARCH_BOX',
    payload: hotels,
})

export const setRefreshTime = (time: number) => ({
    type: 'SET_REFRESH_TIME',
    payload: time,
})

export const setCurrency = (curr: 'VND' | 'USD') => ({
    type: 'SET_CURRENCY',
    payload: curr,
})

export const togglePopupByDeal = (isOpen: boolean) => ({
    type: 'TOGGLE_POPUP_BY_DEAL',
    payload: isOpen,
})

export const setStepByDeal = (step: 1 | 2 | 3) => ({
    type: 'SET_STEP_BUY_DEAL',
    payload: step,
})

export const toggleFilterDeal = (isOpen: boolean) => ({
    type: 'SET_IS_OPEN_FILTER_DEAL',
    payload: isOpen,
})

export const toggleSortDeal = (isOpen: boolean) => ({
    type: 'SET_IS_OPEN_SORT_DEAL',
    payload: isOpen,
})

export const showCountDown60s = (isShow: boolean) => ({
    type: 'SHOW_COUNT_DOWN_60S',
    payload: isShow,
})

export const setTimeLeftCountDown = (number: number) => ({
    type: 'SET_TIME_LEFT_COUNT_DOWN',
    payload: number,
})

export const setOpenSearchBoxHunt = (isOpen: boolean) => ({
    type: 'SET_OPEN_SEARCH_BOX_HUNT',
    payload: isOpen,
})

export const setLoadingSignIn = (isLoading: boolean) => ({
    type: 'SET_LOADING_SIGN_IN',
    payload: isLoading,
})
