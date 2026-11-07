---
title: OpenHands：开源的自主软件工程 Agent，让 AI 自己开个沙箱干活
date: 2026-11-07 19:30:00
updated: 2026-11-07 19:58:00
categories: 开源
tags:
- 开源项目
- AI Agent
- 编程智能体
- 自动化
---

# OpenHands

> 前身 OpenDevin：给 Agent 一台带浏览器与终端的沙箱，让它自己写代码、跑测试、提 PR

---

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [All-Hands-AI/OpenHands](https://github.com/All-Hands-AI/OpenHands) |
> | 语言 | Python（前端 TypeScript） |
> | 协议 | MIT |
> | 形态 | Web UI + 沙箱运行时（Docker） |
> | 前身 | OpenDevin |

## 它想解决什么问题

大多数编码 Agent 是"补全一段代码"或"改一个文件"。真实任务是：读 issue、定位、改多处、跑测试、看报错、再修——一个需要**执行环境**的闭环。

OpenHands 的答案是给 Agent 一个完整的沙箱：终端、浏览器、文件系统，让它自己动手验证，而不是靠人一步步喂结果。

## 核心机制拆解

**1. 沙箱即工作台。** 每个会话跑在隔离容器里，Agent 可以执行命令、装依赖、开浏览器查文档，失败可重来，不污染宿主。

**2. 动作-观察循环。** 写文件、跑测试、读输出，形成闭环；测试失败的信息直接成为下一轮的输入，这是它比"单次生成"更接近真实开发的关键。

**3. 多入口接入。** Web 界面适合观察过程，CLI 与 API 适合塞进流水线，也支持通过 GitHub 集成直接对 issue 干活。

**4. 可换模型与运行时。** 模型侧支持多家提供方与本地部署，运行时可自托管，数据不出内网。

## 安装与上手

```bash
docker pull docker.all-hands.dev/all-hands-ai/runtime:latest
docker run -it --rm -p 3000:3000   -v /var/run/docker.sock:/var/run/docker.sock   docker.all-hands.dev/all-hands-ai/openhands:latest
```

打开 `http://localhost:3000`，填模型 Key 即可开会话。

## 点评

**亮点**是把"执行"当一等公民：没有沙箱的 Agent 只能猜，有沙箱的 Agent 能验证。这个差别在真实仓库里决定了产出可用与否。MIT 协议 + 自托管 + 多模型，是它能在企业里被认真评估的原因。

**局限**：沙箱运行时对资源有要求，本地跑几个会话就吃满内存；长任务的 token 成本高，且容易在同一个坑里反复试错；自主性越强，安全边界越要自己把控——Docker socket 挂载本身就是个风险点；复杂业务逻辑的改造仍需要人给出高质量的任务描述。

**适合人群**：想让 Agent 端到端处理 issue 的团队；需要可自托管、可审计的编码 Agent 的企业；以及研究 Agent 执行闭环的研究者。

---

- 项目仓库：[https://github.com/All-Hands-AI/OpenHands](https://github.com/All-Hands-AI/OpenHands)
- 官方文档：[https://docs.all-hands.dev](https://docs.all-hands.dev)
