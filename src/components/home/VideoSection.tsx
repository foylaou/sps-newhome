import { useRef, useState } from "react";
import { useGSAP, gsap, ScrollTrigger } from "../../lib/gsap";

const mockVideos = [
    {
        id: 1,
        title: "石化產業智慧轉型——從數據到決策",
        duration: "12:34",
        date: "2025-03-15",
        gradient: "from-purple-600 via-purple-500 to-pink-400",
    },
    {
        id: 2,
        title: "ESG 永續發展實務：石化廠的碳盤查經驗分享",
        duration: "08:21",
        date: "2025-02-28",
        gradient: "from-pink-500 via-pink-400 to-purple-400",
    },
    {
        id: 3,
        title: "AIoT 工安監控應用：降低職災風險的關鍵技術",
        duration: "15:07",
        date: "2025-01-19",
        gradient: "from-emerald-600 via-teal-500 to-cyan-400",
    },
];

function PlayIcon() {
    return (
        <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
            <circle cx="32" cy="32" r="32" fill="rgba(0,0,0,0.35)" />
            <polygon points="26,20 50,32 26,44" fill="white" />
        </svg>
    );
}

function VideoCard({ v, index }: { v: typeof mockVideos[number]; index: number }) {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className="video-card group rounded-2xl overflow-hidden border border-gray-200 bg-white cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-purple-200"
            style={{ "--card-index": index } as React.CSSProperties}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className={`relative aspect-video bg-gradient-to-br ${v.gradient} overflow-hidden`}>
                <div className="absolute inset-0 opacity-20"
                    style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect width='1' height='1' x='0' y='0' fill='%23fff'/%3E%3Crect width='1' height='1' x='2' y='2' fill='%23fff'/%3E%3C/svg%3E\")" }}
                />
                <div className="absolute inset-0"
                    style={{
                        backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                    }}
                />
                <div className={`absolute inset-0 flex items-center justify-center transition-transform duration-200 ${hovered ? "scale-110" : "scale-100"}`}>
                    <div className="w-14 h-14 drop-shadow-lg">
                        <PlayIcon />
                    </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs font-mono px-2 py-0.5 rounded">
                    {v.duration}
                </div>
            </div>

            <div className="p-4">
                <p className="text-xs text-gray-400 mb-1.5">{v.date}</p>
                <h3 className="text-sm font-semibold text-navy-600 leading-snug line-clamp-2 group-hover:text-purple-600 transition-colors">
                    {v.title}
                </h3>
                <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-purple-500">
                    立即觀看
                    <svg className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default function VideoSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.set(".video-card", { autoAlpha: 0, y: 50 });

        gsap.from(".video-header", {
            autoAlpha: 0, y: 32, duration: 0.75, ease: "power3.out",
            scrollTrigger: { trigger: containerRef.current, start: "top 80%", toggleActions: "play none none none" },
        });

        ScrollTrigger.batch(".video-card", {
            onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, stagger: 0.13, duration: 0.78, ease: "power3.out" }),
            start: "top bottom",
            once: true,
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-20 px-4 bg-gray-50">
            <div className="mx-auto max-w-6xl">
                <div className="video-header flex items-end justify-between mb-10">
                    <div>
                        <div className="text-sm font-bold tracking-[0.22em] text-purple-500 uppercase mb-2">
                            Media Zone
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-navy-600">
                            影音專區{" "}
                            <span className="text-gray-300 font-light italic text-2xl">VIDEO</span>
                        </h2>
                    </div>
                    <a href="#" className="group flex items-center gap-1.5 text-sm font-semibold text-purple-500 hover:text-purple-600 transition-colors">
                        查看更多
                        <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>

                <div className="grid gap-5 md:grid-cols-3">
                    {mockVideos.map((v, i) => (
                        <VideoCard key={v.id} v={v} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
