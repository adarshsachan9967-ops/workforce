import fs from "fs";
import path from "path";
import { getMongoDb } from "./mongodb";
import {
  Enquiry,
  NavigationItem,
  FaqItem,
  SiteSettings,
  HomepageContent,
  PagesContent,
  AdminCredentials,
  DatabaseSchema,
  GalleryContent,
  defaultSettings,
  defaultNavigation,
  defaultHomepage,
  defaultStudioWarRoom,
  defaultGallery,
  defaultPages,
  defaultFaqs
} from "./content-schema";

export * from "./content-schema";

const DB_PATH = path.join(process.cwd(), "data", "db.json");
const CONTENT_DOC_ID = "site_content";

function getLocalDatabase(): DatabaseSchema {
  try {
    if (!fs.existsSync(DB_PATH)) {
      const initialDb: DatabaseSchema = {
        enquiries: [],
        settings: defaultSettings,
        navigation: defaultNavigation,
        homepage: defaultHomepage,
        pages: defaultPages,
        faqs: defaultFaqs,
        gallery: defaultGallery
      };
      fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
      fs.writeFileSync(DB_PATH, JSON.stringify(initialDb, null, 2), "utf-8");
      return initialDb;
    }
    const data = fs.readFileSync(DB_PATH, "utf-8");
    const parsed = JSON.parse(data);

    return {
      enquiries: Array.isArray(parsed.enquiries) ? parsed.enquiries : [],
      settings: { ...defaultSettings, ...(parsed.settings || {}) },
      navigation: Array.isArray(parsed.navigation) && parsed.navigation.length > 0 ? parsed.navigation : defaultNavigation,
      homepage: {
        ...defaultHomepage,
        ...(parsed.homepage || {}),
        bannerSlider: { ...defaultHomepage.bannerSlider, ...(parsed.homepage?.bannerSlider || {}) },
        studioWarRoom: { ...defaultStudioWarRoom, ...(parsed.homepage?.studioWarRoom || {}) },
        hero: { ...defaultHomepage.hero, ...(parsed.homepage?.hero || {}) },
        telemetry: { ...defaultHomepage.telemetry, ...(parsed.homepage?.telemetry || {}) },
        trustStrip: { ...defaultHomepage.trustStrip, ...(parsed.homepage?.trustStrip || {}) },
        trackRecord: { ...defaultHomepage.trackRecord, ...(parsed.homepage?.trackRecord || {}) },
        founderMessage: { ...defaultHomepage.founderMessage, ...(parsed.homepage?.founderMessage || {}) },
        aboutTeaser: { ...defaultHomepage.aboutTeaser, ...(parsed.homepage?.aboutTeaser || {}) },
        servicesSection: { ...defaultHomepage.servicesSection, ...(parsed.homepage?.servicesSection || {}) },
        oneAgency: { ...defaultHomepage.oneAgency, ...(parsed.homepage?.oneAgency || {}) },
        process: { ...defaultHomepage.process, ...(parsed.homepage?.process || {}) },
        commandCenter: { ...defaultHomepage.commandCenter, ...(parsed.homepage?.commandCenter || {}) },
        interactiveMap: { ...defaultHomepage.interactiveMap, ...(parsed.homepage?.interactiveMap || {}) },
        whyChooseUs: { ...defaultHomepage.whyChooseUs, ...(parsed.homepage?.whyChooseUs || {}) },
        teamSection: { ...defaultHomepage.teamSection, ...(parsed.homepage?.teamSection || {}) },
        techSection: { ...defaultHomepage.techSection, ...(parsed.homepage?.techSection || {}) },
        solutionShowcase: { ...defaultHomepage.solutionShowcase, ...(parsed.homepage?.solutionShowcase || {}) },
        compliance: { ...defaultHomepage.compliance, ...(parsed.homepage?.compliance || {}) },
        finalCta: { ...defaultHomepage.finalCta, ...(parsed.homepage?.finalCta || {}) }
      },
      pages: {
        ...defaultPages,
        ...(parsed.pages || {}),
        about: { ...defaultPages.about, ...(parsed.pages?.about || {}) },
        process: { ...defaultPages.process, ...(parsed.pages?.process || {}) },
        technology: { ...defaultPages.technology, ...(parsed.pages?.technology || {}) },
        solutions: { ...defaultPages.solutions, ...(parsed.pages?.solutions || {}) },
        contact: { ...defaultPages.contact, ...(parsed.pages?.contact || {}) },
        servicesPage: { ...defaultPages.servicesPage, ...(parsed.pages?.servicesPage || {}) }
      },
      faqs: Array.isArray(parsed.faqs) && parsed.faqs.length > 0 ? parsed.faqs : defaultFaqs,
      gallery: parsed.gallery
        ? {
            ...defaultGallery,
            ...parsed.gallery,
            items: Array.isArray(parsed.gallery.items) ? parsed.gallery.items : defaultGallery.items
          }
        : defaultGallery,
      adminCredentials: parsed.adminCredentials || undefined
    };
  } catch (err) {
    console.error("Failed to read database file:", err);
    return {
      enquiries: [],
      settings: defaultSettings,
      navigation: defaultNavigation,
      homepage: defaultHomepage,
      pages: defaultPages,
      faqs: defaultFaqs,
      gallery: defaultGallery
    };
  }
}

