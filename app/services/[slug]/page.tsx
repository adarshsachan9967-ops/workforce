import React from "react";
import { notFound } from "next/navigation";
import { servicesData } from "@/data/servicesData";
import ServiceDetailLayout from "@/components/shared/ServiceDetailLayout";
import { Metadata } from "next";

export const SLUG_ALIASES: Record<string, string> = {
  "war-room": "election-war-room",
  "voter-data": "election-data-research",
  "survey": "election-data-research",
  "cadre-booth": "booth-ground-management",
  "digital-media": "social-media-management",
  "ground-campaign": "booth-ground-management",
  "telecalling": "voter-communication",
  "it-solutions": "election-technology",
  "pr-media": "media-public-relations",
  "branding": "candidate-branding",
  "outdoor": "outdoor-campaign",
  "rallies": "event-campaign-management"
};

export async function generateStaticParams() {
  const directSlugs = servicesData.map((s) => ({ slug: s.slug }));
  const aliasSlugs = Object.keys(SLUG_ALIASES).map((slug) => ({ slug }));
  return [...directSlugs, ...aliasSlugs];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const canonicalSlug = SLUG_ALIASES[slug] || slug;
  const service = servicesData.find((s) => s.slug === canonicalSlug);

  if (!service) {
    return {
      title: "Service Not Found | Workforce Infotech",
    };
  }

  // Vertical-specific keyword mapping for maximum Google SEO relevance
  const slugKeywordMap: Record<string, string[]> = {
    "social-media-management": [
      "Political Social Media Management",
      "Election Social Media Management",
      "Political Digital Marketing",
      "Political Social Media Campaign",
      "Political Video Production",
      "Political Advertising Agency"
    ],
    "election-data-research": [
      "Election Data Management",
      "Voter Data Management",
      "Political Data Analytics",
      "Voter Survey Company",
      "Constituency Data Analytics"
    ],
    "booth-ground-management": [
      "Booth Management",
      "Booth Level Management",
      "Booth Management Services",
      "Election Ground Campaign Management",
      "Door to Door Campaign Management",
      "Voter Contact Program"
    ],
    "election-war-room": [
      "Election War Room Management",
      "Election Campaign Management Company",
      "Political War Room Operations",
      "Election Strategy Company",
      "Election War Room Lucknow"
    ],
    "candidate-branding": [
      "Candidate Branding",
      "Political Branding",
      "Political Campaign Consultant",
      "Political Image Management",
      "Leader Branding Uttar Pradesh"
    ],
    "political-strategy": [
      "Political Campaign Strategy",
      "Election Campaign Strategy",
      "Political Consulting Company",
      "Election Strategy Consultant",
      "Election Consultant in India"
    ],
    "voter-survey-opinion-polls": [
      "Election Survey Company",
      "Voter Survey Company",
      "Political Survey Services",
      "Election Ground Survey",
      "Constituency Survey",
      "Candidate Survey"
    ],
    "media-studio-video-production": [
      "Political Video Production",
      "Election Video Production",
      "Political Content Creation",
      "Election Advertising Services"
    ],
    "call-center-telecalling": [
      "Election Call Center",
      "Political Call Center",
      "Election Telecalling Services",
      "Voter Calling Services",
      "Voter Outreach Campaign"
    ],
    "it-solutions-digital-tools": [
      "Political Website Development",
      "Election Website Development",
      "Political Campaign Technology",
      "Election IT Solutions"
    ],
    "volunteer-training": [
      "Election Volunteer Management",
      "Political Volunteer Management",
      "Booth Level Campaign Management",
      "Cadre Training Political Campaign"
    ]
  };

  const targetedKeywords = slugKeywordMap[slug] || [
    "Election Campaign Management",
    "Political Campaign Management Company",
    "Election Management Services"
  ];

  return {
    title: `${service.titleEn} | ${service.titleHi} | Workforce Infotech Election Management`,
    description: `${service.shortDescEn} — ${service.shortDescHi}`,
    keywords: [
      service.titleEn,
      service.titleHi,
      ...targetedKeywords,
      "Workforce Infotech Pvt Ltd",
      "Election Management Company in Uttar Pradesh",
      "UP Election 2027"
    ],
    alternates: {
      canonical: `/services/${slug}`
    }
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const canonicalSlug = SLUG_ALIASES[slug] || slug;
  const service = servicesData.find((s) => s.slug === canonicalSlug);

  if (!service) {
    notFound();
  }

  return <ServiceDetailLayout service={service} />;
}
