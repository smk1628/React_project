import { SAVE_TITLE } from '../action_types'
let initState = ''

export default function operaHeaderInfo(preState=initState,action) {
    
    let {type,data} = action
    let newData = preState
    switch (type) {
        case SAVE_TITLE:
            newData = data
            return newData
        default:
            return preState
    }
}