---
title: 开源项目 Graphify：13 万星的现象级项目，把整个代码库变成可查询的知识图谱，tree-sitter 本地解析、零 LLM 开销
date: 2026-10-20 20:40:00
updated: 2026-10-20 20:40:00
categories: 开源
tags:
- 开源项目
- 代码智能
- 知识图谱
- RAG
- Python
---

# Graphify

> 把代码库建成一张真正的知识图谱：tree-sitter 本地解析、零向量库、零 LLM 开销，Agent 直接"问图"

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) |
> | 语言 | Python（CLI + Agent Skill，PyPI 包名为 graphifyy） |
> | Stars | 约 13 万（2026-10-20 GitHub API 口径），Forks 1.25 万 |
> | 协议 | Apache-2.0 |
> | 状态 | 2026-04-03 建库，半年冲上十万星级；背后为 YC S26 的 Graphify Labs |
> | 热度 | 持续占据 GitHub Trending 前列；README 被翻译成 30+ 种语言 |

## 它想解决什么问题

Coding Agent 读代码库的主流姿势是 grep + 整文件读：搜到关键词，把文件大段塞进上下文——token 消耗巨大，而且模型看到的是"字符串匹配"而不是"结构关系"：谁调用谁、哪个类是枢纽、一个概念穿越了几个模块，grep 一概不知。向量检索（RAG）是另一条路，但它切碎了代码的拓扑：embedding 相似 ≠ 调用关系相邻，跨文件链路更是天然盲区。

Graphify 的答案：**把代码库建成一张知识图谱，然后像查图一样提问**。在 AI 助手里敲一个 `/graphify .`，它输出三个文件——graph.html（浏览器里可点可搜的交互图）、GRAPH_REPORT.md（关键概念/意外连接/建议问题）、graph.json（完整图谱）。之后 Agent 不用再 grep，直接问图。

## 核心机制拆解

**1. 代码部分完全本地、确定、免费。** tree-sitter AST 解析：无 LLM、无网络、数据不出本机。约 40 种语言的跨文件关系（calls / imports / inherits / mixes_in）全部确定性抽取——同样的代码永远得到同样的图。

**2. 三个交付物各有分工。** 交互图给人看，报告给 AI 建立全局认知，JSON 给 Agent 程序化查询——一次生成，人机共用。

**3. 半年十万星的增长逻辑。** 它切中的是所有 Coding Agent 用户的共同成本：上下文。用确定性的图替代概率性的检索，token 账立刻算得过来。

## 安装与上手

```bash
pip install graphifyy
# 或作为 Agent Skill 安装后在 AI 助手里执行
/graphify .
```

## 点评

**亮点**：思路上的降维打击——不跟 RAG 卷检索质量，而是换掉问题本身（从"相似文本"到"结构关系"）；全程本地确定性解析，隐私与成本双赢；13 万星 + YC 背书 + 40 种语言支持，生态位已经站住。

**局限**：AST 级关系图抓不到运行时行为（反射、动态调用）；超大 monorepo 的图规模与查询性能需关注；PyPI 包名 graphifyy 与仓库名不一致的小坑。

适合人群：重度使用 Coding Agent 的开发者与团队、维护大型 monorepo 的工程组织、做代码理解/架构分析工具的作者。
