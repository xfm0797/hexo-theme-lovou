---
title: 开源项目 Agent Reach：10.2 万 Star 的国产 CLI，让 Agent 够得着整个中文互联网
date: 2026-10-26 20:45:00
updated: 2026-10-26 20:45:00
categories: 开源
tags:
- 开源项目
- AgentReach
- AI Agent
- 数据采集
- 国产开源
---

# Agent Reach

> 把 B 站字幕、知乎之外的登录墙、中文平台与视频内容，做成一等公民 CLI——零 API 费用

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach) |
> | 语言 | Python 3.10+ |
> | Stars | 102,923（2026-10-26），Forks 9,132，月增 17,531 |
> | 协议 | MIT |
> | 状态 | 2026-02-24 建库，README 为中文 |
> | 定位 | 给 AI Agent 接上"它自己上不去的互联网" |

## 它想解决什么问题

Claude Code、Codex 这类 CLI Agent 自带搜索和网页读取，但有一大堆东西它们基本够不着：

- 要登录才能用的功能（小红书搜笔记、X 查账号）；
- 视频里的内容（B 站与 YouTube 字幕、播客转写）；
- 覆盖很差的中文平台；
- 干净的结构化数据。

Agent Reach 就是来补这个缺口的：把这些平台背后的工具替你装好、测好，Agent 一条命令就能用。

## 核心机制拆解

**1. 渠道分三级，覆盖 20+ 平台。**

| 渠道 | 等级 | 能做什么 |
| --- | --- | --- |
| bilibili | 默认 | 搜索、视频信息、热门、字幕 |
| v2ex | 默认 | 热门、节点、帖子和回复、用户 |
| github | 默认 | 搜仓库、读 README、读 issue 与 PR（含评论） |
| youtube | 默认 | 视频信息、搜索、字幕、语音转文字 |
| web | 默认 | 网页搜索、网页阅读（保底） |
| xiaohongshu / xueqiu / boss / xiaoyuzhou / linkedin / reddit | 可选 | 各平台深度功能（部分需登录） |
| twitter / facebook / instagram | 实验 | 搜索、资料、推文串 |

**2. 统一 CLI 形态。** 渠道 + 动作 + 参数，或者直接给链接让它自己选渠道：

```bash
agent-reach channels                          # 看有哪些渠道
agent-reach bilibili search "大模型"          # 渠道 + 动作 + 参数
agent-reach read https://www.v2ex.com/t/123  # 按链接自动选渠道
```

**3. 安全上的坦白。** README 专门有一节回答"会碰我的浏览器和账号吗"：要登录的平台用 Agent Reach 自己的专用浏览器，后台运行、不弹窗；第一次用某个网站时，会把你 Chrome 里该网站的登录复制一份过去，**原浏览器不动，不读密码库**。复制来的通常是主账号——官方建议换成小号，并给了具体做法。这种把风险写在明处的做法，比含糊其辞的"安全"承诺可信得多。

**4. 已经进入厂商生态。** 腾讯云、优刻得等把它做进了自家 Agent 生态（README 里有腾讯云 Lighthouse 一键部署 OpenClaw + Agent Reach 的套餐），Bright Data、RapidProxy 等数据厂商是赞助商。

## 安装与上手

- 项目仓库：<https://github.com/Panniantong/Agent-Reach>
- 零 API 费用，个人自托管几乎没有试用成本

## 点评

**亮点**是精确踩中了"Agent 有大脑、没感官"的痛点。通用搜索对中文平台和登录墙后的内容覆盖很差，让 Agent 操作真实浏览器又重又脆——把每个平台的适配做成 CLI 一等公民，等于给整个生态发了一副眼睛。

**局限**：依赖登录态的功能天然脆弱，平台改版就可能失效；复制登录态涉及账号安全，务必按官方建议用小号；"实验"级渠道的稳定性不要有期待。

适合人群：需要中文语料的舆情 / 竞品 / 内容研究工作流；OpenClaw 等自托管 Agent 用户（一条命令补齐互联网能力）；不想维护一堆平台 SDK 的开发者。
