"use client";

import { useEffect, useState } from "react";
import {
  FALLBACK_VERSION,
  normalizeVersion,
  type ReleaseInfo,
} from "./release";

let cachedRelease: ReleaseInfo | null = null;
let pendingRequest: Promise<ReleaseInfo | null> | null = null;
const listeners = new Set<(release: ReleaseInfo) => void>();

async function fetchReleaseInfo(): Promise<ReleaseInfo | null> {
  if (cachedRelease) return cachedRelease;

  if (!pendingRequest) {
    pendingRequest = fetch("/api/release-info", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (!data?.success) return null;

        const version = normalizeVersion(data.version);
        const release: ReleaseInfo = {
          version,
          name: typeof data.name === "string" ? data.name : `EYTAA ${version}`,
          publishedAt: typeof data.publishedAt === "string" ? data.publishedAt : undefined,
          exe: data.exe ?? null,
          msi: data.msi ?? null,
        };

        cachedRelease = release;
        listeners.forEach((listener) => listener(release));
        return release;
      })
      .catch(() => null)
      .finally(() => {
        pendingRequest = null;
      });
  }

  return pendingRequest;
}

export function useReleaseInfo(): ReleaseInfo | null {
  const [release, setRelease] = useState<ReleaseInfo | null>(cachedRelease);

  useEffect(() => {
    let active = true;
    const listener = (next: ReleaseInfo) => {
      if (active) setRelease(next);
    };

    listeners.add(listener);
    fetchReleaseInfo().then((next) => {
      if (active && next) setRelease(next);
    });

    return () => {
      active = false;
      listeners.delete(listener);
    };
  }, []);

  return release;
}

export function useLatestVersion(): string {
  const release = useReleaseInfo();
  return release?.version ?? FALLBACK_VERSION;
}
