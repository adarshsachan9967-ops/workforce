"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useContent } from "@/context/ContentContext";
import { Award, CheckCircle2, Trophy, Star, ChevronRight, Vote, Users, ShieldCheck, MapPin } from "lucide-react";

interface VictoryItem {
  id?: string;
  name: string;
  roleHi: string;
  roleEn: string;
  constituency: string;
  election: string;
  partyBadge?: string;
  status: "winner" | "runner-up" | "featured";
  votes?: string;
  highlight?: string;
}

const defaultVictoriesData: VictoryItem[] = [
  // Lok Sabha 2024
  {
    name: "जय प्रकाश रावत",
    roleHi: "सांसद (MP) — हरदोई लोकसभा 2024",
    roleEn: "Member of Parliament — Hardoi Lok Sabha 2024",
    constituency: "हरदोई (Hardoi)",
    election: "लोकसभा चुनाव 2024",
    partyBadge: "BJP",
    status: "winner",
    highlight: "विजयी सांसद"
  },
  {
    name: "आलोक मिश्र",
    roleHi: "लोकसभा प्रत्याशी — कानपुर लोकसभा 2024",
    roleEn: "Lok Sabha Candidate — Kanpur Lok Sabha 2024",
    constituency: "कानपुर नगर (Kanpur)",
    election: "लोकसभा चुनाव 2024",
    partyBadge: "INDIA / INC",
    status: "runner-up",
    highlight: "उपविजेता"
  },
  {
    name: "संगीता राजवंशी",
    roleHi: "लोकसभा प्रत्याशी — मिश्रिख लोकसभा 2024",
    roleEn: "Lok Sabha Candidate — Misrikh Lok Sabha 2024",
    constituency: "मिश्रिख (Misrikh)",
    election: "लोकसभा चुनाव 2024",
    partyBadge: "SP",
    status: "runner-up",
    highlight: "उपविजेता"
  },

  // UP Vidhan Sabha 2022
  {
    name: "अजीत सिंह पाल",
    roleHi: "राज्यमंत्री, उत्तर प्रदेश सरकार",
    roleEn: "Minister of State, Government of UP",
    constituency: "सिकंदरा (Sikandra)",
    election: "यूपी विधानसभा चुनाव 2022",
    partyBadge: "BJP",
    status: "winner",
    highlight: "विजयी विधायक एवं राज्यमंत्री"
  },
  {
    name: "सरोज कुरील",
    roleHi: "विधायक — 218 घाटमपुर विधानसभा",
    roleEn: "MLA — 218 Ghatampur Assembly",
    constituency: "218 घाटमपुर (Ghatampur)",
    election: "यूपी विधानसभा चुनाव 2022",
    partyBadge: "Apna Dal (S)",
    status: "winner",
    highlight: "विजयी विधायक"
  },
  {
    name: "सतीश कुमार निगम",
    roleHi: "पूर्व विधायक — कल्याणपुर विधानसभा",
    roleEn: "Former MLA — Kalyanpur Assembly",
    constituency: "कल्याणपुर, कानपुर",
    election: "यूपी विधानसभा चुनाव 2022",
    partyBadge: "SP",
    status: "winner",
    highlight: "विजयी विधायक"
  },
  {
    name: "चौधरी सागर सिंह",
    roleHi: "विधानसभा प्रत्याशी — महोबा विधानसभा 230",
    roleEn: "Assembly Candidate — Mahoba 230",
    constituency: "महोबा 230 (Mahoba)",
    election: "यूपी विधानसभा चुनाव 2022",
    partyBadge: "INC",
    status: "featured",
    highlight: "मजबूत जनअभियान"
  },

  // UP MLC Elections
  {
    name: "डॉ. रतनपाल सिंह",
    roleHi: "एम.एल.सी. — देवरिया, कुशीनगर",
    roleEn: "MLC — Deoria & Kushinagar",
    constituency: "देवरिया-कुशीनगर (Deoria)",
    election: "यूपी विधान परिषद (MLC) चुनाव",
    partyBadge: "BJP",
    status: "winner",
    highlight: "विजयी एमएलसी (पूर्व अध्यक्ष छात्र सभा, गोरखुपर वि.वि.)"
  },
  {
    name: "अविनाश सिंह चौहान",
    roleHi: "एम.एल.सी. — कानपुर, फतेहपुर",
    roleEn: "MLC — Kanpur & Fatehpur",
    constituency: "कानपुर-फतेहपुर (Kanpur)",
    election: "यूपी विधान परिषद (MLC) चुनाव",
    partyBadge: "BJP",
    status: "winner",
    highlight: "विजयी एमएलसी"
  },

  // Mayor & Urban Local Body
  {
    name: "वन्दना बाजपेई",
    roleHi: "पूर्व महापौर प्रत्याशी — कानपुर नगर",
    roleEn: "Mayor Candidate — Kanpur Nagar",
    constituency: "कानपुर नगर निगम",
    election: "नगर निगम चुनाव उत्तर प्रदेश",
    partyBadge: "SP",
    status: "runner-up",
    votes: "2,82,000+ मत",
    highlight: "प्राप्त मत: 2,82,000 (उपविजेता)"
  },
  {
    name: "कार्तिकेय शुक्ला",
    roleHi: "जिला पंचायत सदस्य (निर्विरोध निर्वाचित)",
    roleEn: "Zila Panchayat Member (Uncontested Winner)",
    constituency: "कानपुर नगर",
    election: "जिला पंचायत 2020 उत्तर प्रदेश",
    partyBadge: "SP",
    status: "winner",
    highlight: "निर्विरोध विजयी सदस्य"
  },
  {
    name: "राजू दिवाकर",
    roleHi: "जिला पंचायत सदस्य — कानपुर नगर",
    roleEn: "Zila Panchayat Member — Kanpur Nagar",
    constituency: "कानपुर नगर",
    election: "जिला पंचायत 2020 उत्तर प्रदेश",
    partyBadge: "SP",
    status: "winner",
    highlight: "विजयी सदस्य"
  },
  {
    name: "रामजी गुप्ता",
    roleHi: "अध्यक्ष — नगर पंचायत रूरा",
    roleEn: "Chairman — Nagar Panchayat Rura",
    constituency: "रूरा, कानपुर देहात",
    election: "नगर निकाय चुनाव उत्तर प्रदेश",
    partyBadge: "BJP",
    status: "winner",
    highlight: "विजयी अध्यक्ष"
  },
  {
    name: "अंकित मौर्य",
    roleHi: "पार्षद — वार्ड नं. 04, ग्वालटोली कानपुर",
    roleEn: "Corporator — Ward 04 Gwaltoli",
    constituency: "ग्वालटोली, कानपुर",
    election: "नगर निगम चुनाव उत्तर प्रदेश",
    status: "winner",
    highlight: "विजयी पार्षद"
  },
  {
    name: "सन्तोष कुमार सिंह 'बबलू रघुवंशी'",
    roleHi: "पार्षद — वार्ड नं. 58 सिविल लाइन्स द्वितीय",
    roleEn: "Corporator — Ward 58 Civil Lines II",
    constituency: "सिविल लाइन्स, कानपुर",
    election: "नगर निगम चुनाव उत्तर प्रदेश",
    partyBadge: "BJP",
    status: "winner",
    highlight: "विजयी पार्षद"
  },
  {
    name: "देवेन्द्र सिंह यादव (जीतू)",
    roleHi: "पार्षद — केसरी खेड़ा वार्ड नं 36",
    roleEn: "Corporator — Kesari Kheda Ward 36",
    constituency: "केसरी खेड़ा",
    election: "नगर निगम चुनाव उत्तर प्रदेश",
    partyBadge: "SP",
    status: "winner",
    highlight: "विजयी पार्षद"
  }
];

