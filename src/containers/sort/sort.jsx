import React, { Component } from 'react'
import { Table,Card,Button,message,Modal,Form,Input } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { PAGE_SIZE } from '../../config'
import { getCategory,addCategory,updateCategory } from '../../api'
import { saveCategoryListAction } from '../../redux/action_creators/category_action'
@connect(
  state=>({}),
  {saveCategoryList:saveCategoryListAction}
)
 class sort extends Component {
    state = {
        categories:[], //分类列表
        visible:false, //modul是否隐藏
        confirmLoading:false, //数据提交loading
        status:'', //add||update
        modalCurrentValue:'',
        updateID:''
    }
    /* 显示add对话框 */
    add = () => {
      this.setState({visible:true, status:'add',modalCurrentValue:''})
    }
    /* 显示update对话框 */
    update = (a)=>{
      const {name,_id} = a
      this.setState({modalCurrentValue:name,visible:true,status:'update',updateID:_id})
    }
    /* 确认对话框 */
    handleOk = () => {
      this.setState({confirmLoading:true}) //开启异步loading 
      this.form.validateFields().then((value)=>{
        const { categroyName } = value
        const {updateID,status,modalCurrentValue} = this.state
        if(status === 'add'){
          this.doAddCategroy(categroyName) //向后台添加数据
        }else{
          if(categroyName === modalCurrentValue){
            this.setState({confirmLoading:false})
            message.warning('未做出修改')
            return
          }
          this.doUpdateCategroy(updateID,categroyName)//修改数据
        }
      }).catch((err)=>{
        message.warning('表单输入有误，请检查',1)
        this.setState({confirmLoading:false})
      })
    }
    /* 取消对话框 */
    handleCancel = () => {
      this.setState({visible:false,confirmLoading:false})
      this.form.resetFields()
    }
    /* 将从后台获取的分类维护到state中 */
    setCategroy= async()=>{
       let res = await getCategory() 
       let {status,data,msg} = res
      if(status === 0){ 
        this.setState({categories:data})
        this.props.saveCategoryList(data) //维护到store中
      }else{
        message.error(msg)
      }
    } 
    /* 新增分类到服务器 */
    doAddCategroy = async(name)=>{
      let result = await addCategory({name})
      const { status,msg,data} = result
      if(result){
        if(status === 0 && data){ //判断添加成功
          this.setState({visible:false,confirmLoading:false})
          this.form.resetFields()
          message.success(msg)
          this.setCategroy()
        }else{ //判断添加失败
          this.setState({confirmLoading:false})
          message.error(msg)
        }
      }
    }
    /* 修改分类到服务器 */
    doUpdateCategroy = async(_id,name)=>{
      let result = await updateCategory({_id,name})
      const { status,msg,data} = result
      if(result){
        if(status === 0 && data){ //判断修改成功
          this.setState({visible:false,confirmLoading:false})
          this.form.resetFields()
          message.success(msg)
          this.setCategroy()
        }else{ //判断修改失败
          this.setState({confirmLoading:false})
          message.error(msg)
        }
      }
    }
    componentDidMount(){
        this.setCategroy()
    }
    render() {
      let { modalCurrentValue} = this.state
        const dataSource = this.state.categories
          const columns = [
            {
              title: '分类名',
              dataIndex: 'name',
              key: '_id',
            },
            {
              title: '操作',
              align:'center',
              width:'14%',
              render:(a)=>{return <Button onClick={()=>{this.update(a)}} type="link">修改分类</Button>},
            }
          ];
        return (
           <>
            <Card  extra={<Button onClick={this.add} type="primary"><PlusCircleOutlined />添加</Button>} >
            <Table   
            dataSource={dataSource} 
            columns={columns} 
            bordered
            rowKey='_id'
            pagination={{
                pageSize: PAGE_SIZE
            }}/>
        </Card>
        <Modal title={this.state.status === 'add'? '添加分类':'修改分类'} 
          visible={this.state.visible} 
          okText='确定'
          cancelText='取消'
          onOk={this.handleOk} 
          onCancel={this.handleCancel}
          confirmLoading={this.state.confirmLoading}
          destroyOnClose
          > 
          <Form ref={(form)=>{this.form = form}}>
            <Form.Item
                name="categroyName"
                initialValue = {modalCurrentValue}
                shouldUpdate
                rules={[
                    {
                        required: true,
                        message: '分类名不允许为空！'
                    }
                ]}
            >
                <Input ref={input=>this.input=input}  placeholder="请输入分类名" />
            </Form.Item>
          </Form>
          
        </Modal>
        </>
        )
    }
}

export default sort