import React, { Component } from 'react'
import { Tree } from 'antd'
import { DEF_CHECK,DEF_TREE,DEF_BAN,DEF_ALL} from '../../config'
import navList from '../../siderNavConfig'
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
        for(let i =0;i<checkedKeys.length -1;i++){
            if(checkedKeys[i] !== DEF_ALL){
                keys.push(checkedKeys[i])
            }
        }
        return keys
    }
    setTreeList = (arr)=>{  //加工树状结构
        let treeList = [{title: '平台权限',key: 'all',children: []}]
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
        //设置默认展开，默认选中
        this.setState({treeList,defaultCheckedKeys:DEF_CHECK,checkedKeys:DEF_CHECK,defaultExpandedKeys:DEF_TREE})
    }
    setDefaultTree = ()=>{
        let tree = DEF_CHECK.concat(this.props.role.auth)
        this.setState({defaultCheckedKeys:tree})
    }
    UNSAFE_componentWillMount(){
        this.setTreeList(navList) //初始化树选择器
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