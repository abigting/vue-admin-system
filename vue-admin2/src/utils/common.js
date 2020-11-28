/**
 * @description 通用方法
 * @author Feng.xiuting
 * @date 2020/2/27
 */
import Cookies from 'js-cookie';
import request from './request';
import qs from 'qs';
export function setCookie(name, val) {
  Cookies.set(name, val, { expires: 7, path: '/' });
}

export function getCookie(name) {
  return Cookies.get(name);
}

export function removeCookie(name) {
  Cookies.remove(name);
}

export function removeAllcookie() {
  Cookies.remove('userInfo');
  Cookies.remove('__authority');
}

export function getUserInfo() {
  // return Cookies.getJSON('bigScreenInfo') || {};
  return {areaCode:getUrlVars().areaCode||'330000000'};
}

export function getToken() {
  // return Cookies.getJSON('bigScreenInfo') || {};
  return Cookies.get('token');
}

function getUrlVars() {
  const vars = {};
  window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
    function (m, key, value) {
      vars[key] = value;
    }
  );
  return vars;
}

export function packRespnseData(res) {
  let defRes = { result: '01', errorMsg: '', resultMsg: {}, ...res };
  return defRes;
}

/**
 * @description obj to query string
 * @param {object} obj
 */
export const serialize = (obj) => {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
  return str.join('&');
};

/**
 * @description 下载文件
 * @param api：接口  name：文件名
 */
export function downloadFile(api) {
  let xmlHttp = null;
  if (window.ActiveXObject) {
    xmlHttp = new window.ActiveXObject('Microsoft.XMLHTTP');
  } else if (window.XMLHttpRequest) {
    xmlHttp = new XMLHttpRequest();
  }
  if (xmlHttp != null) {
    xmlHttp.ContentType = 'application/vnd.ms-excel';
    xmlHttp.open('get', api, true);
    xmlHttp.setRequestHeader('token', getUserInfo().token);
    xmlHttp.responseType = 'blob';
    xmlHttp.send();
    xmlHttp.onreadystatechange = doResult;
  }

  function doResult() {
    let link = document.createElement('a');
    link.style.display = 'none';
    if (xmlHttp.readyState === 4) {
      if (xmlHttp.status === 200) {
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          let url = new Blob([xmlHttp.response], { type: 'application/vnd.ms-excel' });
          window.navigator.msSaveOrOpenBlob(url, decodeURIComponent(xmlHttp.getResponseHeader("content-disposition").split(";")[1].split("filename=")[1]));
        }else{
          let url = createObjectURL((new Blob([xmlHttp.response],
            { type: 'application/vnd.ms-excel' })));
          link.download = decodeURIComponent(xmlHttp.getResponseHeader("content-disposition").split(";")[1].split("filename=")[1]);
          link.href = url;
          link.click();
        }
      } else {
        // Message.error('下载失败');
      }
    }
  }
}

export function createObjectURL(object) {
  // return (window.URL || window.webkitURL).createObjectURL(object);
  return (window.URL) ? window.URL.createObjectURL(object) : window.webkitURL.createObjectURL(object);
}

/**
 * @description 判断能否录制音频
 */
export function adaptDediaDevices() {
  let getUserMedia = (
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia ||
    navigator.mediaDevices
  );
  if (!getUserMedia)
    return false;
  else
    return true;
}

/**
 * @description 获取blob长度
 * @param blob
 */
export function getAudioBlobDuration(blob) {
  const tempAudioEl = document.createElement('audio');

  const durationP = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('timeout');
    }, 200);

    tempAudioEl.addEventListener('loadedmetadata', () => {
      if (tempAudioEl.duration === Infinity) {
        tempAudioEl.currentTime = Number.MAX_SAFE_INTEGER;
        tempAudioEl.ontimeupdate = () => {
          tempAudioEl.ontimeupdate = null;
          resolve(tempAudioEl.duration);
          tempAudioEl.currentTime = 0;
        };
      } else {
        resolve(tempAudioEl.duration);
      }
    });
  });

  tempAudioEl.src = window.URL.createObjectURL(blob);

  return durationP;
}


