---
title: 开源项目 caveman：让 Coding Agent「说山顶洞人话」，11 万星的 Token 节俭实践
date: 2026-10-17 20:30:00
updated: 2026-10-17 20:30:00
categories: 开源
tags:
- 开源项目
- AI Agent
- Token 优化
- Go
- Claude Code
---

# caveman

> 让 Coding Agent「说山顶洞人话」，11 万星的 Token 节俭实践

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) |
> | 语言 | Go（CLI 与本地代理），另有 npm 包与中间件 |
> | Stars | 约 11.32 万（2026-10-17 GitHub API 口径），Forks 6.5k |
> | 协议 | Apache-2.0 |
> | 首发 | 2026-04-04 建仓，v4.0 拆分为六大模块，持续日更 |
> | 热度 | 曾登顶 Hacker News 与 GitHub Trending 双榜第一 |

## 它想解决什么问题

AI 编程 Agent 按 token 计费，却按"话痨"方式工作：每一段寒暄、每一次"我建议您考虑"、每一轮回读自己的历史，都要付两遍钱——写一遍，读一遍。会话越长，这笔"上下文税"越重。caveman 的解法粗暴得像个梗：**让 Agent 说山顶洞人话**。项目简介只有一句——"why use many token when few token do trick"（能少说就少说）。

它与常见的"压缩工具输出"路线不同，而是从输出和输入两侧同时下手：技能文件管住 Agent 的嘴，本地代理管住 Agent 的眼。

## 核心机制拆解

**1. Skill：输出侧的「说人话禁令」。** 一个规则文件丢进任意 Agent，Agent 的回复规则变成：不问候、不总结、先给答案、一句话一个意思、每句不超过 20 词。一个 63 token 的 React 解释可以压到 20 token——同样的诊断、同样的修法。分三档强度：`/caveman`（约 20 token）、`/ultracave`（约 14）、`/megacave`（约 13，文言文模式）。另有 `/caveman-commit`（一行 Conventional Commit）和 `/caveman-review`（`L42: 🔴 null deref. Guard it.` 这种风格的问题清单）。

**2. Proxy：输入侧的「读得少」。** 可选的本地代理拦在 Agent 与服务商之间，把日志、测试输出、JSON、diff、搜索结果在进入上下文窗口前压缩，整会话输入 token 实测减少 33.2%。关键是**不做摘要、不改写**：代码、命令、路径、精确报错逐字节保留，只压掉周围的废话；每个被压缩的字节都有内容寻址的原始备份，Agent 需要时可逐字节取回。按内容类型定制压缩器：JSON 结构压 70–90%、日志压 85–95%、代码压 40–70%、diff 压 60–80%、搜索结果压 50–95%。

**3. v4.0 的六个模块。** Say less（说少）、Read less（读少）、Auto（自动选模型与推理强度，官方口径同等得分下便宜 54%）、Blocks（Agent 把自己写过的脚本存下来重跑，一次测试运行从 397 token 降到 76）、Waste fixes（修浪费）、Browse（浏览器侧）。

**4. 中间件嵌入自有代码。** `@caveman-ai/middleware` / `caveman-sdk` 用六行 TypeScript 或 Python 包住你现有的 LangChain、Vercel AI SDK、OpenAI、Anthropic 调用，工具结果在模型看到之前先瘦身，原文留在历史里，模型可随时取回。

## 独立验证：这不是 vibe coding

一个梗式项目能拿到 11 万星，靠的是三组第三方数据：

在同一套六文件基准上，caveman 代理 18/18 全部答对，对比方案 Headroom 为 15/18。

## 兼容与安装

覆盖 30+ Agent：Claude Code、Codex、Gemini CLI、OpenCode、Cursor、Windsurf、Cline、Copilot、Aider、Kilo、Qwen、Hermes、OpenClaw、Pi 等。安装一行：

```bash
npx @caveman-ai/cli@latest
# 或
npx skills add JuliusBrussee/caveman -g
```

全程本地运行，用你自己的订阅或 API key，不经过任何第三方服务器。

## 点评

**亮点**在于它把"省钱"做成了两个正交的旋钮：输出侧改行为（技能文件），输入侧改数据（本地代理），且代理的压缩是"内容感知 + 可逆"的——这在 token 优化类工具里是少见的工程克制。三组独立验证也让它从 meme 变成了有数据背书的实践。

**局限**也要说清楚：第一，所有压缩比数字来自官方基准，JetBrains 的结论是"质量无损"而非"质量提升"；第二，`/megacave` 这类极限档位的输出可读性会明显下降，团队协作场景要慎重；第三，代理层拦截的是你与服务商之间的流量，部署前值得确认自家合规政策是否允许本地中间件。

与往期介绍过的 context-mode（沙箱化工具输出、声称 98% 降幅）相比，caveman 的差异在于：它不改写内容语义，只做"删废话 + 缓存重放"，且有第三方复现——这正是当前 token 优化赛道最缺的东西。

适合人群：按 token 付费的重度 Agent 用户、上下文频繁触顶的长会话开发者、以及任何想给团队 Agent 立"说话规矩"的工程负责人。
