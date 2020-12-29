import React, { Component } from 'react'
import { Card,Button,Input,Select,Table,message } from 'antd'
import { SearchOutlined,PlusCircleOutlined } from '@ant-design/icons'
import { getGoods } from '../../api'
import { GOODS_PAGE_SIZE } from '../../config/index'
const { Option } = Select
export default class goods extends Component {
    state = {
        goods:[],
        total:null,
    }
    doGetGoods = async(current=1)=>{    //获取当前页商品
        let result = await getGoods(current,GOODS_PAGE_SIZE)
        const {status,data,count,msg} = result
        if(status === 0){
            this.setState({'goods':data,total:count})
        }else{
            message.error(msg)
        }
    }
    componentDidMount(){
        this.doGetGoods()
    }
    render() {
        const dataSource = this.state.goods
          
          const columns = [
            {
              title: '商品名称',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: '商品描述',
              dataIndex: 'desc',
              key: 'desc',
            },
            {
              title: '价格',
              dataIndex: 'pric',
              key: 'pric',
              align:'center',
              render:pric=>'￥'+pric
            },
            {
              title: '状态',
              dataIndex: 'status',
              key: 'status',
              align:'center',
              render:(status)=>{return (
                <>
                    <Button type='primary'>下架</Button><br/>
                    <span>{status === 1? '在售':'已售完'}</span>
                </>
              )}
            },
            {
              title: '操作',
              dataIndex: 'opera',
              key: 'opera',
              align:'center',
              render:()=>{return(
                <>
                    <Button type='link'>详情</Button><br/>
                    <Button type='link'>修改</Button>
                </>
              )}
            }
          ]
        return (
            <Card 
                style={{height:'100%'}}
                title={
                    <>
                        <Select defaultValue='name'>
                            <Option value='name'>按名称搜索</Option>
                            <Option value='pric'>按价格搜索</Option>
                        </Select>
                        <Input 
                            style={{width:'25%',marginLeft:'8px',marginRight:'8px'}} 
                            placeholder='请输入搜索关键字' 
                            allowClear 
                        />
                        <Button type='primary'><SearchOutlined />搜索</Button>
                    </>
                    
                } 
                extra={<Button type='primary'><PlusCircleOutlined />添加商品</Button>} 
            >
                <Table 
                    dataSource={dataSource} 
                    columns={columns} 
                    bordered
                    rowKey='_id'
                    pagination={{
                        total:this.state.total,
                        pageSize:GOODS_PAGE_SIZE,
                        onChange:(a)=>{this.doGetGoods(a)}
                    }}
                />
            </Card>
        )
    }
}
