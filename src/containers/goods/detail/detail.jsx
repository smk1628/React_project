import React, { Component } from 'react'
import { Button,Card,List,message,Typography} from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { BASE_URL } from '../../../config'
import { getGoodsById,getCategoryById } from '../../../api'
import '../detail/detail.less'
const { Title,Text } = Typography
@connect(
    state=>({goodsList:state.goodsList})
)
class detail extends Component {
    state={
        name:'',
        desc:'',
        pric:'',
        category:'',
        info:'',
        imgs:[]
    }
    /* 获取当前详情页商品所属分类 */
    getCategory = async(id)=>{
        let {status,data} = await getCategoryById(id)
        if(status === 0){
            this.setState({category:data.name})
        }else{
            this.setState({category:'?????获取分类错误'})
        }
    }
    /* 获取当前详情页商品信息 */
    getGoods = async()=>{
            let res = this.props.goodsList.find(item=>{
                return item._id === this.props.match.params.id
            })
            if(!res){
                let { status,data} = await getGoodsById(this.props.match.params.id) 
                if(status === 0 && data){
                    res = data
                }else{
                    message.error('网络故障')
                    return
                }
            }
            let { name,desc,pric,category,info,imgs } = res
            let newImgs = [...this.state.imgs]
            if(imgs){
                imgs.forEach(item=> {
                    newImgs.unshift(item)
                })
            }
            this.getCategory(category)
            this.setState({name,desc,pric:`￥${pric}`,info,imgs:newImgs})
    }
    componentDidMount(){
        /* 初始化详情页商品信息 */
        this.getGoods()
    }
    render() {
        const { name,desc,pric,category,info,imgs } = this.state
        return (
            <Card 
                title={
                    <Title level={4}>
                        <Button onClick={this.props.history.goBack} style={{fontSize:'20px'}} size='small' type='link'><LeftOutlined /></Button>
                        <Text className='detail'>商品详情</Text>
                    </Title>
                } 
                bordered={false} 
            >
                <List>
                    <List.Item>
                        <span className='title'>商品名称：</span>
                        {name}
                    </List.Item>
                    <List.Item>
                        <span className='title'>商品描述：</span>
                        {desc}
                    </List.Item>
                    <List.Item>
                        <span className='title'>商品价格：</span>
                        {pric}
                    </List.Item>
                    <List.Item>
                        <span className='title'>所属分类：</span>
                        {category}
                    </List.Item>
                    <List.Item>
                        <span className='title'>
                            商品图片：
                            {imgs.map((item,index)=>{
                                return <img className='img' key={index} src={`${BASE_URL}/upload/${item}`} alt="img"/>
                            })}
                        </span>
                        
                    </List.Item>
                    <List.Item>
                        <span className='title'>商品信息：
                            <div className='info' dangerouslySetInnerHTML={{__html:info}}/>
                        </span>
                    </List.Item>
                </List>
            </Card>
        )
    }
}

export default detail
