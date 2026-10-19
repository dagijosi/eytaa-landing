import React from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { InteractivePlayerDemo } from "@/components/InteractivePlayerDemo";
import { SmartMediaCenter } from "@/components/SmartMediaCenter";
import { ArchitectureComparison } from "@/components/ArchitectureComparison";
import { FeaturesGrid } from "@/components/FeaturesGrid";
import { ShortcutsCheatSheet } from "@/components/ShortcutsCheatSheet";
import { ChangelogTimeline } from "@/components/ChangelogTimeline";
import { DownloadCTA } from "@/components/DownloadCTA";
import { Footer } from "@/components/Footer";
import { SoftwareJsonLd } from "@/components/SoftwareJsonLd";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0a] text-[#F3F4F6]">
      <SoftwareJsonLd />

      {/* Fixed Navigation Bar */}
      <Navbar />

      <main id="main-content" className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Live Interactive Player Simulator */}
        <InteractivePlayerDemo />

        {/* Smart Media Center */}
        <SmartMediaCenter />

        {/* Architecture & Performance Breakdown */}
        <ArchitectureComparison />

        {/* Deep Dive Features Grid */}
        <FeaturesGrid />

        {/* Keyboard Shortcuts Cheat Sheet */}
        <ShortcutsCheatSheet />

        {/* Changelog & Evolution */}
        <ChangelogTimeline />

        {/* Download & Source Build Call-To-Action */}
        <DownloadCTA />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
