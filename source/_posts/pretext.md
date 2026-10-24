---
title: 开源项目 Pretext：15KB 排版引擎不碰 DOM，文本测量快数百倍，Safari 上快 1200 倍
date: 2026-10-24 13:00:00
updated: 2026-10-24 13:00:00
categories: 前端
tags:
- 前端
- 开源项目
- TypeScript
- 性能优化
- 排版引擎
---

# Pretext

> 纯 TypeScript 文本测量引擎，零 DOM 访问，一次 layout 调用约 0.001ms

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [chenglou/pretext](https://github.com/chenglou/pretext) |
> | 语言 | TypeScript（零依赖） |
> | Stars | 2 万+（发布 48 小时即破万，X 相关推文浏览量超 1600 万） |
> | 协议 | MIT |
> | 作者 | Cheng Lou（前 React 核心团队成员，现 Midjourney 高级工程师） |
> | 安装 | `npm install @chenglou/pretext` |

## 它想解决什么问题

在浏览器里想知道"一段文字放进 300px 宽的容器会占多高"，唯一办法是把文本塞进 DOM 让浏览器排一遍版，再用 `getBoundingClientRect()` 把结果"问"回来。这个"问"的过程就是 Reflow（重排）——网页卡顿的头号元凶，不可并行、读写交错即崩。

Pretext 的定位一句话：**在完全不触碰 DOM 的前提下，用纯算术完成文本测量与排版**。传统 DOM 测量单次要 0.5–2ms，Pretext 一次 `layout()` 约 0.001ms——快数百倍，Safari 基准测试中最高快 1242 倍。它是给虚拟滚动、瀑布流、Canvas 渲染、AI 动态生成界面准备的底层基础设施。

## 核心机制拆解

**1. 两阶段 API：prepare 一次，layout 无数次。** `prepare()` 做一次性工作：用 `Intl.Segmenter` 做 Unicode 感知的文本分段，再经 Canvas `measureText()` 缓存每段字形宽度（约 0.1–1ms）。之后的 `layout()` 就是对缓存宽度做加减乘除——没有 DOM 读写、没有强制重排：

```js
import { prepare, layout } from '@chenglou/pretext'

const prepared = prepare('Your text', '16px Inter')
const { height, lineCount } = layout(prepared, 400, 24)
```

同一份 prepared 句柄可复用：手机、平板、桌面三个宽度各算一次，三次纯运算搞定。

**2. 不止测高度。** `layoutWithLines()` 返回每一行供 Canvas 直接绘制；`layoutNextLineRange()` 支持逐行变宽的文字绕排（文字绕开浮动图片那种杂志排版）；`measureLineStats()` 不建字符串就算出行数与最宽行宽——顺手实现了 Web 平台一直没有的"收缩包裹容器宽度"。

**3. CSS 对齐的细节。** `whiteSpace: 'pre-wrap'`、`wordBreak: 'keep-all'`、`letterSpacing` 等选项与 CSS 行为一一对应；CJK、阿拉伯文 RTL、泰文、韩文、混排 emoji 全部经同一套 API 精确测量；连字符断词交给调用方通过软连字符控制。

**4. 开发过程本身就很 AI。** Cheng Lou 把浏览器标准基准数据喂给 Claude Code 和 Codex，让它们在各关键容器宽度下反复测量、迭代优化，整套流程跑了好几周——一个用 AI 打磨"AI-friendly API"的项目。

## 安装与上手

```bash
npm install @chenglou/pretext
```

注意：rich-inline 子路径目前只支持 `white-space: normal`，不是通用 CSS inline 格式化引擎；仓库附带 Markdown 聊天 demo、文字绕图 demo 与 Bad Apple 影绘 MV 等可运行示例。

## 点评

**亮点**是把困扰前端 30 年的"文本测量必须过 DOM"死结正面拆掉了：API 只有 prepare/layout 两个心智模型，全平台一致（客户端、SSR、Web Worker 通吃），15KB 零依赖，MIT 干净。对做虚拟列表、瀑布流、Canvas 文字渲染、编辑器的人，它把"先渲染再量"的性能债一次性清零。而且作者明确按 AI 可读性设计 API——在生成式 UI 时代，这层"像素级可控的文本基础"很可能是下一代交互体验的入场券。

**局限**也清楚：它是测量与断行引擎，不是渲染器，最终画到 DOM/Canvas/SVG 还得自己接；不处理连字符之外的复杂排版规则（完美对齐、孤寡行控制仍在迭代）；rich-inline 能力有限。另外"快 600 倍"的基准数字以官方口径为准，自己的场景建议先跑 demo。

适合人群：做编辑器、虚拟滚动、瀑布流、数据可视化的前端工程师，Canvas/SVG 文字渲染场景，以及所有想让 AI 生成的界面"落地即精确"的团队。
