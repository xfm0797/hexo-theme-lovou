---
title: xfm-cms 小微企业产品展示型官网程序
date: 2026-09-26 21:03:30
tags: 
- 内容管理
- 产品展示
- 企业官网
categories: 开源
---

# XFM CMS - 产品展示型小微企业官方网站

> **版本：v1.0.0** | 作者：**XFM** | 作者网站：https://www.lovou.pw | 联系作者：https://t.me/xfm520

一套基于 **PHP 7.4 + SQLite/MySQL** 的轻量级企业官网程序，专为产品展示型小微企业设计。
零外部依赖，**默认使用 SQLite 单文件数据库**，亦可切换到 MySQL/MariaDB 以应对更高并发场景，**可部署在绝大多数免费虚拟主机上**。

## ✨ 功能特性

### 前台
- 🏠 **首页**：轮播横幅 + 公司新闻 + 产品中心（左栏分类 / 右栏四列卡片）+ 关于我们 / 联系我们并排
- 🖼 **轮播横幅**：支持背景图 / 渐变色、自动播放、间隔可配、左右箭头、指示点、触摸滑动、键盘方向键
- 📰 **公司新闻**：列表分页、详情页（封面图、摘要引言、Markdown 正文、相关新闻侧栏、浏览统计）
- 📦 **产品中心**：左侧分类导航 + 右侧四列卡片网格、关键词搜索、分页浏览
- 📄 **产品详情**：多图画廊、规格参数表、Markdown 富文本描述、相关产品推荐、浏览统计
- ℹ️ **关于我们**：企业介绍
- ✉️ **联系我们**：留言表单（带验证、防灌水、AJAX 提交），留言自动入库
- 🔗 **伪静态 URL**（可选）：`/products`、`/product/12`、`/news/12` 等友好格式，后台一键开关
- �️ **站点地图**：自动生成 `sitemap.xml`（sitemaps.org 协议）+ 人类可读 HTML 版本，列出全站可索引链接，已接入 `robots.txt`
- � **Markdown 渲染**：标题/粗体/斜体/删除线/列表/链接/图片/代码块/引用/表格/水平线，自动 URL 链接
- 📱 **全响应式**：PC / 平板 / 手机自适应，移动端汉堡菜单、后台侧栏抽屉、表格横向滚动
- ⚡ **资源压缩**：CSS/JS 运行时压缩 + 文件缓存 + Gzip 传输 + 浏览器长缓存

### 后台
- 🔐 独立登录入口，密码哈希加密（`password_hash`）
- 📊 控制台仪表盘：产品数、新闻数、留言数、浏览量等统计 + 系统信息
- 🖼 轮播横幅管理：增删改查、图片上传、背景色 / 渐变、排序、启用禁用、轮播设置（自动播放 / 间隔）
- 📰 公司新闻管理：增删改查、封面图上传、Markdown 正文、作者 / 发布时间、推荐置顶、发布状态、浏览统计、首页显示条数
- 📦 产品管理：增删改查、多图上传、规格参数、上下架、推荐标记、排序
- 📁 分类管理：增删改、产品计数
- ✉️ 留言管理：列表、详情、标记已读、删除、邮件回复
- ⚙️ 站点设置：站点信息、联系信息、关于内容、**伪静态开关**、页脚版权、备案号
- 📝 **Markdown 编辑器**：产品/新闻/关于正文自带工具栏（标题/粗体/斜体/列表/链接/图片/代码/引用/表格/预览），Tab 缩进、自动调高
- 🔑 修改密码

### 安全防护
- **CSRF 令牌**保护所有表单（含 GET 链接式操作的 token 验证）
- **PDO 预处理语句**防 SQL 注入（全站零原生 SQL 拼接）
- **输出转义**（`htmlspecialchars`）防 XSS
- **防暴力破解**：登录失败 5 次锁定 30 分钟，自动记录 IP 与尝试日志
- **安全 HTTP 头**：X-Frame-Options / X-Content-Type-Options / X-XSS-Protection / Referrer-Policy / HSTS / Permissions-Policy（PHP 层 + .htaccess 双重保障）
- **会话安全**：HttpOnly + SameSite Cookie、登录后重新生成 Session ID、UA 指纹校验
- **数据库文件**（SQLite `data/database.sqlite` + MySQL 配置 `data/db.config.php`）均位于 `data/` 目录，由根 `.htaccess` 禁止外网访问
- **上传目录**禁止 PHP 脚本执行（多重组件防护）
- **文件上传**MIME 类型校验 + 扩展名白名单 + 大小限制
- **留言防灌水**：同 IP 60 秒限一次 + 每日上限（可配置）
- **密码哈希**：`password_hash` + 自动算法升级
- **隐藏服务器信息**：移除 X-Powered-By / Server 头、关闭 expose_php

