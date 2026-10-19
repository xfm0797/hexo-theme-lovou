---
title: 开源项目 Moli：Rust 从零写的 Agent 无头浏览器，爬 192 个真实网站比 Chrome 省 90% 内存
date: 2026-10-18 20:39:00
updated: 2026-10-18 20:39:00
categories: 开源
tags:
- 开源项目
- 浏览器
- Rust
- AI Agent
- 爬虫
---

# Moli

> Rust 从零写的 Agent 无头浏览器，爬 192 个真实网站比 Chrome 省 90% 内存

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [lexmount/moli](https://github.com/lexmount/moli) |
> | 语言 | Rust（独立浏览器内核，非 Chromium 封装） |
> | Stars | 约 1.94 万（2026-10-18 GitHub API 口径），Forks 642，7 日增约 6 千–1 万 |
> | 协议 | Apache-2.0 |
> | 状态 | 2026-08-10 创建，10 月 18 日仍有提交；开源版完全独立可用 |
> | 热度 | Trendshift 日/周榜常客；基准数据全部公开可复现 |

## 它想解决什么问题

给 AI Agent 接浏览器，默认答案是 Chrome Headless：功能全，但每个实例动辄 700MB+ 内存、上百个进程线程，一次任务峰值的 CPU 时间以数百毫秒计。Agent 工作负载的真相是：**大多数自动化请求从来不需要视觉渲染，它们要的是页面结构**——提取正文、查询 DOM、跑 JS、看网络请求。Moli 的赌注是：把 DOM 与样式状态作为唯一事实源，布局和像素只在真正需要时才生成，用完即弃。

它不做 GUI 浏览器、不做持久窗口、不追像素级保真——它只做"Agent 的浏览器"。

## 核心机制拆解

**1. 按需布局与渲染的三级成本模型。** 默认模式（`LayoutPolicy::Mock`）给出确定性几何信息而不做真实布局或绘制——提取 HTML/Markdown、查 DOM、跑 JS、检查网络/存储一律零布局零绘制；需要元素盒模型、坐标命中、坐标输入时跑一次布局计算，冻结出最新的 `FrozenLayoutTree` 后只保留这一棵树；截图则从当前 DOM/样式重建、渲染一帧、用后丢弃 paint 状态；screencast 轮询只比生成元数据，无变化不出帧。系统没有增量布局树、没有 damage graph、没有保留显示列表、没有 GPU 合成器。

**2. 完整的浏览器内核，只是时机不同。** V8 执行 JS、html5ever 流式解析、Servo/Stylo 做选择器与层叠计算、Taffy + Parley 做盒与文本布局、AnyRender/Vello CPU 软件渲染，libcurl 负责网络。streaming HTML、模块/timers/microtasks、iframe 与 workers、Fetch/XHR/WebSocket、cookie、WebCrypto、profile 作用域的 localStorage/IndexedDB/OPFS 都在。能力没缩水，缩的是**这些能力运行的时长与保留策略**。

**3. 一个二进制，三种自动化协议。** CDP、WebDriver Classic、WebDriver BiDi 共享同一内核与调度器，不需要单独的 ChromeDriver/geckodriver，也不需要预装浏览器。Playwright 可直接 `connectOverCDP` 接入。CLI 直接产出 HTML、Markdown、JSON、语义文本树等适合模型消费的输出。

**4. 基准数据全部公开。** 192 个中外真实网站混合爬取测试（JS 执行后产出有意义内容才算成功）：Moli 成功率 53.6%、中位 1.43s、**中位 RSS 73 MiB**；Chrome Headless 52.6%、1.43s、**773 MiB**。Agent 负载采样：CDP ready 34.85ms（Chrome 169.37ms），峰值 PSS 102.46 MiB（Chrome 348.82 MiB），进程/线程 1/24（Chrome 11/123）。Lexbench-Headless-Browser 1308 个可比任务：Moli 0.1.1 通过 81.88%，仅次于 Chrome 的 99.85%，远高于 Kitesurf（62.08%）、Lightpanda（53.29%）、Obscura（44.88%）；资源口径下 Moli 每任务中位 CPU 100.6ms / 峰值内存 92 MiB，约为 Chrome（687ms / 697 MiB）的 15% 与 13%。WPT 选用集单次全跑通过 161.2 万测试。

**5. 商业边界清楚。** Moli 是 Lexmount 的开源无头浏览器；Lexmount Browser 是围绕它构建的托管云运行时与控制台。**开源浏览器完全不需要 Lexmount Browser 即可使用。**

## 安装与上手

```bash
# Linux / macOS
curl --proto '=https' --tlsv1.2 -fsSL \
https://github.com/lexmount/moli/releases/latest/download/moli-installer.sh | sh
```

甚至可以直接把一段提示词丢给你的 Agent，让它自己装好自己用：

```text
Install the skills under https://github.com/lexmount/moli/tree/main/skills,
follow their instructions to download and install the latest prebuilt Moli
binary, then use moli-webfetch to fetch https://example.com and show me the result.
```

```bash
# 提取为 Markdown 或语义树（默认零布局零绘制）
moli fetch --dump markdown --wait-until done https://example.com
moli fetch --dump semantic_tree_text --wait-selector body https://example.com

# 需要视觉输出时按需开启
moli fetch --layout --dump screenshot https://example.com > page.png

# 启动自动化服务器，Playwright 直接接入
moli serve --layout
```

## 点评

**亮点**是用"什么时候做视觉工作、结果保留多久"这一刀切开了浏览器自动化的成本结构，而不是又一个 Chromium 换皮。默认路径对 Agent 最常见的结构化提取零渲染开销，`--layout` 显式 opt-in 把成本控制权交还用户。基准数据（含失败率口径、内存、CPU、任务通过率）全部公开且方法论透明，在开源浏览器里属于少见的诚实。对爬虫机群、browser-use Agent、检索管线和 RL 环境这类"结构优先"负载，73MiB vs 773MiB 的中位内存差距是机队成本的真实量级。

**局限**写死在 README 的 "intentional boundaries" 里：不做 GUI/持久窗口/GPU 合成/多帧保留架构；不追求与 Chrome 的像素级一致，不提供高保真 Canvas/WebGL/媒体播放；`--layout` 支持软件截图与原生 PDF，但不是所有 Chrome 截图/打印模式都实现。遇到不支持的协议路径，Moli 明确返回错误而不是伪装成功——对工具是美德，对迁移成本是提醒：把 Chrome Headless 全量替换前，先跑自己的任务集验证那 81.88% 的通过率边界。

适合人群：大规模爬虫与数据管线团队、browser-use 类 Agent 开发者、对内存/进程数敏感的服务端自动化，以及想研究"浏览器内核如何为 Agent 重做成本模型"的人。
