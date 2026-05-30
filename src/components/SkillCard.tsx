import React from 'react';
import { SKILLS } from '../data/skills';
import { minuteProgress, formatMinutes } from '../utils/osrs';
import type { SkillData } from '../hooks/useSkills';

interface SkillCardProps {
  skillData: SkillData;
  onClick: () => void;
}

export function SkillCard({ skillData, onClick }: SkillCardProps) {
  const skill = SKILLS.find(s => s.id === skillData.id)!;
  const { percent, current, needed } = minuteProgress(skillData.minutes, skillData.level);
  const remaining = needed - current;
  const barColor = `hsl(${percent * 1.2}, 90%, 42%)`;

  return (
    <button
      className="skill-card"
      onClick={onClick}
      style={{ '--skill-color': skill.color } as React.CSSProperties}
    >
      <div className="skill-card-main">
        <div className="skill-card-icon">
          {skill.iconImg ? (
            <img src={skill.iconImg} alt={skill.name} className="skill-icon-img" draggable={false} />
          ) : (
            <span className="skill-icon-emoji">{skill.icon}</span>
          )}
        </div>
        <div className="skill-card-info">
          <span className="skill-level-num">
            {skillData.level}<span className="skill-level-slash">/</span><span className="skill-level-max">99</span>
          </span>
          {skillData.level < 99 && (
            <span className="skill-time-left">{formatMinutes(remaining)}</span>
          )}
        </div>
      </div>
      <div className="skill-xp-strip">
        <div className="skill-xp-fill" style={{ width: `${percent}%`, backgroundColor: barColor }} />
      </div>
    </button>
  );
}
