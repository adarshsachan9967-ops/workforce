"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Pause, Play, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useContent } from "@/context/ContentContext";

interface BannerSlide {
  id: number;
  src: string;
  alt: string;
  titleHi: string;
  titleEn: string;
  subtitleHi: string;
  subtitleEn: string;
  ctaTextHi: string;
  ctaTextEn: string;
  ctaLink: string;
  badgeHi: string;
  badgeEn: string;
}

const defaultSlides: BannerSlide[] = [
  {
    id: 1,
    src: "/images/banners/banner-1.jpeg",
    alt: "Taking Your Message To Every Voter - Workforce Infotech",
    titleHi: "हर मतदाता तक आपका संदेश — ऑन ग्राउंड, ऑन स्क्रीन, ऑनलाइन",
    titleEn: "Taking Your Message To Every Voter — On Ground, Screen & Online",
    subtitleHi: "एलईडी प्रचार वैन • मीडिया बाइट्स • इन्फ्लुएंसर इंटरव्यू • सोशल मीडिया अभियान • जमीनी सक्रियता • चुनावी डेटा सपोर्ट",
    subtitleEn: "LED Campaign Vans • Media Bytes • Influencer Interviews • Social Media • Grassroots Activation • Data Analytics",
    ctaTextHi: "अभियान सेवाएँ देखें",
    ctaTextEn: "Explore Campaign Verticals",
    ctaLink: "/services",
    badgeHi: "360° चुनावी प्रचार समाधान",
    badgeEn: "360° Integrated Campaign"
  },
  {
    id: 2,
    src: "/images/banners/banner-2.jpeg",
    alt: "Turning Political Vision Into People's Victory - UP Elections 2027",
    titleHi: "राजनीतिक विजन को जन-विजय में बदलना — उत्तर प्रदेश चुनाव 2027",
    titleEn: "Turning Political Vision Into People's Victory — UP Elections 2027",
    subtitleHi: "वोटर डेटा मैनेजमेंट • सोशल मीडिया • चुनावी रणनीति • वीडियो प्रोडक्शन • ग्राउंड टीम • ओपिनियन पोल • वार रूम सपोर्ट",
    subtitleEn: "Voter Data • Strategic Planning • Video Production • Ground Teams • Opinion Polls • Training & War Room IT",
    ctaTextHi: "वार रूम परामर्श बुक करें",
    ctaTextEn: "Book War Room Consultation",
    ctaLink: "/contact",
    badgeHi: "मिशन यूपी विधानसभा 2027",
    badgeEn: "Mission UP Assembly 2027"
  },
  {
    id: 3,
    src: "/images/banners/banner-3.jpeg",
    alt: "Social Media Management For A Stronger Democracy - Workforce Infotech",
    titleHi: "मजबूत लोकतंत्र के लिए सोशल मीडिया प्रबंधन व डिजिटल कैंपेन",
    titleEn: "Social Media Management & Digital Dominance for Victory",
    subtitleHi: "पेज मैनेजमेंट • रील्स व वीडियो एडिटिंग • एआई वीडियो क्रिएशन • पॉलिटिकल नैरेटिव • वेरिफिकेशन • फॉलोअर ग्रोथ",
    subtitleEn: "Page Management • Viral Reels & Video Editing • AI Content • Narrative Architecture • Verification & Growth",
    ctaTextHi: "फोटो व वीडियो गैलरी देखें",
    ctaTextEn: "View Campaign Gallery",
    ctaLink: "/gallery",
    badgeHi: "डिजिटल व सोशल मीडिया संभाग",
    badgeEn: "Digital & Social Wing"
  }
];

