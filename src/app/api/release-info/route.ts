import { NextResponse } from "next/server";

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
        next: { revalidate: 1800 },
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

      return NextResponse.json({
        success: true,
        version: data.tag_name || "v0.2.5",
        name: data.name || "EYTAA v0.2.5",
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
      });
    }
  } catch (err) {
    console.error("Failed to query release info:", err);
  }

  // Fallback data
  return NextResponse.json({
    success: true,
    version: "v0.2.5",
    name: "EYTAA v0.2.5",
    publishedAt: "2026-10-17T15:45:17Z",
    exe: {
      name: "EYTAA_0.2.5_x64-setup.exe",
      sizeBytes: 35163586,
      sizeMb: "33.5",
      downloadUrl: "/api/download?type=exe",
      directUrl:
        "https://github.com/dagijosi/Eytaa/releases/download/v0.2.5/EYTAA_0.2.5_x64-setup.exe",
    },
    msi: {
      name: "EYTAA_0.2.5_x64_en-US.msi",
      sizeBytes: 46903296,
      sizeMb: "44.7",
      downloadUrl: "/api/download?type=msi",
      directUrl:
        "https://github.com/dagijosi/Eytaa/releases/download/v0.2.5/EYTAA_0.2.5_x64_en-US.msi",
    },
  });
}
