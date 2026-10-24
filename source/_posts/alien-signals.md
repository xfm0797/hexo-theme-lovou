---
title: 开源项目 alien-signals：1KB 响应式原语被移植回 Vue 3.6 内核，Push-Pull 混合计算让框架快 4 倍
date: 2026-10-24 14:10:00
updated: 2026-10-24 14:10:00
categories: 前端
tags:
- 前端
- 开源项目
- Vue
- 响应式系统
- 性能优化
---

# alien-signals

> 压缩后仅 1KB 的 Push-Pull 响应式原语——一个实验库反向"入侵"了 Vue 主线内核

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [johnsoncodehk/alien-signals](https://github.com/johnsoncodehk/alien-signals) |
> | 语言 | TypeScript（零依赖） |
> | Stars | 数千星但影响力远超星数（Vue 3.6 内核直接采用其算法） |
> | 协议 | MIT |
> | 作者 | Johnson Chu（Vue Language Tools / Volar 作者） |
> | 安装 | `npm install alien-signals` |

## 它想解决什么问题

前端框架的响应式系统长期在两种策略间取舍：**Pull**（依赖变化只打标记，读取时才重算，省算力但读取有延迟）与 **Push**（依赖变化立即传播重算，及时但可能白算）。alien-signals 的定位一句话：**用 Push-Pull 混合计算两全其美——依赖变化时先做廉价的传播标记，只在真正被读取且确实脏了时才执行重算**。

它本来是 Johnson Chu 为 Vue Language Tools 做的响应式实验，结果基准测试快得惊人，最终被**直接移植回 Vue 3.6 核心代码库**——一个个人实验项目改写了主流框架的内核。

## 核心机制与 Vue 3.6 的成绩单

**1. Vue 3.6 的实测量级提升。** 基于 alien-signals 的响应式 + Vapor Mode（编译时去掉虚拟 DOM）：
- 相比 3.4 整体快约 **4 倍**，相比 3.5 快约 1.8 倍；
- computed 吞吐量高出 **30 倍以上**；
- 在 js framework benchmark 中性能**超越 Solid**——虚拟 DOM 诞生 13 年后，Vue 用编译时方案+新响应式登顶主流框架性能榜。

**2. 虚拟 DOM 时代的落幕信号。** 从 React 2013 年引入虚拟 DOM、Vue 2.0 在 2016 年采纳，vDOM 统治前端超过十年。Vue 3.6 的意义在于证明：编译器足够聪明时，可以直接生成精准的 DOM 更新代码，vDOM 这一运行时抽象不再是必需品。而**你写代码的方式完全不变**。

**3. 独立可用。** alien-signals 本身是独立信号库：与 Vue 无关的响应式原语，可嵌入任何项目、任何状态管理方案，也是理解 signals 这波浪潮（Solid、Preact Signals、TC39 提案）的最佳源码读物——1KB 的代码量，一个周末能读完。

## 安装与上手

```bash
npm install alien-signals
```

```ts
import { signal, computed, effect } from 'alien-signals'

const count = signal(1)
const double = computed(() => count.get() * 2)
effect(() => console.log(double.get())) // 2
count.set(2)                            // 输出 4
```

升级 Vue：直接上 3.6，API 无破坏性变更，享受免费提速。

## 点评

**亮点**：这是近年少见的"底层原语反向驱动主流框架演进"案例——算法优势（Push-Pull）+ 编译时策略（Vapor Mode）双击，让 Vue 在不改变开发者写法的前提下拿到了框架性能的代际跃迁。alien-signals 作为独立库，干净、极小、教学价值极高。

**局限**：独库使用生态为零，需要自己包状态管理；Push-Pull 的传播标记在超大依赖图下的内存开销要留意；Vapor Mode 的编译时优化对动态性极强的代码（运行时拼组件）收益会打折。

适合人群：Vue 开发者（无脑升级）、想深入理解 signals 模型的前端工程师、造状态管理轮子的库作者——1KB 的源码是响应式系统最好的教科书。
