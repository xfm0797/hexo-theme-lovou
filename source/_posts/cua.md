---
title: 开源项目 Cua（trycua/cua）：Computer-Use Agent 的基础设施，驱动、机群与基准一应俱全
date: 2026-10-16 20:41:00
updated: 2026-10-26 21:36:00
categories: 开源
tags:
- 开源项目
- AI Agent
- Computer Use
- 自动化
- 基础设施
---

# Cua（trycua/cua）

> Computer-Use 2.0：给 AI Agent 一台真正能用的电脑——代码、API、图形界面三条通道自由切换

---

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [trycua/cua](https://github.com/trycua/cua) |
> | 语言 | Rust |
> | Stars / Forks | 30,500+ / 2,200+（2026-10-21 口径） |
> | 协议 | MIT |
> | 官网 | [cua.ai](https://cua.ai) |
> | 组件 | Cua Spaces、Cua Driver、Lume、CUA-S1、Cua Bench |

## 它想解决什么问题

让 AI 像人一样操作电脑——点按钮、看屏幕、填表单——这个被称为 computer use 的方向在 2025 年火了，但很快大家发现：**截图 + 视觉模型点击这条路又慢又脆**，真实工作流里 Agent 频繁"点歪"。

Cua 把这个问题的解法定义为"Computer-Use 2.0"：Agent 不该只有屏幕，它应该同时拥有**代码、API 和图形界面三条操作通道**，并在同一个任务里自由切换——能用脚本批量处理时用脚本，必须点 UI 时才看屏幕，需要读文档时才用 API。这更接近人类使用电脑的方式，也因此更稳、更快、更适合生产环境。

而支撑这套范式的，不是又一个 Agent 框架，而是**被拆成基础设施的"电脑"本身**：虚拟机、桌面自动化驱动、决策模型、评测基准，全栈开源。

## 核心机制拆解

Cua 仓库实际是一个组件家族，五个部件拼出 Agent 的"电脑"：

**1. Cua Spaces：给 Agent 一整套桌面。** 桌面应用形态，每个 Space 是一台本地 macOS 虚拟机（或 Linux 镜像），跑在你的 Mac 上、你自己的其他机器上，或你自己的云账号（AWS / GCP / Modal）里。两个招牌能力值得单说：

- **Teleport**：把一个已登录的 App（比如 Chrome、Slack）移入 Space，它保持登录状态出现在里面——会话存在 Cua Keyvault（本地加密），经你批准后才进入 Space。这解决了"Agent 登录不了你的工作账号"这个最尴尬的现实门槛。
- **Multiplayer**：你和 Agent 共用一张桌面，各有自己的光标，随时接手。

**2. Cua Driver：跨 OS 执行层。** 桌面自动化驱动，可检视并操作 macOS / Windows / Linux 上的应用。

**3. Lume：虚拟化层。** 在 Apple Silicon 上本地创建 macOS / Linux 虚拟机，SSH 直连，省掉手动安装与 VNC 那一套。

**4. CUA-S1：小而专的决策模型。** 面向 computer-use 场景的专用模型，供你按需选用——也可以自带模型，**不锁定供应商**。这在 Agent 基础设施里是个清醒的定位。

**5. Cua Bench：一等公民的评测。** 创建任务、评估 Agent、导出轨迹数据。对开发者而言这构成了训练与评估闭环：批量生成任务轨迹、评测不同模型、导出数据用于训练。这让 Cua 不只是"给 Agent 用的电脑"，也是研究 computer-use 的方法论基础设施。

## 安装与上手

```bash
# macOS 26+ 安装 Spaces 应用
curl -fsSL https://cua.ai/install.sh | sh
```

随后按官方 quickstart 依次体验四条主路径：

1. 跑起第一个 Space，看 Agent 在虚拟机里拿到完整桌面；
2. 用 Cua Driver 操作计算器并验证结果——最小闭环；
3. 用 Lume 创建一台 macOS 虚拟机；
4. 安装 `cua` CLI 创建本地沙箱。

自带 Agent 与模型即可开干，也可以探索 CUA-S1 做专用决策。

## 点评

**亮点**是这套拆分背后的架构自觉：**决策层、执行层、环境层彻底解耦**——模型可以换、环境可以换、每层可独立测试。这是把 computer-use 从"demo 技巧"提升为"工程学科"的关键。Teleport 与 Multiplayer 更是解决了两个一直被绕开的产品级难题：怎么让 Agent 用上你已登录的账号，以及人机如何优雅地交接控制权。MIT 协议 + 约 3 万星，说明社区对"拥有自己的沙箱与基准层"有真实需求。

**局限**要认清：它是**基础设施而非成品 Agent**，可靠性层得自己建；截图频率直接决定 token 成本，重截图任务在任何视觉模型上都便宜不了；macOS 虚拟化仅限 Apple Silicon，Windows/Linux 开发者只能走镜像或云账号路径；把 Space 跑在自己云账号里意味着你要自己管配额、网络与成本。与 browser-use 的分工也很简单：纯网页任务 browser-use 更直接，要驱动原生桌面应用、要三条通道混用，Cua 更接近问题本质。

**适合人群**：构建 computer-use 管线、做 GUI 自动化数据生成的 AI 工程师；需要给 Agent 一台隔离且有登录态电脑的团队；研究 computer-use 评测方法的从业者。如果你正在用 pyautogui + 截图 + 祈祷拼脚本，这是第一个把这类系统当基础设施做的项目，值得先读架构再动手。

---

- 项目仓库：[https://github.com/trycua/cua](https://github.com/trycua/cua)
- 官方文档：[https://cua.ai/docs](https://cua.ai/docs)
