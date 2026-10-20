"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Download, Menu, X, BookOpen } from "lucide-react";
import { GithubIcon } from "@/components/GithubIcon";
import { useLatestVersion } from "@/lib/useReleaseInfo";

const NAV_ITEMS = [
  { id: "interactive-demo", label: "UI Preview", href: "/#interactive-demo" },
  { id: "media-center", label: "Media Center", href: "/#media-center" },
  { id: "architecture", label: "Why EYTAA", href: "/#architecture" },
  { id: "features", label: "Features", href: "/#features" },
  { id: "changelog", label: "Changelog", href: "/#changelog" },
];

export function Navbar() {
  const pathname = usePathname();
  const isDocsPage = pathname.startsWith("/docs");
  const headerRef = useRef<HTMLElement | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(72);
  const version = useLatestVersion();

  // ScrollSpy for landing page sections
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }

      if (isDocsPage) {
        setActiveSection("docs");
        return;
      }

      const sectionIds = ["interactive-demo", "media-center", "architecture", "features", "shortcuts", "changelog", "download"];
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
    window.addEventListener("resize", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isDocsPage]);

  // Lock body scroll + close on Escape when mobile menu is open
  useEffect(() => {
    if (!mobileMenuOpen) return;

    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <header
      ref={headerRef}
      id="site-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/[0.08] py-3"
          : "bg-transparent py-4 sm:py-5"
      }`}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-amber-400 focus:text-black focus:text-xs focus:font-bold"
      >
        Skip to content
      </a>
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-black tracking-tight text-amber-400">
                  EYTAA
                </span>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 text-neutral-400 border border-white/10">
                  {version}
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] text-neutral-400 font-medium tracking-wide">
                Vistara Player • Desktop
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links with Active ScrollSpy Indicator */}
          <nav aria-label="Primary" className="hidden lg:flex items-center gap-1.5 p-1 rounded-full bg-white/[0.03] border border-white/[0.08]">
            {NAV_ITEMS.map((item) => {
              const isActive = !isDocsPage && activeSection === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? "text-black bg-amber-500"
                      : "text-neutral-300 hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* Docs & Releases Link */}
            <Link
              href="/docs"
              aria-current={isDocsPage ? "page" : undefined}
              className={`relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                isDocsPage
                  ? "text-black bg-amber-500"
                  : "text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30"
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
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl text-neutral-300 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/20 transition-all duration-200"
            >
              <GithubIcon className="w-4 h-4 text-neutral-300" />
              <span>GitHub</span>
            </a>

            <a
              href="/api/download?type=exe"
              download
              id="nav-download-btn"
              className="group flex items-center gap-2 px-4 py-2 text-xs font-extrabold rounded-xl text-black bg-amber-500 hover:bg-amber-400 shadow-sm hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              <Download className="w-3.5 h-3.5 text-black group-hover:scale-110 transition-transform" />
              <span>Download .EXE</span>
            </a>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-neutral-300 hover:text-white transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Drawer */}
      {mobileMenuOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 z-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div
            style={{ top: headerHeight }}
            className="lg:hidden fixed inset-x-0 bottom-0 z-10 bg-[#0a0a0a]/95 backdrop-blur-2xl border-b border-white/10 overflow-y-auto px-6 py-6 animate-in fade-in slide-in-from-top-4 duration-200"
          >
            <div className="flex flex-col gap-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 px-3 py-1">
                Navigation
              </div>

              {NAV_ITEMS.map((item) => {
                const isActive = !isDocsPage && activeSection === item.id;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-current={isActive ? "true" : undefined}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-amber-400 text-black font-bold shadow-md shadow-amber-500/20"
                        : "text-neutral-300 hover:text-white hover:bg-white/5"
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
                aria-current={isDocsPage ? "page" : undefined}
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
                className="flex items-center justify-center gap-2.5 py-3.5 text-sm font-extrabold rounded-xl text-black bg-amber-500 active:scale-95 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download for Windows (.exe)</span>
              </a>

              <a
                href="https://github.com/dagijosi/Eytaa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 text-xs font-semibold rounded-xl text-neutral-300 bg-white/[0.05] border border-white/10 hover:bg-white/10 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>View source on GitHub</span>
              </a>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
