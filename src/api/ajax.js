import axios from 'axios'
import {message} from 'antd'
import nprogress from 'nprogress'
import store from '../redux/store'
import qs from 'querystring'
import 'nprogress/nprogress.css'
const instance = axios.create({
    timeout:10000,
})

//请求拦截器
instance.interceptors.request.use((config)=>{
    const {token} = store.getState().userInfo
    if(token) config.headers.Authorization = token  //在请求头添加Authorization来携带token，进行服务器验证
    nprogress.configure({showSpinner:false})
    nprogress.start()   //加载进度条
   
    //console.log(config)
    const { method,data } = config

    //若是post请求
    if(method.toLocaleLowerCase() === 'post'){
        //若传递过来的参数是对象
        if(data instanceof Object){
            config.data = qs.stringify(data)
        }
    }

    return config
})

//响应拦截器
instance.interceptors.response.use(
    (response)=>{
        //若成功
        nprogress.done()
        if(response.data.status === 10001){
            setTimeout(()=>{
                window.localStorage.clear()
                window.location.reload()
                return
            },2000)
        }
        return response.data;
    },
    (error)=>{  //处理失败的请求
        //若失败
        nprogress.done()
        if(error.message === 'Network Error') error.message = '网络未连接'
        message.error(error.message,1)  //弹出为时一秒的错误提示
        return new Promise(()=>{})  //传递一个pendding 状态的promise，中断错误传递
    }
)

export default instance