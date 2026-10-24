---
title: 开源项目 Supabase：113K Star 的 Postgres 开发平台，从后端全家桶到 AI 应用底座
date: 2026-10-22 20:33:00
updated: 2026-10-22 20:33:00
categories: 开源
tags:
- 开源项目
- Supabase
- PostgreSQL
- BaaS
- 后端开发
---

# Supabase

> 以 PostgreSQL 为核心的开源后端全家桶：数据库、认证、存储、实时订阅、边缘函数开箱即用

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [supabase/supabase](https://github.com/supabase/supabase) |
> | 定位 | Postgres 开发平台，为 Web / 移动 / AI 应用提供专用数据库与全套后端能力 |
> | 主要语言 | TypeScript（Node.js + Deno 运行时） |
> | Stars / Forks | 113,282 / 16,989（截至 2026-10-22） |
> | 许可证 | Apache-2.0 |
> | 最新自托管版本 | 0.8.3（2026-10-16） |

## 它想解决什么问题

"我想做个产品，但不想配服务器、写后端、管数据库。"这个需求养活了一类产品——BaaS（Backend as a Service）。Firebase 曾是这个名字的代名词，而开源的答案属于 Supabase：一个以 PostgreSQL 为核心的后端开发平台，把数据库、认证、存储、实时订阅、边缘函数打包成开箱即用的全家桶。11.3 万 Stars 让它稳居"开源替代品"赛道第一梯队。

## 为什么是 Postgres，而不是"另一个 Firebase"

Supabase 的创始故事带着一点叛逆：Firebase 很好用，但它是黑盒、绑定谷歌、数据锁死在 MongoDB 系。Supabase 选择拥抱 Postgres——世界上最流行的开源关系数据库。这个决定带来三个连锁优势：

**第一，SQL 即后端。** 表结构、行级安全策略（RLS）、触发器、存储过程全在 Postgres 里定义，前端通过自动生成的 REST/GraphQL API 访问。复杂查询不必绕过后端，一条 SQL 搞定。

**第二，生态即插件。** Postgres 的扩展生态直接为 Supabase 所用：pgvector 提供向量检索、PostGIS 提供地理查询、pg_cron 提供定时任务。你的数据库同时是关系库、向量库、GIS 库——这也是它成为 AI 应用底座的原因。

**第三，无供应商锁定。** Apache-2.0 开源 + 完整自托管能力，数据随时可以搬走。

## 快速上手

```bash
npx create-supabase-app my-app     # 脚手架
# 或本地开发栈
npx supabase init && npx supabase start
```

云端免费层即可起步；自托管用 Docker Compose，最新版本 0.8.3。

## 点评

**亮点**：押中 Postgres 是过去十年开源基础设施最成功的判断之一——pgvector 让它顺势成为 AI 应用默认后端，RAG/Agent 项目的标配；认证、存储、实时、边缘函数的完整度与开发者体验一流；11 万星 + Apache-2.0，生态位无可撼动。

**局限**：复杂场景仍逃不掉"总有一天要写真正的后端"；自托管的运维复杂度比 Firebase 高；云端定价在规模上去后需要精算。

适合人群：全栈与独立开发者快速出产品、AI 应用团队要一个带 pgvector 的托管 Postgres、以及所有想逃离 Firebase 锁定的团队。
