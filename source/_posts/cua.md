---
title: 开源项目 Cua（trycua/cua）：Computer-Use Agent 的基础设施，驱动、机群与基准一应俱全
date: 2026-10-16 20:41:00
updated: 2026-10-16 20:41:00
categories: 开源
tags:
- 开源项目
- AI Agent
- Computer Use
- 自动化
- 基础设施
---

# Cua（trycua/cua）

> Computer-Use Agent 的基础设施，驱动、机群与基准一应俱全

---

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [trycua/cua](https://github.com/trycua/cua) |
> | 语言 | 多语言单仓（Rust 驱动内核、Python/TypeScript SDK、Swift） |
> | Stars | 约 2.98 万（2026-10-15 口径），日增约百颗 |
> | 协议 | MIT（个别组件为 CC-BY-4.0 等，引入前核对） |
> | 背景 | Y Combinator X25 团队，坚持 MIT 开源 |
> | 最新动态 | cua-spaces v0.9.0（2026-10-14） |

## 它想解决什么问题

让 Agent 操作电脑（点击、填表、跨浏览器与终端干活），好玩的是模型，无聊的是周边——而周边吃掉 90% 的工程量：Agent 跑在哪？怎么看到它看到的？怎么移动鼠标键盘（macOS、Linux、Windows 五套 API）？两次运行之间怎么重置？怎么证明它真的在变好？Cua 的答案是：**把这些做成开源基础设施**，而不是让每个团队用 pyautogui + 截图 + 祈祷重造一遍。

## 核心机制拆解

**1. Cua Driver：跨 OS 执行层。** 覆盖 macOS、Linux、Windows 的驱动程序，亮点是**后台自动化**——在支持的平台上可以点击、输入、滚动而不抢夺你的鼠标焦点，你能继续工作，Agent 在后台驱动应用。macOS 驱动已用 Rust 重写（cua-driver-rs），对 Chromium、Figma、Blender、DAW 等非辅助功能表面也能操作。

**2. Sandbox SDK：一套 API 打通所有 OS。** `Sandbox.ephemeral(Image.linux())` 这样的调用对 `.macos()`、`.windows()`、`.android()` 或自定义 qcow2/iso 镜像同样成立——环境层可替换，上层代码不动。

**3. Cua Spaces / Fleets：桌面机群。** 托管服务管理跨 OS 机器机群，秒级创建带浏览器、LibreOffice 的云桌面；连接结束后 pool 可保温，适合 CI 里要快速启动的场景。

**4. Lume：macOS 虚拟化层。** 基于 Apple Virtualization.Framework，在 Apple Silicon 上一条命令创建 macOS VM 并 SSH 进入，省去手动安装和 VNC。

**5. Cua Bench：一等公民的评测。** 跑 OSWorld、ScreenSpot、Windows Arena 及自定义数据集，轨迹可导出用于 RL 训练——benchmark 不是附属品，而是项目核心组件。

**6. CUA-S1 与 CuaBot。** 前者是把“这个下拉选哪个值”这类微决策交给 System 1 式小模型（权重 MIT、Hugging Face 可下载，早期研究发布）；后者一条 `npx cuabot` 就能给任意 coding agent 挂上沙箱桌面，带 H.265 流和共享剪贴板。另内置 MCP server，可直接接入 Claude Code、Cursor。

## 点评

**亮点**是**决策层、执行层、环境层彻底解耦**的架构自觉：模型可以换、环境可以换、每层可独立测试——这是把 computer-use 从“demo 技巧”提升为“工程学科”的关键。benchmark 与轨迹导出一等公民化，也让它同时是训练与评测的数据基础设施。MIT 协议 + 约 3 万星的速度，说明社区对“拥有自己的沙箱、SDK 与基准层”有真实需求。

**局限**说清楚：它是**基础设施而非成品 Agent**，可靠性层要自己建；截图频率直接决定 token 成本，重截图任务在任何视觉模型上都便宜不了；macOS VM 仅限 Apple Silicon；云运行时（spaces.cua.ai）是付费托管服务，完全自托管可行但本地 QEMU 路径需要磁盘空间和耐心。与 browser-use 的分工也简单：纯网页任务 browser-use 更直接，要驱动原生桌面应用，Cua 更接近问题本质。

适合人群：构建 computer-use 管线、做 GUI 自动化数据生成的 AI 工程师。如果你正在用 pyautogui 拼脚本，这是第一个把这类系统当基础设施做的项目，值得读架构再动手。
