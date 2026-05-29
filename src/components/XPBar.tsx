import { minuteProgress, formatMinutes } from '../utils/osrs';

interface XPBarProps {
  minutes: number;
  level: number;
  color: string;
}

export function XPBar({ minutes, level, color }: XPBarProps) {
  const { current, needed, percent } = minuteProgress(minutes, level);

  return (
    <div className="xp-bar-container">
      <div className="xp-bar-track">
        <div className="xp-bar-fill" style={{ width: `${percent}%`, backgroundColor: color }} />
      </div>
      <div className="xp-bar-label">
        {level >= 99 ? 'MAX' : `${formatMinutes(current)} / ${formatMinutes(needed)}`}
      </div>
    </div>
  );
}
