import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/home'
  },
  {
    path: '/home',
    name: '首页',
    component: () => import("../views/home/index.vue")
  },
  {
    path: '/detail',
    name: '详情',
    component: () => import('../views/detail/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
