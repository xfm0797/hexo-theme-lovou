---
title: Appwrite：开源自托管的后端即服务，把 Firebase 那套搬回自己机房
date: 2026-11-07 19:30:00
updated: 2026-11-07 19:58:00
categories: 开源
tags:
- 开源项目
- 后端
- BaaS
- 自托管
---

# Appwrite

> 认证、数据库、存储、函数、消息一站齐：一条 Docker 命令拉起整套后端，数据留在自己服务器

---

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [appwrite/appwrite](https://github.com/appwrite/appwrite) |
> | 协议 | BSD-3-Clause |
> | 星标 | 约 5.7 万（2026 年口径） |
> | 形态 | 自托管 / 云版 |
> | 客户端 | Web / Flutter / Apple / Android / 服务端 SDK |

## 它想解决什么问题

前端团队做产品，最耗时的往往不是界面而是后端：注册登录、权限、文件上传、定时任务，每个都要写一遍，还要自己保证安全。

Firebase 解决了这个问题，但把数据交给了 Google，且在国内可用性堪忧。Appwrite 的目标是**开源自托管的等价物**：同样的能力集合，部署在你自己的机器上。

## 核心机制拆解

**1. 六大能力内置。** 认证（含 OAuth、MFA、会话）、数据库（文档型 + 权限）、存储（文件与图片处理）、函数（多语言运行时）、消息（推送/邮件）、站点托管。

**2. 权限下沉到文档。** 每条记录、每个文件都能配置读取/写入角色，前端直接查询不必经过自建 API——这是它最省事的一点。

**3. 客户端 SDK 齐全。** 各端 SDK 统一风格，实时订阅也在里面，接入成本低。

**4. 自托管友好。** 官方安装脚本或 Docker Compose 一键拉起，升级路径有文档，备份就是卷。

## 安装与上手

```bash
docker run -it --rm   --volume /var/run/docker.sock:/var/run/docker.sock   --volume "$(pwd)/appwrite:/usr/src/code/appwrite:rw"   appwrite/appwrite:latest install
```

安装向导跑完后访问控制台，建项目、拿 endpoint 与 projectId，SDK 就能用了。

## 点评

**亮点**是把"自托管 BaaS"这件事做完整了：不是几个服务的拼接，而是一套有一致权限模型与控制台的产品。对不想被云厂商绑定的团队，它省下的后端工作量相当可观。

**局限**：自托管意味着升级、备份、扩容全归你，出问题没有厂商兜底；文档型数据库对复杂事务与分析型查询不友好，业务长起来很可能还要加一个关系库；全家桶部署资源占用不低，小机器跑起来吃力；云版与自托管版本能力偶有差异。

**适合人群**：想快速验证产品的前端/全栈团队；有数据合规要求、必须自托管的企业；以及从 Firebase 迁出、找等价替代的项目。

---

- 项目仓库：[https://github.com/appwrite/appwrite](https://github.com/appwrite/appwrite)
- 官方文档：[https://appwrite.io/docs](https://appwrite.io/docs)
