'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
export function Toc({ items }: { items: { id: string; title: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);
  useEffect(() => { const observer = new IntersectionObserver(entries => { const visible = entries.filter(e => e.isIntersecting).sort((a,b) => a.boundingClientRect.top - b.boundingClientRect.top); if (visible[0]) setActive(visible[0].target.id); }, { rootMargin: '-90px 0px -55% 0px' }); for (const item of items) { const el = document.getElementById(item.id); if (el) observer.observe(el); } return () => observer.disconnect(); }, [items]);
  const links = items.map(item => <a key={item.id} className={active === item.id ? 'active' : ''} href={`#${item.id}`} onClick={() => setActive(item.id)}>{item.title}</a>);
  return <aside className="toc"><p className="eyebrow">On this page</p>{links}<div className="toc-tool"><p>Make every day count.</p><Link href="/tools/30-day-planner/">Open your planner →</Link></div></aside>;
}
