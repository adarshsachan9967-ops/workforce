"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { galleryCategories, GalleryItem } from "@/data/galleryData";
import { useLanguage } from "@/context/LanguageContext";
import { useContent } from "@/context/ContentContext";
import { defaultGallery } from "@/lib/content-schema";
import EnquiryModal from "@/components/shared/EnquiryModal";
import {
  Camera,
  Layers,
  ChevronLeft,
  ChevronRight,
  X,
  MapPin,
  Tag,
  ZoomIn,
  Download,
  Calendar,
  Shield,
  ArrowRight,
  Building2,
  Tv,
  Users
} from "lucide-react";

export default function GalleryPage() {
  const { language } = useLanguage();
  const { gallery } = useContent();

  const allItems = (gallery?.items && gallery.items.length > 0) ? gallery.items : defaultGallery.items;
  const showImageContent = gallery?.showImageContent ?? false;

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = allItems.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;
    const matchesQuery =
      item.titleHi.toLowerCase().includes(q) ||
      item.titleEn.toLowerCase().includes(q) ||
      item.descHi.toLowerCase().includes(q) ||
      item.descEn.toLowerCase().includes(q) ||
      item.tag.toLowerCase().includes(q) ||
      (item.location && item.location.toLowerCase().includes(q));
    return matchesCategory && matchesQuery;
  });

  const currentIndex = selectedItem
    ? filteredItems.findIndex((i) => i.id === selectedItem.id)
    : -1;

  const showNext = useCallback(() => {
    if (currentIndex < 0 || filteredItems.length === 0) return;
    const nextIdx = (currentIndex + 1) % filteredItems.length;
    setSelectedItem(filteredItems[nextIdx]);
  }, [currentIndex, filteredItems]);

  const showPrev = useCallback(() => {
    if (currentIndex < 0 || filteredItems.length === 0) return;
    const prevIdx = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedItem(filteredItems[prevIdx]);
  }, [currentIndex, filteredItems]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedItem) return;
      if (e.key === "Escape") setSelectedItem(null);
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedItem, showNext, showPrev]);

  return (
    <main className="flex-1 bg-navy-900 text-slate-100 overflow-hidden">
      
      {/* Hero Header */}
      <section className="relative pt-14 pb-16 lg:pt-20 lg:pb-24 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-900 border-b border-navy-800 bg-grid-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
          
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mb-2">
              <Link href="/" className="hover:text-accent-gold">HOME</Link>
              <span>/</span>
              <span className="text-accent-orange font-bold">GALLERY & GROUND ACTION</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-navy-900 border border-accent-orange/40 text-accent-gold text-xs font-bold uppercase tracking-wider">
              <Camera className="w-3.5 h-3.5 text-accent-orange" />
              <span>{language === "hi" ? "वास्तविक अभियान छायाचित्र" : "Authentic Campaign Gallery"}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight font-hindi leading-tight">
              {language === "hi" ? (
                <>
                  जमीनी सक्रियता, हाई-टेक वार रूम <br />
                  <span className="text-accent-orange">& मीडिया स्टूडियो की एक झलक</span>
                </>
              ) : (
                <>
                  Field Operations, High-Tech War Rooms <br />
                  <span className="text-accent-orange">& Production Studios in Action</span>
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
              {language === "hi"
                ? "वर्कफोर्स इन्फोटेक के वास्तविक चुनावी अभियानों, कोर वार रूम ऑपरेशंस, ऑडियो-वीडियो रिकॉर्डिंग स्टूडियो, डोर-टू-डोर सर्वे और वरिष्ठ राजनीतिक नेतृत्व के साथ हुए संवादों का प्रामाणिक छायाचित्र संग्रह।"
                : "A verified visual record of Workforce Infotech's actual campaign operations, command center telemetry, broadcast podcast suites, grassroots surveys, and top-tier political consultations."}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-medium">
              <span className="px-3 py-1.5 rounded-xl bg-navy-950/80 border border-navy-700/80 text-accent-gold flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-accent-orange" />
                <span>{allItems.length}+ प्रामाणिक तस्वीरें</span>
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-navy-950/80 border border-navy-700/80 text-slate-300 flex items-center gap-1.5">
                <Tv className="w-3.5 h-3.5 text-sky-400" />
                <span>पॉडकास्ट एवं ऑडियो स्टूडियो</span>
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-navy-950/80 border border-navy-700/80 text-slate-300 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-emerald-400" />
                <span>1000+ प्रोफेशनल वर्कफोर्स</span>
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* Gallery Main Container */}
      <section className="py-12 lg:py-16 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Controls: Category Filter Tabs & Search */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8 pb-6 border-b border-navy-800">
            
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {galleryCategories.map((cat) => {
                const isSelected = activeCategory === cat.id;
                const count = cat.id === "all" 
                  ? allItems.length 
                  : allItems.filter((i) => i.category === cat.id).length;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-accent-orange text-white shadow-lg shadow-accent-orange/20"
                        : "bg-navy-900 text-slate-300 hover:bg-navy-850 hover:text-white border border-navy-800"
                    }`}
                  >
                    <span>{language === "hi" ? cat.labelHi : cat.labelEn}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isSelected ? "bg-black/20 text-white" : "bg-navy-800 text-slate-400"}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="w-full md:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === "hi" ? "गैलरी में खोजें (उदा. वार रूम, स्टूडियो)..." : "Search gallery by keyword..."}
                className="w-full px-4 py-2.5 rounded-xl bg-navy-900 border border-navy-800 text-xs text-white placeholder-slate-500 focus:border-accent-orange focus:ring-1 focus:ring-accent-orange outline-none transition"
              />
            </div>

          </div>

          {/* Gallery Grid */}
          {filteredItems.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-navy-900/60 border border-navy-800 space-y-3">
              <Camera className="w-12 h-12 text-slate-500 mx-auto" />
              <p className="text-slate-300 font-hindi text-base">
                {language === "hi" ? "कोई फोटो नहीं मिली।" : "No images match your search criteria."}
              </p>
              <button
                onClick={() => {
                  setActiveCategory("all");
                  setSearchQuery("");
                }}
                className="text-xs text-accent-orange hover:underline font-semibold"
              >
                {language === "hi" ? `सभी ${allItems.length} तस्वीरें देखें` : "Reset Filter & Show All"}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="group relative rounded-2xl overflow-hidden bg-navy-900 border border-navy-800 hover:border-accent-orange/60 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col"
                >
                  {/* Image Frame */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                    <Image
                      src={item.src}
                      alt={item.titleHi}
                      fill
                      unoptimized={true}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Hover Overlay - Only darkens on hover, zero haze in standard view */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none image-overlay" />

                    {/* Tag badge */}
                    <div className="absolute top-3 left-3 z-10 keep-dark">
                      <span className="px-2.5 py-1 rounded-lg bg-navy-950/85 backdrop-blur-md border border-navy-700/80 text-[10px] font-bold text-accent-gold uppercase tracking-wider">
                        {item.tag}
                      </span>
                    </div>

                    {/* Zoom Icon Button */}
                    <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-8 h-8 rounded-lg bg-accent-orange text-white flex items-center justify-center shadow-lg">
                        <ZoomIn className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Image Number ID */}
                    <div className="absolute bottom-3 right-3 z-10 text-[10px] font-mono font-bold text-white bg-navy-950/80 px-2 py-0.5 rounded keep-dark">
                      #{item.id}
                    </div>
                  </div>

                  {/* Caption & Description - Conditionally rendered based on Admin toggle */}
                  {showImageContent && (
                    <div className="p-4 flex-1 flex flex-col justify-between text-left space-y-2">
                      <div>
                        <h3 className="text-sm font-bold text-white group-hover:text-accent-gold transition-colors font-hindi line-clamp-1">
                          {language === "hi" ? item.titleHi : item.titleEn}
                        </h3>
                        <p className="text-xs text-slate-400 font-hindi line-clamp-2 mt-1 leading-relaxed">
                          {language === "hi" ? item.descHi : item.descEn}
                        </p>
                      </div>

                      {item.location && (
                        <div className="pt-2 border-t border-navy-800/80 flex items-center gap-1.5 text-[11px] text-slate-400">
                          <MapPin className="w-3 h-3 text-sky-400 flex-shrink-0" />
                          <span className="truncate">{item.location}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Bottom CTA Block */}
          <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 border border-navy-700 text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-white font-hindi">
              {language === "hi"
                ? "क्या आप भी अपनी विधानसभा में ऐसा वार रूम व प्रचार तंत्र चाहते हैं?"
                : "Would You Like a Dedicated War Room & Media Setup in Your Constituency?"}
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl mx-auto">
              {language === "hi"
                ? "वर्कफोर्स इन्फोटेक की विशेषज्ञ टीम आपकी सीट के जातिगत समीकरणों, बूथ डेटा और डिजिटल नैरेटिव पर पूर्ण रणनीति तैयार करेगी।"
                : "Workforce Infotech's senior campaign leadership can evaluate your constituency dynamics and draft an end-to-end victory roadmap."}
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-accent-orange to-accent-orange-hover text-white font-bold text-xs sm:text-sm shadow-xl shadow-accent-orange/20 transition-all hover:brightness-110 cursor-pointer flex items-center gap-2"
              >
                <span>{language === "hi" ? "वार रूम विमर्श बुक करें" : "Book War Room Consultation"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-xl bg-navy-800 hover:bg-navy-750 text-slate-200 hover:text-white border border-navy-700 font-semibold text-xs sm:text-sm transition-all"
              >
                {language === "hi" ? "कार्यालय का पता व दिशा-निर्देश" : "Office Locations & Directions"}
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setSelectedItem(null)}
        >
          <div 
            className="relative max-w-5xl w-full max-h-[92vh] flex flex-col bg-navy-950 rounded-2xl sm:rounded-3xl border border-navy-700 overflow-hidden shadow-2xl keep-dark"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Header Bar */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-navy-800 bg-navy-900/90 text-left">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-md bg-accent-orange text-white text-xs font-bold">
                  #{selectedItem.id}
                </span>
                <span className="text-xs text-slate-300 font-mono">
                  {currentIndex + 1} of {filteredItems.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={selectedItem.src}
                  download={`workforce-gallery-${selectedItem.id}.jpeg`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-navy-800 hover:bg-navy-700 text-slate-300 hover:text-white transition"
                  title="Open Full Image in New Tab"
                >
                  <Download className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-2 rounded-lg bg-navy-800 hover:bg-red-950 hover:text-red-400 text-slate-300 transition"
                  aria-label="Close Lightbox"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Lightbox Image Preview */}
            <div className="relative flex-1 min-h-[320px] sm:min-h-[500px] w-full bg-black flex items-center justify-center p-2">
              <div className="relative w-full h-full min-h-[300px] sm:min-h-[480px]">
                <Image
                  src={selectedItem.src}
                  alt={selectedItem.titleHi}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                  unoptimized={true}
                />
              </div>

              {/* Prev / Next Floating Arrows */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-navy-950/80 hover:bg-accent-orange text-white border border-navy-700 flex items-center justify-center transition-all shadow-xl cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-navy-950/80 hover:bg-accent-orange text-white border border-navy-700 flex items-center justify-center transition-all shadow-xl cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Lightbox Caption Footer */}
            {showImageContent && (
              <div className="p-4 sm:p-6 bg-navy-900 border-t border-navy-800 text-left space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-bold text-accent-gold px-2 py-0.5 rounded bg-navy-950 border border-navy-800">
                    {selectedItem.tag}
                  </span>
                  {selectedItem.location && (
                    <span className="text-[11px] text-sky-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{selectedItem.location}</span>
                    </span>
                  )}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white font-hindi">
                  {language === "hi" ? selectedItem.titleHi : selectedItem.titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-hindi leading-relaxed">
                  {language === "hi" ? selectedItem.descHi : selectedItem.descEn}
                </p>
              </div>
            )}

          </div>
        </div>
      )}

      <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
