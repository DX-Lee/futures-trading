import axios from 'axios'
import router from '@/router'
import {
  getToken
} from '@/utils/token'

const service = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})
// 请求拦截
service.interceptors.request.use(
  config => {
    config.headers['access-token'] = getToken()
    return config
  },
  error => {
    // console.log(error)
    return Promise.reject(error)
  }
)
// 响应拦截
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === 401) {
      router.push({
        path: '/login'
      })
    }
    return res
  },
  error => {
    // console.log('error', error)
    return Promise.reject(error)
  }
)

export default service
