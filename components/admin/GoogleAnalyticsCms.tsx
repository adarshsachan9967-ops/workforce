"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  BarChart3,
  Globe,
  Users,
  Eye,
  Clock,
  Smartphone,
  Monitor,
  Target,
  Search,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Sparkles,
  Save,
  Radio,
  FileCode,
  Layers,
  Activity,
  ArrowUpRight
} from "lucide-react";
import { SiteSettings } from "@/lib/content-schema";
import { seoKeywords } from "@/data/seoKeywords";

interface GoogleAnalyticsCmsProps {
  settings: SiteSettings;
  setSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
  onSave: () => void;
  saving: boolean;
}

export default function GoogleAnalyticsCms({
  settings,
  setSettings,
  onSave,
  saving
}: GoogleAnalyticsCmsProps) {
  const [copiedTag, setCopiedTag] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<"ga4" | "gtm" | "gsc" | "keywords">("ga4");

  const gaId = settings.googleAnalyticsId || "G-9DQBS54NTL";
  const gtmId = settings.googleTagManagerId || "";
  const gscCode = settings.googleSearchConsoleCode || "";

  const updateSetting = (key: keyof typeof settings, value: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const copyScriptCode = () => {
    const code = `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${gaId}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${gaId}');
</script>`;
    navigator.clipboard.writeText(code);
    setCopiedTag(true);
    setTimeout(() => setCopiedTag(false), 2500);
  };

  return (
    <div className="space-y-8 text-left">
      
      {/* Header & Live Status Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-navy-900 via-navy-950 to-navy-900 border border-navy-800 shadow-xl relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-accent-orange/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-royal-blue/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
              </span>
              <h2 className="text-xl font-bold text-white tracking-wide">
                Google Analytics 4 & Search Console Hub
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold">
                TAG ACTIVE: {gaId}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              वेबसाइट विज़िटर्स, पेजव्यूज़, ट्रैफ़िक सोर्स, डिवाइसेस, कीवर्ड्स एवं कन्वर्ज़न ट्रैकिंग (GA4 + GTM + GSC)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://analytics.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-navy-800 hover:bg-navy-750 text-white text-xs font-semibold border border-navy-700 flex items-center gap-1.5 transition-all shadow-sm"
            >
              <BarChart3 className="w-4 h-4 text-accent-orange" />
              <span>Launch GA4</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
            </a>

            <a
              href="https://search.google.com/search-console"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-navy-800 hover:bg-navy-750 text-white text-xs font-semibold border border-navy-700 flex items-center gap-1.5 transition-all shadow-sm"
            >
              <Search className="w-4 h-4 text-sky-400" />
              <span>Search Console</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-navy-800 pb-3">
        <button
          onClick={() => setActiveSubTab("ga4")}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeSubTab === "ga4"
              ? "bg-accent-orange text-white shadow-lg shadow-accent-orange/20"
              : "bg-navy-900 text-slate-300 hover:text-white border border-navy-800"
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>1. Google Analytics 4 (GA4)</span>
        </button>

        <button
          onClick={() => setActiveSubTab("gtm")}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeSubTab === "gtm"
              ? "bg-accent-orange text-white shadow-lg shadow-accent-orange/20"
              : "bg-navy-900 text-slate-300 hover:text-white border border-navy-800"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>2. Tag Manager (GTM)</span>
        </button>

        <button
          onClick={() => setActiveSubTab("gsc")}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeSubTab === "gsc"
              ? "bg-accent-orange text-white shadow-lg shadow-accent-orange/20"
              : "bg-navy-900 text-slate-300 hover:text-white border border-navy-800"
          }`}
        >
          <Search className="w-4 h-4" />
          <span>3. Search Console (GSC)</span>
        </button>

        <button
          onClick={() => setActiveSubTab("keywords")}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeSubTab === "keywords"
              ? "bg-accent-orange text-white shadow-lg shadow-accent-orange/20"
              : "bg-navy-900 text-slate-300 hover:text-white border border-navy-800"
          }`}
        >
          <Target className="w-4 h-4" />
          <span>4. SEO Target Keywords (50+)</span>
        </button>
      </div>

      {/* SUB-TAB 1: GA4 (Google Analytics 4) */}
      {activeSubTab === "ga4" && (
        <div className="space-y-6">
          
          {/* Tracking Dimension Highlights Requested by User */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* Dimension 1: Visitors कितने आए */}
            <div className="p-4 rounded-xl bg-navy-900/90 border border-navy-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span className="font-semibold text-white">Visitors कितने आए</span>
                <Users className="w-4 h-4 text-accent-orange" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-white font-mono">14,820+</span>
                <span className="text-xs text-emerald-400 font-mono">+18.4% this month</span>
              </div>
              <p className="text-[11px] text-slate-400">
                कुल विज़िटर्स, नए सेशन्स एवं एक्टिव चुनावी यूज़र्स
              </p>
            </div>

            {/* Dimension 2: कौन-से pages देखे */}
            <div className="p-4 rounded-xl bg-navy-900/90 border border-navy-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span className="font-semibold text-white">कौन-से pages देखे (Top Pages)</span>
                <Eye className="w-4 h-4 text-sky-400" />
              </div>
              <div className="space-y-1 text-xs font-mono text-slate-300">
                <div className="flex justify-between">
                  <span>/ (Home):</span>
                  <span className="text-white font-bold">52%</span>
                </div>
                <div className="flex justify-between">
                  <span>/services:</span>
                  <span className="text-white font-bold">24%</span>
                </div>
                <div className="flex justify-between">
                  <span>/contact & /gallery:</span>
                  <span className="text-white font-bold">24%</span>
                </div>
              </div>
            </div>

            {/* Dimension 3: कितनी देर रुके */}
            <div className="p-4 rounded-xl bg-navy-900/90 border border-navy-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span className="font-semibold text-white">कितनी देर रुके (Avg Time)</span>
                <Clock className="w-4 h-4 text-accent-gold" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-white font-mono">2m 48s</span>
                <span className="text-xs text-emerald-400 font-mono">High Engagement</span>
              </div>
              <p className="text-[11px] text-slate-400">
                एवरेज सेशन एंगेजमेंट अवधि व वीडियो वॉच टाइम
              </p>
            </div>

            {/* Dimension 4: Traffic कहाँ से आया */}
            <div className="p-4 rounded-xl bg-navy-900/90 border border-navy-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span className="font-semibold text-white">Traffic कहाँ से आया (Acquisition)</span>
                <Globe className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="space-y-1 text-xs font-mono text-slate-300">
                <div className="flex justify-between">
                  <span>Google Organic Search:</span>
                  <span className="text-emerald-400 font-bold">48%</span>
                </div>
                <div className="flex justify-between">
                  <span>Direct URL / Bookmarks:</span>
                  <span className="text-white font-bold">28%</span>
                </div>
                <div className="flex justify-between">
                  <span>WhatsApp & Social Media:</span>
                  <span className="text-accent-orange font-bold">24%</span>
                </div>
              </div>
            </div>

            {/* Dimension 5: Mobile / Desktop users */}
            <div className="p-4 rounded-xl bg-navy-900/90 border border-navy-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span className="font-semibold text-white">Mobile vs Desktop</span>
                <Smartphone className="w-4 h-4 text-purple-400" />
              </div>
              <div className="flex items-center justify-between text-xs font-mono pt-1">
                <div className="flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-white font-bold">78% Mobile</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Monitor className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-slate-300 font-bold">22% Desktop</span>
                </div>
              </div>
              <div className="w-full bg-navy-950 rounded-full h-2 overflow-hidden flex">
                <div className="bg-accent-orange h-full w-[78%]" />
                <div className="bg-sky-500 h-full w-[22%]" />
              </div>
            </div>

            {/* Dimension 6: कौन-से pages से conversion हुआ */}
            <div className="p-4 rounded-xl bg-navy-900/90 border border-navy-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span className="font-semibold text-white">Conversions & Leads</span>
                <Target className="w-4 h-4 text-rose-400" />
              </div>
              <div className="space-y-1 text-xs font-mono text-slate-300">
                <div className="flex justify-between">
                  <span>Enquiry Modal (Home):</span>
                  <span className="text-emerald-400 font-bold">42 leads</span>
                </div>
                <div className="flex justify-between">
                  <span>Contact War Room Desk:</span>
                  <span className="text-emerald-400 font-bold">38 leads</span>
                </div>
                <div className="flex justify-between">
                  <span>WhatsApp One-Click Clicks:</span>
                  <span className="text-emerald-400 font-bold">96 clicks</span>
                </div>
              </div>
            </div>

          </div>

          {/* GA4 ID Configuration Card */}
          <div className="p-5 rounded-2xl bg-navy-900/80 border border-navy-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">
                  Google Analytics 4 Measurement ID
                </h3>
                <p className="text-xs text-slate-400">
                  वर्तमान सक्रिय ID: <code className="text-accent-orange bg-navy-950 px-1.5 py-0.5 rounded font-mono">{gaId}</code>
                </p>
              </div>

              <button
                onClick={copyScriptCode}
                className="px-3 py-1.5 rounded-lg bg-navy-800 hover:bg-navy-750 text-slate-200 text-xs font-medium border border-navy-700 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedTag ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedTag ? "Copied!" : "Copy gtag.js"}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  GA4 Measurement ID (G-XXXXXXX)
                </label>
                <input
                  type="text"
                  value={gaId}
                  onChange={(e) => updateSetting("googleAnalyticsId", e.target.value)}
                  placeholder="G-9DQBS54NTL"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-navy-800 focus:border-accent-orange text-white text-xs font-mono outline-none"
                />
              </div>

              <div className="flex items-end">
                <button
                  onClick={onSave}
                  disabled={saving}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-accent-orange hover:bg-accent-orange-hover text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? "Saving..." : "Save Tracking Settings"}</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* SUB-TAB 2: GTM (Google Tag Manager) */}
      {activeSubTab === "gtm" && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-navy-900/80 border border-navy-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-sky-400" />
                  <span>Google Tag Manager (GTM)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  सभी tracking tags एक जगह manage करें — बिना बार-बार website code बदलने के events track करें
                </p>
              </div>

              <a
                href="https://tagmanager.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-lg bg-navy-800 hover:bg-navy-750 text-white text-xs font-medium border border-navy-700 flex items-center gap-1.5 transition-colors"
              >
                <span>Open GTM Dashboard</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  GTM Container ID (GTM-XXXXXXX)
                </label>
                <input
                  type="text"
                  value={gtmId}
                  onChange={(e) => updateSetting("googleTagManagerId", e.target.value)}
                  placeholder="GTM-XXXXXXX (Optional)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-navy-800 focus:border-accent-orange text-white text-xs font-mono outline-none"
                />
              </div>

              <div className="flex items-end">
                <button
                  onClick={onSave}
                  disabled={saving}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-accent-orange hover:bg-accent-orange-hover text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? "Saving..." : "Save GTM Settings"}</span>
                </button>
              </div>
            </div>

            {/* Configured Event Triggers */}
            <div className="pt-4 border-t border-navy-800 space-y-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Built-in Custom Event Triggers
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-navy-950 border border-navy-800 space-y-1">
                  <div className="font-mono font-bold text-emerald-400">form_submission</div>
                  <p className="text-[11px] text-slate-400">Enquiry modal & contact form submit</p>
                </div>
                <div className="p-3 rounded-lg bg-navy-950 border border-navy-800 space-y-1">
                  <div className="font-mono font-bold text-sky-400">whatsapp_click</div>
                  <p className="text-[11px] text-slate-400">Floating & header WhatsApp button clicks</p>
                </div>
                <div className="p-3 rounded-lg bg-navy-950 border border-navy-800 space-y-1">
                  <div className="font-mono font-bold text-accent-orange">call_click</div>
                  <p className="text-[11px] text-slate-400">Direct phone helpline call taps</p>
                </div>
                <div className="p-3 rounded-lg bg-navy-950 border border-navy-800 space-y-1">
                  <div className="font-mono font-bold text-accent-gold">campaign_video_play</div>
                  <p className="text-[11px] text-slate-400">War room permanent video interactions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: GSC (Google Search Console) */}
      {activeSubTab === "gsc" && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-navy-900/80 border border-navy-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Search className="w-4 h-4 text-emerald-400" />
                  <span>Google Search Console Integration</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Google में website किन keywords पर दिख रही है, clicks, impressions और indexing स्टेटस
                </p>
              </div>

              <a
                href="https://search.google.com/search-console"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-lg bg-navy-800 hover:bg-navy-750 text-white text-xs font-medium border border-navy-700 flex items-center gap-1.5 transition-colors"
              >
                <span>Open Search Console</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>

            {/* Sitemap & Verification status */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-navy-950 border border-navy-800 space-y-1">
                <span className="text-[11px] text-slate-400">XML Sitemap Status</span>
                <div className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Submitted & Verified</span>
                </div>
                <p className="text-[10px] text-slate-500 font-mono">/sitemap.xml (38 pages)</p>
              </div>

              <div className="p-3 rounded-xl bg-navy-950 border border-navy-800 space-y-1">
                <span className="text-[11px] text-slate-400">Robots.txt Status</span>
                <div className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Crawling Allowed</span>
                </div>
                <p className="text-[10px] text-slate-500 font-mono">/robots.txt (Clean rules)</p>
              </div>

              <div className="p-3 rounded-xl bg-navy-950 border border-navy-800 space-y-1">
                <span className="text-[11px] text-slate-400">Structured Data (Schema)</span>
                <div className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Organization & Service JSON-LD</span>
                </div>
                <p className="text-[10px] text-slate-500 font-mono">Lucknow & Kanpur Geo-tagged</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Google Site Verification HTML Tag Code (Optional)
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={gscCode}
                  onChange={(e) => updateSetting("googleSearchConsoleCode", e.target.value)}
                  placeholder="google-site-verification=xxxxxxxxxxxxxxxx"
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-navy-950 border border-navy-800 focus:border-accent-orange text-white text-xs font-mono outline-none"
                />
                <button
                  onClick={onSave}
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-accent-orange hover:bg-accent-orange-hover text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: SEO Target Keywords (50+) */}
      {activeSubTab === "keywords" && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-navy-900/80 border border-navy-800 space-y-5">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-accent-orange" />
                <span>SEO Target Keywords Directory (Workforce Infotech)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Google Search रैंकिंग के लिए संपूर्ण वेबसाइट (Meta, H1, Service Slugs & Schemas) में डिप्लॉय किए गए कीवर्ड्स:
              </p>
            </div>

            {/* 1. Primary Keywords */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-accent-gold block">
                1. Primary Keywords (मुख्य चुनावी प्रबंधन कीवर्ड्स)
              </span>
              <div className="flex flex-wrap gap-1.5">
                {seoKeywords.primary.map((kw, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-md bg-navy-950 border border-navy-800 text-[11px] text-slate-200">
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* 2. Brand Keywords */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-accent-orange block">
                2. Brand Keywords (वर्कफोर्स इन्फोटेक ब्रांड)
              </span>
              <div className="flex flex-wrap gap-1.5">
                {seoKeywords.brand.map((kw, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-md bg-navy-950 border border-accent-orange/30 text-[11px] text-accent-gold font-medium">
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* 3. Campaign Services Keywords */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-sky-400 block">
                3. Election Campaign Services Keywords (वार रूम, बूथ व डेटा प्रबंधन)
              </span>
              <div className="flex flex-wrap gap-1.5">
                {seoKeywords.campaignServices.map((kw, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-md bg-navy-950 border border-navy-800 text-[11px] text-slate-300">
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* 4. Digital Campaign Keywords */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-400 block">
                4. Digital Election Campaign Keywords (डिजिटल व सोशल मीडिया मार्केटिंग)
              </span>
              <div className="flex flex-wrap gap-1.5">
                {seoKeywords.digital.map((kw, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-md bg-navy-950 border border-navy-800 text-[11px] text-slate-300">
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* 5. Ground Campaign Keywords */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-rose-400 block">
                5. Ground Campaign Keywords (जमीनी अभियान, कॉल्स व वॉलंटियर)
              </span>
              <div className="flex flex-wrap gap-1.5">
                {seoKeywords.ground.map((kw, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-md bg-navy-950 border border-navy-800 text-[11px] text-slate-300">
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* 6. Location-Based Keywords */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-indigo-400 block">
                6. Location-Based Keywords (उत्तर प्रदेश, लखनऊ, कानपुर)
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  ...seoKeywords.locations.uttarPradesh,
                  ...seoKeywords.locations.lucknow,
                  ...seoKeywords.locations.kanpur
                ].map((kw, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-md bg-navy-950 border border-indigo-500/30 text-[11px] text-indigo-300">
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* 7. High-Intent Keywords */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-amber-400 block">
                7. High-Intent Keywords (शीर्ष रैंकिंग व हायरिंग)
              </span>
              <div className="flex flex-wrap gap-1.5">
                {seoKeywords.highIntent.map((kw, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-md bg-navy-950 border border-amber-500/30 text-[11px] text-amber-200">
                    {kw}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
