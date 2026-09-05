import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

const base = process.env.QA_BASE_URL || 'http://127.0.0.1:4173';
const browser = await chromium.launch({channel:'chrome',headless:true});
const context = await browser.newContext({viewport:{width:390,height:844}});
const page = await context.newPage();
const requests=[];
const errors=[];
page.on('request', request => requests.push(request.url()));
page.on('pageerror', error => errors.push(error.message));
// Exercise a blocked third-party player: the direct watch link must remain usable.
await context.route('https://www.youtube-nocookie.com/**', route => route.fulfill({status:503,contentType:'text/plain',body:'Player unavailable during QA'}));
try {
  await page.goto(base+'/guides/time-limit/');
  await page.waitForLoadState('networkidle');
  assert.equal(await page.locator('iframe').count(),0);
  assert.equal(requests.some(url=>/youtube|ytimg|googlevideo/.test(url)),false);
  const photo=page.locator('.article-image img');
  await photo.scrollIntoViewIfNeeded();
  await page.waitForFunction(()=>document.querySelector('.article-image img')?.naturalWidth>0);
  assert.equal(await photo.getAttribute('width'),'1280');
  await page.locator('#official-video .spoiler-gate').click();
  assert.equal(await page.locator('iframe').count(),0);
  assert.equal(requests.some(url=>/youtube|ytimg|googlevideo/.test(url)),false);
  await page.getByRole('button',{name:'Load YouTube video',exact:true}).click();
  const player=page.locator('iframe');
  await player.waitFor();
  assert.match(await player.getAttribute('src'),/^https:\/\/www.youtube-nocookie.com\/embed\/ZmLNnt2Lk28/);
  assert.ok(await page.getByRole('link',{name:'Watch on YouTube',exact:false}).isVisible());
  assert.equal(await page.getByRole('link',{name:'Watch on YouTube',exact:false}).getAttribute('href'),'https://www.youtube.com/watch?v=ZmLNnt2Lk28');
  await page.getByRole('button',{name:'Unload video',exact:true}).click();
  assert.equal(await page.locator('iframe').count(),0);
  await page.getByRole('button',{name:'Load YouTube video',exact:true}).click();
  await page.locator('.quick-answer').getByRole('button',{name:'Full spoilers',exact:true}).click();
  await page.locator('.quick-answer').getByRole('button',{name:'No spoilers',exact:true}).click();
  await page.waitForFunction(()=>document.querySelectorAll('iframe').length===0);
  for(const width of [390,1440]) {
    await page.setViewportSize({width,height:900});
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
    assert.equal(overflow,false);
    await page.locator('#official-video').screenshot({path:`artifacts/official-media-${width}.png`});
  }
  await page.goto(base+'/guides/quests/withering-away/');
  assert.equal(await page.locator('#steps ol li').count(),2);
  assert.equal(await page.locator('#faq h3').count(),3);
  assert.match(await page.locator('#steps').innerText(),/hot water/);
  const incomplete=await context.request.get(base+'/guides/completionist-route/');
  assert.match(await incomplete.text(),/name="robots" content="noindex, follow"/);
  const sitemap=await (await context.request.get(base+'/sitemap.xml')).text();
  assert.ok(!sitemap.includes('/guides/completionist-route/'));
  for(const path of ['/og/guides.png','/og/guides/time-limit.png','/opengraph-image']) {
    const response=await context.request.get(base+path);
    assert.equal(response.status(),200,path);
    assert.match(response.headers()['content-type'],/image\/png/);
  }
  assert.deepEqual(errors,[]);
  await fs.writeFile('artifacts/media-qa.json',JSON.stringify({base,checkedAt:new Date().toISOString(),checks:['No YouTube requests before explicit load','Spoiler reveal alone does not load player','Blocked player retains external fallback','Unload and rehide remove iframe','Official image loads','Mobile and desktop fit','Recipe steps and FAQ','Incomplete route noindex','Parent and child OG PNG routes'],errors},null,2));
  console.log('PASS media, privacy, spoiler, article and static OG checks');
} finally {await browser.close();}
