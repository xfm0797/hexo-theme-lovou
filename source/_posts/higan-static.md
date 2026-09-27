---
title: Higan-Static — 极简零依赖静态博客系统
date: 2026-09-27 10:20:00
categories: 开源
tags:
- 静态博客
- GitHub Actions
- Python
- 零依赖
- 自动构建
---

# Higan-Static

> 轻量静态博客系统：只管写 Markdown，其余全部交给 GitHub Actions
>
> 仓库：<https://github.com/xfm0797/Blog>

Higan-Static 是一套「极简主义」的博客方案：没有复杂框架、没有本地环境要求，把文章丢进 `posts/` 目录提交即自动构建发布——甚至可以直接在 GitHub 网页上写作。

## ✨ 功能特性

- **纯 Markdown 写作**：文章放进 `posts/` 目录，无需任何其他操作
- **自动构建**：GitHub Actions 自动生成首页索引 `posts.json`、站点地图 `sitemap.xml` 与每篇文章独立页面
- **Front Matter 元数据**：`title / date / category / tags / top`（置顶，数字越大越靠前）
- **「说说」模式**：文件名固定为 `YYYY-MM-DD-说说.md`，像发社交媒体动态一样发短内容
- **评论区**：集成 Waline
- 前端首页为轻量 SPA，秒开

## 🛠 技术栈

Python 构建脚本（`build.py`，依赖仅 pyyaml + markdown）· GitHub Actions · 原生 HTML/JS

## 🚀 部署

1. Fork 仓库，把文章放进 `posts/`
2. 仓库 Settings → Actions → General → Workflow permissions 设为 **Read and write**
3. 修改 `build.py` 与 workflow 中的域名，提交即自动构建

构建产物为纯静态文件，可直接托管到 **Cloudflare Pages**、GitHub Pages 或任何静态服务器。
