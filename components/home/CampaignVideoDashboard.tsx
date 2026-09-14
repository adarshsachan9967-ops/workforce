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
  Activity,
  Sparkles
} from "lucide-react";

interface CampaignVideoDashboardProps {
  videoUrl?: string;
  youtubeId?: string;
}

export default function CampaignVideoDashboard({
  videoUrl = "https://youtube.com/shorts/5bCg8EKiHSM",
  youtubeId = "5bCg8EKiHSM"
}: CampaignVideoDashboardProps) {
  const { language } = useLanguage();
  const { homepage } = useContent();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const hideControlsTimer = useRef<NodeJS.Timeout | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [timeStr, setTimeStr] = useState("18:30:00");
  const [origin, setOrigin] = useState("");

  // Extract YouTube ID if URL passed
  const extractYouTubeId = (urlOrId: string): string => {
    if (!urlOrId) return "5bCg8EKiHSM";
    const match = urlOrId.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/)|youtu\.be\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : (urlOrId.length === 11 ? urlOrId : "5bCg8EKiHSM");
  };

  const finalVideoId = extractYouTubeId(youtubeId || videoUrl);

  // Set window origin safely for YouTube postMessage API
  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  // Live IST Clock updater
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString("en-IN", { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Send command to YouTube iframe via postMessage
  const postIframeCommand = useCallback((command: string, args: string | number = "") => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({
          event: "command",
          func: command,
          args: args ? [args] : []
        }),
        "*"
      );
    }
  }, []);

  // Listen to messages from YouTube iframe to stay in sync
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        if (typeof event.data === "string") {
          const data = JSON.parse(event.data);
          if (data.event === "infoDelivery" && data.info) {
            if (data.info.playerState === 1) setIsPlaying(true);
            if (data.info.playerState === 2) setIsPlaying(false);
            if (typeof data.info.muted === "boolean") setIsMuted(data.info.muted);
            if (data.info.playerState === 0) {
              // Video ended -> replay immediately for permanent loop
              postIframeCommand("playVideo");
            }
          }
        }
      } catch {
        // Ignore unparseable non-YT messages
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [postIframeCommand]);

  // Periodic heartbeat to keep playing permanently on loop
  useEffect(() => {
    const loopInterval = setInterval(() => {
      // Re-trigger play and listen command
      postIframeCommand("listening");
      if (isPlaying) {
        postIframeCommand("playVideo");
      }
    }, 4000);
    return () => clearInterval(loopInterval);
  }, [isPlaying, postIframeCommand]);

  // Schedule auto-hide for controls
  const scheduleHideControls = useCallback(() => {
    if (hideControlsTimer.current) clearTimeout(hideControlsTimer.current);
    hideControlsTimer.current = setTimeout(() => {
      setShowControls(false);
    }, 3200);
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
    if (isPlaying) {
      postIframeCommand("pauseVideo");
      setIsPlaying(false);
    } else {
      postIframeCommand("playVideo");
      setIsPlaying(true);
    }
    scheduleHideControls();
  };

  // Mute / Unmute toggle
  const toggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (isMuted) {
      postIframeCommand("unMute");
      setIsMuted(false);
    } else {
      postIframeCommand("mute");
      setIsMuted(true);
    }
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

  const telemetry = homepage?.telemetry || {
    coveragePercent: "87%",
    totalBooths: "642",
    activeFieldTeams: "128",
    loggedActivities: "1,840+",
    tickerEvents: [
      "बूथ #312: बस्ता एवं वोटर स्लिप वितरण 92% पूर्ण",
      "एलईडी वैन #04: सेक्टर-B चौपाल वीडियो स्क्रीनिंग लाइव",
      "कॉल सेंटर डेस्क: 2,410 कॉल्स डिस्पैच (सकारात्मक 78%)"
    ]
  };

  const tickerEvents = telemetry.tickerEvents && telemetry.tickerEvents.length > 0
    ? telemetry.tickerEvents
    : [
        "बूथ #312: बस्ता एवं वोटर स्लिप वितरण 92% पूर्ण",
        "एलईडी वैन #04: सेक्टर-B चौपाल वीडियो स्क्रीनिंग लाइव",
        "कॉल सेंटर डेस्क: 2,410 कॉल्स डिस्पैच (सकारात्मक 78%)"
      ];

  const iframeSrc = `https://www.youtube-nocookie.com/embed/${finalVideoId}?autoplay=1&mute=1&loop=1&playlist=${finalVideoId}&controls=0&modestbranding=1&rel=0&playsinline=1&enablejsapi=1&iv_load_policy=3&disablekb=1&fs=0${origin ? `&origin=${encodeURIComponent(origin)}` : ""}`;

  return (
    <div 
      ref={containerRef}
      className="relative rounded-2xl sm:rounded-3xl border border-navy-700/80 bg-gradient-to-b from-navy-900/95 via-navy-950/95 to-navy-950 p-4 sm:p-5 shadow-2xl backdrop-blur-xl text-slate-200 overflow-hidden dashboard-container"
    >
      {/* Ambient Glowing Highlights */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent-orange/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-royal-blue/25 rounded-full blur-3xl pointer-events-none" />

      {/* Dashboard Header Bar */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-navy-800/80">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
          </span>
          <div>
            <span className="text-xs font-bold tracking-wider uppercase text-white block">
              CAMPAIGN INTELLIGENCE DASHBOARD
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              UP-AC2027 // WAR ROOM ENGINE
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Live Feed Status Pill */}
          <span className="inline-flex items-center gap-1.5 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
            <Radio className="w-2.5 h-2.5 animate-pulse" />
            <span>LIVE STREAM</span>
          </span>
          <span className="text-xs font-mono font-semibold text-slate-400">
            {timeStr} IST
          </span>
        </div>
      </div>

      {/* Main Video Monitor Container */}
      <div 
        className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-xl sm:rounded-2xl overflow-hidden bg-navy-950 border border-navy-800 shadow-inner group select-none cursor-pointer flex items-center justify-center"
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleTouchOrClick}
        onTouchStart={handleTouchOrClick}
      >
        {/* Ambient Blurred Background from Video Poster */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 filter blur-2xl scale-110 pointer-events-none"
          style={{ backgroundImage: `url(/images/campaign-video-poster.jpg)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-navy-950/60 pointer-events-none" />

        {/* Embedded YouTube Frame (Permanent Autoplay & Loop) */}
        <div className="relative w-full h-full max-w-[340px] sm:max-w-[420px] flex items-center justify-center overflow-hidden">
          <iframe
            ref={iframeRef}
            id="campaign-youtube-iframe"
            src={iframeSrc}
            title="Workforce Infotech Campaign Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full object-cover scale-[1.03] pointer-events-auto"
          />
        </div>

        {/* Top Badges inside Video (Always visible) */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-10">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-navy-950/85 backdrop-blur-md border border-navy-700/80 text-[10px] font-bold text-white shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
              <span>WORKFORCE INFOTECH (IPR)</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-accent-orange/20 border border-accent-orange/40 text-[10px] font-mono text-accent-gold backdrop-blur-md">
              PERMANENT AUTO-LOOP
            </span>
          </div>
        </div>

        {/* Floating Controls Overlay (Appears on Hover / Cursor Drag or Mobile Tap) */}
        <div 
          className={`absolute inset-0 bg-navy-950/45 backdrop-blur-[2px] flex flex-col justify-between p-3 sm:p-4 transition-opacity duration-300 z-20 pointer-events-auto ${
            showControls ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div />

          {/* Center Play/Pause Large Action Button */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause Video" : "Play Video"}
              className="w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-accent-orange hover:bg-accent-orange-hover text-white flex items-center justify-center shadow-2xl shadow-accent-orange/40 transform hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer border-2 border-white/25"
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
                className="px-3 py-1.5 rounded-lg bg-navy-900/95 hover:bg-navy-800 text-white text-xs font-semibold border border-navy-700/80 backdrop-blur-md flex items-center gap-1.5 transition-all cursor-pointer shadow"
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
                className="px-3 py-1.5 rounded-lg bg-navy-900/95 hover:bg-navy-800 text-white text-xs font-semibold border border-navy-700/80 backdrop-blur-md flex items-center gap-1.5 transition-all cursor-pointer shadow"
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
                href={`https://youtube.com/shorts/${finalVideoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-navy-900/95 hover:bg-navy-800 text-slate-300 hover:text-white border border-navy-700/80 backdrop-blur-md transition-colors cursor-pointer"
                title="Watch on YouTube"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-lg bg-navy-900/95 hover:bg-navy-800 text-slate-300 hover:text-white border border-navy-700/80 backdrop-blur-md transition-colors cursor-pointer"
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
        </div>

        {/* Small Touch/Hover Hint indicator when controls are hidden */}
        {!showControls && (
          <div className="absolute bottom-2.5 right-2.5 z-10 pointer-events-none">
            <span className="text-[10px] text-slate-300 bg-navy-950/80 px-2.5 py-1 rounded backdrop-blur-md border border-navy-700/80 font-hindi shadow">
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
          <span>निजी एवं कस्टमाइज्ड क्लाउड आर्किटेक्चर</span>
        </div>
        <span className="italic">सचित्र लाइव फीड (Live Illustrative)</span>
      </div>

    </div>
  );
}
