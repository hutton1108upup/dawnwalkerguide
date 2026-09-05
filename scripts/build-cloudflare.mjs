import { spawnSync } from 'node:child_process';
import { copyFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const build = spawnSync(process.execPath, ['node_modules/next/dist/bin/next', 'build'], {
  stdio: 'inherit', env: { ...process.env, CLOUDFLARE_BUILD: '1' },
});
if (build.status !== 0) process.exit(build.status ?? 1);
// Next 16.3's exporter passes Windows path separators to a slash-only segment
// filename encoder. Supply the flat RSC filenames requested by its client.
// Linux exports already have these files; leave them untouched.
for (const path of readdirSync('out', { recursive: true })) {
  const normalized = String(path).replaceAll('\\', '/');
  const marker = normalized.indexOf('/__next.');
  const segmentStart = marker >= 0 ? marker + 1 : normalized.startsWith('__next.') ? 0 : -1;
  if (segmentStart < 0 || !normalized.endsWith('.txt')) continue;
  const prefix = normalized.slice(0, segmentStart);
  const segment = normalized.slice(segmentStart);
  if (segment.includes('/')) copyFileSync(join('out', String(path)), join('out', prefix + segment.replaceAll('/', '.')));
}
// Extensionless Next image routes need explicit MIME types on static hosting.
writeFileSync('out/_headers', `/opengraph-image\n  Content-Type: image/png\n/og/*\n  Content-Type: image/png\n/feed.xml\n  Content-Type: application/rss+xml; charset=utf-8\n/_next/static/*\n  Cache-Control: public, max-age=31536000, immutable\n`);
const commit = spawnSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' });
if (commit.status !== 0) throw new Error('Cannot identify release commit');
writeFileSync('out/release.json', JSON.stringify({ commit: commit.stdout.trim() }) + '\n');
