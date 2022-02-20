// ==UserScript==
// @name        自动展开全文阅读更多
// @version     0.64.1
// @author      baster
// @description 自动展开网站内容而无需点击，去广告，去掉需要打开app的提示
// @description 增加码农之家
// @description 增加网友需求-环球网移动端
// @description 增加联想知识库解决需要扫码关注才可继续浏览内容
// @description 增加太平洋电脑网
// @description 增加IT1352 IT屋，解决需要扫码关注15天内才能阅读全文
// @description 原作者: 稻米鼠 【https://greasyfork.org/zh-CN/scripts/397476 已停更，此为fork版，自用维护】
// @match       *://www.xz577.com/*
// @match       *://m.huanqiu.com/*
// @match       *://iknow.lenovo.com.cn/*
// @match       *://g.pconline.com.cn/*
// @match       *://www.it1352.com/*
// @match       *://www.zhihu.com/question/*
// @match       *://www.zhihu.com/tardis/*
// @match       *://blog.csdn.net/*/article/details/*
// @match       *://bbs.csdn.net/topics/*
// @match       *://www.bilibili.com/video/av*
// @match       *://www.bilibili.com/video/BV*
// @match       *://m.bilibili.com/video/av*
// @match       *://www.youtube.com/watch?v=*
// @match       *://m.youtube.com/watch?v=*
// @match       *://www.acfun.cn/v/ac*
// @match       *://m.acfun.cn/v/?ac=*
// @match       *://www.ipaperclip.net/doku.php?id=*
// @match       *://ipaperclip.net/doku.php?id=*
// @match       *://zhidao.baidu.com/question/*
// @match       *://wap.peopleapp.com/article/*
// @match       *://*.ifeng.com/*
// @match       *://www.javascriptcn.com/*
// @match       *://www.360doc.com/content/*
// @match       *://www.360doc.cn/article/*
// @match       *://www.iteye.com/blog/*
// @match       *://sports.sina.cn/*
// @match       *://3g.163.com/*
// @match       *://c.m.163.com/news/a/*
// @match       *://xw.qq.com/*
// @match       *://kandianshare.html5.qq.com/v*
// @match       *://m.toutiao.com/*
// @match       *://chejiahao.m.autohome.com.cn/i*
// @match       *://post.m.smzdm.com/p/*
// @match       *://m.smzdm.com/p/*
// @match       *://m.iask.sina.com.cn/b/*
// @match       *://m.tiexue.net/touch/thread_*
// @match       *://baijiahao.baidu.com/s?id=*
// @match       *://www.bandbbs.cn/threads/*
// @match       *://cloud.tencent.com/developer/article/*
// @match       *://book.douban.com/subject/*
// @match       *://m.douban.com/note/*
// @match       *://m.douban.com/group/topic/*
// @match       *://www.jianshu.com/p/*
// @match       *://www.chinaz.com/*
// @match       *://www.pinlue.com/article/*
// @match       *://m.jiemian.com/article/*
// @match       *://www.bilibili.com/read/mobile/*
// @match       *://kuaibao.qq.com/s/*
// @match       *://yq.aliyun.com/articles/*
// @match       *://jingyan.baidu.com/article/*
// @match       *://m.huxiu.com/article/*
// @match       *://*.sina.cn/*
// @match       *://www.xiaohongshu.com/*
// @match       *://m.sohu.com/a/*
// @match       *://www.hao123.com/*
// @match       *://www.baiven.com/*
// @match       *://www.yuque.com/*
// @match       *://m.thepaper.cn/newsDetail_forward_*
// @match       *://m.guancha.cn/*
// @match       *://upage.html5.qq.com/*
// @match       *://m.guokr.com/article/*
// @match       *://www.xjishu.com/*
// @match       *://mbd.baidu.com/*
// @match       *://xiaozhuanlan.com/topic/*
// @match       *://ddrv.cn/a/*
// @match       *://www.reddit.com/*
// @match       *://www.meipian.cn/*
// @resource
// @license     GNU
// @supportURL  https://greasyfork.org/zh-CN/users/306433-baster
// @homepageURL https://greasyfork.org/zh-CN/users/306433
// @namespace   https://greasyfork.org/zh-CN/users/306433
// @icon        https://i.v2ex.co/81ToM02ss.png
// @grant       GM_addStyle
// @grant       GM_info
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
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
      remove: ['.article-content-body-more1'],
      content: ['.con2']
    },
    {
      // IT屋
      wildcard: '*://www.it1352.com/*',
      remove: ['.arc-body-main-more'],
      content: ['.arc-body-main'],
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
      remove: [
        '.btnForAppOpenA',
        '.btnForAppOpenImg',
        '.add_artilce_handle',
        '.WakeUptop'
      ],
      content: ['.art-content']
    },
    {
      // 环球网移动端
      wildcard: '*://m.huanqiu.com/*',
      remove: ['.unfold-btn'],
      content: ['.article-content']
    },
    {
      // 联想知识库
      wildcard: '*://iknow.lenovo.com.cn/*',
      remove: ['.coverQRCode'],
      script: () => {
        localStorage.setItem('scanQRCode', '1')
        $(document).off('scroll.unable')
      }
    },
    {
      // 知乎 - 移动端页面
      regex: /^http(s)?:\/\/(www\.)?zhihu\.com\/(question\/\d+|tardis\/\w+)/i,
      remove: [
        '.RichContent--unescapable.is-collapsed .ContentItem-rightButton',
        '.sgui-slide-down'
      ],
      content: [
        '.Body--Mobile .RichContent.is-collapsed .RichContent-inner',
        '.RichContent--unescapable.is-collapsed .RichContent-inner',
        '.App'
      ],
      style: `
        .RichContent.is-collapsed {
          cursor: auto !important;
        }
        .RichContent--unescapable.is-collapsed .RichContent-inner {
          -webkit-mask-image: none !important;
          mask-image: none !important;
        }
        `
    },
    {
      // CSDN 博客 - PC & 移动端页面
      regex: /^http(s)?:\/\/blog\.csdn\.net\/[^/]+\/article\/details\/\d+/i,
      remove: ['div.hide-article-box', '.readall_box', '#writeGuide'],
      content: ['#article_content', '#article .article_content'],
      script: () => {
        safeWaitJQuery(() => {
          jQuery(function () {
            jQuery(function () {
              $(document).off('click', '.container-blog a')
              $(document).off('click', '[data-report-click]')
            })
          })
        })
      }
    },
    {
      // CSDN 论坛 - PC & 移动端页面
      regex: /^http(s)?:\/\/bbs\.csdn\.net\/topics\/\d+/i,
      remove: ['.hide_topic_box', '.readall_wrap', '#writeGuide'],
      content: ['.container-box .bbs_detail_wrap', '.first_show']
    },
    {
      // B 站视频简介
      regex: /^http(s)?:\/\/(www\.)?bilibili\.com\/video\/(av\d+|bv\w+)/i,
      remove: ['.video-desc .btn'],
      content: ['.video-desc .info']
    },
    {
      // B 站移动端视频标题
      regex: /^http(s)?:\/\/m\.bilibili\.com\/video\/av\d+/i,
      remove: [
        '.index__videoInfo__src-videoPage-videoInfo- .index__foldSwitch__src-videoPage-videoInfo-'
      ],
      content: [
        '.index__videoInfo__src-videoPage-videoInfo- .index__title__src-videoPage-videoInfo-',
        '.index__descWrap__src-videoPage-infoBlock-'
      ],
      style: `
        .index__videoInfo__src-videoPage-videoInfo- .index__title__src-videoPage-videoInfo- .index__titleContent__src-videoPage-videoInfo- {
            white-space: normal !important;
          }
        `
    },
    {
      // Youtube 视频简介
      regex: /^http(s)?:\/\/(www\.)?youtube\.com\/watch\?v=\w+/i,
      remove: ['#container paper-button#more'],
      content: ['#container #content.ytd-expander']
    },
    {
      // Youtube 移动端视频标题
      regex: /^http(s)?:\/\/m\.youtube\.com\/watch\?v=\w+/i,
      remove: [],
      content: [],
      script: () => {
        document.querySelector('button.slim-video-metadata-header').click()
      }
    },
    {
      // AcFun 视频简介
      regex: /^http(s)?:\/\/(www\.)?acfun\.cn\/v\/ac\d+/i,
      remove: ['#main .introduction .desc-operate'],
      content: ['#main .introduction .content-description.gheight'],
      style: `
          #main .introduction .content-description.gheight .tag {
            display: block !important;
          }
        `
    },
    {
      // AcFun 移动端视频标题
      regex: /^http(s)?:\/\/m\.acfun\.cn\/v\/\?ac=\d+/i,
      remove: ['.video-title .down'],
      content: [],
      script: () => {
        document
          .querySelector('.video-title .info-title')
          .classList.remove('hide-more')
      }
    },
    {
      // 回形针手册
      regex: /^http(s)?:\/\/(www\.)?ipaperclip\.net\/doku\.php\?id=.*/i,
      remove: ['.paperclip__showcurtain'],
      content: ['.paperclip__h1content__wrapped']
    },
    {
      // 百度知道
      regex: /^http(s)?:\/\/zhidao\.baidu\.com\/question\/\d+\.html/i,
      remove: [
        '.wgt-ask .q-content .conSamp',
        '.wgt-ask .expend',
        '.wgt-answers .answer-text .wgt-answers-mask',
        'div.wgt-best .best-text .wgt-best-mask',
        '.iknow-root-dom-element .wgt-question-desc-explode .wgt-question-desc .wgt-question-desc-action',
        '.iknow-root-dom-element .w-detail-full-new .newyl-fold',
        '.iknow-root-dom-element .w-detail-full .w-detail-display-btn',
        '.iknow-root-dom-element .w-detail-dis-na-btn',
        '.wgt-answers #show-hide-container'
      ],
      content: [
        '.wgt-answers .answer-text',
        'div.wgt-best .best-text',
        '.iknow-root-dom-element .wgt-question-desc-explode .wgt-question-desc .wgt-question-desc-inner',
        '.iknow-root-dom-element .w-detail-full-new .w-detail-newyl.fold',
        '.iknow-root-dom-element .w-detail-full .w-detail-container',
        '.wgt-answers .answer-hide',
        '.wgt-answers .wgt-pager'
      ],
      style: `
          .wgt-ask .q-content .conTemp, .wgt-ask .q-content .con-all {
            display: block !important;
          }
          .iknow-root-dom-element .wgt-question-desc-explode .wgt-question-desc .wgt-question-desc-inner {
            width: auto !important;
            white-space: normal !important;
          }
          .wgt-answers .answer-hide {
            visibility: visible;
          }
          .wgt-answers .wgt-pager {
            display: block !important;
          }
        `
    },
    {
      // 人民日报
      regex: /^http(s)?:\/\/wap\.peopleapp\.com\/article\/\d+/i,
      remove: ['.read-more'],
      content: ['.article-wrapper.has-more-high']
    },
    {
      // 澎湃新闻（移动版）
      regex: /^http(s)?:\/\/m\.thepaper\.cn\/newsDetail_forward_\d+/i,
      remove: [
        'a.news_open_app',
        '.news_part_all',
        '#carousel_banner.bot_banner'
      ],
      content: ['.news_part_limit']
    },
    {
      // 凤凰网
      regex: /^http(s)?:\/\/\w+\.ifeng\.com\/.*/i,
      remove: [],
      content: [],
      script: () => {
        document.querySelectorAll('*').forEach(el => {
          for (let i = 0; i < el.classList.length; i++) {
            const elClass = el.classList[i]
            if (/^(main_content|containerBox)-[a-zA-Z0-9]+/.test(elClass)) {
              el.style.height = 'auto'
              el.style.maxHeight = 'none'
            } else if (
              /^(more-1|tip|bottom_box|ad_box|shadow|callupBtn|bottomSlide|headerInfo|fixedIcon)-[a-zA-Z0-9]+/.test(
                elClass
              )
            ) {
              el.style.display = 'none'
            }
          }
        })
      }
    },
    {
      // JavaScript中文网
      regex: /^http(s)?:\/\/(www\.)?javascriptcn\.com\/.*/i,
      remove: ['.readall_box'],
      content: ['.markdown-body']
    },
    {
      // 360doc 个人图书馆
      regex: /^http(s)?:\/\/(www\.)?360doc\.com\/content\/.*/i,
      remove: ['.article_showall'],
      content: ['.articleMaxH .article_container']
    },
    {
      // 360doc 个人图书馆（移动端）
      regex: /^http(s)?:\/\/(www\.)?360doc\.cn\/article\/.*/i,
      remove: ['.article_showall'],
      content: ['.article_maxh']
    },
    {
      // ITeye
      regex: /^http(s)?:\/\/(www\.)?iteye\.com\/blog\//i,
      remove: ['.hide-article-box'],
      content: ['.hide-main-content']
    },
    {
      // 新浪体育（移动端）
      regex: /^http(s)?:\/\/sports\.sina\.cn\/.*/i,
      remove: ['.look_more'],
      content: ['.art_box']
    },
    {
      // 手机网易
      regex: /^http(s)?:\/\/3g\.163\.com\/.*/i,
      remove: ['.footer'],
      content: ['article'],
      style: `article .content .page {
          display: block !important;
        }`
    },
    {
      // 腾讯新闻
      regex: /^http(s)?:\/\/xw\.qq\.com\/.*/i,
      remove: ['.collapseWrapper', '#article_body > .mask'],
      content: ['#article_body']
    },
    {
      // 头条移动版
      regex: /^http(s)?:\/\/m\.toutiao\.com\/\w+\//i,
      remove: ['.unfold-field'],
      content: ['.article', '.article>div', '.article .article__content']
    },
    {
      // 汽车之家（手机版）
      regex: /^http(s)?:\/\/(\w+\.)?m\.autohome\.com\.cn\/\w+\//i,
      remove: ['.pgc-details .continue_reading'],
      content: [],
      script: () => {
        document.querySelectorAll('#content .fn-hide').forEach(el => {
          el.classList.remove('fn-hide')
        })
      }
    },
    {
      // 张大妈移动端
      regex: /^http(s)?:\/\/(post\.)?m\.smzdm\.com\/p\/\w+/i,
      remove: ['.article-wrapper .expand-btn', '.foot-banner'],
      content: ['.article-wrapper']
    },
    {
      // 爱问移动版
      regex: /^http(s)?:\/\/m\.iask\.sina\.com\.cn\/b\/\w+\.html/i,
      remove: ['.answer_lit'],
      content: [],
      style: `
          .answer_all{
            display: block !important;
          }
        `
    },
    {
      // 铁血移动版
      regex: /^http(s)?:\/\/m\.tiexue\.net\/touch\/thread_\d+/i,
      remove: ['.yxqw'],
      content: ['.articleCont']
    },
    {
      // 百度百家号
      regex: /^http(s)?:\/\/(baijiahao|mbd)\.baidu\.com\//i,
      remove: ['.packupButton', '.contentMedia .openImg'],
      content: ['.mainContent']
    },
    {
      // 米坛
      regex: /^http(s)?:\/\/(www\.)?bandbbs\.cn\/threads\/\d+/i,
      remove: [
        '.u-bottomFixer',
        '.bbCodeBlock--expandable.is-expandable .bbCodeBlock-expandLink'
      ],
      content: ['.bbCodeBlock--expandable .bbCodeBlock-expandContent']
    },
    {
      // 腾讯云社区
      regex: /^http(s)?:\/\/cloud\.tencent\.com\/developer\/article\/\d+/i,
      remove: ['.com-markdown-collpase-hide .com-markdown-collpase-toggle'],
      content: ['.com-markdown-collpase-hide .com-markdown-collpase-main']
    },
    {
      // 豆瓣图书
      regex: /^http(s)?:\/\/book\.douban\.com\/subject\/\d+/i,
      remove: [],
      content: [],
      script: () => {
        document.querySelectorAll('.indent > .short').forEach(el => {
          el.classList.add('hidden')
        })
        document.querySelectorAll('.indent > .all').forEach(el => {
          el.classList.remove('hidden')
        })
      }
    },
    {
      // 简书移动版
      regex: /^http(s)?:\/\/(w+\.)?jianshu\.com\/p\/\w+/i,
      remove: [
        '.note-graceful-button p',
        '.download-app-guidance,.call-app-btn,#jianshu-header',
        '#note-show .content .show-content-free .collapse-tips'
      ],
      content: [
        '#note-show .content .show-content-free .collapse-free-content'
      ],
      style: `
        #note-show .content .show-content-free .collapse-free-content {
            position: unset !important
        }
        `,
      script: () => {
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
      // 站长之家
      regex: /^http(s)?:\/\/(w+\.)?chinaz\.com\/\w+/i,
      remove: ['.contentPadding'],
      content: ['#article-content']
    },
    {
      // 品略
      regex: /^http(s)?:\/\/(w+\.)?pinlue\.com\/article\//i,
      remove: ['.readall_box'],
      content: ['.textcontent']
    },
    {
      // 品略
      regex: /^http(s)?:\/\/m\.jiemian\.com\/article\/\d+/i,
      remove: ['.content-fold .show-change'],
      content: ['.article-main']
    },
    {
      // 豆瓣日记
      regex: /^http(s)?:\/\/m\.douban\.com\/note\/\d+/i,
      remove: ['.oia-readall .read-all'],
      content: ['.note-content']
    },
    {
      // Bilibili 专栏
      regex: /^http(s)?:\/\/(w+\.)?bilibili\.com\/read\/mobile\/\d+/i,
      remove: ['.max-content .load-more', '.h5-download-bar'],
      content: ['.max-content.limit']
    },
    {
      // 看点快报
      regex: /^http(s)?:\/\/kuaibao\.qq\.com\/s\/\d+/i,
      remove: [
        '.share-page-additional',
        '.container .show-more',
        '.kb-bottom-fixed-wrapper'
      ],
      content: ['.container .content']
    },
    {
      // 云栖社区
      regex: /^http(s)?:\/\/yq\.aliyun\.com\/articles\/\d+/i,
      remove: ['.article-hide-content .article-hide-box'],
      content: ['.article-hide-content']
    },
    {
      // 百度经验
      regex: /^http(s)?:\/\/jingyan\.baidu\.com\/article\/\w+/i,
      remove: ['.read-whole-mask'],
      content: ['.exp-content-container.fold']
    },
    {
      // 豆瓣小组
      regex: /^http(s)?:\/\/m\.douban\.com\/group\/topic\/\d+/i,
      remove: ['.oia-readall'],
      content: ['.note-content']
    },
    {
      // 虎嗅移动版
      regex: /^http(s)?:\/\/m\.huxiu\.com\/article\/\d+/i,
      remove: ['.fresh-article-wrap'],
      content: ['#m-article-detail-page > .js-mask-box']
    },
    {
      // 新浪新闻
      regex: /^http(s)?:\/\/\w+\.sina\.cn\/.*/i,
      remove: ['.look_more'],
      content: ['article.art_box']
    },
    {
      // 小红书
      regex: /^http(s)?:\/\/(w+\.)?xiaohongshu\.com\/discovery\/item\/\w+/i,
      remove: ['.check-more'],
      content: ['.content']
    },
    {
      // 搜狐
      regex: /^http(s)?:\/\/m\.sohu\.com\/a\/\w+/i,
      remove: ['.lookall-box'],
      content: [],
      style: `.hidden-content.hide {
          display: block;
        }`
    },
    {
      // 网易新闻移动端
      regex: /^http(s)?:\/\/c\.m\.163\.com\/news\/a\/\w+/i,
      remove: [
        '.g-article .show-more-wrap',
        '.g-btn-open-newsapp',
        '.widget-slider',
        '.g-top-slider'
      ],
      content: ['.g-article']
    },
    {
      // 好123
      regex: /^http(s)?:\/\/(w+\.)?hao123\.com/i,
      remove: ['.content-cover'],
      content: [],
      style: `.coolsites-wrapper {
          display: block !important;
        }`
    },
    {
      // 百问中文
      regex: /^http(s)?:\/\/(w+\.)?baiven\.com\/\w\/\d+/i,
      remove: ['.readall_box'],
      content: ['.article .article-content']
    },
    {
      // 语雀
      regex: /^http(s)?:\/\/(w+\.)?yuque\.com\/\w+/i,
      remove: ['div[data-testid="doc-reader-login-card"]'],
      content: ['.yuque-doc-content']
    },
    {
      // 腾讯看点
      regex: /^http(s)?:\/\/kandianshare\.html5\.qq\.com\/v\d\//i,
      remove: ['.article-mask', '.share-bottom-tips-wrap'],
      content: ['.at-content']
    },
    {
      // 观察者网
      regex: /^http(s)?:\/\/m\.guancha\.cn\/\w+\/[\d_]+/i,
      remove: [
        '.textPageCont-footer',
        '.downloadBtn-box',
        '#downloadBtn-position'
      ],
      content: ['.textPageCont']
    },
    {
      // 腾讯看点快报
      regex: /^http(s)?:\/\/upage\.html5\.qq\.com\/kuaibao-detail\?/i,
      remove: ['.container .at-content>div:last-child'],
      content: ['.container .at-content']
    },
    {
      // 果壳网
      regex: /^http(s)?:\/\/m\.guokr\.com\/article\/\d+/i,
      remove: ['div[class*=ShowAllArticle]'],
      content: ['div[class*=ArticleContent]']
    },
    {
      // x 技术
      regex: /^http(s)?:\/\/(www\.)?xjishu\.com\//i,
      remove: ['.gradBox', '.readBox'],
      content: ['.con-box']
    },
    {
      // 小专栏
      regex: /^http(s)?:\/\/xiaozhuanlan\.com\/topic\/\d+/i,
      remove: [],
      content: ['.xzl-topic-summary-content.hidden_topic_body.hidden'],
      style: `
        .xzl-topic-summary-content.hidden_topic_body.hidden {
          display: block !important;
        }
        `
    },
    {
      // 算法网
      regex: /^http(s)?:\/\/ddrv\.cn\/a\/\d+/i,
      remove: ['#read-more-wrap'],
      content: ['#container']
    },
    {
      // 美篇
      regex: /^http(s)?:\/\/(www\.)meipian\.cn\//i,
      remove: ['.readmore'],
      content: ['.mp-content .section']
    },
    {
      // reddit
      regex: /^http(s)?:\/\/(www\.)reddit\.com\//i,
      remove: ['.read-more'],
      content: [],
      script: () => {
        document.body.querySelectorAll('div').forEach(e => {
          if (
            /^\d+px$/i.test(e.style.maxHeight) &&
            e.nextElementSibling &&
            /button/i.test(e.nextElementSibling.tagName)
          ) {
            e.style = ''
            e.nextElementSibling.classList.add('read-more')
          }
        })
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
      if ('remove' in rule && rule.remove.length > 0) {
        style +=
          rule.remove.join(',\n') +
          `
                {
                    display: none !important;
                }

                `
      }
      if ('content' in rule && rule.content.length > 0) {
        style +=
          rule.content.join(',\n') +
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
