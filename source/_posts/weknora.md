---
title: 开源项目 WeKnora：腾讯开源的企业级知识平台，RAG、Agent 与自动 Wiki 共享同一知识库
date: 2026-10-16 20:37:00
updated: 2026-10-26 21:35:00
categories: 开源
tags:
- 开源项目
- RAG
- 知识库
- Go
- 腾讯
---

# WeKnora

> 腾讯微信团队开源的 LLM 知识框架，RAG、Agent、Wiki 三种模式共享同一套知识底座

---

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [Tencent/WeKnora](https://github.com/Tencent/WeKnora) |
> | 开发方 | 腾讯（微信团队） |
> | 语言 | Go |
> | Stars / Forks | 34,900+ / 4,600+（2026-10-21 口径） |
> | 协议 | MIT |
> | 官网 | [weknora.weixin.qq.com](https://weknora.weixin.qq.com/) |
> | 部署 | Docker Compose 自托管 / 微信对话开放平台在线版 / 腾讯云 Lighthouse 应用模板 |

## 它想解决什么问题

每个团队都有一堆"沉睡"的文档：产品手册躺在网盘里，会议纪要散落在邮件中，技术规范更新在 Confluence 上没人同步。大模型时代，这些文档本可以成为团队最宝贵的知识资产，但现实是——你明明知道答案就在某个文档里，就是找不到、问不出，更没人保证它还是最新的。

WeKnora 就是冲着这个痛点来的。它是一个 LLM 驱动的开源知识框架，把"文档检索（RAG）+ 智能体（Agent）+ 知识库（Wiki）"三种能力合而为一，让团队文档既能被搜索、能被推理，还能保持更新。

## 核心机制拆解

**1. 三种模式，一套知识底座。** 这是 WeKnora 最有辨识度的设计：RAG、Agent、Wiki 三种使用方式共享同一套知识库，而不是三套系统各建一遍索引。

- **RAG 模式**：混合检索 + 多模态解析 + 引用溯源。答案附带出处，可以逐条核对，杜绝模型"张口就来"。
- **Agent 模式**：多步推理、技能（Skills）、沙箱执行。适合"帮我对比这两份方案并生成评审意见"这类多步骤任务，智能体可以调用浏览器、MCP 工具和长期记忆。
- **Wiki 模式**：把文档组织成带知识图谱的维基页面，支持版本回滚，让知识库可以"自维护"。

三个模式打通的意义在于：检索答案可验证、复杂任务能执行、沉淀的知识可管理——正好覆盖了企业知识从"存"到"用"再到"更新"的完整链路。

**2. 智能体工具箱是项目最重的部分。** 技能可以从 ClawHub / SkillHub / Git / ZIP 安装，运行在会话持久的 Docker / E2B / Cube 沙箱中；通过 BrowserSkill 扩展，智能体能直接操作用户自己的 Chrome 或 Edge；外部 MCP 服务（含 OAuth）也能逐工具接入启用。这一层让它不只是"知识库问答"，而是能真正动手的 Agent 运行时。

**3. 数据接入：把存量知识捞出来。** 支持从飞书知识库、飞书云盘、Confluence、GitLab、腾讯 IMA、Notion、语雀、钉钉文档、Seafile、RSS 自动同步；文档格式覆盖 PDF、Word、图片、Excel、XMind 等 10 余种，Office 文件由内置的 anydoc 组件解析。国内团队的存量知识大多躺在这些地方，这一层的实用性决定了落地成本。

**4. 模型层：内置 29 家厂商目录。** 包括 OpenAI、DeepSeek、通义千问、智谱、混元、Gemini、MiniMax、NVIDIA、LiteLLM 和 Ollama——本地 Ollama 模型同样支持，方便完全离线的私有化部署。

**5. 工程细节看得出是给企业场景设计的。** 多工作区 RBAC（四种角色、按资源归属、工作区审计日志）、任务队列仪表盘、Langfuse 全链路追踪；LLM、向量数据库、存储后端全部可替换，本地或私有云部署，数据不出自己的环境。

## 安装与上手

部署方式相当直接，Docker Compose 即可跑起来：

```bash
git clone https://github.com/Tencent/WeKnora.git
cd WeKnora
cp .env.example .env    # 按需编辑
docker compose pull
docker compose up -d
```

启动后访问 `http://localhost` 进入 Web UI，按引导完成初始化。想用本地 Ollama 模型，先跑 `ollama serve` 再配置嵌入模型即可。除自托管外，也可以使用微信对话开放平台的在线版，或通过腾讯云 Lighthouse 应用模板一键部署。

## 点评

**亮点**是"三模式一套底座"的设计克制，加上明显的大厂工程水位：权限、审计、追踪、可换后端——这些恰恰是企业落地时真正卡脖子的东西，而不是 demo 里最显眼的那个聊天框。MIT + 私有化 + 国内协作软件原生接入，对数据敏感的团队是实打实的门槛优势。

**局限**也要说清楚：Go + Vue 全栈部署相对重，小团队试用建议从 Docker Compose 起步，别一上来就上 Helm；Agent 与 Wiki 的自动组织效果高度依赖文档解析质量，扫描件多的场景要先单独验证解析链路；29 家模型厂商的目录看着丰富，但每一家的检索与重排表现需要自己压测，默认配置未必等于最优配置。

**适合人群**：企业知识管理团队——把内部文档统一接入，提供可验证的问答服务，数据留在自己手里；需要 RAG 能力的开发者——不必从零拼装"解析 + 向量库 + 检索 + 重排"的链路，直接在完整框架上做二次开发；智能体应用团队——它的沙箱、技能、MCP 和浏览器控制能力，可以单独作为 Agent 运行时参考。

如果你的团队正在为"文档很多、知识很少"发愁，而 Dify 那类平台的短板恰好在知识组织与来源追溯上，WeKnora 值得列入候选清单。

---

- 项目仓库：[https://github.com/Tencent/WeKnora](https://github.com/Tencent/WeKnora)
- 官方文档：[https://weknora.weixin.qq.com/docs/](https://weknora.weixin.qq.com/docs/)
