---
title: 开源项目 OpenShell：NVIDIA 开源的 Agent 安全运行时，沙箱、凭据与策略的隔离层
date: 2026-10-16 20:38:00
updated: 2026-10-16 20:38:00
categories: 开源
tags:
- 开源项目
- AI Agent
- Rust
- 安全
- NVIDIA
---

# OpenShell

> NVIDIA 开源的 Agent 安全运行时，沙箱、凭据与策略的隔离层

---

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [NVIDIA/OpenShell](https://github.com/NVIDIA/OpenShell) |
> | 语言 | Rust 为主（另有 Python / Go SDK、Nix、Snap 打包） |
> | Stars | 约 1.5 万（2026 年 10 月 GitHub 月度趋势在榜） |
> | 协议 | 本期抓取未获取到明确标注，使用前请以仓库 LICENSE 文件为准 |
> | 动态 | 1,781 次提交，仍在高频迭代（最新提交 2026-10-16） |
> | 定位 | OpenShell is the safe, private runtime for autonomous AI agents |

## 它想解决什么问题

自主 Agent 要干活，就得有执行环境；而“给 Agent 一台真机”意味着把凭据、文件、网络暴露给一个会自己决策的程序。OpenShell 切入的正是这个断层：**给 Agent 一个专门的运行时**，让沙箱、凭据、访问策略在基础设施层面收口，而不是靠 prompt 里写“请不要乱来”。

## 核心机制拆解

**1. 多运行时沙箱。** 同时支持 VM（libkrun 虚拟化）、Docker、Podman 三种驱动，VM 模式下通过 virtiofs 支持宿主机目录绑定挂载。按隔离强度选运行时——日常任务用容器，高危操作用 microVM，同一套接口切换。

**2. 凭据注入而非暴露。** Provider profile 机制把 API key 以 bearer token 形式**仅在批准的主机与路径上注入**，沙箱内部不持有原始凭据。Agent 即使被诱导访问错误地址，也拿不到可用凭据——这是把“密钥管理”从应用层下沉到运行时层。

**3. 策略化访问控制。** 从提交记录看，策略管理、token 授权失败上报、mTLS、受信 CA bundle 都在持续完善，方向是把“Agent 能连哪、能做什么”变成显式策略，而非默认放行。

**4. 部署形态齐全。** Kubernetes Helm charts、Snap 包（用户态/系统态网关两种模式）、Fedora/RPM CI 一致性检查，说明它瞄准的是生产部署而非 demo。

**5. 多语言 SDK。** Python 与 Go 客户端 SDK 采用 functional options 模式，便于在现有流水线中嵌入。

## 点评

**亮点**是问题选得准：Agent 安全目前大量讨论集中在“模型对齐”，但工程现场更常见的泄露是**凭据与网络边界失守**。OpenShell 把凭据注入、策略控制、多级沙箱做成 runtime 的一等功能，属于给 Agent 基建补最短的那块板。NVIDIA 亲自入场也说明：随着 Agent 进入生产，厂商开始争抢“执行层”这个入口。

**局限**：项目仍在快速演进（日均级提交），API 稳定性需要观望；策略体系的完整度要对照文档逐项验证；协议信息本期未能确认，生产采用前务必核对 LICENSE——对商业产品而言，运行时的协议条款往往比功能更重要。

适合人群：需要在受控环境里跑自主 Agent 的 infra 与平台团队。如果你现在的做法是“容器 + 环境变量塞 key”，OpenShell 的凭据注入与策略层值得认真评估。

---

- 项目仓库：[https://github.com/NVIDIA/OpenShell](https://github.com/NVIDIA/OpenShell)
