---
title: 开源项目 Kronos：首个金融 K 线基础模型，45 家交易所数据训练，被 AAAI 2026 接收
date: 2026-10-19 20:38:00
updated: 2026-10-19 20:38:00
categories: 开源
tags:
- 开源项目
- 金融 AI
- 基础模型
- 量化交易
- 时间序列
---

# Kronos

> 首个金融 K 线基础模型，45 家交易所数据训练，被 AAAI 2026 接收

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [shiyu-coder/Kronos](https://github.com/shiyu-coder/Kronos) |
> | 语言 | Python |
> | Stars | 约 4.13 万（2026-10-19 GitHub Trending 口径），Forks 6,892 |
> | 协议 | MIT |
> | 状态 | 2025-07 创建，持续维护；论文 arXiv 2508.02739，已被 AAAI 2026 接收 |
> | 热度 | GitHub Trending 日榜常客；Hugging Face 模型家族 NeoQuasar 公开分发 |

## 它想解决什么问题

金融 K 线（OHLCV：开高低收 + 成交量）是出了名的高噪声、非平稳数据——拿通用时间序列模型直接套，大概率被市场按在地上摩擦。Kronos 的定位是一句话：**做金融市场的"语言模型"**。就像 LLM 学人类语言一样，Kronos 专门学"K 线这门语言"的规律，覆盖全球 **45+ 交易所**的数据，是首个专门面向金融 K 线的开源基础模型。

它的价值不在于"预测下一个市场崩盘"，而在于给量化研究者一个**懂金融数据方言的预训练底座**——不用再从零烧算力预训练。

## 核心机制拆解

**1. 两阶段框架：先分词，再自回归。** 这是 Kronos 最核心的设计。金融数据维度高、噪声大、各交易所格式不一，直接喂给模型效果很差。Kronos 先用**专用分词器**把连续多维的 OHLCV 量化为**层次化离散 token**（类似把声波转成文字），再用 decoder-only 自回归 Transformer 在这些 token 上预训练——ChatGPT 学语言的那套范式，平移到 K 线序列上。

**2. 模型家族按容量分级。** 全部经 Hugging Face 分发：

**3. KronosPredictor：几行代码出预测。** 推理接口自动处理预处理、归一化、预测、反归一化，从原始数据到预测结果只需数行：

```python
from model import Kronos, KronosTokenizer, KronosPredictor

tokenizer = KronosTokenizer.from_pretrained("NeoQuasar/Kronos-Tokenizer-base")
model = Kronos.from_pretrained("NeoQuasar/Kronos-small")
predictor = KronosPredictor(model, tokenizer, max_context=512)

# df 含 open/high/low/close（volume/amount 可选）
pred_df = predictor.predict(df=x_df, x_timestamp=x_ts, y_timestamp=y_ts,
pred_len=120, T=0.6, top_p=0.9, sample_count=1)
```

支持 T / top\_p / sample\_count 等采样参数做概率化预测；`predict_batch` 支持多序列并行，自动逐序列归一化，批量分析多资产时 GPU 并行提速明显。

**4. 完整的研究链路开源。** 不只是模型权重：基于 Qlib 的数据预处理、微调脚本、简单回测脚手架全部公开，附 A 股示例——可以跟着步骤把模型微调成适配自己市场（如 A 股）的版本。官方还提供了 BTC/USDT 未来 24 小时预测的在线 Demo。

## 安装与上手

```bash
git clone https://github.com/shiyu-coder/Kronos
cd Kronos
pip install -r requirements.txt   # Python 3.10+
```

注意：Kronos-small/base 的最大上下文为 512，输入回看窗口不建议超过该长度（KronosPredictor 会自动截断）。微调走 Qlib 流程，回测示例仅为演示。

## 点评

**亮点**是把"基础模型范式迁移到金融时序"这件事做得相当完整：专用分词器解决多维量化问题，模型家族覆盖 4.1M 到 102.3M 三档开源容量，推理/批预测/微调/回测全链路公开，还有 AAAI 2026 同行认可背书。对量化研究者，它把"预训练一个懂金融的底座"从数月算力工程变成一次 `from_pretrained`。MIT 协议干净，社区活跃（4 万+ 星）。

**局限**必须清醒：**金融市场高噪声，next-token 式建模不等于稳定 alpha**——这是项目自己也强调的边界。示例回测只是演示，不是生产级量化系统；实盘还需要风险中性化、组合优化、滑点与交易成本建模；Kronos-large（499.2M）未开源，最强档位用不上；512 的上下文对长周期模式是硬约束。把它当研究底座很香，当"印钞机"会亏钱。

适合人群：量化研究员、金融时序方向的学生与研究者、想低成本实验"领域基础模型"的团队，以及所有相信"金融数据值得自己的语言模型"的人。
