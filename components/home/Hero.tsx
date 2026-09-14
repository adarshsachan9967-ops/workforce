"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useContent } from "@/context/ContentContext";
import WarRoomDashboard from "./WarRoomDashboard";
import CampaignVideoDashboard from "./CampaignVideoDashboard";
import EnquiryModal from "@/components/shared/EnquiryModal";
import {
  ArrowRight,
  Shield,
  Layers,
  Sparkles,
  BarChart2,
  Users,
  Radio,
  CheckCircle2,
  Phone
} from "lucide-react";

export default function Hero() {
  const { t, language } = useLanguage();
  const { homepage } = useContent();
  const [modalOpen, setModalOpen] = useState(false);

  const heroData = homepage?.hero || {};
  const eyebrow = heroData.eyebrow || t.hero.eyebrow;
  const title1 = heroData.title1 || t.hero.title1;
  const title2 = heroData.title2 || t.hero.title2;
  const subtitle = heroData.subtitle || t.hero.subtitle;
  const tagline = heroData.tagline || t.tagline;
  const primaryCta = heroData.primaryCta || t.primaryCta;
  const secondaryCta = heroData.secondaryCta || t.secondaryCta;
  const teamBadge = heroData.teamBadge || "1000+ प्रोफेशनल टीम";

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center pt-4 pb-10 lg:pt-8 lg:pb-14 overflow-hidden bg-navy-900 bg-grid-pattern">
      {/* Cinematic Ambient Glow and Map Silhouette */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-900/90 to-navy-950 pointer-events-none hero-dark-overlay" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-royal-blue/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-accent-orange/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Decorative UP Map Watermark in Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
        <svg viewBox="0 0 800 600" className="w-full h-full max-w-4xl">
          <path
            d="M 150,220 C 180,180 220,160 270,180 C 320,200 370,170 420,190 C 470,210 520,180 570,220 C 620,260 650,300 640,360 C 630,420 580,450 530,470 C 480,490 420,470 370,490 C 320,510 270,480 220,460 C 170,440 140,380 150,320 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Core Campaign Narrative */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-accent-orange/15 to-accent-gold/15 border border-accent-orange/30 text-accent-orange text-xs sm:text-sm font-bold tracking-wide shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-orange opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-orange"></span>
              </span>
              <span>{eyebrow}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] font-hindi">
              <span>{title1}</span>
              <br />
              <span className="bg-gradient-to-r from-accent-orange via-[#ea580c] to-accent-gold bg-clip-text text-transparent">
                {title2}
              </span>
            </h1>

            {/* Powerful Subtitle */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl">
              {subtitle}
            </p>

            {/* Tagline Box */}
            <div className="p-4 rounded-xl bg-navy-950/70 border-l-4 border-accent-orange border-y border-r border-navy-800/80 backdrop-blur-sm shadow-md hero-tagline-box">
              <p className="text-sm sm:text-base font-bold text-accent-orange font-hindi">
                “{tagline}”
              </p>
            </div>

            {/* Primary & Secondary Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={() => setModalOpen(true)}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-accent-orange to-accent-orange-hover hover:brightness-110 text-white font-bold text-sm sm:text-base shadow-xl shadow-accent-orange/25 transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer group"
              >
                <span>{primaryCta}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <Link
                href="/services"
                className="px-6 py-4 rounded-xl bg-white hover:bg-slate-50 text-navy-950 font-bold text-sm sm:text-base border border-slate-300 hover:border-accent-orange shadow-md transition-all flex items-center justify-center gap-2 dark:bg-navy-800/80 dark:text-slate-200 dark:border-navy-700 dark:hover:bg-navy-750 dark:hover:text-white hero-secondary-btn"
              >
                <span>{secondaryCta}</span>
              </Link>
            </div>

            {/* Mini indicators & 1000+ Team support */}
            <div className="pt-6 border-t border-navy-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-navy-800 flex items-center justify-center text-accent-gold border border-navy-700">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-white font-bold block text-sm leading-tight">{teamBadge}</span>
                  <span className="text-[11px] text-slate-400">उत्तर प्रदेश अभियान</span>
                </div>
              </div>

              <div className="h-6 w-px bg-navy-800 hidden sm:block" />

              <div className="flex flex-wrap items-center gap-2 text-[11px]">
                <span className="px-2.5 py-1 rounded-md bg-navy-950 border border-navy-800 text-slate-300">
                  Data & Research
                </span>
                <span className="px-2.5 py-1 rounded-md bg-navy-950 border border-navy-800 text-slate-300">
                  Digital Campaign
                </span>
                <span className="px-2.5 py-1 rounded-md bg-navy-950 border border-navy-800 text-slate-300">
                  Ground Execution
                </span>
                <span className="px-2.5 py-1 rounded-md bg-navy-950 border border-navy-800 text-slate-300">
                  War Room
                </span>
                <span className="px-2.5 py-1 rounded-md bg-navy-950 border border-navy-800 text-slate-300">
                  Media PR
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Floating Data Panel & Permanent Video Stream */}
          <div className="lg:col-span-5 relative">
            <div className="relative">
              {/* Outer decorative border glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-accent-orange/30 via-royal-blue/30 to-accent-gold/20 rounded-3xl blur-lg opacity-70 group-hover:opacity-100 transition duration-1000 pointer-events-none" />
              
              <CampaignVideoDashboard 
                videoSrc={(homepage?.hero as Record<string, unknown> | undefined)?.videoSrc as string | undefined || "/videos/campaign-video.mp4"} 
                audioSrc={(homepage?.hero as Record<string, unknown> | undefined)?.audioSrc as string | undefined || "/videos/campaign-audio.m4a"} 
                youtubeUrl="https://youtube.com/shorts/5bCg8EKiHSM"
              />
            </div>
          </div>

        </div>
      </div>

      <EnquiryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
