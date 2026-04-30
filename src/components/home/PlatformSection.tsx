import { useRef, useState, useEffect, useCallback } from "react";
import { useGSAP, gsap, ScrollTrigger } from "../../lib/gsap";

const base = import.meta.env.BASE_URL;
const banners = [
    { src: `${base}banner1.jpg`, alt: "石化產業智慧化媒合平台" },
    { src: `${base}banner2.jpg`, alt: "亞灣2.0智慧科技創新園區" },
];

const features = [
    "技術供需精準媒合，縮短落地周期",
    "整合政府補助資源，降低導入成本",
    "建構在地產業供應鏈生態系",
    "推動南北平衡與數位經濟發展",
];

export default function PlatformSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
    const currentRef = useRef(0);
    const [current, setCurrent] = useState(0);

    const goToSlide = useCallback((next: number) => {
        const prev = currentRef.current;
        if (prev === next) return;
        gsap.to(slideRefs.current[prev], { opacity: 0, duration: 0.9, ease: "power2.inOut" });
        gsap.to(slideRefs.current[next], { opacity: 1, duration: 0.9, ease: "power2.inOut" });
        currentRef.current = next;
        setCurrent(next);
    }, []);

    useEffect(() => {
        slideRefs.current.forEach((el, i) => {
            if (el) gsap.set(el, { opacity: i === 0 ? 1 : 0 });
        });
        const id = setInterval(() => {
            const next = (currentRef.current + 1) % banners.length;
            goToSlide(next);
        }, 4000);
        return () => clearInterval(id);
    }, [goToSlide]);

    useGSAP(() => {
        gsap.from(".platform-text > *", {
            opacity: 0, x: 60, duration: 0.85, stagger: 0.13, ease: "power3.out",
            scrollTrigger: { trigger: containerRef.current, start: "top 70%", toggleActions: "play none none none" },
        });

        gsap.from(".platform-img", {
            opacity: 0, x: -75, scale: 0.93, duration: 1.05, ease: "power3.out",
            scrollTrigger: { trigger: containerRef.current, start: "top 70%", toggleActions: "play none none none" },
        });

        gsap.set(".feature-item", { autoAlpha: 0, x: 28 });
        ScrollTrigger.batch(".feature-item", {
            onEnter: (els) => gsap.to(els, { autoAlpha: 1, x: 0, stagger: 0.09, duration: 0.6, ease: "power3.out" }),
            start: "top bottom",
            once: true,
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-16 md:py-24 px-4 overflow-hidden bg-white">
            <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-10 md:gap-16 items-center">

                {/* 左側圖片輪播 */}
                <div className="platform-img">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-purple-100/60 h-56 sm:h-72 md:h-80 lg:h-96">
                        {banners.map((b, i) => (
                            <div key={b.src} ref={(el) => { slideRefs.current[i] = el; }} className="absolute inset-0">
                                <img src={b.src} alt={b.alt} className="w-full h-full object-cover" />
                            </div>
                        ))}

                        <div className="absolute inset-0 bg-linear-to-tr from-navy-800/30 via-transparent to-purple-500/10 pointer-events-none z-10" />

                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 bg-white/90 backdrop-blur rounded-lg px-4 py-2 shadow-md whitespace-nowrap">
                            <div className="text-xs text-navy-600">林園產業園區導入智慧技術交流分享會</div>
                        </div>

                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                            {banners.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => goToSlide(i)}
                                    className={`h-2 rounded-full transition-all duration-300 ${i === current ? "w-5 bg-white" : "w-2 bg-white/50 hover:bg-white/80"}`}
                                    aria-label={`切換至第 ${i + 1} 張`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* 右側文字 */}
                <div className="platform-text flex flex-col min-w-0 w-full">
                    <span className="text-sm font-bold tracking-[0.22em] text-purple-500 uppercase mb-3">
                        Platform
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-navy-600 leading-tight mb-6">
                        智慧工安技術<br />
                        <span className="text-purple-500">產業資訊暨媒合平台</span>
                    </h2>
                    <p className="text-gray-500 leading-relaxed mb-8">
                        以智慧科技（5G、AIoT）為核心，促進製造業產業升級轉型，
                        實現安全管理精進與創新應用落地。媒合平台作為技術供應與需求的橋樑，
                        支持企業形成在地供應鏈。
                    </p>

                    <ul className="space-y-2.5">
                        {features.map((f) => (
                            <li key={f} className="feature-item flex items-center gap-3 text-gray-600 text-sm">
                                <span className="shrink-0 w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center">
                                    <svg className="w-3 h-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                    </svg>
                                </span>
                                {f}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
