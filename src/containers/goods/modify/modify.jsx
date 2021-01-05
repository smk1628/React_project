import React, { Component } from 'react'
import { Button,Card,Typography,Form,Input,Select,message} from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import './modify.less'
import  PicturesWall from './upload.jsx'
import TextEditor from './text_editor'
import { getCategory,addGoods,getGoodsById} from '../../../api'
const { Title,Text } = Typography
const { Option } = Select
@connect(
    state=>({categoryList:state.categoryList,goodsList:state.goodsList})
)
class modify extends Component {
    state = {
        title:'添加商品',
        categories:[],
        
    }
    /* 设置修改页面回显*/
    setInfo= ()=>{
        const id = this.props.match.params.id
        const { goodsList } = this.props
        if(id){
            if(goodsList.length){
                let result = goodsList.find(item=>{
                    return item._id === id
                })
                this.form.setFieldsValue({...result})
                if(this.PicturesWall) {
                    this.PicturesWall.setImgs(result.imgs)
                }
            }else{
                this.setGetGoodsById(id).then(data=>{
                   this.form.setFieldsValue({...data})
                   if(this.PicturesWall) {
                    this.PicturesWall.setImgs(data.imgs)
                }
               }).catch(err=>{
                   message.error(err)
               })
            }
        }
    }
    /* 设置标题（添加或者修改） */
    setTitle = ()=>{
        const id = this.props.match.params.id
        if(id) this.setState({title:'修改商品'})
    }
    setGetGoodsById = async(id)=>{
        const {status,data,msg} = await getGoodsById(id)
                if(status === 0){
                    return Promise.resolve(data)
                }else{
                    return Promise.reject(msg)
                }
    }
    /* 维护category到状态 */
    setCategoryList=async()=>{
        let categories = this.props.categoryList
        if( categories.length === 0){
            const { status,data,msg } = await getCategory()
            if(status === 0){
                categories = data
            }else{
                message.error(msg)
            }
        }
        this.setState({categories})
    }
    
    /* 添加商品 */
    doAddGoods = async(val)=>{
        let { status,data,msg } = await addGoods(val)
        if(status ===0){
            message.success('商品添加成功')
            console.log(data)
        }else{
            message.error(msg)
        }
    }
    onFinish = (values)=>{
        values.imgs = this.PicturesWall.getImagNames() //从上传组件中获取上传图片名
        values.info = this.info.getRichText() //从文本编辑器中获取内容
        this.doAddGoods(values)
    }
    UNSAFE_componentWillMount(){
        this.setTitle()
    }
    componentDidMount(){
        this.setCategoryList()
        this.setInfo()
    }
    render() {
        const { title} = this.state
        const  categoryList  = this.state.categories
        return (
            <Card 
                title={
                    <Title level={4}>
                        <Button onClick={this.props.history.goBack} style={{fontSize:'20px'}} size='small' type='link'><LeftOutlined /></Button>
                        <Text className='detail'>{title}</Text>
                    </Title>
                } 
                bordered={false} 
            >
                <Form ref={(f)=>this.form=f} labelCol={{md:3,sm:3,xs:3}} wrapperCol={{md:8,sm:8,xs:8}} onFinish={this.onFinish}>
                    <Form.Item
                        label="商品名称"
                        name="name"
                        rules={[
                            {required:true,message:'该项不能为空'}
                        ]}
                    >
                        <Input placeholder='商品名称'/>
                    </Form.Item>
                    <Form.Item
                        label="商品描述"
                        name="desc"
                        rules={[
                            {required:true,message:'该项不能为空'}
                        ]}
                    >
                        <Input placeholder='商品描述'/>
                    </Form.Item>
                    <Form.Item
                        label="商品价格"
                        name="pric"
                        rules={[
                            {required:true,message:'该项不能为空'},
                            {pattern:/^[0-9]+(.?[0-9]{1,2})?$/,message:'请输入正确的价格'}
                        ]}
                        wrapperCol={{md:4,sm:4,xs:4}}
                    >
                        <Input prefix="￥" addonAfter="RMB" />
                    </Form.Item>
                    <Form.Item 
                        label="商品分类"
                        name="category"
                        rules={[
                            {required:true,message:'该项不能为空'}
                        ]}
                        wrapperCol={{md:4,sm:4,xs:4}}
                    >
                        <Select placeholder='请选择分类'>
                            {categoryList.map((item,index)=><Option key={index} value={item._id}>{item.name}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item 
                        label="商品图片"
                        name="imgs"
                        wrapperCol={{md:12,sm:12,xs:12}}
                    >
                        <PicturesWall ref={(i)=>{this.PicturesWall = i}}/>
                    </Form.Item>
                    <Form.Item
                        label="商品信息"
                        name="info"
                        wrapperCol={{md:16,sm:16,xs:16}}
                    >
                        <TextEditor ref={(i)=>{this.info = i}} />
                    </Form.Item>
                    <Form.Item wrapperCol={{offset:3}}> 
                        <Button type="primary" htmlType="submit">提交</Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}
export default modify
