import axios from "axios";
import {getToken, removeAllInfo} from '@/utils/auth';
import {Message} from 'element-ui';
// import storage from '~/utils/localStorage';

let request = axios.create({
  // baseURL: 'http://223.4.64.26:10000',     //基础路径,根据不同环境设置 baseURL, 最终发送请求时的URL为: baseURL + 发送请求时写URL ,
  // timeout: 5000,     //超时时间，5000毫秒,
});

// request.defaults.headers.common["access_token"] = getToken();

request.interceptors.request.use(function (config) {
  config.headers['access_token'] = getToken() || '';
  return config;
}, function (err) {
  return Promise.reject(err);
});

const AUTHS =['AUTH.RESOURCE.E0002', 'AUTH.RESOURCE.E0004', 'AUTH.SERVER.E0003'];

request.interceptors.response.use(async (res) => {
  try {
    const {data} = res;
    const {success, exceptionContent, value, errorCode} = data;
    if (success) {
      return value || {};
    } else {
      //检验类提示
      if (errorCode === 'validator') {
        let messageData = '';
        if (data.attachments.errors && data.attachments.errors.length) {
          data.attachments.errors.forEach(s => messageData = messageData.concat(`${s.name}${s.message}`, ';'));
          Message.error(messageData);
        }
      } else if (AUTHS.includes(errorCode)) {
        // 防止连续弹出多个message
        Message.closeAll();
        Message.error(exceptionContent||'登录权限失效，退出登录');
        setTimeout(() => {
          removeAllInfo();
          location.reload();
        }, 500)
      }
      else if (errorCode === 'CORE.E0001') {
        // 上一次操作正在处理中，请稍后再试---无需提示
      } else {
        // 防止连续弹出多个message
        Message.closeAll();
        Message.error(exceptionContent || '接口未知错误');
      }
    }
  } catch (e) {
    Message.error('连接超时');
  }
}, function (err) {
  // 防止连续弹出多个message
  Message.closeAll();
  Message.error('连接超时');
});

export default request;
