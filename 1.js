// ==UserScript==
// @name         uView Plus Ad Bypass (VIP Simulation + Google Ads Blocker)
// @namespace    https://uiadmin.net/
// @version      1.0.3
// @description  Bypass uView Plus documentation ad verification, block QR prompts.
// @description:zh-CN  拦截 uView Plus 文档广告验证请求，模拟 VIP 响应，移除二维码弹窗。
// @author       WanliZhong
// @license      MIT
// @homepage     https://uview-plus.lingyun.net/
// @supportURL   https://uview-plus.lingyun.net/cooperation/about.html
// @match        https://uiadmin.net/*
// @match        https://*.uiadmin.net/*
// @match        https://uview-plus.jiangruyi.com/*
// @match        https://uview-plus.lingyun.net/*
// @icon         https://uview-plus.lingyun.net/favicon.ico
// @run-at       document-start
// @grant        none
// @downloadURL https://github.com/4165306/uview-plus-ad-bypass/tree/main
// @updateURL https://github.com/4165306/uview-plus-ad-bypass/tree/main
// ==/UserScript==

(function () {
  'use strict';

 // 重写fetch函数
const originalFetch = window.fetch;
window.fetch = async function(url, options) {
  // 调用原始fetch
  const response = await originalFetch(url, options);

  // 只处理/api/add的请求
  if (url.includes('/api/v1/wxapp/ad/add')) {
    // 克隆响应以避免被消费
    const clonedResponse = response.clone();

    try {
      // 解析响应数据
      const data = await clonedResponse.json();

      // 检查数据结构并修改isLoad
      if (data && data.data) {
          data.datda.isVip = true
      }

      // 创建新的响应返回修改后的数据
      return new Response(JSON.stringify(data), {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers
      });
    } catch (e) {
      // 解析失败时返回原始响应
      console.error('解析响应失败:', e);
      return response;
    }
  }

  // 非目标URL直接返回原始响应
  return response;
};

// 重写XMLHttpRequest
const originalXHR = window.XMLHttpRequest;
window.XMLHttpRequest = function() {
  const xhr = new originalXHR();

  // 保存原始的open和send方法
  const originalOpen = xhr.open;
  const originalSend = xhr.send;
  let currentUrl = '';

  // 重写open方法以获取请求URL
  xhr.open = function(method, url, async, user, password) {
    currentUrl = url;
    console.log('url被打开', currentUrl)
    originalOpen.apply(xhr, arguments);
  };

  // 重写onreadystatechange以拦截响应
  xhr.onreadystatechange = function() {
    // 当请求完成且成功时
    if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
      console.log('请求处理完成', currentUrl)
      // 只处理/api/add的请求
      if (currentUrl.includes('/ad/add')) {
        try {
          // 解析响应数据
          const data = JSON.parse(xhr.responseText);
          console.log('responseData', data)
          // 检查数据结构并修改isLoad
          if (data && data.data) {
            data.data.isVip = true;
            // 修改响应文本
            Object.defineProperty(xhr, 'responseText', {
              value: JSON.stringify(data)
            });
          }
        } catch (e) {
          console.error('解析XHR响应失败:', e);
        }
      }
    }

    // 如果有自定义的onreadystatechange，执行它
    if (xhr._customOnReadyStateChange) {
      xhr._customOnReadyStateChange.apply(xhr, arguments);
    }
  };

  // 提供设置自定义onreadystatechange的方法
  Object.defineProperty(xhr, 'onreadystatechange', {
    set: function(callback) {
      xhr._customOnReadyStateChange = callback;
    },
    get: function() {
      return xhr._customOnReadyStateChange;
    }
  });

  return xhr;
};

})();