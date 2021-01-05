import { SAVE_CATEGORY_LIST } from '../action_types'
let initState = []

export default function operaCategory(preState=initState,action) {
    let {type,data} = action
    let newData = preState
    switch (type) {
        case SAVE_CATEGORY_LIST:
            newData = data
            return newData
        default:
            return preState
    }
}