---
title: Continue：编辑器里的开源 AI 编程助手，模型与上下文都由你定
date: 2026-11-07 19:30:00
updated: 2026-11-07 19:58:00
categories: 开源
tags:
- 开源项目
- AI 编程
- 开发工具
- VS Code
---

# Continue

> 开源、可本地运行的 IDE 编程助手：自带模型、自带上下文，插件不锁你

---

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [continuedev/continue](https://github.com/continuedev/continue) |
> | 语言 | TypeScript |
> | 协议 | Apache-2.0 |
> | 星标 | 约 2 万（2026 年榜单口径） |
> | 宿主 | VS Code / JetBrains |

## 它想解决什么问题

商业 AI 编程助手的体验确实好，但两个问题绕不开：代码要经过厂商服务器，模型与规则由厂商定。对受合规约束的团队，"把仓库上传到别人的模型"这一步就过不去。

Continue 的定位是**可自托管的 Copilot**：同一个插件里，你可以接 OpenAI、Anthropic，也可以接本地 Ollama；对话、补全、编辑、上下文提供者全部可配置。

## 核心机制拆解

**1. 模型自由。** 配置文件里声明模型与用途（chat / autocomplete / embed），云端与本地混用是常态——补全用小模型、复杂重构用大模型，成本可控。

**2. 上下文可编程。** `@file`、`@codebase`、`@docs` 等上下文提供者可按需启用，也能自己写；索引可完全建在本地。

**3. 动作闭环。** 不只是补全：选中代码让模型改写、在 diff 里逐条接受、出错了直接对话排查，都在编辑器内完成。**4. 团队规则。** 支持把项目规范写成配置随仓库分发，让 AI 输出符合团队习惯。

## 安装与上手

在 VS Code 或 JetBrains 插件市场搜 Continue 安装，然后编辑 `config.yaml` 指定模型：

```yaml
models:
  - name: local-qwen
    provider: ollama
    model: qwen2.5-coder
```

保存即生效，不需要重启宿主。

## 点评

**亮点**是把选择权真的交出来了：模型、索引位置、上下文来源、团队规则，全部是配置文件里的几行，而不是付费墙后的开关。对要过合规评审的团队，这一点的价值超过任何单点功能。

**局限**：配置门槛不低，第一次接通模型与索引要踩坑；开箱体验不如商业产品顺滑，补全延迟很吃本地硬件；插件与各 IDE 的兼容性在不同版本上偶有回归；功能迭代快也意味着文档常滞后。

**适合人群**：有数据合规要求、需要代码不出内网的团队；同时使用本地与云端模型的开发者；以及愿意花半小时调配置、换取长期可控的工程师。

---

- 项目仓库：[https://github.com/continuedev/continue](https://github.com/continuedev/continue)
- 官方文档：[https://docs.continue.dev](https://docs.continue.dev)
