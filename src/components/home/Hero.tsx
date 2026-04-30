import { useState, useEffect, useCallback } from "react";

const base = import.meta.env.BASE_URL;
const banners = [
    { src: `${base}banner1.png`, alt: "智慧工安技術產業資訊暨媒合平台" },
    { src: `${base}banner2.jpg`, alt: "石化產業智慧化" },
    { src: `${base}banner3.jpg`, alt: "亞灣2.0智慧科技創新園區" },
];

export default function Hero() {
    const [current, setCurrent] = useState(0);

    const next = useCallback(() => setCurrent((c) => (c + 1) % banners.length), []);
    const prev = () => setCurrent((c) => (c - 1 + banners.length) % banners.length);

    useEffect(() => {
        const id = setInterval(next, 5000);
        return () => clearInterval(id);
    }, [next]);

    return (
        <section className="relative w-full overflow-hidden">
            <div className="relative w-full aspect-[16/6] md:aspect-[16/5] bg-slate-200">
                {banners.map((b, i) => (
                    <img
                        key={i}
                        src={b.src}
                        alt={b.alt}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0"}`}
                    />
                ))}

                {/* 左右箭頭 */}
                <button
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="上一張"
                >
                    ‹
                </button>
                <button
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="下一張"
                >
                    ›
                </button>

                {/* 點狀指示器 */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                    {banners.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`w-2.5 h-2.5 rounded-full transition-colors cursor-pointer ${i === current ? "bg-white" : "bg-white/50"}`}
                            aria-label={`第 ${i + 1} 張`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
