---
title: Grafana：把散落各处的指标拼成一块能看懂的面板
date: 2026-11-07 19:30:00
updated: 2026-11-07 19:58:00
categories: 开源
tags:
- 开源项目
- 监控
- 可观测性
- DevOps
---

# Grafana

> 接 100+ 数据源的可视化层：Prometheus、Loki、Postgres、ClickHouse 都能画在同一块看板上

---

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [grafana/grafana](https://github.com/grafana/grafana) |
> | 语言 | TypeScript / Go |
> | 协议 | AGPL-3.0（企业版另有许可） |
> | 星标 | 约 7.7 万（2026 年口径） |
> | 形态 | 自托管 / 云版 |

## 它想解决什么问题

监控数据天生分散：指标在 Prometheus、日志在 Loki/ES、链路在 Tempo、业务数据在 Postgres。每个系统都有自己的查询界面，排障时要在多个标签页之间来回对照，最耗时间的恰恰是"把这些信号对齐到同一时间轴上"。

Grafana 就是那一层：**统一的查询与可视化前端**，数据留在各自系统里，不搬家。

## 核心机制拆解

**1. 数据源即插件。** 100+ 数据源接入，每种都有对应的查询编辑器；同一张面板可以混用不同数据源。

**2. 面板与变量。** 图表、表格、热力图、日志面板各自适配数据形态；模板变量让一块看板服务多个服务/集群。

**3. 告警统一。** 在 Grafana 里对多个数据源统一配置告警规则与通知渠道，不必在各系统分别维护。

**4. 仪表盘即代码。** 看板可导出为 JSON、纳入 Git 管理，配合 provisioning 实现可复现的部署。

## 安装与上手

```bash
docker run -d -p 3000:3000 --name grafana grafana/grafana-oss
```

打开 `http://localhost:3000`（初始 admin/admin），先加一个 Prometheus 数据源，再导入社区看板 ID 体验一下。

## 点评

**亮点**是"不绑定数据"的中立性：它不要求你把数据搬进来，只负责查询与呈现。这让它在异构技术栈里几乎无法被替代——不管后端用什么，前端总是它。

**局限**：AGPL 对商业分发有约束，部分高级功能（企业版）需要付费；看板做多了会变成"没人看的仪表盘墙"，治理靠人；查询压力直接打在数据源上，大范围时间查询容易把 Prometheus 拖慢；告警能力相对专用系统仍偏基础。

**适合人群**：搭建可观测体系的基础设施团队；需要给业务方交付看板的数据工程师；以及自建监控栈的 Homelab 玩家。

---

- 项目仓库：[https://github.com/grafana/grafana](https://github.com/grafana/grafana)
- 官方文档：[https://grafana.com/docs](https://grafana.com/docs)