export default function TrackRecordVictories() {
  const { language } = useLanguage();
  const { homepage } = useContent();
  const trackRecord = homepage?.trackRecord;
  const victoriesData = (trackRecord?.items && trackRecord.items.length > 0)
    ? trackRecord.items
    : defaultVictoriesData;

  const [filter, setFilter] = useState<string>("all");

  const filteredVictories = victoriesData.filter((item) => {
    if (filter === "all") return true;
    if (filter === "lok-sabha") return item.election?.includes("लोकसभा");
    if (filter === "vidhan-sabha") return item.election?.includes("विधानसभा") || item.election?.includes("एमएलसी");
    if (filter === "local-body") return item.election?.includes("पंचायत") || item.election?.includes("निगम") || item.election?.includes("निकाय");
    return true;
  });

  const badge = language === "hi"
    ? (trackRecord?.badgeHi || "सफल चुनावी अभियानों का रिकॉर्ड")
    : (trackRecord?.badgeEn || "Proven Track Record & Victories");

  const heading = language === "hi"
    ? (trackRecord?.headingHi || "लोकसभा से विधानसभा व नगर निकाय तक सटीक रणनीति, सफल परिणाम")
    : (trackRecord?.headingEn || "From Parliament to Assembly & Local Bodies: Precision Strategy, Measurable Victories");

  const sub = language === "hi"
    ? (trackRecord?.subHi || "हमारी विशेषज्ञ टीम उत्तर प्रदेश विधानसभा 2022, गुजरात विधानसभा 2022, दिल्ली एमसीडी, लोकसभा 2024 और यूपी नगर निगम/पंचायत चुनावों में सफल चुनावी अभियानों का प्रमाणित अनुभव रखती है।")
    : (trackRecord?.subEn || "With active campaign management in UP Assembly 2022, Gujarat Assembly 2022, Delhi MCD, Lok Sabha 2024, and UP municipal polls, our data-backed methodologies consistently deliver.");

  return (
    <section className="py-20 bg-navy-950 border-b border-navy-800 text-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-navy-900 border border-accent-gold/40 text-accent-gold text-xs font-bold uppercase tracking-wider">
            <Trophy className="w-3.5 h-3.5 text-accent-orange" />
            <span>{badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-hindi leading-tight">
            {heading}
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-hindi leading-relaxed">
            {sub}
          </p>

          {/* Filter tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {[
              { id: "all", label: language === "hi" ? "सभी परिणाम (16+)" : "All Results" },
              { id: "lok-sabha", label: language === "hi" ? "लोकसभा 2024" : "Lok Sabha 2024" },
              { id: "vidhan-sabha", label: language === "hi" ? "विधानसभा व MLC" : "Vidhan Sabha & MLC" },
              { id: "local-body", label: language === "hi" ? "नगर निगम व जिला पंचायत" : "Municipal & Panchayat" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  filter === tab.id
                    ? "bg-accent-orange text-white shadow-lg shadow-accent-orange/20 font-bold"
                    : "bg-navy-900 text-slate-300 hover:bg-navy-850 hover:text-white border border-navy-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Victories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredVictories.map((v, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-gradient-to-b from-navy-900 to-navy-920 border border-navy-800 hover:border-accent-orange/50 transition-all shadow-lg flex flex-col justify-between text-left group"
            >
              <div className="space-y-3">
                {/* Badge line */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold text-accent-gold uppercase tracking-wider px-2 py-0.5 rounded bg-navy-950 border border-navy-800">
                    {v.election}
                  </span>
                  
                  {v.status === "winner" && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>WINNER</span>
                    </span>
                  )}
                  {v.status === "runner-up" && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-950/80 text-amber-400 border border-amber-500/30">
                      <span>उपविजेता</span>
                    </span>
                  )}
                </div>

                {/* Candidate Name */}
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-accent-gold transition-colors font-hindi">
                    {v.name}
                  </h3>
                  <p className="text-xs text-slate-300 font-hindi mt-1">
                    {language === "hi" ? v.roleHi : v.roleEn}
                  </p>
                </div>
              </div>

              {/* Constituency & Highlight */}
              <div className="pt-4 mt-4 border-t border-navy-800/80 space-y-1.5 text-[11px]">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <MapPin className="w-3 h-3 text-sky-400 flex-shrink-0" />
                  <span className="font-hindi">{v.constituency}</span>
                </div>
                {v.highlight && (
                  <div className="text-accent-orange font-semibold font-hindi">
                    ⭐ {v.highlight}
                  </div>
                )}
                {v.votes && (
                  <div className="text-emerald-400 font-mono font-bold">
                    🗳️ {v.votes}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* PDF Download Strip */}
        <div className="mt-12 p-6 rounded-2xl bg-navy-900/90 border border-navy-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white font-hindi flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>आधिकारिक कंपनी प्रोफाइल एवं केस स्टडीज (Profile 2027)</span>
            </h4>
            <p className="text-xs text-slate-400 font-hindi">
              वर्कफोर्स इन्फोटेक प्राइवेट लिमिटेड का संपूर्ण 20-पेज प्रोफाइल ब्रोशर एवं चुनाव प्रबंधन रूपरेखा डाउनलोड करें।
            </p>
          </div>

          <a
            href="/docs/Profile-Election-Management-Company-2027.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="Workforce-Infotech-Profile-2027.pdf"
            className="px-5 py-2.5 rounded-xl bg-navy-800 hover:bg-navy-750 text-accent-gold hover:text-white border border-accent-gold/40 text-xs font-bold transition flex items-center gap-2 flex-shrink-0 shadow cursor-pointer"
          >
            <span>डाउनलोड प्रोफाइल ब्रोशर (PDF)</span>
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
