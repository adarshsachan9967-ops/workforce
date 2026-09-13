"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useContent } from "@/context/ContentContext";
import { servicesData } from "@/data/servicesData";
import {
  Phone,
  Mail,
  Globe,
  MapPin,
  Send,
  Shield,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Clock
} from "lucide-react";

export default function ContactPage() {
  const { t, language } = useLanguage();
  const { settings, pages } = useContent();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    assembly: "",
    district: "",
    services: [] as string[],
    campaignRequirement: "",
    preferredTime: "किसी भी समय",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleServiceToggle = (serviceTitle: string) => {
    setFormData((prev) => {
      const exists = prev.services.includes(serviceTitle);
      if (exists) {
        return { ...prev, services: prev.services.filter((s) => s !== serviceTitle) };
      } else {
        return { ...prev, services: [...prev.services, serviceTitle] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "त्रुटि: कृपया पुनः प्रयास करें।");
      }

      router.push("/thank-you");
    } catch (err: any) {
      setError(err.message || "सबमिट करने में त्रुटि हुई। कृपया पुनः प्रयास करें।");
    } finally {
      setLoading(false);
    }
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
              <span className="text-accent-orange font-bold">CONTACT & CONSULTATION</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight font-hindi leading-tight">
              {language === "hi"
                ? (pages?.contact?.heading || "अपने चुनाव अभियान पर चर्चा करें।")
                : "Discuss Your Campaign Strategy."}
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed">
              {language === "hi"
                ? (pages?.contact?.sub || "अपने विधानसभा क्षेत्र, campaign requirements और आवश्यक सेवाओं की जानकारी साझा करें। हमारी वरिष्ठ रणनीति टीम आपकी आवश्यकता के अनुसार आगे की चर्चा करेगी।")
                : "Share your constituency focus and desired verticals. Our senior campaign directorship will arrange a private strategic consultation within 24 hours."}
            </p>
          </div>
        </div>
      </section>

      {/* Main Form & Contact Info Section */}
      <section className="py-16 lg:py-24 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Col: Contact Information Cards */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-accent-orange tracking-wider uppercase">
                  DIRECT CHANNELS
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white font-hindi">
                  {pages?.contact?.directDeskTitle || "आधिकारिक संपर्क सूत्र"}
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {pages?.contact?.directDeskSub || "विधानसभा चुनाव 2027 के संदर्भ में किसी भी त्वरित परामर्श या वार रूम विजिट के लिए हमारे आधिकारिक नंबरों पर संपर्क करें।"}
                </p>
              </div>

              <div className="space-y-4">
                {/* Phone 1 */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-navy-900/80 border border-slate-200 dark:border-navy-800 shadow-sm flex items-start gap-4 hover:border-accent-orange/50 transition">
                  <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 flex items-center justify-center text-accent-orange flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono block">
                      हेल्पलाइन 1 (कॉल व व्हाट्सएप)
                    </span>
                    <a href="tel:9621762121" className="text-base sm:text-lg font-bold text-navy-950 dark:text-white hover:text-accent-orange font-mono block mt-0.5 transition-colors">
                      +91 96217 62121
                    </a>
                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                      उपलब्ध 24/7 चुनावी सहायता
                    </span>
                  </div>
                </div>

                {/* Phone 2 & 3 */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-navy-900/80 border border-slate-200 dark:border-navy-800 shadow-sm flex items-start gap-4 hover:border-accent-orange/50 transition">
                  <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 flex items-center justify-center text-accent-gold flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono block">
                      हेल्पलाइन 2 & वार रूम डेस्क
                    </span>
                    <a href="tel:7839922507" className="text-base sm:text-lg font-bold text-navy-950 dark:text-white hover:text-accent-orange font-mono block mt-0.5 transition-colors">
                      +91 78399 22507
                    </a>
                    <a href="tel:9336949111" className="text-xs text-slate-500 dark:text-slate-400 hover:text-white font-mono block mt-0.5">
                      अतिरिक्त लाइन: +91 93369 49111
                    </a>
                  </div>
                </div>

                {/* Google Location 1: Kanpur Head Office */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-navy-900/80 border border-slate-200 dark:border-navy-800 shadow-sm space-y-2 hover:border-accent-orange/50 transition text-left">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-accent-gold/10 border border-accent-gold/30 flex items-center justify-center text-accent-gold">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-navy-950 dark:text-white block font-hindi">
                          1st: हेड ऑफिस (कानपुर H.O.)
                        </span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400">
                          Workforce Infotech Pvt Ltd - An Election Management Company
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-hindi">
                    117/Q/710, शारदा नगर, काकादेव, कानपुर, उत्तर प्रदेश - 208025
                  </p>
                  <a
                    href="https://share.google/BUJO7DKz5m14jQsAi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-100 dark:bg-navy-950 hover:bg-accent-orange hover:text-white text-accent-orange dark:text-accent-gold text-xs font-semibold transition-all border border-slate-200 dark:border-navy-700"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>गूगल लोकेशन देखें व दिशा-निर्देश प्राप्त करें (Google Map ↗)</span>
                  </a>
                </div>

                {/* Google Location 2: Lucknow Branch Office */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-navy-900/80 border border-slate-200 dark:border-navy-800 shadow-sm space-y-2 hover:border-accent-orange/50 transition text-left">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-navy-950 dark:text-white block font-hindi">
                          2nd: ब्रांच ऑफिस एवं वार रूम (लखनऊ B.O.)
                        </span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400">
                          Workforce Infotech Pvt Ltd - Election Management Company
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-hindi">
                    11th Floor, Summit Building, गोमती नगर, लखनऊ, उत्तर प्रदेश - 226010
                  </p>
                  <a
                    href="https://share.google/lhxxqqHpoxBeYkLOO"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-100 dark:bg-navy-950 hover:bg-accent-orange hover:text-white text-emerald-600 dark:text-emerald-400 text-xs font-semibold transition-all border border-slate-200 dark:border-navy-700"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>गूगल लोकेशन देखें व दिशा-निर्देश प्राप्त करें (Google Map ↗)</span>
                  </a>
                </div>

                {/* Social Channels Strip */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-navy-900/80 border border-slate-200 dark:border-navy-800 shadow-sm space-y-3 text-left">
                  <span className="text-xs font-bold text-navy-950 dark:text-white block font-hindi">
                    आधिकारिक डिजिटल चैनल्स
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href="https://www.facebook.com/workforceInfotechpvtltd"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-slate-100 dark:bg-navy-950 hover:bg-[#1877F2] hover:text-white text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-navy-700 flex items-center gap-2 text-xs font-semibold transition-all"
                    >
                      <svg className="w-4 h-4 fill-current text-[#1877F2] group-hover:text-white" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      <span>Facebook</span>
                    </a>

                    <a
                      href="https://youtu.be/jVrADlfb3os?si=7cEKMDZ81Do_fTuP"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-slate-100 dark:bg-navy-950 hover:bg-[#FF0000] hover:text-white text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-navy-700 flex items-center gap-2 text-xs font-semibold transition-all"
                    >
                      <svg className="w-4 h-4 fill-current text-[#FF0000] group-hover:text-white" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      <span>YouTube</span>
                    </a>
                  </div>
                </div>

                {/* Email & Website */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-white dark:bg-navy-900/80 border border-slate-200 dark:border-navy-800 text-xs">
                    <span className="text-[10px] text-slate-400 block font-mono">ईमेल</span>
                    <a href="mailto:contact@workforceinfotech.com" className="font-bold text-accent-gold truncate block mt-0.5">
                      contact@workforceinfotech.com
                    </a>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-navy-900/80 border border-slate-200 dark:border-navy-800 text-xs">
                    <span className="text-[10px] text-slate-400 block font-mono">वेबसाइट</span>
                    <a href="https://workforceinfotech.com" target="_blank" rel="noopener noreferrer" className="font-bold text-emerald-400 truncate block mt-0.5">
                      workforceinfotech.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Strict Confidentiality Guarantee */}
              <div className="p-4 rounded-xl bg-slate-100 dark:bg-navy-900/60 border border-slate-200 dark:border-navy-800 flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
                <Shield className="w-5 h-5 text-accent-gold flex-shrink-0" />
                <span>
                  साझा की गई सभी जानकारियां पूर्णतः गोपनीय रखी जाती हैं तथा किसी तीसरे पक्ष को कभी साझा नहीं की जाती हैं।
                </span>
              </div>
            </div>

            {/* Right Col: Comprehensive Consultation Form */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl bg-gradient-to-b from-navy-850 to-navy-950 border border-navy-700 p-6 sm:p-10 shadow-2xl text-left">
                
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white font-hindi">
                    {pages?.contact?.formTitle || t.forms.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    {pages?.contact?.formSub || t.forms.sub}
                  </p>
                  {pages?.contact?.confidentiality && (
                    <div className="mt-3 p-3 rounded-xl bg-navy-900/90 border border-navy-800 text-xs text-slate-300 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>{pages.contact.confidentiality}</span>
                    </div>
                  )}
                </div>

                {error && (
                  <div className="mb-6 p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs sm:text-sm flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400" />
                    <span>{error}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        {t.forms.fullName}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="उदा. रणविजय सिंह"
                        className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-navy-700 focus:border-accent-orange focus:ring-1 focus:ring-accent-orange text-white text-sm outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        {t.forms.phone}
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="10-अंकीय मोबाइल नंबर"
                        className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-navy-700 focus:border-accent-orange focus:ring-1 focus:ring-accent-orange text-white text-sm outline-none transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        {t.forms.assembly}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.assembly}
                        onChange={(e) => setFormData({ ...formData, assembly: e.target.value })}
                        placeholder="उदा. 172 - अयोध्या या सदर"
                        className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-navy-700 focus:border-accent-orange focus:ring-1 focus:ring-accent-orange text-white text-sm outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        {t.forms.district}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.district}
                        onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                        placeholder="उदा. लखनऊ, वाराणसी, गोरखपुर..."
                        className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-navy-700 focus:border-accent-orange focus:ring-1 focus:ring-accent-orange text-white text-sm outline-none transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      {t.forms.servicesRequired} (एक या अधिक चुनें)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-44 overflow-y-auto pr-1">
                      {servicesData.map((s) => {
                        const isSelected = formData.services.includes(s.titleHi) || formData.services.includes(s.titleEn);
                        return (
                          <button
                            type="button"
                            key={s.id}
                            onClick={() => handleServiceToggle(language === "hi" ? s.titleHi : s.titleEn)}
                            className={`text-left text-xs p-2.5 rounded-xl border transition-all cursor-pointer ${
                              isSelected
                                ? "bg-accent-orange/15 border-accent-orange text-accent-orange dark:text-accent-gold font-bold shadow-sm"
                                : "bg-slate-100 hover:bg-slate-200/80 border-slate-200 text-slate-700 dark:bg-navy-950 dark:border-navy-800 dark:text-slate-300 dark:hover:border-slate-500"
                            }`}
                          >
                            <span className="truncate block">{language === "hi" ? s.titleHi : s.titleEn}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        {t.forms.email}
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="email@domain.com"
                        className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-navy-700 focus:border-accent-orange text-white text-sm outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        {t.forms.preferredTime}
                      </label>
                      <select
                        value={formData.preferredTime}
                        onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-navy-700 focus:border-accent-orange text-white text-sm outline-none transition"
                      >
                        <option value="किसी भी समय">{t.forms.anyTime}</option>
                        <option value="प्रातः (9:00 AM - 12:00 PM)">{t.forms.morning}</option>
                        <option value="दोपहर (12:00 PM - 4:00 PM)">{t.forms.afternoon}</option>
                        <option value="शाम (4:00 PM - 8:00 PM)">{t.forms.evening}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      {t.forms.campaignRequirement}
                    </label>
                    <textarea
                      rows={2}
                      value={formData.campaignRequirement}
                      onChange={(e) => setFormData({ ...formData, campaignRequirement: e.target.value })}
                      placeholder="वर्तमान अभियान स्थिति, प्राथमिकता और अपेक्षित समय-सीमा..."
                      className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-navy-700 focus:border-accent-orange text-white text-sm outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      {t.forms.message}
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="कोई विशेष निर्देश या संदेश..."
                      className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-navy-700 focus:border-accent-orange text-white text-sm outline-none transition"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-accent-orange to-accent-orange-hover hover:brightness-110 text-white font-bold text-sm sm:text-base shadow-xl shadow-accent-orange/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      <span>{loading ? t.forms.submitting : t.forms.submit}</span>
                    </button>
                  </div>
                </form>

              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
