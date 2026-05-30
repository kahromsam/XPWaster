import { useState } from 'react';
import { SKILLS } from './data/skills';
import { useSkills } from './hooks/useSkills';
import { minuteProgress, formatMinutes } from './utils/osrs';
import { SkillCard } from './components/SkillCard';
import { SkillModal } from './components/SkillModal';
import { LevelUpToast } from './components/LevelUpToast';

export default function App() {
  const { skills, totalLevel, addMinutes, levelUpEvent, clearLevelUpEvent, resetAll } = useSkills();
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const nearest = skills
    .filter(s => s.level < 99)
    .map(s => {
      const { current, needed } = minuteProgress(s.minutes, s.level);
      return { skillData: s, remaining: needed - current };
    })
    .sort((a, b) => a.remaining - b.remaining)[0];

  const nearestSkill = nearest ? SKILLS.find(s => s.id === nearest.skillData.id) : null;

  return (
    <div className="app">
      <header className="header">
        <h1 className="app-title">XP WASTER</h1>
        <button
          className="reset-btn"
          onClick={() => { if (window.confirm('Nollataanko kaikki edistyminen?')) resetAll(); }}
          aria-label="Reset"
        >↺</button>
      </header>

      <main className="skill-grid">
        {skills.map(skillData => (
          <SkillCard
            key={skillData.id}
            skillData={skillData}
            onClick={() => setSelectedSkill(skillData.id)}
          />
        ))}
      </main>

      {selectedSkill && (
        <SkillModal
          skillId={selectedSkill}
          onClose={() => setSelectedSkill(null)}
          onLog={addMinutes}
        />
      )}

      {levelUpEvent && (
        <LevelUpToast event={levelUpEvent} onDismiss={clearLevelUpEvent} />
      )}
    </div>
  );
}
