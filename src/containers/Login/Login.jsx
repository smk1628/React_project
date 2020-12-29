import React from 'react'
import './css/login.less'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { reqLogin } from '../../api/'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { saveUserInfoAction } from '../../redux/action_creators/login_action.js'

@connect(
    state => ({userInfo:state.userInfo}),
    {
        saveUserInfo: saveUserInfoAction
    }
)
class Login extends React.Component {
    render() {
        //console.log(this.props)
        const onFinish = async (values) => {
            if (values) {
                //console.log(values)  //values {username:xxxx,password:xxxx}
                let result = await reqLogin(values)
                let { status, msg } = result
                if (status === 0) {   //根据请求成功返回信息的status判断是否登陆成功
                    //保存用户信息到状态
                    this.props.saveUserInfo(result)
                    //跳转到admin页面
                    // this.props.history.replace('/admin/home')
                    return <Redirect to="/admin/home"/>
                } else {
                    message.warning(msg)
                }

            }
        }
        const onFinishFailed = () => {
            message.error("提交的表单有误！！")
        }
        if(this.props.userInfo.isLogin){
            return <Redirect to="/admin/home"/>
        }else{
            return (

                <div id="login">
                    <header>
                        <div className="logo"></div>
                        <h1>商品管理系统</h1>
                    </header>
                    <div id="form">
                        <h1>用户登录</h1>
                        <Form onFinish={onFinish} onFinishFailed={onFinishFailed}> { /**onFinishFailed 失败时的回调  onFinish成功时的回调*/}
                            <Form.Item
                                name="username"
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: '用户名不允许为空！'
                                    },
                                    {
                                        min: 4,
                                        message: '用户名至少是4位！'
                                    },
                                    {
                                        max: 12,
                                        message: '用户名最大为12位！'
                                    },
                                    {
                                        pattern: /^\w+$/,
                                        message: '用户名只能由英文，数字，下划线组成！'
                                    }
                                ]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入密码！',
                                    },
                                    {
                                        min: 4,
                                        message: '密码至少是4位！'
                                    },
                                    {
                                        max: 12,
                                        message: '密码最大为12位！'
                                    },
                                    {
                                        pattern: /^[a-z0-9]+$/i,
                                        message: '密码只能由英文，数字组成！'
                                    }
                                ]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button style={{ width: "100%" }} type="primary" htmlType="submit" className="login-form-button">
                                    Log in
                            </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            )
        }
        
    }
}
export default Login