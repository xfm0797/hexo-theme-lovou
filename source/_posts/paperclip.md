---
title: 开源项目 Paperclip：105.9K Star 的"Agent 版 Jira"，管理 AI 员工的开源应用
date: 2026-10-22 20:41:00
updated: 2026-10-22 20:41:00
categories: 开源
tags:
- 开源项目
- Paperclip
- AI Agent
- 项目管理
- 团队协作
---

# Paperclip

> 当公司里的"员工"从 10 个人变成 10 个人 + 50 个 Agent，管理工具就该升级了

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [paperclipai/paperclip](https://github.com/paperclipai/paperclip) |
> | 定位 | 管理工作中 AI Agent 的开源应用（分配、协调、监督） |
> | 主要语言 | TypeScript（pnpm monorepo，React 前端 + PostgreSQL） |
> | Stars / Forks | 105,944 / 17,620（截至 2026-10-22） |
> | 许可证 | MIT |
> | 技术底座 | Drizzle ORM、Vitest、Playwright、OpenAPI |

## 它想解决什么问题

Paperclip 的定位一句话说清："The open-source app everyone uses to manage agents at work."——一个用来管理 AI 员工的开源应用，可以理解为 Agent 版的 Jira / 工单系统。发布后迅速冲破 105,944 Stars，是本月企业软件赛道最受关注的新面孔。

## Cases：为 Agent 交接而生的工单系统

Paperclip 的核心抽象叫 Cases（案例/工单），但设计完全不同于人类工单系统：

**跨 Agent 交接（handoffs）。** 一个任务从 Agent A 转到 Agent B，持久事实、文档、工作空间随案转移——不会出现"新 Agent 接手后失忆"的经典难题。10 月 20 日的更新为 Cases 引入了持久化工作流，支持同任务在不同 Agent 间的安全交接，带交付回执与恢复机制。

**可复用 Prompt 工作流。** 10 月 21 日新增：公司级的流程定义可以复用，handoff 时选择采用、刷新、保留或分离工作流。这相当于把"标准作业程序（SOP）"变成 Agent 可执行的资产——销售跟进 SOP、代码评审 SOP、客服升级 SOP，一次定义，全公司 Agent 共享。

**Agent 视觉身份。** 每个 Agent 有独立的身份呈现，谁在做什么一目了然。

## 点评

**亮点**：产品判断极准——Agent 数量超过人类员工的那一刻，人类工单系统的抽象就失效了；handoffs + 持久工作流 + 可复用 SOP 这组设计是真正思考过"Agent 管理与人类项目管理有何不同"的产物；10 万星 + MIT + 活跃到日更的迭代节奏，生态位已经站住。

**局限**：概念新意味着最佳实践还在形成中，团队需要摸索自己的 Agent 管理方法论；TypeScript 全栈 + PostgreSQL 的技术栈对部署有一定要求；与各类 Agent 运行时的集成深度参差。

适合人群：已经开始用多个 Agent 干活的团队、想把"AI 员工"纳入正式管理流程的组织、以及做 Agent 平台产品的开发者（值得借鉴它的抽象）。
