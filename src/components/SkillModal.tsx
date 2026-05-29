import React, { useState, useCallback, useEffect } from 'react';
import { SKILLS } from '../data/skills';
import { formatMinutes } from '../utils/osrs';

interface SkillModalProps {
  skillId: string;
  onClose: () => void;
  onLog: (skillId: string, minutes: number) => void;
}

const STEPS = 1000;
const LOG_MIN = Math.log(1);
const LOG_MAX = Math.log(1440);

function posToMinutes(pos: number): number {
  const raw = Math.exp(LOG_MIN + (pos / STEPS) * (LOG_MAX - LOG_MIN));
  if (raw < 10)  return Math.round(raw);
  if (raw < 60)  return Math.round(raw / 5) * 5;
  if (raw < 240) return Math.round(raw / 15) * 15;
  return Math.round(raw / 30) * 30;
}

function minutesToPos(min: number): number {
  return Math.round(((Math.log(min) - LOG_MIN) / (LOG_MAX - LOG_MIN)) * STEPS);
}

export function SkillModal({ skillId, onClose, onLog }: SkillModalProps) {
  const skill = SKILLS.find(s => s.id === skillId)!;
  const [minutes, setMinutes] = useState(60);
  const [hoursInput, setHoursInput] = useState('1');

  const sliderPos = minutesToPos(minutes);
  const sliderPercent = (sliderPos / STEPS) * 100;

  const handleSlider = (pos: number) => {
    const m = posToMinutes(pos);
    setMinutes(m);
    setHoursInput((m / 60 % 1 === 0) ? String(m / 60) : (m / 60).toFixed(2));
  };

  const handleHoursInput = (val: string) => {
    setHoursInput(val);
    const h = parseFloat(val.replace(',', '.'));
    if (!isNaN(h) && h > 0) setMinutes(Math.round(h * 60));
  };

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
            min={0}
            max={STEPS}
            step={1}
            value={sliderPos}
            onChange={e => handleSlider(Number(e.target.value))}
            style={{
              '--slider-color': skill.color,
              background: `linear-gradient(to right, ${skill.color} ${sliderPercent}%, #1a1208 ${sliderPercent}%)`,
            } as React.CSSProperties}
            aria-label="Aika minuuteissa"
          />

          <div className="slider-labels">
            <span>1 min</span>
            <span>2h 30min</span>
            <span>24h</span>
          </div>

          <div className="xp-preview" style={{ color: skill.color }}>
            +{formatMinutes(minutes)}
          </div>

          <div className="hours-input-row">
            <label className="hours-input-label">Syötä tunteja:</label>
            <input
              type="number"
              className="hours-input"
              value={hoursInput}
              min={0.1}
              step={0.5}
              onChange={e => handleHoursInput(e.target.value)}
            />
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
