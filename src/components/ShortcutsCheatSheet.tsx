"use client";

import React, { useState } from "react";
import { Keyboard, Search } from "lucide-react";

interface ShortcutItem {
  keys: string[];
  action: string;
  category: "playback" | "seeking" | "volume" | "view" | "tools" | "system";
  scope: "In-App" | "System-Wide";
}

const SHORTCUTS: ShortcutItem[] = [
  { keys: ["Space", "K"], action: "Toggle Play / Pause", category: "playback", scope: "In-App" },
  { keys: ["["], action: "Decrease playback speed by 0.25x", category: "playback", scope: "In-App" },
  { keys: ["]"], action: "Increase playback speed by 0.25x", category: "playback", scope: "In-App" },
  { keys: ["Backspace"], action: "Reset playback speed to 1.0x", category: "playback", scope: "In-App" },
  { keys: ["←", "→"], action: "Seek backward / forward 10 seconds", category: "seeking", scope: "In-App" },
  { keys: ["Shift", "←", "→"], action: "Seek 30 seconds (hold Shift)", category: "seeking", scope: "In-App" },
  { keys: ["↑", "↓"], action: "Volume up / down by 5%", category: "volume", scope: "In-App" },
  { keys: ["M"], action: "Mute / unmute", category: "volume", scope: "In-App" },
  { keys: ["F", "Enter"], action: "Toggle fullscreen", category: "view", scope: "In-App" },
  { keys: ["I"], action: "Toggle Picture-in-Picture (PiP)", category: "view", scope: "In-App" },
  { keys: ["P"], action: "Toggle the playlist drawer", category: "view", scope: "In-App" },
  { keys: ["B"], action: "Toggle the media library", category: "view", scope: "In-App" },
  { keys: ["Esc"], action: "Close menus, drawers and PiP (fixed, not rebindable)", category: "view", scope: "In-App" },
  { keys: ["S"], action: "Cycle subtitle track", category: "tools", scope: "In-App" },
  { keys: ["A"], action: "Cycle audio track", category: "tools", scope: "In-App" },
  { keys: ["R"], action: "Cycle repeat mode", category: "tools", scope: "In-App" },
  { keys: ["O"], action: "Open a file with the native picker", category: "tools", scope: "In-App" },
  { keys: ["U"], action: "Open a network stream (URL dialog)", category: "tools", scope: "In-App" },
  { keys: ["E"], action: "Save the current frame as a screenshot", category: "tools", scope: "In-App" },
  { keys: ["F7"], action: "Cycle playback profile", category: "tools", scope: "In-App" },
  { keys: ["F8"], action: "Toggle night listening", category: "tools", scope: "In-App" },
  { keys: ["F9"], action: "Toggle the playback stats overlay", category: "tools", scope: "In-App" },
  { keys: ["MediaPlayPause", "MediaStop"], action: "Global hardware play / pause", category: "system", scope: "System-Wide" },
  { keys: ["MediaTrackNext", "MediaTrackPrevious"], action: "Global hardware next / previous track", category: "system", scope: "System-Wide" },
  { keys: ["Ctrl", "Alt", "Space"], action: "Global play / pause combo", category: "system", scope: "System-Wide" },
  { keys: ["Ctrl", "Alt", "←", "→"], action: "Global previous / next track combo", category: "system", scope: "System-Wide" },
  { keys: ["Ctrl", "Alt", "↑", "↓"], action: "Global volume up / down combo", category: "system", scope: "System-Wide" },
  { keys: ["Ctrl", "Alt", "M"], action: "Global mute combo", category: "system", scope: "System-Wide" },
];

const KEY_LABELS: Record<string, string> = {
  MediaPlayPause: "Media Play",
  MediaStop: "Media Stop",
  MediaTrackNext: "Media Next",
  MediaTrackPrevious: "Media Prev",
};

function keyLabel(key: string): string {
  return KEY_LABELS[key] ?? key;
}

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
    <section id="shortcuts" className="py-24 relative bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Keyboard className="w-3.5 h-3.5 text-amber-400" />
            <span>Keyboard-first</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Control everything from the keyboard
          </h2>
          <p className="mt-4 text-neutral-300 text-sm sm:text-base leading-relaxed">
            Play, seek, cycle tracks, capture a frame, or open a stream without touching the mouse.
            Every in-app binding can be rebound from Settings &rarr; Shortcuts, and global combos
            keep working while EYTAA is in the background.
          </p>
        </div>

        {/* Filter & Category Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "All shortcuts" },
              { id: "playback", label: "Playback" },
              { id: "seeking", label: "Seeking" },
              { id: "volume", label: "Volume" },
              { id: "view", label: "View" },
              { id: "tools", label: "Tools" },
              { id: "system", label: "System-wide" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                aria-pressed={selectedCategory === cat.id}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? "bg-amber-400 text-black shadow-md shadow-amber-500/20"
                    : "bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/5"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search shortcuts..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              aria-label="Search keyboard shortcuts"
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400/50"
            />
          </div>
        </div>

        {/* Result count */}
        <div className="mb-4 text-xs text-neutral-500" role="status" aria-live="polite">
          Showing <span className="text-neutral-300 font-semibold">{filteredShortcuts.length}</span> of{" "}
          {SHORTCUTS.length} shortcuts
        </div>

        {/* Shortcuts Table / Card List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredShortcuts.map((item, index) => {
            const isSystemWide = item.scope === "System-Wide";
            return (
              <div
                key={index}
                className="surface p-4 rounded-xl border-white/5 hover:border-amber-500/30 flex items-center justify-between gap-4 transition-colors"
              >
                <div className="flex-1">
                  <div className="text-sm font-semibold text-white">{item.action}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full ${
                        isSystemWide
                          ? "bg-white/10 text-neutral-300 border border-white/10"
                          : "bg-white/5 text-neutral-400"
                      }`}
                    >
                      {item.scope}
                    </span>
                    <span className="text-[10px] text-neutral-500 capitalize">{item.category}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0 flex-wrap justify-end">
                  {item.keys.map((k, kIdx) => (
                    <kbd key={kIdx} className="keycap text-xs whitespace-nowrap">
                      {keyLabel(k)}
                    </kbd>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="text-xs font-bold text-white mb-1">Scroll wheel volume</div>
            <p className="text-[11px] text-neutral-400 leading-relaxed">
              Hover the video and scroll to adjust volume by 3% per notch. Toggle it in Settings
              &rarr; Shortcuts.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="text-xs font-bold text-white mb-1">Rebind anything</div>
            <p className="text-[11px] text-neutral-400 leading-relaxed">
              Assign a new key to any in-app action. Esc stays fixed so you can always close PiP,
              menus and drawers. Global combos live in Advanced mode.
            </p>
          </div>
        </div>

        {filteredShortcuts.length === 0 && (
          <div className="text-center py-12 surface rounded-2xl text-neutral-400 text-sm">
            No keyboard shortcuts found matching &ldquo;{filterQuery}&rdquo;.
          </div>
        )}
      </div>
    </section>
  );
}
