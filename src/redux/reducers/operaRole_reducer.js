import { SAVE_OPERAROLE } from '../action_types'
let initState = ''
export default function operaRole(preState=initState,action){
    let {type,data} = action
    let newData = preState
    switch (type) {
        case SAVE_OPERAROLE:
            newData = data
            return newData
        default:
            return preState
    }
}