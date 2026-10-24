---
title: 开源项目 opencode：22 万 Star 的开源编码 Agent，终端、桌面、Web 三端通吃，模型自由
date: 2026-10-23 20:37:00
updated: 2026-10-23 20:37:00
categories: 开源
tags:
- 开源项目
- opencode
- 编码Agent
- TUI
- TypeScript
---

# opencode

> The open source coding agent——不绑定任何一家模型、任何一种界面

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [anomalyco/opencode](https://github.com/anomalyco/opencode)（官网 [opencode.ai](https://opencode.ai)） |
> | 定位 | 开源 AI 编码 Agent（CLI / 桌面 / Web 三端） |
> | 主要语言 | TypeScript |
> | Stars / Forks | 220,437 / 29,475（截至 2026-10-23） |
> | 许可证 | MIT |

## 它想解决什么问题

在 Claude Code、Codex CLI 统治终端编码 Agent 的今天，一个开源项目硬是挤进了这个赛道，拿到 22 万 Star——这就是 opencode。它用终端（TUI）、桌面应用和 Web 应用三种形态告诉你：编码 Agent 不一定要绑定某一家模型、某一种界面。

## 三端形态，一个内核

opencode 的产品哲学是"在你喜欢的任何环境里干活"：

- **终端（CLI）**：经典 TUI，支持主题和键位定制，`curl -fsSL https://opencode.ai/install | bash` 一键安装，也提供 Homebrew / npm / bun / pnpm / mise / AUR 等安装方式；
- **桌面（Desktop）**：macOS / Windows / Linux 全平台原生安装包，适合离不开 GUI 的用户；
- **Web**：一句 `opencode pair`，本地服务生成一个 5 分钟有效的连接链接，把本地 Agent 桥接到浏览器里——远程连服务器上的项目时格外好用。

Docker 用户也有官方镜像（ghcr.io/anomalyco/opencode）。

## 模型自由是核心竞争力

内置对大量 LLM 提供商的支持，TUI 里一个 `/connect` 就能接入。可以接自己的 API Key 用任意模型，也可以走官方 OpenCode Console 或 OpenCode Go（每月 10 美元订阅，打包访问主流编码模型）——开源项目做出商业模式，这条路子越来越成为标配。

对 Agent 玩家来说，另一组关键词是可定制：配置、插件（plugins）、MCP 服务器、自定义命令（commands）一应俱全。它不只是"一个编码 Agent"，更是一个可以长成你自己形状的 Agent 平台。

## 为什么它能冲到 22 万 Star

1. **踩中赛道红利**：编码 Agent 是 AI 落地最确定的场景，开源替代品的需求被充分教育；
2. **形态差异**：大多数竞品只有 CLI 时，opencode 直接把桌面和 Web 补齐；
3. **MIT + TypeScript**：贡献门槛低，主题、插件、fork 变体生态极其活跃；
4. **教学生态**：连 boot.dev 都专门出了与官方团队合作的《AI Coding with OpenCode》免费课程——一个项目的周边生态做到这个程度，基本可以算"毕业"了。

## 快速上手

```bash
curl -fsSL https://opencode.ai/install | bash   # 或 npm install -g opencode-ai
cd your-project && opencode
# TUI 内 /connect 连接模型
opencode pair   # 浏览器访问本地会话
```

## 适合谁

想要开源、可自托管编码 Agent 的个人开发者与团队；需要多模型自由切换（哪家便宜、哪家强用哪家）的重度用户；想基于成熟 Agent 内核做二次开发的团队——22 万星意味着足够稳定的社区和足够多的现成集成。
