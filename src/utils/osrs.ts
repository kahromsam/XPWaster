// Level 1→2 = 1h, doubles every ~10 levels, level 99 total = 10 000h
// R solved numerically: sum(R^j, j=0..97) = 10 000

const R = (() => {
  let lo = 1.001, hi = 1.5;
  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2;
    if ((Math.pow(mid, 98) - 1) / (mid - 1) < 10_000) lo = mid; else hi = mid;
  }
  return (lo + hi) / 2;
})();

const MINUTES_TABLE: readonly number[] = Array.from(
  { length: 99 },
  (_, i) => i === 0 ? 0 : Math.round(60 * (Math.pow(R, i) - 1) / (R - 1)),
);

export function getLevelFromMinutes(minutes: number): number {
  let level = 1;
  for (let i = 0; i < MINUTES_TABLE.length; i++) {
    if (minutes >= MINUTES_TABLE[i]) level = i + 1;
    else break;
  }
  return level;
}

export function getMinutesForLevel(level: number): number {
  return MINUTES_TABLE[Math.max(1, Math.min(99, level)) - 1];
}

export function minuteProgress(
  minutes: number,
  level: number,
): { current: number; needed: number; percent: number } {
  if (level >= 99) return { current: 0, needed: 0, percent: 100 };
  const lo = MINUTES_TABLE[level - 1];
  const hi = MINUTES_TABLE[level];
  const current = minutes - lo;
  const needed = hi - lo;
  return { current, needed, percent: Math.min(100, (current / needed) * 100) };
}

export function formatMinutes(min: number): string {
  if (min < 60) return `${min} min`;
  if (min < 1440) {
    const h = Math.floor(min / 60);
    const m = min % 60;
    return m === 0 ? `${h}h` : `${h}h ${m}min`;
  }
  const d = Math.floor(min / 1440);
  const h = Math.floor((min % 1440) / 60);
  return h === 0 ? `${d} pv` : `${d} pv ${h}h`;
}
