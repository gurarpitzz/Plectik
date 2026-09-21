export type ColorTheme = 'reference' | 'monochrome' | 'aurora' | 'cyber' | 'solar';

export interface TopologyConfig {
  theme: ColorTheme;
  dispersion: number; // 0 (tight) to 1 (explosive)
  morphSpeed: number; // 0 to 2
  waveFrequency: number;
  noiseIntensity: number;
  lineDensity: number; // isolines count
  particleDensity: number;
  particleSize: number;
  interactiveForce: number;
  showCage: boolean;
  autoRotate: boolean;
  audioReactive: boolean;
}

export interface CameraPreset {
  id: string;
  name: string;
  position: [number, number, number];
  target: [number, number, number];
}
