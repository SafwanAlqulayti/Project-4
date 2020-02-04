
import { LOGOUT_SUCCESS, AUTH_ERROR, GET_BOOKS, ADD_BOOK, DELETE_BOOK, BOOKS_LOADING, UPDATE_BOOK, ADD_FAILED, GET_BOOK  } from '../actions/types'
const initialState = {
    books: [],
    loading: false,
    selectedBook: null
}

export default function (state = initialState, action) {
    switch (action.type) {

        case GET_BOOKS:
            return {
                ...state,
                books: action.payload,
                loading: false
            };

        // the three dots means everything in the state


        case ADD_BOOK:
            return {
                ...state,
                books: [action.payload, ...state.items]
            }


        case DELETE_BOOK:

            return {
                ...state,
                books: state.items.filter(book => book._id !== action.payload)
            }

        case UPDATE_BOOK:
            return {
                ...state,

            }

        case BOOKS_LOADING:
            return {
                ...state,
                loading: true
            }

            case ADD_FAILED:
                return{
                    ...state
                }

            case GET_BOOK:
                return{
                    ...state,
                    selectedBook: action.payload
                }
 


        default: return state
    }
}