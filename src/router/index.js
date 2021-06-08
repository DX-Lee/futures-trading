import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/layout'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: 'futures',
        name: 'futures',
        component: () => import('@/views/futures')
      },
      {
        path: 'orders',
        name: 'orders',
        component: () => import('@/views/order')
      },
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/user')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login'),
    name: 'login'
  }
]

const router = new VueRouter({
  routes
})

export default router
