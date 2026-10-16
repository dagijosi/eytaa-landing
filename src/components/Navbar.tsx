"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Download, Menu, X, Sparkles, BookOpen, Layers } from "lucide-react";
import { GithubIcon } from "@/components/GithubIcon";

const NAV_ITEMS = [
  { id: "interactive-demo", label: "Interactive Demo", href: "/#interactive-demo" },
  { id: "architecture", label: "Architecture", href: "/#architecture" },
  { id: "features", label: "Features", href: "/#features" },
  { id: "shortcuts", label: "Shortcuts", href: "/#shortcuts" },
  { id: "changelog", label: "Changelog", href: "/#changelog" },
];

export function Navbar() {
  const pathname = usePathname();
  const isDocsPage = pathname.startsWith("/docs");
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ScrollSpy for landing page sections
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (isDocsPage) {
        setActiveSection("docs");
        return;
      }

      const sectionIds = ["interactive-demo", "architecture", "features", "shortcuts", "changelog", "download"];
      const scrollPosition = window.scrollY + 200;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          return;
        }
      }

      if (window.scrollY < 300) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDocsPage]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

  return (
    <header
      id="site-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#070A11]/90 backdrop-blur-2xl border-b border-white/[0.08] shadow-2xl shadow-black/60 py-3"
          : "bg-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Amharic Lens Symbol */}
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 group select-none"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/eytaa-icon.svg"
                alt="EYTAA Optical Aperture Logo"
                width={40}
                height={40}
                className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(245,158,11,0.5)]"
                priority
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-black tracking-tight bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                  EYTAA
                </span>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  v0.2.0
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] text-zinc-400 font-medium tracking-wide">
                Vistara Player • Windows
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links with Active ScrollSpy Indicator */}
          <nav className="hidden lg:flex items-center gap-1.5 p-1 rounded-full bg-white/[0.03] border border-white/[0.06] backdrop-blur-md">
            {NAV_ITEMS.map((item) => {
              const isActive = !isDocsPage && activeSection === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? "text-black bg-gradient-to-r from-amber-300 to-amber-400 shadow-md shadow-amber-500/25"
                      : "text-zinc-300 hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* Docs & Releases Link */}
            <Link
              href="/docs"
              className={`relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                isDocsPage
                  ? "text-black bg-gradient-to-r from-amber-300 to-amber-400 shadow-md shadow-amber-500/25"
                  : "text-amber-300/90 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Docs &amp; Releases</span>
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://github.com/dagijosi/Eytaa"
              target="_blank"
              rel="noopener noreferrer"
              id="nav-github-btn"
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl text-zinc-300 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/20 transition-all duration-200"
            >
              <GithubIcon className="w-4 h-4 text-zinc-300" />
              <span>GitHub</span>
            </a>

            <a
              href="/api/download?type=exe"
              download
              id="nav-download-btn"
              className="group flex items-center gap-2 px-4 py-2 text-xs font-extrabold rounded-xl text-black bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              <Download className="w-3.5 h-3.5 text-black group-hover:scale-110 transition-transform" />
              <span>Download .EXE</span>
            </a>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-zinc-300 hover:text-white transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bottom-0 bg-[#06080D]/95 backdrop-blur-2xl border-b border-white/10 overflow-y-auto px-6 py-6 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-2">
            <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 px-3 py-1">
              Navigation
            </div>

            {NAV_ITEMS.map((item) => {
              const isActive = !isDocsPage && activeSection === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-amber-400 text-black font-bold shadow-md shadow-amber-500/20"
                      : "text-zinc-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-black/20 text-black">Active</span>}
                </Link>
              );
            })}

            <Link
              href="/docs"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all mt-2 border ${
                isDocsPage
                  ? "bg-amber-400 text-black border-amber-400"
                  : "bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20"
              }`}
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>Documentation &amp; Releases</span>
              </div>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-500/40">
                All Versions
              </span>
            </Link>
          </div>

          {/* Action CTAs in Mobile Drawer */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col gap-3">
            <a
              href="/api/download?type=exe"
              download
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2.5 py-3.5 text-sm font-extrabold rounded-xl text-black bg-gradient-to-r from-amber-400 to-amber-500 shadow-xl shadow-amber-500/25 active:scale-95 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Direct Download .EXE (x64)</span>
            </a>

            <a
              href="https://github.com/dagijosi/Eytaa"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 text-xs font-semibold rounded-xl text-zinc-300 bg-white/[0.05] border border-white/10 hover:bg-white/10 transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub Repository</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
