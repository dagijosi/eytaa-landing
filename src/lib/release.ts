export const FALLBACK_VERSION = "v0.2.5";

export interface ReleaseAssetInfo {
  name: string;
  sizeBytes?: number;
  sizeMb: string;
  downloadUrl: string;
  directUrl: string;
}

export interface ReleaseInfo {
  version: string;
  name: string;
  publishedAt?: string;
  exe: ReleaseAssetInfo | null;
  msi: ReleaseAssetInfo | null;
}

export function normalizeVersion(value: unknown): string {
  if (typeof value !== "string" || !value.trim()) return FALLBACK_VERSION;
  const trimmed = value.trim();
  return trimmed.startsWith("v") ? trimmed : `v${trimmed}`;
}
