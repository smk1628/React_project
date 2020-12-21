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
    createNav = (target)=>{
        return target.map((item)=>{
            if(!item.children ){
                return (
                    <Menu.Item key={item.key} icon={React.createElement(Icon[item.icon])} onClick={()=>{this.props.saveTitle(item.title)}}>
                        <Link to={item.to}>{item.title}</Link>
                    </Menu.Item>
                )
            }else{
                return(
                    <SubMenu key={item.key} icon={React.createElement(Icon[item.icon])} title={item.title}>
                            {this.createNav(item.children)}
                    </SubMenu>
                )
            }
        })
    }
    render() {
        console.log(this.props.location.pathname)
        let path = this.props.location.pathname.split('/').reverse()
        let defaultSelectedKey =  path[0]
        return (
            <Menu theme="dark" defaultSelectedKeys={[defaultSelectedKey]} defaultOpenKeys={path} mode="inline">
                {
                    this.createNav(navArr)
                }
            </Menu>
        )
    }
}
export default left_nav