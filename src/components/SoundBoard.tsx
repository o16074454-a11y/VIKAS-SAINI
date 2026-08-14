import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  Bike,
  Waves,
  Radio,
  Disc3,
  Bell,
  Moon,
  Camera,
  Keyboard,
  Volume2,
} from 'lucide-react';
import { villageSounds } from '../utils/soundEffects';

interface SoundItem {
  key: string;
  name: string;
  hindiName: string;
  icon: React.ReactNode;
  action: () => void;
  color: string;
  description: string;
}

export const SoundBoard: React.FC = () => {
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const triggerSound = (key: string, action: () => void) => {
    setActiveKey(key);
    action();
    setTimeout(() => setActiveKey(null), 400);
  };

  const sounds: SoundItem[] = [
    {
      key: 'B',
      name: 'Bicycle Bell',
      hindiName: 'हीरो साइकिल घंटी',
      icon: <Bike className="w-5 h-5 text-[#d4a359]" />,
      action: () => villageSounds.playCycleBell(),
      color: 'from-[#25281a]/90 to-[#161810]/90 border-[#d4a359]/30',
      description: 'ट्रिंग-ट्रिंग! पगडंडी खाली करो!',
    },
    {
      key: 'T',
      name: 'Tube-well Stream',
      hindiName: 'ट्यूबवेल की धार',
      icon: <Waves className="w-5 h-5 text-emerald-400" />,
      action: () => villageSounds.playTubewellSplash(),
      color: 'from-[#182717]/90 to-[#10190f]/90 border-emerald-500/35',
      description: 'ठंडा-ठंडा मीठा पानी',
    },
    {
      key: 'R',
      name: 'Radio Static',
      hindiName: '90s रेडियो ट्यूनिंग',
      icon: <Radio className="w-5 h-5 text-[#e5ad5b]" />,
      action: () => villageSounds.playRadioTuning(),
      color: 'from-[#2a2214]/90 to-[#18140c]/90 border-[#d4a359]/35',
      description: 'हवामहल व विविध भारती',
    },
    {
      key: 'C',
      name: 'Cassette Click',
      hindiName: 'कैसेट डेक क्लिक',
      icon: <Disc3 className="w-5 h-5 text-[#ebd095]" />,
      action: () => villageSounds.playCassetteClick(),
      color: 'from-[#242618]/90 to-[#14160d]/90 border-[#d4a359]/30',
      description: 'टी-सीरीज़ का असली फीता',
    },
    {
      key: 'M',
      name: 'Temple Bell',
      hindiName: 'मंदिर की पावन घंटी',
      icon: <Bell className="w-5 h-5 text-[#f4ebcf]" />,
      action: () => villageSounds.playTempleBell(),
      color: 'from-[#2b1f14]/90 to-[#19110a]/90 border-[#d4a359]/35',
      description: 'आरती व शंख ध्वनि',
    },
    {
      key: 'S',
      name: 'Camera Shutter',
      hindiName: 'यादों का फोटो क्लिक',
      icon: <Camera className="w-5 h-5 text-[#a3b8d4]" />,
      action: () => villageSounds.playCameraShutter(),
      color: 'from-[#171f2b]/90 to-[#0e131b]/90 border-indigo-400/35',
      description: 'तस्वीरों में कैद सुनहरे पल',
    },
  ];

  // Listen to keyboard shortcuts globally
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      const keyUpper = e.key.toUpperCase();
      const matched = sounds.find((s) => s.key === keyUpper);
      if (matched) {
        triggerSound(matched.key, matched.action);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section className="w-full max-w-4xl mx-auto my-10 px-4">
      <div className="relative bg-gradient-to-b from-[#181a12]/95 to-[#10120b]/95 backdrop-blur-xl border border-[#e0d5b1]/15 rounded-3xl p-6 sm:p-8 shadow-2xl">
        
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[#e0d5b1]/15">
          <div>
            <div className="flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-[#d4a359] animate-pulse" />
              <h3 className="text-xl sm:text-2xl font-bold font-rozha text-[#f4ebcf]">
                गाँव का देसी साउंडबोर्ड (Interactive Village Sounds)
              </h3>
            </div>
            <p className="text-xs text-[#c4b996] font-editorial italic mt-0.5">
              बटन दबाएं या कीबोर्ड की शॉर्टकट कीज दबाकर असली गाँव की आवाजें महसूस करें।
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-[#12130d] border border-[#e0d5b1]/15 rounded-xl text-xs text-[#d4a359] font-mono">
            <Keyboard className="w-3.5 h-3.5" />
            <span>Keyboard Active [B, T, R, C, M, S]</span>
          </div>
        </div>

        {/* Sound Buttons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 mt-6">
          {sounds.map((s) => {
            const isCurrent = activeKey === s.key;
            return (
              <motion.button
                key={s.key}
                onClick={() => triggerSound(s.key, s.action)}
                whileTap={{ scale: 0.95 }}
                className={`relative flex flex-col items-start p-4 rounded-2xl border text-left transition-all bg-gradient-to-br ${
                  s.color
                } ${
                  isCurrent
                    ? 'ring-2 ring-[#d4a359] scale-[1.03] shadow-[0_0_20px_rgba(212,163,89,0.5)]'
                    : 'hover:border-[#d4a359]/60 hover:bg-opacity-90'
                }`}
              >
                {/* Key Badge */}
                <div className="w-full flex items-center justify-between mb-2">
                  <div className="p-2 rounded-xl bg-[#0c0d08] border border-[#e0d5b1]/15">
                    {s.icon}
                  </div>
                  <span className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#14160e] border border-[#d4a359]/50 text-[#f4ebcf] font-mono font-bold text-xs shadow-inner">
                    {s.key}
                  </span>
                </div>

                <div className="font-bold text-sm font-editorial text-[#f4ebcf]">
                  {s.hindiName}
                </div>
                <div className="text-[11px] text-[#c4b996] font-editorial italic mt-0.5">
                  {s.description}
                </div>

                {isCurrent && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 1 }}
                    animate={{ scale: 1.4, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 rounded-2xl border-2 border-[#d4a359] pointer-events-none"
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
