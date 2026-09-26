/**
 * Decap CMS GitHub OAuth 网关 — Cloudflare Worker
 *
 * 部署步骤：
 * 1. 在 GitHub 创建 OAuth App（Settings → Developer settings → OAuth Apps）：
 *    - Homepage URL: https://xfm0797.github.io/hexo-theme-lovou/
 *    - Authorization callback URL: https://<你的Worker域名>/callback
 *    记下 Client ID / Client Secret
 * 2. 在 Cloudflare Dashboard 创建 Worker 并粘贴本文件代码，或使用 wrangler:
 *    npx wrangler deploy oauth-gateway/worker.js --name decap-oauth
 * 3. 为 Worker 配置环境变量（Secrets，勿用明文）：
 *    npx wrangler secret put OAUTH_CLIENT_ID
 *    npx wrangler secret put OAUTH_CLIENT_SECRET
 * 4. 把 Worker 的访问地址填入 source/admin/config.yml 的 backend.base_url
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 授权入口：Decap 弹出窗口访问 /auth，重定向到 GitHub 授权页
    if (url.pathname === '/auth') {
      const params = new URLSearchParams({
        client_id: env.OAUTH_CLIENT_ID,
        redirect_uri: `${url.origin}/callback`,
        scope: 'repo,user',
        state: crypto.randomUUID(),
      });
      return Response.redirect(
        `https://github.com/login/oauth/authorize?${params}`,
        302
      );
    }

    // 授权回调：用 code 换取 access_token，通过 postMessage 传回 Decap
    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');
      if (!code) return new Response('缺少 code 参数', { status: 400 });

      const res = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          client_id: env.OAUTH_CLIENT_ID,
          client_secret: env.OAUTH_CLIENT_SECRET,
          code,
        }),
      });
      const data = await res.json();
      if (!data.access_token) {
        return new Response('授权失败：无法获取 access_token', { status: 401 });
      }

      const html = `<!DOCTYPE html>
<html><body>
<p>授权成功，正在返回编辑器…</p>
<script>
  window.opener.postMessage(
    { status: 'success', token: '${data.access_token}', provider: 'github' },
    '*'
  );
  window.close();
</script>
</body></html>`;
      return new Response(html, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }

    // 根路径状态页：仅用于确认网关已正确部署
    if (url.pathname === '/' || url.pathname === '') {
      const html = `<!DOCTYPE html>
<html lang="zh-CN"><head><meta charset="UTF-8">
<title>Decap/Sveltia CMS OAuth 网关</title>
<style>
  body{font-family:system-ui,-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;
    display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;
    background:#f6f7f9;color:#1f2328}
  .card{background:#fff;border:1px solid #e8eaee;border-radius:12px;padding:2.5rem 3rem;
    text-align:center;box-shadow:0 4px 16px rgba(0,0,0,.06)}
  h1{font-size:1.2rem;margin:0 0 .5rem}
  p{color:#6b7280;font-size:.9rem;margin:.3rem 0}
  code{background:#f6f8fa;padding:.1em .4em;border-radius:5px;font-size:.85em}
  .ok{color:#16a34a}
</style></head>
<body><div class="card">
  <h1><span class="ok">●</span> OAuth 网关运行中</h1>
  <p>此地址仅供 CMS 授权使用，请勿直接访问。</p>
  <p>将 <code>你的Worker地址</code> 填入 <code>source/admin/config.yml</code> 的 <code>backend.base_url</code> 即可。</p>
</div></body></html>`;
      return new Response(html, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }

    return new Response('Not Found', { status: 404 });
  },
};
