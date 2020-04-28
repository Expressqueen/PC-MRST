import {get,post} from '@/utils/request'

export const apiAddress = (params) => get('https://vue-js.com/v1/topics', params)
export const AJuDeps=(params)=>get('/AJuDeps',params)