import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu,message } from 'antd';
import * as Icon from '@ant-design/icons'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { saveTitleAction } from '../../../redux/action_creators/header_action.js'
import { navArr,getAllKey } from '../../../siderNavConfig'
import { DEF_ADMIN } from '../../../config'
import { reqGetRoleById } from '../../../api'
const { SubMenu } = Menu;
@connect(
    state=>({userInfo:state.userInfo}),
    {
        saveTitle:saveTitleAction
    }
)
@withRouter
 class left_nav extends Component {
     /* 生成侧边导航 */
     state={
         roleAuth:[]
     }
    createNav = (target,keys)=>{
        if(Array.isArray(keys)){
            return target.map((item)=>{
                if(!item.children && keys.includes(item.key)){
                    return (
                        <Menu.Item key={item.key} icon={React.createElement(Icon[item.icon])} onClick={()=>{this.props.saveTitle(item.title)}}>
                            <Link to={item.to}>{item.title}</Link>
                        </Menu.Item>
                    )
                }else if(item.children && keys.includes(item.key)){
                    return(
                        <SubMenu key={item.key} icon={React.createElement(Icon[item.icon])} title={item.title}>
                                {this.createNav(item.children,keys)}
                        </SubMenu>
                    )
                }else{
                    return ''
                } 
        })
        }
    }
    /* 根据用户权限动态生成侧边导航 及admin用户自动获取所有权限 */
    doCreateNav = (name,authArr=[])=>{  //传入用户名及权限数组
        if(name === DEF_ADMIN){
            return this.createNav(navArr,getAllKey(navArr))
        }
        console.log(authArr)
        return this.createNav(navArr,authArr)
    }
    getRoleAuth = async()=>{
        const {username,role } = this.props.userInfo.user
        console.log(username)
        if(username !== DEF_ADMIN){
            const{status,data} = await reqGetRoleById({_id:role})
            if(status ===0) {
                console.log(data.auth)
                this.setState({roleAuth:data.auth})
            }else{
                message.error('角色权限获取失败，请重新登录！')
            }
        }
        
    }
    UNSAFE_componentWillMount(){
        this.getRoleAuth()
    }
    render() {
        const {username} = this.props.userInfo.user
        const {roleAuth} = this.state
        let path = this.props.location.pathname.split('/').reverse()
        let selectedKey =  path.indexOf('goods') === -1 ? path[0]:'goods'
        return (
            <Menu theme="dark" selectedKeys={[selectedKey]} defaultOpenKeys={path} mode="inline">
                {
                    this.doCreateNav(username,roleAuth)
                }
            </Menu>
        )
    }
}
export default left_nav