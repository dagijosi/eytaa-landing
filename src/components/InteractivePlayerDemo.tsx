"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Tv,
  Film,
  Sparkles,
  Sliders,
  Settings,
  Layers,
  LayoutGrid,
  Radio,
  FileVideo,
  ListVideo,
  CheckCircle2,
  Clock,
  FolderOpen,
  Eye,
  Info,
} from "lucide-react";

type DemoMode = "player" | "media-hub" | "pip";
type ProfileKey = "default" | "anime" | "cinema" | "podcast";

interface ProfileConfig {
  name: string;
  badge: string;
  description: string;
  accent: string;
  saturation: string;
  contrast: string;
  subtitleColor: string;
  audioFilter: string;
  speed: string;
}

const PROFILES: Record<ProfileKey, ProfileConfig> = {
  default: {
    name: "Default Balanced",
    badge: "Studio Neutral",
    description: "Raw studio-neutral master with unaltered gamma and direct audio pass-through.",
    accent: "from-zinc-400 to-zinc-200",
    saturation: "100%",
    contrast: "100%",
    subtitleColor: "#FFFFFF",
    audioFilter: "Direct PCM Pass-through",
    speed: "1.0x",
  },
  anime: {
    name: "Anime & Animation",
    badge: "Color Pop + Soft Yellow Subs",
    description: "Boosted saturation (+14), high contrast (+6), and soft yellow (#FFF176) subtitles for lineart.",
    accent: "from-amber-400 to-yellow-300",
    saturation: "125%",
    contrast: "112%",
    subtitleColor: "#FFF176",
    audioFilter: "Crisp Dialogue Vocal Enhancer",
    speed: "1.0x",
  },
  cinema: {
    name: "Cinema & Movies",
    badge: "Night Loudnorm Dynamic EQ",
    description: "Filmic deep shadow blacks with FFmpeg loudnorm compression to tame explosive sound effects.",
    accent: "from-cyan-400 to-blue-400",
    saturation: "105%",
    contrast: "115%",
    subtitleColor: "#E0F2FE",
    audioFilter: "lavfi=[loudnorm=I=-16:TP=-1.5:LRA=7]",
    speed: "1.0x",
  },
  podcast: {
    name: "Podcasts & Lectures",
    badge: "Speech Clarity Filter",
    description: "Highpass 90Hz + lowpass 4500Hz filter eliminating room hum with automatic 1.25x speed.",
    accent: "from-emerald-400 to-teal-300",
    saturation: "95%",
    contrast: "100%",
    subtitleColor: "#D1FAE5",
    audioFilter: "highpass=90, lowpass=4500, +2.0dB",
    speed: "1.25x",
  },
};

