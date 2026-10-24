---
title: 开源项目 DroidDeck：把 SteamOS 体验搬上安卓掌机，Steam 大屏模式 + ARM64 Proton，无需 root
date: 2026-10-20 20:40:00
updated: 2026-10-20 20:40:00
categories: 开源
tags:
- 开源项目
- 游戏
- Android
- SteamOS
- 掌机
---

# DroidDeck

> 在安卓掌机上复刻 SteamOS：Steam 大屏模式原生运行，Windows 游戏走官方 ARM64 Proton，免 root

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [Droid-Deck/DroidDeck](https://github.com/Droid-Deck/DroidDeck) |
> | 语言 | Kotlin（含 Rust 原生组件与商店引擎） |
> | Stars | 约 1.17 万（2026-10-20 GitHub API 口径），Forks 587 |
> | 协议 | GPL-3.0 |
> | 状态 | 2026-09-24 建库，不到一个月破万星；当前 0.2.0 阶段，Preview 构建活跃 |
> | 热度 | GitHub Trending 常客；官方警告"除 GitHub Releases 外不要信任何下载站" |

## 它想解决什么问题

Steam Deck 卖得很好，但更多玩家手里是安卓掌机（Adreno GPU 的一堆国产/移植设备）。这些设备刷机生态有限，原生安卓打游戏又慢又难管：没有 Steam 大屏、游戏库散落各处、Windows 游戏想都别想。

DroidDeck 的野心一句话：**在安卓掌机上复刻 SteamOS 的体验**——Valve 的 Steam 客户端以大屏模式（Big Picture）运行，Windows 游戏通过 Valve 官方 ARM64 Proton 转译，Linux 游戏走 Flathub，外加 GOG/Epic/Amazon 三大商店接入。不需要 root：装个 APK、装个运行时、登录、开玩。它是"老软件搬新设备"趋势的又一例——这次搬的是一整套桌面游戏操作系统。

## 核心机制拆解

**1. Steam 客户端原生跑。** 装上 Linux 运行时后，Steam Linux 客户端以 Big Picture 模式在安卓上直接运行；ARM64 游戏走 Proton，x86-64 的 Steam 客户端通过 FEX 模拟运行并保留 Proton 钩子。

**2. 多商店接入。** GOG/Epic/Amazon 账号统一接入，配合 Steam 库形成统一游戏墙。

**3. 免 root 设计。** 全部能力通过 APK + 运行时包交付，不碰系统分区——可玩性与保修两不误。

## 安装与上手

从 GitHub Releases 获取 APK 与运行时包（官方明确警告不要相信第三方下载站）；设备建议为 Adreno GPU 机型，具体兼容列表见仓库文档。当前处于 0.2.0 Preview 阶段，需接受一定的不稳定。

## 点评

**亮点**：一个月破万星的增速说明"安卓掌机变 Steam Deck"是巨大刚需；路线选得聪明——直接复用 Valve 官方 ARM64 Proton 而不是自研转译层，免 root 降低了尝试门槛；Kotlin + Rust 的工程栈扎实。

**局限**：0.2.0 阶段成熟度有限（404 个 open issues）；性能依赖设备 GPU，中低端芯片体验会打折；GPL-3.0 与 Valve 生态的法律边界值得持续关注；x86-64 客户端走 FEX 模拟仍有性能损耗。

适合人群：手持安卓掌机想体验 SteamOS 生态的玩家、愿意折腾 Preview 版本的极客，以及关注"二进制转译 + 容器化运行时"技术的工程师。
