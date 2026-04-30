import Navbar from "./components/layout/Navbar";
import HeroSection from "./components/home/HeroSection";
import PlatformSection from "./components/home/PlatformSection";
import NewsSection from "./components/home/NewsSection";
import ServicesSection from "./components/home/ServicesSection";
import CasesSection from "./components/home/CasesSection";
import BusinessSection from "./components/home/BusinessSection";
import VideoSection from "./components/home/VideoSection";
import SiteFooter from "./components/layout/SiteFooter";

// 確保 GSAP plugins 在 app 啟動時就完成 register
import "./lib/gsap";

export default function App() {
    return (
        <div className="min-h-screen bg-white text-slate-900">
            <Navbar />
            <main>
                <HeroSection />
                <PlatformSection />
                <NewsSection />
                <ServicesSection />
                <CasesSection />
                <BusinessSection />
                <VideoSection />
            </main>
            <SiteFooter />
        </div>
    );
}
