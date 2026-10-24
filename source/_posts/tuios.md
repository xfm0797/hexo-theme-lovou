---
title: 开源项目 TUIOS：Go 写的"知道 Agent 在干什么"的终端窗口管理器，tmux 的精神续作
date: 2026-10-20 20:40:00
updated: 2026-10-20 20:40:00
categories: 开源
tags:
- 开源项目
- 终端
- Go
- TUI
- 开发工具
---

# TUIOS

> 保留 tmux 式持久会话与窗格平铺，再把 Agent 的状态、消息、审批做进一等公民

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [Gaurav-Gosain/tuios](https://github.com/Gaurav-Gosain/tuios) |
> | 语言 | Go（基于 Bubble Tea v2 / Lipgloss v2） |
> | Stars | 约 5.5 千（2026-10-20 GitHub API 口径），Forks 256；曾登 Terminal Trove 每周工具 |
> | 协议 | MIT |
> | 状态 | 2025-09 建库，当前 v0.10.1，仍在高频迭代 |
> | 热度 | tmux/zellij 替代品中热度最高的新势力；官方站点 tuios.dev 提供 WASM 在线试玩 |

## 它想解决什么问题

多 Agent 并行工作流把终端变成了养殖场：三四个 Claude Code、一个 Codex、一个 Gemini CLI，各自占一个 tmux 窗格，你得靠窗格标题猜谁在干活、谁在等你批权限、谁已经报错躺平。tmux 诞生于 2007 年，它的世界观里没有"Agent"这个东西；zellij 界面漂亮但同样不为 Agent 设计。

TUIOS（Terminal UI Operating System）的定位：**一个知道你的 Agent 在干什么的终端窗口管理器**——Agent 状态、消息、审批、机群管理全部是一等公民。

## 核心机制拆解

**1. 传统艺能不丢。** Vim 式模态界面、BSP 平铺、9 个工作区、命令面板（Ctrl+P）、frecency 排序的启动器（Alt+Space，能搜 $PATH 和桌面应用）、窗格缩放、会话侧边栏（会话/终端/文件/git 状态/Agent 一屏尽览）、布局模板、守护进程模式（会话在守护进程重启甚至机器重启后复活）——tmux 用户零学习成本。

**2. Agent 状态可见。** Inbox 聚合各 Agent 的消息与审批请求，谁在等权限批准一眼可见，不用再逐窗格考古。

**3. 机群 fan-out 与可脚本化。** 一个命令向多个 Agent 分发任务；所有 Agent 能力都做成可脚本化的 CLI 而非仅 GUI。tmux 垫层兼容 + 19 个 harness（Claude Code、Codex 等）现成集成，迁移成本低。

**4. 工程底子硬。** Bubble Tea v2 + 自研 ANSI 解析器，kitty 图形协议族支持完整度在终端复用器里数一数二，"空闲零 CPU"对天天开终端的人不是噱头。

## 安装与上手

```bash
tuios new mysession        # 新建会话
tuios attach mysession     # 重连
```

零安装体验：官网 tuios.dev/learn 是编译成 WebAssembly 的交互导览。需要 Go 1.26.6+（源码构建）和真彩色终端；想用 kitty 图形/sixel 推荐 Ghostty、Kitty、WezTerm。

## 点评

**亮点**是产品判断精准：Agent 时代的终端痛点不是"不能分屏"，而是"看不见 Agent 状态、摸不到 Agent 消息"。Inbox、Agent 状态、机群 fan-out、审批管理四个功能直接长在痛点上，MIT 协议可放心进公司环境。

**局限**：Agent 功能强绑定编码 Agent 场景，不用 CLI Agent 的话增量有限；Go 守护进程 + TOML 配置对终端极简主义者是负担；v0.10.1 尚未 1.0，部分特性（sixel 像素裁剪等）仍实验性；kitty 图形协议依赖终端本身支持。

适合人群：同时跑多个编码 Agent 的开发者、想要会话跨机器跨重启持久化的远程工作者、想把 Agent 编排搬进终端的团队。
