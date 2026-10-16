import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ReleaseArchive } from "./ReleaseArchive";
import { DocsNav } from "./DocsNav";
import {
  BookOpen,
  Cpu,
  Tv,
  Sliders,
  Keyboard,
  Terminal,
  Download,
  Shield,
  Layers,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  FileCode,
  FolderOpen,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Documentation & Release Archive — EYTAA Player",
  description:
    "Comprehensive guides, system architecture, keyboard shortcuts, build instructions, and dynamic release downloads for EYTAA Player on Windows.",
};

export default function DocsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#07090E] text-[#F3F4F6]">
      <Navbar />

      <main className="flex-1 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Docs Header / Breadcrumbs */}
          <div className="py-6 border-b border-white/10 mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono mb-1">
                <Link href="/" className="hover:text-amber-400 transition-colors">
                  Home
                </Link>
                <span>/</span>
                <span className="text-amber-400">Documentation &amp; Releases</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                EYTAA Documentation &amp; Version Archive
              </h1>
            </div>

            <a
              href="#releases"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-amber-400 text-black hover:bg-amber-300 shadow-md shadow-amber-500/20 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Browse All Releases</span>
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Sticky Sidebar Navigation with ScrollSpy */}
            <aside className="lg:col-span-3">
              <DocsNav />
            </aside>

            {/* Right Main Documentation Body */}
            <div className="lg:col-span-9 space-y-16">
              {/* SECTION: Overview & Architecture */}
              <section id="overview" className="scroll-mt-28">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
                  <Layers className="w-3.5 h-3.5 text-amber-400" />
                  <span>Architecture</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  1. System Architecture &amp; The HWND Model
                </h2>
                <div className="mt-4 text-zinc-300 text-sm leading-relaxed space-y-4">
                  <p>
                    <strong>EYTAA</strong> (internally designated as <em>Vistara Player</em>) is
                    engineered for Windows 10 and 11. It bridges the decoding horsepower of{" "}
                    <strong>libmpv</strong> with the lightweight ergonomics of <strong>Tauri 2</strong>,{" "}
                    <strong>React 19</strong>, and <strong>Tailwind CSS v4</strong>.
                  </p>
                  <p>
                    In traditional players, web-based shells (such as Electron) incur heavy memory
                    penalties (400–800 MB RAM) and copy video frames through Chromium DOM layers,
                    limiting high-bitrate 4K HDR responsiveness. EYTAA solves this by hosting Microsoft
                    WebView2 inside a native Win32 window configured with <code>transparent: true</code>.
                  </p>
                  <div className="p-4 rounded-xl bg-[#090D15] border border-white/10 font-mono text-xs text-zinc-300">
                    <div>Video Pipeline:</div>
                    <div className="text-amber-400 mt-1">
                      File &rarr; Direct3D11va / NVDEC &rarr; libmpv-2.dll &rarr; Win32 HWND Surface
                    </div>
                    <div className="text-cyan-400 mt-1">
                      UI Pipeline: React 19 + Tailwind v4 &rarr; WebView2 Transparent Overlay (60–144+ FPS)
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION: Getting Started */}
              <section id="getting-started" className="scroll-mt-28">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Getting Started</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  2. Installation &amp; System Prerequisites
                </h2>
                <div className="mt-4 text-zinc-300 text-sm leading-relaxed space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl glass-panel border-white/10">
                      <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                        Minimum System Specs
                      </div>
                      <ul className="space-y-1 text-xs text-zinc-300 list-disc list-inside">
                        <li>Windows 10 (1903+) or Windows 11 (64-bit)</li>
                        <li>DirectX 11 compatible GPU (Intel, NVIDIA, AMD)</li>
                        <li>40 MB available RAM (idle)</li>
                        <li>150 MB disk space</li>
                      </ul>
                    </div>

                    <div className="p-4 rounded-xl glass-panel border-white/10">
                      <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
                        Package Formats
                      </div>
                      <ul className="space-y-1 text-xs text-zinc-300 list-disc list-inside">
                        <li>
                          <strong>.EXE Setup Wizard</strong>: Automatic desktop &amp; start menu
                          shortcuts, file associations.
                        </li>
                        <li>
                          <strong>.MSI Enterprise Package</strong>: System-level silent deployment for
                          enterprises and network distribution.
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
                    <strong>Antivirus / SmartScreen Note</strong>: Because EYTAA is dynamically linked
                    with LGPL <code>libmpv-2.dll</code> and cryptographic updater manifests, Windows
                    SmartScreen or real-time scanners may show an initial prompt on first execution.
                    Select <em>&ldquo;More Info &rarr; Run Anyway&rdquo;</em>.
                  </div>
                </div>
              </section>

              {/* SECTION: Smart TV Series Center */}
              <section id="media-center" className="scroll-mt-28">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
                  <Tv className="w-3.5 h-3.5 text-amber-400" />
                  <span>Media Management</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  3. Smart TV Series Architecture &amp; Quick-Hash
                </h2>
                <div className="mt-4 text-zinc-300 text-sm leading-relaxed space-y-4">
                  <p>
                    EYTAA automatically organizes media folders without requiring third-party scraper
                    accounts:
                  </p>
                  <ul className="space-y-2 text-xs text-zinc-300">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Sub-0.1ms Quick-Hash Fingerprinting</strong>: Samples file boundary
                        bytes and size in microseconds. If you rename an episode or move the folder to
                        another drive, your playback progress, history, and favorites are preserved.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Sibling Episode Detector</strong>: Recognizes common scene patterns like{" "}
                        <code>Show.S01E01</code>, <code>1x02</code>, or <code>[Group] - 03</code>,
                        triggering a 12-second toast offering 1-click addition of all siblings in
                        order.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Zero-Crop Presentation</strong>: Displays artwork without clipping
                        content, backed by an ambient <code>blur-xl opacity-45</code> color glow.
                      </span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* SECTION: Cinema & Audio Profiles */}
              <section id="profiles" className="scroll-mt-28">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
                  <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Playback Tuning</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  4. Studio Audio &amp; Video Profiles
                </h2>
                <div className="mt-4 text-zinc-300 text-sm leading-relaxed space-y-4">
                  <p>Cycle profiles with hotkey <kbd className="px-2 py-0.5 rounded bg-zinc-800 border border-white/10 font-mono text-xs">C</kbd>:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl glass-panel border-white/10">
                      <div className="text-xs font-bold text-amber-300">Anime &amp; Animation</div>
                      <div className="text-xs text-zinc-400 mt-1">
                        Saturation +14, contrast +6, and soft yellow (<code>#FFF176</code>) subtitles
                        with black contour borders for clear reading against bright animated backdrops.
                      </div>
                    </div>
                    <div className="p-4 rounded-xl glass-panel border-white/10">
                      <div className="text-xs font-bold text-cyan-300">Cinema &amp; Night Loudnorm</div>
                      <div className="text-xs text-zinc-400 mt-1">
                        Filmic contrast (+5), deeper shadow blacks, and FFmpeg loudnorm compression (
                        <code>lavfi=[loudnorm=I=-16:TP=-1.5:LRA=7]</code>) taming loud explosions while
                        boosting whispered dialogue.
                      </div>
                    </div>
                    <div className="p-4 rounded-xl glass-panel border-white/10">
                      <div className="text-xs font-bold text-emerald-300">Podcasts &amp; Lectures</div>
                      <div className="text-xs text-zinc-400 mt-1">
                        Highpass 90Hz and lowpass 4500Hz speech clarity bandpass filter, +2dB volume
                        boost, and automatic 1.25x speed preset.
                      </div>
                    </div>
                    <div className="p-4 rounded-xl glass-panel border-white/10">
                      <div className="text-xs font-bold text-zinc-200">Custom SQLite Profiles</div>
                      <div className="text-xs text-zinc-400 mt-1">
                        Create, tune, save, and delete custom named audio and video profiles stored in
                        the local SQLite database (<code>eytaa.db</code>).
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION: Keyboard Shortcuts */}
              <section id="shortcuts" className="scroll-mt-28">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
                  <Keyboard className="w-3.5 h-3.5 text-amber-400" />
                  <span>Keybindings</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  5. Essential Hotkeys Reference
                </h2>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/5 font-bold uppercase tracking-wider text-zinc-400">
                        <th className="py-2.5 px-4">Key</th>
                        <th className="py-2.5 px-4">Action</th>
                        <th className="py-2.5 px-4">Scope</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-mono text-zinc-300">
                      <tr>
                        <td className="py-2 px-4 font-bold text-amber-400">Space</td>
                        <td className="py-2 px-4 font-sans text-white">Toggle Play / Pause</td>
                        <td className="py-2 px-4 text-zinc-500">In-App</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 font-bold text-amber-400">&larr; / &rarr;</td>
                        <td className="py-2 px-4 font-sans text-white">Seek 5s backward / forward</td>
                        <td className="py-2 px-4 text-zinc-500">In-App</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 font-bold text-amber-400">Shift + &larr; / &rarr;</td>
                        <td className="py-2 px-4 font-sans text-white">Seek 30s backward / forward</td>
                        <td className="py-2 px-4 text-zinc-500">In-App</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 font-bold text-amber-400">&uarr; / &darr;</td>
                        <td className="py-2 px-4 font-sans text-white">Volume +5% / -5%</td>
                        <td className="py-2 px-4 text-zinc-500">In-App</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 font-bold text-amber-400">P</td>
                        <td className="py-2 px-4 font-sans text-white">Toggle Picture-in-Picture (PiP)</td>
                        <td className="py-2 px-4 text-zinc-500">In-App</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 font-bold text-amber-400">C</td>
                        <td className="py-2 px-4 font-sans text-white">Cycle Playback Profile (Anime, Cinema, Balanced)</td>
                        <td className="py-2 px-4 text-zinc-500">In-App</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 font-bold text-amber-400">MediaPlayPause</td>
                        <td className="py-2 px-4 font-sans text-white">Global hardware media key Play/Pause</td>
                        <td className="py-2 px-4 text-cyan-400 font-semibold">System-Wide</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* SECTION: Building From Source */}
              <section id="build-from-source" className="scroll-mt-28">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Developer Build</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  6. Building From Source on Windows
                </h2>
                <div className="mt-4 text-zinc-300 text-sm leading-relaxed space-y-4">
                  <p>Prerequisites: Node.js 20+, Rust 1.77+, Visual Studio C++ Build Tools.</p>
                  <pre className="p-4 rounded-xl bg-[#080B12] border border-white/10 font-mono text-xs text-zinc-300 overflow-x-auto leading-relaxed">
                    <code>{`# 1. Clone the repository
git clone https://github.com/dagijosi/Eytaa.git
cd Eytaa/player

# 2. Install dependencies
npm install

# 3. Download architecture-matched libmpv DLLs
npm run setup:lib

# 4. Launch complete Tauri desktop app with live libmpv
npm run tauri:dev

# 5. Build production Windows installer
npm run tauri:build`}</code>
                  </pre>
                </div>
              </section>

              {/* SECTION: DYNAMIC RELEASE ARCHIVE & DOWNLOADS */}
              <section id="releases" className="scroll-mt-28 pt-8 border-t border-white/10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
                  <Download className="w-3.5 h-3.5 text-amber-400" />
                  <span>Live Version Registry</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  7. Release Archive &amp; Version Downloads
                </h2>
                <p className="mt-3 text-sm text-zinc-300 leading-relaxed mb-8">
                  Below is the live, dynamic archive of all EYTAA releases fetched directly from the
                  GitHub registry. Whenever a new version is published, it automatically appears here.
                  Click any installer below to download the direct binary immediately without leaving this page.
                </p>

                {/* Live Dynamic Client Component */}
                <ReleaseArchive />
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
