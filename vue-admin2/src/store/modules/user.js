import {
  login,
  logout,
  // getInfo
} from '@/api/login';
import {
  getToken,
  setToken,
  removeToken,
  setUserInfo,
  getUserInfo,
} from '@/utils/auth';

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
};
const actions = {
  // 登录
  Login({
    commit
  }, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo).then(res => {
        const data = res.value
        if (data) {
          commit('SET_TOKEN', data.token)
          setToken(data.token)
          setUserInfo(data.userInfo)
        }
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  //登录过期或无权限访问
  loginExpired({
    commit,
    state
  }){
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      setUserInfo({})
      resolve()
    })
  },

  // 注销
  LogOut({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      logout({
        accessToken: state.token
      }).then(res => {
        if (res.success) {
          commit('SET_TOKEN', '')
          removeToken()
          setUserInfo({})
        }
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取用户信息
  getInfo({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
        getInfo({accessToken:state.token}).then(response => {
          var data = {
            roles:response.value
          }
          if (!data) {
            reject('访问权限验证失败或频繁,请重试！')
          }
          const {roles} = data;
          if (!roles || roles.length <= 0) {
            reject('访问权限返回异常,请联系管理员处理！')
          }
          commit('SET_ROLES',roles)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
    })
  },

  // 移除token
  resetToken({
    commit
  }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // 异步路由表
  async changeRoles({
    commit,
    dispatch
  }, role) {
    const token = role + '-token'
    commit('SET_TOKEN', token)
    setToken(token)
    const {
      roles
    } = await dispatch('getInfo')
    resetRouter()
    const accessRoutes = await dispatch('permission/generateRoutes', roles, {
      root: true
    })
    router.addRoutes(accessRoutes)
    dispatch('tagsView/delAllViews', null, {
      root: true
    })
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
