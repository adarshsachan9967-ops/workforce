export type Language = "hi" | "en";

export interface TranslationDictionary {
  announcement: string;
  announcementCta: string;
  tagline: string;
  primaryCta: string;
  secondaryCta: string;
  nav: {
    home: string;
    about: string;
    services: string;
    gallery: string;
    process: string;
    technology: string;
    creative: string;
    faq: string;
    contact: string;
    solutions: string;
    allServices: string;
    discussCampaign: string;
  };
  hero: {
    eyebrow: string;
    title1: string;
    title2: string;
    subtitle: string;
    stat1: string;
    stat1Label: string;
    stat2: string;
    stat2Label: string;
    stat3: string;
    stat3Label: string;
    stat4: string;
    stat4Label: string;
  };
  trustStrip: {
    cards: {
      stat: string;
      label: string;
      desc: string;
    }[];
  };
  aboutTeaser: {
    heading1: string;
    heading2: string;
    p1: string;
    p2: string;
    highlightTitle: string;
    highlightSub: string;
    cards: {
      tag: string;
      title: string;
      desc: string;
    }[];
    cta: string;
  };
  oneAgency: {
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
    heading: string;
    sub: string;
    steps: {
      num: string;
      title: string;
      desc: string;
    }[];
  };
  commandCenter: {
    heading: string;
    sub: string;
    desc: string;
    bullet1: string;
    bullet2: string;
    bullet3: string;
    cta: string;
  };
  team: {
    heading: string;
    sub: string;
    badge: string;
    categories: {
      title: string;
      desc: string;
      size: string;
    }[];
  };
  whyWorkforce: {
    heading: string;
    sub: string;
    cards: {
      title: string;
      desc: string;
    }[];
  };
  compliance: {
    heading: string;
    sub: string;
    desc: string;
    points: string[];
    badge: string;
  };
  finalCta: {
    heading1: string;
    heading2: string;
    sub: string;
    button1: string;
    button2: string;
    disclaimer: string;
  };
  forms: {
    title: string;
    sub: string;
    fullName: string;
    phone: string;
    email: string;
    assembly: string;
    district: string;
    servicesRequired: string;
    campaignRequirement: string;
    preferredTime: string;
    message: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successMessage: string;
    selectService: string;
    anyTime: string;
    morning: string;
    afternoon: string;
    evening: string;
  };
  footer: {
    companyName: string;
    tagline: string;
    desc: string;
    servicesCol: string;
    companyCol: string;
    resourcesCol: string;
    contactCol: string;
    rights: string;
    legalNote: string;
  };
}

