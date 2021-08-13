export const setListAirPortReturn = (listAirPortReturn: any) => ({
    type: 'SET_LIST_AIRPORT_RETURN',
    payload: listAirPortReturn,
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
