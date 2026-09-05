import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Moon, Sun } from 'lucide-react';
import { Planner } from '@/components/tools/Planner';
import { GuideCard } from '@/components/content/GuideCard';
import { articles, quests } from '@/content/data';
import { SITE_NAME, SITE_URL } from '@/lib/site';

const needs = [
  {question:"I don't know what quest to do next",title:'Quest Order',href:'/guides/quest-order/'},
  {question:"I'm afraid I'll miss something",title:'Missable Checklist',href:'/tools/missable-checklist/'},
  {question:'I need help with a choice',title:'Choices, Spoiler-Safe',href:'/tools/choices/'},
  {question:'My game runs badly',title:'Performance Fixes',href:'/fixes/'},
];
const problems = [
  {title:'What actually advances time?',description:'Understand the hourglass before spending a segment.',href:'/guides/time-limit/'},
  {title:'Can you complete every quest?',description:'Plan for your goals, with the limits clearly marked.',href:'/guides/completionist-route/'},
  {title:'Which quests should I do first?',description:'A source-backed starting point for the prologue.',href:'/guides/quest-order/'},
  {title:'Which choices can I change later?',description:'Read a recommendation. Reveal only what you need.',href:'/guides/choices/'},
];
export default function Home() {
  const verified = ['time-limit','combat','release-date'].map(slug => articles.find(a => a.slug === slug)).filter(a => a !== undefined);
  return <div className="wrap"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@graph':[{'@type':'WebSite','@id':SITE_URL+'/#website',url:SITE_URL,name:SITE_NAME,description:'A decision-first fan guide to The Blood of Dawnwalker.'},{'@type':'Organization','@id':SITE_URL+'/#organization',name:SITE_NAME,url:SITE_URL,description:'Independent, unofficial fan resource.'}]}).replace(/</g,'\\u003c')}}/><div className="hero"><div className="hero-eclipse" aria-hidden="true"><div className="ring"/><div className="core"/></div><div className="kicker">Two Worlds · One Choice</div><h1>Plan Your <em>30 Days</em> Without Missing What Matters</h1><p>A spoiler-controlled guide to quests, choices, missables and time management in The Blood of Dawnwalker.</p><div className="hero-actions"><Link href="/tools/30-day-planner/" className="btn btn-primary">Build My Route <ArrowRight size={16}/></Link><Link href="/guides/missable-quests/" className="btn btn-outline">See Missable Quests</Link></div><div className="duality"><span><Sun size={14}/><b>Human by day</b> — sword & witchcraft</span><span><Moon size={14}/><b>Vampire by night</b> — claws & new paths</span></div></div>
  <section className="home-section"><div className="section-heading"><h2>What Do You Need Right Now?</h2></div><div className="need-grid">{needs.map((need,i) => <Link key={need.href} href={need.href} className="need-card"><div className="need-number">0{i+1}</div><h3>{need.question}</h3><span>{need.title} →</span></Link>)}</div></section>
  <section className="home-section"><div className="section-heading"><h2>30-Day Planner</h2><Link className="section-more" href="/guides/time-limit/">Small decisions. Limited time. Understand the clock ↗</Link></div><Planner quests={quests} compact/><p className="section-note">Your plan stays in this browser. Reported quest costs are a starting point; check the in-game hourglass before committing.</p></section>
  <section className="home-section"><div className="section-heading"><h2>Popular Problems</h2><Link href="/guides/" className="section-more">Explore the guides →</Link></div><div className="problem-grid">{problems.map(problem => <Link key={problem.href} href={problem.href} className="problem-card"><div><h3>{problem.title}</h3><p>{problem.description}</p></div><ArrowUpRight size={17}/></Link>)}</div></section>
  <section className="home-section"><div className="section-heading"><h2>Fix Current Problems</h2><Link href="/fixes/" className="section-more">All fixes →</Link></div><div className="fix-grid">{[['Stuttering','stuttering','Fullscreen workaround'],['Best PC Settings','best-settings','A cautious starting point'],['Crashing','crashing','Startup & shader checks'],['Steam Deck','steam-deck','Compatibility status'],['PS5 Performance','ps5','Console guidance']].map(([name,slug,detail]) => <Link href={`/fixes/${slug}/`} className="fix-card" key={slug}><h3>{name}</h3><small>{detail}</small></Link>)}</div></section>
  <section className="home-section"><div className="section-heading"><h2>Recently Verified</h2><Link href="/editorial-policy/" className="section-more">Our verification policy →</Link></div><div className="guide-grid">{verified.map(article => <GuideCard key={article.slug} article={article}/>)}</div><p className="section-note">“Officially confirmed” refers to the cited source. We have not independently tested the retail build.</p></section></div>;
}
