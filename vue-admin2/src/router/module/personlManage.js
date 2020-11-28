import Layout from '@/views/layout/Layout'
const personManage = {
  path: '/personmanage',
  redirect: '/personmanage/index',
  component: Layout,
  children: [{
      path: 'index',
      name: 'personmanage/index',
      component: () => import('@/views/personlManage/person/index'),
       meta: {
         title: '人员管理',
         icon: 'user'
       },
    },{
      path: 'detail',
      hidden:true,
      name: 'personmanage/index/detail',
      component: () => import('@/views/personlManage/person/detail'),
       meta: {
         title: '人员详情',
         parentPath:"/personmanage/index", //上一级的路径 用作左侧菜单选中
       },
    },
  ]
}
export default personManage
