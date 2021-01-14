import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Layout from './layout/Layout'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            hidden: true
        },
        {
            path: '/login',
            name: 'login',
            hidden: true,
            component: () => import(/* webpackChunkName: "about" */ './views/login/index'),
        },
        {
            path: '/system',
            name: 'system',
            component: Layout,
            meta: {
                title: '设置中心',
                icon: 'setting',
            },
            children: [
                {
                    path: 'role',
                    component: () => import(/* webpackChunkName: "about" */ './views/system/role'),
                    name: 'role',
                    meta: {title: '用户中心', level: 1, noCache: true}
                },
                {
                    path: 'user',
                    component: () => import(/* webpackChunkName: "about" */ './views/system/user'),
                    name: 'user',
                    meta: {title: '角色管理', level: 1, noCache: true}
                }
            ]
        },
    ]
})
