import { useState, useCallback, useEffect } from 'react';
import { SKILLS } from '../data/skills';
import { getLevelFromMinutes } from '../utils/osrs';
import { loadState, saveState } from '../utils/storage';

export interface SkillData {
  id: string;
  minutes: number;
  level: number;
}

export interface LevelUpEvent {
  skillId: string;
  skillName: string;
  newLevel: number;
}

export function useSkills() {
  const [minuteMap, setMinuteMap] = useState<Record<string, number>>(() => {
    const stored = loadState();
    const map: Record<string, number> = {};
    for (const skill of SKILLS) {
      map[skill.id] = stored.skills[skill.id] ?? 0;
    }
    return map;
  });

  const [levelUpEvent, setLevelUpEvent] = useState<LevelUpEvent | null>(null);

  useEffect(() => {
    saveState({ skills: minuteMap });
  }, [minuteMap]);

  const addMinutes = useCallback((skillId: string, minutes: number) => {
    setMinuteMap(prev => {
      const oldMin = prev[skillId] ?? 0;
      const newMin = oldMin + minutes;
      const oldLevel = getLevelFromMinutes(oldMin);
      const newLevel = getLevelFromMinutes(newMin);

      if (newLevel > oldLevel) {
        const skill = SKILLS.find(s => s.id === skillId);
        setLevelUpEvent({ skillId, skillName: skill?.name ?? skillId, newLevel });
      }

      return { ...prev, [skillId]: newMin };
    });
  }, []);

  const clearLevelUpEvent = useCallback(() => setLevelUpEvent(null), []);

  const resetAll = useCallback(() => {
    const empty: Record<string, number> = {};
    for (const skill of SKILLS) empty[skill.id] = 0;
    setMinuteMap(empty);
  }, []);

  const skills: SkillData[] = SKILLS.map(skill => ({
    id: skill.id,
    minutes: minuteMap[skill.id] ?? 0,
    level: getLevelFromMinutes(minuteMap[skill.id] ?? 0),
  }));

  const totalLevel = skills.reduce((sum, s) => sum + s.level, 0);

  return { skills, totalLevel, addMinutes, levelUpEvent, clearLevelUpEvent, resetAll };
}
