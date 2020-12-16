import { DEMO } from '../action_types'
let initState = 0

export default function operaDemo(preState=initState,action) {
    let {type,data} = action
    let newData = preState
    switch (type) {
        case DEMO:
            newData +=data
            return newData
    
        default:
            return preState
    }
}