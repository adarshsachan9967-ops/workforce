"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Enquiry,
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
  defaultGallery,
  defaultHiring
} from "@/lib/content-schema";
import {
  Briefcase,
  Shield,
  Users,
  CheckCircle2,
  Clock,
  Trash2,
  LogOut,
  RefreshCw,
  Search,
  Filter,
  Phone,
  Mail,
  MapPin,
  Settings,
  Layers,
  HelpCircle,
  TrendingUp,
  FileSpreadsheet,
  AlertCircle,
  Save,
  Plus,
  ExternalLink,
  MessageCircle,
  Eye,
  Key,
  Globe,
  Radio,
  Sliders,
  FileText,
  Building,
  Share2,
  Layout,
  Tag,
  Check,
  X,
  Image as ImageIcon,
  Upload,
  Camera,
  Trophy
} from "lucide-react";
import HomepageCms from "@/components/admin/HomepageCms";
import PagesCms from "@/components/admin/PagesCms";
import GalleryCms from "@/components/admin/GalleryCms";
import TrackRecordCms from "@/components/admin/TrackRecordCms";
import HiringCms from "@/components/admin/HiringCms";
import MediaManagerCms from "@/components/admin/MediaManagerCms";
import GoogleAnalyticsCms from "@/components/admin/GoogleAnalyticsCms";

