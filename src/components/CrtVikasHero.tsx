import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Tv, Camera, Volume2, ShieldCheck, Sun, Eye, Sliders, RefreshCw, Upload } from 'lucide-react';
import { villageSounds } from '../utils/soundEffects';

interface CrtVikasHeroProps {
  crtEnabled: boolean;
  onToggleCrt: () => void;
  onPlaySound: (key: string) => void;
}

export const CrtVikasHero: React.FC<CrtVikasHeroProps> = ({ crtEnabled, onToggleCrt, onPlaySound }) => {
  const [frameStyle, setFrameStyle] = useState<'crt' | 'polaroid' | 'vintage'>('crt');
  const [channel, setChannel] = useState<string>('DD1');
  const [flash, setFlash] = useState<boolean>(false);
  const [photoFilter, setPhotoFilter] = useState<'nostalgic' | 'warm90s' | 'cinematic' | 'bw'>('nostalgic');
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<'photo' | 'logo'>('photo');

  const channels = ['DD1 (दूरदर्शन)', '90s GOLD', 'खेत खलिहान', 'चौपाल LIVE'];

  const handleSnapshot = () => {
    villageSounds.playCameraShutter();
    setFlash(true);
    setTimeout(() => setFlash(false), 250);
  };

  const handleNextChannel = () => {
    villageSounds.playRadioTuning();
    const curIdx = channels.indexOf(channel);
    const nextIdx = (curIdx + 1) % channels.length;
    setChannel(channels[nextIdx]);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCustomImage(event.target.result as string);
          villageSounds.playCassetteClick();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const getFilterStyle = () => {
    switch (photoFilter) {
      case 'warm90s':
        return 'sepia(35%) contrast(110%) saturate(140%) hue-rotate(-10deg)';
      case 'cinematic':
        return 'contrast(120%) saturate(125%) brightness(95%)';
      case 'bw':
        return 'grayscale(100%) contrast(130%) brightness(90%)';
      default:
        return 'contrast(108%) saturate(115%) sepia(15%)';
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto my-6 px-4">
      {/* Camera Flash Overlay */}
      <AnimatePresence>
        {flash && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white z-50 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Main Retro Monitor / TV Enclosure */}
      <div className="relative bg-gradient-to-b from-[#22251a] via-[#161811] to-[#0f100a] p-5 sm:p-7 rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border-2 border-[#d4a359]/35">
        
        {/* Vintage Top Antenna & TV Accents */}
        <div className="flex items-center justify-between pb-3 border-b border-[#e0d5b1]/15 text-xs text-[#c4b996] font-mono">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#e05638] animate-pulse shadow-[0_0_8px_#e05638]" />
            <span className="font-bold tracking-wider text-[#e5d8b2] font-editorial uppercase text-sm">DEVDARSHAN ARCHIVE CRT 1994</span>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-[#1f2216] border border-[#d4a359]/30 text-[10px] text-[#d4a359]">
              VHF / UHF • HERITAGE
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleNextChannel}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#202317] hover:bg-[#2c311f] border border-[#d4a359]/30 text-[#e0d5b1] transition-all text-xs active:scale-95"
              title="Change Nostalgic Channel"
            >
              <RefreshCw className="w-3 h-3 animate-spin-slow text-[#d4a359]" />
              <span className="font-editorial">{channel}</span>
            </button>

            <button
              onClick={onToggleCrt}
              className={`px-3 py-1 rounded-full border transition-all text-xs flex items-center gap-1.5 font-mono ${
                crtEnabled
                  ? 'bg-[#1b2b18] border-emerald-500/50 text-emerald-300'
                  : 'bg-[#181912] border-[#e0d5b1]/15 text-[#9e9373]'
              }`}
            >
              <Tv className="w-3 h-3" />
              <span>CRT: {crtEnabled ? 'चालू (ON)' : 'बंद (OFF)'}</span>
            </button>
          </div>
        </div>

        {/* Screen Bezel & Tube Glass */}
        <div className="relative mt-4 bg-[#0a0b08] rounded-2xl p-3 sm:p-4 border border-[#e0d5b1]/15 shadow-[inset_0_4px_25px_rgba(0,0,0,0.95)] overflow-hidden">
          
          {/* Outer Screen Glass Container */}
          <div className="relative aspect-[4/5] sm:aspect-[16/11] max-h-[520px] w-full rounded-xl overflow-hidden bg-emerald-950/40 flex items-center justify-center">
            
            {/* The Vikas Village Image / Memory Asset */}
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
              {customImage ? (
                <img
                  src={customImage}
                  alt="विकास गांव के दिनों में"
                  className="w-full h-full object-cover"
                  style={{ filter: getFilterStyle() }}
                />
              ) : viewMode === 'logo' ? (
                /* Official App Logo Display Inside CRT */
                <div className="relative w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-b from-[#181c10] via-[#0d0e08] to-[#080905]">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative max-w-[280px] sm:max-w-[320px] aspect-square w-full rounded-3xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.9)] border-2 border-[#d4a359]/70 p-1 bg-[#12140c]"
                  >
                    <img
                      src="/icon.svg"
                      alt="गाँव के दिन विकास के साथ - App Logo"
                      className="w-full h-full rounded-2xl object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                  <p className="mt-3 text-xs text-[#d4a359] font-editorial font-bold tracking-wider uppercase">
                    ★ OFFICIAL APP LOGO EMBLEM ★
                  </p>
                </div>
              ) : (
                /* High-fidelity responsive rendering of Vikas on the village grass with dynamic depth and foliage */
                <div className="relative w-full h-full flex flex-col justify-end">
                  {/* Village Nature Backing Photo Representation */}
                  <img
                    src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"
                    alt="Village Green Grass Fields"
                    className="absolute inset-0 w-full h-full object-cover scale-105"
                    style={{ filter: getFilterStyle() }}
                  />

                  {/* Layered Grass Foreground & Village Depth Simulation */}
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-900/30 to-transparent pointer-events-none" />

                  {/* Embedded Hero Portrait Frame of Vikas */}
                  <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center h-full">
                    {/* Retro Polaroid Style Card in CRT */}
                    <div className="relative max-w-sm w-full bg-[#f8f5ee] text-stone-900 p-4 sm:p-5 rounded-xl shadow-2xl rotate-[-1deg] border border-amber-200/80 transition-transform duration-300 hover:rotate-0">
                      
                      {/* Photo Area */}
                      <div className="relative aspect-[3/4] max-h-[300px] w-full rounded-lg overflow-hidden bg-emerald-900 shadow-inner border border-stone-300">
                        <img
                          src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80"
                          alt="विकास - गांव के दिन"
                          className="w-full h-full object-cover"
                          style={{ filter: getFilterStyle() }}
                        />
                        {/* Nostalgic Watermark */}
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-[10px] text-amber-300 font-mono">
                          REC ● 1994
                        </div>
                        <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-amber-900/80 backdrop-blur-sm text-[10px] text-amber-100 font-kalam">
                          🌾 खेत-खलिहान
                        </div>
                      </div>

                      {/* Handwritten Caption */}
                      <div className="pt-3 text-center">
                        <h4 className="text-xl font-bold font-kalam text-amber-950 tracking-wide">
                          "विकास - गांव के सुनहरे दिन"
                        </h4>
                        <p className="text-xs text-stone-600 font-kalam">
                          दोपहर की नीम की छांव, हरी घास और असीम सुकून
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Foreground Animated Grass Blades (SVG Overlay) */}
              <div className="absolute -bottom-2 left-0 right-0 h-16 pointer-events-none z-20 opacity-85 flex justify-between overflow-hidden">
                {[...Array(24)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      rotate: [i % 2 === 0 ? -4 : 4, i % 2 === 0 ? 5 : -5, i % 2 === 0 ? -4 : 4],
                    }}
                    transition={{
                      duration: 3 + (i % 4) * 0.8,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="origin-bottom"
                    style={{
                      height: `${40 + (i % 5) * 8}px`,
                      width: '10px',
                      background: 'linear-gradient(to top, #14532d, #22c55e)',
                      clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                    }}
                  />
                ))}
              </div>

              {/* CRT Scanline Overlay */}
              {crtEnabled && (
                <div className="absolute inset-0 crt-overlay pointer-events-none z-20" />
              )}

              {/* CRT Flicker Layer */}
              {crtEnabled && (
                <div className="absolute inset-0 crt-flicker pointer-events-none z-20 bg-amber-500/[0.02]" />
              )}

              {/* Tube Vignette Curve & Phosphor Edge */}
              <div className="absolute inset-0 pointer-events-none z-20 shadow-[inset_0_0_80px_rgba(0,0,0,0.85)] border border-amber-500/10 rounded-xl" />

              {/* On-Screen Display (OSD) Info */}
              <div className="absolute top-4 left-4 z-30 flex flex-col gap-1 pointer-events-none">
                <span className="text-xs font-vt323 text-emerald-400 green-crt-glow tracking-widest text-base">
                  CH 04 • {channel}
                </span>
                <span className="text-[11px] font-mono text-amber-300/80">
                  AUTO-TRACKING: 99.4%
                </span>
              </div>

              {/* Floating Quick Action Overlay Buttons */}
              <div className="absolute bottom-4 right-4 z-30 flex items-center gap-2">
                <button
                  onClick={handleSnapshot}
                  className="p-2.5 rounded-full bg-black/70 hover:bg-amber-700/80 text-amber-200 backdrop-blur-md border border-amber-500/40 shadow-lg transition-all active:scale-90"
                  title="Capture Nostalgic Photo"
                >
                  <Camera className="w-4 h-4" />
                </button>
                <label
                  className="p-2.5 rounded-full bg-black/70 hover:bg-emerald-700/80 text-emerald-200 backdrop-blur-md border border-emerald-500/40 shadow-lg transition-all cursor-pointer active:scale-90"
                  title="Upload / Replace Photo"
                >
                  <Upload className="w-4 h-4" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Retro TV Bottom Controls & Speaker Grille */}
          <div className="mt-4 pt-3 border-t border-[#e0d5b1]/15 flex flex-wrap items-center justify-between gap-3 text-[#c4b996]">
            {/* View Mode Switcher: Photo / App Logo */}
            <div className="flex items-center gap-1.5 bg-[#13150d] p-1 rounded-xl border border-[#e0d5b1]/15 text-xs font-editorial">
              <button
                onClick={() => {
                  setViewMode('photo');
                  villageSounds.playCassetteClick();
                }}
                className={`px-3 py-1 rounded-lg transition-all font-bold ${
                  viewMode === 'photo'
                    ? 'bg-[#d4a359] text-[#0d0e0a] shadow'
                    : 'text-[#c4b996] hover:text-[#f4ebcf]'
                }`}
              >
                📸 फोटो संस्मरण
              </button>
              <button
                onClick={() => {
                  setViewMode('logo');
                  villageSounds.playCycleBell();
                }}
                className={`px-3 py-1 rounded-lg transition-all font-bold ${
                  viewMode === 'logo'
                    ? 'bg-[#d4a359] text-[#0d0e0a] shadow'
                    : 'text-[#c4b996] hover:text-[#f4ebcf]'
                }`}
              >
                🌟 ऐप लोगो
              </button>
            </div>

            {/* Filter Selector */}
            <div className="flex items-center gap-1.5 bg-[#13150d] p-1 rounded-xl border border-[#e0d5b1]/15 text-xs font-editorial">
              <span className="text-[#9e9373] text-[11px] px-1.5 font-mono">Tone:</span>
              <button
                onClick={() => {
                  setPhotoFilter('nostalgic');
                  villageSounds.playCassetteClick();
                }}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  photoFilter === 'nostalgic'
                    ? 'bg-[#d4a359] text-[#0d0e0a] font-bold shadow'
                    : 'text-[#c4b996] hover:text-[#f4ebcf]'
                }`}
              >
                देसी (Natural)
              </button>
              <button
                onClick={() => {
                  setPhotoFilter('warm90s');
                  villageSounds.playCassetteClick();
                }}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  photoFilter === 'warm90s'
                    ? 'bg-[#d4a359] text-[#0d0e0a] font-bold shadow'
                    : 'text-[#c4b996] hover:text-[#f4ebcf]'
                }`}
              >
                90s धूप
              </button>
              <button
                onClick={() => {
                  setPhotoFilter('cinematic');
                  villageSounds.playCassetteClick();
                }}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  photoFilter === 'cinematic'
                    ? 'bg-[#d4a359] text-[#0d0e0a] font-bold shadow'
                    : 'text-[#c4b996] hover:text-[#f4ebcf]'
                }`}
              >
                सिनेमैटिक
              </button>
            </div>

            {/* Quick Village Sounds Triggers */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  villageSounds.playCycleBell();
                  onPlaySound('bell');
                }}
                className="px-3 py-1.5 rounded-lg bg-[#202317] hover:bg-[#2b301f] border border-[#d4a359]/30 text-[#e0d5b1] text-xs flex items-center gap-1.5 transition-transform active:scale-95 font-editorial"
              >
                <span>🚲 घंटी</span>
              </button>
              <button
                onClick={() => {
                  villageSounds.playTubewellSplash();
                  onPlaySound('tubewell');
                }}
                className="px-3 py-1.5 rounded-lg bg-[#182717] hover:bg-[#20361f] border border-emerald-500/35 text-emerald-200 text-xs flex items-center gap-1.5 transition-transform active:scale-95 font-editorial"
              >
                <span>🌊 ट्यूबवेल</span>
              </button>
            </div>
          </div>
        </div>

        {/* Vintage Brass Nameplate */}
        <div className="mt-4 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-1.5 rounded-full bg-gradient-to-r from-[#1b1d14] via-[#2d2a1c] to-[#1b1d14] border border-[#d4a359]/40 shadow-inner">
            <Sparkles className="w-4 h-4 text-[#d4a359]" />
            <span className="text-[#f4ebcf] font-editorial tracking-wider text-sm sm:text-base italic">
              "यादों के झरोखे से — विकास और गांव की अनमोल धरोहर"
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
