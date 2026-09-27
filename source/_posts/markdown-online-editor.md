---
title: Arya — 功能完备的在线 Markdown 编辑器
date: 2026-09-27 10:15:00
categories: 开源
tags:
- Markdown
- Cloudflare Pages
- Vue
- Vditor
- 在线编辑器
---

# Arya · 在线 Markdown 编辑器

> 基于 Vue2 与 Vditor 打造的免费在线 Markdown 编辑器
>
> 仓库：<https://github.com/xfm0797/markdown-online-editor>

市面上的 Markdown 编辑器或多或少存在功能不全或高级功能收费的问题，Arya 结合 Vditor 的强大能力，做了一款完全免费的在线编辑器。

## ✨ 功能特性

- **图表支持**：流程图、甘特图、时序图、任务列表、Echarts 图表、五线谱
- **智能转换**：粘贴 HTML 自动转为 Markdown
- **多种编辑模式**：所见即所得（`⌘⇧M`）、即时渲染（`⌘⌥7`）、分屏渲染（`⌘⌥8`）
- **导出**：带样式的 PDF / PNG / JPEG，复制到微信公众号
- **PPT 预览**：注入 Reveal.js，`---` 定义水平幻灯片、`--` 定义垂直幻灯片
- **实用细节**：Emoji 插入、本地存储防丢失、字符统计、格式化语法、导入本地 `*.md`

## 🛠 技术栈

Vue 2 · [Vditor](https://github.com/Vanessa219/vditor) · Echarts · Reveal.js

## 🚀 部署（Cloudflare Pages 零服务器托管）

Fork 仓库后绑定 Cloudflare Pages 即可：

- 构建命令：`yarn install && yarn build`
- 输出目录：`dist`
- 环境变量：`NODE_VERSION=18`、`NODE_OPTIONS=--openssl-legacy-provider`

也提供 Docker 镜像（`docker run -d -p 8866:80 nicejade/markdown-online-editor`）与 PM2 部署方式。
