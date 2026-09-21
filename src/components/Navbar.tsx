import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface NavbarProps {
  onScrollToSection: (id: string) => void;
  isAudioActive: boolean;
  onToggleAudio: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onScrollToSection,
  isAudioActive,
  onToggleAudio,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-6 sm:px-12 py-5 flex items-center justify-between backdrop-blur-md bg-black/40 border-b border-white/[0.06] transition-all">
      {/* Brand Mark */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => onScrollToSection('hero')}
          className="flex items-center gap-2.5 text-left group"
        >
          <span className="w-2 h-2 bg-white rounded-[1px] group-hover:scale-110 transition-transform" />
          <span className="font-sans font-bold text-sm tracking-[-0.03em] text-white">
            PLECTIK
          </span>
        </button>
        <span className="hidden sm:inline-block h-3.5 w-[1px] bg-white/20 mx-1" />
        <span className="hidden sm:inline-block font-mono text-[10px] tracking-widest text-neutral-400 uppercase">
          Scientific Discovery Technology
        </span>
      </div>

      {/* Center Nav Links (Apple-like, clean, subdued) */}
      <nav className="hidden md:flex items-center gap-7 text-xs font-mono text-neutral-400 font-medium">
        <button
          onClick={() => onScrollToSection('manifesto')}
          className="hover:text-white transition-colors"
        >
          Manifesto
        </button>
        <button
          onClick={() => onScrollToSection('paradigm')}
          className="hover:text-white transition-colors"
        >
          Paradigm
        </button>
        <button
          onClick={() => onScrollToSection('technology')}
          className="hover:text-white transition-colors"
        >
          Technology
        </button>
        <button
          onClick={() => onScrollToSection('research')}
          className="hover:text-white transition-colors flex items-center gap-1.5"
        >
          <span>Research</span>
          <span className="px-1.5 py-0.2 rounded-full bg-white/[0.1] text-[10px] text-white">17</span>
        </button>
        <button
          onClick={() => onScrollToSection('selected-discovery')}
          className="hover:text-white transition-colors"
        >
          Discovery
        </button>
      </nav>

      {/* Right Controls: Audio & Request Access */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleAudio}
          title={isAudioActive ? 'Mute Resonance Synth' : 'Enable Resonance Synth'}
          className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/[0.06] transition-all"
        >
          {isAudioActive ? (
            <Volume2 className="w-4 h-4 text-white animate-pulse" />
          ) : (
            <VolumeX className="w-4 h-4 text-neutral-500" />
          )}
        </button>

        <button
          onClick={() => onScrollToSection('inquire')}
          className="px-3.5 py-1.5 rounded-full bg-white text-black font-sans font-medium text-xs hover:bg-neutral-200 active:scale-95 transition-all"
        >
          Request Access
        </button>
      </div>
    </header>
  );
};
