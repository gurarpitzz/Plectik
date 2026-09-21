import React from 'react';
import { ArrowDown, Sparkles, ShieldCheck } from 'lucide-react';

interface EditorialOverlayProps {
  isVisible?: boolean;
}

export const EditorialOverlay: React.FC<EditorialOverlayProps> = ({ isVisible = true }) => {
  return (
    <div
      className={`pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-6 sm:p-10 md:p-16 select-none transition-opacity duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Contrast protective gradient shield on left side for guaranteed legibility */}
      <div className="absolute inset-y-0 left-0 w-full lg:w-3/5 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none -z-10" />

      {/* Top Floating Glass Header Capsule */}
      <div className="flex items-center justify-between w-full pt-16 sm:pt-12 pointer-events-auto">
        <div className="liquid-glass-pill px-4 py-1.5 rounded-full flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.25em] text-neutral-300 uppercase">
            SCIENTIFIC DISCOVERY TECHNOLOGY
          </span>
        </div>

        <div className="hidden md:flex items-center gap-2 liquid-glass-pill px-3.5 py-1.5 rounded-full text-neutral-400 text-[11px] font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-neutral-300" />
          <span>IP PROTECTION IN PROGRESS</span>
        </div>
      </div>

      {/* Hero Primary Typography - Protected High-Contrast Chassis */}
      <div className="max-w-3xl space-y-4 sm:space-y-6 pb-12 sm:pb-8 pointer-events-auto relative z-10">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-[-0.05em] text-white font-['Syne'] leading-none drop-shadow-[0_4px_32px_rgba(0,0,0,1)]">
              PLECTIK
            </h1>
          </div>
          <div className="text-xs sm:text-base md:text-lg lg:text-xl font-bold tracking-[0.22em] text-neutral-200 uppercase font-['Space_Grotesk'] drop-shadow-[0_2px_12px_rgba(0,0,0,1)]">
            DISCOVER WHAT CANNOT BE PROGRAMMED.
          </div>
        </div>

        <div className="max-w-xl liquid-glass bg-black/70 rounded-2xl p-5 sm:p-6 backdrop-blur-2xl border border-white/[0.14] shadow-2xl">
          <p className="text-xs sm:text-sm md:text-base text-neutral-300 font-light leading-relaxed">
            A new technology for discovering mathematical laws, relationships and computational structures across complex scientific domains.
          </p>
          <div className="mt-3.5 pt-3 border-t border-white/[0.08] flex items-center justify-between">
            <span className="font-mono text-[10px] sm:text-xs text-neutral-400 tracking-widest uppercase">
              ONE TECHNOLOGY · INFINITE DISCOVERY
            </span>
            <span className="font-mono text-[10px] text-neutral-500">
              EST. 2026
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
