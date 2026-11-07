---
title: 开源项目 Zed：Rust 从零重写的极速编辑器，把多人协作做成一等公民
date: 2026-11-07 19:30:00
updated: 2026-11-07 19:40:00
categories: 开源
tags:
- 开源项目
- Rust
- 代码编辑器
- 实时协作
---

# Zed

> 由 Atom 与 Tree-sitter 原班人马打造，用 Rust + 自研 GPU 框架追求"以思维速度编写代码"

---

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [zed-industries/zed](https://github.com/zed-industries/zed) |
> | 语言 | Rust |
> | 渲染 | 自研 GPUI（GPU 加速 UI 框架） |
> | 平台 | macOS / Linux / Windows（WSL） |
> | 协议 | GPL-3.0 / AGPL-3.0（编辑器与协作服务端分别适用） |
> | 热度 | GitHub Trending 常客，新一代编辑器里最受关注的一个 |

## 它想解决什么问题

VS Code 用 Electron 赢下了市场，但代价是所有编辑操作都要穿过一层 Chromium。文件一大、项目一多，"输入到上屏"的那点延迟就开始被人感知。与此同时，结对编程、远程协作仍然要靠外挂插件和第三方会议软件拼起来。

Zed 的赌注是：**性能与协作都该是编辑器的内在属性，而不是插件**。它由 Atom 与 Tree-sitter 的原班人马打造，用 Rust 从零构建，主打"以思维速度编写代码"（code at the speed of thought）。

## 核心机制拆解

**1. GPUI：把界面交给 GPU。** 这是 Zed 性能的来源。自研的 GPU 加速 UI 框架让大量操作直接走 GPU 渲染与异步 I/O，绕开 Electron 那一层，启动与编辑延迟极低。这也是它敢叫"极速"的底气——不是优化出来的，是换掉了底座。

**2. 协作是一等公民，不是插件。** 内置协作服务器（collab server），支持多人同时编辑同一文档、共享光标与 selection，并通过 WebRTC 实现通话与屏幕共享。一人开一个工作区，别人"进来看"和"一起改"是同一个动作——这是它相对 VS Code + Live Share 的结构性差异。

**3. 语法解析来自 Tree-sitter 的创造者。** 增量语法解析精确且快，语言支持通过扩展机制提供。自己写解析器的人做编辑器，语法高亮与结构导航的上限天然高一些。

**4. 跨平台与可扩展。** 覆盖 macOS、Linux、Windows（WSL），兼容 JetBrains / Emacs 键位映射，支持扩展注册表，并内置 AI Agent 相关配置（`.agents`、`CLAUDE.md` 等）——它没有假装 AI 不存在，而是把 Agent 当作文本协作者接进工作流。

**5. 任务与终端。** 内置任务运行、文件变量（如 `$ZED_FILE`）与终端集成，编辑器内就能闭环跑构建与测试。

## 安装与上手

```bash
# 官方安装包：前往 zed.dev 下载稳定版或 Nightly
open https://zed.dev

# macOS 也可用 Homebrew；Linux 提供多种发行版构建脚本

# 源码构建（需 Rust 工具链）
git clone https://github.com/zed-industries/zed.git
cd zed
cargo build --release
```

想在本地起协作服务，仓库内提供了 `Dockerfile-collab` 与 `compose.yml`，起容器即可。

## 点评

**亮点**是把"用 Rust 重写编辑器"从噱头做成了结果：性能提升肉眼可见，而协作被做成了默认能力而非附加品。对一个新编辑器来说，这两件事同时成立相当难得——大多数项目只能在性能和生态里选一个。

**局限**也不藏着：生态与插件数量仍远不及 VS Code，日常依赖的冷门语言插件、调试器集成可能还没人写；协作功能很香，但团队要真正替换 VS Code，需要接受"部分工作流要重新拼"的成本；源码构建对 Rust 工具链版本敏感，追 Nightly 构建的稳定性要有心理准备；GPL 系许可对想二次分发的商业团队是个约束。

**适合人群**：需要低延迟编辑大文件的开发者；希望在同一编辑器里完成结对编程与远程协作的团队；追求原生性能、已经厌倦 Electron 重量级客户端的用户。

它证明了下一代编辑器不必在"轻"和"全"之间二选一——只要你愿意换掉底座。

---

- 项目仓库：[https://github.com/zed-industries/zed](https://github.com/zed-industries/zed)
- 官网：[https://zed.dev](https://zed.dev)
