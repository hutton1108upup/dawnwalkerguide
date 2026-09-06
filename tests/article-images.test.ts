import test from 'node:test';
import assert from 'node:assert/strict';
import sharp from 'sharp';
import { articles } from '../content/data';
import { articleImages } from '../content/article-images';

test('new editorial images exist and their dimensions match the rendered img attributes', async () => {
  for (const image of Object.values(articleImages)) {
    const metadata = await sharp(`public${image.src}`).metadata();
    assert.equal(metadata.format, 'webp');
    assert.equal(metadata.width, image.width);
    assert.equal(metadata.height, image.height);
    assert.ok(articles.some(a => a.sections.some(s => s.image === image)), `Unused ${image.src}`);
  }
});

test('quest HUD screenshots require a spoiler reveal and cannot masquerade as retail evidence', () => {
  for (const image of [articleImages.timeDay, articleImages.timeNight]) {
    assert.equal(image.spoiler, 'light');
    assert.match(image.caption, /pre-beta/);
  }
});

test('generic gameplay screenshots are not attached to unverified performance guidance', () => {
  const added = new Set(Object.values(articleImages).map(i=>i.src));
  for (const article of articles.filter(a=>a.category==='fixes')) {
    assert.ok(article.sections.every(s=>!s.image || !added.has(s.image.src)));
  }
});
