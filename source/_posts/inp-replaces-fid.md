---
title: INP 取代 FID 之后，前端性能的敌人换了一个
date: 2026-11-09 22:21:00
updated: 2026-11-09 22:21:00
categories: 前端
tags:
- 前端
- 性能优化
- INP
- Core Web Vitals
- 交互体验
---

# INP 取代 FID 之后，前端性能的敌人换了一个

> FID 只测「按下到开始响应」那一下，通常几十毫秒，人人都能过。
> INP 测「按下到画面真的变了」——它把过去那些"响应很快但卡住"的问题全暴露了出来。

## 一、FID 为什么会被淘汰

FID（First Input Delay）的测量方式：用户第一次交互时，从「输入事件发生」到「浏览器开始处理这个事件」之间的时间。

注意它只算**第一次**、只算**延迟**、不算**处理耗时**。所以：

```js
button.addEventListener('click', () => {
  // FID 到这里就结束计时了
  const start = performance.now();
  while (performance.now() - start < 800) {} // 卡 800ms，FID 完全不管
  render();
});
```

这段代码 FID 可能只有 8ms，看起来完美。用户感受到的是：按下按钮，什么也没发生，800 毫秒后界面才变。

FID 测不出这种痛苦，因为它测的是「开始干活有多快」，用户感知的是「什么时候看到结果」。两者之间隔了整个执行时间。

## 二、INP 测的是完整的一段

INP（Interaction to Next Paint）统计页面上**所有**交互（点击、点按、键盘），取其中较差的那一次（接近 p98 的分位），链路是：

```
输入 → 事件处理 → 状态更新 → 重排/重绘 → 下一帧呈现
```

也就是说，它把「你的 JS 执行 + 框架渲染 + 布局 + 绘制」全算进去了。阈值：**≤200ms 良好，≤500ms 需改进，>500ms 差**。

这个改动让一大批「FID 绿、用户照骂」的站点现了原形。也让性能优化从「首屏工程」变成了「交互工程」。

## 三、常见杀手，按出现频率排

**1. 在事件处理里做同步重活。**

最常见的形状：点击 → 立即过滤/排序一个大数组 → 渲染。数据量上万条时，这一下就是 300ms 以上。

解法不是「加个 loading」，是把重活拆到 `requestIdleCallback` 或 Worker 里，先让界面在下一帧给出反馈（哪怕只是按钮按下态），再慢慢算。

```js
button.addEventListener('click', () => {
  button.dataset.pressed = 'true';        // 先给视觉反馈，本帧生效
  requestAnimationFrame(() => {
    // 下一帧再干重活，INP 计时里至少"画面变了"
    const result = heavyFilter(data);
    render(result);
  });
});
```

**2. 布局抖动（layout thrashing）。**

一个循环里先读布局属性再写样式，每轮都强制同步布局：

```js
items.forEach(el => {
  const h = el.offsetHeight;   // 读 → 强制重排
  el.style.height = h * 2 + 'px'; // 写 → 布局失效
});
```

批量读、批量写，中间不夹混合操作，这是最经典也最有效的修法。

**3. 长任务阻塞主线程。**

超过 50ms 的任务就算长任务。一段 400ms 的 hydration、一次大型 JSON 解析、一个同步的第三方 SDK 初始化，都会让这期间的所有交互排队。

识别办法：Performance 面板看主线程是否被一段灰块占满；或用 `PerformanceObserver` 监听 `longtask`。

**4. 过度渲染。**

React 里一个状态变化带着 200 个组件重渲染，实际只有一个数字变了。Vue 里一个响应式对象过大导致整个依赖链重算。这类问题 FID 时代看不出来（响应很快，只是慢在渲染上），INP 会直接罚分。

**5. 字体与图片的延迟替换。**

点击后触发路由切换，新页面的字体还没加载完，出现文字闪烁重排。这段重排会落到那次交互的呈现时间里。

## 四、怎么测才准

**别用 Lighthouse 的 INP。** 实验室环境没有真实交互，Lighthouse 报的是「没有数据」或一个基于 TBT 的推算值。INP 本质是**字段指标（field metric）**，必须在真实用户上测。

可行的三层：

1. **本地手测**：Performance 面板录制一段真实操作，看 Interaction 轨道的每一段耗时，红色标注的就是超过 200ms 的交互。
2. **RUM 上报**：`PerformanceObserver` 监听 `event` 类型的 `durationThreshold`（只报超过 40ms 的），把 `name`、`duration`、`target` 一起上报。
3. **CI 回归**：Playwright 里测「点击到目标元素出现」的耗时，设一个 250ms 的预算卡住回归。比 Lighthouse 分数有用得多。

## 五、优化顺序（按性价比）

1. **先找出最差的那一次交互**，不要平均优化。INP 取的是高分位，一个烂交互就能毁掉整页评分。
2. **给每次交互立即的视觉反馈。** 按下态、骨架、进度条——INP 关心「画面什么时候变」，一变就停表。
3. **把超过 50ms 的任务切碎。** `await scheduler.yield()` 或 `setTimeout(0)` 分段，让浏览器有机会渲染。
4. **减少不必要的渲染。** 该 memo 的 memo，该虚拟列表的虚拟列表。这一条通常收益最大也最难改。
5. **把非关键第三方脚本延后。** 分析、客服、A/B 测试的 SDK 经常是长任务来源。

## 六、一个容易被忽略的真相

INP 变差，很多时候不是代码慢，是**页面太重**：DOM 节点上万、CSS 规则几万条、监听器挂在 document 上做事件委托却又在回调里遍历整棵树。

在这种页面上，任何微优化都像在漏水的桶里加水。真正的解法是减少复杂度：虚拟化长列表、拆分巨型组件、砍掉不用的第三方脚本。

> FID 时代的优化是「让开始更快」，INP 时代的优化是「让整件事更短」。前者可以靠技巧，后者只能靠减法。

## 七、一句话

INP 把性能指标从「响应速度」改成了「交互完成速度」，这一改让前端优化的重心从首屏移到了**每一次点击之后的那几百毫秒**。

如果你的站点 FID 一直是绿的但用户总说卡，那不是用户的问题，是指标选错了。

---

- web.dev：[Interaction to Next Paint (INP)](https://web.dev/articles/inp)
- 规范：[Event Timing API](https://w3c.github.io/event-timing/)
