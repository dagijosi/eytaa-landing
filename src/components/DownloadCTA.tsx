"use client";

import React, { useState } from "react";
import { track } from "@vercel/analytics";
import {
  Download,
  Monitor,
  Terminal,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  FileDown,
} from "lucide-react";
import { FALLBACK_VERSION } from "@/lib/release";
import { useReleaseInfo } from "@/lib/useReleaseInfo";

export function DownloadCTA() {
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [downloadStarted, setDownloadStarted] = useState<string | null>(null);
  const release = useReleaseInfo();

  const cloneCommand = `git clone https://github.com/dagijosi/Eytaa.git\ncd Eytaa/player\nnpm install\nnpm run setup:lib\nnpm run tauri:dev`;

  const handleCopy = () => {
    navigator.clipboard.writeText(cloneCommand);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  const triggerDownload = (type: "exe" | "msi", filename: string) => {
    track("Download", { type, location: "download-section" });
    setDownloadStarted(filename);
    setTimeout(() => setDownloadStarted(null), 6000);
  };

  const exeSize = release?.exe?.sizeMb;
  const msiSize = release?.msi?.sizeMb;
  const version = release?.version ?? FALLBACK_VERSION;

  return (
    <section id="download" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="surface-raised rounded-3xl p-8 sm:p-14 border-amber-500/30 relative overflow-hidden">
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
                  <div className="text-xs text-neutral-300">
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

              <p className="mt-4 text-neutral-300 text-sm sm:text-base leading-relaxed">
                Get the latest version ({version}) for Windows 10 &amp; 11, 64-bit. It&apos;s a
                single installer file &mdash; no account, no sign-up, no extra downloads. Pick the
                format that suits you below.
              </p>

              {/* Direct Download Options */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Option 1: Direct .EXE Setup */}
                <a
                  href="/api/download?type=exe"
                  download
                  onClick={() => triggerDownload("exe", `EYTAA_${version}_x64-setup.exe`)}
                  id="direct-download-exe"
                  className="group p-5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black shadow-lg shadow-amber-500/20 hover:-translate-y-1 transition-all duration-200 block"
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
                    <span className="font-mono font-bold">
                      {exeSize ? `~${exeSize} MB` : "Latest build"}
                    </span>
                  </div>
                </a>

                {/* Option 2: Direct .MSI Package */}
                <a
                  href="/api/download?type=msi"
                  download
                  onClick={() => triggerDownload("msi", `EYTAA_${version}_x64_en-US.msi`)}
                  id="direct-download-msi"
                  className="group p-5 rounded-2xl surface hover:bg-white/10 border-white/15 hover:border-white/30 text-white hover:-translate-y-1 transition-all duration-200 block"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                      <FileDown className="w-5 h-5 text-neutral-300 group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-white/5 text-neutral-300 border border-white/10">
                      Enterprise / MSI
                    </span>
                  </div>
                  <div className="text-lg font-black leading-tight text-white group-hover:text-amber-300 transition-colors">
                    Download .MSI Package
                  </div>
                  <div className="text-xs text-neutral-400 mt-1 flex items-center justify-between">
                    <span>Windows Installer Package</span>
                    <span className="font-mono font-bold text-neutral-300">
                      {msiSize ? `~${msiSize} MB` : "Latest build"}
                    </span>
                  </div>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="mt-8 pt-8 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Signed auto-updates</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-neutral-300" />
                  <span>No ads, no telemetry</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>libmpv (LGPL v2.1+)</span>
                </span>
              </div>

              {/* SmartScreen first-run hint */}
              <div className="mt-6 p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-neutral-400 leading-relaxed">
                <span className="text-neutral-200 font-semibold">First launch note:</span> Windows
                SmartScreen may warn about a less-common app. Choose{" "}
                <span className="text-amber-300 font-medium">More info &rarr; Run anyway</span> to
                continue.
              </div>
            </div>

            {/* Right Column: Installation Steps & Source Build */}
            <div className="lg:col-span-5 space-y-4">
              {/* Quick 3-step install card */}
              <div className="surface p-6 rounded-2xl border-white/10">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>Simple 3-Step Setup</span>
                </h3>
                <div className="space-y-3.5 text-xs text-neutral-300">
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
                      <strong className="text-white">Enjoy studio-grade viewing</strong>: Drop any video or MKV to start instantly, or add a folder to your library.
                    </div>
                  </div>
                </div>
              </div>

              {/* Developer Source Code Option */}
              <div className="surface p-5 rounded-2xl border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-amber-400" />
                    <span className="font-mono text-xs font-bold text-white">Prefer to compile?</span>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="p-1.5 rounded hover:bg-white/10 text-neutral-400 hover:text-white transition-colors flex items-center gap-1 text-[11px]"
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

                <pre className="p-3 rounded-xl bg-[#0e0e11] border border-white/5 font-mono text-[11px] text-neutral-300 overflow-x-auto leading-relaxed">
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
