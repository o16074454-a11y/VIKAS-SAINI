import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Waves,
  Bike,
  Radio,
  Trees,
  Sparkles,
  Bell,
  Volume2,
  BookOpen,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { VILLAGE_MEMORIES } from '../data/villageContent';
import { VillageMemory } from '../types';
import { villageSounds } from '../utils/soundEffects';

export const VillageMemories: React.FC = () => {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const getMemoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Waves':
        return <Waves className="w-5 h-5 text-emerald-400" />;
      case 'Bike':
        return <Bike className="w-5 h-5 text-amber-400" />;
      case 'Radio':
        return <Radio className="w-5 h-5 text-orange-400" />;
      case 'Trees':
        return <Trees className="w-5 h-5 text-emerald-500" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-yellow-400" />;
      case 'Bell':
        return <Bell className="w-5 h-5 text-amber-300" />;
      default:
        return <Sparkles className="w-5 h-5 text-amber-400" />;
    }
  };

  const handlePlaySound = (e: React.MouseEvent, key: VillageMemory['audioKey']) => {
    e.stopPropagation();
    switch (key) {
      case 'bell':
        villageSounds.playCycleBell();
        break;
      case 'tubewell':
        villageSounds.playTubewellSplash();
        break;
      case 'radio':
        villageSounds.playRadioTuning();
        break;
      case 'cricket':
        villageSounds.toggleAmbience(true);
        break;
      case 'temple':
        villageSounds.playTempleBell();
        break;
      case 'cassette':
        villageSounds.playCassetteClick();
        break;
    }
  };

  const toggleExpand = (id: string) => {
    villageSounds.playCassetteClick();
    setActiveCard(activeCard === id ? null : id);
  };

  return (
    <section className="w-full max-w-5xl mx-auto my-12 px-4">
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c1f14] border border-[#d4a359]/35 text-[#d4a359] text-xs font-mono mb-2">
          <span>🌾 देसी जीवन के रंग • ESSAYS & MEMORIES</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-rozha text-[#f4ebcf] tracking-wide">
          गांव की सुनहरी यादें और किस्से
        </h2>
        <p className="text-sm sm:text-base text-[#c4b996] font-editorial italic mt-1 max-w-xl mx-auto">
          हर कोने में एक कहानी है, हर धड़कन में विकास के साथ बिताए वो अनमोल पल...
        </p>
      </div>

      {/* 6 Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {VILLAGE_MEMORIES.map((item) => {
          const isExpanded = activeCard === item.id;
          return (
            <motion.div
              key={item.id}
              layout
              onClick={() => toggleExpand(item.id)}
              className={`relative cursor-pointer rounded-2xl p-5 border transition-all duration-300 ${
                isExpanded
                  ? 'editorial-card-warm shadow-2xl scale-[1.02]'
                  : 'editorial-card editorial-card-hover shadow-lg'
              }`}
            >
              {/* Top Row: Category & Sound Trigger */}
              <div className="flex items-center justify-between pb-3">
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#11130c] border border-[#e0d5b1]/15 text-[#d4a359]">
                  {item.category}
                </span>

                <button
                  onClick={(e) => handlePlaySound(e, item.audioKey)}
                  className="p-1.5 rounded-full bg-[#24281a] hover:bg-[#323824] border border-[#d4a359]/40 text-[#f4ebcf] transition-transform active:scale-90"
                  title="ध्वनि सुनें (Play Sound)"
                >
                  <Volume2 className="w-3.5 h-3.5 text-[#d4a359]" />
                </button>
              </div>

              {/* Icon & Title */}
              <div className="flex items-center gap-3 my-2">
                <div className="p-3 rounded-xl bg-[#13150d] border border-[#e0d5b1]/15 shrink-0">
                  {getMemoryIcon(item.icon)}
                </div>
                <div>
                  <h3 className="text-lg font-bold font-editorial text-[#f4ebcf]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#d4a359] font-editorial italic">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              {/* Brief Description */}
              <p className="text-xs sm:text-sm text-[#d5caa8] font-editorial leading-relaxed mt-2">
                {item.description}
              </p>

              {/* Quote pill */}
              <div className="mt-3 p-2.5 rounded-xl bg-[#0f100a]/70 border border-[#e0d5b1]/15 text-xs font-editorial text-[#ebd095] italic">
                {item.quote}
              </div>

              {/* Expandable Story Section */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pt-3 border-t border-[#e0d5b1]/15 text-xs text-[#d5caa8]"
                  >
                    <div className="flex items-center gap-1.5 text-[#d4a359] font-editorial font-bold mb-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>विकास के संस्मरण:</span>
                    </div>
                    <p className="font-editorial text-[#f4ebcf] text-sm leading-relaxed italic">
                      {item.hindiStory}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Toggle Hint */}
              <div className="mt-3 pt-2 flex items-center justify-end text-[11px] text-[#d4a359] font-mono">
                <span>{isExpanded ? 'कम देखें' : 'विस्तार से पढ़ें'}</span>
                {isExpanded ? (
                  <ChevronUp className="w-3.5 h-3.5 ml-1" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 ml-1" />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
