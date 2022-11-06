import Vue from 'vue'
import VueRouter from 'vue-router'
import Remen from '../views/Remen.vue'
import Tuijian from '../views/Tuijian.vue'
import Zuixin from '../views/Zuixin.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/remen'
  },
  {
    path: '/remen',
    component: Remen
  },
  {
    path: '/zuixin',
    component: Zuixin
  },
  {
    path: '/tuijian',
    component: Tuijian
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
