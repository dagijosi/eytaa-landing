"use client";

import React, { useEffect, useState } from "react";
import { GitCommit, CheckCircle, ChevronRight, Apple, Loader2, AlertCircle, RefreshCw } from "lucide-react";

interface ChangelogRelease {
  version: string;
  date: string;
  tagline: string;
  badge: string;
  badgeColor: string;
  highlights: string[];
  isMac?: boolean;
}

interface ApiRelease {
  tag?: string;
  name?: string;
  publishedAt?: string;
  body?: string;
  assets?: { type?: string; name?: string }[];
}

interface ReleasesApiResponse {
  success?: boolean;
  releases?: ApiRelease[];
}

function stripMarkdown(value: string) {
  return value
    .replace(/^#{1,6}\s+/, "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/__(.+?)__/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^\s*[-*]\s+/, "")
    .replace(/^\s*\d+\.\s+/, "")
    .replace(/\s+/g, " ")
    .trim();
}

function stripLeadingEmoji(value: string) {
  return value
    .replace(/^[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\uFE0F\u200D\s]+/u, "")
    .trim();
}

function parseHighlights(body: string) {
  const lines = body.split(/\r?\n/);
  const bullets = lines
    .filter((line) => /^\s*[-*]\s+/.test(line))
    .map(stripMarkdown)
    .filter(Boolean);

  if (bullets.length > 0) return bullets.slice(0, 10);

  return lines
    .map((line) => line.trim())
    .filter((line) => line && !/^#{1,6}\s/.test(line) && !line.startsWith("<!--") && !line.startsWith("---"))
    .map(stripMarkdown)
    .filter(Boolean)
    .slice(0, 10);
}

function formatReleaseDate(value?: string) {
  if (!value) return "";
  try {
    return new Date(value).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return value;
  }
}

function mapRelease(rel: ApiRelease, index: number): ChangelogRelease {
  const body = typeof rel.body === "string" ? rel.body : "";
  const lines = body.split(/\r?\n/);
  const heading = lines.find((line) => /^###\s+/.test(line));
  const rawTagline = heading ?? rel.name ?? rel.tag ?? "Release notes";
  const tagline = stripLeadingEmoji(stripMarkdown(rawTagline)) || `Release ${rel.tag}`;
  const highlights = parseHighlights(body);
  const isMac = (rel.assets ?? []).some(
    (asset) => asset.type === "dmg" || asset.name?.toLowerCase().endsWith(".dmg"),
  );

  return {
    version: rel.tag ?? "Release",
    date: formatReleaseDate(rel.publishedAt),
    tagline,
    badge: index === 0 ? "Latest Release" : "Release",
    badgeColor: index === 0 ? "emerald" : "zinc",
    highlights: highlights.length > 0 ? highlights : [tagline],
    isMac,
  };
}

export function ChangelogTimeline() {
  const [expandedIndex, setExpandedIndex] = useState<number>(0);
  const [releases, setReleases] = useState<ChangelogRelease[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchReleases = () => {
    setLoading(true);
    setError(false);

    fetch(`/api/releases?t=${Date.now()}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data: ReleasesApiResponse | null) => {
        if (!data?.success || !Array.isArray(data.releases) || data.releases.length === 0) {
          setError(true);
          return;
        }

        const mapped = data.releases
          .filter((rel) => Boolean(rel?.tag))
          .map(mapRelease);

        if (mapped.length > 0) {
          setReleases(mapped);
          setExpandedIndex(0);
        } else {
          setError(true);
        }
      })
      .catch((err) => {
        console.error("Error fetching dynamic changelog:", err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchReleases();
  }, []);

  return (
    <section id="changelog" className="py-24 relative bg-[#0c0c0c]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <GitCommit className="w-3.5 h-3.5 text-neutral-300" />
            <span>Release history</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            What&apos;s new in EYTAA
          </h2>
          <p className="mt-4 text-neutral-300 text-sm sm:text-base leading-relaxed">
            Every version and what changed in it. Always live and dynamic &mdash; updates
            automatically whenever a new release is published.
          </p>
          <p className="mt-2 text-[11px] font-mono text-neutral-500">
            {loading ? "Fetching live releases from GitHub…" : "Live dynamic release registry"}
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="p-12 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
            <Loader2 className="w-8 h-8 mx-auto mb-3 text-amber-400 animate-spin" />
            <div className="text-sm font-semibold text-neutral-300">
              Fetching dynamic release history...
            </div>
            <div className="text-xs text-neutral-500 mt-1">
              Connecting directly to live GitHub release feed
            </div>
          </div>
        )}

        {/* Error / Retry State */}
        {!loading && error && releases.length === 0 && (
          <div className="p-10 rounded-2xl bg-white/[0.02] border border-red-500/20 text-center">
            <AlertCircle className="w-8 h-8 mx-auto mb-3 text-red-400" />
            <div className="text-sm font-semibold text-neutral-200">
              Could not load release history
            </div>
            <p className="text-xs text-neutral-400 mt-1 max-w-md mx-auto">
              Please check your internet connection or GitHub rate limits.
            </p>
            <button
              onClick={fetchReleases}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
          </div>
        )}

        {/* Timeline Stack */}
        {!loading && releases.length > 0 && (
          <div className="space-y-6">
            {releases.map((rel, idx) => {
              const isLatest = idx === 0;
              const isExpanded = expandedIndex === idx;

              return (
                <div
                  key={`${rel.version}-${idx}`}
                  className={`rounded-2xl transition-all duration-300 overflow-hidden border ${
                    isLatest
                      ? "surface-raised border-amber-500/40"
                      : "surface border-white/5 hover:border-white/20"
                  }`}
                >
                  {/* Header row */}
                  <button
                    onClick={() => setExpandedIndex(isExpanded ? -1 : idx)}
                    aria-expanded={isExpanded}
                    className="w-full p-6 text-left flex flex-wrap items-center justify-between gap-4 select-none cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl font-black text-white font-mono">{rel.version}</span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                          isLatest
                            ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
                            : "bg-white/5 text-neutral-300 border-white/10"
                        }`}
                      >
                        {rel.badge}
                      </span>
                      {rel.isMac && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border bg-white/5 text-neutral-300 border-white/10">
                          <Apple className="w-3 h-3" />
                          macOS
                        </span>
                      )}
                      <span className="text-xs text-neutral-500 font-mono hidden sm:inline">
                        {rel.date}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-neutral-400 hidden md:inline">{rel.tagline}</span>
                      <ChevronRight
                        className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${
                          isExpanded ? "rotate-90 text-amber-400" : ""
                        }`}
                      />
                    </div>
                  </button>

                  {/* Expanded content */}
                  {isExpanded && (
                    <div className="px-6 pb-6 pt-2 border-t border-white/5">
                      <div className="text-sm font-semibold text-neutral-200 mb-3">{rel.tagline}</div>
                      <ul className="space-y-2.5">
                        {rel.highlights.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start gap-3 text-sm text-neutral-300">
                            <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
