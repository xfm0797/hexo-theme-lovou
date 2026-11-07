---
title: Ruff：用 Rust 写的 Python Linter 与格式化器，快到不像静态检查
date: 2026-11-07 19:30:00
updated: 2026-11-07 19:58:00
categories: 开源
tags:
- 开源项目
- Python
- 工具链
- Rust
---

# Ruff

> 一个二进制替代 Flake8、isort、pyupgrade 等十余个工具，规则上千条，速度是数量级提升

---

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [astral-sh/ruff](https://github.com/astral-sh/ruff) |
> | 语言 | Rust |
> | 协议 | MIT |
> | 形态 | 单体 CLI（lint + format） |
> | 兼容 | 大量 Flake8 插件规则 |

## 它想解决什么问题

Python 的代码质量工具是碎片化的：flake8 管风格、isort 管导入、pyupgrade 管语法现代化、black 管格式化，再配上十几个插件。每个都要装、要配、要在 CI 里各跑一遍。

Ruff 把这些收进一个 Rust 二进制：**规则上千条、速度极快、配置一份**，还提供与 Black 兼容度很高的格式化。

## 核心机制拆解

**1. 规则兼收并蓄。** 覆盖 Flake8 及其常用插件、isort、pyupgrade、pydocstyle 等规则集，用 `select` / `ignore` 精确控制。

**2. 速度来自实现。** Rust + 并行遍历，整个仓库的检查常在亚秒级完成，保存即检查成为常态。

**3. 自动修复。** `--fix` 处理绝大多数可自动修的问题（导入排序、废弃语法、未使用变量等）。

**4. 格式化器。** `ruff format` 与 Black 高度兼容，团队可以只留一个格式化工具。

## 安装与上手

```bash
pip install ruff
ruff check .
ruff check --fix .
ruff format .
```

配置写在 `pyproject.toml` 的 `[tool.ruff]` 段，与项目其他工具统一。

## 点评

**亮点**是把"快"变成了一种工作方式改变：当检查足够快，你才会真的在每次保存时跑全量，而不是等 CI 报错。规则覆盖的广度让"删掉五个依赖"成为现实，这是它传播极快的原因。

**局限**：极少数 Flake8 插件规则与自定义插件无法直接迁移，有私有 lint 逻辑的团队要重新实现；与 Black 仍有细微格式差异，切换时会有一批全仓 diff；类型检查不是它的职责（那是 mypy/pyright 的事），别指望一个工具解决所有问题；规则默认集偏严格，老项目首次接入会看到大量告警。

**适合人群**：任何规模的 Python 项目；想统一团队格式与 lint 配置的技术负责人；以及受够了 CI 上 lint 跑五分钟的工程组。

---

- 项目仓库：[https://github.com/astral-sh/ruff](https://github.com/astral-sh/ruff)
- 官方文档：[https://docs.astral.sh/ruff](https://docs.astral.sh/ruff)
