import React from "react";
import Hero from "@/components/home/Hero";
import BannerSlider from "@/components/home/BannerSlider";
import TrustStrip from "@/components/home/TrustStrip";
import TrackRecordVictories from "@/components/home/TrackRecordVictories";
import AboutTeaser from "@/components/home/AboutTeaser";
import FounderMessageSection from "@/components/home/FounderMessageSection";
import ServicesGrid from "@/components/home/ServicesGrid";
import OneAgencyPillars from "@/components/home/OneAgencyPillars";
import ProcessTimeline from "@/components/home/ProcessTimeline";
import CommandCenterPreview from "@/components/home/CommandCenterPreview";
import StudioWarRoomShowcase from "@/components/home/StudioWarRoomShowcase";
import InteractiveUpMap from "@/components/home/InteractiveUpMap";
import TechStackShowcase from "@/components/home/TechStackShowcase";
import TeamSection from "@/components/home/TeamSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import SolutionShowcase from "@/components/home/SolutionShowcase";
import GalleryTeaser from "@/components/home/GalleryTeaser";
import ComplianceSection from "@/components/home/ComplianceSection";
import FaqPreview from "@/components/home/FaqPreview";
import FinalCta from "@/components/home/FinalCta";

export const metadata = {
  title: "उत्तर प्रदेश चुनाव प्रबंधन 2027 | Workforce Infotech Pvt. Ltd.",
  description: "उत्तर प्रदेश विधानसभा चुनाव 2027 के लिए चुनाव प्रबंधन, डेटा एवं रिसर्च, डिजिटल मीडिया, बूथ प्रबंधन, कॉल सेंटर, तकनीकी समाधान, मीडिया, क्रिएटिव और वार रूम सेवाएं।",
  keywords: "Election Campaign Management Uttar Pradesh, Political Campaign Management UP 2027, Election Data Research, Booth Management, Political Digital Marketing, Election War Room, Candidate Branding, Political Campaign Technology",
};

export default function HomePage() {
  return (
    <main className="flex-1 flex flex-col w-full overflow-hidden">
      {/* 1. Top Interactive Banners Carousel (3 High-Impact Visual Banners) */}
      <BannerSlider />

      {/* 2. Hero Section & Campaign Intelligence Dashboard */}
      <Hero />

      {/* 3. Trust & Operational Stat Strip */}
      <TrustStrip />

      {/* 4. Proven Track Record & Winning Candidates Showcase (PDF Content) */}
      <TrackRecordVictories />

      {/* 5. Founder & CEO Message (Anuj Tiwari - Vision & Commitment) */}
      <FounderMessageSection />

      {/* 6. About Workforce Infotech */}
      <AboutTeaser />

      {/* 7. 11 Integrated Services Grid */}
      <ServicesGrid />

      {/* 8. One Agency — Complete Campaign Infrastructure */}
      <OneAgencyPillars />

      {/* 9. Campaign Methodology: Data -> Strategy -> Ground -> Victory */}
      <ProcessTimeline />

      {/* 10. In-House Media Studio & 24/7 Central War Room Facilities */}
      <StudioWarRoomShowcase />

      {/* 11. Campaign Command Center Split-Screen */}
      <CommandCenterPreview />

      {/* 12. Interactive Uttar Pradesh Strategic Map */}
      <InteractiveUpMap />

      {/* 13. Technology Powered Campaign Stack */}
      <TechStackShowcase />

      {/* 14. 1000+ Professional Workforce Pool */}
      <TeamSection />

      {/* 15. Why Workforce Infotech */}
      <WhyChooseUs />

      {/* 16. Solution Showcases & Case Studies */}
      <SolutionShowcase />

      {/* 17. Authentic Ground & War Room Photo Gallery Showcase */}
      <GalleryTeaser />

      {/* 18. Responsible & Rule-Compliant Campaigning (ECI / TRAI / DPDP) */}
      <ComplianceSection />

      {/* 19. FAQ Preview */}
      <FaqPreview />

      {/* 20. Final High-Impact CTA */}
      <FinalCta />
    </main>
  );
}
