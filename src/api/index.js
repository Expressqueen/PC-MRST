import {get,post} from '@/utils/request'

export const apiAddress = (params) => get('https://vue-js.com/v1/topics', params)
export const AJuDeps=(params)=>get('/AJuDeps',params) //组织架构展示接口
export const SAJuDeps=(params)=>post('/AJuDeps',params) //搜索+产看组织部门接口
export const getARegi=(params)=>get('/ARegi',params)  //注册页面请求数据接口