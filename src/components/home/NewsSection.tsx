import { useRef, useState, useMemo } from "react";
import { useGSAP, gsap, ScrollTrigger } from "../../lib/gsap";

const ALL_TAG = "全部";

const mockNews = [
    {
        id: 1,
        category: "公告",
        badgeClass: "bg-purple-100 text-purple-700",
        date: "2026-04-15",
        title: "114年度石化產業智慧化補助計畫正式開放申請",
        excerpt: "本計畫提供最高500萬元補助，協助企業導入AIoT、5G等智慧化技術，申請截止日期為7月31日。",
    },
    {
        id: 2,
        category: "活動",
        badgeClass: "bg-pink-100 text-pink-700",
        date: "2026-04-08",
        title: "智慧工安技術交流論壇 — 報名即將截止",
        excerpt: "本次論壇邀請產學研各界專家，探討AI在工業安全的最新應用趨勢，名額有限請盡速報名。",
    },
    {
        id: 3,
        category: "補助",
        badgeClass: "bg-emerald-100 text-emerald-700",
        date: "2026-03-28",
        title: "XR人才培育計畫開始招募，名額有限",
        excerpt: "結合虛擬實境技術打造沉浸式工安訓練環境，提升人員應變能力，歡迎有意向企業儘早洽詢。",
    },
    {
        id: 4,
        category: "公告",
        badgeClass: "bg-purple-100 text-purple-700",
        date: "2026-03-15",
        title: "石化產業數位轉型白皮書正式發布",
        excerpt: "本白皮書彙整國內外最新產業數位轉型案例，提供企業完整的智慧化升級路徑參考。",
    },
    {
        id: 5,
        category: "活動",
        badgeClass: "bg-pink-100 text-pink-700",
        date: "2026-03-05",
        title: "2026智慧製造國際展覽會 — SPS展位預告",
        excerpt: "本年度國際展覽會將展示最新智慧製造解決方案，歡迎蒞臨SPS攤位交流。",
    },
    {
        id: 6,
        category: "補助",
        badgeClass: "bg-emerald-100 text-emerald-700",
        date: "2026-02-20",
        title: "中小企業數位轉型補助方案，即日起受理申請",
        excerpt: "針對中小型石化企業提供專屬補助方案，協助導入智慧感測、數據分析等核心技術。",
    },
];

const TAGS = [ALL_TAG, ...Array.from(new Set(mockNews.map((n) => n.category)))];

export default function NewsSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTag, setActiveTag] = useState(ALL_TAG);

    const filtered = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        return mockNews
            .filter((item) => {
                const matchTag = activeTag === ALL_TAG || item.category === activeTag;
                const matchSearch = !q || item.title.toLowerCase().includes(q) || item.excerpt.toLowerCase().includes(q);
                return matchTag && matchSearch;
            })
            .slice(0, 3);
    }, [searchQuery, activeTag]);

    useGSAP(() => {
        gsap.set(".news-card", { autoAlpha: 0, y: 50 });

        gsap.from(".news-header", {
            autoAlpha: 0, y: 32, duration: 0.75, ease: "power3.out",
            scrollTrigger: { trigger: containerRef.current, start: "top 80%", toggleActions: "play none none none" },
        });

        gsap.from(".news-filter-bar", {
            autoAlpha: 0, y: 20, duration: 0.6, ease: "power3.out",
            scrollTrigger: { trigger: containerRef.current, start: "top 80%", toggleActions: "play none none none" },
        });

        ScrollTrigger.batch(".news-card", {
            onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, stagger: 0.14, duration: 0.75, ease: "power3.out" }),
            start: "top bottom",
            once: true,
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-20 px-4 bg-gray-50">
            <div className="mx-auto max-w-6xl">

                <div className="news-header flex items-end justify-between mb-8">
                    <div>
                        <div className="text-sm font-bold tracking-[0.22em] text-purple-500 uppercase mb-2">
                            Latest News
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-navy-600">
                            最新訊息{" "}
                            <span className="text-gray-300 font-light italic text-2xl">NEWS</span>
                        </h2>
                    </div>
                    <a href="#" className="group flex items-center gap-1.5 text-sm font-semibold text-purple-500 hover:text-purple-600 transition-colors">
                        查看更多
                        <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>

                {/* Search & Filter bar */}
                <div className="news-filter-bar flex flex-col sm:flex-row items-center justify-between gap-3 mb-8">
                    {/* Tag filter */}
                    <div className="flex items-center gap-2 flex-wrap">
                        {TAGS.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => setActiveTag(tag)}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                                    activeTag === tag
                                        ? "bg-purple-500 text-white shadow-sm"
                                        : "bg-white border border-gray-200 text-gray-600 hover:border-purple-300 hover:text-purple-600"
                                }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>

                    {/* Search input */}
                    <div className="relative w-full sm:w-auto sm:min-w-[220px]">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="搜尋訊息..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-9 py-2 rounded-lg border border-gray-200 bg-white text-sm text-navy-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 transition"
                        />
                        {searchQuery && (
                            <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors" aria-label="清除搜尋">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>

                {/* Cards */}
                {filtered.length > 0 ? (
                    <div className="grid gap-5 md:grid-cols-3">
                        {filtered.map((item) => (
                            <article
                                key={item.id}
                                className="news-card group rounded-xl bg-white border border-gray-200 p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-purple-200"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${item.badgeClass}`}>
                                        {item.category}
                                    </span>
                                    <time className="text-xs text-gray-400">{item.date}</time>
                                </div>

                                <h3 className="font-bold text-navy-600 leading-snug mb-3 group-hover:text-purple-600 transition-colors">
                                    {item.title}
                                </h3>

                                <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{item.excerpt}</p>

                                <div className="mt-5 flex items-center gap-1.5 text-sm text-purple-500 font-semibold">
                                    閱讀全文
                                    <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                        <svg className="w-12 h-12 mb-4 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm font-medium">找不到符合條件的訊息</p>
                        <button
                            onClick={() => { setSearchQuery(""); setActiveTag(ALL_TAG); }}
                            className="mt-3 text-sm text-purple-500 hover:text-purple-700 font-semibold transition-colors"
                        >
                            清除篩選條件
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
