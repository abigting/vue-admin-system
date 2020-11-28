import Layout from '@/views/layout/Layout'
const home = {
  path: '/',
  redirect: '/index',
  component: Layout,
  children: [{
      path: 'index',
      name: 'index',
      component: () => import('@/views/home/index'),
       meta: {
         title: '首页',
         icon: 'home'
       },
    },{
      path: 'index/list',
      hidden:true,
      name: '/index/list',
      component: () => import('@/views/home/list'),
       meta: {
         title: '消息列表',
         parentPath:"/index", //上一级的路径 用作左侧菜单选中
       },
    },{
      path: 'index/detail',
      hidden:true,
      name: '/index/detail',
      component: () => import('@/views/home/detail'),
       meta: {
         title: '详情',
         parentPath:"/index", //上一级的路径 用作左侧菜单选中
       },
    },
  ]
}
export default home
