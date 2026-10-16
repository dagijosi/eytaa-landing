"use client";

import React, { useState, useEffect } from "react";
import { Download, CheckCircle2, Clock, ShieldCheck, FileDown } from "lucide-react";

interface ReleaseAsset {
  id: number;
  name: string;
  sizeFormatted: string;
  proxyDownloadUrl: string;
  directUrl: string;
  type: "exe" | "msi" | "sig" | "json" | "other";
}

interface ReleaseItem {
  id: number;
  tag: string;
  name: string;
  publishedAt: string;
  body: string;
  isLatest: boolean;
  htmlUrl: string;
  assets: ReleaseAsset[];
}

export function ReleaseArchive() {
  const [releases, setReleases] = useState<ReleaseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloadingFile, setDownloadingFile] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/releases")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.releases) {
          setReleases(data.releases);
        }
      })
      .catch((err) => console.error("Error fetching release archive:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleDownload = (assetName: string) => {
    setDownloadingFile(assetName);
    setTimeout(() => setDownloadingFile(null), 5000);
  };

  const formatDate = (dateString: string) => {
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="p-12 surface rounded-2xl text-center">
        <div className="w-8 h-8 mx-auto mb-3 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
        <div className="text-sm font-semibold text-neutral-300">
          Fetching live release registry from GitHub...
        </div>
        <div className="text-xs text-neutral-500 mt-1">
          Always dynamic • updates automatically with every new release
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Download Alert Toast */}
      {downloadingFile && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 backdrop-blur-md flex items-center justify-between gap-4 animate-in fade-in slide-in-from-top duration-300">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">
                Downloading {downloadingFile}...
              </div>
              <div className="text-xs text-neutral-300">
                Direct file download started. Check your browser downloads bar.
              </div>
            </div>
          </div>
          <span className="text-xs font-mono text-emerald-400">Direct Delivery</span>
        </div>
      )}

      {/* Release Cards */}
      <div className="space-y-6">
        {releases.map((rel) => {
          const exeAsset = rel.assets.find((a) => a.type === "exe");
          const msiAsset = rel.assets.find((a) => a.type === "msi");
          const otherAssets = rel.assets.filter((a) => a.type !== "exe" && a.type !== "msi");

          return (
            <div
              key={rel.id}
              className={`rounded-2xl overflow-hidden border transition-all ${
                rel.isLatest
                  ? "surface-raised border-amber-500/40"
                  : "surface border-white/10"
              }`}
            >
              {/* Release Header */}
              <div className="p-6 bg-[#141416] border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-black text-white font-mono">{rel.tag}</span>
                  {rel.isLatest && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      Latest Production
                    </span>
                  )}
                  <span className="text-xs text-neutral-400 font-mono flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-neutral-500" />
                    <span>{formatDate(rel.publishedAt)}</span>
                  </span>
                </div>

                <div className="text-xs text-neutral-400 font-medium">
                  {rel.name !== rel.tag && <span>{rel.name}</span>}
                </div>
              </div>

              {/* Release Body / Notes */}
              <div className="p-6">
                {rel.body && (
                  <div className="mb-6 p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-neutral-300 whitespace-pre-line leading-relaxed font-sans max-h-56 overflow-y-auto">
                    {rel.body}
                  </div>
                )}

                {/* Primary Direct Download Buttons for this Version */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  {exeAsset && (
                    <a
                      href={exeAsset.proxyDownloadUrl}
                      download
                      onClick={() => handleDownload(exeAsset.name)}
                      className="flex items-center justify-between p-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs shadow-sm hover:-translate-y-0.5 transition-all"
                    >
                      <div className="flex items-center gap-2.5">
                        <Download className="w-4 h-4 text-black" />
                        <div>
                          <div className="font-extrabold leading-none">Download .EXE Installer</div>
                          <div className="text-[10px] text-black/75 font-mono mt-0.5">
                            {exeAsset.name}
                          </div>
                        </div>
                      </div>
                      <span className="font-mono text-[11px] bg-black/15 px-2 py-0.5 rounded">
                        {exeAsset.sizeFormatted}
                      </span>
                    </a>
                  )}

                  {msiAsset && (
                    <a
                      href={msiAsset.proxyDownloadUrl}
                      download
                      onClick={() => handleDownload(msiAsset.name)}
                      className="flex items-center justify-between p-3.5 rounded-xl surface hover:bg-white/10 text-white font-bold text-xs border-white/10 hover:border-white/20 hover:-translate-y-0.5 transition-all"
                    >
                      <div className="flex items-center gap-2.5">
                        <FileDown className="w-4 h-4 text-neutral-300" />
                        <div>
                          <div className="font-extrabold leading-none">Download .MSI Package</div>
                          <div className="text-[10px] text-neutral-400 font-mono mt-0.5">
                            {msiAsset.name}
                          </div>
                        </div>
                      </div>
                      <span className="font-mono text-[11px] bg-white/10 px-2 py-0.5 rounded text-neutral-300">
                        {msiAsset.sizeFormatted}
                      </span>
                    </a>
                  )}
                </div>

                {/* Secondary Assets (Signatures, manifests) */}
                {otherAssets.length > 0 && (
                  <div className="pt-3 border-t border-white/5 flex flex-wrap items-center gap-2">
                    <span className="text-[11px] text-neutral-500 font-medium mr-1">
                      Verification Signatures:
                    </span>
                    {otherAssets.map((asset) => (
                      <a
                        key={asset.id}
                        href={asset.proxyDownloadUrl}
                        download
                        onClick={() => handleDownload(asset.name)}
                        className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-[10px] font-mono text-neutral-400 hover:text-white border border-white/10 transition-colors flex items-center gap-1"
                      >
                        <ShieldCheck className="w-3 h-3 text-neutral-500" />
                        <span>{asset.name}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