/**
 * 校验手机号
 * @param callback
 * @param value
 */
export const validatePhone = (callback, value) => {
  const phoneReg = /^1[3-578]\d{9}$/;
  if (value && !phoneReg.test(value)) {
    callback('请填写正确的手机号码');
  }
};

/**
 * 弃用
 * 查询字典表getCode
 * @param api api网关
 * @param type 字典类型
 * @param cache 是否缓存
 * @returns {Promise.<*>}
 */
// export async function getDictionary(type, module, cache = true, api = api) {
//   // if (cache) {
//   //   const obj = JSON.parse(sessionStorage.getItem(type));
//   //   if (!!obj) {
//   //     return obj;
//   //   }
//   // }
//   const res = await request(`/zjjkz/dictionary/find?type=${type}&module=${module}`); //字典表接口
//   if (res) {
//     const { data } = res;
//
//     return data;
//   }
//
//   // if (!obj || (Object.keys(obj)).length === 0) {
//   //   return [];
//   // }
//
//   // const sort = obj.id ? _.sortBy(obj, 'id') : obj;
//   // sessionStorage.setItem(type, JSON.stringify(sort));
//   // return sort;
// }

/**
 * 级联组件
 * @param cache
 * @param name 存储的名字
 * @param url 链接接口
 * @returns {Promise.<*>}
 */
export async function getOtherCascader(name, url, cache = true) {
  if (cache) {
    const obj = JSON.parse(sessionStorage.getItem(name));
    if (!!obj) {
      return obj;
    }
  }

  const obj = await request(url);
  if (!obj || (Object.keys(obj)).length === 0) {
    return [];
  }

  sessionStorage.setItem(name, JSON.stringify(obj));
  return obj;
}

// export const formatTime = (time, type) => {
//   if (type) {
//     return time ? moment(time, type) : null;
//   } else
//     return time ? moment(time, 'YYYY-MM-DD') : null;
// };


// 电话号码校验
export function phoneValidator(mobile = '', callback) {
  let phone = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(19[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
  let tel = /^\d{3,4}-?\d{7,9}$/;
  if (mobile.includes('*')) {
    callback();
  } else if (mobile.length === 0) { // 考虑非必填字段情况
    callback();
  } else if (tel.test(mobile) || phone.test(mobile)) {
    callback();
  } else {
    callback('请正确填写您的联系电话!(区号-电话号码或者手机号)');
  }
}

// 电话号码校验
export function mobilePhoneValidator(mobile = '', callback) {
  let phone = /^1[3456789]\d{9}$/;
  if (mobile.length === 0) { // 考虑非必填字段情况
    callback();
  } else if (phone.test(mobile)) {
    callback();
  } else {
    callback('请正确填写您的手机号!');
  }
}

/**
 * 数据回填时, 将地区编码分割成控件可用的数组格式
 */
export function splitAddrCode(code) {
  if (code) {
    // return [`${code.substr(0, 3)}000`, `${code.substr(0, 4)}00`, code];
    if (code.substr(-4) !== '0000') {
      if (code.substr(-2) === '00') { //市级
        return [`${code.substr(0, 2)}0000`, `${code.substr(0, 4)}00`];
      } else {
        return [`${code.substr(0, 2)}0000`, `${code.substr(0, 4)}00`, code];
      }
    } else {
      return [`${code.substr(0, 3)}000`];
    }
  }else{
    return []
  }
}


/**
 * 数据回填时, 将地区编码分割成控件可用的数组格式，有街道，比普通的多000
 */
export function splitAddrCodeWithStreet(code) {
  if (code) {
    // return [`${code.substr(0, 3)}000`, `${code.substr(0, 4)}00`, code];
    if (code.substr(-7) !== '0000000') {
      if (code.substr(-5) === '00000') { //市级
        return [`${code.substr(0, 2)}0000000`, `${code.substr(0, 4)}00000`];
      }  if (code.substr(-3) === '000') { //市级
        return [`${code.substr(0, 2)}0000000`, `${code.substr(0, 4)}00000`, `${code.substr(0, 6)}000`];
      } else {
        return [`${code.substr(0, 2)}0000000`, `${code.substr(0, 4)}00000`, `${code.substr(0, 6)}000`, code];
      }
    } else {
      return [`${code.substr(0, 2)}0000000`];
    }
  }else{
    return []
  }
}

/**
 * 生成绑定上传文件的linkTableId，很迷，为啥不返回链接，非得用一个id来绑定。。。
 */
// export function createId() {
//   return moment().valueOf() + Math.random().toString(36).substr(3);
// }

/**
 * 行政区划判断 按照用户信息中的areaCode进行限制
 * @param callback
 * @param value
 */

export const AddressCodeRule = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('行政区划不能为空'));
  }
  if (getUserInfo() && getUserInfo().areaCode) {
    const area = splitAddrCodeWithStreet(getUserInfo().areaCode) || [];
    const levelCode = area.length;
    // 市
    if (levelCode === 2) {
      if (JSON.stringify(value.slice(0, 2)) !== JSON.stringify(area)) callback('请选择当前用户地区');
    }
    // 县
    else if (levelCode === 3) {
      if (JSON.stringify(value.slice(0, 3)) !== JSON.stringify(area)) callback('请选择当前用户地区');
    }
    // 街道
    else if (levelCode === 4) {
      if (JSON.stringify(value) !== JSON.stringify(area)) callback('请选择当前用户地区');
    }
    callback();
  }
};

