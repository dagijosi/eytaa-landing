"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Shield, Terminal, ArrowUp } from "lucide-react";
import { GithubIcon } from "@/components/GithubIcon";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/10 bg-[#06080E] text-zinc-400 text-xs py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/5">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 relative">
                <Image
                  src="/eytaa-icon.svg"
                  alt="EYTAA"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]"
                />
              </div>
              <span className="text-lg font-black text-white tracking-wider">EYTAA</span>
              <span className="text-[11px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                እይታ • Vision
              </span>
            </div>

            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              &ldquo;Every story, in view.&rdquo; Derived from the Amharic word <strong>እይታ</strong>,
              representing clarity of sight, perspective, and viewing. Engineered for Windows 10 & 11.
            </p>

            <div className="pt-2 flex items-center gap-4">
              <a
                href="https://github.com/dagijosi/Eytaa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub Repository</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">Navigation</div>
            <ul className="space-y-2">
              <li>
                <Link href="/docs" className="text-amber-300 font-semibold hover:text-amber-200 transition-colors">
                  Docs &amp; Version Archive
                </Link>
              </li>
              <li>
                <Link href="/#interactive-demo" className="hover:text-amber-400 transition-colors">
                  Interactive Demo
                </Link>
              </li>
              <li>
                <Link href="/#architecture" className="hover:text-amber-400 transition-colors">
                  Architecture
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-amber-400 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/#shortcuts" className="hover:text-amber-400 transition-colors">
                  Keyboard Shortcuts
                </Link>
              </li>
              <li>
                <Link href="/#changelog" className="hover:text-amber-400 transition-colors">
                  Changelog (v0.2.0)
                </Link>
              </li>
            </ul>
          </div>

          {/* Architecture & Open Source */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">Technology</div>
            <ul className="space-y-1.5 text-zinc-400">
              <li>• libmpv 2.x (LGPL v2.1+ / v3 dynamic)</li>
              <li>• Tauri 2.12 (MIT / Apache-2.0)</li>
              <li>• React 19 & Tailwind CSS v4</li>
              <li>• SQLite (rusqlite local persistence)</li>
              <li>• Direct3D11va / NVDEC / DXVA2</li>
            </ul>
          </div>

          {/* Back to top */}
          <div className="md:col-span-2 flex flex-col justify-between items-start md:items-end">
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-colors flex items-center gap-2"
              title="Back to Top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500 text-[11px]">
          <div>
            Copyright &copy; 2026 EYTAA. Created by Dagmawi Y. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>LGPL v2.1+ Compliant</span>
            <span>•</span>
            <span>Zero Telemetry</span>
            <span>•</span>
            <span>Local Database</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
