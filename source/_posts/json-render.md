---
title: 开源项目 json-render：Vercel 生成式 UI 框架，Zod 划边界让 AI 只能在你的组件目录里生成界面
date: 2026-10-24 13:20:00
updated: 2026-10-24 13:20:00
categories: 前端
tags:
- 前端
- 开源项目
- 生成式 UI
- AI Agent
- React
---

# json-render

> AI 负责填内容，你负责划定边界——一份 JSON spec 同时渲染网页与原生 App

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [vercel-labs/json-render](https://github.com/vercel-labs/json-render)（官网 [json-render.dev](https://json-render.dev)） |
> | 语言 | TypeScript |
> | Stars | 约 1.8 万（2026-01 开源，8 个月达成，累计 200+ 次发布） |
> | 协议 | Apache-2.0 |
> | 作者 | Vercel Labs |
> | 安装 | `npm install @json-render/core @json-render/react` |

## 它想解决什么问题

让 AI 直接吐 HTML 或 JSX 做界面，有两条死路：模型自由发挥，你既保证不了它生成什么，也保证不了渲染不崩。json-render 的定位一句话：**在"模型"和"界面"之间插一层受约束的中间表示**——开发者用 Zod 定义组件目录（catalog），AI 只能在目录里选择组件、生成符合 schema 的 JSON spec，框架负责校验并安全渲染。Vercel CEO Guillermo Rauch 称之为"把 AI 直接嵌入渲染层"的颠覆性工艺。

上线 4 天狂揽 7,500 Star，8 个月做到 1.8 万+——生成式 UI 这个方向，它已经是事实上的参考实现。

## 核心机制拆解

**1. 三个核心概念。** `defineCatalog` 定义"能用什么"：每个组件声明 props 的 Zod schema 与描述，动作（actions）也在这一层登记，AI 看不到目录之外的东西；`defineRegistry` 定义"长什么样"：把 catalog 组件接到真实实现，类型安全；`<Renderer>` 渲染 AI 产出的 spec——**支持流式**，模型还在吐 JSON，界面已经开始渐进渲染。

```ts
import { defineCatalog } from '@json-render/core'
import { z } from 'zod'

const catalog = defineCatalog(schema, {
  components: {
    Metric: { props: z.object({ label: z.string(), format: z.enum(['currency', 'percent']) }) },
  },
  actions: { export: { params: z.object({ format: z.string() }) } },
})
```

**2. 跨端是杀手锏。** 同一份 catalog 与 spec 格式，已有 React、Vue、Svelte、Solid、React Native 渲染器——网页与移动端共用一套生成协议。扩展包覆盖 PDF 生成、HTML 邮件、Remotion 视频、OG 图片、React Three Fiber 3D 场景。

**3. 预置 36 个 shadcn/ui 组件。** 想快速上手不用从零建目录，常用仪表盘组件开箱即用；还能把生成的 UI **导出为独立的 React 代码**，无运行时依赖——AI 生成的界面可以"毕业"成普通工程代码。

**4. 数据绑定内建。** `$state`、`$item`、`$index` 与双向绑定 `{ $bindState }` 让生成的组件直接连到应用状态，不是只能看的静态图。

## 安装与上手

```bash
npm install @json-render/core @json-render/react
```

官方 playground（json-render.dev）可输入自然语言实时看生成效果，并支持一键导出完整 Next.js 项目。

## 点评

**亮点**是把"AI 生成 UI"从碰运气变成工程化：Zod 目录即护栏，输出永远类型安全、永远可渲染；流式渐进渲染解决 JSON 必须等闭合的体验断层；跨端一份 spec 多端渲染的野心配得上它的增长曲线；Apache-2.0 + Vercel 持续维护，生产可用性有背书。

**局限**：社区也有质疑——OpenAPI 和 JSON Schema 等现有标准已能描述数据结构，为何再造一套系统；组件目录的维护成本转嫁给了开发者，目录设计得好坏直接决定生成质量；强绑定 Zod 生态。

适合人群：做 AI 对话产品、智能仪表盘、Agent 可视化报表的前端团队——凡是需要"让 AI 画界面又不敢让它乱画"的场景，这就是目前最完整的答案。
