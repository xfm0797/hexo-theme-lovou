---
title: oxc：用 Rust 重写 JavaScript 工具链的底座
date: 2026-11-07 19:30:00
updated: 2026-11-07 19:58:00
categories: 开源
tags:
- 开源项目
- 前端
- 工具链
- Rust
---

# oxc

> 解析器、Linter、压缩器、转换器全部 Rust 重写：不是再造一个工具，而是给整个生态换引擎

---

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [oxc-project/oxc](https://github.com/oxc-project/oxc) |
> | 语言 | Rust |
> | 协议 | MIT |
> | 组成 | parser / linter / minifier / transformer / resolver |
> | 定位 | JS 工具链的基础设施层 |

## 它想解决什么问题

JS 生态的工具几乎都建立在同一套 JS 写的解析器上：ESLint、Prettier、Babel、各种打包器，每个都要自己解析一遍代码。项目一大，CI 里就在重复做同一件慢事。

oxc 的目标不是做一个更好的 Lint，而是**把解析与遍历这层地基换成 Rust**，让上层工具都能站在更快的底座上。

## 核心机制拆解

**1. 高性能解析器。** 兼容最新语法，解析速度是 JS 实现的数量级之上，且提供 AST 与遍历设施。

**2. Linter。** 已实现大量 ESLint 规则，可作为 `oxlint` 独立使用，单文件毫秒级。

**3. Minifier 与 Transformer。** 压缩与语法降级同样在 Rust 侧完成，为打包链路提供替代件。

**4. 模块解析器。** 解析 node_modules 与路径别名，是构建工具最耗时的一环之一。

## 安装与上手

```bash
npx oxlint@latest .
```

也可以只把它当解析库，在自己的 Rust/Node 工具里引入 AST 能力。

## 点评

**亮点**是站位：它不抢 ESLint 的用户，而是想当 ESLint 之后的引擎。这种"给生态换底层"的定位，一旦被主流工具采纳，收益是全局的——所有项目的 CI 都会变快。

**局限**：规则覆盖尚未追平 ESLint 全生态，插件式扩展仍在演进，直接替换需要逐条核对；作为底层项目，文档更偏开发者视角，普通用户直接用到的功能有限；生态采纳需要时间，短期内它更像"并行选项"而非"替代品"；参与门槛高，贡献者需要懂 Rust 与编译原理。

**适合人群**：关注构建性能的工具作者；想先把 lint 提速的团队；以及研究 JS 工具链实现（AST、遍历、压缩）的工程师。

---

- 项目仓库：[https://github.com/oxc-project/oxc](https://github.com/oxc-project/oxc)
- 官网：[https://oxc.rs](https://oxc.rs)
