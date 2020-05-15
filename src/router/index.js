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
    // {
    //   path: '/register',
    //   component: () => import('@/views/Register/register'),
    //   hidden: true
    // },
    //乐播平台注册
    {
      path: '/register',
      component: () => import('@/views/Register/register'),
      hidden:true
    },
    //权限组
    {
      path: '/',
      component: Layout,
      redirect: '/PermissionGroup',
      children: [{
        path: 'PermissionGroup',
        name: 'PermissionGroup',
        component: () => import('@/views/PermissionGroup/index'),
        meta: { title: '权限组'}
      }]
    },
    //权限管理
    {
      path: '/',
      component: Layout,
      redirect: '/PermissionManager',
      children: [{
        path: 'PermissionManager',
        name: 'PermissionManager',
        component: () => import('@/views/PermissionManager/index'),
        meta: { title: '权限'}
      }]
    },
    //集团
    {
      path: '/',
      component: Layout,
      redirect: '/BlocGroup',
      children: [{
        path: 'BlocGroup',
        name: 'BlocGroup',
        component: () => import('@/views/BlocGroup/index'),
        meta: { title: '集团'}
      }]
    },
    //集团业态产品
    {
      path: '/',
      component: Layout,
      redirect: '/ProductGroup',
      children: [{
        path: 'ProductGroup',
        name: 'ProductGroup',
        component: () => import('@/views/ProductGroup/index'),
        meta: { title: '集团业态产品'}
      }],
      hidden:true
    },
    //集团门店
    {
      path: '/',
      component: Layout,
      redirect: '/Storeshop',
      children: [{
        path: 'Storeshop',
        name: 'Storeshop',
        component: () => import('@/views/ProductGroup/Storeshop'),
        meta: { title: '集团门店'}
      }],
      hidden:true
    },
    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }
  ]
})
export default router
