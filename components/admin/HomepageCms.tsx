"use client";

import React, { useState } from "react";
import {
  HomepageContent,
  defaultHomepage,
  BannerSlideItem,
  VictoryLeaderItem
} from "@/lib/content-schema";
import {
  Save,
  Layers,
  Sparkles,
  Users,
  Database,
  Radio,
  Workflow,
  Shield,
  MapPin,
  Award,
  Cpu,
  ShieldAlert,
  Scale,
  PhoneCall,
  CheckCircle2,
  Plus,
  Trash2,
  Image as ImageIcon,
  Trophy,
  UserCheck,
  Upload,
  ArrowUp,
  ArrowDown,
  Video,
  ExternalLink
} from "lucide-react";

interface HomepageCmsProps {
  homepage: HomepageContent;
  setHomepage: React.Dispatch<React.SetStateAction<HomepageContent>>;
  saveSection: (section: string, data: any) => Promise<void>;
  saving: boolean;
}

export default function HomepageCms({
  homepage,
  setHomepage,
  saveSection,
  saving
}: HomepageCmsProps) {
  const [activeSubTab, setActiveSubTab] = useState<string>("banners");
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  // Safe fallback accessors
  const bannerSlider = homepage.bannerSlider || defaultHomepage.bannerSlider!;
  const trackRecord = homepage.trackRecord || defaultHomepage.trackRecord!;
  const founderMessage = homepage.founderMessage || defaultHomepage.founderMessage!;
  const telemetry = homepage.telemetry || defaultHomepage.telemetry;

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    onSuccess: (url: string) => void,
    fieldKey: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingField(fieldKey);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "workforce");
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.success && data.url) {
        onSuccess(data.url);
      } else {
        alert(data.error || "अपलोड विफल रहा। कृपया पुनः प्रयास करें।");
      }
    } catch (err: any) {
      alert("अपलोड त्रुटि: " + (err.message || "नेटवर्क समस्या"));
    } finally {
      setUploadingField(null);
      e.target.value = "";
    }
  };

  const subTabs = [
    { id: "banners", label: "1. बैनर स्लाइडर व टिकर", icon: ImageIcon },
    { id: "hero", label: "2. मुख्य शीर्षक (Hero)", icon: Sparkles },
    { id: "telemetry", label: "3. वॉर रूम डैशबोर्ड व वीडियो", icon: Radio },
    { id: "victories", label: "4. चुनावी ट्रैक रिकॉर्ड व विजयी नेता", icon: Trophy },
    { id: "founder", label: "5. संस्थापक संदेश (Founder's Desk)", icon: UserCheck },
    { id: "trust", label: "6. 6 आंकड़े (Trust Strip)", icon: Award },
    { id: "about", label: "7. अबाउट टीज़र व कार्ड्स", icon: Shield },
    { id: "services", label: "8. 11 चुनावी सेवाएं", icon: Layers },
    { id: "pillars", label: "9. 7 मजबूत स्तंभ", icon: Workflow },
    { id: "process", label: "10. 7-स्टेप कार्यप्रणाली", icon: Workflow },
    { id: "command", label: "11. कमांड सेंटर मैट्रिक्स", icon: ShieldAlert },
    { id: "map", label: "12. यूपी रणनीतिक मैप", icon: MapPin },
    { id: "why", label: "13. वर्कफोर्स क्यों चुनें", icon: Award },
    { id: "team", label: "14. 1000+ टीम विंग्स", icon: Users },
    { id: "tech", label: "15. टेक अवसंरचना", icon: Cpu },
    { id: "solutions", label: "16. सॉल्यूशंस मॉडल", icon: Sparkles },
    { id: "compliance", label: "17. विधिक अनुपालन", icon: Scale },
    { id: "finalCta", label: "18. फ़ाइनल बैनर", icon: PhoneCall },
  ];

  return (
    <div className="space-y-6 text-left">
      {/* Top Header with Instant Save */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-navy-900 border border-navy-800">
        <div>
          <h3 className="text-xl font-bold text-white font-hindi">होमपेज संपूर्ण कंटेंट प्रबंधन (Homepage Full CMS)</h3>
          <p className="text-xs text-slate-400">होमपेज के प्रत्येक अनुभाग, हेडिंग, कार्ड, आंकड़े और टिकर को यहाँ से लाइव संपादित करें।</p>
        </div>
        <button
          type="button"
          disabled={saving}
          onClick={() => saveSection("homepage", homepage)}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-accent-orange to-accent-orange-hover hover:brightness-110 text-white font-bold text-sm shadow-xl shadow-accent-orange/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? "सहेजा जा रहा है..." : "होमपेज के परिवर्तन सहेजें (Save)"}</span>
        </button>
      </div>

      {/* Sub-Navigation Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {subTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveSubTab(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 border cursor-pointer ${
                isActive
                  ? "bg-accent-orange text-white border-accent-orange shadow-lg shadow-accent-orange/20"
                  : "bg-navy-900 text-slate-300 border-navy-800 hover:bg-navy-850 hover:text-white"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* =======================================================
          1. BANNERS SLIDER & TICKER
          ======================================================= */}
      {activeSubTab === "banners" && (
        <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-navy-800 pb-3">
            <div>
              <h4 className="text-base font-bold text-accent-gold font-hindi">1. टॉप विजुअल बैनर स्लाइडर व टिकर (Top Banner Slider & Ticker)</h4>
              <p className="text-xs text-slate-400">होमपेज के सबसे ऊपर चलने वाले विजुअल बैनर स्लाइड्स, हेडिंग, इमेजेस, बटन और नीचे की टिकर पट्टी।</p>
            </div>
            <button
              type="button"
              onClick={() => {
                const currentSlides = bannerSlider.slides || [];
                const newSlide: BannerSlideItem = {
                  id: Date.now(),
                  src: "/images/banners/banner-1.jpeg",
                  alt: "Campaign Banner Slide",
                  titleHi: "नया चुनावी अभियान बैनर",
                  titleEn: "New Campaign Banner Slide",
                  subtitleHi: "चुनावी रणनीति • डिजिटल प्रचार • ग्राउंड एक्टिवेशन",
                  subtitleEn: "Strategy • Digital Campaign • Ground Activation",
                  ctaTextHi: "सेवाएं देखें",
                  ctaTextEn: "Explore Services",
                  ctaLink: "/services",
                  badgeHi: "360° चुनावी प्रचार",
                  badgeEn: "360° Campaign"
                };
                setHomepage({
                  ...homepage,
                  bannerSlider: {
                    ...bannerSlider,
                    slides: [...currentSlides, newSlide]
                  }
                });
              }}
              className="px-4 py-2 rounded-xl bg-accent-orange hover:bg-accent-orange-hover text-white text-xs font-bold flex items-center gap-1.5 shadow cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ नया स्लाइड जोड़ें (Add Slide)</span>
            </button>
          </div>

          {/* Slides List */}
          <div className="space-y-6">
            <h5 className="text-sm font-bold text-white flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-accent-orange" />
              <span>बैनर स्लाइड्स सूची ({bannerSlider.slides?.length || 0} स्लाइड्स)</span>
            </h5>

            {(bannerSlider.slides || []).map((slide, idx) => (
              <div key={slide.id || idx} className="p-4 sm:p-5 rounded-2xl bg-navy-950 border border-navy-800 space-y-4 relative group">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-navy-800/80 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-accent-orange/20 text-accent-gold text-xs font-mono font-bold">
                      स्लाइड #{idx + 1}
                    </span>
                    <span className="text-xs font-semibold text-slate-300 truncate max-w-xs sm:max-w-md">
                      {slide.titleHi || "शीर्षक रहित स्लाइड"}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Move Up */}
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => {
                        const arr = [...bannerSlider.slides];
                        const temp = arr[idx - 1];
                        arr[idx - 1] = arr[idx];
                        arr[idx] = temp;
                        setHomepage({
                          ...homepage,
                          bannerSlider: { ...bannerSlider, slides: arr }
                        });
                      }}
                      className="p-1.5 rounded-lg bg-navy-900 hover:bg-navy-800 text-slate-300 disabled:opacity-30 cursor-pointer"
                      title="ऊपर ले जाएं (Move Up)"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>

                    {/* Move Down */}
                    <button
                      type="button"
                      disabled={idx === bannerSlider.slides.length - 1}
                      onClick={() => {
                        const arr = [...bannerSlider.slides];
                        const temp = arr[idx + 1];
                        arr[idx + 1] = arr[idx];
                        arr[idx] = temp;
                        setHomepage({
                          ...homepage,
                          bannerSlider: { ...bannerSlider, slides: arr }
                        });
                      }}
                      className="p-1.5 rounded-lg bg-navy-900 hover:bg-navy-800 text-slate-300 disabled:opacity-30 cursor-pointer"
                      title="नीचे ले जाएं (Move Down)"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`क्या आप वाकई स्लाइड #${idx + 1} को हटाना चाहते हैं?`)) {
                          const arr = bannerSlider.slides.filter((_, i) => i !== idx);
                          setHomepage({
                            ...homepage,
                            bannerSlider: { ...bannerSlider, slides: arr }
                          });
                        }
                      }}
                      className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 cursor-pointer"
                      title="हटाएं (Delete Slide)"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Banner Image & Upload */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="md:col-span-4 space-y-2">
                    <label className="block text-xs font-semibold text-slate-300">बैनर इमेज प्रीव्यू (Banner Image)</label>
                    <div className="relative aspect-[16/6] rounded-xl overflow-hidden bg-black/60 border border-navy-700 flex items-center justify-center group/img">
                      {slide.src ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={slide.src}
                          alt={slide.alt || "Banner preview"}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-xs text-slate-500 flex items-center gap-1.5">
                          <ImageIcon className="w-4 h-4" />
                          <span>कोई इमेज नहीं</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="md:col-span-8 space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        इमेज URL (Image URL / Path)
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={slide.src}
                          onChange={(e) => {
                            const arr = [...bannerSlider.slides];
                            arr[idx] = { ...arr[idx], src: e.target.value };
                            setHomepage({
                              ...homepage,
                              bannerSlider: { ...bannerSlider, slides: arr }
                            });
                          }}
                          placeholder="/images/banners/banner-1.jpeg या https://..."
                          className="flex-1 px-3 py-2 rounded-xl bg-navy-900 border border-navy-700 text-xs text-white focus:border-accent-orange outline-none font-mono"
                        />
                        <label className="px-3.5 py-2 rounded-xl bg-navy-800 hover:bg-navy-750 text-accent-gold hover:text-white border border-navy-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer flex-shrink-0">
                          <Upload className="w-3.5 h-3.5" />
                          <span>{uploadingField === `slide-${idx}` ? "अपलोड..." : "अपलोड करें"}</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            disabled={uploadingField === `slide-${idx}`}
                            onChange={(e) => handleImageUpload(e, (url) => {
                              const arr = [...bannerSlider.slides];
                              arr[idx] = { ...arr[idx], src: url };
                              setHomepage({
                                ...homepage,
                                bannerSlider: { ...bannerSlider, slides: arr }
                              });
                            }, `slide-${idx}`)}
                          />
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">इमेज ऑल्ट टेक्स्ट (Alt Text for SEO)</label>
                      <input
                        type="text"
                        value={slide.alt || ""}
                        onChange={(e) => {
                          const arr = [...bannerSlider.slides];
                          arr[idx] = { ...arr[idx], alt: e.target.value };
                          setHomepage({
                            ...homepage,
                            bannerSlider: { ...bannerSlider, slides: arr }
                          });
                        }}
                        className="w-full px-3 py-1.5 rounded-xl bg-navy-900 border border-navy-700 text-xs text-slate-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Badges & Titles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">स्लाइड बैज (हिंदी) [Badge Hi]</label>
                    <input
                      type="text"
                      value={slide.badgeHi || ""}
                      onChange={(e) => {
                        const arr = [...bannerSlider.slides];
                        arr[idx] = { ...arr[idx], badgeHi: e.target.value };
                        setHomepage({
                          ...homepage,
                          bannerSlider: { ...bannerSlider, slides: arr }
                        });
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-navy-700 text-xs text-white font-hindi"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">स्लाइड बैज (अंग्रेजी) [Badge En]</label>
                    <input
                      type="text"
                      value={slide.badgeEn || ""}
                      onChange={(e) => {
                        const arr = [...bannerSlider.slides];
                        arr[idx] = { ...arr[idx], badgeEn: e.target.value };
                        setHomepage({
                          ...homepage,
                          bannerSlider: { ...bannerSlider, slides: arr }
                        });
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-navy-700 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">स्लाइड मुख्य शीर्षक (हिंदी) [Title Hi]</label>
                    <input
                      type="text"
                      value={slide.titleHi || ""}
                      onChange={(e) => {
                        const arr = [...bannerSlider.slides];
                        arr[idx] = { ...arr[idx], titleHi: e.target.value };
                        setHomepage({
                          ...homepage,
                          bannerSlider: { ...bannerSlider, slides: arr }
                        });
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-navy-700 text-xs text-white font-hindi font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">स्लाइड मुख्य शीर्षक (अंग्रेजी) [Title En]</label>
                    <input
                      type="text"
                      value={slide.titleEn || ""}
                      onChange={(e) => {
                        const arr = [...bannerSlider.slides];
                        arr[idx] = { ...arr[idx], titleEn: e.target.value };
                        setHomepage({
                          ...homepage,
                          bannerSlider: { ...bannerSlider, slides: arr }
                        });
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-navy-700 text-xs text-white font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">उप-विवरण (हिंदी) [Subtitle Hi]</label>
                    <textarea
                      rows={2}
                      value={slide.subtitleHi || ""}
                      onChange={(e) => {
                        const arr = [...bannerSlider.slides];
                        arr[idx] = { ...arr[idx], subtitleHi: e.target.value };
                        setHomepage({
                          ...homepage,
                          bannerSlider: { ...bannerSlider, slides: arr }
                        });
                      }}
                      className="w-full p-2 rounded-xl bg-navy-900 border border-navy-700 text-xs text-slate-300 font-hindi"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">उप-विवरण (अंग्रेजी) [Subtitle En]</label>
                    <textarea
                      rows={2}
                      value={slide.subtitleEn || ""}
                      onChange={(e) => {
                        const arr = [...bannerSlider.slides];
                        arr[idx] = { ...arr[idx], subtitleEn: e.target.value };
                        setHomepage({
                          ...homepage,
                          bannerSlider: { ...bannerSlider, slides: arr }
                        });
                      }}
                      className="w-full p-2 rounded-xl bg-navy-900 border border-navy-700 text-xs text-slate-300"
                    />
                  </div>
                </div>

                {/* Slide Button CTA */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">बटन टेक्स्ट (हिंदी)</label>
                    <input
                      type="text"
                      value={slide.ctaTextHi || ""}
                      onChange={(e) => {
                        const arr = [...bannerSlider.slides];
                        arr[idx] = { ...arr[idx], ctaTextHi: e.target.value };
                        setHomepage({
                          ...homepage,
                          bannerSlider: { ...bannerSlider, slides: arr }
                        });
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-navy-700 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">बटन टेक्स्ट (अंग्रेजी)</label>
                    <input
                      type="text"
                      value={slide.ctaTextEn || ""}
                      onChange={(e) => {
                        const arr = [...bannerSlider.slides];
                        arr[idx] = { ...arr[idx], ctaTextEn: e.target.value };
                        setHomepage({
                          ...homepage,
                          bannerSlider: { ...bannerSlider, slides: arr }
                        });
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-navy-700 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">बटन लिंक (Link URL)</label>
                    <input
                      type="text"
                      value={slide.ctaLink || ""}
                      onChange={(e) => {
                        const arr = [...bannerSlider.slides];
                        arr[idx] = { ...arr[idx], ctaLink: e.target.value };
                        setHomepage({
                          ...homepage,
                          bannerSlider: { ...bannerSlider, slides: arr }
                        });
                      }}
                      placeholder="/services"
                      className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-navy-700 text-xs text-white font-mono"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Ticker Section */}
          <div className="p-5 rounded-2xl bg-navy-950 border border-navy-800 space-y-4">
            <div className="border-b border-navy-800/80 pb-2">
              <h5 className="text-sm font-bold text-accent-gold font-hindi">बैनर के नीचे की मुख्य टिकर पट्टी (Bottom Ticker & Actions Bar)</h5>
              <p className="text-xs text-slate-400">स्लाइडर के नीचे निरंतर चलने वाला संदेश और दोनों एक्शन बटन।</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">टिकर मुख्य संदेश (हिंदी)</label>
                <input
                  type="text"
                  value={bannerSlider.tickerHeadingHi || ""}
                  onChange={(e) => setHomepage({
                    ...homepage,
                    bannerSlider: { ...bannerSlider, tickerHeadingHi: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 rounded-xl bg-navy-900 border border-navy-700 text-xs text-white font-hindi"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">टिकर मुख्य संदेश (अंग्रेजी)</label>
                <input
                  type="text"
                  value={bannerSlider.tickerHeadingEn || ""}
                  onChange={(e) => setHomepage({
                    ...homepage,
                    bannerSlider: { ...bannerSlider, tickerHeadingEn: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 rounded-xl bg-navy-900 border border-navy-700 text-xs text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">सेवा सूची टैगलाइन (हिंदी)</label>
                <textarea
                  rows={2}
                  value={bannerSlider.tickerServicesHi || ""}
                  onChange={(e) => setHomepage({
                    ...homepage,
                    bannerSlider: { ...bannerSlider, tickerServicesHi: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-xl bg-navy-900 border border-navy-700 text-xs text-slate-300 font-hindi"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">सेवा सूची टैगलाइन (अंग्रेजी)</label>
                <textarea
                  rows={2}
                  value={bannerSlider.tickerServicesEn || ""}
                  onChange={(e) => setHomepage({
                    ...homepage,
                    bannerSlider: { ...bannerSlider, tickerServicesEn: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-xl bg-navy-900 border border-navy-700 text-xs text-slate-300"
                />
              </div>
            </div>

            {/* Ticker Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-3 rounded-xl bg-navy-900 border border-navy-800 space-y-2">
                <span className="text-xs font-bold text-accent-orange block">बटन 1 (Button 1: मुख्य सेवा बटन)</span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="टेक्स्ट (हिंदी)"
                    value={bannerSlider.button1TextHi || ""}
                    onChange={(e) => setHomepage({
                      ...homepage,
                      bannerSlider: { ...bannerSlider, button1TextHi: e.target.value }
                    })}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-navy-950 border border-navy-700 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="Text (En)"
                    value={bannerSlider.button1TextEn || ""}
                    onChange={(e) => setHomepage({
                      ...homepage,
                      bannerSlider: { ...bannerSlider, button1TextEn: e.target.value }
                    })}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-navy-950 border border-navy-700 text-xs text-white"
                  />
                </div>
                <input
                  type="text"
                  placeholder="लिंक (URL) e.g. /services"
                  value={bannerSlider.button1Link || ""}
                  onChange={(e) => setHomepage({
                    ...homepage,
                    bannerSlider: { ...bannerSlider, button1Link: e.target.value }
                  })}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-navy-950 border border-navy-700 text-xs text-white font-mono"
                />
              </div>

              <div className="p-3 rounded-xl bg-navy-900 border border-navy-800 space-y-2">
                <span className="text-xs font-bold text-accent-gold block">बटन 2 (Button 2: गैलरी बटन)</span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="टेक्स्ट (हिंदी)"
                    value={bannerSlider.button2TextHi || ""}
                    onChange={(e) => setHomepage({
                      ...homepage,
                      bannerSlider: { ...bannerSlider, button2TextHi: e.target.value }
                    })}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-navy-950 border border-navy-700 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="Text (En)"
                    value={bannerSlider.button2TextEn || ""}
                    onChange={(e) => setHomepage({
                      ...homepage,
                      bannerSlider: { ...bannerSlider, button2TextEn: e.target.value }
                    })}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-navy-950 border border-navy-700 text-xs text-white"
                  />
                </div>
                <input
                  type="text"
                  placeholder="लिंक (URL) e.g. /gallery"
                  value={bannerSlider.button2Link || ""}
                  onChange={(e) => setHomepage({
                    ...homepage,
                    bannerSlider: { ...bannerSlider, button2Link: e.target.value }
                  })}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-navy-950 border border-navy-700 text-xs text-white font-mono"
                />
              </div>
            </div>
          </div>

        </div>
      )}

      {/* =======================================================
          2. HERO & MAIN TAGLINE
          ======================================================= */}
      {activeSubTab === "hero" && (
        <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800 space-y-5">
          <div className="border-b border-navy-800 pb-3">
            <h4 className="text-base font-bold text-accent-gold font-hindi">2. होमपेज मुख्य शीर्षक एवं टैगलाइन (Hero Section)</h4>
            <p className="text-xs text-slate-400">वेबसाइट का मुख्य शीर्षक, उप-विवरण, पंचलाइन, बटन एवं टीम टैग्स।</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">शीर्ष बैज (Eyebrow Badge)</label>
              <input
                type="text"
                value={homepage.hero.eyebrow}
                onChange={(e) => setHomepage({
                  ...homepage,
                  hero: { ...homepage.hero, eyebrow: e.target.value }
                })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white focus:border-accent-orange outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">मुख्य शीर्षक पंक्ति 1 (Title 1)</label>
              <input
                type="text"
                value={homepage.hero.title1}
                onChange={(e) => setHomepage({
                  ...homepage,
                  hero: { ...homepage.hero, title1: e.target.value }
                })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white focus:border-accent-orange outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">मुख्य शीर्षक पंक्ति 2 (Title 2)</label>
              <input
                type="text"
                value={homepage.hero.title2}
                onChange={(e) => setHomepage({
                  ...homepage,
                  hero: { ...homepage.hero, title2: e.target.value }
                })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white focus:border-accent-orange outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">उप-शीर्षक विवरणी (Subtitle)</label>
            <textarea
              rows={2}
              value={homepage.hero.subtitle}
              onChange={(e) => setHomepage({
                ...homepage,
                hero: { ...homepage.hero, subtitle: e.target.value }
              })}
              className="w-full p-3 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white focus:border-accent-orange outline-none font-hindi"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-accent-orange mb-1.5">मुख्य पंचलाइन / टैगलाइन (Primary Tagline)</label>
            <input
              type="text"
              value={homepage.hero.tagline}
              onChange={(e) => setHomepage({
                ...homepage,
                hero: { ...homepage.hero, tagline: e.target.value }
              })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-accent-orange/50 text-sm font-bold text-accent-gold focus:border-accent-orange outline-none font-hindi"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">प्राथमिक CTA बटन टेक्स्ट</label>
              <input
                type="text"
                value={homepage.hero.primaryCta}
                onChange={(e) => setHomepage({
                  ...homepage,
                  hero: { ...homepage.hero, primaryCta: e.target.value }
                })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">द्वितीयक बटन टेक्स्ट</label>
              <input
                type="text"
                value={homepage.hero.secondaryCta}
                onChange={(e) => setHomepage({
                  ...homepage,
                  hero: { ...homepage.hero, secondaryCta: e.target.value }
                })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">टीम आकार बैज</label>
              <input
                type="text"
                value={homepage.hero.teamBadge}
                onChange={(e) => setHomepage({
                  ...homepage,
                  hero: { ...homepage.hero, teamBadge: e.target.value }
                })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white font-hindi"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">टीम उप-शीर्षक (Campaign Area)</label>
              <input
                type="text"
                value={homepage.hero.teamSubtitle || "उत्तर प्रदेश अभियान"}
                onChange={(e) => setHomepage({
                  ...homepage,
                  hero: { ...homepage.hero, teamSubtitle: e.target.value }
                })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white font-hindi"
              />
            </div>
          </div>
        </div>
      )}

      {/* =======================================================
          3. WAR ROOM VIDEO & TELEMETRY
          ======================================================= */}
      {activeSubTab === "telemetry" && (
        <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800 space-y-6">
          <div className="border-b border-navy-800 pb-3">
            <h4 className="text-base font-bold text-accent-gold font-hindi">3. वॉर रूम डैशबोर्ड, वीडियो व लाइव टेलीमेट्री</h4>
            <p className="text-xs text-slate-400">होमपेज पर दाईं ओर ऑटो-प्ले होने वाला वॉर रूम वीडियो, ऑडियो, यूट्यूब लिंक, 4 प्रमुख आंकड़े व लाइव स्ट्रीम टिकर।</p>
          </div>

          {/* Video, Audio, YouTube Media Box */}
          <div className="p-5 rounded-2xl bg-navy-950 border border-navy-800 space-y-4">
            <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Video className="w-4 h-4 text-accent-orange" />
              <span>वॉर रूम वीडियो प्लेयर व ऑडियो स्रोत (Media Sources)</span>
            </h5>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">वीडियो फाइल URL (Video Stream URL / MP4)</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={telemetry.videoSrc || "/videos/campaign-video.mp4"}
                    onChange={(e) => setHomepage({
                      ...homepage,
                      telemetry: { ...homepage.telemetry, videoSrc: e.target.value }
                    })}
                    placeholder="/videos/campaign-video.mp4 या cdn link"
                    className="flex-1 px-3 py-2 rounded-xl bg-navy-900 border border-navy-700 text-xs text-white font-mono"
                  />
                  <label className="px-3 py-2 rounded-xl bg-navy-800 hover:bg-navy-750 text-accent-gold hover:text-white border border-navy-700 text-xs font-semibold flex items-center gap-1 cursor-pointer flex-shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingField === "telemetry-video" ? "अपलोड..." : "अपलोड"}</span>
                    <input
                      type="file"
                      accept="video/*"
                      className="hidden"
                      disabled={uploadingField === "telemetry-video"}
                      onChange={(e) => handleImageUpload(e, (url) => {
                        setHomepage({
                          ...homepage,
                          telemetry: { ...homepage.telemetry, videoSrc: url }
                        });
                      }, "telemetry-video")}
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">सिंक ऑडियो URL (Audio Loop M4A/MP3)</label>
                <input
                  type="text"
                  value={telemetry.audioSrc || "/videos/campaign-audio.m4a"}
                  onChange={(e) => setHomepage({
                    ...homepage,
                    telemetry: { ...homepage.telemetry, audioSrc: e.target.value }
                  })}
                  placeholder="/videos/campaign-audio.m4a"
                  className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-navy-700 text-xs text-white font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">यूट्यूब लिंक (YouTube Direct Link Button)</label>
                <input
                  type="text"
                  value={telemetry.youtubeUrl || "https://youtube.com/shorts/5bCg8EKiHSM"}
                  onChange={(e) => setHomepage({
                    ...homepage,
                    telemetry: { ...homepage.telemetry, youtubeUrl: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-navy-700 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">वीडियो वॉटरमार्क टैग (Watermark Overlay Tag)</label>
                <input
                  type="text"
                  value={telemetry.videoWatermark || "WORKFORCE INFOTECH (IPR)"}
                  onChange={(e) => setHomepage({
                    ...homepage,
                    telemetry: { ...homepage.telemetry, videoWatermark: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-navy-700 text-xs text-white font-mono font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">डैशबोर्ड मुख्य शीर्षक</label>
                <input
                  type="text"
                  value={telemetry.dashboardTitle || "CAMPAIGN INTELLIGENCE DASHBOARD"}
                  onChange={(e) => setHomepage({
                    ...homepage,
                    telemetry: { ...homepage.telemetry, dashboardTitle: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-navy-700 text-xs text-white font-mono font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">डैशबोर्ड उप-शीर्षक</label>
                <input
                  type="text"
                  value={telemetry.dashboardSubtitle || "UP-AC2027 // WAR ROOM ENGINE"}
                  onChange={(e) => setHomepage({
                    ...homepage,
                    telemetry: { ...homepage.telemetry, dashboardSubtitle: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-navy-700 text-xs text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">लाइव फीड बैज</label>
                <input
                  type="text"
                  value={telemetry.liveFeedBadge || "LIVE FEED"}
                  onChange={(e) => setHomepage({
                    ...homepage,
                    telemetry: { ...homepage.telemetry, liveFeedBadge: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-navy-700 text-xs text-emerald-400 font-mono font-bold"
                />
              </div>
            </div>
          </div>

          {/* 4 Telemetry Metrics */}
          <div className="p-5 rounded-2xl bg-navy-950 border border-navy-800 space-y-4">
            <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider">4 प्रमुख अभियान सूचकांक (4 Telemetry Metric Stats)</h5>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-3 rounded-xl bg-navy-900 border border-navy-800 space-y-2">
                <span className="text-xs font-semibold text-accent-orange block">1. कवरेज (Coverage)</span>
                <input
                  type="text"
                  placeholder="87%"
                  value={telemetry.coveragePercent}
                  onChange={(e) => setHomepage({
                    ...homepage,
                    telemetry: { ...homepage.telemetry, coveragePercent: e.target.value }
                  })}
                  className="w-full px-3 py-1.5 rounded-lg bg-navy-950 border border-navy-700 text-sm text-white font-mono font-bold"
                />
                <input
                  type="text"
                  placeholder="+4.2% आज"
                  value={telemetry.stat1Sub || "+4.2% आज"}
                  onChange={(e) => setHomepage({
                    ...homepage,
                    telemetry: { ...homepage.telemetry, stat1Sub: e.target.value }
                  })}
                  className="w-full px-3 py-1 rounded-lg bg-navy-950 border border-navy-700 text-xs text-emerald-400 font-mono"
                />
              </div>

              <div className="p-3 rounded-xl bg-navy-900 border border-navy-800 space-y-2">
                <span className="text-xs font-semibold text-accent-gold block">2. कुल बूथ (Booths)</span>
                <input
                  type="text"
                  placeholder="642"
                  value={telemetry.totalBooths}
                  onChange={(e) => setHomepage({
                    ...homepage,
                    telemetry: { ...homepage.telemetry, totalBooths: e.target.value }
                  })}
                  className="w-full px-3 py-1.5 rounded-lg bg-navy-950 border border-navy-700 text-sm text-white font-mono font-bold"
                />
                <input
                  type="text"
                  placeholder="100% एक्टिव"
                  value={telemetry.stat2Sub || "100% एक्टिव"}
                  onChange={(e) => setHomepage({
                    ...homepage,
                    telemetry: { ...homepage.telemetry, stat2Sub: e.target.value }
                  })}
                  className="w-full px-3 py-1 rounded-lg bg-navy-950 border border-navy-700 text-xs text-slate-300 font-mono"
                />
              </div>

              <div className="p-3 rounded-xl bg-navy-900 border border-navy-800 space-y-2">
                <span className="text-xs font-semibold text-sky-400 block">3. फील्ड टीमें (Teams)</span>
                <input
                  type="text"
                  placeholder="128"
                  value={telemetry.activeFieldTeams}
                  onChange={(e) => setHomepage({
                    ...homepage,
                    telemetry: { ...homepage.telemetry, activeFieldTeams: e.target.value }
                  })}
                  className="w-full px-3 py-1.5 rounded-lg bg-navy-950 border border-navy-700 text-sm text-white font-mono font-bold"
                />
                <input
                  type="text"
                  placeholder="GPS ट्रैक्ड"
                  value={telemetry.stat3Sub || "GPS ट्रैक्ड"}
                  onChange={(e) => setHomepage({
                    ...homepage,
                    telemetry: { ...homepage.telemetry, stat3Sub: e.target.value }
                  })}
                  className="w-full px-3 py-1 rounded-lg bg-navy-950 border border-navy-700 text-xs text-sky-400 font-mono"
                />
              </div>

              <div className="p-3 rounded-xl bg-navy-900 border border-navy-800 space-y-2">
                <span className="text-xs font-semibold text-rose-400 block">4. लॉग्ड गतिविधियां (Actions)</span>
                <input
                  type="text"
                  placeholder="1,840+"
                  value={telemetry.loggedActivities}
                  onChange={(e) => setHomepage({
                    ...homepage,
                    telemetry: { ...homepage.telemetry, loggedActivities: e.target.value }
                  })}
                  className="w-full px-3 py-1.5 rounded-lg bg-navy-950 border border-navy-700 text-sm text-white font-mono font-bold"
                />
                <input
                  type="text"
                  placeholder="लॉग्ड"
                  value={telemetry.stat4Sub || "लॉग्ड"}
                  onChange={(e) => setHomepage({
                    ...homepage,
                    telemetry: { ...homepage.telemetry, stat4Sub: e.target.value }
                  })}
                  className="w-full px-3 py-1 rounded-lg bg-navy-950 border border-navy-700 text-xs text-emerald-400 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Live Events Stream Ticker */}
          <div className="p-5 rounded-2xl bg-navy-950 border border-navy-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-slate-300">लाइव टेलीमेट्री टिकर इवेंट्स (Live Ticker Messages)</label>
              <button
                type="button"
                onClick={() => {
                  const updated = [...(telemetry.tickerEvents || []), "नया फील्ड इवेंट: लाइव एक्टिविटी"];
                  setHomepage({
                    ...homepage,
                    telemetry: { ...homepage.telemetry, tickerEvents: updated }
                  });
                }}
                className="px-2.5 py-1 rounded-lg bg-navy-800 hover:bg-navy-750 text-accent-gold text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>+ इवेंट जोड़ें</span>
              </button>
            </div>

            {(telemetry.tickerEvents || []).map((ev, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-xs font-mono text-accent-gold px-2 py-1.5 rounded bg-navy-900 border border-navy-800">#{idx + 1}</span>
                <input
                  type="text"
                  value={ev}
                  onChange={(e) => {
                    const updated = [...telemetry.tickerEvents];
                    updated[idx] = e.target.value;
                    setHomepage({
                      ...homepage,
                      telemetry: { ...homepage.telemetry, tickerEvents: updated }
                    });
                  }}
                  className="w-full px-3.5 py-2 rounded-xl bg-navy-900 border border-navy-700 text-xs text-slate-200"
                />
                <button
                  type="button"
                  onClick={() => {
                    const updated = telemetry.tickerEvents.filter((_, i) => i !== idx);
                    setHomepage({
                      ...homepage,
                      telemetry: { ...homepage.telemetry, tickerEvents: updated }
                    });
                  }}
                  className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 cursor-pointer"
                  title="हटाएं"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Footer Notes */}
          <div className="p-5 rounded-2xl bg-navy-950 border border-navy-800 space-y-3">
            <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider">डैशबोर्ड निचली सुरक्षा व आर्किटेक्चर टैगलाइन (Footer Notes)</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">निचला नोट 1 (बाईं ओर)</label>
                <input
                  type="text"
                  value={telemetry.footerNote1 || "निजी एवं कस्टमाइज्ड क्लाउड आर्किटेक्चर"}
                  onChange={(e) => setHomepage({
                    ...homepage,
                    telemetry: { ...homepage.telemetry, footerNote1: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-navy-700 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">निचला नोट 2 (दाईं ओर)</label>
                <input
                  type="text"
                  value={telemetry.footerNote2 || "सचित्र लाइव फीड (Live Illustrative)"}
                  onChange={(e) => setHomepage({
                    ...homepage,
                    telemetry: { ...homepage.telemetry, footerNote2: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-navy-700 text-xs text-white"
                />
              </div>
            </div>
          </div>

        </div>
      )}

      {/* =======================================================
          4. TRACK RECORD & ELECTORAL VICTORIES
          ======================================================= */}
      {activeSubTab === "victories" && (
        <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-navy-800 pb-3">
            <div>
              <h4 className="text-base font-bold text-accent-gold font-hindi">4. चुनावी ट्रैक रिकॉर्ड व विजयी जनप्रतिनिधि (Track Record & Victories)</h4>
              <p className="text-xs text-slate-400">होमपेज पर प्रदर्शित होने वाले सभी विजयी सांसद, विधायक, एमएलसी व प्रत्याशियों के कार्ड और शीर्ष विवरण।</p>
            </div>
            <button
              type="button"
              onClick={() => {
                const currentItems = trackRecord.items || [];
                const newItem: VictoryLeaderItem = {
                  id: `tr-${Date.now()}`,
                  name: "नया जनप्रतिनिधि / प्रत्याशी",
                  roleHi: "जनप्रतिनिधि / विधायक / सांसद",
                  roleEn: "Elected Representative / Candidate",
                  constituency: "विधानसभा / लोकसभा क्षेत्र",
                  election: "विधानसभा चुनाव 2027",
                  partyBadge: "BJP",
                  status: "winner",
                  highlight: "विजयी जनप्रतिनिधि"
                };
                setHomepage({
                  ...homepage,
                  trackRecord: {
                    ...trackRecord,
                    items: [newItem, ...currentItems]
                  }
                });
              }}
              className="px-4 py-2 rounded-xl bg-accent-orange hover:bg-accent-orange-hover text-white text-xs font-bold flex items-center gap-1.5 shadow cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ नया विजयी नेता कार्ड जोड़ें (Add Card)</span>
            </button>
          </div>

          {/* Section Header Inputs */}
          <div className="p-5 rounded-2xl bg-navy-950 border border-navy-800 space-y-4">
            <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider">अनुभाग शीर्ष विवरण (Section Headers)</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">शीर्ष बैज (हिंदी)</label>
                <input
                  type="text"
                  value={trackRecord.badgeHi || ""}
                  onChange={(e) => setHomepage({
                    ...homepage,
                    trackRecord: { ...trackRecord, badgeHi: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-navy-700 text-xs text-white font-hindi"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">शीर्ष बैज (अंग्रेजी)</label>
                <input
                  type="text"
                  value={trackRecord.badgeEn || ""}
                  onChange={(e) => setHomepage({
                    ...homepage,
                    trackRecord: { ...trackRecord, badgeEn: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-navy-700 text-xs text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">मुख्य हेडिंग (हिंदी)</label>
                <input
                  type="text"
                  value={trackRecord.headingHi || ""}
                  onChange={(e) => setHomepage({
                    ...homepage,
                    trackRecord: { ...trackRecord, headingHi: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-navy-700 text-xs text-white font-hindi font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">मुख्य हेडिंग (अंग्रेजी)</label>
                <input
                  type="text"
                  value={trackRecord.headingEn || ""}
                  onChange={(e) => setHomepage({
                    ...homepage,
                    trackRecord: { ...trackRecord, headingEn: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-navy-700 text-xs text-white font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">उप-विवरण (हिंदी)</label>
                <textarea
                  rows={2}
                  value={trackRecord.subHi || ""}
                  onChange={(e) => setHomepage({
                    ...homepage,
                    trackRecord: { ...trackRecord, subHi: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-xl bg-navy-900 border border-navy-700 text-xs text-slate-300 font-hindi"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">उप-विवरण (अंग्रेजी)</label>
                <textarea
                  rows={2}
                  value={trackRecord.subEn || ""}
                  onChange={(e) => setHomepage({
                    ...homepage,
                    trackRecord: { ...trackRecord, subEn: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-xl bg-navy-900 border border-navy-700 text-xs text-slate-300"
                />
              </div>
            </div>
          </div>

          {/* Leaders Cards Grid */}
          <div className="space-y-4">
            <h5 className="text-sm font-bold text-white flex items-center gap-2">
              <Trophy className="w-4 h-4 text-accent-gold" />
              <span>विजयी नेताओं के कार्ड्स ({trackRecord.items?.length || 0} कार्ड्स)</span>
            </h5>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(trackRecord.items || []).map((item, idx) => (
                <div key={item.id || idx} className="p-4 rounded-xl bg-navy-950 border border-navy-800 space-y-3 relative group">
                  <div className="flex items-center justify-between border-b border-navy-800/80 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-navy-900 text-accent-gold border border-navy-700">
                        #{idx + 1}
                      </span>
                      <span className="text-xs font-bold text-white font-hindi truncate">
                        {item.name || "नाम"}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => {
                          const arr = [...trackRecord.items];
                          const temp = arr[idx - 1];
                          arr[idx - 1] = arr[idx];
                          arr[idx] = temp;
                          setHomepage({
                            ...homepage,
                            trackRecord: { ...trackRecord, items: arr }
                          });
                        }}
                        className="p-1 rounded bg-navy-900 hover:bg-navy-800 text-slate-300 disabled:opacity-30 cursor-pointer"
                        title="ऊपर"
                      >
                        <ArrowUp className="w-3 h-3" />
                      </button>

                      <button
                        type="button"
                        disabled={idx === trackRecord.items.length - 1}
                        onClick={() => {
                          const arr = [...trackRecord.items];
                          const temp = arr[idx + 1];
                          arr[idx + 1] = arr[idx];
                          arr[idx] = temp;
                          setHomepage({
                            ...homepage,
                            trackRecord: { ...trackRecord, items: arr }
                          });
                        }}
                        className="p-1 rounded bg-navy-900 hover:bg-navy-800 text-slate-300 disabled:opacity-30 cursor-pointer"
                        title="नीचे"
                      >
                        <ArrowDown className="w-3 h-3" />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`क्या आप ${item.name} का कार्ड हटाना चाहते हैं?`)) {
                            const arr = trackRecord.items.filter((_, i) => i !== idx);
                            setHomepage({
                              ...homepage,
                              trackRecord: { ...trackRecord, items: arr }
                            });
                          }
                        }}
                        className="p-1 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 cursor-pointer"
                        title="हटाएं"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">नेता / प्रत्याशी का नाम (Name)</label>
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => {
                          const arr = [...trackRecord.items];
                          arr[idx] = { ...arr[idx], name: e.target.value };
                          setHomepage({
                            ...homepage,
                            trackRecord: { ...trackRecord, items: arr }
                          });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-navy-900 border border-navy-700 text-xs text-white font-hindi font-bold"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">चुनाव परिणाम स्थिति (Status)</label>
                      <select
                        value={item.status}
                        onChange={(e) => {
                          const arr = [...trackRecord.items];
                          arr[idx] = { ...arr[idx], status: e.target.value as "winner" | "runner-up" | "featured" };
                          setHomepage({
                            ...homepage,
                            trackRecord: { ...trackRecord, items: arr }
                          });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-navy-900 border border-navy-700 text-xs text-white cursor-pointer"
                      >
                        <option value="winner">🟢 WINNER (विजयी)</option>
                        <option value="runner-up">🟡 RUNNER-UP (उपविजेता)</option>
                        <option value="featured">🔵 FEATURED (मजबूत जनअभियान)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">पद / भूमिका (हिंदी)</label>
                      <input
                        type="text"
                        value={item.roleHi}
                        onChange={(e) => {
                          const arr = [...trackRecord.items];
                          arr[idx] = { ...arr[idx], roleHi: e.target.value };
                          setHomepage({
                            ...homepage,
                            trackRecord: { ...trackRecord, items: arr }
                          });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-navy-900 border border-navy-700 text-xs text-white font-hindi"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">पद / भूमिका (अंग्रेजी)</label>
                      <input
                        type="text"
                        value={item.roleEn}
                        onChange={(e) => {
                          const arr = [...trackRecord.items];
                          arr[idx] = { ...arr[idx], roleEn: e.target.value };
                          setHomepage({
                            ...homepage,
                            trackRecord: { ...trackRecord, items: arr }
                          });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-navy-900 border border-navy-700 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">क्षेत्र / विधानसभा / लोकसभा (Constituency)</label>
                      <input
                        type="text"
                        value={item.constituency}
                        onChange={(e) => {
                          const arr = [...trackRecord.items];
                          arr[idx] = { ...arr[idx], constituency: e.target.value };
                          setHomepage({
                            ...homepage,
                            trackRecord: { ...trackRecord, items: arr }
                          });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-navy-900 border border-navy-700 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">चुनाव नाम (Election Name)</label>
                      <input
                        type="text"
                        value={item.election}
                        onChange={(e) => {
                          const arr = [...trackRecord.items];
                          arr[idx] = { ...arr[idx], election: e.target.value };
                          setHomepage({
                            ...homepage,
                            trackRecord: { ...trackRecord, items: arr }
                          });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-navy-900 border border-navy-700 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5">
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">पार्टी बैज (Party)</label>
                      <input
                        type="text"
                        value={item.partyBadge || ""}
                        placeholder="BJP / SP / INC / ..."
                        onChange={(e) => {
                          const arr = [...trackRecord.items];
                          arr[idx] = { ...arr[idx], partyBadge: e.target.value };
                          setHomepage({
                            ...homepage,
                            trackRecord: { ...trackRecord, items: arr }
                          });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-navy-900 border border-navy-700 text-xs text-accent-gold font-bold font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">हाईलाइट टैग (Badge)</label>
                      <input
                        type="text"
                        value={item.highlight || ""}
                        placeholder="विजयी सांसद / ..."
                        onChange={(e) => {
                          const arr = [...trackRecord.items];
                          arr[idx] = { ...arr[idx], highlight: e.target.value };
                          setHomepage({
                            ...homepage,
                            trackRecord: { ...trackRecord, items: arr }
                          });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-navy-900 border border-navy-700 text-xs text-white font-hindi"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">वोट / प्राप्त मत (Optional)</label>
                      <input
                        type="text"
                        value={item.votes || ""}
                        placeholder="2,82,000+ मत"
                        onChange={(e) => {
                          const arr = [...trackRecord.items];
                          arr[idx] = { ...arr[idx], votes: e.target.value };
                          setHomepage({
                            ...homepage,
                            trackRecord: { ...trackRecord, items: arr }
                          });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-navy-900 border border-navy-700 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* =======================================================
          5. FOUNDER'S DESK MESSAGE
          ======================================================= */}
      {activeSubTab === "founder" && (
        <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800 space-y-6">
          <div className="border-b border-navy-800 pb-3">
            <h4 className="text-base font-bold text-accent-gold font-hindi">5. संस्थापक संदेश (Founder's Desk Message & Profile)</h4>
            <p className="text-xs text-slate-400">होमपेज पर संस्थापक श्री अनुज तिवारी का चित्र, क्रेडेंशियल्स, संदेश, कोट और दोनों एक्शन बटन।</p>
          </div>

          {/* Profile Card Info */}
          <div className="p-5 rounded-2xl bg-navy-950 border border-navy-800 space-y-4">
            <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider">संस्थापक प्रोफाइल एवं चित्र (Founder Profile)</h5>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
              <div className="md:col-span-3 space-y-2">
                <label className="block text-xs font-semibold text-slate-300">फोटो प्रीव्यू (Photo Preview)</label>
                <div className="relative aspect-[3/4] max-w-[180px] rounded-xl overflow-hidden bg-black/60 border border-navy-700 flex items-center justify-center">
                  {founderMessage.photoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={founderMessage.photoUrl}
                      alt={founderMessage.founderName || "Founder photo"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-xs text-slate-500">फोटो नहीं है</div>
                  )}
                </div>
              </div>

              <div className="md:col-span-9 space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">फोटो URL (Photo URL)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={founderMessage.photoUrl || ""}
                      onChange={(e) => setHomepage({
                        ...homepage,
                        founderMessage: { ...founderMessage, photoUrl: e.target.value }
                      })}
                      className="flex-1 px-3 py-2 rounded-xl bg-navy-900 border border-navy-700 text-xs text-white font-mono"
                    />
                    <label className="px-3.5 py-2 rounded-xl bg-navy-800 hover:bg-navy-750 text-accent-gold hover:text-white border border-navy-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer flex-shrink-0">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{uploadingField === "founder-photo" ? "अपलोड..." : "अपलोड करें"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        disabled={uploadingField === "founder-photo"}
                        onChange={(e) => handleImageUpload(e, (url) => {
                          setHomepage({
                            ...homepage,
                            founderMessage: { ...founderMessage, photoUrl: url }
                          });
                        }, "founder-photo")}
                      />
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">संस्थापक का नाम (Founder Name)</label>
                    <input
                      type="text"
                      value={founderMessage.founderName || ""}
                      onChange={(e) => setHomepage({
                        ...homepage,
                        founderMessage: { ...founderMessage, founderName: e.target.value }
                      })}
                      className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-navy-700 text-xs text-white font-hindi font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">कंपनी का नाम (Company Name)</label>
                    <input
                      type="text"
                      value={founderMessage.companyName || ""}
                      onChange={(e) => setHomepage({
                        ...homepage,
                        founderMessage: { ...founderMessage, companyName: e.target.value }
                      })}
                      className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-navy-700 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">पदनाम (हिंदी) [Role Hi]</label>
                    <input
                      type="text"
                      value={founderMessage.founderRoleHi || ""}
                      onChange={(e) => setHomepage({
                        ...homepage,
                        founderMessage: { ...founderMessage, founderRoleHi: e.target.value }
                      })}
                      className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-navy-700 text-xs text-white font-hindi"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">पदनाम (अंग्रेजी) [Role En]</label>
                    <input
                      type="text"
                      value={founderMessage.founderRoleEn || ""}
                      onChange={(e) => setHomepage({
                        ...homepage,
                        founderMessage: { ...founderMessage, founderRoleEn: e.target.value }
                      })}
                      className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-navy-700 text-xs text-white"
                    />
                  </div>
                </div>

                {/* 2 Stats below photo */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-2.5 rounded-xl bg-navy-900 border border-navy-800 space-y-1.5">
                    <span className="text-[11px] font-bold text-accent-gold block">आंकड़ा 1 (Stat 1: अनुभव)</span>
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="text"
                        placeholder="संख्या e.g. 10+ वर्ष"
                        value={founderMessage.stat1Value || ""}
                        onChange={(e) => setHomepage({
                          ...homepage,
                          founderMessage: { ...founderMessage, stat1Value: e.target.value }
                        })}
                        className="px-2 py-1.5 rounded-lg bg-navy-950 border border-navy-700 text-xs text-accent-orange font-bold font-mono"
                      />
                      <input
                        type="text"
                        placeholder="लेबल (हिंदी)"
                        value={founderMessage.stat1LabelHi || ""}
                        onChange={(e) => setHomepage({
                          ...homepage,
                          founderMessage: { ...founderMessage, stat1LabelHi: e.target.value }
                        })}
                        className="col-span-2 px-2 py-1.5 rounded-lg bg-navy-950 border border-navy-700 text-xs text-slate-300"
                      />
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-navy-900 border border-navy-800 space-y-1.5">
                    <span className="text-[11px] font-bold text-accent-gold block">आंकड़ा 2 (Stat 2: चुनाव संख्या)</span>
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="text"
                        placeholder="संख्या e.g. 50+ चुनाव"
                        value={founderMessage.stat2Value || ""}
                        onChange={(e) => setHomepage({
                          ...homepage,
                          founderMessage: { ...founderMessage, stat2Value: e.target.value }
                        })}
                        className="px-2 py-1.5 rounded-lg bg-navy-950 border border-navy-700 text-xs text-accent-orange font-bold font-mono"
                      />
                      <input
                        type="text"
                        placeholder="लेबल (हिंदी)"
                        value={founderMessage.stat2LabelHi || ""}
                        onChange={(e) => setHomepage({
                          ...homepage,
                          founderMessage: { ...founderMessage, stat2LabelHi: e.target.value }
                        })}
                        className="col-span-2 px-2 py-1.5 rounded-lg bg-navy-950 border border-navy-700 text-xs text-slate-300"
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Message Text Content */}
          <div className="p-5 rounded-2xl bg-navy-950 border border-navy-800 space-y-4">
            <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider">संदेश सामग्री (Message Letter Content)</h5>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">अनुभाग बैज (हिंदी)</label>
                <input
                  type="text"
                  value={founderMessage.badgeHi || ""}
                  onChange={(e) => setHomepage({
                    ...homepage,
                    founderMessage: { ...founderMessage, badgeHi: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-navy-700 text-xs text-white font-hindi"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">अनुभाग बैज (अंग्रेजी)</label>
                <input
                  type="text"
                  value={founderMessage.badgeEn || ""}
                  onChange={(e) => setHomepage({
                    ...homepage,
                    founderMessage: { ...founderMessage, badgeEn: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-navy-700 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-accent-gold mb-1">मुख्य उद्धरण शीर्षक (Headline Quote Hindi)</label>
              <textarea
                rows={2}
                value={founderMessage.headingHi || ""}
                onChange={(e) => setHomepage({
                  ...homepage,
                  founderMessage: { ...founderMessage, headingHi: e.target.value }
                })}
                className="w-full p-2.5 rounded-xl bg-navy-900 border border-accent-gold/40 text-sm font-bold text-white font-hindi"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">संबोधन (Salutation Hindi)</label>
              <input
                type="text"
                value={founderMessage.salutationHi || ""}
                onChange={(e) => setHomepage({
                  ...homepage,
                  founderMessage: { ...founderMessage, salutationHi: e.target.value }
                })}
                className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-navy-700 text-xs text-white font-hindi font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">पैराग्राफ 1 (Paragraph 1 Hindi)</label>
              <textarea
                rows={3}
                value={founderMessage.p1Hi || ""}
                onChange={(e) => setHomepage({
                  ...homepage,
                  founderMessage: { ...founderMessage, p1Hi: e.target.value }
                })}
                className="w-full p-2.5 rounded-xl bg-navy-900 border border-navy-700 text-xs text-slate-200 font-hindi"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">पैराग्राफ 2 (Paragraph 2 Hindi)</label>
              <textarea
                rows={3}
                value={founderMessage.p2Hi || ""}
                onChange={(e) => setHomepage({
                  ...homepage,
                  founderMessage: { ...founderMessage, p2Hi: e.target.value }
                })}
                className="w-full p-2.5 rounded-xl bg-navy-900 border border-navy-700 text-xs text-slate-200 font-hindi"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">पैराग्राफ 3 (Paragraph 3 Hindi)</label>
              <textarea
                rows={3}
                value={founderMessage.p3Hi || ""}
                onChange={(e) => setHomepage({
                  ...homepage,
                  founderMessage: { ...founderMessage, p3Hi: e.target.value }
                })}
                className="w-full p-2.5 rounded-xl bg-navy-900 border border-navy-700 text-xs text-slate-200 font-hindi"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-accent-orange mb-1">हाइलाइटेड कोट बॉक्स (Highlighted Quote Box)</label>
              <textarea
                rows={2}
                value={founderMessage.quoteBoxHi || ""}
                onChange={(e) => setHomepage({
                  ...homepage,
                  founderMessage: { ...founderMessage, quoteBoxHi: e.target.value }
                })}
                className="w-full p-2.5 rounded-xl bg-navy-900 border border-accent-orange/50 text-xs font-bold text-accent-gold font-hindi"
              />
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-3.5 rounded-xl bg-navy-900 border border-navy-800 space-y-2">
                <span className="text-xs font-bold text-accent-orange block">प्राथमिक बटन 1 (Primary Action CTA)</span>
                <input
                  type="text"
                  placeholder="बटन टेक्स्ट (हिंदी)"
                  value={founderMessage.button1TextHi || ""}
                  onChange={(e) => setHomepage({
                    ...homepage,
                    founderMessage: { ...founderMessage, button1TextHi: e.target.value }
                  })}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-navy-950 border border-navy-700 text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="लिंक (URL) e.g. /contact"
                  value={founderMessage.button1Link || ""}
                  onChange={(e) => setHomepage({
                    ...homepage,
                    founderMessage: { ...founderMessage, button1Link: e.target.value }
                  })}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-navy-950 border border-navy-700 text-xs text-white font-mono"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-navy-900 border border-navy-800 space-y-2">
                <span className="text-xs font-bold text-accent-gold block">द्वितीयक बटन 2 (Secondary Action CTA)</span>
                <input
                  type="text"
                  placeholder="बटन टेक्स्ट (हिंदी)"
                  value={founderMessage.button2TextHi || ""}
                  onChange={(e) => setHomepage({
                    ...homepage,
                    founderMessage: { ...founderMessage, button2TextHi: e.target.value }
                  })}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-navy-950 border border-navy-700 text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="लिंक (URL) e.g. /about"
                  value={founderMessage.button2Link || ""}
                  onChange={(e) => setHomepage({
                    ...homepage,
                    founderMessage: { ...founderMessage, button2Link: e.target.value }
                  })}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-navy-950 border border-navy-700 text-xs text-white font-mono"
                />
              </div>
            </div>

          </div>

        </div>
      )}

      {/* =======================================================
          3. TRUST STRIP (6 CARDS)
          ======================================================= */}
      {activeSubTab === "trust" && (
        <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800 space-y-5">
          <div className="border-b border-navy-800 pb-3">
            <h4 className="text-base font-bold text-accent-gold font-hindi">3. ट्रस्ट स्ट्रिप (6 प्रमुख आंकड़े / बैज)</h4>
            <p className="text-xs text-slate-400">हीरो के ठीक नीचे प्रदर्शित होने वाले 6 ट्रस्ट बैज (संख्या, शीर्षक, विवरण)।</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {homepage.trustStrip.items.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-navy-950 border border-navy-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-accent-orange">कार्ड #{idx + 1}</span>
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">संख्या / मुख्य शब्द (Stat)</label>
                  <input
                    type="text"
                    value={item.stat}
                    onChange={(e) => {
                      const updated = [...homepage.trustStrip.items];
                      updated[idx] = { ...updated[idx], stat: e.target.value };
                      setHomepage({ ...homepage, trustStrip: { items: updated } });
                    }}
                    className="w-full px-3 py-1.5 rounded-lg bg-navy-900 border border-navy-700 text-sm text-white font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">शीर्षक (Label Hindi)</label>
                  <input
                    type="text"
                    value={item.labelHi}
                    onChange={(e) => {
                      const updated = [...homepage.trustStrip.items];
                      updated[idx] = { ...updated[idx], labelHi: e.target.value };
                      setHomepage({ ...homepage, trustStrip: { items: updated } });
                    }}
                    className="w-full px-3 py-1.5 rounded-lg bg-navy-900 border border-navy-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">छोटा विवरण (Desc Hindi)</label>
                  <input
                    type="text"
                    value={item.descHi}
                    onChange={(e) => {
                      const updated = [...homepage.trustStrip.items];
                      updated[idx] = { ...updated[idx], descHi: e.target.value };
                      setHomepage({ ...homepage, trustStrip: { items: updated } });
                    }}
                    className="w-full px-3 py-1.5 rounded-lg bg-navy-900 border border-navy-700 text-xs text-slate-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =======================================================
          4. ABOUT TEASER & 3 PILLAR CARDS
          ======================================================= */}
      {activeSubTab === "about" && (
        <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800 space-y-5">
          <div className="border-b border-navy-800 pb-3">
            <h4 className="text-base font-bold text-accent-gold font-hindi">4. अबाउट टीज़र एवं 3 पिलर कार्ड्स</h4>
            <p className="text-xs text-slate-400">"चुनाव अभियान केवल प्रचार नहीं..." अनुभाग और 3 मुख्य पिलर कार्ड्स।</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">बैज टेक्स्ट</label>
              <input
                type="text"
                value={homepage.aboutTeaser.badgeHi}
                onChange={(e) => setHomepage({
                  ...homepage,
                  aboutTeaser: { ...homepage.aboutTeaser, badgeHi: e.target.value }
                })}
                className="w-full px-3.5 py-2 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">हेडिंग भाग 1</label>
              <input
                type="text"
                value={homepage.aboutTeaser.heading1}
                onChange={(e) => setHomepage({
                  ...homepage,
                  aboutTeaser: { ...homepage.aboutTeaser, heading1: e.target.value }
                })}
                className="w-full px-3.5 py-2 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">हेडिंग भाग 2 (ऑरेंज)</label>
              <input
                type="text"
                value={homepage.aboutTeaser.heading2}
                onChange={(e) => setHomepage({
                  ...homepage,
                  aboutTeaser: { ...homepage.aboutTeaser, heading2: e.target.value }
                })}
                className="w-full px-3.5 py-2 rounded-xl bg-navy-950 border border-navy-700 text-sm text-accent-orange font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">पैराग्राफ 1</label>
              <textarea
                rows={3}
                value={homepage.aboutTeaser.p1}
                onChange={(e) => setHomepage({
                  ...homepage,
                  aboutTeaser: { ...homepage.aboutTeaser, p1: e.target.value }
                })}
                className="w-full p-3 rounded-xl bg-navy-950 border border-navy-700 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">पैराग्राफ 2</label>
              <textarea
                rows={3}
                value={homepage.aboutTeaser.p2}
                onChange={(e) => setHomepage({
                  ...homepage,
                  aboutTeaser: { ...homepage.aboutTeaser, p2: e.target.value }
                })}
                className="w-full p-3 rounded-xl bg-navy-950 border border-navy-700 text-xs text-white"
              />
            </div>
          </div>

          {/* Left Highlight Box */}
          <div className="p-4 rounded-xl bg-navy-950 border border-navy-800 space-y-3">
            <span className="text-xs font-mono font-bold text-accent-orange">बाईं ओर का हाईलाइट बॉक्स (Integrated Architecture)</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">हाईलाइट शीर्षक</label>
                <input
                  type="text"
                  value={homepage.aboutTeaser.highlightTitle}
                  onChange={(e) => setHomepage({
                    ...homepage,
                    aboutTeaser: { ...homepage.aboutTeaser, highlightTitle: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded-lg bg-navy-900 border border-navy-700 text-sm text-white font-bold"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">हाईलाइट उप-शीर्षक (गोल्ड)</label>
                <input
                  type="text"
                  value={homepage.aboutTeaser.highlightSub}
                  onChange={(e) => setHomepage({
                    ...homepage,
                    aboutTeaser: { ...homepage.aboutTeaser, highlightSub: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded-lg bg-navy-900 border border-navy-700 text-sm text-accent-gold"
                />
              </div>
            </div>
          </div>

          {/* 3 Pillar Cards */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-mono font-bold text-slate-300">दाईं ओर के 3 पिलर कार्ड्स</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {homepage.aboutTeaser.cards.map((card, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-navy-950 border border-navy-800 space-y-2">
                  <span className="text-[11px] font-mono text-accent-gold block">कार्ड #{idx + 1}</span>
                  <input
                    type="text"
                    value={card.tag}
                    placeholder="टैग (उदा: डेटा व रिसर्च)"
                    onChange={(e) => {
                      const updated = [...homepage.aboutTeaser.cards];
                      updated[idx] = { ...updated[idx], tag: e.target.value };
                      setHomepage({ ...homepage, aboutTeaser: { ...homepage.aboutTeaser, cards: updated } });
                    }}
                    className="w-full px-3 py-1.5 rounded-lg bg-navy-900 border border-navy-700 text-xs text-accent-orange font-bold"
                  />
                  <input
                    type="text"
                    value={card.title}
                    placeholder="कार्ड का शीर्षक"
                    onChange={(e) => {
                      const updated = [...homepage.aboutTeaser.cards];
                      updated[idx] = { ...updated[idx], title: e.target.value };
                      setHomepage({ ...homepage, aboutTeaser: { ...homepage.aboutTeaser, cards: updated } });
                    }}
                    className="w-full px-3 py-1.5 rounded-lg bg-navy-900 border border-navy-700 text-xs text-white font-bold"
                  />
                  <textarea
                    rows={2}
                    value={card.desc}
                    placeholder="कार्ड विवरण..."
                    onChange={(e) => {
                      const updated = [...homepage.aboutTeaser.cards];
                      updated[idx] = { ...updated[idx], desc: e.target.value };
                      setHomepage({ ...homepage, aboutTeaser: { ...homepage.aboutTeaser, cards: updated } });
                    }}
                    className="w-full p-2.5 rounded-lg bg-navy-900 border border-navy-700 text-xs text-slate-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =======================================================
          5. 11 SERVICES GRID SECTION
          ======================================================= */}
      {activeSubTab === "services" && (
        <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800 space-y-6">
          <div className="border-b border-navy-800 pb-3">
            <h4 className="text-base font-bold text-accent-gold font-hindi">5. सभी 11 चुनावी सेवाएं (11 Services Section)</h4>
            <p className="text-xs text-slate-400">होमपेज पर प्रदर्शित होने वाले 11 सेवा कार्ड्स के शीर्षक, टैग और विवरण संपादित करें।</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">सेक्शन बैज</label>
              <input
                type="text"
                value={homepage.servicesSection.badgeHi}
                onChange={(e) => setHomepage({
                  ...homepage,
                  servicesSection: { ...homepage.servicesSection, badgeHi: e.target.value }
                })}
                className="w-full px-3.5 py-2 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">मुख्य हेडिंग</label>
              <input
                type="text"
                value={homepage.servicesSection.headingHi}
                onChange={(e) => setHomepage({
                  ...homepage,
                  servicesSection: { ...homepage.servicesSection, headingHi: e.target.value }
                })}
                className="w-full px-3.5 py-2 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white font-bold"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">उप-विवरण (Subtitle)</label>
              <input
                type="text"
                value={homepage.servicesSection.subHi}
                onChange={(e) => setHomepage({
                  ...homepage,
                  servicesSection: { ...homepage.servicesSection, subHi: e.target.value }
                })}
                className="w-full px-3.5 py-2 rounded-xl bg-navy-950 border border-navy-700 text-sm text-slate-300"
              />
            </div>
          </div>

          {/* 11 Services List */}
          <div className="space-y-4 pt-2">
            <span className="text-xs font-mono font-bold text-slate-300 block">प्रत्येक सेवा का विवरण संपादित करें (11 Services):</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {homepage.servicesSection.services.map((srv, idx) => (
                <div key={srv.id} className="p-4 rounded-xl bg-navy-950 border border-navy-800 space-y-2.5">
                  <div className="flex items-center justify-between border-b border-navy-850 pb-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-navy-900 text-accent-gold border border-navy-800">
                      #{srv.id}
                    </span>
                    <input
                      type="text"
                      value={srv.tagHi}
                      placeholder="टैग (उदा: डिजिटल नैरेटिव)"
                      onChange={(e) => {
                        const updated = [...homepage.servicesSection.services];
                        updated[idx] = { ...updated[idx], tagHi: e.target.value };
                        setHomepage({ ...homepage, servicesSection: { ...homepage.servicesSection, services: updated } });
                      }}
                      className="text-[11px] px-2 py-1 rounded bg-navy-900 border border-navy-700 text-accent-orange font-semibold"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">सेवा का नाम (हिन्दी)</label>
                    <input
                      type="text"
                      value={srv.titleHi}
                      onChange={(e) => {
                        const updated = [...homepage.servicesSection.services];
                        updated[idx] = { ...updated[idx], titleHi: e.target.value };
                        setHomepage({ ...homepage, servicesSection: { ...homepage.servicesSection, services: updated } });
                      }}
                      className="w-full px-3 py-1.5 rounded-lg bg-navy-900 border border-navy-700 text-xs text-white font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">संक्षिप्त विवरण (Short Description)</label>
                    <textarea
                      rows={2}
                      value={srv.shortDescHi}
                      onChange={(e) => {
                        const updated = [...homepage.servicesSection.services];
                        updated[idx] = { ...updated[idx], shortDescHi: e.target.value };
                        setHomepage({ ...homepage, servicesSection: { ...homepage.servicesSection, services: updated } });
                      }}
                      className="w-full p-2.5 rounded-lg bg-navy-900 border border-navy-700 text-xs text-slate-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =======================================================
          6. ONE AGENCY 7 PILLARS
          ======================================================= */}
      {activeSubTab === "pillars" && (
        <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800 space-y-6">
          <div className="border-b border-navy-800 pb-3">
            <h4 className="text-base font-bold text-accent-gold font-hindi">6. 7 मजबूत स्तंभ (One Agency 7 Pillars)</h4>
            <p className="text-xs text-slate-400">"एक एजेंसी। संपूर्ण चुनावी अभियान।" के 7 स्तंभ।</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">शीर्षक 1</label>
              <input
                type="text"
                value={homepage.oneAgency.title1}
                onChange={(e) => setHomepage({
                  ...homepage,
                  oneAgency: { ...homepage.oneAgency, title1: e.target.value }
                })}
                className="w-full px-3.5 py-2 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white font-bold"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">शीर्षक 2 (ऑरेंज)</label>
              <input
                type="text"
                value={homepage.oneAgency.title2}
                onChange={(e) => setHomepage({
                  ...homepage,
                  oneAgency: { ...homepage.oneAgency, title2: e.target.value }
                })}
                className="w-full px-3.5 py-2 rounded-xl bg-navy-950 border border-navy-700 text-sm text-accent-orange font-bold"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">उप-विवरण (Sub)</label>
              <input
                type="text"
                value={homepage.oneAgency.sub}
                onChange={(e) => setHomepage({
                  ...homepage,
                  oneAgency: { ...homepage.oneAgency, sub: e.target.value }
                })}
                className="w-full px-3.5 py-2 rounded-xl bg-navy-950 border border-navy-700 text-sm text-slate-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {homepage.oneAgency.pillars.map((pil, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-navy-950 border border-navy-800 space-y-2">
                <span className="text-[11px] font-mono font-bold text-accent-gold block">स्तंभ #{idx + 1} ({pil.name})</span>
                <input
                  type="text"
                  value={pil.nameHi}
                  placeholder="स्तंभ नाम हिन्दी"
                  onChange={(e) => {
                    const updated = [...homepage.oneAgency.pillars];
                    updated[idx] = { ...updated[idx], nameHi: e.target.value };
                    setHomepage({ ...homepage, oneAgency: { ...homepage.oneAgency, pillars: updated } });
                  }}
                  className="w-full px-3 py-1.5 rounded-lg bg-navy-900 border border-navy-700 text-xs text-white font-bold"
                />
                <input
                  type="text"
                  value={pil.desc}
                  placeholder="विवरण"
                  onChange={(e) => {
                    const updated = [...homepage.oneAgency.pillars];
                    updated[idx] = { ...updated[idx], desc: e.target.value };
                    setHomepage({ ...homepage, oneAgency: { ...homepage.oneAgency, pillars: updated } });
                  }}
                  className="w-full px-3 py-1.5 rounded-lg bg-navy-900 border border-navy-700 text-xs text-slate-300"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =======================================================
          7. 7-STEP PROCESS ROADMAP
          ======================================================= */}
      {activeSubTab === "process" && (
        <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800 space-y-6">
          <div className="border-b border-navy-800 pb-3">
            <h4 className="text-base font-bold text-accent-gold font-hindi">7. 7-चरण कार्यप्रणाली (7-Step Process)</h4>
            <p className="text-xs text-slate-400">होमपेज पर कार्यप्रणाली के 7 चरण (DATA, STRATEGY, CONTENT, आदि)।</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">मुख्य हेडिंग</label>
              <input
                type="text"
                value={homepage.process.heading}
                onChange={(e) => setHomepage({
                  ...homepage,
                  process: { ...homepage.process, heading: e.target.value }
                })}
                className="w-full px-3.5 py-2 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white font-bold"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">सबटाइटल</label>
              <input
                type="text"
                value={homepage.process.sub}
                onChange={(e) => setHomepage({
                  ...homepage,
                  process: { ...homepage.process, sub: e.target.value }
                })}
                className="w-full px-3.5 py-2 rounded-xl bg-navy-950 border border-navy-700 text-sm text-slate-300"
              />
            </div>
          </div>

          <div className="space-y-3 pt-2">
            {homepage.process.steps.map((step, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-navy-950 border border-navy-800 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-navy-900 text-accent-gold border border-navy-800">{step.num}</span>
                <input
                  type="text"
                  value={step.title}
                  placeholder="चरण का नाम"
                  onChange={(e) => {
                    const updated = [...homepage.process.steps];
                    updated[idx] = { ...updated[idx], title: e.target.value };
                    setHomepage({ ...homepage, process: { ...homepage.process, steps: updated } });
                  }}
                  className="w-full sm:w-44 px-3 py-1.5 rounded-lg bg-navy-900 border border-navy-700 text-xs text-white font-bold"
                />
                <input
                  type="text"
                  value={step.desc}
                  placeholder="चरण विवरण"
                  onChange={(e) => {
                    const updated = [...homepage.process.steps];
                    updated[idx] = { ...updated[idx], desc: e.target.value };
                    setHomepage({ ...homepage, process: { ...homepage.process, steps: updated } });
                  }}
                  className="w-full px-3 py-1.5 rounded-lg bg-navy-900 border border-navy-700 text-xs text-slate-300"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =======================================================
          8. COMMAND CENTER MATRIX
          ======================================================= */}
      {activeSubTab === "command" && (
        <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800 space-y-6">
          <div className="border-b border-navy-800 pb-3">
            <h4 className="text-base font-bold text-accent-gold font-hindi">8. कमांड सेंटर मैट्रिक्स (Command Center Preview)</h4>
            <p className="text-xs text-slate-400">"अभियान की हर गतिविधि पर नज़र।" अनुभाग का विवरण व मैट्रिक्स आंकड़े।</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">शीर्षक (Heading)</label>
              <input
                type="text"
                value={homepage.commandCenter.heading}
                onChange={(e) => setHomepage({
                  ...homepage,
                  commandCenter: { ...homepage.commandCenter, heading: e.target.value }
                })}
                className="w-full px-3.5 py-2 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white font-bold"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">बैज टेक्स्ट</label>
              <input
                type="text"
                value={homepage.commandCenter.badgeHi}
                onChange={(e) => setHomepage({
                  ...homepage,
                  commandCenter: { ...homepage.commandCenter, badgeHi: e.target.value }
                })}
                className="w-full px-3.5 py-2 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">विवरण पैराग्राफ</label>
            <textarea
              rows={2}
              value={homepage.commandCenter.desc}
              onChange={(e) => setHomepage({
                ...homepage,
                commandCenter: { ...homepage.commandCenter, desc: e.target.value }
              })}
              className="w-full p-3 rounded-xl bg-navy-950 border border-navy-700 text-xs text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 block">3 प्रमुख बुलेट्स</label>
            <input
              type="text"
              value={homepage.commandCenter.bullet1}
              onChange={(e) => setHomepage({
                ...homepage,
                commandCenter: { ...homepage.commandCenter, bullet1: e.target.value }
              })}
              className="w-full px-3.5 py-2 rounded-lg bg-navy-950 border border-navy-700 text-xs text-slate-200 mb-1"
            />
            <input
              type="text"
              value={homepage.commandCenter.bullet2}
              onChange={(e) => setHomepage({
                ...homepage,
                commandCenter: { ...homepage.commandCenter, bullet2: e.target.value }
              })}
              className="w-full px-3.5 py-2 rounded-lg bg-navy-950 border border-navy-700 text-xs text-slate-200 mb-1"
            />
            <input
              type="text"
              value={homepage.commandCenter.bullet3}
              onChange={(e) => setHomepage({
                ...homepage,
                commandCenter: { ...homepage.commandCenter, bullet3: e.target.value }
              })}
              className="w-full px-3.5 py-2 rounded-lg bg-navy-950 border border-navy-700 text-xs text-slate-200"
            />
          </div>
        </div>
      )}

      {/* =======================================================
          9. INTERACTIVE UP STRATEGIC MAP
          ======================================================= */}
      {activeSubTab === "map" && (
        <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800 space-y-6">
          <div className="border-b border-navy-800 pb-3">
            <h4 className="text-base font-bold text-accent-gold font-hindi">9. यूपी रणनीतिक मैप (Interactive UP Strategic Map)</h4>
            <p className="text-xs text-slate-400">403 विधानसभाओं की भौगोलिक कवरेज और पांचों क्षेत्रों (पूर्वांचल, अवध, पश्चिमी यूपी, आदि) की जानकारी।</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">मुख्य हेडिंग</label>
              <input
                type="text"
                value={homepage.interactiveMap.heading}
                onChange={(e) => setHomepage({
                  ...homepage,
                  interactiveMap: { ...homepage.interactiveMap, heading: e.target.value }
                })}
                className="w-full px-3.5 py-2 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white font-bold"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">सबटाइटल</label>
              <input
                type="text"
                value={homepage.interactiveMap.sub}
                onChange={(e) => setHomepage({
                  ...homepage,
                  interactiveMap: { ...homepage.interactiveMap, sub: e.target.value }
                })}
                className="w-full px-3.5 py-2 rounded-xl bg-navy-950 border border-navy-700 text-sm text-slate-300"
              />
            </div>
          </div>
        </div>
      )}

      {/* =======================================================
          10. WHY CHOOSE WORKFORCE (8 CARDS)
          ======================================================= */}
      {activeSubTab === "why" && (
        <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800 space-y-6">
          <div className="border-b border-navy-800 pb-3">
            <h4 className="text-base font-bold text-accent-gold font-hindi">10. वर्कफोर्स क्यों चुनें (8 Advantage Cards)</h4>
            <p className="text-xs text-slate-400">हेडिंग, सबटाइटल और आठों रणनीतिक लाभ कार्ड्स।</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">मुख्य हेडिंग</label>
              <input
                type="text"
                value={homepage.whyChooseUs.heading}
                onChange={(e) => setHomepage({
                  ...homepage,
                  whyChooseUs: { ...homepage.whyChooseUs, heading: e.target.value }
                })}
                className="w-full px-3.5 py-2 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white font-bold"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">सबटाइटल</label>
              <input
                type="text"
                value={homepage.whyChooseUs.sub}
                onChange={(e) => setHomepage({
                  ...homepage,
                  whyChooseUs: { ...homepage.whyChooseUs, sub: e.target.value }
                })}
                className="w-full px-3.5 py-2 rounded-xl bg-navy-950 border border-navy-700 text-sm text-slate-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {homepage.whyChooseUs.cards.map((card, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-navy-950 border border-navy-800 space-y-2">
                <span className="text-[11px] font-mono text-accent-gold block">कार्ड #{idx + 1}</span>
                <input
                  type="text"
                  value={card.title}
                  placeholder="कार्ड शीर्षक"
                  onChange={(e) => {
                    const updated = [...homepage.whyChooseUs.cards];
                    updated[idx] = { ...updated[idx], title: e.target.value };
                    setHomepage({ ...homepage, whyChooseUs: { ...homepage.whyChooseUs, cards: updated } });
                  }}
                  className="w-full px-3 py-1.5 rounded-lg bg-navy-900 border border-navy-700 text-xs text-white font-bold"
                />
                <textarea
                  rows={2}
                  value={card.desc}
                  placeholder="विवरण..."
                  onChange={(e) => {
                    const updated = [...homepage.whyChooseUs.cards];
                    updated[idx] = { ...updated[idx], desc: e.target.value };
                    setHomepage({ ...homepage, whyChooseUs: { ...homepage.whyChooseUs, cards: updated } });
                  }}
                  className="w-full p-2.5 rounded-lg bg-navy-900 border border-navy-700 text-xs text-slate-300"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =======================================================
          11. 1000+ TEAM SECTION
          ======================================================= */}
      {activeSubTab === "team" && (
        <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800 space-y-6">
          <div className="border-b border-navy-800 pb-3">
            <h4 className="text-base font-bold text-accent-gold font-hindi">11. 1000+ प्रोफेशनल्स टीम (Team Section)</h4>
            <p className="text-xs text-slate-400">टीम की क्षमता, विशेषज्ञता और 4 प्रमुख संगठनात्मक विंग्स।</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">मुख्य हेडिंग</label>
              <input
                type="text"
                value={homepage.teamSection.heading}
                onChange={(e) => setHomepage({
                  ...homepage,
                  teamSection: { ...homepage.teamSection, heading: e.target.value }
                })}
                className="w-full px-3.5 py-2 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white font-bold"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">सबटाइटल</label>
              <input
                type="text"
                value={homepage.teamSection.sub}
                onChange={(e) => setHomepage({
                  ...homepage,
                  teamSection: { ...homepage.teamSection, sub: e.target.value }
                })}
                className="w-full px-3.5 py-2 rounded-xl bg-navy-950 border border-navy-700 text-sm text-slate-300"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">प्रूफ बैज (1000+ Team)</label>
              <input
                type="text"
                value={homepage.teamSection.proofBadge}
                onChange={(e) => setHomepage({
                  ...homepage,
                  teamSection: { ...homepage.teamSection, proofBadge: e.target.value }
                })}
                className="w-full px-3.5 py-2 rounded-xl bg-navy-950 border border-navy-700 text-sm text-accent-gold font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {homepage.teamSection.categories.map((cat, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-navy-950 border border-navy-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-accent-gold">विंग #{idx + 1}</span>
                  <input
                    type="text"
                    value={cat.size}
                    placeholder="टीम आकार (उदा: 120+ विशेषज्ञ)"
                    onChange={(e) => {
                      const updated = [...homepage.teamSection.categories];
                      updated[idx] = { ...updated[idx], size: e.target.value };
                      setHomepage({ ...homepage, teamSection: { ...homepage.teamSection, categories: updated } });
                    }}
                    className="text-[11px] px-2 py-1 rounded bg-navy-900 border border-navy-700 text-emerald-400 font-mono"
                  />
                </div>
                <input
                  type="text"
                  value={cat.title}
                  placeholder="विंग का नाम"
                  onChange={(e) => {
                    const updated = [...homepage.teamSection.categories];
                    updated[idx] = { ...updated[idx], title: e.target.value };
                    setHomepage({ ...homepage, teamSection: { ...homepage.teamSection, categories: updated } });
                  }}
                  className="w-full px-3 py-1.5 rounded-lg bg-navy-900 border border-navy-700 text-xs text-white font-bold"
                />
                <textarea
                  rows={2}
                  value={cat.desc}
                  placeholder="विवरण..."
                  onChange={(e) => {
                    const updated = [...homepage.teamSection.categories];
                    updated[idx] = { ...updated[idx], desc: e.target.value };
                    setHomepage({ ...homepage, teamSection: { ...homepage.teamSection, categories: updated } });
                  }}
                  className="w-full p-2.5 rounded-lg bg-navy-900 border border-navy-700 text-xs text-slate-300"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =======================================================
          12. TECH STACK INFRASTRUCTURE
          ======================================================= */}
      {activeSubTab === "tech" && (
        <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800 space-y-6">
          <div className="border-b border-navy-800 pb-3">
            <h4 className="text-base font-bold text-accent-gold font-hindi">12. तकनीकी अवसंरचना (Technology Stack)</h4>
            <p className="text-xs text-slate-400">तकनीकी प्लेटफॉर्म, क्लाउड सिस्टम और मोबाइल ऐप्स का विवरण।</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">मुख्य हेडिंग</label>
              <input
                type="text"
                value={homepage.techSection.heading}
                onChange={(e) => setHomepage({
                  ...homepage,
                  techSection: { ...homepage.techSection, heading: e.target.value }
                })}
                className="w-full px-3.5 py-2 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white font-bold"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">सबटाइटल</label>
              <input
                type="text"
                value={homepage.techSection.sub}
                onChange={(e) => setHomepage({
                  ...homepage,
                  techSection: { ...homepage.techSection, sub: e.target.value }
                })}
                className="w-full px-3.5 py-2 rounded-xl bg-navy-950 border border-navy-700 text-sm text-slate-300"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">अनुपालन अस्वीकरण (ECI Disclaimer)</label>
            <input
              type="text"
              value={homepage.techSection.disclaimer}
              onChange={(e) => setHomepage({
                ...homepage,
                techSection: { ...homepage.techSection, disclaimer: e.target.value }
              })}
              className="w-full px-3.5 py-2 rounded-xl bg-navy-950 border border-navy-700 text-xs text-slate-400"
            />
          </div>
        </div>
      )}

      {/* =======================================================
          13. SOLUTION SHOWCASE (6 CONCEPTS)
          ======================================================= */}
      {activeSubTab === "solutions" && (
        <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800 space-y-6">
          <div className="border-b border-navy-800 pb-3">
            <h4 className="text-base font-bold text-accent-gold font-hindi">13. चुनावी सॉल्यूशंस (Solution Showcase)</h4>
            <p className="text-xs text-slate-400">उम्मीदवारों के लिए 6 अवधारणात्मक समाधान पैकेज।</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">मुख्य हेडिंग</label>
              <input
                type="text"
                value={homepage.solutionShowcase.heading}
                onChange={(e) => setHomepage({
                  ...homepage,
                  solutionShowcase: { ...homepage.solutionShowcase, heading: e.target.value }
                })}
                className="w-full px-3.5 py-2 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white font-bold"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">सबटाइटल</label>
              <input
                type="text"
                value={homepage.solutionShowcase.sub}
                onChange={(e) => setHomepage({
                  ...homepage,
                  solutionShowcase: { ...homepage.solutionShowcase, sub: e.target.value }
                })}
                className="w-full px-3.5 py-2 rounded-xl bg-navy-950 border border-navy-700 text-sm text-slate-300"
              />
            </div>
          </div>
        </div>
      )}

      {/* =======================================================
          14. STATUTORY & ETHICAL COMPLIANCE
          ======================================================= */}
      {activeSubTab === "compliance" && (
        <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800 space-y-6">
          <div className="border-b border-navy-800 pb-3">
            <h4 className="text-base font-bold text-accent-gold font-hindi">14. विधिक एवं नैतिक अनुपालन (Compliance Section)</h4>
            <p className="text-xs text-slate-400">ECI आचार संहिता, TRAI/DLT और DPDP Act 2023 अनुपालन विवरणी।</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">मुख्य हेडिंग</label>
              <input
                type="text"
                value={homepage.compliance.heading}
                onChange={(e) => setHomepage({
                  ...homepage,
                  compliance: { ...homepage.compliance, heading: e.target.value }
                })}
                className="w-full px-3.5 py-2 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white font-bold"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">सबटाइटल</label>
              <input
                type="text"
                value={homepage.compliance.sub}
                onChange={(e) => setHomepage({
                  ...homepage,
                  compliance: { ...homepage.compliance, sub: e.target.value }
                })}
                className="w-full px-3.5 py-2 rounded-xl bg-navy-950 border border-navy-700 text-sm text-slate-300"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">मुख्य विवरण</label>
            <textarea
              rows={2}
              value={homepage.compliance.desc}
              onChange={(e) => setHomepage({
                ...homepage,
                compliance: { ...homepage.compliance, desc: e.target.value }
              })}
              className="w-full p-3 rounded-xl bg-navy-950 border border-navy-700 text-xs text-white"
            />
          </div>

          <div className="space-y-2 pt-2">
            <label className="text-xs font-semibold text-slate-300 block">4 अनुपालन बुलेट पॉइंट्स</label>
            {homepage.compliance.points.map((pt, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-xs font-mono text-emerald-400 px-2 py-1 rounded bg-navy-950 border border-navy-800">#{idx + 1}</span>
                <input
                  type="text"
                  value={pt}
                  onChange={(e) => {
                    const updated = [...homepage.compliance.points];
                    updated[idx] = e.target.value;
                    setHomepage({ ...homepage, compliance: { ...homepage.compliance, points: updated } });
                  }}
                  className="w-full px-3.5 py-2 rounded-lg bg-navy-950 border border-navy-700 text-xs text-slate-200"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =======================================================
          15. FINAL CALL TO ACTION STRIP
          ======================================================= */}
      {activeSubTab === "finalCta" && (
        <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800 space-y-5">
          <div className="border-b border-navy-800 pb-3">
            <h4 className="text-base font-bold text-accent-gold font-hindi">15. फ़ाइनल कॉल-टू-एक्शन बैनर (Bottom High-Impact CTA)</h4>
            <p className="text-xs text-slate-400">फुटर से ठीक पहले का मुख्य रूपांतरण (Conversion) बैनर।</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">शीर्षक 1 (UP Assembly 2027)</label>
              <input
                type="text"
                value={homepage.finalCta.heading1}
                onChange={(e) => setHomepage({
                  ...homepage,
                  finalCta: { ...homepage.finalCta, heading1: e.target.value }
                })}
                className="w-full px-3.5 py-2 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">शीर्षक 2 (विजयी अभियान...)</label>
              <input
                type="text"
                value={homepage.finalCta.heading2}
                onChange={(e) => setHomepage({
                  ...homepage,
                  finalCta: { ...homepage.finalCta, heading2: e.target.value }
                })}
                className="w-full px-3.5 py-2 rounded-xl bg-navy-950 border border-navy-700 text-sm text-accent-gold font-bold"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">उप-विवरण</label>
            <input
              type="text"
              value={homepage.finalCta.sub}
              onChange={(e) => setHomepage({
                ...homepage,
                finalCta: { ...homepage.finalCta, sub: e.target.value }
              })}
              className="w-full px-3.5 py-2 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">प्राइमरी बटन टेक्स्ट</label>
              <input
                type="text"
                value={homepage.finalCta.button1}
                onChange={(e) => setHomepage({
                  ...homepage,
                  finalCta: { ...homepage.finalCta, button1: e.target.value }
                })}
                className="w-full px-3.5 py-2 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">सेकेंडरी बटन टेक्स्ट (Call)</label>
              <input
                type="text"
                value={homepage.finalCta.button2}
                onChange={(e) => setHomepage({
                  ...homepage,
                  finalCta: { ...homepage.finalCta, button2: e.target.value }
                })}
                className="w-full px-3.5 py-2 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white"
              />
            </div>
          </div>
        </div>
      )}

      {/* Bottom Save Action */}
      <div className="flex items-center justify-end pt-4">
        <button
          type="button"
          disabled={saving}
          onClick={() => saveSection("homepage", homepage)}
          className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-accent-orange to-accent-orange-hover hover:brightness-110 text-white font-bold text-sm shadow-xl shadow-accent-orange/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? "सहेजा जा रहा है..." : "होमपेज के सभी परिवर्तन सुरक्षित करें"}</span>
        </button>
      </div>
    </div>
  );
}
