/* lovou 主题自定义辅助函数 */

'use strict';

// 统计中英文字数（中文按字计，英文按词计）
hexo.extend.helper.register('word_count', function (content) {
  const text = String(content)
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]*>/g, '');
  const enWords = (text.match(/[a-zA-Z0-9]+(?:['-][a-zA-Z0-9]+)*/g) || []).length;
  const zhChars = (text.match(/[\u4e00-\u9fff\u3400-\u4dbf]/g) || []).length;
  return enWords + zhChars;
});

// 阅读时长（按中文 400 字/分钟估算）
hexo.extend.helper.register('reading_time', function (count) {
  return Math.max(1, Math.ceil(count / 400));
});

// 生成文章摘要（去除标签后截断，避免破坏中文字符）
hexo.extend.helper.register('trim_excerpt', function (content, length) {
  const len = length || 140;
  const text = String(content)
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return text.length > len ? text.slice(0, len) + '…' : text;
});
