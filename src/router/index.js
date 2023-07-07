import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginReg/Login.vue')
  },
  {
    path: '/reg',
    component: () => import('../views/LoginReg/Reg.vue')
  },
  {
    path: '/forgetPassword',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginReg/ForgetPassword.vue')
  },
  {
    path: '/forgetPasswordEmail',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginReg/ForgetPasswordEmail.vue')
  },
  {
    path: '/headers',
    component: () => import('../components/Headers.vue')
   }, //{
  //   path: '/BookDeatils',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/BookDeatils/BookDeatils.vue')
  // },
   {
    path: '/',
    component: () => import(/* webpackChunkName: "about" */ '../App')
  },





]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
