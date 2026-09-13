"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { faqsData } from "@/data/faqsData";
import { ChevronDown, HelpCircle, ArrowRight, Search } from "lucide-react";

export default function FaqPreview() {
  const { language } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFaqs = faqsData.filter((f) => {
    const term = searchTerm.toLowerCase();
    const q = (language === "hi" ? f.qHi : f.qEn).toLowerCase();
    const a = (language === "hi" ? f.aHi : f.aEn).toLowerCase();
    return q.includes(term) || a.includes(term);
  });

  const previewList = searchTerm ? filteredFaqs.slice(0, 8) : faqsData.slice(0, 8);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 sm:py-20 bg-slate-50 dark:bg-navy-900 relative overflow-hidden transition-colors" id="faq">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-slate-700 dark:text-accent-gold text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-accent-orange" />
            <span>{language === "hi" ? "अक्सर पूछे जाने वाले सवाल" : "Frequently Asked Questions"}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight font-hindi">
            {language === "hi" ? "महत्वपूर्ण प्रश्न एवं समाधान" : "Important Inquiries & Answers"}
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            {language === "hi"
              ? "चुनाव प्रबंधन, सेवाओं, तकनीक और नियमों से जुड़े मुख्य सवालों के स्पष्ट उत्तर।"
              : "Clear, transparent answers concerning our campaign methodologies, technology, and legal frameworks."}
          </p>
        </div>

        {/* Quick Search Box - Full Width */}
        <div className="mb-8 relative w-full">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={language === "hi" ? "सवाल खोजें... (उदा. सोशल मीडिया, बूथ, कॉल सेंटर, डेटा)" : "Search FAQs... (e.g. social media, booth, call center, data)"}
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-navy-950/80 border border-slate-200 dark:border-navy-700 text-slate-900 dark:text-white text-sm sm:text-base placeholder-slate-400 dark:placeholder-slate-500 focus:border-accent-orange outline-none transition shadow-sm"
          />
        </div>

        {/* Accordion Container - Full Width */}
        <div className="space-y-3.5 w-full">
          {previewList.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.id}
                className="w-full rounded-2xl border border-slate-200 dark:border-navy-700/70 bg-white dark:bg-gradient-to-b dark:from-navy-850 dark:to-navy-950 overflow-hidden transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-4 sm:p-5 lg:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-sm sm:text-base lg:text-lg font-bold text-slate-900 dark:text-white font-hindi leading-snug flex items-center gap-3">
                    <span className="text-xs sm:text-sm font-mono text-accent-orange font-bold flex-shrink-0">
                      Q{faq.id}.
                    </span>
                    <span>{language === "hi" ? faq.qHi : faq.qEn}</span>
                  </span>
                  <div className={`w-8 h-8 rounded-lg bg-slate-100 dark:bg-navy-900 border border-slate-200 dark:border-navy-700 flex items-center justify-center flex-shrink-0 text-slate-600 dark:text-slate-300 transition-transform duration-200 ${isOpen ? "rotate-180 bg-accent-orange text-white dark:bg-accent-orange dark:text-white" : ""}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-2 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-navy-800/60 animate-in fade-in duration-200">
                    <p>{language === "hi" ? faq.aHi : faq.aEn}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* View All FAQs CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-900 dark:bg-navy-950 dark:hover:bg-navy-800 dark:text-white font-bold text-sm sm:text-base border border-slate-200 dark:border-navy-700 hover:border-accent-orange transition-all shadow-md group cursor-pointer"
          >
            <span>{language === "hi" ? "सभी 20 प्रश्न एवं उत्तर देखें" : "View All 20 Election Campaign FAQs"}</span>
            <ArrowRight className="w-4 h-4 text-accent-orange group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
