import { DECREMENT,INCREMENT } from '../action_types'

//创建一个同步的action用于增加
export const incrementAction = value =>({type:INCREMENT,data:value})  //专门用来加工action的函数
//创建一个同步的action用于减
export const decrementAction = value =>({type:DECREMENT,data:value})
//创建一个异步的action用于增加
export const incrementAsyncAction = (value,delay) =>{   //使用中间件异步分发数据
    return (dispatch)=>{
        setTimeout(() => {
            dispatch(incrementAction(value))
        }, delay);
    }
}