export const dictionary: Record<Language, TranslationDictionary> = {
  hi: {
    announcement: "🚩 उत्तर प्रदेश विधानसभा चुनाव 2027 | प्रोफेशनल चुनाव प्रबंधन एवं प्रचार अभियान समाधान",
    announcementCta: "अभी संपर्क करें →",
    tagline: "“आप जनता से जुड़िए, चुनाव प्रबंधन की जिम्मेदारी हमें दीजिए।”",
    primaryCta: "अभियान पर चर्चा करें",
    secondaryCta: "हमारी सेवाएं देखें",
    nav: {
      home: "होम",
      about: "हमारे बारे में",
      services: "चुनावी सेवाएं",
      gallery: "गैलरी",
      process: "हमारी कार्यप्रणाली",
      technology: "टेक्नोलॉजी",
      creative: "मीडिया एवं क्रिएटिव",
      faq: "FAQ",
      contact: "संपर्क",
      solutions: "सॉल्यूशंस",
      allServices: "सभी 11 सेवाएं देखें",
      discussCampaign: "अभियान पर चर्चा करें"
    },
    hero: {
      eyebrow: "उत्तर प्रदेश विधानसभा चुनाव 2027",
      title1: "आपका चुनाव।",
      title2: "हमारी रणनीति।",
      subtitle: "डेटा, डिजिटल मीडिया, जनसंपर्क, तकनीक और जमीनी अभियान को एकीकृत करके चुनावी अभियान के लिए संपूर्ण प्रबंधन समाधान।",
      stat1: "1000+",
      stat1Label: "प्रोफेशनल टीम",
      stat2: "11",
      stat2Label: "एकीकृत सेवाएं",
      stat3: "403",
      stat3Label: "विधानसभा कवरेज क्षमता",
      stat4: "24/7",
      stat4Label: "वॉर रूम सपोर्ट"
    },
    trustStrip: {
      cards: [
        { stat: "1000+", label: "प्रोफेशनल टीम", desc: "रणनीति, रिसर्च एवं फील्ड विशेषज्ञ" },
        { stat: "DATA", label: "आधारित रणनीति", desc: "बूथ-वार सांख्यिकी एवं जनसांख्यिकी" },
        { stat: "DIGITAL", label: "मल्टी-चैनल अभियान", desc: "मेटा, यूट्यूब, शॉर्ट्स एवं नैरेटिव" },
        { stat: "GROUND", label: "फील्ड एक्सीक्यूशन", desc: "बूथ समिति एवं डोर-टू-डोर संपर्क" },
        { stat: "TECHNOLOGY", label: "रियल-टाइम मॉनिटरिंग", desc: "डैशबोर्ड एवं कार्यकर्ता मोबाइल ऐप" },
        { stat: "MEDIA", label: "पब्लिक कम्युनिकेशन", desc: "प्रेस, पीआर, पॉडकास्ट एवं आउटडोर" }
      ]
    },
    aboutTeaser: {
      heading1: "चुनाव अभियान केवल प्रचार नहीं,",
      heading2: "एक पूरी व्यवस्था है।",
      p1: "उत्तर प्रदेश विधानसभा चुनाव 2027 जैसे विशाल चुनावी अभियान में रणनीति, डेटा, डिजिटल मीडिया, जनसंपर्क, तकनीकी व्यवस्था और जमीनी क्रियान्वयन का समन्वय अत्यंत महत्वपूर्ण है।",
      p2: "वर्कफोर्स इन्फोटेक प्राइवेट लिमिटेड विभिन्न चुनावी गतिविधियों को एक संगठित, प्रोफेशनल और तकनीक-सक्षम प्रणाली के माध्यम से संचालित करने में सहायता प्रदान करती है।",
      highlightTitle: "एक एजेंसी।",
      highlightSub: "संपूर्ण चुनावी अभियान।",
      cards: [
        { tag: "DATA", title: "डेटा आधारित निर्णय", desc: "ऐतिहासिक चुनावी आंकड़ों और बूथ प्रवृत्तियों का तटस्थ विश्लेषण।" },
        { tag: "DIGITAL", title: "डिजिटल पहुंच और संचार", desc: "सोशल मीडिया, रील्स और सीधे मतदाता संवाद का प्रभावी प्रबंधन।" },
        { tag: "GROUND", title: "जमीनी अभियान का समन्वय", desc: "बूथ कमेटियों, डोर-टू-डोर टीम और रैलियों का सुदृढ़ संचालन।" }
      ],
      cta: "वर्कफोर्स इन्फोटेक के बारे में जानें →"
    },
    oneAgency: {
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
      heading: "हमारी कार्यप्रणाली",
      sub: "एक व्यवस्थित, चरणबद्ध और पारदर्शी चुनाव अभियान प्रक्रिया",
      steps: [
        { num: "01", title: "DATA", desc: "विधानसभा एवं बूथ स्तरीय ऐतिहासिक आंकड़ों का गहन संकलन व विश्लेषण।" },
        { num: "02", title: "STRATEGY", desc: "विधानसभा की प्राथमिकताओं और समीकरणों पर आधारित अनुकूलित कार्ययोजना।" },
        { num: "03", title: "CONTENT", desc: "स्थानीय मुद्दों और उम्मीदवार के विजन पर आधारित प्रामाणिक ऑडियो-विजुअल निर्माण।" },
        { num: "04", title: "COMMUNICATION", desc: "टेली-कॉलिंग, व्हाट्सएप, एसएमएस और डिजिटल माध्यमों से मतदाताओं तक सीधा संवाद।" },
        { num: "05", title: "GROUND EXECUTION", desc: "डोर-टू-डोर संपर्क, बूथ कार्यकर्ता समन्वय और प्रचार वाहनों का जमीनी संचालन।" },
        { num: "06", title: "MONITORING", desc: "कमांड सेंटर द्वारा रीयल-टाइम में हर गतिविधि, रुझान और समस्याओं की निगरानी।" },
        { num: "07", title: "REPORTING", desc: "दैनिक एवं साप्ताहिक विस्तृत रिपोर्ट जिससे उम्मीदवार को मिलती है सटीक स्थिति।" }
      ]
    },
    commandCenter: {
      heading: "अभियान की हर गतिविधि पर नज़र।",
      sub: "केंद्रीकृत कमान एवं नियंत्रण प्रणाली",
      desc: "एक केंद्रीकृत सिस्टम के माध्यम से डिजिटल, फील्ड, मीडिया, कम्युनिकेशन और रिपोर्टिंग गतिविधियों को व्यवस्थित करने में सहायता। उम्मीदवार को मिलती है संपूर्ण पारदर्शिता।",
      bullet1: "बूथ-वार टर्नआउट और कार्यकर्ता उपस्थिति का लाइव ट्रैकिंग सिस्टम",
      bullet2: "कॉल सेंटर और मतदाता प्रतिक्रिया की दैनिक श्रेणीबद्ध समरी",
      bullet3: "सोशल मीडिया नैरेटिव और विरोधी अफवाहों का 15 मिनट में काउंटर",
      cta: "वार रूम समाधान देखें →"
    },
    team: {
      heading: "1000+ प्रोफेशनल टीम",
      sub: "रणनीति, तकनीक, डिजिटल मीडिया और जमीनी अभियान के लिए विभिन्न विशेषज्ञताओं वाली समर्पित टीम।",
      badge: "संगठनात्मक क्षमता",
      categories: [
        { title: "कैंपेन स्ट्रैटेजिस्ट्स", desc: "राजनीतिक समीकरणों और नैरेटिव प्लानिंग के वरिष्ठ सलाहकार", size: "कोर विंग" },
        { title: "डेटा एवं रिसर्च एनालिस्ट्स", desc: "बूथ सांख्यिकी, मैपिंग एवं सांख्यिकीय मॉडलिंग विशेषज्ञ", size: "डेटा विंग" },
        { title: "डिजिटल मीडिया टीम", desc: "कंटेंट राइटर्स, सोशल मीडिया मैनेजर्स एवं रील्स क्रिएटर्स", size: "डिजिटल विंग" },
        { title: "क्रिएटिव एवं वीडियो प्रोडक्शन", desc: "सिनेमैटोग्राफर्स, ड्रोन पायलट, म्यूजिक डायरेक्टर्स एवं एडिटर्स", size: "प्रोडक्शन विंग" },
        { title: "सॉफ्टवेयर व डैशबोर्ड डेवलपर्स", desc: "वेब ऐप्स, डेटाबेस, क्लाउड एवं सुरक्षा इंजीनियर्स", size: "टेक्नोलॉजी विंग" },
        { title: "फील्ड ऑपरेशंस डायरेक्टर्स", desc: "विधानसभा एवं बूथ स्तर पर कार्यकर्ताओं के समन्वयक", size: "ग्राउंड विंग" },
        { title: "प्रशिक्षित टेली-कॉलिंग टीम", desc: "अवधी, भोजपुरी, ब्रज बोली में पारंगत पेशेवर कॉलर्स", size: "कॉल सेंटर विंग" },
        { title: "मीडिया एवं पीआर मैनेजर्स", desc: "पत्रकारिता, प्रेस वार्ता और समाचार पत्र समन्वयक", size: "पीआर विंग" },
        { title: "इवेंट एवं आउटडोर लॉजिस्टिक्स", desc: "जर्मन हैंगर, एलईडी वैन और रैली आयोजक", size: "इवेंट्स विंग" }
      ]
    },
    whyWorkforce: {
      heading: "हमें क्यों चुनें?",
      sub: "आधुनिक राजनीतिक अभियान के लिए एक सशक्त, उत्तरदायी और विश्वसनीय साझीदार",
      cards: [
        { title: "एकीकृत सेवाएं", desc: "11 विभिन्न चुनावी आवश्यकताओं के लिए एक ही जवाबदेह एजेंसी।" },
        { title: "डेटा आधारित दृष्टिकोण", desc: "अनुमानों के बजाय पुख्ता बूथ आंकड़ों और जनभावना पर निर्णय।" },
        { title: "डिजिटल + ग्राउंड समन्वय", desc: "ऑनलाइन प्रचार और जमीनी बूथ सक्रियता का निर्बाध तालमेल।" },
        { title: "आधुनिक टेक्नोलॉजी", desc: "कस्टम डैशबोर्ड, कार्यकर्ता मोबाइल ऐप और ऑटोमेटेड अलर्ट्स।" },
        { title: "इन-हाउस क्रिएटिव टीम", desc: "ओरिजिनल चुनावी गीत, 4K वीडियोज, रील्स और ब्रांडेड पोस्टर्स।" },
        { title: "मजबूत मीडिया सपोर्ट", desc: "प्रेस वार्ता, दैनिक विज्ञप्ति और डिजिटल इंटरव्यूज का समन्वय।" },
        { title: "24/7 मॉनिटरिंग", desc: "वॉर रूम के जरिए हर गतिविधि और फील्ड इनपुट की निगरानी।" },
        { title: "पारदर्शी रिपोर्टिंग", desc: "प्रतिदिन शाम 8 बजे उम्मीदवार को सटीक परफॉर्मेंस रिपोर्ट।" }
      ]
    },
    compliance: {
      heading: "जिम्मेदार एवं नियम-अनुरूप अभियान",
      sub: "सख्त कानूनी, नैतिक और निर्वाचन नियमों का पालन",
      desc: "सभी चुनावी, डिजिटल, संचार, डेटा, सार्वजनिक प्रचार एवं जमीनी गतिविधियां लागू कानूनों, निर्वाचन आयोग के दिशा-निर्देशों, आवश्यक अनुमतियों, डेटा-सुरक्षा आवश्यकताओं तथा संबंधित प्लेटफॉर्म/टेलीकॉम नियमों के अनुरूप संचालित की जाएंगी।",
      points: [
        "केवल अधिकृत और वैधानिक डेटा स्रोतों का उपयोग (DPDP Act अनुपालन)",
        "जिला निर्वाचन अधिकारी (DEO) से आवश्यक लिखित permissions का पालन",
        "लागू telecom communication (TRAI/DLT) नियमों का अक्षरशः पालन",
        "Meta एवं Google राजनीतिक विज्ञापन नीतियों का 100% अनुपालन",
        "सार्वजनिक प्रचार, एलईडी वाहनों और होर्डिंग्स की वैधानिक अनुमतियां",
        "जनसभाओं, रैलियों और लाउडस्पीकर के लिए निर्धारित समय सीमाओं का सम्मान",
        "अभियान की सभी रणनीतिक जानकारियों की पूर्ण गोपनीयता (Strict NDA)",
        "पारदर्शी, मर्यादित और लोकतांत्रिक मूल्यों के अनुकूल अभियान संचालन"
      ],
      badge: "वैधानिक एवं नैतिक प्रतिबद्धता"
    },
    finalCta: {
      heading1: "उत्तर प्रदेश विधानसभा चुनाव 2027",
      heading2: "की तैयारी आज से शुरू करें।",
      sub: "अपने चुनाव अभियान की आवश्यकताओं पर हमारी वरिष्ठ रणनीतिक टीम से सीधी चर्चा करें।",
      button1: "अभियान पर चर्चा करें",
      button2: "डायरेक्ट कॉल करें",
      disclaimer: "सभी सेवाएं निर्वाचन आयोग के दिशा-निर्देशों और कानूनी अनुमतियों के अधीन संचालित की जाती हैं।"
    },
    forms: {
      title: "अपने चुनाव अभियान पर चर्चा करें",
      sub: "विधानसभा क्षेत्र और आवश्यक सेवाओं की जानकारी साझा करें। हमारी टीम 24 घंटे के भीतर संपर्क करेगी।",
      fullName: "पूरा नाम *",
      phone: "मोबाइल नंबर *",
      email: "ईमेल आईडी (वैकल्पिक)",
      assembly: "विधानसभा क्षेत्र का नाम व क्रमांक *",
      district: "जिला *",
      servicesRequired: "आवश्यक मुख्य सेवाएं *",
      campaignRequirement: "अभियान की वर्तमान स्थिति एवं मुख्य आवश्यकता",
      preferredTime: "संपर्क करने का पसंदीदा समय",
      message: "अतिरिक्त विवरण या संदेश",
      submit: "अभियान पर चर्चा करें →",
      submitting: "जानकारी दर्ज हो रही है...",
      successTitle: "धन्यवाद!",
      successMessage: "आपकी जानकारी सफलतापूर्वक प्राप्त हो गई है। हमारी टीम जल्द ही आपसे संपर्क करेगी।",
      selectService: "सेवा का चयन करें",
      anyTime: "किसी भी समय",
      morning: "प्रातः (9:00 AM - 12:00 PM)",
      afternoon: "दोपहर (12:00 PM - 4:00 PM)",
      evening: "शाम (4:00 PM - 8:00 PM)"
    },
    footer: {
      companyName: "WORKFORCE INFOTECH PRIVATE LIMITED",
      tagline: "चुनाव प्रबंधन | राजनीतिक अभियान | डेटा एवं रिसर्च | डिजिटल मीडिया | तकनीकी समाधान",
      desc: "उत्तर प्रदेश विधानसभा चुनाव 2027 के लिए एक संपूर्ण, तकनीक-सक्षम और डेटा-संचालित चुनाव प्रबंधन एवं अभियान सेवा कंपनी।",
      servicesCol: "चुनावी सेवाएं",
      companyCol: "कंपनी",
      resourcesCol: "संसाधन",
      contactCol: "संपर्क सूत्र",
      rights: "सर्वाधिकार सुरक्षित।",
      legalNote: "Election campaign activities are subject to applicable laws, permissions and regulatory requirements."
    }
  },
  en: {
    announcement: "🚩 Uttar Pradesh Assembly Election 2027 | Professional Election Campaign Management Solutions",
    announcementCta: "Connect Now →",
    tagline: "“You connect with the electorate, entrust the campaign management to us.”",
    primaryCta: "Discuss Campaign",
    secondaryCta: "Explore Our Services",
    nav: {
      home: "Home",
      about: "About Us",
      services: "Electoral Services",
      gallery: "Gallery",
      process: "Our Methodology",
      technology: "Technology",
      creative: "Media & Creative",
      faq: "FAQ",
      contact: "Contact",
      solutions: "Solutions",
      allServices: "View All 11 Services",
      discussCampaign: "Discuss Campaign"
    },
    hero: {
      eyebrow: "Uttar Pradesh Legislative Assembly Election 2027",
      title1: "Your Election.",
      title2: "Our Strategy.",
      subtitle: "Uniting data intelligence, digital media, public relations, cutting-edge technology, and disciplined ground execution into one unified campaign management engine.",
      stat1: "1000+",
      stat1Label: "Professional Team",
      stat2: "11",
      stat2Label: "Integrated Verticals",
      stat3: "403",
      stat3Label: "Assembly Footprint Capacity",
      stat4: "24/7",
      stat4Label: "Command War Room Support"
    },
    trustStrip: {
      cards: [
        { stat: "1000+", label: "Professional Team", desc: "Strategists, data scientists & field marshals" },
        { stat: "DATA", label: "Intelligence-Driven", desc: "Granular booth demography & historical swing models" },
        { stat: "DIGITAL", label: "Multi-Channel Media", desc: "Meta, YouTube, vertical reels & narrative design" },
        { stat: "GROUND", label: "Field Execution", desc: "Booth committee structure & door-to-door canvassing" },
        { stat: "TECHNOLOGY", label: "Real-Time Telemetry", desc: "Command dashboards & grassroots mobile apps" },
        { stat: "MEDIA", label: "Public Communication", desc: "Press relations, PR, podcasts & outdoor branding" }
      ]
    },
    aboutTeaser: {
      heading1: "A political campaign is not just publicity,",
      heading2: "it is a total operational ecosystem.",
      p1: "In a high-stakes arena like the Uttar Pradesh Assembly Election 2027, the disciplined synchronization of strategy, voter data, digital communications, public relations, tech infrastructure, and ground-level execution determines electoral authority.",
      p2: "Workforce Infotech Private Limited empowers candidates and political organizations with an organized, technology-enabled, and professional command structure.",
      highlightTitle: "One Agency.",
      highlightSub: "The Complete Campaign.",
      cards: [
        { tag: "DATA", title: "Data-Driven Decisions", desc: "Rigorous analysis of historical trends and booth-level dynamics." },
        { tag: "DIGITAL", title: "Digital Reach & Narrative", desc: "High-impact social feeds, viral reels, and targeted voter communication." },
        { tag: "GROUND", title: "Grassroots Coordination", desc: "Systematic mobilization of booth committees and voter contact drives." }
      ],
      cta: "Learn About Workforce Infotech →"
    },
    oneAgency: {
      title1: "One Agency.",
      title2: "The Complete Campaign.",
      sub: "360-degree integration of strategy, technology, creative media, and field execution.",
      pillars: [
        { name: "DATA", nameHi: "Data & Research", desc: "Booth demography, swing analytics & polling" },
        { name: "DIGITAL", nameHi: "Digital Media", desc: "Facebook, Instagram, reels & authorized boosting" },
        { name: "COMMUNICATION", nameHi: "Voter Outreach", desc: "Cloud call centers, SMS, WhatsApp & IVR" },
        { name: "MEDIA", nameHi: "Media & PR", desc: "Press conferences, releases & reputation PR" },
        { name: "GROUND", nameHi: "Ground Operations", desc: "Booth committees, voter slips & canvassing" },
        { name: "TECHNOLOGY", nameHi: "Tech & Applications", desc: "War room dashboards & field worker apps" },
        { name: "BRANDING", nameHi: "Candidate Branding", desc: "Biographies, vision manifestos & gravitas" }
      ]
    },
    process: {
      heading: "Our Operational Methodology",
      sub: "A disciplined, phase-driven, and transparent campaign management lifecycle",
      steps: [
        { num: "01", title: "DATA", desc: "Rigorous aggregation and statistical profiling of historical constituency records." },
        { num: "02", title: "STRATEGY", desc: "Bespoke operational roadmaps addressing local socio-political dynamics." },
        { num: "03", title: "CONTENT", desc: "Producing broadcast-grade anthems, documentaries, reels, and posters." },
        { num: "04", title: "COMMUNICATION", desc: "Deploying tele-calling, approved WhatsApp, SMS, and IVR broadcasts." },
        { num: "05", title: "GROUND EXECUTION", desc: "Mobilizing door-to-door canvassing, booth in-charges, and mobile LED raths." },
        { num: "06", title: "MONITORING", desc: "24/7 central command monitoring field progress, voter sentiment, and rumors." },
        { num: "07", title: "REPORTING", desc: "Delivering daily 8:00 PM executive dossiers giving the candidate total clarity." }
      ]
    },
    commandCenter: {
      heading: "Total Visibility Over Every Campaign Touchpoint.",
      sub: "Centralized Command & Control System",
      desc: "Orchestrating digital media, field teams, press relations, voter telephony, and daily intelligence through one unified terminal. Complete operational transparency for the candidate.",
      bullet1: "Live station-by-station turnout and worker presence telemetry",
      bullet2: "Granular citizen sentiment logs and civic grievance categorizations",
      bullet3: "Rapid 15-minute counter-narrative releases neutralizing opposition rumors",
      cta: "Explore War Room Solutions →"
    },
    team: {
      heading: "1000+ Professional Workforce",
      sub: "A multi-disciplinary task force spanning electoral strategy, data science, digital media, and field logistics.",
      badge: "Operational Scale",
      categories: [
        { title: "Campaign Strategists", desc: "Senior advisors in political communications and local narrative planning", size: "Strategy Core" },
        { title: "Data & Research Analysts", desc: "Specialists in demographic spatial mapping and polling mathematics", size: "Analytics Unit" },
        { title: "Digital Media Unit", desc: "Creative copywriters, social managers, and viral reel creators", size: "Digital Unit" },
        { title: "Creative & Video Crews", desc: "Cinematographers, drone operators, sound designers, and editors", size: "Production Crew" },
        { title: "Software & Cloud Engineers", desc: "Engineers building secure web portals, worker apps, and databases", size: "Tech Division" },
        { title: "Field Operations Directors", desc: "Coordinators organizing booth committees and volunteer marshals", size: "Ground Corps" },
        { title: "Bilingual Call Center Agents", desc: "Tele-callers conversant in Awadhi, Bhojpuri, Braj, and Hindi dialects", size: "Calling Division" },
        { title: "Media Relations Specialists", desc: "Journalists coordinating press releases, conferences, and briefings", size: "PR Desk" },
        { title: "Event & Mobile Logistics", desc: "Logistics crews managing staging, LED raths, and mega rallies", size: "Events Wing" }
      ]
    },
    whyWorkforce: {
      heading: "Why Partner With Workforce Infotech?",
      sub: "A dependable, strategic, and technology-driven partner for modern election campaigns",
      cards: [
        { title: "Integrated Capabilities", desc: "One accountable partner across all 11 complex campaign disciplines." },
        { title: "Data-Driven Strategy", desc: "Decisions rooted in statistical booth profiling rather than subjective hunch." },
        { title: "Digital + Ground Sync", desc: "Seamless alignment between social narratives and field committee canvassing." },
        { title: "Enterprise Technology", desc: "Custom executive dashboards, mobile field apps, and automated SMS alerts." },
        { title: "In-House Creative Studio", desc: "Broadcast-grade anthems, 4K documentaries, reels, and print hoardings." },
        { title: "Authoritative Media PR", desc: "Press conferences, daily press notes, and reputable digital interviews." },
        { title: "24/7 War Room Governance", desc: "Continuous surveillance of ground challenges, media feeds, and opposition rhetoric." },
        { title: "Transparent Executive Reporting", desc: "Actionable end-of-day performance audits delivered every night at 8 PM." }
      ]
    },
    compliance: {
      heading: "Responsible & Rule-Compliant Campaigning",
      sub: "Upholding legal, ethical, and constitutional electoral mandates",
      desc: "All electoral, digital, telecommunications, data, public advertising, and field activities are strictly conducted within the framework of applicable laws, Election Commission guidelines, formal administrative permits, data protection mandates, and platform policies.",
      points: [
        "Utilization of authorized and lawful data assets only (DPDP Act 2023 compliance)",
        "Strict adherence to written permits issued by the District Election Officer (DEO)",
        "Zero-compromise compliance with TRAI and DLT telecommunications mandates",
        "100% adherence to Meta and Google political advertisement policies",
        "Pre-sanctioned permissions for campaign vehicles, mobile LED raths, and hoardings",
        "Honoring prescribed curfew timings for public loudspeakers (10 PM to 6 AM)",
        "Ironclad non-disclosure agreements (NDAs) safeguarding all campaign strategies",
        "Decorous, respectful, and constitutionally dignified campaign execution"
      ],
      badge: "Regulatory & Ethical Integrity"
    },
    finalCta: {
      heading1: "Prepare Today for the",
      heading2: "Uttar Pradesh Assembly Election 2027.",
      sub: "Discuss your constituency requirements and campaign vision with our senior strategy directors.",
      button1: "Discuss Campaign",
      button2: "Call Official Helplines",
      disclaimer: "All campaign activities are executed strictly in compliance with Election Commission guidelines and administrative permits."
    },
    forms: {
      title: "Discuss Your Election Campaign",
      sub: "Share your constituency details and prioritized services. Our team will initiate consultation within 24 hours.",
      fullName: "Full Name *",
      phone: "Phone Number *",
      email: "Email Address (Optional)",
      assembly: "Assembly Constituency Name & No. *",
      district: "District *",
      servicesRequired: "Required Primary Services *",
      campaignRequirement: "Current Campaign Status & Key Requirements",
      preferredTime: "Preferred Consultation Time",
      message: "Additional Brief or Message",
      submit: "Discuss Campaign →",
      submitting: "Submitting details...",
      successTitle: "Thank You!",
      successMessage: "Your campaign details have been securely recorded. Our strategy team will reach out shortly.",
      selectService: "Select Service Category",
      anyTime: "Any Time",
      morning: "Morning (9:00 AM - 12:00 PM)",
      afternoon: "Afternoon (12:00 PM - 4:00 PM)",
      evening: "Evening (4:00 PM - 8:00 PM)"
    },
    footer: {
      companyName: "WORKFORCE INFOTECH PRIVATE LIMITED",
      tagline: "Election Management | Political Campaigns | Data & Research | Digital Media | Technology",
      desc: "A comprehensive, technology-enabled, and data-driven election campaign management agency for Uttar Pradesh Assembly Election 2027.",
      servicesCol: "Electoral Services",
      companyCol: "Company",
      resourcesCol: "Resources",
      contactCol: "Official Contact",
      rights: "All Rights Reserved.",
      legalNote: "Election campaign activities are subject to applicable laws, permissions and regulatory requirements."
    }
  }
};
