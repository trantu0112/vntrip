import { createStore, applyMiddleware, combineReducers } from 'redux'
import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import common from './common/reducer'
import hotel from './hotel/reducer'
import flight from './flight/reducer'
import login from './login/reducer'
import checkout from './checkout/reducer'
import combo from './combo/reducer'

const bindMiddleware = (middleware: any) => {
    // if (process.env.NODE_ENV !== 'production') {
    //     const { composeWithDevTools } = require('redux-devtools-extension')
    //     return composeWithDevTools(applyMiddleware(...middleware))
    // }
    return applyMiddleware(...middleware)
}

const combinedReducer = combineReducers({
    common,
    hotel,
    flight,
    login,
    checkout,
    combo,
})

const reducer = (state: any, action: { type: string; payload: any }) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            // ...action.payload, // apply delta from hydration/**/
        }
        if (state.count) nextState.count = state.count // preserve count value on client side navigation
        return nextState
    } else {
        return combinedReducer(state, action)
    }
}

const initStore = () => {
    return createStore(reducer, bindMiddleware([]))
}

export const wrapper = createWrapper(initStore)
