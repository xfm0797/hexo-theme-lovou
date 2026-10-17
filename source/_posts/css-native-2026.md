---
title: 浏览器追上来了：2026 年，原生 CSS 正在批量淘汰 JS 库
date: 2026-10-17 13:50:00
updated: 2026-10-17 13:50:00
categories: 随笔
tags:
- CSS
- 浏览器
- 前端
- 渐进增强
- View Transitions
---

# 浏览器追上来了：2026 年，原生 CSS 正在批量淘汰 JS 库

> 一个 tooltip、一个下拉菜单、一次页面转场、一个随滚动展开的动画——这些十年前必须靠 JS 库才能体面实现的东西，
> 今年在浏览器里全部变成了"几行声明"。而且它们**静默失败**：不支持的浏览器只是没有效果，页面照常能用。

过去一年我盯得最紧的一条暗线：**CSS 在把 JS 库的饭碗一个个端走**。这篇文章把散在今年各处的动态串起来，说说每一条意味着什么、哪些现在能删、哪些还得再等等。

## 一、位置计算还债：anchor positioning 成了 Baseline

每个前端人都写过（或者抄过）这样的代码：

```js
import { computePosition, flip, shift, offset, autoUpdate } from '@floating-ui/dom';

const cleanup = autoUpdate(button, panel, () => {
  computePosition(button, panel, {
    placement: 'bottom-end',
    middleware: [offset(8), flip(), shift({ padding: 8 })]
  }).then(({ x, y }) => {
    Object.assign(panel.style, { left: `${x}px`, top: `${y}px` });
  });
});
// 而且别忘了在关闭时调用 cleanup()
```

一个依赖、每个滚动祖先上的监听器、每帧一次布局读+样式写、一个必须记得调的卸载函数——这就是 Floating UI（以及它前辈 Popper.js）存在的全部理由。今年 **CSS anchor positioning 成为 Baseline 新特性**（Chromium 先行，Safari 跟进，Firefox 在路上），同样的事情变成了：

```css
.trigger { anchor-name: --my-menu; }

.panel {
  position: absolute;
  position-anchor: --my-menu;
  position-area: block-end span-inline-end;   /* 下方，末端对齐 */
  position-try-fallbacks: flip-block, flip-inline; /* 放不下就翻面 */
}
```

滚动、缩放、触发器移动，面板始终贴着——因为关系是**声明**出来的，不是每帧**计算**出来的。最能说明问题的是 `position-try-fallbacks`：它干的正是当年定位库里最大的一块逻辑（碰撞检测+翻转策略）。

有个叫 Frutjam 的组件库已经把整套 popover 建在 anchor positioning 上，实现只有三个 utility：触发器命名自己、面板锚定名字并选区域、每个位置类设置一组变量——十二个位置类，每个一行 CSS。

**点评。** 浏览器"学会"这个特性，不是因为它比 JS 库更强，而是因为**元素位置本来就是渲染引擎的内部知识**。让知道答案的人直接回答，当然比让外面的人每帧去量一遍要准、要快、要省。这其实是今年一整轮"原生化"的共同逻辑：库们当年赢在"浏览器做不到"，如今输在"浏览器就是干这个的"。

顺带一个容易被忽略的收益：`position-area` 用的是 `block-start / span-inline-end` 这类**逻辑方向**。阿拉伯语/希伯来语布局下 RTL 自动成立——用像素定位的下拉菜单得额外写一套 `[dir="rtl"]` 规则，而且总有人忘了写。RTL 从"一个专项项目"变成"免费附赠"。

## 二、动效还债：view transitions 与 scroll-driven animations

**View Transitions API**（同文档 `document.startViewTransition()` + 几个 `::view-transition-*` 伪元素）今年完成了跨文档转场（真实页面跳转）在各大浏览器的落地，并且被列入了 Interop 2026 的对齐清单。列表页→详情页这种用户感知最强的转场，从此是渐进增强：不支持就正常跳转，只是没有动画。

**Scroll-driven animations**（Chromium 与新版 Safari 已支持，Firefox 追赶中）把"滚动进度"直接变成动画时间轴：

```css
.reading-progress {
  position: fixed; inset: 0 0 auto; height: 4px; background: #38bdf8;
  transform-origin: left; transform: scaleX(0);
}
@supports (animation-timeline: scroll()) {
  .reading-progress {
    animation: grow-progress linear both;
    animation-timeline: scroll(root);
  }
}
@keyframes grow-progress { to { transform: scaleX(1); } }
```

阅读进度条、视差、滚动显现——不再需要 scroll 监听 + rAF 手动算进度，而且动画尽量跑在合成线程上，通常比 JS 版本更顺。元素级效果用 `view()` 时间轴跟踪元素穿越视口的过程，`animation-range` 控制哪一段旅程驱动动画。

