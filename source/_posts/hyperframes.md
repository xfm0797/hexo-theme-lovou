---
title: 开源项目 Hyperframes：HeyGen 开源"写 HTML 渲染视频"，69.7K Star，专为 Agent 而生
date: 2026-10-22 20:37:00
updated: 2026-10-22 20:37:00
categories: 开源
tags:
- 开源项目
- Hyperframes
- 视频生成
- HeyGen
- 程序化视频
---

# Hyperframes

> 视频就是一帧帧的网页：写 HTML/CSS/GSAP 定义每一帧，渲染引擎按时间轴逐帧编码成视频

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes) |
> | 定位 | 写 HTML，渲染视频（Write HTML. Render video. Built for agents.） |
> | 主要语言 | TypeScript |
> | Stars / Forks | 69,670 / 6,305（截至 2026-10-22） |
> | 许可证 | Apache-2.0 |
> | 当前版本 | v0.8.185（2026-10-21） |

## 它想解决什么问题

做视频的人分两派：剪辑派（Premiere/Final Cut）和代码派（Remotion/FFmpeg）。现在，HeyGen 把这个分野推向了新阶段——他们开源的 Hyperframes 把视频制作变成"写 HTML"，并且从第一天就是为 AI Agent 设计的。近 7 万 Stars，本月榜单上最独特的技术项目。

## Write HTML. Render video.

Hyperframes 的核心思想简单到离谱：**视频就是一帧帧的网页**。你写 HTML/CSS/GSAP 动画定义每一帧的内容，Hyperframes 的渲染引擎按时间轴逐帧截图，编码成视频。

这个思路继承了 Remotion 的衣钵，但 Hyperframes 在两个方向上走得更远：

**其一，为 Agent 优化创作流程。** 项目在 10 月做了一次 Skills 系统大重构，从 21 个技能精简为 7 个知识型技能（hyperframes、hyperframes-cli、hyperframes-registry、media-use、figma、slideshow、remotion-to-hyperframes）。理念很明确：给 Agent 的是"知识"而不是"流程"——Agent 需要知道什么是好的分镜、什么是禁用的默认样式，而不是被一步步牵着走。

**其二，HeyGen 的视频基因。** 作为 AI 视频头部公司，HeyGen 把生产级视频工程经验（媒体处理、转场、字幕、配音整合）沉淀进了渲染管线，这是社区项目难以复制的部分。

## 快速上手

按仓库文档安装 CLI，写一个 HTML 时间轴文件，一条命令渲染成视频；现有 Remotion 项目有官方迁移路径（remotion-to-hyperframes 技能）。

## 点评

**亮点**："HTML 即视频"把视频创作的门槛降到前端工程师零学习成本，对 Agent 则是完美的结构化创作介质；Skills 精简为"知识型"的设计哲学值得所有 Agent 工具作者学习；HeyGen 生产环境背书 + Apache-2.0，7 万星的热度有实打实的工程支撑。

**局限**：v0.8.x 尚在快速迭代，API 稳定性需留意；复杂实拍素材的整合不如专业 NLE；渲染是逐帧截图路径，长视频的性能与内存需要规划。

适合人群：需要程序化批量生产视频的团队（课程、营销、数据播报）、想让 Agent 自动产出视频内容的开发者、从 Remotion 迁移寻找更 Agent 友好方案的团队。
