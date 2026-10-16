"use client";

import React, { useState, useEffect } from "react";
import {
  Download,
  Monitor,
  Terminal,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  FileDown,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface ReleaseInfo {
  version: string;
  name: string;
  exe: {
    name: string;
    sizeMb: string;
    downloadUrl: string;
    directUrl: string;
  };
  msi: {
    name: string;
    sizeMb: string;
    downloadUrl: string;
    directUrl: string;
  };
}

export function DownloadCTA() {
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [release, setRelease] = useState<ReleaseInfo | null>(null);
  const [downloadStarted, setDownloadStarted] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/release-info")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setRelease(data);
        }
      })
      .catch(() => {});
  }, []);

  const cloneCommand = `git clone https://github.com/dagijosi/Eytaa.git\ncd Eytaa/player\nnpm install\nnpm run setup:lib\nnpm run tauri:dev`;

  const handleCopy = () => {
    navigator.clipboard.writeText(cloneCommand);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  const triggerDownload = (type: "exe" | "msi", filename: string) => {
    setDownloadStarted(filename);
    setTimeout(() => setDownloadStarted(null), 6000);
  };

  const exeSize = release?.exe?.sizeMb || "33.4";
  const msiSize = release?.msi?.sizeMb || "44.6";
  const version = release?.version || "v0.2.0";

  return (
    <section id="download" className="py-24 relative bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel-elevated rounded-3xl p-8 sm:p-14 border-amber-500/30 relative overflow-hidden">
          {/* Ambient Glow Highlights */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

          {/* Download Started Toast Alert */}
          {downloadStarted && (
            <div className="mb-8 p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 backdrop-blur-md flex items-center justify-between gap-4 animate-in fade-in slide-in-from-top duration-300">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">
                    Downloading {downloadStarted}...
                  </div>
                  <div className="text-xs text-zinc-300">
                    Your direct download has started. Check your browser downloads bar.
                  </div>
                </div>
              </div>
              <span className="text-xs font-mono text-emerald-400">100% Direct File</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Direct Download Buttons */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4">
                <Monitor className="w-3.5 h-3.5 text-amber-400" />
                <span>Windows 10 & 11 • 64-bit • Direct Download</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                Get EYTAA for Windows
              </h2>

              <p className="mt-4 text-zinc-300 text-sm sm:text-base leading-relaxed">
                Download the official {version} release directly to your computer. No GitHub account or
                external browsing needed — click below to start your direct download immediately.
              </p>

              {/* Direct Download Options */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Option 1: Direct .EXE Setup */}
                <a
                  href="/api/download?type=exe"
                  download
                  onClick={() => triggerDownload("exe", `EYTAA_${version}_x64-setup.exe`)}
                  id="direct-download-exe"
                  className="group p-5 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:-translate-y-1 transition-all duration-200 block"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-black/10 flex items-center justify-center">
                      <Download className="w-5 h-5 text-black group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="text-[10px] font-mono font-extrabold uppercase px-2 py-0.5 rounded-full bg-black/15 text-black">
                      Recommended
                    </span>
                  </div>
                  <div className="text-lg font-black leading-tight text-black">
                    Download .EXE Setup
                  </div>
                  <div className="text-xs text-black/80 mt-1 font-medium flex items-center justify-between">
                    <span>Direct Standalone Installer</span>
                    <span className="font-mono font-bold">~{exeSize} MB</span>
                  </div>
                </a>

                {/* Option 2: Direct .MSI Package */}
                <a
                  href="/api/download?type=msi"
                  download
                  onClick={() => triggerDownload("msi", `EYTAA_${version}_x64_en-US.msi`)}
                  id="direct-download-msi"
                  className="group p-5 rounded-2xl glass-panel hover:bg-white/10 border-white/15 hover:border-white/30 text-white hover:-translate-y-1 transition-all duration-200 block"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                      <FileDown className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                      Enterprise / MSI
                    </span>
                  </div>
                  <div className="text-lg font-black leading-tight text-white group-hover:text-amber-300 transition-colors">
                    Download .MSI Package
                  </div>
                  <div className="text-xs text-zinc-400 mt-1 flex items-center justify-between">
                    <span>Windows Installer Package</span>
                    <span className="font-mono font-bold text-zinc-300">~{msiSize} MB</span>
                  </div>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="mt-8 pt-8 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Minisign Cryptographic Signatures</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Zero Telemetry / 100% Offline</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>LGPL v2.1+ Dynamic Linking</span>
                </span>
              </div>
            </div>

            {/* Right Column: Installation Steps & Source Build */}
            <div className="lg:col-span-5 space-y-4">
              {/* Quick 3-step install card */}
              <div className="glass-panel p-6 rounded-2xl border-white/10">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Simple 3-Step Setup</span>
                </h3>
                <div className="space-y-3.5 text-xs text-zinc-300">
                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                      1
                    </span>
                    <div>
                      <strong className="text-white">Download the .EXE above</strong>: The direct file will save straight to your Downloads folder.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                      2
                    </span>
                    <div>
                      <strong className="text-white">Run the installer</strong>: Launch the setup wizard to create desktop shortcuts and associate video extensions.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                      3
                    </span>
                    <div>
                      <strong className="text-white">Enjoy studio-grade viewing</strong>: Drop any video, MKV, or season folder to start watching instantly.
                    </div>
                  </div>
                </div>
              </div>

              {/* Developer Source Code Option */}
              <div className="glass-panel p-5 rounded-2xl border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-amber-400" />
                    <span className="font-mono text-xs font-bold text-white">Prefer to compile?</span>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="p-1.5 rounded hover:bg-white/10 text-zinc-400 hover:text-white transition-colors flex items-center gap-1 text-[11px]"
                  >
                    {copiedCmd ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400 font-medium">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <pre className="p-3 rounded-xl bg-[#07090F] border border-white/5 font-mono text-[11px] text-zinc-300 overflow-x-auto leading-relaxed">
                  <code>{cloneCommand}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
