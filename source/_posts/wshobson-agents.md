---
title: 开源项目 wshobson/agents：4.1 万 Star 的多 harness 插件超市，94 个插件通吃 7 种编码 Agent
date: 2026-10-26 20:54:00
updated: 2026-10-26 20:54:00
categories: 开源
tags:
- 开源项目
- wshobson
- 插件市场
- ClaudeCode
- AIAgent
---

# wshobson/agents

> 一份 Markdown 源，为七种 harness 分别生成安装产物——换工具不用重装技能

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [wshobson/agents](https://github.com/wshobson/agents) |
> | 语言 | Python |
> | Stars | 41,743（2026-10-26），Forks 4,428 |
> | 协议 | MIT |
> | 状态 | 2025-07-24 建库 |
> | 内容 | 94 个插件 / 202 个 Agent / 185 个技能 / 105 个命令 |

## 它想解决什么问题

如果你同时在用 Claude Code、Codex、Cursor、OpenCode，那么"装一个技能"这件事很快就会变成七套格式的手工活：同一份内容，抄七遍，还要各自维护更新。

wshobson/agents 把这个问题一次性解决了：一个仓库，用同一份 Markdown 源，为七种 harness 分别生成安装产物。

## 核心机制拆解

**1. 格式适配层是工程核心。**

| Harness | 安装方式 |
| --- | --- |
| Claude Code | 插件市场（原生） |
| Codex CLI | 原生市场或生成产物（8KB 预算会拆参考文件） |
| Cursor | 插件市场 + 精选项目规则 |
| OpenCode / Antigravity / Copilot / Pi | clone 后 `make install-*` 生成对应格式 |

注意 Codex 那一行的细节：**8KB 预算会拆参考文件**——这类平台限制的处理，才是"适配层"真正的工作量所在。

**2. 按需取用，不必装全家桶。**

```bash
gh skill install wshobson/agents python-testing-patterns
# 或
npx skills add
```

**3. 内容是正经工程技能，不是玩具。** 插件覆盖硬通货领域：

- `python-development`：Python、Django、FastAPI、测试、打包；
- `javascript-typescript`：JS/TS 开发与项目搭建；
- `developer-essentials`：代码审查、调试、Git、测试模式；
- `security-scanning`：安全审查、依赖检查、代码扫描。

典型用法是在 Claude Code 里 `/plugin marketplace add wshobson/agents`，然后 `/python-development:python-scaffold Create a FastAPI service with tests`——一句话起一个带测试的 FastAPI 服务。

**4. 它在生态里的位置。** 2026 年这个领域已经很拥挤：ECC 是"个人维护的 harness 性能优化系统"，`anthropics/claude-plugins-official` 是官方目录，而 wshobson/agents 更接近一个**中立的插件超市**——内容偏工程实践，不绑模型厂商，harness 覆盖是同类里最广的之一（连 Pi、Antigravity 这种新工具都有适配）。

## 安装与上手

- 项目仓库：<https://github.com/wshobson/agents>
- Claude Code：`/plugin marketplace add wshobson/agents`

## 点评

**亮点**是押中了"内容层"这个舒服的卡位。当编码 Agent 的格式战争短期分不出胜负，做最大公约数的内容库就是稳赚的生意——用户的选择逻辑也很简单：别让我换个工具就重装一遍技能。

**局限**：生成产物意味着部分平台的能力会被"最低公分母"限制，深度集成仍不如原生插件；202 个 Agent / 185 个技能的体量带来选择负担，需要自己筛；内容质量参差，生产使用前建议先在低风险仓库试跑。

适合人群：多工具混用的开发者（一套技能跟人走，不跟工具走）；想要现成工程规范（审查、安全扫描、测试模式）的团队；研究"一份源适配七种格式"的插件作者。
