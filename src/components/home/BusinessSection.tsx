import { useRef } from "react";
import { useGSAP, gsap, ScrollTrigger } from "../../lib/gsap";

const mockBusinesses = [
    {
        id: 1,
        name: "智安科技股份有限公司",
        type: "技術供應",
        typeBg: "bg-purple-100 text-purple-700",
        tags: ["AIoT", "工安監控", "電腦視覺"],
        desc: "專注於工業AI視覺辨識技術，提供完整的智慧安全監控系統解決方案，服務逾50家石化廠。",
        initial: "智",
        color: "from-purple-500 to-purple-700",
    },
    {
        id: 2,
        name: "躍域數位整合有限公司",
        type: "系統整合",
        typeBg: "bg-pink-100 text-pink-700",
        tags: ["5G", "數位孿生", "IoT平台"],
        desc: "以5G網路為基礎，提供石化產業數位孿生建置與系統整合服務，推動廠區智慧化升級。",
        initial: "躍",
        color: "from-pink-400 to-pink-600",
    },
    {
        id: 3,
        name: "安泰環境科技股份有限公司",
        type: "顧問服務",
        typeBg: "bg-emerald-100 text-emerald-700",
        tags: ["ESG", "環安衛", "永續報告"],
        desc: "提供環安衛顧問服務與ESG報告規劃，協助企業達成永續發展目標及法規遵循要求。",
        initial: "安",
        color: "from-emerald-500 to-teal-600",
    },
];

export default function BusinessSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.set(".biz-card", { autoAlpha: 0, y: 50 });

        gsap.from(".biz-header", {
            autoAlpha: 0, y: 32, duration: 0.75, ease: "power3.out",
            scrollTrigger: { trigger: containerRef.current, start: "top 80%", toggleActions: "play none none none" },
        });

        ScrollTrigger.batch(".biz-card", {
            onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, stagger: 0.13, duration: 0.78, ease: "power3.out" }),
            start: "top bottom",
            once: true,
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-20 px-4 bg-white">
            <div className="mx-auto max-w-6xl">

                <div className="biz-header flex items-end justify-between mb-10">
                    <div>
                        <div className="text-sm font-bold tracking-[0.22em] text-purple-500 uppercase mb-2">
                            Member Listings
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-navy-600">
                            企業刊登{" "}
                            <span className="text-gray-300 font-light italic text-2xl">BUSINESS</span>
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
                    {mockBusinesses.map((b) => (
                        <div
                            key={b.id}
                            className="biz-card group rounded-2xl border border-gray-200 bg-white p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-purple-200"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${b.color} flex items-center justify-center text-white font-black text-xl flex-shrink-0 shadow-md`}>
                                    {b.initial}
                                </div>
                                <div className="min-w-0">
                                    <h3 className="font-bold text-navy-600 leading-snug text-sm group-hover:text-purple-600 transition-colors truncate">
                                        {b.name}
                                    </h3>
                                    <span className={`inline-block mt-1 text-xs font-semibold px-2.5 py-0.5 rounded-full ${b.typeBg}`}>
                                        {b.type}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-1.5 mb-3">
                                {b.tags.map((t) => (
                                    <span key={t} className="text-xs bg-gray-50 border border-gray-200 text-gray-600 px-2.5 py-0.5 rounded-full">
                                        {t}
                                    </span>
                                ))}
                            </div>

                            <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4">{b.desc}</p>

                            <div className="flex items-center gap-1.5 text-sm font-semibold text-purple-500">
                                查看資訊
                                <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
