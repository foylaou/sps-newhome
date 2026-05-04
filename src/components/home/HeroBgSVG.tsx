import { useRef } from "react";
import { useGSAP, gsap } from "../../lib/gsap";

export default function HeroBgSVG() {
    const svgRef = useRef<SVGSVGElement>(null);

    // 自動漂浮 refs（inner）
    const dotGridRef        = useRef<SVGGElement>(null);
    const circleBlueRef     = useRef<SVGGElement>(null);
    const circleRedRef      = useRef<SVGGElement>(null);
    const arcRef            = useRef<SVGPathElement>(null);
    const outlineCirclesRef = useRef<SVGGElement>(null);

    // 滑鼠視差 refs（outer wrapper）
    const mouseGridRef  = useRef<SVGGElement>(null);
    const mouseBlueRef  = useRef<SVGGElement>(null);
    const mouseRedRef   = useRef<SVGGElement>(null);
    const mouseArcRef   = useRef<SVGGElement>(null);

    useGSAP((_, contextSafe) => {
        // ── 自動漂浮動畫 ──────────────────────────────────────────
        gsap.from(svgRef.current, { opacity: 0, duration: 2.5, ease: "power2.out" });

        gsap.to(dotGridRef.current, {
            opacity: 0.45, duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut",
        });
        gsap.to(circleBlueRef.current, {
            x: -28, y: 20, duration: 16, repeat: -1, yoyo: true, ease: "sine.inOut",
        });
        gsap.to(circleRedRef.current, {
            x: 28, y: -20, duration: 18, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2,
        });
        gsap.to(arcRef.current, {
            rotation: 6, duration: 20, repeat: -1, yoyo: true,
            ease: "sine.inOut", transformOrigin: "50% 50%",
        });
        gsap.to(outlineCirclesRef.current, {
            scale: 1.06, duration: 7, repeat: -1, yoyo: true,
            ease: "sine.inOut", transformOrigin: "50% 50%",
        });
        gsap.to(".hbg-scatter", {
            y: "random(-16, 16)", x: "random(-10, 10)",
            duration: "random(5, 10)", repeat: -1, yoyo: true, ease: "sine.inOut",
            stagger: { each: 0.4, from: "random" },
        });

        // ── 滑鼠視差（quickTo = 高效能，不阻塞主執行緒）────────────
        const gridX  = gsap.quickTo(mouseGridRef.current,  "x", { duration: 1.4, ease: "power3.out" });
        const gridY  = gsap.quickTo(mouseGridRef.current,  "y", { duration: 1.4, ease: "power3.out" });
        const blueX  = gsap.quickTo(mouseBlueRef.current,  "x", { duration: 1.0, ease: "power3.out" });
        const blueY  = gsap.quickTo(mouseBlueRef.current,  "y", { duration: 1.0, ease: "power3.out" });
        const redX   = gsap.quickTo(mouseRedRef.current,   "x", { duration: 1.2, ease: "power3.out" });
        const redY   = gsap.quickTo(mouseRedRef.current,   "y", { duration: 1.2, ease: "power3.out" });
        const arcX   = gsap.quickTo(mouseArcRef.current,   "x", { duration: 1.8, ease: "power3.out" });
        const arcY   = gsap.quickTo(mouseArcRef.current,   "y", { duration: 1.8, ease: "power3.out" });

        const onMouseMove = contextSafe!((e: MouseEvent) => {
            const el = svgRef.current;
            if (!el) return;
            const { left, top, width, height } = el.getBoundingClientRect();
            // -0.5 ~ 0.5，以中心為原點
            const nx = (e.clientX - left) / width  - 0.5;
            const ny = (e.clientY - top)  / height - 0.5;

            // 每個圖層速度不同 → 景深視差感
            gridX(nx * 18);   gridY(ny * 14);   // 角落點陣：最慢（遠景）
            blueX(nx * 48);   blueY(ny * 36);   // 藍圓：快（近景）
            redX(nx * -38);   redY(ny * -28);   // 紅圓：反向，速度中
            arcX(nx * 22);    arcY(ny * 16);    // 弧線：慢
        });

        window.addEventListener("mousemove", onMouseMove);
        return () => window.removeEventListener("mousemove", onMouseMove);
    }, { scope: svgRef });

    return (
        <svg
            ref={svgRef}
            viewBox="0 0 1440 900"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 w-full h-full pointer-events-none select-none"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
        >
            <defs>
                <pattern id="hbg-dots-blue" x="0" y="0" width="13" height="13" patternUnits="userSpaceOnUse">
                    <circle cx="6.5" cy="6.5" r="2.3" fill="#2244ee" />
                </pattern>
                <pattern id="hbg-dots-red" x="0" y="0" width="13" height="13" patternUnits="userSpaceOnUse">
                    <circle cx="6.5" cy="6.5" r="2.3" fill="#ee2255" />
                </pattern>
                <pattern id="hbg-dots-corner" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
                    <circle cx="11" cy="11" r="1.6" fill="#8899dd" opacity="0.7" />
                </pattern>
                <clipPath id="hbg-clip-blue">
                    <circle cx="390" cy="480" r="370" />
                </clipPath>
                <clipPath id="hbg-clip-red">
                    <circle cx="1060" cy="430" r="310" />
                </clipPath>
                <clipPath id="hbg-clip-tl">
                    <rect x="-60" y="-60" width="460" height="460" rx="230" />
                </clipPath>
                <clipPath id="hbg-clip-br">
                    <rect x="1080" y="510" width="420" height="420" rx="210" />
                </clipPath>
            </defs>

            {/* 圖層 1：背景 */}
            <rect width="1440" height="900" fill="#1f2147" />

            {/* 圖層 3：角落點陣（外層=滑鼠，內層=呼吸） */}
            <g ref={mouseGridRef}>
                <g ref={dotGridRef} opacity="0.75">
                    <rect x="-60" y="-60" width="520" height="520"
                        fill="url(#hbg-dots-corner)" clipPath="url(#hbg-clip-tl)" />
                    <rect x="1060" y="490" width="440" height="470"
                        fill="url(#hbg-dots-corner)" clipPath="url(#hbg-clip-br)" />
                </g>
            </g>

            {/* 圖層 5：藍圓（外層=滑鼠，內層=自動漂浮） */}
            <g ref={mouseBlueRef}>
                <g ref={circleBlueRef} opacity="0.6" style={{ mixBlendMode: "screen" }}>
                    <rect x="0" y="80" width="780" height="840"
                        fill="url(#hbg-dots-blue)" clipPath="url(#hbg-clip-blue)" />
                </g>
            </g>

            {/* 圖層 5：紅圓（外層=滑鼠，內層=自動漂浮） */}
            <g ref={mouseRedRef}>
                <g ref={circleRedRef} opacity="0.55" style={{ mixBlendMode: "screen" }}>
                    <rect x="730" y="110" width="730" height="790"
                        fill="url(#hbg-dots-red)" clipPath="url(#hbg-clip-red)" />
                </g>
            </g>

            {/* 圖層 4：大弧線（外層=滑鼠，內層=旋轉） */}
            <g ref={mouseArcRef}>
                <path
                    ref={arcRef}
                    d="M-60,960 Q280,420 160,-60"
                    stroke="#4466ff"
                    strokeWidth="1.5"
                    fill="none"
                    opacity="0.3"
                />
            </g>

            {/* 圖層 5：邊緣輪廓圓圈 */}
            <g ref={outlineCirclesRef}>
                <circle cx="108" cy="790" r="88" stroke="#3355ff" strokeWidth="1.2" fill="none" opacity="0.22" />
                <circle cx="108" cy="790" r="54" stroke="#3355ff" strokeWidth="0.8" fill="none" opacity="0.15" />
                <circle cx="1342" cy="112" r="68" stroke="#ee2255" strokeWidth="1.2" fill="none" opacity="0.22" />
                <circle cx="1342" cy="112" r="40" stroke="#ee2255" strokeWidth="0.8" fill="none" opacity="0.15" />
            </g>

            {/* 圖層 6：散點裝飾 */}
            <g>
                {([
                    [160, 210, 2.8, "#4466ff", 0.5],
                    [310, 340, 2.0, "#ee2255", 0.45],
                    [520, 160, 1.8, "#4466ff", 0.4],
                    [700, 270, 2.4, "#ee2255", 0.5],
                    [820, 590, 1.6, "#4466ff", 0.4],
                    [960, 190, 2.2, "#ee2255", 0.45],
                    [1100, 360, 2.8, "#4466ff", 0.5],
                    [1260, 510, 1.8, "#ee2255", 0.4],
                    [1390, 260, 2.0, "#4466ff", 0.45],
                    [420, 710, 1.6, "#ee2255", 0.4],
                    [610, 830, 2.4, "#4466ff", 0.5],
                    [880, 760, 1.8, "#ee2255", 0.4],
                    [1140, 720, 2.2, "#4466ff", 0.45],
                    [240, 560, 2.0, "#ee2255", 0.4],
                    [760, 90,  1.6, "#4466ff", 0.35],
                    [1300, 820, 2.8, "#ee2255", 0.45],
                    [55,  440, 1.8, "#4466ff", 0.35],
                    [1410, 650, 2.0, "#ee2255", 0.4],
                ] as [number, number, number, string, number][]).map(([x, y, r, fill, opacity], i) => (
                    <circle
                        key={i}
                        className="hbg-scatter"
                        cx={x} cy={y} r={r}
                        fill={fill} opacity={opacity}
                    />
                ))}
            </g>
        </svg>
    );
}
