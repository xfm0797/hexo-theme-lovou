---
title: 你好，世界
date: 2026-09-26 10:00:00
categories:
  - 随笔
tags:
  - Hexo
  - 博客
---

欢迎来到「墨痕」。这是一个基于 Hexo 的极简现代风中文博客主题，本篇文章用于展示各类排版元素。

## 中文排版

字体栈优先使用系统中文字体：PingFang SC、Hiragino Sans GB、Microsoft YaHei 与 Noto Sans SC，正文行高 1.9，阅读起来应该相当舒适。

> 引用块：简单说，极简不是删除一切，而是保留必要的部分。
> —— 中村青史

## 文本样式

**加粗文本**、*斜体文本*、`行内代码`、[外部链接](https://hexo.io)以及删除线~~划掉的文字~~。

## 代码高亮

```javascript
// 一段用于演示高亮的代码
class Greeter {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `你好，${this.name}！`;
  }
}

const greeter = new Greeter("世界");
console.log(greeter.greet());
```

```python
def fibonacci(n: int):
    """生成斐波那契数列"""
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b
```

## 列表

- 支持响应式布局，适配手机与桌面
- 明暗双主题，跟随系统并可手动切换
- 文章目录、字数统计、阅读时长
- 归档 / 分类 / 标签页

1. 有序列表第一项
2. 有序列表第二项
3. 有序列表第三项

## 表格

| 特性 | 状态 | 备注 |
| ---- | ---- | ---- |
| 明暗主题 | ✅ | 跟随系统 |
| 文章目录 | ✅ | 可折叠 |
| 极简风格 | ✅ | 无多余依赖 |

## 图片

![占位图片](https://picsum.photos/800/400)

---

写点什么吧，从这里开始你的记录。