## 📋 运行环境要求

| 项目 | 要求 | 说明 |
|------|------|------|
| PHP | ≥ 7.4 | 需启用 PDO 扩展 |
| 数据库驱动 | 至少其一 | `pdo_sqlite`（默认）或 `pdo_mysql`（用于 MySQL/MariaDB） |
| SQLite | ≥ 3.x | 使用 SQLite 部署时由 PHP PDO 驱动提供 |
| MySQL/MariaDB | MySQL 5.7+ / MariaDB 10.3+ | 使用 MySQL 部署时需要（需提前在主机面板创建空数据库与账号） |
| mbstring | 建议 | 处理中文字符 |
| GD | 可选 | 用于生成图片缩略图（未启用不影响核心功能） |
| Web 服务器 | Apache / Nginx | Apache 推荐启用 mod_rewrite |

> **默认无需 MySQL / MariaDB**：开箱即用 SQLite，数据库就是一个 `.sqlite` 文件。
> 若站点流量较大或主机更适合 MySQL，可在安装向导中选择 MySQL 并填入连接信息，系统会自动建表与切换。

## 📁 目录结构

```
xfm-cms/
├── index.php              # 首页（轮播 + 新闻 + 产品 + 关于/联系）
├── products.php           # 产品列表
├── product.php            # 产品详情
├── news.php               # 公司新闻（列表 + 详情）
├── about.php              # 关于我们
├── contact.php            # 联系我们
├── sitemap.php            # 站点地图（XML / HTML 双输出）
├── admin.php              # 后台入口
├── install.php            # 安装向导（安装后自动删除）
├── config.php             # 配置文件
├── init.php               # 初始化引导
├── .htaccess              # 统一安全规则 + 伪静态规则 + sitemap.xml 重写
├── robots.txt             # 搜索引擎规则（含 Sitemap 指令）
├── assets/
│   ├── css/style.css      # 样式表
│   ├── js/main.js         # 前端脚本（轮播 / 表单 / 交互）
│   ├── js/markdown-editor.js  # Markdown 编辑器（工具栏 + 预览）
│   ├── min.php            # 资源压缩端点（CSS/JS minify + 缓存）
│   ├── cache/             # 压缩缓存目录（运行时自动生成，由根 .htaccess 保护）
│   └── uploads/           # 图片上传目录（由根 .htaccess 禁止脚本执行）
├── includes/
│   ├── db.php             # 数据库封装（PDO，支持 SQLite + MySQL）
│   ├── schema.php         # 统一建表 DDL 生成器（SQLite / MySQL）
│   ├── functions.php      # 通用函数（含 url() 伪静态 / Markdown 渲染）
│   ├── minify.php         # CSS/JS 压缩函数
│   ├── security.php       # 安全防护层（HTTP头/防暴力破解/输入净化）
│   ├── auth.php           # 认证函数（含登录防暴力破解）
│   ├── header.php         # 前台页头模板
│   ├── footer.php         # 前台页脚模板
│   └── admin/
│       ├── header.php     # 后台页头模板
│       ├── footer.php     # 后台页脚模板
│       ├── products.php   # 产品管理模块
│       ├── categories.php # 分类管理模块
│       ├── banners.php    # 轮播横幅管理模块
│       ├── news.php       # 公司新闻管理模块
│       ├── messages.php   # 留言管理模块
│       └── settings.php   # 设置模块（含伪静态开关）
└── data/
    ├── database.sqlite    # SQLite 数据库（使用 SQLite 时自动生成，由根 .htaccess 保护）
    ├── install.lock        # 安装锁文件（已安装标志，未安装时前台自动跳转 install.php）
    └── db.config.php      # MySQL 配置文件（选择 MySQL 安装时自动生成，由根 .htaccess 保护）
```

## 🚀 安装部署

### 方法一：上传到虚拟主机（推荐）

1. **下载整个程序目录**，保持目录结构不变。

