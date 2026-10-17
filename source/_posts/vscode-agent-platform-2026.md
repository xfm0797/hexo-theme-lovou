---
title: 编辑器正在变成 Agent 平台：2026 VS Code 插件生态与 DevTools 变局
date: 2026-10-17 14:20:00
updated: 2026-10-17 14:20:00
categories: 随笔
tags:
- VS Code
- 插件
- AI 编程
- DevTools
- MCP
---

# 编辑器正在变成 Agent 平台

> 今年 VS Code 的版本号里藏着一串信号：1.109 Agent Skills 转正、1.110 实验性 agent 插件、1.112 本地 MCP 服务沙箱、1.126 会话级成本可见、8 月架构更新引入专职 Agent Host。
> 翻译成人话：**编辑器不再只是"插件的宿主"，它正在变成"Agent 的运行平台"**。
> 另一边，DevTools 也在经历同一次地震。这篇文章把两条线放在一起看。

## 一、AI 插件的选型逻辑变了

"哪个 AI 插件补全最准"这个问题在 2026 年已经过时。品类从"自动补全"膨胀成了一个矩阵，选型维度变成了工作流：

| 工具 | 强项 | 适合谁 |
|---|---|---|
| GitHub Copilot | VS Code 集成最深，agent mode 可多文件编辑、跑测试、迭代失败项 | 已重度用 GitHub 的团队，想要从补全到 agent 的无缝路径 |
| Cline | 模型/供应商自由，MCP 工具，计划先行、动作可见、每步需确认 | 想自己选模型、看重 agent 行为可审计的人 |
| Claude Code | 生态已经长在 Claude 上的团队，subagent / slash 命令 / MCP | 终端里已经在用 Claude Code 的人 |
| OpenAI Codex | 本地 IDE 面板 + 大任务委派云端再拉回结果 | 需要"本地改小活、云端干粗活"分工的人 |
| Gemini Code Assist | Gemini / Google Cloud 工作流，文档引用带出处 | GCP 重度用户 |
| Kimi Code（插件形态） | 编辑器内复用 CLI 的 Plan / Sub-agents 能力，账号体系统一 | 习惯图形界面又想要 agent 自主执行的国内开发者 |
| Qoder CN / 文心快码 | 国内网络直连、多模型可选、企业私有化 | 有合规和数据驻留要求的团队 |

**点评一：选型的第一性问题不是"谁最强"，而是"我的代码能出网吗"。** 隐私、预算、合规三个约束先划掉一半选项，剩下的才好比功能。国内团队绕不开的一个现实：Copilot、Cursor 这类产品需要稳定的海外网络和账号，Qoder CN、Kimi Code、Comate 这条线存在的意义就是把"能用"和"好用"之间的距离拉平。

**点评二："免费的扩展 ≠ 零成本"。** 插件免费而模型计费是常态——Continue 这类开源方案连插件带模型都白嫖，但你得自己养 Ollama 里的 Qwen2.5-Coder。越来越多团队的答案是**混合路由**：云端大模型管样板代码和文档，本地模型管核心算法和敏感数据，用 YAML 配置把不同上下文分发给不同端点。成本、隐私、能力三个维度第一次可以各取所需而不是三选一。

```yaml
# Continue 的本地优先配置长这样
models:
  - name: Qwen2.5-Coder-7B
    provider: ollama
    model: qwen2.5-coder:7b
    roles: [chat, edit, autocomplete]
```

**点评三：VS Code 版本线里最有信息量的是 1.112 的"本地 MCP 服务沙箱"和 1.126 的"会话级成本可见"。** 一个管安全，一个管账——平台开始给 Agent 立规矩了。这说明 agent 插件已经从"极客玩具"进入"企业采购"阶段：没有沙箱和账单的 agent 平台，法务那关都过不去。

## 二、被低估的老插件：AI 时代的 review 基建

每年都有人盘点"十大 AI 插件"，但今年我的真实体会反过来：**agent 写得越快，review 基建越值钱**。这批"老插件"今年的存在感反而升了：

- **GitLens**——逐行 blame、提交意图、可视化分支管理。agent 在一堆文件里改出 diff 之后，"这行为什么改"比"改了什么"更重要；
- **Import Cost**——import 语句旁实时显示包体积 + tree-shaking 提示。这是**给 agent 加的依赖上的税**：AI 很乐意 `npm install` 一个库，这个插件让你当场看见代价，据实测经常能砍掉 30%+ 的冗余依赖；
- **Error Lens**——错误全文直接渲染在行尾，零延迟反馈，调试周期显著缩短；
- **Thunder Client**——`.http` 文件直接进版本库，接口测试跟着代码一起 review；
- **Tailwind CSS IntelliSense / CSS Peek**——框架约定的智能提示，比通用补全更懂你的项目；
- **Code Spell Checker**——拼写检查防的是变量名 typo 这类最隐蔽的低级错误，可配项目词典。

