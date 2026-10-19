"use client";

import React, { useState, useEffect } from "react";
import { BookOpen, Cpu, Tv, Sliders, Keyboard, Terminal, Download } from "lucide-react";

const DOCS_NAV_ITEMS = [
  { id: "overview", label: "1. Overview & Architecture", icon: BookOpen },
  { id: "getting-started", label: "2. Getting Started & Specs", icon: Cpu },
  { id: "media-center", label: "3. Smart Media Center & Library", icon: Tv },
  { id: "profiles", label: "4. 9 Playback Profiles & Tuning", icon: Sliders },
  { id: "shortcuts", label: "5. Keyboard Hotkeys Reference", icon: Keyboard },
  { id: "build-from-source", label: "6. Building From Source", icon: Terminal },
  { id: "releases", label: "7. Dynamic Release Archive", icon: Download },
];

export function DocsNav() {
  const [activeSection, setActiveSection] = useState<string>("overview");

  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = DOCS_NAV_ITEMS.map((item) => item.id);
      const scrollPosition = window.scrollY + 180;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          return;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="sticky top-24 p-4 rounded-2xl surface border-white/10 space-y-2">
      <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 px-3 py-1">
        Chapters
      </div>
      <nav className="space-y-1 text-xs">
        {DOCS_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          const isReleaseArchive = item.id === "releases";

          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all duration-200 font-medium ${
                isActive
                  ? isReleaseArchive
                    ? "bg-amber-400 text-black font-extrabold shadow-md shadow-amber-500/25"
                    : "bg-white/10 text-white font-bold border border-white/10 shadow-sm"
                  : isReleaseArchive
                  ? "bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20"
                  : "text-neutral-400 hover:text-neutral-200 hover:bg-white/5"
              }`}
            >
              <Icon
                className={`w-4 h-4 flex-shrink-0 ${
                  isActive
                    ? isReleaseArchive
                      ? "text-black"
                      : "text-amber-400"
                    : isReleaseArchive
                    ? "text-amber-400"
                    : "text-neutral-400"
                }`}
              />
              <span className="truncate">{item.label}</span>
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-400" />
              )}
            </a>
          );
        })}
      </nav>
    </div>
  );
}
