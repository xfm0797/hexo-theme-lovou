---
title: 开源项目 Hermes Agent：25.7 万 Star 的"越用越聪明"Agent，Nous Research 出品
date: 2026-10-25 20:33:00
updated: 2026-10-25 20:33:00
categories: 开源
tags:
- 开源项目
- HermesAgent
- NousResearch
- 自我改进
- Agent记忆
---

# Hermes Agent

> "唯一内置学习闭环的 Agent"——从经验中创造技能，在使用中改进技能，跨会话理解你是谁

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) |
> | 语言 | Python |
> | Stars | 256,934（2026-10-25），Forks 56,249 |
> | 协议 | MIT |
> | 状态 | 2025-07-22 建库 |
> | 出品 | Nous Research |

## 它想解决什么问题

大多数 Agent 是"用完即忘"的：任务结束，上下文清零，下次重新解释项目、重新踩同一个坑。编码 Agent 让这个问题变得更痛——你每天在和同一个代码库较劲，却每天要向 AI 重新自我介绍。

Hermes 的设计前提很直接：**它会成长**。

## 核心机制拆解

**1. 学习闭环的四个齿轮。**

- **自主技能创建**：复杂任务完成后，把做法沉淀为新技能；
- **技能自改进**：不是静态提示词，而是越用越顺手的工具；
- **跨会话记忆**：Agent 管理的记忆 + 周期性自我提醒，配合 FTS5 全文检索 + LLM 摘要搜索历史对话；
- **用户建模**：通过 Honcho 辩证式用户模型，跨会话深化"你是谁"的理解。

并且兼容 **agentskills.io** 开放标准——技能生态不被项目锁定。

**2. 不绑在笔记本上。** 六种终端后端：本地、Docker、SSH、Modal、Daytona、Vercel Sandbox，另有 Singularity/Apptainer 插件后端。Daytona 与 Modal 上环境空闲时休眠、按需唤醒，会话之间几乎不花钱。

**3. 随时在线。** 通过 Telegram / Discord / Slack / WhatsApp / Signal 单一网关进程访问——你在云端 VM 上派活，在手机上收结果。原生 Windows 支持 PowerShell 一行安装、不依赖 WSL；甚至有 Termux 的 APT 仓库。

**4. 研究向的底子。** 作为 Nous Research 的作品，Hermes 自带批量轨迹生成与轨迹压缩能力——为训练下一代工具调用模型准备数据。`hermes model` 一条命令切换 Nous Portal / OpenRouter / OpenAI / 自建端点；内置 cron 调度器让"日报、夜备份、周审计"这类无人值守自动化变成自然语言描述。

## 安装与上手

- 项目仓库：<https://github.com/NousResearch/hermes-agent>
- 起步成本：$5 VPS 即可，空闲时接近零成本

## 点评

**亮点**是把竞争维度从"单次任务能力"拉到"跨会话成长性"。技能自创、记忆自管、用户建模三件事叠起来，才构成所谓的护城河——单看任一机制都不新鲜，组合起来才是"越用越聪明"。

**局限**：自动沉淀技能意味着错误也可能被固化，需要有人定期审阅技能库；六种运行时后端带来的维护面很大，自托管时的权限与网络暴露要自己做功课；用户建模涉及长期数据积累，隐私边界需自行界定。

适合人群：做长期项目的开发者（记忆复利最大）；低预算 / Serverless 玩家；需要轨迹数据做研究的 AI 团队。
