// ==UserScript==
// @name         Knife4j 反向代理 API 前缀修正
// @namespace    https://greasyfork.org/zh-CN/users/306433
// @version      1.1
// @description  从 doc.html 解析 nginx 代理前缀；未开启 Knife4j 个性化 Host 时自动补全同源 API 路径
// @author       https://greasyfork.org/zh-CN/users/306433-baster
// @match        *://*/*/doc.html*
// @match        *://*/*/*/doc.html*
// @match        *://*/*/*/*/doc.html*
// @run-at       document-start
// @inject-into  page
// @require      https://unpkg.com/ajax-hook/dist/ajaxhook.min.js
// @grant        none
// ==/UserScript==

(function () {
    "use strict";

    var GLOBAL_SETTINGS_KEY = "Knife4jGlobalSettings";
    var hostEnabled = false;
    var hostBaseUrl = null;

    function getApiBase() {
        var pathname = location.pathname.replace(/\/+$/, "");
        var idx = pathname.toLowerCase().lastIndexOf("/doc.html");
        if (idx < 0) return null;
        var basePath = pathname.slice(0, idx) || "";
        return location.origin + basePath + "/";
    }

    var apiBase = getApiBase();
    if (!apiBase) return;

    var basePathname = new URL(apiBase).pathname;
    if (!basePathname.endsWith("/")) basePathname += "/";

    function parseHostText(text) {
        var raw = (text || "").trim();
        if (!raw) return null;
        if (!/^https?:\/\//i.test(raw)) raw = "http://" + raw;
        try {
            return new URL(raw);
        } catch (e) {
            return null;
        }
    }

    function applyKnife4jSettings(settings) {
        if (!settings || typeof settings !== "object") {
            hostEnabled = false;
            hostBaseUrl = null;
            return;
        }
        hostEnabled = !!settings.enableHost;
        hostBaseUrl = hostEnabled ? parseHostText(settings.enableHostText) : null;
    }

    function readKnife4jSettingsFromIdb() {
        return new Promise(function (resolve) {
            if (!("indexedDB" in window)) {
                resolve(null);
                return;
            }
            var req = indexedDB.open("localforage");
            req.onerror = function () {
                resolve(null);
            };
            req.onsuccess = function (event) {
                var db = event.target.result;
                if (!db.objectStoreNames.contains("keyvaluepairs")) {
                    resolve(null);
                    return;
                }
                var tx = db.transaction(["keyvaluepairs"], "readonly");
                var store = tx.objectStore("keyvaluepairs");
                var getReq = store.get(GLOBAL_SETTINGS_KEY);
                getReq.onsuccess = function () {
                    resolve(getReq.result || null);
                };
                getReq.onerror = function () {
                    resolve(null);
                };
            };
        });
    }

    function refreshKnife4jSettings() {
        return readKnife4jSettingsFromIdb().then(function (settings) {
            applyKnife4jSettings(settings);
        });
    }

    refreshKnife4jSettings();
    setInterval(refreshKnife4jSettings, 1500);

    function isRequestToConfiguredHost(resolved) {
        if (!hostEnabled || !hostBaseUrl) return false;
        if (resolved.origin !== hostBaseUrl.origin) return false;
        var hostPath = hostBaseUrl.pathname;
        if (!hostPath || hostPath === "/") return true;
        if (!hostPath.endsWith("/")) hostPath += "/";
        var path = resolved.pathname;
        return path === hostBaseUrl.pathname.replace(/\/$/, "") || path.indexOf(hostPath) === 0;
    }

    function hasProxyPrefix(pathname) {
        if (pathname === basePathname.slice(0, -1)) return true;
        return pathname.indexOf(basePathname) === 0;
    }

    function shouldRewrite(resolved) {
        if (resolved.origin !== location.origin) return false;
        if (isRequestToConfiguredHost(resolved)) return false;
        if (hasProxyPrefix(resolved.pathname)) return false;
        return true;
    }

    function rewriteUrl(url) {
        if (!url || typeof url !== "string") return url;

        var trimmed = url.trim();
        if (
            trimmed.indexOf("data:") === 0 ||
            trimmed.indexOf("blob:") === 0 ||
            trimmed.indexOf("javascript:") === 0
        ) {
            return url;
        }

        try {
            var resolved = new URL(trimmed, location.href);
            if (!shouldRewrite(resolved)) return url;

            var path = resolved.pathname.replace(/^\//, "");
            resolved.pathname = (basePathname + path).replace(/\/{2,}/g, "/");
            return resolved.href;
        } catch (e) {
            return url;
        }
    }

    if (typeof ah !== "undefined" && ah.proxy) {
        ah.proxy({
            onRequest: function (config, handler) {
                config.url = rewriteUrl(config.url);
                handler.next(config);
            },
        });
    }

    var nativeFetch = window.fetch;
    if (typeof nativeFetch === "function") {
        window.fetch = function (input, init) {
            if (typeof input === "string") {
                return nativeFetch.call(this, rewriteUrl(input), init);
            }
            if (input instanceof Request) {
                var nextUrl = rewriteUrl(input.url);
                if (nextUrl !== input.url) {
                    input = new Request(nextUrl, input);
                }
            }
            return nativeFetch.call(this, input, init);
        };
    }
})();
