"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useContent } from "@/context/ContentContext";
import { defaultGallery } from "@/lib/content-schema";
import { Camera, ArrowRight, Building2, Tv, Users, ZoomIn } from "lucide-react";

export default function GalleryTeaser() {
  const { language } = useLanguage();
  const { gallery } = useContent();

  const allItems = (gallery?.items && gallery.items.length > 0) ? gallery.items : defaultGallery.items;
  const showImageContent = gallery?.showImageContent ?? false;

  // Curate 6 top highlight photos across war room, studio, leadership, and ground
  const featuredIds = [16, 21, 10, 26, 17, 19];
  const featuredItems = allItems.filter((item) => featuredIds.includes(item.id));

  return (
    <section className="py-20 bg-white dark:bg-gradient-to-b dark:from-navy-950 dark:via-navy-900 dark:to-navy-950 border-b border-slate-200 dark:border-navy-800 relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-navy-800/80 border border-slate-200 dark:border-accent-orange/40 text-slate-700 dark:text-accent-gold text-xs font-bold uppercase tracking-wider">
              <Camera className="w-3.5 h-3.5 text-accent-orange" />
              <span>{language === "hi" ? "जमीनी एवं तकनीकी कार्यप्रणाली" : "Field & Operational Proof"}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-hindi leading-tight">
              {language === "hi" ? (
                <>
                  वास्तविक वार रूम, स्टूडियो एवं <br />
                  <span className="text-accent-orange">जमीनी अभियानों के छायाचित्र</span>
                </>
              ) : (
                <>
                  Verified War Rooms, Studio & <br />
                  <span className="text-accent-orange">Ground Campaign Photo Gallery</span>
                </>
              )}
            </h2>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-hindi">
              {language === "hi"
                ? "हमारी क्षमता केवल बयानों में नहीं, हमारे काम में दिखती है — 1000+ प्रोफेशनल्स, हाई-टेक कॉलिंग सेंटर, आधुनिक मीडिया पॉडकास्ट स्टूडियो और राज्यव्यापी जमीनी उपस्थिति।"
                : "Our operational depth is evidenced on the ground — multi-seat war rooms, dedicated media studios, and verified voter research teams across key states."}
            </p>
          </div>

          <div className="flex-shrink-0">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-accent-orange to-accent-orange-hover hover:brightness-110 text-white font-bold text-xs sm:text-sm shadow-xl shadow-accent-orange/20 transition-all cursor-pointer"
            >
              <span>{language === "hi" ? `सभी ${allItems.length}+ तस्वीरें देखें` : `Explore All ${allItems.length}+ Photos`}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 6-Item Curated Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredItems.map((item) => (
            <Link
              key={item.id}
              href="/gallery"
              className="group relative rounded-2xl overflow-hidden bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-navy-800 hover:border-accent-orange/60 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                <Image
                  src={item.src}
                  alt={item.titleHi}
                  fill
                  unoptimized={true}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none image-overlay" />
                
                <div className="absolute top-3 left-3 z-10 keep-dark">
                  <span className="px-2.5 py-1 rounded-lg bg-navy-950/85 backdrop-blur-md border border-navy-700/80 text-[10px] font-bold text-accent-gold uppercase">
                    {item.tag}
                  </span>
                </div>

                <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 rounded-lg bg-accent-orange text-white flex items-center justify-center shadow-lg">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {showImageContent && (
                <div className="p-4 flex-1 flex flex-col justify-between text-left space-y-1.5">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-accent-orange dark:group-hover:text-accent-gold transition-colors font-hindi line-clamp-1">
                    {language === "hi" ? item.titleHi : item.titleEn}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-hindi line-clamp-2 leading-relaxed">
                    {language === "hi" ? item.descHi : item.descEn}
                  </p>
                </div>
              )}
            </Link>
          ))}
        </div>

        {/* Quick Highlights Strip */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-900/60 border border-slate-200 dark:border-navy-800 text-left">
            <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono">1000+</span>
            <span className="text-xs text-slate-600 dark:text-slate-400 block mt-0.5 font-hindi">प्रोफेशनल्स पैन इंडिया</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-900/60 border border-slate-200 dark:border-navy-800 text-left">
            <span className="text-xl sm:text-2xl font-black text-amber-600 dark:text-accent-gold font-mono">50+</span>
            <span className="text-xs text-slate-600 dark:text-slate-400 block mt-0.5 font-hindi">सफल चुनावी अभियान</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-900/60 border border-slate-200 dark:border-navy-800 text-left">
            <span className="text-xl sm:text-2xl font-black text-sky-600 dark:text-sky-400 font-mono">4+</span>
            <span className="text-xs text-slate-600 dark:text-slate-400 block mt-0.5 font-hindi">राज्यों में सक्रिय उपस्थिति</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-900/60 border border-slate-200 dark:border-navy-800 text-left">
            <span className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">24x7</span>
            <span className="text-xs text-slate-600 dark:text-slate-400 block mt-0.5 font-hindi">वार रूम एवं त्वरित एक्शन</span>
          </div>
        </div>

      </div>
    </section>
  );
}
