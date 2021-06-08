import Vue from 'vue'
import { io } from 'socket.io-client'
// 服务器地址
const Socket = io('http://localhost:3000')

Vue.prototype.$socket = Socket
