---
title: 开源项目 Postiz：3.7 万 Star 的开源社媒调度台，Buffer 的替代品长出了 Agent 触手
date: 2026-10-26 21:00:00
updated: 2026-10-26 21:00:00
categories: 开源
tags:
- 开源项目
- Postiz
- 社交媒体
- 自动化
- AIAgent
---

# Postiz

> 14 个平台一把梭的排期工具，2026 年的新定位是"终极的 Agent 化社媒排期工具"

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [gitroomhq/postiz-app](https://github.com/gitroomhq/postiz-app) |
> | 语言 | TypeScript |
> | Stars | 37,957（2026-10-26），Forks 7,406 |
> | 协议 | AGPL-3.0 |
> | 状态 | 2023-07-08 建库，熬过三年时间考验 |
> | 定位 | Agent 化社交媒体排期与管理平台 |

## 它想解决什么问题

内容创作者的真实痛点不是"不会发"，而是"发不过来"：14 个平台的账号、14 套发布规则、14 份数据报表。Buffer / Hootsuite 解决了这个问题，但代价是订阅费和"内容与账号都在别人服务器上"。

Postiz 的基本盘是同一件事，区别只在于：**自托管，数据是自己的**。

## 核心机制拆解

**1. 14 平台排期，几乎无死角。** Instagram、YouTube、LinkedIn、Reddit、TikTok、Facebook、Pinterest、Threads、X、Slack、Discord、Mastodon、Bluesky、Dribbble——主流平台全在列。

**2. 生态配套齐全。** 公开 API、Node SDK（`@postiz/node`）、n8n 自定义节点、Make.com 集成，以及 Postiz Cloud 托管版。自托管版 README 直接给 Docker 部署，社区版该有的都有——没有功能墙。

**3. 2026 年的新故事：Agent 排期。** 真正值得写的是 README 里那面"AI Agent 墙"——它列出的 Agent 集成数量比社交平台还多：ChatGPT、Claude、Claude Code、Codex、Cursor、OpenClaw、Hermes Agent、Grok Bot、Grok Build、Muse、Perplexity Computer、nanoclaw、Paperclip、MCP Server，以及通用 AI Agents CLI。

翻译一下：你可以让 Claude Code 直接帮你发帖、排期、管账号。内容创作 Agent 写完文案，通过接口或 MCP 落到排期表里——"Agent 生产内容，Postiz 负责分发"的闭环，是它今年增长的新引擎。

**4. 商业模式是熟悉的配方。** AGPL-3.0 开源自托管 + Postiz Cloud 托管服务（n8n、PostHog 同款打法），好处是自托管版功能不打折。

## 安装与上手

- 项目仓库：<https://github.com/gitroomhq/postiz-app>
- 部署：Docker 一键起，或走 Postiz Cloud 托管

## 点评

**亮点**是"老瓶装新酒"的教科书案例。社交媒体排期是个成熟到无聊的市场，但"Agent 化"给了它第二次生命——当发帖从"人打开后台"变成"Agent 调用 API"，一个开放、可自托管、Agent 友好的调度台就成了内容工作流的关键基础设施。

**局限**：AGPL-3.0 对"对外提供托管服务"有额外义务，商用前要过一遍条款；自托管意味着各平台的 OAuth 应用需要自己申请维护，这一步比想象中耗时；平台 API 政策变化（限流、权限收紧）会直接影响可用性。

适合人群：内容团队与个人创作者（一个后台管所有平台，且不被 SaaS 绑定）；已经把内容生产交给 Agent、只缺"最后一公里"分发层的人；自托管爱好者（数据、账号密码、分析全在自己服务器上）。
