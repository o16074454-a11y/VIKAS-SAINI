import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  ListMusic,
  Maximize2,
  Minimize2,
  Radio,
  ExternalLink,
  Disc,
  Flame,
  Sparkles,
  Heart,
  CloudRain,
  MoonStar,
} from 'lucide-react';
import { PlaylistItem } from '../types';
import { VILLAGE_PLAYLISTS } from '../data/villageContent';
import { villageSounds } from '../utils/soundEffects';

interface MusicPlayerProps {
  currentPlaylist: PlaylistItem;
  onSelectPlaylist: (playlist: PlaylistItem) => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  currentPlaylist,
  onSelectPlaylist,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(85);
  const [showPlaylists, setShowPlaylists] = useState<boolean>(false);
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);
  const [trackIndex, setTrackIndex] = useState<number>(0);
  const [progress, setProgress] = useState<number>(20);
  const [cassetteSpoolAngle, setCassetteSpoolAngle] = useState<number>(0);

  const currentTrack = currentPlaylist.popularTracks[trackIndex] || {
    title: currentPlaylist.hindiTitle,
    artist: currentPlaylist.title,
    duration: '4:30',
  };

  // Progress simulation for responsive feel
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
        setCassetteSpoolAngle((prev) => (prev + 6) % 360);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    villageSounds.playCassetteClick();
    setIsPlaying(!isPlaying);
  };

  const handleNextTrack = () => {
    villageSounds.playCassetteClick();
    setTrackIndex((prev) => (prev + 1) % currentPlaylist.popularTracks.length);
    setProgress(0);
  };

  const handlePrevTrack = () => {
    villageSounds.playCassetteClick();
    setTrackIndex(
      (prev) =>
        (prev - 1 + currentPlaylist.popularTracks.length) %
        currentPlaylist.popularTracks.length
    );
    setProgress(0);
  };

  const handlePlaylistChange = (pl: PlaylistItem) => {
    villageSounds.playRadioTuning();
    onSelectPlaylist(pl);
    setTrackIndex(0);
    setProgress(0);
    setIsPlaying(true);
    setShowPlaylists(false);
  };

  const getPlaylistIcon = (id: string) => {
    switch (id) {
      case '90s-evergreen':
        return <Disc className="w-4 h-4 text-amber-400" />;
      case 'arijit-singh':
        return <Heart className="w-4 h-4 text-rose-400" />;
      case 'mata-ji':
        return <Sparkles className="w-4 h-4 text-yellow-400" />;
      case 'ramayan-bhakti':
        return <Flame className="w-4 h-4 text-orange-400" />;
      case 'silent-songs':
        return <MoonStar className="w-4 h-4 text-emerald-400" />;
      case 'sad-songs':
        return <CloudRain className="w-4 h-4 text-blue-400" />;
      default:
        return <Radio className="w-4 h-4 text-amber-400" />;
    }
  };

  // Build YouTube iframe embed URL based on playlist / search
  const embedUrl = currentPlaylist.playlistId.startsWith('PL')
    ? `https://www.youtube-nocookie.com/embed/videoseries?list=${currentPlaylist.playlistId}&autoplay=${isPlaying ? 1 : 0}&enablejsapi=1`
    : `https://www.youtube-nocookie.com/embed/5_9E_drjPlg?list=${currentPlaylist.playlistId}&autoplay=${isPlaying ? 1 : 0}&enablejsapi=1`;

  return (
    <>
      {/* Expanded Video Drawer / Modal if user wants to watch */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-4xl bg-[#14160e] border border-[#e0d5b1]/20 rounded-2xl overflow-hidden shadow-2xl p-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#e0d5b1]/15">
                <div className="flex items-center gap-2 text-[#f4ebcf] font-editorial font-bold">
                  <Radio className="w-5 h-5 text-[#d4a359] animate-pulse" />
                  <span>{currentPlaylist.hindiTitle} — सीधा प्रसारण (Live Broadcast)</span>
                </div>
                <button
                  onClick={() => setShowVideoModal(false)}
                  className="px-3 py-1 bg-[#232719] hover:bg-[#343a25] text-[#e0d5b1] text-xs font-editorial font-bold rounded-lg border border-[#e0d5b1]/15"
                >
                  ✕ बंद करें (Close)
                </button>
              </div>

              <div className="relative aspect-video w-full mt-3 rounded-xl overflow-hidden bg-black border border-[#e0d5b1]/15">
                <iframe
                  src={embedUrl}
                  title="YouTube Village Nostalgia Music Player"
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="mt-3 flex justify-between items-center text-xs text-[#9e9373] font-mono">
                <span>स्रोत: YouTube Music Playlist</span>
                <a
                  href={currentPlaylist.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[#d4a359] hover:underline"
                >
                  यूट्यूब पर खोलें <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Playlists Quick Selection Popup */}
      <AnimatePresence>
        {showPlaylists && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-4 sm:right-8 z-40 w-80 sm:w-96 max-h-[460px] overflow-y-auto bg-[#14160e]/95 backdrop-blur-xl border border-[#e0d5b1]/20 rounded-2xl shadow-2xl p-4 text-[#e0d5b1]"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#e0d5b1]/15">
              <span className="text-sm font-bold font-editorial text-[#f4ebcf] flex items-center gap-2">
                <ListMusic className="w-4 h-4 text-[#d4a359]" /> गाँव की कैसेट लाइब्रेरी
              </span>
              <button
                onClick={() => setShowPlaylists(false)}
                className="text-[#9e9373] hover:text-[#f4ebcf] text-xs font-mono"
              >
                ✕
              </button>
            </div>

            <div className="mt-3 flex flex-col gap-2">
              {VILLAGE_PLAYLISTS.map((pl) => {
                const isCurrent = pl.id === currentPlaylist.id;
                return (
                  <button
                    key={pl.id}
                    onClick={() => handlePlaylistChange(pl)}
                    className={`flex items-start gap-3 p-2.5 rounded-xl border text-left transition-all ${
                      isCurrent
                        ? 'bg-[#252a1a] border-[#d4a359]/70 text-[#f4ebcf] shadow-md'
                        : 'bg-[#191b12]/60 border-[#e0d5b1]/10 hover:bg-[#202418] text-[#c4b996]'
                    }`}
                  >
                    <div className="p-2 rounded-lg bg-[#0e100a] border border-[#e0d5b1]/15 shrink-0">
                      {getPlaylistIcon(pl.id)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-xs truncate text-[#f4ebcf] font-editorial">
                        {pl.hindiTitle}
                      </div>
                      <div className="text-[11px] text-[#c4b996] truncate font-editorial">
                        {pl.title}
                      </div>
                      <div className="text-[10px] text-[#9e9373] mt-0.5 line-clamp-1 font-editorial italic">
                        {pl.description}
                      </div>
                    </div>
                    {isCurrent && (
                      <span className="inline-block w-2 h-2 rounded-full bg-[#d4a359] animate-ping mt-1" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fixed Bottom Glassmorphism Player Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 px-3 sm:px-6 pb-3 pt-2">
        <div className="max-w-5xl mx-auto bg-[#14160e]/95 backdrop-blur-xl border border-[#e0d5b1]/20 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.85)] px-4 py-3 sm:px-6">
          
          {/* Top Progress bar line */}
          <div className="relative w-full h-1.5 bg-[#232719] rounded-full mb-3 overflow-hidden cursor-pointer">
            <div
              className="h-full bg-gradient-to-r from-[#a0742f] via-[#d4a359] to-[#ebd095] rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between gap-3">
            
            {/* Left: Track & Playlist Info + Cassette Reel */}
            <div className="flex items-center gap-3 min-w-0 flex-1 sm:max-w-xs">
              {/* Spinning Retro Cassette Spool Indicator */}
              <div
                onClick={() => setShowVideoModal(true)}
                className="relative w-11 h-11 rounded-xl bg-[#0e100a] border border-[#d4a359]/40 flex items-center justify-center shrink-0 shadow cursor-pointer group"
                title="Click to view Video"
              >
                <motion.div
                  animate={{ rotate: isPlaying ? cassetteSpoolAngle : 0 }}
                  transition={{ ease: 'linear', duration: 0.1 }}
                >
                  <Disc className="w-6 h-6 text-[#d4a359] group-hover:scale-110 transition-transform" />
                </motion.div>
                <div className="absolute inset-0 rounded-xl bg-black/30 group-hover:bg-transparent transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 text-[9px] font-mono text-[#f4ebcf] bg-black/80 px-1 rounded">
                    VIEW
                  </span>
                </div>
              </div>

              {/* Title & Artist */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="px-1.5 py-0.2 rounded bg-[#252a1a] border border-[#d4a359]/30 text-[9px] font-mono text-[#d4a359] shrink-0">
                    {currentPlaylist.category.split(' ')[0]}
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-[#f4ebcf] truncate font-editorial">
                    {currentTrack.title}
                  </p>
                </div>
                <p className="text-[11px] text-[#c4b996] truncate font-editorial">
                  {currentTrack.artist} • <span className="text-[#d4a359]">{currentPlaylist.hindiTitle}</span>
                </p>
              </div>
            </div>

            {/* Middle: Controls & Equalizer */}
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-2 sm:gap-4">
                <button
                  onClick={handlePrevTrack}
                  className="p-1.5 sm:p-2 text-[#c4b996] hover:text-[#f4ebcf] hover:bg-[#232719] rounded-full transition-all active:scale-90"
                  title="पिछला गाना (Previous)"
                >
                  <SkipBack className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <button
                  onClick={togglePlay}
                  className="p-2.5 sm:p-3 bg-gradient-to-r from-[#a0742f] via-[#d4a359] to-[#ebd095] hover:from-[#b88636] hover:to-[#f3dcab] text-[#0d0e0a] font-bold rounded-full shadow-[0_0_15px_rgba(212,163,89,0.4)] transition-all active:scale-95"
                  title={isPlaying ? 'रोकें (Pause)' : 'बजाएं (Play)'}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 fill-current" />
                  ) : (
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  )}
                </button>

                <button
                  onClick={handleNextTrack}
                  className="p-1.5 sm:p-2 text-[#c4b996] hover:text-[#f4ebcf] hover:bg-[#232719] rounded-full transition-all active:scale-90"
                  title="अगला गाना (Next)"
                >
                  <SkipForward className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* Dynamic Audio Visualizer Bars */}
              <div className="hidden sm:flex items-center gap-0.5 h-3">
                {[4, 10, 6, 14, 8, 12, 5, 13, 9, 6, 11, 4].map((h, i) => (
                  <motion.span
                    key={i}
                    animate={{
                      height: isPlaying ? [`${h * 0.4}px`, `${h}px`, `${h * 0.2}px`] : '2px',
                    }}
                    transition={{
                      duration: 0.5 + (i % 3) * 0.2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="w-1 bg-[#d4a359] rounded-full"
                  />
                ))}
              </div>
            </div>

            {/* Right: Quick Playlist Dropdown, Video, and Volume */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* YouTube Video Toggle */}
              <button
                onClick={() => setShowVideoModal(true)}
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#232719] hover:bg-[#343a25] text-[#e0d5b1] hover:text-[#f4ebcf] text-xs font-editorial border border-[#e0d5b1]/15 transition-colors"
                title="वीडियो देखें (Watch Video)"
              >
                <Maximize2 className="w-3.5 h-3.5 text-[#d4a359]" />
                <span>स्क्रीन</span>
              </button>

              {/* Playlist Drawer Switcher */}
              <button
                onClick={() => {
                  villageSounds.playCassetteClick();
                  setShowPlaylists(!showPlaylists);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2b2515] hover:bg-[#3d341d] border border-[#d4a359]/60 text-[#f4ebcf] text-xs font-bold font-editorial transition-all active:scale-95"
              >
                <ListMusic className="w-4 h-4 text-[#d4a359]" />
                <span className="hidden sm:inline">गीत सूची</span>
                <span className="sm:hidden">सूची</span>
              </button>

              {/* Volume Button */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 text-[#c4b996] hover:text-[#f4ebcf] rounded-lg transition-colors"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 text-rose-400" />
                ) : (
                  <Volume2 className="w-4 h-4 text-[#d4a359]" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden YouTube Iframe Player for Audio stream */}
      <div className="hidden">
        <iframe
          src={embedUrl}
          title="Background YouTube Audio Stream"
          allow="autoplay"
        />
      </div>
    </>
  );
};
