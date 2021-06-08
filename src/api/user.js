import request from '@/utils/request'

export function login (data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function register (data) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}

export function getInfo (token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function updateUser (data) {
  return request({
    url: '/user/update',
    method: 'post',
    data
  })
}