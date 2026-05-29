const KEY = 'xpwaste_v3'; // v3: clean start, minutes-only formula

export interface StoredState {
  skills: Record<string, number>; // skillId → total minutes
}

export function loadState(): StoredState {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as StoredState;
  } catch { /* ignore */ }
  return { skills: {} };
}

export function saveState(state: StoredState): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch { /* ignore */ }
}
