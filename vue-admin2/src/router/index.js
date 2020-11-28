import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/layout/Layout'
import home from './module/home';
import personManage from './module/personlManage'; //人员管理
// import trainManage from './module/trainManage'; //培训考试管理
import noticManage from './module/noticManage'; //通知公告管理

Vue.use(Router)

export const constantRoutes = [
   { ...home},
   { ...personManage},
   // { ...trainManage},
   { ...noticManage},
   {
     path: '/login',
     component: () => import('@/views/login/index'),
     hidden: true
   },
   {
     path: '/register',
     component: () => import('@/views/login/register'),
     hidden: true
   },
  {
    path: '/navigation',
    component: () => import('@/views/navigation/index'),
    hidden: true
  },
   {
     path: '/forget_pass',
     component: () => import('@/views/login/forget_pass'),
     hidden: true
   },
   {
     path: '/404',
     component: () => import('@/views/404'),
     hidden: true
   },
  {
    path: '/video',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'video/index',
        component: () => import('@/views/video/index'),
        meta: {
          title: '海康威视视频',
          icon: 'tree',
          level: 1,
        }
      }
    ]
  },
   {
     path:'*',
     redirect:"/404",
     hidden: true
   },
]

export const asyncRoutes = []
const createRouter = () => new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})
const router = createRouter();
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
