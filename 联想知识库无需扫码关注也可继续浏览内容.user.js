// ==UserScript==
// @name         联想知识库无需扫码关注也可继续浏览内容
// @namespace    https://greasyfork.org/zh-CN/users/306433
// @version      0.2
// @description  联想知识库无需扫码关注也可继续浏览内容, 测试于2022年2月
// @author       baster
// @supportURL   https://greasyfork.org/zh-CN/users/306433
// @homepageURL  https://greasyfork.org/zh-CN/users/306433
// @match        *://iknow.lenovo.com.cn/*
// @icon         https://www.lenovo.com.cn/favicon.ico
// @license      GNU
// @grant        none
// ==/UserScript==

;(function () {
  'use strict'
  localStorage.setItem('scanQRCode', '1')
  $('.coverQRCode').hide()
  $(document).off('scroll.unable')
})()
