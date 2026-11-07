---
title: Qdrant：用 Rust 写的向量数据库，过滤与混合检索是它的强项
date: 2026-11-07 19:30:00
updated: 2026-11-07 19:58:00
categories: 开源
tags:
- 开源项目
- 向量数据库
- RAG
- Rust
---

# Qdrant

> 面向生产的高性能向量库：标量量化省内存、payload 过滤下推、稀疏向量混合检索

---

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [qdrant/qdrant](https://github.com/qdrant/qdrant) |
> | 语言 | Rust |
> | 协议 | Apache-2.0 |
> | 形态 | 单机 / 集群 / 托管云 |
> | 特色 | 过滤下推、量化、稀疏+稠密混合 |

## 它想解决什么问题

向量检索的基本问题好解决，难的是真实业务里的附加条件：**不仅要"相似"，还要"符合过滤条件"**——某租户的、某时间段的、某类目的。很多向量库的做法是先召回再过滤，结果是被过滤掉大半，召回数量不够。

Qdrant 的答案是**过滤下推**：把过滤条件融进图索引遍历，边搜边排除，召回结果不塌。

## 核心机制拆解

**1. Filterable HNSW。** 过滤条件参与索引遍历，而不是事后剪枝，这是它在多租户场景里的关键优势。

**2. 量化省内存。** 标量量化与二值量化可大幅压缩向量占用，用少量精度换数倍内存效率。

**3. 混合检索。** 稠密向量之外支持稀疏向量（如 SPLADE）与多向量，语义与关键词召回可融合。

**4. 运维友好。** 单二进制部署、快照备份、分片与副本，集群能力齐备，也有托管云选项。

## 安装与上手

```bash
docker run -p 6333:6333 -v $(pwd)/qdrant_storage:/qdrant/storage qdrant/qdrant
```

```python
from qdrant_client import QdrantClient, models
c = QdrantClient("http://localhost:6333")
c.create_collection("docs", vectors_config=models.VectorParams(size=768, distance=models.Distance.COSINE))
```

## 点评

**亮点**是把"过滤 + 向量"这对矛盾处理得干净：多租户、按权限、按时间的检索是绝大多数实际检索系统的常态，而它的设计正好对得上。Rust 实现的资源效率也很实在。

**局限**：生态与托管选项不如老牌搜索栈丰富，复杂分析型查询仍得回 Postgres/ES；高写入并发下要自己调分片与索引参数；向量维度与量化策略选错，精度损失可能难以察觉（要用自家数据评测）；集群运维仍需一定专业度。

**适合人群**：做多租户 RAG 的产品团队；需要在语义检索上叠加权限/时间过滤的系统；以及追求内存效率的自托管用户。

---

- 项目仓库：[https://github.com/qdrant/qdrant](https://github.com/qdrant/qdrant)
- 官方文档：[https://qdrant.tech/documentation](https://qdrant.tech/documentation)