2. **通过 FTP 上传**到虚拟主机的 web 根目录（通常是 `public_html/`、`htdocs/`、`wwwroot/` 或 `www/`）。

3. **设置目录权限**（通过 FTP 客户端右键属性）：
   - `data/` 目录 → 权限 `755`（如不行试 `777`）
   - `assets/uploads/` 目录 → 权限 `755`（如不行试 `777`）

4. **浏览器访问** `http://你的域名/install.php`，按向导完成安装：
   - 环境检查 → 选择数据库类型（SQLite / MySQL）→ 配置管理员账号与站点名 → 完成
   - 若选择 MySQL：需提前在主机面板（cPanel/宝塔等）创建空数据库与账号，安装向导会测试连接、自动建表并将配置写入 `data/db.config.php`
   - 若选择 SQLite：无需额外配置，数据库文件自动生成于 `data/database.sqlite`

5. **安装完成后，`install.php` 会自动删除**（同时生成安装标志文件 `data/install.lock`）。若主机权限不足导致自动删除失败，页面会提示你手动删除。

6. 访问 `http://你的域名/admin.php` 登录后台管理内容。

### 方法二：本地预览

如需先在本地预览再部署：

```bash
# 进入项目目录
cd xfm-cms

# 启动 PHP 内置服务器（需本机已安装 PHP 7.4+）
php -S localhost:8000

# 浏览器访问 http://localhost:8000/install.php
```

## 🆓 免费虚拟主机部署指南

本程序专为兼容免费虚拟主机而设计。以下是常见免费主机的部署要点：

### 通用注意事项

| 问题 | 解决方案 |
|------|----------|
| 不支持 MySQL | ✅ 默认 SQLite，零数据库配置；如主机仅支持 MySQL 也可在安装向导选择 MySQL 部署 |
| 仅支持 PHP 5.x | ❌ 需选择支持 PHP 7.4+ 的主机 |
| 目录不可写 | 通过 FTP 将 `data/` 和 `assets/uploads/` 设为 `777` |
| 不支持 `.htaccess` | 数据库仍可能被下载，见下方「数据库保护」 |
| 禁用 `mail()` | 留言仍会存入数据库，在后台查看即可 |
| `open_basedir` 限制 | 保持默认配置（数据库在 web 根目录内）即可 |
| 上传文件大小限制 | 在 `config.php` 中调小 `MAX_UPLOAD_SIZE` |

### 数据库保护（重要）

默认通过根目录 `.htaccess` 中的 `RewriteRule` 禁止外网访问 `data/`、`includes/`、`assets/cache/` 等敏感目录，并禁止 `assets/uploads/` 下执行 PHP 脚本。若你的主机**不支持 `.htaccess`**，请采取以下措施之一：

1. **将数据库移到 web 根目录外**（仅 SQLite，最安全）：
   编辑 `config.php`，修改 `DB_PATH`：
   ```php
   define('DB_PATH', '/home/yourname/db/database.sqlite');
   ```
   多数免费主机结构为 `/home/用户名/public_html/`，可将数据库放在 `/home/用户名/db/`。

2. **给数据库文件起一个难猜的名字**（仅 SQLite，次选）：
   ```php
   define('DB_PATH', ROOT_PATH . '/data/' . md5('your_secret') . '.sqlite');
   ```

3. **使用 MySQL 部署**（彻底规避数据库文件被下载的风险）：
   MySQL 数据存放在数据库服务器中，不存在被 HTTP 下载的可能。`data/db.config.php` 仅保存连接信息（含密码），且通过 `.htaccess` 保护。若主机不支持 `.htaccess`，可在 `config.php` 顶部将 MySQL 连接信息直接写入常量、并删除 `data/db.config.php`。

### 推荐的免费主机特征

选择免费主机时，优先确认以下条件：
- ✅ 支持 PHP 7.4 或更高版本
- ✅ 启用 PDO + 至少一个数据库驱动（`pdo_sqlite` 或 `pdo_mysql`，一般在 phpinfo 中可见）
- ✅ 支持 `.htaccess`（Apache + mod_rewrite）
- ✅ 提供可写目录
- ✅ 无强制广告插入（或广告仅在页面底部，不影响布局）

## ⚙️ 配置说明

所有配置集中在 `config.php`，常用项：

