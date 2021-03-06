import ajax from './ajax'
import { message } from 'antd'
import { BASE_URL,WEATHER } from '../config'
/* 用户登录 */
export const reqLogin = data => ajax.post(`${BASE_URL}/login`, data)
/* 测试：token */
export const checkUser = data => ajax.post(`${BASE_URL}/checkUser`,data)
/* 获取天气 */
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
/* 根据id获取商品信息 */
export const getGoodsById= (id) => ajax.get(`${BASE_URL}/goods/get_by_id`,{params:{_id:id}})
/* 根据id获取商品所属分类 */
export const getCategoryById= (id) => ajax.get(`${BASE_URL}/category/get_by_id`,{params:{_id:id}})
/* 删除图片 */
export const deleteImageByName = name=> ajax.post(`${BASE_URL}/manage/img/delete`,{name})
/* 添加商品 */
export const addGoods = data => ajax.post(`${BASE_URL}/goods/add`,data)
/* 修改商品 */
export const updateGoods = data => ajax.post(`${BASE_URL}/goods/update`,data)
/* 添加角色 */
export const reqAddRole = data => ajax.post(`${BASE_URL}/role/add`,data)
/* 获取所有角色 */
export const reqGetRoles = () => ajax.get(`${BASE_URL}/role/list`)
/* 设置角色权限 */
export const reqSetAuth = data => ajax.post(`${BASE_URL}/role/auth`,data)
/* 获取用户列表 */
export const reqGetUsers = () => ajax.get(`${BASE_URL}/user/list`)
/* 添加用户 */
export const reqAddUser = data => ajax.post(`${BASE_URL}/user/add`,data)
/* 修改用户 */
export const reqUpdateUser = data => ajax.post(`${BASE_URL}/user/update`,data)
/* 删除用户 */
export const reqDeleUser = data =>ajax.post(`${BASE_URL}/user/dele`,data)
/* 删除用户 */
export const reqGetRoleById = data =>ajax.post(`${BASE_URL}/role/getAuthByID`,data)