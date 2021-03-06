import React from 'react'
import { Layout,Button } from 'antd';
import { FullscreenOutlined,FullscreenExitOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import dayjs from 'dayjs'
import screenfull from 'screenfull'
import { withRouter } from 'react-router-dom'
import {Weather} from '../../../api/index.js'
import { deleUserInfoAction } from '../../../redux/action_creators/login_action'
import { deleTitleAction } from '../../../redux/action_creators/header_action'
import './header.less'
import duoyun from '../../../static/imgs/duoyun.png'
import qing from '../../../static/imgs/qing.png'
import xue from '../../../static/imgs/xue.png'
import yin from '../../../static/imgs/yin.png'
import yu from '../../../static/imgs/yu.png'
import weizhi from '../../../static/imgs/weizhi.png'
import {navArr} from '../../../siderNavConfig'
const { Header } = Layout;

@connect(
    state =>({userInfo:state.userInfo,title:state.title}),
    {
        deleUserInfo:deleUserInfoAction,
        deleTitle:deleTitleAction
    }
)
@withRouter
class header extends React.Component{
    state = {
        isFull : null,
        time:dayjs().format('YYYY年MM月DD日 HH:mm:ss'),
        weather:{city:'',type:'',high:'',low:'',img:weizhi},
        title:''
    }
    outLogin = ()=>{
        this.props.deleUserInfo()
        this.props.deleTitle()
    }
    isScreenFull = ()=>{
        if (screenfull.isEnabled) {
            screenfull.toggle();
        }
    }
    getWeather = async ()=>{
        let weather = await Weather()
        //格式化天气
        if(weather){  
            weather = this.setWeatherData(weather)
            this.setState({weather})
        }     
    }
    setWeatherData = (weather)=>{
        let {city,type,high,low} = weather
        switch (type) {
            case '晴':
                return {city,type,high,low,img:qing}
            case '多云':
                return {city,type,high,low,img:duoyun}
            case '阴':
                return {city,type,high,low,img:yin}
            case '雪':
            case '小雪':
            case '中雪':
            case '大雪':
                return {city,type,high,low,img:xue}
            case '雨':
            case '小雨':
            case '中雨':
            case '大雨':
                return {city,type,high,low,img:yu}
            default:
                return {city,type,high,low,img:weizhi}
        }
    }
    getTitle=()=>{
        let { pathname } = this.props.location
        let pathKey = pathname.split('/').reverse()[0]
        if(pathname.indexOf('goods') !== -1) pathKey = 'goods'
        let title = ''
        navArr.forEach((item)=>{
            if(item.children instanceof Array){
                let tmp = item.children.find((citem)=>{
                    return citem.key === pathKey
                })
                if(tmp) title = tmp.title
            }else{
                if(pathKey === item.key) title = item.title
            }
        })
        this.setState({title})
    }
    componentDidMount(){
        //监听全屏
        if (screenfull.isEnabled) {
            screenfull.on('change', () => {
                this.setState({isFull:screenfull.isFullscreen})
            })
        }
        //设置时间
        this.getTime = setInterval(()=>{
            this.setState({time:dayjs().format('YYYY年MM月DD日 HH:mm:ss')})
        },1000)
        // //获取天气
         this.getWeather()
        //设置初始title
        this.getTitle()
    }
    componentWillUnmount(){
        clearInterval(this.getTime)
    }
    render(){
        const {user} = this.props.userInfo
        const { isFull,time} = this.state
        const { city,type,high,low,img } = this.state.weather
        return (
            <Header className="header">
                <div className="top">
                    <Button size="small" onClick={this.isScreenFull}>
                        {React.createElement(isFull? FullscreenExitOutlined:FullscreenOutlined)}
                    </Button>
                    <h1>欢迎：{user.username}</h1>
                    <span className="quit" onClick={this.outLogin}>退出登录</span>
                </div>
                <div className="bottom">
                    <div className="title">
                        <h1>{this.props.title || this.state.title}</h1>
                        <div className="tel"></div>
                    </div>
                    <div className="msg">
                        <span className="time">
                            {time}
                        </span>
                        <span className="weather">
                            <img src={img}  alt="weather"/>
                            {`${city} ${type} ${high}~${low}`}
                        </span>
                    </div>
                </div>
            </Header>
        )
    }
}

export default header