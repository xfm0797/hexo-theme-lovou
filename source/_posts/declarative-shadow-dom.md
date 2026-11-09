---
title: Web Components 终于能服务端渲染了：Declarative Shadow DOM 改变了什么
date: 2026-11-09 22:03:00
updated: 2026-11-09 22:03:00
categories: 前端
tags:
- 前端
- Web Components
- Shadow DOM
- SSR
- 组件模型
---

# Web Components 终于能服务端渲染了：Declarative Shadow DOM 改变了什么

> Web Components 被唱衰了快十年，核心理由只有一条：它没法 SSR，所以首屏空白、SEO 归零。
> Declarative Shadow DOM 把这条理由消掉了。但真正的问题不是技术能力，是它值不值得。

## 一、过去为什么不行

自定义元素是 `class extends HTMLElement`，而 `customElements.define()` 只能在浏览器里跑。服务端生成 HTML 时，这个类不存在，所以只能输出一个空标签：

```html
<user-card></user-card>
```

页面到达浏览器 → 下载 JS → 注册元素 → 生命周期的 `connectedCallback` 触发 → 才开始构建内部 DOM。这段时间里页面上什么都没有。这就是 Web Components 长期无法用于内容站的根本原因。

更糟的是样式：Shadow DOM 的样式只能通过构造样式表注入，这也要求 JS 先执行。

## 二、Declarative Shadow DOM 做的事

它把「影子根的初始化」变成一个 HTML 解析期的动作，用模板声明：

```html
<user-card>
  <template shadowrootmode="open">
    <style>
      :host { display: flex; gap: 0.75rem; align-items: center; }
      .name { font-weight: 600; }
    </style>
    <img class="avatar" src="/avatar/42.png" alt="">
    <span class="name">张三</span>
  </template>
</user-card>
```

浏览器解析到这段 HTML 时，**直接**创建影子树并把内容挂进去，不需要任何 JS。等自定义元素的类下载完成并注册时，DOM 已经在那儿了——`connectedCallback` 里要做的是「接管」而不是「构建」。

这一条改变了两件事：

1. **首屏**：内容随 HTML 一起到达，不再等 JS。
2. **SEO / 无 JS 环境**：爬虫和禁用脚本的用户看到的是完整内容。

## 三、SSR 侧怎么产出这段 HTML

思路很朴素：组件内部渲染本质是「模板 + 数据」，服务端用任何模板引擎都能生成同样的结构。以 Node 端为例，一行 `renderToString` 式的封装就够了：

```js
function renderUserCard({ name, avatar }) {
  return `<user-card>
  <template shadowrootmode="open">
    <style>:host{display:flex;gap:.75rem;align-items:center}</style>
    <img class="avatar" src="${avatar}" alt="">
    <span class="name">${escapeHtml(name)}</span>
  </template>
</user-card>`;
}
```

客户端只需要定义元素行为（事件、属性观察），不必再关心首次渲染：

```js
class UserCard extends HTMLElement {
  connectedCallback() {
    // 影子树已存在，直接绑事件
    this.shadowRoot.querySelector('.avatar')
      ?.addEventListener('error', () => this.classList.add('is-broken'));
  }
}
customElements.define('user-card', UserCard);
```

**注意一个坑**：水合时不能再用 `attachShadow()`——影子根已经存在，重复调用会抛错。正确写法是先判断 `this.shadowRoot`，或者干脆在类里不做 DOM 构建，只做行为绑定。

## 四、真正被解决的，是「组件格式的独立性」

上面这些是能力层面。我觉得影响更大的是另一件事：**一个组件终于可以不绑定框架，同时拥有 SSR 和样式隔离**。

以前的处境是二选一：

- 用 React/Vue/Svelte，有 SSR、有生态，但组件只能在自家框架里用；
- 用 Web Components，跨框架可用，但没 SSR、样式隔离靠 JS 注入，体验断档。

现在这两条路能合流了：组件用自定义元素写，样式封在声明式影子根里，服务端渲染成静态 HTML，客户端只补行为。用 React 的项目、用 Vue 的项目、甚至一个纯静态页面，都能直接引用同一个 `<user-card>`。

对设计系统来说，这是很实际的价值：**一套组件，多个技术栈的产品线共用，不需要为每个框架维护一份移植版。**

## 五、代价在哪

不能只说好处。

**1. 样式定制变麻烦。** Shadow DOM 的样式是封闭的，外部想改里面的东西必须走 CSS 自定义属性或 `::part()`。这意味着设计系统必须预先想清楚「哪些可定制」——这其实是好事，但迁移现有组件时会很痛。

**2. 服务端与客户端必须严格一致。** 声明式影子根的内容一旦和客户端认为的结构不一致，事件绑不上、状态对不上。以前 SSR 水合不匹配只是警告，这里会直接表现为「点了没反应」。

**3. 工具链支持参差。** 各框架的 SSR 管道对 `shadowrootmode` 的处理需要显式开启（有的叫 `serializeShadowRoot`，有的要插件）。构建期不生成这段模板，等于白做。

**4. 调试体验。** 影子树在 DevTools 里是展开可见的，但样式溯源、事件穿透的排查比普通 DOM 麻烦一档。团队里需要有人真的懂 `:host`、`::slotted`、`::part` 这三套作用域规则。

## 六、什么时候值得上

我的判断标准是三条，都满足才考虑：

- **组件要被多个技术栈复用**（否则用宿主框架的组件就够）
- **内容是首屏可见的**（弹窗、编辑器这类交互组件，SSR 价值低）
- **样式需要强隔离**（嵌入第三方页面、做 SDK 式组件、跨团队交付）

反过来，如果只是单框架项目内部的普通组件，用 Web Components 只会让你放弃宿主框架的响应式、状态管理和开发工具，换来的可移植性根本用不上。

## 七、一句话

Declarative Shadow DOM 补齐的是 Web Components 最后一块硬伤——**它让「跨框架组件」第一次成为一个不需要妥协的选项**。

但技术可行不等于应该用。它的真正对手从来不是 React，是「你到底有没有多栈复用的需求」。没有这个需求，它就是负担。

---

- MDN：[Declarative Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM)
- 规范说明：[Declarative Shadow DOM (WHATWG)](https://github.com/whatwg/html/pull/5465)
