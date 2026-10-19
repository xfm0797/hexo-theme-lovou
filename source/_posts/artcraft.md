---
title: 开源项目 ArtCraft：Rust 写的"艺术家 IDE"，先把场景布好，再让模型生成
date: 2026-10-18 20:36:00
updated: 2026-10-18 20:36:00
categories: 开源
tags:
- 开源项目
- AI 创作
- Rust
- 图像生成
- 视频生成
---

# ArtCraft

> Rust 写的"艺术家 IDE"，先把场景布好，再让模型生成

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [storytold/artcraft](https://github.com/storytold/artcraft) |
> | 语言 | Rust（桌面应用） |
> | Stars | 约 3.23 万（2026-10-18 GitHub API 口径），Forks 5112，周增约 2 万 |
> | 协议 | MIT 或 Apache-2.0 双许可（自选） |
> | 状态 | 2022 年创建，当前稳定版 v0.41.0（2026-09-26），10 月连续一周登顶 GitHub Trending 周榜 |
> | 热度 | 10 月 11 日主线提交新增 Midjourney / fal 模型源选择；同门的 PhotoCraft 等 Rust 重写系项目同步霸榜 |

## 它想解决什么问题

今天的 AI 图像/视频工具，主流交互是一句话 prompt 加反复抽卡。对概念设计和影视预演来说，这是错位的：**艺术家真正需要控制的是构图、角色身份和机位，而不是把同一段构图每次都用长 prompt 重新描述一遍**。角色换个场景就不像同一个人，机位无法精确摆放，场景无法复用——生成结果不可重复，工艺就无从谈起。

ArtCraft 的答案是把自己定位成 "The IDE for artists"：2D 画布打底、3D 场景布景、生成放在最后一步。用团队的原话说，是把 prompting 变成 *crafting*——**先搭建场景，再生成图像**。

## 核心机制拆解

**1. 布景工具链，全部围绕"可重复"设计。** README 列出的 crafting 功能包括：Image to Location（把虚拟演员放进一致的环境，同一房间规划多个镜头）、3D Image Compositing（背景、前景、道具分层堆出纵深）、2D Image Compositing（图层、抠像、绘制工具）、Image to 3D Mesh（图像变可精确摆放旋转的 3D 物体）、Character Posing（先摆角色姿态和相机再生成）、Scene Blocking with Kitbashing（3D 资产套件控制机位、物体摆放与景深）、Character Identity Transfer（用摆好姿势的人体模型引导角色身份一致性）、Background Removal 与 Mixed Asset Crafting（抠图、世界、网格混编同一场景）。分镜师可以把同一个角色、同一个房间的关系固定下来，而不是每次重新描述。

**2. 模型中立，62 个模型的目录。** ArtCraft 自身提供图像、视频、音乐音效、3D 网格与世界生成，同时直接接入 Grok（Grok Imagine / Grok Video）、Midjourney、Sora（Sora 1/2 与 GPT Image 1）和 World Labs（Marble 世界生成的 Gaussian splats）。展开的完整目录有 62 个模型：图像 16 个（Nano Banana 系列、GPT Image 系列、FLUX 系列、Seedream 系列）、视频 25 个（Seedance、Kling、Veo、Sora、Vidu、MiniMax、Flux 家族）、音乐音效 5 个（Suno、Seed Audio）、3D 网格 11 个（Hunyuan 3D、Tripo3D、Meshy、Rodin）、世界/splat 5 个（Marble、TripoSplat）。10 月 11 日的主线提交加入了 Midjourney-or-fal 的 provider 选择——用你自己的账号或 API key。计划中还有 Kling、Google、Runway、Luma 直连接入，以及对 OpenArt、Freepik 等聚合器订阅的复用。

**3. 桌面级工程。** Rust 实现，Windows 与 macOS 提供稳定版下载，GitHub Releases 给最新构建，Linux 可从源码编译（`_docs/dev_setup.md`）。项目有 Discord 社区、YouTube 演示频道和公开 ROADMAP。

## 安装与上手

从 [getartcraft.com](https://getartcraft.com/) 下载稳定版（Windows / macOS），或从 GitHub Releases 取最新构建；开发者可按 `_docs/dev_setup.md` 从源码构建。典型工作流：先用文本生图探索想法，满意后把结果拖进 3D 场景布景——摆好人偶、架好相机、套件堆出环境——再触发最终生成；做视频则用 Image to Video 配合视频模型与生成控制参数。

## 点评

**亮点**在于它切中的是真痛点：角色一致性与机位控制。Character Identity Transfer 和 Image to Location 这两个功能，等于把传统影视预演里的"人偶 + 微缩模型"工作流搬进了 AI 工具。模型中立策略也很关键——62 个模型的目录加自有账号接入，让工具不绑定任何一家供应商，开源客户端不等于模型免费，但选择权在用户手里。Rust 桌面应用 + 双许可（MIT/Apache-2.0）对二创和商业嵌入都友好。

**局限**：模型访问成本自理（Midjourney、Sora 等按各家计费）；仍在 pre-1.0（v0.41.0），API 与功能面还在快速变动；439 个 open issue 说明社区反馈在快速堆积；与同门的 PhotoCraft、PdfCraft、FilmCraft 等"纯 Rust 重写 Adobe 全家桶"项目共享品牌热度，选型时要注意区分物种——ArtCraft 是 AI 生成向的创作 IDE，那几个是传统生产力工具的 clean-room 重写。

适合人群：需要角色/场景一致性的概念艺术家、分镜与影视预演团队、在多个图像视频模型间切换的创作者，以及想观察"AI 创作工具从 prompt 工程走向布景工程"这一转向的人。
