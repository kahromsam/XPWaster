const KEY = 'xpwaste_v8'; // v8: exact OSRS XP formula scaled to 10 000h at level 99 // v6: doubles every 7 levels, 10 000h to level 99

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