/**
 * 判断行政区划是第几级
 * @param areaCode
 */
export const JudgeAddressLevel = (areaCode='') => {
  let req1 = areaCode.slice(-2);
  let req2 = areaCode.slice(-4);
  if(req2==='0000'){
    return 1
  }else if(req1==='00'){
    return 2
  }else return 3;
};

/**
 * 限定字数
 * @param s
 * @param num
 */
export function limitLength(s, num) {
  if (s) {
    if (s.length > num) {
      return `${s.substr(0, num)}...`;
    } else return s;
  }
}

/**
 * 时间范围选择 - 限制结束时间不小于开始时间
 */
// export function disabledStartTime(current, form, field = 'endTime') {
//   const endTime = form.getFieldValue(field);
//   if (endTime) {
//     return current && current > endTime;
//   }
//   return current && current > moment();
// }

/**
 * 时间范围选择 - 限制开始时间不大于结束时间
 */
// export function disabledEndTime(current, form, field = 'startTime') {
//   const startTime = form.getFieldValue(field);
//   if (startTime) {
//     return current < startTime || current > moment();
//   }
//   return current && current > moment();
// }


/**
 *  批量导出-无需传参数的实现方式
 */
// export function batchExport(href, queryValues) {
//   const link = document.createElement('a');
//   link.href = `${href}?${qs.stringify(queryValues)}`;
//   link.download = '导出.xls';
//   link.click();
// }

/**
 *  批量导出-需要传token
 */
export function batchExport(href, queryValues) {
  let xmlHttp = null;
  if (window.XMLHttpRequest) {
    xmlHttp = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    xmlHttp = new window.ActiveXObject('Microsoft.XMLHTTP');
  }
  if (xmlHttp != null) {
    xmlHttp.ContentType = 'application/vnd.ms-excel';
    xmlHttp.open('get', `${href}?${qs.stringify(queryValues)}`, true);
    xmlHttp.setRequestHeader('token', getUserInfo().token);
    xmlHttp.responseType = 'blob';
    xmlHttp.send();
    xmlHttp.onreadystatechange = doResult;
  }

  function doResult() {
    let link = document.createElement('a');
    link.style.display = 'none';
    if (xmlHttp.readyState === 4) {
      if (xmlHttp.status === 200) {
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          let url = new Blob([xmlHttp.response], { type: 'application/vnd.ms-excel' });
          window.navigator.msSaveOrOpenBlob(url, decodeURIComponent(xmlHttp.getResponseHeader("content-disposition").split(";")[1].split("filename=")[1]));
        }else{
          let url = createObjectURL((new Blob([xmlHttp.response],
            { type: 'application/vnd.ms-excel' })));
          link.download = decodeURIComponent(xmlHttp.getResponseHeader("content-disposition").split(";")[1].split("filename=")[1]);
          link.href = url;
          link.click();
        }
      } else {
        Message.error('下载失败');
      }
    }
  }
}