```php
define('SITE_NAME', '你的公司名');        // 站点名称
define('DB_TYPE', 'sqlite');              // 数据库类型：sqlite（默认）或 mysql
// SQLite 用：
define('DB_PATH', ROOT_PATH . '/data/database.sqlite');
// MySQL 用（推荐通过安装向导自动写入 data/db.config.php，无需手动填写）：
define('DB_HOST', 'localhost');
define('DB_PORT', 3306);
define('DB_NAME', 'xfm_cms');
define('DB_USER', 'root');
define('DB_PASS', '');
define('MAX_UPLOAD_SIZE', 2 * 1024 * 1024);  // 最大上传 2MB
define('ALLOWED_EXTENSIONS', ['jpg','jpeg','png','gif','webp','bmp']);
define('CONTACT_EMAIL', 'you@example.com');  // 留言通知邮箱
define('REWRITE_ENABLED', false);  // 伪静态总开关（后台设置优先级更高）
define('DEBUG_MODE', false);  // 生产环境保持 false
```

> 大部分设置（站点名、联系方式、关于内容、轮播、新闻、伪静态等）可在后台「站点设置」中修改，无需改代码。
> MySQL 配置优先读取安装向导生成的 `data/db.config.php`，手动改 `config.php` 后需删除 `data/install.lock` 重新安装才会生效。

## 🔧 常见问题

**Q: 安装页面提示「PDO SQLite 驱动 未启用」？**
A: 该主机不支持 SQLite。联系主机商启用，或在安装向导中选择 MySQL/MariaDB（需主机支持 `pdo_mysql`）。

**Q: 想用 MySQL/MariaDB 而非 SQLite 如何操作？**
A: 安装向导步骤 2 顶部选择「MySQL/MariaDB」，填入主机、端口、数据库名、用户名、密码。向导会先测试连接，成功后写入 `data/db.config.php` 并自动建表。需提前在主机面板（cPanel/宝塔等）创建一个空数据库与对应账号。已用 SQLite 安装的站点无法直接迁移到 MySQL，需重新安装并在新数据库中录入内容。

**Q: 如何修改 MySQL 连接信息？**
A: 编辑 `data/db.config.php`（由安装向导自动生成）。修改后建议删除 `data/install.lock` 重新访问 `install.php` 触发一次新连接校验（若仍保留 `install.php` 可直接编辑文件后访问前台验证）。

**Q: 安装页面提示「数据库目录不可写」？**
A: 通过 FTP 将 `data/` 目录权限改为 `755` 或 `777`（即便使用 MySQL 也需要此目录可写，因为安装锁与 `db.config.php` 都存放于此）。

**Q: 上传图片失败？**
A: 检查：① `assets/uploads/` 目录权限是否为 `755/777`；② 图片是否超过 `MAX_UPLOAD_SIZE`；③ 主机是否限制 `upload_max_filesize`。

**Q: 忘记管理员密码？**
A: 通过 FTP 删除 `data/install.lock`（保留数据库），重新访问 `install.php` 安装向导会让你重新设置管理员账号，原有数据不丢失。若同时删除数据库文件（SQLite 删 `data/database.sqlite`；MySQL 用 phpMyAdmin 清空表），则全部数据重置。

**Q: 如何备份数据？**
A: SQLite：通过 FTP 下载 `data/database.sqlite` 即完整数据库备份；MySQL：通过 phpMyAdmin 导出 SQL 或使用 `mysqldump` 命令。同时建议下载 `assets/uploads/` 目录备份图片。

**Q: 如何迁移到新主机？**
A: SQLite：上传全部文件 + 设置目录权限即可，数据库随文件一起迁移。MySQL：上传代码文件，新主机上重新创建数据库并导入 SQL 备份，再修改 `data/db.config.php` 中的连接信息。

**Q: 网站显示乱码？**
A: 确保所有文件以 UTF-8 编码保存（默认已是）。检查主机是否强制了其他默认字符集。

**Q: 想要伪静态 URL（如 /product/12）？**
A: 后台「站点设置 → 伪静态」勾选启用即可。需主机支持 Apache `mod_rewrite`（多数付费主机支持，部分免费主机如 InfinityFree 也支持）。规则已内置在 `.htaccess`，子目录部署时需设置 `RewriteBase`。Nginx 规则见后台伪静态设置页。开启后若链接 404，关闭开关即可恢复查询字符串 URL，不影响功能。

