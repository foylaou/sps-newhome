import { useState } from "react";

const INDUSTRY_OPTIONS = [
    { value: "",  label: "請選擇產業代碼" },
    { value: "A", label: "A：17/18/19類廠商" },
    { value: "B", label: "B：智慧化業者" },
    { value: "C", label: "C：其他" },
];

const SUBSCRIBE_URL =
    "https://api-backend.app.newsleopard.com/api/contacts/subscribe/4028985e972b1435019733375b860449/verify";

export default function NewsletterSection() {
    const [status, setStatus] = useState<"form" | "confirm" | "error">("form");
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const name  = formData.get("name")  as string;
        const body  = name
            ? `email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}`
            : `email=${encodeURIComponent(email)}`;
        try {
            const res = await fetch(SUBSCRIBE_URL, {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body,
            });
            setStatus(res.ok ? "confirm" : "error");
        } catch {
            setStatus("error");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section id="newsletter-section" className="bg-gradient-dark py-16">
            <div className="mx-auto max-w-6xl px-4 text-center">
                {status === "form" && (
                    <>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                            訂閱電子報，掌握第一手動態
                        </h2>
                        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                            每月為您彙整最新產業實績、技術趨勢與補助開放通知。
                        </p>
                        <form onSubmit={handleSubmit} className="mx-auto max-w-3xl flex flex-col sm:flex-row items-stretch gap-3">
                            <select
                                name="name"
                                required
                                className="flex-1 min-w-0 rounded-lg border border-navy-600 bg-navy-800 px-4 py-3 text-white outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors appearance-none cursor-pointer"
                            >
                                {INDUSTRY_OPTIONS.map((opt) => (
                                    <option key={opt.value} value={opt.value} disabled={opt.value === ""}>{opt.label}</option>
                                ))}
                            </select>
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="您的電子郵件位址"
                                className="flex-[2] min-w-0 rounded-lg border border-navy-600 bg-navy-800 px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors"
                            />
                            <button
                                type="submit"
                                disabled={submitting}
                                className="rounded-lg bg-gradient-cta px-8 py-3 font-semibold text-white shadow-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer whitespace-nowrap"
                            >
                                {submitting ? "處理中…" : "立即訂閱"}
                            </button>
                        </form>
                    </>
                )}
                {status === "confirm" && (
                    <div className="max-w-md mx-auto">
                        <h2 className="text-2xl font-bold text-white mb-3">訂閱服務確認</h2>
                        <p className="text-gray-400 leading-relaxed">已發送 Email 驗證信給您，請點擊信件連結以完成訂閱程序。</p>
                    </div>
                )}
                {status === "error" && (
                    <div className="max-w-md mx-auto">
                        <h2 className="text-2xl font-bold text-white mb-3">訂閱失敗</h2>
                        <p className="text-gray-400 mb-6">暫時無法接受訂閱，請稍候重新嘗試。</p>
                        <button
                            onClick={() => setStatus("form")}
                            className="rounded-lg border border-navy-500 px-6 py-2.5 text-gray-300 hover:bg-navy-700 transition-colors cursor-pointer"
                        >
                            重試
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
