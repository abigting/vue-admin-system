import Layout from '@/views/layout/Layout'

const noticManage = {
  path: '/noticmanage',
  redirect: '/noticmanage/index',
  component: Layout,
  children: [
    {
      path: 'index',
      name: 'noticmanage/index',
      component: () => import('@/views/noticManage/index'),
      meta: {
        title: '通知公告管理',
        icon: 'tree',
        level: 1,
      }
    },
    {
      path: 'detail',
      name: 'noticmanage/detail',
      component: () => import('@/views/noticManage/detail'),
      hidden: true,
      meta: {
        title: '通知公告管理详情',
        level: 2,
      },
    },
  ]
}
export default noticManage
