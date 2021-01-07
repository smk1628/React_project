import React, { Component } from 'react'
import { Card,Button,Table,Modal,message,Form,Input } from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import dayjs from 'dayjs'
import { connect } from 'react-redux'
import { reqAddRole,reqGetRoles,reqSetAuth } from '../../api'
import Tree from './tree'
import { setOperaRoleAction } from '../../redux/action_creators/operaRole_action'
@connect(
    state=>({operaRole:state.operaRole,userInfo:state.userInfo}),
    {setOperaRole:setOperaRoleAction}
)
class role extends Component {
    state={
        visible:false,
        loading:false,
        auth_visible:false,
        roles:[]
    }
    handleOk = ()=>{
        if(this.state.visible){
            this.from.validateFields().then(data=>{
                data.rolename = data.rolename.trim()
                this.setState({loading:true})
                this.addRole(data).then(()=>{
                    message.success('添加角色成功')
                    this.setState({visible:false,loading:false}) //model框隐藏
                    this.getRoles()  //刷新角色列表
                    this.from.resetFields() //重置表单
                }).catch(err=>{
                    this.setState({loading:false})
                    let msg = ''
                    if(this.state.roles.length){    //处理角色重复，服务器角色唯一
                        this.state.roles.forEach(item=>{
                            if(item.rolename === data.rolename) msg = '已存在此角色'
                        })
                    }
                    message.error(`${err}，${msg}`)
                })
            }).catch(err=>{
                message.error('请输入角色名')
            })
        }else{
            this.setState({loading:true})
            const keys = this.tree.getCheckedKeys()
            const auth_time = dayjs().valueOf()
            const id = this.props.operaRole._id
            const auth_master = this.props.userInfo.user.username
            this.setAuth({_id:id,auth:keys,auth_time,auth_master}).then(data=>{
                this.setState({loading:false,auth_visible:false})
                message.success(data)
                this.getRoles()  //刷新角色列表
            }).catch(err=>{
                this.setState({loading:false})
                message.success(err)
            })
        }
        
    }
    /* 添加角色 */
    addRole = async(reqdata)=>{
        const create_time = dayjs()
        const { status,data,msg} = await reqAddRole({...reqdata,create_time})
        if(status === 0){
            return Promise.resolve(data)
        }else{
            return Promise.reject(msg)
        }
    }
    /* 获取角色 */
    getRoles = async()=>{
        const { status,data,msg } = await reqGetRoles()
        if(status === 0){
            this.setState({roles:data})
        }else{
            message.error(msg)
        }
    }
    /* 角色授权 */
    setAuth = async(reqdata)=>{
        const { status,msg } = await reqSetAuth(reqdata)
        if(status === 0){
            return Promise.resolve('授权成功')
        }else{
            return Promise.reject(msg)
        }
    }
    handleCancel = ()=>{
        if(this.state.auth_visible){
            this.setState({auth_visible:false})
        }else{
            this.setState({visible:false})
            this.from.resetFields() //重置表单
        }
    }
    operaAuth = (role)=>{
        this.setState({auth_visible:true}) //展示权限操作对话框
        this.props.setOperaRole(role)
    }
    componentDidMount(){
        this.getRoles()
    }
    render() {
        const { visible,loading,auth_visible,roles } = this.state
        const dataSource = roles
        const columns = [
            {
                title: '角色名称',
                dataIndex: 'rolename',
                key: 'name',
                width:'20%'
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
                key: 'createTime',
                width:'25%',
                render:(a)=> dayjs(a).format('YYYY-MM-DD HH:mm:ss')
            },
            {
                title: '授权时间',
                dataIndex: 'auth_time',
                key: 'auth_time',
                width:'25%',
                render:(a)=> {
                    if(a){
                        return dayjs(a).format('YYYY-MM-DD HH:mm:ss')
                    }else{
                        return ''
                    }
                }
            },
            {
                title: '授权人',
                dataIndex: 'auth_master',
                key: 'auth_master',
                width:'15%',
            },
            {
            title: '操作',
            //dataIndex: 'opera',
            key: 'opera',
            width:'15%',
            align:'center',
            render:(a)=>{return <Button onClick={()=>{this.operaAuth(a)}} type='link'>设置权限</Button>}
            }
          ]
        return (
            <>
                <Card 
                    title={<Button onClick={()=>{this.setState({visible:true})}} type='primary'><PlusOutlined />新增角色</Button>} 
                    bordered={false}
                >
                    <Table 
                        rowKey='_id' 
                        dataSource={dataSource} 
                        columns={columns} 
                        bordered 
                        pagination={{
                            pageSize:5  //每页展示行数
                        }}
                    />
                </Card>
                <Modal
                    title="新增角色"
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={loading }
                    onCancel={this.handleCancel}
                    okText = '确定'
                    cancelText='取消'
                >
                    <Form ref={(f)=>{this.from = f}}>
                        <Form.Item name='rolename' rules={[{required:true,message:'请输入角色名'}]}>
                            <Input placeholder='请输入角色名'/>
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    title={`角色名称：${this.props.operaRole.rolename}`}
                    visible={auth_visible}
                    onOk={this.handleOk}
                    confirmLoading={loading }
                    onCancel={this.handleCancel}
                    okText = '确定'
                    cancelText='取消'
                    destroyOnClose
                >
                    <Tree role={this.props.operaRole} ref={(tree)=> this.tree = tree} />
                </Modal>
            </>

        )
    }
}
export default role