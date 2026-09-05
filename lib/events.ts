export function track(name: string, payload: Record<string, unknown> = {}) {
  if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('dw-analytics', { detail: { name, ...payload } }));
}
