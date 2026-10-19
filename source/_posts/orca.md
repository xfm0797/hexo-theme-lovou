---
title: 开源项目 Orca：9.5 万星的 Agent 舰队驾驶舱，一个提示词分发给五个 Agent 并行干活
date: 2026-10-17 20:39:00
updated: 2026-10-17 20:39:00
categories: 开源
tags:
- 开源项目
- AI Agent
- Agent 编排
- TypeScript
- 并行开发
---

# Orca

> 9.5 万星的 Agent 舰队驾驶舱，一个提示词分发给五个 Agent 并行干活

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [stablyai/orca](https://github.com/stablyai/orca) |
> | 语言 | TypeScript（Electron 桌面端约 97% TS，另有 Swift 移动伴侣） |
> | Stars | 约 9.49 万（2026-10-17 GitHub API 口径），Forks 6.1k |
> | 协议 | MIT |
> | 出品 | Stably AI（YC W22），2026-03-17 建仓，月均涨星约 2.4 万 |
> | 活跃度 | 周提交约 856（环比 +42%）、周发版、442 位贡献者；npm 二进制累计下载约 200 万 |

## 它想解决什么问题

Claude Code、Codex、OpenCode、Gemini CLI……好用的编码 Agent 越来越多，但用法始终是"一个仓库一个终端"，人在几个窗口之间当人肉调度器。Orca 的定位是 **ADE（Agent 开发环境）**：用你自己的订阅，并行运营一支 Agent 舰队——同一个提示词分发给多个 Agent，各自在隔离的 git worktree 里干活，跑完并排比较，挑最好的合并。它不替代你的 Agent 订阅，而是给这支舰队一个统一的驾驶舱。

## 核心机制拆解

**1. 并行 Worktree：Agent 选择变成实验。** 一个提示词同时发给五个 Agent，每个都在自己的 git worktree 里运行，互不覆盖文件；结果并排呈现，合并最优解，其余丢弃。想比较 Claude Code 和 Codex 谁更会改这个 bug？以前要开两个终端分别试，现在是一次分派。

**2. Agent 无关，账户可切。** 任何能跑在终端里的 CLI Agent 都能接入（Claude Code、Codex、OpenCode、Gemini CLI、Grok Bot、Hermes 等数十种），内置账户切换与用量统计——你付的还是原来的订阅费。

**3. 移动伴侣：人不在电脑前也能指挥。** iOS（App Store）与 Android（APK）应用实时推送 Agent 完成通知，可远程查看进度、追加后续指令。"Agent 监督"正在从编辑器里的一个功能，变成一种独立工作流——这是 Orca 最超前的判断。

**4. 终端与评审的完整重构。** Ghostty 级终端：WebGL 渲染、无限分屏、重启后滚动历史不丢。AI Diff 标注：在任意 diff 行上评论并发回给 Agent，评审、编辑、提交不出 Orca。Design Mode：在真实 Chromium 窗口里点任意 UI 元素，把它的 HTML、CSS 和裁剪截图直接塞进 Agent 的 prompt——"把这个按钮改成这样"从此有了像素级表达。

**5. 工程集成原生打通。** 应用内浏览 GitHub PR、issue 与 Linear 看板，从任意任务一键开 worktree；VS Code 编辑器处处自动保存，文件图片可直接拖进 Agent 提示框；SSH worktree 把 Agent 送上高性能远程机器，自动重连与端口转发齐全。

**6. 可脚本化与无人值守。** Orca CLI 让 Agent 也能驱动 Orca：`orca worktree create`、`snapshot`、`click`、`fill` 把每个工作流脚本化；headless `orca serve` 模式部署到 VPS，让舰队过夜跑长任务。

## 安装与分发

macOS / Windows / Linux 桌面二进制 + npm 包，MIT 协议，桌面端、移动端、CLI 全部免费开源，没有功能墙。唯一的成本是你并行跑多个 Agent 的 token 消耗——五路并行意味着五倍开销，这是采用前最该算清的账。

## 点评

**亮点**在于它把"编排 Agent"从 CLI 技巧升级成了产品形态：worktree 隔离是默认工作单元而非高级选项，移动端监督被当作一等场景，账户切换与用量统计内置。对一个今年 3 月才建仓的项目，9.5 万星和周均 2.4 万的增速说明"并行 Agent 编排"是真实痛点，而不是包装出来的需求。

**局限**也要看到：项目由 VC 支持的公司主导，bus factor 约 3（少数维护者承担近期多数提交），长期走向需观察；舰队模式下 token 成本成倍放大，"比较五个方案"的奢侈不是每个团队每天都玩得起；与往期介绍过的 ruflo（多 Agent harness 框架）相比，Orca 是产品而非框架——要 API 级编排能力的人应该去看 ruflo，要开箱即用驾驶舱的人选 Orca。

适合人群：同时运行两三个以上编码 Agent 并希望比较结果的开发者；想在手机上盯长任务的远程工作者；需要让 Agent 在 VPS 上过夜干活的团队。
