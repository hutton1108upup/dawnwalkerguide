export const dynamic = 'force-static';
import type { MetadataRoute } from 'next';
import { SITE_URL, absolute } from '@/lib/site';
import { getRouteKeys, isIndexable } from '@/lib/routes';
import { articles } from '@/content/data';
// Record substantive page edits explicitly; omit dates where no page history exists.
const pageUpdated: Record<string, string> = {
  'tools/30-day-planner': '2026-09-06',
};
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL + '/', lastModified: '2026-09-06' },
    ...getRouteKeys().filter(isIndexable).map(key => {
      const updated = articles.find(a => `${a.category}/${a.slug}` === key)?.updated || pageUpdated[key];
      return { url: absolute(`/${key}/`), ...(updated ? { lastModified: updated } : {}) };
    }),
  ];
}
