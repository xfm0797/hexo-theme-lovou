---
title: shadcn/ui：不是组件库，是把组件代码直接交给你
date: 2026-11-07 19:30:00
updated: 2026-11-07 19:58:00
categories: 开源
tags:
- 开源项目
- 前端
- 组件库
- React
---

# shadcn/ui

> 组件源码复制进你的项目，样式与行为随你改：一个把"拥有代码"当成卖点的 UI 方案

---

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [shadcn-ui/ui](https://github.com/shadcn-ui/ui) |
> | 协议 | MIT |
> | 星标 | 约 12.7 万（2026 年口径） |
> | 底座 | Radix UI + Tailwind CSS |
> | 形态 | CLI + 可复制组件源码 |

## 它想解决什么问题

传统组件库的两难：用别人的库，定制就要和它的样式打架、和它的版本绑定；自己写，又要重新趟无障碍与交互细节的坑。

shadcn/ui 走了第三条路：**组件不是依赖，而是源码**。CLI 把代码拷进你的仓库，之后它就是你的代码，随便改。

## 核心机制拆解

**1. 复制而非安装。** `npx shadcn@latest add button` 把组件文件写进 `components/ui`，没有黑盒运行时。

**2. Radix 打底。** 无障碍、键盘导航、焦点管理这些难做对的部分由 Radix 原语负责，组件层只做样式与组合。

**3. Tailwind 驱动。** 样式全在类名与 CSS 变量里，主题切换是改变量而不是覆盖样式表。

**4. 组合优先。** 不给大而全的 API，而是给可拼装的小块，复杂组件由你按业务组合。

## 安装与上手

```bash
npx shadcn@latest init
npx shadcn@latest add button dialog table
```

之后直接 `import { Button } from "@/components/ui/button"`，想改样式就打开文件改。

## 点评

**亮点**是彻底消解了"组件库锁定"：升级不跟版本走，定制不用 hack 优先级，团队可以按自己的设计系统长年演进。这个模式正在影响整个前端生态的组件分发方式。

**局限**：组件总量有限，复杂数据表格、富文本这类仍需自己造或找别的库；拷进来的代码要自己维护，改动多时反而增加负担；强绑定 Tailwind，不用 Tailwind 的项目接入成本高；无障碍"由 Radix 保证"不等于"你的用法一定无障碍"，组合错了照样出问题。

**适合人群**：要长期维护自有设计系统的团队；用 React + Tailwind 的产品；以及厌倦了和组件库样式打架的前端。

---

- 项目仓库：[https://github.com/shadcn-ui/ui](https://github.com/shadcn-ui/ui)
- 官方文档：[https://ui.shadcn.com](https://ui.shadcn.com)
