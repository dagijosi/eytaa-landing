"use client";

import React, { useState } from "react";
import { GitCommit, CheckCircle, ChevronRight } from "lucide-react";

const RELEASES = [
  {
    version: "v0.2.5",
    date: "October 17, 2026",
    tagline: "12 Design Skins & 9 Tuned Playback Profiles",
    badge: "Latest Release",
    badgeColor: "amber",
    highlights: [
      "12 curated complete design skins, including Nord Arctic, Gruvbox Earth, OLED Cinema, Forest Night, Synthwave 84, and Mocha Latte.",
      "Expanded to 9 built-in playback profiles with Late Night, HDR Vivid Pop, Action & Blockbuster, and Vintage Cinema.",
      "In-place profile customizer with live 'Test in Player Now' preview, category filters, search, and one-click cloning.",
      "Import and export custom playback profiles as JSON for backup or sharing.",
      "Advanced subtitle typography: custom font family, full-spectrum color wheel, outline thickness, shadow depth, cinema box, and vertical margins.",
      "Clean borderless TopBar with a unified edge-to-edge frosted glass aesthetic.",
    ],
  },
  {
    version: "v0.2.4",
    date: "October 17, 2026",
    tagline: "Live Media Watcher & Large-Library Performance",
    badge: "Library Performance",
    badgeColor: "cyan",
    highlights: [
      "Live filesystem watcher updates the library automatically when files are added, deleted, or renamed — no manual rescans.",
      "Virtualized media grid renders libraries with thousands of items without DOM overload.",
      "Window position, size, and maximized state now persist across launches.",
      "Application-wide error boundary catches runtime failures with instant reload and recovery options.",
      "Database-level pagination keeps browsing responsive as the library grows.",
      "Modular database and frontend architecture split monolithic components into maintainable submodules.",
    ],
  },
  {
    version: "v0.2.3",
    date: "October 17, 2026",
    tagline: "Network Streams, Playback Stats & OS Integration",
    badge: "Power Features",
    badgeColor: "indigo",
    highlights: [
      "Open direct URLs and network streams (HTTPS, HLS/m3u8, RTSP, RTMP, SRT, UDP) with inline validation.",
      "F9 playback stats overlay shows resolution, container/render FPS, codecs, hardware-decode mode, dropped frames, and speed.",
      "Save the current frame as a screenshot with E, plus chapter-aware navigation.",
      "Windows Now Playing integration surfaces title, artwork, and transport controls in the SMTC flyout and lock screen.",
      "Saved playlists with queue/saved tabs and live drag-to-reorder.",
      "Separate Auto-Play Next and Repeat controls, plus consistent app-wide tooltips.",
    ],
  },
  {
    version: "v0.2.2",
    date: "October 16, 2026",
    tagline: "Rebindable Shortcuts, Music Tab & Canonical Series Grouping",
    badge: "Controls & Library",
    badgeColor: "zinc",
    highlights: [
      "Rebindable keyboard shortcuts grouped by Playback, Seeking, Volume, View, and Tools, with per-row reset and restore defaults.",
      "Scroll-wheel volume over the video area and a custom frosted right-click menu.",
      "Dedicated Music library tab with track counts, filters, and sorting by recent, title, year, or duration.",
      "Canonical series_key grouping keeps naming variants of the same show together; specials sort last and never auto-queue.",
      "Lazy-loaded Settings and Media Library modals plus parallel startup preference loading.",
      "Rewritten scene-name parser and folder-based series naming with non-destructive metadata edits.",
    ],
  },
  {
    version: "v0.2.1",
    date: "October 16, 2026",
    tagline: "Quiet UX Polish & Status HUD Refinement",
    badge: "UX Polish",
    badgeColor: "zinc",
    highlights: [
      "Edge-aligned skip indicators replace intrusive center popups so subtitles and video action stay unobstructed.",
      "Clean play/pause with no center text overlays, keeping paused frames inspection-ready.",
      "Top-center Dynamic Island-style status HUD for volume, speed, tracks, and sleep timer.",
      "Responsive media center header and a rebalanced hero card for narrow and split-screen layouts.",
      "Native-feel minimize, maximize, and close controls in the media library header with full window dragging.",
    ],
  },
  {
    version: "v0.2.0",
    date: "October 15, 2026",
    tagline: "Smart Media Center v2.0 & Cinema-Grade Artwork",
    badge: "Media Center v2",
    badgeColor: "amber",
    highlights: [
      "Collapsible navigation rail with fluid spring physics and icon-rail mode.",
      "Smart TV series and episode architecture: automatic grouping, season counts, and drill-down episode inspector.",
      "Cinema-grade artwork system with zero-crop foreground art and an ambient blur-xl glow layer.",
      "16:9 landscape widescreen mode with a seamless toggle to 2:3 portrait posters.",
      "Procedural backdrop generator for media without embedded or downloaded artwork.",
      "Instant Welcome Screen sync clears watched media from Continue Watching without a restart.",
    ],
  },
  {
    version: "v0.1.5",
    date: "October 15, 2026",
    tagline: "Media Library Resilience & Gentle Update Alerts",
    badge: "Performance & Stability",
    badgeColor: "cyan",
    highlights: [
      "Sub-0.1ms quick-hash fingerprinting detects moved, renamed, and duplicate files without losing watch progress.",
      "Unchanged-file skipping accelerates rescans from minutes to milliseconds, with scan cancellation and live progress.",
      "Removable drive and offline folder protection keeps records instead of wiping them.",
      "Dedicated Duplicates tab and thumbnail cache maintenance with one-click purge.",
      "Gentle 24-hour update notifications that never interrupt active playback.",
      "Standardized EYTAA publisher identity across Rust crates and the Windows bundle.",
    ],
  },
  {
    version: "v0.1.0 – v0.1.4",
    date: "October 12 – 15, 2026",
    tagline: "Foundation, Native Library & Hardware Fallback",
    badge: "Foundation",
    badgeColor: "zinc",
    highlights: [
      "Initial launch of EYTAA (Vistara Player) on Tauri 2, libmpv, and React 19.",
      "Embedded HWND rendering model: native video output beneath a transparent WebView2 overlay.",
      "Native SQLite media library with recursive scanning, thumbnails, favorites, resume points, and playlist import/export.",
      "Automatic GPU decode failure detection with seamless CPU software fallback.",
      "Picture-in-Picture, window snapping, single-instance activation, file associations, and signed auto-updates.",
    ],
  },
];

