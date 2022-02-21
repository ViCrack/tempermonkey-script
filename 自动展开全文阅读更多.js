// ==UserScript==
// @name        自动展开全文阅读更多
// @version     0.5.0
// @author      baster
// @description 自动展开网站内容而无需点击，去广告，去掉需要打开app的提示
// @description 增加码农之家
// @description 增加环球网移动端
// @description 增加联想知识库解决需要扫码关注才可继续浏览内容
// @description 增加太平洋电脑网
// @description 增加IT1352 IT屋，解决需要扫码关注15天内才能阅读全文
// @match       *://www.xz577.com/*
// @match       *://m.huanqiu.com/*
// @match       *://iknow.lenovo.com.cn/*
// @match       *://g.pconline.com.cn/*
// @match       *://www.it1352.com/*
// @resource
// @license     GNU
// @supportURL  https://greasyfork.org/zh-CN/users/306433-baster
// @homepageURL https://greasyfork.org/zh-CN/users/306433
// @namespace   https://greasyfork.org/zh-CN/users/306433
// @icon        https://i.v2ex.co/81ToM02ss.png
// @grant       GM_addStyle
// @inject-into content
// ==/UserScript==

;(function () {
  GM_addStyle =
    typeof GM_addStyle !== 'undefined'
      ? GM_addStyle
      : css => {
          const style = document.createElement('style')
          style.innerHTML = css
          document.head.appendChild(style)
        }

  const rules = [
    {
      // 码农之家
      wildcard: '*://www.xz577.com/*',
      hide: ['.article-content-body-more1'],
      expand: ['.con2']
    },
    {
      // IT屋
      wildcard: '*://www.it1352.com/*',
      hide: ['.arc-body-main-more'],
      expand: ['.arc-body-main'],
      script: () => {
        $.cookie('olduser', '1', {
          domain: 'it1352.com',
          expires: 1500
        })
      }
    },
    {
      // 太平洋电脑网
      wildcard: '*://g.pconline.com.cn/*',
      hide: [
        '.btnForAppOpenA',
        '.btnForAppOpenImg',
        '.add_artilce_handle',
        '.WakeUptop'
      ],
      expand: ['.art-content']
    },
    {
      // 环球网移动端
      wildcard: '*://m.huanqiu.com/*',
      hide: ['.unfold-btn'],
      expand: ['.article-content']
    },
    {
      // 联想知识库
      wildcard: '*://iknow.lenovo.com.cn/*',
      hide: ['.coverQRCode'],
      script: () => {
        localStorage.setItem('scanQRCode', '1')
        $(document).off('scroll.unable')
      }
    }
  ]

  function matchRule (str, rule) {
    var escapeRegex = str => str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1')
    return new RegExp(
      '^' +
        rule
          .split('*')
          .map(escapeRegex)
          .join('.*') +
        '$'
    ).test(str)
  }

  function getUrlQuery (url, urldecode = true) {
    let obj = {}
    let keyvalue = []
    let key = '',
      value = ''
    let paraString = url.substring(url.indexOf('?') + 1, url.length).split('&')
    for (let i in paraString) {
      keyvalue = paraString[i].split('=')
      key = keyvalue[0]
      value = keyvalue[1]
      obj[key] = urldecode ? decodeURIComponent(value) : value
    }
    return obj
  }

  function randomString (length, chars) {
    let result = ''
    for (let i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)]
    return result
  }

  function setCookie (name, value, days) {
    let expires = ''
    if (days) {
      let date = new Date()
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
      expires = '; expires=' + date.toUTCString()
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/'
  }

  function getCookie (name) {
    let nameEQ = name + '='
    let ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) == ' ') c = c.substring(1, c.length)
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length)
    }
    return null
  }

  function eraseCookie (name) {
    document.cookie = name + '=; Max-Age=-99999999;'
  }

  function clearAdLoop () {
    let id = setTimeout(';')
    for (let i = 0; i < id; i++) {
      clearTimeout(i)
    }
    id = setInterval(';')
    for (let i = 0; i < id; i++) {
      clearInterval(i)
    }
  }

  function safeWaitJQuery (callbackFunc) {
    let jQueryTimer = setInterval(function () {
      if (typeof jQuery !== 'undefined') {
        clearInterval(jQueryTimer)
        callbackFunc(jQuery)
      }
    }, 300)
  }

  for (const rule of rules) {
    let hit = false
    if ('regex' in rule && rule.regex.test(window.location.href)) {
      hit = true
    } else if (
      'wildcard' in rule &&
      matchRule(window.location.href, rule.wildcard)
    ) {
      hit = true
    }
    if (hit) {
      let style = ''
      if ('hide' in rule && rule.hide.length > 0) {
        style +=
          rule.hide.join(',\n') +
          `
                {
                    display: none !important;
                }

                `
      }
      if ('expand' in rule && rule.expand.length > 0) {
        style +=
          rule.expand.join(',\n') +
          `
                {
                    height: auto !important;
                    max-height: none !important;
                }

                `
      }
      if ('style' in rule && rule.style.length > 0) {
        style += rule.style
      }
      GM_addStyle(style)
      if (typeof rule.script === 'function') {
        window.addEventListener('load', rule.script)
      }
      break
    }
  }
})()
