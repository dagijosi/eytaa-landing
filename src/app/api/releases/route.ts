import { NextResponse } from "next/server";

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
              type: isExe ? "exe" : isMsi ? "msi" : isSig ? "sig" : isJson ? "json" : "other",
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
        tag: "v0.2.5",
        name: "EYTAA v0.2.5",
        publishedAt: "2026-10-17T15:45:17Z",
        body: "### Deep Theming & Playback Profiles\n- 12 curated design skins with full accent and glass control\n- 9 built-in playback profiles, including Late Night, HDR Vivid Pop, Action & Blockbuster, and Vintage Cinema\n- In-place profile customizer with live player preview\n- Advanced subtitle typography: fonts, colors, outlines, shadows, and margins",
        isLatest: true,
        prerelease: false,
        assets: [
          {
            id: 101,
            name: "EYTAA_0.2.5_x64-setup.exe",
            sizeFormatted: "33.5 MB",
            proxyDownloadUrl: "/api/download?tag=v0.2.5&type=exe",
            directUrl: "https://github.com/dagijosi/Eytaa/releases/download/v0.2.5/EYTAA_0.2.5_x64-setup.exe",
            type: "exe",
          },
          {
            id: 102,
            name: "EYTAA_0.2.5_x64_en-US.msi",
            sizeFormatted: "44.7 MB",
            proxyDownloadUrl: "/api/download?tag=v0.2.5&type=msi",
            directUrl: "https://github.com/dagijosi/Eytaa/releases/download/v0.2.5/EYTAA_0.2.5_x64_en-US.msi",
            type: "msi",
          },
        ],
      },
    ],
  });
}
