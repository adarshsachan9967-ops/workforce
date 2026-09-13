"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { faqsData, FaqItem } from "@/data/faqsData";
import FinalCta from "@/components/home/FinalCta";
import { ChevronDown, HelpCircle, Search, Filter } from "lucide-react";

export default function FaqPage() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [openId, setOpenId] = useState<number | null>(1);

  const categories = [
    { key: "all", labelHi: "सभी प्रश्न (20)", labelEn: "All Questions (20)" },
    { key: "general", labelHi: "सामान्य प्रश्न", labelEn: "General" },
    { key: "services", labelHi: "चुनावी सेवाएं", labelEn: "Services" },
    { key: "technology", labelHi: "तकनीक व डैशबोर्ड", labelEn: "Technology" },
    { key: "compliance", labelHi: "नियम व सुरक्षा", labelEn: "Compliance" }
  ];

  const filteredFaqs = faqsData.filter((faq) => {
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    const term = searchTerm.toLowerCase();
    const q = (language === "hi" ? faq.qHi : faq.qEn).toLowerCase();
    const a = (language === "hi" ? faq.aHi : faq.aEn).toLowerCase();
    const matchesSearch = q.includes(term) || a.includes(term);
    return matchesCategory && matchesSearch;
  });

  const toggleAccordion = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <main className="flex-1 bg-navy-900 text-slate-100 overflow-hidden">
      {/* Hero Header */}
      <section className="relative pt-16 pb-16 lg:pt-20 lg:pb-24 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-900 border-b border-navy-800 bg-grid-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mb-2">
              <Link href="/" className="hover:text-accent-gold">HOME</Link>
              <span>/</span>
              <span className="text-accent-orange font-bold">FREQUENTLY ASKED QUESTIONS</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight font-hindi leading-tight">
              {language === "hi" ? "अक्सर पूछे जाने वाले प्रश्न (FAQ)" : "Frequently Asked Questions"}
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed">
              {language === "hi"
                ? "उत्तर प्रदेश विधानसभा चुनाव 2027 अभियान प्रबंधन से संबंधित सभी 20 महत्वपूर्ण प्रश्नों के विस्तृत व आधिकारिक उत्तर।"
                : "Comprehensive and authoritative responses to all 20 key operational and technical questions regarding the UP 2027 campaign."}
            </p>
          </div>
        </div>
      </section>

      {/* Main FAQ Container - Full Width */}
      <section className="py-16 bg-navy-950">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Search & Filter Controls */}
          <div className="space-y-4 mb-10">
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={language === "hi" ? "किसी भी विषय पर प्रश्न खोजें... (उदा. सोशल मीडिया, बूथ, कॉल सेंटर, डेटा, सुरक्षा)" : "Search any query... (e.g. social media, booth, call center, data, compliance)"}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-navy-900 border border-navy-700 text-white text-sm placeholder-slate-500 focus:border-accent-orange outline-none transition shadow-lg"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat.key
                      ? "bg-accent-orange text-white shadow-md shadow-accent-orange/20"
                      : "bg-navy-900 text-slate-300 hover:text-white border border-navy-800"
                  }`}
                >
                  {language === "hi" ? cat.labelHi : cat.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ Accordion List */}
          <div className="space-y-3">
            {filteredFaqs.length === 0 ? (
              <div className="p-8 rounded-2xl bg-navy-900 text-center border border-navy-800 text-slate-400">
                कोई प्रश्न नहीं मिला। कृपया अलग खोज शब्द का उपयोग करें।
              </div>
            ) : (
              filteredFaqs.map((faq) => {
                const isOpen = openId === faq.id;

                return (
                  <div
                    key={faq.id}
                    className="rounded-xl border border-navy-700/80 bg-gradient-to-b from-navy-850 to-navy-950 overflow-hidden transition-all shadow-md"
                  >
                    <button
                      onClick={() => toggleAccordion(faq.id)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-xs font-mono font-bold text-accent-orange px-2 py-0.5 rounded bg-navy-950 border border-navy-800 flex-shrink-0 mt-0.5">
                          #{faq.id < 10 ? `0${faq.id}` : faq.id}
                        </span>
                        <span className="text-sm sm:text-base font-bold text-white font-hindi leading-snug">
                          {language === "hi" ? faq.qHi : faq.qEn}
                        </span>
                      </div>
                      <div className={`w-7 h-7 rounded-lg bg-navy-900 border border-navy-700 flex items-center justify-center flex-shrink-0 text-slate-300 transition-transform ${isOpen ? "rotate-180 bg-accent-orange text-white" : ""}`}>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-navy-800/80 animate-in fade-in duration-200">
                        <p>{language === "hi" ? faq.aHi : faq.aEn}</p>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

        </div>
      </section>

      {/* Final CTA */}
      <FinalCta />
    </main>
  );
}
