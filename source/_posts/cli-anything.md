---
title: 开源项目 CLI-Anything：一条流水线，把所有软件变成 Agent 原生 CLI
date: 2026-10-16 20:36:00
updated: 2026-10-16 20:36:00
categories: 开源
tags:
- 开源项目
- AI Agent
- CLI
- Python
- 工具链
---

# CLI-Anything

> 一条流水线，把所有软件变成 Agent 原生 CLI

---

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything) |
> | 语言 | Python（≥ 3.10，基于 Click） |
> | Stars | 约 5.3 万（GitHub Trending 日榜在榜） |
> | 协议 | Apache-2.0 |
> | 版本 | CLI-Anything v0.2.0 / CLI-Hub v0.2.0 |
> | 团队 | 香港大学数据智能实验室（HKUDS） |

## 它想解决什么问题

AI Agent 调用外部能力，目前主流是 MCP 工具或函数调用——每接入一个软件，都要有人手工写一层封装。CLI-Anything 的出发点是一个判断：**CLI 才是 Agent 最友好的接口**。`--help`、`which`、退出码、管道组合，这些机制对 Agent 来说天然自解释、可发现、可组合，比重新发明一套工具协议更现实。

于是这个项目做了一条全自动流水线：给定任意**有代码库**的软件，自动完成代码库分析、架构设计、实现、测试计划、测试编写、文档生成，直到发布到 PyPI，产出一个 Agent 原生的 CLI。

## 核心机制拆解

**1. 七阶段全自动流水线。** 从代码库分析到 PyPI 发布全自动，测试不是可选项：项目宣称仓库内 2,464 个测试全部通过，覆盖 40 多个软件封装（GIMP、Blender、LibreOffice、QGIS、FreeCAD、Zoom 等）。对“自动生成的代码”来说，测试覆盖率是可信度的生命线，这一点它抓得很准。

**2. 调用真实软件，不做玩具实现。** 生成的 CLI 背后调的是真实应用：LibreOffice 转 PDF、Blender 渲染 3D、Audacity 处理音频。这避免了“重新实现一遍但行为不一致”的陷阱，Agent 拿到的输出就是真实软件的输出。

**3. Agent 原生设计。** 每个命令内置 `--json` 输出结构化数据供机器消费，同时保留人类可读的表格输出；Agent 通过标准 `--help` 和 `which` 即可发现工具能力，不需要额外文档。

**4. CLI-Hub：CLI 的包管理器。** `pip install cli-anything-hub` 一条命令，人和 Agent 都可以浏览、搜索、安装、更新、卸载所有社区生成的 CLI，还带一个 meta-skill 让 Agent 自主找到任务所需的 CLI。分发层和生成层配套，这个设计让项目从“工具”变成了“生态入口”。

**5. SKILL.md 自动生成。** 每个生成的 CLI 自带 AI 可发现的技能定义（命令分组、用法示例、Agent 指引），可通过 `npx skills add` 直接被各类 harness 消费。

## 兼容与上手

生成的 CLI 可接入 Claude Code、Cursor、Pi、OpenClaw、Codex、Hermes、Reasonix、GitHub Copilot CLI 等主流 Agent 环境。试用路径有两条：直接装 CLI-Hub 体验现成封装，或拿自己的代码库跑一遍生成流水线，看自动化边界在哪里。

## 点评

**亮点**在于它对“Agent 接口”这个问题的回答足够工程化：不造新协议，而是把存量软件世界里最成熟的接口（CLI）标准化、自动化地生产出来，并且用大规模测试兜底生成质量。“真实软件集成 + 包管理器 + 技能定义”三件套，隐约有了 Agent 时代 `apt` 的样子。

**局限**也要看清：项目处于 v0.2 早期，生成质量高度依赖目标软件本身的可脚本化程度；对闭源无代码库的软件（这是大多数桌面软件的常态）流水线无能为力；目前生态以 Python 为主。它更适合有代码库的开发者工具、开源软件的 Agent 化改造，而不是“给任意 App 插上 Agent 翅膀”的通用答案。

对关注 Agent 工具链的人来说，这个项目值得跟踪的不是某个具体 CLI，而是 **“软件 Agent 原生化”这条路线能跑多快**——如果七阶段流水线被验证稳定，“给人用的软件”和“给 Agent 用的软件”之间的鸿沟会被工程化地填平。

---

- 项目仓库：[https://github.com/HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything)
- CLI-Hub 导航站：[https://clianything.cc/](https://clianything.cc/)
