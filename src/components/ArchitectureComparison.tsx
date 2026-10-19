"use client";

import React from "react";
import { Check, X, Cpu, Terminal, ArrowDown } from "lucide-react";

export function ArchitectureComparison() {
  return (
    <section id="architecture" className="py-24 relative bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Cpu className="w-3.5 h-3.5 text-amber-400" />
            <span>Why EYTAA</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Faster playback. Less manual work.
          </h2>
          <p className="mt-4 text-neutral-300 text-sm sm:text-base leading-relaxed">
            Many modern players are web apps in disguise: every video frame is drawn through a
            browser engine, which costs hundreds of megabytes of RAM and stutters on high-bitrate
            4K. EYTAA sends video straight to your graphics card and only draws the controls in the
            app window. That same engineering carries into the media center — folders are indexed
            locally, series are grouped automatically, and the library stays current without a
            plugin.
          </p>
        </div>

        {/* Transparent HWND Explainer Diagram */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-20">
          <div className="lg:col-span-5 space-y-6">
            <div className="surface p-6 rounded-2xl border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-mono font-bold text-sm">
                  01
                </span>
                <h3 className="text-lg font-bold text-white">Video goes straight to the GPU</h3>
              </div>
              <p className="text-sm text-neutral-300 leading-relaxed">
                The native MPV engine binds to the Windows window handle (<code>wid</code>) and
                streams frames through Direct3D11, DXVA2, or NVDEC <strong>without copying them
                through a browser</strong> — which is why playback stays smooth and memory stays low.
              </p>
            </div>

            <div className="surface p-6 rounded-2xl border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-mono font-bold text-sm">
                  02
                </span>
                <h3 className="text-lg font-bold text-white">Controls are just a light overlay</h3>
              </div>
              <p className="text-sm text-neutral-300 leading-relaxed">
                WebView2 runs with <code>transparent: true</code>, so the React 19 interface floats
                on top of the video at 60&ndash;144+ FPS. Seeking, glass animations, and pop-up menus
                respond instantly with no dropped frames.
              </p>
            </div>

            <div className="surface p-6 rounded-2xl border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-mono font-bold text-sm">
                  03
                </span>
                <h3 className="text-lg font-bold text-white">The media engine stays swappable</h3>
              </div>
              <p className="text-sm text-neutral-300 leading-relaxed">
                The Rust backend loads <code>libmpv-2.dll</code> dynamically at startup. EYTAA stays
                fully LGPL v2.1+ compliant, and the decoding engine can be updated or replaced
                independently of the app.
              </p>
            </div>
          </div>

          {/* Visual Architecture Flowchart */}
          <div className="lg:col-span-7 surface-raised p-8 rounded-2xl border-white/15 relative overflow-hidden">
            <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-amber-400" />
                <span className="font-mono text-xs font-semibold text-neutral-300">
                  EYTAA_RUNTIME_PIPELINE
                </span>
              </div>
              <span className="text-[10px] font-mono text-neutral-300 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                Direct Memory Access
              </span>
            </div>

            {/* Pipeline Stack */}
            <div className="space-y-4">
              {/* Layer 1: React 19 UI */}
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                    Interactive Overlay Layer
                  </div>
                  <div className="text-sm font-semibold text-white mt-0.5">
                    React 19 + TypeScript + Tailwind CSS v4 + Zustand
                  </div>
                  <div className="text-xs text-neutral-400 mt-1">
                    Glass controls, smart scrubbers, series drawers, OSD dialogs
                  </div>
                </div>
                <span className="text-xs font-mono text-neutral-300 font-bold bg-white/5 border border-white/10 px-2.5 py-1 rounded">
                  WebView2
                </span>
              </div>

              {/* IPC Arrow */}
              <div className="flex justify-center -my-2 text-neutral-500">
                <ArrowDown className="w-4 h-4" />
              </div>

              {/* Layer 2: Tauri 2 IPC */}
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                    Fast Native IPC Boundary
                  </div>
                  <div className="text-sm font-semibold text-white mt-0.5">
                    Tauri 2 Core • Capabilities Scoping • Win32 Event Loops
                  </div>
                  <div className="text-xs text-neutral-400 mt-1">
                    Single-instance lock, file pickers, 22 rebindable keys, global combos
                  </div>
                </div>
                <span className="text-xs font-mono text-neutral-300 font-bold bg-white/5 border border-white/10 px-2.5 py-1 rounded">
                  IPC Bridge
                </span>
              </div>

              {/* IPC Arrow */}
              <div className="flex justify-center -my-2 text-neutral-500">
                <ArrowDown className="w-4 h-4" />
              </div>

              {/* Layer 3: Rust Backend & SQLite */}
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                    Native Rust Engine (2021 Edition)
                  </div>
                  <div className="text-sm font-semibold text-white mt-0.5">
                    rusqlite Persistence • Quick-Hash Fingerprinting • Sibling Scanner
                  </div>
                  <div className="text-xs text-neutral-400 mt-1">
                    Sub-0.1ms hashing, DPI monitor geometry, DLL environment setup
                  </div>
                </div>
                <span className="text-xs font-mono text-neutral-300 font-bold bg-white/5 border border-white/10 px-2.5 py-1 rounded">
                  Rust Core
                </span>
              </div>

              {/* IPC Arrow */}
              <div className="flex justify-center -my-2 text-neutral-500">
                <ArrowDown className="w-4 h-4" />
              </div>

              {/* Layer 4: Media Engine */}
              <div className="p-4 rounded-xl bg-amber-500/[0.06] border border-amber-500/30 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                    Zero-Copy Hardware Decoding
                  </div>
                  <div className="text-sm font-semibold text-white mt-0.5">
                    libmpv-2.dll (LGPL v2.1+) • FFmpeg Codecs • libass Subtitles
                  </div>
                  <div className="text-xs text-neutral-400 mt-1">
                    Direct3D11va / DXVA2 / NVDEC rendered straight to Win32 HWND
                  </div>
                </div>
                <span className="text-xs font-mono text-amber-300 font-bold bg-amber-500/15 border border-amber-500/30 px-2.5 py-1 rounded">
                  MPV Core
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* COMPARISON MATRIX: EYTAA vs Electron vs Legacy Players */}
        <div className="surface-raised rounded-2xl overflow-hidden border-white/10">
          <div className="p-6 bg-[#141416] border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white">How EYTAA Compares</h3>
              <p className="text-xs text-neutral-400 mt-1">
                Engineered for maximum desktop efficiency and aesthetic excellence.
              </p>
            </div>
            <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
              Tested on Windows 11 64-bit
            </span>
          </div>

          {/* Desktop Table View (Hidden on mobile) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] text-xs font-bold uppercase tracking-wider text-neutral-400">
                  <th className="py-4 px-6">Capability / Benchmark</th>
                  <th className="py-4 px-6 text-amber-400 font-extrabold bg-amber-500/10">
                    EYTAA Player
                  </th>
                  <th className="py-4 px-6">Electron Players</th>
                  <th className="py-4 px-6">Legacy Players (VLC/Pot)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr>
                  <td className="py-4 px-6 font-medium text-white">
                    <div>Idle Memory Footprint</div>
                    <div className="text-xs text-neutral-500">Resource usage on launch</div>
                  </td>
                  <td className="py-4 px-6 font-mono font-bold text-emerald-400 bg-amber-500/5">
                    ~40 – 80 MB
                  </td>
                  <td className="py-4 px-6 font-mono text-rose-400">450 – 850 MB</td>
                  <td className="py-4 px-6 font-mono text-neutral-300">80 – 150 MB</td>
                </tr>

                <tr>
                  <td className="py-4 px-6 font-medium text-white">
                    <div>Video Rendering Pipeline</div>
                    <div className="text-xs text-neutral-500">Hardware surface integration</div>
                  </td>
                  <td className="py-4 px-6 font-semibold text-emerald-400 bg-amber-500/5">
                    Zero-Copy HWND (D3D11va)
                  </td>
                  <td className="py-4 px-6 text-neutral-400">HTML5 Canvas / Chromium CPU copies</td>
                  <td className="py-4 px-6 text-neutral-300">Direct3D9 / Direct3D11 Native</td>
                </tr>

                <tr>
                  <td className="py-4 px-6 font-medium text-white">
                    <div>Modern Glassmorphic UI</div>
                    <div className="text-xs text-neutral-500">Tailwind v4, React 19, smooth 144Hz</div>
                  </td>
                  <td className="py-4 px-6 font-semibold text-emerald-400 bg-amber-500/5 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Native Acrylic Glass</span>
                  </td>
                  <td className="py-4 px-6 text-neutral-400">Laggy web views</td>
                  <td className="py-4 px-6 text-rose-400 flex items-center gap-1.5">
                    <X className="w-4 h-4 text-rose-400" />
                    <span>Dated Win32 Skins</span>
                  </td>
                </tr>

                <tr>
                  <td className="py-4 px-6 font-medium text-white">
                    <div>Self-Organizing Media Library</div>
                    <div className="text-xs text-neutral-500">Local index, live watcher, 1,000+ items</div>
                  </td>
                  <td className="py-4 px-6 font-semibold text-emerald-400 bg-amber-500/5 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Built-In SQLite Library</span>
                  </td>
                  <td className="py-4 px-6 text-rose-400 flex items-center gap-1.5">
                    <X className="w-4 h-4 text-rose-400" />
                    <span>Manual / external scraper</span>
                  </td>
                  <td className="py-4 px-6 text-neutral-400">Folder listing only</td>
                </tr>

                <tr>
                  <td className="py-4 px-6 font-medium text-white">
                    <div>Smart TV Series &amp; Episode Auto-Detection</div>
                    <div className="text-xs text-neutral-500">Automatic series grouping &amp; specials order</div>
                  </td>
                  <td className="py-4 px-6 font-semibold text-emerald-400 bg-amber-500/5 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Auto Series &amp; Sibling Scanner</span>
                  </td>
                  <td className="py-4 px-6 text-rose-400 flex items-center gap-1.5">
                    <X className="w-4 h-4 text-rose-400" />
                    <span>Manual playlisting</span>
                  </td>
                  <td className="py-4 px-6 text-neutral-400">Basic folder listing</td>
                </tr>

                <tr>
                  <td className="py-4 px-6 font-medium text-white">
                    <div>Resilient Renamed Media Tracking</div>
                    <div className="text-xs text-neutral-500">Sub-0.1ms quick-hash fingerprinting</div>
                  </td>
                  <td className="py-4 px-6 font-semibold text-emerald-400 bg-amber-500/5 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Quick-Hash &lt;0.1ms</span>
                  </td>
                  <td className="py-4 px-6 text-rose-400 flex items-center gap-1.5">
                    <X className="w-4 h-4 text-rose-400" />
                    <span>Loses watch history</span>
                  </td>
                  <td className="py-4 px-6 text-rose-400 flex items-center gap-1.5">
                    <X className="w-4 h-4 text-rose-400" />
                    <span>Loses resume state</span>
                  </td>
                </tr>

                <tr>
                  <td className="py-4 px-6 font-medium text-white">
                    <div>Playback Profiles &amp; Theming</div>
                    <div className="text-xs text-neutral-500">Genre presets, design skins, subtitle styling</div>
                  </td>
                  <td className="py-4 px-6 font-semibold text-emerald-400 bg-amber-500/5 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>9 Profiles • 12 Skins</span>
                  </td>
                  <td className="py-4 px-6 text-rose-400 flex items-center gap-1.5">
                    <X className="w-4 h-4 text-rose-400" />
                    <span>Basic theme only</span>
                  </td>
                  <td className="py-4 px-6 text-neutral-400">Complex manual filter menus</td>
                </tr>

                <tr>
                  <td className="py-4 px-6 font-medium text-white">
                    <div>Network Streams &amp; Diagnostics</div>
                    <div className="text-xs text-neutral-500">Direct URLs, F9 stats, screenshots, chapters</div>
                  </td>
                  <td className="py-4 px-6 font-semibold text-emerald-400 bg-amber-500/5 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>HLS / RTSP / RTMP + F9 Overlay</span>
                  </td>
                  <td className="py-4 px-6 text-amber-400">Varies by app</td>
                  <td className="py-4 px-6 text-neutral-400">Supported, dated UI</td>
                </tr>

                <tr>
                  <td className="py-4 px-6 font-medium text-white">
                    <div>Updates</div>
                    <div className="text-xs text-neutral-500">How new versions reach you</div>
                  </td>
                  <td className="py-4 px-6 font-semibold text-emerald-400 bg-amber-500/5 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Signed In-App Auto-Update</span>
                  </td>
                  <td className="py-4 px-6 text-neutral-400">Manual downloads</td>
                  <td className="py-4 px-6 text-neutral-400">Manual downloads</td>
                </tr>

                <tr>
                  <td className="py-4 px-6 font-medium text-white">
                    <div>Privacy &amp; Telemetry</div>
                    <div className="text-xs text-neutral-500">Data collection policy</div>
                  </td>
                  <td className="py-4 px-6 font-semibold text-emerald-400 bg-amber-500/5">
                    100% Local SQLite • 0 Telemetry
                  </td>
                  <td className="py-4 px-6 text-amber-400">Heavy cloud trackers</td>
                  <td className="py-4 px-6 text-emerald-400">Offline</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mobile Card-Based Comparison (Visible only on mobile < md) */}
          <div className="md:hidden p-4 space-y-4">
            {[
              {
                title: "Idle Memory Footprint",
                eytaa: "~40 – 80 MB (Rust)",
                electron: "450 – 850 MB",
                legacy: "80 – 150 MB",
              },
              {
                title: "Video Surface Rendering",
                eytaa: "Zero-Copy Direct3D11 HWND",
                electron: "Chromium DOM Canvas copy",
                legacy: "Direct3D9 / D3D11",
              },
              {
                title: "UI Architecture & Ergonomics",
                eytaa: "React 19 + Tailwind v4 Acrylic",
                electron: "Heavy web view",
                legacy: "Dated Win32 legacy skins",
              },
              {
                title: "Self-Organizing Media Library",
                eytaa: "SQLite index + live watcher",
                electron: "Manual / external scraper",
                legacy: "Folder listing only",
              },
              {
                title: "TV Series Sibling Detection",
                eytaa: "Auto Sibling Scanner (1-click)",
                electron: "Manual playlists",
                legacy: "Basic folder listing",
              },
              {
                title: "Renamed File Tracking",
                eytaa: "Quick-Hash <0.1ms (Preserves state)",
                electron: "Loses progress",
                legacy: "Loses progress",
              },
              {
                title: "Profiles & Theming",
                eytaa: "9 profiles • 12 complete skins",
                electron: "Basic theme only",
                legacy: "Manual filter menus",
              },
              {
                title: "Network Streams",
                eytaa: "HLS / RTSP / RTMP + F9 stats",
                electron: "Varies by app",
                legacy: "Supported, dated UI",
              },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-2.5">
                <div className="text-xs font-bold text-white uppercase tracking-wider">{item.title}</div>
                <div className="grid grid-cols-1 gap-1.5 text-xs">
                  <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
                    <span className="font-bold text-amber-300">EYTAA:</span>
                    <span className="font-semibold text-white">{item.eytaa}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white/5 flex items-center justify-between text-neutral-400">
                    <span>Electron:</span>
                    <span className="text-rose-400">{item.electron}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white/5 flex items-center justify-between text-neutral-400">
                    <span>VLC / Pot:</span>
                    <span className="text-neutral-300">{item.legacy}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
