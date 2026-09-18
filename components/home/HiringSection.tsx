"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useContent } from "@/context/ContentContext";
import { defaultHiring, JobPositionItem } from "@/lib/content-schema";
import {
  Briefcase,
  Mail,
  Phone,
  MessageSquare,
  MapPin,
  CheckCircle2,
  Send,
  ExternalLink,
  Copy,
  Check,
  X,
  Sparkles,
  ArrowRight,
  User,
  FileText
} from "lucide-react";

export default function HiringSection() {
  const { language } = useLanguage();
  const { homepage } = useContent();

  const hiring = homepage?.hiring || defaultHiring;
  const positions = hiring.positions && hiring.positions.length > 0 ? hiring.positions : defaultHiring.positions;
  const offers = language === "hi" 
    ? (hiring.offersHi && hiring.offersHi.length > 0 ? hiring.offersHi : defaultHiring.offersHi)
    : (hiring.offersEn && hiring.offersEn.length > 0 ? hiring.offersEn : defaultHiring.offersEn);

  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<JobPositionItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Application form state
  const [applicantName, setApplicantName] = useState("");
  const [applicantPhone, setApplicantPhone] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicantExp, setApplicantExp] = useState("Fresher");
  const [applicantNote, setApplicantNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEmail(key);
    setTimeout(() => setCopiedEmail(null), 2500);
  };

  const openApplyModal = (pos?: JobPositionItem) => {
    if (pos) {
      setSelectedPosition(pos);
    } else if (positions.length > 0) {
      setSelectedPosition(positions[0]);
    }
    setSubmitted(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOnlineSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantPhone) return;

    setSubmitting(true);
    try {
      const positionTitle = selectedPosition ? selectedPosition.title : "General Application";
      const payload = {
        name: applicantName,
        phone: applicantPhone,
        email: applicantEmail,
        constituency: "Kanpur HQ",
        district: "Kanpur",
        role: "Job Applicant",
        servicesNeeded: [`Job: ${positionTitle}`, `Exp: ${applicantExp}`],
        timeline: "Immediate Joining",
        message: `[JOB APPLICATION FOR: ${positionTitle}]\nExperience: ${applicantExp}\nPortfolio/Notes: ${applicantNote}`
      };

      await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      setSubmitted(true);
    } catch (err) {
      console.error("Submission failed:", err);
      // Still show success fallback
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const getEmailSubject = (posTitle: string) => {
    return encodeURIComponent(`Job Application: ${posTitle} - Workforce Infotech`);
  };

  const getEmailBody = (posTitle: string) => {
    return encodeURIComponent(
      `Dear HR Team,\n\nI wish to apply for the position of "${posTitle}" at Workforce Infotech Pvt. Ltd.\n\nName: ${applicantName || "[Your Name]"}\nContact: ${applicantPhone || "[Your Phone]"}\nEmail: ${applicantEmail || "[Your Email]"}\nExperience: ${applicantExp}\n\nPlease find attached my CV / resume.\n\nThank you.`
    );
  };

  const getWhatsAppLink = (posTitle: string) => {
    const text = encodeURIComponent(
      `Hello Workforce Infotech Team,\n\nI would like to apply for the position of *${posTitle}* in Kanpur.\n\nName: ${applicantName || ""}\nPhone: ${applicantPhone || ""}\nExperience: ${applicantExp}\nNotes: ${applicantNote || ""}`
    );
    return `https://wa.me/91${hiring.phone}?text=${text}`;
  };

  return (
    <section id="careers" className="py-20 lg:py-24 bg-slate-50/80 dark:bg-navy-950 border-b border-slate-200 dark:border-navy-800 relative overflow-hidden transition-colors">
      {/* Background Ambience Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-orange/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-royal-blue/15 dark:bg-royal-blue/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a08_1px,transparent_1px),linear-gradient(to_bottom,#0f172a08_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b08_1px,transparent_1px),linear-gradient(to_bottom,#1e293b08_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-navy-900/90 border border-accent-orange/30 dark:border-accent-orange/40 text-accent-orange text-xs font-bold uppercase tracking-wider shadow-sm dark:shadow-lg dark:shadow-accent-orange/10">
            <Briefcase className="w-3.5 h-3.5 text-accent-orange animate-pulse" />
            <span>{language === "hi" ? hiring.badgeHi : (hiring.badgeEn || hiring.badgeHi)}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white font-hindi tracking-tight leading-tight">
            {language === "hi" ? hiring.headingHi : (hiring.headingEn || hiring.headingHi)}
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-hindi leading-relaxed">
            {language === "hi" ? hiring.taglineHi : (hiring.taglineEn || hiring.taglineHi)}
          </p>
        </div>

        {/* Direct Action & Email Apply Banner */}
        <div className="mb-16 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 border border-accent-orange/40 shadow-2xl shadow-navy-950/20 relative overflow-hidden keep-dark">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-orange/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                <MapPin className="w-3.5 h-3.5" />
                <span>{hiring.location}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-hindi">
                {language === "hi" ? "सीधे ईमेल या व्हाट्सएप द्वारा आवेदन भेजें" : "Direct Email & WhatsApp Application"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-hindi">
                {language === "hi" ? hiring.eligibilityNoteHi : (hiring.eligibilityNoteEn || hiring.eligibilityNoteHi)}
              </p>
            </div>

            {/* Direct Contact Buttons */}
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              {/* Email 1: sales@workforceinfotech.com */}
              <div className="relative group flex-1 sm:flex-initial">
                <a
                  href={`mailto:${hiring.email1}?subject=${encodeURIComponent("Job Application - Workforce Infotech")}`}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-royal-blue to-royal-blue-hover text-white text-xs sm:text-sm font-bold shadow-lg hover:shadow-royal-blue/30 transition-all border border-sky-400/30 w-full"
                >
                  <Mail className="w-4 h-4 text-accent-gold" />
                  <span>{hiring.email1}</span>
                </a>
                <button
                  type="button"
                  onClick={() => copyToClipboard(hiring.email1, "email1")}
                  className="absolute -top-2 -right-2 p-1.5 rounded-lg bg-navy-800 border border-navy-700 text-slate-300 hover:text-white hover:bg-navy-700 shadow transition cursor-pointer"
                  title="Copy Email"
                >
                  {copiedEmail === "email1" ? (
                    <Check className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
              </div>

              {/* Email 2: election@workforceinfotech.com */}
              <div className="relative group flex-1 sm:flex-initial">
                <a
                  href={`mailto:${hiring.email2}?subject=${encodeURIComponent("Job Application - Workforce Infotech")}`}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-navy-800 hover:bg-navy-750 text-white text-xs sm:text-sm font-bold shadow-lg transition-all border border-navy-700 hover:border-accent-orange/40 w-full"
                >
                  <Mail className="w-4 h-4 text-accent-orange" />
                  <span>{hiring.email2}</span>
                </a>
                <button
                  type="button"
                  onClick={() => copyToClipboard(hiring.email2, "email2")}
                  className="absolute -top-2 -right-2 p-1.5 rounded-lg bg-navy-800 border border-navy-700 text-slate-300 hover:text-white hover:bg-navy-700 shadow transition cursor-pointer"
                  title="Copy Email"
                >
                  {copiedEmail === "email2" ? (
                    <Check className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
              </div>

              {/* Call / WhatsApp */}
              <a
                href={`https://wa.me/91${hiring.phone}?text=${encodeURIComponent("Hi, I want to apply for a job position at Workforce Infotech.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold shadow-lg hover:shadow-emerald-600/30 transition-all border border-emerald-500/40 flex-1 sm:flex-initial"
              >
                <MessageSquare className="w-4 h-4 text-emerald-200" />
                <span>WhatsApp: {hiring.phone}</span>
              </a>

              {/* Instant Apply Modal Trigger */}
              <button
                type="button"
                onClick={() => openApplyModal()}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-accent-orange to-accent-orange-hover hover:brightness-110 text-white text-xs sm:text-sm font-bold shadow-lg shadow-accent-orange/25 transition-all cursor-pointer flex-1 sm:flex-initial border border-accent-orange"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>{language === "hi" ? "त्वरित आवेदन भरें" : "Quick Apply Form"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* 7 Open Positions Section */}
        <div className="space-y-8 mb-16 text-left">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-navy-800 pb-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-accent-orange dark:text-accent-gold flex items-center gap-2 font-bold">
                <span>📌 CURRENT OPENINGS</span>
                <span className="w-2 h-2 rounded-full bg-accent-orange dark:bg-accent-gold animate-ping" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-hindi mt-1">
                {language === "hi" ? "उपलब्ध पद (Open Positions)" : "Explore Open Positions"}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
              {language === "hi" 
                ? "कानपुर स्थित हमारे आधुनिक कॉर्पोरेट व मीडिया स्टूडियो में इन पदों पर तत्काल आवश्यकता है।"
                : "Immediate openings at our Kanpur corporate office and media production facility."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {positions.map((pos, idx) => (
              <div
                key={pos.id || `pos-${idx}`}
                className="rounded-2xl bg-white dark:bg-gradient-to-b dark:from-navy-900 dark:to-navy-920 border border-slate-200/90 dark:border-navy-800 p-6 flex flex-col justify-between shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] dark:shadow-none hover:border-accent-orange/80 dark:hover:border-accent-orange/60 hover:shadow-xl hover:shadow-accent-orange/10 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-accent-orange/5 rounded-full blur-xl group-hover:bg-accent-orange/15 transition-all pointer-events-none" />

                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-navy-800/80 border border-slate-200 dark:border-navy-700 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-sm group-hover:border-accent-orange/40">
                      {pos.icon}
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-navy-700/60">
                      {pos.category}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-accent-orange transition-colors font-hindi">
                      {pos.title}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 mt-2.5">
                      <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-navy-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-navy-800 flex items-center gap-1">
                        <MapPin className="w-2.5 h-2.5 text-accent-orange dark:text-accent-gold flex-shrink-0" />
                        {pos.location}
                      </span>
                      <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-navy-950 text-emerald-700 dark:text-emerald-400 border border-emerald-200/80 dark:border-navy-800">
                        {pos.type}
                      </span>
                      <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-sky-50 dark:bg-navy-950 text-sky-700 dark:text-sky-300 border border-sky-200/80 dark:border-navy-800">
                        {pos.experience}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-navy-800/80 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openApplyModal(pos)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-accent-orange to-accent-orange-hover hover:brightness-110 text-white font-bold text-xs shadow-md shadow-accent-orange/25 transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-accent-orange group/btn"
                  >
                    <span className="text-white font-bold tracking-wide">{language === "hi" ? "आवेदन करें" : "Apply Now"}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white transition-transform group-hover/btn:translate-x-0.5" />
                  </button>

                  <a
                    href={`mailto:${hiring.email1}?subject=${getEmailSubject(pos.title)}`}
                    title="Direct Email Application"
                    className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-navy-800 dark:hover:bg-navy-750 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white border border-slate-200 dark:border-navy-700 transition shadow-sm flex items-center justify-center"
                  >
                    <Mail className="w-4 h-4" />
                  </a>

                  <a
                    href={getWhatsAppLink(pos.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Direct WhatsApp"
                    className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-600 shadow-sm transition flex items-center justify-center"
                  >
                    <MessageSquare className="w-4 h-4 text-white" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What We Offer Strip */}
        <div className="mb-16 p-8 sm:p-10 rounded-3xl bg-white dark:bg-navy-900/60 border border-slate-200 dark:border-navy-800 text-left space-y-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-500/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-sm">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-hindi">
                {language === "hi" ? "✅ क्या सुविधाएँ व अवसर मिलेंगे (What We Offer)" : "✅ What We Offer"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-hindi">
                {language === "hi" ? "वर्कफोर्स इन्फोटेक परिवार से जुड़ने पर आपको मिलता है:" : "Joining Workforce Infotech comes with distinctive benefits:"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {offers.map((offer, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-950/80 border border-slate-200/90 dark:border-navy-800/90 flex items-start gap-3 hover:border-emerald-500/40 transition-all shadow-sm hover:shadow-md"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-500/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 leading-snug">
                  {offer}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Tagline & Brand Strip */}
        <div className="text-center space-y-4 pt-6 border-t border-slate-200 dark:border-navy-800/60 max-w-4xl mx-auto">
          <div className="space-y-1">
            <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-wide uppercase font-hindi">
              Workforce Infotech Pvt. Ltd.
            </h4>
            <p className="text-xs sm:text-sm text-accent-orange dark:text-accent-gold font-medium italic">
              Innovating Digital Solutions • Creating Career Opportunities
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] font-mono text-slate-500 dark:text-slate-400">
            <span>#Hiring</span>
            <span>•</span>
            <span>#KanpurJobs</span>
            <span>•</span>
            <span>#SocialMediaJobs</span>
            <span>•</span>
            <span>#GraphicDesigner</span>
            <span>•</span>
            <span>#VideoEditor</span>
            <span>•</span>
            <span>#Cameraman</span>
            <span>•</span>
            <span>#TeleCaller</span>
            <span>•</span>
            <span>#ITSales</span>
            <span>•</span>
            <span>#HotelManager</span>
            <span>•</span>
            <span>#CareerOpportunity</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          INTERACTIVE QUICK APPLY MODAL
          ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm animate-fade-in text-left">
          <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden max-h-[92vh] overflow-y-auto">
            
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-navy-800 dark:hover:bg-navy-700 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-10 space-y-5">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-500 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-hindi">
                  {language === "hi" ? "आवेदन सफलतापूर्वक प्राप्त हुआ!" : "Application Received!"}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 font-hindi max-w-md mx-auto">
                  {language === "hi"
                    ? "धन्यवाद! हमारी एचआर टीम आपके विवरण की समीक्षा करके शीघ्र ही आपसे संपर्क करेगी।"
                    : "Thank you! Our recruitment team has received your information and will reach out shortly."}
                </p>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={`mailto:${hiring.email1}?subject=${getEmailSubject(selectedPosition?.title || "Application")}&body=${getEmailBody(selectedPosition?.title || "Application")}`}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-royal-blue to-royal-blue-hover text-white text-xs font-bold flex items-center gap-2 shadow-md"
                  >
                    <Mail className="w-4 h-4" />
                    <span>ईमेल पर रिज्यूमे भेजें (Attach CV)</span>
                  </a>
                  <button
                    onClick={closeModal}
                    className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-navy-800 dark:hover:bg-navy-750 text-slate-700 dark:text-slate-300 text-xs font-bold cursor-pointer transition border border-slate-200 dark:border-navy-700"
                  >
                    बंद करें (Close)
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleOnlineSubmit} className="space-y-5">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-orange/15 text-accent-orange text-xs font-bold mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>त्वरित आवेदन (Quick Job Application)</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-hindi">
                    {selectedPosition ? selectedPosition.title : "Workforce Infotech Careers"}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-hindi">
                    स्थान: कानपुर, उत्तर प्रदेश • फ्रेशर्स व अनुभवी दोनों आमंत्रित हैं
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Position Select */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      पद का चयन करें (Select Position) *
                    </label>
                    <select
                      value={selectedPosition?.id || ""}
                      onChange={(e) => {
                        const found = positions.find((p) => p.id === e.target.value);
                        if (found) setSelectedPosition(found);
                      }}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-300 dark:border-navy-700 text-sm text-slate-900 dark:text-white focus:border-accent-orange outline-none"
                    >
                      {positions.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.icon} {p.title} ({p.category})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      पूरा नाम (Full Name) *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={applicantName}
                        onChange={(e) => setApplicantName(e.target.value)}
                        placeholder="आपका शुभ नाम..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-300 dark:border-navy-700 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-accent-orange outline-none"
                      />
                    </div>
                  </div>

                  {/* Phone & Email in 2 columns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        मोबाइल / व्हाट्सएप नंबर *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          value={applicantPhone}
                          onChange={(e) => setApplicantPhone(e.target.value)}
                          placeholder="10 अंकों का फोन नंबर"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-300 dark:border-navy-700 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-accent-orange outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        ईमेल पता (Email Address)
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          value={applicantEmail}
                          onChange={(e) => setApplicantEmail(e.target.value)}
                          placeholder="your.name@gmail.com"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-300 dark:border-navy-700 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-accent-orange outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Experience */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      कार्य अनुभव (Experience Level)
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {["Fresher", "1-2 Years", "3+ Years"].map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setApplicantExp(lvl)}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border transition text-center cursor-pointer ${
                            applicantExp === lvl
                              ? "bg-accent-orange border-accent-orange text-white shadow-sm"
                              : "bg-slate-100 dark:bg-navy-950 border-slate-300 dark:border-navy-700 text-slate-700 dark:text-slate-400 hover:bg-slate-200 dark:hover:text-white"
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Portfolio / Note */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      पोर्टफोलियो / रिज्यूमे लिंक अथवा संक्षिप्त परिचय (Notes / Link)
                    </label>
                    <textarea
                      rows={2}
                      value={applicantNote}
                      onChange={(e) => setApplicantNote(e.target.value)}
                      placeholder="गूगल ड्राइव लिंक, यूट्यूब/सोशल लिंक अथवा संक्षिप्त परिचय..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-300 dark:border-navy-700 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-accent-orange outline-none resize-none"
                    />
                  </div>
                </div>

                {/* Submit Options */}
                <div className="pt-2 space-y-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-accent-orange to-accent-orange-hover hover:brightness-110 text-white text-sm font-bold shadow-lg shadow-accent-orange/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 border border-accent-orange"
                  >
                    {submitting ? (
                      <span>भेजा जा रहा है...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>ऑनलाइन सबमिट करें (Submit Application)</span>
                      </>
                    )}
                  </button>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <a
                      href={`mailto:${hiring.email1}?subject=${getEmailSubject(selectedPosition?.title || "Job Application")}&body=${getEmailBody(selectedPosition?.title || "Job Application")}`}
                      className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-navy-800 dark:hover:bg-navy-750 text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white border border-slate-300 dark:border-navy-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow-sm"
                    >
                      <Mail className="w-3.5 h-3.5 text-accent-orange dark:text-accent-gold" />
                      <span>ईमेल खोलें (Email CV)</span>
                    </a>

                    <a
                      href={getWhatsAppLink(selectedPosition?.title || "Job Application")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-600 text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow-sm"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-white" />
                      <span>व्हाट्सएप पर भेजें</span>
                    </a>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
