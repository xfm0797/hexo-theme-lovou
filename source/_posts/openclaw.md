---
title: 开源项目 OpenClaw：39 万 Star 的 AI 助手，住在你的聊天软件里，数据全在自己手里
date: 2026-10-25 20:30:00
updated: 2026-10-25 20:30:00
categories: 开源
tags:
- 开源项目
- OpenClaw
- AI助手
- 个人Agent
- 自托管
---

# OpenClaw

> 一个本地 Gateway，把助手带到 20+ 消息渠道；状态、记忆、凭证全部留在你自己的硬件上

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
> | 语言 | TypeScript（Node.js） |
> | Stars | 393,007（2026-10-25），Forks 82,609 |
> | 协议 | MIT |
> | 状态 | 2025-11-24 建库，GitHub 上 Star 数最高的 AI 项目之一 |
> | 出品 | OpenClaw Foundation（独立 501(c)(3) 非营利组织） |

## 它想解决什么问题

如果有一个 AI 助手，住在你已经在用的聊天软件里——Discord、iMessage、Slack、Telegram、WhatsApp——同时状态、记忆和凭证全部留在你自己的硬件上，模型和 Agent 框架像插件一样随时更换，你会想要吗？

OpenClaw 就是这样一个项目：跑在你自己的电脑上，在 20+ 消息渠道里找你，另有 macOS、iOS、Android、Windows、Linux 原生应用。

## 核心机制拆解

**1. 架构一句话：一个本地 Gateway，连接一切。**

- **Gateway** 是本地控制平面，管理会话、工具、事件和渠道连接；
- Control UI、CLI、TUI 都连到 Gateway；
- **Channels** 把助手带到 WhatsApp、Telegram、Slack、Discord、Google Chat、Signal、iMessage 等消息服务；
- **Companion apps / nodes** 在支持的平台上补上语音、Canvas、摄像头、屏幕与设备本地操作。

同一套架构，个人笔记本上跑就是私人助手；团队部署改改配置就是共享服务。

**2. "Yours, with no catch"。** 状态、记忆、凭证都在你的硬件上。默认每天只做一次版本检查，匿名功能统计是选择性加入，`update.checkOnStart: false` 可以连这些都关掉。模型侧同样开放：Claude、Codex、本地模型都是可插拔插件，换模型不用改其他任何东西，插件生态有独立的 ClawHub 市场。

**3. 安全模型：把入站消息当不可信输入。** README 明确要求：支持私信的渠道默认对陌生发送者做配对审批（`openclaw pairing approve <channel> <code>`）。主会话的工具默认跑在宿主机上——接其他用户或把 Gateway 暴露到公网之前，官方强烈建议先读沙箱化指南。这套"可信网关 + 不可信执行 + 代码强制执行策略"的组合，是它敢让你把它挂在 20 个渠道上的原因。

**4. 治理结构值得单独说。** 项目由独立基金会管理，没有付费层、没有托管服务、没有代币；OpenAI、Amazon、Red Hat、NVIDIA、Vercel 都是捐赠方——**OpenAI 是捐赠者，不是所有者**。

## 安装与上手

```bash
# 一行安装后走向导
openclaw onboard --install-daemon
```

- 项目仓库：<https://github.com/openclaw/openclaw>

## 点评

**亮点**是把"个人 Agent"的形态想透了：不是又一个聊天窗口，而是把助手塞进你已有的通讯习惯里；同时用基金会治理 + MIT 许可，给"不会被某家公司收走"提供了制度保障。

**局限**：全渠道接入意味着攻击面大，配对审批与沙箱化配置不能省；一次跑 20 个渠道的运维复杂度不低；生态庞大之后，插件质量参差是必然，ClawHub 上的东西建议审一遍再用。

适合人群：想要"随时找得到"的个人 AI 助手、不想切窗口的人；隐私敏感用户（代码、文件、凭证不出本机）；从 $5 VPS 到 GPU 集群都能折腾的自托管爱好者。
