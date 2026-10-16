"use client";

import React, { useState } from "react";
import { Keyboard, Search, Radio, Monitor, Sliders, Volume2 } from "lucide-react";

interface ShortcutItem {
  keys: string[];
  action: string;
  category: "playback" | "audio" | "window" | "system";
  scope: "In-App" | "System-Wide";
}

const SHORTCUTS: ShortcutItem[] = [
  { keys: ["Space"], action: "Toggle Play / Pause", category: "playback", scope: "In-App" },
  { keys: ["←"], action: "Seek backward 5 seconds", category: "playback", scope: "In-App" },
  { keys: ["→"], action: "Seek forward 5 seconds", category: "playback", scope: "In-App" },
  { keys: ["Shift", "←"], action: "Seek backward 30 seconds", category: "playback", scope: "In-App" },
  { keys: ["Shift", "→"], action: "Seek forward 30 seconds", category: "playback", scope: "In-App" },
  { keys: ["↑"], action: "Increase volume (+5%)", category: "audio", scope: "In-App" },
  { keys: ["↓"], action: "Decrease volume (-5%)", category: "audio", scope: "In-App" },
  { keys: ["M"], action: "Toggle Mute", category: "audio", scope: "In-App" },
  { keys: ["F"], action: "Toggle Fullscreen (or Double-Click)", category: "window", scope: "In-App" },
  { keys: ["P"], action: "Toggle Picture-in-Picture (PiP) mode", category: "window", scope: "In-App" },
  { keys: ["O"], action: "Open File dialog via native picker", category: "playback", scope: "In-App" },
  { keys: ["L"], action: "Toggle Slide-Out Playlist drawer", category: "playback", scope: "In-App" },
  { keys: ["S"], action: "Toggle Modular Settings center", category: "window", scope: "In-App" },
  { keys: ["T"], action: "Toggle Sleep Timer modal", category: "playback", scope: "In-App" },
  { keys: ["N"], action: "Toggle Night Listening loudnorm mode", category: "audio", scope: "In-App" },
  { keys: ["C"], action: "Cycle Playback Profile (Anime, Cinema, Balanced)", category: "playback", scope: "In-App" },
  { keys: ["V"], action: "Cycle Video Fit Mode (Fit, Fill, Stretch)", category: "window", scope: "In-App" },
  { keys: ["["], action: "Decrease playback speed by 0.1x", category: "playback", scope: "In-App" },
  { keys: ["]"], action: "Increase playback speed by 0.1x", category: "playback", scope: "In-App" },
  { keys: ["Backspace"], action: "Reset playback speed to 1.0x", category: "playback", scope: "In-App" },
  { keys: ["MediaPlayPause"], action: "Global hardware key play/pause", category: "system", scope: "System-Wide" },
  { keys: ["MediaTrackNext"], action: "Global hardware next track", category: "system", scope: "System-Wide" },
  { keys: ["MediaTrackPrevious"], action: "Global hardware previous track", category: "system", scope: "System-Wide" },
];

export function ShortcutsCheatSheet() {
  const [filterQuery, setFilterQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredShortcuts = SHORTCUTS.filter((s) => {
    const matchesSearch =
      s.action.toLowerCase().includes(filterQuery.toLowerCase()) ||
      s.keys.some((k) => k.toLowerCase().includes(filterQuery.toLowerCase()));
    const matchesCat = selectedCategory === "all" || s.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <section id="shortcuts" className="py-24 relative bg-[#07090E]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Keyboard className="w-3.5 h-3.5 text-amber-400" />
            <span>Fluid Ergonomics</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Designed For Keystroke Mastery
          </h2>
          <p className="mt-4 text-zinc-300 text-sm sm:text-base">
            Every major playback, profile, and window state can be controlled through instant hotkeys
            and system-wide Windows media keys.
          </p>
        </div>

        {/* Filter & Category Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "All Shortcuts" },
              { id: "playback", label: "Playback" },
              { id: "audio", label: "Audio & EQ" },
              { id: "window", label: "Window & PiP" },
              { id: "system", label: "System-Wide" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? "bg-amber-400 text-black shadow-md shadow-amber-500/20"
                    : "bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/5"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search shortcuts..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400/50"
            />
          </div>
        </div>

        {/* Shortcuts Table / Card List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredShortcuts.map((item, index) => {
            const isSystemWide = item.scope === "System-Wide";
            return (
              <div
                key={index}
                className="glass-panel p-4 rounded-xl border-white/5 hover:border-amber-500/30 flex items-center justify-between gap-4 transition-colors"
              >
                <div className="flex-1">
                  <div className="text-sm font-semibold text-white">{item.action}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full ${
                        isSystemWide
                          ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30"
                          : "bg-white/5 text-zinc-400"
                      }`}
                    >
                      {item.scope}
                    </span>
                    <span className="text-[10px] text-zinc-500 capitalize">{item.category}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {item.keys.map((k, kIdx) => (
                    <kbd key={kIdx} className="keycap text-xs">
                      {k}
                    </kbd>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {filteredShortcuts.length === 0 && (
          <div className="text-center py-12 glass-panel rounded-2xl text-zinc-400 text-sm">
            No keyboard shortcuts found matching &ldquo;{filterQuery}&rdquo;.
          </div>
        )}
      </div>
    </section>
  );
}
