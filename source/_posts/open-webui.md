---
title: Open WebUI：给本地模型配一个像样的聊天界面
date: 2026-11-07 19:30:00
updated: 2026-11-07 19:58:00
categories: 开源
tags:
- 开源项目
- 自托管
- AI 聊天
- 前端
---

# Open WebUI

> 自托管的 ChatGPT 级界面，接 Ollama 或任意 OpenAI 兼容后端，多人、多模型、可管控

---

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [open-webui/open-webui](https://github.com/open-webui/open-webui) |
> | 语言 | TypeScript / Python |
> | 协议 | MIT（部分历史代码另有条款） |
> | 形态 | 自托管 Web 应用 |
> | 后端 | Ollama、OpenAI 兼容 API |

## 它想解决什么问题

本地模型跑起来之后，第二个问题立刻出现：**只有命令行，同事不会用**。而直接用公版界面，又会把内部对话发到别人服务器上。

Open WebUI 填的正是这个空：一个部署在自己机器上的完整聊天前端，长得像主流产品，接的是你自己的模型。

## 核心机制拆解

**1. 多后端聚合。** Ollama 与任意 OpenAI 兼容端点都能挂进来，同一个界面切换模型，正在本地与云端之间切换成本几乎为零。

**2. 多用户与权限。** 账号、角色、模型访问控制、用量记录都有——这让它从"个人玩具"变成"团队内部可管理的服务"。

**3. RAG 与工具。** 内置文档上传与检索、联网搜索、代码执行、工具调用，聊天之外能干活。

**4. 数据自持。** 对话历史、上传文件、向量索引全在本地数据库里，备份就是一个目录。

## 安装与上手

```bash
docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway   -v open-webui:/app/backend/data --name open-webui   ghcr.io/open-webui/open-webui:main
```

打开 `http://localhost:3000` 注册第一个账号（即管理员），在设置里填入 Ollama 地址或 API Key。

## 点评

**亮点**是"该有的都有"的完成度：多用户、模型管理、RAG、工具、语音，几乎不用二次开发就能对内交付。它是本地模型从"能用"到"有人愿意用"之间最关键的一块拼图。

**局限**：功能多也意味着配置项多，管理员要先花时间把权限与模型配额理顺；版本迭代快，升级偶有数据库迁移问题，生产环境务必先备份；重度依赖浏览器，长对话与大量文件时前端会吃力；默认鉴权较宽松，公网暴露前必须加固。

**适合人群**：想让团队用上自托管 AI 聊天的运维/IT；本地模型爱好者；以及需要一个可控入口来做内部试点的团队。

---

- 项目仓库：[https://github.com/open-webui/open-webui](https://github.com/open-webui/open-webui)
- 官方文档：[https://docs.openwebui.com](https://docs.openwebui.com)
