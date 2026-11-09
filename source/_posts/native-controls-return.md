---
title: 原生控件回来了：Popover、dialog 与可定制 select 正在吃掉半个组件库
date: 2026-11-09 22:27:00
updated: 2026-11-09 22:27:00
categories: 前端
tags:
- 前端
- HTML
- 原生控件
- 无障碍
- 组件库
---

# 原生控件回来了：Popover、dialog 与可定制 select 正在吃掉半个组件库

> 过去十年，前端组件库最稳定的一块收入是「把浏览器的丑控件包一层」。
> 现在浏览器自己把这个活干了——而且干得比大多数库更好，因为它免费用了无障碍和顶层渲染。

## 一、组件库里最没技术含量的那部分

打开任何一个组件库的目录：Tooltip、Dropdown、Popover、Modal、Drawer、Select、Combobox、Toast。

这些东西的实现难点从来不是视觉，是三件很烦的事：

1. **顶层渲染**：浮层不能被祖先的 `overflow: hidden` 或 `transform` 裁剪，所以要做 portal，还要处理滚动跟随。
2. **焦点管理**：打开时焦点进哪里、Tab 怎么循环、关闭后焦点还回哪。
3. **无障碍语义**：`role`、`aria-expanded`、`aria-controls`、`aria-modal`、Esc 关闭、点击外部关闭。

每一件都要写几十行，每一条规则都能在某次浏览器更新后失效。而这些正是组件库存在的理由。

## 二、浏览器把这三点都标准化了

**Popover API**：任意元素加 `popover` 属性，配 `popovertarget` 的按钮就能开关。

```html
<button popovertarget="menu">菜单</button>

<div id="menu" popover>
  <a href="/a">选项 A</a>
  <a href="/b">选项 B</a>
</div>
```

它自带的东西：渲染在**顶层（top layer）**，不受任何祖先裁剪影响；自动处理 Esc 关闭、点击外部关闭；打开时把其余内容标记为 inert（不可聚焦）。

**`<dialog>`**：`showModal()` 打开的是模态对话框，自带遮罩（`::backdrop`）、焦点陷阱（焦点被限制在对话框内）、Esc 关闭、`aria-modal` 语义。

```js
dialog.showModal();   // 模态
dialog.show();        // 非模态
dialog.close('reason');
```

**可定制 select**：这是最新的一块。以前的下拉只能靠 `div` 模拟——因为原生 `<select>` 的选项列表是操作系统绘制的，CSS 碰不到。现在可以：

```html
<select>
  <button><selectedcontent></selectedcontent></button>
  <option value="a">选项 A</option>
  <option value="b">选项 B</option>
</select>
```

`<button>` 与 `<selectedcontent>` 可被样式化，下拉列表本身仍是原生渲染，保留了移动端的原身体验与无障碍支持。

## 三、为什么这比「组件库实现得好」更重要

并不是说组件库写得差。差别在**语义归属**。

用 `div` 拼的模态框，屏幕阅读器只看到一堆 `div`。你必须手动补 `role="dialog"`、`aria-modal="true"`、`aria-labelledby`，还要处理焦点陷阱——而这套逻辑在 iOS VoiceOver 与 Android TalkBack 上的行为不一致，很多库在这里栽过。

用 `<dialog>`，这些由浏览器实现，跟着系统无障碍设置走，跟着浏览器更新修 bug。

> 组件库能保证「看起来对」，浏览器能保证「真的对」。这两者在无障碍上经常不是一回事。

## 四、Popover 的坑

不能只说好处。

**1. `popover` 天生是「轻量浮层」，不是「模态」。** 打开时它**不会**阻止页面滚动，也不会阻止用户操作其他部分（只是把其他内容设为 inert 用于焦点）。做抽屉或侧边栏时，仍要自己处理滚动锁定。

**2. 定位仍要自己做。** Popover 只管层级与开关，不管「该出现在按钮下方还是上方」。这块正好接 CSS anchor positioning——两者是配套的。

**3. 嵌套与手动关闭要理清。** `popover="auto"` 打开新的会自动关掉同级的；`popover="manual"` 不会，全要自己管。选错会得到「点开第二个，第一个还留着」或者反过来。

**4. 动画与关闭时机。** 想在关闭时播动画，不能用 `display: none`——要用 `@starting-style` 与 `transition-behavior: allow-discrete`，或者监听 `beforetoggle` 延迟关闭。这段写法目前还比较新，需要 `@supports` 兜底。

## 五、`<dialog>` 的坑

**1. 默认样式很霸道。** 浏览器给了 `margin: auto`、边框、`max-width: calc(100% - 6px - 2em)` 之类。要重置得写一组：

```css
dialog {
  margin: auto;
  padding: 0;
  border: 0;
  max-width: min(90vw, 640px);
  background: var(--surface);
}
dialog::backdrop { background: rgb(0 0 0 / 0.4); }
```

**2. 关闭事件有两个。** `close` 在 `close()` 之后触发，`cancel` 在 Esc 时触发（可以 `preventDefault()` 拦截）。区分清楚，否则会做出「按 Esc 也提交了表单」这种 bug。

**3. 表单集成要注意。** `<form method="dialog">` 里的提交按钮会关闭对话框并把值写进 `dialog.returnValue`。用得好很省事，用不好会莫名其妙自动关闭。

**4. 动画退出同样需要 `allow-discrete`。** 这是目前最容易写错的一块。

## 六、组件库会不会消失

不会，但会被迫往上走一层。

过去组件库卖的是「跨浏览器补齐能力」，现在这层能力被平台收走了。剩下真正的价值在三处：

- **设计系统**：token、主题、密度、品牌一致性
- **复杂组合**：DataGrid、Tree、RichTextEditor、Combobox（可搜索、可多选、异步加载）——这类仍是硬骨头
- **一致性兜底**：保证 40 个页面里的弹窗行为一模一样，而不是每个开发者各写一版

直白点说：**简单的浮层组件应该从你的组件库里删掉，换成原生；省下的精力去做那些原生永远做不了的。**

## 七、迁移的实操顺序

1. 先统计：`grep` 一下你们项目里 Tooltip / Dropdown / Modal 的使用点，通常会发现 80% 的调用只要「一个能开关的浮层」。
2. 拿最简单的 Tooltip 试点：`popover="manual"` + anchor positioning，删掉 portal 与焦点管理代码。这一步风险最低，收益立刻可见——代码量能少一半以上。
3. 再换 Modal 为 `<dialog>`：注意样式重置与 `close`/`cancel` 两个事件。
4. select 最后动：可定制 select 的浏览器覆盖还在铺开，保留原实现作为降级分支更稳妥。

## 八、一句话

原生控件的回归，本质是**浏览器把「组件库的公共基础设施」收编了**。

这不是前端工程的退步，是分工变清晰了：平台负责语义与无障碍，你负责设计与业务。过去十年我们把两者混在一起，现在可以分开了。

---

- MDN：[Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
- MDN：[`<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog)
- MDN：[Customizable select](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Customizable_select)