export default function AdminDashboardPage() {
  const router = useRouter();

  // Authentication & Session
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [adminEmail, setAdminEmail] = useState<string>("admin@workforceinfotech.com");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState<
    "leads" | "header" | "contact" | "home" | "victories" | "hiring" | "pages" | "gallery" | "faqs" | "footer" | "media" | "security" | "analytics"
  >("leads");

  // Core Data Stores
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [navigation, setNavigation] = useState<NavigationItem[]>(defaultNavigation);
  const [homepage, setHomepage] = useState<HomepageContent>(defaultHomepage);
  const [pages, setPages] = useState<PagesContent>(defaultPages);
  const [faqs, setFaqs] = useState<FaqItem[]>(defaultFaqs);
  const [gallery, setGallery] = useState<GalleryContent>(defaultGallery);

  // Sub-tabs for granular section editing
  const [homeSubTab, setHomeSubTab] = useState<string>("hero");
  const [pagesSubTab, setPagesSubTab] = useState<string>("about");

  // Leads CRM UI State
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedLead, setSelectedLead] = useState<Enquiry | null>(null);
  const [adminNoteInput, setAdminNoteInput] = useState("");
  const [updatingLeadId, setUpdatingLeadId] = useState<string | null>(null);

  // Password / Security Form
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newEmail: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [passwordStatus, setPasswordStatus] = useState<{ success?: string; error?: string }>({});

  // FAQ Modal / Form
  const [faqModalOpen, setFaqModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);

  // Check auth session
  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => {
        if (!res.ok) {
          router.push("/admin/login");
        } else {
          res.json().then((d) => {
            setAuthenticated(true);
            if (d.user) setAdminEmail(d.user);
            loadData();
          });
        }
      })
      .catch(() => {
        router.push("/admin/login");
      });
  }, [router]);

  const showNotification = (msg: string) => {
    setSaveSuccess(msg);
    setTimeout(() => setSaveSuccess(null), 3500);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [enqRes, contentRes] = await Promise.all([
        fetch("/api/enquiries", { cache: "no-store" }),
        fetch("/api/admin/content", { cache: "no-store" })
      ]);

      if (enqRes.ok) {
        const enqData = await enqRes.json();
        setEnquiries(enqData.data || []);
      }

      if (contentRes.ok) {
        const cData = await contentRes.json();
        if (cData.data) {
          if (cData.data.settings) setSettings(cData.data.settings);
          if (cData.data.navigation) setNavigation(cData.data.navigation);
          if (cData.data.homepage) setHomepage(cData.data.homepage);
          if (cData.data.pages) setPages(cData.data.pages);
          if (cData.data.faqs) setFaqs(cData.data.faqs);
          if (cData.data.gallery) setGallery(cData.data.gallery);
        }
      }
    } catch (err) {
      console.error("Failed to load admin data:", err);
      setErrorMessage("डेटा लोड करने में त्रुटि हुई।");
    } finally {
      setLoading(false);
    }
  };

  // Lead Status & Notes
  const handleStatusChange = async (id: string, newStatus: Enquiry["status"]) => {
    setUpdatingLeadId(id);
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
        );
        if (selectedLead && selectedLead.id === id) {
          setSelectedLead({ ...selectedLead, status: newStatus });
        }
        showNotification("लीड स्टेटस सफलतापूर्वक अपडेट किया गया।");
      }
    } catch (err) {
      console.error("Status update error:", err);
    } finally {
      setUpdatingLeadId(null);
    }
  };

  const handleSaveLeadNote = async (id: string) => {
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminNotes: adminNoteInput })
      });

      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, adminNotes: adminNoteInput } : e))
        );
        if (selectedLead) {
          setSelectedLead({ ...selectedLead, adminNotes: adminNoteInput });
        }
        showNotification("प्रशासनिक टिप्पणी सुरक्षित की गई।");
      }
    } catch (err) {
      console.error("Note save error:", err);
    }
  };

  const handleDeleteEnquiry = async (id: string) => {
    if (!confirm("क्या आप वाकई इस लीड को हटाना चाहते हैं? यह क्रिया अपरिवर्तनीय है।")) {
      return;
    }

    try {
      const res = await fetch(`/api/enquiries/${id}`, { method: "DELETE" });
      if (res.ok) {
        setEnquiries((prev) => prev.filter((e) => e.id !== id));
        if (selectedLead?.id === id) setSelectedLead(null);
        showNotification("लीड सफलतापूर्वक हटा दी गई।");
      }
    } catch (err) {
      console.error("Delete enquiry error:", err);
    }
  };

  // Content Updaters
  const saveSection = async (sectionName: string, dataToSave: any) => {
    setSaving(true);
    setErrorMessage(null);
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: sectionName, data: dataToSave })
      });

      if (!res.ok) {
        throw new Error("सुरक्षित करने में त्रुटि हुई।");
      }

      showNotification("परिवर्तन सफलतापूर्वक सहेजे गए और लाइव वेबसाइट पर अपडेट हो गए हैं!");
    } catch (err: any) {
      setErrorMessage(err.message || "त्रुटि हुई।");
    } finally {
      setSaving(false);
    }
  };

  // Password & Security
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordStatus({});

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordStatus({ error: "नया पासवर्ड और पुष्टि पासवर्ड मेल नहीं खाते।" });
      return;
    }

    try {
      const res = await fetch("/api/admin/credentials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newEmail: passwordForm.newEmail || adminEmail,
          newPassword: passwordForm.newPassword
        })
      });

      const data = await res.json();
      if (!res.ok) {
        setPasswordStatus({ error: data.error || "पासवर्ड बदलने में त्रुटि हुई।" });
      } else {
        setPasswordStatus({ success: "पासवर्ड व क्रेडेंशियल्स सफलतापूर्वक अपडेट किए गए।" });
        if (data.user) setAdminEmail(data.user);
        setPasswordForm({
          currentPassword: "",
          newEmail: "",
          newPassword: "",
          confirmPassword: ""
        });
      }
    } catch {
      setPasswordStatus({ error: "सर्वर से संपर्क करने में विफल।" });
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  // Filtered Leads
  const filteredEnquiries = enquiries.filter((e) => {
    const matchesStatus = statusFilter === "all" || e.status === statusFilter;
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !query ||
      e.name.toLowerCase().includes(query) ||
      e.phone.toLowerCase().includes(query) ||
      e.assembly.toLowerCase().includes(query) ||
      e.district.toLowerCase().includes(query) ||
      (e.state && e.state.toLowerCase().includes(query)) ||
      e.services.some((s) => s.toLowerCase().includes(query));

    return matchesStatus && matchesQuery;
  });

  // KPIs
  const stats = {
    total: enquiries.length,
    new: enquiries.filter((e) => e.status === "New").length,
    contacted: enquiries.filter((e) => e.status === "Contacted").length,
    inDiscussion: enquiries.filter((e) => e.status === "In Discussion").length,
    converted: enquiries.filter((e) => e.status === "Converted").length,
    closed: enquiries.filter((e) => e.status === "Closed").length
  };

  if (authenticated === null || loading) {
    return (
      <div className="min-h-screen bg-navy-950 flex flex-col items-center justify-center text-white space-y-4">
        <div className="w-12 h-12 rounded-xl bg-accent-orange/20 border border-accent-orange flex items-center justify-center animate-spin">
          <RefreshCw className="w-6 h-6 text-accent-orange" />
        </div>
        <p className="text-sm font-mono text-slate-300">वार रूम एडमिन कमांड सेंटर लोड हो रहा है...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col text-left">
      {/* Top Admin Header Bar */}
      <header className="sticky top-0 z-40 bg-navy-900/95 backdrop-blur-md border-b border-navy-800 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-royal-blue to-navy-950 border border-accent-orange/50 flex items-center justify-center text-accent-gold shadow-md">
            <Shield className="w-5 h-5 text-accent-orange" />
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-black tracking-wider text-white uppercase font-hindi flex items-center gap-2">
              <span>WORKFORCE INFOTECH</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-accent-orange/20 text-accent-orange font-mono">
                ADMIN CMS
              </span>
            </h1>
            <p className="text-[10px] text-slate-400 font-mono">
              UP Assembly Election 2027 // Central Operations Dashboard
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-800/80 hover:bg-navy-750 text-xs font-semibold text-slate-300 hover:text-white border border-navy-700 transition"
          >
            <ExternalLink className="w-3.5 h-3.5 text-accent-gold" />
            <span>लाइव वेबसाइट देखें</span>
          </Link>

          <div className="hidden md:flex flex-col text-right">
            <span className="text-xs font-mono font-medium text-slate-200">{adminEmail}</span>
            <span className="text-[10px] text-emerald-400 font-mono">● Active Session</span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300 hover:text-white border border-red-800/50 text-xs font-semibold transition cursor-pointer"
            title="Log Out"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">लॉगआउट</span>
          </button>
        </div>
      </header>

      {/* Global Notifications */}
      {saveSuccess && (
        <div className="fixed top-16 right-6 z-50 p-4 rounded-xl bg-emerald-950 border border-emerald-500 text-emerald-200 text-sm shadow-2xl flex items-center gap-3 animate-slide-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span>{saveSuccess}</span>
        </div>
      )}

      {errorMessage && (
        <div className="fixed top-16 right-6 z-50 p-4 rounded-xl bg-red-950 border border-red-500 text-red-200 text-sm shadow-2xl flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <span>{errorMessage}</span>
          <button onClick={() => setErrorMessage(null)} className="text-xs underline ml-2">हटाएं</button>
        </div>
      )}

      {/* Navigation Sub-Header Tabs */}
      <div className="bg-navy-900 border-b border-navy-800 px-4 sm:px-8 py-2 overflow-x-auto">
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-max">
          <button
            onClick={() => setActiveTab("leads")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === "leads"
                ? "bg-accent-orange text-white shadow-md shadow-accent-orange/25"
                : "text-slate-400 hover:text-white hover:bg-navy-800"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>लीड्स व पूछताछ ({stats.total})</span>
            {stats.new > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-white text-navy-950 text-[10px] font-black">
                {stats.new} नई
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("header")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === "header"
                ? "bg-accent-orange text-white shadow-md shadow-accent-orange/25"
                : "text-slate-400 hover:text-white hover:bg-navy-800"
            }`}
          >
            <Layout className="w-4 h-4" />
            <span>हेडर, लोगो व मेनू</span>
          </button>

          <button
            onClick={() => setActiveTab("contact")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === "contact"
                ? "bg-accent-orange text-white shadow-md shadow-accent-orange/25"
                : "text-slate-400 hover:text-white hover:bg-navy-800"
            }`}
          >
            <Phone className="w-4 h-4" />
            <span>फोन, व्हाट्सएप व सोशल</span>
          </button>

          <button
            onClick={() => setActiveTab("home")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === "home"
                ? "bg-accent-orange text-white shadow-md shadow-accent-orange/25"
                : "text-slate-400 hover:text-white hover:bg-navy-800"
            }`}
          >
            <Radio className="w-4 h-4" />
            <span>होमपेज कंटेंट व टेलीमेट्री</span>
          </button>

          <button
            onClick={() => setActiveTab("victories")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === "victories"
                ? "bg-accent-orange text-white shadow-md shadow-accent-orange/25"
                : "text-slate-400 hover:text-white hover:bg-navy-800"
            }`}
          >
            <Trophy className="w-4 h-4 text-accent-gold" />
            <span>चुनावी ट्रैक रिकॉर्ड व परिणाम</span>
          </button>

          <button
            onClick={() => setActiveTab("hiring")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === "hiring"
                ? "bg-accent-orange text-white shadow-md shadow-accent-orange/25"
                : "text-slate-400 hover:text-white hover:bg-navy-800"
            }`}
          >
            <Briefcase className="w-4 h-4 text-accent-gold" />
            <span>करियर व भर्ती (Hiring CMS)</span>
          </button>

          <button
            onClick={() => setActiveTab("pages")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === "pages"
                ? "bg-accent-orange text-white shadow-md shadow-accent-orange/25"
                : "text-slate-400 hover:text-white hover:bg-navy-800"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>अन्य पेज कंटेंट</span>
          </button>

          <button
            onClick={() => setActiveTab("gallery")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === "gallery"
                ? "bg-accent-orange text-white shadow-md shadow-accent-orange/25"
                : "text-slate-400 hover:text-white hover:bg-navy-800"
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>गैलरी प्रबंधन (Gallery CMS)</span>
          </button>

          <button
            onClick={() => setActiveTab("faqs")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === "faqs"
                ? "bg-accent-orange text-white shadow-md shadow-accent-orange/25"
                : "text-slate-400 hover:text-white hover:bg-navy-800"
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>प्रश्नोत्तर (FAQ Manager)</span>
          </button>

          <button
            onClick={() => setActiveTab("footer")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === "footer"
                ? "bg-accent-orange text-white shadow-md shadow-accent-orange/25"
                : "text-slate-400 hover:text-white hover:bg-navy-800"
            }`}
          >
            <Building className="w-4 h-4" />
            <span>फ़ूटर व वैधानिक नियम</span>
          </button>

          <button
            onClick={() => setActiveTab("media")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === "media"
                ? "bg-accent-orange text-white shadow-md shadow-accent-orange/25"
                : "text-slate-400 hover:text-white hover:bg-navy-800"
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>इमेज व मीडिया (ImageKit)</span>
          </button>

          <button
            onClick={() => setActiveTab("security")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === "security"
                ? "bg-accent-orange text-white shadow-md shadow-accent-orange/25"
                : "text-slate-400 hover:text-white hover:bg-navy-800"
            }`}
          >
            <Key className="w-4 h-4" />
            <span>सुरक्षा व पासवर्ड</span>
          </button>

          <button
            onClick={() => setActiveTab("analytics")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === "analytics"
                ? "bg-accent-orange text-white shadow-md shadow-accent-orange/25"
                : "text-slate-400 hover:text-white hover:bg-navy-800"
            }`}
          >
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>Google Tracking & GA4</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full">
        {/* =========================================================
            TAB 1: LEADS & INQUIRIES CRM
            ========================================================= */}
        {activeTab === "leads" && (
          <div className="space-y-6">
            {/* KPI Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              <div className="p-4 rounded-2xl bg-navy-900 border border-navy-800 shadow-sm">
                <span className="text-[11px] text-slate-400 font-medium block">कुल पूछताछ</span>
                <span className="text-2xl font-black text-white">{stats.total}</span>
              </div>

              <div className="p-4 rounded-2xl bg-navy-900 border border-amber-500/30 shadow-sm">
                <span className="text-[11px] text-amber-400 font-medium block">नई (New)</span>
                <span className="text-2xl font-black text-amber-300">{stats.new}</span>
              </div>

              <div className="p-4 rounded-2xl bg-navy-900 border border-sky-500/30 shadow-sm">
                <span className="text-[11px] text-sky-400 font-medium block">संपर्क किया (Contacted)</span>
                <span className="text-2xl font-black text-sky-300">{stats.contacted}</span>
              </div>

              <div className="p-4 rounded-2xl bg-navy-900 border border-indigo-500/30 shadow-sm">
                <span className="text-[11px] text-indigo-400 font-medium block">वार्ता जारी (In Discussion)</span>
                <span className="text-2xl font-black text-indigo-300">{stats.inDiscussion}</span>
              </div>

              <div className="p-4 rounded-2xl bg-navy-900 border border-emerald-500/30 shadow-sm">
                <span className="text-[11px] text-emerald-400 font-medium block">परिवर्तित (Converted)</span>
                <span className="text-2xl font-black text-emerald-300">{stats.converted}</span>
              </div>

              <div className="p-4 rounded-2xl bg-navy-900 border border-slate-700 shadow-sm">
                <span className="text-[11px] text-slate-400 font-medium block">बंद (Closed)</span>
                <span className="text-2xl font-black text-slate-400">{stats.closed}</span>
              </div>
            </div>

            {/* Filter & Actions Strip */}
            <div className="p-4 rounded-2xl bg-navy-900 border border-navy-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
                {/* Search Bar */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="नाम, फोन, विधानसभा, जिला या सेवा द्वारा खोजें..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white placeholder:text-slate-500 focus:border-accent-orange outline-none"
                  />
                </div>

                {/* Status Filter Dropdown */}
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3.5 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white focus:border-accent-orange outline-none cursor-pointer"
                  >
                    <option value="all">सभी स्टेटस ({enquiries.length})</option>
                    <option value="New">New ({stats.new})</option>
                    <option value="Contacted">Contacted ({stats.contacted})</option>
                    <option value="In Discussion">In Discussion ({stats.inDiscussion})</option>
                    <option value="Converted">Converted ({stats.converted})</option>
                    <option value="Closed">Closed ({stats.closed})</option>
                  </select>
                </div>
              </div>

              {/* CSV Export Button */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <a
                  href="/api/admin/export-leads"
                  download
                  className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Excel / CSV डाउनलोड करें</span>
                </a>
                <button
                  onClick={loadData}
                  className="p-2.5 rounded-xl bg-navy-800 hover:bg-navy-750 text-slate-300 hover:text-white border border-navy-700 transition"
                  title="रिफ्रेश डेटा"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Leads Table */}
            <div className="rounded-2xl bg-navy-900 border border-navy-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-navy-950/80 text-slate-400 font-mono text-[11px] uppercase tracking-wider border-b border-navy-800">
                    <tr>
                      <th className="py-3.5 px-4">नाम व संपर्क</th>
                      <th className="py-3.5 px-4">विधानसभा व जिला</th>
                      <th className="py-3.5 px-4">आवश्यक सेवाएं</th>
                      <th className="py-3.5 px-4">समय (IST)</th>
                      <th className="py-3.5 px-4">स्थिति (Status)</th>
                      <th className="py-3.5 px-4 text-right">कार्यवाही</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-navy-800/60">
                    {filteredEnquiries.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-slate-400">
                          कोई लीड रिकॉर्ड उपलब्ध नहीं है।
                        </td>
                      </tr>
                    ) : (
                      filteredEnquiries.map((e) => {
                        const statusColors: Record<string, string> = {
                          New: "bg-amber-500/15 text-amber-300 border-amber-500/40",
                          Contacted: "bg-sky-500/15 text-sky-300 border-sky-500/40",
                          "In Discussion": "bg-indigo-500/15 text-indigo-300 border-indigo-500/40",
                          Converted: "bg-emerald-500/15 text-emerald-300 border-emerald-500/40",
                          Closed: "bg-slate-700/30 text-slate-400 border-slate-700"
                        };

                        return (
                          <tr
                            key={e.id}
                            className="hover:bg-navy-850/60 transition group cursor-pointer"
                            onClick={() => {
                              setSelectedLead(e);
                              setAdminNoteInput(e.adminNotes || "");
                            }}
                          >
                            <td className="py-4 px-4">
                              <div className="font-bold text-white font-hindi text-base">
                                {e.name}
                              </div>
                              <div className="flex items-center gap-2 mt-1 font-mono text-xs text-slate-300">
                                <span>{e.phone}</span>
                                {e.email && (
                                  <>
                                    <span className="text-slate-600">•</span>
                                    <span className="text-slate-400 truncate max-w-[150px]">{e.email}</span>
                                  </>
                                )}
                              </div>
                            </td>

                            <td className="py-4 px-4 font-hindi">
                              <div className="text-accent-gold font-semibold">{e.assembly}</div>
                              <div className="text-xs text-slate-400">
                                {e.district}
                                {e.state && <span className="ml-1 text-[10px] text-emerald-400">({e.state})</span>}
                              </div>
                            </td>

                            <td className="py-4 px-4">
                              <div className="flex flex-wrap gap-1 max-w-xs">
                                {e.services.slice(0, 2).map((s, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2 py-0.5 rounded bg-navy-950 border border-navy-800 text-[10px] text-slate-300"
                                  >
                                    {s}
                                  </span>
                                ))}
                                {e.services.length > 2 && (
                                  <span className="px-1.5 py-0.5 rounded bg-navy-950 text-[10px] text-accent-orange font-bold">
                                    +{e.services.length - 2} और
                                  </span>
                                )}
                              </div>
                            </td>

                            <td className="py-4 px-4 font-mono text-xs text-slate-400">
                              {new Date(e.createdAt).toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric"
                              })}
                              <div className="text-[10px] text-slate-500">
                                {new Date(e.createdAt).toLocaleTimeString("en-IN", {
                                  hour: "2-digit",
                                  minute: "2-digit"
                                })}
                              </div>
                            </td>

                            <td className="py-4 px-4" onClick={(ev) => ev.stopPropagation()}>
                              <select
                                value={e.status}
                                disabled={updatingLeadId === e.id}
                                onChange={(ev) => handleStatusChange(e.id, ev.target.value as any)}
                                className={`px-2.5 py-1 rounded-lg text-xs font-semibold border outline-none cursor-pointer ${
                                  statusColors[e.status] || "bg-navy-950 text-slate-300 border-navy-800"
                                }`}
                              >
                                <option value="New">New</option>
                                <option value="Contacted">Contacted</option>
                                <option value="In Discussion">In Discussion</option>
                                <option value="Converted">Converted</option>
                                <option value="Closed">Closed</option>
                              </select>
                            </td>

                            <td className="py-4 px-4 text-right" onClick={(ev) => ev.stopPropagation()}>
                              <div className="flex items-center justify-end gap-1.5">
                                <a
                                  href={`tel:${e.phone}`}
                                  className="p-2 rounded-lg bg-navy-950 hover:bg-emerald-950 text-emerald-400 border border-navy-800 transition"
                                  title="कॉल करें"
                                >
                                  <Phone className="w-3.5 h-3.5" />
                                </a>

                                <a
                                  href={`https://wa.me/91${e.phone.replace(/[^0-9]/g, "")}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 rounded-lg bg-navy-950 hover:bg-emerald-950 text-emerald-400 border border-navy-800 transition"
                                  title="व्हाट्सएप पर चैट करें"
                                >
                                  <MessageCircle className="w-3.5 h-3.5" />
                                </a>

                                <button
                                  onClick={() => {
                                    setSelectedLead(e);
                                    setAdminNoteInput(e.adminNotes || "");
                                  }}
                                  className="p-2 rounded-lg bg-navy-950 hover:bg-navy-800 text-slate-300 hover:text-white border border-navy-800 transition"
                                  title="पूरा विवरण देखें"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>

                                <button
                                  onClick={() => handleDeleteEnquiry(e.id)}
                                  className="p-2 rounded-lg bg-navy-950 hover:bg-red-950 text-red-400 border border-navy-800 transition"
                                  title="लीड हटाएं"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Lead Details Modal Drawer */}
            {selectedLead && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md overflow-y-auto">
                <div className="relative w-full max-w-2xl bg-navy-900 border border-navy-700 rounded-2xl shadow-2xl p-6 sm:p-8 my-8 text-left space-y-6">
                  {/* Close button */}
                  <button
                    onClick={() => setSelectedLead(null)}
                    className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-lg bg-navy-800 hover:bg-navy-750 transition"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-accent-orange/20 text-accent-orange text-xs font-mono font-bold">
                        LEAD ID: {selectedLead.id}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        {new Date(selectedLead.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST
                      </span>
                    </div>

                    <h2 className="text-2xl font-black text-white font-hindi">
                      {selectedLead.name}
                    </h2>
                    <p className="text-sm text-accent-gold font-hindi mt-0.5">
                      {selectedLead.assembly} • जिला: {selectedLead.district}
                      {selectedLead.state && <span> ({selectedLead.state})</span>}
                    </p>
                  </div>

                  {/* Direct Contact Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-navy-800">
                    <a
                      href={`tel:${selectedLead.phone}`}
                      className="p-2.5 rounded-xl bg-navy-950 hover:bg-navy-850 border border-navy-700 flex items-center justify-center gap-2 text-white font-mono text-xs font-bold transition"
                    >
                      <Phone className="w-4 h-4 text-accent-orange" />
                      <span>{selectedLead.phone}</span>
                    </a>

                    <a
                      href={`https://wa.me/91${selectedLead.phone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-500/40 flex items-center justify-center gap-2 text-emerald-300 text-xs font-bold transition"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>व्हाट्सएप संदेश</span>
                    </a>

                    {selectedLead.email ? (
                      <a
                        href={`mailto:${selectedLead.email}`}
                        className="p-2.5 rounded-xl bg-navy-950 hover:bg-navy-850 border border-navy-700 flex items-center justify-center gap-2 text-slate-200 text-xs font-mono truncate transition"
                      >
                        <Mail className="w-4 h-4 text-sky-400" />
                        <span className="truncate">{selectedLead.email}</span>
                      </a>
                    ) : (
                      <div className="p-2.5 rounded-xl bg-navy-950/50 border border-navy-800 text-center text-xs text-slate-500">
                        ईमेल उपलब्ध नहीं
                      </div>
                    )}
                  </div>

                  {/* Services Selected */}
                  <div>
                    <label className="text-xs font-semibold text-slate-400 block mb-2 font-mono uppercase">
                      आवश्यक सेवाएं (Services Requested):
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {selectedLead.services.map((s, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-lg bg-navy-950 border border-accent-orange/30 text-xs font-hindi text-slate-200"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Requirements and Message */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-3.5 rounded-xl bg-navy-950 border border-navy-800 space-y-1">
                      <span className="text-[11px] font-mono text-slate-400 block">संपर्क का पसंदीदा समय:</span>
                      <span className="text-sm font-semibold text-white">
                        {selectedLead.preferredTime || "किसी भी समय"}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-navy-950 border border-navy-800 space-y-1">
                      <span className="text-[11px] font-mono text-slate-400 block">वर्तमान स्थिति (Status):</span>
                      <select
                        value={selectedLead.status}
                        onChange={(e) => handleStatusChange(selectedLead.id, e.target.value as any)}
                        className="w-full bg-transparent text-sm font-bold text-accent-gold outline-none cursor-pointer"
                      >
                        <option value="New">New (नई)</option>
                        <option value="Contacted">Contacted (संपर्क किया)</option>
                        <option value="In Discussion">In Discussion (वार्ता जारी)</option>
                        <option value="Converted">Converted (सहमति / कन्वर्जन)</option>
                        <option value="Closed">Closed (समाप्त)</option>
                      </select>
                    </div>
                  </div>

                  {selectedLead.campaignRequirement && (
                    <div className="p-4 rounded-xl bg-navy-950 border border-navy-800 space-y-1">
                      <span className="text-[11px] font-mono text-slate-400 block">अभियान आवश्यकता (Campaign Requirement):</span>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-hindi">
                        {selectedLead.campaignRequirement}
                      </p>
                    </div>
                  )}

                  {selectedLead.message && (
                    <div className="p-4 rounded-xl bg-navy-950 border border-navy-800 space-y-1">
                      <span className="text-[11px] font-mono text-slate-400 block">विशेष संदेश (Message):</span>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-hindi">
                        {selectedLead.message}
                      </p>
                    </div>
                  )}

                  {/* Admin Internal Notes Field */}
                  <div className="space-y-2 pt-2 border-t border-navy-800">
                    <label className="text-xs font-semibold text-accent-gold block font-mono">
                      प्रशासनिक टिप्पणी / फॉलो-अप नोट्स (Admin Notes):
                    </label>
                    <textarea
                      rows={3}
                      value={adminNoteInput}
                      onChange={(e) => setAdminNoteInput(e.target.value)}
                      placeholder="अभियान टीम द्वारा उम्मीदवार के साथ हुई बातचीत, वॉर रूम मीटिंग या अगली तिथि दर्ज करें..."
                      className="w-full p-3 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white placeholder:text-slate-500 focus:border-accent-orange outline-none"
                    />
                    <button
                      onClick={() => handleSaveLeadNote(selectedLead.id)}
                      className="px-4 py-2 rounded-lg bg-accent-orange hover:bg-accent-orange-hover text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>नोट्स सुरक्षित करें</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================================
            TAB 2: HEADER, LOGO & NAVIGATION
            ========================================================= */}
        {activeTab === "header" && (
          <div className="space-y-8">
            {/* Announcement Bar Section */}
            <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800 space-y-5">
              <div className="flex items-center justify-between border-b border-navy-800 pb-3">
                <div>
                  <h3 className="text-lg font-bold text-white font-hindi">टॉप घोषणा पट्टी (Announcement Bar)</h3>
                  <p className="text-xs text-slate-400">वेबसाइट के शीर्ष पर चलने वाला प्रमुख सूचना टिकर व बटन।</p>
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.announcementEnabled}
                    onChange={(e) => setSettings({ ...settings, announcementEnabled: e.target.checked })}
                    className="w-4 h-4 rounded text-accent-orange focus:ring-accent-orange"
                  />
                  <span className="text-xs font-semibold text-slate-300">सक्रिय (Enabled)</span>
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    टिकर टेक्स्ट (हिन्दी)
                  </label>
                  <input
                    type="text"
                    value={settings.announcementTextHi}
                    onChange={(e) => setSettings({ ...settings, announcementTextHi: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white focus:border-accent-orange outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Ticker Text (English)
                  </label>
                  <input
                    type="text"
                    value={settings.announcementTextEn}
                    onChange={(e) => setSettings({ ...settings, announcementTextEn: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white focus:border-accent-orange outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    बटन टेक्स्ट (हिन्दी)
                  </label>
                  <input
                    type="text"
                    value={settings.announcementCtaHi}
                    onChange={(e) => setSettings({ ...settings, announcementCtaHi: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white focus:border-accent-orange outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Button Text (English)
                  </label>
                  <input
                    type="text"
                    value={settings.announcementCtaEn}
                    onChange={(e) => setSettings({ ...settings, announcementCtaEn: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white focus:border-accent-orange outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    बटन लिंक (Target URL)
                  </label>
                  <input
                    type="text"
                    value={settings.announcementCtaUrl}
                    onChange={(e) => setSettings({ ...settings, announcementCtaUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white focus:border-accent-orange outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Branding & Logo */}
            <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800 space-y-5">
              <div className="border-b border-navy-800 pb-3">
                <h3 className="text-lg font-bold text-white font-hindi">ब्रांडिंग, लोगो व शीर्षक</h3>
                <p className="text-xs text-slate-400">कंपनी का आधिकारिक नाम, टैगलाइन तथा लोगो पाथ।</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    ब्रांड नाम (Brand Name)
                  </label>
                  <input
                    type="text"
                    value={settings.brandName}
                    onChange={(e) => setSettings({ ...settings, brandName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white focus:border-accent-orange outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    कंपनी एक्सटेंशन (Brand Suffix)
                  </label>
                  <input
                    type="text"
                    value={settings.brandSuffix}
                    onChange={(e) => setSettings({ ...settings, brandSuffix: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white focus:border-accent-orange outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    हेडर टैगलाइन (हिन्दी)
                  </label>
                  <input
                    type="text"
                    value={settings.brandTaglineHi}
                    onChange={(e) => setSettings({ ...settings, brandTaglineHi: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white focus:border-accent-orange outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Header Tagline (English)
                  </label>
                  <input
                    type="text"
                    value={settings.brandTaglineEn}
                    onChange={(e) => setSettings({ ...settings, brandTaglineEn: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white focus:border-accent-orange outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    हेडर बटन (हिन्दी)
                  </label>
                  <input
                    type="text"
                    value={settings.headerCtaHi}
                    onChange={(e) => setSettings({ ...settings, headerCtaHi: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white focus:border-accent-orange outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Header CTA (English)
                  </label>
                  <input
                    type="text"
                    value={settings.headerCtaEn}
                    onChange={(e) => setSettings({ ...settings, headerCtaEn: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white focus:border-accent-orange outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    लोगो URL / ImageKit CDN Path
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={settings.logoUrl}
                      onChange={(e) => setSettings({ ...settings, logoUrl: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white focus:border-accent-orange outline-none"
                    />
                    <label className="px-3 py-2.5 rounded-xl bg-navy-800 hover:bg-navy-750 text-accent-gold border border-navy-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer flex-shrink-0 transition" title="ImageKit में लोगो अपलोड करें">
                      <Upload className="w-3.5 h-3.5 text-accent-orange" />
                      <span>Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (ev) => {
                          const file = ev.target.files?.[0];
                          if (!file) return;
                          try {
                            const fd = new FormData();
                            fd.append("file", file);
                            fd.append("folder", "workforce");
                            const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
                            const json = await res.json();
                            if (json.success && json.file?.url) {
                              setSettings((prev) => ({ ...prev, logoUrl: json.file.url }));
                              alert("लोगो ImageKit (workforce) में सफलतापूर्वक अपलोड हो गया!");
                            } else {
                              alert(json.error || "अपलोड विफल रहा।");
                            }
                          } catch (e: any) {
                            alert("अपलोड त्रुटि: " + e.message);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => saveSection("settings", settings)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-accent-orange to-accent-orange-hover hover:brightness-110 text-white font-bold text-sm shadow-xl shadow-accent-orange/20 flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? "सुरक्षित हो रहा है..." : "हेडर परिवर्तन सहेजें"}</span>
                </button>
              </div>
            </div>

            {/* Navigation Menu Manager */}
            <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800 space-y-5">
              <div className="flex items-center justify-between border-b border-navy-800 pb-3">
                <div>
                  <h3 className="text-lg font-bold text-white font-hindi">नेविगेशन मेनू लिंक्स (Navigation Manager)</h3>
                  <p className="text-xs text-slate-400">मुख्य हेडर में प्रदर्शित होने वाले लिंक्स व क्रम।</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newId = `nav-${Date.now()}`;
                    setNavigation([
                      ...navigation,
                      {
                        id: newId,
                        labelHi: "नया लिंक",
                        labelEn: "New Link",
                        url: "/new",
                        order: navigation.length + 1,
                        active: true
                      }
                    ]);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-navy-800 hover:bg-navy-750 text-accent-gold text-xs font-bold border border-navy-700 flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>नया लिंक जोड़ें</span>
                </button>
              </div>

              <div className="space-y-3">
                {navigation.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className="p-3.5 rounded-xl bg-navy-950 border border-navy-800 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center"
                  >
                    <div className="sm:col-span-1 text-center font-mono text-xs text-slate-500">
                      #{item.order || idx + 1}
                    </div>

                    <div className="sm:col-span-3">
                      <input
                        type="text"
                        value={item.labelHi}
                        onChange={(e) => {
                          const updated = [...navigation];
                          updated[idx].labelHi = e.target.value;
                          setNavigation(updated);
                        }}
                        placeholder="लेबल (हिन्दी)"
                        className="w-full px-3 py-1.5 rounded-lg bg-navy-900 border border-navy-700 text-xs text-white"
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <input
                        type="text"
                        value={item.labelEn}
                        onChange={(e) => {
                          const updated = [...navigation];
                          updated[idx].labelEn = e.target.value;
                          setNavigation(updated);
                        }}
                        placeholder="Label (English)"
                        className="w-full px-3 py-1.5 rounded-lg bg-navy-900 border border-navy-700 text-xs text-white"
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <input
                        type="text"
                        value={item.url}
                        onChange={(e) => {
                          const updated = [...navigation];
                          updated[idx].url = e.target.value;
                          setNavigation(updated);
                        }}
                        placeholder="/path"
                        className="w-full px-3 py-1.5 rounded-lg bg-navy-900 border border-navy-700 text-xs text-white font-mono"
                      />
                    </div>

                    <div className="sm:col-span-2 flex items-center justify-end gap-2">
                      <label className="flex items-center gap-1 text-[11px] text-slate-400 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={item.active}
                          onChange={(e) => {
                            const updated = [...navigation];
                            updated[idx].active = e.target.checked;
                            setNavigation(updated);
                          }}
                          className="rounded text-accent-orange"
                        />
                        <span>सक्रिय</span>
                      </label>

                      <button
                        type="button"
                        onClick={() => {
                          setNavigation(navigation.filter((_, i) => i !== idx));
                        }}
                        className="p-1.5 rounded text-red-400 hover:bg-red-950/50"
                        title="लिंक हटाएं"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => saveSection("navigation", navigation)}
                  className="px-6 py-3 rounded-xl bg-accent-orange hover:bg-accent-orange-hover text-white font-bold text-sm shadow-md transition flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? "सहेजा जा रहा है..." : "नेविगेशन मेनू सहेजें"}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 3: CONTACT CHANNELS, WHATSAPP & ADDRESSES
            ========================================================= */}
        {activeTab === "contact" && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800 space-y-6">
              <div className="border-b border-navy-800 pb-3">
                <h3 className="text-lg font-bold text-white font-hindi">हेल्पलाइन व फोन नंबर्स (Helplines)</h3>
                <p className="text-xs text-slate-400">वेबसाइट, फुटर, कॉन्टैक्ट कार्ड्स तथा फ्लोटिंग कॉल बटन में प्रयुक्त आधिकारिक नंबर।</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Helpline 1 */}
                <div className="p-4 rounded-xl bg-navy-950 border border-navy-800 space-y-3">
                  <span className="text-xs font-bold text-accent-orange font-mono block uppercase">
                    हेल्पलाइन 1 (Primary Line)
                  </span>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">मोबाइल नंबर (10 अंक)</label>
                    <input
                      type="text"
                      value={settings.phone1}
                      onChange={(e) => setSettings({ ...settings, phone1: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-navy-700 text-sm font-mono text-white focus:border-accent-orange outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">लेबल (हिन्दी)</label>
                    <input
                      type="text"
                      value={settings.phone1LabelHi}
                      onChange={(e) => setSettings({ ...settings, phone1LabelHi: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg bg-navy-900 border border-navy-700 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">उप-विवरण (Subtitle)</label>
                    <input
                      type="text"
                      value={settings.phone1SubHi}
                      onChange={(e) => setSettings({ ...settings, phone1SubHi: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg bg-navy-900 border border-navy-700 text-xs text-white"
                    />
                  </div>
                </div>

                {/* Helpline 2 */}
                <div className="p-4 rounded-xl bg-navy-950 border border-navy-800 space-y-3">
                  <span className="text-xs font-bold text-accent-gold font-mono block uppercase">
                    हेल्पलाइन 2 (Senior Desk Line)
                  </span>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">मोबाइल नंबर (10 अंक)</label>
                    <input
                      type="text"
                      value={settings.phone2}
                      onChange={(e) => setSettings({ ...settings, phone2: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-navy-700 text-sm font-mono text-white focus:border-accent-orange outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">लेबल (हिन्दी)</label>
                    <input
                      type="text"
                      value={settings.phone2LabelHi}
                      onChange={(e) => setSettings({ ...settings, phone2LabelHi: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg bg-navy-900 border border-navy-700 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">उप-विवरण (Subtitle)</label>
                    <input
                      type="text"
                      value={settings.phone2SubHi}
                      onChange={(e) => setSettings({ ...settings, phone2SubHi: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg bg-navy-900 border border-navy-700 text-xs text-white"
                    />
                  </div>
                </div>
              </div>

              {/* WhatsApp Integration */}
              <div className="p-4 rounded-xl bg-navy-950 border border-navy-800 space-y-4">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-emerald-400" />
                  <h4 className="text-sm font-bold text-white">व्हाट्सएप बिजनेस इंटिग्रेशन (WhatsApp Direct)</h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      व्हाट्सएप नंबर (कंट्री कोड के साथ, उदा. 919621762121)
                    </label>
                    <input
                      type="text"
                      value={settings.whatsappNumber}
                      onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-navy-700 text-sm font-mono text-white focus:border-emerald-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      डिफ़ॉल्ट परामर्श संदेश (Pre-filled Message)
                    </label>
                    <input
                      type="text"
                      value={settings.whatsappDefaultMessage}
                      onChange={(e) => setSettings({ ...settings, whatsappDefaultMessage: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-navy-700 text-sm text-white focus:border-emerald-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Official Email, Web & Addresses */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    आधिकारिक ईमेल (Email Address)
                  </label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white focus:border-accent-orange outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    वेबसाइट डोमेन (Website URL)
                  </label>
                  <input
                    type="text"
                    value={settings.website}
                    onChange={(e) => setSettings({ ...settings, website: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white focus:border-accent-orange outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    लखनऊ सेंट्रल वार रूम का पता (War Room Location)
                  </label>
                  <input
                    type="text"
                    value={settings.warRoomAddress}
                    onChange={(e) => setSettings({ ...settings, warRoomAddress: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white focus:border-accent-orange outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    कॉर्पोरेट मुख्यालय का पता (Head Office Address)
                  </label>
                  <input
                    type="text"
                    value={settings.headOffice}
                    onChange={(e) => setSettings({ ...settings, headOffice: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white focus:border-accent-orange outline-none"
                  />
                </div>
              </div>

              {/* Social Media Channels */}
              <div className="p-4 rounded-xl bg-navy-950 border border-navy-800 space-y-4">
                <h4 className="text-xs font-bold text-slate-400 font-mono uppercase">
                  सोशल मीडिया प्रोफाइल्स (Social Links)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Facebook URL</label>
                    <input
                      type="text"
                      value={settings.facebookUrl}
                      onChange={(e) => setSettings({ ...settings, facebookUrl: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-navy-900 border border-navy-700 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Twitter / X URL</label>
                    <input
                      type="text"
                      value={settings.twitterUrl}
                      onChange={(e) => setSettings({ ...settings, twitterUrl: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-navy-900 border border-navy-700 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Instagram URL</label>
                    <input
                      type="text"
                      value={settings.instagramUrl}
                      onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-navy-900 border border-navy-700 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">YouTube URL</label>
                    <input
                      type="text"
                      value={settings.youtubeUrl}
                      onChange={(e) => setSettings({ ...settings, youtubeUrl: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-navy-900 border border-navy-700 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">LinkedIn URL</label>
                    <input
                      type="text"
                      value={settings.linkedinUrl}
                      onChange={(e) => setSettings({ ...settings, linkedinUrl: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-navy-900 border border-navy-700 text-xs text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => saveSection("settings", settings)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-accent-orange to-accent-orange-hover hover:brightness-110 text-white font-bold text-sm shadow-xl shadow-accent-orange/20 flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? "सहेजा जा रहा है..." : "संपर्क सूत्र परिवर्तन सहेजें"}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 4: HOMEPAGE CONTENT & TELEMETRY (COMPREHENSIVE CMS)
            ========================================================= */}
        {activeTab === "home" && (
          <HomepageCms
            homepage={homepage}
            setHomepage={setHomepage}
            saveSection={saveSection}
            saving={saving}
          />
        )}

        {/* =========================================================
            TAB 4.5: TRACK RECORD & ELECTORAL VICTORIES (DEDICATED CMS)
            ========================================================= */}
        {activeTab === "victories" && (
          <TrackRecordCms
            trackRecord={homepage.trackRecord || defaultHomepage.trackRecord!}
            setTrackRecord={(updatedTr) => {
              setHomepage({
                ...homepage,
                trackRecord: updatedTr
              });
            }}
            saveSection={saveSection}
            saving={saving}
          />
        )}

        {/* =========================================================
            TAB 4.6: HIRING & CAREERS CMS (DEDICATED CMS)
            ========================================================= */}
        {activeTab === "hiring" && (
          <HiringCms
            hiring={homepage.hiring || defaultHiring}
            setHiring={(updatedHiring) => {
              setHomepage({
                ...homepage,
                hiring: updatedHiring
              });
            }}
            saveSection={saveSection}
            saving={saving}
          />
        )}

        {/* =========================================================
            TAB 5: PAGES CONTENT (COMPREHENSIVE CMS)
            ========================================================= */}
        {activeTab === "pages" && (
          <PagesCms
            pages={pages}
            setPages={setPages}
            saveSection={saveSection}
            saving={saving}
          />
        )}

        {/* =========================================================
            TAB 6: GALLERY CMS (MANAGEMENT & VISIBILITY TOGGLE)
            ========================================================= */}
        {activeTab === "gallery" && (
          <GalleryCms
            gallery={gallery}
            setGallery={setGallery}
            saveSection={saveSection}
            saving={saving}
          />
        )}

        {/* =========================================================
            TAB 6: FAQ MANAGEMENT (CRUD)
            ========================================================= */}
        {activeTab === "faqs" && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800 space-y-5">
              <div className="flex items-center justify-between border-b border-navy-800 pb-3">
                <div>
                  <h3 className="text-lg font-bold text-white font-hindi">प्रश्नोत्तर प्रबंधन (FAQ Manager)</h3>
                  <p className="text-xs text-slate-400">उम्मीदवारों व अभियान टीमों के अक्सर पूछे जाने वाले प्रश्न व उत्तर।</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newFaq: FaqItem = {
                      id: `faq-${Date.now()}`,
                      category: "general",
                      questionHi: "",
                      questionEn: "",
                      answerHi: "",
                      answerEn: ""
                    };
                    setEditingFaq(newFaq);
                    setFaqModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-accent-orange hover:bg-accent-orange-hover text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>नया FAQ जोड़ें</span>
                </button>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, idx) => (
                  <div
                    key={faq.id || idx}
                    className="p-4 rounded-xl bg-navy-950 border border-navy-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1 max-w-3xl">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-navy-900 border border-navy-700 text-[10px] text-accent-gold uppercase font-mono">
                          {faq.category}
                        </span>
                        <h4 className="text-sm font-bold text-white font-hindi">
                          {faq.questionHi || faq.questionEn}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-2">
                        {faq.answerHi || faq.answerEn}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingFaq(faq);
                          setFaqModalOpen(true);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-navy-900 hover:bg-navy-800 text-xs font-semibold text-slate-200 border border-navy-700 cursor-pointer"
                      >
                        संपादित करें
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm("क्या आप इस प्रश्नोत्तर को हटाना चाहते हैं?")) {
                            const updated = faqs.filter((f) => f.id !== faq.id);
                            setFaqs(updated);
                            saveSection("faqs", updated);
                          }
                        }}
                        className="p-1.5 rounded-lg text-red-400 hover:bg-red-950/50 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Edit/Create FAQ Modal */}
            {faqModalOpen && editingFaq && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md overflow-y-auto">
                <div className="relative w-full max-w-2xl bg-navy-900 border border-navy-700 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-4 text-left">
                  <button
                    onClick={() => {
                      setFaqModalOpen(false);
                      setEditingFaq(null);
                    }}
                    className="absolute top-5 right-5 text-slate-400 hover:text-white p-2"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <h3 className="text-xl font-bold text-white font-hindi">
                    {editingFaq.questionHi ? "FAQ संपादित करें" : "नया FAQ जोड़ें"}
                  </h3>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1 font-mono">श्रेणी (Category):</label>
                    <select
                      value={editingFaq.category}
                      onChange={(e) => setEditingFaq({ ...editingFaq, category: e.target.value as any })}
                      className="px-3.5 py-2 rounded-xl bg-navy-950 border border-navy-700 text-xs text-white"
                    >
                      <option value="general">सामान्य (General)</option>
                      <option value="services">चुनावी सेवाएं (Services)</option>
                      <option value="technology">तकनीक व सुरक्षा (Technology)</option>
                      <option value="compliance">नियम व गोपनीयता (Compliance)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">प्रश्न (हिन्दी में):</label>
                    <input
                      type="text"
                      value={editingFaq.questionHi}
                      onChange={(e) => setEditingFaq({ ...editingFaq, questionHi: e.target.value })}
                      placeholder="उदा. क्या हमारे अभियान का डेटा सुरक्षित रहेगा?"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Question (in English):</label>
                    <input
                      type="text"
                      value={editingFaq.questionEn}
                      onChange={(e) => setEditingFaq({ ...editingFaq, questionEn: e.target.value })}
                      placeholder="Will our campaign data remain secure?"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">उत्तर (हिन्दी में):</label>
                    <textarea
                      rows={3}
                      value={editingFaq.answerHi}
                      onChange={(e) => setEditingFaq({ ...editingFaq, answerHi: e.target.value })}
                      placeholder="विस्तृत उत्तर यहाँ लिखें..."
                      className="w-full p-3 rounded-xl bg-navy-950 border border-navy-700 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Answer (in English):</label>
                    <textarea
                      rows={3}
                      value={editingFaq.answerEn}
                      onChange={(e) => setEditingFaq({ ...editingFaq, answerEn: e.target.value })}
                      placeholder="Detailed English response here..."
                      className="w-full p-3 rounded-xl bg-navy-950 border border-navy-700 text-xs text-white"
                    />
                  </div>

                  <div className="pt-3 flex items-center justify-end gap-3 border-t border-navy-800">
                    <button
                      type="button"
                      onClick={() => {
                        setFaqModalOpen(false);
                        setEditingFaq(null);
                      }}
                      className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                    >
                      रद्द करें
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const existingIdx = faqs.findIndex((f) => f.id === editingFaq.id);
                        let updated = [...faqs];
                        if (existingIdx >= 0) {
                          updated[existingIdx] = editingFaq;
                        } else {
                          updated.push(editingFaq);
                        }
                        setFaqs(updated);
                        saveSection("faqs", updated);
                        setFaqModalOpen(false);
                        setEditingFaq(null);
                      }}
                      className="px-6 py-2 rounded-xl bg-accent-orange hover:bg-accent-orange-hover text-white text-xs font-bold"
                    >
                      सुरक्षित करें
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================================
            TAB 7: FOOTER & COMPLIANCE
            ========================================================= */}
        {activeTab === "footer" && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800 space-y-6">
              <div className="border-b border-navy-800 pb-3">
                <h3 className="text-lg font-bold text-white font-hindi">फ़ूटर एवं कानूनी डिस्क्लेमर (Footer & Legal)</h3>
                <p className="text-xs text-slate-400">कंपनी का संक्षेप विवरण, ECI/TRAI नियम-अनुरूपता वक्तव्य तथा कॉपीराइट।</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  फ़ूटर कंपनी परिचय (हिन्दी)
                </label>
                <textarea
                  rows={2}
                  value={settings.footerBioHi}
                  onChange={(e) => setSettings({ ...settings, footerBioHi: e.target.value })}
                  className="w-full p-3 rounded-xl bg-navy-950 border border-navy-700 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Footer Company Description (English)
                </label>
                <textarea
                  rows={2}
                  value={settings.footerBioEn}
                  onChange={(e) => setSettings({ ...settings, footerBioEn: e.target.value })}
                  className="w-full p-3 rounded-xl bg-navy-950 border border-navy-700 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  वैधानिक अनुपालन वक्तव्य (ECI / TRAI / DPDP Act Disclaimer)
                </label>
                <textarea
                  rows={2}
                  value={settings.complianceTextHi}
                  onChange={(e) => setSettings({ ...settings, complianceTextHi: e.target.value })}
                  className="w-full p-3 rounded-xl bg-navy-950 border border-navy-700 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  कॉपीराइट नोटिस (Copyright Notice)
                </label>
                <input
                  type="text"
                  value={settings.copyrightText}
                  onChange={(e) => setSettings({ ...settings, copyrightText: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-sm font-mono text-white"
                />
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => saveSection("settings", settings)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-accent-orange to-accent-orange-hover hover:brightness-110 text-white font-bold text-sm shadow-xl shadow-accent-orange/20 flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? "सहेजा जा रहा है..." : "फ़ूटर परिवर्तन सहेजें"}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            TAB: IMAGEKIT MEDIA MANAGER
            ========================================================= */}
        {activeTab === "media" && (
          <MediaManagerCms />
        )}

        {/* =========================================================
            TAB 8: SECURITY & PASSWORD MANAGEMENT
            ========================================================= */}
        {activeTab === "security" && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-navy-900 border border-navy-800 space-y-6">
              <div className="border-b border-navy-800 pb-3">
                <h3 className="text-lg font-bold text-white font-hindi flex items-center gap-2">
                  <Key className="w-5 h-5 text-accent-orange" />
                  <span>प्रशासक क्रेडेंशियल्स व पासवर्ड परिवर्तन</span>
                </h3>
                <p className="text-xs text-slate-400">
                  एडमिन पैनल के लॉगिन ईमेल और पासवर्ड को सुरक्षित रूप से बदलें।
                </p>
              </div>

              {passwordStatus.success && (
                <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-sm flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span>{passwordStatus.success}</span>
                </div>
              )}

              {passwordStatus.error && (
                <div className="p-4 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-sm flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <span>{passwordStatus.error}</span>
                </div>
              )}

              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    वर्तमान पासवर्ड (Current Password) *
                  </label>
                  <input
                    type="password"
                    required
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                    placeholder="••••••••••••"
                    className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-navy-700 text-white text-sm outline-none focus:border-accent-orange font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    एडमिन ईमेल (Admin Email)
                  </label>
                  <input
                    type="email"
                    value={passwordForm.newEmail || adminEmail}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newEmail: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-navy-700 text-white text-sm outline-none focus:border-accent-orange font-mono"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      नया पासवर्ड (New Password) *
                    </label>
                    <input
                      type="password"
                      required
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      placeholder="न्यूनतम 6 अक्षर"
                      className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-navy-700 text-white text-sm outline-none focus:border-accent-orange font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      पासवर्ड की पुष्टि (Confirm Password) *
                    </label>
                    <input
                      type="password"
                      required
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                      placeholder="पुनः नया पासवर्ड दर्ज करें"
                      className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-navy-700 text-white text-sm outline-none focus:border-accent-orange font-mono"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-accent-orange to-accent-orange-hover hover:brightness-110 text-white font-bold text-sm shadow-xl shadow-accent-orange/20 transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>क्रेडेंशियल्स अपडेट करें</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* GOOGLE ANALYTICS, GTM & SEARCH CONSOLE TAB */}
        {activeTab === "analytics" && (
          <GoogleAnalyticsCms
            settings={settings}
            setSettings={setSettings}
            onSave={() => saveSection("settings", settings)}
            saving={saving}
          />
        )}
      </main>
    </div>
  );
}
