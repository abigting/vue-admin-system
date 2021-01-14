import {
  asyncRoutes,
  constantRoutes
} from '@/router'
import storage from '@/utils/localStorage'
import router from '../../router'

const state = {
  addRoutes: [],
  routes: [],
};

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
    state.routes = constantRoutes.concat(routes);
  },
};

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

function hasPermission(menuMap, route) {
  if (route.meta && route.meta.menuId) {
    for (const item of menuMap) {
      if (item === route.meta.menuId) {
        return true
      }
    }
    return false
  } else {
    return true
  }
}

function filterAsyncRouter(asyncRoutes, menuMap) {
  const accessedRouters = asyncRoutes.filter(route => {
    if (hasPermission(menuMap, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, menuMap)
      }
      return true
    }
    return false
  });
  return accessedRouters
}

const actions = {
  generateRoutes({commit}, data) {
    return new Promise(resolve => {
      const accessRouters = filterAsyncRouter(asyncRoutes, data);
      commit('SET_ROUTES', accessRouters);
      resolve(accessRouters)
    })
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
