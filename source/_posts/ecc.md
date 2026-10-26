---
title: 开源项目 ECC：28.9 万 Star 的 Agent 性能优化系统，一个人周更 7 个 harness
date: 2026-10-26 20:30:00
updated: 2026-10-26 20:30:00
categories: 开源
tags:
- 开源项目
- ECC
- ClaudeCode
- AI Agent
- 插件生态
---

# ECC

> plan → test → implement → review → verify → remember → improve：把工程闭环装进 Agent

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [affaan-m/ECC](https://github.com/affaan-m/ECC) |
> | 语言 | JavaScript（含 Shell / TypeScript / Python / Go 等） |
> | Stars | 289,253（2026-10-26），Forks 42,858，日增 853 |
> | 协议 | MIT（仓库本体永久免费） |
> | 状态 | 2026-01-18 建库 |
> | 定位 | Agent harness 的性能优化系统（Skills / Memory / Security） |

## 它想解决什么问题

你的 Agent 会写代码。但它会"先规划再动手"吗？会用测试验证改动吗？会用全新上下文审查自己的工作吗？会记住上次为什么这么改吗？

ECC 的定位一句话说清：**Agent harness 的性能优化系统**。它不改模型，改的是 Agent 的工程行为——把一整套协作流程装进去，而不是在每个 prompt 里重复交代。

## 核心机制拆解

**1. 一条显式的工程循环。**

```
plan -> test -> implement -> review -> verify -> remember -> improve
```

口号是 "Optimize the context window. Persist everything else."——优化上下文窗口，其他一切持久化。

**2. 内容体量惊人。** 71 个专职 Agent（规划、审查、构建修复、安全、架构、领域工作）、311 个技能（TDD、研究、安全、文档、前端、数据、ML、运维）、97 个命令入口，外加 hooks、规则、记忆、持续学习与 AgentShield 安全扫描。

**3. 跨 7 个 harness 的"最大公约数"。** 对 Claude Code 支持最好（原生插件），对 Codex 和 Qoder 有原生插件路径，对 Cursor、OpenCode、Gemini、Zed、GitHub Copilot、Antigravity、Qwen 等提供**能力受限**的适配器。README 明确提醒：装之前先看支持矩阵，不要假设功能对等。

**4. 商业模式很坦率。** 仓库本体 MIT 永久免费；ECC Pro 是面向私有仓库的托管 GitHub App（$19/席位/月），赞助者与 Pro 订阅养活项目——"That's why a single maintainer ships weekly across 7 harnesses"。README 顶部还有一条醒目警告：**只从官方渠道安装，第三方镜像可能带恶意代码**。

## 安装与上手

- 项目仓库：<https://github.com/affaan-m/ECC>
- 建议路径：先看支持矩阵 → 从 Claude Code 原生插件起步 → 再按需扩到其他 harness

## 点评

**亮点**是"最大公约数"的卡位。当各家插件格式互不兼容时，用 Markdown 作通用源、为每个 harness 做安装适配，等于承包了开发者的换工具成本。一个人维护、周更 7 个 harness、16 种语言 README，本身就是最好的广告。

**局限**：功能面太大，311 个技能带来的认知负担与"到底该装哪些"的选择困难是真实成本；适配器"能力受限"意味着跨 harness 体验不一致，别按最高标准预期；单维护者是最大的风险点——bus factor 为 1，重要团队应保留降级与自维护方案。

适合人群：重度编码 Agent 用户（想要完整工程闭环而非手写 prompt）；多 harness 混用者；希望统一团队 Agent 行为规范的工程组织。
