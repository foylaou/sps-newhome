import { useEffect, useRef, useState } from "react";
import { useGSAP, gsap } from "../../lib/gsap";
import ParticleNetwork from "../ui/ParticleNetwork";

function Typewriter({ text, startDelay = 0 }: { text: string; startDelay?: number }) {
    const [displayed, setDisplayed] = useState("");
    const [done, setDone] = useState(false);

    useEffect(() => {
        const chars = Array.from(text);
        let i = 0;
        let iv: ReturnType<typeof setInterval>;
        const timer = setTimeout(() => {
            iv = setInterval(() => {
                i++;
                setDisplayed(chars.slice(0, i).join(""));
                if (i >= chars.length) { clearInterval(iv); setDone(true); }
            }, 90);
        }, startDelay);
        return () => { clearTimeout(timer); clearInterval(iv); };
    }, [text, startDelay]);

    return (
        <span>
            {displayed}
            {!done && (
                <span
                    className="inline-block w-[3px] h-[0.85em] ml-1 bg-pink-400 align-middle"
                    style={{ animation: "blink 0.9s step-end infinite" }}
                />
            )}
        </span>
    );
}

function CharSpans({ text, className, charStyle }: { text: string; className?: string; charStyle?: React.CSSProperties }) {
    return (
        <span className={className}>
            {Array.from(text).map((c, i) =>
                c === "・" || c === " "
                    ? <span key={i}>{c}</span>
                    : (
                        <span key={i} className="hero-char"
                            style={{ display: "inline-block", willChange: "transform, opacity", ...charStyle }}>
                            {c}
                        </span>
                    )
            )}
        </span>
    );
}

export default function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const svgBgRef = useRef<HTMLImageElement>(null);
    const base = import.meta.env.BASE_URL;

    useGSAP(() => {
        // SVG 背景：淡入 + 慢漂浮
        gsap.from(svgBgRef.current, { opacity: 0, duration: 2.5, ease: "power2.out" });
        gsap.to(svgBgRef.current, {
            y: -28, scale: 1.04,
            duration: 22, repeat: -1, yoyo: true, ease: "sine.inOut",
        });

        gsap.from(".hero-badge", { opacity: 0, y: -28, duration: 0.7, ease: "back.out(1.7)", delay: 0.2 });

        gsap.from(".hero-char", {
            opacity: 0, y: 70, duration: 0.65,
            stagger: { each: 0.055, from: "start" },
            ease: "back.out(2)", delay: 0.55,
        });

        const glitchTl = gsap.timeline({ delay: 0.55 + 9 * 0.055 + 0.55 });
        glitchTl
            .to(".hero-line-1 .hero-char", { x: "random(-4, 4)", skewX: "random(-6, 6)", opacity: "random(0.6, 1)", duration: 0.04, stagger: 0.015, ease: "none" })
            .to(".hero-line-1 .hero-char", { x: 0, skewX: 0, opacity: 1, duration: 0.06, stagger: 0.01, ease: "none" })
            .to(".hero-line-2 .hero-char", { x: "random(-4, 4)", opacity: "random(0.5, 1)", duration: 0.04, stagger: 0.01, ease: "none" })
            .to(".hero-line-2 .hero-char", { x: 0, opacity: 1, duration: 0.06, ease: "none" });

        gsap.from(".hero-desc", { opacity: 0, y: 22, duration: 0.75, ease: "power2.out", delay: 2.8 });
        gsap.from(".hero-cta",  { opacity: 0, y: 22, scale: 0.85, duration: 0.8, ease: "back.out(1.5)", delay: 3.0 });

        gsap.to(".hero-cta", {
            boxShadow: "0 0 40px rgba(107,78,255,0.7), 0 8px 32px rgba(232,67,107,0.5)",
            duration: 1.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 3.8,
        });

        gsap.from(".hero-scroll", { opacity: 0, duration: 0.5, delay: 3.4 });
        gsap.to(".hero-scroll",  { y: 10, repeat: -1, yoyo: true, duration: 1.3, ease: "sine.inOut" });

        gsap.to(".hero-orb-a", { y: -30, x: 18,  duration: 8,  repeat: -1, yoyo: true, ease: "sine.inOut" });
        gsap.to(".hero-orb-b", { y: 22,  x: -14, duration: 10, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2 });
        gsap.to(".hero-orb-c", { y: -18, x: -8,  duration: 7,  repeat: -1, yoyo: true, ease: "sine.inOut", delay: 4 });
    }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
            style={{ background: "#1f2147" }}
        >
            {/* SVG 背景 */}
            <img
                ref={svgBgRef}
                src={`${base}banner-bg-svg-small-size.svg`}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
                style={{ willChange: "transform, opacity" }}
            />
            {/* 輕薄遮罩，讓 SVG 圖樣透出來 */}
            <div className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(150deg,rgba(4,9,28,0.35) 0%,rgba(13,7,33,0.28) 55%,rgba(5,13,30,0.35) 100%)" }}
            />

            <ParticleNetwork />

            <div className="hero-orb-a absolute top-[16%] left-[10%] w-140 h-140 rounded-full bg-purple-600/20 blur-[120px] pointer-events-none" />
            <div className="hero-orb-b absolute bottom-[16%] right-[6%]  w-112.5 h-112.5 rounded-full bg-pink-500/15 blur-[100px] pointer-events-none" />
            <div className="hero-orb-c absolute top-[48%]  right-[28%] w-75 h-75 rounded-full bg-purple-700/12 blur-[80px]  pointer-events-none" />

            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-28 pb-40">

                <div className="hero-badge mb-10 inline-flex items-center gap-2.5 rounded-full border border-purple-400/35 bg-purple-500/10 backdrop-blur-sm px-5 py-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />
                    <span className="text-xs font-bold tracking-[0.28em] text-purple-300 uppercase select-none">
                        AI & DATA DRIVEN SAFETY
                    </span>
                </div>

                <h1 className="font-black leading-none mb-8 tracking-tight">
                    <div className="hero-line-1 overflow-hidden pb-1 text-6xl md:text-8xl text-white">
                        <CharSpans text="數位賦能・" />
                    </div>
                    <div className="hero-line-2 overflow-hidden pb-2 text-6xl md:text-8xl">
                        <CharSpans
                            text="轉型落地"
                            charStyle={{
                                background: "linear-gradient(90deg,#9B88FF 0%,#8B6FFF 50%,#E8436B 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        />
                    </div>
                </h1>

                <p className="text-2xl md:text-3xl text-gray-200 font-semibold mb-5 tracking-wide min-h-[2rem]">
                    <Typewriter text="打造產業工安新標竿" startDelay={1800} />
                </p>

                <p className="hero-desc text-base md:text-lg text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                    集結跨產業亮點技術與年度資源，提供企業精準的對接引導，<br className="hidden md:block" />
                    讓智慧化職安防護不再是門檻，而是永續競爭力。
                </p>

                <a
                    href="#"
                    className="hero-cta inline-flex items-center gap-3 rounded-full px-9 py-4 text-base font-bold text-white transition-transform duration-200 hover:scale-105 active:scale-95"
                    style={{ background: "var(--gradient-hero-cta)", boxShadow: "0 8px 28px rgba(107,78,255,0.45)" }}
                >
                    立即申請會員
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                </a>
            </div>

            <div className="hero-scroll absolute bottom-9 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-gray-400 select-none pointer-events-none">
                <span className="text-[10px] font-semibold tracking-[0.35em] uppercase">Scroll</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>

            <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-white via-white/8 to-transparent pointer-events-none" />
        </section>
    );
}
