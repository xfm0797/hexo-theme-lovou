---
title: Firecrawl：把任意网站抓成 LLM 能吃的干净 Markdown
date: 2026-11-07 19:30:00
updated: 2026-11-07 19:58:00
categories: 开源
tags:
- 开源项目
- 爬虫
- RAG
- 数据
---

# Firecrawl

> 给一个 URL，返回干净的 Markdown：自动渲染 JS、去广告、跟子页面，还能整站爬

---

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) |
> | 语言 | TypeScript / Python SDK |
> | 协议 | AGPL-3.0 |
> | 形态 | 自托管服务 + 云版 API |
> | 能力 | 单页、整站爬取、结构化抽取 |

## 它想解决什么问题

想做"把某个网站的内容喂给模型"，现实是：页面靠 JS 渲染、正文埋在导航和广告里、翻页链接要自己跟、反爬还会拦你。写一套稳定的抓取管线，工作量远超预期。

Firecrawl 把这条链路产品化：提交 URL，返回可用 Markdown；要整站就给它根域名，它自己遍历。

## 核心机制拆解

**1. 无头浏览器渲染。** 处理 SPA 与动态内容，抓的是渲染后的 DOM，不是原始 HTML 骨架。

**2. 正文抽取。** 去掉导航、页脚、广告，只留主体内容并转成 Markdown，表格与代码块尽量保结构。

**3. 爬取与遍历。** 支持站点地图、链接发现、深度限制与并发控制，整站抓取有边界可管。

**4. 结构化输出。** 可按 schema 抽取字段（价格、标题、作者），直接得到 JSON 而不是一堆文本。

## 安装与上手

```bash
docker run -p 3002:3002 firecrawl/firecrawl
```

```python
from firecrawl import FirecrawlApp
app = FirecrawlApp(api_url="http://localhost:3002")
doc = app.scrape_url("https://example.com")
print(doc["markdown"])
```

## 点评

**亮点**是把"抓取"这个脏活做成了稳定接口：渲染、清洗、遍历、结构化四件事都有现成答案，省下的是数周的边缘情况处理。对做垂直 RAG 的团队，这是起手就能用的基础件。

**局限**：AGPL 对商用二次分发限制较强，做 SaaS 前必须看清条款；无头浏览器吃内存，整站爬取要控制并发，否则容易把机器拖死；对强反爬站点仍有失败率，需要代理与重试策略；云版按量计费，量大时成本需提前估算。

**适合人群**：要构建垂直领域知识库的团队；做竞品监控、内容聚合的产品；以及需要"把网页变成结构化数据"的开发者。

---

- 项目仓库：[https://github.com/firecrawl/firecrawl](https://github.com/firecrawl/firecrawl)
- 官方文档：[https://docs.firecrawl.dev](https://docs.firecrawl.dev)
