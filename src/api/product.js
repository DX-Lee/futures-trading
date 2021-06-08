import request from '@/utils/request'
export function getFuturesInfo (code) {
  return request({
    url: '/futures/getFuturesInfo',
    method: 'get',
    params: {
      code
    }
  })
}

export function getAllFuturesInfo () {
  return request({
    url: '/futures/getAllFuturesInfo',
    method: 'get'
  })
}

export function getDominantFuture (code) {
  return request({
    url: '/futures/getDominantFuture',
    method: 'get',
    params: {
      code
    }
  })
}

export function getPrice (data) {
  return request({
    url: '/futures/getPrice',
    method: 'get',
    params: data
  })
}