**Q: 站点地图（sitemap）在哪里？如何提交给搜索引擎？**
A: 本程序自带站点地图，三种访问方式任选：
- `/sitemap.xml`：标准 XML 格式（需 mod_rewrite，规则已内置 `.htaccess`，无论是否开启伪静态均生效）
- `/sitemap.php`：XML 格式（兼容不支持 rewrite 的主机，提交此 URL 给 Google Search Console / Bing 站管即可）
- `/sitemap.php?html=1` 或 `/sitemap`（伪静态开启时）：人类可读 HTML 版本，列出全站链接，页脚已加入入口

`robots.txt` 已自动加入 `Sitemap:` 指令指向 `sitemap.php`，搜索引擎会自动发现。地图会自动列出首页、产品列表、产品分类、所有上架产品、新闻列表、所有新闻详情、关于、联系等可索引 URL，并按内容更新时间自动更新 `lastmod`，无需手动维护。

**Q: 如何管理首页轮播横幅？**
A: 后台「轮播横幅」：添加横幅（标题/副标题/背景图或渐变色/链接/排序），设置自动播放与切换间隔。无横幅时首页自动回退为单一渐变 Hero。

**Q: 如何发布公司新闻？**
A: 后台「公司新闻」：发布新闻（标题/摘要/Markdown 正文/封面图/作者/发布时间），可设推荐置顶与发布状态，可配置首页显示条数。前台 `/news.php` 或伪静态 `/news` 查看列表，`/news/12` 查看详情。

**Q: 产品/新闻正文如何排版？**
A: 正文支持 Markdown 语法。后台编辑器自带工具栏（标题/粗体/斜体/列表/链接/图片/代码/引用/表格/预览），点击按钮自动插入语法；也可手写 Markdown。前台自动渲染为格式化 HTML（含代码高亮样式、表格、引用块等）。

**Q: CSS/JS 是如何压缩的？**
A: 通过 `assets/min.php` 端点运行时压缩：① 删除注释与多余空白；② 结果缓存到 `assets/cache/`（源文件改动后自动更新）；③ 配合 `.htaccess` 的 mod_deflate 做 Gzip 传输压缩；④ 浏览器端长缓存（ETag + immutable）。无需构建步骤，改了 CSS/JS 自动生效。若主机不支持 PHP 处理资源，可改回直接引用 `assets/css/style.css`。

## 📝 自定义

### 修改主题色
编辑 `assets/css/style.css` 顶部的 CSS 变量：
```css
:root {
    --color-primary: #2563eb;    /* 主色 */
    --color-accent: #f59e0b;     /* 强调色 */
    /* ... */
}
```

### 修改页头/页脚
编辑 `includes/header.php` 和 `includes/footer.php`。

### 添加新页面
1. 创建 `xxx.php`，开头加 `require_once __DIR__ . '/init.php';`
2. 结尾加 `include __DIR__ . '/includes/footer.php';`
3. 在 `includes/header.php` 的导航中添加链接
4. （可选）若希望该页面被搜索引擎收录，在 `sitemap.php` 的「静态页面」区追加一条 `$urls[] = [...]` 条目

## 📄 许可证与版权

**XFM CMS v1.0.0** · 作者：XFM
- 作者网站：https://www.lovou.pw
- 联系作者：https://t.me/xfm520

本程序可自由使用、修改、分发，适用于个人与商业项目。
保留页脚 "Powered by XFM CMS" 作者署名是对作者的支持与尊重（可移除，但不建议）。

## 🛡️ 安全建议

1. 安装后 `install.php` 会**自动删除**（若失败请手动删除）；安装标志文件 `data/install.lock` 请勿随意删除
2. 使用强密码（至少 8 位，含字母数字）；系统已内置防暴力破解（失败 5 次锁定 30 分钟）
3. 定期备份数据库：SQLite 下载 `data/database.sqlite`；MySQL 用 `mysqldump` 或 phpMyAdmin 导出
4. 生产环境保持 `DEBUG_MODE` 为 `false`
5. 如主机支持 HTTPS，建议开启（系统会自动发送 HSTS 头并标记 secure cookie）
6. 安全配置可在 `config.php` 的「安全」区块调整（锁定时长、尝试次数、留言限制等）
7. MySQL 部署：数据库账号建议只授予目标库的 CRUD 权限（无需 GRANT/DDL）；`data/db.config.php` 已被 `.htaccess` 保护
