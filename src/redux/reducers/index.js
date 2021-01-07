import { combineReducers } from 'redux'
import operaGoodsListReducer from './goods_reducer'
import operaUserInfoReducer from './login_reducer'
import operaHeaderInfoReducer from './header_reducer'
import operaCategoryListReducer from './category_reducer'
import operaRoleReducer from './operaRole_reducer'
export default combineReducers({
    userInfo:operaUserInfoReducer,
    title:operaHeaderInfoReducer, 
    goodsList:operaGoodsListReducer,
    categoryList:operaCategoryListReducer,
    operaRole:operaRoleReducer
})