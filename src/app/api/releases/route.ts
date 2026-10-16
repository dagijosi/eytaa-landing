import { NextResponse } from "next/server";

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
        const releases = data.map((rel: any, index: number) => {
          const assets = (rel.assets || []).map((asset: any) => {
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
        tag: "v0.2.0",
        name: "EYTAA v0.2.0",
        publishedAt: "2026-10-15T21:00:11Z",
        body: "### Smart Media Center & Cinema-Grade Artwork\n- Collapsible Navigation Rail with fluid spring physics\n- Smart TV Series & Episode architecture\n- Zero-crop presentation with ambient blur-xl glow layers\n- 16:9 Landscape & 2:3 Portrait toggles",
        isLatest: true,
        prerelease: false,
        assets: [
          {
            id: 101,
            name: "EYTAA_0.2.0_x64-setup.exe",
            sizeFormatted: "33.4 MB",
            proxyDownloadUrl: "/api/download?tag=v0.2.0&type=exe",
            directUrl: "https://github.com/dagijosi/Eytaa/releases/download/v0.2.0/EYTAA_0.2.0_x64-setup.exe",
            type: "exe",
          },
          {
            id: 102,
            name: "EYTAA_0.2.0_x64_en-US.msi",
            sizeFormatted: "44.6 MB",
            proxyDownloadUrl: "/api/download?tag=v0.2.0&type=msi",
            directUrl: "https://github.com/dagijosi/Eytaa/releases/download/v0.2.0/EYTAA_0.2.0_x64_en-US.msi",
            type: "msi",
          },
        ],
      },
    ],
  });
}
