"use client";

import React from "react";
import { Check, X, Shield, Cpu, Layers, Zap, Database, Terminal, ArrowDown } from "lucide-react";

export function ArchitectureComparison() {
  return (
    <section id="architecture" className="py-24 relative bg-[#07090E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Cpu className="w-3.5 h-3.5 text-amber-400" />
            <span>Under The Hood</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            The Transparent Win32 Architecture
          </h2>
          <p className="mt-4 text-zinc-300 text-sm sm:text-base leading-relaxed">
            Unlike web players that choke on 4K HDR bitrates or legacy players bogged down by
            decades of UI technical debt, EYTAA unifies the raw C speed of <strong>libmpv</strong>{" "}
            with the lightweight native ergonomics of <strong>Tauri 2</strong> and <strong>Rust</strong>.
          </p>
        </div>

        {/* Transparent HWND Explainer Diagram */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-20">
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-6 rounded-2xl border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-mono font-bold text-sm">
                  01
                </span>
                <h3 className="text-lg font-bold text-white">Embedded HWND Surface</h3>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed">
                The native MPV engine binds directly to the Win32 window handle (<code>wid</code>).
                Zero-copy Direct3D11, DXVA2, and NVDEC hardware pipelines stream directly to the GPU
                without passing video frames through the browser DOM.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-mono font-bold text-sm">
                  02
                </span>
                <h3 className="text-lg font-bold text-white">Transparent Web Canvas</h3>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed">
                WebView2 is configured with <code>transparent: true</code>. The React 19 UI
                floats effortlessly overhead, providing buttery-smooth 60–144+ FPS animations,
                glassmorphism, and instant seek response with zero frame drops.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-sm">
                  03
                </span>
                <h3 className="text-lg font-bold text-white">Dynamic LGPL DLL Linking</h3>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed">
                The Rust backend initializes <code>SetDllDirectoryW</code> before plugin registration,
                dynamically loading <code>libmpv-2.dll</code>. Fully compliant with LGPL v2.1+,
                empowering users to swap or update media libraries at will.
              </p>
            </div>
          </div>

          {/* Visual Architecture Flowchart */}
          <div className="lg:col-span-7 glass-panel-elevated p-8 rounded-2xl border-white/15 relative overflow-hidden">
            <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-amber-400" />
                <span className="font-mono text-xs font-semibold text-zinc-300">
                  EYTAA_RUNTIME_PIPELINE
                </span>
              </div>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                Direct Memory Access
              </span>
            </div>

            {/* Pipeline Stack */}
            <div className="space-y-4">
              {/* Layer 1: React 19 UI */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-amber-500/5 border border-amber-500/30 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                    Interactive Overlay Layer
                  </div>
                  <div className="text-sm font-semibold text-white mt-0.5">
                    React 19 + TypeScript + Tailwind CSS v4 + Zustand
                  </div>
                  <div className="text-xs text-zinc-400 mt-1">
                    Glass controls, smart scrubbers, series drawers, OSD dialogs
                  </div>
                </div>
                <span className="text-xs font-mono text-amber-400 font-bold bg-amber-500/20 px-2.5 py-1 rounded">
                  WebView2
                </span>
              </div>

              {/* IPC Arrow */}
              <div className="flex justify-center -my-2 text-zinc-500">
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </div>

              {/* Layer 2: Tauri 2 IPC */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-500/10 to-cyan-500/5 border border-cyan-500/30 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
                    Fast Native IPC Boundary
                  </div>
                  <div className="text-sm font-semibold text-white mt-0.5">
                    Tauri 2 Core • Capabilities Scoping • Win32 Event Loops
                  </div>
                  <div className="text-xs text-zinc-400 mt-1">
                    Single-instance lock, file pickers, global media keys, PiP snap
                  </div>
                </div>
                <span className="text-xs font-mono text-cyan-400 font-bold bg-cyan-500/20 px-2.5 py-1 rounded">
                  IPC Bridge
                </span>
              </div>

              {/* IPC Arrow */}
              <div className="flex justify-center -my-2 text-zinc-500">
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </div>

              {/* Layer 3: Rust Backend & SQLite */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-500/10 to-indigo-500/5 border border-indigo-500/30 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                    Native Rust Engine (2021 Edition)
                  </div>
                  <div className="text-sm font-semibold text-white mt-0.5">
                    rusqlite Persistence • Quick-Hash Fingerprinting • Sibling Scanner
                  </div>
                  <div className="text-xs text-zinc-400 mt-1">
                    Sub-0.1ms hashing, DPI monitor geometry, DLL environment setup
                  </div>
                </div>
                <span className="text-xs font-mono text-indigo-400 font-bold bg-indigo-500/20 px-2.5 py-1 rounded">
                  Rust Core
                </span>
              </div>

              {/* IPC Arrow */}
              <div className="flex justify-center -my-2 text-zinc-500">
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </div>

              {/* Layer 4: Media Engine */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-500/15 to-emerald-500/5 border border-emerald-500/40 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                    Zero-Copy Hardware Decoding
                  </div>
                  <div className="text-sm font-semibold text-white mt-0.5">
                    libmpv-2.dll (LGPL v2.1+) • FFmpeg Codecs • libass Subtitles
                  </div>
                  <div className="text-xs text-zinc-400 mt-1">
                    Direct3D11va / DXVA2 / NVDEC rendered straight to Win32 HWND
                  </div>
                </div>
                <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/20 px-2.5 py-1 rounded">
                  MPV Core
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* COMPARISON MATRIX: EYTAA vs Electron vs Legacy Players */}
        <div className="glass-panel-elevated rounded-2xl overflow-hidden border-white/10">
          <div className="p-6 bg-[#0E121C] border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white">How EYTAA Compares</h3>
              <p className="text-xs text-zinc-400 mt-1">
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
                <tr className="border-b border-white/10 bg-white/[0.02] text-xs font-bold uppercase tracking-wider text-zinc-400">
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
                    <div className="text-xs text-zinc-500">Resource usage on launch</div>
                  </td>
                  <td className="py-4 px-6 font-mono font-bold text-emerald-400 bg-amber-500/5">
                    ~40 – 80 MB
                  </td>
                  <td className="py-4 px-6 font-mono text-rose-400">450 – 850 MB</td>
                  <td className="py-4 px-6 font-mono text-zinc-300">80 – 150 MB</td>
                </tr>

                <tr>
                  <td className="py-4 px-6 font-medium text-white">
                    <div>Video Rendering Pipeline</div>
                    <div className="text-xs text-zinc-500">Hardware surface integration</div>
                  </td>
                  <td className="py-4 px-6 font-semibold text-emerald-400 bg-amber-500/5">
                    Zero-Copy HWND (D3D11va)
                  </td>
                  <td className="py-4 px-6 text-zinc-400">HTML5 Canvas / Chromium CPU copies</td>
                  <td className="py-4 px-6 text-zinc-300">Direct3D9 / Direct3D11 Native</td>
                </tr>

                <tr>
                  <td className="py-4 px-6 font-medium text-white">
                    <div>Modern Glassmorphic UI</div>
                    <div className="text-xs text-zinc-500">Tailwind v4, React 19, smooth 144Hz</div>
                  </td>
                  <td className="py-4 px-6 font-semibold text-emerald-400 bg-amber-500/5 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Native Acrylic Glass</span>
                  </td>
                  <td className="py-4 px-6 text-zinc-400">Laggy web views</td>
                  <td className="py-4 px-6 text-rose-400 flex items-center gap-1.5">
                    <X className="w-4 h-4 text-rose-400" />
                    <span>Dated Win32 Skins</span>
                  </td>
                </tr>

                <tr>
                  <td className="py-4 px-6 font-medium text-white">
                    <div>Smart TV Series &amp; Episode Auto-Detection</div>
                    <div className="text-xs text-zinc-500">Automatic sibling grouping &amp; sorting</div>
                  </td>
                  <td className="py-4 px-6 font-semibold text-emerald-400 bg-amber-500/5 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Built-In Sibling Scanner</span>
                  </td>
                  <td className="py-4 px-6 text-rose-400 flex items-center gap-1.5">
                    <X className="w-4 h-4 text-rose-400" />
                    <span>Manual playlisting</span>
                  </td>
                  <td className="py-4 px-6 text-zinc-400">Basic folder listing</td>
                </tr>

                <tr>
                  <td className="py-4 px-6 font-medium text-white">
                    <div>Resilient Renamed Media Tracking</div>
                    <div className="text-xs text-zinc-500">Sub-0.1ms quick-hash fingerprinting</div>
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
                    <div>Cinema &amp; Anime Visual Profiles</div>
                    <div className="text-xs text-zinc-500">Yellow subtitles &amp; dynamic loudnorm EQ</div>
                  </td>
                  <td className="py-4 px-6 font-semibold text-emerald-400 bg-amber-500/5 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>1-Click Studio Profiles</span>
                  </td>
                  <td className="py-4 px-6 text-rose-400 flex items-center gap-1.5">
                    <X className="w-4 h-4 text-rose-400" />
                    <span>None</span>
                  </td>
                  <td className="py-4 px-6 text-zinc-400">Complex manual filter menus</td>
                </tr>

                <tr>
                  <td className="py-4 px-6 font-medium text-white">
                    <div>Privacy &amp; Telemetry</div>
                    <div className="text-xs text-zinc-500">Data collection policy</div>
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
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-2.5">
                <div className="text-xs font-bold text-white uppercase tracking-wider">{item.title}</div>
                <div className="grid grid-cols-1 gap-1.5 text-xs">
                  <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
                    <span className="font-bold text-amber-300">EYTAA:</span>
                    <span className="font-semibold text-white">{item.eytaa}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white/5 flex items-center justify-between text-zinc-400">
                    <span>Electron:</span>
                    <span className="text-rose-400">{item.electron}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white/5 flex items-center justify-between text-zinc-400">
                    <span>VLC / Pot:</span>
                    <span className="text-zinc-300">{item.legacy}</span>
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
