# 墨痕 · Hexo 极简现代中文主题 lovou

一个极简现代风、专为中文博客设计的 [Hexo](https://hexo.io) 主题 **lovou**。

在线演示：https://xfm0797.github.io/hexo-theme-lovou/

## 特性

### 设计与排版

- 极简现代设计，中文排版优化（系统字体栈、1.9 行高）
- 明 / 暗双主题：默认跟随系统，可手动切换并记忆（localStorage），无闪烁
- 响应式布局，适配手机与桌面；支持 `prefers-reduced-motion`
- 服务端代码高亮，内置明暗两套配色，零外部 JS 依赖、零追踪脚本

### 功能

- 宽屏文章页右侧悬浮目录（TOC，sticky 跟随滚动，可折叠）
- 字数统计与阅读时长（中英混合计数）
- 归档按年分组（年份吸顶）、分类页、标签云、上下篇导航、分页
- 评论区接入：Giscus / Waline / Gitalk / Disqus（四选一，按需启用）
- Sveltia CMS 在线管理：浏览器中写文章、传图片，保存即自动发布

## 快速开始

```bash
# 安装依赖
npm install

# 本地预览（http://localhost:4000）
npm run server

# 生成静态文件到 public/
npm run build

# 新建文章
npm run new "我的第一篇文章"
```

文章位于 `source/_posts/`，front-matter 支持 `title / date / categories / tags / toc / excerpt / comments`：

```yaml
---
title: 我的第一篇文章
date: 2026-09-26 10:00:00
categories: [随笔]
tags: [Hexo]
toc: true          # 可选，false 关闭本文目录
excerpt: 一句话摘要  # 可选，留空自动截取正文开头
comments: true     # 可选，false 关闭本文评论
---
```

## 目录结构

```
├── _config.yml              # 站点配置（标题、URL、高亮、部署路径等）
├── package.json             # 依赖与脚本（v1.1.0）
├── scaffolds/               # 新文章模板
├── source/
│   ├── _posts/              # 文章
│   ├── about/               # 关于页
│   ├── categories/ tags/    # 分类页 / 标签页
│   ├── images/              # CMS 上传图片的存放处
│   └── admin/               # Sveltia CMS 在线管理界面
├── oauth-gateway/           # GitHub OAuth 网关（Cloudflare Worker）
├── .github/workflows/       # GitHub Pages 自动部署
└── themes/lovou/            # lovou 主题
    ├── _config.yml          # 主题配置
    ├── languages/           # 简体中文 / English 语言包
    ├── scripts/             # 自定义辅助函数（字数统计等）
    ├── layout/              # EJS 模板
    └── source/              # 样式与脚本
```

## 主题配置

编辑 `themes/lovou/_config.yml` 可自定义：

| 选项 | 说明 |
| ---- | ---- |
| `menu` | 导航菜单（名称 + 链接） |
| `toc` | 文章页是否显示目录（宽屏展示在右侧；单篇可写 `toc: false`） |
| `word_count` | 是否显示字数与阅读时长 |
| `comments` | 评论系统：`enable: true` 后四选一 `type`，填写对应平台配置 |
| `license` | 文章底部版权声明（留空隐藏） |
| `footer` | 页脚附加文字，如 ICP 备案号（留空隐藏） |

### 评论系统

支持 Giscus / Waline / Gitalk / Disqus，按需启用其一：

```yaml
comments:
  enable: true
  type: giscus   # giscus / waline / gitalk / disqus
  giscus:
    repo: your-name/your-repo
    repo-id: xxx
    category: Announcements
    category-id: xxx
```

- 文章页默认开启评论，单篇 `comments: false` 关闭
- 自定义页面需在 front-matter 写 `comments: true` 开启
- Waline 已联动站点的明暗主题切换

## 部署

### GitHub Pages 自动部署（推荐）

仓库内置 `.github/workflows/deploy.yml`，推送到 `main` 分支即自动构建部署，也支持手动触发。

首次使用：

1. 仓库 **Settings → Pages**，Source 选择 **GitHub Actions**
2. 推送代码（或手动触发 workflow），等待 Actions 完成
3. 访问 `https://<用户名>.github.io/<仓库名>/`

> 子路径部署需在 `_config.yml` 加 `root: /<仓库名>/`（本仓库已配置）。绑定自定义域名时，`url` 改为对应域名并删除 `root` 行。

### 其他方式

`npm run build` 后将 `public/` 目录部署到任意静态托管（Vercel、Netlify、服务器等）。

## 在线管理（Sveltia CMS）

已集成 [Sveltia CMS](https://github.com/sveltia/sveltia-cms)——Decap CMS 的现代替代品（界面更快更精致、配置完全兼容、原生支持中文）。在浏览器中即可写文章、改页面、传图片，保存即提交到 `main` 分支，自动触发 GitHub Action 重建发布。

管理入口：`https://<站点地址>/admin/`

### 一次性配置（GitHub OAuth 授权）

CMS 通过 GitHub API 读写仓库，需要一个 OAuth 授权网关（仓库已提供现成代码 `oauth-gateway/worker.js`，基于 Cloudflare Worker 免费部署）：

1. **创建 GitHub OAuth App**（Settings → Developer settings → OAuth Apps → New）
   - Homepage URL：`https://xfm0797.github.io/hexo-theme-lovou/`
   - Callback URL：`https://<Worker域名>/callback`（第 2 步部署后得到）
2. **部署 Worker** 并设置密钥：
   ```bash
   npx wrangler deploy oauth-gateway/worker.js --name decap-oauth
   npx wrangler secret put OAUTH_CLIENT_ID
   npx wrangler secret put OAUTH_CLIENT_SECRET
   ```
3. **回填地址**：把 Worker 地址填入 `source/admin/config.yml` 的 `backend.base_url`

之后打开 `/admin/`，用 GitHub 账号登录即可在线写作：

- 文章与页面编辑（标题、日期、分类、标签、摘要、目录开关、Markdown 正文）
- 图片上传（自动保存到 `source/images`）
- 可选「编辑工作流」：在 `config.yml` 打开 `publish_mode: editorial_workflow`，文章先存草稿（PR），审核后再发布
- 若想换回 Decap CMS：把 `source/admin/index.html` 中的脚本地址换回 `https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js`，配置无需改动

## 许可

主题代码以 MIT 许可发布，可自由使用与修改。
