import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Workforce Infotech Pvt. Ltd. | Political Consulting & Election Management",
  description: "Workforce Infotech Pvt. Ltd. is India's leading Election Management Company & Political Consulting firm based in Lucknow & Kanpur, Uttar Pradesh. Discover our vision, leadership, 1000+ campaign professionals, and track record.",
  keywords: [
    "Workforce Infotech Pvt Ltd",
    "Workforce Infotech",
    "Workforce Infotech Election Management",
    "Workforce Infotech Election Management Company",
    "Workforce Infotech Political Consulting",
    "Workforce Infotech Election Campaign",
    "Workforce Infotech Political Campaign Management",
    "Workforce Infotech Election Consultant",
    "Workforce Infotech Kanpur",
    "Workforce Infotech Lucknow",
    "Political Consulting Company in Uttar Pradesh",
    "Election Consultant in Uttar Pradesh",
    "Election Management Company in India"
  ],
  alternates: {
    canonical: "/about"
  }
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
