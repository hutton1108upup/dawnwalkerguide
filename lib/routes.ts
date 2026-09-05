import { articles, choices, quests } from '@/content/data';
export const hubs: Record<string,{title:string;description:string}> = {
  'guides':{title:'Find your next answer',description:'Time, quest order, and the decisions that matter. Start with the question on your mind.'},
  'tools':{title:'A little foresight goes a long way',description:'Build a plan, track missables, and choose how much of the story you reveal. Everything saves in your browser.'},
  'fixes':{title:'Get back to Vale Sangora',description:'Performance troubleshooting with clear evidence, official issue notes, and no promises of a miracle fix.'},
  'guides/quests':{title:'One quest. One clear next step.',description:'A small quest reference based on documented playthroughs, with the prologue and later campaign identified separately. Costs are time segments, not days.'},
  'guides/bosses':{title:'Before you face the next fight',description:'Start with the documented day and night combat systems. Specific boss weaknesses and attack timings are not yet verified.'},
  'guides/builds':{title:'Build around the way you play',description:'Understand the day and night kits before committing to an equipment path. No untested “best build” rankings.'},
  'news':{title:'What changed, and why it matters',description:'Official announcements that affect your playthrough. No filler news.'},
  'updates':{title:'The guide’s field notes',description:'A record of coverage, source checks, and what our tools currently know.'},
};
export const supports = ['about','editorial-policy','contact','privacy'];
export const toolRoutes = ['tools/30-day-planner','tools/missable-checklist','tools/choices'];
export function getRouteKeys() { return [...new Set([...Object.keys(hubs),...supports,...toolRoutes,...articles.map(a=>`${a.category}/${a.slug}`),...quests.map(q=>`guides/quests/${q.slug}`),...choices.map(c=>`guides/choices/${c.slug}`)])]; }
export function routeTitle(path:string) { const key=path.replace(/^\/+|\/+$/g,''); return articles.find(a=>`${a.category}/${a.slug}`===key)?.title || choices.find(c=>`guides/choices/${c.slug}`===key)?.question || quests.find(q=>`guides/quests/${q.slug}`===key)?.name || ({'tools/30-day-planner':'30-Day Planner','tools/missable-checklist':'Missable Checklist','tools/choices':'Spoiler-Controlled Choices'} as Record<string,string>)[key] || hubs[key]?.title || key.split('/').at(-1)?.replace(/-/g,' ') || 'Home'; }
export function isIndexable(key:string) { const article = articles.find(a=>`${a.category}/${a.slug}`===key); if(article) return article.indexable; if(['contact','privacy','updates','news','guides/bosses','guides/builds'].includes(key))return false; if(quests.some(q=>`guides/quests/${q.slug}`===key))return false; return true; }
