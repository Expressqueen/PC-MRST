/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * @param  {Object} rule 传入的验证对象
 * @param {String} value 输入的值
 * @param {Function} callback 回调函数
 */
//验证密码
export let validpass=(rule,value,callback)=>{
  if (value !== '') { 
    var reg=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,18}$/;
    if(!reg.test(value)){
      callback(new Error('密码必须由6-18位的大小写字母和数字组成'));
    }
  }else{
    callback(new Error('请输入密码'));
  }
  callback();
}
//验证手机号
export let validTellpone=(rule,value,callback)=>{
  if (value !== '') { 
    var reg=/^1[3456789]\d{9}$/;
    if(!reg.test(value)){
      callback(new Error('请输入有效的手机号码'));
    }
  }
  callback();
}
//验证邮箱
export let validEmail=(rule,value,callback)=>{
  if (value === '') {
    callback(new Error('请输入邮箱'));
  } else {
    if (value !== '') { 
      var reg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if(!reg.test(value)){
        callback(new Error('请输入有效的邮箱'));
      }
    }
    callback();
  }
}


