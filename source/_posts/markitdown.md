---
title: MarkItDown：把任意文件变成干净的 Markdown，喂给 LLM 之前先过一遍它
date: 2026-11-07 19:30:00
updated: 2026-11-07 19:58:00
categories: 开源
tags:
- 开源项目
- 文档处理
- LLM
- Python
---

# MarkItDown

> 微软开源：PDF、Word、Excel、PPT、图片、音频、HTML 统一转成结构化 Markdown，保留标题与表格

---

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [microsoft/markitdown](https://github.com/microsoft/markitdown) |
> | 语言 | Python |
> | 协议 | MIT |
> | 维护 | Microsoft |
> | 能力 | PDF / Office / 图片 / 音频 / HTML / ZIP |

## 它想解决什么问题

做 RAG 或文档问答，第一道坎是"把文件变成文本"。这一步看着简单，实际满地坑：PDF 提取出乱七八糟的换行、表格变成一坨、PPT 的层级全丢、Excel 的多 sheet 无从表达。

MarkItDown 的答案是**统一转成 Markdown**：标题、列表、表格、链接都有对应语法，LLM 读起来比纯文本更接近原文结构。

## 核心机制拆解

**1. 格式覆盖面广。** PDF、DOCX、XLSX、PPTX、HTML、CSV/JSON/XML、图片（含 OCR 与 EXIF）、音频（转写）、ZIP（批量遍历）都在支持列表里。

**2. 结构优先。** 转换时努力保留标题层级与表格结构，而不是把内容拍平——这对下游检索质量影响很大。

**3. 接口极简。** 一个 `MarkItDown().convert(path)` 返回带 `text_content` 的对象，可以直接喂给模型或入库。

**4. 可扩展。** 支持注册自定义转换器，私有格式可以自己接。

## 安装与上手

```bash
pip install markitdown[all]
```

```python
from markitdown import MarkItDown
md = MarkItDown()
print(md.convert("report.pdf").text_content)
```

也提供 CLI：`markitdown report.pdf > report.md`。

## 点评

**亮点**是省掉了"每个格式写一个解析器"的重复劳动，而且输出格式对 LLM 友好。微软维护意味着格式兼容性会持续跟进，这对长期项目比一时的功能多寡更重要。

**局限**：PDF 仍是难点——扫描件要靠 OCR，双栏排版与复杂表格会失真；转换过程会丢样式与图片，需要图文的场景不够用；音频转写依赖额外模型，速度慢；`[all]` 依赖较重，体积与安装时长要有心理准备。

**适合人群**：做 RAG、文档问答的工程师；需要批量把资料转成可检索文本的团队；以及经常要"把 PDF 塞给模型"的开发者。

---

- 项目仓库：[https://github.com/microsoft/markitdown](https://github.com/microsoft/markitdown)
