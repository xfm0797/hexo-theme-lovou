/* lovou 主题：多平台部署路径自适应
 *
 * _config.yml 默认按根路径（root: /）部署，适配：
 *   - EdgeOne Pages（根路径，无内置平台环境变量，无需任何配置）
 *   - Cloudflare Pages（根路径，构建环境自带 CF_PAGES / CF_PAGES_URL）
 *   - 自定义域名（lovou.pw）
 * GitHub Pages 的项目子路径由 .github/workflows/deploy.yml 通过
 * _config.github.yml 多配置覆盖，与本地和其他平台互不干扰。
 *
 * 额外支持环境变量手动覆盖（任意平台可用，优先级最高）：
 *   HEXO_ROOT  例如 /hexo-theme-lovou/
 *   HEXO_URL   例如 https://xxx.pages.dev 或 https://xxx.edgeone.app
 */

'use strict';

hexo.extend.filter.register('before_generate', function () {
  const env = process.env;

  // 1. 环境变量手动覆盖（优先级最高）
  if (env.HEXO_ROOT) this.config.root = env.HEXO_ROOT;
  if (env.HEXO_URL) this.config.url = env.HEXO_URL;

  // 2. Cloudflare Pages 自动识别：绑定默认域名 *.pages.dev 时校正 og:url 等
  if (env.CF_PAGES === '1' || env.CF_PAGES_URL) {
    this.config.root = '/';
    if (env.CF_PAGES_URL && !env.HEXO_URL) this.config.url = env.CF_PAGES_URL;
    hexo.log.info('Cloudflare Pages 构建环境已检测到：root=/，url=%s', this.config.url);
    return;
  }

  if (env.HEXO_ROOT || env.HEXO_URL) {
    hexo.log.info('部署路径已通过环境变量覆盖：root=%s，url=%s', this.config.root, this.config.url);
  }
});
