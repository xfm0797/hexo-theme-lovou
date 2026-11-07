---
title: Biome：一个工具替代 ESLint 与 Prettier，快得让人愿意删配置
date: 2026-11-07 19:30:00
updated: 2026-11-07 19:58:00
categories: 开源
tags:
- 开源项目
- 前端
- 工具链
- Rust
---

# Biome

> Rust 写的一体化 JS/TS 工具链：格式化与 Lint 合一，一条命令修完，配置只剩一个文件

---

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [biomejs/biome](https://github.com/biomejs/biome) |
> | 语言 | Rust |
> | 协议 | MIT |
> | 形态 | 单体 CLI（formatter + linter） |
> | 前身 | Rome 工具链 |

## 它想解决什么问题

JS 项目的 lint 与格式化长期是两套东西：ESLint 一堆插件加配置，Prettier 再一套，两者规则还会互相打架，得装 `eslint-config-prettier` 来调停。CI 上跑一遍要几十秒。

Biome 把两者合成一个 Rust 二进制：一次解析、同时检查格式与规则，速度快到能在保存时跑完整个仓库。

## 核心机制拆解

**1. 单次解析双用。** 同一份 AST 同时供格式化与 Lint 使用，避免了两个工具各自的解析开销。

**2. 默认即合理。** 开箱配置就能用，规则集覆盖常见错误与风格问题，不必从零拼 plugin。

**3. 自动修复。** `biome check --write` 一次修掉格式与可自动修的规则问题，改完可直接 commit。

**4. 单一配置文件。** `biome.json` 管完所有行为，编辑器插件与 CI 共用同一份。

## 安装与上手

```bash
npm i -D --save-exact @biomejs/biome
npx biome init
npx biome check --write .
```

迁移时它可以读取现有 ESLint 配置做部分转换，但别指望全自动——留几条自定义规则手工补。

## 点评

**亮点**是"少一套工具"带来的连锁收益：依赖少了、配置少了、CI 时间短了，新人上手也不用理解 ESLint 的插件解析机制。Rust 带来的速度优势让"保存即全量检查"成为可能。

**局限**：规则数量与生态远不及 ESLint，依赖特定插件（如框架专用规则、类型感知规则）的项目迁不过来；部分格式化行为与 Prettier 有细微差异，会让全仓一次性产生大量 diff；插件系统仍不成熟，自定义规则要用其自身 API 写；对老项目，迁移成本可能高于收益。

**适合人群**：新起的 JS/TS 项目；受够了 ESLint + Prettier 双配置的团队；以及在意 CI 时长的工程组。

---

- 项目仓库：[https://github.com/biomejs/biome](https://github.com/biomejs/biome)
- 官方文档：[https://biomejs.dev](https://biomejs.dev)
