"use client";

import React, { useState } from "react";
import { GitCommit, Sparkles, Shield, Tv, CheckCircle, ChevronRight, Zap } from "lucide-react";

const RELEASES = [
  {
    version: "v0.2.0",
    date: "October 15, 2026",
    tagline: "Smart Media Center & Cinema-Grade Artwork",
    badge: "Latest Release",
    badgeColor: "amber",
    highlights: [
      "Collapsible Navigation Rail with fluid spring physics and icon-rail mode.",
      "Smart TV Series & Episode architecture: automatic series grouping, season counts, and drill-down episode inspector.",
      "Cinema-Grade Artwork System: Zero-crop presentation with ambient object-cover blur-xl glow layers.",
      "Default 16:9 Landscape widescreen mode with seamless toggle to 2:3 Portrait posters.",
      "Procedural backdrop generator for local media files without external metadata.",
      "Instant Welcome Screen sync: watched media clears from Continue Watching in real time.",
    ],
  },
  {
    version: "v0.1.5",
    date: "October 15, 2026",
    tagline: "Media Library Resilience & Gentle 24h Update Alerts",
    badge: "Performance & Stability",
    badgeColor: "cyan",
    highlights: [
      "Sub-0.1ms quick-hash fingerprinting to detect moved, renamed, and duplicate media files without losing watch history.",
      "Smart unchanged file skipping accelerates folder rescans from minutes to milliseconds.",
      "Removable USB drive and offline folder protection with OFFLINE badge indicators.",
      "Dedicated Duplicate Media detection tab to identify redundant files.",
      "Gentle 24-hour update notifications with 15-second auto-expiring toasts that never interrupt active video playback.",
      "Standardized EYTAA publisher identity across Rust crates and Windows bundle.",
    ],
  },
  {
    version: "v0.1.4",
    date: "October 15, 2026",
    tagline: "Native SQLite Media Indexing & Hardware Decode Fallback",
    badge: "Hardware Hardening",
    badgeColor: "indigo",
    highlights: [
      "Native recursive folder scanner in Rust with background semaphore thumbnail worker.",
      "Automatic GPU decode failure detection with seamless CPU software fallback (hwdec='no').",
      "Custom audio/video playback profiles saved directly to SQLite.",
      "Simple vs. Advanced Settings separation with WCAG AAA accessibility contrast compliance.",
      "Progressive infinite scroll virtualization (48-item chunks) handling 1,000+ item libraries without UI lag.",
      "Sleep/resume clock-drift detector safely pauses playback to avoid D3D11 device loss upon wake.",
    ],
  },
  {
    version: "v0.1.0 – v0.1.3",
    date: "October 12 – 14, 2026",
    tagline: "Initial Architecture & Transparent HWND Engine",
    badge: "Foundation",
    badgeColor: "zinc",
    highlights: [
      "Initial launch of EYTAA (Vistara Player) built on Tauri 2, libmpv, and React 19.",
      "Embedded HWND surface rendering model: native video output beneath transparent WebView2.",
      "Hardware-accelerated Picture-in-Picture (PiP) mode with monitor DPI awareness.",
      "Single-instance Win32 mutex and launch argument forwarding from Windows Explorer.",
      "Custom subtitle customization with font size slider (20px to 90px) and color palettes.",
    ],
  },
];

export function ChangelogTimeline() {
  const [expandedIndex, setExpandedIndex] = useState<number>(0);

  return (
    <section id="changelog" className="py-24 relative bg-[#090C14]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <GitCommit className="w-3.5 h-3.5 text-cyan-400" />
            <span>Evolution & Releases</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Changelog & Release Notes
          </h2>
          <p className="mt-4 text-zinc-300 text-sm sm:text-base">
            Track our rapid cadence of desktop refinements, decoding engine improvements, and UX
            upgrades.
          </p>
        </div>

        {/* Timeline Stack */}
        <div className="space-y-6">
          {RELEASES.map((rel, idx) => {
            const isLatest = idx === 0;
            const isExpanded = expandedIndex === idx;

            return (
              <div
                key={idx}
                className={`rounded-2xl transition-all duration-300 overflow-hidden border ${
                  isLatest
                    ? "glass-panel-elevated border-amber-500/40"
                    : "glass-panel border-white/5 hover:border-white/20"
                }`}
              >
                {/* Header row */}
                <button
                  onClick={() => setExpandedIndex(isExpanded ? -1 : idx)}
                  className="w-full p-6 text-left flex flex-wrap items-center justify-between gap-4 select-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-black text-white font-mono">{rel.version}</span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                        rel.badgeColor === "amber"
                          ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
                          : rel.badgeColor === "cyan"
                          ? "bg-cyan-500/15 text-cyan-300 border-cyan-500/30"
                          : rel.badgeColor === "indigo"
                          ? "bg-indigo-500/15 text-indigo-300 border-indigo-500/30"
                          : "bg-white/10 text-zinc-300 border-white/10"
                      }`}
                    >
                      {rel.badge}
                    </span>
                    <span className="text-xs text-zinc-500 font-mono hidden sm:inline">
                      {rel.date}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-400 hidden md:inline">{rel.tagline}</span>
                    <ChevronRight
                      className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${
                        isExpanded ? "rotate-90 text-amber-400" : ""
                      }`}
                    />
                  </div>
                </button>

                {/* Expanded content */}
                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-white/5">
                    <div className="text-sm font-semibold text-zinc-200 mb-3">{rel.tagline}</div>
                    <ul className="space-y-2.5">
                      {rel.highlights.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-3 text-sm text-zinc-300">
                          <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
