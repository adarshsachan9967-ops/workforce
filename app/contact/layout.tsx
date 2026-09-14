import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact War Room | Election Management Company in Lucknow & Kanpur | Workforce Infotech",
  description: "Connect with Workforce Infotech Pvt. Ltd. — Election Management Company in Uttar Pradesh with offices in Lucknow (Summit Building, Gomti Nagar) & Kanpur (Sharda Nagar). Consult with senior political strategists for UP Elections 2027.",
  keywords: [
    "Election Management Company in Lucknow",
    "Election Campaign Management Company in Lucknow",
    "Political Consulting Company in Lucknow",
    "Political Campaign Management in Lucknow",
    "Election Consultant in Lucknow",
    "Election Survey Company in Lucknow",
    "Election Management Company in Kanpur",
    "Election Campaign Management Company in Kanpur",
    "Political Consulting Company in Kanpur",
    "Political Campaign Management in Kanpur",
    "Election Consultant in Kanpur",
    "Election Survey Company in Kanpur",
    "Election Management Company in Uttar Pradesh",
    "Election Consultant in India",
    "Hire Election Management Company"
  ],
  alternates: {
    canonical: "/contact"
  }
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
