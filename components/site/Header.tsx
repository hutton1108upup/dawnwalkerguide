'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Search, Menu, X, ArrowUpRight, Sun, Moon } from 'lucide-react';
import { SpoilerSwitch, usePreferences } from './Preferences';
import { track } from '@/lib/events';

export interface SearchEntry { href: string; title: string; category: string; keywords: string[] }
const nav = [['Guides', '/guides/'], ['Planner', '/tools/30-day-planner/'], ['Choices', '/guides/choices/'], ['Quests', '/guides/quests/'], ['Bosses', '/guides/bosses/'], ['Builds', '/guides/builds/'], ['Fixes', '/fixes/']];
export function Header({ entries }: { entries: SearchEntry[] }) {
  const { theme, setTheme } = usePreferences();
  const path = usePathname();
  const [menu, setMenu] = useState(false);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const search = useRef<HTMLDialogElement>(null);
  const menuDialog = useRef<HTMLDialogElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const results = entries.filter(entry => (category === 'All' || entry.category === category) && `${entry.title} ${entry.keywords.join(' ')}`.toLowerCase().includes(query.trim().toLowerCase())).slice(0, 12);
  function openSearch() { menuDialog.current?.close(); setMenu(false); search.current?.showModal(); searchInput.current?.focus(); }
  useEffect(() => {
    const key = (event: KeyboardEvent) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); search.current?.showModal(); searchInput.current?.focus(); } };
    document.addEventListener('keydown', key); return () => document.removeEventListener('keydown', key);
  }, []);
  useEffect(() => { if (!query.trim()) return; const timer = setTimeout(() => track(results.length ? 'search' : 'search_no_result', { query: query.slice(0, 120), count: results.length }), 600); return () => clearTimeout(timer); }, [query, results.length]);
  useEffect(() => { search.current?.close(); menuDialog.current?.close(); setMenu(false); }, [path]);
  return <><header className="site-header"><div className="wrap nav-row"><Link href="/" className="brand" aria-label="Dawnwalker Guide home"><span className="eclipse-logo" aria-hidden="true"/><span>Dawnwalker Guide</span></Link><nav className="desktop-nav" aria-label="Main navigation">{nav.map(([label, href]) => <Link key={href} href={href} aria-current={path === href.slice(0, -1) || path === href ? 'page' : undefined}>{label}</Link>)}</nav><div className="header-controls"><div className="header-spoiler"><SpoilerSwitch compact/></div><button className="icon-button search-trigger" onClick={openSearch} aria-label="Search guides"><Search size={18}/></button><button className="theme-toggle" onClick={() => setTheme(theme === 'night' ? 'day' : 'night')} aria-label={`Switch to ${theme === 'night' ? 'day' : 'night'} theme`} aria-pressed={theme === 'day'}><Moon size={13}/><span>Night</span><i className="toggle-track" aria-hidden="true"/><Sun size={13}/><span>Day</span></button><button className="icon-button menu-trigger" aria-label="Open navigation" aria-expanded={menu} onClick={() => { setMenu(true); menuDialog.current?.showModal(); }}><Menu size={22}/></button></div></div></header>
  <dialog ref={menuDialog} className="mobile-drawer" onClose={() => setMenu(false)}><div className="dialog-heading"><span className="brand"><span className="eclipse-logo"/>Explore the guide</span><button className="icon-button" aria-label="Close navigation" onClick={() => menuDialog.current?.close()}><X size={20}/></button></div><nav aria-label="Mobile navigation">{nav.map(([label, href]) => <Link href={href} key={href} onClick={() => { menuDialog.current?.close(); setMenu(false); }}>{label}<ArrowUpRight size={16}/></Link>)}<Link href="/news/" onClick={() => menuDialog.current?.close()}>News & updates<ArrowUpRight size={16}/></Link></nav><p className="eyebrow">Your spoiler preference</p><SpoilerSwitch/><button className="btn btn-outline" onClick={openSearch}><Search size={16}/> Search all guides</button></dialog>
  <dialog ref={search} className="search-dialog" aria-labelledby="search-title" onClick={event => { if (event.target === event.currentTarget) search.current?.close(); }}><div className="dialog-heading"><h2 id="search-title">Find your next answer</h2><button className="icon-button" aria-label="Close search" onClick={() => search.current?.close()}><X size={20}/></button></div><div className="search-input-wrap"><Search size={20}/><input ref={searchInput} autoComplete="off" aria-label="Search quests, choices and fixes" placeholder="Quest, choice, error, or question…" value={query} onChange={e => setQuery(e.target.value)}/><kbd>ESC</kbd></div><div className="search-filters" aria-label="Search categories">{['All', 'Guide', 'Quest', 'Choice', 'Fix', 'Tool'].map(cat => <button className="pill" aria-pressed={category === cat} key={cat} onClick={() => setCategory(cat)}>{cat}</button>)}</div><p className="search-caption muted">{query ? `${results.length} matching answers` : 'Start here'}</p><div className="search-results">{results.map(entry => <Link href={entry.href} key={entry.href} onClick={() => search.current?.close()}><span><small className="eyebrow">{entry.category}</small>{entry.title}</span><ArrowUpRight size={17}/></Link>)}{!results.length && <div className="empty-state"><span className="eclipse-logo"/><h3>No answer yet</h3><p>Try a quest name, “stutter”, or “30 days”.</p><Link className="text-link" href="/contact/" onClick={() => search.current?.close()}>Tell us what you need →</Link></div>}</div><div className="search-footer">Spoiler-safe titles. Source-backed answers.<span>Ctrl / ⌘ K</span></div></dialog></>;
}
