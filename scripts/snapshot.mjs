// Save a static, click-through preview of the app (run with DEMO_MODE=1) for GitHub Pages.
// Usage: node scripts/snapshot.mjs <appUrl> <outDir> <basePath>
//   e.g. node scripts/snapshot.mjs http://localhost:3100 ../preview /yorcmo-alliance/
// Scripts are stripped; forms show a "preview only" notice instead of submitting.
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright'); // honors NODE_PATH for a global install
import fs from 'node:fs/promises';
import path from 'node:path';

const [appUrl, outDir, basePath] = process.argv.slice(2);
if (!appUrl || !outDir || !basePath) throw new Error('usage: snapshot.mjs <appUrl> <outDir> <basePath>');

const PUBLIC = ['/', '/story', '/membership', '/marketplace', '/operating-cmo', '/join', '/talk', '/login', '/welcome'];
const MEMBER = ['/member', '/member/marketplace', '/member/listings', '/member/listings/new', '/member/inbox',
  '/member/members', '/member/profile', '/member/admin', '/account'];

const fileFor = (route) => (route === '/' ? 'index.html' : `${route.replace(/^\//, '')}.html`);

const BANNER = `<div class="draft-bar">Preview with sample data · Members and listings shown are fictional · Forms and payments are switched off</div>`;
const SCRIPT = `<script>
document.addEventListener('click',function(e){var b=e.target.closest('.menu-btn');if(!b)return;var n=document.getElementById('nav');var o=n.classList.toggle('open');b.setAttribute('aria-expanded',String(o));});
document.addEventListener('submit',function(e){e.preventDefault();alert('Preview only: forms and payments are switched off in this preview.');},true);
</script>`;

function rewrite(html, cssName) {
  // Drop Next.js scripts and script preloads.
  html = html.replace(/<script\b[\s\S]*?<\/script>/g, '');
  html = html.replace(/<link[^>]+rel="preload"[^>]+as="script"[^>]*>/g, '');
  html = html.replace(/<link[^>]+rel="modulepreload"[^>]*>/g, '');
  // Stylesheet → copied file.
  html = html.replace(/href="\/_next\/static\/css\/[^"]+\.css"/, `href="${cssName}"`);
  html = html.replace(/<link[^>]+href="\/_next\/static\/css\/[^"]+"[^>]*>/g, '');
  // Internal links → static files (resolved against <base>).
  html = html.replace(/(href|action)="(\/[^"]*)"/g, (m, attr, url) => {
    if (url.startsWith('//')) return m;
    const [p, hash = ''] = url.split('#');
    const route = p.split('?')[0] || '/';
    if (route.startsWith('/auth/') || route.startsWith('/api/')) return `${attr}="${hash ? '#' + hash : '#'}"`;
    return `${attr}="${fileFor(route)}${hash ? '#' + hash : ''}"`;
  });
  html = html.replace('<head>', `<head><base href="${basePath}">`);
  html = html.replace(/(<body[^>]*>)/, `$1${BANNER}`);
  html = html.replace('</body>', `${SCRIPT}</body>`);
  return html;
}

const browser = await chromium.launch();
const ctxPublic = await browser.newContext();
const ctxMember = await browser.newContext();
await ctxMember.addCookies([{ name: 'demo', value: 'member', url: appUrl }]);

await fs.rm(outDir, { recursive: true, force: true });
await fs.mkdir(outDir, { recursive: true });

let cssName = null;
const routes = [...PUBLIC.map((r) => [r, ctxPublic]), ...MEMBER.map((r) => [r, ctxMember])];

// Discover listing detail and edit pages from the member marketplace and my listings.
const probe = await ctxMember.newPage();
for (const list of ['/member/marketplace', '/member/listings', '/member/admin']) {
  await probe.goto(appUrl + list);
  const hrefs = await probe.$$eval('a[href^="/member/marketplace/"], a[href^="/member/listings/"]', (as) => as.map((a) => a.getAttribute('href')));
  for (const h of hrefs) if (h !== '/member/listings/new' && !routes.some(([r]) => r === h)) routes.push([h, ctxMember]);
}
await probe.close();

for (const [route, ctx] of routes) {
  const page = await ctx.newPage();
  const res = await page.goto(appUrl + route, { waitUntil: 'networkidle' });
  if (!res || res.status() >= 400 || new URL(page.url()).pathname !== route) {
    throw new Error(`${route}: status ${res?.status()} landed on ${page.url()}`);
  }
  if (!cssName) {
    const href = await page.$eval('link[rel="stylesheet"][href^="/_next/static/css/"]', (l) => l.getAttribute('href'));
    const css = await (await fetch(appUrl + href)).text();
    cssName = 'app.css';
    await fs.writeFile(path.join(outDir, cssName), css);
  }
  const file = path.join(outDir, fileFor(route));
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, rewrite(await page.content(), cssName));
  console.log('saved', route, '→', fileFor(route));
  await page.close();
}
await fs.writeFile(path.join(outDir, '.nojekyll'), '');
await browser.close();
