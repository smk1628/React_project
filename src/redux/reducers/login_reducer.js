import { SAVE_USER_INFO,DELE_USER_INFO } from '../action_types'
let user = localStorage.getItem('user')
//console.log(user)
let initState = {
    user:JSON.parse(user) || '',
    isLogin:user? true:false
}

export default function operaUserInfo(preState=initState,action) {
    let {type,data} = action
    let newData = preState
    switch (type) {
        case SAVE_USER_INFO:
            newData = {user:data,isLogin:true}
            return newData
        case DELE_USER_INFO:
            newData = {user:'',isLogin:false}
            return newData
        default:
            return preState
    }
}