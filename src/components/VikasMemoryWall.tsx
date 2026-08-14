import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Heart, MessageSquare, MapPin, Sparkles, User, Smile } from 'lucide-react';
import { VisitorMemory } from '../types';
import { INITIAL_VISITOR_MEMORIES } from '../data/villageContent';
import { villageSounds } from '../utils/soundEffects';

export const VikasMemoryWall: React.FC = () => {
  const [memories, setMemories] = useState<VisitorMemory[]>(() => {
    const saved = localStorage.getItem('vikas_village_memories_v2') || localStorage.getItem('vikas_village_memories');
    if (saved) {
      try {
        const parsed: VisitorMemory[] = JSON.parse(saved);
        // Replace previous names if present in cache
        return parsed.map((m) => {
          if (m.author === 'अमित कुमार' || m.author === 'अमित') {
            return { ...m, author: 'अखिल' };
          }
          if (m.author === 'राहुल शर्मा' || m.author === 'राहुल') {
            return { ...m, author: 'संदीप' };
          }
          return m;
        });
      } catch (e) {
        return INITIAL_VISITOR_MEMORIES;
      }
    }
    return INITIAL_VISITOR_MEMORIES;
  });

  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('');
  const [text, setText] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('🌾');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    localStorage.setItem('vikas_village_memories_v2', JSON.stringify(memories));
  }, [memories]);

  const emojis = ['🌾', '🚲', '📻', '☀️', '🔥', '🥭', '🍵', '❤️', '🌟'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !author.trim()) return;

    villageSounds.playCassetteClick();
    setIsSubmitting(true);

    const newMemory: VisitorMemory = {
      id: 'm_' + Date.now(),
      author: author.trim(),
      location: location.trim() || 'गाँव का हमसफ़र',
      text: text.trim(),
      timestamp: 'अभी-अभी (Just now)',
      likes: 1,
      moodEmoji: selectedEmoji,
    };

    setTimeout(() => {
      setMemories([newMemory, ...memories]);
      setAuthor('');
      setLocation('');
      setText('');
      setIsSubmitting(false);
    }, 300);
  };

  const handleLike = (id: string) => {
    villageSounds.playCycleBell();
    setMemories(
      memories.map((m) => (m.id === id ? { ...m, likes: m.likes + 1 } : m))
    );
  };

  return (
    <section className="w-full max-w-5xl mx-auto my-14 px-4 pb-28">
      {/* Section Title */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c1f14] border border-[#d4a359]/35 text-[#d4a359] text-xs font-mono mb-2">
          <span>💌 चौपाल की डायरी • COMMUNITY ARCHIVE</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-rozha text-[#f4ebcf] tracking-wide">
          विकास के नाम एक पैगाम / अपनी यादें साझा करें
        </h2>
        <p className="text-sm text-[#c4b996] font-editorial italic mt-1 max-w-xl mx-auto">
          गांव की कोई पुरानी बात, विकास भाई के लिए कोई संदेश या बचपन की मीठी याद यहां लिखें।
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Card */}
        <div className="lg:col-span-5 bg-gradient-to-b from-[#191b12]/95 to-[#10120b]/95 backdrop-blur-xl border border-[#e0d5b1]/15 rounded-3xl p-6 shadow-xl h-fit">
          <h3 className="text-lg font-bold font-editorial text-[#f4ebcf] mb-4 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#d4a359]" />
            <span>संदेश लिखें (Leave a Note)</span>
          </h3>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs sm:text-sm">
            <div>
              <label className="block text-[#c4b996] font-editorial font-medium mb-1">
                आपका नाम (Your Name) *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 w-4 h-4 text-[#9e9373]" />
                <input
                  type="text"
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="उदा. अखिल, संदीप..."
                  className="w-full pl-9 pr-3 py-2 bg-[#0e100a] border border-[#e0d5b1]/15 rounded-xl text-[#f4ebcf] placeholder:text-[#6e6750] focus:outline-none focus:border-[#d4a359] transition-colors font-editorial"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#c4b996] font-editorial font-medium mb-1">
                स्थान / गाँव / शहर (Location)
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-[#9e9373]" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="उदा. पैतृक गाँव, राजस्थान, दिल्ली..."
                  className="w-full pl-9 pr-3 py-2 bg-[#0e100a] border border-[#e0d5b1]/15 rounded-xl text-[#f4ebcf] placeholder:text-[#6e6750] focus:outline-none focus:border-[#d4a359] transition-colors font-editorial"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#c4b996] font-editorial font-medium mb-1">
                प्रतीक चिह्न (Mood Emoji)
              </label>
              <div className="flex flex-wrap gap-1.5 p-1.5 bg-[#0e100a] border border-[#e0d5b1]/15 rounded-xl">
                {emojis.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setSelectedEmoji(emoji)}
                    className={`w-8 h-8 rounded-lg text-base flex items-center justify-center transition-transform ${
                      selectedEmoji === emoji
                        ? 'bg-[#d4a359] text-[#0d0e0a] scale-110 shadow'
                        : 'hover:bg-[#1a1c14]'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[#c4b996] font-editorial font-medium mb-1">
                आपकी याद / संदेश (Message) *
              </label>
              <textarea
                required
                rows={3}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="गांव की वो बातें, विकास के साथ बिताए पल या कोई खूबसूरत कविता..."
                className="w-full p-3 bg-[#0e100a] border border-[#e0d5b1]/15 rounded-xl text-[#f4ebcf] placeholder:text-[#6e6750] focus:outline-none focus:border-[#d4a359] transition-colors resize-none font-editorial italic text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#a0742f] via-[#d4a359] to-[#ebd095] hover:from-[#b88636] hover:to-[#f3dcab] text-[#0d0e0a] font-bold font-editorial flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'भेजा जा रहा है...' : 'डायरी में दर्ज करें'}</span>
            </button>
          </form>
        </div>

        {/* Memories Feed */}
        <div className="lg:col-span-7 flex flex-col gap-3.5 max-h-[500px] overflow-y-auto pr-1">
          <AnimatePresence>
            {memories.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-2xl bg-[#14160e]/85 border border-[#e0d5b1]/15 backdrop-blur-md shadow-md flex flex-col gap-2 hover:border-[#d4a359]/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl p-1.5 rounded-xl bg-[#0a0b07] border border-[#e0d5b1]/15">
                      {m.moodEmoji}
                    </span>
                    <div>
                      <h4 className="font-bold text-sm text-[#f4ebcf] font-editorial">
                        {m.author}
                      </h4>
                      <span className="text-[11px] text-[#9e9373] flex items-center gap-1 font-editorial">
                        <MapPin className="w-3 h-3 text-[#d4a359]" />
                        {m.location} • {m.timestamp}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleLike(m.id)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0a0b07] border border-[#e0d5b1]/15 text-rose-300 hover:text-rose-200 hover:bg-rose-950/40 text-xs transition-colors"
                  >
                    <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                    <span className="font-mono">{m.likes}</span>
                  </button>
                </div>

                <p className="text-sm text-[#e0d5b1] font-editorial italic leading-relaxed pt-1">
                  "{m.text}"
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
