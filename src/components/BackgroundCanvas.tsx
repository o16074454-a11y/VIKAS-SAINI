import React, { useEffect, useRef } from 'react';
import { TimeMood } from '../types';

interface BackgroundCanvasProps {
  mood: TimeMood;
  crtFlicker: boolean;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  pulseSpeed: number;
  pulseVal: number;
  type: 'dust' | 'firefly' | 'pollen' | 'star';
}

export const BackgroundCanvas: React.FC<BackgroundCanvasProps> = ({ mood, crtFlicker }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Generate mood-specific particles
    const particleCount = mood === 'night' ? 90 : 65;
    const particles: Particle[] = [];

    const getParticleProps = (m: TimeMood): { color: string; type: Particle['type']; sizeMax: number } => {
      switch (m) {
        case 'morning':
          return { color: 'rgba(251, 191, 36, ', type: 'pollen', sizeMax: 3.5 };
        case 'afternoon':
          return { color: 'rgba(134, 239, 172, ', type: 'dust', sizeMax: 2.8 };
        case 'sunset':
          return { color: 'rgba(249, 115, 22, ', type: 'firefly', sizeMax: 4 };
        case 'night':
          return { color: 'rgba(187, 247, 208, ', type: 'star', sizeMax: 3 };
      }
    };

    const cfg = getParticleProps(mood);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * cfg.sizeMax + 1,
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: (Math.random() - 0.5) * 0.6 - (mood === 'sunset' || mood === 'night' ? 0.2 : 0),
        opacity: Math.random() * 0.7 + 0.2,
        color: cfg.color,
        pulseSpeed: Math.random() * 0.04 + 0.01,
        pulseVal: Math.random() * Math.PI * 2,
        type: cfg.type,
      });
    }

    let tick = 0;

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      // Draw subtle background mood gradient
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      if (mood === 'morning') {
        bgGrad.addColorStop(0, '#152b1b');
        bgGrad.addColorStop(0.5, '#243e26');
        bgGrad.addColorStop(1, '#3b2f15');
      } else if (mood === 'afternoon') {
        bgGrad.addColorStop(0, '#132815');
        bgGrad.addColorStop(0.6, '#1e381f');
        bgGrad.addColorStop(1, '#0e1d0f');
      } else if (mood === 'sunset') {
        bgGrad.addColorStop(0, '#2c151b');
        bgGrad.addColorStop(0.5, '#3b2316');
        bgGrad.addColorStop(1, '#182415');
      } else {
        // night
        bgGrad.addColorStop(0, '#060d09');
        bgGrad.addColorStop(0.6, '#091510');
        bgGrad.addColorStop(1, '#020503');
      }

      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Sunbeam / Ambient Glow
      if (mood === 'morning' || mood === 'sunset') {
        const glowX = mood === 'morning' ? width * 0.15 : width * 0.85;
        const radial = ctx.createRadialGradient(glowX, height * 0.2, 10, glowX, height * 0.2, width * 0.65);
        radial.addColorStop(0, mood === 'morning' ? 'rgba(251, 191, 36, 0.18)' : 'rgba(249, 115, 22, 0.2)');
        radial.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = radial;
        ctx.fillRect(0, 0, width, height);
      }

      // Draw Particles
      particles.forEach((p) => {
        p.pulseVal += p.pulseSpeed;
        const currentOpacity = Math.max(0.1, p.opacity * (0.6 + 0.4 * Math.sin(p.pulseVal)));

        p.x += p.speedX;
        p.y += p.speedY;

        // Boundary wrap
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        if (mood === 'night' || mood === 'sunset') {
          // Firefly halo
          ctx.shadowBlur = 12;
          ctx.shadowColor = mood === 'night' ? 'rgba(134, 239, 172, 0.8)' : 'rgba(251, 146, 60, 0.8)';
        } else {
          ctx.shadowBlur = 4;
          ctx.shadowColor = 'rgba(251, 191, 36, 0.4)';
        }

        ctx.fillStyle = `${p.color}${currentOpacity})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Subtle CRT raster line simulation on canvas
      if (crtFlicker) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        for (let y = 0; y < height; y += 4) {
          ctx.fillRect(0, y, width, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [mood, crtFlicker]);

  return (
    <canvas
      ref={canvasRef}
      id="village-background-canvas"
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
    />
  );
};
