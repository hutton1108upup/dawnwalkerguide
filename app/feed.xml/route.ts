import { articles } from '@/content/data';
import { SITE_URL, SITE_NAME, absolute } from '@/lib/site';
export const dynamic='force-static';
const xml=(value:string)=>value.replace(/[<>&"']/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&apos;'}[c]!));
export function GET(){return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${SITE_NAME}</title><link>${SITE_URL}</link><description>Source-backed Dawnwalker guides and updates</description>${articles.filter(a=>a.indexable).map(a=>`<item><title>${xml(a.title)}</title><link>${absolute(`/${a.category}/${a.slug}/`)}</link><guid>${absolute(`/${a.category}/${a.slug}/`)}</guid><description>${xml(a.description)}</description><pubDate>${new Date(a.updated+'T00:00:00+08:00').toUTCString()}</pubDate></item>`).join('')}</channel></rss>`,{headers:{'Content-Type':'application/rss+xml; charset=utf-8'}});}
