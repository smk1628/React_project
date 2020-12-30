import ajax from './ajax'
import { message } from 'antd'
import { BASE_URL,WEATHER } from '../config'
export const reqLogin = data => ajax.post(`${BASE_URL}/login`, data)
export const checkUser = data => ajax.post(`${BASE_URL}/checkUser`,data)
export const Weather = async () => {
    
    const result = await ajax.get(`${WEATHER.URL}?city=${WEATHER.CITY}`)
    //console.log(result)
    if(result.status === 1000 && result.desc === 'OK'){
        return Promise.resolve({
            city: result.data.city,
            type: result.data.forecast[0].type,
            high: result.data.forecast[0].high,
            low: result.data.forecast[0].low
        })
    }else{
        message.error('无法获得当前所在城市的天气信息！',6)
    }
    
}
/* 获取分类 */
export const getCategory =()=> ajax.post(`${BASE_URL}/category/list`)
/* 添加分类 */
export const addCategory = data => ajax.post(`${BASE_URL}/category/add`,data)
/* 修改分类 */
export const updateCategory = data => ajax.post(`${BASE_URL}/category/update`,data)
/* 获取商品 */
export const getGoods = (CurrentPage, pageSize) => ajax.get(`${BASE_URL}/goods/list`,{params:{CurrentPage, pageSize}})
/* 修改商品状态 */
export const updateGoodsStatus= (_id,status) => ajax.post(`${BASE_URL}/goods/update_status`,{_id,status})
/* 获取搜索商品 */
export const getSearchGoods= (CurrentPage, pageSize,searchType,keyWord) => ajax.get(`${BASE_URL}/goods/search`,{params:{CurrentPage, pageSize,[searchType]:keyWord}})