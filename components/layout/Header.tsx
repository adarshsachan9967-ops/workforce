"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useContent } from "@/context/ContentContext";
import { servicesData } from "@/data/servicesData";
import EnquiryModal from "@/components/shared/EnquiryModal";
import ThemeToggle from "@/components/layout/ThemeToggle";
import {
  ChevronDown,
  Menu,
  X,
  Phone,
  MessageSquare,
  Shield,
  Layers,
  Globe,
  Share2,
  Database,
  Users,
  PhoneCall,
  Cpu,
  Video,
  Newspaper,
  Truck,
  Calendar,
  Award,
  ShieldAlert
} from "lucide-react";

// Icon mapping helper
const iconMap: Record<string, React.ReactNode> = {
  Share2: <Share2 className="w-4 h-4 text-accent-orange" />,
  Database: <Database className="w-4 h-4 text-accent-gold" />,
  Users: <Users className="w-4 h-4 text-blue-400" />,
  PhoneCall: <PhoneCall className="w-4 h-4 text-emerald-400" />,
  Cpu: <Cpu className="w-4 h-4 text-purple-400" />,
  Video: <Video className="w-4 h-4 text-rose-400" />,
  Newspaper: <Newspaper className="w-4 h-4 text-amber-400" />,
  Truck: <Truck className="w-4 h-4 text-sky-400" />,
  Calendar: <Calendar className="w-4 h-4 text-indigo-400" />,
  Award: <Award className="w-4 h-4 text-accent-gold" />,
  ShieldAlert: <ShieldAlert className="w-4 h-4 text-red-400" />
};

