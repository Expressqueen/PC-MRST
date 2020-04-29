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
      redirect: '/origanizational',
      children: [{
        path: 'origanizational',
        name: 'origanizational',
        component: () => import('@/views/Organizational/index'),
        meta: { title: '组织架构', icon: '404'}
      }]
    },
  
    {
      path: '/404',
      component: () => import('@/views/404'),
      hidden: true
    },
    //乐播平台注册
    {
      path: '/register',
      component: () => import('@/views/Register/register'),
      hidden:true
    },
    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }
  ]
})
export default router
