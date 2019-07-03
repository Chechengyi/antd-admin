import axios from 'axios'
import {notification} from 'antd'

const host = ''

const statusType = {
  200: '服务器成功返回请求的数据',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据,的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时',
}

// 响应头拦截
axios.interceptors.response.use( res=> {
  /* 可以在这中间做一系列拦截操作 */
  return res.data
}, err=> {
  if ( err.response ) {
    // 请求已经发出， 但是服务器响应的状态码不在2xx范围内
    notification.error({
      message: `请求错误 ${err.response.status}: ${err.response.config.url}`,
      description: statusType[err.response.status]
    })
    
  } else {
    // 服务器没有响应， 超时
    notification.error({
      message: '请求在规定的时间内没有响应',
      description: '请求超时了'
    })
  }
  return err
})

export function request(url, options, isToast=true){
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
  }
  
  const method = options.method ||'GET'
  const setting = {
    headers,
    url: host + url,
    method: method,
    [method==='GET'?'params':'data'] : options.data,
    timeout: 10000,
    isToast
  }
  return axios(setting)
}