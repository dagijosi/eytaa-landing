import { NextRequest, NextResponse } from "next/server";
import { FALLBACK_VERSION } from "@/lib/release";

interface GithubAsset {
  name: string;
  browser_download_url: string;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get("tag"); // e.g. "v0.2.5" or undefined for latest
  const exactName = searchParams.get("name"); // e.g. "EYTAA_0.2.5_x64-setup.exe"
  const type = (searchParams.get("type") || searchParams.get("format") || "exe").toLowerCase();
  const assetType = exactName?.toLowerCase().endsWith(".dmg")
    ? "dmg"
    : exactName?.toLowerCase().endsWith(".msi")
      ? "msi"
      : type;
  const shouldStream = searchParams.get("stream") === "true";

  let targetUrl = "";
  let filename = "";

  try {
    // 1. If an exact tag is specified, fetch that release; otherwise fetch latest
    const apiUrl = tag
      ? `https://api.github.com/repos/dagijosi/Eytaa/releases/tags/${encodeURIComponent(tag)}`
      : "https://api.github.com/repos/dagijosi/Eytaa/releases/latest";

    const response = await fetch(apiUrl, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "Eytaa-Landing-Downloader",
      },
      next: { revalidate: 300 }, // Cache release info for 5 minutes
    });

    if (response.ok) {
      const data = await response.json();
      const assets: GithubAsset[] = Array.isArray(data.assets) ? data.assets : [];

      if (exactName) {
        const found = assets.find(
          (a: GithubAsset) => a.name.toLowerCase() === exactName.toLowerCase()
        );
        if (found?.browser_download_url) {
          targetUrl = found.browser_download_url;
          filename = found.name;
        }
      } else if (type === "msi") {
        const msiAsset = assets.find((a: GithubAsset) =>
          a.name.toLowerCase().endsWith(".msi")
        );
        if (msiAsset?.browser_download_url) {
          targetUrl = msiAsset.browser_download_url;
          filename = msiAsset.name;
        }
      } else if (type === "dmg") {
        const dmgAsset = assets.find((a: GithubAsset) =>
          a.name.toLowerCase().endsWith(".dmg")
        );
        if (dmgAsset?.browser_download_url) {
          targetUrl = dmgAsset.browser_download_url;
          filename = dmgAsset.name;
        }
      } else {
        const exeAsset = assets.find((a: GithubAsset) =>
          a.name.toLowerCase().endsWith(".exe")
        );
        if (exeAsset?.browser_download_url) {
          targetUrl = exeAsset.browser_download_url;
          filename = exeAsset.name;
        }
      }
    }
  } catch (err) {
    console.error("Failed to fetch release from GitHub API:", err);
  }

  // Fallback direct URL if GitHub API was unreachable or rate-limited
  if (!targetUrl) {
    const fallbackTag = tag || FALLBACK_VERSION;
    const bareVersion = fallbackTag.replace("v", "");

    if (assetType === "dmg") {
      filename = exactName || `EYTAA_${bareVersion}_aarch64.dmg`;
      targetUrl = `https://github.com/dagijosi/Eytaa/releases/download/${fallbackTag}/${filename}`;
    } else if (assetType === "msi") {
      filename = exactName || `EYTAA_${bareVersion}_x64_en-US.msi`;
      targetUrl = `https://github.com/dagijosi/Eytaa/releases/download/${fallbackTag}/${filename}`;
    } else {
      filename = exactName || `EYTAA_${bareVersion}_x64-setup.exe`;
      targetUrl = `https://github.com/dagijosi/Eytaa/releases/download/${fallbackTag}/${filename}`;
    }
  }

  // Option A: If streaming requested, pipe binary from GitHub directly
  if (shouldStream) {
    try {
      const fileRes = await fetch(targetUrl);
      if (fileRes.ok && fileRes.body) {
        return new NextResponse(fileRes.body, {
          status: 200,
          headers: {
            "Content-Disposition": `attachment; filename="${filename}"`,
            "Content-Type":
              assetType === "dmg"
                ? "application/x-apple-diskimage"
                : assetType === "msi"
                  ? "application/x-msi"
                  : "application/vnd.microsoft.portable-executable",
            "Content-Length": fileRes.headers.get("content-length") || "",
          },
        });
      }
    } catch (e) {
      console.error("Direct stream failed, redirecting instead", e);
    }
  }

  // Option B: Standard 302 Found redirect directly triggering the browser download
  return NextResponse.redirect(targetUrl, 302);
}
