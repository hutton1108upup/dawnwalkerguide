'use client';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { SpoilerLevel } from '@/content/types';
import { track } from '@/lib/events';

type Theme = 'night' | 'day';
type Preferences = { theme: Theme; setTheme: (theme: Theme) => void; spoiler: SpoilerLevel; setSpoiler: (level: SpoilerLevel) => void };
const Context = createContext<Preferences | null>(null);
export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [theme, updateTheme] = useState<Theme>('night');
  const [spoiler, updateSpoiler] = useState<SpoilerLevel>('none');
  useEffect(() => {
    const restore = () => {
      try {
        const t = localStorage.getItem('dw-theme');
        const s = localStorage.getItem('dw-spoiler');
        const nextTheme = t === 'day' ? 'day' : 'night';
        const nextSpoiler = s === 'light' || s === 'full' ? s : 'none';
        updateTheme(nextTheme); document.documentElement.dataset.theme = nextTheme;
        updateSpoiler(nextSpoiler); document.documentElement.dataset.spoiler = nextSpoiler;
      } catch { /* Use accessible defaults when storage is unavailable. */ }
    };
    restore(); window.addEventListener('storage', restore);
    return () => window.removeEventListener('storage', restore);
  }, []);
  function setTheme(next: Theme) { updateTheme(next); document.documentElement.dataset.theme = next; try { localStorage.setItem('dw-theme', next); } catch {} }
  function setSpoiler(next: SpoilerLevel) { updateSpoiler(next); document.documentElement.dataset.spoiler = next; try { localStorage.setItem('dw-spoiler', next); } catch {} track('spoiler_toggle', { level: next }); }
  return <Context.Provider value={{ theme, setTheme, spoiler, setSpoiler }}>{children}</Context.Provider>;
}
export function usePreferences() { const value = useContext(Context); if (!value) throw new Error('PreferencesProvider is required'); return value; }
export function SpoilerSwitch({ compact = false }: { compact?: boolean }) {
  const { spoiler, setSpoiler } = usePreferences();
  return <div className={`spoiler-switch ${compact ? 'compact' : ''}`} role="group" aria-label="Spoiler level">{(['none', 'light', 'full'] as const).map((level, i) => <button key={level} type="button" aria-label={`${level === 'none' ? 'No' : level === 'light' ? 'Light' : 'Full'} spoilers`} aria-pressed={spoiler === level} onClick={() => setSpoiler(level)}><span aria-hidden="true">{['○', '◐', '●'][i]}</span> <span>{level === 'none' ? 'None' : level === 'light' ? 'Light' : 'Full'}</span></button>)}</div>;
}
export function SpoilerGate({ level, children }: { level: 'light' | 'full'; children: ReactNode }) {
  const { spoiler } = usePreferences();
  const [revealed, setRevealed] = useState(false);
  useEffect(() => { setRevealed(false); }, [spoiler]);
  const allowed = spoiler === 'full' || (spoiler === 'light' && level === 'light') || revealed;
  return allowed ? <div data-spoiler={level}>{children}{revealed && <button className="text-button" onClick={() => setRevealed(false)}>Hide again</button>}</div> : <button className="spoiler-gate" onClick={() => { setRevealed(true); track('choice_expand', { level }); }}><span className="eclipse-symbol" aria-hidden="true">{level === 'light' ? '◐' : '●'}</span><span>{level === 'light' ? 'Light' : 'Full'} spoiler — click to reveal<small>Only this answer will be revealed.</small></span><span aria-hidden="true">＋</span></button>;
}
