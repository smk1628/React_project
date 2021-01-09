import React, { Component } from 'react'
import { Card, Button, Table, Modal, Form, Input, Select, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import Pop from './pop'
import { DEF_PAGE_SIZE } from '../../config'
import { reqGetRoles, reqAddUser, reqGetUsers, reqUpdateUser, reqDeleUser } from '../../api'
export default class user extends Component {
    state = {
        visible: false,
        loading: false,
        title: 'add',
        roles: [],
        users: [],
        operaUser: ''
    }
    handleOk = () => {
        this.from.validateFields().then(data => {
            this.setState({ loading: true })
            if (this.state.title === 'update') {
                this.updateUser({ ...data, _id: this.state.operaUser._id }).then(res => {
                    message.success(res)
                    this.setState({ visible: false, loading: false })
                    this.from.resetFields()
                    this.getUsers()
                }).catch(err => {
                    message.error(err)
                    this.setState({ loading: false })
                })
            } else {
                this.addUser(data).then(res => {
                    message.success(res)
                    this.setState({ visible: false, loading: false })
                    this.from.resetFields()
                    this.getUsers()
                }).catch(err => {
                    message.error(err)
                    this.setState({ loading: false })
                })
            }
        }).catch(() => { })
    }
    doUpdateUser = (e) => {
        this.setState({ title: 'update', visible: true, operaUser: e })
        setTimeout(() => {
            if (this.from) this.from.setFieldsValue(e)
        }, 0)
    }
    doDeleUser = (e) => {
        console.log(e)
        console.log(this)
    }
    /* 添加用户 */
    addUser = async (val) => {
        const { status, msg } = await reqAddUser(val)
        if (status === 0) {
            return Promise.resolve('添加用户成功')
        } else {
            return Promise.reject(msg)
        }
    }
    /* 修改用户 */
    updateUser = async (val) => {
        const { status, msg } = await reqUpdateUser(val)
        if (status === 0) {
            return Promise.resolve('修改用户成功')
        } else {
            return Promise.reject(msg)
        }
    }
    /* 删除用户 */
    deleUser = async (id) => {
        const { status, msg } = await reqDeleUser(id)
        if (status === 0) {
            return Promise.resolve('删除用户成功')
        } else {
            return Promise.reject(msg)
        }
    }
    handleCancel = () => {
        this.setState({ visible: false, loading: false })
    }
    /* 获取角色 */
    getRoles = async () => {
        const { status, data, msg } = await reqGetRoles()
        if (status === 0) {
            this.setState({ roles: data })
        } else {
            message.error(msg)
        }
    }
    /* 获取用户列表 */
    getUsers = async () => {
        const { status, data, msg } = await reqGetUsers()
        if (status === 0) {
            this.setState({ users: data.reverse() })
        } else {
            message.error(msg)
        }
    }
    componentDidMount() {
        this.getRoles()
        this.getUsers()
    }
    render() {
        const { visible, loading, roles, users, title } = this.state
        const dataSource = users
        const columns = [
            {
                title: '用户名',
                dataIndex: 'username',
                key: 'username',
                width: '12%',
            },
            {
                title: '邮箱',
                dataIndex: 'email',
                key: 'email',
                width: '18%',
            },
            {
                title: '电话',
                dataIndex: 'phone',
                key: 'phone',
                width: '18%',
            },
            {
                title: '注册时间',
                dataIndex: 'create_time',
                key: 'create_time',
                render: day => dayjs(day).format('YYYY/MM/DD HH:mm:ss')
            },
            {
                title: '所属角色',
                dataIndex: 'role',
                key: 'role',
                width: '15%',
                render: role => {
                    let a = this.state.roles.find(item => {
                        if (item._id === role) return item
                        else return ''
                    })
                    if (a) return a.rolename
                }
            },
            {
                title: '操作',
                key: 'opera',
                align: 'center',
                width: '15%',
                render: (e) => {
                    return (
                        <>
                            <Button onClick={() => { this.doUpdateUser(e) }} type='link'>修改</Button>
                            {React.createElement(Pop, { operaUser: e, getUsers: this.getUsers, deleUser: this.deleUser })}
                        </>
                    )
                }
            },
        ]
        return (
            <Card title={<Button onClick={() => { this.setState({ visible: true }) }} type='primary'><PlusOutlined />创建用户</Button>} bordered={false}>
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    bordered
                    rowKey='_id'
                    pagination={{
                        pageSize: DEF_PAGE_SIZE
                    }}
                />
                <Modal
                    title={title === 'add' ? '创建用户' : '修改用户'}
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={loading}
                    onCancel={this.handleCancel}
                    okText='确定'
                    cancelText='取消'
                >
                    <Form ref={from => { this.from = from }} wrapperCol={{ md: 18 }} labelCol={{ md: 4 }}>
                        <Form.Item
                            label='用户名'
                            name='username'
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
                            <Input placeholder='请输入用户名' />
                        </Form.Item>
                        <Form.Item
                            label='密码'
                            name='password'
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
                            <Input placeholder='请输入密码' />
                        </Form.Item>
                        <Form.Item
                            label='手机号'
                            name='phone'
                            rules={[
                                { required: true, message: '请输入手机号' },
                                { pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/, message: '请输入正确的手机号' }
                            ]}
                        >
                            <Input placeholder='请输入手机号' />
                        </Form.Item>
                        <Form.Item
                            label='邮箱'
                            name='email'
                            rules={[
                                { required: true, message: '请输入邮箱' },
                                { pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/, message: '请输入正确的邮箱' }
                            ]}
                        >
                            <Input placeholder='请输入邮箱' />
                        </Form.Item>
                        <Form.Item
                            label='角色'
                            name='role'
                            rules={[
                                { required: true, message: '请选择一个角色' }
                            ]}
                            wrapperCol={{ md: 8 }}
                        >
                            <Select placeholder='请选择一个角色'>
                                {
                                    roles.map((item, index) => {
                                        return <Select.Option key={index} value={item._id}>{item.rolename}</Select.Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
            </Card>
        )
    }
}
