// ==UserScript==
// @name         TAPD关键字复制优化
// @namespace    https://greasyfork.org/zh-CN/users/306433
// @version      0.1
// @description  TAPD关键字复制优化, 关闭的trace log动作跟踪, 添加一个自定义复制项
// @author       https://greasyfork.org/zh-CN/users/306433-baster
// @supportURL   https://greasyfork.org/zh-CN/users/306433-baster
// @homepageURL  https://greasyfork.org/zh-CN/users/306433
// @match        https://www.tapd.cn/*
// @icon         https://www.tapd.cn/favicon.ico
// @license      GNU
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function () {
    "use strict";

    function hookVar(name, value) {
        window[name] = value;
        Object.defineProperty(window, name, {
            get: function () {
                return value;
            },
            set: function (value) {},
            enumerable: true,
            configurable: true,
        });
    }

    // 关闭trace跟踪
    hookVar("copy_title_and_url_in_view_link", "https://www.tapd.cn/fuck");
    hookVar("copy_short_link_in_view_link", "https://www.tapd.cn/fuck");
    hookVar("copy_io_convert_link_in_view_link", "https://www.tapd.cn/fuck");
    hookVar("copy_svn_commit_key_words_in_view_link", "https://www.tapd.cn/fuck");
    hookVar("copy_id__in_view_link", "https://www.tapd.cn/fuck");

    document.addEventListener("DOMContentLoaded", function () {
        console.log(document.getElementById("copy_id_new"));
        if (document.getElementById("copy_id_new") != null) {
            let title = $(".story-title").data("editable-value");
            let id = $("#copy_id_new").attr("data-clipboard-text");
            $("#copy_id_new").parent().prepend(`
			<li>
				<a  id="copy_new" data-clipboard-text='"msg": "${id} ${title}"' href="javascript:;" title="复制 ID&标题" class="clipboard-btn">
				复制 ID&标题</a>
			</li>
			`);
        }
    });
})();