export function ChangelogTimeline() {
  const [expandedIndex, setExpandedIndex] = useState<number>(0);

  return (
    <section id="changelog" className="py-24 relative bg-[#0c0c0c]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <GitCommit className="w-3.5 h-3.5 text-neutral-300" />
            <span>Release history</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            What&apos;s new in EYTAA
          </h2>
          <p className="mt-4 text-neutral-300 text-sm sm:text-base leading-relaxed">
            Every version and what changed in it. The newest release is open by default &mdash;
            select any version to read its full notes.
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
                    ? "surface-raised border-amber-500/40"
                    : "surface border-white/5 hover:border-white/20"
                }`}
              >
                {/* Header row */}
                <button
                  onClick={() => setExpandedIndex(isExpanded ? -1 : idx)}
                  aria-expanded={isExpanded}
                  className="w-full p-6 text-left flex flex-wrap items-center justify-between gap-4 select-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-black text-white font-mono">{rel.version}</span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                        rel.badgeColor === "amber"
                          ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
                          : "bg-white/5 text-neutral-300 border-white/10"
                      }`}
                    >
                      {rel.badge}
                    </span>
                    <span className="text-xs text-neutral-500 font-mono hidden sm:inline">
                      {rel.date}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-neutral-400 hidden md:inline">{rel.tagline}</span>
                    <ChevronRight
                      className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${
                        isExpanded ? "rotate-90 text-amber-400" : ""
                      }`}
                    />
                  </div>
                </button>

                {/* Expanded content */}
                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-white/5">
                    <div className="text-sm font-semibold text-neutral-200 mb-3">{rel.tagline}</div>
                    <ul className="space-y-2.5">
                      {rel.highlights.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-3 text-sm text-neutral-300">
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
