import React, { useState, useRef, useCallback } from 'react';
import { GenerativeCanvas } from './components/GenerativeCanvas';
import { EditorialOverlay } from './components/EditorialOverlay';
import { Navbar } from './components/Navbar';
import { LandingSections } from './components/LandingSections';
import { TopologyConfig } from './types';
import { audio } from './utils/audio';

const DEFAULT_CONFIG: TopologyConfig = {
  theme: 'reference',
  dispersion: 1.0,
  morphSpeed: 0.85,
  waveFrequency: 1.0,
  noiseIntensity: 1.0,
  lineDensity: 140,
  particleDensity: 60000,
  particleSize: 0.12,
  interactiveForce: 1.5,
  showCage: true,
  autoRotate: false,
  audioReactive: false,
};

export default function App() {
  const [config] = useState<TopologyConfig>(DEFAULT_CONFIG);
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [isIntroActive] = useState(true);
  const [isIntroComplete, setIsIntroComplete] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);

  const handleToggleAudio = () => {
    const active = audio.toggle();
    setIsAudioActive(active);
  };

  const handlePulse = useCallback(() => {
    audio.playPulse(440);
    const canvasContainer = document.getElementById('webgl-canvas-container');
    if (canvasContainer) {
      canvasContainer.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    }
  }, []);

  const scrollToHero = () => {
    heroRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    if (id === 'hero') {
      scrollToHero();
      return;
    }
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative selection:bg-white selection:text-black font-sans antialiased overflow-x-hidden">
      {/* Apple-like Minimalist Navigation */}
      <Navbar
        onScrollToSection={scrollToSection}
        isAudioActive={isAudioActive}
        onToggleAudio={handleToggleAudio}
      />

      {/* Hero Showcase Centerpiece with Deep Space Warp Ingress */}
      <section
        ref={heroRef}
        id="hero"
        className="relative w-full h-screen min-h-[640px] flex items-center justify-center overflow-hidden bg-black"
      >
        {/* Generative Interactive 3D Canvas */}
        <div className="absolute inset-0 z-0 bg-black">
          <GenerativeCanvas
            config={config}
            onCanvasClick={() => {
              if (isAudioActive) {
                audio.playPulse(380);
              }
            }}
            isIntroActive={isIntroActive}
            onIntroComplete={() => {
              setIsIntroComplete(true);
            }}
          />
        </div>

        {/* Subtle Atmospheric Overlay */}
        <EditorialOverlay isVisible={isIntroComplete} />

        {/* Subtle Non-Button Scroll Indicator (Fades in once intro completes) */}
        <div
          className={`absolute bottom-6 sm:bottom-8 left-0 right-0 z-20 flex flex-col items-center pointer-events-none transition-all duration-1000 ${
            isIntroComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-mono tracking-[0.25em] text-neutral-500 uppercase">
              Scroll to explore
            </span>
            <div className="w-[1px] h-6 bg-gradient-to-b from-white/40 via-white/20 to-transparent animate-pulse" />
          </div>
        </div>
      </section>

      {/* Apple-Style Minimalist Deeptech Landing Page Sections */}
      <LandingSections
        onScrollToTop={scrollToHero}
        onTriggerPulse={handlePulse}
      />
    </div>
  );
}
