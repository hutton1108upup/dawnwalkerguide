export const dynamic = 'force-static';
import type { MetadataRoute } from 'next';
import { SITE_URL, absolute, checkedDate } from '@/lib/site';
import { getRouteKeys, isIndexable } from '@/lib/routes';
import { articles } from '@/content/data';
export default function sitemap():MetadataRoute.Sitemap{return [{url:SITE_URL+'/',lastModified:checkedDate},...getRouteKeys().filter(isIndexable).map(key=>({url:absolute(`/${key}/`),lastModified:articles.find(a=>`${a.category}/${a.slug}`===key)?.updated||checkedDate}))];}
