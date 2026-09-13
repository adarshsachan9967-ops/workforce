"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useContent } from "@/context/ContentContext";
import { servicesData } from "@/data/servicesData";
import { Shield, Phone, Mail, Globe, MapPin, ArrowUpRight, Lock } from "lucide-react";

export default function Footer() {
  const { t, language } = useLanguage();
  const { settings } = useContent();

  const brandName = settings.brandName || "WORKFORCE INFOTECH";
  const brandSuffix = settings.brandSuffix || "PVT. LTD.";
  const phone1 = settings.phone1 || "9621762121";
  const phone2 = settings.phone2 || "8467060042";
  const email = settings.email || "contact@workforceinfotech.com";
  const website = settings.website || "workforceinfotech.com";
  const websiteUrl = website.startsWith("http") ? website : `https://${website}`;
  const bio = language === "hi"
    ? (settings.footerBioHi || t.footer.desc)
    : (settings.footerBioEn || t.footer.desc);
  const compliance = language === "hi"
    ? (settings.complianceTextHi || t.footer.legalNote)
    : (settings.complianceTextEn || t.footer.legalNote);
  const copyright = settings.copyrightText || `© ${new Date().getFullYear()} ${brandName} ${brandSuffix}. ${t.footer.rights}`;

  return (
    <footer className="bg-gradient-to-b from-navy-900 via-navy-950 to-navy-950 border-t border-navy-800 text-slate-300 keep-dark">
      {/* Top Banner with Brand Stature */}
      <div className="border-b border-navy-800/80 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-navy-800 border border-accent-orange/40 flex items-center justify-center text-accent-orange">
                <Shield className="w-5 h-5 fill-accent-orange/15" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black tracking-wider text-white uppercase">
                {brandName} <span className="text-accent-orange">{brandSuffix}</span>
              </h3>
            </div>
            <p className="text-sm text-accent-gold font-medium">
              {language === "hi" ? settings.brandTaglineHi : settings.brandTaglineEn}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
            <span className="px-3 py-1.5 rounded-full bg-navy-800 border border-navy-700 text-slate-300">
              🚩 उत्तर प्रदेश विधानसभा चुनाव 2027
            </span>
            <span className="px-3 py-1.5 rounded-full bg-navy-800 border border-navy-700 text-slate-300">
              🏛️ 403 विधान सभा निर्वाचन क्षेत्र
            </span>
            <span className="px-3 py-1.5 rounded-full bg-navy-800 border border-navy-700 text-slate-300">
              ⚖️ ECI नियम-अनुरूप
            </span>
          </div>
        </div>
      </div>

      {/* Main Footer Links Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Summary */}
          <div className="lg:col-span-2 space-y-4">
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {bio}
            </p>
            <div className="p-4 rounded-xl bg-navy-900/60 border border-navy-800 text-xs space-y-2">
              <p className="text-accent-gold font-semibold tracking-wide">
                “{language === "hi" ? "आप जनता से जुड़िए, चुनाव प्रबंधन की जिम्मेदारी हमें दीजिए।" : "You connect with the people, entrust campaign management to us."}”
              </p>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                {language === "hi"
                  ? "उम्मीदवार और संगठन केवल जनसंपर्क और चुनावी विजन पर ध्यान दें, सभी संगठनात्मक, तकनीकी, डिजिटल और बूथ-स्तरीय ऑपरेशंस हम संभालते हैं।"
                  : "Candidates and campaign teams focus on public contact and voter connect, while we execute all strategic, digital, booth, and telemetry operations."}
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              {settings.facebookUrl && (
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1.5 rounded-lg bg-navy-800 hover:bg-[#1877F2] text-slate-300 hover:text-white border border-navy-700 flex items-center gap-1.5 text-xs transition-all"
                  aria-label="Official Facebook Page"
                  title="Facebook Page"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Facebook</span>
                </a>
              )}

              {settings.youtubeUrl && (
                <a
                  href={settings.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1.5 rounded-lg bg-navy-800 hover:bg-[#FF0000] text-slate-300 hover:text-white border border-navy-700 flex items-center gap-1.5 text-xs transition-all"
                  aria-label="Official YouTube Channel"
                  title="YouTube Channel"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  <span>YouTube</span>
                </a>
              )}

              {website && (
                <a
                  href={websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-navy-800 hover:bg-royal-blue text-slate-300 hover:text-white border border-navy-700 flex items-center justify-center transition-all"
                  aria-label="Official Website"
                  title="Official Website"
                >
                  <Globe className="w-3.5 h-3.5" />
                </a>
              )}

              <Link
                href="/admin"
                className="p-2 rounded-lg bg-navy-800 hover:bg-navy-700 text-slate-400 hover:text-accent-gold border border-navy-700 flex items-center justify-center transition-all"
                title="Admin Control Center"
              >
                <Lock className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Col 2: Services & Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-orange"></span>
              <span>{t.footer.servicesCol}</span>
            </h4>
            <ul className="space-y-2 text-xs">
              {servicesData.slice(0, 6).map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-slate-400 hover:text-accent-gold transition-colors block py-0.5"
                  >
                    {language === "hi" ? s.titleHi : s.titleEn}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/services"
                  className="text-accent-orange hover:underline font-semibold flex items-center gap-1"
                >
                  <span>{t.nav.allServices}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
              <li className="pt-1">
                <Link
                  href="/gallery"
                  className="text-accent-gold hover:underline font-semibold flex items-center gap-1"
                >
                  <span>📷 {language === "hi" ? "गैलरी (26+ तस्वीरें)" : "Gallery (26+ Photos)"}</span>
                </Link>
              </li>
              <li className="pt-1">
                <a
                  href="/docs/Profile-Election-Management-Company-2027.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="text-emerald-400 hover:underline font-semibold flex items-center gap-1"
                >
                  <span>📄 {language === "hi" ? "कंपनी प्रोफाइल (PDF)" : "Company Profile (PDF)"}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources & Contact */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>{t.footer.contactCol}</span>
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-accent-orange flex-shrink-0 mt-0.5" />
                <div>
                  <a href={`tel:${phone1}`} className="hover:text-white font-medium block font-mono">
                    +91 {phone1}
                  </a>
                  <a href={`tel:${phone2}`} className="hover:text-white font-medium block mt-0.5 font-mono">
                    +91 {phone2}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-accent-gold flex-shrink-0 mt-0.5" />
                <a href={`mailto:${email}`} className="hover:text-white truncate block">
                  {email}
                </a>
              </div>

              {/* Head Office (Kanpur) with Google Map Link */}
              <div className="p-2.5 rounded-xl bg-navy-900/80 border border-navy-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-accent-gold font-bold text-[11px]">हेड ऑफिस (कानपुर H.O.):</span>
                  <a
                    href="https://share.google/BUJO7DKz5m14jQsAi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-sky-400 hover:underline font-semibold flex items-center gap-1"
                  >
                    <MapPin className="w-3 h-3 text-sky-400" />
                    <span>Google Map ↗</span>
                  </a>
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">
                  117/Q/710, शारदा नगर, काकादेव, कानपुर, उ.प्र.
                </p>
              </div>

              {/* Branch Office (Lucknow) with Google Map Link */}
              <div className="p-2.5 rounded-xl bg-navy-900/80 border border-navy-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-emerald-400 font-bold text-[11px]">ब्रांच ऑफिस व वार रूम (लखनऊ B.O.):</span>
                  <a
                    href="https://share.google/lhxxqqHpoxBeYkLOO"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-sky-400 hover:underline font-semibold flex items-center gap-1"
                  >
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    <span>Google Map ↗</span>
                  </a>
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">
                  11th Floor, Summit Building, गोमती नगर, लखनऊ, उ.प्र.
                </p>
              </div>

              <div className="pt-2 border-t border-navy-800 space-y-1 text-[11px] text-slate-400">
                <Link href="/privacy-policy" className="hover:text-accent-gold block">
                  {language === "hi" ? "गोपनीयता नीति (Privacy Policy)" : "Privacy Policy"}
                </Link>
                <Link href="/terms" className="hover:text-accent-gold block">
                  {language === "hi" ? "नियम व शर्तें (Terms & Conditions)" : "Terms & Conditions"}
                </Link>
                <Link href="/faq" className="hover:text-accent-gold block">
                  {language === "hi" ? "अक्सर पूछे जाने वाले प्रश्न (FAQ)" : "Frequently Asked Questions"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance & Copyright Disclaimer */}
      <div className="border-t border-navy-800/80 bg-navy-950 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-slate-500">
          <div>
            {copyright}
          </div>
          <div className="text-[11px] max-w-xl text-slate-400 font-normal">
            {compliance}
          </div>
        </div>
      </div>
    </footer>
  );
}
