import test from 'node:test';
import assert from 'node:assert/strict';
import { articles } from '../content/data';
import { isIndexable, routeTitle } from '../lib/routes';

test('incomplete campaign route is not submitted for indexing', () => {
  assert.equal(isIndexable('guides/completionist-route'), false);
});

test('search titles identify the decision subject without exposing its outcome', () => {
  assert.match(routeTitle('guides/choices/force-feed-esme'), /Esme/);
  assert.match(routeTitle('guides/choices/blasphemy-return-the-banner'), /Blasphemy/);
  assert.doesNotMatch(routeTitle('guides/choices/blasphemy-return-the-banner'), /dies|death/i);
});

test('article recommendations do not send readers back to the same page', () => {
  for (const article of articles) assert.ok(!article.related.includes(`/${article.category}/${article.slug}/`));
});
