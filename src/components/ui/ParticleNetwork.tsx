import { useEffect, useRef } from "react";

interface Particle {
    x: number; y: number;
    vx: number; vy: number;
    radius: number;
    opacity: number;
    isHub: boolean;
    pulse: number;   // 0‒2π phase for pulsing
}

const COUNT      = 50;
const MAX_DIST   = 100;
const MOUSE_R    = 140;
const MAX_SPEED  = 1.2;

export default function ParticleNetwork() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouse     = useRef({ x: -9999, y: -9999 });

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx    = canvas.getContext("2d")!;
        let raf: number;
        let particles: Particle[] = [];

        const resize = () => {
            canvas.width  = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };

        const spawn = () => {
            resize();
            particles = Array.from({ length: COUNT }, (_, i) => ({
                x:       Math.random() * canvas.width,
                y:       Math.random() * canvas.height,
                vx:      (Math.random() - 0.5) * 0.5,
                vy:      (Math.random() - 0.5) * 0.5,
                radius:  i < 6 ? Math.random() * 2 + 2.5 : Math.random() * 1.2 + 0.5,
                opacity: Math.random() * 0.55 + 0.2,
                isHub:   i < 6,
                pulse:   Math.random() * Math.PI * 2,
            }));
        };

        const tick = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const { x: mx, y: my } = mouse.current;

            particles.forEach(p => {
                // Mouse repulsion
                const dx = p.x - mx, dy = p.y - my;
                const d  = Math.hypot(dx, dy);
                if (d < MOUSE_R && d > 1) {
                    const f = ((MOUSE_R - d) / MOUSE_R) ** 2 * 1.2;
                    p.vx += (dx / d) * f * 0.12;
                    p.vy += (dy / d) * f * 0.12;
                }

                // Speed cap + friction
                const spd = Math.hypot(p.vx, p.vy);
                if (spd > MAX_SPEED) { p.vx = (p.vx / spd) * MAX_SPEED; p.vy = (p.vy / spd) * MAX_SPEED; }
                p.vx *= 0.985; p.vy *= 0.985;

                p.x += p.vx; p.y += p.vy;
                p.pulse += 0.02;

                // Wall bounce
                if (p.x < 0) { p.x = 0;              p.vx *= -1; }
                if (p.x > canvas.width)  { p.x = canvas.width;  p.vx *= -1; }
                if (p.y < 0) { p.y = 0;              p.vy *= -1; }
                if (p.y > canvas.height) { p.y = canvas.height; p.vy *= -1; }
            });

            // Lines
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const a = particles[i], b = particles[j];
                    const dist = Math.hypot(a.x - b.x, a.y - b.y);
                    if (dist >= MAX_DIST) continue;

                    const fade = 1 - dist / MAX_DIST;
                    // Boost near mouse
                    const midDist = Math.hypot((a.x + b.x) / 2 - mx, (a.y + b.y) / 2 - my);
                    const boost   = Math.max(0, 1 - midDist / 180) * 0.5;

                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.strokeStyle = `rgba(56,189,248,${(fade * 0.22 + boost).toFixed(3)})`;
                    ctx.lineWidth   = (a.isHub || b.isHub) ? 0.9 : 0.45;
                    ctx.stroke();
                }
            }

            // Dots
            particles.forEach(p => {
                const pulseFactor = p.isHub ? 1 + 0.25 * Math.sin(p.pulse) : 1;

                if (p.isHub) {
                    // Soft glow ring
                    const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 6 * pulseFactor);
                    g.addColorStop(0,   "rgba(56,189,248,0.18)");
                    g.addColorStop(0.5, "rgba(99,179,237,0.06)");
                    g.addColorStop(1,   "rgba(56,189,248,0)");
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.radius * 6 * pulseFactor, 0, Math.PI * 2);
                    ctx.fillStyle = g;
                    ctx.fill();
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius * pulseFactor, 0, Math.PI * 2);
                ctx.fillStyle = p.isHub
                    ? `rgba(100,220,255,${p.opacity})`
                    : `rgba(148,210,255,${p.opacity})`;
                ctx.fill();
            });

            raf = requestAnimationFrame(tick);
        };

        const onMove = (e: MouseEvent) => {
            const r = canvas.getBoundingClientRect();
            mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top };
        };
        const onLeave = () => { mouse.current = { x: -9999, y: -9999 }; };
        const onResize = () => { spawn(); };

        spawn();
        tick();

        window.addEventListener("resize", onResize);
        canvas.addEventListener("mousemove", onMove);
        canvas.addEventListener("mouseleave", onLeave);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", onResize);
            canvas.removeEventListener("mousemove", onMove);
            canvas.removeEventListener("mouseleave", onLeave);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}
