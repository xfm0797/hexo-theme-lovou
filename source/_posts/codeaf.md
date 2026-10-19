---
title: 开源项目 CodeAF：一个 Go 二进制的「开源模型软件工厂」，DeepSWE 基准同模型第一
date: 2026-10-17 20:31:00
updated: 2026-10-17 20:31:00
categories: 开源
tags:
- 开源项目
- AI Agent
- 编码 Agent
- Go
- 开源模型
---

# CodeAF

> 一个 Go 二进制的「开源模型软件工厂」，DeepSWE 基准同模型第一

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [Agent-Field/CodeAF](https://github.com/Agent-Field/CodeAF) |
> | 语言 | Go（单二进制，无额外运行时） |
> | Stars | 约 466（2026-10-17 GitHub API 口径），Forks 58 |
> | 协议 | Apache-2.0 |
> | 状态 | v0.6.0（2026-10-01 发布），官方标注 Early Preview |
> | 出品 | AgentField AI，2026-08-05 建仓，本周首次登上 GitHub Trending |

## 它想解决什么问题

开源权重模型（DeepSeek、Qwen、GLM、Kimi、MiniMax 及本地 Ollama）便宜但"散养"——裸 CLI 里跑不出 frontier 级编码表现；而 Claude Code、Codex 这类产品又把你锁在特定模型的订阅里。CodeAF 的定位一句话说得清：**给开源模型盖一座软件工厂**——用任务分派、三角色分工、自动检查与合并，把开源模型的每一分钱榨出 frontier 级编码能力。官方原话是 "Frontier-grade coding on open models, at a fraction of the cost"。

## 核心机制拆解

**1. 工厂，而不是另一个终端。** 传统用法是一个仓库一个终端，三个 Agent 三个窗口，人在中间当调度员。CodeAF 只有一个窗口：`home` 视图聚合本机所有项目与对话——什么需要你拍板、什么在跑、花了多少钱，一目了然；每个项目独立配置审批规则、模型和消费上限。

**2. 一句话变成多个任务。** 一条消息里点三个问题，每个自动成为独立任务，在仓库的独立副本、独立分支上并行推进。通过检查的改动自动落到你的分支——永远不直接进 main / dev / release；没法验证的改动挂在 `unread` 下等你按 `1`（接受）或 `2`（不行）裁决。

**3. Pareto Crewing：每个任务一支三人小队。** worker 负责执行、mastermind 负责规划、checker 负责验证，系统按连通的服务商自动组队。这是它区别于"单 Agent 循环"harness 的核心——把规划、执行、验证拆给不同模型，各干各的长项。

**4. Subharness：为单一工种而生的专家。** 构建一个改动、评审一个 PR、审计本地代码，各自有专属流程，作为任务跑在你的对话旁，可随时查看或叫停；输入输出全部类型化。

**5. 模型接入面极宽。** OpenRouter、DeepSeek、GLM、Kimi、MiniMax、Qwen 走 key；Codex 可直接登 ChatGPT 套餐；Ollama 完全本地、零 key；另支持任意 OpenAI 兼容端点。首启动在浏览器里连 OpenRouter 即可开跑。无 GPU 要求——算力在连接的服务商侧。

**6. Headless 进 CI。** `codeaf do` / `codeaf exec` 可无人值守执行，适合流水线。

## DeepSWE 基准：第一，但请带上 salt

项目自报的同模型对比（113 个任务、DeepSeek V4 Flash、十款 harness 同场）：

需要强调三点：其一，这是**厂商自报数据**，官方文档也注明了单随机种子、sampling 契约差异等 caveat，在独立复现之前应当作参考而非定论；其二，DeepSWE 本身是抗污染基准（91 个仓库、手写验证器、解法平均触碰代码量是 SWE-bench Pro 的 5.5 倍、输出 token 约 2 倍），名次的含金量高于刷榜型基准；其三，466 个 star 和 "early preview" 标签是真实的成熟度信号。

## 安装与上手

```bash
curl -fsSL https://agentfield.ai/get/codeaf | bash
```

脚本把对应平台二进制放进 `~/.codeaf/bin`，也可以 `VERSION=` 钉版本或 `git clone && make build` 自行编译。接上任一服务商 key 后，建议先拿一个"有测试覆盖的小修"试水，再谈把 leaderboard 数字写进选型报告。

## 点评

**亮点**是它把"开源模型的工程化编排"做成了具体可感的产品形态：三角色分工、分支隔离、自动合并、按项目记账，这些恰好是个人开发者用裸 CLI 跑开源模型时最缺的四块拼图。Go 单二进制 + curl 一行安装，分发体验也干净。

**局限**同样明显：star 数三位数、官方自贴 early preview 标签、benchmark 未经独立复现；工厂隐喻意味着更高的自动化程度，也意味着你要把更多信任交给自动合并逻辑——生产代码库建议先开严格审批规则跑两周。

适合人群：手里有 DeepSeek / Qwen / GLM key、想压低 Agent 成本的开发者；多仓库并行、受够多终端布局的工程师；以及想把编码 Agent 挂在本地 Ollama 上跑的隐私敏感团队。
