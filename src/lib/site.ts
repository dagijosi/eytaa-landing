const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");

export const SITE_URL = configuredSiteUrl || "https://eytaa-landing.vercel.app";

export const SITE_NAME = "EYTAA Player";

export const OG_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "EYTAA — Every story, in view. A free, private Windows media player.",
};
