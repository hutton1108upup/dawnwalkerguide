import Link from 'next/link';
import { ArrowUpRight, Info } from 'lucide-react';
import type { Article, ArticleImage, ArticleSection, Source, Quest } from '@/content/types';
import { SpoilerGate, SpoilerSwitch } from '@/components/site/Preferences';
import { VerifiedBadge } from './Trust';
import { Toc } from './Toc';
import { YouTubeVideo } from './YouTubeVideo';
export function Breadcrumbs({ items }: { items: { title: string; href?: string }[] }) { return <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link>{items.map((item,i) => <span key={i} style={{display:'contents'}}><span aria-hidden="true">/</span>{item.href ? <Link href={item.href}>{item.title}</Link> : <span aria-current="page">{item.title}</span>}</span>)}</nav>; }
export function QuickAnswer({ text, status, version }: { text: string; status: Article['verificationStatus']; version: string }) { return <div className="quick-answer"><p className="eyebrow">Quick answer</p><p>{text}</p><div className="answer-meta"><VerifiedBadge status={status}/><SpoilerSwitch/><span>{version}</span></div></div>; }
export function Sources({ sources }: { sources: Source[] }) { return <section className="article-section" id="sources"><h2>Sources & verification</h2><ul className="source-list">{sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.title} ↗</a>{source.note && <small>{source.note}</small>}</li>)}</ul><p className="reviewed-note">Source checks are separate from in-game testing. <Link className="text-link" href="/editorial-policy/">Read our evidence policy.</Link></p></section>; }
export function RelatedLinks({ links }: { links: {href:string;title:string}[] }) { return <section className="related-section"><h2>Keep your next step in sight</h2><div className="link-grid">{links.map(link => <Link key={link.href} href={link.href} className="related-link">{link.title}<ArrowUpRight size={17}/></Link>)}</div></section>; }
function GameImage({ image }: { image: ArticleImage }) {
  // img SEO: describe the actual scene in alt; keyword/placement rationale lives in
  // content/article-images.ts. Source credit is visible in figcaption, not just a comment.
  // Local WebP + explicit dimensions + lazy decoding work with the static export.
  const figure = <figure className="article-image"><img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" decoding="async"/><figcaption>{image.caption} <a href={image.source.url} target="_blank" rel="noreferrer">{image.source.title} ↗</a></figcaption></figure>;
  return image.spoiler ? <SpoilerGate level={image.spoiler}>{figure}</SpoilerGate> : figure;
}
function SectionBody({ section }: { section: ArticleSection }) {
  return <>
    {section.paragraphs.map((p,i) => <p key={i}>{p}</p>)}
    {section.steps && <ol className="article-steps">{section.steps.map(step => <li key={step}>{step}</li>)}</ol>}
    {section.bullets && <ul>{section.bullets.map(b => <li key={b}>{b}</li>)}</ul>}
    {section.table && <div className="table-wrap"><table><thead><tr>{section.table.headers.map(h => <th scope="col" key={h}>{h}</th>)}</tr></thead><tbody>{section.table.rows.map((row,i) => <tr key={i}>{row.map((cell,j) => <td key={j}>{cell}</td>)}</tr>)}</tbody></table></div>}
    {section.sources && <p className="section-evidence">Evidence: {section.sources.map((source,i) => <span key={source.url}>{i > 0 && ' · '}<a href={source.url} target="_blank" rel="noreferrer">{source.title} ↗</a></span>)}</p>}
    {section.links && <ul className="section-reading">{section.links.map(link => <li key={link.href}><Link href={link.href}>{link.title} →</Link></li>)}</ul>}
    {section.image && <GameImage image={section.image}/>}
    {section.video && <SpoilerGate level={section.video.spoiler}><YouTubeVideo video={section.video}/></SpoilerGate>}
  </>;
}
function QuestOverview({quest:q}:{quest:Quest}) {
  const rows=[['Stage',q.routeTags.includes('prologue')?'Prologue — separate from campaign':'Later campaign'],['Type / location',`${q.type} · ${q.location}`],['Reported time cost',q.timeCost===null?'Unknown / conditional':`${q.timeCost} segment${q.timeCost===1?'':'s'}`],['Day / night availability',q.timeOfDay==='unknown'?'Not established':q.timeOfDay],['How to start',q.howToStart],['Prerequisites',q.prerequisites.join(', ')||'Not fully mapped'],['Missable',q.missable===null?'Not established':q.missable?'Reported risk':'Reported as available later'],['Deadline',q.deadline||'No exact deadline established']];
  return <section className="article-section" id="quest-overview"><h2>Quest overview</h2><div className="table-wrap"><table className="overview-table"><tbody>{rows.map(([label,value])=><tr key={label}><th scope="row">{label}</th><td>{value}</td></tr>)}</tbody></table></div>{q.missable&&<div className="warning"><strong>Missable content</strong>{q.deadline||'Check the current event deadline before committing.'}</div>}<Link href="/tools/30-day-planner/" className="text-link">Plan this with your other quests →</Link></section>;
}
export function ArticleView({ article, related, quest }: { article: Article; related: {href:string;title:string}[]; quest?: Quest }) {
  const toc = [...(quest ? [{id:'quest-overview',title:'Quest overview'}] : []), ...article.sections.map(s => ({ id:s.id, title:s.title })), ...(article.faq?.length ? [{id:'faq',title:'Frequently asked questions'}] : []), { id:'sources', title:'Sources & verification' }];
  return <div className="wrap page-shell"><div className="page-intro"><Breadcrumbs items={[{ title:article.category === 'fixes' ? 'Fixes' : article.category === 'news' ? 'News' : 'Guides',href:`/${article.category}/`},{title:article.title}]}/><p className="eyebrow">{article.kicker}</p><h1>{article.title}</h1><div className="page-meta"><VerifiedBadge status={article.verificationStatus}/><span>Sources reviewed {article.updated}</span><span>By Dawnwalker Guide editors</span></div></div><div className="article-layout"><article className="article-main"><QuickAnswer text={article.quickAnswer} status={article.verificationStatus} version={article.gameVersion}/>{article.evidenceNote && <p className="reviewed-note">{article.evidenceNote}</p>}{article.verificationStatus === 'unverified' && article.category === 'fixes' && <div className="info-strip"><Info size={18}/><span>This is a cautious troubleshooting workflow. No game-specific performance benchmark or guaranteed fix is claimed.</span></div>}<details className="mobile-toc"><summary>On this page</summary>{toc.map(item => <a key={item.id} href={`#${item.id}`}>{item.title}</a>)}</details>{quest && <QuestOverview quest={quest}/ >}{article.sections.map(section => <section className="article-section" key={section.id} id={section.id}><h2>{section.title}</h2>{section.spoiler && section.spoiler !== 'none' ? <SpoilerGate level={section.spoiler}><SectionBody section={section}/></SpoilerGate> : <SectionBody section={section}/>}</section>)}<>{article.faq && <section className="article-section article-faq" id="faq"><h2>Frequently asked questions</h2>{article.faq.map(item => <div key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></div>)}</section>}</><Sources sources={article.sources}/><RelatedLinks links={related}/><p className="reviewed-note">Spotted a mismatch with your game? <Link className="text-link" href={`/contact/?page=${encodeURIComponent(`/${article.category}/${article.slug}/`)}`}>Prepare a correction report →</Link></p></article><Toc items={toc}/></div></div>;
}
