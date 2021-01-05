import { SAVE_GOODS_LIST } from '../action_types'
let initState = []

export default function operaGoods(preState=initState,action) {
    let {type,data} = action
    let newData = preState
    switch (type) {
        case SAVE_GOODS_LIST:
            newData = data
            return newData
        default:
            return preState
    }
}