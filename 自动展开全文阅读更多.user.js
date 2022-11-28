// ==UserScript==
// @name        自动展开全文阅读更多
// @version     1.89.0
// @author      baster
// @description 自动展开网站全文内容而无需点击，去掉一些烦人广告，去掉需要打开app的提示，站外链直达(支持鼠标左右键和拖拽打开)，避免网址重定向浪费时间，支持免登陆复制文字，兼容手机和电脑端。 -- 【目前已支持几十个网站】
// @supportURL  https://greasyfork.org/zh-CN/users/306433
// @homepageURL https://greasyfork.org/zh-CN/users/306433
// @namespace   https://greasyfork.org/zh-CN/users/306433
// @icon        https://img.icons8.com/stickers/100/000000/double-down.png
// @match       *://m.36kr.com/*
// @match       *://ext.baidu.com/api/comment/*
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
// @match       *://*.elecfans.com/*
// @match       *://www.yiidian.com/*
// @match       *://m.jb51.cc/*
// @match       *://www.jb51.cc/*
// @match       *://baike.baidu.com/item/*
// @match       *://wap.peopleapp.com/article/*
// @match       *://blog.51cto.com/*
// @match       *://xuedingmiao.com/*
// @match       *://xw.qq.com/*
// @match       *://mbd.baidu.com/newspage/*
// @match       *://www.cnbeta.com/articles/*
// @match       *://www.zhihu.com/question/*
// @match       *://zhuanlan.zhihu.com/p/*
// @match       *://*.imooc.com/*
// @match       *://*.py.cn/code/*
// @match       *://finance.sina.com.cn/*
// @match       *://juejin.cn/post/*
// @match       *://www.oschina.net/*
// @match       *://iswbm.com/*
// @match       *://m.so.com/s?q=*
// @match       *://wap.sogou.com/web/*
// @match       *://www.douban.com/*
// @match       *://www.wxnmh.com/*
// @match       *://m.baidu.com/*
// @match       *://www.chinaz.com/*
// @match       *://gitee.com/*
// @match       *://www.tianyancha.com/*
// @match       *://www.shaduizi.com/*
// @match       *://show.bookmarkearth.com/view/*
// @match       *://www.423down.com/*
// @match       *://www.itdaan.com/*
// @match       *://www.iteye.com/blog/*
// @match       *://www.360doc.com/content/*
// @match       *://developer.aliyun.com/*
// @match       *://cloud.tencent.com/*
// @match       *://mail.qq.com/*
// @match       *://tieba.baidu.com/*
// @match       *://www.tieba.com/*
// @match       *://*.ifeng.com/*
// @match       *://*.ximalaya.com/*
// @match       *://www.sanzhima.com/*
// @match       *://m.meishichina.com/*
// @match       *://www.logonews.cn/*
// @match       *://cn.bing.com/search?*
// @match       *://segmentfault.com/*
// @match       *://ld246.com/*
// @match       *://www.bilibili.com/read/mobile?id=*
// @match       *://m.bilibili.com/video/*
// @match       *://*.toutiao.com/*
// @match       *://www.itbaoku.cn/*
// @match       *://support.qq.com/*
// @match       *://m.downxia.com/*
// @match       *://*.sohu.com/*
// @match       *://m.weibo.cn/u/*
// @match       *://card.weibo.com/*
// @match       *://www.yunqishi.net/*
// @match       *://stackoom.com/*
// @match       *://www.codeprj.com/*
// @match       *://m.yezicc.com/*
// @match       *://*.ali213.net/*
// @match       *://itpcb.com/*
// @match       *://*.vovososo.com/*
// @match       *://www.lishixinzhi.com/*
// @match       *://www.anquanke.com/*
// @match       *://m.hexun.com/*
// @match       *://www.javascriptcn.com/*
// @match       *://*.zol.com.cn/*
// @match       *://www.5axxw.com/*
// @match       *://3g.163.com/*
// @match       *://www.pythonheidong.com/*
// @match       *://code.js-code.com/*
// @match       *://*wenda.so.com/*
// @match       *://*.dxy.cn/*
// @match       *://www.javaheidong.com/*
// @match       *://www.tofacebook.com/*
// @match       *://www.ngui.cc/*
// @match       *://ddrv.cn/*
// @grant       GM_addStyle
// @grant       GM_openInTab
// @grant       unsafeWindow
// @run-at      document-start
// ==/UserScript==

