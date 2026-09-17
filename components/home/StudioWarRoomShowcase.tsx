"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useContent } from "@/context/ContentContext";
import { defaultStudioWarRoom } from "@/lib/content-schema";
import { Mic, Tv, Monitor, CheckCircle2, ArrowRight } from "lucide-react";

export default function StudioWarRoomShowcase() {
  const { language } = useLanguage();
  const { homepage } = useContent();

  const showcase = homepage?.studioWarRoom || defaultStudioWarRoom;
  const studio = showcase.studioCard || defaultStudioWarRoom.studioCard;
  const warRoom = showcase.warRoomCard || defaultStudioWarRoom.warRoomCard;

  const studioBullets = language === "hi" ? studio.bulletsHi : (studio.bulletsEn || studio.bulletsHi);
  const warRoomBullets = language === "hi" ? warRoom.bulletsHi : (warRoom.bulletsEn || warRoom.bulletsHi);

  return (
    <section className="py-20 bg-navy-950 border-b border-navy-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-navy-900 border border-sky-400/30 text-sky-400 text-xs font-bold uppercase tracking-wider">
            <Tv className="w-3.5 h-3.5" />
            <span>{language === "hi" ? showcase.badgeHi : (showcase.badgeEn || showcase.badgeHi)}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-hindi leading-tight">
            {language === "hi" ? (
              showcase.headingHi
            ) : (
              showcase.headingEn || showcase.headingHi
            )}
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-hindi leading-relaxed">
            {language === "hi" ? showcase.subHi : (showcase.subEn || showcase.subHi)}
          </p>
        </div>

        {/* 2 Big Feature Cards: Left is Studio, Right is War Room */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Card 1: Media Studio & Podcast Suite */}
          <div className="rounded-3xl bg-gradient-to-b from-navy-900 to-navy-920 border border-navy-800 p-6 sm:p-8 flex flex-col justify-between text-left space-y-6 shadow-xl group hover:border-accent-orange/50 transition-all">
            <div className="space-y-4">
              {/* Visual image strip of Studio */}
              <div className="grid grid-cols-2 gap-3 aspect-[16/10] w-full rounded-2xl overflow-hidden bg-navy-950">
                <div className="relative w-full h-full">
                  <Image
                    src={studio.image1Src || "/images/gallery/gallery-21.jpeg"}
                    alt={studio.image1Label || "Limelight with Anuj Podcast Studio"}
                    fill
                    unoptimized={true}
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-navy-950/85 text-[10px] font-bold text-accent-gold keep-dark shadow">
                    {studio.image1Label || "पॉडकास्ट स्टूडियो"}
                  </div>
                </div>
                <div className="relative w-full h-full">
                  <Image
                    src={studio.image2Src || "/images/showcase/chunavi-gane-nirman-kaksh.png"}
                    alt={studio.image2Label || "चुनावी गाने निर्माण कक्ष"}
                    fill
                    unoptimized={true}
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-navy-950/85 text-[10px] font-bold text-sky-400 keep-dark shadow">
                    {studio.image2Label || "चुनावी गाने निर्माण कक्ष"}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-accent-gold uppercase tracking-wider">
                  <Mic className="w-4 h-4 text-accent-orange" />
                  <span>{language === "hi" ? studio.badgeHi : (studio.badgeEn || studio.badgeHi)}</span>
                </div>
                <h3 className="text-2xl font-bold text-white font-hindi">
                  {language === "hi" ? studio.titleHi : (studio.titleEn || studio.titleHi)}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-hindi leading-relaxed">
                  {language === "hi" ? studio.descHi : (studio.descEn || studio.descHi)}
                </p>
              </div>

              {studioBullets && studioBullets.length > 0 && (
                <ul className="space-y-2 text-xs text-slate-300 font-hindi">
                  {studioBullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="pt-4 border-t border-navy-800">
              <Link
                href={studio.ctaLink || "/gallery"}
                className="inline-flex items-center gap-2 text-xs font-bold text-accent-orange hover:text-accent-gold transition"
              >
                <span>{language === "hi" ? studio.ctaTextHi : (studio.ctaTextEn || studio.ctaTextHi)}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: Central War Room & Call Center */}
          <div className="rounded-3xl bg-gradient-to-b from-navy-900 to-navy-920 border border-navy-800 p-6 sm:p-8 flex flex-col justify-between text-left space-y-6 shadow-xl group hover:border-accent-orange/50 transition-all">
            <div className="space-y-4">
              {/* Visual image strip of War Room */}
              <div className="grid grid-cols-2 gap-3 aspect-[16/10] w-full rounded-2xl overflow-hidden bg-navy-950">
                <div className="relative w-full h-full">
                  <Image
                    src={warRoom.image1Src || "/images/showcase/kendriya-war-room.png"}
                    alt={warRoom.image1Label || "केंद्रीय वॉर रूम"}
                    fill
                    unoptimized={true}
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-navy-950/85 text-[10px] font-bold text-emerald-400 keep-dark shadow">
                    {warRoom.image1Label || "केंद्रीय वॉर रूम"}
                  </div>
                </div>
                <div className="relative w-full h-full">
                  <Image
                    src={warRoom.image2Src || "/images/showcase/tele-calling-center.png"}
                    alt={warRoom.image2Label || "टेली-कॉलिंग सेंटर"}
                    fill
                    unoptimized={true}
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-navy-950/85 text-[10px] font-bold text-sky-400 keep-dark shadow">
                    {warRoom.image2Label || "टेली-कॉलिंग सेंटर"}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wider">
                  <Monitor className="w-4 h-4 text-sky-400" />
                  <span>{language === "hi" ? warRoom.badgeHi : (warRoom.badgeEn || warRoom.badgeHi)}</span>
                </div>
                <h3 className="text-2xl font-bold text-white font-hindi">
                  {language === "hi" ? warRoom.titleHi : (warRoom.titleEn || warRoom.titleHi)}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-hindi leading-relaxed">
                  {language === "hi" ? warRoom.descHi : (warRoom.descEn || warRoom.descHi)}
                </p>
              </div>

              {warRoomBullets && warRoomBullets.length > 0 && (
                <ul className="space-y-2 text-xs text-slate-300 font-hindi">
                  {warRoomBullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="pt-4 border-t border-navy-800">
              <Link
                href={warRoom.ctaLink || "/technology"}
                className="inline-flex items-center gap-2 text-xs font-bold text-accent-orange hover:text-accent-gold transition"
              >
                <span>{language === "hi" ? warRoom.ctaTextHi : (warRoom.ctaTextEn || warRoom.ctaTextHi)}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
