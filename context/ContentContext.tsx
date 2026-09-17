"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  SiteSettings,
  NavigationItem,
  HomepageContent,
  PagesContent,
  FaqItem,
  GalleryContent,
  defaultSettings,
  defaultNavigation,
  defaultHomepage,
  defaultPages,
  defaultFaqs,
  defaultGallery
} from "@/lib/content-schema";

interface ContentContextType {
  settings: SiteSettings;
  navigation: NavigationItem[];
  homepage: HomepageContent;
  pages: PagesContent;
  faqs: FaqItem[];
  gallery: GalleryContent;
  refreshContent: () => Promise<void>;
  loading: boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [navigation, setNavigation] = useState<NavigationItem[]>(defaultNavigation);
  const [homepage, setHomepage] = useState<HomepageContent>(defaultHomepage);
  const [pages, setPages] = useState<PagesContent>(defaultPages);
  const [faqs, setFaqs] = useState<FaqItem[]>(defaultFaqs);
  const [gallery, setGallery] = useState<GalleryContent>(defaultGallery);
  const [loading, setLoading] = useState(true);

  const fetchContent = useCallback(async () => {
    try {
      const res = await fetch("/api/content", { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          if (json.data.settings) setSettings(json.data.settings);
          if (json.data.navigation) setNavigation(json.data.navigation);
          if (json.data.homepage) setHomepage(json.data.homepage);
          if (json.data.pages) setPages(json.data.pages);
          if (json.data.faqs) setFaqs(json.data.faqs);
          if (json.data.gallery) setGallery(json.data.gallery);
        }
      }
    } catch (err) {
      console.warn("Could not fetch dynamic content, using defaults:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  return (
    <ContentContext.Provider
      value={{
        settings,
        navigation,
        homepage,
        pages,
        faqs,
        gallery,
        refreshContent: fetchContent,
        loading
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) {
    // Fallback if rendered outside provider
    return {
      settings: defaultSettings,
      navigation: defaultNavigation,
      homepage: defaultHomepage,
      pages: defaultPages,
      faqs: defaultFaqs,
      gallery: defaultGallery,
      refreshContent: async () => {},
      loading: false
    };
  }
  return context;
}