**点评。** 把它们归一组看，会发现共同点：**它们全是"看"和"查"的工具，不是"写"的工具**。代码生成已经被 AI 打穿，瓶颈整体后移到了理解和审查。这个迁移对插件生态是利好——审查类工具的用户第一次比生成类工具的用户增长还快。我自己的装机清单现在分三层：**生成层**（一个 AI 主力）+ **审查层**（GitLens、Import Cost、Error Lens）+ **调试层**（按项目需要）。每层一个代表，多一个都是债务。

## 三、DevTools 的地震：一次定义，随处运行

如果说 VS Code 的变化是"编辑器 Agent 化"，那 DevTools 的变化就是**框架无关化 + Agent 接口化**，代表人物是 antfu 的 Devframe。

Devframe 做的事一句话说得完：**工具定义一次，通过适配器接入不同宿主**。同一份 DevTools 定义，可以跑成独立 CLI 检查 JSON/JSONL 文件、生成自包含报告、附加到运行中的 Node 进程，也可以作为 Vite DevTools 插件、MCP Server、静态报告存在。它已经用于 Vite DevTools 和 Nuxt DevTools（Next.js DevTools 还是原型阶段）。

两个设计值得单独拎出来：

**1. Hub 组合层。** DevTools 越多，控制台越像 URL 目录，页面堆满互不相干的浮动按钮。Devframe 的 Hub 是无头且框架中立的，多个工具注册进来，贡献停靠面板、命令、终端和共享状态——用户面对一个一致入口，工具之间获得可互相发现的共享上下文。这是给"工具爆炸"准备的秩序。

**2. 内置插件面向人和 Agent 两个 audience。** 数据检查器、终端面板（可以在浏览器里跑 Claude Code 这类 agent）、以及一个用 axe-core 做扫描的无障碍检查器——而且它**能把 WCAG 违规直接转化成给 agent 的修复提示**。

**点评。** "转化成给 agent 的修复提示"这半句话是我今年在 DevTools 领域看到最有信号量的设计。以前的 DevTools 是**给人看的**：人看见红色警告，人理解，人去改。现在 DevTools 开始**给 Agent 看**：MCP 接口把工具能力暴露给 agent，a11y 扫描产出的是机器可执行的修复指令。**开发者工具的用户，正在从人类扩展到 agent**——这事儿对工具设计的影响才刚开始。同理心一下：本站做静态生成，也有可自动化的检查（我每次构建后必查的零字节页面检查，本质上就是一个 handmade 的 CI 探针）。

另一个值得知道的知识点：**Vite 插件版 DevTools 能做到浏览器扩展做不到的事——编译期注入源码位置**。`vite-plugin-vue-devtools` 在 transform 阶段给每个组件的 DOM 注入 `data-v-inspector="文件路径:行号"`，于是 Inspector 能点页面元素直接跳编辑器，这是浏览器扩展没有的权限。附带一个工程收益：插件版跟着 package.json 走，`npm i` 全员同步，不用每个人都去扩展商店装一遍。

## 四、我的插件观

把上面的观察压成几条自己的规矩：

1. **按层装机，不按排行榜装机**：生成层、审查层、调试层各一个主力，其余按需临装；
2. **插件是债务不是资产**：每装一个都意味着启动变慢、更新要管、设置要同步。季度清一次；
3. **问"它给不给我撤出的路"**：AI 插件优先选配置敞开、模型可换的（Continue / Cline 这类），被单一供应商锁定的成本今年正在变高；
4. **DevTools 看一眼 MCP 支持**：新工具如果没有 agent 接口，两年内大概会被有的那个取代。

---

## 信息来源

1. [Best AI VS Code Extensions in 2026: Coding, Review and Debugging — AiFolder](https://www.aifolder.co/blog/best-ai-vscode-extensions)
2. [10 Essential VSCode Extensions for 2026: AI, Git, and Productivity Tools — BestHub](https://www.besthub.dev/articles/10-essential-vscode-extensions-for-2026-ai-git-and-productivity-tools-2343debab06c)
3. [VS Code Extensions 2026: 30 Ultimate Productivity Boosters — CodePen Blog](https://codepen.blog/vs-code-extensions-2026-productivity)
4. [Devframe 发布：一次定义，随处运行的通用 DevTools 生态 — Vite 中文文档](https://vitejs.cn/news/2026-09-23-pluggable-extensible-playful-devtools)
5. [工信部"人工智能软件"方案落地：2026 年 AI 编程工具全景解读 — 中国经济新闻网](https://www.cet.com.cn/wzsy/cyzx/10558428.shtml)