/**
 *  无value的显示-
 */
export const NonNull = ({ flag, children }) => (flag !== undefined && flag !== null ? children : '-');


// 身份证号码校验
export function idCardValidator(value, cardTpye, callback) {
  if(value && value.includes('*')){
    callback()
  } else if (cardTpye && cardTpye === '01') {
    const reg =/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/;
    if(!reg.test(value)){
      callback('请输入正确的身份证号')
    }
    callback()
  }
  callback()
}

// 社会信用代码
export function creditCodeValidator(credit = '', callback) {
  if(credit.includes('*')){
    callback()
  }else if (credit.length === 0) { // 考虑非必填字段情况
    callback()
  }else if (credit.length > 0) {
    if(credit.length > 18) {
      callback('请正确填写社会信用代码(18位)')
    }
    if(credit.length > 0 && credit.length < 18) {
      callback('请正确填写社会信用代码(18位)')
    }
    callback()
  }
}

export function dealPrintData(data) {
  data =data.map(s=>{return{ ...s, examineResult:s.examineResult==='1'?'合格':'不合格'}});
  data = data.map(s=> {
    if(s.idCard){
      let idCard=s.idCard;
      if(idCard.length===15){
        idCard = idCard.replace(/(\d{6})\d{5}(\d{3})/, "$1****$2");
      }else if(idCard.length===18){
        idCard = idCard.replace(/(\d{10})\d{4}(\d{4})/, "$1****$2");
      }
      return {...s, idCard};
    }else{
      return s;
    }
  });
  return data;
}


/**
 * 页面布局
 */
export function getGrid(span = 12) {
  if (span === 24) {
    return {
      xl: 24, lg: 24, md: 24, sm: 24,
    };
  } else {
    return {
      xl: span, lg: 12, md: 24, sm: 24,
    };
  }
}

export function isvalidUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}


export function addWan(integer, number, mutiple, decimalDigit) {
  var digit = getDigit(integer);
  if (digit > 3) {
    var remainder = digit % 8;
    if (remainder >= 5) { // ‘十万’、‘百万’、‘千万’显示为‘万’
      remainder = 4;
    }
    return Math.round(number / Math.pow(10, remainder + mutiple - decimalDigit)) / Math.pow(10, decimalDigit) + '万';
  } else {
    return Math.round(number / Math.pow(10, mutiple - decimalDigit)) / Math.pow(10, decimalDigit);
  }
}
function getDigit(integer) {
  var digit = -1;
  while (integer >= 1) {
    digit++;
    integer = integer / 10;
  }
  return digit;
}
export function addChineseUnit(number, decimalDigit) {
  decimalDigit = decimalDigit == null ? 2 : decimalDigit;
  var integer = Math.floor(number);
  var digit = getDigit(integer);
  // ['个', '十', '百', '千', '万', '十万', '百万', '千万'];
  var unit = [];
  if (digit > 3) {
    var multiple = Math.floor(digit / 8);
    if (multiple >= 1) {
      var tmp = Math.round(integer / Math.pow(10, 8 * multiple));
      unit.push(addWan(tmp, number, 8 * multiple, decimalDigit));
      for (var i = 0; i < multiple; i++) {
        unit.push('亿');
      }
      return unit.join('');
    } else {
      return addWan(integer, number, 0, decimalDigit);
    }
  } else {
    return number;
  }
}
