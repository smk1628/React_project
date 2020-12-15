import counterReducer from './counter_reducer'
import personReducer from './person_reducer'
import { combineReducers } from 'redux'

//combineReducers 方法，接收一个对象作为参数
//对象中的key就是store中保存该状态的key

//store中保存流所有组件的状态，是一个一般对象，例如下面的格式
/* {
    key:xxxxx,
    key2:yyyyy,
    key3:zzzzz,
} */
export default combineReducers({
    counter:counterReducer,
    person:personReducer
})
//store 中保存的状态如下
/* {
    counter:0,
    person:[]
} */