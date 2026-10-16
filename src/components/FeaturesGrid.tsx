"use client";

import React from "react";
import {
  FolderSync,
  Tv,
  Layers,
  LayoutGrid,
  Sliders,
  Moon,
  Sparkles,
  ShieldCheck,
  Disc,
  Volume2,
  Subtitles,
  Cpu,
} from "lucide-react";

const FEATURES = [
  {
    icon: FolderSync,
    title: "Resilient Media Library (<0.1ms Quick-Hash)",
    badge: "v0.1.5",
    color: "amber",
    description:
      "Rename files, move whole folders across drives, or disconnect USB disks — EYTAA computes byte-sampled quick hashes in under 0.1ms, preserving watch progress, history, and favorites without missing a beat.",
  },
  {
    icon: Tv,
    title: "Smart Series & Sibling Detection",
    badge: "v0.2.0",
    color: "cyan",
    description:
      "Open any single episode file and EYTAA instantly scans the folder for matching naming patterns (S01E01, 1x02, [Group] - 03). An unobtrusive toast lets you queue all sibling episodes in sequential order with one click.",
  },
  {
    icon: Layers,
    title: "Hardware-Accelerated Picture-in-Picture",
    badge: "Win32 DPI-Aware",
    color: "amber",
    description:
      "Calculates active monitor DPI and scaling to pop out a floating 16:9 mini-player (420x236px) snapped to the bottom-right corner with always-on-top rendering, mini scrubber, and instant window restore.",
  },
  {
    icon: LayoutGrid,
    title: "Native Snap Zones & Multi-Window",
    badge: "Ergonomics",
    color: "cyan",
    description:
      "Snap the player into Half Screen (50/50), Two-Thirds / One-Third sidebar layouts, Quadrants (25%), or Center display with zero third-party tiling managers required.",
  },
  {
    icon: Sliders,
    title: "Cinema & Anime Audio/Visual Profiles",
    badge: "Studio Tuning",
    color: "amber",
    description:
      "Switch instantly between Anime (boosted lineart saturation + soft yellow #FFF176 subtitles), Cinema (filmic contrast + night loudnorm audio dynamic leveling), and Vocal Clarity for lectures.",
  },
  {
    icon: Moon,
    title: "Smart Sleep Timer & Night Mode",
    badge: "Night Listening",
    color: "cyan",
    description:
      "Set timers for 15–120 minutes or 'End of Current Video'. Features a gentle 30-second volume fade-out to prevent sudden silence from waking you, and automatically pauses on laptop lid close.",
  },
  {
    icon: Sparkles,
    title: "Clean Media Title Formatter",
    badge: "Automatic",
    color: "amber",
    description:
      "Strips annoying tracker scene noise ([SubsPlease], RARBG, YTS, x264, 1080p BluRay) to present clean, beautiful season and episode badges on the titlebar and media center.",
  },
  {
    icon: Subtitles,
    title: "Styled ASS/SSA & PGS Subtitle Renderer",
    badge: "libass Built-In",
    color: "cyan",
    description:
      "Full support for complex karaoke typesetting, custom embedded fonts, and vector graphics through libass without external codecs or Windows filter packs.",
  },
  {
    icon: Cpu,
    title: "Automatic GPU Decode Fallback",
    badge: "v0.1.4 Reliability",
    color: "amber",
    description:
      "If graphics driver hardware decoding (D3D11va/NVDEC) fails on corrupted or obscure media streams, EYTAA automatically recovers and falls back to CPU software decoding seamlessly.",
  },
];

export function FeaturesGrid() {
  return (
    <section id="features" className="py-24 relative bg-[#090C14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Engineered For Media Enthusiasts</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Built Different. Built For Speed.
          </h2>
          <p className="mt-4 text-zinc-300 text-sm sm:text-base">
            Every feature in EYTAA is purpose-built to solve real frustrations found in legacy
            players and web wrappers alike.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            const isAmber = feature.color === "amber";

            return (
              <div
                key={idx}
                className="glass-panel p-6 rounded-2xl border-white/5 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                      isAmber
                        ? "bg-amber-500/15 text-amber-400 group-hover:bg-amber-500/25"
                        : "bg-cyan-500/15 text-cyan-400 group-hover:bg-cyan-500/25"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span
                    className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                      isAmber
                        ? "bg-amber-500/10 text-amber-300 border-amber-500/30"
                        : "bg-cyan-500/10 text-cyan-300 border-cyan-500/30"
                    }`}
                  >
                    {feature.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
