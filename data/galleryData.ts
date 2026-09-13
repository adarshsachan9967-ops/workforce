export interface GalleryItem {
  id: number;
  src: string;
  category: "war-room" | "leadership" | "media-studio" | "ground-campaign" | "events";
  titleHi: string;
  titleEn: string;
  descHi: string;
  descEn: string;
  location?: string;
  tag: string;
}

export const galleryCategories = [
  { id: "all", labelHi: "सभी तस्वीरें (All)", labelEn: "All Images" },
  { id: "leadership", labelHi: "राजनीतिक नेतृत्व (Leadership)", labelEn: "Political Leadership" },
  { id: "war-room", labelHi: "वार रूम एवं डेटा सेंटर (War Room)", labelEn: "War Room & Data Ops" },
  { id: "media-studio", labelHi: "स्टूडियो व पॉडकास्ट (Media Studio)", labelEn: "Media & Studio" },
  { id: "ground-campaign", labelHi: "जमीनी अभियान (Ground Work)", labelEn: "Ground Campaigns" },
  { id: "events", labelHi: "रैलियां व सम्मेलन (Events & Rallies)", labelEn: "Events & Rallies" },
] as const;

export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    src: "/images/gallery/gallery-1.jpeg",
    category: "events",
    titleHi: "डिजिटल अभियान संबोधन — अनुज तिवारी (फाउंडर एवं सीईओ)",
    titleEn: "Digital Campaign Address — Anuj Tiwari (Founder & CEO)",
    descHi: "वर्कफोर्स इन्फोटेक के संस्थापक अनुज तिवारी द्वारा चुनावी रणनीतिक कार्यशाला में कार्यकर्ताओं व उम्मीदवारों को मार्गदर्शन।",
    descEn: "Workforce Infotech Founder & CEO Anuj Tiwari addressing campaign managers and candidates on data-driven voter strategy.",
    location: "कानपुर / लखनऊ, उत्तर प्रदेश",
    tag: "नेतृत्व संबोधन"
  },
  {
    id: 2,
    src: "/images/gallery/gallery-2.jpeg",
    category: "events",
    titleHi: "सोशल मीडिया वालंटियर संवाद कार्यक्रम",
    titleEn: "Social Media Volunteers Conclave",
    descHi: "विधानसभा क्षेत्र में डिजिटल संगठन को सशक्त बनाने एवं प्रभावी सोशल मीडिया अभियान पर विशेष संवाद सत्र।",
    descEn: "Dedicated orientation session for constituency social media volunteers and digital election war room coordinators.",
    location: "महाराजपुर विधानसभा / एस.एल. गैलेक्सी",
    tag: "वालंटियर संवाद"
  },
  {
    id: 3,
    src: "/images/gallery/gallery-3.jpeg",
    category: "leadership",
    titleHi: "वरिष्ठ नेतृत्व के साथ रणनीतिक बैठक",
    titleEn: "Strategic Consultation with Senior Leadership",
    descHi: "विधानसभा चुनाव की अग्रिम तैयारियों और जमीनी समन्वय पर वरिष्ठ राजनीतिक प्रतिनिधियों के साथ विचार-विमर्श।",
    descEn: "Deliberation with senior political representatives regarding election preparedness and grassroots execution.",
    location: "उत्तर प्रदेश",
    tag: "रणनीतिक विमर्श"
  },
  {
    id: 4,
    src: "/images/gallery/gallery-4.jpeg",
    category: "leadership",
    titleHi: "अभियान समन्वय एवं प्रत्याशी अभिनंदन",
    titleEn: "Campaign Coordination & Candidate Felicitation",
    descHi: "चुनावी अभियान की सफलता के उपरांत प्रमुख सहयोगियों व नेतृत्वकर्ताओं का सम्मान एवं आगे की रणनीति पर चर्चा।",
    descEn: "Felicitation of key campaign coordinators and victory strategy review with party leaders.",
    location: "लखनऊ मुख्यालय",
    tag: "समन्वय बैठक"
  },
  {
    id: 5,
    src: "/images/gallery/gallery-5.jpeg",
    category: "leadership",
    titleHi: "कैबिनेट मंत्रियों एवं जनप्रतिधियों के साथ संवाद",
    titleEn: "Dialogue with Ministers & Lawmakers",
    descHi: "राज्य सरकार के वरिष्ठ मंत्रियों एवं जनप्रतिधियों के साथ चुनाव प्रबंधन एवं नीतिगत प्रचार योजना की समीक्षा।",
    descEn: "Reviewing campaign communication and policy outreach strategies with cabinet ministers and senior lawmakers.",
    location: "उत्तर प्रदेश",
    tag: "उच्चस्तरीय विमर्श"
  },
  {
    id: 6,
    src: "/images/gallery/gallery-6.jpeg",
    category: "leadership",
    titleHi: "प्रत्याशी रणनीति विमर्श एवं स्वागत",
    titleEn: "Candidate Strategy Session & Welcome",
    descHi: "विधानसभा प्रत्याशी एवं वरिष्ठ पदाधिकारियों के साथ चुनावी समीकरणों व बूथ प्रबंधन का विस्तृत विश्लेषण।",
    descEn: "Detailed assembly constituency voter dynamics analysis and booth management review with candidates.",
    location: "कानपुर कार्यालय",
    tag: "प्रत्याशी संवाद"
  },
  {
    id: 7,
    src: "/images/gallery/gallery-7.jpeg",
    category: "leadership",
    titleHi: "चुनावी समन्वय एवं संगठनात्मक संवाद",
    titleEn: "Electoral Coordination & Organization Meet",
    descHi: "क्षेत्रीय संगठन के पदाधिकारियों के साथ बूथ स्तर की मजबूती और जनसंपर्क अभियान की रूपरेखा।",
    descEn: "Formulating grassroots outreach plans and booth-level volunteer chains with party functionaries.",
    location: "उत्तर प्रदेश",
    tag: "संगठन संवाद"
  },
  {
    id: 8,
    src: "/images/gallery/gallery-8.jpeg",
    category: "events",
    titleHi: "चुनावी कार्यशाला एवं कोर टीम विमर्श",
    titleEn: "Campaign Workshop & Core Team Briefing",
    descHi: "विधानसभा चुनाव रणनीति के विभिन्न आयामों पर वर्कफोर्स इन्फोटेक की कोर टीम की गहन समीक्षा बैठक।",
    descEn: "Core team intensive operational briefing on multi-channel messaging and field verification.",
    location: "सम्मेलन कक्ष",
    tag: "कोर टीम बैठक"
  },
  {
    id: 9,
    src: "/images/gallery/gallery-9.jpeg",
    category: "leadership",
    titleHi: "वरिष्ठ नेताओं का सम्मान व आशीर्वाद",
    titleEn: "Honoring Senior Political Mentors",
    descHi: "प्रदेश के अनुभवी जननेताओं से चुनावी अनुभव, जन-अपेक्षाओं और अभियान दिशा-निर्देशों पर मार्गदर्शन।",
    descEn: "Seeking guidance and strategic blessings from veteran political leaders on voter touchpoints.",
    location: "उत्तर प्रदेश",
    tag: "वरिष्ठ नेतृत्व"
  },
  {
    id: 10,
    src: "/images/gallery/gallery-10.jpeg",
    category: "leadership",
    titleHi: "पूर्व कैबिनेट मंत्री श्री शिवपाल सिंह यादव जी से भेंट",
    titleEn: "Meeting with Former Cabinet Minister Shri Shivpal Singh Yadav",
    descHi: "वरिष्ठ राजनेता श्री शिवपाल सिंह यादव जी से चुनावी परिदृश्य एवं जमीनी जनसंपर्क पर आत्मीय शिष्टाचार भेंट व विचार-विमर्श।",
    descEn: "Courtesy and strategic meeting with veteran leader Shri Shivpal Singh Yadav discussing electoral dynamics.",
    location: "लखनऊ, उत्तर प्रदेश",
    tag: "वरिष्ठ राजनेता"
  },
  {
    id: 11,
    src: "/images/gallery/gallery-11.jpeg",
    category: "leadership",
    titleHi: "वरिष्ठ आईएएस व वर्तमान कैबिनेट मंत्री श्री ए.के. शर्मा जी के साथ",
    titleEn: "With Cabinet Minister & Former IAS Shri A.K. Sharma",
    descHi: "उत्तर प्रदेश सरकार के कैबिनेट मंत्री श्री ए.के. शर्मा जी के साथ प्रदेश के विकास व चुनावी संवाद पर विमर्श।",
    descEn: "Interaction on administrative reach and policy communication with UP Cabinet Minister Shri A.K. Sharma.",
    location: "लखनऊ",
    tag: "कैबिनेट मंत्री"
  },
  {
    id: 12,
    src: "/images/gallery/gallery-12.jpeg",
    category: "leadership",
    titleHi: "पूर्व कैबिनेट मंत्री श्री ब्रह्मा शंकर त्रिपाठी जी के साथ बैठक",
    titleEn: "Strategic Deliberation with Shri Brahma Shankar Tripathi",
    descHi: "वरिष्ठ पूर्व कैबिनेट मंत्री श्री ब्रह्मा शंकर त्रिपाठी जी के साथ पूर्वांचल एवं प्रदेश के चुनावी समीकरणों पर चर्चा।",
    descEn: "Discussing Purvanchal electoral arithmetic and voter communication with former Cabinet Minister Shri Brahma Shankar Tripathi.",
    location: "उत्तर प्रदेश",
    tag: "पूर्वांचल संवाद"
  },
  {
    id: 13,
    src: "/images/gallery/gallery-13.jpeg",
    category: "leadership",
    titleHi: "पूर्व सांसद राजाराम पाल एवं पूर्व विधायक भगवती सागर जी",
    titleEn: "With Former MP Rajaram Pal & Former MLA Bhagwati Sagar",
    descHi: "वरिष्ठ सांसदों एवं विधायकों के साथ कानपुर-बुंदेलखंड क्षेत्र के सामाजिक व राजनीतिक समीकरणों का विश्लेषण।",
    descEn: "Analyzing social engineering and regional issues with veteran parliamentarians and legislators.",
    location: "कानपुर परिक्षेत्र",
    tag: "संसदीय संवाद"
  },
  {
    id: 14,
    src: "/images/gallery/gallery-14.jpeg",
    category: "leadership",
    titleHi: "पूर्व मंत्री श्री पवन पाण्डेय जी व प्रेस वार्ता",
    titleEn: "Press Conference & Meet with Former Minister Pawan Pandey",
    descHi: "उत्तर प्रदेश सरकार के पूर्व मंत्री श्री पवन पाण्डेय जी की गरिमामयी उपस्थिति में जनमुद्दों पर प्रेस वार्ता व संवाद।",
    descEn: "Press conference and media interaction alongside former UP Minister Shri Pawan Pandey.",
    location: "अयोध्या / लखनऊ",
    tag: "प्रेस वार्ता"
  },
  {
    id: 15,
    src: "/images/gallery/gallery-15.jpeg",
    category: "events",
    titleHi: "मंच संबोधन एवं जनसंवाद कार्यक्रम",
    titleEn: "Stage Address & Public Interaction Event",
    descHi: "विशाल जनसभा एवं कार्यकर्ता सम्मेलन के मंच से चुनावी अभियान की रूपरेखा और डिजिटल प्रसार पर उद्बोधन।",
    descEn: "Addressing party cadre and supporters from the dais on integrated campaign mobilization.",
    location: "उत्तर प्रदेश",
    tag: "जनसभा मंच"
  },
  {
    id: 16,
    src: "/images/gallery/gallery-16.jpeg",
    category: "war-room",
    titleHi: "केंद्रीय डिजिटल वार रूम — ऑपरेशन एवं डेटा एनालिटिक्स",
    titleEn: "Central Election War Room — Data Analytics & Ops",
    descHi: "वर्कफोर्स इन्फोटेक का अत्याधुनिक हाई-टेक वार रूम जहां दर्जनों डेटा विश्लेषक वास्तविक समय में बूथ डेटा की निगरानी करते हैं।",
    descEn: "High-tech operational election war room with dedicated data analysts tracking booth telemetry and caller feedback in real-time.",
    location: "लखनऊ / कानपुर वार रूम",
    tag: "वार रूम"
  },
  {
    id: 17,
    src: "/images/gallery/gallery-17.jpeg",
    category: "war-room",
    titleHi: "कॉल सेंटर एवं टेली-कॉलिंग मतदाता संपर्क केंद्र",
    titleEn: "Voter Outreach & Tele-Calling Command Center",
    descHi: "प्रशिक्षित कॉलर्स की विशाल टीम द्वारा मतदाताओं से सीधा संवाद, सर्वे वेरिफिकेशन और फीडबैक संग्रहण।",
    descEn: "Large-scale trained tele-calling facility conducting structured voter surveys, sentiment tracking, and issue logging.",
    location: "कॉल सेंटर हेडक्वार्टर",
    tag: "कॉल सेंटर"
  },
  {
    id: 18,
    src: "/images/gallery/gallery-18.jpeg",
    category: "war-room",
    titleHi: "अनुसंधान एवं डिजिटल कंटेंट प्लानिंग टीम",
    titleEn: "Campaign Research & Content Strategy Team",
    descHi: "विधानसभा क्षेत्रवार जनमुद्दों पर शोध, सोशल मीडिया नैरेटिव निर्माण एवं ग्राफिक/वीडियो प्लानिंग सत्र।",
    descEn: "Research and digital media strategy desk drafting constituency-specific manifestos, scripts, and social creatives.",
    location: "रणनीति संभाग",
    tag: "रिसर्च डेस्क"
  },
  {
    id: 19,
    src: "/images/gallery/gallery-19.jpeg",
    category: "ground-campaign",
    titleHi: "डोर टू डोर वोटर सर्वे एवं जमीनी जनसंपर्क",
    titleEn: "Door-to-Door Voter Survey & Grassroots Connect",
    descHi: "गाँव-गाँव, मोहल्ले-मोहल्ले जाकर मतदाताओं से प्रत्यक्ष संवाद, जातिगत समीकरण और स्थानीय समस्याओं का डेटा संकलन।",
    descEn: "Field surveyors visiting villages and local markets for accurate ground telemetry, local grievance logging, and sample verification.",
    location: "ग्रामीण एवं शहरी बूथ क्षेत्र",
    tag: "डोर टू डोर सर्वे"
  },
  {
    id: 20,
    src: "/images/gallery/gallery-20.jpeg",
    category: "ground-campaign",
    titleHi: "बूथ-स्तरीय मतदाता सूची मैपिंग एवं जनसंवाद",
    titleEn: "Booth Level Voter Mapping & Community Meetings",
    descHi: "प्रत्येक पोलिंग बूथ पर स्थानीय कार्यकर्ताओं के साथ मतदाता पर्ची वितरण एवं स्विंग वोटर्स की पहचान।",
    descEn: "On-site booth-level committee meetings, verifying voter slips, identifying neutral and undecided voter pockets.",
    location: "विधानसभा क्षेत्र",
    tag: "बूथ मैपिंग"
  },
  {
    id: 21,
    src: "/images/gallery/gallery-21.jpeg",
    category: "media-studio",
    titleHi: "लाइमलाइट विद अनुज (Limelight With Anuj) — पॉडकास्ट स्टूडियो",
    titleEn: "Limelight With Anuj — Political Podcast Studio",
    descHi: "फाउंडर अनुज तिवारी द्वारा प्रमुख राजनीतिक हस्तियों और प्रत्याशियों के साथ जनता के मुद्दों पर विशेष वीडियो पॉडकास्ट साक्षात्कार।",
    descEn: "Flagship video podcast interview series hosted by Anuj Tiwari exploring political visions, manifestos, and public affairs.",
    location: "वर्कफोर्स मीडिया स्टूडियो",
    tag: "पॉडकास्ट स्टूडियो"
  },
  {
    id: 22,
    src: "/images/gallery/gallery-22.jpeg",
    category: "media-studio",
    titleHi: "ऑडियो रिकॉर्डिंग स्टूडियो — चुनावी गाने व वॉइस ओवर",
    titleEn: "Audio Production Studio — Campaign Songs & Voiceover",
    descHi: "पेशेवर गायकों एवं संगीतकारों के साथ प्रत्याशी-विशिष्ट चुनावी गीतों, नारों, और रेडियो/एफएम विज्ञापनों का निर्माण।",
    descEn: "Professional acoustic studio recording high-energy campaign anthems, candidate theme songs, and voiceover jingles.",
    location: "ऑडियो रिकॉर्डिंग स्टूडियो",
    tag: "चुनावी गाने व ऑडियो"
  },
  {
    id: 23,
    src: "/images/gallery/gallery-23.jpeg",
    category: "media-studio",
    titleHi: "म्यूजिक प्रोडक्शन एवं चुनावी एंथम रिकॉर्डिंग",
    titleEn: "Music Production & Campaign Anthem Recording",
    descHi: "ध्वनिरोधी रिकॉर्डिंग रूम में उच्च गुणवत्ता वाले उपकरणों द्वारा प्रेरणादायक चुनावी प्रचार संगीत तैयार करते कलाकार।",
    descEn: "Sound engineers and vocal artists recording tailored political campaign tracks and motivational speeches.",
    location: "साउंड लैब",
    tag: "म्यूजिक लैब"
  },
  {
    id: 24,
    src: "/images/gallery/gallery-24.jpeg",
    category: "media-studio",
    titleHi: "स्टूडियो साक्षात्कार एवं सोशल मीडिया बाइट्स",
    titleEn: "Studio Interviews & Social Media Bytes",
    descHi: "उम्मीदवारों के विशेष साक्षात्कार, डिजिटल बाइट्स और सोशल मीडिया रील्स का स्टूडियो स्तर पर पेशेवर फिल्मांकन।",
    descEn: "High-definition video production of candidate manifesto bytes, campaign interviews, and viral social clips.",
    location: "वीडियो प्रोडक्शन स्टूडियो",
    tag: "वीडियो बाइट्स"
  },
  {
    id: 25,
    src: "/images/gallery/gallery-25.jpeg",
    category: "media-studio",
    titleHi: "चुनावी संगीत एवं वोकल डबिंग सत्र",
    titleEn: "Electoral Anthem & Vocal Dubbing Session",
    descHi: "चुनावी माहौल में मतदाताओं के दिलों तक पहुँचने वाले जोशीले गीतों का पेशेवर गायकों द्वारा वोकल ट्रैक रिकॉर्डिंग।",
    descEn: "Vocalist recording rhythmic election songs designed to evoke strong emotional connect and voter turnout.",
    location: "स्टूडियो फ्लोर",
    tag: "गायन व डबिंग"
  },
  {
    id: 26,
    src: "/images/gallery/gallery-26.jpeg",
    category: "media-studio",
    titleHi: "प्रोफेशनल वीडियो शूट एवं स्टूडियो इंटरव्यू रूम",
    titleEn: "Professional Video Shoot & Multi-Cam Studio",
    descHi: "उच्च-स्तरीय कैमरा लाइटिंग, मल्टी-कैम सेटअप और एंकरिंग के साथ महिला व पुरुष प्रत्याशियों के नीतिगत साक्षात्कार।",
    descEn: "State-of-the-art multi-camera broadcast set for leadership interviews, candidate profiles, and television bytes.",
    location: "मुख्य मीडिया स्टूडियो",
    tag: "मल्टी-कैम स्टूडियो"
  }
];
