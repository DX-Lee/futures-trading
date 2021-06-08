import request from '@/utils/request'

export function createOrder (data) {
  return request({
    url: '/trading/createOrder',
    method: 'post',
    data
  })
}

export function finishOrder (data) {
  return request({
    url: '/trading/finishOrder',
    method: 'post',
    data
  })
}
export function getOrders () {
  return request({
    url: '/trading/getOrders',
    method: 'get'
  })
}

export function getHistoryOrders () {
  return request({
    url: '/trading/getHistoryOrders',
    method: 'get'
  })
}
