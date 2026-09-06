'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import type { Quest } from '@/content/types';
import { goalScore, isConfirmed, isPrologueQuest, summarizePlan, type PlanStage } from '@/lib/planner';
import { track } from '@/lib/events';
import { useStoredState } from '@/components/site/Storage';
import { usePreferences } from '@/components/site/Preferences';
import './tools.css';

type Filters = { type: string; phase: string; character: string; faction: string; reward: string; missable: boolean; verifiedOnly: boolean };
const defaults: Filters = { type: 'all', phase: 'all', character: 'all', faction: 'all', reward: 'all', missable: false, verifiedOnly: true };
const goals = ['See Most Content', 'Avoid Missables', 'Save Family First', 'Romance', 'Best Equipment', 'Main Story Focus'];
const strings = (value: unknown): value is string[] => Array.isArray(value) && value.every(x => typeof x === 'string');
function validFilters(value: unknown): value is Filters {
  if (!value || typeof value !== 'object') return false;
  const f = value as Filters;
  return ['type', 'phase', 'character', 'faction', 'reward'].every(key => typeof f[key as keyof Filters] === 'string') && typeof f.missable === 'boolean' && typeof f.verifiedOnly === 'boolean';
}
const labels: Record<string, string> = { 'verified-retail': 'Retail verified', 'official-confirmed': 'Official', 'multi-source-confirmed': 'Multi-source', 'community-report': 'Reported', 'unverified': 'Unverified' };

