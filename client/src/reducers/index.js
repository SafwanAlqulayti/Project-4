import {combineReducers} from 'redux'
import itemReducer from './itemReducer'
import errorReducer from './errorReducer'
import authReducer from './authReducer'
import bookReducer from './bookReducer'






export default combineReducers({
    item: itemReducer,
    book: bookReducer,
    error: errorReducer,
    auth: authReducer
})