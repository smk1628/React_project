import { SAVE_TITLE } from '../action_types'

//创建一个saveTitle的action
export const saveTitleAction = value =>({type:SAVE_TITLE,data:value})