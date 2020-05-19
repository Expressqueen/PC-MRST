/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')
      .replace(/\+/g, ' ') +
    '"}'
  )
}

//获取所有兄弟节点
export function siblings(elm) {
  var a = [];
  var p = elm.parentNode.children;
  for (var i = 0, pl = p.length; i < pl; i++) {
    if (p[i] !== elm) a.push(p[i]);
  }
  return a;
}
//判断class是否存在
export function hasClass(ele, cls) {
  return ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
}
//为指定的dom元素增加样式
export function addClass(ele, cls) {
  if (!this.hasClass(ele, cls)) ele.className += " " + cls;
}
//为指定的dom元素删除样式
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
      var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
      ele.className = ele.className.replace(reg, " ");
  }
}
//实现toggle class功能
export function toggleClass(ele,cls){ 
  if(hasClass(ele,cls)){ 
      removeClass(ele, cls); 
  }else{ 
      addClass(ele, cls); 
  } 
}
/**
 * 函数防抖 (只执行最后一次点击)
 * @param fn
 * @param delay
 * @returns {Function}
 * @constructor
 */
export const _debounce = (fn, t) => {
  let delay = t || 500;
  let timer;
  return function () {
      let args = arguments;
      if(timer){
          clearTimeout(timer);
      }
      timer = setTimeout(() => {
          timer = null;
          fn.apply(this, args);
      }, delay);
  }
};
/**
* 函数节流
* @param fn
* @param interval
* @returns {Function}
* @constructor
*/
export const Throttle = (fn, t) => {
  let last;
  let timer;
  let interval = t || 500;
  return function () {
      let args = arguments;
      let now = +new Date();
      if (last && now - last < interval) {
          clearTimeout(timer);
          timer = setTimeout(() => {
              last = now;
              fn.apply(this, args);
          }, interval);
      } else {
          last = now;
          fn.apply(this, args);
      }
  }
};
