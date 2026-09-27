---
title: x-admin 基于 PHP + SQLite3 的轻量级动静分离内容管理系统
date: 2026-09-26 20:57:59
categories: 开源
tags: 
- 内容管理
- 动静分离
- 轻量级
---

# X-admin

> 基于 PHP + SQLite3 的轻量级动静分离内容管理系统

X-admin 是一套开源、免费、可自由修改分发的轻量级 CMS。核心设计理念是**动静分离**：后台使用 PHP 动态管理内容，前端由 Nginx/Apache 直接输出静态 HTML，完全不经过 PHP，兼顾管理便捷与访问性能。

- **极致轻量**：单文件 SQLite 数据库，零配置，上传即用
- **动静分离**：后台 PHP 管理，前端纯静态 HTML 直出
- **模板化**：原生 PHP 模板引擎，支持多主题切换
- **插件化**：钩子系统，支持功能扩展
- **智能增量**：发布/更新/删除内容时自动增量生成受影响的静态页
- **纯静态搜索**：前端 JS 加载索引文件做全文检索，无需 PHP
- **开源免费**：MIT 协议

---

## 目录结构

```
项目根目录（站点根，静态直出）
├── index.html                  首页
├── article/                    文章静态页  {slug}.html
├── category/                   分类列表页  {slug}.html
├── tag/                        标签列表页  {slug}.html
├── page/                       单页静态页  {slug}.html
├── assets/                     主题资源（css/js/img）
├── uploads/                    上传文件（按年月归档）
├── search.html                 搜索页（JS 客户端检索）
├── search-index.json           搜索索引
├── rss.xml                     RSS 订阅
├── sitemap.xml                 站点地图
├── robots.txt                  爬虫规则
├── .htaccess                   Apache 安全配置
├── .gitignore                  Git 忽略规则
├── .github/workflows/deploy.yml  GitHub Pages 自动部署工作流
├── README.md                   项目说明（本文件）
├── CHANGELOG.md                更新记录
└── x-admin/                    PHP 代码子目录
    ├── config.php              全局配置（路径常量、站点信息）
    ├── index.php               入口（跳转后台/安装）
    ├── build.php               CLI 构建脚本（CI/本地预览，输出 dist/）
    ├── .htaccess               代码目录安全配置
    ├── admin/                  后台管理
    │   ├── _init.php           后台公共初始化（会话、CSRF、侧栏）
    │   ├── install.php         安装脚本
    │   ├── index.php           仪表盘
    │   ├── article-edit.php    文章编辑
    │   ├── article-delete.php  文章删除
    │   ├── page-edit.php       单页编辑
    │   ├── articles.php        文章列表
    │   ├── categories.php      分类管理
    │   ├── tags.php            标签管理
    │   ├── menus.php           导航菜单管理
    │   ├── links.php           友情链接
    │   ├── uploads.php         文件管理
    │   ├── generate.php        静态生成
    │   ├── settings.php        系统设置
    │   ├── database.php        数据库管理
    │   ├── themes.php          主题管理
    │   ├── plugins.php         插件管理
    │   ├── help.php            帮助文档
    │   ├── api/upload.php      文件上传接口
    │   └── assets/             后台资源（admin.js/admin.css）
    ├── system/                 核心系统
    │   ├── bootstrap.php       启动引导（setting 缓存、autoload）
    │   ├── Database.php        数据库封装（PDO + SQLite）
    │   ├── Auth.php            认证与安全（登录/CSRF/速率限制）
    │   ├── Hook.php            钩子系统
    │   ├── Generator.php       静态生成器（全量/增量/搜索索引）
    │   ├── helpers.php         辅助函数
    │   └── schema.sql          数据库 schema
    ├── themes/                 主题模板
    │   └── default/            默认主题
    │       ├── header.php  footer.php  index.php
    │       ├── article.php  page.php  single.php
    │       ├── category.php  tag.php  search.php
    │       ├── functions.php  style.css
    ├── plugins/                插件
    │   └── example/            示例插件
    ├── data/                   SQLite 数据库（禁止 web 访问）
    │   └── xadmin.db
    └── nginx.conf.example      Nginx 配置示例
```

