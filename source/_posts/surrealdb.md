---
title: SurrealDB：把文档、图、关系、时序塞进一个数据库的多模型选手
date: 2026-11-07 19:30:00
updated: 2026-11-07 19:58:00
categories: 开源
tags:
- 开源项目
- 数据库
- 多模型
- Rust
---

# SurrealDB

> 一个引擎同时是文档库、图库、关系库与时序库，配一套 SurrealQL 与内建鉴权

---

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [surrealdb/surrealdb](https://github.com/surrealdb/surrealdb) |
> | 语言 | Rust |
> | 协议 | BSL 1.1（后转开源许可，使用前核对版本条款） |
> | 形态 | 单二进制 / 分布式 / 嵌入式 |
> | 查询 | SurrealQL |

## 它想解决什么问题

一个中等规模的现代应用，常常要同时用关系库存业务、文档库存配置、图库存关系、缓存存会话。四套系统意味着四套备份、四套权限、四次数据同步。

SurrealDB 的赌注是：**这些模型可以在一个引擎里共存**。文档记录可以带图边，图遍历能返回关系字段，权限规则跟着数据走而不是写在后端。

## 核心机制拆解

**1. 多模型统一。** 记录本身是文档（JSON 风格），记录间的边构成图，支持关系语义与时序字段，不再需要跨库 join。

**2. SurrealQL。** 类 SQL 但有图遍历语法（`->likes->user`），表达式能力强，一次查询完成多层关系检索。

**3. 内建鉴权。** 权限规则（permissions）定义在表与字段级别，配合作用域与记录级规则，把部分访问控制从后端下沉到数据库。

**4. 实时与多形态。** 支持 live query 订阅变更；可单机、可分布式、也可嵌入运行。

## 安装与上手

```bash
docker run --rm -p 8000:8000 surrealdb/surrealdb:latest start
```

```sql
CREATE user:alice SET name = 'Alice';
CREATE user:bob SET name = 'Bob';
RELATE user:alice->follows->user:bob;
SELECT name, ->follows->user.name FROM user;
```

## 点评

**亮点**是"少一套系统"带来的架构收益：图查询与文档读写不再跨服务，权限规则贴近数据，早期产品的复杂度显著下降。SurrealQL 的图语法写起来确实顺手。

**局限**：**许可证需谨慎**，BSL 类条款对商业使用有约束，选型前必须核对当前版本；单引擎多模型意味着每项能力都不是最强的，超大规模分析型负载不合适；生态与客户端成熟度不及主流数据库，遇到问题可查的资料少；团队要接受一套新查询语言的学习成本。

**适合人群**：早期产品想减少技术栈数量的团队；社交、协作类需要强图关系的应用；以及愿意为新范式付出学习成本的架构师。

---

- 项目仓库：[https://github.com/surrealdb/surrealdb](https://github.com/surrealdb/surrealdb)
- 官方文档：[https://surrealdb.com/docs](https://surrealdb.com/docs)
