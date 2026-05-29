import { useEffect } from 'react';
import { SKILLS } from '../data/skills';
import type { LevelUpEvent } from '../hooks/useSkills';

interface LevelUpToastProps {
  event: LevelUpEvent;
  onDismiss: () => void;
}

export function LevelUpToast({ event, onDismiss }: LevelUpToastProps) {
  const skill = SKILLS.find(s => s.id === event.skillId);

  useEffect(() => {
    const t = setTimeout(onDismiss, 3500);
    return () => clearTimeout(t);
  }, [onDismiss]);

  return (
    <div className="levelup-toast" onClick={onDismiss}>
      <span className="levelup-icon">{skill?.icon}</span>
      <div>
        <div className="levelup-title">TASO NOUSU!</div>
        <div className="levelup-detail">{event.skillName} → Taso {event.newLevel}</div>
      </div>
    </div>
  );
}
