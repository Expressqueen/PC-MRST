import {get,post} from '@/utils/request'

export const apiAddress = (params) => get('https://vue-js.com/v1/topics', params)
export const AJuDeps=(params)=>get('/AJuDeps',params) //组织架构展示接口
export const SAJuDeps=(params)=>post('/AJuDeps',params) //搜索+产看组织部门接口
export const AUsRegs=(params)=>get('/AUsRegs',params)  //邀请成员获取邀请链接
export const getARegi=(params)=>get('/ARegi',params)  //注册页面请求数据接口
export const ARegi=(params)=>post('/ARegi',params)  //用户注册接口
export const ARoLi=(params)=>get('/ARoLi',params)   //权限组角色列表