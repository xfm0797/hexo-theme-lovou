---
title: Agent Desktop：不靠截图猜坐标，用无障碍树给 Agent 一双真手
date: 2026-11-07 19:30:00
updated: 2026-11-07 19:58:00
categories: 开源
tags:
- 开源项目
- AI Agent
- Computer Use
- Rust
---

# Agent Desktop

> Vercel 出品：读操作系统的无障碍树来操作桌面应用，元素引用稳定、动作可安全重试

---

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [vercel-labs/agent-desktop](https://github.com/vercel-labs/agent-desktop) |
> | 语言 | Rust |
> | 星标 | 约 1 万 |
> | 定位 | Agent 的桌面执行层 |
> | 接入 | MCP 友好 |

## 它想解决什么问题

现在的 computer use 大多走同一条路：截图 → 视觉模型算坐标 → 点击。这条路有两个先天缺陷：**贵**（每步一张图）和**脆**（分辨率、主题、弹窗一变就点偏）。

Agent Desktop 换了个信息来源：不猜像素，直接读应用的**无障碍树（accessibility tree）**——也就是屏幕阅读器用的那套 UI 结构。按钮就是按钮，输入框就是输入框，引用稳定，点错了还能重试。

## 核心机制拆解

**1. 结构优先于视觉。** 无障碍树给出的是元素层级、角色、名称与可用动作，Agent 决策从"这个位置大概是什么"变成"操作名字叫 X 的按钮"。

**2. 引用稳定可重试。** 基于真实元素的引用，同一个动作重复执行不会因为渲染抖动而漂移——这是把 demo 变成可生产的关键差别。

**3. 跨应用。** 点击、输入、导航任意桌面应用，不要求目标软件提供 API 或插件。

**4. Rust + MCP。** 性能与稳定性来自 Rust 实现；作为 MCP 服务端可以直接挂到现有 Agent 上，充当桌面执行层。

## 安装与上手

```bash
git clone https://github.com/vercel-labs/agent-desktop.git
cd agent-desktop
cargo build --release
# 按 README 以 MCP server 方式注册到你的 Agent
```

先拿计算器、记事本这类简单应用验证动作是否稳定，再上复杂软件。

## 点评

**亮点**是找对了信息源。无障碍树本来是为残障用户准备的公共服务，被复用到 Agent 上几乎零成本，却同时解决了成本、稳定性与可解释性三个问题——这比"再加一个视觉模型"优雅得多。

**局限**：覆盖度受应用本身的无障碍实现质量制约，Electron 应用、自绘 UI、游戏引擎常常给不出像样的树；需要系统级权限（macOS 的辅助功能授权），企业设备管理会拦；跨平台差异大，各 OS 的树结构不统一，抽象层要不断补丁；目前仍是实验室项目，API 会变。

**适合人群**：要做桌面自动化的 Agent 开发者；企业内需要驱动老式桌面软件的流程自动化团队；以及研究 computer use 可靠性的人。

---

- 项目仓库：[https://github.com/vercel-labs/agent-desktop](https://github.com/vercel-labs/agent-desktop)
