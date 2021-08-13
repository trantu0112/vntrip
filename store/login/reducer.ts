export default function reducer(state = {}, action: { type: string; payload: any }) {
    switch (action.type) {
        case 'GET_COUNTRY_CODE':
            return { ...state, dataCountryCode: action.payload }
        default:
            return state
    }
}
