import React, { Component } from 'react'
import { Card,Button,Input,Select,Table,message } from 'antd'
import { SearchOutlined,PlusCircleOutlined } from '@ant-design/icons'
import { getGoods,updateGoodsStatus,getSearchGoods } from '../../api'
import { GOODS_PAGE_SIZE } from '../../config/index'
const { Option } = Select
export default class goods extends Component {
    state = {
        goods:[],
        total:null,
        current:1,
        searchType:'productName',
        keyWord:''
    }
    /* 获取当前（搜索）页商品 */
    doGetGoods = async(current=1)=>{    //获取当前页商品
        const { searchType,keyWord } = this.state
        let result
        if(keyWord){    //如果有关键字则进行搜索
            result = await getSearchGoods(current,GOODS_PAGE_SIZE,searchType,keyWord)
        }else{  //否则获取当前页所有商品
            result = await getGoods(current,GOODS_PAGE_SIZE)
        }
        const {status,data,count,msg} = result
        if(status === 0){
            this.setState({'goods':data,total:count,current})
        }else{
            message.error(msg)
        }
    }
    /* 修改商品状态 */
    doUpdateGoodsStatus = async(a)=>{
        const {_id,status} = a
        const Ustatus = status === 1 ? 0:1  //设置将要改变的状态
        const goods = [...this.state.goods]  //获取状态里的商品信息
        const result = await updateGoodsStatus(_id,Ustatus)
        const { msg } = result
        if(result.status === 0){
            const newGoods = goods.map(item=>{
                if(item._id === _id){
                    item.status = Ustatus
                }
                return item
            })
           this.setState({'goods':newGoods})
           message.success(msg)
        }else{
            message.error(msg)
        }
            

        
    }
    /* 搜索 */
    doSearch =()=>{
        this.doGetGoods()
    }
    componentDidMount(){
        this.doGetGoods() //初始化商品页面
    }
    render() {
        const dataSource = this.state.goods
          
          const columns = [
            {
              title: '商品名称',
              dataIndex: 'name',
              key: 'name',
              width:'18%',
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
              width:'12%',
              render:pric=>'￥'+pric
            },
            {
              title: '状态',
              //dataIndex: 'status',
              key: 'status',
              align:'center',
              width:'12%',
              render:(a)=>{
                const {status} = a
                return (
                    <>
                        <Button 
                            onClick={()=>{this.doUpdateGoodsStatus(a)}} 
                            type='primary' 
                            danger={status === 1? true:false}
                        >
                            {status === 1 ? '下架':'上架'}
                        </Button><br/>
                        <span>{status === 1? '在售':'已停售'}</span>
                    </>
                )}
            },
            {
              title: '操作',
              dataIndex: 'opera',
              key: 'opera',
              align:'center',
              width:'12%',
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
                        <Select defaultValue='productName' onChange={(value)=>{this.setState({searchType:value})}}>
                            <Option value='productName'>按名称搜索</Option>
                            <Option value='productDesc'>按描述搜索</Option>
                        </Select>
                        <Input 
                            style={{width:'25%',marginLeft:'8px',marginRight:'8px'}} 
                            placeholder='请输入搜索关键字' 
                            allowClear 
                            onChange={(e)=>{this.setState({keyWord:e.target.value})}}
                        />
                        <Button onClick={this.doSearch} type='primary'><SearchOutlined />搜索</Button>
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
                        current:this.state.current,
                        total:this.state.total,
                        pageSize:GOODS_PAGE_SIZE,
                        onChange:(a)=>{this.doGetGoods(a)}
                    }}
                />
            </Card>
        )
    }
}
