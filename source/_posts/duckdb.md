---
title: DuckDB：装在进程里的分析型数据库，OLAP 终于不用先搭仓库
date: 2026-11-07 19:30:00
updated: 2026-11-07 19:58:00
categories: 开源
tags:
- 开源项目
- 数据库
- OLAP
- 数据分析
---

# DuckDB

> 单文件、零配置、列式引擎：几行 SQL 直接查 CSV 与 Parquet，本地分析的效率拐点

---

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [duckdb/duckdb](https://github.com/duckdb/duckdb) |
> | 语言 | C++ |
> | 协议 | MIT |
> | 形态 | 嵌入式（进程内），单文件数据库 |
> | 生态 | Python / R / Java / Node / CLI |

## 它想解决什么问题

分析一份 2GB 的 CSV，用 pandas 要吃掉十几倍内存，用 Spark 要起集群，用 Postgres 要建表导数。真实的数据分析里，这种"中等规模"的场景最多，工具却最尴尬。

DuckDB 的定位是**分析型的 SQLite**：进程内运行、零配置、列式存储 + 向量化执行，直接对 Parquet / CSV 做 SQL 查询，不用导入。

## 核心机制拆解

**1. 列式 + 向量化。** 面向分析场景的执行引擎，聚合与扫描比行存数据库快一个量级，且能自动多线程。

**2. 直接查文件。** `SELECT * FROM read_parquet('data/*.parquet')` 就能查询，不必先 ETL——这一条改变了很多人的工作流。

**3. 零运维嵌入。** 一个库文件即数据库，随应用分发；也能当 Python/R 的计算后端，替代部分 pandas 负载。

**4. 标准 SQL 覆盖面广。** 窗口函数、CTE、JSON、半结构化类型都支持，学习成本几乎为零。

## 安装与上手

```bash
pip install duckdb
```

```sql
SELECT region, sum(amount) AS total
FROM read_parquet('sales/*.parquet')
GROUP BY region ORDER BY total DESC LIMIT 10;
```

也能用 CLI：`duckdb -c "SELECT 42;"`。

## 点评

**亮点**是把"分析型数据库"从服务端搬进进程，顺手消掉了导入导出这一整段摩擦。对数据科学工作流，它最实际的价值是让 80% 的中等规模分析不再需要上集群。

**局限**：单写者模型，高并发写入不是它的场景；多用户共享要靠服务模式或外部编排；超大数据（数百 GB 以上）仍不如分布式方案；扩展生态（部分扩展需单独安装）与云上协作能力仍在完善。

**适合人群**：用 Python/R 做数据分析的工程师；需要给产品内嵌分析能力的开发者；以及受够了"查个 CSV 要起 Spark"的数据团队。

---

- 项目仓库：[https://github.com/duckdb/duckdb](https://github.com/duckdb/duckdb)
- 官方文档：[https://duckdb.org/docs](https://duckdb.org/docs)
