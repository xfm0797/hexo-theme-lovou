---
title: Bun：一个二进制当运行时、打包器、测试框架与包管理器
date: 2026-11-07 19:30:00
updated: 2026-11-07 19:58:00
categories: 开源
tags:
- 开源项目
- JavaScript
- 运行时
- 工具链
---

# Bun

> Zig 写的全栈 JS 工具链：启动快、内置测试与打包、npm 兼容，把 Node 那一堆插件收进一个命令

---

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [oven-sh/bun](https://github.com/oven-sh/bun) |
> | 语言 | Zig / C++ |
> | 协议 | MIT |
> | 形态 | 运行时 + 包管理 + 打包 + 测试 |
> | 兼容 | Node API 与 npm 生态 |

## 它想解决什么问题

一个现代 JS 项目的标准配置是：node + npm/pnpm + tsx/ts-node + esbuild/webpack + jest/vitest，五套工具、五份配置、五次启动。工具链本身成了负担。

Bun 的思路是收编：**一个二进制把这些活都干了**，并且尽量兼容 Node 的 API 与 npm 的包。

## 核心机制拆解

**1. JavaScriptCore 引擎。** 换掉 V8，启动与冷路径明显更快；对 CLI 与短生命周期脚本，这个差别体感最强。

**2. 内置全家桶。** `bun run`、`bun install`、`bun test`、`bun build` 各司其职，配置项大幅减少。

**3. npm 兼容。** 直接读 `package.json` 与 node_modules 结构，绝大多数包不需要改造。

**4. 原生 TS/JSX。** 不需要额外转译器，`.ts` 直接跑。

## 安装与上手

```bash
curl -fsSL https://bun.sh/install | bash
bun init
bun run index.ts
bun test
```

把现有项目迁过来通常只需删掉几个 devDependency，先跑测试看兼容性。

## 点评

**亮点**是"减少工具数量"这个价值主张极其清晰：装一个东西，省掉四五个依赖与配置文件。对脚本、CLI、小服务，它的启动速度是实打实的体验差异。

**局限**：Node 兼容是"大部分"而非"全部"，依赖原生模块或深挖内部 API 的库会踩坑；生产环境的大型框架支持仍在补齐，遇到问题时社区答案比 Node 少一个量级；Zig 实现的二进制在部分平台上仍偶有稳定性问题；单公司主导，长期治理模型需观察。

**适合人群**：写脚本与 CLI 工具的开发者；想给团队简化工具链的项目；以及愿意为启动速度承担一点兼容风险的人。

---

- 项目仓库：[https://github.com/oven-sh/bun](https://github.com/oven-sh/bun)
- 官网：[https://bun.sh](https://bun.sh)
