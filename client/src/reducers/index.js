import {combineReducers} from 'redux'
//import itemReducer from './itemReducer' //for practice
import errorReducer from './errorReducer'
import authReducer from './authReducer'
import bookReducer from './bookReducer'
import enquiryReducer from './enquiryReducer'
import requestReducers from './requestReducers'
import addressReducers from './addressReducers'




export default combineReducers({
    //item: itemReducer, // was for practice 
    book: bookReducer,
    enquiry: enquiryReducer,
    request: requestReducers,
    error: errorReducer,
    //address:addressReducers,
    auth: authReducer
})