**点评。** 这轮原生化真正的卖点不是"写法更优雅"，而是**静默失败**这三个字。渐进增强喊了十年，一直死在"没有优雅的降级路径"上；现在浏览器给的特性天然带降级——不支持就没有效果，页面照常工作。于是"删库"从一个情怀决策变成了一个可以量化并向老板汇报的决策：每删一个库 = 用户少下载一份代码 + 团队少维护一个依赖 + 安全通报少一个要连夜补的包。让页面响应更快直接命中 Google 的 INP（Interaction to Next Paint）指标——"删依赖"第一次有了 KPI 背书。

## 三、小特性，大生意

今年还有一批"单个看不起眼、合起来改变写法"的特性：

| 特性 | 干掉的老麻烦 | 状态 |
|---|---|---|
| `:has()` | 问了二十多年的父选择器 | 已普及 |
| 原生 nesting | Sass 存在的最大理由 | 已普及 |
| `@scope` | 嵌套内容的样式泄漏 | Chromium/Safari，FF 实现中 |
| `interpolate-size` / `calc-size()` | `height: auto` 不能过渡 | Chromium |
| `sibling-index()` / `sibling-count()` | JS 算序号做交错动画 | Chromium |

`interpolate-size: allow-keywords` 值得单独说——`height: 0` 到 `height: auto` 的过渡，这个每个前端人都踩过的坑，现在是一行声明的事，不支持的浏览器只是"瞬间开合"，完全可接受。交错动画从"JS 遍历设置 delay"变成 `animation-delay: calc(sibling-index() * 60ms)` 一行。

`@scope` 则补上了一块一直靠 BEM 命名纪律硬撑的短板：把样式限制在文档的一棵子树里，还能指定下边界（比如卡片内的图片和链接生效，但用户生成的富文本内容除外）。同级特异性冲突时，"scope 根离元素更近"的规则胜出——嵌套主题终于按直觉行事。

**点评。** 这些特性的共同点是：**把曾经的 JS workaround 变成 CSS 的默认行为**。它们单个都不算"大新闻"，但写业务的人受益最直接——你的工具函数库会以每个版本几个函数的速度缩水。

## 四、迁移顺序：先删哪里

如果要把这些用进现有站点，比较务实的顺序是（社区共识，我也认同）：

1. **先换脚本化的 tooltip / dropdown / modal** 为 `popover` + anchor positioning——这块收益最直接，交互密度最高；
2. **列表页↔详情页加 view transitions**——用户感知最强的转场位置；
3. **滚动显现效果换成 scroll-driven animations**，并记得尊重 `prefers-reduced-motion`；
4. 每步前后各测一次**脚本体积**和 **INP**，让收益留在记录里。

全程不需要重写，一次换一个组件，每换完站点就快一点。

**点评。** 为什么是这个顺序？因为它是按"删除的代码量 × 用户可感知度"排的。反过来排（先折腾 `@layer` 重构）的团队，基本都烂尾了。

## 五、什么现在别碰

反面清单同样重要：

- **老代码库的重度 `@layer` 改造**——`@layer` 适合新项目和设计系统，塞进祖传样式表是一项工程而不是一个 quick win；
- **为了 oklch() 拆掉还能用的色彩系统**——新调色板值得用新颜色函数，但别为了时髦把能跑的系统推倒；
- **不给 anchor positioning 写降级**——"Baseline 新可用"的准确含义是"各大浏览器当前版本支持"，不是"用户装的每个版本都支持"。`@supports (anchor-name: --x)` 包一下、保留一个静态位置兜底，成本极低。

关于最后一条，社区里也有一种声音值得听：有开发者统计后吐槽 anchor positioning"技术上惊艳，真实 UI 里几乎没人用"。这与"Baseline 达成"的庆祝口径明显打架。我的解读是：**布道文章看的是能力，生产代码看的是装机基数**。两者之间的时差，正好是渐进增强的窗口期——现在介入，等时差弥合时你的代码已经跑在标准之上了。

**点评。** 给自己定的一条规矩：新组件动手前先问一句"浏览器现在能不能白嫖"。答案越来越频繁地是"能"。今年砍掉的每一个"当年不得不用"的库，都是这条规矩的复利。

---

## 信息来源

1. [The Browser Caught Up: Native CSS Is Replacing JavaScript Libraries in 2026 — İkipixel](https://www.ikipixel.com/en/web-design-and-development/the-browser-caught-up-native-css-is-replacing-javascript-libraries-in-2026)
2. [Dropdowns That Position Themselves: CSS Anchor Positioning Is Baseline Now — DEV](https://dev.to/rashadmehtab/dropdowns-that-position-themselves-css-anchor-positioning-is-baseline-now-450d)
3. [The Future of CSS: Upcoming Features to Watch — TideWave](https://tidewave.net/blog/the-future-of-css-upcoming-features-to-watch)
4. [The State of CSS in 2026: What Actually Changed — DEV](https://dev.to/zeeshanzzz788/the-state-of-css-in-2026-what-actually-changed-no1)
5. [Modern CSS in 2026: What Actually Matters Now — Ken Key](https://www.kennykey.com/exploring-the-landscape-of-css-with-ken-key-on-long-island/)
