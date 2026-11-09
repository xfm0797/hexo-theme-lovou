---
title: Rolldown 转正之后：打包器的 Rust 竞赛，赢家其实不是速度
date: 2026-11-09 22:09:00
updated: 2026-11-09 22:09:00
categories: 前端
tags:
- 前端
- 构建工具
- Rolldown
- Rspack
- 工程化
---

# Rolldown 转正之后：打包器的 Rust 竞赛，赢家其实不是速度

> esbuild 用 Go 把打包速度提高了十倍，然后大家发现 CI 只快了 40 秒。
> Rolldown 换成 Rust、走 Rollup 兼容路线，这一轮的胜负手不在毫秒，在生态兼容。

## 一、先厘清这几家的关系

前端构建工具有点乱，简单排一下：

| 工具 | 语言 | 定位 |
| --- | --- | --- |
| webpack | JS | 老王者，插件生态最厚 |
| Rollup | JS | 库构建的事实标准，产物干净 |
| esbuild | Go | 极快的转译 + 打包，插件 API 弱 |
| Rspack | Rust | webpack 的 Rust 重写，配置兼容 |
| Rolldown | Rust | Rollup 的 Rust 重写，Vite 的新底座 |

关键区别在兼容对象：**Rspack 兼容 webpack 的配置与插件模型，Rolldown 兼容 Rollup 的插件 API**。这不是技术选择，是用户选择——谁的存量用户多、迁移成本低，谁就更容易被默认装上。

## 二、为什么「快十倍」没换来十倍体验

esbuild 刚出来时，所有人都被构建时间从 12 秒变成 0.4 秒震到了。但真实项目的 CI 时长构成大概是：

```
依赖安装        90s
类型检查        35s
构建            12s → 0.4s
测试            70s
部署            25s
```

构建从 12 秒降到 0.4 秒，总时长只少了 11.6 秒。**打包器早就不是瓶颈了**，瓶颈是 `npm install`、是 tsc、是测试。

所以这一轮 Rust 化的真实收益，不在「构建更快」，而在三件别的事：

**1. 开发时的反馈闭环。** 冷启动 dev server 从 3 秒到 300 毫秒，改一行代码的 HMR 从 200ms 到 20ms。这是每天几百次的体感差异，比 CI 省十秒值钱得多。

**2. 内存。** JS 实现的打包器在大仓库上动辄吃掉 2–4GB。Rust 实现通常只有几分之一。对 8GB 内存的开发者机器，这是能不能同时开三个项目的区别。

**3. 能做的事变多了。** 因为快，可以在开发时就跑完整构建、可以做全量 sourcemap、可以在 CI 里对每个 PR 做完整产物分析。**速度的意义是让原来"太贵所以不做"的事变得可做。**

## 三、Rolldown 真正的赌注：插件生态

Rollup 的插件 API 是事实标准。Vite 的插件体系、绝大多数库构建脚本、无数 `rollup-plugin-*`，都建立在这套 hook 上（`resolveId`、`load`、`transform`、`renderChunk`……）。

Rolldown 兼容这套 API，意味着**存量插件理论上不用改**。这件事的价值远大于性能数字：一个构建工具的迁移成本，90% 花在"这个插件还能不能跑"上。

反过来看 Rspack：它兼容 webpack，plugin 与 loader 大多能用，所以从 webpack 迁过去几乎零改动——但也就被锁在 webpack 的模型里，包括它那套偏重的 loader 链设计。

> 两个 Rust 打包器，其实是两条迁移路径：Rspack 收编 webpack 的存量，Rolldown 收编 Rollup/Vite 的存量。

## 四、Vite 换底座带来的连锁反应

Vite 把开发时的 esbuild 预构建 + Rollup 生产构建，逐步换成 Rolldown 一条链，收益不只是快：

- **开发与生产的产物一致性变好。** 以前 dev 用 esbuild、build 用 Rollup，两套语义在边缘 case 上会有差异（比如 `import.meta` 处理、CSS 顺序）。统一引擎后这类"dev 正常 build 炸"的问题会少很多。
- **插件只跑一遍语义。** 不用再为两套引擎各写一份兼容分支。
- **但生态要重新验证。** 那些依赖 Rollup 内部行为的插件（尤其是改 AST、操作 chunk 的）最可能先出问题。

实践建议：升级到大版本后，**不要只看构建成功**。挑三个最复杂的页面，对比产物 hash 与 gzip 体积；再跑一遍 `vite preview` 手工点一遍。Rust 实现的重写，问题往往藏在「行为一致但边界不同」的地方。

## 五、还有一层没人提的成本

Rust 打包器把复杂度从「JS 运行时」搬到了「原生二进制」。这带来一个新问题：**你没法再读源码调试了**。

webpack 慢的时候，你可以打断点、可以 profile 出是哪个 loader 在拖时间、可以 hack 一个插件绕过。Rust 实现出问题时，你只有 issue 区和「请附上最小复现」。

这不是反对 Rust 化——性能收益是实的。但它意味着**排查能力的下降**，尤其对没有 Rust 经验的前端团队。选型时把这一条算进去：出问题时，团队里有没有人能接住。

## 六、现在的选型建议

- **新项目**：跟着 Vite 走，它换成什么就用什么。别自己拼工具链。
- **库开发**：Rollup 或 Rolldown，产物干净、tree-shaking 可控，这点比速度重要。
- **从 webpack 迁**：Rspack，配置改动最小，先解掉构建慢再谈别的。
- **超大 monorepo**：优先解决 `install` 与类型检查，那才是真瓶颈；打包器换不换影响有限。

## 七、一句话

这一轮 Rust 化的赢家不会是「最快的那一个」，而是**让最多存量插件不用改的那一个**。

速度是入场券，兼容性才是护城河。前端工具链的历史反复证明这件事：能赢的从来不是最先进的设计，是迁移成本最低的那个。

---

- Rolldown：[rolldown.rs](https://rolldown.rs)
- Rspack：[rspack.rs](https://rspack.rs)
- Vite：[vite.dev](https://vite.dev)
