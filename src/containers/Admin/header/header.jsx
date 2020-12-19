import React from 'react'
import { Layout,Button } from 'antd';
import { FullscreenOutlined,FullscreenExitOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import dayjs from 'dayjs'
import {Weather} from '../../../api/index.js'
import { deleUserInfoAction } from '../../../redux/action_creators/login_action'
import screenfull from 'screenfull'
import './header.less'
import duoyun from '../../../static/imgs/duoyun.png'
import qing from '../../../static/imgs/qing.png'
import xue from '../../../static/imgs/xue.png'
import yin from '../../../static/imgs/yin.png'
import yu from '../../../static/imgs/yu.png'
import weizhi from '../../../static/imgs/weizhi.png'

const { Header } = Layout;

@connect(
    state =>({userInfo:state.userInfo}),
    {
        deleUserInfo:deleUserInfoAction
    }
)
class header extends React.Component{
    state = {
        isFull : null,
        time:dayjs().format('YYYY年MM月DD日 HH:mm:ss'),
        weather:{city:'',type:'',high:'',low:'',img:weizhi}
    }
    outLogin = ()=>{
        this.props.deleUserInfo()
    }
    isScreenFull = ()=>{
        if (screenfull.isEnabled) {
            screenfull.toggle();
        }
    }
    getWeather = async ()=>{
        return await Weather()  //定义weather变量
       
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
            case '雪' || '大雪' || '小雪' || '中雪':
                return {city,type,high,low,img:xue}
            case '雨' || '大雨' || '中雨' || '小雨':
                return {city,type,high,low,img:yu}
            default:
                return {city,type,high,low,img:weizhi}
        }
    }
    async componentDidMount(){
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

        //获取天气
        let weather = await this.getWeather()
        //console.log(weather)
        //格式化天气
        if(weather){  
            weather = this.setWeatherData(weather)
            this.setState({weather})
        }  
    }
    componentWillUnmount(){
        clearInterval(this.getTime)
    }
    render(){
        const {user} = this.props.userInfo
        let { isFull,time} = this.state
        let { city,type,high,low,img } = this.state.weather
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
                        <h1>柱状图</h1>
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