import {get,post} from '@/utils/request'

export const apiAddress = (params) => get('https://vue-js.com/api/v1/topics', params)