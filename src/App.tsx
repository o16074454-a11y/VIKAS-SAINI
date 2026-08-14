/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Radio,
  Tv,
  Volume2,
  VolumeX,
  Compass,
  Heart,
  Share2,
  Calendar,
  Feather,
  Smartphone,
} from 'lucide-react';
import { TimeMood, PlaylistItem } from './types';
import { VILLAGE_PLAYLISTS } from './data/villageContent';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { CrtVikasHero } from './components/CrtVikasHero';
import { QuoteTicker } from './components/QuoteTicker';
import { TimeMoodSelector } from './components/TimeMoodSelector';
import { VillageMemories } from './components/VillageMemories';
import { SoundBoard } from './components/SoundBoard';
import { VikasMemoryWall } from './components/VikasMemoryWall';
import { MusicPlayer } from './components/MusicPlayer';
import { AppLogoInstallModal } from './components/AppLogoInstallModal';
import { villageSounds } from './utils/soundEffects';

export default function App() {
  const [mood, setMood] = useState<TimeMood>('afternoon');
  const [crtEnabled, setCrtEnabled] = useState<boolean>(true);
  const [currentPlaylist, setCurrentPlaylist] = useState<PlaylistItem>(
    VILLAGE_PLAYLISTS[0]
  );
  const [ambientActive, setAmbientActive] = useState<boolean>(false);
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);
  const [isLogoModalOpen, setIsLogoModalOpen] = useState<boolean>(false);

  const handleToggleAmbient = () => {
    villageSounds.playCassetteClick();
    const nextState = !ambientActive;
    setAmbientActive(nextState);
    villageSounds.toggleAmbience(nextState);
  };

  const handleShare = () => {
    villageSounds.playCycleBell();
    if (navigator.share) {
      navigator.share({
        title: 'गांव के दिन विकास के साथ',
        text: 'गांव के सुनहरे दिन, खेत-खलिहान और 90s के नगमे...',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2500);
    }
  };

  const handleSoundFromHero = (key: string) => {
    // sound is played in component
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#0d0e0a] text-[#e0d5b1] selection:bg-[#d4a359] selection:text-[#0d0e0a] pb-28 font-serif">
      {/* Dynamic Ambient Canvas with Fireflies, Sunbeams, Pollen */}
      <BackgroundCanvas mood={mood} crtFlicker={crtEnabled} />

      {/* Global CRT Screen Scanline Overlay */}
      {crtEnabled && (
        <div className="fixed inset-0 crt-overlay pointer-events-none z-30 opacity-70" />
      )}

      {/* Subtle Editorial Vignette */}
      <div className="fixed inset-0 vignette pointer-events-none z-20" />

      {/* Top Editorial Masthead & Navigation Bar */}
      <header className="relative z-40 w-full max-w-6xl mx-auto pt-4 px-4 sm:px-6">
        <div className="flex items-center justify-between py-3 px-4 sm:px-6 rounded-2xl bg-[#141610]/80 backdrop-blur-md border border-[#e0d5b1]/15 shadow-2xl">
          {/* Logo & Literary Stamp */}
          <div
            onClick={() => {
              villageSounds.playCassetteClick();
              setIsLogoModalOpen(true);
            }}
            className="flex items-center gap-3 cursor-pointer group"
            title="ऐप लोगो और डाउनलोड विकल्प देखें"
          >
            <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-gradient-to-tr from-[#8a652a] via-[#d4a359] to-[#ebd095] p-0.5 shadow-lg border border-[#d4a359]/60 group-hover:scale-105 transition-transform">
              <img
                src="/icon.svg"
                alt="App Logo"
                className="w-full h-full rounded-[10px] object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#d4a359]"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold font-rozha text-[#f4ebcf] tracking-wide group-hover:text-[#ebd095] transition-colors">
                  गांव के दिन विकास के साथ
                </h1>
                <span className="hidden md:inline-block text-[10px] tracking-widest uppercase font-mono px-2 py-0.5 rounded border border-[#d4a359]/30 text-[#d4a359] bg-[#1d1f14]">
                  ARCHIVE VOL. I
                </span>
              </div>
              <p className="text-[11px] text-[#c4b996] font-editorial italic hidden sm:block">
                संस्मरण • खेत-खलिहान • 90s रेडियो • ग्राम्य जीवन
              </p>
            </div>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* App Logo & Download Button */}
            <button
              onClick={() => {
                villageSounds.playCycleBell();
                setIsLogoModalOpen(true);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#8a652a] via-[#d4a359] to-[#ebd095] text-[#0d0e0a] font-bold text-xs shadow-md hover:brightness-110 transition-transform active:scale-95 font-editorial"
              title="ऐप डाउनलोड / इंस्टॉल करें"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">ऐप डाउनलोड</span>
            </button>

            {/* Village Ambience (Crickets / Nature) Button */}
            <button
              onClick={handleToggleAmbient}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all ${
                ambientActive
                  ? 'bg-[#1e2a1b]/90 border-emerald-500/60 text-emerald-300 shadow-[0_0_12px_rgba(74,222,128,0.25)]'
                  : 'bg-[#1a1c13]/80 border-[#e0d5b1]/15 text-[#c4b996] hover:text-[#f4ebcf] hover:border-[#d4a359]/40'
              }`}
              title="गाँव की शाम के झींगुर व हवा"
            >
              {ambientActive ? (
                <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              ) : (
                <VolumeX className="w-3.5 h-3.5" />
              )}
              <span className="hidden md:inline">
                {ambientActive ? 'गाँव की हवा: चालू' : 'गाँव की हवा'}
              </span>
            </button>

            {/* CRT Switch */}
            <button
              onClick={() => {
                villageSounds.playCassetteClick();
                setCrtEnabled(!crtEnabled);
              }}
              className={`px-2.5 py-1.5 rounded-xl border text-xs font-mono transition-all flex items-center gap-1.5 ${
                crtEnabled
                  ? 'bg-[#2b2413]/90 border-[#d4a359]/60 text-[#f4ebcf]'
                  : 'bg-[#1a1c13]/80 border-[#e0d5b1]/15 text-[#9e9373]'
              }`}
              title="Toggle Retro CRT TV Scanlines"
            >
              <Tv className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">CRT {crtEnabled ? 'ON' : 'OFF'}</span>
            </button>

            {/* Share Link */}
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#202317] hover:bg-[#2b301f] border border-[#d4a359]/40 text-[#f4ebcf] font-bold text-xs shadow-md transition-transform active:scale-95"
              title="शेयर करें"
            >
              <Share2 className="w-3.5 h-3.5 text-[#d4a359]" />
              <span className="hidden sm:inline">साझा करें</span>
            </button>
          </div>
        </div>
      </header>

      {/* Share Toast Notification */}
      {copiedNotification && (
        <div className="fixed top-20 right-6 z-50 px-4 py-2 rounded-xl bg-[#1e2a1b] border border-emerald-500/60 text-emerald-200 text-xs shadow-2xl font-yatra animate-bounce">
          ✓ लिंक कॉपी हो गया! दोस्तों को भेजें।
        </div>
      )}

      {/* Main Content Hero */}
      <main className="relative z-30 pt-6">
        {/* Editorial Heading Section */}
        <div className="text-center max-w-4xl mx-auto px-4 mb-4">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#1b1e14]/90 border border-[#d4a359]/35 text-[#d4a359] text-xs font-mono mb-4 shadow">
              <Sparkles className="w-3.5 h-3.5 text-[#d4a359]" />
              <span className="tracking-widest uppercase text-[11px]">सदाबहार यादें • अनमोल बचपन • विरासत</span>
              <Sparkles className="w-3.5 h-3.5 text-[#d4a359]" />
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-rozha text-transparent bg-clip-text bg-gradient-to-b from-[#fef7e2] via-[#e5d8b2] to-[#c4ab6e] crt-glow tracking-wide leading-tight drop-shadow-lg">
              गांव के दिन विकास के साथ
            </h1>

            <p className="mt-4 text-base sm:text-xl text-[#d5caa8] font-editorial italic max-w-2xl mx-auto leading-relaxed">
              धूल भरी पगडंडियां, ट्यूबवेल की ठंडी धार, 90s के नगमे और विकास भाई के साथ वो बेपरवाह सुकून।
            </p>
          </motion.div>
        </div>

        {/* Time / Mood Selector */}
        <TimeMoodSelector
          currentMood={mood}
          onSelectMood={(m) => setMood(m)}
        />

        {/* Central Strong Visual Object: CRT Retro TV Framing Vikas in the Village Grass */}
        <CrtVikasHero
          crtEnabled={crtEnabled}
          onToggleCrt={() => setCrtEnabled(!crtEnabled)}
          onPlaySound={handleSoundFromHero}
        />

        {/* Rotating Nostalgic Quotes Ticker */}
        <QuoteTicker />

        {/* Interactive Village Memories Capsules */}
        <VillageMemories />

        {/* Interactive Keyboard & Click Soundboard */}
        <SoundBoard />

        {/* Vikas Community / Visitor Memory Wall */}
        <VikasMemoryWall />
      </main>

      {/* Glassmorphism Music Player Fixed at Bottom with all 6 Playlists */}
      <MusicPlayer
        currentPlaylist={currentPlaylist}
        onSelectPlaylist={(pl) => setCurrentPlaylist(pl)}
      />

      {/* Footer Vintage Editorial Note */}
      <footer className="relative z-30 text-center py-8 text-xs text-[#9e9373] font-editorial border-t border-[#e0d5b1]/15 mt-14 max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-center gap-3 mb-2 text-[#d4a359]">
          <span>— 🌾 —</span>
        </div>
        <p className="tracking-wide text-sm text-[#c4b996]">
          गांव के दिन विकास के साथ • समर्पित हर उस याद को जो कभी पुरानी नहीं होती
        </p>
        <p className="text-[11px] text-[#7d745a] font-mono mt-1.5 tracking-wider uppercase">
          Village Nostalgia Editorial Heritage Archive • 1994–2026
        </p>
      </footer>

      {/* App Logo & Download Modal */}
      <AppLogoInstallModal
        isOpen={isLogoModalOpen}
        onClose={() => setIsLogoModalOpen(false)}
      />
    </div>
  );
}
