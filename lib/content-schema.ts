import { galleryItems, GalleryItem } from "@/data/galleryData";
export type { GalleryItem };

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email?: string;
  assembly: string;
  district: string;
  state?: string;
  services: string[];
  campaignRequirement?: string;
  preferredTime?: string;
  message?: string;
  adminNotes?: string;
  createdAt: string;
  status: "New" | "Contacted" | "In Discussion" | "Converted" | "Closed";
}

export interface NavigationItem {
  id: string;
  labelHi: string;
  labelEn: string;
  url: string;
  isExternal?: boolean;
  order: number;
  active: boolean;
}

export interface FaqItem {
  id: string;
  category: "general" | "services" | "technology" | "compliance";
  questionHi: string;
  questionEn: string;
  answerHi: string;
  answerEn: string;
}

export interface SiteSettings {
  // Helplines & WhatsApp
  phone1: string;
  phone1LabelHi: string;
  phone1SubHi: string;
  phone2: string;
  phone2LabelHi: string;
  phone2SubHi: string;
  whatsappNumber: string;
  whatsappDefaultMessage: string;

  // Contact Info & Addresses
  email: string;
  website: string;
  headOffice: string;
  branchOffice?: string;
  warRoomAddress: string;
  googleLocation1Url?: string;
  googleLocation1Title?: string;
  googleLocation2Url?: string;
  googleLocation2Title?: string;

  // Social Links
  facebookUrl: string;
  twitterUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  youtubeUrl: string;

  // Header & Announcement
  announcementTextHi: string;
  announcementTextEn: string;
  announcementCtaHi: string;
  announcementCtaEn: string;
  announcementCtaUrl: string;
  announcementEnabled: boolean;

  // Branding & Logo
  brandName: string;
  brandSuffix: string;
  brandTaglineHi: string;
  brandTaglineEn: string;
  logoUrl: string;
  faviconUrl: string;
  headerCtaHi: string;
  headerCtaEn: string;
  headerCtaUrl: string;

  // Footer & Compliance
  footerBioHi: string;
  footerBioEn: string;
  complianceTextHi: string;
  complianceTextEn: string;
  copyrightText: string;

  // Google Analytics, GTM & Tracking
  googleAnalyticsId?: string;
  googleTagManagerId?: string;
  googleSearchConsoleCode?: string;
}

export interface BannerSlideItem {
  id: number;
  src: string;
  alt: string;
  titleHi: string;
  titleEn: string;
  subtitleHi: string;
  subtitleEn: string;
  ctaTextHi: string;
  ctaTextEn: string;
  ctaLink: string;
  badgeHi: string;
  badgeEn: string;
}

export interface BannerSliderContent {
  slides: BannerSlideItem[];
  tickerHeadingHi: string;
  tickerHeadingEn: string;
  tickerServicesHi: string;
  tickerServicesEn: string;
  button1TextHi: string;
  button1TextEn: string;
  button1Link: string;
  button2TextHi: string;
  button2TextEn: string;
  button2Link: string;
}

