import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import { PreferencesProvider } from '@/components/site/Preferences';
import { Header, type SearchEntry } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';
import { articles, choices, quests } from '@/content/data';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '@/lib/site';
import './globals.css';
const display = Cormorant_Garamond({ subsets:['latin'], weight:['500','600','700'], display:'swap', variable:'--font-display' });
const body = Inter({ subsets:['latin'], weight:['400','500','600'], display:'swap', variable:'--font-body' });
export const metadata: Metadata = {metadataBase:new URL(SITE_URL),title:{default:'Blood of Dawnwalker Guide & 30-Day Planner',template:'%s | Dawnwalker Guide'},description:SITE_DESCRIPTION,alternates:{canonical:'/'},openGraph:{type:'website',siteName:SITE_NAME,title:'Blood of Dawnwalker Guide & 30-Day Planner',description:SITE_DESCRIPTION,url:SITE_URL,images:[{url:'/opengraph-image',width:1200,height:630}]},twitter:{card:'summary_large_image',title:'Blood of Dawnwalker Guide & 30-Day Planner',description:SITE_DESCRIPTION,images:['/opengraph-image']},robots:{index:true,follow:true}};
const initPreferences = `(function(){try{var t=localStorage.getItem('dw-theme'),s=localStorage.getItem('dw-spoiler');document.documentElement.dataset.theme=t==='day'?'day':'night';document.documentElement.dataset.spoiler=['none','light','full'].includes(s)?s:'none'}catch(e){}})();`;
export default function RootLayout({ children }: {children: React.ReactNode}) {
  const entries: SearchEntry[] = [
    ...articles.map(a => ({href:`/${a.category}/${a.slug}/`, title:a.title, category:a.category === 'fixes' ? 'Fix' : a.slug.startsWith('quests/') ? 'Quest' : 'Guide', keywords:a.keywords})),
    ...quests.filter(q => !articles.some(a => a.slug === `quests/${q.slug}`)).map(q => ({href:`/guides/quests/${q.slug}/`,title:q.name,category:'Quest',keywords:[q.character,q.location,'quest']})),
    ...choices.map(c => ({href:`/guides/choices/${c.slug}/`,title:c.question,category:'Choice',keywords:[c.title,c.questSlug,'choice']})),
    {href:'/tools/30-day-planner/',title:'30-Day Planner',category:'Tool',keywords:['30 days','time','quest order','plan','route']},
    {href:'/tools/missable-checklist/',title:'Missable Checklist',category:'Tool',keywords:['missable','checklist','progress']},
    {href:'/tools/choices/',title:'Spoiler-Controlled Choices',category:'Tool',keywords:['spoiler','choices','decision']},
  ];
  return <html lang="en" data-theme="night" data-spoiler="none" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html:initPreferences}}/></head><body className={`${display.variable} ${body.variable}`}><PreferencesProvider><a href="#main-content" className="skip-link">Skip to content</a><Header entries={entries}/><main id="main-content">{children}</main><Footer/></PreferencesProvider></body></html>;
}
