"use client";

import React from "react";
import Image from "next/image";
import { Download, Sparkles, Shield, Cpu, Zap, Database, ArrowRight, Play, CheckCircle2 } from "lucide-react";

export function Hero() {
  return (
    <section
      id="hero-section"
      className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 lg:pt-44 lg:pb-32 overflow-hidden bg-grid-pattern"
    >
      {/* Precision Ambient Lighting Gradients */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[800px] lg:w-[1000px] h-[350px] sm:h-[450px] bg-gradient-to-tr from-amber-500/15 via-cyan-500/10 to-transparent blur-[130px] rounded-full pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-amber-500/10 blur-[90px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Release Pill Badge */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full glass-pill border-amber-500/30 text-xs text-amber-200 mb-8 sm:mb-10 animate-float">
          <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-ping" />
          <span className="font-semibold tracking-wide">EYTAA v0.2.0 • Smart Media Center</span>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-300 font-mono">እይታ • Vision</span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.03em] text-white max-w-5xl mx-auto leading-[1.08]">
          Every story,{" "}
          <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-cyan-400 bg-clip-text text-transparent">
            in view.
          </span>
        </h1>

        {/* Lead Subtitle */}
        <p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-zinc-300 max-w-2xl sm:max-w-3xl mx-auto font-normal leading-relaxed">
          The studio-grade Windows media player pairing the raw, zero-copy decoding horsepower of{" "}
          <strong className="text-white font-semibold">libmpv</strong> with the modern responsiveness of{" "}
          <strong className="text-white font-semibold">Tauri 2</strong>,{" "}
          <strong className="text-white font-semibold">React 19</strong>, and{" "}
          <strong className="text-white font-semibold">Tailwind CSS v4</strong>.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 max-w-md sm:max-w-none mx-auto">
          <a
            href="/api/download?type=exe"
            download
            id="hero-download-cta"
            className="w-full sm:w-auto group flex items-center justify-center gap-3.5 px-7 py-4 rounded-2xl font-bold text-sm text-black bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            <Download className="w-5 h-5 text-black group-hover:scale-110 transition-transform duration-200" />
            <div className="text-left">
              <div className="text-[10px] font-bold uppercase tracking-wider text-black/75 leading-none">
                Direct Download (x64)
              </div>
              <div className="text-base font-extrabold leading-tight mt-0.5">Download for Windows</div>
            </div>
            <span className="ml-1 text-[11px] px-2 py-0.5 rounded-md bg-black/15 font-mono font-bold">
              .exe ~33MB
            </span>
          </a>

          <a
            href="#interactive-demo"
            id="hero-demo-cta"
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl font-semibold text-sm text-zinc-200 glass-panel hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            <Play className="w-4 h-4 text-cyan-400 fill-cyan-400" />
            <span>Try Interactive Demo</span>
            <ArrowRight className="w-4 h-4 text-zinc-400" />
          </a>
        </div>

        {/* Verification & Trust Pills */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-400">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Windows 10 &amp; 11</span>
          </span>
          <span className="text-zinc-600">•</span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Direct3D11 Zero-Copy</span>
          </span>
          <span className="text-zinc-600">•</span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
            <span>100% Offline SQLite</span>
          </span>
        </div>

        {/* Key Metrics / Highlights Strip */}
        <div className="mt-14 sm:mt-18 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          <div className="glass-panel p-4 sm:p-5 rounded-2xl text-left hover:border-amber-500/30 transition-colors">
            <div className="flex items-center gap-2 text-amber-400 mb-1.5">
              <Zap className="w-4 h-4" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Idle Memory</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">&lt; 40 MB</div>
            <div className="text-xs text-zinc-400 mt-1 leading-snug">Ultra-low RAM idle footprint</div>
          </div>

          <div className="glass-panel p-4 sm:p-5 rounded-2xl text-left hover:border-cyan-500/30 transition-colors">
            <div className="flex items-center gap-2 text-cyan-400 mb-1.5">
              <Cpu className="w-4 h-4" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Rendering</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">60–144+ FPS</div>
            <div className="text-xs text-zinc-400 mt-1 leading-snug">Direct3D11 HWND overlay</div>
          </div>

          <div className="glass-panel p-4 sm:p-5 rounded-2xl text-left hover:border-amber-500/30 transition-colors">
            <div className="flex items-center gap-2 text-amber-400 mb-1.5">
              <Sparkles className="w-4 h-4" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">File Hashing</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">&lt; 0.1 ms</div>
            <div className="text-xs text-zinc-400 mt-1 leading-snug">Quick-hash rename tracking</div>
          </div>

          <div className="glass-panel p-4 sm:p-5 rounded-2xl text-left hover:border-cyan-500/30 transition-colors">
            <div className="flex items-center gap-2 text-cyan-400 mb-1.5">
              <Database className="w-4 h-4" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Privacy</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">100% Local</div>
            <div className="text-xs text-zinc-400 mt-1 leading-snug">Embedded SQLite • 0 Telemetry</div>
          </div>
        </div>
      </div>
    </section>
  );
}
