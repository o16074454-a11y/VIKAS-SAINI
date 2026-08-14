import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, Smartphone, Check, Sparkles, X, Share2, ExternalLink, ArrowDownToLine, Info } from 'lucide-react';
import { villageSounds } from '../utils/soundEffects';

interface AppLogoInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppLogoInstallModal: React.FC<AppLogoInstallModalProps> = ({ isOpen, onClose }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'android' | 'ios'>('preview');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    villageSounds.playCycleBell();
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      setActiveTab('android');
    }
  };

  const handleDownloadLogoSvg = () => {
    villageSounds.playCameraShutter();
    const link = document.createElement('a');
    link.href = '/icon.svg';
    link.download = 'Vikas_Gaon_Ke_Din_App_Logo.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadFavicon = () => {
    villageSounds.playCameraShutter();
    const link = document.createElement('a');
    link.href = '/favicon.svg';
    link.download = 'Vikas_Village_Favicon.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-lg bg-[#14160e] border-2 border-[#d4a359]/40 rounded-3xl p-6 sm:p-7 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] text-[#e0d5b1] overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={() => {
              villageSounds.playCassetteClick();
              onClose();
            }}
            className="absolute top-4 right-4 p-2 rounded-full bg-[#202318] hover:bg-[#2e3321] text-[#c4b996] hover:text-[#f4ebcf] transition-colors border border-[#e0d5b1]/15"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Modal Header */}
          <div className="flex items-center gap-3 pb-4 border-b border-[#e0d5b1]/15">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#8a652a] via-[#d4a359] to-[#ebd095] p-0.5 shadow-md flex items-center justify-center">
              <img
                src="/icon.svg"
                alt="App Logo"
                className="w-full h-full rounded-[10px] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className="text-lg font-bold font-rozha text-[#f4ebcf] tracking-wide">
                ऐप लोगो और डाउनलोड (App Logo & Install)
              </h3>
              <p className="text-xs text-[#c4b996] font-editorial italic">
                डाउनलोड होने के बाद आपके फ़ोन की होम स्क्रीन पर यह लोगो दिखेगा
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mt-4 p-1 bg-[#0b0c08] rounded-xl border border-[#e0d5b1]/15 text-xs font-editorial">
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex-1 py-1.5 rounded-lg font-bold transition-all text-center ${
                activeTab === 'preview'
                  ? 'bg-[#d4a359] text-[#0d0e0a] shadow'
                  : 'text-[#c4b996] hover:text-[#f4ebcf]'
              }`}
            >
              लोगो प्रिव्यू (Logo)
            </button>
            <button
              onClick={() => setActiveTab('android')}
              className={`flex-1 py-1.5 rounded-lg font-bold transition-all text-center ${
                activeTab === 'android'
                  ? 'bg-[#d4a359] text-[#0d0e0a] shadow'
                  : 'text-[#c4b996] hover:text-[#f4ebcf]'
              }`}
            >
              Android निर्देश
            </button>
            <button
              onClick={() => setActiveTab('ios')}
              className={`flex-1 py-1.5 rounded-lg font-bold transition-all text-center ${
                activeTab === 'ios'
                  ? 'bg-[#d4a359] text-[#0d0e0a] shadow'
                  : 'text-[#c4b996] hover:text-[#f4ebcf]'
              }`}
            >
              iPhone (iOS)
            </button>
          </div>

          {/* Content Body */}
          <div className="mt-5">
            {activeTab === 'preview' && (
              <div className="flex flex-col items-center text-center">
                {/* Simulated Phone Screen App Icon */}
                <div className="relative p-5 rounded-2xl bg-gradient-to-b from-[#1b1e14] to-[#0c0d08] border border-[#d4a359]/30 shadow-inner w-full flex flex-col items-center">
                  <div className="relative group">
                    <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.8)] border-2 border-[#d4a359]/60 p-1 bg-[#181c10] transition-transform duration-300 group-hover:scale-105">
                      <img
                        src="/icon.svg"
                        alt="गाँव के दिन विकास के साथ - Official Logo"
                        className="w-full h-full rounded-2xl object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-[#d4a359] text-[#0d0e0a] text-[10px] font-bold font-mono shadow">
                      HD APP ICON
                    </div>
                  </div>

                  <span className="mt-3 text-sm font-bold font-rozha text-[#f4ebcf]">
                    गांव के दिन
                  </span>
                  <span className="text-[11px] text-[#c4b996] font-editorial italic">
                    (विकास के साथ)
                  </span>

                  <p className="text-xs text-[#9e9373] mt-3 font-editorial leading-relaxed max-w-sm">
                    जैसे ही आप नीचे दिए गए बटन से <strong className="text-[#f4ebcf]">"ऐप इंस्टॉल करें / होम स्क्रीन पर जोड़ें"</strong> करेंगे, आपके फोन के होम स्क्रीन पर यही लोगो बन जाएगा!
                  </p>
                </div>

                {/* Download and Install Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mt-4">
                  <button
                    onClick={handleInstallClick}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#a0742f] via-[#d4a359] to-[#ebd095] hover:from-[#b88636] hover:to-[#f3dcab] text-[#0d0e0a] font-bold font-editorial flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>होम स्क्रीन पर जोड़ें</span>
                  </button>

                  <button
                    onClick={handleDownloadLogoSvg}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#232719] hover:bg-[#2f3522] border border-[#d4a359]/40 text-[#f4ebcf] font-bold font-editorial flex items-center justify-center gap-2 transition-transform active:scale-95 text-xs"
                  >
                    <ArrowDownToLine className="w-4 h-4 text-[#d4a359]" />
                    <span>लोगो इमेज सेव करें</span>
                  </button>
                </div>

                {copied && (
                  <p className="text-xs text-emerald-400 font-mono mt-2 animate-pulse">
                    ✓ लोगो डाउनलोड हो गया है!
                  </p>
                )}
              </div>
            )}

            {activeTab === 'android' && (
              <div className="space-y-3 text-xs font-editorial">
                <div className="p-3.5 rounded-xl bg-[#10120b] border border-[#e0d5b1]/15">
                  <h4 className="font-bold text-[#f4ebcf] text-sm mb-1.5 flex items-center gap-2 font-rozha">
                    <span className="w-5 h-5 rounded-full bg-[#d4a359] text-[#0d0e0a] flex items-center justify-center text-xs font-bold">1</span>
                    Chrome / Browser मेनू खोलें
                  </h4>
                  <p className="text-[#c4b996] leading-relaxed">
                    ब्राउज़र के ऊपर दाईं ओर स्थित <strong>तीन बिंदु (⋮)</strong> पर टैप करें।
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#10120b] border border-[#e0d5b1]/15">
                  <h4 className="font-bold text-[#f4ebcf] text-sm mb-1.5 flex items-center gap-2 font-rozha">
                    <span className="w-5 h-5 rounded-full bg-[#d4a359] text-[#0d0e0a] flex items-center justify-center text-xs font-bold">2</span>
                    "Install App" या "Add to Home Screen" चुनें
                  </h4>
                  <p className="text-[#c4b996] leading-relaxed">
                    मेन्यू में <strong>"ऐप इंस्टॉल करें"</strong> या <strong>"होम स्क्रीन में जोड़ें"</strong> विकल्प पर क्लिक करें।
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#10120b] border border-[#e0d5b1]/15">
                  <h4 className="font-bold text-[#f4ebcf] text-sm mb-1.5 flex items-center gap-2 font-rozha">
                    <span className="w-5 h-5 rounded-full bg-[#d4a359] text-[#0d0e0a] flex items-center justify-center text-xs font-bold">3</span>
                    होम स्क्रीन पर लोगो दिखेगा
                  </h4>
                  <p className="text-[#c4b996] leading-relaxed">
                    अब आपके फोन में विकास के साथ वाला लोगो ऐप आइकन के रूप में दिखेगा।
                  </p>
                </div>

                <button
                  onClick={handleInstallClick}
                  className="w-full mt-2 py-2.5 rounded-xl bg-[#d4a359] text-[#0d0e0a] font-bold font-editorial flex items-center justify-center gap-2 shadow"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>अभी इंस्टॉल करने की कोशिश करें</span>
                </button>
              </div>
            )}

            {activeTab === 'ios' && (
              <div className="space-y-3 text-xs font-editorial">
                <div className="p-3.5 rounded-xl bg-[#10120b] border border-[#e0d5b1]/15">
                  <h4 className="font-bold text-[#f4ebcf] text-sm mb-1.5 flex items-center gap-2 font-rozha">
                    <span className="w-5 h-5 rounded-full bg-[#d4a359] text-[#0d0e0a] flex items-center justify-center text-xs font-bold">1</span>
                    Safari में Share बटन दबाएं
                  </h4>
                  <p className="text-[#c4b996] leading-relaxed">
                    स्क्रीन के नीचे बने <strong>Share आइकन (चौकोर तीर ⎋)</strong> पर क्लिक करें।
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#10120b] border border-[#e0d5b1]/15">
                  <h4 className="font-bold text-[#f4ebcf] text-sm mb-1.5 flex items-center gap-2 font-rozha">
                    <span className="w-5 h-5 rounded-full bg-[#d4a359] text-[#0d0e0a] flex items-center justify-center text-xs font-bold">2</span>
                    "Add to Home Screen" चुनें
                  </h4>
                  <p className="text-[#c4b996] leading-relaxed">
                    नीचे स्क्रॉल करके <strong>"Add to Home Screen (+)"</strong> पर टैप करें।
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#10120b] border border-[#e0d5b1]/15">
                  <h4 className="font-bold text-[#f4ebcf] text-sm mb-1.5 flex items-center gap-2 font-rozha">
                    <span className="w-5 h-5 rounded-full bg-[#d4a359] text-[#0d0e0a] flex items-center justify-center text-xs font-bold">3</span>
                    Add पर टैप करें
                  </h4>
                  <p className="text-[#c4b996] leading-relaxed">
                    ऊपर दाईं ओर <strong>"Add"</strong> दबाएं। आपके iPhone की स्क्रीन पर खूबसूरत ऐप लोगो आ जाएगा।
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
