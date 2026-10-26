---
title: 开源项目 FreeLLMAPI：4.1 万 Star 的额度聚合器，34 家免费层拼出每月 74 亿 token
date: 2026-10-26 20:51:00
updated: 2026-10-26 20:51:00
categories: 开源
tags:
- 开源项目
- FreeLLMAPI
- LLMAPI
- 免费额度
- 路由器
---

# FreeLLMAPI

> 把 34 家免费额度塌缩成一个 OpenAI 兼容的 /v1 端点，自带密钥加密、智能路由与限速故障转移

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [tashfeenahmed/freellmapi](https://github.com/tashfeenahmed/freellmapi) |
> | 语言 | TypeScript |
> | Stars | 41,872（2026-10-26），Forks 5,652，月增 12,957 |
> | 协议 | MIT |
> | 状态 | 2026-04-21 建库 |
> | 聚合规模 | 34 家提供商，约 74 亿 token / 月 |

## 它想解决什么问题

如今每家 AI 实验室都有免费额度：每月几百万 token、每天几千次请求。单看一家都是玩具，但 34 家叠起来，是每月约 **74 亿 token** 的可用推理能力。

问题是手工拼这 34 家是噩梦——34 个 SDK、34 套限速、34 个会失败的环节。FreeLLMAPI 把这些塌缩成一个本地服务器：任何 OpenAI 客户端指向它，它就在你加了 key 的提供商之间透明路由。

## 核心机制拆解

**1. 一个端点，透明路由。** README 的 "Why this exists" 说得很直白：你不需要改代码，只需要把 base URL 指过来。后端在已配置的提供商之间做智能路由，遇到限速自动故障转移到下一家。

**2. 覆盖 34 家 + 自定义。** Google、Groq、Cerebras、Mistral、OpenRouter、Cloudflare、Cohere、Z.ai（智谱）、NVIDIA、HuggingFace、ModelScope（Qwen3 / DeepSeek V4 / GLM-5，需阿里云境内绑定）等；外加一个**自定义提供商**——可以把 llama.cpp、LM Studio、vLLM、本地 Ollama 或远程网关的任何 OpenAI 兼容端点接进来。完整目录在 freellmapi.co/models，按模型的限速、上下文窗口、免费额度实时更新。

**3. 密钥与用量。** 自带的密钥加密存储、按密钥的用量追踪——多把 key 轮换时，你不用自己维护一张 Excel。

**4. 为什么它在 Trending 上站得住。** 免费额度聚合不是新技术，但"一家家配"到"一个端点"的体验差是数量级的；当 Agent 和批量任务把 token 消耗推上去，这个需求就从玩具变成了刚需。

## 安装与上手

- 项目仓库：<https://github.com/tashfeenahmed/freellmapi>
- 模型与额度目录：<https://freellmapi.co/models>

## 点评

**亮点**是把"免费额度"这种灰产气息的玩法，做成了有工程规范的基础设施：加密存储、路由、故障转移、用量统计——每一项都是让它可以长期跑在个人流水线里的理由。

**局限**必须说清：免费层的条款与限速随时可能变，今天能用的组合明天可能失效；聚合多家意味着数据要发给多家，隐私敏感内容别走这条路；74 亿 token 是理论上限的加总，实际可用量取决于你的 key 数量和调用节奏。

适合人群：想把手里的免费额度用起来的个人开发者；本地 + 云端混合推理的 Agent 玩家；做原型验证、对稳定性要求不高的实验场景。
