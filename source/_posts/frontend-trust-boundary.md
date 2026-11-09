---
title: 前端安全的第一道口子，从来不是 XSS 漏洞，是信任错位
date: 2026-11-09 22:33:00
updated: 2026-11-09 22:33:00
categories: 前端
tags:
- 前端
- Web 安全
- CSP
- XSS
- 供应链
---

# 前端安全的第一道口子，从来不是 XSS 漏洞，是信任错位

> 复盘过的 XSS 事故里，多数不是「忘了转义」，而是「认为这块内容是可信的」。
> 转义只能治症状。真正要修的是：谁有权决定这段 HTML 该长什么样。

## 一、`dangerouslySetInnerHTML` 这个名字其实很好

React 给这个 API 起名时把话说得很明白：这事危险。但工程里常见的处理是——加个别名绕过去。

```jsx
// 常见做法
const Html = ({ html }) => <div dangerouslySetInnerHTML={{ __html: html }} />;
```

一旦有了这个组件，之后所有人都用它，没人再去想「这个 html 从哪来」。

问题的源头通常有三类：

1. **富文本编辑器**：用户/AI 生成的 HTML 直接渲染
2. **第三方内容**：评论、客服消息、嵌入卡片
3. **拼接**：`innerHTML = '<b>' + name + '</b>'` 这种模板拼串

第 3 类最好修（改 DOM API）。第 1、2 类是结构性问题：你**确实需要**渲染 HTML，所以不能简单禁用。

## 二、转义不是答案，白名单才是

对富文本内容，`escapeHtml()` 会把 `<b>加粗</b>` 变成可见的标签文本——内容坏掉，功能没了。所以大家开始找「只允许安全标签」的方案，这就是 HTML Sanitizer 的由来。

正确做法是**白名单**，明确列出允许的标签、属性、协议：

```js
import DOMPurify from 'dompurify';

const clean = DOMPurify.sanitize(rawHtml, {
  ALLOWED_TAGS: ['p', 'b', 'i', 'ul', 'ol', 'li', 'a', 'code', 'pre', 'br'],
  ALLOWED_ATTR: ['href', 'title'],
  ALLOWED_URI_REGEXP: /^(?:https?|mailto):/i,
});
```

几个必须记住的点：

- **黑名单一定漏。** `<img onerror>`、`<svg onload>`、`javascript:`、`data:text/html`、CSS `expression`、`<iframe srcdoc>`……列举不完，而且浏览器新特性会带来新入口。
- **不要自己写 sanitizer。** 这是少数几个「用库」比「自己写」正确得多的领域。
- **`href` 必须校验协议。** `javascript:alert(1)` 是最经典的漏网之鱼。
- **允许 `style` 属性要极其谨慎。** CSS 注入能做的事超出多数人预期（历史上有过 `background: url(javascript:...)`、以及利用 CSS 做数据外带）。

## 三、CSP 是第二道网，但多数站点配错了

内容安全策略的价值在于：**即使 sanitizer 漏了，浏览器也会拦住执行**。

一个真正有防护力的 CSP 大概长这样：

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'nonce-{random}' 'strict-dynamic';
  object-src 'none';
  base-uri 'none';
  frame-ancestors 'none';
  require-trusted-types-for 'script';