export interface VictoryLeaderItem {
  id: string;
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

export interface TrackRecordContent {
  badgeHi: string;
  badgeEn: string;
  headingHi: string;
  headingEn: string;
  subHi: string;
  subEn: string;
  items: VictoryLeaderItem[];
}

export interface FounderMessageContent {
  badgeHi: string;
  badgeEn: string;
  headingHi: string;
  headingEn: string;
  photoUrl: string;
  founderName: string;
  founderRoleHi: string;
  founderRoleEn: string;
  companyName: string;
  stat1Value: string;
  stat1LabelHi: string;
  stat1LabelEn: string;
  stat2Value: string;
  stat2LabelHi: string;
  stat2LabelEn: string;
  salutationHi: string;
  salutationEn: string;
  p1Hi: string;
  p1En: string;
  p2Hi: string;
  p2En: string;
  p3Hi: string;
  p3En: string;
  quoteBoxHi: string;
  quoteBoxEn: string;
  button1TextHi: string;
  button1TextEn: string;
  button1Link: string;
  button2TextHi: string;
  button2TextEn: string;
  button2Link: string;
}

export interface StudioWarRoomContent {
  badgeHi: string;
  badgeEn: string;
  headingHi: string;
  headingEn: string;
  subHi: string;
  subEn: string;
  studioCard: {
    badgeHi: string;
    badgeEn: string;
    titleHi: string;
    titleEn: string;
    descHi: string;
    descEn: string;
    image1Src: string;
    image1Label: string;
    image2Src: string;
    image2Label: string;
    bulletsHi: string[];
    bulletsEn: string[];
    ctaTextHi: string;
    ctaTextEn: string;
    ctaLink: string;
  };
  warRoomCard: {
    badgeHi: string;
    badgeEn: string;
    titleHi: string;
    titleEn: string;
    descHi: string;
    descEn: string;
    image1Src: string;
    image1Label: string;
    image2Src: string;
    image2Label: string;
    bulletsHi: string[];
    bulletsEn: string[];
    ctaTextHi: string;
    ctaTextEn: string;
    ctaLink: string;
  };
}

export interface HomepageContent {
  bannerSlider?: BannerSliderContent;
  studioWarRoom?: StudioWarRoomContent;
  hero: {
    eyebrow: string;
    title1: string;
    title2: string;
    subtitle: string;
    tagline: string;
    primaryCta: string;
    secondaryCta: string;
    teamBadge: string;
    teamSubtitle?: string;
    tags?: string[];
  };
  telemetry: {
    coveragePercent: string;
    totalBooths: string;
    activeFieldTeams: string;
    loggedActivities: string;
    tickerEvents: string[];
    dashboardTitle?: string;
    dashboardSubtitle?: string;
    liveFeedBadge?: string;
    videoSrc?: string;
    audioSrc?: string;
    youtubeUrl?: string;
    videoWatermark?: string;
    stat1Sub?: string;
    stat2Sub?: string;
    stat3Sub?: string;
    stat4Sub?: string;
    footerNote1?: string;
    footerNote2?: string;
  };
  trustStrip: {
    items: {
      stat: string;
      labelHi: string;
      labelEn: string;
      descHi: string;
      descEn: string;
    }[];
  };
  trackRecord?: TrackRecordContent;
  founderMessage?: FounderMessageContent;
  aboutTeaser: {
    badgeHi: string;
    badgeEn: string;
    heading1: string;
    heading2: string;
    p1: string;
    p2: string;
    highlightTitle: string;
    highlightSub: string;
    highlightDescHi: string;
    highlightDescEn: string;
    cta: string;
    cards: {
      tag: string;
      title: string;
      desc: string;
    }[];
  };
  servicesSection: {
    badgeHi: string;
    badgeEn: string;
    headingHi: string;
    headingEn: string;
    subHi: string;
    subEn: string;
    services: {
      id: string;
      slug: string;
      icon: string;
      titleHi: string;
      titleEn: string;
      tagHi: string;
      tagEn: string;
      shortDescHi: string;
      shortDescEn: string;
      capabilitiesHi: string[];
    }[];
  };
  oneAgency: {
    badgeHi: string;
    badgeEn: string;
    title1: string;
    title2: string;
    sub: string;
    pillars: {
      name: string;
      nameHi: string;
      desc: string;
    }[];
  };
  process: {
    badgeHi: string;
    badgeEn: string;
    heading: string;
    sub: string;
    steps: {
      num: string;
      title: string;
      desc: string;
    }[];
  };
  commandCenter: {
    badgeHi: string;
    badgeEn: string;
    heading: string;
    sub: string;
    desc: string;
    bullet1: string;
    bullet2: string;
    bullet3: string;
    boothsTotal: string;
    boothsCovered: string;
    swingBooths: string;
  };
  interactiveMap: {
    badgeHi: string;
    badgeEn: string;
    heading: string;
    sub: string;
    regions: {
      id: string;
      nameHi: string;
      nameEn: string;
      seats: number;
      booths: number;
      notesHi: string;
      notesEn: string;
    }[];
  };
  whyChooseUs: {
    badgeHi: string;
    badgeEn: string;
    heading: string;
    sub: string;
    cards: {
      title: string;
      desc: string;
    }[];
  };
  teamSection: {
    badgeHi: string;
    badgeEn: string;
    heading: string;
    sub: string;
    proofBadge: string;
    categories: {
      title: string;
      size: string;
      desc: string;
    }[];
  };
  techSection: {
    badgeHi: string;
    badgeEn: string;
    heading: string;
    sub: string;
    disclaimer: string;
    items: {
      title: string;
      desc: string;
    }[];
  };
  solutionShowcase: {
    badgeHi: string;
    badgeEn: string;
    heading: string;
    sub: string;
    solutions: {
      id: string;
      title: string;
      tag: string;
      desc: string;
      metrics: string;
    }[];
  };
  compliance: {
    badgeHi: string;
    badgeEn: string;
    heading: string;
    sub: string;
    desc: string;
    points: string[];
  };
  finalCta: {
    heading1: string;
    heading2: string;
    sub: string;
    button1: string;
    button2: string;
  };
}

export interface PagesContent {
  about: {
    title: string;
    subtitle: string;
    lead: string;
    mission: string;
    vision: string;
    methodologyHeading: string;
    methodologySub: string;
    stats: { number: string; label: string }[];
    values: { title: string; desc: string }[];
  };
  process: {
    heading: string;
    sub: string;
    lead: string;
    detailedSteps: {
      number: string;
      titleHi: string;
      titleEn: string;
      descHi: string;
      descEn: string;
      deliverables: string[];
    }[];
  };
  technology: {
    heading: string;
    sub: string;
    disclaimer: string;
    cloudDesc: string;
    mobileAppDesc: string;
    securityDesc: string;
    features: { title: string; desc: string }[];
  };
  solutions: {
    heading: string;
    sub: string;
    disclaimer: string;
    modules: {
      id: string;
      title: string;
      category: string;
      scope: string;
      targetAudience: string;
      outcome: string;
    }[];
  };
  contact: {
    heading: string;
    sub: string;
    confidentiality: string;
    formTitle: string;
    formSub: string;
    directDeskTitle: string;
    directDeskSub: string;
  };
  servicesPage: {
    heading: string;
    sub: string;
    directoryIntro: string;
  };
}

export interface AdminCredentials {
  email: string;
  passwordHash: string;
  updatedAt: string;
}

export interface GalleryContent {
  showImageContent: boolean; // toggle to show or hide images content on user side (default: false)
  headingHi?: string;
  headingEn?: string;
  subtitleHi?: string;
  subtitleEn?: string;
  items: GalleryItem[];
}

export interface DatabaseSchema {
  enquiries: Enquiry[];
  settings: SiteSettings;
  navigation: NavigationItem[];
  homepage: HomepageContent;
  pages: PagesContent;
  faqs: FaqItem[];
  gallery?: GalleryContent;
  adminCredentials?: AdminCredentials;
}

export const defaultSettings: SiteSettings = {
  phone1: "9621762121",
  phone1LabelHi: "हेल्पलाइन 1 (कॉल व व्हाट्सएप)",
  phone1SubHi: "उपलब्ध 24/7 चुनावी सहायता",
  phone2: "7839922507",
  phone2LabelHi: "हेल्पलाइन 2",
  phone2SubHi: "वरिष्ठ रणनीतिकार डेस्क",
  whatsappNumber: "919621762121",
  whatsappDefaultMessage: "नमस्कार! मैं उत्तर प्रदेश विधानसभा चुनाव 2027 के लिए वर्कफोर्स इन्फोटेक की चुनाव प्रबंधन सेवाओं के संबंध में चर्चा करना चाहता/चाहती हूँ।",
  email: "contact@workforceinfotech.com",
  website: "workforceinfotech.com",
  headOffice: "117/Q/710, शारदा नगर, काकादेव, कानपुर, उत्तर प्रदेश",
  branchOffice: "11th Floor, Summit Building, गोमती नगर, लखनऊ, उत्तर प्रदेश",
  warRoomAddress: "11th Floor, Summit Building, गोमती नगर, लखनऊ, उत्तर प्रदेश",
  googleLocation1Url: "https://share.google/BUJO7DKz5m14jQsAi",
  googleLocation1Title: "Workforce Infotech Pvt Ltd - An Election Management Company (Kanpur H.O.)",
  googleLocation2Url: "https://share.google/lhxxqqHpoxBeYkLOO",
  googleLocation2Title: "Workforce Infotech Pvt Ltd - Election Management Company (Lucknow B.O.)",
  facebookUrl: "https://www.facebook.com/workforceInfotechpvtltd",
  twitterUrl: "https://twitter.com/workforceinfo",
  instagramUrl: "https://instagram.com/workforceinfotech",
  linkedinUrl: "https://linkedin.com/company/workforceinfotech",
  youtubeUrl: "https://youtu.be/jVrADlfb3os?si=7cEKMDZ81Do_fTuP",
  announcementTextHi: "उत्तर प्रदेश विधानसभा चुनाव 2027 | प्रोफेशनल चुनाव प्रबंधन एवं प्रचार अभियान समाधान",
  announcementTextEn: "UP Assembly Election 2027 | Professional Election Campaign Management Solutions",
  announcementCtaHi: "अभी संपर्क करें →",
  announcementCtaEn: "Contact War Room →",
  announcementCtaUrl: "/contact",
  announcementEnabled: true,
  brandName: "WORKFORCE INFOTECH",
  brandSuffix: "PVT. LTD.",
  brandTaglineHi: "उत्तर प्रदेश चुनाव 2027 | चुनाव प्रबंधन",
  brandTaglineEn: "UP Election 2027 | Campaign Management",
  logoUrl: "/logo.png",
  faviconUrl: "/icon.svg",
  headerCtaHi: "अभियान पर चर्चा करें",
  headerCtaEn: "Discuss Campaign",
  headerCtaUrl: "/contact",
  footerBioHi: "वर्कफोर्स इन्फोटेक प्राइवेट लिमिटेड — उत्तर प्रदेश विधानसभा चुनाव 2027 के लिए डेटा, डिजिटल मीडिया, जनसंपर्क, प्रौद्योगिकी और जमीनी अभियान प्रबंधन में अग्रणी राजनीतिक संचार एजेंसी।",
  footerBioEn: "Workforce Infotech Private Limited — Premier election management, data research, voter communication, digital media and war room consulting firm for UP Assembly Election 2027.",
  complianceTextHi: "वर्कफोर्स इन्फोटेक प्राइवेट लिमिटेड भारत निर्वाचन आयोग (ECI) के आदर्श आचार संहिता, ट्राई (TRAI/DLT) दूरसंचार नियमों तथा DPDP Act 2023 का पूर्ण अनुपालन सुनिश्चित करता है।",
  complianceTextEn: "Workforce Infotech Pvt. Ltd. fully complies with ECI Model Code of Conduct, TRAI/DLT regulations, and the DPDP Act 2023.",
  copyrightText: "© 2027 WORKFORCE INFOTECH PRIVATE LIMITED. ALL RIGHTS RESERVED.",
  googleAnalyticsId: "G-9DQBS54NTL",
  googleTagManagerId: "",
  googleSearchConsoleCode: ""
};

export const defaultNavigation: NavigationItem[] = [
  { id: "nav-1", labelHi: "होम", labelEn: "Home", url: "/", order: 1, active: true },
  { id: "nav-2", labelHi: "हमारे बारे में", labelEn: "About Us", url: "/about", order: 2, active: true },
  { id: "nav-3", labelHi: "चुनावी सेवाएं", labelEn: "Services", url: "/services", order: 3, active: true },
  { id: "nav-4", labelHi: "हमारी कार्यप्रणाली", labelEn: "Process", url: "/process", order: 4, active: true },
  { id: "nav-5", labelHi: "गैलरी", labelEn: "Gallery", url: "/gallery", order: 5, active: true },
  { id: "nav-6", labelHi: "टेक्नोलॉजी", labelEn: "Technology", url: "/technology", order: 6, active: true },
  { id: "nav-7", labelHi: "सॉल्यूशंस", labelEn: "Solutions", url: "/solutions", order: 7, active: true },
  { id: "nav-8", labelHi: "FAQ", labelEn: "FAQ", url: "/faq", order: 8, active: true },
  { id: "nav-9", labelHi: "संपर्क", labelEn: "Contact", url: "/contact", order: 9, active: true }
];

export const defaultStudioWarRoom: StudioWarRoomContent = {
  badgeHi: "इन-हाउस इंफ्रास्ट्रक्चर",
  badgeEn: "In-House Campaign Infrastructure",
  headingHi: "अत्याधुनिक मीडिया स्टूडियो एवं 24/7 केंद्रीय चुनावी वार रूम",
  headingEn: "State-of-the-Art Media Production Studio & 24/7 Central Election War Room",
  subHi: "वर्कफोर्स इन्फोटेक के पास अपने स्वयं के पेशेवर ऑडियो रिकॉर्डिंग स्टूडियो, वीडियो पॉडकास्ट सेट और विशाल कॉलिंग वार रूम हैं — जिससे आपके अभियान की गति किसी बाहरी एजेंसी पर निर्भर नहीं रहती।",
  subEn: "With dedicated broadcast studios, acoustically treated music recording facilities, and enterprise war room floors, our campaigns run without dependency or delay.",
  studioCard: {
    badgeHi: "वर्कफोर्स मीडिया स्टूडियो संभाग",
    badgeEn: "Workforce Media Studio Wing",
    titleHi: "ऑडियो रिकॉर्डिंग, चुनावी गाने & पॉडकास्ट",
    titleEn: "Audio Production, Campaign Songs & Podcasts",
    descHi: "ध्वनिरोधी रिकॉर्डिंग स्टूडियो में गायक, संगीतकार और साउंड इंजीनियर्स प्रत्याशी के लिए जोशीले चुनावी गाने, कॉलर ट्यून्स, रेडियो जिंगल और सोशल मीडिया बाइट्स रिकॉर्ड करते हैं। साथ ही फ्लैगशिप वीडियो पॉडकास्ट ‘लाइमलाइट विद अनुज’ (Limelight With Anuj) में जनता के मुद्दों पर विस्तृत चर्चा प्रसारित होती है।",
    descEn: "Acoustically treated studio suite recording high-energy campaign anthems, candidate podcasts, and viral media bytes with in-house sound engineers.",
    image1Src: "/images/gallery/gallery-21.jpeg",
    image1Label: "पॉडकास्ट स्टूडियो",
    image2Src: "/images/showcase/chunavi-gane-nirman-kaksh.png",
    image2Label: "चुनावी गाने निर्माण कक्ष",
    bulletsHi: [
      "प्रत्याशी-विशिष्ट चुनावी एंथम व थीम सोंग्स का संगीत निर्माण",
      "‘लाइमलाइट विद अनुज’ व ‘संवाद कार्यक्रम’ पॉडकास्ट साक्षात्कार",
      "प्रोफेशनल 4K वीडियो शूट, रील्स एवं सोशल मीडिया लाइव स्ट्रीमिंग"
    ],
    bulletsEn: [
      "Candidate-specific campaign anthems & musical themes",
      "'Limelight With Anuj' video podcast interviews",
      "Professional 4K multi-cam shoot & viral reel studio"
    ],
    ctaTextHi: "स्टूडियो छायाचित्र गैलरी में देखें",
    ctaTextEn: "View Studio Gallery",
    ctaLink: "/gallery"
  },
  warRoomCard: {
    badgeHi: "कमांड एंड कंट्रोल संभाग",
    badgeEn: "Command & Control Wing",
    titleHi: "हाई-टेक वॉर रूम व 50+ सीट कॉलिंग सेंटर",
    titleEn: "Hi-Tech War Room & 50+ Seat Calling Center",
    descHi: "लखनऊ एवं कानपुर स्थित अत्याधुनिक वार रूम से 403 विधानसभाओं के बूथ-स्तरीय डेटा, मतदाता सूची मैपिंग, विपक्षी दलों के मूवमेंट्स और स्थानीय जनमुद्दों की 24/7 लाइव मॉनिटरिंग की जाती है। प्रशिक्षित कॉलर्स प्रतिदिन हजारों मतदाताओं से सीधा संपर्क साधते हैं।",
    descEn: "24/7 monitoring of booth telemetry, swing voters, opponent movements, and sentiment tracking across UP constituencies with dedicated tele-calling desks.",
    image1Src: "/images/showcase/kendriya-war-room.png",
    image1Label: "केंद्रीय वार रूम",
    image2Src: "/images/showcase/tele-calling-center.png",
    image2Label: "टेली-कॉलिंग सेंटर",
    bulletsHi: [
      "बूथ-वाइज टेलीमेट्री, वोटर टर्नआउट व स्विंग वोटर्स का रियल-टाइम एनालिसिस",
      "मिस्ड कॉल, आईवीआर (IVR) एवं बल्क व्हाट्सएप/मैसेज प्रसारण",
      "दैनिक समीक्षा रिपोर्ट एवं त्वरित डैमेज कंट्रोल निर्देश"
    ],
    bulletsEn: [
      "Booth-wise telemetry, turnout & swing voter real-time analytics",
      "Missed call, IVR and bulk WhatsApp broadcast operations",
      "Daily campaign intelligence briefings & rapid response instructions"
    ],
    ctaTextHi: "वार रूम टेक्नोलॉजी एवं टूल्स देखें",
    ctaTextEn: "Explore War Room Tech & Tools",
    ctaLink: "/technology"
  }
};

export const defaultGallery: GalleryContent = {
  showImageContent: false, // Default is false as requested by user! Keep all content in admin, but hidden on user side
  headingHi: "जमीनी सक्रियता, हाई-टेक वार रूम व मीडिया स्टूडियो की एक झलक",
  headingEn: "Glimpse of Ground Operations, Hi-Tech War Room & Media Studio",
  subtitleHi: "उत्तर प्रदेश भर में प्रत्याशियों और राजनीतिक नेताओं के साथ 360° चुनावी अभियान प्रबंधन के वास्तविक छायाचित्र।",
  subtitleEn: "Authentic campaign photography documenting real-time ground ops, booth management, and broadcast studios.",
  items: galleryItems
};

export const defaultHomepage: HomepageContent = {
  studioWarRoom: defaultStudioWarRoom,
  bannerSlider: {
    slides: [
      {
        id: 1,
        src: "/images/banners/banner-1.jpeg",
        alt: "Taking Your Message To Every Voter - Workforce Infotech",
        titleHi: "हर मतदाता तक आपका संदेश — ऑन ग्राउंड, ऑन स्क्रीन, ऑनलाइन",
        titleEn: "Taking Your Message To Every Voter — On Ground, Screen & Online",
        subtitleHi: "एलईडी प्रचार वैन • मीडिया बाइट्स • इन्फ्लुएंसर इंटरव्यू • सोशल मीडिया अभियान • जमीनी सक्रियता • चुनावी डेटा सपोर्ट",
        subtitleEn: "LED Campaign Vans • Media Bytes • Influencer Interviews • Social Media • Grassroots Activation • Data Analytics",
        ctaTextHi: "अभियान सेवाएँ देखें",
        ctaTextEn: "Explore Campaign Verticals",
        ctaLink: "/services",
        badgeHi: "360° चुनावी प्रचार समाधान",
        badgeEn: "360° Integrated Campaign"
      },
      {
        id: 2,
        src: "/images/banners/banner-2.jpeg",
        alt: "Turning Political Vision Into People's Victory - UP Elections 2027",
        titleHi: "राजनीतिक विजन को जन-विजय में बदलना — उत्तर प्रदेश चुनाव 2027",
        titleEn: "Turning Political Vision Into People's Victory — UP Elections 2027",
        subtitleHi: "वोटर डेटा मैनेजमेंट • सोशल मीडिया • चुनावी रणनीति • वीडियो प्रोडक्शन • ग्राउंड टीम • ओपिनियन पोल • वार रूम सपोर्ट",
        subtitleEn: "Voter Data • Strategic Planning • Video Production • Ground Teams • Opinion Polls • Training & War Room IT",
        ctaTextHi: "वार रूम परामर्श बुक करें",
        ctaTextEn: "Book War Room Consultation",
        ctaLink: "/contact",
        badgeHi: "मिशन यूपी विधानसभा 2027",
        badgeEn: "Mission UP Assembly 2027"
      },
      {
        id: 3,
        src: "/images/banners/banner-3.jpeg",
        alt: "Social Media Management For A Stronger Democracy - Workforce Infotech",
        titleHi: "मजबूत लोकतंत्र के लिए सोशल मीडिया प्रबंधन व डिजिटल कैंपेन",
        titleEn: "Social Media Management & Digital Dominance for Victory",
        subtitleHi: "पेज मैनेजमेंट • रील्स व वीडियो एडिटिंग • एआई वीडियो क्रिएशन • पॉलिटिकल नैरेटिव • वेरिफिकेशन • फॉलोअर ग्रोथ",
        subtitleEn: "Page Management • Viral Reels & Video Editing • AI Content • Narrative Architecture • Verification & Growth",
        ctaTextHi: "फोटो व वीडियो गैलरी देखें",
        ctaTextEn: "View Campaign Gallery",
        ctaLink: "/gallery",
        badgeHi: "डिजिटल व सोशल मीडिया संभाग",
        badgeEn: "Digital & Social Wing"
      }
    ],
    tickerHeadingHi: "हर मतदाता तक आपका संदेश — ऑन ग्राउंड, ऑन स्क्रीन, ऑनलाइन",
    tickerHeadingEn: "Taking Your Message To Every Voter — On Ground, On Screen, Online",
    tickerServicesHi: "एलईडी प्रचार वैन • मीडिया बाइट्स • इन्फ्लुएंसर इंटरव्यू • सोशल मीडिया अभियान • जमीनी सक्रियता • चुनावी डेटा सपोर्ट",
    tickerServicesEn: "LED Campaign Vans • Media Bytes • Influencer Interviews • Social Media • Grassroots Activation • Data Analytics",
    button1TextHi: "अभियान सेवाएँ देखें",
    button1TextEn: "Explore Services",
    button1Link: "/services",
    button2TextHi: "गैलरी (26+)",
    button2TextEn: "Gallery (26+)",
    button2Link: "/gallery"
  },
  hero: {
    eyebrow: "उत्तर प्रदेश विधानसभा चुनाव 2027",
    title1: "आपका चुनाव।",
    title2: "हमारी रणनीति।",
    subtitle: "डेटा, डिजिटल मीडिया, जनसंपर्क, तकनीक और जमीनी अभियान को एकीकृत करके चुनावी अभियान के लिए संपूर्ण प्रबंधन समाधान।",
    tagline: "आप जनता से जुड़िए, चुनाव प्रबंधन की जिम्मेदारी हमें दीजिए।",
    primaryCta: "अभियान पर चर्चा करें",
    secondaryCta: "हमारी सेवाएं देखें",
    teamBadge: "1000+ प्रोफेशनल टीम",
    teamSubtitle: "उत्तर प्रदेश अभियान",
    tags: ["Data & Research", "Digital Campaign", "Ground Execution", "War Room", "Media PR"]
  },
  telemetry: {
    coveragePercent: "87%",
    totalBooths: "642",
    activeFieldTeams: "128",
    loggedActivities: "1,840+",
    tickerEvents: [
      "बूथ #312: वोटर पर्ची वितरण 92% पूर्ण",
      "एलईडी वैन #04: सेक्टर-B चौपाल वीडियो स्क्रीनिंग लाइव",
      "कॉल सेंटर डेस्क: 2,410 कॉल्स डिस्पैच (सकारात्मक 78%)"
    ],
    dashboardTitle: "CAMPAIGN INTELLIGENCE DASHBOARD",
    dashboardSubtitle: "UP-AC2027 // WAR ROOM ENGINE",
    liveFeedBadge: "LIVE FEED",
    videoSrc: "/videos/campaign-video.mp4",
    audioSrc: "/videos/campaign-audio.m4a",
    youtubeUrl: "https://youtube.com/shorts/5bCg8EKiHSM",
    videoWatermark: "WORKFORCE INFOTECH (IPR)",
    stat1Sub: "+4.2% आज",
    stat2Sub: "100% एक्टिव",
    stat3Sub: "GPS ट्रैक्ड",
    stat4Sub: "लॉग्ड",
    footerNote1: "निजी एवं कस्टमाइज्ड क्लाउड आर्किटेक्चर",
    footerNote2: "सचित्र लाइव फीड (Live Illustrative)"
  },
  trustStrip: {
    items: [
      { stat: "1000+", labelHi: "प्रोफेशनल टीम", labelEn: "Professional Team", descHi: "रणनीति, रिसर्च एवं फील्ड विशेषज्ञ", descEn: "Strategy, research & field ops" },
      { stat: "DATA", labelHi: "आधारित रणनीति", labelEn: "Data Strategy", descHi: "बूथ-वार सांख्यिकी एवं जनसांख्यिकी", descEn: "Booth analytics & demographic profiling" },
      { stat: "DIGITAL", labelHi: "मल्टी-चैनल अभियान", labelEn: "Multi-Channel", descHi: "मेटा, यूट्यूब, रील्स एवं नैरेटिव", descEn: "Meta, YouTube, Reels & Narrative" },
      { stat: "GROUND", labelHi: "फील्ड एक्सीक्यूशन", labelEn: "Ground Execution", descHi: "बूथ कमेटियां, बस्ता व डोर-टू-डोर", descEn: "Booth committees & door-to-door" },
      { stat: "TECHNOLOGY", labelHi: "रियल-टाइम मॉनिटरिंग", labelEn: "Real-time Tech", descHi: "डैशबोर्ड एवं कार्यकर्ता मोबाइल ऐप", descEn: "Executive dashboards & field apps" },
      { stat: "MEDIA", labelHi: "पब्लिक कम्युनिकेशन", labelEn: "Public Media", descHi: "प्रेस, पीआर, पॉडकास्ट एवं आउटडोर", descEn: "Press notes, PR, podcasts & LED vans" }
    ]
  },
  trackRecord: {
    badgeHi: "ट्रैक रिकॉर्ड व चुनावी सफलताएं (TRACK RECORD)",
    badgeEn: "Electoral Track Record & Proven Victories",
    headingHi: "हमारे क्लाइंट्स एवं समर्थित जनप्रतिनिधियों की विजय यात्रा",
    headingEn: "Victorious Journey of Our Clients & Supported Leaders",
    subHi: "लोकसभा, विधानसभा, विधान परिषद, नगर निकाय और त्रिस्तरीय पंचायत चुनावों में वर्कफोर्स इन्फोटेक की चुनावी रणनीति का ऐतिहासिक परिणाम।",
    subEn: "Proven strategic excellence delivering landmark victories across Lok Sabha, Vidhan Sabha, MLC, and Urban Local Body elections.",
    items: [
      {
        id: "tr-1",
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
        id: "tr-2",
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
        id: "tr-3",
        name: "संगीता राजवंशी",
        roleHi: "लोकसभा प्रत्याशी — मिश्रिख लोकसभा 2024",
        roleEn: "Lok Sabha Candidate — Misrikh Lok Sabha 2024",
        constituency: "मिश्रिख (Misrikh)",
        election: "लोकसभा चुनाव 2024",
        partyBadge: "SP",
        status: "runner-up",
        highlight: "उपविजेता"
      },
      {
        id: "tr-4",
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
        id: "tr-5",
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
        id: "tr-6",
        name: "सतीश कुमार निगम",
        roleHi: "पूर्व विधायक — कल्याणपुर विधानसभा",
        roleEn: "Former MLA — Kalyanpur Assembly",
        constituency: "कल्याणपुर, कानपुर",
        election: "यूपी विधानसभा चुनाव 2022",
        partyBadge: "SP",
        status: "runner-up",
        highlight: "उपविजेता"
      },
      {
        id: "tr-7",
        name: "चौधरी सागर सिंह",
        roleHi: "विधानसभा प्रत्याशी — महोबा विधानसभा 230",
        roleEn: "Assembly Candidate — Mahoba 230",
        constituency: "महोबा 230 (Mahoba)",
        election: "यूपी विधानसभा चुनाव 2022",
        partyBadge: "INC",
        status: "featured",
        highlight: "मजबूत जनअभियान"
      },
      {
        id: "tr-8",
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
        id: "tr-9",
        name: "अविनाश सिंह चौहान",
        roleHi: "एम.एल.सी. — कानपुर, फतेहपुर",
        roleEn: "MLC — Kanpur & Fatehpur",
        constituency: "कानपुर-फतेहपुर (Kanpur)",
        election: "यूपी विधान परिषद (MLC) चुनाव",
        partyBadge: "BJP",
        status: "winner",
        highlight: "विजयी एमएलसी"
      },
      {
        id: "tr-10",
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
        id: "tr-11",
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
        id: "tr-12",
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
        id: "tr-13",
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
        id: "tr-14",
        name: "अंकित मौर्य",
        roleHi: "पार्षद — वार्ड नं. 04, ग्वालटोली कानपुर",
        roleEn: "Corporator — Ward 04 Gwaltoli",
        constituency: "ग्वालटोली, कानपुर",
        election: "नगर निगम चुनाव उत्तर प्रदेश",
        status: "winner",
        highlight: "विजयी पार्षद"
      }
    ]
  },
  founderMessage: {
    badgeHi: "संस्थापक संदेश (FOUNDER'S DESK)",
    badgeEn: "Founder & CEO's Message",
    headingHi: "“लोकतंत्र केवल चुनाव जीतने का माध्यम नहीं, जनता के विश्वास व विकास का आधार है।”",
    headingEn: "“Democracy is Not Just About Winning, It Is Grounded in People’s Trust & Progress.”",
    photoUrl: "/images/gallery/gallery-1.jpeg",
    founderName: "अनुज तिवारी (Anuj Tiwari)",
    founderRoleHi: "FOUNDER & CEO // राजनीतिक रणनीतिकार",
    founderRoleEn: "Founder & CEO // Political Strategist",
    companyName: "वर्कफोर्स इन्फोटेक प्राइवेट लिमिटेड (Workforce Infotech Pvt. Ltd.)",
    stat1Value: "10+ वर्ष",
    stat1LabelHi: "चुनावी रणनीति अनुभव",
    stat1LabelEn: "Strategic Consulting Experience",
    stat2Value: "50+ चुनाव",
    stat2LabelHi: "सफल अभियान प्रबंधन",
    stat2LabelEn: "Campaigns Successfully Managed",
    salutationHi: "प्रिय साथियों व भावी जनप्रतिनिधियों,",
    salutationEn: "Dear Leaders, Colleagues & Future Representatives,",
    p1Hi: "इसी सोच के साथ Workforce Infotech Pvt. Ltd. की स्थापना की गई, ताकि आधुनिक तकनीक, सटीक रणनीति और समर्पित टीम के माध्यम से चुनावी अभियानों को नई दिशा और नई पहचान दी जा सके।",
    p1En: "With this core vision, Workforce Infotech Pvt. Ltd. was founded to usher a new standard of excellence in electoral consulting through modern tech, empirical data science, and dedicated on-ground forces.",
    p2Hi: "आज हमें गर्व है कि हमारी टीम ने देश के विभिन्न राज्यों में अनेक चुनावी अभियानों, डिजिटल कैंपेन, जनसंपर्क, सर्वे, मीडिया मैनेजमेंट और ग्राउंड के माध्यम से अपनी विश्वसनीय पहचान बनाई है। यह उपलब्धि हमारी टीम की मेहनत, हमारे सहयोगियों के विश्वास और हमारे क्लाइंट्स के निरंतर समर्थन का परिणाम है।",
    p2En: "Today, we take immense pride in having delivered successful campaigns across states through digital media, voter surveys, media management, and disciplined booth operations.",
    p3Hi: "हमारा उद्देश्य केवल चुनाव प्रबंधन करना नहीं, बल्कि प्रत्येक उम्मीदवार, राजनीतिक दल और संगठन के लिए ऐसी कार्ययोजना तैयार करना है, जो जनता से सीधा संवाद स्थापित करे, उनकी अपेक्षाओं को समझे और लोकतांत्रिक मूल्यों को मज़बूत बनाए।",
    p3En: "Our mission transcends mere campaign management; we engineer strategic blueprints that connect candidates authentically with their electorate and strengthen democratic values.",
    quoteBoxHi: "“भविष्य में भी हम नवाचार, पारदर्शिता और उत्कृष्टता के साथ चुनाव प्रबंधन के क्षेत्र में नए मानक स्थापित करने के लिए प्रतिबद्ध रहेंगे। आपका विश्वास ही हमारी सबसे बड़ी ताकत है।”",
    quoteBoxEn: "“We remain steadfastly committed to setting new benchmarks in electoral consulting with innovation, transparency, and uncompromised dedication.”",
    button1TextHi: "रणनीतिकार टीम से सीधा संवाद करें",
    button1TextEn: "Consult Strategy Team",
    button1Link: "/contact",
    button2TextHi: "कंपनी परिचय पढ़ें",
    button2TextEn: "Company Profile",
    button2Link: "/about"
  },
  aboutTeaser: {
    badgeHi: "संस्थागत विजन",
    badgeEn: "Institutional Vision",
    heading1: "चुनाव अभियान केवल प्रचार नहीं,",
    heading2: "एक पूरी व्यवस्था है।",
    p1: "उत्तर प्रदेश विधानसभा चुनाव 2027 जैसे विशाल चुनावी अभियान में रणनीति, डेटा, डिजिटल मीडिया, जनसंपर्क, तकनीकी व्यवस्था और जमीनी क्रियान्वयन का समन्वय अत्यंत महत्वपूर्ण है।",
    p2: "वर्कफोर्स इन्फोटेक उम्मीदवार और राजनीतिक संगठनों को एक केंद्रीकृत, पेशेवर और तकनीक-सक्षम अभियान संरचना प्रदान करता है।",
    highlightTitle: "एक एजेंसी। सम्पूर्ण चुनावी अभियान।",
    highlightSub: "डेटा रिसर्च से लेकर बूथ विजय तक — सभी 11 प्रमुख कार्यक्षेत्र एक छत के नीचे।",
    highlightDescHi: "रणनीति, डेटा, जनसंपर्क, तकनीक और फील्ड ऑपरेशंस का एक ही मंच से संचालन।",
    highlightDescEn: "Orchestrating strategy, voter science, media, IT platforms, and field ops from one center.",
    cta: "हमारी संपूर्ण कार्यप्रणाली जानें →",
    cards: [
      {
        tag: "डेटा व रिसर्च",
        title: "गहन जमीनी सर्वेक्षण व बूथ प्रोफाइलिंग",
        desc: "जातीय समीकरण, स्थानीय मुद्दे, साइलेंट वोटर और मतदान प्रतिशत का सटीक वैज्ञानिक विश्लेषण।"
      },
      {
        tag: "डिजिटल व नैरेटिव",
        title: "24/7 डिजिटल मीडिया व नैरेटिव निर्माण",
        desc: "मेटा, यूट्यूब और व्हाट्सएप पर प्रभावी प्रचार, रियल-टाइम काउंटर नैरेटिव व जनमत निर्माण।"
      },
      {
        tag: "जमीनी क्रियान्वयन",
        title: "बूथ स्तर पर माइक्रो-मैनेजमेंट व वॉर रूम",
        desc: "पन्ना प्रमुख से लेकर विधानसभा वॉर रूम तक प्रत्येक कार्यकर्ता की रियल-टाइम मॉनिटरिंग।"
      }
    ]
  },
  servicesSection: {
    badgeHi: "11 एकीकृत चुनावी कार्यक्षेत्र",
    badgeEn: "11 Integrated Electoral Verticals",
    headingHi: "हमारी संपूर्ण चुनाव प्रबंधन सेवाएं",
    headingEn: "Our Complete Campaign Management Services",
    subHi: "उम्मीदवारों एवं राजनीतिक दलों के लिए डेटा, तकनीक, डिजिटल मीडिया और जमीनी क्रियान्वयन का संपूर्ण 360-डिग्री इकोसिस्टम।",
    subEn: "Comprehensive 360-degree campaign solutions combining voter analytics, digital warfare, ground machinery, and strategic command centers.",
    services: [
      {
        id: "01",
        slug: "social-media-management",
        icon: "Share2",
        titleHi: "सोशल मीडिया प्रबंधन",
        titleEn: "Social Media Management",
        tagHi: "डिजिटल नैरेटिव एवं एंगेजमेंट",
        tagEn: "Digital Narrative & Engagement",
        shortDescHi: "Facebook एवं Instagram प्रबंधन, content planning, creative design, reels, video editing, AI video production, campaign management और engagement management।",
        shortDescEn: "Comprehensive Facebook & Instagram operations, content calendar, high-impact reels, AI-assisted video editing, paid campaign optimization, and 24/7 engagement moderation.",
        capabilitiesHi: [
          "Facebook एवं Instagram पेज का संपूर्ण दैनिक प्रबंधन",
          "कंटेंट कैलेंडर एवं रणनीतिक नैरेटिव शेड्यूलिंग",
          "राजनीतिक पोस्टर्स, बैनर्स एवं हाई-इम्पैक्ट रील्स",
          "AI-असिस्टेड वीडियो एडिटिंग एवं विजुअल प्रोडक्शन"
        ]
      },
      {
        id: "02",
        slug: "election-data-research",
        icon: "Database",
        titleHi: "चुनावी डेटा एवं रिसर्च",
        titleEn: "Election Data & Research",
        tagHi: "वैज्ञानिक डेटा व वोटर मैपिंग",
        tagEn: "Voter Analytics & Booth Science",
        shortDescHi: "विधानसभा स्तर का डेटा, बूथ स्तर का विश्लेषण, मतदाता वर्गीकरण, सर्वे, feedback collection और strategic reporting।",
        shortDescEn: "In-depth constituency datasets, booth profiling, demographic stratification, door-to-door sample surveys, and predictive swing-voter analytics.",
        capabilitiesHi: [
          "विधानसभा स्तरीय ऐतिहासिक चुनावी रुझानों का विश्लेषण",
          "बूथ-स्तरीय मतदाता वर्गीकरण एवं स्विंग बूथ पहचान",
          "स्थानीय जनमत सर्वेक्षण एवं जमीनी फीडबैक संकलन",
          "जातीय, सामाजिक एवं क्षेत्रीय समीकरणों का तटस्थ अध्ययन"
        ]
      },
      {
        id: "03",
        slug: "booth-ground-management",
        icon: "Users",
        titleHi: "बूथ एवं जमीनी चुनाव प्रबंधन",
        titleEn: "Booth & Ground Campaign Management",
        tagHi: "माइक्रो-मैनेजमेंट व फील्ड ऑपरेशंस",
        tagEn: "Micro-Targeting & Booth Machinery",
        shortDescHi: "बूथ टीम, field team, door-to-door campaign coordination, ground feedback और real-time campaign monitoring।",
        shortDescEn: "Granular 10-member booth committee deployment, panna pramukh coordination, door-to-door GPS route planning, and poll-day voter turnout management.",
        capabilitiesHi: [
          "बूथ-स्तरीय समितियों एवं प्रभारियों का डिजिटल गठन व सत्यापन",
          "डोर-टू-डोर जनसंपर्क अभियान का रूट-प्लानिंग एवं ट्रैकिंग",
          "वॉलंटियर मैनेजमेंट एवं फील्ड टीम कोऑर्डिनेशन",
          "मतदान दिवस (Poll Day) बूथ वार रूम एवं बस्ता प्रबंधन प्रणाली"
        ]
      },
      {
        id: "04",
        slug: "voter-communication",
        icon: "PhoneCall",
        titleHi: "मतदाता संपर्क एवं कॉल सेंटर",
        titleEn: "Voter Communication & Call Center",
        tagHi: "टेली-कॉलिंग, वॉयस एवं मैसेजिंग",
        tagEn: "Cloud Telephony & Direct Outreach",
        shortDescHi: "SMS, WhatsApp, voice communication, IVR, missed call, toll-free और tele-calling operations।",
        shortDescEn: "High-throughput cloud call center infrastructure, DLT-registered bulk SMS broadcasts, WhatsApp blast communication, and personalized IVR candidate outreach.",
        capabilitiesHi: [
          "समर्पित टेली-कॉलर सेटअप एवं लाइव कॉलिंग डैशबोर्ड",
          "सत्यापित डेटाबेस पर लक्षित बल्क एसएमएस एवं व्हाट्सएप प्रसारण",
          "उम्मीदवार की आवाज़ में इंटरएक्टिव वॉयस रिस्पॉन्स (IVR)",
          "शिकायत निवारण एवं वोटर संपर्क टोल-फ्री हेल्पलाइन"
        ]
      },
      {
        id: "05",
        slug: "election-technology",
        icon: "Cpu",
        titleHi: "चुनावी तकनीकी समाधान",
        titleEn: "Election Technology Solutions",
        tagHi: "डिजिटल प्लेटफॉर्म एवं टूल्स",
        tagEn: "Campaign Tech Stack & Mobile Apps",
        shortDescHi: "Mobile applications, campaign dashboard, real-time monitoring, war room, WhatsApp war room, IT cell और data management।",
        shortDescEn: "Custom Android field-worker apps, cloud telemetry dashboards, real-time voter verification systems, and enterprise data-security infrastructure.",
        capabilitiesHi: [
          "कस्टमाइज़्ड कार्यकर्ता मोबाइल ऐप (वोटर सर्च एवं फील्ड रिपोर्टिंग)",
          "सेंट्रल वॉर रूम एनालिटिक्स डैशबोर्ड एवं लाइव मैप विज़ुअलाइज़ेशन",
          "सुरक्षित वोटर डेटा रिपॉजिटरी (AES-256 एन्क्रिप्शन)",
          "व्हाट्सएप ब्रॉडकास्ट एवं आईटी सेल वर्कफ़्लो ऑटोमेशन"
        ]
      },
      {
        id: "06",
        slug: "video-creative",
        icon: "Video",
        titleHi: "वीडियो, क्रिएटिव एवं कंटेंट",
        titleEn: "Video, Creative & Content Production",
        tagHi: "विजुअल स्टोरीटेलिंग एवं प्रोडक्शन",
        tagEn: "High-Impact Visual Narrative",
        shortDescHi: "Political songs, election videos, AI videos, reels, photography, biography, posters, banners और graphics।",
        shortDescEn: "Cinematic 4K campaign anthems, candidate biographical documentaries, viral short-form reels, high-resolution hoarding graphics, and rapid meme response units.",
        capabilitiesHi: [
          "मूल चुनावी एंथम (Anthem) एवं थीम सॉन्ग की ऑडियो-वीडियो प्रोडक्शन",
          "उम्मीदवार वृत्तचित्र, विजन वीडियो एवं 4K सिनेमाई भाषण रिकॉर्डिंग",
          "दैनिक वायरल रील्स, शॉर्ट्स एवं सोशल मीडिया ग्राफिक्स",
          "क्षेत्रीय मुद्रण हेतु होर्डिंग, पैम्फलेट व बैनर डिजाइन"
        ]
      },
      {
        id: "07",
        slug: "media-public-relations",
        icon: "Newspaper",
        titleHi: "मीडिया प्रबंधन एवं जनसंपर्क (PR)",
        titleEn: "Media Management & Public Relations",
        tagHi: "प्रेस वार्ता, जनसंचार एवं परसेप्शन",
        tagEn: "Press Ecosystem & Perception Building",
        shortDescHi: "Press release, media coordination, news coverage, local media management, print media, TV media और perception management।",
        shortDescEn: "Statewide and hyper-local press coordination, daily regional print tracking, TV debate talking points, media briefings, and candidate podcast production.",
        capabilitiesHi: [
          "दैनिक प्रेस विज्ञप्ति (Press Release) लेखन एवं क्षेत्रीय पत्रकारों को वितरण",
          "प्रेस वार्ता (Press Conference) योजना एवं मीडिया किट तैयारी",
          "प्रिंट व इलेक्ट्रॉनिक मीडिया में कवरेज मॉनिटरिंग व क्लिपिंग रिपोर्ट",
          "उम्मीदवार पॉडकास्ट एवं स्थानीय प्रभावशाली पत्रकारों से साक्षात्कार"
        ]
      },
      {
        id: "08",
        slug: "outdoor-campaign",
        icon: "Truck",
        titleHi: "आउटडोर एवं जमीनी प्रचार",
        titleEn: "Outdoor & Ground Campaigning",
        tagHi: "एलईडी वैन, रथ एवं विजुअल उपस्थिति",
        tagEn: "LED Vans, Raths & Large Format",
        shortDescHi: "LED vans, campaign rath, hoardings, banners, public address systems, roadshows और volunteer coordination।",
        shortDescEn: "High-definition mobile LED display vehicles, custom-fabricated campaign raths, weatherproof high-wattage sound systems, and constituency-wide hoarding placement.",
        capabilitiesHi: [
          "हाई-डेफिनिशन एलईडी प्रचार वैन (GPS-ट्रैक्ड चौपाल स्क्रीनिंग)",
          "उम्मीदवार हेतु विशेष प्रचार रथ डिजाइनिंग एवं साउंड सेटअप",
          "रणनीतिक तिराहों, चौराहों व बाजारों में होर्डिंग एवं फ्लेक्स इंस्टॉलेशन",
          "रोड शो रूट प्लानिंग, लाउडस्पीकर अनुमति एवं ध्वनि व्यवस्था"
        ]
      },
      {
        id: "09",
        slug: "event-campaign-management",
        icon: "Calendar",
        titleHi: "कार्यक्रम एवं चुनाव अभियान प्रबंधन",
        titleEn: "Event & Rally Campaign Management",
        tagHi: "विशाल जनसभाएं, रैली एवं रोड शो",
        tagEn: "Mega Rallies & Protocol Logistics",
        shortDescHi: "Rallies, public meetings, sabha, roadshows, volunteer mobilization, event logistics और venue management।",
        shortDescEn: "End-to-end management of 5,000 to 50,000+ attendee rallies, German hanger marquee setups, stage fabrication, live broadcast streaming, and crowd flow control.",
        capabilitiesHi: [
          "विशाल चुनावी रैलियों एवं जनसभाओं का संपूर्ण लॉजिस्टिक्स प्रबंधन",
          "मंच निर्माण, जर्मन हैंगर टेंट, वीआईपी लाउंज एवं सुरक्षा बैरिकेडिंग",
          "4K मल्टी-कैमरा लाइव स्ट्रीमिंग (यूट्यूब, फेसबुक एवं विशाल एलईडी स्क्रीन)",
          "भीड़ आवागमन प्रबंधन, कार्यकर्ता आवागमन एवं पार्किंग व्यवस्था"
        ]
      },
      {
        id: "10",
        slug: "candidate-branding",
        icon: "Award",
        titleHi: "उम्मीदवार ब्रांडिंग एवं पर्सना",
        titleEn: "Candidate Branding & Leadership Persona",
        tagHi: "व्यक्तिगत छवि, भाषण एवं विजन",
        tagEn: "Candidate Narrative & Positioning",
        shortDescHi: "Leadership persona, image building, vision document, biography, narrative building और media coaching।",
        shortDescEn: "Comprehensive leadership identity cultivation, constituency vision manifesto creation, speechwriting, wardrobe consultation, and debate coaching.",
        capabilitiesHi: [
          "उम्मीदवार की यूएसपी एवं विशिष्ट राजनीतिक नैरेटिव का निर्धारण",
          "विधानसभा-विशिष्ट विजन डॉक्यूमेंट (संकल्प पत्र) का निर्माण",
          "भाषण लेखन (Speechwriting) एवं बॉडी लैंग्वेज/मीडिया कोचिंग",
          "बायोग्राफी पुस्तिका एवं लीडरशिप प्रोफाइल का उच्च-स्तरीय प्रकाशन"
        ]
      },
      {
        id: "11",
        slug: "election-war-room",
        icon: "ShieldAlert",
        titleHi: "चुनावी वार रूम एवं कंट्रोल सेंटर",
        titleEn: "Election War Room & Control Center",
        tagHi: "24/7 सेंट्रल कमांड एवं निर्णय केंद्र",
        tagEn: "24/7 Strategic Command Infrastructure",
        shortDescHi: "Centralized control room, data monitoring, field tracking, rapid response, crisis management और daily reporting।",
        shortDescEn: "Multi-screen command center installation with 24/7 data analytics, intelligence synthesis, rapid crisis response, and daily candidate intelligence briefings.",
        capabilitiesHi: [
          "विधानसभा मुख्यालय पर मल्टी-स्क्रीन वॉर रूम सेटअप एवं संचालन",
          "प्रतिद्वंद्वी रणनीति एवं नैरेटिव की 24/7 मॉनिटरिंग व काउंटर-स्ट्रैटेजी",
          "आपातकालीन संकट प्रबंधन (Crisis Management & Rumor Neutralization)",
          "प्रतिदिन सायं 9:00 बजे उम्मीदवार को विस्तृत एक्शन-टेबल रिपोर्टिंग"
        ]
      }
    ]
  },
  oneAgency: {
    badgeHi: "7 मजबूत स्तंभ",
    badgeEn: "7 Strategic Pillars",
    title1: "एक एजेंसी।",
    title2: "संपूर्ण चुनावी अभियान।",
    sub: "रणनीति, तकनीक, प्रचार और फील्ड का 360-डिग्री एकीकरण।",
    pillars: [
      { name: "DATA", nameHi: "डेटा एवं रिसर्च", desc: "बूथ प्रोफाइलिंग, ट्रेंड्स व जनसांख्यिकी" },
      { name: "DIGITAL", nameHi: "डिजिटल मीडिया", desc: "फेसबुक, इंस्टाग्राम, रील्स व बूस्टिंग" },
      { name: "COMMUNICATION", nameHi: "मतदाता संवाद", desc: "कॉल सेंटर, एसएमएस, व्हाट्सएप व आईवीआर" },
      { name: "MEDIA", nameHi: "मीडिया व पीआर", desc: "प्रेस वार्ता, विज्ञप्ति व परसेप्शन" },
      { name: "GROUND", nameHi: "जमीनी प्रबंधन", desc: "बूथ कमेटियां, बस्ता व डोर-टू-डोर" },
      { name: "TECHNOLOGY", nameHi: "तकनीक व ऐप्स", desc: "वॉर रूम डैशबोर्ड व फील्ड ऐप्स" },
      { name: "BRANDING", nameHi: "उम्मीदवार ब्रांडिंग", desc: "बायोग्राफी, विजन व नेतृत्व छवि" }
    ]
  },
  process: {
    badgeHi: "कार्ययोजना",
    badgeEn: "Methodology",
    heading: "हमारी कार्यप्रणाली: 7-चरणीय वैज्ञानिक प्रक्रिया",
    sub: "डेटा अनुसंधान से लेकर मतदान दिवस तक — संपूर्ण अभियान का सुनियोजित क्रियान्वयन।",
    steps: [
      { num: "01", title: "DATA", desc: "विधानसभा एवं बूथ स्तरीय ऐतिहासिक आंकड़ों का गहन संकलन व विश्लेषण।" },
      { num: "02", title: "STRATEGY", desc: "विधानसभा की प्राथमिकताओं और समीकरणों पर आधारित अनुकूलित कार्ययोजना।" },
      { num: "03", title: "CONTENT", desc: "स्थानीय मुद्दों और उम्मीदवार के विजन पर आधारित प्रामाणिक ऑडियो-विजुअल निर्माण।" },
      { num: "04", title: "COMMUNICATION", desc: "टेली-कॉलिंग, व्हाट्सएप, एसएमएस और डिजिटल माध्यमों से मतदाताओं तक सीधा संवाद।" },
      { num: "05", title: "GROUND EXECUTION", desc: "डोर-टू-डोर संपर्क, बूथ कार्यकर्ता समन्वय और प्रचार वाहनों का जमीनी संचालन।" },
      { num: "06", title: "MONITORING", desc: "कमांड सेंटर द्वारा रियल-टाइम में हर गतिविधि, रुझान और समस्याओं की निगरानी।" },
      { num: "07", title: "REPORTING", desc: "दैनिक एवं साप्ताहिक विस्तृत रिपोर्ट जिससे उम्मीदवार को मिलती है सटीक स्थिति।" }
    ]
  },
  commandCenter: {
    badgeHi: "केंद्रीकृत कमान एवं नियंत्रण प्रणाली",
    badgeEn: "Centralized Command & Control Matrix",
    heading: "अभियान की हर गतिविधि पर नज़र।",
    sub: "वार रूम एवं एनालिटिक्स कंसोल",
    desc: "एक केंद्रीकृत सिस्टम के माध्यम से डिजिटल, फील्ड, मीडिया, कम्युनिकेशन और रिपोर्टिंग गतिविधियों को व्यवस्थित करने में सहायता। उम्मीदवार को मिलती है संपूर्ण पारदर्शिता।",
    bullet1: "बूथ-वार कार्यकर्ता गतिविधि एवं उपस्थिति की लाइव ट्रैकिंग।",
    bullet2: "मतदाता संपर्क कॉलिंग एवं एसएमएस वितरण की रीयल-टाइम रिपोर्ट।",
    bullet3: "सोशल मीडिया एंगेजमेंट एवं जनमत रुझानों का त्वरित विश्लेषण।",
    boothsTotal: "412",
    boothsCovered: "412 / 412 (100% कमेटियां गठित)",
    swingBooths: "84 Booths (विशेष फोकस सूची)"
  },
  interactiveMap: {
    badgeHi: "भू-रणनीतिक उपस्थिति",
    badgeEn: "Geo-Strategic Coverage",
    heading: "उत्तर प्रदेश: 403 विधानसभा क्षेत्रों में विस्तृत कवरेज क्षमता",
    sub: "पूर्वांचल से पश्चिमी यूपी, अवध से बुंदेलखंड तक — हर क्षेत्र की अनूठी सामाजिक एवं राजनीतिक संरचना के लिए विशेष रूप से तैयार की गई रणनीति।",
    regions: [
      { id: "western", nameHi: "पश्चिमी उत्तर प्रदेश", nameEn: "Western UP", seats: 136, booths: 52400, notesHi: "किसान बाहुल्य, तीव्र डिजिटल पहुंच, सशक्त पन्ना प्रमुख नेटवर्क की आवश्यकता।", notesEn: "High agrarian voter concentration, deep smartphone penetration, demands hyper-local digital response." },
      { id: "awadh", nameHi: "अवध क्षेत्र", nameEn: "Awadh Region", seats: 118, booths: 44200, notesHi: "मिश्रित शहरी-ग्रामीण जनसांख्यिकी, लखनऊ वॉर रूम से सीधा त्वरित संपर्क।", notesEn: "Complex semi-urban balance, centralized coordination directly out of the Lucknow Command Center." },
      { id: "purvanchal", nameHi: "पूर्वांचल", nameEn: "Purvanchal", seats: 117, booths: 49800, notesHi: "गहन सामाजिक समीकरण, चौपाल एवं जमीनी डोर-टू-डोर संपर्क का सर्वोच्च प्रभाव।", notesEn: "Intense multi-caste demographic calculations; grassroots chaupal meetings yield maximum swing." },
      { id: "bundelkhand", nameHi: "बुंदेलखंड", nameEn: "Bundelkhand", seats: 19, booths: 9800, notesHi: "भौगोलिक रूप से विस्तृत, एलईडी प्रचार वैन एवं मोबाइल वॉयस कॉलिंग का विशेष महत्व।", notesEn: "Expansive geography; high reliance on mobile LED display raths and high-throughput IVR campaigns." },
      { id: "rohilkhand", nameHi: "रुहेलखंड", nameEn: "Rohilkhand", seats: 13, booths: 7200, notesHi: "स्थानीय जनसांख्यिकीय संवेदनशीलता, लक्षित नैरेटिव एवं व्हाट्सएप वॉर रूम प्रभाव।", notesEn: "Micro-demographic segmentation with tailored localized narrative and WhatsApp broadcast war rooms." }
    ]
  },
  whyChooseUs: {
    badgeHi: "रणनीतिक श्रेष्ठता",
    badgeEn: "Strategic Advantage",
    heading: "वर्कफोर्स इन्फोटेक ही क्यों?",
    sub: "पारंपरिक प्रचारकों और आधुनिक चुनावी प्रबंधन में जो अंतर होता है, वही वर्कफोर्स इन्फोटेक की पहचान है।",
    cards: [
      { title: "1000+ समर्पित टीम", desc: "डेटा वैज्ञानिकों, वीडियो निर्माताओं, कॉल ऑपरेटरों और फील्ड रणनीतिकारों की सशक्त इन-हाउस टीम।" },
      { title: "वैज्ञानिक एवं डेटा-आधारित", desc: "अनुमानों पर नहीं, बल्कि सटीक ऐतिहासिक आंकड़ों, जनसांख्यिकी और वैज्ञानिक सर्वेक्षणों पर आधारित रणनीति।" },
      { title: "100% गोपनीयता एवं NDA", desc: "आपका प्रत्येक डेटा, आंतरिक रणनीति और मतदाता विश्लेषण पूरी तरह गोपनीय और सुरक्षित रहता है।" },
      { title: "360-डिग्री एकीकृत समाधान", desc: "डेटा से लेकर सोशल मीडिया, एलईडी वैन, रैलियां और वॉर रूम — सब कुछ एक ही छत के नीचे।" },
      { title: "रियल-टाइम मॉनिटरिंग", desc: "उम्मीदवार को प्रतिदिन शाम को संपूर्ण फील्ड और डिजिटल गतिविधियों की प्रामाणिक रिपोर्ट।" },
      { title: "पूर्णतः विधिक एवं ECI अनुपालन", desc: "आदर्श आचार संहिता, ट्राई (TRAI/DLT) नियम और DPDP Act 2023 के शत-प्रतिशत नियमों का पालन।" },
      { title: "लखनऊ में सेंट्रल वॉर रूम", desc: "उत्तर प्रदेश की राजधानी लखनऊ से 24/7 सक्रिय नियंत्रण केंद्र और त्वरित प्रतिक्रिया दल।" },
      { title: "उम्मीदवार-केंद्रित दृष्टिकोण", desc: "हम चुनाव नहीं लड़ते, हम आपके चुनाव लड़ने की क्षमता को तकनीक और रणनीति से कई गुना बढ़ाते हैं।" }
    ]
  },
  teamSection: {
    badgeHi: "मानव संसाधन एवं विशेषज्ञता",
    badgeEn: "Human Capital & Field Units",
    heading: "1000+ प्रोफेशनल्स की समर्पित चुनावी सेना",
    sub: "हर विधा के विशेषज्ञ मिलकर बनाते हैं एक अपराजेय अभियान संरचना।",
    proofBadge: "1000+ इन-हाउस टीम",
    categories: [
      { title: "डेटा रिसर्च एवं एनालिटिक्स विंग", size: "120+ विशेषज्ञ", desc: "बूथ प्रोफाइलिंग, सांख्यिकी, स्विंग वोटर मैपिंग और फील्ड सर्वेयर।" },
      { title: "डिजिटल मीडिया एवं क्रिएटिव प्रोडक्शन", size: "250+ प्रोफेशनल्स", desc: "वीडियो एडिटर, ग्राफिक डिजाइनर, रील्स निर्माता और नैरेटिव राइटर्स।" },
      { title: "टेली-कॉलिंग एवं वोटर आउटरीच सेंटर", size: "400+ ऑपरेटर्स", desc: "क्लाउड कॉल सेंटर, व्हाट्सएप प्रसारण टीम और फीडबैक एजेंट।" },
      { title: "फील्ड कोऑर्डिनेशन एवं वॉर रूम डेस्क", size: "230+ रणनीतिकार", desc: "विधानसभा प्रभारी, एलईडी वैन ऑपरेटर्स और 24/7 वॉर रूम एनालिस्ट।" }
    ]
  },
  techSection: {
    badgeHi: "तकनीकी अवसंरचना",
    badgeEn: "Technology Infrastructure",
    heading: "चुनावी तकनीकी अवसंरचना",
    sub: "क्लाउड कंप्यूटिंग, मोबाइल ऐप्स, डेटा एन्क्रिप्शन और वास्तविक समय एनालिटिक्स का संगम।",
    disclaimer: "सभी तकनीकी समाधान केवल अभियान समन्वय, कार्यकर्ता ट्रैकिंग और सार्वजनिक प्रचार विश्लेषण हेतु डिज़ाइन किए गए हैं।",
    items: [
      { title: "कार्यकर्ता मोबाइल ऐप", desc: "पन्ना प्रमुखों और बूथ एजेंटों के लिए वोटर लिस्ट सर्च, पर्ची वितरण और डोर-टू-डोर ट्रैकिंग ऐप।" },
      { title: "एग्जीक्यूटिव वॉर रूम डैशबोर्ड", desc: "उम्मीदवार के लिए लाइव एनालिटिक्स — बूथ कवरेज, कॉलिंग स्थिति, और फील्ड गतिविधियों का रीयल-टाइम कंसोल।" },
      { title: "क्लाउड टेलीफोनी इंफ्रास्ट्रक्चर", desc: "प्रतिदिन 50,000+ मतदाताओं से व्यक्तिगत वॉयस और आईवीआर संपर्क करने की क्लाउड क्षमता।" },
      { title: "AES-256 डेटा एन्क्रिप्शन", desc: "सभी संवेदनशील अभियान डेटा और वोटर सूचियों के लिए बैंक-स्तरीय डेटा सुरक्षा मानक।" }
    ]
  },
  solutionShowcase: {
    badgeHi: "इलस्ट्रेटिव केस स्टडीज",
    badgeEn: "Illustrative Showcase",
    heading: "चुनावी सॉल्यूशंस व केस स्टडीज",
    sub: "उम्मीदवारों एवं राजनीतिक संगठनों के लिए विशेष रूप से तैयार किए गए अभियान मॉड्यूल। (उदाहरणात्मक प्रस्तुतियां)",
    solutions: [
      { id: "sol-1", title: "सेंट्रल वॉर रूम कमान मॉड्यूल", tag: "WAR ROOM", desc: "विधानसभा मुख्यालय पर मल्टी-स्क्रीन नियंत्रण केंद्र की स्थापना, 24/7 मॉनिटरिंग और संकट निवारण।", metrics: "100% बूथ कनेक्टिविटी // 24/7 लाइव" },
      { id: "sol-2", title: "बूथ माइक्रो-मैनेजमेंट सिस्टम", tag: "GROUND OPS", desc: "प्रत्येक मतदान केंद्र पर 10-सदस्यीय प्रमाणित बूथ कमेटी और पन्ना प्रमुखों की जीपीएस-आधारित फील्ड ट्रैकिंग।", metrics: "400+ बूथ // 4,000+ कार्यकर्ता" },
      { id: "sol-3", title: "डिजिटल नैरेटिव एवं रील्स डोमिनेशन", tag: "DIGITAL", desc: "मेटा और यूट्यूब पर प्रतिदिन 3-5 उच्च गुणवत्ता वाली रील्स, विजन वीडियो और त्वरित काउंटर-नैरेटिव का संचालन।", metrics: "2.5M+ रीच // 85% पॉजिटिव एंगेजमेंट" },
      { id: "sol-4", title: "वोटर आउटरीच एवं टेली-कॉलिंग नेटवर्क", tag: "OUTREACH", desc: "समर्पित कॉल सेंटर से 3 चरणों में प्रत्येक परिवार से संपर्क, जनसमस्याओं का संकलन और उम्मीदवार का संदेश।", metrics: "1,50,000+ सत्यापित कॉल्स" },
      { id: "sol-5", title: "एलईडी प्रचार वैन एवं चौपाल अभियान", tag: "OUTDOOR", desc: "दिन में 4-6 गांवों में चौपाल वीडियो स्क्रीनिंग, उम्मीदवार का भाषण प्रसारण और प्रचार सामग्री वितरण।", metrics: "120+ गांव प्रति माह कवरेज" },
      { id: "sol-6", title: "उम्मीदवार ब्रांडिंग एवं विजन डॉक्यूमेंट", tag: "BRANDING", desc: "विधानसभा-विशिष्ट 20-सूत्रीय संकल्प पत्र, 4K सिनेमाई वृत्तचित्र, बायोग्राफी पुस्तिका और मीडिया कोचिंग।", metrics: "व्यक्तिगत यूएसपी स्थापित" }
    ]
  },
  compliance: {
    badgeHi: "विधिक एवं नैतिक प्रतिबद्धता",
    badgeEn: "Statutory & Ethical Compliance",
    heading: "विधिक, नैतिक एवं विनियामक अनुपालन",
    sub: "वर्कफोर्स इन्फोटेक पूर्णतः कानूनसम्मत और लोकतांत्रिक मर्यादाओं के भीतर रहकर कार्य करता है।",
    desc: "हम भारत निर्वाचन आयोग (ECI), भारतीय दूरसंचार विनियामक प्राधिकरण (TRAI) तथा डेटा संरक्षण अधिनियम (DPDP 2023) के सभी दिशा-निर्देशों का अक्षरशः पालन करते हैं।",
    points: [
      "भारत निर्वाचन आयोग (ECI) की आदर्श आचार संहिता (Model Code of Conduct) का 100% अनुपालन।",
      "ट्राई (TRAI/DLT) पंजीकृत बल्क एसएमएस, व्हाट्सएप और टेलीकॉम संचार नियमों का कड़ाई से पालन।",
      "डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम (DPDP Act 2023) के अनुसार डेटा की पूर्ण गोपनीयता।",
      "सख्त गैर-प्रकटीकरण समझौता (NDA) — किसी भी उम्मीदवार का डेटा किसी तीसरे पक्ष को कभी साझा नहीं।"
    ]
  },
  finalCta: {
    heading1: "उत्तर प्रदेश विधानसभा चुनाव 2027",
    heading2: "विजयी अभियान की शुरुआत आज ही करें।",
    sub: "वार रूम सेटअप, डेटा सर्वेक्षण, डिजिटल मीडिया या संपूर्ण अभियान प्रबंधन के लिए हमारे वरिष्ठ रणनीतिकारों से गोपनीय चर्चा करें।",
    button1: "रणनीतिक चर्चा प्रारंभ करें",
    button2: "सीधे हेल्पलाइन पर कॉल करें"
  }
};

export const defaultPages: PagesContent = {
  about: {
    title: "वर्कफोर्स इन्फोटेक प्राइवेट लिमिटेड",
    subtitle: "उत्तर प्रदेश विधानसभा चुनाव 2027 के लिए प्रमुख चुनाव प्रबंधन एवं राजनीतिक संचार संस्था",
    lead: "उत्तर प्रदेश के 403 विधानसभा क्षेत्रों में चुनाव प्रबंधन, डेटा इंटेलिजेंस और राजनीतिक संचार का सबसे विश्वसनीय नाम।",
    mission: "प्रत्येक उम्मीदवार और संगठन को एक सुव्यवस्थित, पारदर्शी और तकनीक-सक्षम चुनाव प्रबंधन प्रणाली उपलब्ध कराना।",
    vision: "भारतीय चुनावी लोकतंत्र में डेटा-आधारित, नैतिक और वैज्ञानिक अभियान प्रबंधन की नई परिभाषा स्थापित करना।",
    methodologyHeading: "हमारी कार्यप्रणाली एवं सिद्धांत",
    methodologySub: "पारदर्शिता, गोपनीयता, डेटा शुद्धता और जमीनी वास्तविकता का अटूट समन्वय।",
    stats: [
      { number: "1000+", label: "इन-हाउस प्रोफेशनल्स" },
      { number: "403", label: "विधानसभा क्षेत्र क्षमता" },
      { number: "11", label: "एकीकृत चुनावी कार्यक्षेत्र" },
      { number: "24/7", label: "सेंट्रल वॉर रूम सपोर्ट" }
    ],
    values: [
      { title: "पूर्ण गोपनीयता (NDA)", desc: "प्रत्येक अभियान का डेटा और रणनीति पूरी तरह सुरक्षित और अनन्य रहती है।" },
      { title: "वैज्ञानिक दृष्टिकोण", desc: "अनुमानों के बजाय कठोर डेटा सांख्यिकी और जमीनी सर्वे पर आधारित निर्णय।" },
      { title: "ECI व DPDP अनुपालन", desc: "चुनाव आयोग के नियमों और डेटा कानूनों का अक्षरशः पालन।" },
      { title: "360° निष्पादन", desc: "रणनीति से लेकर बूथ के बस्ते तक — हर जिम्मेदारी का पेशेवर निर्वहन।" }
    ]
  },
  process: {
    heading: "हमारी कार्यप्रणाली: 7-चरणीय वैज्ञानिक प्रक्रिया",
    sub: "डेटा अनुसंधान से लेकर मतदान दिवस तक — संपूर्ण अभियान का सुनियोजित क्रियान्वयन।",
    lead: "सफल चुनावी अभियान अचानक नहीं होते, वे एक सुनियोजित वैज्ञानिक प्रक्रिया का परिणाम होते हैं। वर्कफोर्स इन्फोटेक की 7-चरणीय कार्यप्रणाली सुनिश्चित करती है कि हर संसाधन का अधिकतम उपयोग हो।",
    detailedSteps: [
      {
        number: "01",
        titleHi: "डेटा व रिसर्च",
        titleEn: "Data & Baseline Research",
        descHi: "विधानसभा का ऐतिहासिक विश्लेषण, 3 पिछले चुनावों के रुझान, जातीय समीकरण और 1,200+ नमूनों का जमीनी बेसलाइन सर्वे।",
        descEn: "Historical election dataset audit, booth profiling, swing constituency analytics, and scientific sampling.",
        deliverables: ["बूथ प्रोफाइलिंग रिपोर्ट", "स्विंग वोटर मैपिंग", "जनसांख्यिकीय विश्लेषण", "प्राथमिक मुद्दा सूचकांक"]
      },
      {
        number: "02",
        titleHi: "रणनीति व नैरेटिव",
        titleEn: "Strategy & Narrative Architecture",
        descHi: "उम्मीदवार की यूएसपी, प्रतिद्वंद्वी विश्लेषण, विधानसभा-विशिष्ट संकल्प पत्र और कोर चुनावी संदेश का निर्माण।",
        descEn: "Candidate positioning, constituency manifesto draft, opponent gap analysis, and core campaign slogans.",
        deliverables: ["विजन डॉक्यूमेंट (संकल्प पत्र)", "उम्मीदवार नैरेटिव गाइड", "जातीय समन्वय रणनीति", "कैंपेन रोडमैप"]
      },
      {
        number: "03",
        titleHi: "कंटेंट व क्रिएटिव",
        titleEn: "Content & Visual Production",
        descHi: "4K सिनेमाई एंथम, विजन वीडियो, रील्स, पोस्टर्स, होर्डिंग्स और स्थानीय भाषा में प्रभावशाली प्रचार सामग्री।",
        descEn: "4K campaign songs, candidate documentaries, daily viral reels, posters, flyers, and flex designs.",
        deliverables: ["मूल चुनावी एंथम", "दैनिक सोशल मीडिया कैलेंडर", "50+ रील्स एवं शॉर्ट्स", "आउटडोर होर्डिंग डिजाइन्स"]
      },
      {
        number: "04",
        titleHi: "मतदाता संचार",
        titleEn: "Voter Communication Outreach",
        descHi: "क्लाउड कॉल सेंटर, लक्षित व्हाट्सएप प्रसारण, बल्क एसएमएस और उम्मीदवार की आवाज़ में वैयक्तिकृत आईवीआर।",
        descEn: "High-capacity cloud call center, DLT bulk SMS broadcasts, WhatsApp groups, and personalized IVR calls.",
        deliverables: ["1,50,000+ कॉल्स डिस्पैच", "व्हाट्सएप वॉर रूम नेटवर्क", "वोटर फीडबैक डेटाबेस", "हेल्पलाइन संचालन"]
      },
      {
        number: "05",
        titleHi: "जमीनी व बूथ प्रबंधन",
        titleEn: "Ground & Booth Management",
        descHi: "प्रत्येक मतदान केंद्र पर 10-सदस्यीय समिति, पन्ना प्रमुख नियुक्ति, जीपीएस डोर-टू-डोर संपर्क और चौपाल बैठकें।",
        descEn: "10-member booth committees, panna pramukhs, GPS-tracked door-to-door teams, and chaupal meetings.",
        deliverables: ["बूथ-वार कमेटियां गठित", "पन्ना प्रमुख कार्ड्स", "डोर-टू-डोर रूट प्लान", "कार्यकर्ता मोबाइल ऐप"]
      },
      {
        number: "06",
        titleHi: "वार रूम व मॉनिटरिंग",
        titleEn: "War Room & Central Monitoring",
        descHi: "24/7 सेंट्रल कंट्रोल सेंटर, लाइव फील्ड टेलीमेट्री, प्रतिद्वंद्वी गतिविधियों की निगरानी और आपातकालीन संकट निवारण।",
        descEn: "Multi-screen command room, 24/7 live field monitoring, counter-narrative unit, and daily candidate briefing.",
        deliverables: ["मल्टी-स्क्रीन कंट्रोल रूम", "दैनिक सायं 9 बजे ब्रीफिंग", "फेक न्यूज न्यूट्रलाइजेशन", "फील्ड अलर्ट सिस्टम"]
      },
      {
        number: "07",
        titleHi: "मतदान दिवस प्रबंधन",
        titleEn: "Polling Day (Poll Day) Execution",
        descHi: "वोटर पर्ची वितरण, बूथ बस्ता प्रबंधन, प्रति 2 घंटे पर टर्नआउट ट्रैकिंग, साइलेंट वोटर मोबिलाइजेशन और त्वरित रिपोर्टिंग।",
        descEn: "Voter slip delivery, booth-camp logistics, hourly turnout tracking, silent voter mobilization, and legal desk.",
        deliverables: ["बूथ बस्ता किट", "प्रति 2 घंटे टर्नआउट डेटा", "कानूनी व शिकायत सेल", "मतदान उपरांत समीक्षा"]
      }
    ]
  },
  technology: {
    heading: "चुनावी तकनीकी अवसंरचना",
    sub: "क्लाउड कंप्यूटिंग, मोबाइल ऐप्स, डेटा एन्क्रिप्शन और वास्तविक समय एनालिटिक्स का संगम।",
    disclaimer: "सभी तकनीकी समाधान केवल अभियान समन्वय, कार्यकर्ता ट्रैकिंग और सार्वजनिक प्रचार विश्लेषण हेतु डिज़ाइन किए गए हैं।",
    cloudDesc: "उच्च-उपलब्धता निजी क्लाउड पर होस्टेड हमारा सिस्टम लाखों मतदाताओं के डेटा को सुरक्षित और रियल-टाइम में प्रोसेस करता है।",
    mobileAppDesc: "कार्यकर्ताओं के लिए विशेष रूप से डिज़ाइन किया गया हल्का और तेज एंड्रॉइड ऐप, जो कमजोर नेटवर्क में भी ऑफलाइन काम करता है।",
    securityDesc: "बैंक-स्तरीय AES-256 बिट एन्क्रिप्शन और बहु-स्तरीय अभिगम नियंत्रण (Role-Based Access Control) से सुरक्षित संपूर्ण डेटा।",
    features: [
      { title: "कार्यकर्ता मोबाइल ऐप", desc: "बूथ-वार मतदाता पर्ची, वोटर सर्च और डोर-टू-डोर फील्ड फीडबैक संकलन।" },
      { title: "एग्जीक्यूटिव वॉर रूम कंसोल", desc: "उम्मीदवार के आईपैड/लैपटॉप पर सीधे लाइव टेलीमेट्री और दैनिक प्रगति ट्रैकर।" },
      { title: "क्लाउड टेलीफोनी इंफ्रास्ट्रक्चर", desc: "प्रति घंटे 10,000+ कॉल्स डिस्पैच करने में सक्षम ऑटोमेटेड डायलर आर्किटेक्चर।" },
      { title: "व्हाट्सएप वॉर रूम इंजन", desc: "DLT और ECI नियमों का पालन करते हुए सेगमेंटेड वोटर ग्रुप्स तक सटीक कंटेंट डिलीवरी।" }
    ]
  },
  solutions: {
    heading: "चुनावी सॉल्यूशंस व केस स्टडीज",
    sub: "उम्मीदवारों एवं राजनीतिक संगठनों के लिए विशेष रूप से तैयार किए गए अभियान मॉड्यूल।",
    disclaimer: "सभी प्रस्तुतियां उदाहरणात्मक (Illustrative) हैं और वास्तविक उम्मीदवारों की गोपनीयता बनाए रखने हेतु डेटा सामान्यीकृत है।",
    modules: [
      { id: "mod-1", title: "संपूर्ण विधानसभा वार रूम पैकेज", category: "End-to-End Command", scope: "डेटा, डिजिटल, मीडिया, ग्राउंड, बूथ एवं कॉल सेंटर का 360-डिग्री संचालन।", targetAudience: "प्रमुख उम्मीदवार एवं राजनीतिक दल", outcome: "संपूर्ण अभियान की केंद्रीय निगरानी एवं 100% बूथ सक्रियता।" },
      { id: "mod-2", title: "बूथ माइक्रो-मैनेजमेंट व फील्ड ऑपरेशंस", category: "Ground Machinery", scope: "पन्ना प्रमुख नेटवर्क, 10-सदस्यीय कमेटियां और डोर-टू-डोर अभियान।", targetAudience: "जमीनी संगठन को सशक्त करने हेतु", outcome: "प्रत्येक मतदाता तक व्यक्तिगत पहुंच और मतदान दिवस पर अधिकतम टर्नआउट।" },
      { id: "mod-3", title: "डिजिटल नैरेटिव एवं सोशल मीडिया पैकेज", category: "Digital Warfare", scope: "24/7 सोशल मीडिया, 4K रील्स, वीडियो एंथम और परसेप्शन मैनेजमेंट।", targetAudience: "युवा एवं महिला मतदाताओं में मजबूत उपस्थिति हेतु", outcome: "विधानसभा में डिजिटल नैरेटिव पर पूर्ण प्रभुत्व और भारी रीच।" },
      { id: "mod-4", title: "वैज्ञानिक डेटा रिसर्च व स्विंग सर्वे", category: "Voter Analytics", scope: "जातीय समीकरण, स्थानीय मुद्दे और स्विंग बूथों की सटीक पहचान।", targetAudience: "प्रारंभिक रणनीति एवं टिकट दावेदारी हेतु", outcome: "तथ्य-आधारित अभियान योजना और संसाधनों का सटीक उपयोग।" }
    ]
  },
  contact: {
    heading: "अपने चुनाव अभियान पर चर्चा करें।",
    sub: "अपने विधानसभा क्षेत्र, campaign requirements और आवश्यक सेवाओं की जानकारी साझा करें। हमारी वरिष्ठ रणनीति टीम 24 घंटे के भीतर संपर्क करेगी।",
    confidentiality: "साझा की गई सभी जानकारियां पूर्णतः गोपनीय रखी जाती हैं तथा किसी तीसरे पक्ष को कभी साझा नहीं की जाती हैं।",
    formTitle: "अभियान परामर्श फॉर्म भरें",
    formSub: "गोपनीय चुनावी रणनीति चर्चा हेतु अपनी जानकारी दर्ज करें",
    directDeskTitle: "सीधे वार रूम डेस्क से संपर्क करें",
    directDeskSub: "लखनऊ स्थित सेंट्रल वॉर रूम से 24 घंटे तत्पर वरिष्ठ रणनीतिकार"
  },
  servicesPage: {
    heading: "हमारी 11 एकीकृत चुनावी सेवाएं",
    sub: "उत्तर प्रदेश विधानसभा चुनाव 2027 के लिए डेटा, डिजिटल, तकनीक, मीडिया और फील्ड का संपूर्ण 360-डिग्री समाधान।",
    directoryIntro: "वर्कफोर्स इन्फोटेक किसी भी अभियान के प्रत्येक पहलू को पेशेवर तरीके से प्रबंधित करने हेतु 11 विशिष्ट कार्यक्षेत्र प्रदान करता है।"
  }
};

export const defaultFaqs: FaqItem[] = [
  {
    id: "faq-1",
    category: "general",
    questionHi: "वर्कफोर्स इन्फोटेक प्राइवेट लिमिटेड क्या है और यह क्या सेवाएं प्रदान करती है?",
    questionEn: "What is Workforce Infotech Pvt. Ltd. and what services does it provide?",
    answerHi: "वर्कफोर्स इन्फोटेक उत्तर प्रदेश विधानसभा चुनाव 2027 के लिए संपूर्ण चुनाव अभियान प्रबंधन, डेटा रिसर्च, डिजिटल मीडिया, वीडियो निर्माण, कॉल सेंटर, बूथ प्रबंधन और वार रूम सॉल्यूशंस प्रदान करने वाली अग्रणी कॉर्पोरेट एजेंसी है।",
    answerEn: "Workforce Infotech is a premier political consulting firm providing end-to-end election campaign management, data intelligence, digital media, video production, call center, booth operations and war room services for UP Assembly Election 2027."
  },
  {
    id: "faq-2",
    category: "general",
    questionHi: "क्या वर्कफोर्स इन्फोटेक किसी विशेष राजनीतिक दल से जुड़ी है?",
    questionEn: "Is Workforce Infotech affiliated with any specific political party?",
    answerHi: "नहीं, वर्कफोर्स इन्फोटेक एक स्वतंत्र, गैर-पक्षपाती और व्यावसायिक चुनाव प्रबंधन कंपनी है जो विभिन्न लोकतांत्रिक दलों एवं योग्य उम्मीदवारों के लिए पेशेवर सेवाएं प्रदान करती है।",
    answerEn: "No, Workforce Infotech is an independent, non-partisan professional election management company providing services to democratic parties and qualified candidates."
  },
  {
    id: "faq-3",
    category: "compliance",
    questionHi: "क्या हमारे अभियान का डेटा पूरी तरह सुरक्षित और गोपनीय रहेगा?",
    questionEn: "Will our campaign data remain completely confidential and secure?",
    answerHi: "हाँ, हम सख्त गैर-प्रकटीकरण समझौते (NDA) के तहत कार्य करते हैं। आपका डेटा AES-256 एन्क्रिप्शन के साथ निजी क्लाउड पर सुरक्षित रहता है और कभी किसी अन्य पक्ष से साझा नहीं किया जाता।",
    answerEn: "Yes, we operate under strict non-disclosure agreements (NDAs). Your data is protected on dedicated private cloud servers with AES-256 encryption and is never shared."
  },
  {
    id: "faq-4",
    category: "services",
    questionHi: "चुनाव प्रचार शुरू करने के लिए कितने समय पहले संपर्क करना चाहिए?",
    questionEn: "How much in advance should we initiate campaign management services?",
    answerHi: "सर्वोत्तम परिणामों के लिए चुनाव से 6 से 12 माह पूर्व डेटा रिसर्च व बूथ संगठन प्रारंभ करना आदर्श है, हालांकि त्वरित 30-90 दिवसीय सघन प्रचार पैकेज भी उपलब्ध हैं।",
    answerEn: "For optimal impact, starting 6 to 12 months in advance is recommended for research and booth organizing, though intensive 30-90 day campaign packages are also available."
  }
];
