import React from 'react'
import { Layout,Button } from 'antd';
import { FullscreenOutlined,FullscreenExitOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import dayjs from 'dayjs'
import { deleUserInfoAction } from '../../../redux/action_creators/login_action'
import screenfull from 'screenfull'
import './header.less'
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
        time:dayjs().format('YYYY年MM月DD日 HH:mm:ss')
    }
    outLogin = ()=>{
        this.props.deleUserInfo()
    }
    isScreenFull = ()=>{
        if (screenfull.isEnabled) {
            screenfull.toggle();
        }
    }
    componentDidMount(){
        if (screenfull.isEnabled) {
            screenfull.on('change', () => {
                this.setState({isFull:screenfull.isFullscreen})
            })
        }
        this.getTime = setInterval(()=>{
            this.setState({time:dayjs().format('YYYY年MM月DD日 HH:mm:ss')})
        },1000)
    }
    componentWillUnmount(){
        clearInterval(this.getTime)
    }
    render(){
        console.log(this.state)
        const {user} = this.props.userInfo
        let { isFull,time } = this.state
        return (
            <Header className="header">
                <div className="top">
                    <Button size="small" onClick={this.isScreenFull}>
                        <FullscreenOutlined style={{display:isFull? "none":"block",margin:0}}/>
                        <FullscreenExitOutlined style={{display:isFull? "block":"none",margin:0}}/>
                    </Button>
                    <h1>欢迎：{user.username}</h1>
                    <span className="quit" onClick={this.outLogin}>退出登录</span>
                </div>
                <div className="bottom">
                    <div className="title">
                        <h1>柱状图</h1>
                    </div>
                    <div className="msg">
                        <span className="time">
                            {time}
                        </span>
                        <span className="weather">
                            <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1055274977,4250161716&fm=26&gp=0.jpg"  alt="weather"/>
                            多云 温度：2 ~ -5
                        </span>
                    </div>
                </div>
            </Header>
        )
    }
}

export default header