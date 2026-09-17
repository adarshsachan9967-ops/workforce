import React from "react";
import { Metadata } from "next";
import HiringSection from "@/components/home/HiringSection";
import Link from "next/link";
import { Briefcase, ChevronRight, Sparkles, Building2, Users, Rocket, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "We're Hiring | Careers at Workforce Infotech Pvt. Ltd. | Kanpur, Uttar Pradesh",
  description: "Join Workforce Infotech Pvt. Ltd. in Kanpur, UP. We are hiring Social Media Handlers, Graphic Designers, Video Editors, Cameramen, Tele Callers, IT Sales Executives, and Hotel Managers. Apply now via email or WhatsApp.",
  keywords: [
    "Workforce Infotech Careers",
    "Jobs in Kanpur",
    "Hiring in Kanpur",
    "Social Media Handler Jobs Kanpur",
    "Graphic Designer Jobs Kanpur",
    "Video Editor Jobs Kanpur",
    "Cameraman Jobs Kanpur",
    "Telecaller Jobs Kanpur",
    "IT Sales Executive Kanpur",
    "Hotel Manager Kanpur",
    "Workforce Infotech Hiring",
    "Media Production Jobs UP"
  ]
};

export default function CareersPage() {
  return (
    <div className="flex-1 flex flex-col w-full bg-navy-950 text-white min-h-screen">
      {/* Breadcrumb & Hero Header */}
      <section className="pt-28 pb-12 sm:pb-16 bg-gradient-to-b from-navy-900 to-navy-950 border-b border-navy-800 relative overflow-hidden">
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-accent-orange/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-6">
            <Link href="/" className="hover:text-accent-orange transition">होम (Home)</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-accent-gold">करियर व भर्ती (Careers)</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent-orange/20 border border-accent-orange/50 text-accent-orange text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CAREERS & TALENT ACQUISITION</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white font-hindi tracking-tight leading-tight">
              वर्कफोर्स इन्फोटेक से जुड़ें और अपना करियर संवारें
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-hindi leading-relaxed">
              क्या आप रचनात्मकता, डिजिटल मार्केटिंग, सेल्स, वीडियो प्रोडक्शन अथवा मीडिया के प्रति उत्साही हैं? कानपुर स्थित हमारी मुख्य शाखा में प्रतिभाशाली उम्मीदवारों के लिए रोमांचक अवसर उपलब्ध हैं।
            </p>

            {/* Quick Culture Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
              <div className="p-3.5 rounded-2xl bg-navy-900/90 border border-navy-800">
                <Building2 className="w-5 h-5 text-accent-gold mb-1.5" />
                <div className="text-xs font-bold text-white">कानपुर हेडक्वाटर</div>
                <div className="text-[11px] text-slate-400">आधुनिक कॉर्पोरेट ऑफिस</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-navy-900/90 border border-navy-800">
                <Users className="w-5 h-5 text-sky-400 mb-1.5" />
                <div className="text-xs font-bold text-white">1000+ टीम वर्कफोर्स</div>
                <div className="text-[11px] text-slate-400">सौहार्दपूर्ण वातावरण</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-navy-900/90 border border-navy-800">
                <Rocket className="w-5 h-5 text-accent-orange mb-1.5" />
                <div className="text-xs font-bold text-white">तीव्र करियर ग्रोथ</div>
                <div className="text-[11px] text-slate-400">लाइव प्रोजेक्ट्स का अनुभव</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-navy-900/90 border border-navy-800">
                <Award className="w-5 h-5 text-emerald-400 mb-1.5" />
                <div className="text-xs font-bold text-white">आकर्षक वेतन + इंसेंटिव</div>
                <div className="text-[11px] text-slate-400">समय पर रिवॉर्ड व सम्मान</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Hiring Section */}
      <HiringSection />
    </div>
  );
}
