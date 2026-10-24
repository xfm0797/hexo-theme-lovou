---
title: 开源项目 OpenUI：生成式 UI 的开放标准，OpenUI Lang 比 JSON 省 67% token，四大前端框架通吃
date: 2026-10-20 20:40:00
updated: 2026-10-20 20:40:00
categories: 开源
tags:
- 开源项目
- 生成式 UI
- TypeScript
- 前端
- LLM
---

# OpenUI

> 生成式 UI 的开放标准：一门为"模型生成 UI"而生的紧凑语言，配 React/Vue/Svelte/Angular 四端运行时

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [thesysdev/openui](https://github.com/thesysdev/openui) |
> | 语言 | TypeScript（monorepo，14+ 包） |
> | Stars | 约 1.24 万（2026-10-20 GitHub API 口径），Forks 839 |
> | 协议 | MIT |
> | 状态 | 2024-12 建库，持续高频迭代；Trendshift 常客 |
> | 热度 | Thesys 出品，定位"Generative UI 的开放标准"；README 特别声明与任何加密货币无关 |

## 它想解决什么问题

"让模型生成界面"（Generative UI）落地时全撞同一堵墙：模型到底该输出什么格式？主流做法是让模型吐 JSON 由前端渲染——问题是 JSON 冗余到令人发指：一个仪表盘动辄两千多 token，流式解析还容易出半个括号。各家各搞各的：Vercel 有 json-render，Google 推 A2UI 协议，CopilotKit 有 OpenGenUI，Thesys 内部有 C1 格式，开发者被迫把命押给单一供应商。

OpenUI 的赌注：与其在 JSON 上打补丁，不如设计一门为"模型生成 UI"而生的紧凑语言——**OpenUI Lang**，再配一套框架无关的核心和四端官方运行时，把"标准"做成人人可用的开源基建。

## 核心机制拆解

**1. OpenUI Lang：流式优先的紧凑语言。** 模型边吐 token，前端边解析渲染——语言结构本身支持增量输出，不用等完整 JSON。官方基准（tiktoken GPT-5 编码器，七个 UI 场景对比两种 JSON 流式格式）显示 token 消耗比 json-render/C1 JSON 平均**省 67%**。

**2. 框架无关的架构分层。** 核心是与框架解耦的规范与运行时，React/Vue/Svelte/Angular 均有官方绑定；组件库与聊天界面目前 React 先行，深度体验在 React 生态最佳。

**3. 与协议生态对齐。** 积极参与 AG-UI / A2UI 等协议生态的讨论，定位是"中立标准"而非供应商私有格式——README 甚至专门声明与加密货币无关，足见命名困扰之深。

## 安装与上手

- 项目仓库：<https://github.com/thesysdev/openui>
- 官方文档与 Playground：<https://www.openui.com> · <https://www.openui.com/playground>
- Token 基准复现：<https://github.com/thesysdev/openui/tree/main/benchmarks>

## 点评

**亮点**是把"生成式 UI 缺标准"这个真痛点正面接了：语言级紧凑 + 流式优先是比 JSON 更本质的解法，四端运行时 + MIT 协议让"标准"姿态立得住。

**局限**要认清：token 效率对比是自家基准，选型建议用自己的场景复测；语言和生态年轻，生产采用建议锁定版本；深度绑定 React 生态获得最佳体验；Thesys 有商业云，开源版与云服务的边界需长期观察。

适合人群：做 AI 聊天产品/copilot 的前端团队、需要"模型生成受控界面"的 Agent 应用开发者、关注 AG-UI / A2UI 协议生态的基础设施团队。
