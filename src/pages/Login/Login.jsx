import React from 'react'
import './css/login.less'
import { Form, Input, Button} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
class Login extends React.Component{
    render(){
        const onFinish = (values) => {
            //console.log('Received values of form: ', values);
            alert('向服务器发送数据')
            
        }
        // const onFinishFailed = (values, errorFields, outOfDate )=>{
        //     console.log(values, errorFields, outOfDate)
        // }
        return (
            <div id="login">
                <header>
                    <div className="logo"></div>
                    <h1>商品管理系统</h1>
                </header>
                <div id="form">
                    <h1>用户登录</h1>
                    <Form onFinish={onFinish}> { /**onFinishFailed={onFinishFailed}  失败时的回调 */}
                        <Form.Item
                            name="username"
                            rules={[
                            {
                                required: true,
                                message: '用户名不允许为空！'
                            },
                            {
                                min:4,
                                message:'用户名至少是4位！'
                            },
                            {
                                max:12,
                                message:'用户名最大为12位！'
                            },
                            {
                                pattern:/^\w+$/,
                                message:'用户名只能由英文，数字，下划线组成！'
                            }
                            ]}
                        > 
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                            {
                                min:4,
                                message:'密码至少是4位！'
                            },
                            {
                                max:12,
                                message:'密码最大为12位！'
                            },
                            {
                                pattern:/^[a-z0-9]+$/i,
                                message:'密码只能由英文，数字组成！'
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
                        <Button style={{width:"100%"}} type="primary" htmlType="submit" className="login-form-button">
                        Log in
                        </Button>
                    </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}
export default Login