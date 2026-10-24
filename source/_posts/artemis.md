---
title: 开源项目 ARTEMIS：Google 出品的 Android 自动化 Agent，AndroidWorld 99%+ 完成率，把真手机接进 Claude Code
date: 2026-10-20 20:40:00
updated: 2026-10-20 20:40:00
categories: 开源
tags:
- 开源项目
- AI Agent
- Android
- 自动化测试
- MCP
---

# ARTEMIS

> 用自然语言驱动真机 Android 自动化：Google Research AndroidWorld 基准 99%+ 任务完成率

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [google/artemis](https://github.com/google/artemis) |
> | 语言 | Python 3.12+（CLI + MCP Server + Web 控制台） |
> | Stars | 约 1.32 万（2026-10-20 GitHub API 口径），Forks 1,599 |
> | 协议 | Apache-2.0（含第三方代码，如 Minitap 的 mobile-use） |
> | 状态 | 2026-08-13 建库，10 月持续高热；自带中英文文档与 Discord 社区 |
> | 热度 | Google 官方组织下的 Android 自动化项目，AndroidWorld 基准 SOTA 对比图直接挂在 README |

## 它想解决什么问题

移动端自动化测试十年来的主流是 Appium/UiAutomator 这类写死的脚本：元素定位、等待、断言全人工编码，UI 一改就得维护。而通用 Computer-Use Agent（看屏幕点坐标）在手机上又慢又不准——屏幕小、元素密、弹窗转瞬即逝。

ARTEMIS 的定位介于两者之间：**用自然语言描述任务，让多模态 Agent 像人一样操作真机**。它不追求"替你想测试用例"，而是把"执行"这一层做到可靠：跨 App 流程、日志采集、截图取证、结构化报告一气呵成，并以 MCP 服务器形式挂进 Antigravity、Claude Code、Codex、Windsurf 等 AI IDE——你可以在 IDE 里直接说："打包最新改动成 APK，装到连着的设备上，用测试账号打开登录页，检查登录后有没有异常弹窗，最后把截图发我。"

## 核心机制拆解

**1. 双执行档位：Flash 与 Pro。** 按任务复杂度选择执行策略，快慢两档兼顾成本与可靠性。

**2. 成绩单来自 Google Research 自家的 AndroidWorld 基准**（覆盖 20+ App、100+ 多步任务）：**99%+ 任务完成率**，README 挂出 SOTA 对比。

**3. MCP 优先的接入方式。** 不是又一个独立平台，而是嵌进你已有的 AI IDE 工作流——Agent 在写代码的同一个会话里就能操作真机验证改动。

**4. 测试工程化配套齐全。** 日志采集、截图取证、结构化报告内置，面向的是可复现的 QA 流程而非一次性演示。

## 安装与上手

Python 3.12+，按仓库文档连接 adb 设备并注册 MCP 服务器即可在 IDE 中使用；中英文文档齐备，Discord 社区活跃。

## 点评

**亮点**：Google 官方出品 + AndroidWorld 99%+ 的硬成绩单，让"Agent 操作真机"从演示品变成可依赖的测试工具；MCP 接入方式聪明——不另起炉灶，直接长在开发者已有的 AI 工作流里。

**局限**：Android 专属，iOS 场景不覆盖；多模态 Agent 驱动真机的成本（模型调用）比传统脚本高，大规模回归测试仍需混合方案；依赖真机/模拟器环境管理。

适合人群：Android QA 与自动化测试团队、需要在 AI IDE 里端到端验证移动端改动的开发者、做手机 Agent 研究的团队。
