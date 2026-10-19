---
title: 开源项目 xtool：在 Linux 和 Windows 上用 SwiftPM 构建并部署 iOS 应用的 Xcode 替代品
date: 2026-10-18 20:40:00
updated: 2026-10-18 20:40:00
categories: 开源
tags:
- 开源项目
- iOS 开发
- Swift
- 开发工具
- 跨平台
---

# xtool

> 在 Linux 和 Windows 上用 SwiftPM 构建并部署 iOS 应用的 Xcode 替代品

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [xtool-org/xtool](https://github.com/xtool-org/xtool) |
> | 语言 | Swift |
> | Stars | 约 1.25 万（2026-10-18 GitHub API 口径），Forks 626，10 月中旬单周增约 1.2 千 |
> | 协议 | MIT |
> | 状态 | 2024-11 创建，持续更新（10-18 仍有 PR 合入），最新版本 1.22.2 |
> | 热度 | 10 月中旬登上多个第三方 GitHub Trending 榜；基于 Xcode 27 SDK / Swift 6.4 构建 |

## 它想解决什么问题

iOS 开发被 Xcode 和 macOS 绑定十五年：想构建、签名、部署一个 iOS app，你得有一台 Mac。xtool 的定位是一句话——**"Cross-platform Xcode replacement"**：用开放标准在 Linux、WSL、Windows（以及 macOS）上把 SwiftPM 包构建成 iOS app，完成签名、安装到真机，并程序化地操作 Apple Developer Services。

它不模仿 Xcode 的 GUI，而是把 iOS 开发工作流拆成可脚本化的 CLI 原语——这恰好是 CI 流水线和 Linux 开发机最需要的东西。

## 核心机制拆解

**1. SwiftPM 即工程格式。** 项目就是标准 SwiftPM 包：`xtool new` 脚手架，`xtool dev` 构建并运行。没有 `.xcodeproj`，没有 Xcode 工程文件，构建完全走 Swift 工具链。

**2. Darwin Swift SDK 管理。** `xtool sdk` 子命令负责 Darwin Swift SDK 的下载与配置——这是跨平台编译 iOS 的核心依赖（Linux Swift 工具链 + 面向 Apple 平台的 SDK）。xtool 与 SwiftBuild（swift-tools-protocols）集成，构建工作流跟随上游：当前基于 Xcode 27 SDK 与 Swift 6.4，CI 用 `swift:6.4.0` Docker 镜像验证；Linux 上对 Swift 6.4+ 的 `-Xfrontend -enable-cross-import-overlays` 兼容问题（如 SwiftUI + PhotosUI）有专门修复。SDK 有 epoch 机制，xtool 更新后 SDK 会按需重建。

**3. 签名与部署端到端。** `xtool auth` 管理 Apple Developer Services 认证；`xtool devices` / `install` / `launch` / `uninstall` 操作真机。证书管理、 provisioning profile 创建、签名安装全流程可在 Linux 上完成——PR #306 修复了证书序列号前导零匹配、profile 创建与分页拉取等问题，并在 Linux 上向物理 iPhone（iOS 27）签名安装验证通过。

**4. XKit：把 Apple 服务搬进你自己的 App。** xtool 不只是一个 CLI，它还以 SwiftPM 库形式发布 XKit——用你自己的 Swift 代码与 Apple Developer Services、iOS 设备交互：

```swift
.package(url: "https://github.com/xtool-org/xtool", .upToNextMinor(from: "1.2.0")),
// .product(name: "XKit", package: "xtool")
```

**5. 分发形态多样。** Linux 提供 AppImage（因 swift-build 问题 #1764 改用动态链接）和预构建 Docker 镜像（带 docker-compose），官方文档分别给出 Linux/Windows 与 macOS 的安装指南及首个 App 教程。

## 安装与上手

按 [官方文档](https://xtool.sh/documentation/xtool/) 分平台安装（Linux/Windows 需先备好 Swift 工具链，再由 `xtool sdk` 拉取 Darwin Swift SDK），然后：

```bash
xtool new MyApp        # 创建 SwiftPM 工程
xtool dev              # 构建并部署到真机
xtool ds               # 程序化操作 Apple Developer Services
```

随后跟一遍 [first-app 教程](https://xtool.sh/tutorials/xtool/first-app)，即可在 Linux/Windows 上跑通从构建到部署的完整回路。

## 点评

**亮点**是它把"iOS 开发 = macOS 特权"这个十五年默认值打破了，而且路线正确：不重造 IDE，而是用 SwiftPM + Darwin SDK + Apple 服务 API 把工作流原语化。对 CI 场景价值尤其直接——Linux 构建机上 nightly 出 iOS 包，不再需要常备 Mac mini。XKit 的发布说明作者想占的不只是 CLI 市场，还有"用 Swift 代码操作 Apple 基础设施"这个生态位。MIT 协议干净，社区接受度高（单周 +1.2k 星的增速在成熟工具里少见）。

**局限**要认清：**面向物理真机，不提供模拟器**——界面迭代快的团队仍需 Xcode 配合；签名与部署依赖 Apple Developer 账号（免费账号亦可，能力受限）；跨平台编译依赖 Darwin Swift SDK 与特定 Swift 工具链版本，环境搭建有门槛；1.22.2 存在一个已修复于主线的 bug，跟进最新构建更稳；构建 xtool 自身需要 macOS 14 / iOS 17 部署目标（因 swift-tools-protocols 依赖）。

适合人群：Linux/Windows 上的 Swift 与 iOS 开发者、需要 Linux CI 构建 iOS 包的团队、想程序化管理证书与 profile 的 DevOps，以及所有受够"为了 iOS 开发必须买 Mac"的人。
