// Minute thresholds per level: level k→(k+1) requires 60×2^(k-1) minutes
// MINUTES_TABLE[i] = total minutes to reach level (i+1)
// MINUTES_TABLE[0] = 0    (level 1)
// MINUTES_TABLE[1] = 60   (level 2, after 1h)
// MINUTES_TABLE[2] = 180  (level 3, after 1+2=3h)
// MINUTES_TABLE[3] = 420  (level 4, after 1+2+4=7h)
// Formula: 60 × (2^i − 1)

const MINUTES_TABLE: readonly number[] = Array.from(
  { length: 99 },
  (_, i) => 60 * (Math.pow(2, i) - 1),
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
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}min`;
}
