---
title: 开源项目 Rslib 1.0：字节 Rspack 团队的库构建工具正式转正，模块联邦产物 + Rust 级构建速度
date: 2026-10-24 14:50:00
updated: 2026-10-24 14:50:00
categories: 前端
tags:
- 前端
- 开源项目
- 构建工具
- Rspack
- 组件库开发
---

# Rslib

> 基于 Rspack 的库构建工具 1.0 转正——发 npm 包的构建配置，从此不用再手搓

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [web-infra-dev/rslib](https://github.com/web-infra-dev/rslib) |
> | 语言 | Rust 内核（Rspack）+ TypeScript 配置 |
> | Stars | 数千星（Rspack 生态核心成员） |
> | 协议 | MIT |
> | 作者 | ByteDance Web Infra 团队 |
> | 版本 | 1.0（2026 年 9 月正式发布） |

## 它想解决什么问题

写应用有 Next.js/Nuxt，写库却长期没有"标准答案"：要自己拼 tsup/unbuild/rollup/vite lib mode，处理 ESM/CJS 双产物、类型声明、外部依赖、多入口——每个库作者都在重复同一套配置炼丹。Rslib 的定位一句话：**给"开发 JavaScript 库"这个场景一个 Rspack 级别的默认解**——复用 Rspack 生态的全部能力，把库构建的常见决策做成合理默认值。

## 核心机制拆解

**1. 复用 Rspack 生态是最大杠杆。** Rspack 是 Rust 实现的 Webpack 兼容构建器，性能数倍于 Webpack；Rslib 直接站在它肩上——loader、插件、缓存等生态资产全部继承，从 0.x 到 1.0 有显著性能提升。

**2. 多格式产物开箱即用。** ESM / CJS / UMF（UMD）等产物格式一条配置切换；**支持模块联邦产物**——微前端场景下的"库即模块"输出是独门能力，竞品基本没有覆盖。

**3. 类型生成快。** d.ts 生成走加速路径，配合多构建模式（development/production）与统一构建流程，大型 monorepo 里几十个包同时构建不再是 CI 瓶颈。

**4. 与全家桶协同。** Rsbuild（应用）、Rspress（文档）、Rstest（测试）、Rslib（库）——ByteDance Web Infra 正在拼一套完整的 Rust 前端工具链，Rslib 补上了"库"这块拼图。

## 安装与上手

```bash
npm install @rslib/core -D
```

```ts
// rslib.config.ts
import { defineConfig } from '@rslib/core'

export default defineConfig({
  lib: [
    { format: 'esm', dts: true },
    { format: 'cjs' },
  ],
})
```

两段 lib 配置，ESM+CJS+类型声明全搞定——对比手搓 rollup.config 的时代，这是代际差。

## 点评

**亮点**：把"库构建"从配置工程变成声明式默认值，是 tsup 之后这个赛道最值得关注的选手；Rspack 生态加持意味着遇到特殊需求能下探到底层；模块联邦产物支持对国内微前端场景（qiankun 之类）是精准供给；1.0 转正说明 API 稳定性有承诺。

**局限**：Swc/tsup 等轻量方案对小库依然够用且更简单；深度定制时仍要理解 Rspack 概念，不是零学习成本；工具链绑定 ByteDance 生态，跨全家桶混用需自行评估。

适合人群：维护组件库、工具库、SDK 的前端团队，特别是 monorepo 多包场景与微前端架构——如果你的 CI 正被几十个包的构建拖慢，Rslib 1.0 值得立刻试。
