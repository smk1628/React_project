import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd';
import navArr from '../../../siderNavConfig'
import * as Icon from '@ant-design/icons';
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { saveTitleAction } from '../../../redux/action_creators/header_action.js'
const { SubMenu } = Menu;
@connect(
    state=>({}),
    {
        saveTitle:saveTitleAction
    }
)
@withRouter
 class left_nav extends Component {
    createNav = (target,keys)=>{
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
    render() {
        console.log(this.props.location.pathname)
        let path = this.props.location.pathname.split('/').reverse()
        let selectedKey =  path.indexOf('goods') === -1 ? path[0]:'goods'
        return (
            <Menu theme="dark" selectedKeys={[selectedKey]} defaultOpenKeys={path} mode="inline">
                {
                    this.createNav(navArr,['home','prod_about','sort','goods','user','role','pic','bar','line','pie'])
                }
            </Menu>
        )
    }
}
export default left_nav