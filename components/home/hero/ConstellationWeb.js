import React, { useEffect, useRef } from "react";
import styles from "./constellation.module.scss";

export const ConstellationWeb = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    let animId = null;
    let width = 0;
    let height = 0;
    let isVisible = true;

    // Cyber & Gold Palette: Neon Turquoise (#15D1CE) and Game Gold (#FFB81E)
    const COLORS = [
      "rgba(21, 209, 206, ", // Neon Turquoise Blue (#15D1CE)
      "rgba(255, 184, 30, ",  // Warm Game Gold (#FFB81E)
    ];

    // Pre-render seamless radial bloom sprites with smooth falloff to 0 alpha
    const createBloomSprite = (rgbStr) => {
      const size = 64;
      const offscreen = document.createElement("canvas");
      offscreen.width = size;
      offscreen.height = size;
      const octx = offscreen.getContext("2d");
      const center = size / 2;

      const grad = octx.createRadialGradient(center, center, 0, center, center, center);
      grad.addColorStop(0, `rgba(${rgbStr}, 0.9)`);
      grad.addColorStop(0.25, `rgba(${rgbStr}, 0.55)`);
      grad.addColorStop(0.55, `rgba(${rgbStr}, 0.2)`);
      grad.addColorStop(0.8, `rgba(${rgbStr}, 0.05)`);
      grad.addColorStop(1, `rgba(${rgbStr}, 0)`);

      octx.fillStyle = grad;
      octx.beginPath();
      octx.arc(center, center, center, 0, Math.PI * 2);
      octx.fill();
      return offscreen;
    };

    const bloomTurquoise = createBloomSprite("21, 209, 206");
    const bloomGold = createBloomSprite("255, 184, 30");

    let mouse = {
      x: -1000,
      y: -1000,
      radius: 140,
      radiusSq: 140 * 140,
    };

    let particles = [];
    let ripples = [];

    // Smooth perpetual drift matching grid-previews/index.html Style 2
    const initConstellation = () => {
      particles = [];
      const count = Math.min(65, Math.max(38, Math.floor((width * height) / 9000)));

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 1.1,
          vy: (Math.random() - 0.5) * 1.1,
          size: Math.random() * 2 + 1.6,
          color: COLORS[i % COLORS.length],
        });
      }
    };

    const resize = () => {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (particles.length === 0) {
        initConstellation();
      } else {
        particles.forEach((p) => {
          p.x = Math.max(0, Math.min(width, p.x));
          p.y = Math.max(0, Math.min(height, p.y));
        });
      }
    };

    const createShockwave = (x, y) => {
      ripples.push({
        x,
        y,
        radius: 0,
        maxRadius: Math.max(width, height) * 0.85,
        speed: 12,
        alpha: 1,
        color: Math.random() > 0.5 ? "rgba(21, 209, 206, " : "rgba(255, 184, 30, ",
      });
    };

    // Scoped Hero Section Mouse & Touch Tracking (allowing text selection)
    const heroSection = container.parentElement || container;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleClick = (e) => {
      // Do not trigger shockwave if clicking interactive buttons/links or when selecting text
      if (e.target.closest("button") || e.target.closest("a")) return;
      const selection = window.getSelection ? window.getSelection().toString() : "";
      if (selection && selection.length > 0) return;

      const rect = canvas.getBoundingClientRect();
      createShockwave(e.clientX - rect.left, e.clientY - rect.top);
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.touches[0].clientX - rect.left;
        mouse.y = e.touches[0].clientY - rect.top;
      }
    };

    const handleTouchEnd = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleTouchStart = (e) => {
      if (e.touches && e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        const touchX = e.touches[0].clientX - rect.left;
        const touchY = e.touches[0].clientY - rect.top;
        mouse.x = touchX;
        mouse.y = touchY;
        createShockwave(touchX, touchY);
      }
    };

    const handleBlastEvent = (e) => {
      if (e.detail) {
        createShockwave(e.detail.x || width * 0.35, e.detail.y || height * 0.5);
      } else {
        createShockwave(width * 0.35, height * 0.5);
      }
    };

    heroSection.addEventListener("mousemove", handleMouseMove, { passive: true });
    heroSection.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    heroSection.addEventListener("click", handleClick);
    heroSection.addEventListener("touchstart", handleTouchStart, { passive: true });
    heroSection.addEventListener("touchmove", handleTouchMove, { passive: true });
    heroSection.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("hero-trigger-blast", handleBlastEvent);

    // Optimized Render Loop
    const maxConnect = 130;
    const maxConnectSq = maxConnect * maxConnect;

    const loop = () => {
      if (!isVisible) {
        animId = null;
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Perpetual drift physics matching Style 2 in grid-previews/index.html
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Constant smooth drift (no artificial damping, no jitter pulses)
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Smooth boundary reflection
        if (p1.x < 0) {
          p1.x = 0;
          p1.vx = Math.abs(p1.vx);
        } else if (p1.x > width) {
          p1.x = width;
          p1.vx = -Math.abs(p1.vx);
        }

        if (p1.y < 0) {
          p1.y = 0;
          p1.vy = Math.abs(p1.vy);
        } else if (p1.y > height) {
          p1.y = height;
          p1.vy = -Math.abs(p1.vy);
        }

        // Mouse repulsion (offsets position directly without disturbing base velocity)
        const dx = p1.x - mouse.x;
        const dy = p1.y - mouse.y;
        const mDistSq = dx * dx + dy * dy;
        if (mDistSq < mouse.radiusSq && mDistSq > 0) {
          const mDist = Math.sqrt(mDistSq);
          const force = (1 - mDist / mouse.radius) * 2;
          p1.x += (dx / mDist) * force;
          p1.y += (dy / mDist) * force;
        }

        // Connect lines to nearby nodes using squared distance check
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const ldx = p1.x - p2.x;
          const ldy = p1.y - p2.y;
          const distSq = ldx * ldx + ldy * ldy;

          if (distSq < maxConnectSq) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / maxConnect) * 0.35;
            ctx.strokeStyle = p1.color + `${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Seamless optical bloom with smooth radial falloff and reduced radius
        const bloomRadius = p1.size * 1.45;
        const sprite = p1.color.includes("255, 184, 30") ? bloomGold : bloomTurquoise;
        ctx.drawImage(
          sprite,
          p1.x - bloomRadius,
          p1.y - bloomRadius,
          bloomRadius * 2,
          bloomRadius * 2
        );

        // Crisp luminous particle core
        ctx.fillStyle = p1.color + "0.95)";
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.size * 0.75, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw Shockwaves
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rip = ripples[i];
        rip.radius += rip.speed;
        rip.alpha = 1 - rip.radius / rip.maxRadius;
        if (rip.alpha <= 0) {
          ripples.splice(i, 1);
          continue;
        }

        // Primary ripple ring
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.strokeStyle = rip.color + `${rip.alpha * 0.65})`;
        ctx.lineWidth = 2.4;
        ctx.stroke();

        // Secondary echo ring
        if (rip.radius > 18) {
          ctx.beginPath();
          ctx.arc(rip.x, rip.y, Math.max(0, rip.radius - 18), 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 184, 30, ${rip.alpha * 0.35})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(loop);
    };

    // IntersectionObserver: Pause rendering completely when off-screen!
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible && !animId) {
            animId = requestAnimationFrame(loop);
          }
        });
      },
      { rootMargin: "100px 0px 100px 0px", threshold: 0 }
    );
    intersectionObserver.observe(container);

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(container);

    resize();
    animId = requestAnimationFrame(loop);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      heroSection.removeEventListener("mousemove", handleMouseMove);
      heroSection.removeEventListener("mouseleave", handleMouseLeave);
      heroSection.removeEventListener("click", handleClick);
      heroSection.removeEventListener("touchstart", handleTouchStart);
      heroSection.removeEventListener("touchmove", handleTouchMove);
      heroSection.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("hero-trigger-blast", handleBlastEvent);
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.constellationContainer}>
      <canvas ref={canvasRef} className={styles.constellationCanvas} />
    </div>
  );
};
