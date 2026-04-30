const stats = [
    { key: "members",      label: "會員總數",      value: 1280 },
    { key: "successCases", label: "媒合成功案例",   value: 340  },
    { key: "subsidyApps",  label: "媒合補助申請案次", value: 520 },
];

export default function OverviewSection() {
    return (
        <section className="bg-gradient-dark">
            <div className="mx-auto max-w-6xl px-4 py-16">
                <div className="text-center mb-10">
                    <h2 className="text-sm font-bold tracking-[0.2em] text-purple-300 uppercase mb-2">
                        Statistics
                    </h2>
                    <div className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                        媒合總覽 <span className="text-gray-400 font-light italic">OVERVIEW</span>
                    </div>
                </div>

                <div className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {stats.map((s) => (
                        <div
                            key={s.key}
                            className="group relative overflow-hidden rounded-xl bg-white border border-gray-200 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-purple-300"
                        >
                            <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-purple-50 opacity-0 transition-opacity group-hover:opacity-100" />
                            <div className="relative">
                                <div className="text-base font-semibold text-gray-500 mb-1">{s.label}</div>
                                <div className="text-3xl font-black tabular-nums text-navy-600 group-hover:text-purple-500 transition-colors">
                                    {s.value.toLocaleString("zh-TW")}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="h-1 bg-gradient-cta" />
        </section>
    );
}
