---
title: lovou — 极简现代中文 Hexo 博客主题
date: 2026-09-27 10:25:00
categories: 开源
tags:
- Hexo
- 博客主题
- Cloudflare Pages
- Open Graph
- Sveltia CMS
---

# lovou 主题

> 极简现代风、专为中文博客设计的 Hexo 主题 —— 本站正在使用
>
> 仓库：<https://github.com/xfm0797/hexo-theme-lovou> · 演示：<https://xfm0797.github.io/hexo-theme-lovou/>

一个注重中文排版与阅读体验的 Hexo 主题，零外部 JS 依赖、零追踪脚本，同时保持完整的现代博客功能。

## ✨ 功能特性

- **中文排版优化**：系统字体栈、1.9 行高，极简现代设计
- **明暗双主题**：跟随系统、手动切换并记忆，无闪烁
- **右侧悬浮目录**：宽屏 sticky 跟随滚动，可折叠
- **社交分享就绪**：Open Graph / Twitter Cards 协议 + 内置默认分享图 + 文末分享按钮（微信/微博/X/Telegram/复制链接）
- **友链自动提取**：构建时自动抓取友链站点的 OG 信息，只填链接即可自动补全名称/简介/头像
- **评论系统**：Giscus / Waline / Gitalk / Disqus 四选一
- **Sveltia CMS 在线管理**：浏览器写文章、传图片，保存即自动发布
- 服务端代码高亮、归档按年分组、卡片式友链页、响应式布局

## 🛠 技术栈

Hexo · EJS · 原生 CSS / JavaScript（零依赖）

## 🚀 部署

支持 **GitHub Pages**（内置 Actions 工作流）与 **Cloudflare Pages**（内置环境自适应脚本，自动处理根路径与子路径差异）双平台一键部署，也适配 Vercel / Netlify 等任意静态托管。

```bash
npm install
npm run server   # 本地预览
npm run build    # 生成 public/
```
