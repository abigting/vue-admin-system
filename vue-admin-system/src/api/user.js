import request from '@/utils/request'

//注册
export function register(data) {
    return request({
        url: '/xnrh-yhzx/api/user/register',
        method: 'post',
        data
    })
}

//登录
export function login(data) {
    return request({
        url: '/xnrh-yhzx/api/user/login',
        method: 'post',
        data
    })
}

// 注销
export function logout() {
    return request({
        url: '/xnrh-yhzx/api/user/logout',
        method: 'post',
        data:{}
    })
}

// 获取验证码
export function createImageCode(data) {
    return request({
        url: '/xnrh-yhzx/api/common/createImageCode',
        method: 'post',
        data
    })
}


// 通过ID查询用户详细基本信息接口
export function queryUserBaseInfoByUserId(data) {
    return request({
        url: '/xnrh-yhzx/api/user/queryUserBaseInfoByUserId',
        method: 'post',
        data
    })
}

// 用户修改密码接口
export function updatePassWord(data) {
    return request({
        url: '/xnrh-yhzx/api/user/updatePassWord',
        method: 'post',
        data
    })
}

// 右上角用户信息修改接口
export function updateUserInfo(data) {
    return request({
        url: '/xnrh-yhzx/api/user/updateUserInfo',
        method: 'post',
        data
    })
}

// 生成手机验证码接口
export function createTelphonCode(data) {
    return request({
        url: '/xnrh-yhzx/api/common/createTelphonCode',
        method: 'post',
        data
    })
}

// 数据交换登录
export function sjjhLogin(data) {
    return request({
        url: '/xnrh-sjjhpt/api/user/login',
        method: 'post',
        data
    })
}
