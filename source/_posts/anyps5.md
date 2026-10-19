---
title: 开源项目 AnyPS5：不做模拟器，把 PS5 可执行文件静态转译成 Linux/Windows 原生程序
date: 2026-10-18 20:37:00
updated: 2026-10-18 20:37:00
categories: 开源
tags:
- 开源项目
- 二进制翻译
- 游戏
- C++
- Vulkan
---

# AnyPS5

> 不做模拟器，把 PS5 可执行文件静态转译成 Linux/Windows 原生程序

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [boykopovar/AnyPS5](https://github.com/boykopovar/AnyPS5) |
> | 语言 | C++ |
> | Stars | 约 4.25 万（2026-10-18 GitHub API 口径），Forks 3851，周增约 2 万 |
> | 协议 | GPL-2.0 |
> | 状态 | 2026-08-03 创建，一周暴涨 1.5–2 万星，10-18 仍有提交，Open Issues 1007 |
> | 热度 | 2026 年 10 月 GitHub Trending 周榜前三；社区维护 [blocker map](https://alxcbtw.github.io/anyps5-roadmap/) 逐游戏追踪进度 |

## 它想解决什么问题

把 PS5 游戏带到 PC，传统答案只有模拟器：完整模拟 PS5 的 CPU/GPU/系统，开销巨大、进度缓慢。AnyPS5 走的是另一条路——**二进制重编译加库重实现**：把 PS5 可执行文件直接转换成 Linux/Windows 原生格式的程序，转换后的程序作为普通进程运行，调用原生实现的 PS5 系统库。README 一句话概括："**Nothing is emulated**（没有任何东西被模拟）：转换后的可执行文件作为普通进程运行，调用系统库的原生实现。"

项目自我定位为互操作性、研究与保存目的，不分发任何受版权保护的固件、密钥或专有库——法律姿态明确。

## 核心机制拆解

**1. Relinker：改格式，不改逻辑。** 输入 PS5 游戏 ELF 与 `sce_module/*` 模块文件，流水线依次处理：可选的 Intel lowering（降低 AMD 专有指令）、按 NID（Name ID）读取导入并检查系统调用、剔除未用 NID、构建 SysV 动态段、转换捆绑模块，最后由 `LinuxElfPatcher` / `WindowsPePatcher` 产出 `app.elf` 或 `app.exe`。NID 是 PS5 系统库按函数名哈希出的导出标识——重实现库按同一规则导出 NID，操作系统加载器在加载时完成绑定，这就是"不需要模拟层"的原因。

**2. 原生重实现的 prx 系统库。** `core/libs/prx` 下每个库编译为共享库，`nid_patcher` 把每个导出改名为其 NID；未知原名的函数用 `APS5_EXPORT("<nid>", func)` 直接指定。libkernel 的 pthread、APR/AMM 命令缓冲队列（两个独立队列加工作线程，等待卸载给 worker，提交者永不挂起）、动态模块加载等都以原生 C++ 重写。Windows 构建是确定性的（`SOURCE_DATE_EPOCH=0` + `ranlib -D`），改一个库只重链它自己。

**3. Shader 重编译器：RDNA 到 SPIR-V 的静态翻译。** PS5 GPU 命令缓冲里的 RDNA 着色器，经 `RdnaDecoder` 解码、构建控制流图并结构化、转内部 IR、SSA 构造与资源解析，由 `SpirvBackend` 产出 SPIR-V（可选经 SPIRV-Tools 校验优化），再经重实现的 `libSceAgcDriver` 构建 Vulkan 管线。缓存体系相当工程化：会话内变体缓存、磁盘缓存（当前格式版本 35，旧格式直接拒绝）、预构建着色器包（sorted key-hash 索引 + magic/版本/校验和验证）、管线日志（设备创建时按 GPU 指纹回放至多 1024 条已构建管线，游戏加载时并行预热）。支持 `VK_EXT_graphics_pipeline_library` 四段管线链接与动态渲染；着色器准备可后台线程池化（`APS5_LAZY_SHADER_PREPARE=1` 可延迟到首次绘制）。

**4. 访客内存与绘制流水线。** GPU 经 `VK_EXT_external_memory_host` 导入访客内存（64 MiB 窗口 + LRU 退役）；Windows 上用 `MEM_WRITE_WATCH` 写追踪做延迟读。管线化绘制默认开启：queue 0 worker 超前解码绘制指令，带写范围危险跟踪，提交线程随后执行。

**5. 配套体验。** 提供 [Web 转换器](https://boykopovar.github.io/AnyPS5/)（文件不离开本机）、SDL 手柄映射（摇杆与扳机）、`anyps5-input.ini` 键鼠配置、逐游戏进度在 blocker map 与 "Game bring-up" 讨论区公开追踪。不支持或意外状态严格抛 `std::runtime_error`——不装作成功。

## 安装与上手

从 Releases 获取构建，或按 `docs/dev/BUILD.md` 从源码编译；用法见 `docs/user/USAGE.md`。典型流程：用 relinker 把 PS5 游戏 ELF 与模块转换为 `app.elf`/`app.exe` 加重编译系统库，然后作为普通程序运行。想评估某个游戏能不能跑，先查 blocker map 上的逐游戏阶段与阻塞项。

## 点评

**亮点**是技术路线的选择本身：放弃全系统模拟，改做"静态重链接 + 系统库原生重实现 + 着色器静态重编译"，换来的是原生进程的性能上限和可调试性。工程透明度罕见——架构文档、技术债务清单、代码规范全部公开，进度按游戏逐个追踪，着色器缓存与管线预热的设计说明作者清楚自己在解决什么。一周两万星的增速说明"不模拟器"的承诺对玩家吸引力巨大。

**局限**同样明显：GPL-2.0 对商业复用是硬约束；1007 个 open issue 与"系统库完成度按已知函数计"的坦诚（进度百分比只覆盖项目已声明的函数，不是全部 PS5 系统函数）说明距离大面积可玩还有距离；着色器 MODE 寄存器运行时变更直接抛错（列为技术债务）；跨 GPU 的管线日志需按指纹重启。法律与伦理边界使用者自负——项目只做互操作，ROM/固件来源合法性在你。

适合人群：系统程序员、二进制翻译与编译器研究者、游戏保存社区参与者，以及想理解"PS5 游戏如何在没有模拟器的情况下跑在 PC 上"的所有人。
