/* lovou 主题：Cloudflare Pages 部署环境自适应
 *
 * _config.yml 中的 root: /hexo-theme-lovou/ 是为 GitHub Pages 项目子路径配置的。
 * Cloudflare Pages 为根路径部署，构建时自带环境变量：
 *   CF_PAGES     = "1"
 *   CF_PAGES_URL = "https://<项目名>.pages.dev"（绑定的生产域名）
 * 本脚本检测到 CF Pages 构建环境后，自动将 root 改为 "/"，url 改为实际访问域名，
 * 使同一份配置同时适配两种部署，无需手动修改。
 */

'use strict';

hexo.extend.filter.register('before_generate', function () {
  const isCF = process.env.CF_PAGES === '1' || !!process.env.CF_PAGES_URL;
  if (!isCF) return;

  this.config.root = '/';
  if (process.env.CF_PAGES_URL) {
    this.config.url = process.env.CF_PAGES_URL;
  }

  hexo.log.info('Cloudflare Pages 构建环境已检测到：root=/，url=%s', this.config.url);
});
