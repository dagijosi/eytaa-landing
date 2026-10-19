"use client";

import React from "react";
import {
  Library,
  Tv,
  FolderSync,
  LayoutGrid,
  ScanLine,
  Database,
  Sparkles,
  ArrowDown,
  Check,
  X,
} from "lucide-react";

const PILLARS = [
  {
    icon: Library,
    title: "One index for everything",
    description:
      "Point EYTAA at your folders once. Movies, series, episodes, and music are scanned and stored in a local SQLite library — no accounts, no cloud, no metadata service.",
  },
  {
    icon: Tv,
    title: "Series organize themselves",
    description:
      "Naming variants collapse into one show. Seasons and episodes are counted automatically, specials sort last, and the next unwatched episode is always one click away.",
  },
  {
    icon: LayoutGrid,
    title: "Built for huge libraries",
    description:
      "A virtualized grid, paginated database queries, and debounced search keep the interface smooth whether you have 50 files or several thousand.",
  },
  {
    icon: FolderSync,
    title: "The library stays live",
    description:
      "A native filesystem watcher sees new, renamed, and deleted files the moment they change on disk. No manual rescan, no stale cards, no restart.",
  },
];

const COMPARISON = [
  {
    manual: "Browse folders and build playlists by hand",
    automatic: "Series, seasons, and episodes group themselves",
  },
  {
    manual: "Rescan the whole library after every change",
    automatic: "A live watcher updates the library instantly",
  },
  {
    manual: "Sign up for scrapers or match metadata online",
    automatic: "Local SQLite index with zero accounts",
  },
];

export function SmartMediaCenter() {
  return (
    <section id="media-center" className="py-24 relative bg-[#0c0c0c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Smart Media Center v2</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Your folders, finally organized
          </h2>
          <p className="mt-4 text-neutral-300 text-sm sm:text-base leading-relaxed">
            Most players stop at a file picker. EYTAA turns your media folders into a real library
            that groups shows, remembers progress, and updates itself — entirely on your PC.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-6 space-y-5">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div key={pillar.title} className="surface p-5 rounded-2xl border-white/10">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">{pillar.title}</h3>
                      <p className="mt-1.5 text-sm text-neutral-400 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-6 surface-raised p-8 rounded-2xl border-white/15 relative overflow-hidden">
            <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-amber-400" />
                <span className="font-mono text-xs font-semibold text-neutral-300">
                  LOCAL_LIBRARY_PIPELINE
                </span>
              </div>
              <span className="text-[10px] font-mono text-neutral-300 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                Zero Cloud
              </span>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <ScanLine className="w-4 h-4 text-neutral-300" />
                    <div className="text-sm font-semibold text-white">Scan your folders</div>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-300 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                    Rust
                  </span>
                </div>
                <div className="mt-1 text-xs text-neutral-400">
                  Recursive scan, thumbnail worker, unchanged-file skipping
                </div>
              </div>

              <div className="flex justify-center -my-1 text-neutral-600">
                <ArrowDown className="w-3.5 h-3.5" />
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Database className="w-4 h-4 text-neutral-300" />
                    <div className="text-sm font-semibold text-white">Index locally</div>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-300 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                    SQLite
                  </span>
                </div>
                <div className="mt-1 text-xs text-neutral-400">
                  Quick-hash fingerprints, resume positions, paginated queries
                </div>
              </div>

              <div className="flex justify-center -my-1 text-neutral-600">
                <ArrowDown className="w-3.5 h-3.5" />
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Tv className="w-4 h-4 text-neutral-300" />
                    <div className="text-sm font-semibold text-white">Organize automatically</div>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-300 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                    Series
                  </span>
                </div>
                <div className="mt-1 text-xs text-neutral-400">
                  Show → season → episode grouping, specials last, next-unwatched ready
                </div>
              </div>

              <div className="flex justify-center -my-1 text-neutral-600">
                <ArrowDown className="w-3.5 h-3.5" />
              </div>

              <div className="p-4 rounded-xl bg-amber-500/[0.06] border border-amber-500/30">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <FolderSync className="w-4 h-4 text-amber-400" />
                    <div className="text-sm font-semibold text-white">Stay current</div>
                  </div>
                  <span className="text-[10px] font-mono text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded">
                    Live
                  </span>
                </div>
                <div className="mt-1 text-xs text-neutral-400">
                  Filesystem watcher updates adds, renames, and deletes in real time
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-neutral-500">
              <span>No scraper account</span>
              <span aria-hidden="true">•</span>
              <span>No cloud index</span>
              <span aria-hidden="true">•</span>
              <span>No manual playlists</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {COMPARISON.map((item) => (
            <div key={item.manual} className="surface p-5 rounded-2xl border-white/10">
              <div className="flex items-start gap-2.5 text-xs text-rose-400">
                <X className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{item.manual}</span>
              </div>
              <div className="mt-3 flex items-start gap-2.5 text-sm font-semibold text-white">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{item.automatic}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
