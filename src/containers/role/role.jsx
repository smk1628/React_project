import React, { Component } from 'react'
import { Card,Button,Table,Modal,message,Form,Input } from 'antd'
export default class role extends Component {
    state={
        visible:false,
        loading:false
    }
    handleOk = ()=>{
        this.from.validateFields().then(data=>{
            this.setState({loading:true})
            setTimeout(()=>{
                message.success('ok')
                this.setState({loading:false,visible:false})
            },2000)
            console.log(data)
        }).catch(err=>{
            message.error('请输入角色名')
        })
    }
    handleCancel = ()=>{
        message.success('cancel')
        this.setState({visible:false})
    }
    render() {
        const dataSource = [
            {
                key: '1',
                name: '商品管理员',
                createTime: '2021/01/06 12:40',
                authTime: '',
                auth:'admin'
            }
          ]
          const columns = [
            {
                title: '角色名称',
                dataIndex: 'name',
                key: 'name',
                width:'20%'
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                key: 'createTime',
                width:'25%'
            },
            {
                title: '授权时间',
                dataIndex: 'authTime',
                key: 'authTime',
                width:'25%'
            },
            {
                title: '授权人',
                dataIndex: 'auth',
                key: 'auth',
                width:'15%',
            },{
                title: '操作',
                //dataIndex: 'opera',
                key: 'opera',
                width:'15%',
                align:'center',
                render:()=>{return <Button type='link'>设置权限</Button>}
              }
          ]
          const { visible,loading } = this.state
        return (
            <>
                <Card title={<Button onClick={()=>{this.setState({visible:true})}} type='primary'>新增角色</Button>} bordered={false}>
                    <Table dataSource={dataSource} columns={columns} bordered />
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
                        <Form.Item name='role' rules={[{required:true,message:'请输入角色名'}]}>
                            <Input placeholder='请输入角色名'/>
                        </Form.Item>
                    </Form>
                </Modal>
            </>

        )
    }
}
