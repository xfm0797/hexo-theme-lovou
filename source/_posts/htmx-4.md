---
title: htmx 4.0 正式发布：从 XMLHTTPRequest 迁到 fetch，内置 morph 置换与多目标更新，HTML 属性党迎来大版本
date: 2026-10-24 14:00:00
updated: 2026-10-24 14:00:00
categories: 前端
tags:
- 前端
- htmx
- HTML
- 超媒体
- 版本发布
---

# htmx 4.0

> 仅凭 HTML 属性发起服务端请求并更新 DOM——4.0 用 fetch 重写内核，还带来了 morph 置换

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [bigskysoftware/htmx](https://github.com/bigskysoftware/htmx) |
> | 语言 | JavaScript（无依赖，约 14KB） |
> | Stars | 约 5 万（超媒体路线的旗舰项目） |
> | 协议 | BSD-2-Clause |
> | 版本 | 4.0（2026 年 8 月底发布，重大版本） |

## 它想解决什么问题

htmx 的哲学从未变过：**为什么发个请求、换块 DOM 要写 JavaScript？** 给任意元素加上 `hx-get`、`hx-post` 属性，htmx 就替你发请求并用响应替换、追加或删除页面片段——把"超媒体"作为应用架构的核心，而不是 SPA 的补丁。4.0 是一次蓄谋已久的大版本：底层网络栈从老旧的 XMLHTTPRequest 全面迁移到 **fetch**，并为未来特性（如流式、缓存控制）铺平了道路。

## 4.0 核心变化拆解

**1. 属性默认不再继承。** 旧版的属性继承机制常让嵌套元素"意外继承"了父级行为，是新手最常踩的坑。4.0 改为**默认不继承、需手动开启**——行为更显式，页面更可预测。

**2. 内置 morph 置换算法。** 过去替换内容是"整块换掉"，现在内置 morph 算法做 DOM 差异置换：只更新真正变化的节点，保留未变节点的状态（焦点、选中、播放进度不再莫名丢失）。这对表单和富交互局部刷新是质变。

**3. 多目标更新。** 新增标签支持**一次请求更新多个目标**——点一个按钮，同时刷新列表区和统计栏，不再需要各种 out-of-band 变通写法。超媒体架构里"一个交互改多处 UI"的顽疾有了官方解。

**4. fetch 带来的隐性收益。** 流式响应、更现代的缓存语义、对 AbortController 的友好度都随之解锁；同时 4.0 对 SSE/WebSockets 扩展的协同也做了相应调整。

## 安装与上手

```html
<script src="https://unpkg.com/htmx.org@4"></script>
<button hx-post="/api/like" hx-target="#count" hx-swap="innerHTML">
  点赞
</button>
```

从 3.x 升级注意查阅迁移指南：属性继承行为变化和 swap 语义变化是两个必须过一遍的破坏性变更点。

## 点评

**亮点**：htmx 用 5 万星证明了"Hypermedia as the engine of application state"不只是学术名词——大量 CRUD 应用根本不需要 React。4.0 的 morph 与多目标更新直击旧版两大体验短板，fetch 化让这个 2014 年血统的项目焕然一新。零构建、零依赖、14KB，"HTML 即框架"的简洁依旧无人能敌。

**局限**：属性继承默认行为变化会让存量应用升级有阵痛；超媒体路线天然不适合强客户端状态的复杂应用（编辑器、实时协作）；morph 置换对深层嵌套结构的性能仍需大规模验证。

适合人群：服务端渲染派（Django/Rails/Laravel/Go 模板）团队、内部工具、内容型站点——如果你一直觉得"这个页面用不上 React"，4.0 的 htmx 就是最佳时机。
