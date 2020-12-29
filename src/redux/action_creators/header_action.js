import { SAVE_TITLE,DELE_TITLE } from '../action_types'

//创建一个saveTitle的action
export const saveTitleAction = value =>({type:SAVE_TITLE,data:value})
//创建一个deleteTitle的action
export const deleTitleAction = () =>({type:DELE_TITLE})