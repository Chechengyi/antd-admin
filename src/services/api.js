import { request } from '../utils/request'

export async function login(params={}){
  return request('/api/login', {
    method:'POST',
    data: params
  })
}

export async function getOrder(params){
  return request('/api/getOrder', {
    data: params
  })
}

export async function getGoods(params){
  return request('/api/getGoods', {
    data: params
  })
}
