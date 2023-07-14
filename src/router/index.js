import Vue from 'vue'
import VueRouter from 'vue-router'


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
    path: '/Home',
    component: () => import('../views/HomeView.vue')
   },
  {
    path: '/BookDetails',
    component: () => import(/* webpackChunkName: "about" */ '../components/BookDetails.vue')
  },
   {
    path: '/',
    component: () => import(/* webpackChunkName: "about" */ '../views/HomeView.vue')
  },
  {
    path: '/readZz',
    component: () => import('../BookDetails/read-zz.vue')
  },




]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
