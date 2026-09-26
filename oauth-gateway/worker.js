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

    return new Response('Not Found', { status: 404 });
  },
};