export function Planner({ quests, compact = false }: { quests: Quest[]; compact?: boolean }) {
  const [slugs, setSlugs, ready] = useStoredState<string[]>('dw-plan', [], strings);
  const [stage, setStage] = useStoredState<PlanStage>('dw-plan-stage', quests.some(isPrologueQuest) ? 'prologue' : 'campaign', (x): x is PlanStage => x === 'prologue' || x === 'campaign');
  const [day, setDay] = useStoredState<number>('dw-plan-day', 1, (x): x is number => typeof x === 'number' && Number.isInteger(x) && x >= 1 && x <= 30);
  const [phase, setPhase] = useStoredState<'day' | 'night'>('dw-plan-phase', 'day', (x): x is 'day' | 'night' => x === 'day' || x === 'night');
  const [used, setUsed] = useStoredState<number>('dw-plan-progress', 0, (x): x is number => typeof x === 'number' && Number.isInteger(x) && x >= 0 && x <= 7);
  const [goal, setGoal] = useStoredState<string>('dw-plan-goal', goals[0], (x): x is string => typeof x === 'string' && goals.includes(x));
  const [filters, setFilters] = useStoredState<Filters>(compact ? 'dw-plan-preview-filters' : 'dw-plan-filters', { ...defaults, verifiedOnly: !compact }, validFilters);
  const { spoiler } = usePreferences();
  const [summaryOpen, setSummaryOpen] = useState(false);
  const drawer = useRef<HTMLDialogElement>(null);
  const summary = summarizePlan(quests, slugs, day, phase, used, stage);
  const stageQuests = quests.filter(q => stage === 'prologue' ? isPrologueQuest(q) : !isPrologueQuest(q));
  const visible = stageQuests.filter(q => (!filters.verifiedOnly || isConfirmed(q)) && (filters.type === 'all' || q.type === filters.type) && (filters.phase === 'all' || q.timeOfDay === filters.phase) && (filters.character === 'all' || q.character === filters.character) && (filters.faction === 'all' || q.faction === filters.faction) && (spoiler === 'none' || filters.reward === 'all' || q.rewards.includes(filters.reward)) && (!filters.missable || q.missable === true)).sort((a, b) => goalScore(b, goal) - goalScore(a, goal));
  const goalHint = goal === 'Romance' ? (stageQuests.some(q => goalScore(q, goal) > 0) ? 'Relationship leads appear first. A relationship tag does not confirm a romance route or outcome.' : 'No romance or relationship leads are catalogued for this stage; this goal cannot change the order yet.') : goal === 'Best Equipment' && !stageQuests.some(q => q.rewards.length) ? 'No reward data is catalogued for this stage; equipment sorting has no effect yet.' : goal !== 'See Most Content' && !stageQuests.some(q => goalScore(q, goal) > 0) ? 'No matching goal data is catalogued for this stage; the order is unchanged.' : '';
  const update = <K extends keyof Filters>(key: K, value: Filters[K]) => setFilters(previous => ({ ...previous, [key]: value }));
  const toggle = (q: Quest) => {
    if (!slugs.includes(q.slug)) { if (!slugs.length) track('planner_start'); track('planner_add_quest', { quest: q.slug }); }
    setSlugs(previous => previous.includes(q.slug) ? previous.filter(slug => slug !== q.slug) : [...previous, q.slug]);
  };
  const selectFilter = (key: 'type' | 'phase' | 'character' | 'faction' | 'reward', label: string, options: string[]) => <label className="tool-field" key={key}><span>{label}</span><select className="input" value={filters[key]} onChange={e => update(key, e.target.value)}><option value="all">All {label.toLowerCase()}</option>{options.map(option => <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>)}</select></label>;
  const filterFields = <>
    {selectFilter('type', 'Types', ['main', 'side', 'activity'])}
    {selectFilter('phase', 'Phases', ['day', 'night', 'either', 'unknown'])}
    {selectFilter('character', 'Characters', [...new Set(quests.map(q => q.character))])}
    {selectFilter('faction', 'Factions', [...new Set(quests.map(q => q.faction))])}
    {spoiler === 'none' ? <p className="tool-small muted">Reward filters are available with light spoilers.</p> : selectFilter('reward', 'Rewards', [...new Set(quests.flatMap(q => q.rewards))])}
    <label className="tool-check"><input type="checkbox" checked={filters.missable} onChange={e => update('missable', e.target.checked)} />Missable only</label>
    <label className="tool-check"><input type="checkbox" checked={filters.verifiedOnly} onChange={e => update('verifiedOnly', e.target.checked)} />Verified only</label>
    <button className="btn btn-outline" onClick={() => setFilters(defaults)}>Reset filters</button>
  </>;
  const summaryContent = <>
    <div className="eyebrow">Your plan · {stage === 'prologue' ? 'Prologue' : `Day ${day} of 30`}</div>
    <div className="plan-numbers"><div><strong>{summary.selected.length}</strong><span>Selected</span></div><div><strong>{summary.knownSegments}</strong><span>Known segments</span></div><div><strong>{stage === 'prologue' || summary.unknownCosts ? '—' : summary.remainingSegments}</strong><span>{stage === 'prologue' ? 'Campaign not started' : summary.unknownCosts ? 'Balance unknown' : 'Segment balance*'}</span></div></div>
    {summary.elapsedSegments !== null && <div className="sunbar" role="progressbar" aria-label="Current timeline progress" aria-valuemin={0} aria-valuemax={480} aria-valuenow={summary.elapsedSegments}><span style={{ width: `${summary.elapsedSegments / 480 * 100}%` }} /></div>}
    <p className="tool-small muted">{stage === 'prologue' ? 'No campaign days deducted. These opening quests have their own event deadlines; this tool does not assume a total prologue time budget.' : 'Day + night = 16 segments. *Balance subtracts known selected costs only; travel, waiting and quest deadlines are not modeled.'}</p>
    {summary.excludedCount > 0 && <p className="unknown">{summary.excludedCount} saved {stage === 'prologue' ? 'later-game' : 'prologue'} {summary.excludedCount === 1 ? 'selection is' : 'selections are'} excluded from this stage. Switch progress to review them. Availability across stages is not fully mapped.</p>}
    {summary.unknownCosts > 0 && <p className="unknown">{summary.unknownCosts} selected {summary.unknownCosts === 1 ? 'quest has an' : 'quests have'} unknown time cost. {stage === 'prologue' ? 'The segment total above is incomplete.' : `${summary.remainingSegments} segments before unknown costs, not a usable-time guarantee.`}</p>}
    {summary.unconfirmed > 0 && <p className="unknown">{summary.unconfirmed} selected {summary.unconfirmed === 1 ? 'quest is' : 'quests are'} based on reporting. Costs and conditions need independent confirmation.</p>}
    {summary.remainingSegments !== null && summary.remainingSegments < 0 && <p className="warning">Known costs exceed the timeline by {Math.abs(summary.remainingSegments)} segments.</p>}
    {summary.conflicts.length > 0 && <div className="warning"><strong>Potential route conflicts</strong>{summary.conflicts.map(pair => <p key={pair}>{pair}</p>)}</div>}
    {summary.selected.length ? <ul className="plan-selected">{summary.selected.map(q => <li key={q.slug}><span>{q.name}<small>{q.timeCost === null ? 'Time cost unknown' : `${q.timeCost} segments`}</small></span><button className="tool-remove" onClick={() => toggle(q)} aria-label={`Remove ${q.name} from plan`}>×</button></li>)}</ul> : <div className="plan-empty"><span aria-hidden="true">◯</span><p>Add quests to begin your {stage === 'prologue' ? 'prologue plan' : '30 days'}.</p></div>}
    {summary.selected.some(q => q.missable || q.deadline || q.prerequisites.length || q.lockouts.length) && <p className="warning">Check quest prerequisites and deadlines before committing. A selected list is not a verified execution order.</p>}
    {compact ? <Link className="btn btn-primary plan-cta" href="/tools/30-day-planner/">Open Full Planner <span aria-hidden="true">↗</span></Link> : <p className="tool-small muted">Goal: {goal}. Suggestions affect table order only; they do not guarantee an outcome.</p>}
    <p className="tool-small muted">{spoiler === 'none' ? '○ No' : spoiler === 'light' ? '◐ Light' : '● Full'} spoilers · Local to this browser; storage must be enabled to retain progress.</p>
  </>;
  return <div className={`planner ${compact ? 'planner-compact' : 'planner-full'}`}>
    <div className="planner-stage-bar"><label className="tool-field"><span>Current progress</span><select className="input" value={stage} onChange={e => setStage(e.target.value as PlanStage)}><option value="prologue">Prologue</option><option value="campaign">30-day campaign</option></select></label><p className="tool-small muted">{stage === 'prologue' ? 'Opening quest costs from playthrough reports. No campaign days deducted.' : 'Only later-game records are shown. Saved prologue selections do not reduce this campaign estimate.'}</p></div>
    {!compact && stage === 'prologue' && <div className="goal-chips prologue-goals" role="group" aria-label="Planning goal">{goals.map(g => <button className={`pill ${goal === g ? 'is-active' : ''}`} aria-pressed={goal === g} key={g} onClick={() => setGoal(g)}>{g}</button>)}</div>}
    {!compact && stage === 'campaign' && <div className="planner-controls card"><div className="planner-position"><label className="tool-field"><span>Current day</span><input className="input" aria-label="Current day" type="number" min={1} max={30} value={day} onChange={e => { const n = Number(e.target.value); if (Number.isInteger(n) && n >= 1 && n <= 30) setDay(n); }} /></label><label className="tool-field"><span>Current phase</span><select className="input" value={phase} onChange={e => setPhase(e.target.value as 'day' | 'night')}><option value="day">☀ Day</option><option value="night">☾ Night</option></select></label><label className="tool-field"><span>Segments used this phase</span><select className="input" value={used} onChange={e => setUsed(Number(e.target.value))}>{Array.from({ length: 8 }, (_, n) => <option key={n} value={n}>{n} of 8</option>)}</select></label></div><div className="goal-chips" role="group" aria-label="Planning goal">{goals.map(g => <button className={`pill ${goal === g ? 'is-active' : ''}`} aria-pressed={goal === g} key={g} onClick={() => setGoal(g)}>{g}</button>)}</div></div>}
    {goalHint && <p className="unknown planner-goal-hint" role="status">{goalHint}</p>}
    <div className="planner-layout">
      {!compact && <aside className="planner-filters card" aria-label="Quest filters"><div className="eyebrow">Refine your route</div>{filterFields}</aside>}
      <div className="planner-table-panel card">
        <div className="tool-toolbar"><span className="tool-small muted">{visible.length} of {stageQuests.length} {stage === 'prologue' ? 'prologue' : 'campaign'} quests</span><button className={`btn btn-outline filter-trigger ${compact ? 'compact-filter' : ''}`} onClick={() => drawer.current?.showModal()}>Filters</button><label className="tool-check"><input type="checkbox" checked={filters.verifiedOnly} onChange={e => update('verifiedOnly', e.target.checked)} />Verified only</label></div>
        <p className="tool-small muted planner-reward-note">{spoiler === 'none' ? 'Rewards are hidden. Enable light spoilers to view reward details.' : 'Reward details are shown where reported; missing rewards remain unknown.'}</p><div className="table-wrap quest-table-wrap"><table className="quest-table"><thead><tr><th>Quest</th><th>Time</th><th>Phase</th><th className="quest-extra">Missable</th><th className="quest-extra">Reward</th><th className="quest-extra">Status</th><th><span className="sr-only">Add to plan</span></th></tr></thead><tbody>{visible.map(q => <tr key={q.slug} className={q.timeOfDay === 'night' ? 'night-row' : ''}><td><Link className="quest-name" href={`/guides/quests/${q.slug}/`}>{q.name}</Link><span className="quest-sub">{q.type} · {q.location}</span><details className="quest-mobile-details"><summary>Details</summary><p>{q.spoilerSafeSummary}</p><p>Missable: {q.missable === null ? 'Unknown' : q.missable ? 'Yes' : 'No'} · {labels[q.verificationStatus]}</p><p>Reward: {spoiler === 'none' ? 'Hidden' : q.rewards.join(', ') || 'Unknown'}</p></details></td><td className="time-value">{q.timeCost === null ? <span title="Time cost not verified">—</span> : <>{q.timeCost}<small>seg.</small></>}</td><td><span className={`phase-tag phase-${q.timeOfDay}`}>{q.timeOfDay === 'day' ? '☀ Day' : q.timeOfDay === 'night' ? '☾ Night' : q.timeOfDay === 'either' ? 'Either' : '—'}</span></td><td className="quest-extra">{q.missable === null ? '—' : q.missable ? <span className="missable-tag">Yes</span> : 'No'}</td><td className="quest-extra muted">{spoiler === 'none' ? <span aria-label="Rewards hidden by spoiler preference">○ Hidden</span> : q.rewards.join(', ') || '—'}</td><td className="quest-extra"><span className={`tool-status ${isConfirmed(q) ? 'confirmed' : ''}`}>{labels[q.verificationStatus]}</span></td><td><button disabled={!ready} className={`quest-add ${slugs.includes(q.slug) ? 'is-added' : ''}`} onClick={() => toggle(q)} aria-label={`${slugs.includes(q.slug) ? 'Remove' : 'Add'} ${q.name} ${slugs.includes(q.slug) ? 'from' : 'to'} plan`} aria-pressed={slugs.includes(q.slug)}>{slugs.includes(q.slug) ? '−' : '+'}<span className="quest-add-label">{slugs.includes(q.slug) ? 'Remove' : 'Add'}</span></button></td></tr>)}</tbody></table></div>
        {!visible.length && <div className="tool-empty"><span className="tool-empty-icon" aria-hidden="true">◯</span><h3>{filters.verifiedOnly ? 'Evidence before assumptions.' : 'No quests match these filters.'}</h3><p>{filters.verifiedOnly ? 'No quests match the confirmed-evidence filter yet. Browse reported quests to start a provisional plan; unknown values stay unknown.' : 'Try a different phase or clear your filters to see the available quests.'}</p><button className="btn btn-outline" onClick={() => setFilters({ ...defaults, verifiedOnly: false })}>Show reported quests</button></div>}
        <p className="tool-table-note muted">— = not yet verified. Playthrough reports, not independent retail verification. Some prologue quests may also be available later; stage coverage is incomplete.</p>
      </div>
      <aside className="plan-sidebar card" aria-label="Your plan" aria-live="polite">{summaryContent}</aside>
    </div>
    <dialog className="filter-dialog" ref={drawer} onClick={e => { if (e.target === e.currentTarget) drawer.current?.close(); }}><div className="filter-dialog-content"><div className="tool-toolbar"><h2>Quest filters</h2><button className="btn btn-outline" onClick={() => drawer.current?.close()} aria-label="Close quest filters">Close ×</button></div>{filterFields}<button className="btn btn-primary" onClick={() => drawer.current?.close()}>Show {visible.length} quests</button></div></dialog>
    {!compact && <div className={`mobile-plan ${summaryOpen ? 'is-open' : ''}`}><button className="mobile-plan-toggle" onClick={() => setSummaryOpen(!summaryOpen)} aria-expanded={summaryOpen}>Plan: {summary.selected.length} quests · {stage === 'prologue' ? `${summary.knownSegments} known segments` : summary.unknownCosts ? 'time unknown' : `${summary.remainingSegments} segments*`} <span>{summary.conflicts.length ? `⚠ ${summary.conflicts.length} ` : ''}{summaryOpen ? 'Close ↓' : 'View ↑'}</span></button>{summaryOpen && <div className="mobile-plan-content">{summaryContent}</div>}</div>}
  </div>;
}
