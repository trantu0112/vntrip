export const setDataHeaderHotel = (data: any) => ({
    type: 'SET_DATA_HEADER_HOTEL',
    payload: data,
})

export const toggleSearchBoxMobile = (isOpen: any) => ({
    type: 'TOGGLE_SEARCH_BOX_MOBILE',
    payload: isOpen,
})

export const toggleViewHotelInMap = (isShow: boolean, latitude: any, longitude: any) => ({
    type: 'TOGGLE_VIEW_HOTEL_IN_MAP',
    payload: { isShow: isShow, latitude: latitude, longitude: longitude },
})

export const setIsShowFinalPriceHotel = (isShow: boolean) => ({
    type: 'SET_IS_SHOW_FINAL_PRICE_HOTEL',
    payload: isShow,
})

export const setPriceOneNight = (isPriceOneNight: boolean) => ({
    type: 'SET_PRICE_ONE_NIGHT',
    payload: isPriceOneNight,
})

// export const setDataSearchHotel = (data: {
//     checkIn: Date
//     checkOut: Date
//     nights: number
//     roomCount: number
//     adultCount: number
// }) => ({
//     type: 'SET_DATA_SEARCH_HOTEL',
//     payload: data,
// })

// data checIn, checkOut from datepicker, when change datepicker
export const setCheckInDatePickerHotel = (checkIn: Date) => ({
    type: 'SET_CHECK_IN_DATE_PICKER_HOTEL',
    payload: checkIn,
})
export const setCheckOutDatePickerHotel = (checkOut: Date) => ({
    type: 'SET_CHECK_OUT_DATE_PICKER_HOTEL',
    payload: checkOut,
})

// box update room hotel detail
export const setRoomCountHotel = (count: number) => ({
    type: 'SET_ROOM_COUNT_HOTEL',
    payload: count,
})

export const setAdultCountHotel = (count: number) => ({
    type: 'SET_ADULT_COUNT_HOTEL',
    payload: count,
})

export const setOpenFilterMobile = (isOpen: boolean) => ({
    type: 'IS_OPEN_FILTER_MOBILE',
    payload: isOpen,
})

export const setOpenSortMobile = (isOpen: boolean) => ({
    type: 'IS_OPEN_SORT_MOBILE',
    payload: isOpen,
})

export const setOpenUpdateRoom = (isOpen: boolean) => ({
    type: 'IS_OPEN_UPDATE_ROOM',
    payload: isOpen,
})

export const setMapCenter = (activeHotelId: number, latitude: number, longitude: number) => ({
    type: 'SET_MAP_CENTER',
    payload: { activeHotelId, latitude, longitude },
})

export const setListRoomStep1 = (listRoom: any[]) => ({
    type: 'SET_LIST_ROOM_STEP_1',
    payload: listRoom,
})

export const setLoadingRoomStep1 = (loadingRoom: boolean) => ({
    type: 'SET_LOADING_ROOM_STEP_1',
    payload: loadingRoom,
})
