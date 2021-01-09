import React, { Component } from 'react'
import { Tree } from 'antd'
import { DEF_CHECK,DEF_TREE,DEF_BAN,DEF_ALL} from '../../config'
import {navArr} from '../../siderNavConfig'
class tree extends Component {
    state = {
        defaultExpandedKeys:[], //设置默认展开
        defaultCheckedKeys:[],  //设置默认被选中
        checkedKeys:[],   //选择的key
        treeList:[]
    }
    onCheck= ( checkedKeys)=>{
        this.setState({checkedKeys})
    }
    getCheckedKeys = ()=>{
        const {checkedKeys} = this.state
        /* 过滤all节点 */
        let keys = []
        for(let i =0;i<checkedKeys.length;i++){
            if(checkedKeys[i] !== DEF_ALL){
                keys.push(checkedKeys[i])
            }
        }
        return keys
    }
    setTreeList = (arr)=>{  //加工树状结构
        let treeList = [{title: '平台权限',key: DEF_ALL,children: []}]
        treeList[0].children = JSON.parse(JSON.stringify(arr))
        setTreeConfig(treeList[0].children)

        /* 定义应用全局设置tree的函数 */
        function setTreeConfig(arr){    
            arr.forEach(item=>{
                if(DEF_BAN.includes(item.key)){
                    if(item.children){
                        item.disabled = true
                        setTreeConfig(item.children)
                    }else{
                        item.disableCheckbox  = true
                    }
                }
            })
        }
        //设置默认展开
        this.setState({treeList,defaultExpandedKeys:DEF_TREE})
    }
    setDefaultTree = ()=>{
        let newArr = []
        this.props.role.auth.forEach(item=>{
            if(!DEF_CHECK.includes(item)) newArr.push(item)
        })
        let tree = DEF_CHECK.concat(newArr)
        this.setState({defaultCheckedKeys:tree,checkedKeys:tree})
    }
    UNSAFE_componentWillMount(){
        this.setTreeList(navArr) //初始化树选择器
        this.setDefaultTree()
    }
    render() {
        const treeData = this.state.treeList
        const { defaultExpandedKeys,defaultCheckedKeys } = this.state
            return (
                <Tree
                    checkable
                    defaultExpandedKeys={defaultExpandedKeys}
                    defaultCheckedKeys={defaultCheckedKeys}
                    onCheck={this.onCheck}
                    treeData={treeData}
                />
            )
        }
}
export default tree