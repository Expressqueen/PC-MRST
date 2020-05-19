import axios from 'axios'
import QS from 'qs'
import { MessageBox, Message,Loading } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { Config } from 'svgo'

let loadingInstance = null //加载全局的loading
//注册axios
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
/* 判断环境 */
if (process.env.NODE_ENV == 'development') {
  service.defaults.baseURL = 'http://39.97.165.143/api';
}
else if (process.env.NODE_ENV == 'debug') {
  service.defaults.baseURL = 'https://www.ceshi.com';
}
else if (process.env.NODE_ENV == 'production') {
  service.defaults.baseURL = 'https://www.production.com';
}
//post请求头的设置
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// 请求拦截
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      // 每次发送请求之前判断是否存在token        
      // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
      // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断 
      config.headers['X-Token'] = getToken()
    }
    loadingInstance = Loading.service({       // 发起请求时加载全局loading，请求失败或有响应时会关闭
      spinner: 'fa fa-spinner fa-spin fa-3x fa-fw',
      text: '拼命加载中...'
    })
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    loadingInstance.close();
    // 如果返回的状态码为0，说明接口请求成功，可以正常拿到数据     
    // 否则的话抛出错误
    if (response.data.code === 0) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response.data);
    }
  },
  // 服务器状态码不是2开头的的情况
  error => {
    loadingInstance.close()
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。                
        case 401:
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          });
          break;
        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token
        // 跳转登录页面                
        case 403:
          Message({
            message: '登录过期，请重新登录',
            type: 'error',
            duration: 5 * 1000
          });
          // 清除token
          localStorage.removeItem('token');
          store.commit('loginSuccess', null);
          // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面 
          setTimeout(() => {
            router.replace({
              path: '/login',
              query: {
                redirect: router.currentRoute.fullPath
              }
            });
          }, 1000);
          break;
        // 404请求不存在
        case 404:
          Message({
            message: '网络请求不存在',
            type: 'error',
            duration: 5 * 1000
          });
          break;
        // 其他错误，直接抛出错误提示
        default:
          Message({
            message: error.response.data.message,
            type: 'error',
            duration: 5 * 1000
          });
      }
      return Promise.reject(error.response);
    }
  }
);
/* get请求 */
export const get = (url, params, config = {}) => {
  return new Promise((resolve, reject) => {
    service({
      method: 'get',
      url,
      params,
      ...config
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

/* post请求  */
export const post = (url, data, config = {}) => {
  return new Promise((resolve, reject) => {
    service({
      method: 'post',
      url,
      data,
      ...config
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

/**delete请求 */
export const Delete=(url,params)=>{
  return new Promise((resolve, reject) => {
    service({
      method: 'delete',
      url,
      params
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

export default service
