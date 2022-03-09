// ==UserScript==
// @name        自动展开全文阅读更多
// @version     1.47.0
// @author      baster
// @description 自动展开网站内容而无需点击，去掉部分烦人广告，去掉需要打开app的提示，站外链直达，避免网址重定向浪费时间，支持免登陆复制
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
// @match       *://bbs.elecfans.com/m/*
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
// @match       *://m.imooc.com/*
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
// @grant       GM_addStyle
// @grant       GM_openInTab
// @grant       unsafeWindow
// @run-at      document-start
// ==/UserScript==

(function () {
    var websites = [
        {
            // http://www.360doc.com/content/20/0805/05/71057272_928578782.shtml
            wildcard: "*://www.360doc.com/content/*",
            hide: [".article_showall"],
            expand: ["#articlecontent"],
        },
        {
            // https://www.iteye.com/blog/agile-boy-274366
            wildcard: "*://www.iteye.com/blog/*",
            hide: [".hide-article-box"],
            expand: ["#blog_content"],
        },
        {
            wildcard: "*://www.423down.com/*",
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
            wildcard: "*://www.itdaan.com/*",
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
            wildcard: "*://show.bookmarkearth.com/view/*",
            js: () => {
                let node = document.querySelector("p.link");
                if (node) {
                    location.replace(node.innerText);
                }
            },
        },
        {
            wildcard: "*://www.shaduizi.com/*",
            hide: [".content-container-open-btn"],
            expand: [".content-section.content-section-container"],
        },
        {
            wildcard: "*://www.chinaz.com/*",
            hide: [".contentPadding"],
            expand: ["#article-content"],
        },
        {
            wildcard: "*://www.tianyancha.com/*",
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
            wildcard: "*://gitee.com/*",
            directLink: ["*://gitee.com/link?target=*", "target"],
        },
        {
            // 百度搜索移动端
            wildcard: "*://m.baidu.com/*",
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
            wildcard: "*://www.wxnmh.com/*",
            hide: [".hide-article-box"],
            expand: ["#message_content"],
        },
        {
            wildcard: "*://www.douban.com/*",
            directLink: ["*.douban.com/link2/?url=*", "url"],
        },
        {
            wildcard: "*://wap.sogou.com/web/*",
            directLink: ["*://wap.sogou.com/web/id=*&url=*", "url"],
        },
        {
            wildcard: "*://m.so.com/s?q=*",
            directLink: ["*.so.com/jump?u=*", "u"],
        },
        {
            wildcard: "*://iswbm.com/*",
            hide: ["#read-more-wrap"],
            expand: ["#container"],
        },
        {
            wildcard: "*://www.oschina.net/*",
            hide: ["div.collapse-bar"],
            expand: ["div.article-detail"],
            directLink: ["*://www.oschina.net/action/GoToLink?url=*", "url"],
        },
        {
            wildcard: "*://juejin.cn/post/*",
            directLink: ["*link.juejin.cn/?target=*", "target"],
        },
        {
            wildcard: "*://www.3h3.com/soft/*",
            hide: ["#showmore"],
            expand: ["#ctext"],
        },
        {
            wildcard: "*://finance.sina.com.cn/*",
            hide: ["#sina-cont000", "#sina-pages-u"],
        },
        {
            wildcard: "*://*.py.cn/code/*",
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
            wildcard: "*://m.36kr.com/*",
            hide: [".kr-mobile-goapp", ".article-goapp", ".float-app-button-wrp", ".article-top-swiper-goapp"],
            expand: ["#body-content"],
        },
        {
            wildcard: "*://m.imooc.com/*",
            hide: [".wenda-more-wrap.js-wenda-more", "#js-appload", ".js-footer-appload"],
            expand: ["#wap_wenda_detail", "#wenda_content"],
        },
        {
            wildcard: "*://zhuanlan.zhihu.com/p/*",
            hide: [".OpenInAppButton"],
            css: `
                [class^="css-"][href]{
                    display: block !important;
             }
            `,
            directLink: ["*link.zhihu.com/?target=*", "target"],
        },
        {
            wildcard: "*://www.zhihu.com/question/*",
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
        },
        {
            wildcard: "*://www.cnbeta.com/articles/*",
            hide: ["div[style='display:block !important;position:fixed;bottom:0;margin-top:10px;width:100%;background:#c44;color:#fff;font-size:15px;z-index:99999']"],
        },
        {
            wildcard: "*://xw.qq.com/cmsid/*",
            hide: [".collapseWrapper", ".redbag.item"],
            expand: ["#article_body"],
        },
        {
            // https://xw.qq.com/amphtml/20220222A03ZFF00
            wildcard: "*://xw.qq.com/amphtml/*",
            hide: ["div.ct-unfold"],
            expand: [".article-main.fold"],
        },
        {
            wildcard: "*://xuedingmiao.com/*",
            hide: ["#read-more-wrap"],
            expand: ["#main-content"],
        },
        {
            wildcard: "*://blog.51cto.com/*",
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
            wildcard: "*://wap.peopleapp.com/article/*",
            hide: [".read-more"],
            expand: [".article-wrapper.has-more-high"],
        },
        {
            wildcard: "*://baike.baidu.com/item/*",
            wait: [
                [
                    // 需要循环?
                    ".yx-load-more-inner.J-yx-load-moreContent",
                    (node) => node.dispatchEvent(new Event("tap")),
                ],
            ],
        },
        {
            wildcard: ["*://m.jb51.cc/*", "*://www.jb51.cc/*"],
            hide: ["#read-more-wrap"],
            expand: ["#container"],
        },
        {
            wildcard: "*://www.yiidian.com/*",
            hide: ["#read-more-wrap"],
            expand: ["#yArticle"],
        },
        {
            wildcard: "*://bbs.elecfans.com/m/*",
            hide: [".conMore", ".login-reg-fixed"],
            expand: [".postListCon"],
        },
        {
            wildcard: "*://www.bandbbs.cn/threads/*",
            hide: [".bbCodeBlock-expandLink.js-expandLink"],
            wait: [[".js-expandWatch:not(.is-expanded)", (node) => node.classList.add("is-expanded")]],
        },
        {
            wildcard: "*://chejiahao.m.autohome.com.cn/info/*",
            hide: ["#continue_reading"],
            expand: [".major-long-details"],
            wait: [[".pgc-details .fn-hide", (node) => node.classList.remove("fn-hide")]],
        },
        {
            wildcard: "*://www.bjtzdbzz.com/*",
            hide: [".pc-request-btn", ".mb-request-btn"],
            expand: [".detail-content-desc-show"],
        },
        {
            wildcard: "*://m.21jingji.com/article/*",
            hide: [".content .mask"],
            expand: [".txtContent"],
        },
        {
            wildcard: "*://zhidao.baidu.com/question/*",
            hide: [".w-detail-display-btn-text", ".wgt-best-mask"],
            expand: [".w-detail-container.w-detail-index", "div[id^=best-content-]"],
        },
        {
            wildcard: "*://haokan.baidu.com/v*",
            hide: [".share-origin.wx-share-launch"],
        },
        {
            wildcard: "*://www.xz577.com/*",
            hide: [".article-content-body-more1"],
            expand: [".con2"],
        },
        {
            wildcard: "*://www.it1352.com/*",
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
            wildcard: "*://g.pconline.com.cn/*",
            hide: [".btnForAppOpenA", ".btnForAppOpenImg", ".add_artilce_handle", ".WakeUptop"],
            expand: [".art-content"],
        },
        {
            wildcard: "*://m.huanqiu.com/*",
            hide: [".unfold-btn"],
            expand: [".article-content"],
        },
        {
            wildcard: "*://iknow.lenovo.com.cn/*",
            hide: [".coverQRCode"],
            js: () => {
                localStorage.setItem("scanQRCode", "1");
                $(document).off("scroll.unable");
            },
        },
        {
            wildcard: "*://www.jianshu.com/p/*",
            hide: [".note-graceful-button p", ".download-app-guidance", ".call-app-btn", "#jianshu-header", "#note-show .content .show-content-free .collapse-tips", ".download", ".note-comment-above-ad-wrap", ".close-collapse-btn", ".open-app-btn", ".app-open", "#guangtui", "#fixed-ad-container", ".fubiao-dialog"],
            expand: ["#note-show .content .show-content-free .collapse-free-content"],
            directLink: ["https://links.jianshu.com/go?to=*", "to"],
            js: () => {
                let node = document.querySelector(".collapse-free-content");
                if (node) {
                    node.removeAttribute("class");
                }
            },
        },
        {
            // 百度新闻, 百家号
            wildcard: ["*://baijiahao.baidu.com/s*", "*://ext.baidu.com/api/comment/v1/page/list*", "*://mbd.baidu.com/newspage/*", "*://www.baidu.com/#iact=wiseindex/tabs/news/activity/newsdetail=*"],
            hide: [".packupButton", ".oPadding", ".newUnfoldFullBox.contentPadding", ".undefined"],
            expand: [".mainContent"],
            wait: [
                ["p:contains('百度APP内阅读')", (node) => node.parentNode.parentNode.removeChild(node.parentNode)],
                [".layer-content.layer-content-shown", (node) => node.querySelector(".layer-itemBtn.normal").dispatchEvent(new Event("click"))],
            ],
        },
        {
            wildcard: "*://blog.csdn.net/*",
            hide: [".weixin-shadowbox.wap-shadowbox", ".btn_mod", ".btn_app_link", ".btn-readmore", ".comment_read_more_box", ".btn_open_app_prompt_div"],
            expand: [".article_content", "#article_content", "#comment"],
            directLink: ["*://link.csdn.net/?target=*", "target"],
            js: () => {
                safeWaitJQuery(() => {
                    jQuery(function () {
                        jQuery(function () {
                            jQuery(".recommend-jump-app")
                                .off("click")
                                .on("click", (e) => e.stopPropagation());
                            jQuery("[data-report-click]").removeAttr("data-report-click");
                            // $(document).off('click', '.container-blog a')
                            // $(document).off('click', '[data-report-click]')

                            if (typeof csdn != "undefined") {
                                // https://github.com/adlered/CSDNGreener
                                $("code").attr("onclick", "mdcp.copyCode(event)");
                                try {
                                    csdn.copyright.init("", "", "");
                                    Object.defineProperty(window, "articleType", {
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
            wildcard: "*://jingyan.baidu.com/article/*",
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
        } catch {
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
        console.log(value);
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
        if (Array.isArray(website.wildcard)) {
            hit = website.wildcard.some((s) => matchRule(window.location.href, s));
        } else {
            hit = matchRule(window.location.href, website.wildcard);
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
            console.log(style);
            GM_addStyle(style);

            if ("wait" in website) {
                // TODO 需要换种方式优化
                let ready = {};
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
                                nodeList.forEach((node) => {
                                    if (!node.dataset[readyName]) {
                                        if (w[1] === "click") {
                                            node.dispatchEvent(new Event("click"));
                                            node.dispatchEvent(new Event("tap"));
                                        } else {
                                            w[1].call(node, node); // 返回值
                                        }
                                        node.dataset[readyName] = true;
                                    }
                                    console.log(w[0]);
                                    ready[w[0]] = true;
                                });
                            }
                        }
                        if (Object.keys(ready).length == website.wait.length) {
                            clearInterval(id);
                        }
                    } catch (x) {
                        clearInterval(id);
                    }
                }, 1000);
            }

            if ("directLink" in website) {
                // 去除链接重定向
                document.addEventListener(
                    "click",
                    (e) => {
                        // https://greasyfork.org/zh-CN/scripts/20431-zhihu-link-redirect-fix
                        let dom = e.target;
                        let target = dom.closest("a[href]");
                        if (target) {
                            let d = website.directLink;
                            if (matchRule(target.href, d[0])) {
                                if (typeof d[1] === "function") {
                                    d[1].call(target, target);
                                } else {
                                    let param = parseUrl(target.href);
                                    if (param[d[1]]) {
                                        target.href = param[d[1]];
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
