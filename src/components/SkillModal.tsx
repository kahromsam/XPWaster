import React, { useState, useCallback, useEffect } from 'react';
import { SKILLS } from '../data/skills';
import { formatMinutes } from '../utils/osrs';

interface SkillModalProps {
  skillId: string;
  onClose: () => void;
  onLog: (skillId: string, minutes: number) => void;
}

export function SkillModal({ skillId, onClose, onLog }: SkillModalProps) {
  const skill = SKILLS.find(s => s.id === skillId)!;
  const [minutes, setMinutes] = useState(45);

  const sliderPercent = ((minutes - 5) / (180 - 5)) * 100;

  const handleLog = useCallback(() => {
    onLog(skillId, minutes);
    onClose();
  }, [skillId, minutes, onLog, onClose]);

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  }, [onClose]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content" role="dialog" aria-modal="true">
        <div className="modal-header">
          {skill.iconImg ? (
            <img src={skill.iconImg} alt={skill.name} className="modal-icon-img" draggable={false} />
          ) : (
            <span className="modal-icon">{skill.icon}</span>
          )}
          <span className="modal-title">{skill.name}</span>
          <button className="modal-close" onClick={onClose} aria-label="Sulje">✕</button>
        </div>

        <div className="modal-body">
          <div className="time-display">{formatMinutes(minutes)}</div>

          <input
            type="range"
            className="time-slider"
            min={5}
            max={180}
            step={5}
            value={minutes}
            onChange={e => setMinutes(Number(e.target.value))}
            style={{
              '--slider-color': skill.color,
              background: `linear-gradient(to right, ${skill.color} ${sliderPercent}%, #1a1208 ${sliderPercent}%)`,
            } as React.CSSProperties}
            aria-label="Aika minuuteissa"
          />

          <div className="slider-labels">
            <span>5 min</span>
            <span>1h 30min</span>
            <span>3h</span>
          </div>

          <div className="xp-preview" style={{ color: skill.color }}>
            +{minutes} min
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Peruuta</button>
          <button className="btn-log" onClick={handleLog} style={{ backgroundColor: skill.color }}>
            Kirjaa
          </button>
        </div>
      </div>
    </div>
  );
}
