import React from 'react'
import { deleUserInfoAction } from '../../redux/action_creators/login_action'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
class Admin extends React.Component{
    outLogin = ()=>{
        this.props.deleUserInfo()
    }

    render(){
        const {user,isLogin} = this.props.userInfo
        //console.log(this)
        if(!isLogin){
            return <Redirect to="/login" />
        }else{
            return (
                <>
                    <h2>Admin界面</h2>
                    <p>欢迎：{user.username}</p>
                    <p>状态：{isLogin? '已登录':'异常'}</p>
                    <button onClick={this.outLogin}>退出登录</button>
                </>
            )
        }
        
    } 
}

export default connect(
    state =>({userInfo:state.userInfo}),
    {
        deleUserInfo:deleUserInfoAction
    }
)(Admin)
