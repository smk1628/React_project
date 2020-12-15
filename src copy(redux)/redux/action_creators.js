import { DECREMENT,INCREMENT } from './action_types'
export const incrementAction = value =>({type:INCREMENT,data:value})  //专门用来加工action的函数
export const decrementAction = value =>({type:DECREMENT,data:value})

