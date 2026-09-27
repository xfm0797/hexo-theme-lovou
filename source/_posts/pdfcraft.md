---
title: PDFCraft — 90+ 工具的隐私优先在线 PDF 工具箱
date: 2026-09-27 10:10:00
categories: 开源
tags:
- PDF 工具
- Cloudflare Pages
- Next.js
- WebAssembly
- 数据隐私
---

# PDFCraft

> 免费且注重隐私的 PDF 工具集，90+ 工具，完全在浏览器本地运行
>
> 仓库：<https://github.com/xfm0797/pdfcraft>

PDFCraft 是一个**文件永不上传**的 PDF 工具箱：所有处理均在浏览器本地完成（WebAssembly 接近原生性能），隐私安全拉满，特别适合处理含敏感信息的文档。

## ✨ 功能特性

- 🔒 **100% 私密** — 全部客户端处理，文件不离开设备
- 🚀 **快速** — 基于 WASM，接近原生性能
- 🛠 **90+ 工具**，覆盖 PDF 处理全场景：

| 分类 | 数量 | 代表工具 |
| ---- | ---- | ---- |
| 组织管理 | 27 | 合并、拆分、OCR、书册排版、对比 |
| 编辑批注 | 19 | 编辑、签名、水印、页码、表单 |
| 转为 PDF | 22 | Word/Excel/PPT/EPUB/Markdown 转换 |
| PDF 转出 | 13 | 转 JPG/PNG/DOCX/Excel/PPT |
| 优化修复 | 8 | 压缩、修复、线性化 |
| PDF 安全 | 6 | 加密、脱敏、去元数据、权限 |

- 🔄 **工作流编辑器（Beta）** — 可视化节点式拖拽编排，链式处理、23+ 预设模板、批处理
- 🌐 多语言界面（含中文）

## 🛠 技术栈

Next.js 15（App Router）· TypeScript 5 · Tailwind CSS 4 · PDF.js · pdf-lib · PyMuPDF (WASM) · Zustand

## 🚀 部署

项目为**静态导出**（`output: 'export'`），构建产物 `out/` 可托管到任意静态平台，一行命令部署到 Cloudflare Pages：

```bash
npm run build
wrangler pages deploy out
```

内置安全头、缓存策略与 WASM MIME 支持，Pages 部署开箱即用。
