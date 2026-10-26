---
title: 开源项目 mattpocock/skills：30 万 Star 的"真工程师"技能库，正面硬刚 vibe coding
date: 2026-10-25 20:32:00
updated: 2026-10-25 20:32:00
categories: 开源
tags:
- 开源项目
- mattpocock
- AgentSkills
- TypeScript
- 工程实践
---

# mattpocock/skills

> Skills for Real Engineers——小、易改、可组合、适配任何模型

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [mattpocock/skills](https://github.com/mattpocock/skills) |
> | 语言 | Shell |
> | Stars | 302,870（2026-10-25），Forks 25,471 |
> | 协议 | MIT |
> | 状态 | 2026-02-03 建库 |
> | 出品 | Matt Pocock（aihero.dev / Total TypeScript） |

## 它想解决什么问题

2026 年的 Agent 技能生态有个共同的诱惑：把整个开发流程打包收编。"你只要装这个框架，它会告诉你该怎么开发。"听起来省事，实际后果是——控制权被拿走了，过程里的 bug 也变得难以定位。

Matt Pocock 的立场写在 README 第一段：GSD、BMAD、Spec-Kit 都想帮忙，但**它们把过程收为己有**。所以他不卖方法论，只送技能。

## 核心机制拆解

**1. 三条设计原则。**

- **小**：每个技能只做一件事，读一遍就能改；
- **可组合**：技能之间像积木，不绑定特定流程；
- **模型无关**：任何模型都能用，不挑底座。

作者的逻辑很直白：真正的软件开发是难的，与其让框架替你决定"该怎么开发"，不如给你一套基于数十年工程经验的技能，你自己 hack、自己改、变成自己的东西。

**2. 每个 harness 一条安装路。**

```bash
# Claude Code
claude plugin install mattpocock-skills@claude-plugins-official

# Codex
codex plugin marketplace add mattpocock/skills
codex plugin add mattpocock-skills@mattpocock

# Gemini CLI
gemini skills install ... --path skills/engineering

# 任何其他 Agent
npx skills@latest add mattpocock/skills -a <agent>
```

装完跑一次 `/setup-matt-pocock-skills` 即可。技能走 skills.sh 分发，也支持把可编辑文件复制进项目手动更新——**自动更新 vs 手动管理**两种哲学都留了口子，这在技能分发里还挺少见。

**3. 一个信号：6 万人的通讯录。** README 里写着，约 60,000 名开发者订阅了 Matt 的技能通讯录。这个数字比 Star 数更能说明问题：大家不只想要一份技能列表，而是想持续跟踪"一个严肃的工程师每天怎么用 AI"。

## 安装与上手

- 项目仓库：<https://github.com/mattpocock/skills>
- GitHub Copilot（CLI 与 VS Code）：marketplace 添加后，在 VS Code 里执行 "Chat: Install Plugin From Source"

## 点评

**亮点**是克制。在满世界"AI 全自动开发流程"的时候，反向提供小而可改的技能，本质上是在维护工程师的控制权——技能是助力，不应该是新的黑箱。

**局限**："小而可组合"意味着你要自己拼装工作流，对想要开箱即用流程的团队反而门槛更高；技能集有明显的前端 / TypeScript 审美取向，后端或数据工程的覆盖需要自己补；30 万 Star 里包含大量"关注"而非"使用"，别把热度当成成熟度。

适合人群：对"AI 代写的流程框架"不信任的资深工程师；TypeScript / 前端开发者；同时用 Claude Code、Codex、Copilot、Gemini CLI 的多 harness 用户。
