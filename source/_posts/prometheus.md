---
title: 开源项目 Prometheus：云原生监控的事实标准，拉取模型与 PromQL 的十年级胜利
date: 2026-11-07 19:30:00
updated: 2026-11-07 19:43:00
categories: 开源
tags:
- 开源项目
- 监控
- 时序数据库
- 云原生
- Go
---

# Prometheus

> CNCF 毕业项目：用多维数据模型 + PromQL + pull 采集，把动态环境下的监控问题解成一组正交的小问题

---

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [prometheus/prometheus](https://github.com/prometheus/prometheus) |
> | 语言 | Go |
> | 协议 | Apache-2.0 |
> | 归属 | CNCF 毕业项目 |
> | 定位 | 指标监控系统 + 内置时序数据库 |
> | 配套 | Grafana 做面板、Alertmanager 做告警分发 |

## 它想解决什么问题

微服务与容器化普及之后，监控对象从"几台固定机器"变成了"成百上千个随时生灭的实例"。传统 push 式监控（agent 主动上报、中心端手工登记主机）在这种环境里立刻失效：实例的 IP 每天在变，主机清单永远追不上现实。

Prometheus 的判断是：**与其维护一份永远过期的目标清单，不如让监控端主动去问"你是谁、你还好吗"**，再靠服务发现自动补齐目标。这个选择看似只是 pull 与 push 之别，实际上决定了整套系统在动态环境里的可用性。

## 核心机制拆解

**1. 多维数据模型。** 每条时序由「指标名 + 一组键值标签」唯一定义，天然适合切片与聚合。`http_requests_total{service="api", status="500"}` 这样的结构，让"按服务维度、按状态码维度"都变成一次查询参数，而不是新建一批指标。

**2. PromQL。** 这是它真正的护城河。速率、分位数、同比环比这类计算在 PromQL 里是原生表达式，而不是"导出到别处再算"。会用之后，绝大多数监控问题的表达成本骤降。

**3. Pull 采集 + Pushgateway 补位。** 按配置间隔主动抓取目标指标；批处理任务这种"跑完就退出、来不及被抓"的场景，通过 Pushgateway 推送。一个模型覆盖两类负载，没有引入第二套协议。

**4. 服务发现。** 支持 Kubernetes、Consul、文件、HTTP 等多种服务发现与静态配置。这层是它能在 K8s 时代成为默认选项的直接原因——目标清单由平台自己吐出，不再人工维护。

**5. 告警与可视化。** 通过规则表达式评估触发告警，交给 Alertmanager 分发；并支持分级与水平联邦，让单机容量问题用"多实例 + 联邦"扩展，而不是硬塞进一台机器。

## 安装与上手

```bash
# 容器化最快上手
docker run --name prometheus -d -p 127.0.0.1:9090:9090 prom/prometheus
```

访问 `http://localhost:9090` 即是内置表达式浏览器。最小 `prometheus.yml`：

```yaml
scrape_configs:
  - job_name: "prometheus"
    static_configs:
      - targets: ["localhost:9090"]
```

也可下载官方预编译二进制，或用 `make build` 从源码构建。

## 点评

**亮点**是"简单且正交"的设计哲学：数据模型、查询语言、采集模型、告警分发各自独立，每一块都能单独理解、单独替换。这种分法让它在十年里持续吸收新需求而不变形——从单机到 K8s，从指标到 exemplar 与 OpenTelemetry 兼容，都没有被迫重写核心。

**局限**必须承认：它是**指标**系统，不是日志或链路追踪系统，三件套要各自部署、各自维护；本地存储为单机设计，长期留存与全局查询需要 Thanos / Mimir / VictoriaMetrics 这类外挂方案，选型复杂度不低；高基数标签是经典陷阱——一张 `user_id` 标签就能把内存打爆；PromQL 表达力强但学习曲线陡，团队里通常只有一两个人真正精通；此外 pull 模型要求目标可被网络访问，跨网段/跨云场景需要额外代理。

**适合人群**：K8s 与容器平台的监控负责人；需要观测黄金指标（延迟、流量、错误、饱和度）的微服务团队；以及希望自建、可控、不把监控账单交给 SaaS 的工程组织。

它不是最省心的监控方案，但很可能是最不会把你锁死的那个——这大概就是它成为"事实标准"的真正原因。

---

- 项目仓库：[https://github.com/prometheus/prometheus](https://github.com/prometheus/prometheus)
- 官方文档：[https://prometheus.io/docs](https://prometheus.io/docs)
