import { NextResponse } from "next/server";
import { FALLBACK_VERSION } from "@/lib/release";

const FALLBACK_BARE_VERSION = FALLBACK_VERSION.replace(/^v/, "");

interface GithubAsset {
  id: number;
  name: string;
  size: number;
  download_count: number;
  browser_download_url: string;
}

interface GithubRelease {
  id: number;
  tag_name: string;
  name: string | null;
  published_at: string;
  body: string | null;
  prerelease: boolean;
  html_url: string;
  assets?: GithubAsset[];
}

export async function GET() {
  try {
    const res = await fetch("https://api.github.com/repos/dagijosi/Eytaa/releases", {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "Eytaa-Landing-Docs",
      },
      next: { revalidate: 300 }, // Refresh every 5 minutes
    });

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        const releases = data.map((rel: GithubRelease, index: number) => {
          const assets = (rel.assets || []).map((asset: GithubAsset) => {
            const sizeMb = (asset.size / (1024 * 1024)).toFixed(1);
            const isExe = asset.name.toLowerCase().endsWith(".exe");
            const isMsi = asset.name.toLowerCase().endsWith(".msi");
            const isDmg = asset.name.toLowerCase().endsWith(".dmg");
            const isSig = asset.name.toLowerCase().endsWith(".sig");
            const isJson = asset.name.toLowerCase().endsWith(".json");

            return {
              id: asset.id,
              name: asset.name,
              sizeBytes: asset.size,
              sizeFormatted: `${sizeMb} MB`,
              downloadCount: asset.download_count,
              directUrl: asset.browser_download_url,
              proxyDownloadUrl: `/api/download?tag=${encodeURIComponent(rel.tag_name)}&name=${encodeURIComponent(asset.name)}`,
              type: isExe
                ? "exe"
                : isMsi
                  ? "msi"
                  : isDmg
                    ? "dmg"
                    : isSig
                      ? "sig"
                      : isJson
                        ? "json"
                        : "other",
            };
          });

          return {
            id: rel.id,
            tag: rel.tag_name,
            name: rel.name || rel.tag_name,
            publishedAt: rel.published_at,
            body: rel.body || "",
            isLatest: index === 0,
            prerelease: rel.prerelease,
            htmlUrl: rel.html_url,
            assets,
          };
        });

        return NextResponse.json({ success: true, releases });
      }
    }
  } catch (err) {
    console.error("Failed to fetch all releases:", err);
  }

  // Fallback data if GitHub is unreachable
  return NextResponse.json({
    success: true,
    releases: [
      {
        id: 1,
        tag: FALLBACK_VERSION,
        name: `EYTAA ${FALLBACK_VERSION}`,
        publishedAt: "2026-10-20T14:08:55Z",
        body: "### 🪟 Responsive Window Geometry & Multi-Instance Mode\n- Dynamic work area sizing: initial window size is computed from usable screen dimensions (~68% width, ~66% height), avoiding taskbar and start menu collisions\n- True multi-instance support: SQLite WAL mode and busy timeout allow running multiple player windows concurrently without database lock conflicts\n- New player window action (Ctrl+N / Cmd+N) in the TopBar quick menu and keyboard shortcuts\n- Self-contained Apple Silicon macOS distribution bundling libmpv and dependencies",
        isLatest: true,
        prerelease: false,
        assets: [
          {
            id: 101,
            name: `EYTAA_${FALLBACK_BARE_VERSION}_x64-setup.exe`,
            sizeFormatted: "33.6 MB",
            proxyDownloadUrl: `/api/download?tag=${FALLBACK_VERSION}&type=exe`,
            directUrl: `https://github.com/dagijosi/Eytaa/releases/download/${FALLBACK_VERSION}/EYTAA_${FALLBACK_BARE_VERSION}_x64-setup.exe`,
            type: "exe",
          },
          {
            id: 102,
            name: `EYTAA_${FALLBACK_BARE_VERSION}_x64_en-US.msi`,
            sizeFormatted: "44.8 MB",
            proxyDownloadUrl: `/api/download?tag=${FALLBACK_VERSION}&type=msi`,
            directUrl: `https://github.com/dagijosi/Eytaa/releases/download/${FALLBACK_VERSION}/EYTAA_${FALLBACK_BARE_VERSION}_x64_en-US.msi`,
            type: "msi",
          },
          {
            id: 103,
            name: `EYTAA_${FALLBACK_BARE_VERSION}_aarch64.dmg`,
            sizeFormatted: "52.1 MB",
            proxyDownloadUrl: `/api/download?tag=${FALLBACK_VERSION}&type=dmg`,
            directUrl: `https://github.com/dagijosi/Eytaa/releases/download/${FALLBACK_VERSION}/EYTAA_${FALLBACK_BARE_VERSION}_aarch64.dmg`,
            type: "dmg",
          },
        ],
      },
      {
        id: 2,
        tag: "v0.2.7",
        name: "EYTAA v0.2.7",
        publishedAt: "2026-10-20T12:09:01Z",
        body: "### Media Center & Series Management\n- Deterministic series poster selection prioritized by season and episode order\n- Unified poster resolver across media cards, metadata editing, and series details\n- Series detail cover management with add, change, and reset actions\n- Smoother scrubber seeking and native drag-and-drop handling",
        isLatest: false,
        prerelease: false,
        assets: [
          {
            id: 201,
            name: "EYTAA_0.2.7_x64-setup.exe",
            sizeFormatted: "33.6 MB",
            proxyDownloadUrl: "/api/download?tag=v0.2.7&type=exe",
            directUrl: "https://github.com/dagijosi/Eytaa/releases/download/v0.2.7/EYTAA_0.2.7_x64-setup.exe",
            type: "exe",
          },
        ],
      },
      {
        id: 3,
        tag: "v0.2.6",
        name: "EYTAA v0.2.6",
        publishedAt: "2026-10-19T13:22:30Z",
        body: "### UI & Readability\n- High-contrast active states across all controls, eliminating faded accent-on-accent text\n- One-click season pills with watched progress counters and an All Episodes selector\n- Persistent updater state preventing stale or duplicate update check prompts",
        isLatest: false,
        prerelease: false,
        assets: [
          {
            id: 301,
            name: "EYTAA_0.2.6_x64-setup.exe",
            sizeFormatted: "33.5 MB",
            proxyDownloadUrl: "/api/download?tag=v0.2.6&type=exe",
            directUrl: "https://github.com/dagijosi/Eytaa/releases/download/v0.2.6/EYTAA_0.2.6_x64-setup.exe",
            type: "exe",
          },
        ],
      },
    ],
  });
}
