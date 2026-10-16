/* lovou 主题：Google AdSense 辅助
 *
 * 当主题配置 adsense.enable = true 且 adsense.client 已填写时，
 * 构建阶段自动生成 /ads.txt（Google 建议的站点授权声明文件，
 * 没有它广告填充率可能偏低）。
 *
 * 广告脚本注入与广告位渲染分别见
 *   layout/partial/head.ejs
 *   layout/partial/adsense.ejs
 */

'use strict';

hexo.extend.generator.register('adsense-ads-txt', function () {
  const themeConfig = (hexo.theme && hexo.theme.config) || {};
  const adsense = themeConfig.adsense || {};

  if (!adsense.enable || !adsense.client || adsense.ads_txt === false) return;

  // ca-pub-1234567890123456 -> pub-1234567890123456
  const pubId = String(adsense.client).trim().replace(/^ca-/, '');
  if (!/^pub-\d{16}$/.test(pubId)) {
    hexo.log.warn('AdSense client 格式异常，已跳过 ads.txt 生成：%s', adsense.client);
    return;
  }

  return {
    path: 'ads.txt',
    data: `google.com, ${pubId}, DIRECT, f08c47fec0942fa0\n`
  };
});
