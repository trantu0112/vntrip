export default function reducer(state = {}, action: { type: string; payload: any }) {
    switch (action.type) {
        case 'SET_ADULT_COUNT':
            return { ...state, adultCount: action.payload }
        case 'SET_CHILD_COUNT':
            return { ...state, childCount: action.payload }
        case 'SET_INFANT_COUNT':
            return { ...state, infantCount: action.payload }
        case 'SET_LIST_AIRPORT_RETURN':
            return { ...state, listAirPortReturn: action.payload }
        default:
            return state
    }
}
