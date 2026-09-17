"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useContent } from "@/context/ContentContext";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Radio,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  MapPin,
  Users,
  Activity
} from "lucide-react";

interface CampaignVideoDashboardProps {
  videoSrc?: string;
  audioSrc?: string;
  youtubeUrl?: string;
}

export default function CampaignVideoDashboard({
  videoSrc = "/videos/campaign-video.mp4",
  audioSrc = "/videos/campaign-audio.m4a",
  youtubeUrl = "https://youtube.com/shorts/5bCg8EKiHSM"
}: CampaignVideoDashboardProps) {
  const { language } = useLanguage();
  const { homepage } = useContent();
  const telemetry = homepage?.telemetry || {};

  const currentVideoSrc = telemetry.videoSrc || videoSrc;
  const currentAudioSrc = telemetry.audioSrc || audioSrc;
  const currentYoutubeUrl = telemetry.youtubeUrl || youtubeUrl;
  const currentWatermark = telemetry.videoWatermark || "WORKFORCE INFOTECH (IPR)";
  const currentTitle = telemetry.dashboardTitle || "CAMPAIGN INTELLIGENCE DASHBOARD";
  const currentSubtitle = telemetry.dashboardSubtitle || "UP-AC2027 // WAR ROOM ENGINE";
  const currentLiveBadge = telemetry.liveFeedBadge || "LIVE FEED";
  const tickerEvents = (telemetry.tickerEvents && telemetry.tickerEvents.length > 0)
    ? telemetry.tickerEvents
    : [
        "बूथ #312: वोटर पर्ची वितरण 92% पूर्ण",
        "एलईडी वैन #04: सेक्टर-B चौपाल वीडियो स्क्रीनिंग लाइव"
      ];
  const footerNote1 = telemetry.footerNote1 || "निजी एवं कस्टमाइज्ड क्लाउड आर्किटेक्चर";
  const footerNote2 = telemetry.footerNote2 || "सचित्र लाइव फीड (Live Illustrative)";

  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hideControlsTimer = useRef<NodeJS.Timeout | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timeStr, setTimeStr] = useState("18:30:00");

  // Live IST Clock updater
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString("en-IN", { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Permanent autoplay on mount
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = isMuted;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // If browser policy blocks, ensure muted and retry
          video.muted = true;
          setIsMuted(true);
          video.play().catch(() => {
            setIsPlaying(false);
          });
        });
    }
  }, [isMuted, currentVideoSrc]);

  // Sync audio with video
  const syncAudio = useCallback((playing: boolean, muted: boolean) => {
    const audio = audioRef.current;
    const video = videoRef.current;
    if (!audio || !video) return;

    audio.muted = muted;
    if (playing && !muted) {
      audio.currentTime = video.currentTime % (audio.duration || 1);
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, []);

  // Video time update for progress bar and loop sync
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) {
      const current = video.currentTime;
      const duration = video.duration || 1;
      setProgress((current / duration) * 100);

      const audio = audioRef.current;
      if (audio && !isMuted && Math.abs(audio.currentTime - video.currentTime) > 0.3) {
        audio.currentTime = video.currentTime;
      }
    }
  };

  // Schedule auto-hide for controls
  const scheduleHideControls = useCallback(() => {
    if (hideControlsTimer.current) clearTimeout(hideControlsTimer.current);
    hideControlsTimer.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  }, []);

  // Mouse hover & drag cursor triggers controls to appear
  const handleMouseEnter = () => {
    setShowControls(true);
    scheduleHideControls();
  };

  const handleMouseMove = () => {
    setShowControls(true);
    scheduleHideControls();
  };

  const handleMouseLeave = () => {
    if (hideControlsTimer.current) clearTimeout(hideControlsTimer.current);
    setShowControls(false);
  };

  // Mobile tap handler
  const handleTouchOrClick = (e: React.MouseEvent | React.TouchEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest("a")) return;

    setShowControls((prev) => {
      if (!prev) {
        scheduleHideControls();
        return true;
      } else {
        return false;
      }
    });
  };

  // Play / Pause toggle
  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => {
        setIsPlaying(true);
        syncAudio(true, isMuted);
      }).catch(() => setIsPlaying(false));
    } else {
      video.pause();
      setIsPlaying(false);
      syncAudio(false, isMuted);
    }
    scheduleHideControls();
  };

  // Mute / Unmute toggle
  const toggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !isMuted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
    syncAudio(isPlaying, nextMuted);
    scheduleHideControls();
  };

  // Fullscreen toggle
  const toggleFullscreen = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative rounded-2xl sm:rounded-3xl border border-navy-700/80 bg-gradient-to-b from-navy-900/95 via-navy-950/95 to-navy-950 p-4 sm:p-5 shadow-2xl backdrop-blur-xl text-slate-200 overflow-hidden dashboard-container"
    >
      {/* Ambient Highlights */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent-orange/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-royal-blue/25 rounded-full blur-3xl pointer-events-none" />

      {/* Hidden Audio Element for synchronized sound when unmuted */}
      <audio
        ref={audioRef}
        src={currentAudioSrc}
        loop
        muted={isMuted}
        preload="auto"
      />

      {/* Dashboard Top Header Bar */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-navy-800/80">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
          </span>
          <div>
            <span className="text-xs font-bold tracking-wider uppercase text-white block">
              {currentTitle}
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              {currentSubtitle}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Live Feed Status Pill */}
          <span className="inline-flex items-center gap-1.5 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
            <Radio className="w-2.5 h-2.5 animate-pulse" />
            <span>{currentLiveBadge}</span>
          </span>
          <span className="text-xs font-mono font-semibold text-slate-400">
            {timeStr} IST
          </span>
        </div>
      </div>

      {/* Entire Black Screen Video Monitor: Video fills 100% of this entire area */}
      <div 
        className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden bg-black border border-navy-800 shadow-2xl group select-none cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleTouchOrClick}
        onTouchStart={handleTouchOrClick}
      >
        {/* Native Full-Bleed Video: Fills 100% of the entire black screen */}
        <video
          ref={videoRef}
          src={currentVideoSrc}
          poster="/images/campaign-video-poster.jpg"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          onTimeUpdate={handleTimeUpdate}
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-auto"
        />

        {/* Subtle cinematic gradient vignette along edges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none" />

        {/* Top Badges inside Video (Always visible) */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-10">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/20 text-[10px] font-bold text-white shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
              <span>{currentWatermark}</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-accent-orange/30 border border-accent-orange/50 text-[10px] font-mono text-accent-gold backdrop-blur-md">
              PERMANENT AUTO-LOOP
            </span>
          </div>
        </div>

        {/* Floating Controls Overlay (Fades in when dragging cursor or tapping on mobile) */}
        <div 
          className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col justify-between p-3 sm:p-4 transition-opacity duration-300 z-20 pointer-events-auto ${
            showControls ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div />

          {/* Center Play/Pause Large Action Button */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause Video" : "Play Video"}
              className="w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-accent-orange hover:bg-accent-orange-hover text-white flex items-center justify-center shadow-2xl shadow-accent-orange/50 transform hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer border-2 border-white/30"
              title={isPlaying ? "Pause Video" : "Play Video"}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 sm:w-7 sm:h-7 fill-white" />
              ) : (
                <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-white translate-x-0.5" />
              )}
            </button>
          </div>

          {/* Bottom Controls Bar inside Video */}
          <div className="flex items-center justify-between gap-2 pt-2">
            
            {/* Play/Pause & Mute Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={togglePlay}
                className="px-3 py-1.5 rounded-lg bg-black/85 hover:bg-navy-900 text-white text-xs font-semibold border border-white/20 backdrop-blur-md flex items-center gap-1.5 transition-all cursor-pointer shadow"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-accent-orange" />
                    <span>{language === "hi" ? "रोकें (Pause)" : "Pause"}</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{language === "hi" ? "चलाएं (Play)" : "Play"}</span>
                  </>
                )}
              </button>

              <button
                onClick={toggleMute}
                className="px-3 py-1.5 rounded-lg bg-black/85 hover:bg-navy-900 text-white text-xs font-semibold border border-white/20 backdrop-blur-md flex items-center gap-1.5 transition-all cursor-pointer shadow"
                title={isMuted ? "Unmute Audio" : "Mute Audio"}
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                    <span>{language === "hi" ? "अनम्यूट (Unmute)" : "Unmute"}</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{language === "hi" ? "म्यूट (Mute)" : "Mute"}</span>
                  </>
                )}
              </button>
            </div>

            {/* Right side controls: Fullscreen & YouTube Direct Link */}
            <div className="flex items-center gap-1.5">
              <a
                href={currentYoutubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-black/85 hover:bg-navy-900 text-slate-300 hover:text-white border border-white/20 backdrop-blur-md transition-colors cursor-pointer"
                title="Watch on YouTube"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-lg bg-black/85 hover:bg-navy-900 text-slate-300 hover:text-white border border-white/20 backdrop-blur-md transition-colors cursor-pointer"
                title="Toggle Fullscreen"
              >
                {isFullscreen ? (
                  <Minimize2 className="w-4 h-4" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </button>
            </div>

          </div>

          {/* Progress Bar along bottom of video */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-accent-orange to-accent-gold transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Small Touch/Hover Hint indicator when controls are hidden */}
        {!showControls && (
          <div className="absolute bottom-2.5 right-2.5 z-10 pointer-events-none">
            <span className="text-[10px] text-slate-300 bg-black/80 px-2.5 py-1 rounded backdrop-blur-md border border-white/20 font-hindi shadow">
              {language === "hi" ? "कर्सर लाएं या टैप करें • Pause / Mute" : "Hover / Tap for Pause & Mute"}
            </span>
          </div>
        )}
      </div>

      {/* Mini Campaign Intelligence Telemetry Strip */}
      <div className="mt-3 pt-3 border-t border-navy-800/80">
        
        {/* 4 Quick Stat Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
          <div className="p-2 rounded-lg bg-navy-900/80 border border-navy-800/80 text-left">
            <div className="flex items-center justify-between text-slate-400 text-[10px] mb-0.5">
              <span>{language === "hi" ? "कवरेज" : "Coverage"}</span>
              <TrendingUp className="w-3 h-3 text-accent-orange" />
            </div>
            <div className="text-base font-black text-white leading-tight">
              {telemetry.coveragePercent || "87%"}
            </div>
            <div className="text-[9px] text-emerald-400 font-mono">+4.2% आज</div>
          </div>

          <div className="p-2 rounded-lg bg-navy-900/80 border border-navy-800/80 text-left">
            <div className="flex items-center justify-between text-slate-400 text-[10px] mb-0.5">
              <span>{language === "hi" ? "बूथ" : "Booths"}</span>
              <MapPin className="w-3 h-3 text-accent-gold" />
            </div>
            <div className="text-base font-black text-white leading-tight">
              {telemetry.totalBooths || "642"}
            </div>
            <div className="text-[9px] text-slate-400 font-mono">100% एक्टिव</div>
          </div>

          <div className="p-2 rounded-lg bg-navy-900/80 border border-navy-800/80 text-left">
            <div className="flex items-center justify-between text-slate-400 text-[10px] mb-0.5">
              <span>{language === "hi" ? "फील्ड टीमें" : "Teams"}</span>
              <Users className="w-3 h-3 text-sky-400" />
            </div>
            <div className="text-base font-black text-white leading-tight">
              {telemetry.activeFieldTeams || "128"}
            </div>
            <div className="text-[9px] text-sky-400 font-mono">GPS ट्रैक्ड</div>
          </div>

          <div className="p-2 rounded-lg bg-navy-900/80 border border-navy-800/80 text-left">
            <div className="flex items-center justify-between text-slate-400 text-[10px] mb-0.5">
              <span>{language === "hi" ? "गतिविधियां" : "Actions"}</span>
              <Activity className="w-3 h-3 text-rose-400" />
            </div>
            <div className="text-base font-black text-white leading-tight">
              {telemetry.loggedActivities || "1,840+"}
            </div>
            <div className="text-[9px] text-emerald-400 font-mono">लॉग्ड</div>
          </div>
        </div>

        {/* Live Ticker Feed */}
        <div className="p-2 sm:p-2.5 rounded-xl bg-navy-950/90 border border-navy-800/90">
          <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium mb-1.5">
            <div className="flex items-center gap-1.5">
              <Radio className="w-3 h-3 text-accent-orange animate-pulse" />
              <span>{language === "hi" ? "लाइव फील्ड इवेंट्स स्ट्रीम" : "Live Telemetry Feed"}</span>
            </div>
            <span className="text-[9px] text-slate-500 font-mono">24/7 AUTO-SYNC</span>
          </div>

          <div className="space-y-1 font-mono text-[10px] sm:text-[11px]">
            {tickerEvents.slice(0, 2).map((evt, idx) => (
              <div key={idx} className="flex items-center justify-between p-1 rounded bg-navy-900/60 text-slate-300">
                <span className="flex items-center gap-1.5 truncate">
                  <span className={`w-1.5 h-1.5 rounded-full ${idx === 0 ? "bg-emerald-400" : "bg-accent-orange"}`}></span>
                  <span className="truncate">{evt}</span>
                </span>
                <span className="text-[9px] text-slate-500 flex-shrink-0 ml-2">{idx === 0 ? "2m ago" : "6m ago"}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Security / Architecture Tag */}
      <div className="mt-2.5 pt-2 border-t border-navy-800/60 flex items-center justify-between text-[10px] text-slate-500">
        <div className="flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-slate-400" />
          <span>{footerNote1}</span>
        </div>
        <span className="italic">{footerNote2}</span>
      </div>

    </div>
  );
}
