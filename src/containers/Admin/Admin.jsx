import React from 'react'
import { connect } from 'react-redux'
import { Redirect,Switch,Route } from 'react-router-dom'
import { Layout } from 'antd';
//import { checkUser } from '../../api'
import Header from './header/header'
import Home from '../home/home';
import Goods from '../goods/goods'
import Sort from '../sort/sort'
import User from '../user/user'
import Role from '../role/role'
import Bar from '../bar/bar'
import Line from '../line/line'
import Pie from '../pie/pie'
import Detail from '../goods/detail/detail'
import Modify from '../goods/modify/modify'
import LeftNav from './left_nav/left_nav'
import logo from '../../static/imgs/logo.png'
import './css/Admin.less'
const {  Content, Footer, Sider } = Layout;
@connect(
    state =>({userInfo:state.userInfo})
)
class Admin extends React.Component{
    state = {
        collapsed: false,
      }
    onCollapse = collapsed => {
    //console.log(collapsed);
    this.setState({ collapsed });
    }


    // demo = async ()=>{
    //     let result = await checkUser()
    //     console.log(result)
    // }
    render(){
        // this.demo()
        const { collapsed } = this.state;
        const {isLogin} = this.props.userInfo
        if(!isLogin){
            return <Redirect to="/login" />
        }else{
            return (
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider className="sider"  collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                        <div className="logo">
                           <img src={logo} alt="logo"/>
                           <h1 className={collapsed? 'hidden':'show'}>后台管理系统</h1>
                        </div>
                        <LeftNav/>
                    </Sider>
                    <Layout style={{background: "rgb(225,233,220)"}}>
                        <Header/>
                        <Content style={{ margin: '35px 30px 0px 30px ',background:"#fff",minWidth:800}}>
                            <Switch>
                                <Route path="/admin/home" component={Home} />
                                <Route path="/admin/prod_about/goods" component={Goods} exact/>
                                <Route path="/admin/prod_about/goods/detail/:id" component={Detail}/>
                                <Route path="/admin/prod_about/goods/modify/:id" component={Modify}/>
                                <Route path="/admin/prod_about/sort" component={Sort}/>
                                <Route path="/admin/user" component={User}/>
                                <Route path="/admin/role" component={Role}/>
                                <Route path="/admin/pic/bar" component={Bar} />
                                <Route path="/admin/pic/line" component={Line} />
                                <Route path="/admin/pic/pie" component={Pie} />
                                <Redirect to="/admin/home" />
                            </Switch>
                        </Content>
                        <Footer style={{ textAlign: 'center',background: "rgb(225,233,220)"}}>Project ©2020 Created by Ant UED</Footer>
                    </Layout>
                </Layout>
            )
        }
        
    } 
}

export default Admin
