---
title: 开源项目 andrej-karpathy-skills：把 Karpathy 的吐槽写成 CLAUDE.md，22.4 万 Star 的四条军规
date: 2026-10-26 20:33:00
updated: 2026-10-26 20:33:00
categories: 开源
tags:
- 开源项目
- Karpathy
- ClaudeCode
- CLAUDEmd
- 提示工程
---

# andrej-karpathy-skills

> 整个仓库的核心资产是一个 CLAUDE.md 文件——把"什么叫好好干活"写清楚，让 Agent 变乖

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) |
> | 语言 | Markdown（无代码） |
> | Stars | 224,157（2026-10-26），Forks 22,432，周增近 3,000 |
> | 协议 | 仓库未显式声明，商用前请先确认 |
> | 状态 | 2026-01-27 建库 |
> | 形态 | 单文件技能，Trending 日榜 Star 总数第二 |

## 它想解决什么问题

Karpathy 对当前 LLM 编程能力的诊断，被 README 直接引用：

> "The models make wrong assumptions on your behalf and just run along with them without checking. They don't manage their confusion, don't seek clarifications, don't surface inconsistencies, don't present tradeoffs, don't push back when they should."

翻译过来：模型会擅自替你做假设然后一路狂奔；它不管理自己的困惑、不主动求澄清、不暴露前后矛盾、不摆出权衡、该反驳的时候不反驳。

这段话几乎是所有"AI 顺手改了我的代码""AI 过度设计"事故的共同病因。

## 核心机制拆解

**1. 把诊断逐条反过来，写成四条行为准则。** 整个项目的技术含量就在这里：不做工具、不做插件、不写一行代码，只是把上面那份"诊断书"翻译成可执行的约束——不许擅自假设、遇到歧义先问、发现不一致要指出、给出方案时摆出权衡、该拒绝时要拒绝。

**2. 一个文件就是一次分发。** 这示范了 2026 年 Skill 生态的最小单元形态：不需要代码，不需要部署。安装方式极简：

```bash
# 装插件
/plugin marketplace add multica-ai/andrej-karpathy-skills

# 或者一行 curl 把 CLAUDE.md 拉进项目
curl -o CLAUDE.md <raw 链接>
```

**3. 为什么它比"更聪明的模型"更有效。** 模型能力的提升是渐进的，但行为约束可以立刻生效——这也是为什么一个 Markdown 文件能拿到 22 万星：它不是提升上限，而是**降低下限**。

## 安装与上手

- 项目仓库：<https://github.com/multica-ai/andrej-karpathy-skills>
- 提示：作者在 README 里顺带宣传了自己的新项目 Multica（开源 coding agent 管理平台），内容与项目本身无关，可以忽略

## 点评

**亮点**是极简主义的胜利。整个仓库只有一份准则，却精准命中了 Agent 编程最常见的失败模式。这类"行为约束型"技能的价值不会随模型升级而消失——能力越强，纪律越重要。

**局限**：单文件准则没有强制力，模型仍可能"读了但没照做"，关键场景要配合 hooks 或审查环节；四条原则偏通用，缺少针对具体技术栈的细化；仓库许可证未显式声明，企业商用前需要确认授权。

适合人群：所有 Claude Code 用户，尤其是受够 AI"顺手改代码"和"过度设计"的人；想把 AI 编程规范统一起来的团队管理者；研究"如何把行为约束产品化"的技能开发者。

一句话总结：不写一行代码，只是把"什么叫好好干活"写清楚，就让整个行业的 Agent 变乖了一点。
