import {Message,MessageBox} from 'element-ui';

//excel表格
export function downloadFile(obj, name, suffix) {
  const url = window.URL.createObjectURL(new Blob([obj], {
    type: 'application/vnd.ms-excel'
  }))
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  const fileName = name + suffix
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

//转换时间 年-月-日
export const times =  function (timestamp) {
  let date = new Date(timestamp);
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  let D = (date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ');
  return Y + M + D;
}

//校验手机号
export function isPhone(num) {
  if(num){
    if (!(/^1[34578]\d{9}$/.test(Number(num)))) {
      Message.error({
        showClose: true,
        message: '手机号码不规范！',
        type: 'error'
      });
      return true
    }
  }else{
    // Message.error({
    //   showClose: true,
    //   message: '请输入手机号',
    //   type: 'error'
    // });
    // return true
  }
}

//18位数
export function isIdCard(str) {
  if(str){
    if (str.length!=18) {
      Message.error({
        showClose: true,
        message: '身份证号码应为18位！',
        type: 'error'
      });
      return true
    }
  }
}

//判断字符串是否包含admin'或者 'editor
export function isvalidUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

// 判断字符串是否是https?:|mailto:|tal: 开头的
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
