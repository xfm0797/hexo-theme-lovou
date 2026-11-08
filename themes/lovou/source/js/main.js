/* lovou 主题交互脚本：明暗主题切换 + 返回顶部 */
(function () {
  'use strict';

  var root = document.documentElement;
  var toggle = document.getElementById('theme-toggle');
  var backToTop = document.getElementById('back-to-top');

  /* 主题切换 */
  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try {
        localStorage.setItem('theme', next);
      } catch (e) {
        /* 隐私模式下 localStorage 不可用，忽略 */
      }
    });

    // 跟随系统主题（仅在用户未手动选择时）
    var media = window.matchMedia('(prefers-color-scheme: dark)');
    var onSchemeChange = function (e) {
      var saved = null;
      try {
        saved = localStorage.getItem('theme');
      } catch (err) {
        return;
      }
      if (saved === 'light' || saved === 'dark') return;
      root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    };
    if (media.addEventListener) {
      media.addEventListener('change', onSchemeChange);
    }
  }

  /* 返回顶部 */
  if (backToTop) {
    var onScroll = function () {
      backToTop.classList.toggle('visible', window.scrollY > 320);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* 导航下拉菜单：悬停由 CSS 负责，触摸设备用点击切换 */
  var dropdowns = document.querySelectorAll('.nav-item.has-dropdown');

  Array.prototype.forEach.call(dropdowns, function (item) {
    var trigger = item.querySelector('.nav-dropdown-trigger');
    if (!trigger) return;

    var setOpen = function (open) {
      item.classList.toggle('is-open', open);
      trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
    };

    // 悬停时同步 aria 状态（视觉展开由 CSS :hover 完成）
    item.addEventListener('mouseenter', function () {
      trigger.setAttribute('aria-expanded', 'true');
    });
    item.addEventListener('mouseleave', function () {
      if (!item.classList.contains('is-open')) {
        trigger.setAttribute('aria-expanded', 'false');
      }
    });

    var canHover = function () {
      return window.matchMedia && window.matchMedia('(hover: hover)').matches;
    };

    trigger.addEventListener('click', function (e) {
      // 有悬停能力时点击直接跳转；触摸设备第一次点击先展开菜单
      if (!canHover() && !item.classList.contains('is-open')) {
        e.preventDefault();
        setOpen(true);
      }
    });

    item.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        setOpen(false);
        trigger.focus();
      }
    });

    document.addEventListener('click', function (e) {
      if (!item.contains(e.target)) setOpen(false);
    });
  });
})();
