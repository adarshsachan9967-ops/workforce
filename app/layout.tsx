import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Noto_Sans_Devanagari } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { ContentProvider } from "@/context/ContentContext";
import SiteShell from "@/components/layout/SiteShell";
import { allSiteKeywords } from "@/data/seoKeywords";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const notoHindi = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-noto-hindi",
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#071A33"
};

export const metadata: Metadata = {
  metadataBase: new URL("https://workforceinfotech.com"),
  title: {
    default: "Election Management Company | Workforce Infotech Pvt. Ltd. | Political Campaign & Strategy UP 2027",
    template: "%s | Workforce Infotech Pvt. Ltd."
  },
  description: "Workforce Infotech Pvt. Ltd. is India's premier Election Management Company & Political Consulting firm in Uttar Pradesh (Lucknow & Kanpur). Specializing in Election Strategy, Voter Data Management, War Room Operations, Booth Management, Ground Surveys, and Political Digital Marketing for UP Elections 2027.",
  keywords: allSiteKeywords,
  authors: [{ name: "Workforce Infotech Private Limited", url: "https://workforceinfotech.com" }],
  creator: "Workforce Infotech Private Limited",
  publisher: "Workforce Infotech Private Limited",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "hi_IN",
    alternateLocale: ["en_US"],
    url: "https://workforceinfotech.com",
    title: "Election Management Company | Workforce Infotech Pvt. Ltd. | Political Consulting",
    description: "Best Election Campaign Management Company in Uttar Pradesh (Lucknow & Kanpur). Voter Data, War Room, Booth Level Management & Digital Political Campaigns.",
    siteName: "Workforce Infotech Pvt. Ltd.",
    images: [
      {
        url: "/images/banners/banner-2.jpeg",
        width: 1600,
        height: 592,
        alt: "Workforce Infotech - Election Management Company UP 2027"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Election Management Company | Workforce Infotech Pvt. Ltd.",
    description: "Premier Election Campaign Management & Political Strategy Company in Uttar Pradesh, India.",
    images: ["/images/banners/banner-2.jpeg"],
    creator: "@workforceinfo"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg"
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://workforceinfotech.com/#organization",
      "name": "Workforce Infotech Pvt. Ltd.",
      "alternateName": [
        "Workforce Infotech",
        "Workforce Infotech Election Management Company",
        "Workforce Infotech Political Consulting"
      ],
      "url": "https://workforceinfotech.com",
      "logo": "https://workforceinfotech.com/logo.png",
      "sameAs": [
        "https://www.facebook.com/workforceInfotechpvtltd",
        "https://twitter.com/workforceinfo",
        "https://instagram.com/workforceinfotech",
        "https://linkedin.com/company/workforceinfotech",
        "https://www.youtube.com/@workforceinfotechipr1081"
      ],
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+91-9621762121",
          "contactType": "customer service",
          "areaServed": "IN",
          "availableLanguage": ["Hindi", "English"]
        }
      ]
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://workforceinfotech.com/#service",
      "name": "Workforce Infotech - Election Management & Political Consulting",
      "image": "https://workforceinfotech.com/images/banners/banner-2.jpeg",
      "telephone": "+91-9621762121",
      "priceRange": "$$",
      "address": [
        {
          "@type": "PostalAddress",
          "streetAddress": "11th Floor, Summit Building, Gomti Nagar",
          "addressLocality": "Lucknow",
          "addressRegion": "Uttar Pradesh",
          "postalCode": "226010",
          "addressCountry": "IN"
        },
        {
          "@type": "PostalAddress",
          "streetAddress": "117/Q/710, Sharda Nagar, Kakadeo",
          "addressLocality": "Kanpur",
          "addressRegion": "Uttar Pradesh",
          "postalCode": "208025",
          "addressCountry": "IN"
        }
      ],
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "26.8530",
        "longitude": "80.9984"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
        ],
        "opens": "00:00",
        "closes": "23:59"
      }
    }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hi" className={`${jakarta.variable} ${notoHindi.variable} dark scroll-smooth`} suppressHydrationWarning>
      <head>
        {/* Google tag (gtag.js) for GA4 & Google Tracking */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9DQBS54NTL"
          strategy="afterInteractive"
        />
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-9DQBS54NTL', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        {/* JSON-LD Structured Data Schema for Google Search Console */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-navy-900 text-off-white selection:bg-accent-orange selection:text-white font-sans antialiased transition-colors duration-300">
        <ThemeProvider>
          <ContentProvider>
            <LanguageProvider>
              <SiteShell>
                {children}
              </SiteShell>
            </LanguageProvider>
          </ContentProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
