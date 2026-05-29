// Minute thresholds per level: level k→(k+1) requires k×60 minutes
// MINUTES_TABLE[i] = total minutes to reach level (i+1)
// MINUTES_TABLE[0]  = 0   (level 1)
// MINUTES_TABLE[1]  = 60  (level 2, after 1h)
// MINUTES_TABLE[98] = 291 060 (level 99, after 4851h)
// Formula: 30 × level × (level−1)

const MINUTES_TABLE: readonly number[] = Array.from(
  { length: 99 },
  (_, i) => 30 * (i + 1) * i,
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
