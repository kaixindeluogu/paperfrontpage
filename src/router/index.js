import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
 /**新页面路由地址
  * {
    path: '',
    name: '',
    component: () => import('../components/')
  },*/
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
        name: '/readZz',
        component: () => import('../BookDetails/read-zz.vue')
    }, {
        path: '/ArticleContent',
        name: '/ArticleContent',
        component: () => import('../BookDetails/ArticleContent.vue')
    },
    {
        path: '/SearchResult/:wd',
        component: () => import(/* webpackChunkName: "about" */ '../Search/SearchResult.vue')
    },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
