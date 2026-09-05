'use client';

import Link from 'next/link';
import type { Missable } from '@/content/types';
import { usePreferences } from '@/components/site/Preferences';
import { useStoredState } from '@/components/site/Storage';
import { track } from '@/lib/events';
import './tools.css';

export function Checklist({ items }: { items: Missable[] }) {
  const { spoiler, setSpoiler } = usePreferences();
  const [checked, setChecked, ready] = useStoredState<string[]>('dw-missable', [], (x): x is string[] => Array.isArray(x) && x.every(id => typeof id === 'string'));
  const done = items.filter(item => checked.includes(item.id)).length;
  const groups = [...new Set(items.map(item => item.group))];
  return <div className="checklist"><div className="checklist-overview card"><div className="check-progress" style={{ background: `conic-gradient(var(--gold) ${items.length ? done / items.length * 100 : 0}%, var(--border) 0)` }}><span>{done}<small>/ {items.length}</small></span></div><div><div className="eyebrow">Your field notes</div><h2>Checked {done} / {items.length}</h2><p className="muted tool-small">Local to this browser; storage must be enabled to retain progress. A check records your progress; it does not verify a claim.</p></div><label className="tool-field"><span>Spoiler level</span><select className="input" value={spoiler} onChange={e => setSpoiler(e.target.value as typeof spoiler)}><option value="none">○ No spoilers</option><option value="light">◐ Light spoilers</option><option value="full">● Full spoilers</option></select></label></div>
    {!items.length && <p className="unknown">No verified checklist entries are available yet. New entries will be added when their conditions can be sourced.</p>}
    {groups.map(group => { const members = items.filter(item => item.group === group); return <section key={group} className="checklist-group card"><div className="tool-toolbar"><h2>{group}</h2><span className="muted tool-small">{members.filter(item => checked.includes(item.id)).length} / {members.length}</span></div>{members.map(item => <div className={`checklist-item ${checked.includes(item.id) ? 'is-checked' : ''}`} key={item.id}><input type="checkbox" id={`check-${item.id}`} disabled={!ready} checked={checked.includes(item.id)} onChange={() => { setChecked(previous => previous.includes(item.id) ? previous.filter(id => id !== item.id) : [...previous, item.id]); track('missable_check', { item: item.id }); }} /><div><label htmlFor={`check-${item.id}`}><strong>{item.name}</strong></label><span className="tool-status">{item.type} · {item.verificationStatus === 'community-report' ? 'Reported' : item.verificationStatus.replaceAll('-', ' ')}</span><p className="muted">{spoiler === 'full' ? item.fullCondition : spoiler === 'light' ? item.lightCondition : item.condition}</p><Link className="checklist-link" href={item.href}>Read the context <span aria-hidden="true">↗</span></Link></div></div>)}</section>; })}
  </div>;
}
