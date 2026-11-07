---
title: Polars：用 Rust 重写的高速 DataFrame，pandas 之外的第二种选择
date: 2026-11-07 19:30:00
updated: 2026-11-07 19:58:00
categories: 开源
tags:
- 开源项目
- 数据分析
- DataFrame
- Rust
---

# Polars

> 多线程、惰性求值、Apache Arrow 内存格式：同样的数据处理，快一到两个数量级

---

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [pola-rs/polars](https://github.com/pola-rs/polars) |
> | 语言 | Rust（Python / R 绑定） |
> | 协议 | MIT |
> | 内存格式 | Apache Arrow |
> | 特色 | 惰性执行、查询优化、流式处理 |

## 它想解决什么问题

pandas 统治了 dataframe 世界十几年，但它的设计约束越来越明显：单线程、急切求值、内存占用高、大数据集上容易 OOM。数据规模涨上来之后，很多人被迫迁到 Spark，代价是运维复杂度。

Polars 提供了第三条路：**保留单机 dataframe 的开发体验，把执行引擎换掉**——多线程、列式、惰性优化。

## 核心机制拆解

**1. 惰性求值 + 查询优化。** `lazy()` 之后整条表达式被当成查询计划优化，谓词下推、投影裁剪自动完成，少读少算。

**2. 多线程执行。** 默认并行，不需要额外配置，聚合与 join 的加速在 multicore 机器上非常明显。

**3. Arrow 零拷贝。** 与 DuckDB、PyArrow 生态互通，数据在系统间传递不必反复序列化。

**4. 流式处理。** 大文件可分块处理，内存不再是被硬性卡死的上限。

## 安装与上手

```bash
pip install polars
```

```python
import polars as pl
df = (pl.scan_parquet("data/*.parquet")
        .filter(pl.col("amount") > 100)
        .group_by("region").agg(pl.col("amount").sum())
        .sort("amount", descending=True)
        .collect())
```

## 点评

**亮点**是性能与 API 设计同时在线：表达式系统让复杂变换写得比 pandas 更清晰，而 `scan_*` 系列直接把它变成轻量查询引擎。对中等规模数据，它常常是"不用上 Spark"的那个答案。

**局限**：生态不如 pandas 成熟，很多库只接受 pandas DataFrame，需要 interop 转换；API 与 pandas 有意不同，迁移是重写而不是改几行；报错信息对新手仍偏晦涩；某些冷门操作与索引语义（pandas 的 index 概念）在 Polars 里没有对应物。

**适合人群**：数据量已经让 pandas 吃力的分析师；追求性能的 ETL 开发者；以及希望用统一 API 在本地与 DuckDB 之间切换的团队。

---

- 项目仓库：[https://github.com/pola-rs/polars](https://github.com/pola-rs/polars)
- 官方文档：[https://docs.pola.rs](https://docs.pola.rs)
