import { INCREMENT,DECREMENT } from '../action_types'

let initState = 0
//用于操作数据的reducers
export default function operaCount(preState=initState,action){
    //console.log(preState,action)
    let {type,data} = action
    let newData = preState 
    switch (type) {
        case INCREMENT:
            newData += data
            //console.log(newData)
            return newData
        case DECREMENT:
            newData -= data
            return newData
        default:
            return preState //向外暴露old数据
    }
}