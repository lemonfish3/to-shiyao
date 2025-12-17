import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  twinklePhase: number;
  twinkleSpeed: number;
}

interface Meteor {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  alpha: number;
}

interface ClickBurst {
  x: number;
  y: number;
  age: number;
  particles: {
    vx: number;
    vy: number;
    size: number;
  }[];
}

export const BackgroundEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const burstsRef = useRef<ClickBurst[]>([]);
  const meteorsRef = useRef<Meteor[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      // High density for a starry sky feel
      const count = Math.floor((window.innerWidth * window.innerHeight) / 4000); 
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.2 + 0.3, // Tiny dots
          baseAlpha: Math.random() * 0.4 + 0.1, // Faint
          twinklePhase: Math.random() * Math.PI * 2,
          // Much slower twinkle speed for a gentle, deep space effect
          twinkleSpeed: Math.random() * 0.001 + 0.0002,
        });
      }
    };

    const spawnMeteor = () => {
      // Spawn meteors occasionally
      if (Math.random() < 0.008) { // Adjust frequency here
        const startX = Math.random() * canvas.width;
        // Start from top or right side mostly
        const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.5; // ~45 degrees
        const speed = Math.random() * 10 + 5;
        
        meteorsRef.current.push({
          x: Math.random() < 0.5 ? Math.random() * canvas.width : canvas.width + 50,
          y: Math.random() < 0.5 ? -50 : Math.random() * canvas.height * 0.5,
          vx: -Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          length: Math.random() * 80 + 20,
          alpha: 1,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = Date.now();

      // 1. Draw Static/Twinkling Stars
      ctx.fillStyle = '#e7e5e4'; // stone-200
      stars.forEach(star => {
        // Twinkle calculation
        const twinkle = Math.sin(now * star.twinkleSpeed + star.twinklePhase);
        const alpha = star.baseAlpha + (twinkle * 0.1); 

        ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Draw Meteors
      spawnMeteor();
      for (let i = meteorsRef.current.length - 1; i >= 0; i--) {
        const m = meteorsRef.current[i];
        m.x += m.vx;
        m.y += m.vy;
        m.alpha -= 0.01; // Fade out trail

        if (m.alpha <= 0 || m.x < -100 || m.y > canvas.height + 100) {
          meteorsRef.current.splice(i, 1);
          continue;
        }

        // Draw meteor trail
        const gradient = ctx.createLinearGradient(m.x, m.y, m.x - m.vx * 3, m.y - m.vy * 3);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${m.alpha})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - m.vx * (m.length / 10), m.y - m.vy * (m.length / 10));
        ctx.stroke();
        
        // Meteor head
        ctx.fillStyle = `rgba(255, 255, 255, ${m.alpha})`;
        ctx.beginPath();
        ctx.arc(m.x, m.y, 1, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Draw Click Bursts (Existing Logic)
      for (let i = burstsRef.current.length - 1; i >= 0; i--) {
        const burst = burstsRef.current[i];
        burst.age++;

        if (burst.age > 50) {
          burstsRef.current.splice(i, 1);
          continue;
        }

        const progress = burst.age / 50;
        const opacity = 1 - progress;

        // Expanding Ring
        ctx.beginPath();
        ctx.arc(burst.x, burst.y, burst.age * 1.5, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(231, 229, 228, ${opacity * 0.5})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Bursting Particles
        burst.particles.forEach(p => {
          const x = burst.x + p.vx * burst.age;
          const y = burst.y + p.vy * burst.age;
          
          ctx.globalAlpha = opacity * 0.8;
          ctx.fillStyle = '#e7e5e4';
          ctx.beginPath();
          ctx.arc(x, y, p.size, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleClick = (e: MouseEvent) => {
      const burstParticles = [];
      const particleCount = 8;
      for (let i = 0; i < particleCount; i++) {
         const angle = (Math.PI * 2 * i) / particleCount;
         const speed = Math.random() * 2 + 1;
         burstParticles.push({
           vx: Math.cos(angle) * speed,
           vy: Math.sin(angle) * speed,
           size: Math.random() * 1.5 + 0.5,
         });
      }
      
      burstsRef.current.push({
        x: e.clientX,
        y: e.clientY,
        age: 0,
        particles: burstParticles
      });
    };

    window.addEventListener('resize', resize);
    window.addEventListener('click', handleClick);
    
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0 mix-blend-screen"
    />
  );
};