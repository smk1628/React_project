import React, { Component } from 'react'
import { Menu } from 'antd';
import {
    HomeOutlined,
    AppstoreOutlined,
    ToolOutlined,
    UnorderedListOutlined,
    UserOutlined,
    SafetyOutlined,
    LineChartOutlined,
    BarChartOutlined,
    AreaChartOutlined,
    PieChartOutlined
  } from '@ant-design/icons';
const { SubMenu } = Menu;

export default class left_nav extends Component {
    
    render() {
        return (
            <Menu theme="dark" defaultSelectedKeys={['home']} defaultOpenKeys={['prod','pic']} mode="inline">
                <Menu.Item key="home" icon={<HomeOutlined />}>
                    首页
                </Menu.Item>
                <SubMenu key="prod" icon={<AppstoreOutlined />} title="商品">
                    <Menu.Item icon={<UnorderedListOutlined />} key="sort">分类管理</Menu.Item>
                    <Menu.Item icon={<ToolOutlined />} key="goods">商品管理</Menu.Item>
                </SubMenu>
                <Menu.Item key="user" icon={<UserOutlined />}>
                    用户管理
                </Menu.Item>
                <Menu.Item key="role" icon={<SafetyOutlined />}>
                    角色管理
                </Menu.Item>
                <SubMenu key="pic" icon={<AreaChartOutlined />} title="图像图表">
                    <Menu.Item icon={<BarChartOutlined />} key="bar">柱状图</Menu.Item>
                    <Menu.Item icon={<LineChartOutlined />} key="line">折线图</Menu.Item>
                    <Menu.Item icon={<PieChartOutlined />} key="pie">饼图</Menu.Item>
                </SubMenu>
            </Menu>
        )
    }
}
