export interface Skill {
  id: string;
  name: string;
  icon: string;       // emoji fallback
  iconImg?: string;   // pixel art PNG in public/icons/
  color: string;
}

export const SKILLS: Skill[] = [
  { id: 'sali',       name: 'Sali',       icon: '🏋️', iconImg: '/icons/gym.png',        color: '#ef5350' },
  { id: 'kiipeily',   name: 'Kiipeily',   icon: '🧗', iconImg: '/icons/climbing.png',   color: '#ffa726' },
  { id: 'meditointi', name: 'Meditointi', icon: '🧠', iconImg: '/icons/meditating.png', color: '#66bb6a' },
  { id: 'lukeminen',  name: 'Lukeminen',  icon: '📚', iconImg: '/icons/reading.png',    color: '#c8a860' },
  { id: 'kokkaus',    name: 'Kokkaus',    icon: '🍳', iconImg: '/icons/cooking.png',    color: '#ff7043' },
  { id: 'musiikki',   name: 'Musiikki',   icon: '🎹', iconImg: '/icons/music.png',      color: '#9c8adc' },
];
