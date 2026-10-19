"use client";

import React from "react";
import {
  FolderSync,
  Tv,
  Layers,
  LayoutGrid,
  Sliders,
  Moon,
  Keyboard,
  Palette,
  Radio,
  Cpu,
  Fingerprint,
  PanelsTopLeft,
  ListChecks,
} from "lucide-react";

const FEATURES = [
  {
    icon: LayoutGrid,
    title: "Your folders become a library",
    badge: "Smart Media Center v2",
    description:
      "Point EYTAA at your media folders once. It indexes movies, series, and music into local SQLite, groups every season and episode, and keeps a resume point for each one.",
  },
  {
    icon: FolderSync,
    title: "The library updates itself",
    badge: "Live File Watcher",
    description:
      "A native filesystem watcher notices new, renamed, or deleted files and refreshes the library instantly — no manual rescans, no stale entries.",
  },
  {
    icon: Fingerprint,
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
    icon: Sliders,
    title: "Right look and sound, one click",
    badge: "9 Profiles",
    description:
      "Anime, Cinema, Music, Podcasts, Late Night, HDR Vivid Pop, Action & Blockbuster, Vintage Cinema, and Balanced — each tunes picture, audio, speed, and subtitles together.",
  },
  {
    icon: Palette,
    title: "Make it look like yours",
    badge: "12 Skins",
    description:
      "Twelve complete design skins plus custom accents, glass styles, scrubber geometry, and full subtitle typography. Your player should not look like everyone else's.",
  },
  {
    icon: Radio,
    title: "Streams are first-class",
    badge: "HLS • RTSP • RTMP",
    description:
      "Open direct URLs and network streams alongside local files, then check codecs, hardware decode mode, dropped frames, and FPS with the F9 stats overlay.",
  },
  {
    icon: Layers,
    title: "Float video above your work",
    badge: "Picture-in-Picture",
    description:
      "Pop playback into a small always-on-top mini player sized correctly for your monitor's DPI, with its own scrubber and a one-click restore to the full window.",
  },
  {
    icon: PanelsTopLeft,
    title: "Snap the window anywhere",
    badge: "Native Layouts",
    description:
      "Half screen, two-thirds sidebar, quarter quadrant, or centered — exact Windows snap layouts without installing a tiling manager.",
  },
  {
    icon: Moon,
    title: "Fall asleep on time",
    badge: "Sleep Timer",
    description:
      "Set 15–120 minutes or 'end of this episode'. Volume fades out gently over 30 seconds instead of cutting to silence, and playback pauses when you close the lid.",
  },
  {
    icon: Keyboard,
    title: "Every key is your key",
    badge: "Rebindable",
    description:
      "Rebind every action in Settings, or control playback with Windows media keys while EYTAA is in the background. Nothing is locked to someone else's defaults.",
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
            Everything they make you set up, built in
          </h2>
          <p className="mt-4 text-neutral-300 text-sm sm:text-base leading-relaxed">
            Your library, seasons, profiles, subtitles, and window layout are all handled natively —
            no plugins, no scraper accounts, no setup screens. It works the moment you install it.
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
