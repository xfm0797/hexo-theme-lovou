---
title: kornia：PyTorch 上的几何计算机视觉库
date: 2026-11-07 19:30:00
updated: 2026-11-07 19:58:00
categories: 开源
tags:
- 开源项目
- 计算机视觉
- PyTorch
- 空间AI
---

# kornia

> 可微的几何视觉工具箱：相机模型、位姿、畸变、点云与增强，全部是 PyTorch 张量

---

> **项目速览**
>
> | 项目 | 内容 |
> | --- | --- |
> | 仓库 | [kornia/kornia](https://github.com/kornia/kornia) |
> | 语言 | Python |
> | 协议 | Apache-2.0 |
> | 星标 | 约 1.2 万（2026 年口径） |
> | 底座 | PyTorch |

## 它想解决什么问题

做三维视觉、机器人、AR 的工程师，长期依赖 OpenCV 与专门几何库：它们功能强，但都是 CPU 上的命令式实现，**不可微**——想把它嵌进训练循环，只能手工写梯度或拆成两套代码。

kornia 的答案是：**把几何运算实现成 PyTorch 算子**，于是坐标系变换、投影、畸变校正都能在 GPU 上跑，并且能被反向传播。

## 核心机制拆解

**1. 几何变换与相机模型。** 齐次变换、旋转表示、相机内参、投影与反投影、畸变模型，都是批量化的张量运算。

**2. 可微图像增强。** 颜色抖动、模糊、几何抖动在 GPU 上可微，能直接嵌入训练（含可微数据增强）。

**3. 三维与深度。** 点云操作、深度估计、立体匹配、PnP 求解等空间 AI 构件。

**4. 与 PyTorch 生态无缝。** 输入输出是张量，与 DataLoader、autograd、TorchScript 天然兼容。

## 安装与上手

```bash
pip install kornia
```

```python
import torch, kornia as K
x = torch.rand(1, 3, 64, 64)
K.geometry.resize(x, (32, 32))
K.enhance.adjust_brightness(x, 1.2)
```

## 点评

**亮点**是"可微"这个立足点足够硬：一旦几何运算能进计算图，很多原本要分两段实现（预处理 + 训练）的流程就能一体化，实验迭代速度完全不同。批量化设计也很贴合实际工程。

**局限**：算子覆盖仍不如 OpenCV 全面，某些经典算法缺失时要自己补；API 在版本间有过调整，老教程易失效；极端形状与边界条件下与 OpenCV 的结果可能有细微差异，迁移需要回归验证；纯 CPU 场景没有性能优势，反而多一层抽象。

**适合人群**：做三维视觉与 SLAM 的研究者；需要把几何运算放进训练图的工程师；以及机器人、AR 方向的算法开发者。

---

- 项目仓库：[https://github.com/kornia/kornia](https://github.com/kornia/kornia)
- 官方文档：[https://kornia.readthedocs.io](https://kornia.readthedocs.io)
