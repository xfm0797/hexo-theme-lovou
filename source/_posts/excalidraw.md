---
title: Excalidraw：手绘风格的虚拟白板，开源且能嵌进任何产品
date: 2026-11-07 19:30:00
updated: 2026-11-07 19:58:00
categories: 开源
tags:
- 开源项目
- 白板
- 绘图
- 协作
---

# Excalidraw

> 手绘感线条 + 实时协作 + 端到端加密：画架构图的最快手路径，也是可嵌入的绘图组件

---

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [excalidraw/excalidraw](https://github.com/excalidraw/excalidraw) |
> | 语言 | TypeScript |
> | 协议 | MIT |
> | 形态 | Web 应用 + React 组件库 |
> | 特色 | 手绘风格、离线可用、本地优先 |

## 它想解决什么问题

画一张架构图，用专业工具要先学半小时；用 PPT 画出来的箭头永远歪。而"随手画清楚一个想法"是每个工程师每周都要做的事。

Excalidraw 用一套手绘风格的线条降低了心理门槛：**画得糙是风格，画得准是能力**。加上实时协作与本地优先，它成了很多团队的默认白板。

## 核心机制拆解

**1. 手绘渲染。** 形状用算法模拟手绘抖动，视觉上不追求精确，反而让草图阶段的讨论更放松。

**2. 实时协作 + E2EE。** 房间内的协作流量端到端加密，密钥在 URL 片段里，服务器看不到内容。

**3. 本地优先。** 数据默认存浏览器本地，断网可用；导出为 `.excalidraw` JSON，可进 Git。

**4. 可嵌入。** 以 npm 包形式提供 React 组件，很多文档站、编辑器把它当内嵌画板。

## 安装与上手

直接用官方站点即可开始画。想自托管或集成：

```bash
git clone https://github.com/excalidraw/excalidraw.git
cd excalidraw && yarn && yarn start
```

在自己的 React 项目里，安装 `@excalidraw/excalidraw` 引入组件就行。

## 点评

**亮点**是风格即产品：手绘感让"不完美"变成可接受的表达，降低了团队画图的启动成本。E2EE 与本地优先则解决了"架构图里有内部信息"的顾虑。开源 + 可嵌入让它活在很多产品内部。

**局限**：不适合需要精确尺寸的正式交付图（对外发布前通常会用别的工具重画）；元素多的大图性能一般；协作房间的服务端自托管配置略繁琐；作为组件嵌入时，导出与样式定制需要读源码。

**适合人群**：需要快速画架构图、流程图的工程师；要求图画内容不外泄的团队；以及想给自家产品加"白板"能力的开发者。

---

- 项目仓库：[https://github.com/excalidraw/excalidraw](https://github.com/excalidraw/excalidraw)
- 官网：[https://excalidraw.com](https://excalidraw.com)
