import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { BASE_URL } from '../../../config'
import { deleteImageByName } from '../../../api'
import React from 'react'

class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: []
  };
  getImagNames = ()=>{
    const { fileList } = this.state
    let images
    if(fileList.length >= 0){
        images = fileList.map(item=> item.name)
    }
    return images
  }
  setImgs = (imgArr)=>{
    let fileList = []
    imgArr.forEach((item,index)=>{
      fileList.push({uid:-index,name:item,url:`${BASE_URL}/upload/${item}`})
    })
    this.setState({fileList})
  }
  deleImag = async(name)=>{
    let { status } = await deleteImageByName(name)
    if(status === 0){
        console.log('删除'+name)
    }else{
        message.error('未知错误')
    }
  }
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = file => {
      if(file.url){
          this.setState({previewImage:file.url,previewVisible: true,previewTitle:file.name})
      }
  }

  handleChange = ({ fileList,file,event }) => {
      if(file.status === 'done'){
        let { status,data,msg } = file.response
        if(status === 0){
            fileList[fileList.length-1].url = data.url
            fileList[fileList.length-1].name = data.name
        }else{
            fileList[fileList.length-1].status = 'error'
            message.error(msg)
        }
      }
      if(file.status === 'removed'){
          console.log(1)
          this.deleImag(file.name)
      }
      this.setState({fileList})
  }

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          action={`${BASE_URL}/manage/img/upload`}
          method = 'post'
          name = 'file'
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 4 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    );
  }
}

export default PicturesWall