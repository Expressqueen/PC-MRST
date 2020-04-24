import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// /* Layout */
import Layout from '@/layout'
const router=new Router({
  mode:"history",
  routes:[
    {
      path: '/',
      component: Layout,
      redirect: '/404',
      children: [{
        path: '404',
        name: '404',
        component: () => import('@/views/404'),
        meta: { title: '404', icon: '404' }
      }]
    },
  
    {
      path: '/404',
      component: () => import('@/views/404'),
      hidden: true
    },
  
    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }
  ]
})
export default router
