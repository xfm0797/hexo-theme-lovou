---
title: 开源项目 e2e：Agent 与断言同居一个测试，TesterArmy 开源的新一代端到端测试框架
date: 2026-10-17 20:35:00
updated: 2026-10-17 20:35:00
categories: 开源
tags:
- 开源项目
- 测试
- AI Agent
- TypeScript
- Playwright
---

# e2e

> Agent 与断言同居一个测试，TesterArmy 开源的新一代端到端测试框架

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [tester-army/e2e](https://github.com/tester-army/e2e) |
> | 语言 | TypeScript（npm 包名就叫 `e2e`） |
> | Stars | 约 1.10 万（2026-10-17 GitHub API 口径），Forks 550 |
> | 协议 | Apache-2.0 |
> | 状态 | pre-1.0（0.19.0，2026-10-09 发布），10 月第一周登顶 GitHub Trending |
> | 热度 | npm 周下载约 23.8 万；10 月 1 日仅 549 星，一周破 6 千 |

## 它想解决什么问题

用 AI 做 e2e 测试的团队，基本都撞过同一堵墙，而且撞两次：

- **第一类**：让 AI 生成 Playwright 脚本，生成完就归脚本管。UI 改一个按钮文案，一堆定位器失效，CI 红一片，维护成本全归你——AI 只在写脚本那一刻出场。

- **第二类**：测试本身就是一段自然语言，每次运行都让模型现场推理。灵活是真灵活，贵也是真贵。

e2e 的答案是：**让 Agent 步骤和精确断言住在同一个测试里**。该精确的地方用定位器，该灵活的地方用自然语言目标；而且 Agent 步骤只需"想一次"——通过检查的动作会被录制回放，之后不再调用模型。

## 核心机制拆解

**1. 混合断言，一份报告说清验了什么。** 需要精度时写 role-based 定位器和自动重试断言，需要灵活度时用 `agent.act()`、`agent.assert()`、`agent.extract()`：

```typescript
// tests/checkout.e2e.ts
import { test, expect } from 'e2e';

test('a member upgrades to Pro', async ({ app, agent, screen }) => {
await app.open('/settings/billing');
await agent.act('upgrade the workspace to the Pro plan');
await agent.assert('the invoice preview shows a prorated amount');
await expect(screen.getByRole('status')).toContainText('Pro');
});
```

Agent 自己看页面、找按钮、走完升级流程；最后一行仍是传统断言兜底。一条测试里，AI 干 AI 的，断言干断言的。

**2. 录制回放，token 开销跟着 UI 变化走。** Agent 步骤通过并被后续断言记录后，其动作序列进入缓存；下次运行直接回放，**零模型调用**，速度和脚本化测试一样快。只有应用变了、回放失败，才重新唤醒模型。这把"每次运行都付钱"变成了"只有变化才付钱"。

**3. 一套 API 覆盖 Web 与移动端。** Web 走 Playwright（Chromium / Firefox / WebKit），iOS 模拟器与 Android 模拟器走 agent-device；同一套 fixtures、定位器、断言跨平台复用，Web 应用和移动应用可以共享一个测试套件。想用托管基础设施时，Kernel 托管浏览器、Expo 托管模拟器都是一等公民——测试代码不变，只改配置。

**4. 自带订阅或 key，无加价。** 任何 AI SDK 模型都行：Vercel AI Gateway、OpenRouter 的 key，本地模型服务器，或者你已经在付的 ChatGPT / GitHub Copilot / SuperGrok 订阅。按服务商原价付 token，框架不加价。

**5. 凭据不进上下文。** 测试机密放在环境变量里、模型的视野之外。Agent 可以把密码敲进登录框，而密码从头到尾不出现在 prompt 里——模型跑在第三方 API 上时，这一点比想象中重要。

**6. 为 Coding Agent 而生。** 框架自带 Agent 技能和 MCP 服务器：Claude Code、Cursor、Codex 可以直接打开你的应用、探索界面、用真实 UI 的定位器写测试，并在挂掉时读取失败报告。文档随包分发（`node_modules/e2e/docs`），Agent 离线可读。TesterArmy 自己仓库的回归测试就是这么写的：构建功能的 Agent 顺手把测试也加了。

## 安装与上手

```bash
npx e2e init
```

初始化向导会问引擎（web/mobile）和模型服务商，然后写好配置和一个示例测试，多数项目一分钟内跑到第一个通过的测试。发布物包括 `e2e`（SDK/runner/CLI）、`@e2e-dev/web`、`@e2e-dev/mobile`、`@e2e-dev/github`（把结果贴到 PR 评论）、`@e2e-dev/kernel`、`@e2e-dev/eas`。遥测默认开启但只收集命令与引擎等匿名数据，`npx e2e telemetry disable` 一键关闭。

## 点评

**亮点**是它把"混合测试"从口号变成了默认形态：确定性断言保住 CI 的稳定性，Agent 步骤吃掉写不出 selector 的那部分界面；录制回放又把 Agent 测试从"每次全价"变成"按变化付费"。这个账任何用 AI 做测试的团队都算得过来——即便不用 e2e，"给 Agent 步骤加动作缓存与回放"这个思路也值得直接偷走。

**局限**：pre-1.0，API 与配置仍可能在 minor 版本间变动；首次全量铺开时模型调用有一次成本爬坡；桌面应用暂不支持；框架背后是商业公司 TesterArmy（跑在 PR 上的定时自然语言测试平台），开源框架是地基、楼上怎么收费要看后续——目前 Apache-2.0 这一层是干净的。

适合人群：受够定位器维护的 e2e 测试团队；想在 PR 里跑自然语言测试的平台工程团队；以及研究 Agent 与确定性系统如何协作的架构师。