export function InteractivePlayerDemo() {
  const [activeMode, setActiveMode] = useState<DemoMode>("player");
  const [activeProfile, setActiveProfile] = useState<ProfileKey>("anime");
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(38);
  const [volume, setVolume] = useState(85);
  const [isMuted, setIsMuted] = useState(false);
  const [fitMode, setFitMode] = useState<"fit" | "fill" | "stretch">("fit");
  const [showSiblingToast, setShowSiblingToast] = useState(true);

  // Simulated playback time increment
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 0.25));
    }, 400);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const currentProfile = PROFILES[activeProfile];
  const totalSeconds = 1420; // ~23:40 episode
  const currentSeconds = Math.floor((progress / 100) * totalSeconds);
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <section id="interactive-demo" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Radio className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive Simulator</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Experience the EYTAA Interface
          </h2>
          <p className="mt-4 text-zinc-300 text-sm sm:text-base">
            Test the real controls, switch between the playback stage, v2.0 TV Series Media Hub,
            and Picture-in-Picture mode. Toggle audio/color profiles live.
          </p>

          {/* Mode Switcher Tabs */}
          <div className="mt-8 flex flex-wrap justify-center sm:inline-flex p-1.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md gap-1">
            <button
              id="demo-tab-player"
              onClick={() => setActiveMode("player")}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeMode === "player"
                  ? "bg-amber-400 text-black shadow-lg shadow-amber-500/25"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Film className="w-4 h-4" />
              <span>Cinema Playback</span>
            </button>
            <button
              id="demo-tab-mediahub"
              onClick={() => setActiveMode("media-hub")}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeMode === "media-hub"
                  ? "bg-amber-400 text-black shadow-lg shadow-amber-500/25"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Tv className="w-4 h-4" />
              <span>Smart TV Series Hub</span>
            </button>
            <button
              id="demo-tab-pip"
              onClick={() => setActiveMode("pip")}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeMode === "pip"
                  ? "bg-amber-400 text-black shadow-lg shadow-amber-500/25"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Hardware PiP</span>
            </button>
          </div>
        </div>

        {/* Profile Quick-Switch Strip (Visible in Playback mode) */}
        {activeMode === "player" && (
          <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-zinc-400 mr-2 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              <span>Active Profile:</span>
            </span>
            {(Object.keys(PROFILES) as ProfileKey[]).map((key) => {
              const p = PROFILES[key];
              const isSelected = activeProfile === key;
              return (
                <button
                  key={key}
                  id={`profile-btn-${key}`}
                  onClick={() => setActiveProfile(key)}
                  className={`text-xs px-3.5 py-1.5 rounded-lg border transition-all ${
                    isSelected
                      ? "bg-white/10 border-amber-400/60 text-amber-300 font-bold shadow-md shadow-amber-500/10"
                      : "bg-white/5 border-white/10 text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {p.name}
                </button>
              );
            })}
          </div>
        )}

        {/* MAIN SIMULATOR CONTAINER */}
        <div className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden glass-panel-elevated border-white/15">
          {/* Frameless Win32 TitleBar (Matches EYTAA TopBar) */}
          <div className="bg-[#0C0F17]/95 border-b border-white/10 px-4 py-2.5 flex items-center justify-between select-none">
            {/* Left: Branding & Clean Title */}
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 relative">
                <Image
                  src="/eytaa-icon.svg"
                  alt="EYTAA"
                  width={24}
                  height={24}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold tracking-wider text-amber-400">EYTAA</span>
                <span className="text-zinc-600">/</span>
                <span className="text-xs font-medium text-zinc-300 truncate max-w-[280px] sm:max-w-md">
                  {activeMode === "media-hub"
                    ? "Media Center • Library & TV Series"
                    : "Frieren: Beyond Journey's End • S01E28 - The Era of Humans.mkv"}
                </span>
              </div>
            </div>

            {/* Center: HWND Direct3D11 Live Indicator */}
            <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>D3D11va Zero-Copy • 60 FPS</span>
            </div>

            {/* Right: Windows Window Controls & Snap Grid */}
            <div className="flex items-center gap-1.5">
              <button
                title="Window Snapping Grid (1/2, 2/3, quadrants)"
                className="p-1.5 rounded hover:bg-white/10 text-zinc-400 hover:text-white text-xs"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <span className="w-px h-3.5 bg-white/10 mx-1" />
              <button className="w-3 h-3 rounded-full bg-zinc-600/60 hover:bg-zinc-500" />
              <button className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-400" />
              <button className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-400" />
            </div>
          </div>

          {/* SIMULATOR BODY: VIEW MODE 1 - PLAYER STAGE */}
          {activeMode === "player" && (
            <div className="relative min-h-[380px] sm:min-h-0 sm:aspect-video w-full bg-[#030406] overflow-hidden flex flex-col justify-between">
              {/* Simulated Video Canvas with dynamic profile filter effects */}
              <div
                className="absolute inset-0 transition-all duration-500"
                style={{
                  filter: `saturate(${currentProfile.saturation}) contrast(${currentProfile.contrast})`,
                }}
              >
                {/* Cinema Canvas Background Graphic */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0F172A] via-[#1E1B4B] to-[#0A0D15]">
                  {/* Stylized Anime / Fantasy Scene Vectors */}
                  <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_70%_30%,rgba(6,182,212,0.3)_0%,transparent_60%)]" />
                  <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_80%,rgba(245,158,11,0.25)_0%,transparent_50%)]" />
                  
                  {/* Subtle decorative geometry mimicking animated movie frame */}
                  <div className="absolute bottom-16 right-16 w-64 h-64 rounded-full border border-cyan-400/20 blur-sm" />
                  <div className="absolute top-12 left-20 w-80 h-80 rounded-full border border-amber-400/10 blur-md" />
                </div>

                {/* Subtitle Display Layer (Rendered by libass engine) */}
                <div className="absolute bottom-20 sm:bottom-24 left-0 right-0 text-center px-4 sm:px-8 pointer-events-none">
                  <div
                    className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded text-sm sm:text-xl lg:text-2xl font-black tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] max-w-xl mx-auto"
                    style={{
                      color: currentProfile.subtitleColor,
                      textShadow:
                        "0 0 6px rgba(0,0,0,0.9), -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000",
                    }}
                  >
                    &ldquo;It is not magic that changes the world, but the footsteps we leave behind.&rdquo;
                  </div>
                  <div className="mt-1 text-[10px] sm:text-[11px] font-mono text-zinc-400">
                    Styled ASS Subtitle • Track 1 (English) • {currentProfile.badge}
                  </div>
                </div>
              </div>

              {/* Top Video Overlay Bar */}
              <div className="relative z-10 p-4 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    Profile: {currentProfile.name}
                  </span>
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[11px] font-mono text-zinc-300 bg-black/40 border border-white/10">
                    Audio EQ: {currentProfile.audioFilter}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono text-zinc-300 bg-black/40 border border-white/10">
                    Speed: {currentProfile.speed}
                  </span>
                </div>

                {/* Sibling Toast Notification (From SYSTEM_OVERVIEW.md section 4.2) */}
                {showSiblingToast && (
                  <div className="hidden md:flex items-center gap-3 px-3 py-1.5 rounded-lg bg-[#0F1420]/90 border border-amber-500/40 backdrop-blur-md shadow-lg animate-bounce">
                    <div className="text-left">
                      <div className="text-[11px] font-bold text-amber-300">
                        Season 1 Detected: 28 sibling episodes
                      </div>
                      <div className="text-[9px] text-zinc-400">Auto-detected in folder</div>
                    </div>
                    <button
                      onClick={() => setShowSiblingToast(false)}
                      className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400 text-black hover:bg-amber-300"
                    >
                      Add All
                    </button>
                    <button
                      onClick={() => setShowSiblingToast(false)}
                      className="text-[10px] text-zinc-400 hover:text-white"
                    >
                      Dismiss
                    </button>
                  </div>
                )}
              </div>

              {/* Bottom Interactive Control Bar (Matches ControlBar.tsx) */}
              <div className="relative z-10 p-4 bg-gradient-to-t from-black/95 via-black/70 to-transparent">
                {/* Scrubber Track */}
                <div className="relative group cursor-pointer mb-3">
                  <div className="w-full h-1.5 bg-white/20 group-hover:h-2.5 rounded-full overflow-hidden transition-all">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full relative"
                      style={{ width: `${progress}%` }}
                    >
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-lg scale-0 group-hover:scale-100 transition-transform" />
                    </div>
                  </div>
                  {/* Hover timestamp preview */}
                  <div className="flex justify-between text-[11px] font-mono text-zinc-400 mt-1.5">
                    <span>{formatTime(currentSeconds)}</span>
                    <span className="text-zinc-500">23:40</span>
                  </div>
                </div>

                {/* Bottom Controls Row */}
                <div className="flex items-center justify-between gap-2">
                  {/* Left: Playback controls */}
                  <div className="flex items-center gap-1.5 sm:gap-3">
                    <button
                      id="demo-play-pause-btn"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-amber-400 text-black flex items-center justify-center hover:bg-amber-300 transition-transform active:scale-95 shadow-md shadow-amber-500/20 flex-shrink-0"
                    >
                      {isPlaying ? <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-black" /> : <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-black ml-0.5" />}
                    </button>

                    <button
                      onClick={() => setProgress((p) => Math.max(0, p - 5))}
                      title="Seek backward 10s"
                      className="p-1.5 sm:p-2 text-zinc-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                    <button
                      onClick={() => setProgress((p) => Math.min(100, p + 5))}
                      title="Seek forward 10s"
                      className="p-1.5 sm:p-2 text-zinc-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <RotateCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>

                    {/* Volume Controls (Compact on mobile) */}
                    <div className="flex items-center gap-1.5 sm:gap-2 ml-1">
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="p-1.5 text-zinc-300 hover:text-white"
                        title={isMuted ? "Unmute" : "Mute"}
                      >
                        {isMuted || volume === 0 ? (
                          <VolumeX className="w-4 h-4 text-rose-400" />
                        ) : (
                          <Volume2 className="w-4 h-4" />
                        )}
                      </button>
                      <div className="hidden sm:flex items-center gap-2">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={isMuted ? 0 : volume}
                          onChange={(e) => {
                            setVolume(Number(e.target.value));
                            setIsMuted(false);
                          }}
                          className="w-16 lg:w-20 accent-amber-400 h-1 bg-white/20 rounded-full cursor-pointer"
                        />
                        <span className="text-[10px] font-mono text-zinc-400 w-7">
                          {isMuted ? "0%" : `${volume}%`}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Technical Badges & View Toggles */}
                  <div className="flex items-center gap-1 sm:gap-2">
                    <button
                      onClick={() =>
                        setFitMode(
                          fitMode === "fit" ? "fill" : fitMode === "fill" ? "stretch" : "fit"
                        )
                      }
                      className="hidden sm:inline-flex px-2 py-1 rounded bg-white/10 hover:bg-white/15 text-[10px] sm:text-[11px] font-semibold text-zinc-300"
                    >
                      {fitMode.toUpperCase()}
                    </button>

                    <button
                      onClick={() => setActiveMode("pip")}
                      title="Switch to Picture-in-Picture"
                      className="p-1.5 sm:p-2 rounded bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white"
                    >
                      <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>

                    <button
                      title="Toggle Fullscreen"
                      className="p-1.5 sm:p-2 rounded bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white"
                    >
                      <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SIMULATOR BODY: VIEW MODE 2 - SMART TV SERIES HUB (v2.0) */}
          {activeMode === "media-hub" && (
            <div className="aspect-video w-full bg-[#080B11] flex overflow-hidden">
              {/* Collapsible Left Rail (Matches v2.0 Rail) */}
              <div className="w-16 sm:w-48 bg-[#0B0E17] border-r border-white/10 p-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="hidden sm:block text-[10px] font-bold uppercase tracking-wider text-zinc-500 px-3 py-1">
                    Library
                  </div>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-amber-500/15 text-amber-300 border border-amber-500/30 font-semibold text-xs text-left">
                    <Tv className="w-4 h-4 flex-shrink-0" />
                    <span className="hidden sm:inline">TV Series</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white font-medium text-xs text-left">
                    <Film className="w-4 h-4 flex-shrink-0" />
                    <span className="hidden sm:inline">Movies</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white font-medium text-xs text-left">
                    <Clock className="w-4 h-4 flex-shrink-0" />
                    <span className="hidden sm:inline">Unfinished (4)</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white font-medium text-xs text-left">
                    <FolderOpen className="w-4 h-4 flex-shrink-0" />
                    <span className="hidden sm:inline">Folder Scan</span>
                  </button>
                </div>

                <div className="pt-3 border-t border-white/10 space-y-1">
                  <div className="hidden sm:flex items-center justify-between text-[10px] text-zinc-400 px-2">
                    <span>Thumb Cache</span>
                    <span className="font-mono text-emerald-400">18.4 MB</span>
                  </div>
                  <div className="hidden sm:flex items-center justify-between text-[10px] text-zinc-400 px-2">
                    <span>Quick Hash</span>
                    <span className="font-mono text-cyan-400">&lt;0.1ms</span>
                  </div>
                </div>
              </div>

              {/* Main Series Grid with Zero-Crop Artwork */}
              <div className="flex-1 p-5 overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <span>Smart TV Series Collections</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                        12 Seasons Indexed
                      </span>
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Zero-crop presentation backed by ambient blurred glow layers.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-400">Layout:</span>
                    <span className="px-2 py-0.5 rounded text-xs bg-white/10 font-mono text-amber-300">
                      16:9 Widescreen
                    </span>
                  </div>
                </div>

                {/* Series Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Card 1: Frieren */}
                  <div className="group relative rounded-xl overflow-hidden glass-panel border-white/10 hover:border-amber-400/50 transition-all duration-300">
                    <div className="relative aspect-video w-full overflow-hidden bg-zinc-900">
                      {/* Ambient blur glow layer */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-600 to-indigo-900 opacity-45 blur-xl scale-125 group-hover:scale-150 transition-transform duration-500" />
                      {/* Foreground Card Artwork */}
                      <div className="relative z-10 w-full h-full flex flex-col justify-between p-3">
                        <div className="flex justify-between items-start">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-black/60 text-amber-300 border border-amber-400/30 backdrop-blur-md">
                            Season 1 • 28 Episodes
                          </span>
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-cyan-950/80 text-cyan-300 border border-cyan-500/40">
                            1080p HEVC
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <button
                            onClick={() => setActiveMode("player")}
                            className="w-9 h-9 rounded-full bg-amber-400 text-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"
                          >
                            <Play className="w-4 h-4 fill-black ml-0.5" />
                          </button>
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/15 text-white backdrop-blur-md">
                            View Episodes • 28
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-[#0D1017]">
                      <div className="font-bold text-xs text-white truncate">
                        Frieren: Beyond Journey&apos;s End
                      </div>
                      <div className="text-[11px] text-zinc-400 flex items-center justify-between mt-1">
                        <span>Ep 28 - The Era of Humans</span>
                        <span className="text-amber-400 font-mono">Resume: 38%</span>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Breaking Bad */}
                  <div className="group relative rounded-xl overflow-hidden glass-panel border-white/10 hover:border-amber-400/50 transition-all duration-300">
                    <div className="relative aspect-video w-full overflow-hidden bg-zinc-900">
                      <div className="absolute inset-0 bg-gradient-to-tr from-amber-600 to-emerald-900 opacity-45 blur-xl scale-125 group-hover:scale-150 transition-transform duration-500" />
                      <div className="relative z-10 w-full h-full flex flex-col justify-between p-3">
                        <div className="flex justify-between items-start">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-black/60 text-amber-300 border border-amber-400/30 backdrop-blur-md">
                            Season 5 • 16 Episodes
                          </span>
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
                            4K Remux
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <button
                            onClick={() => setActiveMode("player")}
                            className="w-9 h-9 rounded-full bg-amber-400 text-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"
                          >
                            <Play className="w-4 h-4 fill-black ml-0.5" />
                          </button>
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/15 text-white backdrop-blur-md">
                            View Episodes • 16
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-[#0D1017]">
                      <div className="font-bold text-xs text-white truncate">Breaking Bad</div>
                      <div className="text-[11px] text-zinc-400 flex items-center justify-between mt-1">
                        <span>S05E14 - Ozymandias</span>
                        <span className="text-emerald-400 font-mono">Watched</span>
                      </div>
                    </div>
                  </div>

                  {/* Card 3: Cyberpunk Edgerunners */}
                  <div className="group relative rounded-xl overflow-hidden glass-panel border-white/10 hover:border-amber-400/50 transition-all duration-300">
                    <div className="relative aspect-video w-full overflow-hidden bg-zinc-900">
                      <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500 to-rose-700 opacity-45 blur-xl scale-125 group-hover:scale-150 transition-transform duration-500" />
                      <div className="relative z-10 w-full h-full flex flex-col justify-between p-3">
                        <div className="flex justify-between items-start">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-black/60 text-amber-300 border border-amber-400/30 backdrop-blur-md">
                            Miniseries • 10 Episodes
                          </span>
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-yellow-950/80 text-yellow-300 border border-yellow-500/40">
                            HDR 10-bit
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <button
                            onClick={() => setActiveMode("player")}
                            className="w-9 h-9 rounded-full bg-amber-400 text-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"
                          >
                            <Play className="w-4 h-4 fill-black ml-0.5" />
                          </button>
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/15 text-white backdrop-blur-md">
                            View Episodes • 10
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-[#0D1017]">
                      <div className="font-bold text-xs text-white truncate">
                        Cyberpunk: Edgerunners
                      </div>
                      <div className="text-[11px] text-zinc-400 flex items-center justify-between mt-1">
                        <span>Ep 10 - My Moon, My Love</span>
                        <span className="text-zinc-500 font-mono">Ready to play</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SIMULATOR BODY: VIEW MODE 3 - HARDWARE PiP MODE */}
          {activeMode === "pip" && (
            <div className="aspect-video w-full bg-[#080B12] flex items-center justify-center p-8 relative">
              {/* Virtual Desktop Background */}
              <div className="absolute inset-0 bg-[radial-gradient(#1E293B_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />

              <div className="text-center mb-6 absolute top-6">
                <span className="text-xs font-mono text-zinc-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                  Native Win32 Monitor DPI-Aware Controller (pip.rs)
                </span>
              </div>

              {/* Simulated Floating PiP Card (Matches PiPOverlay.tsx) */}
              <div className="relative w-[340px] sm:w-[420px] aspect-video rounded-xl overflow-hidden glass-panel-elevated border-amber-500/40 shadow-2xl shadow-black/80 animate-float">
                {/* PiP Video Graphic */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-900 to-black">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-10 h-10 mx-auto mb-2 relative">
                        <Image
                          src="/eytaa-icon.svg"
                          alt="EYTAA"
                          width={40}
                          height={40}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="text-xs font-bold text-white">420 × 236 Hardware Mini-Player</div>
                      <div className="text-[10px] text-amber-300 font-mono">Always-On-Top Layer</div>
                    </div>
                  </div>
                </div>

                {/* PiP Overlay Controls */}
                <div className="relative z-10 w-full h-full p-3 flex flex-col justify-between bg-black/40 backdrop-blur-[2px]">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-white bg-black/60 px-2 py-0.5 rounded">
                      Frieren • S01E28
                    </span>
                    <button
                      onClick={() => setActiveMode("player")}
                      className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400 text-black hover:bg-amber-300"
                    >
                      Restore Window
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center"
                      >
                        {isPlaying ? <Pause className="w-3.5 h-3.5 fill-black" /> : <Play className="w-3.5 h-3.5 fill-black ml-0.5" />}
                      </button>
                      <span className="text-[10px] font-mono text-zinc-300">
                        {formatTime(currentSeconds)} / 23:40
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-500/30">
                      Snap: Bottom-Right
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Simulator Footer Status */}
          <div className="bg-[#0A0D15] border-t border-white/10 px-4 py-2.5 flex flex-wrap items-center justify-between text-xs text-zinc-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-zinc-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>libmpv engine status: <strong>READY (Embedded)</strong></span>
              </span>
              <span className="hidden sm:inline text-zinc-600">|</span>
              <span className="hidden sm:inline">
                Profile: <strong className="text-amber-400">{currentProfile.name}</strong>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] text-zinc-400">
                Subtitles: <strong style={{ color: currentProfile.subtitleColor }}>libass</strong>
              </span>
              <span className="font-mono text-[11px] text-cyan-400">
                Audio: {currentProfile.audioFilter}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
