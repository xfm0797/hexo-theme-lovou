---
title: 容器查询落地三年后：响应式的单位从「屏幕」变成了「组件」
date: 2026-11-09 21:57:00
updated: 2026-11-09 21:57:00
categories: 前端
tags:
- 前端
- CSS
- 容器查询
- 设计系统
- 响应式
---

# 容器查询落地三年后：响应式的单位从「屏幕」变成了「组件」

> `@media` 问的是「窗口多宽」，`@container` 问的是「我被放进了多大的地方」。
> 这个差看着只是换了个参照物，实际把组件库的设计前提整个换掉了。

## 一、`@media` 的根本缺陷：组件不知道自己在哪

一个卡片组件，在首页三列网格里只有 320px，在详情页侧栏只有 280px，在文章正文里可能占满 900px。

用媒体查询写它，只有一个办法：把「在哪种布局里」这件事从组件内部搬到调用方。于是你得到一堆这种东西：

```css
.card { /* 默认窄屏样式 */ }

@media (min-width: 768px) {
  .card { /* 但如果是三列网格，其实还是窄的 */ }
}

@media (min-width: 1200px) {
  .sidebar .card { /* 手动覆盖回来 */ }
}
```

每加一个使用场景，就要加一条覆盖规则，而且覆盖规则写在组件外面——**组件的样式依赖调用它的上下文，这本身就是耦合**。

## 二、换参照物之后

容器查询的做法是让父级声明「我可以被查询」：

```css
.card-grid {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 480px) {
  .card { display: grid; grid-template-columns: 120px 1fr; }
}

@container card (min-width: 720px) {
  .card { grid-template-columns: 200px 1fr; }
  .card__excerpt { display: block; }
}
```

组件只关心「我拿到多宽」，不再关心「窗口多宽」。同一份组件代码，扔进网格、侧栏、正文，各自按可用宽度变形，调用方不用写一行覆盖。

这是三年下来最重要的观念转变：**响应式的断点属于组件，不属于页面**。

## 三、`container-type` 的两个陷阱

**第一个：`inline-size` 会建立包含块，影响绝对定位与固定尺寸。**

它让容器成为其子元素的包含块（containment），所以容器内部的 `position: fixed` 不再相对视口，`height: 100%` 的参照也变了。给普通卡片加没问题，给一个本来靠 `fixed` 做浮层的组件加，就会莫名错位。

**第二个：查询的是内容盒子，不是想象中那个宽度。**

`inline-size` 按行内方向计算，滚动条、padding 都参与。如果容器是 `display: inline`，它根本不是一个合格容器——必须是有确定宽度的块级或 flex/grid 项。

## 四、真正省事的不是断点，是容器单位

比 `@container` 更少被提的是容器单位：`cqw`、`cqh`、`cqi`、`cqb`、`cqmin`、`cqmax`。

```css
.card__title {
  font-size: clamp(1rem, 4cqi, 1.6rem);
}
```

以前要实现「字号随卡片宽度缩放」，要么用 `vw`（错，因为跟视口而非容器），要么用 JS 算 `ResizeObserver` 再写 CSS 变量。现在一行 CSS 解决，而且不触发重排。

**这条比断点更值得先上**，因为它是纯粹替换：把 `vw` 换成 `cqi`，把 JS 的 `ResizeObserver` 字号逻辑删掉，风险几乎为零，收益立刻可见。

## 五、`@container style()` 与「组件变体」

style queries 允许查询父级的自定义属性值：

```css
@container style(--theme: compact) {
  .card__meta { display: none; }
}
```

它让「变体」从 props 传递变成继承传递：外层容器打一个标记，内部所有子组件自动响应，不用一层层透传 class。

代价是可读性。当样式可以因为某个祖先上的一个自定义属性而改变，你在 DevTools 里看到一个元素样式不对时，得往上翻才知道是谁设了 `--theme`。**从"显式覆盖"到"隐式继承"，换来的灵活性要用可调试性付账。**

## 六、什么时候仍然用 `@media`

容器查询不取代媒体查询，它接管的是另一类问题：

| 场景 | 用什么 |
| --- | --- |
| 组件在不同容器里变形 | `@container` |
| 全站布局切换（单栏 / 双栏 / 三栏） | `@media` |
| 字号随组件宽度缩放 | `cqi` + `clamp()` |
| 打印、深浅色、减少动效 | `@media`（偏好类） |
| 组件在不同主题下微调 | `@container style()` |

判据一句话：**你要判断的是「容器多大」还是「设备/环境如何」**。前者容器查询，后者媒体查询。

## 七、迁移建议

按性价比排序，先做这三件：

1. **把 `vw` 相关的字号、间距改成 `cqi`**。纯替换，不涉及结构。
2. **挑一个真正的复用组件（卡片、媒体对象、列表项）改成容器查询**，删掉它周围所有 `.sidebar .card` 式的覆盖规则。这一步最能暴露原来的耦合有多深。
3. **容器命名，别用匿名容器**。`container-name` 是给三个月后的自己留的路标；匿名容器在嵌套场景里会查询到最近的那个，出问题时极难定位。

## 八、一句话总结

容器查询不是「媒体查询的新语法」，它把「组件应该长什么样」这个决定从页面层收回了组件层。

做过这一步的组件库，代码会变少——因为不再需要为每个使用场景写例外。**当你发现自己在写「某容器下的某组件」，那通常就是容器查询该上场的地方。**

---

- MDN：[CSS container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries)
- 规范：[CSS Containment Module Level 3](https://www.w3.org/TR/css-contain-3/)
