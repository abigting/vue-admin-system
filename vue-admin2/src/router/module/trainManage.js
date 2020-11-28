import Layout from '@/views/layout/Layout'

const trainManage = {
  path: '/trainmanage',
  name: 'trainmanage',
  redirect: '/trainmanage/train',
  meta: {
    title: '培训考试管理',
    icon: 'tree'
  },
  component: Layout,
  children: [{
    path: 'questionbank',
    name: 'questionbank',
    component: () => import('@/views/trainManage/questionBank/index'),
    meta: {
      title: '题库管理',
      level:1,
    },
    children: [
      {
        path: 'detail',
        name: 'questionbank/detail',
        component: () => import('@/views/trainManage/questionBank/detail'),
        hidden: true,
        meta: {
          title: '题库管理详情',
          level:2,
        },
      },
    ]
  }, {
    path: 'rules',
    name: 'rules',
    component: () => import('@/views/trainManage/rules/index'),
    meta: {
      title: '考试规则管理',
      level:1,
    },
    children: [
      {
        path: 'detail',
        name: 'rules/detail',
        component: () => import('@/views/trainManage/rules/detail'),
        hidden: true,
        meta: {
          title: '考试规则管理详情',
          level:2,
        },
      },
    ]
  },
    {
      path: 'info',
      name: 'info',
      component: () => import('@/views/trainManage/info/index'),
      meta: {
        title: '资料管理',
        level:1,
      },
      children: [
        {
          path: 'detail',
          name: 'info/detail',
          component: () => import('@/views/trainManage/info/detail'),
          hidden: true,
          meta: {
            title: '资料管理详情',
            level:2,
          },
        },
      ]
    },
  ]
}
export default trainManage
