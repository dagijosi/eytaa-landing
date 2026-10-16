import { NextResponse } from "next/server";

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
      const exe = data.assets?.find((a: any) =>
        a.name.toLowerCase().endsWith(".exe")
      );
      const msi = data.assets?.find((a: any) =>
        a.name.toLowerCase().endsWith(".msi")
      );

      return NextResponse.json({
        success: true,
        version: data.tag_name || "v0.2.0",
        name: data.name || "EYTAA v0.2.0",
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
    version: "v0.2.0",
    name: "EYTAA v0.2.0",
    publishedAt: "2026-10-15T18:00:00Z",
    exe: {
      name: "EYTAA_0.2.0_x64-setup.exe",
      sizeBytes: 35019413,
      sizeMb: "33.4",
      downloadUrl: "/api/download?type=exe",
      directUrl:
        "https://github.com/dagijosi/Eytaa/releases/download/v0.2.0/EYTAA_0.2.0_x64-setup.exe",
    },
    msi: {
      name: "EYTAA_0.2.0_x64_en-US.msi",
      sizeBytes: 46723072,
      sizeMb: "44.6",
      downloadUrl: "/api/download?type=msi",
      directUrl:
        "https://github.com/dagijosi/Eytaa/releases/download/v0.2.0/EYTAA_0.2.0_x64_en-US.msi",
    },
  });
}
