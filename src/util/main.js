import BigNumber from "bignumber.js";
import moment from "moment";
import Config from "@/util/config.js";

export function openShare (locale = 'en', scode) {
  let img = Config.shareUrl[locale]
  if (!img) {
    img = Config.shareUrl['en']
  }
  console.log('window.TECO_postMessage => show_share_dialog')
  console.log(img)
  console.log(Config.nashUrl + '?scode=' + scode)
  window.TECO_postMessage && window.TECO_postMessage({
    type: "show_share_dialog_nash",
    name: '',
    // 分享链接
    shareUrl: Config.nashUrl + '?scode=' + scode,
    // 分享图片
    shareImg: img,
    shareCode: scode,
    language: locale
  })
}

export function formatDataTime (times) {
  let tmp = moment(times)
  return tmp.format('YYYY-MM-DD')
}

export function formatDataTime2 (times) {
  let tmp = moment(times)
  return tmp.format('YYYY-MM-DD HH:mm')
}

export function formatNums(nums, deep = 4) {
  if (!nums || isNaN(nums) || nums === "0") {
    return 0;
  }
  // console.log(deep)
  BigNumber.config({ EXPONENTIAL_AT: 100 });
  let tmp = new BigNumber(nums);
  let fixlen = 2;
  if (deep === 2) {
    fixlen = 4;
  }
  let res = "";
  if (tmp.isLessThan(1000)) {
    res = tmp.toFixed(fixlen, 1);
    if (deep !== 2 && res === "0.00") {
      // res = "< 0.01";
      res = '0'
    }
    if (deep === 2 && res === "0.0000") {
      // res = "< 0.0001";
      res = '0'
    }
  } else if (tmp.isLessThan(1000 * 1000)) {
    res = tmp.div(1000).toFixed(fixlen, 1) + "K";
    // } else if (tmp.isLessThan(1000 * 1000 * 1000)) {
  } else if (tmp.isLessThan(1000 * 1000 * 1000)) {
    res = tmp.div(1000 * 1000).toFixed(fixlen, 1) + "M";
  } else {
    res = tmp.div(1000 * 1000 * 1000).toFixed(deep, 1) + "B";
  }
  return res;
}

export function removeLastZero(str) {
  if (str === 'NaN') return '0'
  // 抹掉字符串末尾的0
  // 整数部分添加千位分隔符
  let nums = (str + '').split('.')
  let formats = []
  if (nums[0].length > 3) {
    let tmp = nums[0]
    formats[0] = ''
    while (tmp.length > 3) {
      formats[0] = tmp.substring(tmp.length - 3) + (formats[0] !== '' ? ',' + formats[0] : '')
      tmp = tmp.substring(0, tmp.length - 3)
    }
    formats[0] = tmp + ',' + formats[0]
  } else {
    formats[0] = nums[0]
  }
  // console.log(formats[0])
  if (!nums[1]) {
    formats[1] = ''
  } else {
    let last = nums[1]
    if (last[last.length - 1] === '0') {
      let ss = []
      let end = false
      for (let i = last.length - 1; i >= 0; i--) {
        if (!end) {
          if (last[i] !== '0') {
            end = true
            ss.push(last[i])
          }
        } else {
          ss.push(last[i])
        }
      }
      ss.reverse()
      last = ss.join('')
      if (last[last.length - 1] === '.') {
        last = last.substring(0, last.length - 1)
        // str += '0'
      }
    }
    formats[1] = last
  }
  if (formats[1] === '') {
    return formats[0]
  } else {
    return formats.join('.')
  }
}

export function editE(num) {
  const number = Number(num);
  //处理非数字
  if (isNaN(number)) {
    return number.toString();
  }
  //处理不需要转换的数字
  var str = "" + number;
  if (!/e/i.test(str)) {
    return number;
  }
  return number
    .toFixed(18)
    .replace(/\.?0+$/, "")
    .toString();
}

export function formatFreeAmount2(nums, decimals, fixnum) {
  BigNumber.config({ EXPONENTIAL_AT: 100 });
  let tmp = new BigNumber(nums);
  if (tmp.isNaN()) {
    return "0";
  }
  let tmpf = 4;
  if (fixnum === 0 || fixnum) {
    tmpf = fixnum
  }
  let s = tmp.dividedBy(new BigNumber(10).pow(decimals));
  return s.toFixed(tmpf, 1)
}

export function formatAddress(address = "", firstlen = 6, lastlen = 3) {
  const tmp = [];
  if (!address) {
    return "";
  }
  tmp.push(address.substr(0, firstlen));
  tmp.push("...");
  if (lastlen !== false) {
    tmp.push(address.substr(-1 * lastlen));
  }
  return tmp.join("");
}

export function openNewWindow (url) {
  if (window.TECO_postMessage) {
    window.TECO_postMessage({
      type: 'openURL',
      url
    })
  } else {
    try {
      let yourWindow = window.open();
      yourWindow.opener = null;
      yourWindow.location = url;
    } catch (e) {
      location.href = url
    }
  }
}

export function isFullScreen () {
  let isNewIphone = window && testUA('iPhone') && window.screen.height >= 812 && window.devicePixelRatio >= 2;

  return isNewIphone || judgeBigScreen()

  function testUA (str) {
    return navigator.userAgent.indexOf(str) > -1
  }

  function  judgeBigScreen() {
    let result = false;
    const rate = window.screen.height / window.screen.width;
    let limit =  window.screen.height === window.screen.availHeight ? 1.8 : 1.65; // 临界判断值
    // window.screen.height为屏幕高度
    //  window.screen.availHeight 为浏览器 可用高度
    if (rate > limit) {
      result = true;
    }
    return result;
  }
}

export function formatUrl () {
  let url = location.href
  if (url.indexOf('?') < url.indexOf('#') && url.indexOf('?') >= 0 && url.indexOf('#') >= 0) {
    // console.log('format')
    let m = url.substring(url.indexOf('?'), url.indexOf('#'))
    // console.log(m)
    if (m.length > 5) {
      let s = url.substring(0, url.indexOf('?'))
      // console.log(s)
      let e = url.substring(url.indexOf('#'))
      // console.log(e)
      location.href = s + e + m
    }
    // location.href = url + m
  }
}

export function isMobile() {
  let tmpU = window.navigator.userAgent.toLowerCase();
  return /AppleWebKit.*Mobile.*/i.test(tmpU);
}

export function changePageTitle(title) {
  console.log('change page title', title)
  if (window.TECO_postMessage) {
    window.TECO_postMessage({
      type: "set_webview_title",
      title: title,
      name: ''
    })
  }
}

export function formatErrorCode(str) {
  switch (str) {
    case "Transaction Failure":
      return "errorcode.transfail";
    case "User denied transaction":
      return "errorcode.denied";
    case "Opration Failure":
      return "errorcode.opfail";
  }
  return str;
}
