"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ServiceDetail } from "@/data/servicesData";
import { useLanguage } from "@/context/LanguageContext";
import EnquiryModal from "@/components/shared/EnquiryModal";
import {
  ArrowRight,
  Shield,
  CheckCircle2,
  ChevronDown,
  Layers,
  Cpu,
  FileText,
  Workflow,
  Sparkles,
  HelpCircle,
  PhoneCall,
  Activity,
  Award,
  Video,
  Newspaper,
  Truck,
  Calendar,
  Users,
  Database,
  Share2,
  ShieldAlert
} from "lucide-react";

interface ServiceDetailLayoutProps {
  service: ServiceDetail;
}

export default function ServiceDetailLayout({ service }: ServiceDetailLayoutProps) {
  const { language } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const title = language === "hi" ? service.titleHi : service.titleEn;
  const tag = language === "hi" ? service.tagHi : service.tagEn;
  const heroSub = language === "hi" ? service.heroSubHi : service.heroSubEn;
  const whyMatters = language === "hi" ? service.whyMattersHi : service.whyMattersEn;
  const whatWeProvide = language === "hi" ? service.whatWeProvideHi : service.whatWeProvideEn;
  const deliverables = language === "hi" ? service.deliverablesHi : service.deliverablesEn;
  const compliance = language === "hi" ? service.complianceHi : service.complianceEn;

  return (
    <div className="flex-1 bg-navy-900 text-slate-100 overflow-hidden">
      {/* 1. Hero Section */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-900 border-b border-navy-800 bg-grid-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="max-w-3xl space-y-6 text-left">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <Link href="/" className="hover:text-accent-gold">HOME</Link>
              <span>/</span>
              <Link href="/services" className="hover:text-accent-gold">SERVICES</Link>
              <span>/</span>
              <span className="text-accent-orange font-bold">{service.id}</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-navy-900 border border-accent-orange/30 text-accent-orange text-xs font-bold uppercase tracking-wider">
              <span>{tag}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight font-hindi leading-tight">
              {title}
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed">
              {heroSub}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setModalOpen(true)}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-accent-orange to-accent-orange-hover hover:brightness-110 text-white font-bold text-sm sm:text-base shadow-xl shadow-accent-orange/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>{language === "hi" ? "इस सेवा पर चर्चा करें" : "Discuss This Vertical"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="tel:9621762121"
                className="px-6 py-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300 dark:bg-navy-800 dark:hover:bg-navy-750 dark:text-white dark:border-navy-700 font-bold text-sm transition-all flex items-center gap-2 shadow-sm"
              >
                <PhoneCall className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{language === "hi" ? "हेल्पलाइन: 9621762121" : "Helpline: 9621762121"}</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 2 & 3. Service Overview & Why This Matters */}
      <section className="py-16 lg:py-24 bg-navy-950 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Overview */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-mono font-bold text-accent-orange tracking-wider uppercase">
                STRATEGIC RELEVANCE
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-hindi">
                {language === "hi" ? "यह सेवा चुनाव में क्यों निर्णायक है?" : "Why This Vertical is Decisive for 2027?"}
              </h2>
              <div className="p-6 rounded-2xl bg-navy-900/80 border border-navy-800 text-slate-300 text-base sm:text-lg leading-relaxed space-y-4">
                <p>{whyMatters}</p>
              </div>

              {/* Core Capabilities */}
              <div className="space-y-3 pt-4">
                <h3 className="text-base font-bold text-white uppercase tracking-wide font-hindi">
                  {language === "hi" ? "मुख्य विशेषज्ञता क्षेत्र:" : "Specialized Focus Areas:"}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(language === "hi" ? service.capabilitiesHi : service.capabilitiesEn).map((cap, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-navy-900/60 border border-navy-800 flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-accent-orange flex-shrink-0 mt-0.5" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Visual Service Command Card */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-navy-700 bg-gradient-to-b from-navy-850 to-navy-950 p-6 sm:p-7 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-navy-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-accent-orange animate-ping" />
                    <span className="text-xs font-mono font-bold text-white uppercase">
                      SERVICE COMMAND PROFILE
                    </span>
                  </div>
                  <span className="text-xs font-mono text-accent-gold font-bold">
                    ID: {service.id}
                  </span>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="p-3.5 rounded-xl bg-navy-950 border border-navy-800">
                    <span className="text-slate-400 block text-[11px] mb-1 font-mono">VERTICAL TITLE</span>
                    <span className="text-base font-bold text-white font-hindi">{title}</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-navy-950 border border-navy-800">
                    <span className="text-slate-400 block text-[11px] mb-1 font-mono">UP 2027 MANDATE</span>
                    <span className="text-sm font-semibold text-accent-gold font-hindi">{tag}</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-navy-950 border border-navy-800 space-y-2">
                    <span className="text-slate-400 block text-[11px] font-mono">TECH STACK / TOOLS</span>
                    <div className="flex flex-wrap gap-1.5">
                      {service.techTools.map((tool, tIdx) => (
                        <span key={tIdx} className="px-2 py-0.5 rounded bg-navy-900 border border-navy-700 text-[10px] text-slate-300 font-mono">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-navy-800 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>DEPLOYMENT: 48-72 HOURS</span>
                  <span className="text-emerald-400">ECI COMPLIANT</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4 & 5. What We Provide & Deliverables */}
      <section className="py-16 lg:py-24 bg-navy-900 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            
            {/* What We Provide */}
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono font-bold text-accent-gold uppercase tracking-wider">
                  END-TO-END SCOPE
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white font-hindi mt-1">
                  {language === "hi" ? "हम क्या सेवाएं प्रदान करते हैं?" : "What We Provide"}
                </h3>
              </div>

              <div className="space-y-3">
                {whatWeProvide.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-navy-950/70 border border-navy-800 flex items-start gap-3">
                    <span className="text-xs font-mono font-bold text-accent-orange mt-0.5">
                      0{idx + 1}.
                    </span>
                    <span className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deliverables */}
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono font-bold text-accent-orange uppercase tracking-wider">
                  TANGIBLE OUTPUTS
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white font-hindi mt-1">
                  {language === "hi" ? "प्रमुख डिलिवरेबल्स (आउटपुट्स)" : "Key Deliverables"}
                </h3>
              </div>

              <div className="space-y-3">
                {deliverables.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-navy-850/80 border border-navy-700/80 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Workflow (4 Steps) */}
      <section className="py-16 lg:py-24 bg-navy-950 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-mono font-bold text-accent-gold uppercase tracking-wider">
              OPERATIONAL LIFECYCLE
            </span>
            <h3 className="text-3xl sm:text-4xl font-black text-white font-hindi">
              {language === "hi" ? "चरणबद्ध कार्यप्रणाली (Workflow)" : "Step-by-Step Workflow"}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {service.workflow.map((w, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-navy-900/80 border border-navy-800 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-accent-orange px-2 py-0.5 rounded bg-navy-950 border border-navy-800 inline-block mb-4">
                    STEP {w.step}
                  </span>
                  <h4 className="text-base font-bold text-white font-hindi mb-2">
                    {language === "hi" ? w.titleHi : w.titleEn}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {language === "hi" ? w.descHi : w.descEn}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-navy-800 text-[10px] text-slate-500 font-mono">
                  PHASE {idx + 1} OF 4
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. Compliance Note Panel */}
      <section className="py-12 bg-navy-900 border-b border-navy-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-navy-950 via-navy-850 to-navy-950 border border-navy-700 flex flex-col sm:flex-row items-start gap-5">
            <div className="w-12 h-12 rounded-xl bg-navy-900 border border-accent-orange/40 flex items-center justify-center text-accent-orange flex-shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h4 className="text-base font-bold text-white font-hindi">
                {language === "hi" ? "वैधानिक एवं निर्वाचन नियम अनुपालन सूचना" : "Regulatory & Election Compliance Mandate"}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {compliance}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQs Section */}
      <section className="py-16 lg:py-24 bg-navy-950 border-b border-navy-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12 space-y-2">
            <span className="text-xs font-mono font-bold text-accent-orange uppercase tracking-wider">
              QUESTIONS & CLARIFICATIONS
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white font-hindi">
              {language === "hi" ? "इस सेवा से संबंधित मुख्य प्रश्न" : "Questions Regarding This Vertical"}
            </h3>
          </div>

          <div className="space-y-3">
            {service.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="rounded-xl border border-navy-800 bg-navy-900/90 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-bold text-white font-hindi">
                      {language === "hi" ? faq.qHi : faq.qEn}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? "rotate-180 text-accent-orange" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-navy-800/80">
                      <p>{language === "hi" ? faq.aHi : faq.aEn}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 10. Contact CTA */}
      <section className="py-16 lg:py-20 bg-gradient-to-b from-navy-900 to-navy-950 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-hindi">
            {language === "hi" ? (
              <>
                अपनी विधानसभा में <span className="text-accent-orange">{title}</span> शुरू करें
              </>
            ) : (
              <>
                Deploy <span className="text-accent-orange">{title}</span> in Your Constituency
              </>
            )}
          </h3>

          <p className="text-sm sm:text-base text-slate-300">
            {language === "hi"
              ? "हमारी रणनीति टीम आपके विधानसभा क्षेत्र की प्राथमिकताओं के अनुसार कस्टमाइज्ड कार्ययोजना तैयार करेगी।"
              : "Our senior strategists will structure a tailored operational blueprint calibrated to your constituency demographics."}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => setModalOpen(true)}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-accent-orange to-accent-orange-hover text-white font-bold text-sm shadow-xl shadow-accent-orange/20 transition-all hover:brightness-110 cursor-pointer"
            >
              <span>{language === "hi" ? "परामर्श सत्र प्रारंभ करें" : "Initiate Consultation"}</span>
            </button>

            <a
              href="tel:9621762121"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300 dark:bg-navy-800 dark:hover:bg-navy-750 dark:text-white dark:border-navy-700 font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <PhoneCall className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{language === "hi" ? "हेल्पलाइन: 9621762121" : "Helpline: 9621762121"}</span>
            </a>
          </div>
        </div>
      </section>

      <EnquiryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} defaultService={title} />
    </div>
  );
}
