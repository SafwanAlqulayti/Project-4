import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    BORROWER_LOADING,
    BORROWER_LOADED,
    GET_BORROWER

} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null,
    isAdmin: false,
    borrower: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            }

        case USER_LOADED:
            localStorage.setItem('useru', JSON.stringify(action.payload)) 

            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload,
                isAdmin: action.payload.isAdmin,

            }

        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token) //set it to local storage
            localStorage.setItem('useru', JSON.stringify(action.payload.user)) 
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isAdmin: action.payload.user.isAdmin,
                isLoading: false
            }
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem('token') //just in case.
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isAdmin: false,
                isLoading: false,
                borrower: null
            }
        case GET_BORROWER:
            return {

                ...state,
                borrower: action.payload


            }



        default: return state

    }
}