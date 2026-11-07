---
title: Claude-Code-Game-Studios：用 49 个 Agent 拼出一个游戏工作室
date: 2026-11-07 19:30:00
updated: 2026-11-07 19:58:00
categories: 开源
tags:
- 开源项目
- AI Agent
- 游戏开发
- Claude Code
---

# Claude-Code-Game-Studios

> 把 Claude Code 编排成一家工作室：49 个 Agent、72 个流程技能，按策划/美术/程序/QA 分工推进项目

---

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [Donchitos/Claude-Code-Game-Studios](https://github.com/Donchitos/Claude-Code-Game-Studios) |
> | 形态 | Shell 编排 + 提示词/技能体系 |
> | 宿主 | Claude Code |
> | 星标 | 约 3.2 万（2026 年 Trending 口径） |
> | 规模 | 49 个 Agent / 72 个技能 |

## 它想解决什么问题

一个人做独立游戏，卡点往往不是技术，而是**没有团队**：谁来当策划梳理需求，谁定美术风格，谁做 QA 提 bug，谁管里程碑？让一个通用 Agent"帮我做个游戏"，结果通常是一堆互不衔接的代码片段。

这个项目换了思路：既然 Agent 可以很多个，那就按真实工作室的岗位分工组织它们，用流程把交接点固定下来。

## 核心机制拆解

**1. 岗位化编排。** 策划、美术、程序、QA 等角色各有独立 Agent 与职责边界，产物是彼此可读的文档与代码，而不是一次性输出。

**2. 技能库覆盖全流程。** 72 个技能从立项、设计文档、素材规范，到实现、测试、打磨，把"该做什么"拆成可执行的步骤。

**3. 面向 Claude Code 而非重造轮子。** 它本质是一套技能与提示词体系，直接增强你已有的编码 Agent，不需要新装一个运行时。

**4. 可裁剪。** 小项目删掉几个岗位照样跑；规模变大就加 Agent 与技能，编排结构不变。

## 安装与上手

```bash
git clone https://github.com/Donchitos/Claude-Code-Game-Studios.git
cd Claude-Code-Game-Studios
# 按 README 把技能目录挂到 Claude Code 的技能路径，然后在新工程里启动
```

建议从一个 2D 小玩法开始跑通全流程——直接上大项目会立刻暴露编排层的协调成本。

## 点评

**亮点**是把"多 Agent 协作"从演示做成了组织设计：角色分工、交接产物、流程技能三件套齐全，比"让十个 Agent 自由讨论"务实得多。对单人开发者，这套结构最大的价值是**逼你把设计文档写出来**。

**局限**：本质是提示词工程，没有强制的状态机或校验机制，Agent 之间仍会互相误解；49 个 Agent 意味着可观的 token 消耗，跑一轮完整流程成本不低；生成代码的质量取决于宿主模型，复杂玩法仍需人工兜底；项目文档偏个人实践总结，工程化程度不高。

**适合人群**：一个人做独立游戏、需要"虚拟团队"补齐岗位的开发者；想研究多 Agent 编排结构的工程师；以及把 AI 辅助创作流程当实验课题的人。

---

- 项目仓库：[https://github.com/Donchitos/Claude-Code-Game-Studios](https://github.com/Donchitos/Claude-Code-Game-Studios)
