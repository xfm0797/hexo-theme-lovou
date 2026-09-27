---
title: NaviHive — 基于 Cloudflare Workers + D1 的现代个人导航站
date: 2026-09-27 10:00:00
categories: 开源
tags:
- Cloudflare Workers
- D1 数据库
- 导航站
- React
- TypeScript
---

# NaviHive

> 现代化个人导航站 / 网站书签导航管理系统 · 零成本部署在 Cloudflare Workers
>
> 仓库：<https://github.com/xfm0797/Cloudflare-Navihive>

NaviHive 是一个基于 **Cloudflare Workers 免费套餐**运行的个人导航站，用边缘计算替代传统服务器，全球 CDN 加速，**零成本**即可拥有一个快速、安全的私人书签导航页。

## ✨ 功能特性

- **智能分组** — 按类别组织网站，支持无限分组，拖拽排序（DND Kit）
- **高度自定义** — 标题、Logo、背景图、蒙版透明度、自定义 CSS
- **数据管理** — JSON 格式一键备份恢复，支持智能合并
- **企业级安全** — JWT + bcrypt 加密、HttpOnly Cookie 防 XSS、登录速率限制、SSRF 防护
- **访客模式** — 免登陆只读访问公开内容，每个分组/站点可独立设置公开或私密
- **深色 / 浅色主题**，完美响应式适配移动端

## 🛠 技术栈

| 层级 | 技术 |
| ---- | ---- |
| 前端 | React 19 · TypeScript 5.7 · Material UI 7 · Tailwind CSS 4 · Vite 6 |
| 后端 | Cloudflare Workers（边缘计算）· Cloudflare D1（分布式 SQLite） |
| 安全 | JWT + bcrypt |

## 🚀 部署（Cloudflare Workers）

- **新手**：Fork 仓库 → 点击 "Deploy to Cloudflare Workers" 一键部署 → 创建 D1 数据库 → 配置环境变量（账号密码哈希、JWT 密钥）→ 绑定 D1 执行初始化 SQL
- **开发者**：`wrangler login` → `wrangler d1 create navigation-db` → `pnpm run deploy`

支持自定义域名，Cloudflare Custom Domains 自动配置 DNS。

> 免费套餐即可完整运行，无需服务器、无需数据库托管，是 Workers + D1 组合的经典实践。
