// Exact OSRS XP formula scaled so level 99 = 10 000h total
// XP(L) = floor(sum_{k=1}^{L-1} floor(k + 300 * 2^(k/7)) / 4)
// Source: https://oldschool.runescape.wiki/w/Experience

function osrsXP(level: number): number {
  if (level <= 1) return 0;
  let sum = 0;
  for (let k = 1; k < level; k++) {
    sum += Math.floor(k + 300 * Math.pow(2, k / 7));
  }
  return Math.floor(sum / 4);
}

const SCALE = 600_000 / osrsXP(99); // scale so level 99 = 10 000h = 600 000min

const MINUTES_TABLE: readonly number[] = Array.from(
  { length: 99 },
  (_, i) => Math.round(osrsXP(i + 1) * SCALE),
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
