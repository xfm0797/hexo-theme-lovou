---
title: 开源项目 Superpowers：30 万 Star 的 Agent 开发方法论，让编码 Agent 先想清楚再动手
date: 2026-10-25 20:31:00
updated: 2026-10-25 20:31:00
categories: 开源
tags:
- 开源项目
- Superpowers
- ClaudeCode
- AgentSkills
- 开发方法论
---

# Superpowers

> 先追问真实目标、写出可读的规格说明、排好实现计划，再进入测试驱动的子代理开发流程

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [obra/superpowers](https://github.com/obra/superpowers) |
> | 语言 | Shell |
> | Stars | 304,829（2026-10-25），Forks 27,155 |
> | 协议 | MIT |
> | 状态 | 2025-10-09 建库 |
> | 出品 | obra（Jesse Vincent），商业支持由 Primeradiant 提供 |

## 它想解决什么问题

你的编码 Agent 拿到需求后第一件事是什么？大多数是直接开始写代码。

Superpowers 要改变的就是这个默认行为。它是一套完整的软件开发方法论，把资深 tech lead 的工作习惯——先问清楚、写规格、排计划、红绿测试、逐项审查——拆成 Agent 可执行的技能。

## 核心机制拆解

**1. 一条自动触发的流水线。**

- **先别写码**：Agent 察觉到你在构建东西时，不会直接上手，而是退一步问你到底想做什么；
- **规格分段确认**：把追问出来的 spec 分成"人真的能读完"的小段给你过目；
- **计划写到"热情但没品位的初级工程师"也能执行**：强调真正的红绿 TDD、YAGNI 与 DRY；
- **子代理驱动开发**：你说"go"之后，Agent 派出子代理逐项完成工程任务，自己负责审查，经常能连续自主工作几个小时而不偏离计划。

全部自动触发，你不需要记任何命令——你的编码 Agent"有了 Superpowers"。

**2. 十四种 harness，一张生态地图。** 安装列表本身就是 2026 年编码 Agent 的现状图：Claude Code（官方插件市场）、Antigravity、Codex App / CLI、Cursor、Devin CLI、Factory Droid、Gemini CLI、GitHub Copilot CLI、Grok Build CLI、Kimi Code、OpenCode、Pi、Qwen Code、Hermes Agent、Muse——每个 harness 单独安装，互不干扰。

**3. 为什么是"方法论"而不是"工具集"。** 大多数技能包解决的是"能不能"，Superpowers 解决的是"该不该、先后顺序、怎么验收"。这也是它能同时被官方市场和社区接受的原因：它约束的是过程，不替换模型。

## 安装与上手

```bash
# Claude Code（官方插件市场）
/plugin install superpowers@claude-plugins-official
```

其余 harness 各有对应的安装命令，见仓库 README 的安装矩阵。

- 项目仓库：<https://github.com/obra/superpowers>

## 点评

**亮点**是把"纪律"产品化了。Agent 缺的往往不是能力，而是收手的时机与验收的标准；把 spec-first、TDD、子代理审查做成默认行为，产出就从"能跑"变成"可维护"。

**局限**：流程前置会拖慢小改动——改个错别字也要走 spec 会让人抓狂，实际使用需要学会何时不触发；子代理连续工作数小时的前提是计划写得好，计划质量仍取决于模型与人的判断；14 种 harness 全覆盖意味着每个平台的体验深度不一。

适合人群：重度使用编码 Agent、希望产出可维护的开发者；需要统一团队 Agent 工作方式的工程负责人；在多个 harness 之间切换、希望方法论可迁移的用户。
