import test from 'node:test';
import assert from 'node:assert/strict';
import { articles, quests, choices, missables } from '../content/data';
import { getRouteKeys, isIndexable } from '../lib/routes';
test('unbenchmarked settings and crash workflows never inherit an official-tested label',()=>{
  for(const slug of ['best-settings','crashing'])assert.equal(articles.find(a=>a.slug===slug)?.verificationStatus,'unverified');
});
test('an unspecified quest phase stays unknown rather than becoming day-only',()=>{
  assert.equal(quests.find(q=>q.slug==='into-the-den')?.timeOfDay,'unknown');
});
test('every internal content link resolves to a real route',()=>{
  const routes=new Set(getRouteKeys());
  for(const path of [...articles.flatMap(a=>a.related),...missables.map(m=>m.href)])assert.ok(routes.has(path.replace(/^\/+|\/+$/g,'')),`Missing route: ${path}`);
});
test('published data has unique slugs, evidence URLs and finite or unknown costs',()=>{
  for(const records of [articles.map(a=>`${a.category}/${a.slug}`),quests.map(q=>q.slug),choices.map(c=>c.slug)])assert.equal(new Set(records).size,records.length);
  for(const record of [...articles,...quests,...choices]){assert.ok(record.sources.length>0);for(const s of record.sources)assert.match(s.url,/^https:\/\//);}
  for(const quest of quests)assert.ok(quest.timeCost===null||(Number.isInteger(quest.timeCost)&&quest.timeCost>=0));
});
test('thin performance and unverified encounter hubs stay out of the sitemap',()=>{
  for(const path of ['fixes/best-settings','fixes/steam-deck','fixes/ps5','guides/bosses','guides/builds'])assert.equal(isIndexable(path),false);
  assert.equal(isIndexable('guides/time-limit'),true);
});
