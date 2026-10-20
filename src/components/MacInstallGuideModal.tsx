"use client";

import React, { useState } from "react";
import {
  Apple,
  X,
  Copy,
  Check,
  Terminal,
  ShieldAlert,
  Settings,
  HelpCircle,
  ExternalLink,
} from "lucide-react";

interface MacInstallGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MacInstallGuideModal({ isOpen, onClose }: MacInstallGuideModalProps) {
  const [copied, setCopied] = useState(false);
  const command = "xattr -cr /Applications/EYTAA.app";

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="mac-guide-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-3xl bg-[#0f0f11] border border-white/15 p-6 sm:p-8 text-neutral-200 shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          id="mac-guide-close-btn"
          aria-label="Close macOS installation guide"
          className="absolute top-5 right-5 p-2 rounded-full surface text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400">
            <Apple className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-semibold uppercase tracking-wider mb-1">
              macOS First-Launch Guide
            </div>
            <h2 id="mac-guide-title" className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Opening EYTAA on macOS
            </h2>
          </div>
        </div>

        {/* Why this happens banner */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-neutral-200 text-xs sm:text-sm leading-relaxed mb-6">
          <div className="flex items-center gap-2 font-bold text-amber-300 mb-1.5">
            <ShieldAlert className="w-4 h-4" />
            <span>Why does macOS say &ldquo;is damaged and can&rsquo;t be opened&rdquo;?</span>
          </div>
          <p className="text-neutral-300">
            <strong>The app is not damaged.</strong> When you download software outside the Mac App Store,
            macOS automatically attaches a download quarantine flag (<code>com.apple.quarantine</code>).
            Because EYTAA is a community-driven open-source project without a paid Apple Developer ID
            ($99/year), macOS Gatekeeper displays this generic warning.
          </p>
        </div>

        <div className="space-y-5">
          {/* Method 1: Instant Terminal Command */}
          <div className="p-5 rounded-2xl surface border-white/15">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-white font-bold text-sm sm:text-base">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>Option A: 5-Second Terminal Fix (Recommended)</span>
              </div>
              <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                Fastest
              </span>
            </div>
            <p className="text-xs text-neutral-400 mb-3">
              After dragging EYTAA into your <span className="text-white font-medium">Applications</span> folder,
              open Terminal and run this single command to remove the quarantine flag:
            </p>

            <div className="relative flex items-center justify-between bg-black/60 rounded-xl p-3 border border-white/10 font-mono text-xs sm:text-sm text-amber-300 group">
              <span className="overflow-x-auto select-all pr-12">{command}</span>
              <button
                type="button"
                onClick={handleCopy}
                id="mac-guide-copy-terminal-cmd"
                className="absolute right-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-amber-400 hover:text-black text-neutral-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400 group-hover:text-black" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-[11px] text-neutral-500 mt-2">
              ✓ Once executed, EYTAA will launch normally on double-click without ever prompting again.
            </p>
          </div>

          {/* Method 2: System Settings */}
          <div className="p-5 rounded-2xl surface border-white/15">
            <div className="flex items-center gap-2 text-white font-bold text-sm sm:text-base mb-2">
              <Settings className="w-4 h-4 text-amber-400" />
              <span>Option B: Via macOS System Settings (No Terminal)</span>
            </div>
            <ol className="space-y-2 text-xs sm:text-sm text-neutral-300 list-decimal list-inside pl-1">
              <li>
                Open <strong className="text-white">System Settings</strong> on your Mac.
              </li>
              <li>
                Navigate to <strong className="text-white">Privacy &amp; Security</strong>.
              </li>
              <li>
                Scroll down to the <strong className="text-white">Security</strong> section.
              </li>
              <li>
                You will see: <em>&ldquo;EYTAA was blocked from use because it is not from an identified developer.&rdquo;</em>
              </li>
              <li>
                Click <strong className="text-amber-400 font-semibold">Open Anyway</strong> and enter your Mac password / Touch ID.
              </li>
            </ol>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-400">
          <div className="flex items-center gap-1.5">
            <Apple className="w-3.5 h-3.5 text-neutral-400" />
            <span>macOS 15+ &middot; Apple Silicon (arm64)</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors"
          >
            Got it, close
          </button>
        </div>
      </div>
    </div>
  );
}
