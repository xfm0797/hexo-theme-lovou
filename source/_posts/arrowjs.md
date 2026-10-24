---
title: 开源项目 ArrowJS：三个函数撑起的 UI 框架，运行时不到 5KB，自称"代理时代"第一个框架
date: 2026-10-24 13:10:00
updated: 2026-10-24 13:10:00
categories: 前端
tags:
- 前端
- 开源项目
- UI 框架
- 响应式
- AI Agent
---

# ArrowJS

> 三个函数、5KB 运行时、无编译器，文档塞进 20 万 Token 上下文窗口还占不到 5%

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [standardagents/arrow-js](https://github.com/standardagents/arrow-js)（官网 [arrow-js.com](https://arrow-js.com)） |
> | 语言 | JavaScript（零依赖） |
> | Stars | 约 3,500（v1.0 于 2026 年 6 月发布） |
> | 协议 | MIT |
> | 作者 | Justin Schroeder（FormKit、AutoAnimate 创始人） |
> | 安装 | `npm install @arrow-js/core` |

## 它想解决什么问题

现代前端框架的 JSX + 编译器 + hooks 体系，对人类工程师是生产力，对 AI Agent 却是"幻觉温床"：逻辑和 UI 混杂导致模型误读、hooks 管理出错、生成一堆胶水代码。ArrowJS 的定位一句话：**只用开发者和 LLM 都早已理解的 Web 平台原语——JavaScript 模块、带标签的模板字面量、DOM——构建响应式 UI**。没有 JSX、没有编译器、没有构建步骤，核心运行时上线体积不到 5KB，性能基准宣称与 Vue 3 相当。

它的"代理时代"卖点点得很实：**全部文档不到 20 万 Token 上下文窗口的 5%**——Agent 一个请求就能读完全部规范，不需要 RAG 检索、不需要训练。

## 核心机制拆解

**1. 整个框架只有三个函数。** `reactive` 建响应式状态，`html` 是模板字面量标签，`component` 组合逻辑与视图：

```js
import { reactive, html } from '@arrow-js/core'

const state = reactive({ count: 0 })

html`<button @click="${() => state.count++}">
  Count: ${() => state.count}
</button>`(document.body)
```

**2. v1.0 头号新功能：WASM 沙箱。** `@arrow-js/sandbox` 把组件逻辑跑在 QuickJS WebAssembly realm 里，同时仍渲染真实的内联 DOM——应用可以安全执行**不可信的、由 Agent 生成的代码**，不用 iframe 也不用 eval。这是 AI 生成界面的安全执行难题给出的第一个框架级答案。

**3. 分层包覆盖全场景。** `@arrow-js/framework`（异步组件）、`@arrow-js/ssr`（服务端渲染）、`@arrow-js/hydrate`（客户端水合）按需引入；还有 `npx @arrow-js/skill` 一条命令把"如何在已有项目中使用 Arrow"教会你的编码 Agent。

**4. 社区的真实反馈。** HN 上有人吐槽它"本质是劝你只用原生 JS 还伪装成框架"；有开发者发布了完整应用后报告：监听器内改状态有 bug、映射数据不带唯一 key 会重渲染故障、响应式对象嵌套有陷阱，并呼吁生命周期钩子与 DOM refs——作者已认同 DOM refs 和基本 mounted 钩子值得加。

## 安装与上手

```bash
npm install @arrow-js/core
```

注意：生态和惯用约定无法与 React/Vue 比，长生命周期应用要评估；watcher、嵌套响应式等边角问题在新版本持续修复中。

## 点评

**亮点**是刀法极准的极简主义：三个函数就是全部 API，文档小到能整包塞进 LLM 上下文，这是任何大框架都做不到的"Agent 首要公民"设计；WASM 沙箱直击 AI 生成代码的安全执行痛点，思路领先整个行业半个身位。性能对标 Vue 3，5KB 的体积做原型、嵌入组件、低代码平台都极其顺手。

**局限**要认清：3.5k 星的社区规模意味着没有深厚的组件生态，坑要自己踩；响应式系统仍有已知边角 bug；"框架还是原生 JS 换皮"的争论也说明它的抽象层很薄。把它当轻量响应式内核 + Agent 友好实验场很香，当大型应用的主力框架需要勇气。

适合人群：做 AI Agent 动态界面、低代码平台、嵌入式小部件的前端工程师，以及欣赏"回到平台原语"哲学、想要一个 LLM 一次读得懂的框架的人。
