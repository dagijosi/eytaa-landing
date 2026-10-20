import { NextResponse } from "next/server";
import { FALLBACK_VERSION } from "@/lib/release";

const FALLBACK_BARE_VERSION = FALLBACK_VERSION.replace(/^v/, "");

interface GithubAsset {
  name: string;
  size: number;
  browser_download_url: string;
}

export async function GET() {
  try {
    const res = await fetch(
      "https://api.github.com/repos/dagijosi/Eytaa/releases/latest",
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "Eytaa-Landing",
        },
        next: { revalidate: 300 },
      }
    );

    if (res.ok) {
      const data = await res.json();
      const assets: GithubAsset[] = Array.isArray(data.assets) ? data.assets : [];
      const exe = assets.find((a: GithubAsset) =>
        a.name.toLowerCase().endsWith(".exe")
      );
      const msi = assets.find((a: GithubAsset) =>
        a.name.toLowerCase().endsWith(".msi")
      );
      const dmg = assets.find((a: GithubAsset) =>
        a.name.toLowerCase().endsWith(".dmg")
      );

      return NextResponse.json({
        success: true,
        version: data.tag_name || FALLBACK_VERSION,
        name: data.name || `EYTAA ${FALLBACK_VERSION}`,
        publishedAt: data.published_at,
        exe: exe
          ? {
              name: exe.name,
              sizeBytes: exe.size,
              sizeMb: (exe.size / (1024 * 1024)).toFixed(1),
              downloadUrl: "/api/download?type=exe",
              directUrl: exe.browser_download_url,
            }
          : null,
        msi: msi
          ? {
              name: msi.name,
              sizeBytes: msi.size,
              sizeMb: (msi.size / (1024 * 1024)).toFixed(1),
              downloadUrl: "/api/download?type=msi",
              directUrl: msi.browser_download_url,
            }
          : null,
        dmg: dmg
          ? {
              name: dmg.name,
              sizeBytes: dmg.size,
              sizeMb: (dmg.size / (1024 * 1024)).toFixed(1),
              downloadUrl: "/api/download?type=dmg",
              directUrl: dmg.browser_download_url,
            }
          : null,
      });
    }
  } catch (err) {
    console.error("Failed to query release info:", err);
  }

  // Fallback data
  return NextResponse.json({
    success: true,
    version: FALLBACK_VERSION,
    name: `EYTAA ${FALLBACK_VERSION}`,
    publishedAt: "2026-10-20T14:08:55Z",
    exe: {
      name: `EYTAA_${FALLBACK_BARE_VERSION}_x64-setup.exe`,
      sizeBytes: 35183786,
      sizeMb: "33.6",
      downloadUrl: "/api/download?type=exe",
      directUrl: `https://github.com/dagijosi/Eytaa/releases/download/${FALLBACK_VERSION}/EYTAA_${FALLBACK_BARE_VERSION}_x64-setup.exe`,
    },
    msi: {
      name: `EYTAA_${FALLBACK_BARE_VERSION}_x64_en-US.msi`,
      sizeBytes: 46923776,
      sizeMb: "44.8",
      downloadUrl: "/api/download?type=msi",
      directUrl: `https://github.com/dagijosi/Eytaa/releases/download/${FALLBACK_VERSION}/EYTAA_${FALLBACK_BARE_VERSION}_x64_en-US.msi`,
    },
    dmg: {
      name: `EYTAA_${FALLBACK_BARE_VERSION}_aarch64.dmg`,
      sizeBytes: 32516387,
      sizeMb: "31.0",
      downloadUrl: "/api/download?type=dmg",
      directUrl: `https://github.com/dagijosi/Eytaa/releases/download/${FALLBACK_VERSION}/EYTAA_${FALLBACK_BARE_VERSION}_aarch64.dmg`,
    },
  });
}
