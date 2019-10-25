import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from '@/layout'

Vue.use(Router)

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '控制面板', icon: 'dashboard' }
    }]
  },

  {
    path: '/partjob',
    component: Layout,
    redirect: '/partjob',
    name: 'partjob',
    meta: { title: '兼职管理', icon: 'partjob' },
    children: [
      {
        path: 'submitPartJobProvider',
        name: 'submitPartJobProvider',
        component: () => import('@/views/partjob/submitPartJobProvider'),
        meta: { title: '兼职提供者', icon: 'table' }
      },
      {
        path: 'partjobTable',
        name: 'partjobTable',
        component: () => import('@/views/partjob/partjobTable'),
        meta: { title: '兼职表格', icon: 'tree' }
      },
      {
        path: 'submitJob',
        name: 'submitJob',
        component: () => import('@/views/partjob/submitJob'),
        meta: { title: '兼职列表', icon: 'tree' }
      }
    ]
  },
  {
    path: '/topicOfConversation',
    component: Layout,
    redirect: '/topicOfConversation',
    name: 'topicOfConversation',
    meta: { title: '社区管理', icon: 'square' },
    children: [
      {
        path: 'topicOfConversation',
        name: 'topicOfConversation',
        component: () => import('@/views/topicOfConversation/topicOfConversation'),
        meta: { title: '帖子管理', icon: 'table' }
      },
      {
        path: '123',
        name: '123',
        component: () => import('@/views/topicOfConversation/123'),
        meta: { title: '话题分类', icon: 'tree' }
      }
      // {
      //   path: 'tree',
      //   name: 'Tree',
      //   component: () => import('@/views/tree/index'),
      //   meta: { title: '主页话题配置', icon: 'tree' }
      // }
    ]
  },
  {
    path: '/schoolactivity',
    component: Layout,
    redirect: '/schoolactivity',
    name: 'schoolactivity',
    meta: { title: '校园活动', icon: 'active' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '活动方案', icon: 'table' }
      },
      {
        path: 'activityList',
        name: 'activityList',
        component: () => import('@/views/schoolactivity/activityList'),
        meta: { title: '活动列表', icon: 'tree' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: '添加活动', icon: 'tree' }
      }
    ]
  },
  {
    path: '/game',
    component: Layout,
    redirect: '/example/game',
    name: 'Game',
    meta: { title: '陪玩管理', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '陪玩分类', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: '陪玩列表', icon: 'tree' }
      }
    ]
  },
  {
    path: '/form',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '广告管理', icon: 'example' },
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: '轮播图', icon: 'form' }
      }
    ]
  },

  {
    path: '/commodity',
    component: Layout,
    redirect: '/commodity',
    name: 'Nested',
    meta: {
      title: '商品管理',
      icon: 'nested'
    },
    children: [
      {
        path: '/commodityClassify',
        component: () => import('@/views/commodity/commodityClassify'), // Parent router-view
        name: 'uploadPictures',
        meta: { title: '添加商品种类' }
      },
      {
        path: '/commodityAdded',
        component: () => import('@/views/commodity/commodityAdded'), // Parent router-view
        name: 'commodityAdded',
        meta: { title: '零食上传' }
      },
      {
        path: '/commodityList',
        component: () => import('@/views/commodity/commodityList'), // Parent router-view
        name: 'commodityList',
        meta: { title: '全部零食' }
      }
    ]
  },

  {
    path: '/shopmanage',
    component: Layout,
    redirect: '/shopmanage',
    name: 'shopmanage',
    meta: {
      title: '店铺管理',
      icon: 'nested'
    },
    children: [
      {
        path: '/shopmanage',
        component: () => import('@/views/shopmanage/shopmanage'), // Parent router-view
        name: 'ShopManage',
        meta: { title: '店铺管理' }
      },
      // {
      //   path: '/shopmanage',
      //   component: () => import('@/views/shopmanage/shopmanage'), // Parent router-view
      //   name: 'ShopManage',
      //   meta: { title: '店铺分类配置' }
      // },
      // {
      //   path: '/shopmanage',
      //   component: () => import('@/views/shopmanage/shopmanage'), // Parent router-view
      //   name: 'ShopManage',
      //   meta: { title: '推荐店铺权重' }
      // },
      {
        path: '/shopList',
        component: () => import('@/views/shopmanage/shopList'), // Parent router-view
        name: 'shopList',
        meta: { title: '全部店铺' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: '用户反馈', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
