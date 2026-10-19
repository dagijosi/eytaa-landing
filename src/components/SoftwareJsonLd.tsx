import { OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/site";

export function SoftwareJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "EYTAA",
    alternateName: "Vistara Player",
    applicationCategory: "MultimediaApplication",
    applicationSubCategory: "Video Player",
    operatingSystem: "Windows 10, Windows 11",
    softwareRequirements: "Windows 10 or Windows 11, 64-bit",
    description:
      "EYTAA is a free, private Windows media player with libmpv hardware decoding, smart TV series detection, saved playlists, picture-in-picture, and Windows Now Playing integration.",
    url: SITE_URL,
    downloadUrl: `${SITE_URL}/api/download?type=exe`,
    image: `${SITE_URL}${OG_IMAGE.url}`,
    screenshot: `${SITE_URL}${OG_IMAGE.url}`,
    isAccessibleForFree: true,
    inLanguage: "en",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    featureList: [
      "Smart media library with automatic TV series detection",
      "libmpv hardware decoding with Direct3D11",
      "Picture-in-picture and always-on-top playback",
      "Saved playlists, playback queue, and chapter navigation",
      "Two-zone drag-and-drop",
      "Windows Now Playing and SMTC integration",
      "9 color profiles and 12 skins",
      "Global media keys and rebindable shortcuts",
      "Night listening mode with dynamic range compression",
    ],
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/eytaa-icon.svg`,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    sameAs: ["https://github.com/dagijosi/Eytaa"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
