import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: "EYTAA — Studio-Grade Windows Desktop Media Player",
  description:
    "Every story, in view. EYTAA combines the zero-copy decoding horsepower of libmpv with the modern fluidity of Tauri 2, React 19, and Tailwind CSS. Built for Windows 10 & 11.",
  keywords: [
    "EYTAA",
    "Vistara Player",
    "Windows Media Player",
    "libmpv",
    "Tauri 2",
    "React 19",
    "4K HDR Player",
    "Anime Video Player",
    "PiP Player",
    "Hardware Acceleration",
    "Direct3D11",
  ],
  authors: [{ name: "EYTAA Development Team" }],
  creator: "Dagmawi Y",
  publisher: "EYTAA",
  category: "multimedia",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "EYTAA — Studio-Grade Windows Desktop Media Player",
    description:
      "Every story, in view. High-performance desktop media player powered by libmpv and Tauri 2 with transparent HWND rendering, smart TV series detection, and cinema-grade profiles.",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [OG_IMAGE],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EYTAA — Studio-Grade Windows Desktop Media Player",
    description:
      "Every story, in view. Ultra-fast hardware decoding, transparent overlay rendering, and smart TV series management.",
    images: [
      {
        url: OG_IMAGE.url,
        width: OG_IMAGE.width,
        height: OG_IMAGE.height,
        alt: OG_IMAGE.alt,
      },
    ],
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/eytaa-icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${jetbrainsMono.variable} dark scroll-smooth`}
    >
      <body className="min-h-screen bg-[#0a0a0a] text-[#F3F4F6] antialiased selection:bg-amber-500/25 selection:text-amber-200">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
