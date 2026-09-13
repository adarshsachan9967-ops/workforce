"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Mic, Headphones, Tv, Radio, Monitor, PhoneCall, Users, CheckCircle2, ArrowRight } from "lucide-react";

export default function StudioWarRoomShowcase() {
  const { language } = useLanguage();

  return (
    <section className="py-20 bg-navy-950 border-b border-navy-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-navy-900 border border-sky-400/30 text-sky-400 text-xs font-bold uppercase tracking-wider">
            <Tv className="w-3.5 h-3.5" />
            <span>{language === "hi" ? "इन-हाउस इंफ्रास्ट्रक्चर" : "In-House Campaign Infrastructure"}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-hindi leading-tight">
            {language === "hi" ? (
              <>
                अत्याधुनिक मीडिया स्टूडियो एवं <br />
                <span className="text-accent-orange">24/7 केंद्रीय चुनावी वार रूम</span>
              </>
            ) : (
              <>
                State-of-the-Art Media Production Studio & <br />
                <span className="text-accent-orange">24/7 Central Election War Room</span>
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-hindi leading-relaxed">
            {language === "hi"
              ? "वर्कफोर्स इन्फोटेक के पास अपने स्वयं के पेशेवर ऑडियो रिकॉर्डिंग स्टूडियो, वीडियो पॉडकास्ट सेट और विशाल कॉलिंग वार रूम हैं — जिससे आपके अभियान की गति किसी बाहरी एजेंसी पर निर्भर नहीं रहती।"
              : "With dedicated broadcast studios, acoustically treated music recording facilities, and enterprise war room floors, our campaigns run without dependency or delay."}
          </p>
        </div>

        {/* 2 Big Feature Cards: Left is Studio, Right is War Room */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Card 1: Media Studio & Podcast Suite */}
          <div className="rounded-3xl bg-gradient-to-b from-navy-900 to-navy-920 border border-navy-800 p-6 sm:p-8 flex flex-col justify-between text-left space-y-6 shadow-xl group hover:border-accent-orange/50 transition-all">
            <div className="space-y-4">
              {/* Visual image strip of Studio */}
              <div className="grid grid-cols-2 gap-3 aspect-[16/10] w-full rounded-2xl overflow-hidden bg-navy-950">
                <div className="relative w-full h-full">
                  <Image
                    src="/images/gallery/gallery-21.jpeg"
                    alt="Limelight with Anuj Podcast Studio"
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-navy-950/80 text-[10px] font-bold text-accent-gold">
                    पॉडकास्ट स्टूडियो
                  </div>
                </div>
                <div className="relative w-full h-full">
                  <Image
                    src="/images/gallery/gallery-26.jpeg"
                    alt="Professional Video Shoot & Multi-Cam Studio"
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-navy-950/80 text-[10px] font-bold text-sky-400">
                    मल्टी-कैम शूट रूम
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-accent-gold uppercase tracking-wider">
                  <Mic className="w-4 h-4 text-accent-orange" />
                  <span>वर्कफोर्स मीडिया स्टूडियो संभाग</span>
                </div>
                <h3 className="text-2xl font-bold text-white font-hindi">
                  ऑडियो रिकॉर्डिंग, चुनावी गाने & पॉडकास्ट
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-hindi leading-relaxed">
                  ध्वनिरोधी रिकॉर्डिंग स्टूडियो में गायक, संगीतकार और साउंड इंजीनियर्स प्रत्याशी के लिए जोशीले चुनावी गाने, कॉलर ट्यून्स, रेडियो जिंगल और सोशल मीडिया बाइट्स रिकॉर्ड करते हैं। साथ ही फ्लैगशिप वीडियो पॉडकास्ट ‘लाइमलाइट विद अनुज’ (Limelight With Anuj) में जनता के मुद्दों पर विस्तृत चर्चा प्रसारित होती है।
                </p>
              </div>

              <ul className="space-y-2 text-xs text-slate-300 font-hindi">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>प्रत्याशी-विशिष्ट चुनावी एंथम व थीम सोंग्स का संगीत निर्माण</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>‘लाइमलाइट विद अनुज’ व ‘संवाद कार्यक्रम’ पॉडकास्ट साक्षात्कार</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>प्रोफेशनल 4K वीडियो शूट, रील्स एवं सोशल मीडिया लाइव स्ट्रीमिंग</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-navy-800">
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 text-xs font-bold text-accent-orange hover:text-accent-gold transition"
              >
                <span>स्टूडियो छायाचित्र गैलरी में देखें</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: Central War Room & Call Center */}
          <div className="rounded-3xl bg-gradient-to-b from-navy-900 to-navy-920 border border-navy-800 p-6 sm:p-8 flex flex-col justify-between text-left space-y-6 shadow-xl group hover:border-accent-orange/50 transition-all">
            <div className="space-y-4">
              {/* Visual image strip of War Room */}
              <div className="grid grid-cols-2 gap-3 aspect-[16/10] w-full rounded-2xl overflow-hidden bg-navy-950">
                <div className="relative w-full h-full">
                  <Image
                    src="/images/gallery/gallery-16.jpeg"
                    alt="Central Election War Room Operations"
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-navy-950/80 text-[10px] font-bold text-emerald-400">
                    केंद्रीय वार रूम
                  </div>
                </div>
                <div className="relative w-full h-full">
                  <Image
                    src="/images/gallery/gallery-17.jpeg"
                    alt="Tele-Calling Command Center"
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-navy-950/80 text-[10px] font-bold text-sky-400">
                    टेली-कॉलिंग सेंटर
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wider">
                  <Monitor className="w-4 h-4 text-sky-400" />
                  <span>कमांड एंड कंट्रोल संभाग</span>
                </div>
                <h3 className="text-2xl font-bold text-white font-hindi">
                  हाई-टेक वॉर रूम व 50+ सीट कॉलिंग सेंटर
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-hindi leading-relaxed">
                  लखनऊ एवं कानपुर स्थित अत्याधुनिक वार रूम से 403 विधानसभाओं के बूथ-स्तरीय डेटा, मतदाता सूची मैपिंग, विपक्षी दलों के मूवमेंट्स और स्थानीय जनमुद्दों की 24/7 लाइव मॉनिटरिंग की जाती है। प्रशिक्षित कॉलर्स प्रतिदिन हजारों मतदाताओं से सीधा संपर्क साधते हैं।
                </p>
              </div>

              <ul className="space-y-2 text-xs text-slate-300 font-hindi">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>बूथ-वाइज टेलीमेट्री, वोटर टर्नआउट व स्विंग वोटर्स का रियल टाइम एनालिसिस</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>मिस्ड कॉल, आईवीआर (IVR) एवं बल्क व्हाट्सएप/मैसेज प्रसारण</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>दैनिक समीक्षा रिपोर्ट एवं त्वरित डैमेज कंट्रोल निर्देश</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-navy-800">
              <Link
                href="/technology"
                className="inline-flex items-center gap-2 text-xs font-bold text-accent-orange hover:text-accent-gold transition"
              >
                <span>वार रूम टेक्नोलॉजी एवं टूल्स देखें</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
