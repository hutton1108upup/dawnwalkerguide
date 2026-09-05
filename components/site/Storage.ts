'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

export function useStoredState<T>(key: string, initial: T, validate: (value: unknown) => value is T): [T, (value: T | ((previous: T) => T)) => void, boolean] {
  const [value, setValue] = useState<T>(initial);
  const [ready, setReady] = useState(false);
  const current = useRef(value);
  const fallback = useRef(initial);
  const validator = useRef(validate);
  validator.current = validate;
  useEffect(() => {
    function restore() {
      try {
        const raw = localStorage.getItem(key);
        if (raw === null) { current.current = fallback.current; setValue(fallback.current); }
        else { const parsed: unknown = JSON.parse(raw); if (validator.current(parsed)) { current.current = parsed; setValue(parsed); } }
      } catch { /* Storage is optional: tools remain usable in memory. */ }
      setReady(true);
    }
    restore();
    const sync = (event: Event) => { if (!(event instanceof StorageEvent) || event.key === key || event.key === null) restore(); };
    window.addEventListener('storage', sync);
    window.addEventListener('dw-storage', sync);
    return () => { window.removeEventListener('storage', sync); window.removeEventListener('dw-storage', sync); };
  }, [key]);
  const update = useCallback((next: T | ((previous: T) => T)) => {
    const resolved = typeof next === 'function' ? (next as (previous: T) => T)(current.current) : next;
    current.current = resolved;
    setValue(resolved);
    try { localStorage.setItem(key, JSON.stringify(resolved)); window.dispatchEvent(new Event('dw-storage')); } catch { /* Private mode/quota fallback. */ }
  }, [key]);
  return [value, update, ready];
}
