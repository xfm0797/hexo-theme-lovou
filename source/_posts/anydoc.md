---
title: 开源项目 anydoc：Firecrawl 开源的 Rust 文档转换器，9 种格式进、Markdown 出，个位数毫秒完成
date: 2026-10-23 20:46:00
updated: 2026-10-23 20:46:00
categories: 开源
tags:
- 开源项目
- anydoc
- Firecrawl
- Rust
- 文档解析
- RAG
---

# anydoc

> Word、PPT、Excel、PDF、EPUB、ODF、RTF、CSV……9 种格式进，统一的 GFM Markdown 出，单位是毫秒

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [firecrawl/anydoc](https://github.com/firecrawl/anydoc) |
> | 定位 | 多格式文档 → 干净 Markdown 的高速转换库 |
> | 主要语言 | Rust（含 Node.js / Python / WASM 绑定） |
> | Stars / Forks | 23,060 / 1,491（截至 2026-10-23） |
> | 许可证 | MIT |
> | 出品方 | Firecrawl（驱动其托管产品 Firecrawl Parse） |

## 它想解决什么问题

RAG pipeline 的第一公里永远是"把文档变成干净的文本"。Word、PPT、Excel、PDF、EPUB、ODF、RTF、CSV……每种格式一个解析库，输出格式五花八门。anydoc 用纯 Rust 把这件事一次性解决：**9 种格式进，统一的 GitHub-Flavored Markdown 出，个位数毫秒完成**。这个 Firecrawl 出品的开源库一周拿到 2.3 万 Star。

## 为什么它快得离谱

README 的卖点就一句话：**single-digit milliseconds（个位数毫秒）完成转换**。Rust 零成本抽象 + 无 GC + 直接解析二进制格式（不先转 HTML/XML 中间层）是性能来源；更关键的是**输出一致性**——不管输入是 docx 还是 pdf，出来的都是同一套干净的 GFM Markdown，下游 LLM 不用为每种格式写适配。

扫描版 PDF 这类没有文本层的硬骨头，可以选 `--ocr hosted` 走 Firecrawl Parse 的托管 OCR 模型补齐。

## 三种用法，从 Agent 到浏览器

**1. 作为 Agent Skill 装上：**

```bash
npx skills add firecrawl/anydoc
```

之后你的 Claude Code、Codex、Cursor、OpenCode 遇到任何文档都知道怎么转 Markdown。

**2. 命令行即用：** 直接转换本地文件，适合批处理与 CI。

**3. 库与 WASM：** Rust crate、Node.js/Python 绑定，以及 WASM 版本可以跑在浏览器里——前端也能本地转文档，文件不出机器。

## 点评

**亮点**：把"文档解析"这个 RAG 生态最脏的活做成一个快速、一致、无依赖的库，是典型的"把脏活干干净"型开源；Rust 直解二进制避免中间层损耗，个位数毫秒的性能让"实时转换"成为可能；Agent Skill 分发方式与 Firecrawl 生产环境背书加成明显。

**局限**：复杂排版（多栏、艺术字、嵌套表格）的还原精度仍以"干净 Markdown"为目标而非像素级保真；托管 OCR 是可选付费路径；2.3 万星热度集中在一周内，长期维护节奏待观察。

适合人群：搭 RAG pipeline 的团队、做企业文档知识库的工程师、给 Agent 装文档处理能力的开发者——它是 LLM 数据预处理层的新基准。
