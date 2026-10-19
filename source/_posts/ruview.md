---
title: 开源项目 RuView：把普通 WiFi 信号变成穿墙视觉，9 美元 ESP32 节点实现无摄像头生命体征监测
date: 2026-10-19 20:37:00
updated: 2026-10-19 20:37:00
categories: 开源
tags:
- 开源项目
- WiFi 感知
- 空间智能
- 边缘 AI
- Rust
---

# RuView

> 把普通 WiFi 信号变成穿墙视觉，9 美元 ESP32 节点实现无摄像头生命体征监测

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [ruvnet/RuView](https://github.com/ruvnet/RuView)（前身 WiFi-DensePose） |
> | 语言 | Rust（v2 工作区）+ Python（v1） |
> | Stars | 约 9.87 万（2026-10-19 GitHub API 口径），Forks 12,930 |
> | 协议 | MIT |
> | 状态 | 2025-06 创建，2026-10 当月仍有提交，工具包 0.9.x，1,463+ 测试通过 |
> | 热度 | Trendshift 日榜高位；基于 RuVector 与 Cognitum Seed 构建 |

## 它想解决什么问题

摄像头能看到一切，但摄像头也意味着隐私争议、光线依赖和"被监视感"。RuView 的赌注是：**每个房间里早已充满 WiFi 无线电波，人体对电磁波的扰动本身就携带了位置、呼吸、心跳甚至姿态信息**——不需要任何摄像头和可穿戴设备，用 Commodity WiFi 信号实现"穿墙视觉"：存在检测、人数统计、呼吸率/心率、跌倒识别、17 个人体关键点姿态估计，全部在边缘设备上完成，无云依赖。

它把"邻居家的路由器"变成免费雷达照射源，把 9 美元的 ESP32 开发板变成感知节点。

## 核心机制拆解

**1. 物理层：CSI 扰动捕获。** 人在空间里移动、呼吸甚至静坐，都会扰动 WiFi 信道。RuView 跨 6 个 WiFi 信道做多频 mesh 扫描，从低成本 ESP32-S3 传感器捕获**信道状态信息（CSI）**——每个子载波的幅度与相位变化就是"人体扰动"的原始信号。

**2. 边缘推理：脉冲神经网络 + 8KB 模型。** 设备端用脉冲神经网络（SNN）在 **30 秒内**自适应本地环境；预训练模型仅 **8KB（4-bit 量化）**，在树莓派上级别硬件上以**微秒级**推理（Hugging Face 上公开为 `ruvnet/wifi-densepose-pretrained`）。

**3. 多节点融合与个体分离。** 跨节点的 RSSI 加权特征融合（离得近的节点权重更高）；**DynamicMinCut** 在子载波时间相关矩阵（Pearson 边）上做图最小割/最大流，把重叠的人分开——这是"数清楚房间里几个人"的关键。

**4. 密码学见证链。** 每次感知测量都经 **Ed25519 见证链**签名存证——感知结果可作为"证据"使用，这在安防与养老场景里是刚需。

**5. 诚实的精度口径。** v2 编码器的无标签留出**时序三元组精度 82.3%**（原始 66.4%）；早期"100% 存在检测"的宣传因只在单类录音上测得而**已撤回**。项目用 MEASURED / CLAIMED / SYNTHETIC 三级标签严格标注每个论断，甚至公开记录负面结果（RuForecast 模型在真实数据上持续输给平凡基线，如实记录而非隐藏）。

**6. 智能家居原生集成。** 一个 `--mqtt` 标志接入 Home Assistant（HA-DISCO 协议）；HAP-1.1 桥接 Apple Home/HomePod；经 HA 桥接或 Matter 端点支持 Google Home/Alexa。每个节点输出 **21 个实体**（11 个原始信号 + 10 个语义状态，如 someone-sleeping、possible-distress、fall-risk-elevated、elderly-inactivity-anomaly），附 3 个入门 HA Blueprint。

## 安装与上手

```bash
# npm 工具包（主入口）
npx @ruvnet/ruview@0.9.1 doctor        # 环境自检
npx @ruvnet/ruview@0.9.1 devices       # 发现节点
npx @ruvnet/ruview@0.9.1 esp32 --watch # 实时 CSI 流
npx @ruvnet/ruview@0.9.1 mcp start     # MCP 服务器（stdio/HTTP）
npx @ruvnet/ruview@0.9.1 mod           # Claude Code 实时感知面板

# Python 库
pip install wifi-densepose
from wifi_densepose import WiFiDensePose
```

硬件门槛：ESP32-S3 CSI 节点（低至 **9 美元/节点**，亦支持 Realtek RAC1），树莓派级设备即可推理；可选 60GHz 毫米波雷达与 LiDAR 扩展。Docker 镜像 `ruvnet/wifi-densepose` 多架构发布。安全模型上，Agent 运行默认只读，硬件访问需显式授权，刷新/校准从不走 HTTP。

## 点评

**亮点**是把"WiFi 感知"从论文做成了可复现的工程系统：8KB 模型 + 微秒推理 + 30 秒环境自适应，让整套东西跑在 9 美元节点上；DynamicMinCut 多人分离、Ed25519 见证链、HOMECORE 本地自动化（Wasm 插件、HomeKit）都是真需求而非 demo 功能。更难得的是**证据诚实文化**——撤回过度宣传、公开负面结果、三级证据标签，在热度驱动的开源圈里近乎异类。对养老监护（无摄像头跌倒检测）、智能家居占用感知、隐私敏感空间管理，这是目前开源界最完整的方案。

**局限**同样写死在文档里：统一 RF 世界模型（融合 WiFi/雷达/UWB/蜂窝）的精度目前只有合成数据验证；部分姿态模式明确标注"粗粒度身体视差，非头部追踪"；ESP32 硬件端到端延迟实测尚未完成；设备上报的生命体征标注为"未验证"。把它当科研与原型平台很成熟，当医疗设备还远。

适合人群：智能家居与物联网开发者、养老/安防场景团队、边缘 AI 与信号处理研究者、想研究"射频感知 + 脉冲神经网络"的人，以及所有对"无摄像头感知"方向好奇的极客。
