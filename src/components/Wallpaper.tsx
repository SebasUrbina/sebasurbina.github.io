import { useEffect, useRef } from "react";

type WallpaperProps = {
  colors: { lime: string; pink: string; blue: string; gold: string; muted: string };
};

type Node = { x: number; y: number; vx: number; vy: number; r: number; color: string };
type Pulse = { from: Node; to: Node; t: number; speed: number; color: string };

const LINK_DISTANCE = 150;
const POINTER_DISTANCE = 190;

export function Wallpaper({ colors }: WallpaperProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const palette = [colors.lime, colors.pink, colors.blue, colors.gold];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: -9999, y: -9999 };
    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    let frame = 0;
    let lastPulse = 0;

    const createNode = (): Node => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      r: Math.random() * 1.4 + 0.8,
      color: palette[Math.floor(Math.random() * palette.length)],
    });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(Math.max((width * height) / 21000, 28), 85));
      nodes = Array.from({ length: count }, createNode);
      pulses = [];
    };

    const spawnPulse = () => {
      const from = nodes[Math.floor(Math.random() * nodes.length)];
      let to: Node | null = null;
      let best = LINK_DISTANCE;
      for (const node of nodes) {
        if (node === from) continue;
        const d = Math.hypot(node.x - from.x, node.y - from.y);
        if (d < best) {
          best = d;
          to = node;
        }
      }
      if (to) pulses.push({ from, to, t: 0, speed: 0.012 + Math.random() * 0.01, color: from.color });
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      for (const node of nodes) {
        if (!reduced) {
          node.x += node.vx;
          node.y += node.vy;
          if (node.x < 0 || node.x > width) node.vx *= -1;
          if (node.y < 0 || node.y > height) node.vy *= -1;
        }
      }

      ctx.lineWidth = 1;
      ctx.strokeStyle = colors.muted;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d > LINK_DISTANCE) continue;
          ctx.globalAlpha = (1 - d / LINK_DISTANCE) * 0.22;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
        const pd = Math.hypot(a.x - pointer.x, a.y - pointer.y);
        if (pd < POINTER_DISTANCE) {
          ctx.globalAlpha = (1 - pd / POINTER_DISTANCE) * 0.5;
          ctx.strokeStyle = a.color;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(pointer.x, pointer.y);
          ctx.stroke();
          ctx.strokeStyle = colors.muted;
        }
      }

      for (const node of nodes) {
        ctx.globalAlpha = 0.75;
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduced) {
        if (time - lastPulse > 420 && pulses.length < 14) {
          spawnPulse();
          lastPulse = time;
        }
        pulses = pulses.filter((pulse) => pulse.t < 1);
        for (const pulse of pulses) {
          pulse.t += pulse.speed;
          const x = pulse.from.x + (pulse.to.x - pulse.from.x) * pulse.t;
          const y = pulse.from.y + (pulse.to.y - pulse.from.y) * pulse.t;
          ctx.fillStyle = pulse.color;
          ctx.globalAlpha = 0.18;
          ctx.beginPath();
          ctx.arc(x, y, 6, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 0.95;
          ctx.beginPath();
          ctx.arc(x, y, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (time: number) => {
      draw(time);
      frame = window.requestAnimationFrame(loop);
    };

    const start = () => {
      window.cancelAnimationFrame(frame);
      if (reduced) draw(0);
      else frame = window.requestAnimationFrame(loop);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    };
    const onPointerLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };
    const onResize = () => {
      resize();
      if (reduced) draw(0);
    };
    const onVisibility = () => {
      if (document.hidden) window.cancelAnimationFrame(frame);
      else start();
    };

    resize();
    start();
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [colors]);

  return <canvas ref={ref} className="wallpaper" aria-hidden="true" />;
}
