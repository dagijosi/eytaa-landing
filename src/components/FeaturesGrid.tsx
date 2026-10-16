"use client";

import React from "react";
import {
  FolderSync,
  Tv,
  Layers,
  LayoutGrid,
  Sliders,
  Moon,
  Type,
  Subtitles,
  Cpu,
  ListChecks,
} from "lucide-react";

const FEATURES = [
  {
    icon: FolderSync,
    title: "Never lose your place",
    badge: "Quick-Hash <0.1ms",
    description:
      "Rename files, move whole folders across drives, or unplug a USB disk — EYTAA fingerprints each file in under 0.1ms, so watch progress, history, and favorites always survive.",
  },
  {
    icon: Tv,
    title: "Play a whole season in one click",
    badge: "Auto Detection",
    description:
      "Open any single episode and EYTAA finds its siblings in the same folder (S01E01, 1x02, [Group] - 03), then offers to queue every episode in order.",
  },
  {
    icon: Layers,
    title: "Float video above your work",
    badge: "Picture-in-Picture",
    description:
      "Pop playback into a small always-on-top mini player sized correctly for your monitor's DPI, with its own scrubber and a one-click restore to the full window.",
  },
  {
    icon: LayoutGrid,
    title: "Snap the window anywhere",
    badge: "Native Layouts",
    description:
      "Half screen, two-thirds sidebar, quarter quadrant, or centered — exact Windows snap layouts without installing a tiling manager.",
  },
  {
    icon: Sliders,
    title: "Right look and sound, one click",
    badge: "Studio Profiles",
    description:
      "Anime (richer color + soft yellow subtitles), Cinema (filmic contrast + volume that tames explosions), and Vocal Clarity for podcasts and lectures.",
  },
  {
    icon: Moon,
    title: "Fall asleep on time",
    badge: "Sleep Timer",
    description:
      "Set 15–120 minutes or 'end of this episode'. Volume fades out gently over 30 seconds instead of cutting to silence, and playback pauses when you close the lid.",
  },
  {
    icon: Type,
    title: "Clean, readable titles",
    badge: "Auto Formatter",
    description:
      "Tracker and scene noise ([SubsPlease], RARBG, x264, 1080p BluRay) is stripped away, leaving tidy season and episode badges everywhere.",
  },
  {
    icon: Subtitles,
    title: "Subtitles that render correctly",
    badge: "libass Built-In",
    description:
      "Complex ASS/SSA typesetting, karaoke effects, embedded fonts, and PGS image subtitles all work out of the box — no extra codecs or filter packs.",
  },
  {
    icon: Cpu,
    title: "Never stalls on a broken file",
    badge: "Auto Fallback",
    description:
      "If hardware decoding (D3D11va / NVDEC) fails on a damaged or unusual stream, EYTAA detects it and falls back to software decoding without you noticing.",
  },
];

export function FeaturesGrid() {
  return (
    <section id="features" className="py-24 relative bg-[#0c0c0c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full chip text-neutral-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <ListChecks className="w-3.5 h-3.5 text-amber-400" />
            <span>What you get</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Nine frustrations, solved
          </h2>
          <p className="mt-4 text-neutral-300 text-sm sm:text-base leading-relaxed">
            Every feature below exists because other players get it wrong — no plugins, no setup
            screens, no account. It works the moment you install it.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;

            return (
              <div
                key={idx}
                className="surface p-6 rounded-2xl border-white/5 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/20">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border bg-white/5 text-neutral-300 border-white/10">
                    {feature.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-400 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
