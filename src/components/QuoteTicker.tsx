import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, ChevronLeft, ChevronRight, Sparkles, Feather } from 'lucide-react';
import { NOSTALGIC_QUOTES } from '../data/villageContent';

export const QuoteTicker: React.FC = () => {
  const [index, setIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % NOSTALGIC_QUOTES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const currentQuote = NOSTALGIC_QUOTES[index];

  return (
    <div
      className="relative w-full max-w-4xl mx-auto my-6 px-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#171a11]/90 via-[#232719]/90 to-[#14160e]/90 backdrop-blur-md border border-[#e0d5b1]/15 p-5 sm:p-6 shadow-xl">
        
        {/* Vintage Ornament Background */}
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <Quote className="w-24 h-24 text-[#d4a359]" />
        </div>

        {/* Top Tag & Context */}
        <div className="flex items-center justify-between pb-3 border-b border-[#e0d5b1]/15 text-xs">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-[#252a1a] text-[#d4a359] border border-[#d4a359]/30">
              <Feather className="w-3.5 h-3.5" />
            </span>
            <span className="font-editorial text-[#f4ebcf] tracking-wide font-bold">
              संस्मरण • {currentQuote.tag}
            </span>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-[#1b1e14] text-[#c4b996] text-[11px] border border-[#e0d5b1]/15 font-editorial">
              {currentQuote.timeContext}
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-mono">
            <button
              onClick={() =>
                setIndex((prev) => (prev - 1 + NOSTALGIC_QUOTES.length) % NOSTALGIC_QUOTES.length)
              }
              className="p-1 rounded-full hover:bg-[#2c311f] text-[#c4b996] hover:text-[#f4ebcf] transition-colors"
              title="पिछला विचार"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-mono text-[#d4a359]">
              {index + 1}/{NOSTALGIC_QUOTES.length}
            </span>
            <button
              onClick={() => setIndex((prev) => (prev + 1) % NOSTALGIC_QUOTES.length)}
              className="p-1 rounded-full hover:bg-[#2c311f] text-[#c4b996] hover:text-[#f4ebcf] transition-colors"
              title="अगला विचार"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Animated Rotating Quote Text */}
        <div className="min-h-[90px] sm:min-h-[75px] flex items-center py-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuote.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="w-full"
            >
              <p className="text-base sm:text-lg md:text-xl font-editorial italic text-[#f4ebcf] leading-relaxed tracking-wide">
                "{currentQuote.text}"
              </p>
              <div className="mt-2 text-right">
                <span className="text-xs sm:text-sm font-editorial text-[#d4a359] tracking-wider font-semibold">
                  — {currentQuote.author}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dynamic Progress Indicator */}
        <div className="relative w-full h-1 bg-[#1a1c12] rounded-full overflow-hidden mt-2 border border-[#e0d5b1]/10">
          <motion.div
            key={index}
            initial={{ width: '0%' }}
            animate={{ width: isPaused ? '100%' : '100%' }}
            transition={{ duration: 6.5, ease: 'linear' }}
            className="h-full bg-gradient-to-r from-[#a0742f] via-[#d4a359] to-[#ebd095]"
          />
        </div>
      </div>
    </div>
  );
};
