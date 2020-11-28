import {
  asyncRoutes,
  constantRoutes
} from '@/router'

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

function routerMatch(permission, asyncRouter) {
  return new Promise((resolve) => {
    const routers = [];
    function createRouter(permission) {
      permission.forEach((item) => {
        let path = item.path;
        asyncRouter.find((s) => {
          let itemChildren = s.children;
          if (s.path == path) {
            s.children = [];
            itemChildren.forEach(j => {
              // j  二级 左侧菜单展开项
              let childrenPath = j.path;
              item.children.find((k) => {
                if (k.path == childrenPath) {
                  j.meta.permission = [];
                  if (k.children && k.children.length > 0) {
                    k.children.map(g => {
                      let button = g.path || null; //按钮级
                      j.meta.permission.push(button)
                    })
                  }
                  s.children.push(j) // s 一级 左侧菜单
                }
              })
            })
            routers.push(s);
          }
        })
      })
    }
    createRouter(permission)
    resolve(routers)
  })
}

const actions = {
  generateRoutes({
    commit
  }, roles) {
    return new Promise(resolve => {
      let accessedRoutes = routerMatch(roles, asyncRoutes);
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
