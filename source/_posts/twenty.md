---
title: 开源项目 Twenty：59.5K Star 的开源 Salesforce，专为 AI 时代重写的 CRM
date: 2026-10-22 20:34:00
updated: 2026-10-22 20:34:00
categories: 开源
tags:
- 开源项目
- Twenty
- CRM
- 开源替代
- 销售管理
---

# Twenty

> "The open alternative to Salesforce, designed for AI"——MCP 优先、Agent Skills 生态的下一代 CRM

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [twentyhq/twenty](https://github.com/twentyhq/twenty) |
> | 定位 | 开源 CRM 平台，Salesforce 的开源替代品，AI 原生设计 |
> | 主要语言 | TypeScript（Nx monorepo，React + GraphQL 前端） |
> | Stars / Forks | 59,489 / 9,682（截至 2026-10-22） |
> | 许可证 | 核心 AGPL-3.0，部分子包与 SDK 为 MIT |
> | 技术底座 | Node.js 24.22.1、PostgreSQL、Drizzle ORM |

## 它想解决什么问题

Salesforce 定义了 CRM 这个品类，也定义了它的贵：按席位收费、实施周期按月计算、定制要雇咨询公司。于是一代又一代开源 challenger 前赴后继。最新、也是最有希望的这个叫 Twenty——口号直接写在 README 里："The open alternative to Salesforce, designed for AI." 近 6 万 Stars 说明了社区对"下一个 Salesforce"的期待。

## "AI 原生"不是贴标签

很多产品把"AI 原生"当营销词，Twenty 是认真在设计上落实的：

**MCP 优先。** 仓库根目录就有 `.mcp.json`——Twenty 原生提供 MCP（Model Context Protocol）服务端。这意味着 Claude、Cursor 等 AI 工具可以直接读写你的 CRM 数据："帮我把上周所有停滞的商机整理成跟进清单"这类需求，AI 直接操作数据库完成，而不是给你一段不知道怎么用的 API 文档。

**Agent Skills 生态。** 官方发布了一套可移植的 Agent Skills：create-app、develop-app、manage-app、publish-app、use-twenty-mcp，通过 skills CLI 一键安装到 Claude Code、Codex、Cursor 等工具——开发者让 AI 帮忙给 Twenty 写插件，有官方技能包可依。

**数据模型为自动化设计。** 对象、字段、关系全部可自定义，配合 webhook 与工具系统（@DefineTool 声明式扩展），销售流程每一步都可挂自动化。

## 功能版图

- **客户与商机管理**：可自定义的对象模型、管道视图、活动时间线；
- **邮件营销（Campaigns）**：重构了编排器与编辑器，新增 Quote 内容块与发送统计；
- **应用开发生态**：SDK + CLI + create-twenty-app 脚手架，自托管是一等公民——与 Salesforce 的云端优先形成鲜明对比；
- **UI/UX**：命令面板、视图定制、深浅色主题，现代感对标 Linear 而不是传统 ERP。

## 快速上手

```bash
# Docker 自托管
git clone https://github.com/twentyhq/twenty.git
cd twenty && cp .env.example .env
docker compose up -d

# 本地开发（Node 24.22.1 + Yarn 4）
yarn && yarn start
```

启动后按引导创建首个工作区；接 AI 工具的话直接在客户端配置里启用 MCP 端点。

## 冷静看待

其一，Twenty 相比 Salesforce 的企业级生态（AppExchange、行业解决方案、合规认证）还有明显差距，更适合中小团队与新创公司；其二，核心代码为 AGPL-3.0，计划基于它提供商业托管服务的团队需仔细评估许可证条款。

## 总结

Twenty 踩中了两个浪潮的交汇点：开源替代运动（Salesforce 太贵太久）与 AI 原生重构（CRM 是最适合 Agent 接管的软件品类）。6 万星只是开始。