---

## 核心功能

| 模块 | 说明 |
|------|------|
| 文章管理 | Markdown 富文本编辑器，支持图片/附件上传（选择、拖拽、粘贴），草稿/发布，SEO 标题/描述/关键词 |
| 单页管理 | 独立单页（关于我们、联系方式等），与文章分离管理 |
| 分类管理 | 多级分类，分类页含分页 |
| 标签管理 | 多标签关联，标签页含分页 |
| 导航菜单 | 自定义菜单项，支持内部路径/外部链接/新窗口打开/父子层级/排序/显隐 |
| 友情链接 | 链接名称、URL、描述、排序 |
| 文件上传 | 图片/附件按年月归档，安全文件名，MIME 校验，后台文件管理 |
| 主题模板 | 原生 PHP 模板引擎，多主题切换，主题 functions.php 钩子 |
| 插件系统 | 钩子（hook）机制，示例插件演示 |
| 静态生成 | 全量生成 / 智能增量生成 / 删除自动清理 |
| 站内搜索 | 纯静态前端搜索，JS 加载 search-index.json 全文检索 |
| SEO | sitemap.xml、rss.xml、robots.txt、每页独立 meta |
| 数据库管理 | 在线备份、优化、SQL 执行 |
| 系统设置 | 站点信息、分页、主题、开关等 |

---

## 快速开始

### 环境要求
- PHP 7.4+（推荐 8.x），扩展：`pdo_sqlite`、`mbstring`、`fileinfo`
- Apache（带 mod_rewrite）或 Nginx
- 无需 MySQL，无需手动建库

### 安装步骤
1. 上传整个项目目录到虚拟主机或本地 PHP 环境。
2. 确保以下目录可写：`x-admin/data/`、**站点根目录**、`uploads/`。
3. 浏览器访问 `/x-admin/admin/install.php` 完成安装（自动建库、写入默认数据）。
4. 使用默认账户 `admin / admin888` 登录后台，**立即在【系统设置】修改密码**。
5. 在【系统设置】填写站点 URL（指向站点根目录，如 `https://example.com`）。
6. 撰写文章并保存 → 系统自动增量生成静态页 → 访问站点根目录查看效果。

---

## 部署说明

### 核心理念
**动静分离**：后台 `x-admin/admin/` 走 PHP，前端站点由**站点根目录**下的静态 HTML 直出，**不经过 PHP**。静态文件结构：`index.html`（首页）、`article/{slug}.html`（文章）、`category/{slug}.html`（分类）、`tag/{slug}.html`（标签）、`page/{slug}.html`（单页）、`search.html`（搜索页）、`search-index.json`（搜索索引）、`sitemap.xml`、`rss.xml`、`robots.txt`。上传文件在 `uploads/`，数据库与代码在 `x-admin/` 子目录。

### Apache
站点根目录已自带 `.htaccess`：设置默认首页、保护 `x-admin/data/`、`.db` 等敏感文件。静态文件由根目录直出，开箱即用。

### Nginx
参考 `x-admin/nginx.conf.example`：站点根 `/` 指向项目根，静态文件 `try_files` 命中；`/x-admin/admin/` 交给 PHP-FPM；禁止访问 `/x-admin/data/`、`/x-admin/system/`、`.db` 等。最小配置：

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/x-admin;
    index index.html;

    location / { try_files $uri $uri/ /index.html; }

    location /x-admin/admin/ {
        # fastcgi_pass 127.0.0.1:9000;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ^~ /x-admin/data/   { deny all; }
    location ^~ /x-admin/system/ { deny all; }
    location ~ \.(db|sqlite|log)$ { deny all; }
}
```

### 最简部署（无 Rewrite）
不支持伪静态的免费主机，直接将 web 根指向项目根目录，访问 `/index.html`、`/article/xxx.html`；后台通过 `/x-admin/admin/` 访问。

### GitHub Pages 自动部署（CI 构建）
项目内置 GitHub Actions 工作流，推送到 `main`/`master` 分支自动构建纯静态站点并部署到 GitHub Pages，**无需服务器**。

**配置步骤：**
1. 将项目推送到 GitHub 仓库。
2. 进入仓库 **Settings → Pages → Source**，选择 **GitHub Actions**。
3. 推送代码到 `main`/`master` 分支，工作流自动触发。
4. 构建完成后，访问 `https://<用户名>.github.io/<仓库名>/` 查看站点。