```

关键几条：

- **`script-src` 里不要有 `unsafe-inline`。** 有它等于没配——内联脚本是 XSS 最常见的落地方式。
- **`strict-dynamic` + nonce** 是现代写法：初始只信任带 nonce 的脚本，它动态插入的脚本也自动被信任。这样不用维护一长串 CDN 域名白名单。
- **`object-src 'none'`**：Flash 时代遗留，但仍有插件型攻击面。
- **`base-uri 'none'`**：防止攻击者注入 `<base>` 把所有相对链接劫持到自己的域名。
- **`frame-ancestors 'none'`**：防点击劫持（比 `X-Frame-Options` 更细）。

配置建议：**先开 `Content-Security-Policy-Report-Only` 跑两周**，收集违规报告，把真实需要的域名加进去，再切正式模式。直接上正式模式，几乎一定会打断某个第三方脚本。

## 四、Trusted Types：把「字符串拼 HTML」这条路封掉

CSP 只能拦执行，拦不住「把不可信字符串赋给 innerHTML」。Trusted Types 更进一步：

```
Content-Security-Policy: require-trusted-types-for 'script'
```

开启后，`innerHTML = someString` 会直接抛异常。必须通过一个受控的转换函数：

```js
const policy = trustedTypes.createPolicy('app-html', {
  createHTML: (input) => DOMPurify.sanitize(input),
});

el.innerHTML = policy.createHTML(userContent);
```

好处是把「所有 HTML 注入点」变成可枚举、可审计的——你打开代码，搜索 `createHTML` 就知道全部入口在哪。这在大型项目里价值极高：**安全问题从「有没有漏掉」变成「入口清单是否完整」**。

代价是存量代码改造量大，第三方库经常直接 `innerHTML`，全部要改或封 adapter。所以一般先在关键页面开，逐步铺开。

## 五、真正被低估的风险：供应链

前端安全的另一半在 `node_modules` 里。

- **依赖投毒**：包被接管、维护者账号被盗、同名抢注（typosquatting）
- **postinstall 脚本**：装包时执行任意代码，能读 `~/.ssh`、能改 `.env`
- **CDN 劫持**：`<script src="https://cdn.xxx/lib.js">` 没有 `integrity`，上游被改你就中招
- **lockfile 缺失**：`package.json` 用 `^` 范围，CI 每次装的版本可能不同

可落地的几条（按性价比）：

1. **提交 lockfile，CI 用 `npm ci` / `pnpm install --frozen-lockfile`**，禁用漂移。
2. **外部脚本加 SRI**：`<script src="..." integrity="sha384-..." crossorigin="anonymous">`。
3. **审 postinstall**：用 `--ignore-scripts` 装依赖，或至少把新增的 postinstall 脚本纳入 review。
4. **定期跑审计**：`npm audit` 有噪音但能捞出真的高危；配合 `osv-scanner` 更准。

## 六、还有几个一直被忽略的点

- **`target="_blank"` 要带 `rel="noopener"`**（现代浏览器已默认 `noopener`，但老代码里仍值得统一）。
- **URL 参数直接进 `href`** 是最常见的开放重定向来源：`?next=//evil.com`。校验时要看协议与 host，不能只 `startsWith('/')`。
- **`postMessage` 必须校验 `origin`**，而且不能只校验 `event.origin.includes('example.com')`——`example.com.evil.com` 会通过。
- **JSON 响应别用 `eval` 解析**（历史遗留），也别把用户输入拼进 `JSON.parse` 之外的执行上下文。
- **富文本的图片上传**：允许 `data:` URI 的 img 可能是 SVG 藏脚本（`<svg><script>`），要校验 MIME 并重编码。

## 七、一句话

前端安全不是「记得转义」这种纪律问题，而是**信任边界设计问题**：哪一份数据、在哪一层、由谁决定它能变成 DOM。

转义回答不了这个问题，因为它假设「我知道哪里危险」。而真实项目里，危险来自你没想到的那个入口——AI 生成的富文本、客服系统的消息、第三方嵌入的卡片。

**能被枚举的入口，才是可控的入口。** 这也是 Trusted Types 与严格 CSP 真正的价值：不是让攻击不可能，是让「所有可能被攻击的地方」变成一张你能看完的清单。

---

- MDN：[Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- MDN：[Trusted Types](https://developer.mozilla.org/en-US/docs/Web/API/Trusted_Types_API)
- DOMPurify：[github.com/cure53/DOMPurify](https://github.com/cure53/DOMPurify)
