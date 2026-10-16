---
title: 开源项目 claude-mem：给 Coding Agent 装上跨会话记忆，10 万星的上下文工程实践
date: 2026-10-16 20:40:00
updated: 2026-10-16 20:40:00
categories: 开源
tags:
- 开源项目
- AI Agent
- 上下文工程
- TypeScript
- Claude Code
---

# claude-mem

> 给 Coding Agent 装上跨会话记忆，10 万星的上下文工程实践

---

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) |
> | 语言 | TypeScript（约 56%，另有 JavaScript / Python Chroma 服务） |
> | Stars | 约 9.97 万（2026-10-11 口径），Forks 8.7k，120+ 贡献者 |
> | 协议 | Apache-2.0 |
> | 版本 | npm 13.35.0（2026-10-09），累计 250+ 版本 |
> | 作者 | Alex Newman（@thedotmack），2025 年 8 月首发 |

## 它想解决什么问题

Claude Code 这类 Agent 每个会话都从空白上下文开始：昨天调试通的部署方案、这个 repo 的目录惯例、踩过的坑，今天全部蒸发。`/compact` 只压缩当前对话、不累积知识；CLAUDE.md 能记，但要人肉维护且越写越贵。claude-mem 做的就是这件事：**让记忆自动发生**——会话中自动捕获，压缩落库，下次会话按需注回。

## 核心机制拆解

**1. 五个生命周期钩子，自动捕获。** SessionStart 加载最近会话摘要，PostToolUse 在每次工具调用后记录观察，SessionEnd 生成并存储会话总结。全程无人值守，不需要“记得写会议纪要”。

**2. AI 压缩成结构化观察。** 原始工具输出（1,000–10,000 tokens）经 Claude Agent SDK（默认 claude-haiku-4-5）压缩成约 500 tokens 的结构化 observation，并自动分类：decision、bugfix、feature、refactor、discovery、change、sensitive 等九种类型。压缩而非全文留存，是它能控制上下文成本的关键。

**3. 本地混合检索。** SQLite 3 + FTS5 负责关键词，ChromaDB 负责语义向量，代码上下文不出本机。

**4. 渐进式披露（Progressive Disclosure）。** 三层取用：`mem-search` 先捞线索（约 50–100 tokens/条）→ `timeline` 沿时间线收窄因果 → `get_observations` 按需取回完整细节。官方口径比整段回放历史会话省约 10 倍 token——这是上下文工程的教科书式做法：先过滤、后取详情。

**5. File Read Gate。** 用 tree-sitter 解析代码，对 ≥32KB 的大文件拒绝全文读取，引导 Agent 改用大纲/展开工具，官方自测在大文件上再省 30–35% token。

**6. 隐私与可视化。** `private` 标签包裹的内容不写入记忆库；Web 查看器（localhost:37777）实时展示 agent 到底记了什么，每条记忆可回溯到当时的观察现场。

## 兼容与安装

覆盖 Claude Code、Cursor、Windsurf、Codex CLI、OpenCode、Gemini CLI、Copilot、Kimi Code、Antigravity、OpenClaw、Hermes 等十余个宿主，同一份记忆可跨工具共享。安装一行：

```bash
npx claude-mem install
```

要求 Node.js ≥ 20，Bun、uv、SQLite 缺失时自动装上。
