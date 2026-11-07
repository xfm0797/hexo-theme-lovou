---
title: Playwright：一个 API 驱动三大浏览器，E2E 测试与自动化抓取的通用底座
date: 2026-11-07 19:30:00
updated: 2026-11-07 19:58:00
categories: 开源
tags:
- 开源项目
- 自动化测试
- 浏览器
- E2E
---

# Playwright

> 微软出品：Chromium、Firefox、WebKit 一套 API 通吃，自动等待、可追踪、能录视频

---

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [microsoft/playwright](https://github.com/microsoft/playwright) |
> | 语言 | TypeScript（多语言绑定） |
> | 协议 | Apache-2.0 |
> | 维护 | Microsoft |
> | 能力 | E2E 测试、自动化抓取、视觉回归 |

## 它想解决什么问题

浏览器自动化长期被 Selenium 的"不稳定"折磨：元素还没渲染就去点、等待靠 `sleep`、跨浏览器还要各写一套。测试用例跑十次挂三次，团队就再也不信它了。

Playwright 的答案是**自动等待 + 统一协议**：所有动作在元素可交互时才执行，三种浏览器共用一套 API。

## 核心机制拆解

**1. 自动等待。** 点击、输入、断言前会等元素可见、稳定、可接收事件，消除了大部分刻意 sleep。

**2. 三引擎统一。** Chromium、Firefox、WebKit 各自打包浏览器版本，同一份用例跨引擎跑，环境可复现。

**3. 追踪与调试。** Trace Viewer 记录每步的 DOM 快照、网络与控制台，失败原因可回放；`codegen` 可录制操作生成代码。

**4. 隔离与并行。** 每个用例独立浏览器上下文，天然并行；也能模拟移动端、离线、地理位置。

## 安装与上手

```bash
npm i -D @playwright/test
npx playwright install
npx playwright test
```

从 `codegen` 录一段真实操作起步，再把断言补上，比手写快得多。

## 点评

**亮点**是稳定性：自动等待把"脆弱的测试"这个行业顽疾压下去一大半，而 Trace Viewer 让失败排查从"猜"变成"看"。跨引擎能力对兼容性要求高的产品几乎是刚需。

**局限**：浏览器二进制体积大，CI 镜像要预留空间；跨引擎的渲染差异仍会导致偶发失败，尤其视觉断言；抓取场景下仍会被反爬识别，需要额外的指纹与代理策略；相比轻量 HTTP 客户端，它的资源开销高一个量级。

**适合人群**：要做 E2E 与回归测试的前端团队；需要稳定浏览器自动化的数据采集项目；以及做视觉回归、可访问性检查的工程组。

---

- 项目仓库：[https://github.com/microsoft/playwright](https://github.com/microsoft/playwright)
- 官方文档：[https://playwright.dev](https://playwright.dev)