export default function Header() {
  const { t, language, toggleLanguage } = useLanguage();
  const { settings, navigation } = useContent();
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on page change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    { href: "/process", label: t.nav.process },
    { href: "/gallery", label: t.nav.gallery },
    { href: "/technology", label: t.nav.technology },
    { href: "/solutions", label: t.nav.solutions },
    { href: "/faq", label: t.nav.faq },
    { href: "/contact", label: t.nav.contact }
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-navy-950/95 backdrop-blur-md border-b border-navy-700/80 shadow-xl shadow-navy-950/50 py-3"
            : "bg-navy-900/90 backdrop-blur-sm border-b border-navy-700/40 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Official Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-11 sm:h-12 w-36 sm:w-44 bg-white rounded-xl p-1 shadow-md border border-slate-200/80 flex items-center justify-center overflow-hidden transition-all group-hover:shadow-lg flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Workforce Infotech Pvt. Ltd."
                fill
                priority
                unoptimized
                className="object-contain p-0.5"
              />
            </div>
            <div className="hidden lg:flex flex-col">
              <span className="text-xs font-bold text-accent-gold uppercase tracking-wider">
                {language === "hi" ? "उत्तर प्रदेश चुनाव 2027" : "UP Elections 2027"}
              </span>
              <span className="text-[10px] text-slate-400 font-mono tracking-wider">
                {language === "hi" ? "चुनाव प्रबंधन संस्थान" : "Election Management"}
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-slate-200">
            <Link
              href="/"
              className={`hover:text-accent-gold transition-colors ${
                pathname === "/" ? "text-accent-orange font-semibold" : ""
              }`}
            >
              {t.nav.home}
            </Link>

            <Link
              href="/about"
              className={`hover:text-accent-gold transition-colors ${
                pathname === "/about" ? "text-accent-orange font-semibold" : ""
              }`}
            >
              {t.nav.about}
            </Link>

            {/* Services Mega Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                className={`flex items-center gap-1.5 hover:text-accent-gold transition-colors py-2 ${
                  pathname.startsWith("/services") ? "text-accent-orange font-semibold" : ""
                }`}
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
              >
                <span>{t.nav.services}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {servicesDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[720px] bg-gradient-to-b from-navy-900 to-navy-950 border border-navy-700/80 rounded-2xl shadow-2xl p-6 grid grid-cols-2 gap-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="col-span-2 pb-2 border-b border-navy-700/60 flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-accent-orange">
                      {language === "hi" ? "संपूर्ण 11 चुनावी सेवाएं" : "All 11 Electoral Verticals"}
                    </span>
                    <Link
                      href="/services"
                      className="text-xs text-accent-gold hover:underline font-medium"
                      onClick={() => setServicesDropdownOpen(false)}
                    >
                      {t.nav.allServices} →
                    </Link>
                  </div>

                  {servicesData.map((s) => (
                    <Link
                      key={s.id}
                      href={`/services/${s.slug}`}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-navy-800/80 border border-transparent hover:border-navy-700/80 transition-all group/item"
                      onClick={() => setServicesDropdownOpen(false)}
                    >
                      <div className="p-2 rounded-lg bg-navy-950 border border-navy-700/60 group-hover/item:border-accent-orange/40 flex-shrink-0">
                        {iconMap[s.icon] || <Layers className="w-4 h-4 text-accent-orange" />}
                      </div>
                      <div className="overflow-hidden">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-accent-gold font-semibold">{s.id}</span>
                          <span className="text-xs font-semibold text-white group-hover/item:text-accent-gold transition-colors truncate">
                            {language === "hi" ? s.titleHi : s.titleEn}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                          {language === "hi" ? s.tagHi : s.tagEn}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/process"
              className={`hover:text-accent-gold transition-colors ${
                pathname === "/process" ? "text-accent-orange font-semibold" : ""
              }`}
            >
              {t.nav.process}
            </Link>

            <Link
              href="/gallery"
              className={`hover:text-accent-gold transition-colors ${
                pathname === "/gallery" ? "text-accent-orange font-semibold" : ""
              }`}
            >
              {t.nav.gallery}
            </Link>

            <Link
              href="/technology"
              className={`hover:text-accent-gold transition-colors ${
                pathname === "/technology" ? "text-accent-orange font-semibold" : ""
              }`}
            >
              {t.nav.technology}
            </Link>

            <Link
              href="/solutions"
              className={`hover:text-accent-gold transition-colors ${
                pathname === "/solutions" ? "text-accent-orange font-semibold" : ""
              }`}
            >
              {t.nav.solutions}
            </Link>

            <Link
              href="/faq"
              className={`hover:text-accent-gold transition-colors ${
                pathname === "/faq" ? "text-accent-orange font-semibold" : ""
              }`}
            >
              {t.nav.faq}
            </Link>

            <Link
              href="/contact"
              className={`hover:text-accent-gold transition-colors ${
                pathname === "/contact" ? "text-accent-orange font-semibold" : ""
              }`}
            >
              {t.nav.contact}
            </Link>
          </nav>

          {/* Right Action Group */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle (Light / Dark mode) */}
            <ThemeToggle />

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-800/80 hover:bg-navy-750 border border-navy-700/80 text-xs font-semibold text-slate-200 hover:text-white transition-colors"
              title="Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-accent-gold" />
              <span>{language === "hi" ? "EN" : "हिन्दी"}</span>
            </button>

            {/* CTA Discuss Campaign */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-accent-orange to-accent-orange-hover hover:brightness-110 text-white font-semibold text-xs tracking-wide shadow-lg shadow-accent-orange/20 transition-all cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{language === "hi" ? settings.headerCtaHi : settings.headerCtaEn}</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg bg-navy-800/80 text-slate-300 hover:text-white border border-navy-700"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-navy-950/98 border-b border-navy-800 max-h-[85vh] overflow-y-auto px-4 py-6 space-y-4 animate-in slide-in-from-top-4 duration-300">
            <div className="space-y-1">
              <Link
                href="/"
                className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-navy-900"
              >
                {t.nav.home}
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-navy-900"
              >
                {t.nav.about}
              </Link>

              {/* Mobile Services Accordion */}
              <div>
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-navy-900"
                >
                  <span>{t.nav.services} (11)</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
                </button>
                {mobileServicesOpen && (
                  <div className="pl-4 pr-2 py-2 space-y-2 bg-navy-900/60 rounded-xl my-1 border border-navy-800">
                    <Link
                      href="/services"
                      className="block text-xs font-semibold text-accent-gold py-1"
                    >
                      {t.nav.allServices} →
                    </Link>
                    {servicesData.map((s) => (
                      <Link
                        key={s.id}
                        href={`/services/${s.slug}`}
                        className="flex items-center gap-2 text-xs text-slate-300 hover:text-white py-1.5"
                      >
                        <span className="text-[10px] font-mono text-accent-orange">{s.id}.</span>
                        <span className="truncate">{language === "hi" ? s.titleHi : s.titleEn}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/process"
                className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-navy-900"
              >
                {t.nav.process}
              </Link>
              <Link
                href="/gallery"
                className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-navy-900"
              >
                {t.nav.gallery}
              </Link>
              <Link
                href="/technology"
                className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-navy-900"
              >
                {t.nav.technology}
              </Link>
              <Link
                href="/solutions"
                className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-navy-900"
              >
                {t.nav.solutions}
              </Link>
              <Link
                href="/faq"
                className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-navy-900"
              >
                {t.nav.faq}
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-navy-900"
              >
                {t.nav.contact}
              </Link>
            </div>

            <div className="pt-4 border-t border-navy-800 flex flex-col gap-3">
              <div className="flex items-center justify-between px-3 py-2 bg-navy-900/70 rounded-xl border border-navy-800">
                <span className="text-xs font-semibold text-slate-300">
                  {language === "hi" ? "थीम (Light / Dark मोड):" : "Theme Mode:"}
                </span>
                <ThemeToggle showLabel />
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsModalOpen(true);
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-accent-orange to-accent-orange-hover text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{language === "hi" ? settings.headerCtaHi : settings.headerCtaEn}</span>
              </button>

              <div className="flex items-center justify-center gap-4 text-xs text-slate-400">
                <a href={`tel:${settings.phone1}`} className="flex items-center gap-1 hover:text-white">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{settings.phone1}</span>
                </a>
                <span>|</span>
                <a href={`tel:${settings.phone2}`} className="flex items-center gap-1 hover:text-white">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{settings.phone2}</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
