---
title: 开源项目 security-audit-skill：Cloudflare 把内部漏洞挖掘系统开源，38K Star，让编程 Agent 变成安全审计员
date: 2026-10-22 20:38:00
updated: 2026-10-22 20:38:00
categories: 开源
tags:
- 开源项目
- 安全
- 代码审计
- AI Agent
- Cloudflare
---

# security-audit-skill

> AI 能写代码已经没人怀疑；AI 能找漏洞，Cloudflare 用自家生产环境投了票

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [cloudflare/security-audit-skill](https://github.com/cloudflare/security-audit-skill) |
> | 定位 | 多阶段安全审计的 coding-agent 技能，产出独立验证、机器可读的审计结果 |
> | 主要语言 | JavaScript |
> | Stars / Forks | 38,150 / 2,381（截至 2026-10-22） |
> | 许可证 | MIT |
> | 出身 | Cloudflare 漏洞挖掘体系（vulnerability discovery harness）的"单仓库起点" |

## 它想解决什么问题

AI 能写代码，已经没人怀疑；AI 能找漏洞，信的人还不多。Cloudflare 用行动投了票——他们把自己内部漏洞挖掘系统的"单仓库起点"开源了：security-audit-skill，一个把你的编程 Agent（Claude Code、Cursor 等）变成安全审计员的技能包。38,150 Stars，且是 Cloudflare 官方在生产环境验证过的方案。

## 六阶段审计流水线

这个 Skill 的本质，是把专业安全团队的工作方法"编译"成 Agent 可执行的流程：

**1. 侦察（Reconnaissance）。** 梳理架构、信任边界、输入面与历史证据，产出 architecture.md 和 coverage-ledger.json（覆盖度账本）。

**2. 覆盖度驱动的狩猎（Coverage-led hunting）。** 从覆盖度账本分配隔离的"猎手" Agent，覆盖度评论员（critics）专职找盲区——确保攻击面不被遗漏。

**3. 候选验证。** 每个候选漏洞交给一个**全新的验证 Agent**，它的任务只有一个："尝试推翻它"。用对抗机制压低误报率。

**4. 结构化输出。** confirmed / needs_validation / rejected 三类结论写入 findings.json，按 report-schema.json 校验——机器可读，可直接接 CI 门禁。

**5–6. 报告与复盘。** 汇总人类可读报告，并把本轮经验写回，供下次审计复用。

## 安装与上手

```bash
npx skills add cloudflare/security-audit-skill
```

装进 Claude Code / Cursor 等编码 Agent 后，对目标仓库下达审计指令即可；结果文件可直接纳入安全流程。

## 点评

**亮点**：这不是"让 AI 顺便看看安全问题"，而是把专业安全团队的方法论（覆盖度账本、对抗验证、结构化结论）完整工程化——设计的水准来自 Cloudflare 真实的漏洞挖掘实践；MIT 开源 + 生产验证，含金量在同类 Agent 技能里独一档。

**局限**：审计质量仍受底层模型能力上限约束，高危系统不能只靠它；多 Agent 流水线的 token 消耗不小；对非 Web 类目标（固件、移动原生）的覆盖有限。

适合人群：需要在 CI/发布流程中加安全门禁的工程团队、安全工程师想把 Agent 纳入日常工作流、以及所有研究"如何把专家方法论编译成 Agent 技能"的人。
