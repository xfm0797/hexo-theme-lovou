---
title: ip-geoaddress-generator — 基于 IP 的真实地址生成器
date: 2026-09-27 10:05:00
categories: 开源
tags:
- Cloudflare Pages
- Next.js
- TypeScript
- IP 地理定位
- Tailwind CSS
---

# ip-geoaddress-generator

> 基于 IP 的真实地址生成器 · 在线地址：<https://ip.lovou.qzz.io>
>
> 仓库：<https://github.com/xfm0797/ip-geoaddress-generator>

根据 IP 地址生成真实感的随机地址信息，聚合多个公开 API 提供完整的虚拟资料，适合开发测试、学习研究场景使用。

## ✨ 功能特性

- **自动检测**当前 IP 地址并生成对应地区信息
- 支持手动输入 IP 或自选地区生成
- 生成完整信息：姓名、电话、国家、省/州、城市
- **Google 地图**上直观显示生成的地址位置
- 一键复制各项信息；保存、搜索、删除地址，可导出 JSON
- 响应式设计，支持浅色 / 深色主题

## 🛠 技术栈

- **Next.js**（App Router）+ **TypeScript**
- **Tailwind CSS**
- 依赖 API：ipify（IP 检测）、ipapi（地理信息）、RandomUser（随机身份）、OpenStreetMap（地理编码）

## 🚀 部署

**Cloudflare Pages**（当前线上运行方式）：静态导出后由 Pages 全球边缘网络分发，速度极快。

也支持 Docker 一键运行：

```bash
docker run -p 3000:3000 guoogaii/ip-geoaddress-generator:latest
```

> ⚠️ 本工具仅供教育、开发测试与娱乐用途，生成的信息均为随机虚构，请勿用于任何违法用途。
