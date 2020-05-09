import {get,post} from '@/utils/request'
/**组织架构接口 */
export const AJuDeps=(params)=>get('/AJuDeps',params) //组织架构展示接口
export const SAJuDeps=(params)=>post('/AJuDeps',params) //搜索+产看组织部门接口
export const AJuDepC=(params)=>post('/AJuDepC',params)  //创建组织部门
export const getAJuDepC=(params)=>get('/AJuDepC',params)  //创建组织部门获取部门角色
export const EditRolesType=(params)=>post('/AJuRolsUp',params)  //修改部门身份账号状态
export const DeleteAJuDepC=(params)=>post('/AJuDepCDe',params)   //删除部门
export const AUsRegs=(params)=>get('/AUsRegs',params)  //邀请成员获取邀请链接
export const getARegi=(params)=>get('/ARegi',params)  //注册页面请求数据接口
export const ARegi=(params)=>post('/ARegi',params)  //用户注册接口
/** 权限组接口 */
export const ARoLi=(params)=>get('/ARoLi',params)   //权限组角色列表
export const ARoRuLi=(params)=>get('/ARoRuLi',params)  //获取创建权限组结构列表
export const PostARoRuLi=(params)=>post('/ARoRuLi',params) //创建权限组接口
export const EditAroRuLi=(params)=>get('/ARoRuPdLi',params)  //设置权限组获取权限列表
export const EditAJuRuLiUp=(params)=>post('/AJuRuLiUp',params) //修改权限组权限
/** 权限模块接口*/
export const getPerlist=(params)=>get('/ARuLi',params)  //获取权限列表
export const SARuCrLi=(params)=>get('/ARuCrLi',params)  //获取权限增加父级接口地址