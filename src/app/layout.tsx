import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
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
  themeColor: "#08090C",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://eytaa.app"),
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
  openGraph: {
    title: "EYTAA — Studio-Grade Windows Desktop Media Player",
    description:
      "Every story, in view. High-performance desktop media player powered by libmpv and Tauri 2 with transparent HWND rendering, smart TV series detection, and cinema-grade profiles.",
    url: "https://eytaa.app",
    siteName: "EYTAA Player",
    images: [
      {
        url: "/eytaa-icon.svg",
        width: 512,
        height: 512,
        alt: "EYTAA Player Icon",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EYTAA — Studio-Grade Windows Desktop Media Player",
    description:
      "Every story, in view. Ultra-fast hardware decoding, transparent overlay rendering, and smart TV series management.",
    images: ["/eytaa-icon.svg"],
  },
  icons: {
    icon: "/eytaa-icon.svg",
    shortcut: "/eytaa-icon.svg",
    apple: "/eytaa-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${jetbrainsMono.variable} dark scroll-smooth`}>
      <body className="min-h-screen bg-[#07090E] text-[#F3F4F6] antialiased selection:bg-amber-500/25 selection:text-amber-200">
        {children}
      </body>
    </html>
  );
}
