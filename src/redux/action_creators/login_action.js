import {SAVE_USER_INFO,DELE_USER_INFO} from '../action_types'

//创建一个saveInfoAction
export const saveUserInfoAction = value =>{
    console.log(value)
    localStorage.setItem('user',JSON.stringify(value.data))
    localStorage.setItem('token',value.token)
    return {type:SAVE_USER_INFO,data:value}
}

//创建一个deleUserInfoAction

export const deleUserInfoAction = value =>{
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    return {type:DELE_USER_INFO}
}