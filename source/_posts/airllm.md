---
title: 开源项目 AirLLM：4GB 显存跑 70B、3.7GB 跑 2.8T 参数的分层推理，现在还支持训练
date: 2026-10-18 20:38:00
updated: 2026-10-18 20:38:00
categories: 开源
tags:
- 开源项目
- 大模型推理
- Python
- 显存优化
- 端侧 AI
---

# AirLLM

> 4GB 显存跑 70B、3.7GB 跑 2.8T 参数的分层推理，现在还支持训练

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [lyogavin/airllm](https://github.com/lyogavin/airllm) |
> | 语言 | Python（Jupyter Notebook 项目，PyPI 包 `airllm`） |
> | Stars | 约 3.93 万（2026-10-18 GitHub API 口径），Forks 3998，7 日增约 4 千 |
> | 协议 | Apache-2.0 |
> | 状态 | 2023-06 创建，持续更新至 2026-10-18；2026-09 新增训练支持 |
> | 热度 | 长期位居 GitHub Trending；Kimi K3（2.8T）单卡 3.72GB 实测为近期传播点 |

## 它想解决什么问题

大模型本地部署的门槛从来不是算力，是**显存**：70B 模型权重就要 140GB，一张 4GB 显卡连一个零头都装不下。量化、蒸馏、剪枝是常见答案，但都牺牲精度或灵活性。AirLLM 选了第四条路：**分层推理（layer-by-layer inference）**——不量化、不蒸馏、不剪枝，把模型按层切开，用的时候只把当前层加载进显存，权重从磁盘/内存流式经过 GPU。

这个思路的代价是延迟，收益是可达性：70B 跑在单张 4GB 卡上，2.8T 参数的 Kimi K3 跑在 3.72GB 显存里，671B 的 DeepSeek-V3 跑在约 12GB 上。

## 核心机制拆解

**1. 逐层流式，一次只驻留一层。** 推理时模型先被分解并逐层保存（需要磁盘空间），随后每层用后即弃。README 给出的端到端实测：70B on 4GB；Kimi K3（2.8T，迄今最大开源模型）单卡 **3.72GB**（RTX 6000 Ada 实测）；Qwen3.8-Flash-Next（125B MoE）**5.95GB**（RTX 4090 实测）；Qwen3.8-27B 稠密 VL **3.33GB**（RTX 3090 实测）；DeepSeek-V3（671B）约 **12GB**；Qwen3-235B-A22B 约 3GB。原话："without quantization, distillation, or pruning"。

**2. MoE 的 per-expert 流式。** Kimi K3 这类巨型 MoE 的关键优化：**只加载 token 实际路由到的专家**，而不是把 2.8T 参数的全部专家塞进去。其 ~51B 的 n-gram 嵌入表文件映射在主机侧（64GB 内存的机器足够），解码层流式经过——这是 3.72GB 这个数字的来源。

**3. 预取重叠加载与计算。** 加载第 N+1 层与第 N 层的计算重叠，v2.5 起默认开启（早期仅 Llama2 路径），实测带来约 10% 提速。

**4. 块量化压缩换 3 倍加速。** 可选的 `compression='4bit'`/`'8bit'` 做块状权重量化（依赖 bitsandbytes），推理速度最高提升 3 倍且精度损失可忽略。与量化的区别作者说得很清楚：常规量化要同时压权重和激活以真正提速，而这里瓶颈在磁盘加载，所以只压权重部分——更容易保精度。

**5. 训练支持（2026-09 新增）。** 同样逐层流式冻结权重，但把 adapters 常驻 GPU：Qwen3.8-Flash-Next（125B）可在 **6GB** 显存下训练（RTX 3060 Ti 实测），Qwen3.8-27B 在 seq 512 下约 **2GB**。大模型微调第一次有了"单张游戏卡"的入口。

## 安装与上手

```bash
pip install airllm
```

```python
from airllm import AutoModel

# 一行切换模型规模，API 与普通 transformers 模型一致
model = AutoModel.from_pretrained("Qwen/Qwen3-32B")
# model = AutoModel.from_pretrained("deepseek-ai/DeepSeek-V3")   # 671B, ~12GB
# model = AutoModel.from_pretrained("Qwen/Qwen3.8-Flash-Next")   # 125B MoE, 5.95GB

input_tokens = model.tokenizer(['What is the capital of United States?'],
return_tensors="pt", truncation=True,
max_length=128, padding=False)
output = model.generate(input_tokens['input_ids'].cuda(),
max_new_tokens=20, use_cache=True,
return_dict_in_generate=True)
print(model.tokenizer.decode(output.sequences[0]))
```

注意：首次推理会把原模型逐层拆分落盘，**确保 HuggingFace 缓存目录有足够磁盘空间**——Qwen3.8-Flash-Next 的 checkpoint 约 360GB，可设 `delete_original=True` 在拆分后回收原文件省一半空间。

## 点评

**亮点**是把"显存墙"打穿了，而且打得很诚实：所有数字都是端到端实测并标注了具体显卡，没有营销话术。从 70B on 4GB 到 2.8T on 3.72GB，再到 125B on 6GB 训练，覆盖推理与训练两侧，`AutoModel` 一行接入的设计让迁移成本趋近于零。对只有消费级显卡的人，这是少数"不用量化妥协"的本地大模型方案。

**局限**是物理定律：分层加载的瓶颈在磁盘 I/O，**速度换内存**，别指望生产级吞吐；首次使用的拆分落盘 + 大模型 checkpoint 动辄数百 GB，磁盘紧张的人会痛苦；对 `transformers` 版本有强绑定（Kimi K3 需要 4.56.x、Qwen3.8 需要 in-tree `qwen4_exp` 的每日构建），flash-attn 的 CUDA 12 要求也是硬门槛；4bit/8bit 压缩与训练路径还在演进，接口可能变动。

适合人群：只有 4–12GB 显存但想本地跑大模型的开发者与研究者、需要微调大模型却只有单张游戏卡的用户、研究 MoE 推理与分层调度的人。
