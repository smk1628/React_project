//该文件为项目的配置文件，保存了通用性配置，及变量

export const BASE_URL = 'http://192.168.1.3:5000'  //发送请求基本路经
export const WEATHER = {
    URL:'http://wthrcdn.etouch.cn/weather_mini',    //天气地址
    CITY:'郑州'                                      //城市
}  //获取天气的api路径

export const PAGE_SIZE = 8
export const GOODS_PAGE_SIZE = 5
/* 全选权限 */
export const DEF_ALL = 'all'
/* 设置默认展开角色管理下所有带子节点的树状权限 */
export const DEF_TREE = ['all','prod_about','pic']
/* 设置权限为的默认选择，注意，一级权限会自动选择所有子权限 */
export const DEF_CHECK = ['home']
/* 设置要禁用的节点,只写子节点不生效 */
export const DEF_BAN = ['home']