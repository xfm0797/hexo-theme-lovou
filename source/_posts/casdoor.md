---
title: Casdoor：把单点登录做成一个可视化控制台，开源 IAM 的省心选项
date: 2026-11-07 19:30:00
updated: 2026-11-07 19:58:00
categories: 开源
tags:
- 开源项目
- 认证
- IAM
- SSO
---

# Casdoor

> 一个界面管完 OAuth、OIDC、SAML、LDAP、微信与 GitHub 登录：自托管 IAM，配置即生效

---

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [casdoor/casdoor](https://github.com/casdoor/casdoor) |
> | 语言 | Go / React |
> | 协议 | Apache-2.0 |
> | 星标 | 约 1.4 万（2026 年口径） |
> | 形态 | 自托管服务 + 管理控制台 |

## 它想解决什么问题

公司里但凡有三个以上系统，账号就一定会乱：各自建用户、各自存密码、离职时漏删一个就是安全事故。上 SSO 又要对接 Keycloak 这类产品，配置门槛不低。

Casdoor 的定位是**可视化的统一认证中心**：把协议与身份源接进控制台，点几下就能给新系统接上登录。

## 核心机制拆解

**1. 协议覆盖面广。** OIDC / OAuth 2.0 / SAML / CAS / LDAP 都支持，老系统与新应用能挂在同一套身份上。

**2. 身份源丰富。** 微信、GitHub、Google、企业微信、钉钉等社交与办公登录开箱可配，不必自己写回调。

**3. 可视化配置。** 应用、组织、用户、角色、权限都在控制台里，改完立即生效，少了改配置文件重启的循环。

**4. 多租户与审计。** 支持组织隔离与登录审计，中型团队够用。

## 安装与上手

```bash
docker run -p 8000:8000 casbin/casdoor
```

打开 `http://localhost:8000`，用初始管理员登录，先建一个 organization，再添加 application 拿 client id/secret。

## 点评

**亮点**是"省心"这件事被做成了产品力：相比 Keycloak 那套复杂的 realm/client 概念，Casdoor 的界面让不熟悉 IAM 的工程师也能在一小时内接上一个应用。

**局限**：深度定制（自定义登录流程、复杂策略引擎）不如老牌 IAM 灵活；高并发与大规模用户量下的性能缺少广泛验证；文档以快速上手为主，协议细节与故障排查资料偏少；作为认证中心，它自己就是单点，高可用部署要提前规划。

**适合人群**：需要统一登录的中小团队；给内部多个系统接 SSO 的运维/后端；以及想快速验证 IAM 方案的架构师。

---

- 项目仓库：[https://github.com/casdoor/casdoor](https://github.com/casdoor/casdoor)
- 官网：[https://casdoor.org](https://casdoor.org)
