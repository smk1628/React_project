import { combineReducers } from 'redux'
import demoReducer from './demo_reducer'
import operaUserInfoReducer from './login_reducer'
import operaHeaderInfoReducer from './header_reducer'
export default combineReducers({
    demo:demoReducer,
    userInfo:operaUserInfoReducer,
    title:operaHeaderInfoReducer
})