(function () {
    var websites = [
        {
            match: ["*://www.ngui.cc/*"],
            hide: ["#vip"],
            expand: ["#contentWraper"],
        },
        {
            match: ["*://ddrv.cn/*"],
            hide: ["#read-more-wrap"],
            expand: ["#container"],
        },
        {
            match: ["*://*.dxy.cn/*"],
            hide: ["div[class^=contentWrapBottom_]"],
            expand: ["div[class^=contentWrap_]"],
        },
        {
            match: ["*://www.tofacebook.com/*"],
            hide: [".topic .more-box"],
            expand: [".topic"],
        },
        {
            match: ["*://*wenda.so.com/*"],
            hide: ["#show-rest-entry"],
            expand: ["#det-content"],
        },
        {
            match: ["*://code.js-code.com/*"],
            hide: ["#read-more-wrap"],
            expand: ["#codeContent"],
        },
        {
            match: ["*://www.pythonheidong.com/*"],
            hide: [".ggbox"],
            start: () => {
                // 阻止牛皮癣弹框
                unsafeWindow.user_login = true;
                Object.defineProperty(unsafeWindow, "user_login", {
                    get: function () {
                        return true;
                    },
                    enumerable: true,
                    configurable: true,
                });
            },
        },
        {
            match: ["*://www.javaheidong.com/*"],
            hide: [".ggbox"],
            start: () => {
                // 阻止牛皮癣弹框
                unsafeWindow.user_login = true;
                Object.defineProperty(unsafeWindow, "user_login", {
                    get: function () {
                        return true;
                    },
                    enumerable: true,
                    configurable: true,
                });
            },
        },
        {
            match: ["*://*.zol.com.cn/*"],
            hide: [".unfold-article-btn"],
            expand: [".article-content"],
        },
        {
            match: ["*://3g.163.com/*"],
            hide: [".backflow-floating.js-open-app"],
        },
        {
            // 某些采集机翻引流站点
            match: ["*://www.5axxw.com/*"],
            hide: ["#gzh-mask", "#gzh-modal"],
        },
        {
            match: ["*://m.hexun.com/*"],
            hide: [".article-open"],
            expand: [".article"],
        },
        {
            // var key = 'read' + (new Date).toJSON().substring(0, 7); localStorage
            match: ["*://www.javascriptcn.com/*"],
            hide: [".readall_box"],
            expand: [".markdown-body"],
        },
        {
            match: ["*://www.anquanke.com/*"],
            directLink: ["*://*/outLinkPage/?target=*", "target"],
        },
        {
            match: ["*://*.vovososo.com/*"],
            directLink: [
                "*/jump.html?url=*",
                (node) => {
                    let { url } = parseUrl(node.href);
                    if (url) {
                        node.href = atob(url);
                        node.setAttribute("target", "_blank");
                    }
                },
            ],
        },
        {
            match: ["*://itpcb.com/*"],
            hide: ["#read-more-wrap"],
            expand: ["#container"],
        },
        {
            match: ["*://www.lishixinzhi.com/*"],
            hide: ["#showbtn"],
            expand: ["#endtext"],
        },
        {
            match: ["*://*.ali213.net/*"],
            hide: [".unfold-field.unfold-field-download", ".read-all-con", ".download-text"],
            expand: [".detail_content", "#Content"],
        },
        {
            match: ["*://m.yezicc.com/*"],
            hide: [".fulltext-button"],
            expand: ["#article-body > .wrap"],
        },
        {
            match: ["*://stackoom.com/*", "*://www.codeprj.com/*"],
            js: () => {
                if (!$.cookie("openid") || !$.cookie("loginCode")) {
                    $.cookie("openid", "1", { expires: 7 });
                    $.cookie("loginCode", "1", { expires: 7 });
                }
            },
        },
        {
            match: ["*://www.yunqishi.net/*"],
            hide: [".ckgd"],
            expand: [".tw_contain"],
        },
        {
            match: ["*://card.weibo.com/*"],
            hide: [".f-art-opt"],
            expand: [".f-art"],
        },
        {
            match: ["*://m.weibo.cn/u/*"],
            directLink: ["*://weibo.cn/sinaurl?u=*", "u"],
        },
        {
            // https://m.sohu.com/a/442909096_120459022/?pvid=000115_3w_a
            match: "*://*.sohu.com/*",
            hide: [".lookall-box"],
            css: `
                .hidden-content.hide,.control-hide {
                    display: block !important;
                }
            `,
        },
        {
            match: "*://m.downxia.com/*",
            hide: ["a.slide-btn"],
            expand: [".chapter-cont"],
            css: `
                .chapter-cont.snbg {
                    position: unset !important;
                }
            `,
        },
        {
            match: ["*://support.qq.com/*"],
            directLink: ["*://support.qq.com/*/link-jump?jump=*", "jump"],
        },
        {
            match: ["*://www.itbaoku.cn/*"],
            hide: [".qa-content-more"],
            expand: ["#qa-content"],
        },
        {
            // https://wukong.toutiao.com/question/6712757183118835972/
            match: ["*://*.toutiao.com/*"],
            hide: ["a.j-expand-showfull.expand-bottom", ".m-share-answer .neck .mask", ".float-openapp"],
            expand: ["div.answer-text-full", "article.content"],
        },
        {
            match: ["*://www.bilibili.com/read/mobile?id=*"],
            hide: [".h5-download-bar", ".read-article-box .read-more .arrow-cnt"],
            expand: [".read-article-box.limit"],
        },
        {
            match: ["*://m.bilibili.com/video/*"],
            hide: [".launch-app-btn"],
        },
        {
            match: ["*://ld246.com/*"],
            directLink: ["*://link.ld246.com/forward?goto=*", "goto"],
        },
        {
            match: ["*://segmentfault.com/*"],
            directLink: [
                "*://link.segmentfault.com/?enc=*",
                (node) => {
                    // segmentfault这东西也去加密了?
                    if (/^https?:\/\//.test(node.innerText) && !node.innerText.endsWith("...")) {
                        node.href = node.innerText;
                    }
                },
            ],
        },
        {
            // https://cn.bing.com/search?form=MOZSBR&pc=MOZI&q=GIT_CLEAN_FLAGS
            match: ["*://cn.bing.com/search?*"],
            bindClick: [
                "a[href^=http]",
                (node, e) => {
                    if (node.target == "_blank" && !node.hostname.includes("bing.com")) {
                        e.stopPropagation();
                    }
                },
            ],
        },
        {
            match: ["*://www.logonews.cn/*"],
            directLink: ["*://link.logonews.cn/?url=*", "url"],
        },
        {
            // https://m.meishichina.com/recipe/69477/
            match: ["*://m.meishichina.com/*"],
            hide: [".showmore_page_a"],
            expand: ["#showmorearticle"],
        },
        {
            match: ["*://www.sanzhima.com/*"],
            directLink: [
                "*://www.sanzhima.com/jump.html?url=*",
                (node) => {
                    let { url } = parseUrl(node.href);
                    if (url) {
                        node.href = atob(url);
                        node.setAttribute("target", "_blank");
                    }
                },
            ],
        },
        {
            // https://www.ximalaya.com/sound/357093858
            match: ["*://www.ximalaya.com/*", "*://m.ximalaya.com/*"],
            hide: [".more-intro-wrapper.cY_", ".stretch-box .mask.ib_", "a.init-code.schema-link"],
            expand: [".draft._Fc, .sound-intro .intro._Fc", ".stretch-box.ib_"],
        },
        {
            // https://auto.ifeng.com/c/8EK6RQbD5U2
            // https://i.ifeng.com/c/8EJoQhvSkT3
            // https://ihouse.ifeng.com/news/2022_03_12-55263044_0.shtml
            match: "*://*.ifeng.com/*",
            hide: ["section[class^='bottomSlide-']", "header[class^='headerIn-']", "div[class^='callupBtn-']", "div[class^='more-']", "div[class^='tip-']", "div.showall", "div[class^='more-1-']", "div[class^='bottom_box-'] > div[class^='box-']", "div[class^='containerBox-'] >  div[class^='shadow-']"],
            expand: ["div[class^='main_content-']", "section.article", "div[class^='containerBox-']"],
            css: "#root>div[class^='main-'] {margin-bottom: unset !important;}",
        },
        {
            // https://tieba.baidu.com/p/7412962296
            // https://www.tieba.com/p/7745474371
            match: ["*://tieba.baidu.com/*", "*://www.tieba.com/*"],
            hide: [".appPromote", ".appBottomPromote", ".frs_daoliu_for_app", ".pb_cut_hot_recommend", ".father-cut-daoliu-normal-box", ".father-cut-daoliu-from-toutiao-box"],
            directLink: [
                "*://jump*.bdimg.com/safecheck/index?url=*",
                (node) => {
                    if (/^https?:\/\//.test(node.innerText)) {
                        node.href = node.innerText;
                    }
                },
            ],
        },
        {
            match: "*://mail.qq.com/*",
            bindClick: [
                "a[href^=http]",
                (node, e) => {
                    if (node.target == "_blank" && !node.href.includes("mail.qq.com")) {
                        e.stopPropagation();
                    }
                },
            ],
        },
        {
            // https://cloud.tencent.com/developer/article/1953552
            match: "*://cloud.tencent.com/*",
            hide: [".com-markdown-collpase-hide .com-markdown-collpase-toggle", ".J-headerAdvertising", ".c-nav-advertising"],
            expand: [".com-markdown-collpase-hide .com-markdown-collpase-main"],
        },
        {
            // https://developer.aliyun.com/article/875173
            match: "*://developer.aliyun.com/*",
            hide: ["#btn-readmore", ".article-hide-box"],
            expand: [".article-hide-content"],
        },
        {
            // http://www.360doc.com/content/20/0805/05/71057272_928578782.shtml
            match: "*://www.360doc.com/content/*",
            hide: [".article_showall"],
            expand: ["#articlecontent"],
            bindClick: [
                "a[href^=http]",
                (node, e) => {
                    if (node.target == "_blank" && !node.hostname.includes("360doc.com")) {
                        e.stopPropagation();
                    }
                },
            ],
        },
        {
            // https://www.iteye.com/blog/agile-boy-274366
            match: "*://www.iteye.com/blog/*",
            hide: [".hide-article-box"],
            expand: ["#blog_content"],
        },
        {
            match: "*://www.423down.com/*",
            directLink: [
                "*://www.423down.com/go.php?url=*",
                (node) => {
                    let { url } = parseUrl(node.href);
                    if (url) {
                        node.href = atob(url);
                    }
                },
            ],
        },
        {
            // https://www.itdaan.com/blog/2019/08/06/1b407ea67c33df1c625ab657443ccd45.html
            match: "*://www.itdaan.com/*",
            js: () => {
                if (!$.cookie("openid") || !$.cookie("loginCode")) {
                    $.cookie("openid", "1", { expires: 7 });
                    $.cookie("loginCode", "1", { expires: 7 });
                }
                if ($.cookie("vipuser") != "1") {
                    $.cookie("vipuser", "1", { expires: 7 });
                }
            },
            directLink: [
                "*://www.itdaan.com/link/*",
                (node) => {
                    let url = node.href.split("/link/", 2)[1];
                    if (url) {
                        node.href = atob(url);
                    }
                },
            ],
        },
        {
            match: "*://show.bookmarkearth.com/view/*",
            js: () => {
                let node = document.querySelector("p.link");
                if (node) {
                    location.replace(node.innerText);
                }
            },
        },
        {
            match: "*://www.shaduizi.com/*",
            hide: [".content-container-open-btn"],
            expand: [".content-section.content-section-container"],
        },
        {
            match: "*://www.chinaz.com/*",
            hide: [".contentPadding"],
            expand: ["#article-content"],
        },
        {
            match: "*://www.tianyancha.com/*",
            bindClick: [
                "a[href^=http]",
                (node, e) => {
                    if (node.target == "_blank") {
                        e.stopPropagation();
                    }
                },
            ],
            directLink: ["*://www.tianyancha.com/security?target=*", "target"],
        },
        {
            match: "*://gitee.com/*",
            directLink: ["*://gitee.com/link?target=*", "target"],
        },
        {
            // 百度搜索移动端
            match: "*://m.baidu.com/*",
            bindClick: [
                "div.result",
                (node) => {
                    if (node.dataset.log) {
                        let link = JSON.parse(node.dataset.log).mu;
                        node.querySelector("article").setAttribute("rl-link-href", link);
                    }
                },
            ],
        },
        {
            match: "*://www.wxnmh.com/*",
            hide: [".hide-article-box"],
            expand: ["#message_content"],
        },
        {
            match: "*://www.douban.com/*",
            directLink: ["*.douban.com/link2/?url=*", "url"],
        },
        {
            match: "*://wap.sogou.com/web/*",
            directLink: ["*://wap.sogou.com/web/id=*&url=*", "url"],
        },
        {
            match: "*://m.so.com/s?q=*",
            directLink: ["*.so.com/jump?u=*", "u"],
        },
        {
            match: "*://iswbm.com/*",
            hide: ["#read-more-wrap"],
            expand: ["#container"],
        },
        {
            match: "*://www.oschina.net/*",
            hide: ["div.collapse-bar"],
            expand: ["div.article-detail"],
            directLink: ["*://www.oschina.net/action/GoToLink?url=*", "url"],
        },
        {
            match: "*://juejin.cn/post/*",
            directLink: ["*link.juejin.cn/?target=*", "target"],
        },
        {
            match: "*://www.3h3.com/soft/*",
            hide: ["#showmore"],
            expand: ["#ctext"],
        },
        {
            match: "*://finance.sina.com.cn/*",
            hide: ["#sina-cont000", "#sina-pages-u"],
        },
        {
            match: "*://*.py.cn/code/*",
            start: () => {
                unsafeWindow.IsLevelDate = 1;
                Object.defineProperty(unsafeWindow, "IsLevelDate", {
                    get: function () {
                        return 1;
                    },
                    enumerable: true,
                    configurable: true,
                });
                Object.defineProperty(unsafeWindow, "is_login", {
                    get: function () {
                        return 1;
                    },
                    enumerable: true,
                    configurable: true,
                });
            },
        },
        {
            match: "*://m.36kr.com/*",
            hide: [".kr-mobile-goapp", ".article-goapp", ".float-app-button-wrp", ".article-top-swiper-goapp"],
            expand: ["#body-content"],
        },
        {
            match: ["*://m.imooc.com/*", "*://www.imooc.com/*"],
            hide: [".wenda-more-wrap.js-wenda-more", "#js-appload", ".js-footer-appload", ".detail-content.long-content .showMore", ".hide-articel-box", ".js-show-reply-btn.hide-answer-morebtn"],
            expand: ["#wap_wenda_detail", "#wenda_content", ".detail-content.long-content", "#js-qa-wenda", ".answer-content"],
        },
        {
            match: "*://zhuanlan.zhihu.com/p/*",
            hide: [".OpenInAppButton"],
            css: `
                [class^="css-"][href]{
                    display: block !important;
             }
            `,
            directLink: ["*link.zhihu.com/?target=*", "target"],
        },
        {
            match: "*://www.zhihu.com/question/*",
            hide: [".OpenInAppButton", ".openInApp", ".DownloadGuide", ".Pc-feedAd-container", ".MobileAppHeader-downloadLink", ".ContentItem-expandButton", ".AdBelowMoreAnswers", ".MBannerAd"],
            expand: [".RichContent-inner--collapsed", ".RichContent-inner"],
            wait: [
                [".ModalExp-modalShow", (node) => ((node.parentNode.style.display = "none"), document.body.classList.remove("ModalWrap-body"))],
                [
                    ".is-collapsed",
                    (node) => {
                        node.classList.remove("is-collapsed");
                    },
                ],
            ],
            directLink: ["*link.zhihu.com/?target=*", "target"],
            css: `
                .RichContent--unescapable.is-collapsed .RichContent-inner {
                    -webkit-mask-image: unset !important;
                    mask-image: unset !important;
                }
                .RichContent.is-collapsed {
                    cursor: unset !important;
                }
            `,
        },
        {
            match: "*://www.cnbeta.com/articles/*",
            hide: ["div[style='display:block !important;position:fixed;bottom:0;margin-top:10px;width:100%;background:#c44;color:#fff;font-size:15px;z-index:99999']"],
        },
        {
            match: "*://xw.qq.com/cmsid/*",
            hide: [".collapseWrapper", ".redbag.item"],
            expand: ["#article_body"],
        },
        {
            // https://xw.qq.com/amphtml/20220222A03ZFF00
            match: "*://xw.qq.com/amphtml/*",
            hide: ["div.ct-unfold"],
            expand: [".article-main.fold"],
        },
        {
            match: "*://xuedingmiao.com/*",
            hide: ["#read-more-wrap"],
            expand: ["#main-content"],
        },
        {
            match: "*://blog.51cto.com/*",
            js: () => {
                jQuery(function () {
                    $(".copy_btn").removeClass("disable");
                    $(".copy_btn").text("免登录复制");
                    $("body")
                        .off("click.copy_btn")
                        .on("click", ".copy_btn", function (e) {
                            e.stopPropagation();
                            let $this = $(this);
                            let text = $(this).parent(".hljs-cto").find("pre").find(".language-")[0].textContent;
                            copy(text).then(
                                () => {
                                    $this.text("已复制");
                                    setTimeout(function () {
                                        $this.text("免登录复制");
                                    }, 2000);
                                },
                                (e) => {
                                    $this.text("复制失败:" + e);
                                    setTimeout(function () {
                                        $this.text("免登录复制");
                                    }, 2000);
                                }
                            );
                        });
                });
            },
        },
        {
            match: "*://wap.peopleapp.com/article/*",
            hide: [".read-more"],
            expand: [".article-wrapper.has-more-high"],
        },
        {
            match: "*://baike.baidu.com/item/*",
            wait: [
                [
                    // 需要循环?
                    ".yx-load-more-inner.J-yx-load-moreContent",
                    (node) => {
                        node.dispatchEvent(new Event("tap"));
                        document.getElementById("ui_refresh_down").style.display = "none";
                        return false;
                    },
                ],
            ],
        },
        {
            match: ["*://m.jb51.cc/*", "*://www.jb51.cc/*"],
            hide: ["#read-more-wrap"],
            expand: ["#container"],
        },
        {
            match: "*://www.yiidian.com/*",
            hide: ["#read-more-wrap"],
            expand: ["#yArticle"],
        },
        {
            match: "*://bbs.elecfans.com/m/*",
            hide: [".conMore", ".login-reg-fixed"],
            expand: [".postListCon"],
        },
        {
            match: ["*://www.elecfans.com/*", "*://m.elecfans.com/*"],
            hide: [".seeHide_new_login", ".open_app.open_app_fixed", ".login-reg-fixed"],
            expand: [".article_content", ".simditor .simditor-body"],
        },
        {
            match: "*://www.bandbbs.cn/threads/*",
            hide: [".bbCodeBlock-expandLink.js-expandLink"],
            wait: [[".js-expandWatch:not(.is-expanded)", (node) => node.classList.add("is-expanded")]],
        },
        {
            match: "*://chejiahao.m.autohome.com.cn/info/*",
            hide: ["#continue_reading"],
            expand: [".major-long-details"],
            wait: [[".pgc-details .fn-hide", (node) => node.classList.remove("fn-hide")]],
        },
        {
            match: "*://www.bjtzdbzz.com/*",
            hide: [".pc-request-btn", ".mb-request-btn"],
            expand: [".detail-content-desc-show"],
        },
        {
            match: "*://m.21jingji.com/article/*",
            hide: [".content .mask"],
            expand: [".txtContent"],
        },
        {
            // https://zhidao.baidu.com/question/423275263.html
            match: "*://zhidao.baidu.com/question/*",
            hide: [".w-detail-display-btn-text", ".wgt-best-mask", ".wgt-answers-mask", ".wgt-question-desc-action", ".w-reply-text .unfold"],
            expand: [".w-detail-container.w-detail-index", "div[id^=best-content-]", "div[id^=answer-content-]", ".wgt-question-desc-inner", ".w-reply-text"],
            js: () => {
                let e = document.getElementById("show-answer-hide");
                if (e) {
                    e.dispatchEvent(new Event("click"));
                }
            },
        },
        {
            match: "*://haokan.baidu.com/v*",
            hide: [".share-origin.wx-share-launch", ".player-pause-code-bottom-text", ".player-pause-code-inner"],
        },
        {
            match: "*://www.xz577.com/*",
            hide: [".article-content-body-more1"],
            expand: [".con2"],
        },
        {
            match: "*://www.it1352.com/*",
            hide: [".arc-body-main-more"],
            expand: [".arc-body-main"],
            js: () => {
                $.cookie("olduser", "1", {
                    domain: "it1352.com",
                    expires: 1500,
                });
            },
        },
        {
            match: "*://g.pconline.com.cn/*",
            hide: [".btnForAppOpenA", ".btnForAppOpenImg", ".add_artilce_handle", ".WakeUptop"],
            expand: [".art-content"],
        },
        {
            match: "*://m.huanqiu.com/*",
            hide: [".unfold-btn"],
            expand: [".article-content"],
        },
        {
            match: "*://iknow.lenovo.com.cn/*",
            hide: [".coverQRCode"],
            js: () => {
                localStorage.setItem("scanQRCode", "1");
                $(document).off("scroll.unable");
            },
        },
        {
            // https://www.jianshu.com/p/e7dc41b6ea54
            match: "*://www.jianshu.com/p/*",
            hide: [".note-graceful-button p", ".download-app-guidance", ".call-app-btn", "#jianshu-header", "#note-show .content .show-content-free .collapse-tips", ".download", ".note-comment-above-ad-wrap", ".close-collapse-btn", ".open-app-btn", ".app-open", "#guangtui", "#fixed-ad-container", ".fubiao-dialog"],
            expand: ["#note-show .content .show-content-free .collapse-free-content"],
            directLink: ["*://link.jianshu.com/?t=*", "t", "*://links.jianshu.com/go?to=*", "to"],
            js: () => {
                let node = document.querySelector(".collapse-free-content");
                if (node) {
                    node.removeAttribute("class");
                }
            },
        },
        {
            // 百度新闻, 百家号
            match: ["*://baijiahao.baidu.com/s*", "*://ext.baidu.com/api/comment/v1/page/list*", "*://mbd.baidu.com/newspage/*", "*://www.baidu.com/#iact=wiseindex/tabs/news/activity/newsdetail=*"],
            hide: [".packupButton", ".oPadding", ".newUnfoldFullBox.contentPadding", ".undefined"],
            expand: [".mainContent"],
            wait: [
                ["p:contains('百度APP内阅读')", (node) => node.parentNode.parentNode.removeChild(node.parentNode)],
                [".layer-content.layer-content-shown", (node) => node.querySelector(".layer-itemBtn.normal").dispatchEvent(new Event("click"))],
            ],
        },
        {
            match: "*://blog.csdn.net/*",
            hide: [".weixin-shadowbox.wap-shadowbox", ".aside-header-fixed", ".hide-preCode-box", "#m_toolbar_left .m_toolbar_left_app_btn", ".readall_box", "span.feed-Sign-span", ".btn_mod", ".btn_app_link", ".btn-readmore", ".comment_read_more_box", ".btn_open_app_prompt_div"],
            expand: [".article_content", "#article_content", "#comment", ".set-code-hide"],
            directLink: ["*://link.csdn.net/?target=*", "target"],
            bindClick: [
                "a[href^=http]",
                (node, e) => {
                    if (node.target == "_blank" && !node.hostname.includes(".csdn.net")) {
                        e.stopPropagation();
                    }
                },
            ],
            css: `

                #content_views,code,pre {
                    -webkit-touch-callout: auto !important;
                    -webkit-user-select: auto !important;
                    -khtml-user-select: auto !important;
                    -moz-user-select: auto !important;
                    -ms-user-select: auto !important;
                    user-select: auto !important;
            `,
            js: () => {
                safeWaitJQuery(() => {
                    jQuery(function () {
                        jQuery(function () {
                            jQuery(".recommend-jump-app").removeAttr("id");
                            jQuery(".recommend-jump-app")
                                .off("click")
                                .on("click", (e) => {
                                    let url = jQuery(this).find("a.flag").attr("href");
                                    if (url) {
                                        location.href = url;
                                    }
                                });
                            jQuery("a[data-report-click]").removeAttr("data-report-click");
                            jQuery("a[data-report-query]").removeAttr("data-report-query");
                            if (typeof unsafeWindow.csdn != "undefined") {
                                // https://github.com/adlered/CSDNGreener
                                jQuery("code").attr("onclick", "mdcp.copyCode(event)");
                                try {
                                    unsafeWindow.csdn.copyright.init("", "", "");
                                } catch (err) {}
                                try {
                                    Object.defineProperty(unsafeWindow.csdn.report, "reportClick", {
                                        value: function () {
                                            return true;
                                        },
                                        writable: false,
                                        configurable: false,
                                    });
                                } catch (err) {}
                                try {
                                    Object.defineProperty(unsafeWindow, "articleType", {
                                        value: 0,
                                        writable: false,
                                        configurable: false,
                                    });
                                } catch (err) {}
                            }
                        });
                    });
                });
            },
        },
        {
            match: "*://jingyan.baidu.com/article/*",
            hide: [".read-whole-mask"],
            expand: [".exp-content-container"],
        },
    ];

    function matchRule(str, rule) {
        var escapeRegex = (str) => str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
        return new RegExp("^" + rule.split("*").map(escapeRegex).join(".*") + "$").test(str);
    }

    // https://greasyfork.org/zh-CN/scripts/416338
    function parseUrl(href) {
        if (!href) return {};
        let search;

        try {
            // 链接
            const url = new URL(href);
            ({ search } = url); // 主要处理对hash的search

            if (!search && url.hash.includes("?")) {
                search = url.hash.split("?")[1];
            }
        } catch (err) {
            // 非链接,如：a=1&b=2、?a=1、/foo?a=1、/foo#bar?a=1
            if (href.includes("?")) {
                search = href.split("?")[1];
            } else {
                search = href;
            }
        }

        const searchParams = new URLSearchParams(search);
        return [...searchParams.entries()].reduce((acc, [key, value]) => ((acc[key] = value), acc), {});
    }

    function randomString(length, chars) {
        let result = "";
        for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }

    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    function getCookie(name) {
        let nameEQ = name + "=";
        let ca = document.cookie.split(";");
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == " ") c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    function eraseCookie(name) {
        document.cookie = name + "=; Max-Age=-99999999;";
    }

    function clearAdLoop() {
        let id = setTimeout(";");
        for (let i = 0; i < id; i++) {
            clearTimeout(i);
        }
        id = setInterval(";");
        for (let i = 0; i < id; i++) {
            clearInterval(i);
        }
    }

    function safeWaitJQuery(callbackFunc) {
        let jQueryTimer = setInterval(function () {
            if (typeof jQuery !== "undefined") {
                clearInterval(jQueryTimer);
                callbackFunc(jQuery);
            }
        }, 300);
    }

    function copy(value) {
        return new Promise((resolve, reject) => {
            navigator.clipboard
                ? navigator.clipboard.writeText(value).then(resolve, function () {
                      nativeCopy(text).then(resolve, reject);
                  })
                : nativeCopy(text).then(resolve, reject);
        });
    }

    function nativeCopy(value) {
        return new Promise((resolve, reject) => {
            let textArea = document.createElement("textarea");
            textArea.value = value;
            textArea.style.top = "0";
            textArea.style.left = "0";
            textArea.style.position = "fixed";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand("copy");
                setTimeout(() => {
                    resolve(value);
                }, 1);
            } catch (e) {
                setTimeout(() => {
                    reject(e);
                }, 1);
            }
            document.body.removeChild(textArea);
        });
    }

    function querySelectorIncludesText(selector, text) {
        return Array.from(document.querySelectorAll(selector)).filter((el) => el.textContent.includes(text));
    }

    // https://github.com/Shawak/TwitchSquad/blob/main/twitchsquad.user.js
    if (typeof GM_addStyle === "undefined") {
        GM_addStyle = function (css) {
            let head = document.getElementsByTagName("head")[0],
                style = document.createElement("style");
            if (!head) {
                return;
            }
            style.type = "text/css";
            try {
                style.innerHTML = css;
            } catch (x) {
                style.innerText = css;
            }
            head.appendChild(style);
        };
    }
    if (typeof unsafeWindow == "undefined") unsafeWindow = window;

    const readyName = randomString(8, "abcdefghijklmnopqrstuvwxyz");

    for (var website of websites) {
        let hit = false;
        if (Array.isArray(website.match)) {
            hit = website.match.some((s) => matchRule(window.location.href, s));
        } else {
            hit = matchRule(window.location.href, website.match);
        }

        if (hit) {
            console.log(website);
            let style = "";
            if ("hide" in website && website.hide.length > 0) {
                style +=
                    website.hide.join(",\n") +
                    `
                {
                    display: none !important;
                    visibility:hidden !important;
                    max-height: 0 !important;
                    max-width: 0 !important;
                    height: 0 !important;
                    width: 0 !important;
                }

                `;
            }
            if ("expand" in website && website.expand.length > 0) {
                style +=
                    website.expand.join(",\n") +
                    `
                {
                    height: auto !important;
                    max-height: unset !important;
                    overflow: unset !important;
                    -webkit-line-clamp: unset !important;
                }

                `;
            }
            if ("disable" in website && website.disable.length > 0) {
                style +=
                    website.disable.join(",\n") +
                    `
                {
                    pointer-events: none !important;
                }

                `;
            }
            if ("css" in website && website.css.length > 0) {
                style += website.css;
            }
            GM_addStyle(style);

            if ("wait" in website) {
                // TODO 需要换种方式优化
                let ready = [];
                let id = setInterval(() => {
                    try {
                        for (let w of website.wait) {
                            if (!(w[0] in ready)) {
                                let nodeList;
                                let m = w[0].match(/(.+?):contains\(\s*['"](.+?)['"]\s*\)/);
                                if (m) {
                                    nodeList = querySelectorIncludesText(m[1], m[2]);
                                } else {
                                    nodeList = document.querySelectorAll(w[0]);
                                }
                                let allNodeFinish = true;
                                nodeList.forEach((node) => {
                                    if (!node.dataset[readyName]) {
                                        if (w[1] === "click") {
                                            node.dispatchEvent(new Event("click"));
                                            node.dispatchEvent(new Event("tap"));
                                        } else {
                                            let callret = w[1].call(node, node); // 返回值
                                            if (callret === false) {
                                                allNodeFinish = callret;
                                                return;
                                            }
                                        }
                                        node.dataset[readyName] = true;
                                    }
                                });
                                if (allNodeFinish) {
                                    ready.push(w[0]);
                                }
                            }
                        }
                        if (ready.length == website.wait.length) {
                            clearInterval(id);
                        }
                    } catch (x) {
                        clearInterval(id);
                    }
                }, 2000);
            }

            if ("directLink" in website) {
                // 去除链接重定向

                // 支持鼠标左右键和拖拽打开超链接
                document.addEventListener(
                    "mousedown",
                    (e) => {
                        // https://greasyfork.org/zh-CN/scripts/20431-zhihu-link-redirect-fix
                        let dom = e.target;
                        let target = dom.closest("a[href]");
                        if (target) {
                            let d = website.directLink;
                            for (let i = 0; i < d.length; i += 2) {
                                if (matchRule(target.href, d[i])) {
                                    if (typeof d[i + 1] === "function") {
                                        d[i + 1].call(target, target);
                                    } else {
                                        let param = parseUrl(target.href);
                                        if (param[d[i + 1]]) {
                                            target.href = param[d[i + 1]];
                                        }
                                    }
                                    // 避免泄露来源, 加强隐私保护
                                    if (target.target == "_blank") {
                                        let rel = target.getAttribute("rel");
                                        if (rel != null) {
                                            if (!rel.includes("noreferrer")) {
                                                target.setAttribute("rel", rel + " noreferrer");
                                            }
                                        } else {
                                            target.setAttribute("rel", "noreferrer");
                                        }
                                    }
                                }
                            }
                        }
                    },
                    true
                );
            }

            if ("bindClick" in website) {
                document.addEventListener(
                    "click",
                    (e) => {
                        let dom = e.target;
                        let d = website.bindClick;
                        let target = dom.closest(d[0]);
                        if (target) {
                            d[1].call(target, target, e);
                        }
                    },
                    true
                );
            }

            if ("start" in website) {
                website.start();
            }

            if ("js" in website) {
                if (document.readyState == "complete") {
                    website.js();
                    // alert("程序出现异常");
                    // GM_openInTab("https://greasyfork.org/zh-CN/scripts/440400/feedback");
                } else {
                    document.addEventListener("DOMContentLoaded", website.js);
                }
            }

            break;
        }
    }
})();
