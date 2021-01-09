import { Popconfirm, message, Button } from 'antd'
import React, { Component } from 'react'
export default class pop extends Component {
    confirm = () => {
        const { operaUser, getUsers, deleUser } = this.props
        deleUser({ _id: operaUser._id }).then(res => {
            message.success(res)
            getUsers()
        }).catch(err => {
            message.error(err)
        })
    }
    render() {
        return (
            <Popconfirm
                title="是否删除该用户？"
                onConfirm={this.confirm}
                okText="是"
                cancelText="否"
                placement="bottom"
            >
                <Button type='link'>删除</Button>
            </Popconfirm>
        )
    }
}
