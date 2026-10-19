---
title: 开源项目 God's Eye View：把 1.1 万架实时航班、4000 路公共摄像头和语音 Agent 装进一个浏览器地球仪
date: 2026-10-18 20:35:00
updated: 2026-10-18 20:35:00
categories: 开源
tags:
- 开源项目
- 数据可视化
- OSINT
- AI Agent
- MCP
---

# God's Eye View

> 把 1.1 万架实时航班、4000 路公共摄像头和语音 Agent 装进一个浏览器地球仪

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [bilawalsidhu/gods-eye-view](https://github.com/bilawalsidhu/gods-eye-view) |
> | 语言 | JavaScript（无框架，Vanilla JS + CesiumJS + Vite） |
> | Stars | 约 5.78 万（2026-10-18 GitHub API 口径），Forks 1.13 万，月增约 3 万 |
> | 协议 | MIT（仅限源码； bundled 数据与第三方数据源另有许可，详见下文） |
> | 状态 | 2026-06 创建，2026 年 8 月登顶 GitHub Trending 日榜与周榜，10 月持续活跃（10-18 仍有提交） |
> | 热度 | 前身 WorldView 的演示视频在 YouTube 播放 500 万+、全网社交传播 2500 万+；曾居 Product Hunt 日榜第八 |

## 它想解决什么问题

航班应答机、船舶信标、卫星轨道根数、地震台网、公共摄像头——这些公开信号本来就存在于互联网上，只是散落在几十个互不相通的网站和 API 里。你想回答"此刻我头顶有什么飞机""这艘船要开去哪""ISS 下次什么时候过境"，得开七八个标签页，各自忍受不同的界面和刷新延迟。

God's Eye View（下称 GEV）把这些信号汇到同一个可交互的 3D 地球上：**它看起来像一个禁地 cockpit，但每一行代码都可检查、每一个数据源都公开**。作者的表述很直白——"一半魔力在于它看起来像被禁止的驾驶舱，另一半在于每一行代码都可审查"。项目从病毒式传播的 God's Eye View 视频系列（前身 WorldView）演化而来，2026 年 8 月开源后登顶 GitHub Trending。

## 核心机制拆解

**1. 二十个数据层，十八个免密钥起步。** 地图底图（Esri 卫星影像 + OSM，零配置可用）、1.1 万+ 架实时航班（OpenSky + adsb.lol）、军用航班（adsb.lol 单独频道）、838 颗编目卫星（CelesTrak，DENSE 模式可加载整个星链壳层）、全球地震（USGS，24 小时窗）、约 4000 路公共摄像头（12+ 城市/地区 API，投影进 3D 城市而非网页嵌入）、船位（AISStream）、GNSS 干扰评分、火点（NASA FIRMS）、实时公交（GTFS-Realtime，覆盖波士顿、奥斯汀、赫尔辛基、多伦多等十余城市）、750 个地理定位世界电台（模拟调谐旋钮）、天气风场/雷达/闪电/气旋（NOAA GFS/ECMWF/NHC）、ALPR 车牌识别摄像头位置（OSM 标注，仅位置无数据）、街景（Mapillary/KartaView/Panoramax/Google）等。密钥是增强项而非前提：免费的 Cesium ion token 解锁 Google 摄影测量 3D 城市，OpenAI key 解锁语音。

**2. 语音 Agent：三十个工具，看得懂屏幕再回答。** 基于 OpenAI Realtime API（或本机 ChatGPT/Codex OAuth 会话），Agent 回答前先拉取实时场景上下文——坐标、街名、激活图层、视图缩放级别。对着飞行中的飞机问"这是什么城市"它知道；点任何实体问"what's this"，它用该对象的实时遥测回答；街景级别它会读取视口截图识别可读标牌，并被明确指令不得幻觉标签。典型指令如\_"Take me to LAX and select the nearest airborne aircraft"*、*"Outline the state of Texas"*（画出真实包围多边形而非圆圈）、*"How many flights are over Texas right now?"\_。密钥只经服务端代理，浏览器只拿到短生命周期会话令牌。

**3. 同时是一个 MCP 服务器。** Claude Desktop、Codex、ChatGPT 桌面端可以直接对话调用它："show me a place"，实时地球就在对话里打开。

**4. 数据粗糙是常态，插值与诚实标注是解法。** 实时馈源每 15–30 秒才到一次，地球以落后一个区间的时延渲染并在已知定位点间插值，死差推算补洞；卫星用 SGP4 传播，轨道环通过 GMST 重对齐锁定，不漂不闪。Falcon 9 发射回放明确标注 `RECONSTRUCTED ESTIMATE`（重建估计），摄像头姿态被标注为"需你亲手拖拽校准的估计先验"。

**5. 无框架架构 + 加固的服务端代理。** Vanilla JS + CesiumJS + Vite，`src/layers/` 一层一个模块，想加数据层就加一个文件。所有触及私有密钥的 API（OpenAI、AISStream、OpenSky OAuth、摄像头帧）都经硬化服务端代理，带 SSRF 防护、响应上限和消毒错误信息。

## 安装与上手

三条路径，都不需要账户：

```bash
# 路径 1：Pinokio 一键安装（Windows/macOS/Linux）
# 路径 2：终端（需要 Node.js 24.14+ 或 26.x）
git clone https://github.com/bilawalsidhu/gods-eye-view.git
cd gods-eye-view
npm ci && npm run doctor && npm run dev
# 路径 3：Docker（无需 Node）
docker compose up
```

打开 `http://localhost:4173`，首跑面板选 **Live Contacts**、**Space Missions**、**Environmental** 或 **Explore Manually**。一个 M5/Chrome 实测的中位冷启动是 1.86 秒。密钥在应用内 **POWER UP** 面板添加，不入库；删 `.env` 即忘掉所有密钥。

## 点评

**亮点**是它把"零配置可用"做到了同类罕见的高度：十八个图层免密钥， Esri 卫星底图 + keyless 地形开箱即用，语音和 3D 城市作为可选升级而非门槛。语音 Agent 的"先看场景再回答"和 MCP 集成，也让它成为少见的" Agent 可驱动的地理空间界面"。工程细节相当诚实——README 会告诉你哪个摄像头姿态是估计值、哪个数据是回放重建、哪个图层依赖的 OSM Overpass 服务器已拒绝旧版本。

**局限**也要说清楚。其一，**MIT 只覆盖源码**：bundled 的海底电缆数据集是 CC BY-NC-SA 3.0（禁商用）、数据中心/大坝是 ODbL、尼泊尔洪水影像是 CC BY-NC 4.0，商用前须逐个核对 `DATA_SOURCES.md`。其二，重依赖第三方 provider 的配额与条款，Google Maps 路线是计费的。其三，它天然带有监控伦理争议——把军用航班、车牌摄像头位置、4000 路公共摄像头聚于一屏，作者的对策是透明与可审查（" Locations and tags only: no plate data, no video"），但使用者应有自觉。其四，Docker 路径下本地 MCP 服务器与 OAuth 语音不可用。

适合人群：OSINT 与地理空间分析从业者、数据可视化开发者、想研究"实时信号 + LLM Agent 如何交互"的工程师，以及所有觉得地球仪本该如此的人。
