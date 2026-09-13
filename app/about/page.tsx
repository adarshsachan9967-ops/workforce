"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useContent } from "@/context/ContentContext";
import TeamSection from "@/components/home/TeamSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ComplianceSection from "@/components/home/ComplianceSection";
import FinalCta from "@/components/home/FinalCta";
import FounderMessageSection from "@/components/home/FounderMessageSection";
import TrackRecordVictories from "@/components/home/TrackRecordVictories";
import StudioWarRoomShowcase from "@/components/home/StudioWarRoomShowcase";
import EnquiryModal from "@/components/shared/EnquiryModal";
import { Shield, Users, Database, Cpu, CheckCircle2, ArrowRight } from "lucide-react";

export default function AboutPage() {
  const { language } = useLanguage();
  const { pages } = useContent();
  const [modalOpen, setModalOpen] = useState(false);

  const abt = pages.about;

  return (
    <main className="flex-1 bg-navy-900 text-slate-100 overflow-hidden">
      {/* Hero Header */}
      <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-28 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-900 border-b border-navy-800 bg-grid-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
          
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-navy-900 border border-accent-orange/30 text-accent-orange text-xs font-bold uppercase tracking-wider">
              <Shield className="w-3.5 h-3.5" />
              <span>{abt?.subtitle || (language === "hi" ? "कंपनी परिचय" : "About Workforce Infotech")}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight font-hindi leading-tight">
              {abt?.title ? (
                <span>{abt.title}</span>
              ) : language === "hi" ? (
                <>
                  चुनाव अभियान केवल प्रचार नहीं, <br />
                  <span className="text-accent-orange">एक संपूर्ण कमान व्यवस्था है।</span>
                </>
              ) : (
                <>
                  Political Campaigns Are Not Just Publicity, <br />
                  <span className="text-accent-orange">They Are Total Command Operations.</span>
                </>
              )}
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed">
              {abt?.lead || (language === "hi"
                ? "वर्कफोर्स इन्फोटेक प्राइवेट लिमिटेड एक पेशेवर चुनाव प्रबंधन, राजनीतिक संचार, डेटा रिसर्च, डिजिटल मीडिया, तकनीकी समाधान और जमीनी अभियान सेवा प्रदाता कंपनी है।"
                : "Workforce Infotech Private Limited is a specialized political campaign management, data intelligence, digital media, election technology, and grassroots field operations agency.")}
            </p>

            <div className="p-4 rounded-xl bg-navy-950 border-l-4 border-accent-orange text-accent-gold font-bold font-hindi text-base sm:text-lg">
              “आप जनता से जुड़िए, चुनाव प्रबंधन की जिम्मेदारी हमें दीजिए।”
            </div>

            <div className="pt-2">
              <button
                onClick={() => setModalOpen(true)}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-accent-orange to-accent-orange-hover text-white font-bold text-sm shadow-xl shadow-accent-orange/20 transition-all hover:brightness-110 cursor-pointer"
              >
                <span>{language === "hi" ? "रणनीतिक टीम से परामर्श करें" : "Consult Strategy Team"}</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Strategic Mission & Core Positioning */}
      <section className="py-20 bg-navy-950 border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6 text-left">
              <span className="text-xs font-mono font-bold text-accent-gold uppercase tracking-wider">
                OUR POSITIONING & ETHOS
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white font-hindi">
                {abt?.methodologyHeading || (language === "hi"
                  ? "राजनीतिक वार रूम + डेटा इंटेलिजेंस + डिजिटल मीडिया का संगम"
                  : "Convergence of Political War Room, Data Intelligence & Digital Media")}
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {abt?.mission || "उत्तर प्रदेश जैसे विशाल और विविध राज्य में 2027 का विधानसभा चुनाव असाधारण रूप से प्रतिस्पर्धी होगा। यहां पारंपरिक तरीकों और अनौपचारिक समूहों के भरोसे चुनाव लड़ना जोखिम भरा है।"}
              </p>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {abt?.vision || "हम किसी राजनीतिक दल के अंग नहीं हैं, बल्कि उम्मीदवारों, राजनीतिक दलों और अभियान टीमों के लिए एक तटस्थ, पेशेवर और अनुबंध-आधारित सेवा प्रदाता हैं। हमारा उद्देश्य अभियान के हर पहलू को तकनीक, डेटा और व्यवस्थित अनुशासन प्रदान करना है।"}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {abt?.values && abt.values.length > 0 ? (
                  abt.values.map((v, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-navy-900 border border-navy-800 flex items-center gap-2.5 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>{v.title ? `${v.title}: ` : ""}{v.desc}</span>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="p-3.5 rounded-xl bg-navy-900 border border-navy-800 flex items-center gap-2.5 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>100% डेटा गोपनीयता एवं एनडीए</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-navy-900 border border-navy-800 flex items-center gap-2.5 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>भारत निर्वाचन आयोग नियमों का पालन</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-navy-900 border border-navy-800 flex items-center gap-2.5 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>24/7 केंद्रीय वार रूम सपोर्ट</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-navy-900 border border-navy-800 flex items-center gap-2.5 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>दैनिक शाम 8:00 बजे समीक्षा रिपोर्ट</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Corporate Visual Stat Card */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-navy-850 to-navy-950 border border-navy-700 shadow-2xl relative">
              <div className="space-y-6">
                <div className="border-b border-navy-800 pb-4">
                  <span className="text-xs font-mono text-accent-orange font-bold uppercase">
                    AT A GLANCE // UP 2027
                  </span>
                  <h3 className="text-2xl font-bold text-white font-hindi mt-1">
                    {abt?.methodologySub || "वर्कफोर्स इन्फोटेक परिचालन क्षमता"}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4 text-left">
                  {abt?.stats && abt.stats.length > 0 ? (
                    abt.stats.map((st, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-navy-900 border border-navy-800">
                        <span className="text-2xl font-black text-white font-mono">{st.number}</span>
                        <span className="text-xs text-slate-400 block mt-1">{st.label}</span>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="p-4 rounded-xl bg-navy-900 border border-navy-800">
                        <span className="text-2xl font-black text-white font-mono">1000+</span>
                        <span className="text-xs text-slate-400 block mt-1">प्रोफेशनल टीम पूल</span>
                      </div>

                      <div className="p-4 rounded-xl bg-navy-900 border border-navy-800">
                        <span className="text-2xl font-black text-accent-gold font-mono">11</span>
                        <span className="text-xs text-slate-400 block mt-1">एकीकृत कार्यक्षेत्र</span>
                      </div>

                      <div className="p-4 rounded-xl bg-navy-900 border border-navy-800">
                        <span className="text-2xl font-black text-sky-400 font-mono">403</span>
                        <span className="text-xs text-slate-400 block mt-1">विधानसभा फुटप्रिंट क्षमता</span>
                      </div>

                      <div className="p-4 rounded-xl bg-navy-900 border border-navy-800">
                        <span className="text-2xl font-black text-emerald-400 font-mono">24/7</span>
                        <span className="text-xs text-slate-400 block mt-1">वार रूम मॉनिटरिंग</span>
                      </div>
                    </>
                  )}
                </div>

                <p className="text-xs text-slate-400 italic">
                  * हम किसी भी प्रकार के फर्जी चुनावी जीत के दावे या अवास्तविक आश्वासन नहीं देते। हमारी शक्ति व्यवस्थित कार्यप्रणाली और तकनीक-सक्षम जमीनी क्रियान्वयन में है।
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Founder Message */}
      <FounderMessageSection />

      {/* Proven Track Record & Winning Candidates from PDF */}
      <TrackRecordVictories />

      {/* In-House Media Studio & War Room Facilities */}
      <StudioWarRoomShowcase />

      {/* Team Structure */}
      <TeamSection />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Compliance */}
      <ComplianceSection />

      {/* Final CTA */}
      <FinalCta />

      <EnquiryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
}
