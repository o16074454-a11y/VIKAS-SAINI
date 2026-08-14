import React from 'react';
import { Sun, CloudSun, Sunset, Moon } from 'lucide-react';
import { TimeMood } from '../types';
import { villageSounds } from '../utils/soundEffects';

interface TimeMoodSelectorProps {
  currentMood: TimeMood;
  onSelectMood: (mood: TimeMood) => void;
}

export const TimeMoodSelector: React.FC<TimeMoodSelectorProps> = ({
  currentMood,
  onSelectMood,
}) => {
  const moods: { id: TimeMood; label: string; sub: string; icon: React.ReactNode; color: string }[] = [
    {
      id: 'morning',
      label: 'प्रभात',
      sub: 'ताजा सवेरा',
      icon: <Sun className="w-4 h-4 text-[#ebd095]" />,
      color: 'bg-[#2b2515] border-[#d4a359]/70 text-[#f4ebcf]',
    },
    {
      id: 'afternoon',
      label: 'दोपहर',
      sub: 'नीम की छांव',
      icon: <CloudSun className="w-4 h-4 text-emerald-400" />,
      color: 'bg-[#1b2b18] border-emerald-500/60 text-emerald-200',
    },
    {
      id: 'sunset',
      label: 'गोधूलि',
      sub: 'सुनहरी शाम',
      icon: <Sunset className="w-4 h-4 text-[#e5ad5b]" />,
      color: 'bg-[#2f2214] border-[#d4a359]/70 text-[#ebd095]',
    },
    {
      id: 'night',
      label: 'चांदनी रात',
      sub: 'तारों की छांव',
      icon: <Moon className="w-4 h-4 text-[#a3b8d4]" />,
      color: 'bg-[#181d2c] border-indigo-400/60 text-indigo-100',
    },
  ];

  const handleSelect = (mood: TimeMood) => {
    villageSounds.playCassetteClick();
    if (mood === 'night') {
      villageSounds.toggleAmbience(true);
    } else {
      villageSounds.toggleAmbience(false);
    }
    onSelectMood(mood);
  };

  return (
    <div className="flex items-center justify-center my-4 px-4">
      <div className="inline-flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#14160e]/90 backdrop-blur-xl border border-[#e0d5b1]/15 shadow-xl">
        <span className="hidden sm:inline-block text-[11px] font-mono text-[#9e9373] px-2.5 uppercase tracking-wider">
          समय चक्र:
        </span>
        {moods.map((m) => {
          const isSelected = currentMood === m.id;
          return (
            <button
              key={m.id}
              onClick={() => handleSelect(m.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                isSelected
                  ? `${m.color} shadow-[0_0_14px_rgba(212,163,89,0.3)] scale-[1.03]`
                  : 'text-[#c4b996] hover:text-[#f4ebcf] hover:bg-[#1f2216]'
              }`}
            >
              {m.icon}
              <span className="font-editorial text-sm">{m.label}</span>
              <span className="hidden md:inline text-[10px] opacity-75 font-normal italic font-editorial">
                ({m.sub})
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
