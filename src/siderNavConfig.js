export const navArr = [
    {
        title:'首页',
        key:'home',
        icon:'HomeOutlined',
        to:'/admin/home'
    },
    {   
        title:'商品',
        key:'prod_about',
        icon:'AppstoreOutlined',
        children:[
            {
                title:'分类管理',
                key:'sort',
                icon:'UnorderedListOutlined',
                to:'/admin/prod_about/sort'
            },
            {
                title:'商品管理',
                key:'goods',
                icon:'ToolOutlined',
                to:'/admin/prod_about/goods'
            }

        ]
    },
    {
        title:'用户管理',
        key:'user',
        icon:'UserOutlined',
        to:'/admin/user'
    },
    {
        title:'角色管理',
        key:'role',
        icon:'SafetyOutlined',
        to:'/admin/role'
    },
    {
        title:'图像图表',
        key:'pic',
        icon:'AreaChartOutlined',
        children:[
            {
                title:'柱状图',
                key:'bar',
                icon:'BarChartOutlined',
                to:'/admin/pic/bar'
            },
            {
                title:'折线图',
                key:'line',
                icon:'LineChartOutlined',
                to:'/admin/pic/line'
            },
            {
                title:'饼图',
                key:'pie',
                icon:'PieChartOutlined',
                to:'/admin/pic/pie'
            }

        ]
    }
]

/* 获取navArr里的所有key */
export const getAllKey = (a)=>{
    return each(a)
}


function each(a,keys = []){
    a.forEach(item => {
        if(!item.children){
            keys.push(item.key)
        }else{
            keys.push(item.key)
            each(item.children,keys)
        }
    })
    return keys
}