**工作原理：**
- 工作流 `.github/workflows/deploy.yml` 自动识别站点类型：
  - 用户站点（仓库名 `<user>.github.io`）→ URL `https://<user>.github.io`
  - 项目站点（其他仓库名）→ URL `https://<user>.github.io/<repo>`
- 执行 `x-admin/build.php` 读取 SQLite 数据库，渲染全站静态文件到 `dist/` 目录
- 上传 `dist/` 为 Pages artifact，部署到 GitHub Pages
- 生成 `.nojekyll` 跳过 Jekyll 处理，确保 `_` 开头文件正常

**注意事项：**
- 数据库文件 `x-admin/data/xadmin.db` 需提交到仓库（`.gitignore` 默认忽略 `.db`，请用 `git add -f x-admin/data/xadmin.db` 强制提交）
- 上传文件 `uploads/` 默认已纳入版本控制，CI 部署会自动包含
- 静态文件使用相对路径，在 GitHub Pages 子路径下也能正常加载样式
- 本地预览构建：`php x-admin/build.php`（输出到 `dist/`，可用任意静态服务器预览）
- 自定义域名：在仓库根目录放 `CNAME` 文件（含域名），并在 DNS 配置 CNAME 指向 `<user>.github.io`

---

## 智能增量生成

后台内容变更时自动触发，无需手动全量生成：

| 操作 | 自动重建范围 |
|------|--------------|
| 发布/更新文章 | 文章页 + 所属分类页 + 关联标签页 + 首页 + 上/下一篇邻居 + sitemap + rss + search-index |
| 文章 slug 变更 | 删除旧静态文件 + 上述受影响页面 |
| 文章转草稿 | 删除该文章静态文件 + 重建列表页 |
| 删除文章 | 清理静态文件 + 重建首页/分类/标签/邻居/索引 |
| 分类/标签变更 | 对应列表页 + 首页 + sitemap + rss + search-index |
| 导航菜单变更 | 全量重建（影响全站导航） |

如需手动重建所有页面，进入后台【数据库管理 → ⚡ 生成静态】。

---

## 站内搜索

采用**纯静态前端搜索**方案，符合动静分离理念：
- 后台生成 `search-index.json`（含 title/url/date/category/tags/excerpt/text）
- 前端 `search.html` 内嵌 JS，运行时 `fetch` 加载索引
- 支持多关键词空格 AND 匹配、标题/分类/标签/正文全文检索、关键词高亮
- 访问 `/search.html?q=关键词` 即可搜索，不经过 PHP

---

## 技术栈

- **后端**：PHP 7.4+ / PDO + SQLite3
- **前端**：原生 PHP 模板引擎 / 原生 HTML+CSS+JS
- **安全**：PDO 预处理防注入、bcrypt 密码加密、CSRF Token、htmlspecialchars、登录速率限制、危险协议过滤、敏感目录保护
- **数据库**：单文件 SQLite，零配置

---

## 开源协议

MIT License — 可自由修改、分发、商用，请保留版权声明。

## 默认账户

首次安装后请立即修改：
- 用户名：`admin`
- 密码：`admin888`

---

## 相关文档
- 更新记录：[CHANGELOG.md](https://github.com/xfm0797/X-admin/blob/main/CHANGELOG.md)
- 后台帮助：登录后台 → 右上角【帮助】
