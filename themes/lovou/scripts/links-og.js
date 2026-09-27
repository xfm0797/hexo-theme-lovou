/* lovou 主题：友链自动提取 Open Graph 信息
 *
 * 构建时自动抓取友链站点的 OG 信息，补全 front-matter 中缺失的字段。
 * 手动填写的字段优先级最高，不会被覆盖。
 * 结果缓存到站点根目录 .links-og-cache.json，避免每次构建重复抓取。
 */

'use strict';

const fs = require('fs');
const path = require('path');

const CACHE_FILE = '.links-og-cache.json';
const UA = 'Mozilla/5.0 (compatible; lovou-theme-links-bot/1.0; +https://github.com/xfm0797/hexo-theme-lovou)';
const TIMEOUT = 10000;
const CACHE_TTL = 7 * 24 * 3600 * 1000; // 缓存 7 天

// 从 HTML 中提取 <meta> 内容（兼容属性顺序、property/name 两种写法）
function metaContent(html, key) {
  const re1 = new RegExp('<meta[^>]*?(?:property|name)\\s*=\\s*["\']' + key + '["\'][^>]*?content\\s*=\\s*["\']([^"\']*)["\']', 'i');
  const re2 = new RegExp('<meta[^>]*?content\\s*=\\s*["\']([^"\']*)["\'][^>]*?(?:property|name)\\s*=\\s*["\']' + key + '["\']', 'i');
  const m = html.match(re1) || html.match(re2);
  if (!m) return '';
  return m[1]
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

// 提取 <title>
function pageTitle(html) {
  const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return m ? m[1].trim() : '';
}

// 提取站点图标（icon / shortcut icon / apple-touch-icon）
function pageIcon(html, baseUrl) {
  const patterns = [
    /<link[^>]+rel\s*=\s*["'][^"']*icon[^"']*["'][^>]*>/gi,
    /<link[^>]+href\s*=\s*["'][^"']+["'][^>]+rel\s*=\s*["'][^"']*icon[^"']*["'][^>]*>/gi
  ];
  for (const re of patterns) {
    let m;
    while ((m = re.exec(html)) !== null) {
      const href = m[0].match(/href\s*=\s*["']([^"']+)["']/i);
      if (href && href[1]) return resolveUrl(href[1], baseUrl);
    }
  }
  return '';
}

// 相对地址转绝对地址
function resolveUrl(src, baseUrl) {
  try {
    return new URL(src, baseUrl).toString();
  } catch (e) {
    return '';
  }
}

// 抓取单个站点并提取 OG 信息
async function fetchSiteInfo(link) {
  const result = {};
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT);
    const res = await fetch(link, {
      headers: { 'User-Agent': UA, Accept: 'text/html' },
      signal: controller.signal,
      redirect: 'follow'
    });
    clearTimeout(timer);
    if (!res.ok) return result;
    const html = (await res.text()).slice(0, 512 * 1024);

    const siteName = metaContent(html, 'og:site_name');
    const ogTitle = metaContent(html, 'og:title');
    const title = siteName || pageTitle(html) || ogTitle;
    if (title) result.name = title.slice(0, 60);

    const desc = metaContent(html, 'og:description') || metaContent(html, 'description');
    if (desc) result.desc = desc.slice(0, 120);

    const icon = pageIcon(html, link)
      || resolveUrl('/favicon.ico', link)
      || metaContent(html, 'og:image');
    if (icon) result.avatar = icon;
  } catch (e) {
    hexo.log.warn('友链 OG 提取失败 %s: %s', link, e.message || e);
  }
  return result;
}

function loadCache(baseDir) {
  try {
    return JSON.parse(fs.readFileSync(path.join(baseDir, CACHE_FILE), 'utf8'));
  } catch (e) {
    return {};
  }
}

function saveCache(baseDir, cache) {
  try {
    fs.writeFileSync(path.join(baseDir, CACHE_FILE), JSON.stringify(cache, null, 2));
  } catch (e) {
    /* 缓存写入失败不影响构建 */
  }
}

hexo.extend.filter.register('before_generate', async function () {
  // 旧版 Node 无内置 fetch 时跳过（保留手动字段）
  if (typeof fetch === 'undefined') {
    hexo.log.warn('Node 版本过低（<18），友链 OG 自动提取已跳过');
    return;
  }

  const Page = this.model('Page');
  const linksPage = Page.findOne({ type: 'links' });
  if (!linksPage || !Array.isArray(linksPage.links) || !linksPage.links.length) return;

  const baseDir = this.base_dir;
  const cache = loadCache(baseDir);
  const now = Date.now();
  const enriched = [];

  for (const friend of linksPage.links) {
    if (!friend || !friend.link) { enriched.push(friend); continue; }
    const item = Object.assign({}, friend);

    // 缓存有效期内直接使用缓存
    let info = null;
    if (cache[friend.link] && now - cache[friend.link].ts < CACHE_TTL) {
      info = cache[friend.link].data;
    } else {
      info = await fetchSiteInfo(friend.link);
      cache[friend.link] = { data: info, ts: now };
    }

    // 只补全缺失字段，手动填写优先
    if (!item.name && info.name) item.name = info.name;
    if (!item.desc && info.desc) item.desc = info.desc;
    if (!item.avatar && info.avatar) item.avatar = info.avatar;
    if (!item.name) item.name = item.link; // 兜底显示域名
    enriched.push(item);
  }

  saveCache(baseDir, cache);
  linksPage.links = enriched;
  linksPage.save();
});
