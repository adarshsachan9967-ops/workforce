"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useContent } from "@/context/ContentContext";
import EnquiryModal from "@/components/shared/EnquiryModal";
import { Phone, MessageSquare, ArrowRight, ShieldCheck } from "lucide-react";

export default function FinalCta() {
  const { t, language } = useLanguage();
  const { homepage, settings } = useContent();
  const [modalOpen, setModalOpen] = useState(false);

  const fc = homepage.finalCta || t.finalCta;
  const phone1 = settings.phone1 || "9621762121";
  const phone2 = settings.phone2 || "8467060042";

  return (
    <>
      <section className="py-12 lg:py-16 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 relative overflow-hidden final-cta-section">
        {/* Cinematic gradient spotlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-royal-blue/30 via-accent-orange/20 to-accent-gold/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="w-full rounded-3xl bg-gradient-to-b from-navy-850/98 via-navy-900/98 to-navy-950/98 border border-accent-orange/50 p-6 sm:p-12 lg:p-16 xl:p-20 shadow-2xl backdrop-blur-md keep-dark text-center">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-orange/20 border border-accent-orange/50 text-accent-gold text-xs sm:text-sm font-bold uppercase tracking-wider mb-6">
              <span>🚩 UP Assembly 2027</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.2] font-hindi max-w-5xl mx-auto">
              <span>{fc.heading1}</span>
              <br />
              <span className="text-accent-gold">
                {fc.heading2}
              </span>
            </h2>

            <p className="mt-5 text-base sm:text-lg lg:text-xl text-slate-200 max-w-3xl mx-auto font-normal leading-relaxed">
              {fc.sub}
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <Link
                href="/contact#consultation-form"
                className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 rounded-2xl bg-gradient-to-r from-accent-orange to-accent-orange-hover hover:brightness-110 text-white font-bold text-base sm:text-lg shadow-xl shadow-accent-orange/25 transition-all flex items-center justify-center gap-3 cursor-pointer"
              >
                <MessageSquare className="w-5 h-5" />
                <span>{fc.button1}</span>
              </Link>

              <a
                href={`tel:${phone1}`}
                className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-base sm:text-lg border border-white/20 hover:border-emerald-400 transition-all flex items-center justify-center gap-3"
              >
                <Phone className="w-5 h-5 text-emerald-400" />
                <span>{fc.button2}</span>
              </a>
            </div>

            {/* Direct Helpline Display */}
            <div className="mt-10 pt-8 border-t border-navy-800/80 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-sm sm:text-base font-semibold">
              <div className="flex items-center gap-2 text-slate-300">
                <span className="text-slate-400 text-xs sm:text-sm font-normal">हेल्पलाइन 1:</span>
                <a href={`tel:${phone1}`} className="text-white hover:text-accent-gold font-mono tracking-wider text-base sm:text-lg font-bold">
                  {phone1}
                </a>
              </div>

              <span className="text-slate-600 hidden sm:inline">•</span>

              <div className="flex items-center gap-2 text-slate-300">
                <span className="text-slate-400 text-xs sm:text-sm font-normal">हेल्पलाइन 2:</span>
                <a href={`tel:${phone2}`} className="text-white hover:text-accent-gold font-mono tracking-wider text-base sm:text-lg font-bold">
                  {phone2}
                </a>
              </div>

              <span className="text-slate-600 hidden sm:inline">•</span>

              <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
                <ShieldCheck className="w-5 h-5" />
                <span>100% गोपनीय परामर्श</span>
              </div>
            </div>

            <p className="mt-6 text-xs text-slate-400 max-w-2xl mx-auto leading-relaxed">
              {t.finalCta.disclaimer}
            </p>

          </div>
        </div>
      </section>

      <EnquiryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
