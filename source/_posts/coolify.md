---
title: 开源项目 Coolify：6.4 万 Star 的自托管 PaaS，"永远免费"的 Heroku/Vercel 替代品
date: 2026-10-25 20:36:00
updated: 2026-10-25 20:36:00
categories: 开源
tags:
- 开源项目
- Coolify
- 自托管
- PaaS
- DevOps
---

# Coolify

> 只要有 SSH 连接，VPS、裸金属服务器甚至树莓派都能变成你的私有云平台

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [coollabsio/coolify](https://github.com/coollabsio/coolify) |
> | 语言 | PHP |
> | Stars | 63,863（2026-10-25），Forks 5,752 |
> | 协议 | Apache-2.0 |
> | 状态 | 2021-01-25 建库，五年持续运营 |
> | 出品 | coolLabs.io（另有付费 Coolify Cloud） |

## 它想解决什么问题

云平台的便利人人都爱，但"便利"的定价权不在你手里。按席位收费、按构建分钟收费、按带宽收费——账单永远比预期多一页。

Coolify 是 Heroku、Netlify、Vercel 的开源自托管替代品：把"git push 即上线"的体验搬到你自己的服务器上，口号简单粗暴——**Open source & free forever**。

## 核心机制拆解

**1. 部署形态全都要。** 从 GitHub、GitLab、Bitbucket、Gitea 构建，支持 Nixpacks、Railpack、Dockerfile、Docker Compose 或预构建镜像——不是逼你迁移到它的构建体系，而是兼容你已有的。

**2. 360+ 一键服务。** 托管数据库和各类中间件一条龙，持久化存储和凭证自动生成。对 Homelab 玩家来说，这一项就等于省掉了几十个 compose 文件的维护工作。

**3. 自动化与运维是一等公民。** 每次 Git push 自动部署、PR 预览环境、Webhook、回滚到保留镜像；自定义域名、自动 HTTPS、反向代理、健康检查、容器网络；多服务器管理、部署与运行时日志、容器终端、资源监控；Dashboard、API、CLI、MCP 与团队权限控制全都有。

**4. "你的配置留在你的服务器上"。** 这是它哲学里最重要的一条：配置不跑在 Coolify 的云上。哪天你不用 Coolify 了，正在跑的资源继续正常工作、继续可管理——没有锁定，没有"导出迁移"的噩梦。自托管版完全免费；不想维护控制面的可以选付费的 Coolify Cloud（高可用 + 更少维护），开源版与云版之间没有功能墙。

## 安装与上手

```bash
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash
```

- 项目仓库：<https://github.com/coollabsio/coolify>

## 点评

**亮点**是"不锁定"的工程承诺。同类项目常见的问题是控制面本身成为新的依赖，而 Coolify 明确把配置留在服务器上，让退出成本接近零——这比任何功能清单都更能说服运维。

**局限**：五年老项目的功能面很宽，初次上手的信息密度偏高；PHP 技术栈对想二次开发的团队有一定门槛；自托管意味着证书、备份、升级都要自己负责，省下的是账单，不是工作量。

适合人群：想逃离 PaaS 账单的个人开发者与小团队（一台 VPS 就是你的 Heroku）；数据主权敏感、要求数据库和凭证不出自己机器的业务；需要 360+ 一键服务的 Homelab 玩家。

同场竞技：本期另一篇写过的 Dokploy（37.9K Star）定位类似，Coolify 的差异在于更久的历史（2021 vs 2024）、更大的社区和更全的一键服务生态——两者共同印证了"Vercel 体验 + 自有服务器"正在成为中小团队的新默认选项。
