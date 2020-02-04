import {combineReducers} from 'redux'
import itemReducer from './itemReducer'
import errorReducer from './errorReducer'
import authReducer from './authReducer'
import bookReducer from './bookReducer'
import enquiryReducer from './enquiryReducer'




export default combineReducers({
    item: itemReducer,
    book: bookReducer,
    enquiry: enquiryReducer,
    error: errorReducer,
    auth: authReducer
})