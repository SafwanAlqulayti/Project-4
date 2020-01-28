
import { GET_BOOKS, ADD_BOOK, DELETE_BOOK, BOOKS_LOADING, UPDATE_BOOK,  } from '../actions/types'
const initialState = {
    books: [],
    loading: false
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


        default: return state
    }
}