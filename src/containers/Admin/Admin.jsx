import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Layout } from 'antd';
import { checkUser } from '../../api'
import Header from './header/header'
const   { Footer, Sider, Content } = Layout;
@connect(
    state =>({userInfo:state.userInfo})
)
class Admin extends React.Component{
    

    demo = async ()=>{
        let result = await checkUser()
        console.log(result)
    }
    render(){
        const {isLogin} = this.props.userInfo
        if(!isLogin){
            return <Redirect to="/login" />
        }else{
            return (
                // <>
                //     <h2>Admin界面</h2>
                //     <p>欢迎：{user.username}</p>
                //     <p>状态：{isLogin? '已登录':'异常'}</p>
                    
                //     <button onClick={this.demo}>点击验证token</button>
                // </>
                <Layout style={{height:"100%"}}>
                    <Sider>Sider</Sider>
                    <Layout>
                        <Header/>
                        <Content>Content</Content>
                        <Footer>Footer</Footer>
                    </Layout>
                </Layout>
            )
        }
        
    } 
}

export default Admin
