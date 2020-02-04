
import { GET_ALL_ENQUIRIES, GET_USER_ENQUIRIES, UPDATE_ENQUIRY, SUBMIT_ENQUIRY, ENQUIRIES_LOADING, GET_ENQUIRY, LOGOUT_SUCCESS } from '../actions/types'
const initialState = {
    enquiries: [],
    loading: false,
    selectedEnquiry: null //from the list
}


export default function (state = initialState, action) {
    switch (action.type) {


        case ENQUIRIES_LOADING:
            return {
                ...state,
                loading: true
            }


        case GET_USER_ENQUIRIES:
            return {
                ...state,
                enquiries: action.payload,
                loading: false
            }

        case GET_ALL_ENQUIRIES:
            return {
                ...state,
                enquiries: action.payload,
                loading: false
            }

        case SUBMIT_ENQUIRY:
            return {
                ...state,
                enquiries: [action.payload, ...state.enquiries]
            }


        case UPDATE_ENQUIRY:
            return {
                ...state,

            }

        case LOGOUT_SUCCESS:
            return {
                ...state,
                enquiries: [],
                selectedEnquiry:null
            }

            case GET_ENQUIRY:
                return{
                    ...state,
                    selectedEnquiry: action.payload
                }
 
        default: return state
    }
}