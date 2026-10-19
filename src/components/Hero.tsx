"use client";

import React from "react";
import { track } from "@vercel/analytics";
import { Download, Cpu, Zap, Database, ArrowRight, Play, CheckCircle2, FolderSync } from "lucide-react";

export function Hero() {
  return (
    <section
      id="hero-section"
      className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 lg:pt-44 lg:pb-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Release Pill Badge */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full chip text-xs mb-8 sm:mb-10">
          <span className="flex h-2 w-2 rounded-full bg-amber-400" />
          <span className="font-semibold tracking-wide text-neutral-200">Free &amp; open source &middot; v0.2.0</span>
          <span className="text-neutral-600" aria-hidden="true">|</span>
          <span className="text-neutral-400 font-mono">እይታ &middot; Vision</span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.03em] text-white max-w-5xl mx-auto leading-[1.08]">
          Every story,{" "}
          <span className="text-amber-400">in view.</span>
        </h1>

        {/* Lead Subtitle — plain-language benefit first */}
        <p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-neutral-200 max-w-2xl sm:max-w-3xl mx-auto font-normal leading-relaxed">
          A free media player for{" "}
          <strong className="text-white font-semibold">Windows 10 &amp; 11</strong> that plays
          almost anything — 4K HDR, MKV, anime, lectures — while using less memory than a browser
          tab. Drop in a file or a whole season folder and it just works.
        </p>

        {/* Technical footnote — for enthusiasts who want the details */}
        <p className="mt-3 text-xs sm:text-sm text-neutral-500 max-w-2xl mx-auto leading-relaxed">
          Built on <span className="text-neutral-400 font-medium">libmpv</span> zero-copy decoding, a{" "}
          <span className="text-neutral-400 font-medium">Tauri 2</span> +{" "}
          <span className="text-neutral-400 font-medium">React 19</span> interface, and{" "}
          <span className="text-neutral-400 font-medium">Tailwind CSS v4</span>. No ads, no account,
          no telemetry.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 max-w-md sm:max-w-none mx-auto">
          <a
            href="/api/download?type=exe"
            download
            onClick={() => track("Download", { type: "exe", location: "hero" })}
            id="hero-download-cta"
            className="w-full sm:w-auto group flex items-center justify-center gap-3 px-7 py-4 rounded-2xl font-bold text-sm text-black bg-amber-500 hover:bg-amber-400 shadow-lg shadow-amber-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            <Download className="w-5 h-5 text-black group-hover:scale-110 transition-transform duration-200" />
            <div className="text-left">
              <div className="text-base font-extrabold leading-tight">Download for Windows</div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-black/70 leading-none mt-0.5">
                Free .exe installer &middot; ~33 MB
              </div>
            </div>
          </a>

          <a
            href="#interactive-demo"
            id="hero-demo-cta"
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl font-semibold text-sm text-neutral-200 surface hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            <Play className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>Try the player demo</span>
            <ArrowRight className="w-4 h-4 text-neutral-400" />
          </a>
        </div>

        {/* Verification & Trust Pills */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs text-neutral-400">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Windows 10 &amp; 11</span>
          </span>
          <span className="text-neutral-700" aria-hidden="true">•</span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Hardware-accelerated</span>
          </span>
          <span className="text-neutral-700" aria-hidden="true">•</span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Offline &amp; zero telemetry</span>
          </span>
        </div>

        {/* Key Metrics / Highlights Strip */}
        <div className="mt-14 sm:mt-18 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          <div className="surface p-4 sm:p-5 rounded-2xl text-left hover:border-amber-500/30 transition-colors">
            <div className="flex items-center gap-2 text-amber-400 mb-1.5">
              <Zap className="w-4 h-4" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Idle memory</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">&lt; 40 MB</div>
            <div className="text-xs text-neutral-400 mt-1 leading-snug">Less than a single browser tab</div>
          </div>

          <div className="surface p-4 sm:p-5 rounded-2xl text-left hover:border-amber-500/30 transition-colors">
            <div className="flex items-center gap-2 text-amber-400 mb-1.5">
              <Cpu className="w-4 h-4" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Smoothness</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">60&ndash;144+ FPS</div>
            <div className="text-xs text-neutral-400 mt-1 leading-snug">Drawn straight to your GPU</div>
          </div>

          <div className="surface p-4 sm:p-5 rounded-2xl text-left hover:border-amber-500/30 transition-colors">
            <div className="flex items-center gap-2 text-amber-400 mb-1.5">
              <FolderSync className="w-4 h-4" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Folder scan</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">&lt; 0.1 ms</div>
            <div className="text-xs text-neutral-400 mt-1 leading-snug">Rename files without losing progress</div>
          </div>

          <div className="surface p-4 sm:p-5 rounded-2xl text-left hover:border-amber-500/30 transition-colors">
            <div className="flex items-center gap-2 text-amber-400 mb-1.5">
              <Database className="w-4 h-4" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Privacy</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">100% Local</div>
            <div className="text-xs text-neutral-400 mt-1 leading-snug">Your library never leaves your PC</div>
          </div>
        </div>
      </div>
    </section>
  );
}
