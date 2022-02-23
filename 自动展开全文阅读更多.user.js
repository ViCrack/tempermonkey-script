// ==UserScript==
// @name        自动展开全文阅读更多
// @version     1.20.1
// @author      baster
// @description 自动展开网站内容而无需点击，去掉部分烦人广告，去掉需要打开app的提示，网址重定向优化
// @description 增加人民日报
// @description CSDN剪贴板复制拦截小尾巴
// @description 增加百度百科
// @description 增加一点教程
// @description 增加编程之家
// @description 增加电子发烧友论坛
// @description 增加米坛社区
// @description 增加汽车之家
// @description 增加百度知道
// @description 增加bjtzdbzz
// @description 增加好看视频
// @description 增加21财经
// @description 增加百度百家号
// @description 增加百度经验
// @description 增加CSDN
// @description 增加简书
// @description 增加码农之家
// @description 增加环球网移动端
// @description 增加联想知识库解决需要扫码关注才可继续浏览内容
// @description 增加太平洋电脑网
// @description 增加IT1352 IT屋，解决需要扫码关注15天内才能阅读全文
// @supportURL  https://greasyfork.org/zh-CN/users/306433
// @homepageURL https://greasyfork.org/zh-CN/users/306433
// @namespace   https://greasyfork.org/zh-CN/users/306433
// @icon        https://img.icons8.com/stickers/100/000000/double-down.png
// @match       *://www.xz577.com/*
// @match       *://m.huanqiu.com/*
// @match       *://iknow.lenovo.com.cn/*
// @match       *://g.pconline.com.cn/*
// @match       *://www.it1352.com/*
// @match       *://www.jianshu.com/p/*
// @match       *://blog.csdn.net/*
// @match       *://jingyan.baidu.com/article/*
// @match       *://baijiahao.baidu.com/s*
// @match       *://haokan.baidu.com/v*
// @match       *://zhidao.baidu.com/question/*
// @match       *://m.21jingji.com/article/*
// @match       *://www.bjtzdbzz.com/*
// @match       *://chejiahao.m.autohome.com.cn/info/*
// @match       *://www.bandbbs.cn/threads/*
// @match       *://bbs.elecfans.com/m/*
// @match       *://www.yiidian.com/*
// @match       *://m.jb51.cc/*
// @match       *://www.jb51.cc/*
// @match       *://baike.baidu.com/item/*
// @match       *://wap.peopleapp.com/article/*
// @grant       GM_addStyle
// @run-at      document-start
// ==/UserScript==

