"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useContent } from "@/context/ContentContext";
import { Quote, Award, Shield, CheckCircle2, ArrowRight, MapPin, Phone } from "lucide-react";

export default function FounderMessageSection() {
  const { language } = useLanguage();
  const { homepage } = useContent();
  const founder = homepage?.founderMessage;

  const photoUrl = founder?.photoUrl || "/images/gallery/gallery-1.jpeg";
  const founderName = founder?.founderName || "अनुज तिवारी (Anuj Tiwari)";
  const founderRole = language === "hi"
    ? (founder?.founderRoleHi || "FOUNDER & CEO // राजनीतिक रणनीतिकार")
    : (founder?.founderRoleEn || "Founder & CEO // Political Strategist");
  const companyName = founder?.companyName || "वर्कफोर्स इन्फोटेक प्राइवेट लिमिटेड (Workforce Infotech Pvt. Ltd.)";

  const stat1Value = founder?.stat1Value || "10+ वर्ष";
  const stat1Label = language === "hi"
    ? (founder?.stat1LabelHi || "चुनावी रणनीति अनुभव")
    : (founder?.stat1LabelEn || "Strategic Experience");

  const stat2Value = founder?.stat2Value || "50+ चुनाव";
  const stat2Label = language === "hi"
    ? (founder?.stat2LabelHi || "सफल अभियान प्रबंधन")
    : (founder?.stat2LabelEn || "Campaigns Managed");

  const badge = language === "hi"
    ? (founder?.badgeHi || "संस्थापक संदेश (Founder's Desk)")
    : (founder?.badgeEn || "Founder & CEO's Message");

  const heading = language === "hi"
    ? (founder?.headingHi || "“लोकतंत्र केवल चुनाव जीतने का माध्यम नहीं, जनता के विश्वास व विकास का आधार है।”")
    : (founder?.headingEn || "“Democracy is Not Just About Winning, It Is Grounded in People’s Trust & Progress.”");

  const salutation = language === "hi"
    ? (founder?.salutationHi || "प्रिय साथियों व भावी जनप्रतिनिधियों,")
    : (founder?.salutationEn || "Dear Leaders, Colleagues & Future Representatives,");

  const p1 = language === "hi"
    ? (founder?.p1Hi || "इसी सोच के साथ Workforce Infotech Pvt. Ltd. की स्थापना की गई, ताकि आधुनिक तकनीक, सटीक रणनीति और समर्पित टीम के माध्यम से चुनावी अभियानों को नई दिशा और नई पहचान दी जा सके।")
    : (founder?.p1En || "With this core philosophy, Workforce Infotech Pvt. Ltd. was founded to transform political campaigning through modern technology, rigorous data science, and dedicated execution.");

  const p2 = language === "hi"
    ? (founder?.p2Hi || "आज हमें गर्व है कि हमारी टीम ने देश के विभिन्न राज्यों में अनेक चुनावी अभियानों, डिजिटल कैंपेन, जनसंपर्क, सर्वे, मीडिया मैनेजमेंट और ग्राउंड के माध्यम से अपनी विश्वसनीय पहचान बनाई है। यह उपलब्धि हमारी टीम की मेहनत, हमारे सहयोगियों के विश्वास और हमारे क्लाइंट्स के निरंतर समर्थन का परिणाम है।")
    : (founder?.p2En || "Today, we take immense pride in having delivered successful campaigns across states through digital media, voter surveys, media management, and disciplined booth operations.");

  const p3 = language === "hi"
    ? (founder?.p3Hi || "हमारा उद्देश्य केवल चुनाव प्रबंधन करना नहीं, बल्कि प्रत्येक उम्मीदवार, राजनीतिक दल और संगठन के लिए ऐसी कार्ययोजना तैयार करना है, जो जनता से सीधा संवाद स्थापित करे, उनकी अपेक्षाओं को समझे और लोकतांत्रिक मूल्यों को मज़बूत बनाए।")
    : (founder?.p3En || "Our mission transcends mere campaign management; we engineer strategic blueprints that connect candidates authentically with their electorate and strengthen democratic values.");

  const quoteBox = language === "hi"
    ? (founder?.quoteBoxHi || "“भविष्य में भी हम नवाचार, पारदर्शिता और उत्कृष्टता के साथ चुनाव प्रबंधन के क्षेत्र में नए मानक स्थापित करने के लिए प्रतिबद्ध रहेंगे। आपका विश्वास ही हमारी सबसे बड़ी ताकत है।”")
    : (founder?.quoteBoxEn || "“We remain steadfastly committed to setting new benchmarks in electoral consulting with innovation, transparency, and uncompromised dedication.”");

  const button1Text = language === "hi"
    ? (founder?.button1TextHi || "रणनीतिकार टीम से सीधा संवाद करें")
    : (founder?.button1TextEn || "Consult Strategy Team");
  const button1Link = founder?.button1Link || "/contact";

  const button2Text = language === "hi"
    ? (founder?.button2TextHi || "कंपनी परिचय पढ़ें")
    : (founder?.button2TextEn || "Company Profile");
  const button2Link = founder?.button2Link || "/about";

  return (
    <section className="py-20 bg-slate-50 dark:bg-gradient-to-b dark:from-navy-950 dark:via-navy-900 dark:to-navy-950 border-b border-slate-200 dark:border-navy-800 relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Founder Photo & Bio Card */}
          <div className="lg:col-span-5 text-left">
            <div className="relative rounded-3xl overflow-hidden bg-white dark:bg-navy-850 border border-slate-200 dark:border-navy-700 shadow-xl p-2">
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-slate-900">
                <Image
                  src={photoUrl}
                  alt={`${founderName} - ${founderRole}, ${companyName}`}
                  fill
                  priority={true}
                  unoptimized={true}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top"
                />
                
                {/* Badge Overlay */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-navy-950/90 backdrop-blur-md border border-navy-700 shadow-xl keep-dark">
                  <h3 className="text-xl font-black text-white font-hindi">
                    {founderName}
                  </h3>
                  <p className="text-xs text-accent-gold font-semibold uppercase tracking-wider mt-0.5">
                    {founderRole}
                  </p>
                  <p className="text-[11px] text-slate-200 font-hindi mt-1">
                    {companyName}
                  </p>
                </div>
              </div>

              {/* Quick credentials strip */}
              <div className="p-4 grid grid-cols-2 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-navy-900 border border-slate-200 dark:border-navy-800">
                  <span className="font-bold text-slate-900 dark:text-white block text-sm">{stat1Value}</span>
                  <span className="text-[10px] text-slate-600 dark:text-slate-400">{stat1Label}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-navy-900 border border-slate-200 dark:border-navy-800">
                  <span className="font-bold text-accent-orange block text-sm">{stat2Value}</span>
                  <span className="text-[10px] text-slate-600 dark:text-slate-400">{stat2Label}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Message Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-50 dark:bg-navy-900 border border-accent-orange/40 text-accent-orange dark:text-accent-gold text-xs font-bold uppercase tracking-wider">
              <Quote className="w-3.5 h-3.5 text-accent-orange" />
              <span>{badge}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-hindi leading-tight">
              {heading}
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-slate-700 dark:text-slate-300 font-hindi leading-relaxed">
              <p>
                <strong className="text-slate-900 dark:text-white">{salutation}</strong>
              </p>
              
              <p>{p1}</p>
              <p>{p2}</p>
              <p>{p3}</p>

              <div className="p-4 rounded-xl bg-white dark:bg-navy-900 border-l-4 border-accent-orange border border-slate-200/80 dark:border-navy-800 text-slate-800 dark:text-slate-200 text-sm italic shadow-sm">
                {quoteBox}
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href={button1Link}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-accent-orange to-accent-orange-hover hover:brightness-110 text-white font-bold text-xs sm:text-sm shadow-xl shadow-accent-orange/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>{button1Text}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={button2Link}
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 dark:bg-navy-800 dark:hover:bg-navy-750 dark:text-slate-200 hover:dark:text-white border border-slate-300 dark:border-navy-700 font-semibold text-xs sm:text-sm transition-all shadow-sm"
              >
                {button2Text}
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