export default function BannerSlider() {
  const { language } = useLanguage();
  const { homepage } = useContent();
  const bannerData = homepage?.bannerSlider;
  const slides = (bannerData?.slides && bannerData.slides.length > 0) ? bannerData.slides : defaultSlides;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) nextSlide();
    if (diff < -50) prevSlide();
    setTouchStart(null);
  };

  const active = slides[currentSlide];

  return (
    <section 
      className="relative w-full bg-navy-950 py-4 sm:py-6 border-b border-navy-800"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Campaign Featured Banners"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Frame */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-navy-700/80 shadow-2xl bg-navy-900 group">
          
          {/* Main Visual Carousel - Exact 1600:592 Native Aspect Ratio */}
          <div className="relative w-full aspect-[1600/592] min-h-[180px] sm:min-h-[260px] md:min-h-[320px] bg-navy-950">
            {slides.map((slide, idx) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  idx === currentSlide ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={true}
                  unoptimized={true}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 95vw, 1280px"
                  className="object-cover sm:object-contain md:object-cover object-center transform scale-100 group-hover:scale-[1.01] transition-transform duration-700"
                />
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-navy-950/85 hover:bg-accent-orange text-white border border-navy-700 hover:border-accent-orange flex items-center justify-center transition-all shadow-xl backdrop-blur-md cursor-pointer opacity-80 sm:opacity-0 group-hover:opacity-100 focus:opacity-100"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next Slide"
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-navy-950/85 hover:bg-accent-orange text-white border border-navy-700 hover:border-accent-orange flex items-center justify-center transition-all shadow-xl backdrop-blur-md cursor-pointer opacity-80 sm:opacity-0 group-hover:opacity-100 focus:opacity-100"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Bottom Bar: Indicators & Pause Button */}
          <div className="absolute bottom-3 sm:bottom-4 left-0 right-0 z-20 flex items-center justify-between px-4 sm:px-6">
            
            {/* Quick Badge */}
            <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-950/90 border border-navy-700 backdrop-blur-md text-[11px] font-semibold text-accent-gold shadow-lg keep-dark">
              <ShieldCheck className="w-3.5 h-3.5 text-accent-orange" />
              <span>{language === "hi" ? active.badgeHi : active.badgeEn}</span>
            </div>

            {/* Slide Dots */}
            <div className="flex items-center gap-2 mx-auto sm:mx-0 bg-navy-950/90 px-3 py-1.5 rounded-full border border-navy-800 backdrop-blur-md keep-dark">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    idx === currentSlide
                      ? "w-8 sm:w-10 h-2 sm:h-2.5 bg-gradient-to-r from-accent-orange to-accent-gold shadow-sm"
                      : "w-2 sm:w-2.5 h-2 sm:h-2.5 bg-slate-600 hover:bg-slate-400"
                  }`}
                />
              ))}

              <button
                onClick={() => setIsPaused(!isPaused)}
                aria-label={isPaused ? "Play Autoplay" : "Pause Autoplay"}
                className="ml-1 text-slate-400 hover:text-white p-0.5"
                title={isPaused ? "Play slideshow" : "Pause slideshow"}
              >
                {isPaused ? <Play className="w-3 h-3 text-white" /> : <Pause className="w-3 h-3 text-white" />}
              </button>
            </div>

            {/* Action link */}
            <div className="hidden md:block">
              <Link
                href={active.ctaLink}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-accent-orange hover:bg-accent-orange-hover text-white text-xs font-bold shadow-lg transition-all"
              >
                <span>{language === "hi" ? active.ctaTextHi : active.ctaTextEn}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

        </div>

        {/* Dynamic Context Card below Banner */}
        <div className="mt-3 p-3.5 sm:p-4 rounded-xl bg-slate-100 dark:bg-navy-900/90 border border-slate-200 dark:border-navy-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-orange animate-pulse" />
              <span className="text-xs font-bold text-slate-900 dark:text-white font-hindi">
                {language === "hi" 
                  ? (bannerData?.tickerHeadingHi || active.titleHi)
                  : (bannerData?.tickerHeadingEn || active.titleEn)}
              </span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 font-hindi line-clamp-1">
              {language === "hi"
                ? (bannerData?.tickerServicesHi || active.subtitleHi)
                : (bannerData?.tickerServicesEn || active.subtitleEn)}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <Link
              href={bannerData?.button1Link || active.ctaLink}
              className="px-3.5 py-1.5 rounded-lg bg-accent-orange hover:bg-accent-orange-hover text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow"
            >
              <span>
                {language === "hi" 
                  ? (bannerData?.button1TextHi || active.ctaTextHi)
                  : (bannerData?.button1TextEn || active.ctaTextEn)}
              </span>
              <ArrowRight className="w-3 h-3" />
            </Link>
            <Link
              href={bannerData?.button2Link || "/gallery"}
              className="px-3 py-1.5 rounded-lg bg-white dark:bg-navy-800 hover:bg-slate-50 dark:hover:bg-navy-750 text-slate-700 dark:text-slate-300 dark:hover:text-white border border-slate-300 dark:border-navy-700 text-xs font-semibold transition-colors"
            >
              {language === "hi"
                ? (bannerData?.button2TextHi || "गैलरी (26+)")
                : (bannerData?.button2TextEn || "Gallery (26+)")}
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
