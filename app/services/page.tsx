import React from "react";
import Link from "next/link";
import { servicesData } from "@/data/servicesData";
import ServicesGrid from "@/components/home/ServicesGrid";
import FinalCta from "@/components/home/FinalCta";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Election Management Services | Political Campaign Consulting | Workforce Infotech",
  description: "Explore Workforce Infotech's 360° Election Management Services in India & Uttar Pradesh: Voter Data Management, War Room Operations, Booth Management, Ground Surveys, Political Digital Marketing, and Candidate Branding for UP Elections 2027.",
  keywords: [
    "Election Management Services",
    "Election Campaign Management",
    "Political Campaign Management",
    "Election War Room Management",
    "Election Data Management",
    "Voter Data Management",
    "Booth Management",
    "Booth Level Management",
    "Constituency Management",
    "Election Survey Company",
    "Political Consulting Services India",
    "Election Campaign Consultant India",
    "Election Campaign Management Services"
  ],
  alternates: {
    canonical: "/services"
  }
};

export default function ServicesIndexPage() {
  return (
    <main className="flex-1 bg-navy-900">
      <div className="pt-12 pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mb-4">
          <Link href="/" className="hover:text-accent-gold">HOME</Link>
          <span>/</span>
          <span className="text-accent-orange font-bold">SERVICES DIRECTORY</span>
        </div>
      </div>

      <ServicesGrid />

      <FinalCta />
    </main>
  );
}
