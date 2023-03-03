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
    redirect: '/dashboard/analysis',
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/analysis',
        component: () => import('@/views/dashboard/Analysis'),
        meta: { title: 'menu.dashboard', keepAlive: true, icon: bxAnaalyse },
        children: [
          {
            path: '/dashboard/analysis',
            name: 'Analysis',
            component: () => import('@/views/dashboard/Analysis'),
            meta: { title: 'menu.dashboard.analysis', keepAlive: false }
          }
        ]
      },
      // benchmark_test
      {
        path: '/benchmark_test',
        name: 'benchmark_test',
        component: RouteView,
        redirect: '/benchmark_test/table-list',
        meta: { title: 'menu.benchmark_test', icon: 'table' },
        children: [
          {
            path: '/benchmark_test/table-list',
            name: 'BenchmarkTableListWrapper',
            component: () => import('@/views/benchmark_test/TableList'),
            meta: { title: 'menu.list.table-list', keepAlive: true }
          },
          {
            path: '/benchmark_test/model-test-list',
            name: 'ModelTestList',
            component: () => import('@/views/benchmark_test/BasicList'),
            meta: { title: 'menu.list.basic-list', keepAlive: true }
          },
          {
            path: '/benchmark_test/test-list',
            name: 'BenchmarktestBasicList',
            component: () => import('@/views/benchmark_test/Test'),
            meta: { title: 'test', keepAlive: true }
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
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]
