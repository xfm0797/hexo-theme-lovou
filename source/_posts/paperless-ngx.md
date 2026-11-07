---
title: paperless-ngx：把纸质与电子文档变成可全文检索的私人档案馆
date: 2026-11-07 19:30:00
updated: 2026-11-07 19:58:00
categories: 开源
tags:
- 开源项目
- 自托管
- 文档管理
- OCR
---

# paperless-ngx

> 扫描件自动 OCR、打标签、按规则归档：家里那堆合同发票，从此能搜能查不会丢

---

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [paperless-ngx/paperless-ngx](https://github.com/paperless-ngx/paperless-ngx) |
> | 语言 | Python / TypeScript |
> | 协议 | GPL-3.0 |
> | 星标 | 约 4.5 万（2026 年口径） |
> | 部署 | Docker Compose 自托管 |

## 它想解决什么问题

发票、合同、保单、体检报告——这些文件的价值在于"以后要找得到"，但现实中它们散在邮箱附件、手机相册、抽屉里的纸质件中，找一次要翻半小时。

paperless-ngx 的目标是把它们统一成**一份可全文检索的档案库**：扫描或投递进去，自动 OCR、自动按规则分类、自动打标签。

## 核心机制拆解

**1. OCR 与全文索引。** 图片与 PDF 自动识别文字并入库，搜索能命中扫描件里的内容，而不只是文件名。

**2. 消费目录 + 自动规则。** 文件丢进指定目录即被摄入；可按文件名、内容、来源配置匹配规则，自动打标签、定类型、设保管期限。

**3. 双面归档。** 原始文件与处理后版本都保留，随时可下载原件，不会"为了识别而破坏证据"。

**4. 邮件与移动端投递。** 支持从邮箱拉取附件、通过移动端上传，减少手工搬运。

## 安装与上手

```bash
git clone https://github.com/paperless-ngx/paperless-ngx.git
cd paperless-ngx/docker/compose
docker compose up -d
```

打开 Web 界面创建管理员，设好 consume 目录，先扔十份文件试试规则匹配得准不准。

## 点评

**亮点**是"归档"这件事被做完整了：OCR、规则、标签、原件保留、检索，每一环都对着真实痛点。自托管意味着合同与证件不出自己的机器，这在隐私上无可替代。

**局限**：GPL-3.0 对商用分发有约束；OCR 对手写、低质量扫描、复杂表格效果有限，重要文件仍要人工校对；规则引擎灵活但需要时间调，前期录入成本高；备份要自己设计（数据库 + 媒体目录 + 配置），丢一份就前功尽弃。

**适合人群**：文件多的自由职业者与小公司；有记账、报税、合同管理需求的家庭；以及自建 NAS 的 Homelab 玩家。

---

- 项目仓库：[https://github.com/paperless-ngx/paperless-ngx](https://github.com/paperless-ngx/paperless-ngx)
- 官方文档：[https://docs.paperless-ngx.com](https://docs.paperless-ngx.com)
