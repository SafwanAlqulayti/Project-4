
import { GET_ALL_REQUESTS, GET_USER_REQUESTS, UPDATE_REQUEST, SUBMIT_REQUEST, REQUESTS_LOADING, LOGOUT_SUCCESS } from '../actions/types'
const initialState = {
    requests: [],
    loading: false,
}


export default function (state = initialState, action) {
    switch (action.type) {


        case REQUESTS_LOADING:
            return {
                ...state,
                loading: true
            }


            
        case GET_USER_REQUESTS:
            return {
                ...state,
                requests: action.payload,
                loading: false
            }

        case GET_ALL_REQUESTS:
            return {
                ...state,
                requests: action.payload,
                loading: false
            }

        case SUBMIT_REQUEST:
            return {
                ...state,
                requests: [action.payload, ...state.requests]
            }


        case UPDATE_REQUEST:
            return {
                ...state,

            }

        case LOGOUT_SUCCESS:
            return {
                ...state,
                requests: [],
            }

        default: return state
    }
}