;(function () {
  var websites = [
    {
      wildcard: '*://wap.peopleapp.com/article/*',
      hide: ['.read-more'],
      expand: ['.article-wrapper.has-more-high']
    },
    {
      wildcard: '*://baike.baidu.com/item/*',
      wait: [
        [
          // 需要循环?
          '.yx-load-more-inner.J-yx-load-moreContent',
          node => node.dispatchEvent(new Event('tap'))
        ]
      ]
    },
    {
      wildcard: ['*://m.jb51.cc/*', '*://www.jb51.cc/*'],
      hide: ['#read-more-wrap'],
      expand: ['#container']
    },
    {
      wildcard: '*://www.yiidian.com/*',
      hide: ['#read-more-wrap'],
      expand: ['#yArticle']
    },
    {
      wildcard: '*://bbs.elecfans.com/m/*',
      hide: ['.conMore', '.login-reg-fixed'],
      expand: ['.postListCon']
    },
    {
      wildcard: '*://www.bandbbs.cn/threads/*',
      hide: ['.bbCodeBlock-expandLink.js-expandLink'],
      wait: [
        [
          '.js-expandWatch:not(.is-expanded)',
          node => node.classList.add('is-expanded')
        ]
      ]
    },
    {
      wildcard: '*://chejiahao.m.autohome.com.cn/info/*',
      hide: ['#continue_reading'],
      expand: ['.major-long-details'],
      wait: [
        ['.pgc-details .fn-hide', node => node.classList.remove('fn-hide')]
      ]
    },
    {
      wildcard: '*://www.bjtzdbzz.com/*',
      hide: ['.pc-request-btn', '.mb-request-btn'],
      expand: ['.detail-content-desc-show']
    },
    {
      wildcard: '*://m.21jingji.com/article/*',
      hide: ['.content .mask'],
      expand: ['.txtContent']
    },
    {
      wildcard: '*://zhidao.baidu.com/question/*',
      hide: ['.w-detail-display-btn-text', '.wgt-best-mask'],
      expand: ['.w-detail-container.w-detail-index', 'div[id^=best-content-]']
    },
    {
      wildcard: '*://baijiahao.baidu.com/s*',
      hide: ['.oPadding', '.newUnfoldFullBox.contentPadding', '.undefined'],
      expand: ['.mainContent']
    },
    {
      wildcard: '*://haokan.baidu.com/v*',
      hide: ['.share-origin.wx-share-launch']
    },
    {
      wildcard: '*://www.xz577.com/*',
      hide: ['.article-content-body-more1'],
      expand: ['.con2']
    },
    {
      wildcard: '*://www.it1352.com/*',
      hide: ['.arc-body-main-more'],
      expand: ['.arc-body-main'],
      js: () => {
        $.cookie('olduser', '1', {
          domain: 'it1352.com',
          expires: 1500
        })
      }
    },
    {
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
      wildcard: '*://m.huanqiu.com/*',
      hide: ['.unfold-btn'],
      expand: ['.article-content']
    },
    {
      wildcard: '*://iknow.lenovo.com.cn/*',
      hide: ['.coverQRCode'],
      js: () => {
        localStorage.setItem('scanQRCode', '1')
        $(document).off('scroll.unable')
      }
    },
    {
      wildcard: '*://www.jianshu.com/p/*',
      hide: [
        '.note-graceful-button p',
        '.download-app-guidance',
        '.call-app-btn',
        '#jianshu-header',
        '#note-show .content .show-content-free .collapse-tips',
        '.download',
        '.note-comment-above-ad-wrap',
        '.close-collapse-btn',
        '.open-app-btn',
        '.app-open',
        '#guangtui',
        '#fixed-ad-container',
        '.fubiao-dialog'
      ],
      expand: ['#note-show .content .show-content-free .collapse-free-content'],
      js: () => {
        document
          .querySelector('.collapse-free-content')
          .removeAttribute('class')
        let nodes = document.querySelectorAll(
          "a[href^='https://link.jianshu.com?t=']"
        )
        nodes.forEach(node => {
          let link = getUrlQuery(node.href).t
          if (link) {
            node.setAttribute('href', link)
          }
        })
      }
    },
    {
      wildcard: '*://blog.csdn.net/*',
      hide: [
        '.weixin-shadowbox.wap-shadowbox',
        '.btn_mod',
        '.btn_app_link',
        '.btn-readmore',
        '.comment_read_more_box',
        '.btn_open_app_prompt_div'
      ],
      expand: ['.article_content', '#article_content', '#comment'],
      js: () => {
        safeWaitJQuery(() => {
          jQuery(function () {
            jQuery(function () {
              jQuery('.recommend-jump-app')
                .off('click')
                .on('click', e => e.stopPropagation())
              jQuery('[data-report-click]').removeAttr('data-report-click')
              // $(document).off('click', '.container-blog a')
              // $(document).off('click', '[data-report-click]')

              if (typeof csdn != 'undefined') {
                // https://github.com/adlered/CSDNGreener
                $('code').attr('onclick', 'mdcp.copyCode(event)')
                try {
                  csdn.copyright.init('', '', '')
                  Object.defineProperty(window, 'articleType', {
                    value: 0,
                    writable: false,
                    configurable: false
                  })
                } catch (err) {}
              }
            })
          })
        })
      }
    },
    {
      wildcard: '*://jingyan.baidu.com/article/*',
      hide: ['.read-whole-mask'],
      expand: ['.exp-content-container']
    }
  ]

  function matchRule (str, rule) {
    console.log(rule)
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

  // https://github.com/Shawak/TwitchSquad/blob/main/twitchsquad.user.js
  if (typeof GM_addStyle === 'undefined') {
    GM_addStyle = function (css) {
      let head = document.getElementsByTagName('head')[0],
        style = document.createElement('style')
      if (!head) {
        return
      }
      style.type = 'text/css'
      try {
        style.innerHTML = css
      } catch (x) {
        style.innerText = css
      }
      head.appendChild(style)
    }
  }
  const readyName = randomString(8, 'abcdefghijklmnopqrstuvwxyz')

  for (var website of websites) {
    let hit = false
    if (Array.isArray(website.wildcard)) {
      hit = website.wildcard.some(s => matchRule(window.location.href, s))
    } else {
      hit = matchRule(window.location.href, website.wildcard)
    }

    if (hit) {
      let style = ''
      if ('hide' in website && website.hide.length > 0) {
        style +=
          website.hide.join(',\n') +
          `
                {
                    display: none !important;
                    visibility:hidden !important;
                    max-height: 0 !important;
                    max-width: 0 !important;
                    height: 0 !important;
                    width: 0 !important;
                }

                `
      }
      if ('expand' in website && website.expand.length > 0) {
        style +=
          website.expand.join(',\n') +
          `
                {
                    height: auto !important;
                    max-height: unset !important;
                    overflow: unset !important;
                }

                `
      }
      if ('css' in website && website.css.length > 0) {
        style += website.css
      }
      // console.log(style)
      GM_addStyle(style)

      if ('wait' in website) {
        let id = setInterval(() => {
          try {
            for (let w of website.wait) {
              document.querySelectorAll(w[0]).forEach(node => {
                if (!node.dataset[readyName]) {
                  if (w[1] === 'click') {
                    node.click()
                  } else {
                    w[1].call(node, node) // 返回值
                  }
                  node.dataset[readyName] = true
                }
              })
            }
          } catch (x) {
            clearInterval(id)
          }
        }, 1000)
      }

      if ('js' in website) {
        if (document.readyState == 'complete') {
          website.js()
        } else {
          document.addEventListener('DOMContentLoaded', website.js)
        }
      }
      break
    }
  }
})()
