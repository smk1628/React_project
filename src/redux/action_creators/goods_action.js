import { SAVE_GOODS_LIST } from '../action_types'

//创建一个 saveGoodsAction 
export const saveGoodsAction = value =>({type:SAVE_GOODS_LIST,data:value})