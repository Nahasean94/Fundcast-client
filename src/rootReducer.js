import {combineReducers} from 'redux'
import flashMessages from './reducers/flashMessages'
import loginReducers from './reducers/loginReducers'
import commentsReducers from "./reducers/commentsReducers"
import adminLoginReducers from "./reducers/adminLoginReducers"

export default combineReducers({
    flashMessages,
    loginReducers,
    adminLoginReducers,
    commentsReducers
})
