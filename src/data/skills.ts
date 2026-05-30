export interface Skill {
  id: string;
  name: string;
  icon: string;       // emoji fallback
  iconImg?: string;   // pixel art PNG in public/icons/
  color: string;
}

const b = import.meta.env.BASE_URL;

export const SKILLS: Skill[] = [
  { id: 'sali',       name: 'Sali',       icon: '🏋️', iconImg: `${b}icons/gym.png`,        color: '#ef5350' },
  { id: 'kiipeily',   name: 'Kiipeily',   icon: '🧗', iconImg: `${b}icons/climbing.png`,   color: '#ffa726' },
  { id: 'meditointi', name: 'Meditointi', icon: '🧠', iconImg: `${b}icons/meditating.png`, color: '#66bb6a' },
  { id: 'lukeminen',  name: 'Lukeminen',  icon: '📚', iconImg: `${b}icons/reading.png`,    color: '#c8a860' },
  { id: 'kokkaus',    name: 'Kokkaus',    icon: '🍳', iconImg: `${b}icons/cooking.png`,    color: '#ff7043' },
  { id: 'musiikki',   name: 'Musiikki',   icon: '🎹', iconImg: `${b}icons/music.png`,      color: '#9c8adc' },
  { id: 'friba',      name: 'Friba',      icon: '🥏', iconImg: `${b}icons/frisbee.png`,    color: '#4488ff' },
];
