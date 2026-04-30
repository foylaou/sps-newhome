import { useRef } from "react";
import { useGSAP, gsap, ScrollTrigger } from "../../lib/gsap";

const services = [
    {
        emoji: "🤖",
        title: "技術工具",
        tags: ["產業AI", "技術文件"],
        desc: "提供產業適用的AI工具庫與技術規範文件，協助企業快速評估並導入智慧化解決方案。",
        cardBg:   "#F5F4FF",
        iconBg:   "#EAE7FF",
        stroke:   "#6B4EFF",
        title_c:  "#4B2FDF",
        border:   "#D6CFFF",
    },
    {
        emoji: "🥽",
        title: "人才培育",
        tags: ["XR訓練", "線上課程"],
        desc: "結合XR虛擬實境打造沉浸式工安訓練，提升人員應變能力，培育數位轉型人才。",
        cardBg:   "#FFF0F4",
        iconBg:   "#FFE2EA",
        stroke:   "#E8436B",
        title_c:  "#C42050",
        border:   "#FFCFDC",
    },
    {
        emoji: "🏭",
        title: "產業輔導",
        tags: ["顧問服務", "媒合引導"],
        desc: "專業顧問一對一輔導，協助企業釐清需求、找到技術供應商，加速轉型落地。",
        cardBg:   "#EEF4FF",
        iconBg:   "#DDE9FB",
        stroke:   "#378ADD",
        title_c:  "#185FA5",
        border:   "#B5D4F4",
    },
    {
        emoji: "💰",
        title: "補助資源",
        tags: ["政府補助", "申請協助"],
        desc: "彙整最新政府補助計畫，提供申請導引服務，協助企業掌握動態、降低轉型成本。",
        cardBg:   "#F3F0FF",
        iconBg:   "#E8E4FF",
        stroke:   "#7B62F5",
        title_c:  "#534AB7",
        border:   "#CEC9F8",
    },
];

export default function ServicesSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.set(".service-card", { autoAlpha: 0, y: 60, scale: 0.93 });

        gsap.from(".services-header", {
            autoAlpha: 0, y: 32, duration: 0.75, ease: "power3.out",
            scrollTrigger: { trigger: containerRef.current, start: "top 80%", toggleActions: "play none none none" },
        });

        ScrollTrigger.batch(".service-card", {
            onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.85, ease: "power3.out" }),
            start: "top bottom",
            once: true,
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-20 px-4 bg-white">
            <div className="mx-auto max-w-6xl">

                <div className="services-header text-center mb-14">
                    <div className="text-sm font-bold tracking-[0.22em] text-purple-500 uppercase mb-2">
                        Services
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-navy-600 mb-4">
                        服務專區{" "}
                        <span className="text-gray-300 font-light italic text-2xl">SERVICES</span>
                    </h2>
                    <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
                        提供企業全方位的智慧化升級服務，從工具導入到人才培育，一站式滿足產業需求。
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {services.map((s) => (
                        <div
                            key={s.title}
                            className="service-card group rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                            style={{ backgroundColor: s.cardBg, border: `1px solid ${s.border}` }}
                        >
                            {/* Icon */}
                            <div
                                className="flex items-center justify-center text-2xl mb-5 rounded-xl transition-transform duration-300 group-hover:scale-110"
                                style={{ width: "52px", height: "52px", backgroundColor: s.iconBg }}
                            >
                                {s.emoji}
                            </div>

                            <h3 className="text-lg font-black mb-2" style={{ color: s.title_c }}>
                                {s.title}
                            </h3>

                            <div className="flex flex-wrap gap-1.5 mb-3">
                                {s.tags.map((t) => (
                                    <span
                                        key={t}
                                        className="text-xs px-2.5 py-0.5 rounded-full bg-white/70"
                                        style={{ border: `1px solid ${s.border}`, color: s.title_c }}
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>

                            <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>

                            <div
                                className="mt-5 flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all duration-200"
                                style={{ color: s.stroke }}
                            >
                                了解更多
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
