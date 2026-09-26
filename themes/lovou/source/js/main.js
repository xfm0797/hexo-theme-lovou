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
})();
