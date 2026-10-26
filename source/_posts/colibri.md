---
title: 开源项目 colibri：4.4 万 Star 的纯 C 巨模型引擎，8GB 内存跑 744B MoE
date: 2026-10-25 20:38:00
updated: 2026-10-25 20:38:00
categories: 开源
tags:
- 开源项目
- colibri
- LLM推理
- MoE
- 本地大模型
---

# colibri

> Tiny engine, immense model——把激活的专家常驻内存，剩下的权重需要时从磁盘"流"进来

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [JustVugg/colibri](https://github.com/JustVugg/colibri) |
> | 语言 | C（每个模型家族一个文件） |
> | Stars | 43,792（2026-10-25），Forks 4,965 |
> | 协议 | Apache-2.0 |
> | 状态 | 2026-07-01 建库，两个月冲到 4.3 万星 |
> | 硬件 | 最低 8GB 内存、22GB 磁盘，显卡可选 |

## 它想解决什么问题

本地大模型的悖论：旗舰模型动辄数百 B 参数，"能跑"和"能装下"之间隔着几十 GB 显存。多数推理引擎的答案是"更大的显卡"，colibri 的答案完全相反——**别装下它**。

MoE 模型每个 token 只激活一小部分参数，那就不必让全部权重常驻内存：把常用专家留在内存里，其余的在需要时从磁盘流进来。代价是磁盘 I/O 和速度，收益是门槛从"要有一张好卡"降到"要有一台普通电脑"。

## 核心机制拆解

**1. 流式专家（streaming experts）。** 纯 C 实现，不用 GPU，靠 MoE 的结构性稀疏把显存压力转成磁盘带宽压力。README 的演示很典型：`./coli chat` 启动 GLM-5.2，744B MoE、int4 量化、CPU 流式推理，**32 秒就绪，常驻内存 9.9GB**。

**2. 13 套引擎，不止聊天。** 目前支持 13 个引擎：

- 语言模型（10 个）：GLM-5.2/5.3、GLM-5.3-Flash、Inkling、Kimi K3、DeepSeek V4 Flash、DeepSeek V4.1 Flash、MiMo-V2.6 Flash（及 Pro）、Qwen3.8-Flash-Next、Qwen3.6（还能跑 Qwen3-Coder 与稠密版 Qwen3.8-27B）、OLMoE；
- 图像生成：Qwen-Image-2.1；
- 决策模型：Laya、GLiNER2.5-Decide（第三个决策模型 Clef 跑在 Qwen3.6 引擎上）。

**3. 双 API 对外。** 启动后同时暴露 OpenAI 与 Anthropic 两套 base URL——Claude Code、Codex、OpenCode 可以直接把它当本地后端，不需要任何适配层。

## 安装与上手

Windows 双击 `START-HERE.bat`，Linux/macOS 跑 `./start-here.sh`。脚本会替你做完整套决策：看机器配置 → 推荐装得下的模型 → 按需编译引擎（有编译器就本地构建，否则下载预编译二进制；有 CUDA 工具链给 NVIDIA 卡构建 CUDA 后端，否则走 Vulkan）→ 断点续传下载模型 → 启动并在浏览器打开 dashboard。

- 项目仓库：<https://github.com/JustVugg/colibri>

## 点评

**亮点**是路线选择的极致：不追求集群吞吐，专攻"个人电脑上的旗舰模型"。纯 C、零依赖、每个模型家族一个源文件——这种极客做派反而让它在推理引擎的红海里有了清晰的识别度。

**局限**要看清楚：磁盘流式意味着首 token 延迟与连续生成速度强烈依赖你的 SSD，重负载场景不如 GPU 方案；int4 量化对精度的影响需要在具体任务上验证；13 个引擎的维护面不小，冷门模型的跟进节奏需观察。

适合人群：没有高端显卡但想跑旗舰模型的开发者；隐私敏感、要求全程本地的用户；想读一份干净 C 代码的推理引擎爱好者。
