---
title: 开源项目 text-to-cad：给 AI Agent 装上 CAD 超能力，一句话生成 STEP 工程图还能做可制造性检查
date: 2026-10-19 20:39:00
updated: 2026-10-19 20:39:00
categories: 开源
tags:
- 开源项目
- CAD
- AI Agent
- 3D 打印
- 制造
---

# text-to-cad

> 给 AI Agent 装上 CAD 超能力，一句话生成 STEP 工程图还能做可制造性检查

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [earthtojake/text-to-cad](https://github.com/earthtojake/text-to-cad) |
> | 语言 | Python（cadgen 库，基于 OpenCascade 的 OCP 绑定与 build123d） |
> | Stars | 约 2.16 万（2026-10-19 GitHub API 口径），Forks 2,130 |
> | 协议 | MIT |
> | 状态 | 2026-04 创建，持续发版（cadgen 已至 0.7.x，README 提及 0.9.0 更新通道），10-19 当天仍有提交 |
> | 热度 | GitHub Trending 常客；Claude Code / Codex / Cursor / Gemini / Grok 全平台插件 |

## 它想解决什么问题

让 Agent 生成 3D 模型，默认路线是"写 OpenSCAD 脚本"或"生成 mesh"——但工程世界要的不是能看的网格，而是**带尺寸、可制造、能进生产流水线的参数化模型**。text-to-cad 给 Agent 接上了真正的 CAD 内核（OpenCascade），让"帮我画一个带 M4 螺纹孔的支架，壁厚 2mm，适合钣金折弯"这句话直接产出 **STEP 文件**，并顺带完成工程图出图、可制造性（DFM）检查、切片 G-code，直到对接 SendCutSend、Bambu Lab 等真实制造服务。

一句话：它补上的是 Agent 从"会聊天"到"会造物"之间缺失的工程化一层。

## 核心机制拆解

**1. 真 CAD 内核，不是 mesh 玩具。** CAD 技能跑在 OCP（OpenCascade 的 Python 绑定）之上，配合 build123d 的参数化建模库——这意味着产出的是 B-rep 实体模型，STEP 为主输出格式，可导出 STL/3MF/GLB。工程语义（尺寸、公差、装配关系）得以保留，而不是一堆三角面片。

**2. 技能矩阵覆盖设计到制造全链路。** 项目以 Agent Skills 形式组织能力，每个技能一个聚焦工作流：

**3. 双形态分发：插件 + 技能。** 对支持插件的 Agent（Claude Code、Codex、Cursor、Gemini、Grok），插件形式还附带本地 CAD 服务器（`cadgen mcp`）与 CAD Viewer——在 Claude Desktop 里让 Agent"展示这个模型"，对话框里直接弹出可旋转的 3D 查看卡片，Agent 还能读取你选中的部分。对无插件支持的 Agent，纯技能形式（`npx skills add`）也能跑通核心 CAD 工作流。

**4. 安装可以"甩给 Agent"。** 官方推荐用法是直接给 Agent 发一句话：`Install text-to-cad from https://github.com/earthtojake/text-to-cad`——Agent 自己完成插件市场添加与安装。遥测默认开启（匿名、不含文件/路径/提示词），可用 `uvx cadgen telemetry off` 关闭。

## 安装与上手

```bash
# Claude Code
claude plugin marketplace add earthtojake/text-to-cad#latest
claude plugin install text-to-cad@earthtojake

# 无插件支持的 Agent
npx skills add earthtojake/text-to-cad#latest -g -a <agent> -y

# 然后对你的 Agent 说：
# "设计一个 60x40x20mm 的盒子，壁厚 2mm，带两个 M4 安装孔，导出 STEP"
```

前置依赖：`uv`（CAD 运行时经 uv 管理，首次启动需联网下载）。Windows 11 用户注意：Smart App Control 默认拦截 OCP 的未签名原生模块，需关闭该功能或在 WSL 下运行（`cadgen doctor` 会检测并提示）。

## 点评

**亮点**是"工程正确性"路线选得准：用 OpenCascade 而不是 mesh 生成，让产出真正能进制造流程；技能矩阵从建模一路铺到 DFM 评审、切片、直发打印服务，等于把"设计-验证-制造"闭环塞进 Agent 工具箱。CAD Viewer 的对话内 3D 卡片是个被低估的体验创新——人机协作改模型时，Agent 看得见你选中的面。对硬件极客、机器人开发者、小批量制造从业者，这是目前把 Agent 接入真实工程世界最完整的开源方案。

**局限**也要认清：CAD 内核依赖 OCP  wheel 的未签名原生模块，Windows 11 默认安全策略直接拦截（只能关 Smart App Control 或上 WSL）；首次运行需下载运行时，离线环境受限；遥测默认开启（可关）；生成质量仍受底层模型对几何约束理解能力的限制，复杂装配体建议人工复核 DFM 报告；0.9.x 仍在快速迭代，技能有增删（已退役 cad-viewer 等旧技能）。

适合人群：3D 打印与创客社区、机器人/机械设计工程师、想给 Agent 接制造能力的开发者、小批量定制生产团队，以及所有"让 AI 造实物"方向的探索者。
