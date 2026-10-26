---
title: 开源项目 AI Engineering from Scratch：7.4 万 Star 的免费课程，542 节课从零造模型内部
date: 2026-10-26 20:48:00
updated: 2026-10-26 20:48:00
categories: 开源
tags:
- 开源项目
- AI工程
- 开源课程
- 学习资源
- LLM
---

# AI Engineering from Scratch

> Learn it. Build it. Ship it for others——不学怎么调 API，学怎么把模型内部造出来

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [rohitg00/ai-engineering-from-scratch](https://github.com/rohitg00/ai-engineering-from-scratch) |
> | 语言 | Python（含 TypeScript / Rust / Julia 路径） |
> | Stars | 74,097（2026-10-26），Forks 12,982，月增 16,847 |
> | 协议 | MIT |
> | 规模 | 542 节课、20 个阶段，README 30 种语言 |
> | 状态 | 2026-03-18 建库 |

## 它想解决什么问题

"AI 课程"多如牛毛，绝大多数教的是"怎么调用"：装 SDK、写 prompt、拼 RAG。学完能做 demo，但说不清模型内部发生了什么。

这门课的定位一句话："Implement model internals, retrieval pipelines, and agent runtimes. Test them, inspect failures, and keep the code and evaluation results."——实现模型内部、检索流水线与 Agent 运行时；测试它们、检查失败、保留代码与评估结果。

## 核心机制拆解

**1. 实现优先，不是调用优先。** 注意力机制、分词器、检索管线、Agent 循环，全部从零写。你不是在学"用 OpenAI 的 API"，而是在造那些 API 背后的东西，然后**看它怎么坏**——失败检查与评估结果留档，是这门课最反套路的地方。

**2. 20 个阶段，从环境搭建到能上线。** 542 节课按阶段推进，起点是环境配置，终点是可交付的项目。这个体量足够撑起一年的有章法学习计划。

**3. 四种语言路径并行。** Python / TypeScript / Rust / Julia——不讨好单一生态。Rust 路线明显是冲着推理性能岗去的，Julia 路线面向科研计算。

**4. 三种学法。**

- **网站学**：aiengineeringfromscratch.com 的交互式实验室，每节课可直接在浏览器里跑；
- **跟着 Agent 学**：课程明确支持 "with a coding agent"，让编码 Agent 带你过课——这本身也是对 Agent 教学能力的一次实测；
- **本地跑**：所有代码本地运行，MIT 协议，随便改。

还有项目挑战（project challenges）：学完不是刷题，而是做出能给别人用的东西。

## 安装与上手

- 项目仓库：<https://github.com/rohitg00/ai-engineering-from-scratch>
- 在线课程：<https://aiengineeringfromscratch.com>
- 赞助透明（SerpApi 等），课程内容本身零门槛

## 点评

**亮点**是稀缺性。当行业都在卖"7 天精通 AI 应用开发"时，一个让人花几百小时从零实现模型内部的免费课程，反而成了最稀缺的供给——而且它有 30 种语言的 i18n 野心，分发意图很清楚。

**局限**：542 节课的体量意味着高弃课率，缺乏强制节奏的人容易卡在第 3 个阶段；"实现优先"会牺牲一部分工程实践（部署、可观测性、成本控制）的深度；四语言并行是好设计，但每条路径的完整度需要自己核对。

适合人群：想进 AI 工程岗、简历需要"造过"而非"调过"的开发者；能自驱的自学者；想把课程改造成内部培训材料的团队（MIT 协议允许）。
