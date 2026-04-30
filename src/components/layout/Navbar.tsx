import { useEffect, useRef, useState } from "react";
import { TfiAlignJustify } from "react-icons/tfi";
import { HiOutlineEnvelope, HiChevronDown } from "react-icons/hi2";
import { createPortal } from "react-dom";

type NavChild = { label: string; href: string };
type NavItem  = { label: string; href?: string; children?: NavChild[] };

const navItems: NavItem[] = [
    { label: "計畫簡介", href: "#" },
    { label: "公告事項", href: "#" },
    { label: "功能專區", children: [
        { label: "技術工具", href: "#" },
        { label: "人才培育", href: "#" },
        { label: "產業輔導", href: "#" },
        { label: "補助資源", href: "#" },
    ]},
    { label: "我要媒合", children: [
        { label: "企業名錄", href: "#" },
        { label: "媒合對接", href: "#" },
    ]},
    { label: "產業案例", href: "#cases" },
    { label: "會員中心", href: "#" },
];

function getFocusableElements(container: HTMLElement | null) {
    if (!container) return [];
    return Array.from(
        container.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])')
    ).filter((el) => el.getAttribute("aria-hidden") !== "true");
}

function DropdownItem({ item }: { item: NavItem }) {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;
        const onPointerDown = (e: PointerEvent) => {
            if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("pointerdown", onPointerDown);
        return () => document.removeEventListener("pointerdown", onPointerDown);
    }, [open]);

    return (
        <div ref={containerRef} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            <button
                onClick={() => setOpen((v) => !v)}
                aria-haspopup="true"
                aria-expanded={open}
                className="group relative inline-flex items-center gap-1 py-2 text-navy-600 transition-all duration-300 hover:text-purple-500 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-purple-500 after:transition-transform after:duration-300 after:ease-out after:content-[''] hover:after:scale-x-100 cursor-pointer"
            >
                {item.label}
                <HiChevronDown className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
            </button>
            {open && (
                <div className="absolute left-0 top-full z-50 pt-1">
                    <ul role="menu" className="min-w-[140px] rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
                        {item.children!.map((child) => (
                            <li key={child.label} role="none">
                                <a
                                    role="menuitem"
                                    href={child.href}
                                    onClick={() => setOpen(false)}
                                    className="block px-4 py-2 text-sm text-navy-600 hover:bg-lavender hover:text-purple-600 transition-colors"
                                >
                                    {child.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

function DrawerNavItem({ item, onClose }: { item: NavItem; onClose: () => void }) {
    const [expanded, setExpanded] = useState(false);

    if (!item.children) {
        return (
            <a href={item.href} onClick={onClose} className="block rounded px-3 py-2 text-lg text-white hover:bg-white hover:text-navy-600">
                {item.label}
            </a>
        );
    }

    return (
        <div>
            <button
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
                className="flex w-full items-center justify-between rounded px-3 py-2 text-lg text-white hover:bg-white hover:text-navy-600 cursor-pointer"
            >
                {item.label}
                <HiChevronDown className={`w-5 h-5 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
            </button>
            {expanded && (
                <ul className="mt-1 ml-4 border-l border-white/30 pl-3 space-y-1">
                    {item.children.map((child) => (
                        <li key={child.label}>
                            <a href={child.href} onClick={onClose} className="block rounded px-3 py-1.5 text-base text-white/90 hover:bg-white hover:text-navy-600">
                                {child.label}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

function Drawer({ open, onClose, closeBtnRef }: { open: boolean; onClose: () => void; closeBtnRef: React.RefObject<HTMLButtonElement | null> }) {
    const asideRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!open) return;
        document.body.style.overflow = "hidden";
        const raf = requestAnimationFrame(() => closeBtnRef.current?.focus());

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") { e.preventDefault(); onClose(); return; }
            if (e.key === "Tab") {
                const els = getFocusableElements(asideRef.current);
                if (!els.length) { e.preventDefault(); return; }
                const first = els[0]; const last = els[els.length - 1];
                const active = document.activeElement as HTMLElement;
                if (!e.shiftKey && active === last) { e.preventDefault(); first.focus(); }
                else if (e.shiftKey && active === first) { e.preventDefault(); last.focus(); }
            }
        };
        document.addEventListener("keydown", onKeyDown);
        return () => { cancelAnimationFrame(raf); document.body.style.overflow = ""; document.removeEventListener("keydown", onKeyDown); };
    }, [open, onClose, closeBtnRef]);

    return createPortal(
        <>
            <div
                className={`fixed inset-0 z-[100] bg-black/40 transition-opacity ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
                onClick={onClose}
                aria-hidden={!open}
            />
            <aside
                ref={asideRef}
                role="dialog"
                aria-modal="true"
                aria-label="側邊選單"
                aria-hidden={!open}
                className={`fixed right-0 top-0 z-[101] h-full w-[80%] max-w-sm bg-gradient-dark border-l border-navy-700 shadow-xl transition-transform ${open ? "translate-x-0" : "translate-x-full"}`}
            >
                <div className="flex items-center justify-between p-4 border-b border-white/20">
                    <div className="text-lg text-white font-semibold">選單</div>
                    <button
                        ref={closeBtnRef}
                        onClick={onClose}
                        className="rounded px-3 py-1.5 text-sm border border-white/40 text-white hover:bg-white hover:text-navy-600 cursor-pointer"
                    >
                        關閉
                    </button>
                </div>
                <nav className="p-4" aria-label="網站導覽">
                    <ul className="divide-y divide-white/20">
                        {navItems.map((it) => (
                            <li key={it.label}>
                                <DrawerNavItem item={it} onClose={onClose} />
                            </li>
                        ))}
                        <li>
                            <a href="#newsletter-section" onClick={onClose} className="flex items-center gap-2 rounded px-3 py-2 text-lg text-white hover:bg-white hover:text-navy-600">
                                訂閱電子報
                            </a>
                        </li>
                    </ul>
                </nav>
            </aside>
        </>,
        document.body
    );
}

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const menuBtnRef = useRef<HTMLButtonElement>(null);
    const closeBtnRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!open) menuBtnRef.current?.focus();
    }, [open]);

    return (
        <header className="sticky top-0 z-40 bg-white/92 backdrop-blur border-b border-gray-100">
            <div className="mx-auto max-w-6xl px-4">
                <div className="flex h-16 items-center justify-between">
                    <a href="/" className="flex items-center gap-3">
                        <img src="/logo.svg" alt="石化產業媒合平台" width={300} height={40} />
                    </a>
                    <nav className="hidden lg:flex items-center gap-6 text-base font-medium">
                        {navItems.map((it) =>
                            it.children ? (
                                <DropdownItem key={it.label} item={it} />
                            ) : (
                                <a
                                    key={it.label}
                                    href={it.href}
                                    className="group relative inline-block py-2 text-navy-600 transition-all duration-300 hover:text-purple-500 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-purple-500 after:transition-transform after:duration-300 after:ease-out after:content-[''] hover:after:scale-x-100"
                                >
                                    {it.label}
                                </a>
                            )
                        )}
                        <a
                            href="#newsletter-section"
                            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-cta px-4 py-1.5 text-sm font-semibold text-white shadow hover:opacity-90 transition-opacity"
                        >
                            <HiOutlineEnvelope className="w-4 h-4" />
                            訂閱電子報
                        </a>
                    </nav>
                    <button
                        ref={menuBtnRef}
                        className="lg:hidden rounded px-3 py-2 text-sm font-medium border border-gray-300 hover:bg-gray-50 cursor-pointer"
                        onClick={() => setOpen(true)}
                        aria-label="開啟選單"
                        aria-haspopup="dialog"
                        aria-expanded={open}
                    >
                        <TfiAlignJustify />
                    </button>
                </div>
            </div>
            <Drawer open={open} onClose={() => setOpen(false)} closeBtnRef={closeBtnRef} />
        </header>
    );
}
