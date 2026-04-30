import { useRef } from "react";
import { useGSAP, gsap, ScrollTrigger } from "../../lib/gsap";

const base = import.meta.env.BASE_URL;
const mockCases = [
    {
        id: 1,
        category: "智慧安全",
        categoryColor: "bg-purple-500 text-white",
        title: "AI 智慧安全帽偵測系統導入石化廠",
        desc: "透過電腦視覺即時偵測人員安全裝備佩戴情況，顯著降低工安事故發生率，有效提升工地安全管理效率。",
        img: `${base}sample1.jpg`,
    },
    {
        id: 2,
        category: "設備管理",
        categoryColor: "bg-emerald-600 text-white",
        title: "5G AIoT 設備預測維護解決方案",
        desc: "整合感測器與AI預測模型，提前預警設備異常，減少非計畫性停機，大幅降低維護成本。",
        img: `${base}sample2.png`,
    },
    {
        id: 3,
        category: "數位轉型",
        categoryColor: "bg-pink-500 text-white",
        title: "高雄石化廠區數位孿生平台建置",
        desc: "建立廠區3D數位孿生，實現生產流程模擬與遠端即時監控管理，加速決策反應速度。",
        img: `${base}sample3.jpg`,
    },
];

export default function CasesSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.set(".case-card", { autoAlpha: 0, y: 55 });

        gsap.from(".cases-header", {
            autoAlpha: 0, y: 32, duration: 0.75, ease: "power3.out",
            scrollTrigger: { trigger: containerRef.current, start: "top 80%", toggleActions: "play none none none" },
        });

        ScrollTrigger.batch(".case-card", {
            onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, stagger: 0.14, duration: 0.8, ease: "power3.out" }),
            start: "top bottom",
            once: true,
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-20 px-4 bg-gray-50">
            <div className="mx-auto max-w-6xl">

                <div className="cases-header flex items-end justify-between mb-10">
                    <div>
                        <div className="text-sm font-bold tracking-[0.22em] text-purple-500 uppercase mb-2">
                            Success Stories
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-navy-600">
                            產業案例{" "}
                            <span className="text-gray-300 font-light italic text-2xl">CASES</span>
                        </h2>
                    </div>
                    <a href="#" className="group flex items-center gap-1.5 text-sm font-semibold text-purple-500 hover:text-purple-600 transition-colors">
                        查看全部
                        <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {mockCases.map((c) => (
                        <article
                            key={c.id}
                            className="case-card group rounded-2xl bg-white border border-gray-200 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-purple-200"
                        >
                            <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
                                <img src={c.img} alt={c.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                <span className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full ${c.categoryColor}`}>
                                    {c.category}
                                </span>
                            </div>

                            <div className="p-5">
                                <h3 className="font-bold text-navy-600 leading-snug mb-2 group-hover:text-purple-600 transition-colors">
                                    {c.title}
                                </h3>
                                <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4">{c.desc}</p>
                                <div className="flex items-center gap-1.5 text-sm font-semibold text-purple-500">
                                    查看詳情
                                    <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
