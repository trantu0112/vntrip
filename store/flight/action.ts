import { ValidationForm } from '../../constants/interface'

export const setOriginCode = (code: string) => ({
    type: 'SET_ORIGIN_CODE',
    payload: code,
})

export const setDestinCode = (code: string) => ({
    type: 'SET_DESTINATION_CODE',
    payload: code,
})

export const setValidateOrigin = (data: ValidationForm) => ({
    type: 'SET_VALIDATE_ORIGIN',
    payload: data,
})

export const setValidateDestin = (data: ValidationForm) => ({
    type: 'SET_VALIDATE_DESTINATION',
    payload: data,
})

export const setDepartDate = (date: Date) => ({
    type: 'SET_DEPARTURE_DATE',
    payload: date,
})

export const setReturnDate = (date: Date) => ({
    type: 'SET_RETURN_DATE',
    payload: date,
})

export const setAdultCount = (count: number) => ({
    type: 'SET_ADULT_COUNT',
    payload: count,
})

export const setChildCount = (count: number) => ({
    type: 'SET_CHILD_COUNT',
    payload: count,
})

export const setInfantCount = (count: number) => ({
    type: 'SET_INFANT_COUNT',
    payload: count,
})

export const setLeg = (leg: number) => ({
    type: 'SET_FLIGHT_LEG',
    payload: leg,
})

export const setOpenFilterMobile = (isOpen: boolean) => ({
    type: 'IS_OPEN_FILTER_MOBILE',
    payload: isOpen,
})

export const setOpenSortMobile = (isOpen: boolean) => ({
    type: 'IS_OPEN_SORT_MOBILE',
    payload: isOpen,
})

export const setOpenDateSlideMobile = (isOpen: boolean) => ({
    type: 'IS_OPEN_DATE_SLIDE_MOBILE',
    payload: isOpen,
})

export const setActionType = (type: number) => ({
    type: 'SET_ACTION_TYPE_FLIGHT',
    payload: type,
})

export const setDepartSelected = (data: any) => ({
    type: 'SET_DEPART_SELECTED',
    payload: data,
})

export const setReturnSelected = (data: any) => ({
    type: 'SET_RETURN_SELECTED',
    payload: data,
})

export const setFilterByProvider = (data: string[]) => ({
    type: 'SET_FILTER_BY_PROVIDER',
    payload: data,
})

export const setFilterByTime = (data: string[]) => ({
    type: 'SET_FILTER_BY_TIME',
    payload: data,
})

export const setSortFlight = (sortType: string) => ({
    type: 'SET_SORT_FLIGHT',
    payload: sortType,
})

export const setIncludeTaxAndFee = (isInclude: boolean) => ({
    type: 'SET_INCLUDE_TAX_AND_FEE',
    payload: isInclude,
})

export const setIsShowPriceEachPassenger = (isShow: boolean) => ({
    type: 'SET_IS_SHOW_PRICE_EACH_PASSENGER',
    payload: isShow,
})

export const setListPassenger = (data: any[]) => ({
    type: 'SET_LIST_PASSENGER',
    payload: data,
})
