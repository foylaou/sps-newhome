import { useState } from "react";
import { SiLine, SiThreads } from "react-icons/si";
import { FaFacebook, FaYoutube, FaInstagram, FaPodcast } from "react-icons/fa6";

const footerLinks = [
    { label: "計畫簡介", href: "#" },
    { label: "公告事項", href: "#" },
    { label: "功能專區", href: "#" },
    { label: "我要媒合", href: "#" },
    { label: "產業案例", href: "#cases" },
    { label: "會員中心", href: "#" },
    { label: "常見問題", href: "#" },
    { label: "網站導覽", href: "#" },
];

const socialLinks = [
    { label: "LINE",      href: "#", icon: SiLine,      color: "hover:bg-[#06C755]" },
    { label: "Facebook",  href: "#", icon: FaFacebook,  color: "hover:bg-[#1877F2]" },
    { label: "Threads",   href: "#", icon: SiThreads,   color: "hover:bg-gray-600" },
    { label: "YouTube",   href: "#", icon: FaYoutube,   color: "hover:bg-[#FF0000]" },
    { label: "Instagram", href: "#", icon: FaInstagram, color: "hover:bg-[#E1306C]" },
    { label: "Podcast",   href: "#", icon: FaPodcast,   color: "hover:bg-purple-600" },
];

const INDUSTRY_OPTIONS = [
    { value: "",  label: "請選擇產業代碼" },
    { value: "A", label: "A：17/18/19類廠商" },
    { value: "B", label: "B：智慧化業者" },
    { value: "C", label: "C：其他" },
];

const SUBSCRIBE_URL =
    "https://api-backend.app.newsleopard.com/api/contacts/subscribe/4028985e972b1435019733375b860449/verify";

function NewsletterBlock() {
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
        <div id="newsletter-section" className="border-b border-navy-700 py-12 text-center">
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
    );
}

export default function SiteFooter() {
    return (
        <footer className="bg-navy-800">
            <div className="h-1 bg-gradient-cta" />

            <div className="mx-auto max-w-6xl px-4">
                <NewsletterBlock />

                <div className="grid gap-10 py-12 md:grid-cols-3">
                    {/* 左：Logo + 聯絡 */}
                    <div>
                        <a href="https://www.ida.gov.tw/ctlr?PRO=idx2015&lang=0" className="flex items-center gap-3">
                            <img src="/logo-footer.svg" alt="經濟部產業發展署" width={300} height={40} className="brightness-0 invert" />
                        </a>
                        <div className="mt-4 text-sm leading-relaxed text-gray-400">
                            會本部地址：
                            <a href="https://www.google.com/maps/place/813707%20%E9%AB%98%E9%9B%84%E5%B8%82%E5%B7%A6%E7%87%9F%E5%8D%80%E5%8D%9A%E6%84%9B%E4%B8%89%E8%B7%AF12%E8%99%9F15%E6%A8%93"
                                target="_blank" rel="noopener noreferrer"
                                className="text-gray-200 hover:text-purple-300 transition-colors">
                                813707 高雄市左營區博愛三路12號15樓
                            </a>
                            <br />電話：
                            <a href="tel:+886-7-550-3115" className="text-gray-200 hover:text-purple-300 transition-colors">+886-7-550-3115</a>
                            <br />信箱：
                            <a href="mailto:isha_khh@mail.isha.org.tw" className="text-gray-200 hover:text-purple-300 transition-colors">isha_khh@mail.isha.org.tw</a>
                        </div>
                    </div>

                    {/* 中：連結 */}
                    <div>
                        <p className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-4">網站地圖</p>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-400">
                            {footerLinks.map((l) => (
                                <a key={l.label} href={l.href} className="hover:text-purple-300 transition-colors duration-200">{l.label}</a>
                            ))}
                        </div>
                        <div className="mt-5 flex items-center gap-4 text-xs text-gray-600 tabular-nums">
                            <span>瀏覽 <span className="text-gray-400">10,781</span></span>
                            <span>點閱 <span className="text-gray-400">58,580</span></span>
                            <span>會員 <span className="text-gray-400">150</span></span>
                        </div>
                        <div className="mt-3">
                            <a href="https://accessibility.moda.gov.tw/Applications/Detail?category=20251027142301"
                                target="_blank" rel="noopener noreferrer" className="inline-flex rounded">
                                <img src="/aplus2_1.jpg" alt="通過AA檢測等級無障礙網頁檢測" width={88} height={31} />
                            </a>
                        </div>
                    </div>

                    {/* 右：社群媒體 */}
                    <div>
                        <p className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-4">追蹤我們</p>
                        <div className="grid grid-cols-3 gap-3">
                            {socialLinks.map(({ label, href, icon: Icon, color }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className={`flex flex-col items-center gap-1.5 rounded-xl bg-navy-700 py-3 text-gray-300 transition-all duration-200 ${color} hover:text-white hover:scale-105`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span className="text-xs">{label}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-navy-700 bg-navy-900">
                <div className="mx-auto max-w-6xl px-4 py-6">
                    <div className="text-sm text-gray-500 text-center leading-relaxed">
                        中華民國工業安全衛生協會 著作權所有 Copyright ©ISHA. All Rights Reserved.
                        <br />
                        為提供更為穩定的瀏覽品質與使用體驗，建議更新瀏覽器至以下版本：IE10(含)以上、最新版本Chrome、最新版本Firefox。
                    </div>
                </div>
            </div>
        </footer>
    );
}
