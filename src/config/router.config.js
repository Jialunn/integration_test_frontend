// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

const RouteView = {
  name: 'RouteView',
  render: h => h('router-view')
}

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/dashboard/workplace',
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/workplace',
        component: RouteView,
        meta: { title: 'menu.dashboard', keepAlive: true, icon: bxAnaalyse, permission: ['dashboard'] },
        children: [
          {
            path: '/dashboard/analysis/:pageNo([1-9]\\d*)?',
            name: 'Analysis',
            component: () => import('@/views/dashboard/Analysis'),
            meta: { title: 'menu.dashboard.analysis', keepAlive: false, permission: ['dashboard'] }
          },
          {
            path: '/dashboard/workplace',
            name: 'Workplace',
            component: () => import('@/views/dashboard/Workplace'),
            meta: { title: 'menu.dashboard.workplace', keepAlive: true, permission: ['dashboard'] }
          }
        ]
      },
      // integration_test
      {
        path: '/integration_test',
        name: 'integration_test',
        component: RouteView,
        redirect: '/integration_test/table-list',
        meta: { title: 'menu.integration_test', icon: 'table', permission: ['table'] },
        children: [
          {
            path: '/integration_test/table-list',
            name: 'TableLrristWrapper',
            component: () => import('@/views/integration_test/TableList'),
            meta: { title: 'menu.list.table-list', keepAlive: true, permission: ['table'] }
          },
          {
            path: '/integration_test/basic-list',
            name: 'BasicList2222',
            component: () => import('@/views/integration_test/BasicList'),
            meta: { title: 'menu.list.basic-list', keepAlive: true, permission: ['table'] }
          }
        ]
      },
      // benchmark_test
      {
        path: '/benchmark_test',
        name: 'benchmark_test',
        component: RouteView,
        redirect: '/benchmark_test/table-list',
        meta: { title: 'menu.benchmark_test', icon: 'table', permission: ['table'] },
        children: [
          {
            path: '/benchmark_test/table-list',
            name: 'Tab22leListWrapper',
            component: () => import('@/views/benchmark_test/TableList'),
            meta: { title: 'menu.list.table-list', keepAlive: true, permission: ['table'] }
          },
          {
            path: '/benchmark_test/basic-list',
            name: 'BaswwicList',
            component: () => import('@/views/benchmark_test/BasicList'),
            meta: { title: 'menu.list.basic-list', keepAlive: true, permission: ['table'] }
          }
        ]
      },
      // compatible_test
      {
        path: '/compatible_test',
        name: 'compatible_test',
        component: RouteView,
        redirect: '/compatible_test/table-list',
        meta: { title: 'menu.compatible_test', icon: 'table', permission: ['table'] },
        children: [
          {
            path: '/compatible_test/table-list',
            name: 'TwwableListWrapper',
            component: () => import('@/views/compatible_test/TableList'),
            meta: { title: 'menu.list.table-list', keepAlive: true, permission: ['table'] }
          },
          {
            path: '/compatible_test/basic-list',
            name: 'Basi55cList',
            component: () => import('@/views/compatible_test/BasicList'),
            meta: { title: 'menu.list.basic-list', keepAlive: true, permission: ['table'] }
          }
        ]
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]
