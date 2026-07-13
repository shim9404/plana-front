import { Tent, PawPrint, Baby, Heart, Sparkles } from 'lucide-react';

export const KEYWORD_OPTIONS = [
  { id: 'KW1', name: '반려동물 동반', icon: PawPrint, iconColor: '#4b5563' },
  { id: 'KW2', name: '영유아 동반', icon: Baby, iconColor: '#ca8a04' },
  { id: 'KW3', name: '고령자 동반', icon: Heart, iconColor: '#dc2626' },
  { id: 'KW4', name: '캠핑', icon: Tent, iconColor: '#ea580c' },
  { id: 'KW5', name: '힐링', icon: Sparkles, iconColor: '#10b981' },
];

export const KEYWORD_ICONS = {
  KW1: PawPrint,
  KW2: Baby,
  KW3: Heart,
  KW4: Tent,
  KW5: Sparkles,
};