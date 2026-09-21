import React, { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { TopologyConfig } from '../types';
import { audio } from '../utils/audio';

interface GenerativeCanvasProps {
  config: TopologyConfig;
  onTelemetryUpdate?: (data: {
    fps: number;
    particlesCount: number;
    isolinesCount: number;
    entropy: number;
    camPos: [number, number, number];
  }) => void;
  onCanvasClick?: () => void;
  isIntroActive?: boolean;
  onIntroComplete?: () => void;
}

// Generate smooth, luminous stardust circular dot texture with intense radiant core and ethereal starlight glow
function createCircleTexture(): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.28, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.55, 'rgba(240, 248, 255, 0.75)');
    gradient.addColorStop(0.8, 'rgba(215, 235, 255, 0.3)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export const GenerativeCanvas: React.FC<GenerativeCanvasProps> = ({
  config,
  onTelemetryUpdate,
  onCanvasClick,
  isIntroActive = true,
  onIntroComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  // Interaction refs
  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const isDragging = useRef(false);
  const previousPointer = useRef({ x: 0, y: 0 });
  const rotationEuler = useRef({ x: 0.04, y: -0.05 });
  const targetEuler = useRef({ x: 0.04, y: -0.05 });
  const shockwaves = useRef<{ x: number; y: number; z: number; radius: number; maxRadius: number; strength: number }[]>([]);

  // Simulation object refs
  const particlesMeshRef = useRef<THREE.Points | null>(null);
  const isolinesGroupRef = useRef<THREE.Group | null>(null);
  const cageGroupRef = useRef<THREE.Group | null>(null);
  const rootTransformRef = useRef<THREE.Group | null>(null);

  // Materials for smooth fade-in
  const cageMaterialsRef = useRef<THREE.LineBasicMaterial[]>([]);
  const ribbonMaterialsRef = useRef<THREE.LineBasicMaterial[]>([]);

  // Particle positions, base colors, stream angles & delays for continuous flight
  const particleBasePosRef = useRef<Float32Array | null>(null);
  const particleScatterPosRef = useRef<Float32Array | null>(null);
  const particleStreamAnglesRef = useRef<Float32Array | null>(null);
  const particleRandomDelaysRef = useRef<Float32Array | null>(null);
  const particleBaseColorsRef = useRef<Float32Array | null>(null);

  // Animation timing
  const introTimerRef = useRef(0);
  const introFinishedRef = useRef(false);
  const INTRO_DURATION = 3.6;

  // Clock
  const clockRef = useRef(new THREE.Clock());
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const currentFps = useRef(60);

  // Trigger interactive shockwave pulse
  const triggerPulse = useCallback((worldPos?: THREE.Vector3) => {
    audio.playPulse(Math.random() > 0.5 ? 440 : 330);
    const origin = worldPos || new THREE.Vector3(0, 0, 0);
    shockwaves.current.push({
      x: origin.x,
      y: origin.y,
      z: origin.z,
      radius: 0.1,
      maxRadius: 20,
      strength: 1.6,
    });
    if (onCanvasClick) onCanvasClick();
  }, [onCanvasClick]);

  useEffect(() => {
    introTimerRef.current = 0;
    introFinishedRef.current = !isIntroActive;
    if (isIntroActive) {
      targetEuler.current = { x: 0.04, y: -0.05 };
      rotationEuler.current = { x: 0.04, y: -0.05 };
      if (cameraRef.current) {
        cameraRef.current.position.set(0, 0, 70);
        cameraRef.current.fov = 65;
        cameraRef.current.updateProjectionMatrix();
      }
      setTimeout(() => {
        audio.playIntroRise();
      }, 400);
    } else {
      targetEuler.current = { x: 0.04, y: -0.05 };
      rotationEuler.current = { x: 0.04, y: -0.05 };
      if (cameraRef.current) {
        cameraRef.current.position.set(0, 0, 21.5);
        cameraRef.current.fov = 42;
        cameraRef.current.updateProjectionMatrix();
      }
    }
  }, [isIntroActive]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    if (isIntroActive) {
      camera.position.set(0, 0, 70);
      camera.fov = 65;
    } else {
      camera.position.set(0, 0, 21.5);
      camera.fov = 42;
    }
    camera.updateProjectionMatrix();
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Root transform group for orientation & interactive tilt
    const rootGroup = new THREE.Group();
    rootGroup.rotation.x = 0.04;
    rootGroup.rotation.y = -0.05;

    // Responsive initial offset: on desktop, place 3D simulation to the right so left side remains clear for typography
    if (width >= 1024) {
      rootGroup.position.set(2.8, 0.1, 0);
      rootGroup.scale.set(0.95, 0.95, 0.95);
    } else if (width >= 768) {
      rootGroup.position.set(1.4, 0.4, 0);
      rootGroup.scale.set(0.85, 0.85, 0.85);
    } else {
      rootGroup.position.set(0, 1.4, -2);
      rootGroup.scale.set(0.72, 0.72, 0.72);
    }

    scene.add(rootGroup);
    rootTransformRef.current = rootGroup;

    // --- 1. Architectural Perspective Bounding Box Cage ---
    const cageGroup = new THREE.Group();
    rootGroup.add(cageGroup);
    cageGroupRef.current = cageGroup;

    const boxW = 16.2;
    const boxH = 7.6;
    const boxD = 4.6;
    const layersCount = 6;

    cageMaterialsRef.current = [];

    const cageMaterialFront = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: isIntroActive ? 0 : 0.95,
      linewidth: 1,
    });
    cageMaterialsRef.current.push(cageMaterialFront);

    const cageMaterialBack = new THREE.LineBasicMaterial({
      color: 0xd0d0e2,
      transparent: true,
      opacity: isIntroActive ? 0 : 0.45,
      linewidth: 1,
    });
    cageMaterialsRef.current.push(cageMaterialBack);

    // Generate nested concentric rectangular frames stepping in Z depth
    for (let l = 0; l < layersCount; l++) {
      const t = l / (layersCount - 1);
      const z = (t - 0.5) * boxD;
      const insetFactor = 1 - l * 0.015;
      const w = boxW * insetFactor;
      const h = boxH * insetFactor;

      const pts = [
        new THREE.Vector3(-w / 2, -h / 2, z),
        new THREE.Vector3(w / 2, -h / 2, z),
        new THREE.Vector3(w / 2, h / 2, z),
        new THREE.Vector3(-w / 2, h / 2, z),
        new THREE.Vector3(-w / 2, -h / 2, z),
      ];

      const geom = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = l >= layersCount - 2 ? cageMaterialFront : cageMaterialBack;
      const frameLine = new THREE.Line(geom, mat);
      cageGroup.add(frameLine);
    }

    // Corner alignment rails connecting the front and back planes
    const cornerRailsGeom = new THREE.BufferGeometry();
    const cornerRailPoints: THREE.Vector3[] = [];
    const corners = [
      [-boxW / 2, -boxH / 2],
      [boxW / 2, -boxH / 2],
      [boxW / 2, boxH / 2],
      [-boxW / 2, boxH / 2],
    ];
    corners.forEach(([cx, cy]) => {
      cornerRailPoints.push(new THREE.Vector3(cx, cy, -boxD / 2));
      cornerRailPoints.push(new THREE.Vector3(cx, cy, boxD / 2));
    });
    cornerRailsGeom.setFromPoints(cornerRailPoints);
    const cornerRails = new THREE.LineSegments(cornerRailsGeom, cageMaterialBack);
    cageGroup.add(cornerRails);

    // Architectural datum frame on the right side
    const datumFramePts = [
      new THREE.Vector3(boxW * 0.46, -boxH * 0.44, boxD * 0.45),
      new THREE.Vector3(boxW * 0.46, boxH * 0.44, boxD * 0.45),
      new THREE.Vector3(boxW * 0.46, boxH * 0.44, -boxD * 0.45),
      new THREE.Vector3(boxW * 0.46, -boxH * 0.44, -boxD * 0.45),
      new THREE.Vector3(boxW * 0.46, -boxH * 0.44, boxD * 0.45),
    ];
    const datumGeom = new THREE.BufferGeometry().setFromPoints(datumFramePts);
    const datumMat = new THREE.LineBasicMaterial({
      color: 0x8899aa,
      transparent: true,
      opacity: isIntroActive ? 0 : 0.35,
    });
    cageMaterialsRef.current.push(datumMat);
    const datumFrame = new THREE.Line(datumGeom, datumMat);
    cageGroup.add(datumFrame);

    // --- 2. High-Aesthetic Parametric Surface Topology Function ---
    const evalTopology = (u: number, v: number, time: number, dispersionFactor: number) => {
      const x = (u - 0.5) * boxW * 1.04;
      const rawY = (v - 0.5) * boxH * 0.88;

      // Primary harmonic arch with continuous curvature (G2 smooth)
      const primaryArch = Math.sin(u * Math.PI * 1.6 + 0.28) * 1.35;
      const harmonic1 = Math.sin(u * 4.8 + time * 0.55) * Math.cos(v * 3.8 + time * 0.35) * 0.52;
      const harmonic2 = Math.sin(u * 8.8 - v * 2.2 - time * 0.22) * 0.18;

      let elevationY = rawY + (primaryArch + harmonic1 + harmonic2);

      // Sculptural teardrop fold at center bottom
      if (u > 0.37 && u < 0.61 && v < 0.42) {
        const dropRatio = (u - 0.37) / 0.24;
        const dropProfile = Math.sin(dropRatio * Math.PI);
        const vWeight = Math.pow(1 - v / 0.42, 1.4);
        elevationY -= dropProfile * 1.75 * vWeight;
      }

      // Smooth Z-depth curvature
      let z = Math.cos(u * Math.PI * 1.3) * 1.85 + Math.sin(v * Math.PI * 1.9) * 0.82;
      z += Math.sin(u * 5.8 + time * 0.38) * 0.35;

      // Left crest enhancement
      if (u < 0.28) {
        elevationY += Math.sin(u * 7.2) * 0.35;
      }

      // Right-side graceful dispersion
      if (u > 0.38) {
        const entropyProgress = Math.pow((u - 0.38) / 0.62, 1.9) * dispersionFactor;
        const waveX = (Math.sin(u * 38 + v * 28) * 0.75 + Math.cos(u * 72)) * entropyProgress;
        const waveY = (Math.cos(u * 44 + v * 36) * 1.1 + Math.sin(v * 64)) * entropyProgress;
        const waveZ = (Math.sin(v * 54 + u * 22) * 1.25 + Math.cos(u * 52)) * entropyProgress;

        return {
          x: x + waveX * 1.35,
          y: elevationY + waveY * 1.6,
          z: z + waveZ * 1.6,
          entropy: entropyProgress,
        };
      }

      return {
        x,
        y: elevationY,
        z,
        entropy: 0,
      };
    };

    // --- 3. Construct Contour Ribbon Lines (High-Fidelity Silky Ribbons) ---
    const isolinesGroup = new THREE.Group();
    rootGroup.add(isolinesGroup);
    isolinesGroupRef.current = isolinesGroup;

    const numRibbons = 160;
    const samplesPerRibbon = 85;
    const ribbonLines: THREE.Line[] = [];

    ribbonMaterialsRef.current = [];
    const ribbonMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: isIntroActive ? 0 : 0.94,
      vertexColors: true,
    });
    ribbonMaterialsRef.current.push(ribbonMat);

    for (let i = 0; i < numRibbons; i++) {
      const v = i / (numRibbons - 1);
      const positions = new Float32Array(samplesPerRibbon * 3);
      const colors = new Float32Array(samplesPerRibbon * 3);

      for (let j = 0; j < samplesPerRibbon; j++) {
        const u = (j / (samplesPerRibbon - 1)) * 0.54;
        const pt = evalTopology(u, v, 0, 0);

        positions[j * 3] = pt.x;
        positions[j * 3 + 1] = pt.y;
        positions[j * 3 + 2] = pt.z;

        // Elegant light gradient across ribbons with radiant silver luminosity
        const edgeFade = Math.min(1, j / 5);
        const dissolveFade = Math.max(0, 1 - Math.pow(j / (samplesPerRibbon - 1), 2.2));
        const luminance = 0.52 + 0.48 * edgeFade * dissolveFade;

        colors[j * 3] = luminance;
        colors[j * 3 + 1] = luminance;
        colors[j * 3 + 2] = luminance * 1.05;
      }

      const geom = new THREE.BufferGeometry();
      geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const line = new THREE.Line(geom, ribbonMat);
      isolinesGroup.add(line);
      ribbonLines.push(line);
    }

    // --- 4. Construct Volumetric Stardust Cloud (70,000 dense luminous particles) ---
    const particleCount = 70000;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleBasePositions = new Float32Array(particleCount * 3);
    const particleScatterPositions = new Float32Array(particleCount * 3);
    const particleStreamAngles = new Float32Array(particleCount);
    const particleRandomDelays = new Float32Array(particleCount);
    const particleColors = new Float32Array(particleCount * 3);
    const particleBaseColors = new Float32Array(particleCount * 3);

    const circleTexture = createCircleTexture();
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.175,
      map: circleTexture,
      transparent: true,
      opacity: isIntroActive ? 0 : 0.98,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    for (let p = 0; p < particleCount; p++) {
      const uRaw = Math.random();
      const u = uRaw < 0.35
        ? 0.36 + Math.random() * 0.18
        : 0.48 + Math.pow(Math.random(), 0.85) * 0.65;

      const v = Math.random();
      const pt = evalTopology(u, v, 0, 1.15);

      const spread = Math.pow(Math.max(0, (u - 0.4) / 0.6), 1.55);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const rad = Math.random() * (0.2 + spread * 2.85);

      const px = pt.x + rad * Math.sin(phi) * Math.cos(theta);
      const py = pt.y + rad * Math.sin(phi) * Math.sin(theta);
      const pz = pt.z + rad * Math.cos(phi) * 1.2;

      particleBasePositions[p * 3] = px;
      particleBasePositions[p * 3 + 1] = py;
      particleBasePositions[p * 3 + 2] = pz;

      // Streamline origin in deep space along flow vectors
      const distFactor = 0.3 + Math.random() * 0.7;
      const flowCone = 1.0 + distFactor * 2.5;
      const streamAngle = (Math.random() - 0.5) * Math.PI * 2.2;
      particleStreamAngles[p] = streamAngle;

      const sx = px * flowCone + Math.cos(streamAngle) * (4.0 + distFactor * 16.0);
      const sy = py * flowCone + Math.sin(streamAngle) * (3.0 + distFactor * 13.0);
      const sz = pz + 26.0 + distFactor * 52.0;

      particleScatterPositions[p * 3] = sx;
      particleScatterPositions[p * 3 + 1] = sy;
      particleScatterPositions[p * 3 + 2] = sz;

      particleRandomDelays[p] = Math.random() * 0.28;

      if (isIntroActive) {
        particlePositions[p * 3] = sx;
        particlePositions[p * 3 + 1] = sy;
        particlePositions[p * 3 + 2] = sz;
      } else {
        particlePositions[p * 3] = px;
        particlePositions[p * 3 + 1] = py;
        particlePositions[p * 3 + 2] = pz;
      }

      // Aesthetic Stardust & Aurora Palette matching reference with vivid brilliance
      let r = 1.0;
      let g = 1.0;
      let b = 1.0;

      if (px > 1.4 && py > 0.05) {
        const nebulaMix = Math.random();
        if (nebulaMix < 0.38) {
          // Luminous violet-amethyst stardust
          r = 0.82 + Math.random() * 0.16;
          g = 0.68 + Math.random() * 0.18;
          b = 1.0;
        } else if (nebulaMix < 0.70) {
          // Celestial teal-cyan stardust
          r = 0.52 + Math.random() * 0.2;
          g = 0.90 + Math.random() * 0.1;
          b = 1.0;
        } else if (nebulaMix < 0.86) {
          // Platinum-champagne warm highlight
          r = 1.0;
          g = 0.88 + Math.random() * 0.12;
          b = 0.62 + Math.random() * 0.18;
        }
      } else if (px > -0.5 && px < 2.5) {
        // Bright radiant core
        const intensity = 0.96 + Math.random() * 0.04;
        r = intensity;
        g = intensity;
        b = intensity * 1.02;
      } else {
        // Ambient starlight with clear visibility
        const brightness = 0.64 + Math.random() * 0.36;
        r = brightness;
        g = brightness;
        b = brightness * 1.05;
      }

      particleColors[p * 3] = r;
      particleColors[p * 3 + 1] = g;
      particleColors[p * 3 + 2] = b;

      particleBaseColors[p * 3] = r;
      particleBaseColors[p * 3 + 1] = g;
      particleBaseColors[p * 3 + 2] = b;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particlesMesh = new THREE.Points(particleGeometry, particleMaterial);
    rootGroup.add(particlesMesh);
    particlesMeshRef.current = particlesMesh;
    particleBasePosRef.current = particleBasePositions;
    particleScatterPosRef.current = particleScatterPositions;
    particleStreamAnglesRef.current = particleStreamAngles;
    particleRandomDelaysRef.current = particleRandomDelays;
    particleBaseColorsRef.current = particleBaseColors;

    // --- 5. Pure Intuitive Event Listeners (Natural page scrolling preserved) ---
    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      mousePos.current.targetX = normX;
      mousePos.current.targetY = normY;

      audio.modulate(normX, (normY + 1) / 2);

      if (isDragging.current && introFinishedRef.current) {
        const deltaX = e.clientX - previousPointer.current.x;
        const deltaY = e.clientY - previousPointer.current.y;
        targetEuler.current.y += deltaX * 0.005;
        targetEuler.current.x += deltaY * 0.005;
        targetEuler.current.x = Math.max(-0.6, Math.min(0.6, targetEuler.current.x));
        previousPointer.current = { x: e.clientX, y: e.clientY };
      }
    };

    const onPointerDown = (e: MouseEvent) => {
      if (!introFinishedRef.current) return;
      isDragging.current = true;
      previousPointer.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      isDragging.current = false;
    };

    const handleClick = (e: MouseEvent) => {
      if (!introFinishedRef.current) return;
      const rect = container.getBoundingClientRect();
      const ndcX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ndcY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(ndcX, ndcY), camera);
      const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
      const intersection = new THREE.Vector3();
      raycaster.ray.intersectPlane(plane, intersection);

      triggerPulse(intersection);
    };

    container.addEventListener('mousemove', onPointerMove);
    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mouseup', onPointerUp);
    container.addEventListener('click', handleClick);

    // Touch support for mobile (maintaining natural vertical touch scroll)
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const normX = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        const normY = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
        mousePos.current.targetX = normX;
        mousePos.current.targetY = normY;

        if (isDragging.current && introFinishedRef.current) {
          const deltaX = touch.clientX - previousPointer.current.x;
          const deltaY = touch.clientY - previousPointer.current.y;
          targetEuler.current.y += deltaX * 0.007;
          targetEuler.current.x += deltaY * 0.007;
          previousPointer.current = { x: touch.clientX, y: touch.clientY };
        }
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      if (!introFinishedRef.current) return;
      if (e.touches.length === 1) {
        isDragging.current = true;
        previousPointer.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    container.addEventListener('touchmove', onTouchMove, { passive: true });
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);

      if (rootTransformRef.current) {
        if (w >= 1024) {
          rootTransformRef.current.position.set(2.8, 0.1, 0);
          rootTransformRef.current.scale.set(0.95, 0.95, 0.95);
        } else if (w >= 768) {
          rootTransformRef.current.position.set(1.4, 0.4, 0);
          rootTransformRef.current.scale.set(0.85, 0.85, 0.85);
        } else {
          rootTransformRef.current.position.set(0, 1.4, -2);
          rootTransformRef.current.scale.set(0.72, 0.72, 0.72);
        }
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // --- 6. Seamless Cinematic Flow Animation Loop ---
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const delta = clockRef.current.getDelta();
      const elapsedTime = clockRef.current.getElapsedTime();

      // Intro sequence handling
      if (!introFinishedRef.current) {
        introTimerRef.current += delta;
        const t = introTimerRef.current;

        // Stage 0: 0.0s to 0.3s = Blank screen
        if (t < 0.3) {
          if (particlesMeshRef.current) {
            (particlesMeshRef.current.material as THREE.PointsMaterial).opacity = 0;
          }
          cageMaterialsRef.current.forEach((m) => (m.opacity = 0));
          ribbonMaterialsRef.current.forEach((m) => (m.opacity = 0));
          if (cameraRef.current) {
            cameraRef.current.position.set(0, 0, 70);
            cameraRef.current.fov = 65;
            cameraRef.current.updateProjectionMatrix();
          }
        } else {
          const activeDuration = INTRO_DURATION - 0.3;
          const progress = Math.min(1, (t - 0.3) / activeDuration);

          // Smooth decelerating interstellar camera flight: 70 -> 21.5
          const easeZoom = 1 - Math.pow(1 - progress, 3.2);

          if (cameraRef.current) {
            cameraRef.current.position.z = THREE.MathUtils.lerp(70, 21.5, easeZoom);
            cameraRef.current.fov = THREE.MathUtils.lerp(65, 42, easeZoom);
            cameraRef.current.updateProjectionMatrix();
          }

          // Rich particle fade-in to vibrant 0.98
          const particleFade = Math.min(0.98, (progress / 0.2) * 0.98);
          if (particlesMeshRef.current) {
            (particlesMeshRef.current.material as THREE.PointsMaterial).opacity = particleFade;
          }

          // Cage fades in sharply when the system centers
          const cageFade = Math.max(0, Math.min(1, (progress - 0.7) / 0.26));
          cageMaterialsRef.current.forEach((m, idx) => {
            const maxOp = idx === 0 ? 0.95 : idx === 1 ? 0.45 : 0.55;
            m.opacity = cageFade * maxOp;
          });

          // Ribbons weave in harmoniously as particles converge
          const ribbonFade = Math.max(0, Math.min(1, (progress - 0.65) / 0.3));
          ribbonMaterialsRef.current.forEach((m) => {
            m.opacity = ribbonFade * 0.94;
          });

          // Natural completion
          if (progress >= 1.0) {
            introFinishedRef.current = true;
            audio.playIntroResolve();
            triggerPulse(new THREE.Vector3(0, 0, 0));
            if (onIntroComplete) {
              onIntroComplete();
            }
          }
        }
      }

      // Smooth mouse lerp
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.08;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.08;

      // Smooth rotation damping
      rotationEuler.current.x += (targetEuler.current.x - rotationEuler.current.x) * 0.06;
      rotationEuler.current.y += (targetEuler.current.y - rotationEuler.current.y) * 0.06;

      // Parallax subtle tilt from cursor (scaled during intro)
      const cursorTiltScale = introFinishedRef.current ? 1.0 : 0.15;
      if (rootTransformRef.current) {
        rootTransformRef.current.rotation.x = rotationEuler.current.x + mousePos.current.y * 0.07 * cursorTiltScale;
        rootTransformRef.current.rotation.y = rotationEuler.current.y + mousePos.current.x * 0.11 * cursorTiltScale;
      }

      // Shockwave propagation
      for (let s = shockwaves.current.length - 1; s >= 0; s--) {
        const sw = shockwaves.current[s];
        sw.radius += delta * 15;
        sw.strength *= 0.93;
        if (sw.radius > sw.maxRadius || sw.strength < 0.01) {
          shockwaves.current.splice(s, 1);
        }
      }

      // Cursor position mapped to 3D world space
      const cursorWorldX = mousePos.current.x * boxW * 0.52;
      const cursorWorldY = mousePos.current.y * boxH * 0.52;

      // Dynamic morphing of isolines (ribbons):
      // AESTHETIC HARMONIC UNDULATION - ZERO HOLE PUNCHING / NO REPULSION VOID
      const timeParam = elapsedTime * config.morphSpeed;
      const hoverAuraRadius = 2.4;
      const hoverAuraRadiusSq = hoverAuraRadius * hoverAuraRadius;

      if (ribbonLines.length > 0) {
        for (let i = 0; i < ribbonLines.length; i++) {
          const v = i / (ribbonLines.length - 1);
          const line = ribbonLines[i];
          const posAttr = line.geometry.attributes.position as THREE.BufferAttribute;
          const posArray = posAttr.array as Float32Array;

          for (let j = 0; j < samplesPerRibbon; j++) {
            const u = (j / (samplesPerRibbon - 1)) * 0.54;
            const pt = evalTopology(u, v, timeParam, config.dispersion);

            // Subtle gentle forward wave toward camera on hover (silk-like tension, NO sideways hole)
            const dx = pt.x - cursorWorldX;
            const dy = pt.y - cursorWorldY;
            const distSq = dx * dx + dy * dy;
            let liftZ = 0;

            if (distSq < hoverAuraRadiusSq && introFinishedRef.current) {
              const dist = Math.sqrt(distSq);
              // Smooth cosine bell
              const falloff = 0.5 * (1 + Math.cos((dist / hoverAuraRadius) * Math.PI));
              liftZ = falloff * 0.22; // Gentle forward lift, zero sideways displacement
            }

            // Shockwave perturbation
            let shockDelta = 0;
            for (const sw of shockwaves.current) {
              const swDist = Math.sqrt((pt.x - sw.x) ** 2 + (pt.y - sw.y) ** 2 + (pt.z - sw.z) ** 2);
              const distFromWave = Math.abs(swDist - sw.radius);
              if (distFromWave < 1.6) {
                shockDelta += Math.sin((1 - distFromWave / 1.6) * Math.PI) * sw.strength * 0.7;
              }
            }

            posArray[j * 3] = pt.x;
            posArray[j * 3 + 1] = pt.y + shockDelta * 0.4;
            posArray[j * 3 + 2] = pt.z + liftZ + shockDelta * 0.5;
          }
          posAttr.needsUpdate = true;
        }
      }

      // Dynamic morphing of particles:
      // AESTHETIC CELESTIAL SHIMMER & LUMINESCENCE - ZERO BLACK HOLE / VOID!
      if (
        particlesMeshRef.current &&
        particleBasePosRef.current &&
        particleScatterPosRef.current &&
        particleStreamAnglesRef.current &&
        particleRandomDelaysRef.current &&
        particleBaseColorsRef.current
      ) {
        const posAttr = particlesMeshRef.current.geometry.attributes.position as THREE.BufferAttribute;
        const colorAttr = particlesMeshRef.current.geometry.attributes.color as THREE.BufferAttribute;
        const posArray = posAttr.array as Float32Array;
        const colArray = colorAttr.array as Float32Array;

        const basePos = particleBasePosRef.current;
        const scatterPos = particleScatterPosRef.current;
        const streamAngles = particleStreamAnglesRef.current;
        const delays = particleRandomDelaysRef.current;
        const baseColors = particleBaseColorsRef.current;
        const count = posArray.length / 3;

        const curT = introTimerRef.current;
        const activeT = Math.max(0, curT - 0.3);
        const flightTotalTime = INTRO_DURATION - 0.3;

        for (let p = 0; p < count; p++) {
          const idx = p * 3;
          const bx = basePos[idx];
          const by = basePos[idx + 1];
          const bz = basePos[idx + 2];

          let curX = bx;
          let curY = by;
          let curZ = bz;

          if (!introFinishedRef.current) {
            const pDelay = delays[p];
            const pNorm = Math.max(0, Math.min(1, (activeT - pDelay * 0.8) / (flightTotalTime - 0.4)));
            const easeFlow = 1 - Math.pow(1 - pNorm, 3.4);

            const sx = scatterPos[idx];
            const sy = scatterPos[idx + 1];
            const sz = scatterPos[idx + 2];
            const stAngle = streamAngles[p];

            const remaining = 1 - easeFlow;
            const swirl = remaining * remaining * stAngle * 1.6;
            const radFactor = Math.pow(remaining, 1.8);

            const offX = (sx - bx) * radFactor;
            const offY = (sy - by) * radFactor;

            curX = bx + offX * Math.cos(swirl) - offY * Math.sin(swirl);
            curY = by + offX * Math.sin(swirl) + offY * Math.cos(swirl);
            curZ = THREE.MathUtils.lerp(sz, bz, easeFlow);
          }

          // Subtle organic micro-drift (living breathing particles)
          const driftX = Math.sin(elapsedTime * 0.35 + p * 0.1) * 0.08 * config.dispersion;
          const driftY = Math.cos(elapsedTime * 0.4 + p * 0.08) * 0.09 * config.dispersion;
          const driftZ = Math.sin(elapsedTime * 0.25 + p * 0.05) * 0.1 * config.dispersion;

          // AESTHETIC MOUSE INTERACTION:
          // Particles DO NOT flee or push away! No hole/void forms.
          // Instead, particles under the cursor softly catch light (luminescence starlight aura)
          // and gently float forward along Z like shimmering diamond dust.
          const baseR = baseColors[idx];
          const baseG = baseColors[idx + 1];
          const baseB = baseColors[idx + 2];

          let liftZ = 0;
          let lumBoost = 0;

          if (introFinishedRef.current) {
            const mdx = curX - cursorWorldX;
            const mdy = curY - cursorWorldY;
            const distSq = mdx * mdx + mdy * mdy;

            if (distSq < hoverAuraRadiusSq) {
              const dist = Math.sqrt(distSq);
              // Soft Gaussian-like bell falloff
              const falloff = 0.5 * (1 + Math.cos((dist / hoverAuraRadius) * Math.PI));
              // Gentle wave lift along Z - zero X/Y void punching!
              liftZ = falloff * 0.28;
              lumBoost = falloff * 0.65;
            }
          }

          // Dynamic color with iridescent starlight shimmer under cursor
          colArray[idx] = Math.min(1.0, baseR + lumBoost * (1.0 - baseR * 0.3));
          colArray[idx + 1] = Math.min(1.0, baseG + lumBoost * (1.0 - baseG * 0.3));
          colArray[idx + 2] = Math.min(1.0, baseB + lumBoost * 0.4);

          // Shockwave ripple
          let swOffset = 0;
          for (const sw of shockwaves.current) {
            const swDist = Math.sqrt((bx - sw.x) ** 2 + (by - sw.y) ** 2 + (bz - sw.z) ** 2);
            const distDiff = Math.abs(swDist - sw.radius);
            if (distDiff < 1.8) {
              const waveShape = Math.sin((1 - distDiff / 1.8) * Math.PI);
              swOffset += waveShape * sw.strength * 1.4;
            }
          }

          posArray[idx] = curX + driftX + (swOffset ? (bx / (Math.abs(bx) + 1)) * swOffset : 0);
          posArray[idx + 1] = curY + driftY + swOffset;
          posArray[idx + 2] = curZ + driftZ + liftZ + swOffset * 0.5;
        }

        posAttr.needsUpdate = true;
        colorAttr.needsUpdate = true;
      }

      // Render
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }

      // Telemetry update if provided
      frameCount.current++;
      const now = performance.now();
      if (now - lastTime.current >= 600) {
        currentFps.current = Math.round((frameCount.current * 1000) / (now - lastTime.current));
        frameCount.current = 0;
        lastTime.current = now;

        if (onTelemetryUpdate && cameraRef.current) {
          onTelemetryUpdate({
            fps: currentFps.current,
            particlesCount: particleCount,
            isolinesCount: numRibbons,
            entropy: Number((config.dispersion * 0.84 + Math.abs(mousePos.current.x) * 0.16).toFixed(3)),
            camPos: [
              Number(cameraRef.current.position.x.toFixed(1)),
              Number(cameraRef.current.position.y.toFixed(1)),
              Number(cameraRef.current.position.z.toFixed(1)),
            ],
          });
        }
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      container.removeEventListener('mousemove', onPointerMove);
      container.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mouseup', onPointerUp);
      container.removeEventListener('click', handleClick);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onPointerUp);

      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [config.theme, config.particleSize]);

  return (
    <div className="relative w-full h-full select-none cursor-grab active:cursor-grabbing bg-black">
      <div ref={containerRef} id="webgl-canvas-container" className="w-full h-full" />
    </div>
  );
};
