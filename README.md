# 墨痕 · Hexo 极简现代中文主题

一个极简现代风、专为中文博客设计的 [Hexo](https://hexo.io) 主题 **lovou**。

## 特性

- 极简现代设计，中文排版优化（系统字体栈、1.9 行高）
- 明 / 暗双主题：默认跟随系统，可手动切换并记忆
- 响应式布局，适配手机与桌面
- 文章页可折叠目录（TOC）、字数统计与阅读时长
- 归档按年分组、分类页、标签云、上下篇导航、分页
- 服务端代码高亮（无外部 JS 依赖，零追踪脚本）

## 快速开始

```bash
# 安装依赖
npm install

# 本地预览（http://localhost:4000）
npm run server

# 生成静态文件到 public/
npm run build
```

## 写新文章

```bash
npm run new "我的第一篇文章"
```

文章位于 `source/_posts/`，Markdown 头部支持 `title / date / categories / tags / toc(false 可关闭本文目录) / excerpt`。

## 目录结构

```
├── _config.yml          # 站点配置
├── source/              # 文章与页面
└── themes/lovou/        # lovou 主题
    ├── _config.yml      # 主题配置（菜单、目录、版权声明等）
    ├── languages/       # 简体中文 / English 语言包
    ├── scripts/         # 自定义辅助函数（字数统计等）
    ├── layout/          # EJS 模板
    └── source/          # 样式与脚本
```

## 主题配置

编辑 `themes/lovou/_config.yml` 可自定义：

- `menu`：导航菜单
- `toc`：文章页是否显示目录
- `license`：文章底部版权声明（留空隐藏）
- `footer`：页脚附加文字（如 ICP 备案号）

## 部署

### GitHub Pages 自动部署（推荐）

仓库已内置 `.github/workflows/deploy.yml`，推送到 `main` 分支即自动构建并部署到 GitHub Pages，也支持在 Actions 页面手动触发。

首次使用步骤：

1. 将仓库推送到 GitHub（分支为 `main`）
2. 仓库 **Settings → Pages**，将 Source 设置为 **GitHub Actions**
3. 推送代码（或手动触发 workflow），等待 Actions 运行完成
4. 访问 `https://<用户名>.github.io/<仓库名>/`（自定义域名在 Pages 设置中配置，并将 `_config.yml` 的 `url` 改为对应域名）

> 部署到 `https://<用户名>.github.io/<仓库名>/` 子路径时，需将 `_config.yml` 中加上 `root: /<仓库名>/`。

### 其他方式

`npm run build` 后将 `public/` 目录部署到任意静态托管（Vercel、Netlify、服务器等）。
