// eslint-disable-next-line
import { BasicLayout } from '@/layouts'

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
    redirect: '/benchmark_test/all-test-list',
    children: [
      {
        path: '/benchmark_test',
        name: 'benchmark_test',
        component: RouteView,
        redirect: '/benchmark_test/all-test-list',
        hideChildrenInMenu: true,
        meta: { title: 'menu.benchmark_test', icon: 'table' },
        children: [
          {
            path: '/benchmark_test/all-test-list/:pageSi([1-9]\\d*)?/:pageNo([1-9]\\d*)?',
            name: 'BenchmarkAllTestList',
            component: () => import('@/views/benchmark_test/TestTable'),
            meta: { title: 'menu.list.all-test-list', keepAlive: true }
          },
          {
            path: '/benchmark_test/table-list/:test_type?/:repo?/:version?/:pageSi([1-9]\\d*)?/:pageNo([1-9]\\d*)?',
            name: 'BenchmarkTableListWrapper',
            component: () => import('@/views/benchmark_test/TableList'),
            meta: { title: 'menu.list.table-list', keepAlive: true }
          },
          {
            path: '/benchmark_test/model-test-list/:test_type?/:repo?/:model?/:pageSi([1-9]\\d*)?/:pageNo([1-9]\\d*)?',
            name: 'ModelTestList_page',
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
