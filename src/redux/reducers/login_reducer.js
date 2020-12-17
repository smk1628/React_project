import { SAVE_USER_INFO,DELE_USER_INFO } from '../action_types'
let user = localStorage.getItem('user')
let token = localStorage.getItem('token')
//console.log(user)
let initState = {
    user:JSON.parse(user) || '',
    token:token || '',
    isLogin:user? true:false
}

export default function operaUserInfo(preState=initState,action) {
    
    let {type,data} = action
    let newData = preState
    switch (type) {
        case SAVE_USER_INFO:
            console.log('data',action)
            newData = {user:data.data,isLogin:true,token:data.token}
            return newData
        case DELE_USER_INFO:
            newData = {user:'',isLogin:false,token:''}
            return newData
        default:
            return preState
    }
}