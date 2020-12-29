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
export const getCategory =()=> ajax.post(`${BASE_URL}/category/list`)
export const addCategory = data => ajax.post(`${BASE_URL}/category/add`,data)
export const updateCategory = data => ajax.post(`${BASE_URL}/category/update`,data)