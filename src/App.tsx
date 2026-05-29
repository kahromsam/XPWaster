import { useState } from 'react';
import { SKILLS } from './data/skills';
import { useSkills } from './hooks/useSkills';
import { SkillCard } from './components/SkillCard';
import { SkillModal } from './components/SkillModal';
import { LevelUpToast } from './components/LevelUpToast';

export default function App() {
  const { skills, totalLevel, addMinutes, levelUpEvent, clearLevelUpEvent } = useSkills();
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  return (
    <div className="app">
      <header className="header">
        <h1 className="app-title">XP WASTER</h1>
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

      <footer className="total-level-bar">
        Total level:&nbsp;
        <span className="total-level-num">{totalLevel}</span>
        <span className="total-level-max"> / {SKILLS.length * 99}</span>
      </footer>

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