function saveLocalDatabase(data: DatabaseSchema): void {
  try {
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write to database file:", err);
  }
}

// Background async sync to MongoDB Atlas
async function syncToMongo(collectionName: "enquiries" | "content", payload: any) {
  try {
    const mongo = await getMongoDb();
    if (!mongo) return;

    if (collectionName === "content") {
      await mongo.collection("content").updateOne(
        { _id: CONTENT_DOC_ID as any },
        { $set: { ...payload, updatedAt: new Date().toISOString() } },
        { upsert: true }
      );
    }
  } catch (err) {
    console.warn("Async MongoDB sync error (continuing with local cache):", err);
  }
}

export const db = {
  // === AUTO-SEED MONGODB ATLAS FROM DB.JSON IF EMPTY ===
  async initMongo(): Promise<boolean> {
    try {
      const mongo = await getMongoDb();
      if (!mongo) return false;

      // Seed Content if not present
      const contentDoc = await mongo.collection("content").findOne({ _id: CONTENT_DOC_ID as any });
      if (!contentDoc) {
        const local = getLocalDatabase();
        await mongo.collection("content").insertOne({
          _id: CONTENT_DOC_ID as any,
          settings: local.settings,
          navigation: local.navigation,
          homepage: local.homepage,
          pages: local.pages,
          faqs: local.faqs,
          gallery: local.gallery || defaultGallery,
          adminCredentials: local.adminCredentials,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        } as any);
        console.log("✓ Successfully seeded MongoDB Atlas 'content' collection from local db.json");
      }

      // Seed Enquiries if not present
      const enquiryCount = await mongo.collection("enquiries").countDocuments();
      if (enquiryCount === 0) {
        const local = getLocalDatabase();
        if (local.enquiries && local.enquiries.length > 0) {
          const formatted = local.enquiries.map((e) => ({ ...e, _id: e.id as any }));
          await mongo.collection("enquiries").insertMany(formatted as any);
          console.log(`✓ Successfully seeded ${formatted.length} leads into MongoDB Atlas 'enquiries' collection`);
        }
      }
      return true;
    } catch (err) {
      console.warn("MongoDB Atlas initialization warning:", err);
      return false;
    }
  },

  // === ENQUIRIES / LEADS (ASYNC + SYNC) ===
  async getEnquiriesAsync(): Promise<Enquiry[]> {
    try {
      const mongo = await getMongoDb();
      if (mongo) {
        const leads = await mongo
          .collection("enquiries")
          .find({})
          .sort({ createdAt: -1 })
          .toArray();

        if (leads.length > 0) {
          return leads.map((l: any) => ({
            id: l.id || String(l._id),
            name: l.name,
            phone: l.phone,
            email: l.email,
            assembly: l.assembly,
            district: l.district,
            services: l.services || [],
            campaignRequirement: l.campaignRequirement,
            preferredTime: l.preferredTime,
            message: l.message,
            status: l.status || "New",
            adminNotes: l.adminNotes,
            createdAt: l.createdAt || new Date().toISOString()
          }));
        }
      }
    } catch (err) {
      console.warn("Failed to fetch enquiries from MongoDB, using local file:", err);
    }
    return this.getEnquiries();
  },

  getEnquiries(): Enquiry[] {
    const data = getLocalDatabase();
    return data.enquiries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  async addEnquiryAsync(enquiry: Omit<Enquiry, "id" | "createdAt" | "status">): Promise<Enquiry> {
    const newEnquiry: Enquiry = {
      ...enquiry,
      id: `enq-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: "New"
    };

    // 1. Save to local cache
    const data = getLocalDatabase();
    data.enquiries.unshift(newEnquiry);
    saveLocalDatabase(data);

    // 2. Persist to MongoDB Atlas
    try {
      const mongo = await getMongoDb();
      if (mongo) {
        await mongo.collection("enquiries").insertOne({
          ...newEnquiry,
          _id: newEnquiry.id as any
        });
      }
    } catch (err) {
      console.error("MongoDB Atlas insert error (saved to local fallback):", err);
    }

    return newEnquiry;
  },

  addEnquiry(enquiry: Omit<Enquiry, "id" | "createdAt" | "status">): Enquiry {
    const newEnquiry: Enquiry = {
      ...enquiry,
      id: `enq-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: "New"
    };
    const data = getLocalDatabase();
    data.enquiries.unshift(newEnquiry);
    saveLocalDatabase(data);

    // Background sync
    (async () => {
      try {
        const mongo = await getMongoDb();
        if (mongo) {
          await mongo.collection("enquiries").insertOne({
            ...newEnquiry,
            _id: newEnquiry.id as any
          });
        }
      } catch (e) {
        console.warn("Async Mongo enquiry save error:", e);
      }
    })();

    return newEnquiry;
  },

  async updateEnquiryStatusAsync(id: string, status: Enquiry["status"]): Promise<Enquiry | null> {
    const data = getLocalDatabase();
    const item = data.enquiries.find((e) => e.id === id);
    if (!item) return null;
    item.status = status;
    saveLocalDatabase(data);

    try {
      const mongo = await getMongoDb();
      if (mongo) {
        await mongo.collection("enquiries").updateOne(
          { $or: [{ id }, { _id: id as any }] },
          { $set: { status } }
        );
      }
    } catch (err) {
      console.warn("MongoDB status update error:", err);
    }

    return item;
  },

  updateEnquiryStatus(id: string, status: Enquiry["status"]): Enquiry | null {
    const data = getLocalDatabase();
    const item = data.enquiries.find((e) => e.id === id);
    if (!item) return null;
    item.status = status;
    saveLocalDatabase(data);

    (async () => {
      try {
        const mongo = await getMongoDb();
        if (mongo) {
          await mongo.collection("enquiries").updateOne(
            { $or: [{ id }, { _id: id as any }] },
            { $set: { status } }
          );
        }
      } catch (e) {
        // ignore
      }
    })();

    return item;
  },

  async updateEnquiryNotesAsync(id: string, adminNotes: string): Promise<Enquiry | null> {
    const data = getLocalDatabase();
    const item = data.enquiries.find((e) => e.id === id);
    if (!item) return null;
    item.adminNotes = adminNotes;
    saveLocalDatabase(data);

    try {
      const mongo = await getMongoDb();
      if (mongo) {
        await mongo.collection("enquiries").updateOne(
          { $or: [{ id }, { _id: id as any }] },
          { $set: { adminNotes } }
        );
      }
    } catch (err) {
      console.warn("MongoDB notes update error:", err);
    }

    return item;
  },

  updateEnquiryNotes(id: string, adminNotes: string): Enquiry | null {
    const data = getLocalDatabase();
    const item = data.enquiries.find((e) => e.id === id);
    if (!item) return null;
    item.adminNotes = adminNotes;
    saveLocalDatabase(data);

    (async () => {
      try {
        const mongo = await getMongoDb();
        if (mongo) {
          await mongo.collection("enquiries").updateOne(
            { $or: [{ id }, { _id: id as any }] },
            { $set: { adminNotes } }
          );
        }
      } catch (e) {
        // ignore
      }
    })();

    return item;
  },

  async deleteEnquiryAsync(id: string): Promise<boolean> {
    const data = getLocalDatabase();
    const initialLen = data.enquiries.length;
    data.enquiries = data.enquiries.filter((e) => e.id !== id);
    if (data.enquiries.length !== initialLen) {
      saveLocalDatabase(data);
      try {
        const mongo = await getMongoDb();
        if (mongo) {
          await mongo.collection("enquiries").deleteOne({ $or: [{ id }, { _id: id as any }] });
        }
      } catch (err) {
        console.warn("MongoDB delete error:", err);
      }
      return true;
    }
    return false;
  },

  deleteEnquiry(id: string): boolean {
    const data = getLocalDatabase();
    const initialLen = data.enquiries.length;
    data.enquiries = data.enquiries.filter((e) => e.id !== id);
    if (data.enquiries.length !== initialLen) {
      saveLocalDatabase(data);
      (async () => {
        try {
          const mongo = await getMongoDb();
          if (mongo) {
            await mongo.collection("enquiries").deleteOne({ $or: [{ id }, { _id: id as any }] });
          }
        } catch (e) {
          // ignore
        }
      })();
      return true;
    }
    return false;
  },

  // === SETTINGS & CHANNELS ===
  async getSettingsAsync(): Promise<SiteSettings> {
    const content = await this.getAllContentAsync();
    return content.settings || defaultSettings;
  },

  getSettings(): SiteSettings {
    const data = getLocalDatabase();
    return data.settings || defaultSettings;
  },

  async updateSettingsAsync(settings: Partial<SiteSettings>): Promise<SiteSettings> {
    const data = getLocalDatabase();
    data.settings = { ...data.settings, ...settings };
    saveLocalDatabase(data);
    await syncToMongo("content", { settings: data.settings });
    return data.settings;
  },

  updateSettings(settings: Partial<SiteSettings>): SiteSettings {
    const data = getLocalDatabase();
    data.settings = { ...data.settings, ...settings };
    saveLocalDatabase(data);
    syncToMongo("content", { settings: data.settings });
    return data.settings;
  },

  // === NAVIGATION ===
  async getNavigationAsync(): Promise<NavigationItem[]> {
    const content = await this.getAllContentAsync();
    return (content.navigation || defaultNavigation).sort((a, b) => a.order - b.order);
  },

  getNavigation(): NavigationItem[] {
    const data = getLocalDatabase();
    return (data.navigation || defaultNavigation).sort((a, b) => a.order - b.order);
  },

  async saveNavigationAsync(items: NavigationItem[]): Promise<NavigationItem[]> {
    const data = getLocalDatabase();
    data.navigation = items;
    saveLocalDatabase(data);
    await syncToMongo("content", { navigation: items });
    return data.navigation;
  },

  saveNavigation(items: NavigationItem[]): NavigationItem[] {
    const data = getLocalDatabase();
    data.navigation = items;
    saveLocalDatabase(data);
    syncToMongo("content", { navigation: items });
    return data.navigation;
  },

  // === HOMEPAGE CONTENT ===
  async getHomepageContentAsync(): Promise<HomepageContent> {
    const content = await this.getAllContentAsync();
    return content.homepage || defaultHomepage;
  },

  getHomepageContent(): HomepageContent {
    const data = getLocalDatabase();
    return data.homepage || defaultHomepage;
  },

  async updateHomepageContentAsync(content: Partial<HomepageContent>): Promise<HomepageContent> {
    const data = getLocalDatabase();
    data.homepage = {
      ...data.homepage,
      ...content,
      studioWarRoom: { ...(data.homepage.studioWarRoom || defaultStudioWarRoom), ...(content.studioWarRoom || {}) },
      hero: { ...data.homepage.hero, ...(content.hero || {}) },
      telemetry: { ...data.homepage.telemetry, ...(content.telemetry || {}) },
      trustStrip: { ...data.homepage.trustStrip, ...(content.trustStrip || {}) },
      aboutTeaser: { ...data.homepage.aboutTeaser, ...(content.aboutTeaser || {}) },
      servicesSection: { ...data.homepage.servicesSection, ...(content.servicesSection || {}) },
      oneAgency: { ...data.homepage.oneAgency, ...(content.oneAgency || {}) },
      process: { ...data.homepage.process, ...(content.process || {}) },
      commandCenter: { ...data.homepage.commandCenter, ...(content.commandCenter || {}) },
      interactiveMap: { ...data.homepage.interactiveMap, ...(content.interactiveMap || {}) },
      whyChooseUs: { ...data.homepage.whyChooseUs, ...(content.whyChooseUs || {}) },
      teamSection: { ...data.homepage.teamSection, ...(content.teamSection || {}) },
      techSection: { ...data.homepage.techSection, ...(content.techSection || {}) },
      solutionShowcase: { ...data.homepage.solutionShowcase, ...(content.solutionShowcase || {}) },
      compliance: { ...data.homepage.compliance, ...(content.compliance || {}) },
      finalCta: { ...data.homepage.finalCta, ...(content.finalCta || {}) }
    };
    saveLocalDatabase(data);
    await syncToMongo("content", { homepage: data.homepage });
    return data.homepage;
  },

  updateHomepageContent(content: Partial<HomepageContent>): HomepageContent {
    const data = getLocalDatabase();
    data.homepage = {
      ...data.homepage,
      ...content,
      studioWarRoom: { ...(data.homepage.studioWarRoom || defaultStudioWarRoom), ...(content.studioWarRoom || {}) },
      hero: { ...data.homepage.hero, ...(content.hero || {}) },
      telemetry: { ...data.homepage.telemetry, ...(content.telemetry || {}) },
      trustStrip: { ...data.homepage.trustStrip, ...(content.trustStrip || {}) },
      aboutTeaser: { ...data.homepage.aboutTeaser, ...(content.aboutTeaser || {}) },
      servicesSection: { ...data.homepage.servicesSection, ...(content.servicesSection || {}) },
      oneAgency: { ...data.homepage.oneAgency, ...(content.oneAgency || {}) },
      process: { ...data.homepage.process, ...(content.process || {}) },
      commandCenter: { ...data.homepage.commandCenter, ...(content.commandCenter || {}) },
      interactiveMap: { ...data.homepage.interactiveMap, ...(content.interactiveMap || {}) },
      whyChooseUs: { ...data.homepage.whyChooseUs, ...(content.whyChooseUs || {}) },
      teamSection: { ...data.homepage.teamSection, ...(content.teamSection || {}) },
      techSection: { ...data.homepage.techSection, ...(content.techSection || {}) },
      solutionShowcase: { ...data.homepage.solutionShowcase, ...(content.solutionShowcase || {}) },
      compliance: { ...data.homepage.compliance, ...(content.compliance || {}) },
      finalCta: { ...data.homepage.finalCta, ...(content.finalCta || {}) }
    };
    saveLocalDatabase(data);
    syncToMongo("content", { homepage: data.homepage });
    return data.homepage;
  },

  // === PAGES CONTENT ===
  async getPagesContentAsync(): Promise<PagesContent> {
    const content = await this.getAllContentAsync();
    return content.pages || defaultPages;
  },

  getPagesContent(): PagesContent {
    const data = getLocalDatabase();
    return data.pages || defaultPages;
  },

  async updatePagesContentAsync(content: Partial<PagesContent>): Promise<PagesContent> {
    const data = getLocalDatabase();
    data.pages = {
      ...data.pages,
      ...content,
      about: { ...data.pages.about, ...(content.about || {}) },
      process: { ...data.pages.process, ...(content.process || {}) },
      technology: { ...data.pages.technology, ...(content.technology || {}) },
      solutions: { ...data.pages.solutions, ...(content.solutions || {}) },
      contact: { ...data.pages.contact, ...(content.contact || {}) },
      servicesPage: { ...data.pages.servicesPage, ...(content.servicesPage || {}) }
    };
    saveLocalDatabase(data);
    await syncToMongo("content", { pages: data.pages });
    return data.pages;
  },

  updatePagesContent(content: Partial<PagesContent>): PagesContent {
    const data = getLocalDatabase();
    data.pages = {
      ...data.pages,
      ...content,
      about: { ...data.pages.about, ...(content.about || {}) },
      process: { ...data.pages.process, ...(content.process || {}) },
      technology: { ...data.pages.technology, ...(content.technology || {}) },
      solutions: { ...data.pages.solutions, ...(content.solutions || {}) },
      contact: { ...data.pages.contact, ...(content.contact || {}) },
      servicesPage: { ...data.pages.servicesPage, ...(content.servicesPage || {}) }
    };
    saveLocalDatabase(data);
    syncToMongo("content", { pages: data.pages });
    return data.pages;
  },

  // === FAQS ===
  async getFaqsAsync(): Promise<FaqItem[]> {
    const content = await this.getAllContentAsync();
    return content.faqs || defaultFaqs;
  },

  getFaqs(): FaqItem[] {
    const data = getLocalDatabase();
    return data.faqs || defaultFaqs;
  },

  async saveFaqAsync(faq: FaqItem): Promise<FaqItem> {
    const data = getLocalDatabase();
    const existingIndex = data.faqs.findIndex((f) => f.id === faq.id);
    if (existingIndex >= 0) {
      data.faqs[existingIndex] = faq;
    } else {
      data.faqs.push(faq);
    }
    saveLocalDatabase(data);
    await syncToMongo("content", { faqs: data.faqs });
    return faq;
  },

  saveFaq(faq: FaqItem): FaqItem {
    const data = getLocalDatabase();
    const existingIndex = data.faqs.findIndex((f) => f.id === faq.id);
    if (existingIndex >= 0) {
      data.faqs[existingIndex] = faq;
    } else {
      data.faqs.push(faq);
    }
    saveLocalDatabase(data);
    syncToMongo("content", { faqs: data.faqs });
    return faq;
  },

  async deleteFaqAsync(id: string): Promise<boolean> {
    const data = getLocalDatabase();
    const initialLen = data.faqs.length;
    data.faqs = data.faqs.filter((f) => f.id !== id);
    if (data.faqs.length !== initialLen) {
      saveLocalDatabase(data);
      await syncToMongo("content", { faqs: data.faqs });
      return true;
    }
    return false;
  },

  deleteFaq(id: string): boolean {
    const data = getLocalDatabase();
    const initialLen = data.faqs.length;
    data.faqs = data.faqs.filter((f) => f.id !== id);
    if (data.faqs.length !== initialLen) {
      saveLocalDatabase(data);
      syncToMongo("content", { faqs: data.faqs });
      return true;
    }
    return false;
  },

  // === GALLERY CONTENT ===
  async getGalleryAsync(): Promise<GalleryContent> {
    const content = await this.getAllContentAsync();
    return content.gallery || defaultGallery;
  },

  getGallery(): GalleryContent {
    const data = getLocalDatabase();
    return data.gallery || defaultGallery;
  },

  async updateGalleryAsync(gallery: Partial<GalleryContent>): Promise<GalleryContent> {
    const data = getLocalDatabase();
    const current = data.gallery || defaultGallery;
    data.gallery = {
      ...current,
      ...gallery,
      items: gallery.items ? gallery.items : current.items
    };
    saveLocalDatabase(data);
    await syncToMongo("content", { gallery: data.gallery });
    return data.gallery;
  },

  updateGallery(gallery: Partial<GalleryContent>): GalleryContent {
    const data = getLocalDatabase();
    const current = data.gallery || defaultGallery;
    data.gallery = {
      ...current,
      ...gallery,
      items: gallery.items ? gallery.items : current.items
    };
    saveLocalDatabase(data);
    syncToMongo("content", { gallery: data.gallery });
    return data.gallery;
  },

  // === COMPLETE DYNAMIC SITE CONTENT BUNDLE ===
  async getAllContentAsync() {
    try {
      const mongo = await getMongoDb();
      if (mongo) {
        const doc: any = await mongo.collection("content").findOne({ _id: CONTENT_DOC_ID as any });
        if (doc) {
          return {
            settings: { ...defaultSettings, ...(doc.settings || {}) },
            navigation: ((doc.navigation || defaultNavigation) as NavigationItem[]).sort((a, b) => a.order - b.order),
            homepage: {
              ...defaultHomepage,
              ...(doc.homepage || {}),
              bannerSlider: { ...defaultHomepage.bannerSlider, ...(doc.homepage?.bannerSlider || {}) },
              studioWarRoom: { ...defaultStudioWarRoom, ...(doc.homepage?.studioWarRoom || {}) },
              trackRecord: { ...defaultHomepage.trackRecord, ...(doc.homepage?.trackRecord || {}) },
              founderMessage: { ...defaultHomepage.founderMessage, ...(doc.homepage?.founderMessage || {}) }
            },
            pages: {
              ...defaultPages,
              ...(doc.pages || {})
            },
            faqs: doc.faqs || defaultFaqs,
            gallery: doc.gallery
              ? {
                  ...defaultGallery,
                  ...doc.gallery,
                  items: Array.isArray(doc.gallery.items) ? doc.gallery.items : defaultGallery.items
                }
              : defaultGallery
          };
        } else {
          // Trigger initial seed
          await this.initMongo();
        }
      }
    } catch (err) {
      console.warn("MongoDB getAllContentAsync warning, falling back to local:", err);
    }

    const data = getLocalDatabase();
    return {
      settings: data.settings,
      navigation: (data.navigation || defaultNavigation).sort((a, b) => a.order - b.order),
      homepage: data.homepage,
      pages: data.pages,
      faqs: data.faqs,
      gallery: data.gallery || defaultGallery
    };
  },

  getAllContent() {
    const data = getLocalDatabase();
    return {
      settings: data.settings,
      navigation: (data.navigation || defaultNavigation).sort((a, b) => a.order - b.order),
      homepage: data.homepage,
      pages: data.pages,
      faqs: data.faqs,
      gallery: data.gallery || defaultGallery
    };
  },

  // === ADMIN CREDENTIALS ===
  async getAdminCredentialsAsync(): Promise<AdminCredentials | null> {
    try {
      const mongo = await getMongoDb();
      if (mongo) {
        const doc: any = await mongo.collection("content").findOne({ _id: CONTENT_DOC_ID as any });
        if (doc && doc.adminCredentials) {
          return doc.adminCredentials;
        }
      }
    } catch (e) {
      // ignore
    }
    const data = getLocalDatabase();
    return data.adminCredentials || null;
  },

  getAdminCredentials(): AdminCredentials | null {
    const data = getLocalDatabase();
    return data.adminCredentials || null;
  },

  async updateAdminCredentialsAsync(email: string, passwordHash: string): Promise<AdminCredentials> {
    const creds: AdminCredentials = {
      email,
      passwordHash,
      updatedAt: new Date().toISOString()
    };
    const data = getLocalDatabase();
    data.adminCredentials = creds;
    saveLocalDatabase(data);
    await syncToMongo("content", { adminCredentials: creds });
    return creds;
  },

  updateAdminCredentials(email: string, passwordHash: string): AdminCredentials {
    const creds: AdminCredentials = {
      email,
      passwordHash,
      updatedAt: new Date().toISOString()
    };
    const data = getLocalDatabase();
    data.adminCredentials = creds;
    saveLocalDatabase(data);
    syncToMongo("content", { adminCredentials: creds });
    return creds;
  }
};
