"use client";

import React, { useState } from "react";
import {
  HiringContent,
  JobPositionItem,
  defaultHiring
} from "@/lib/content-schema";
import {
  Briefcase,
  Plus,
  Trash2,
  Save,
  ArrowUp,
  ArrowDown,
  Search,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  X,
  Edit2
} from "lucide-react";

interface HiringCmsProps {
  hiring: HiringContent;
  setHiring: (h: HiringContent) => void;
  saveSection: (section: string, data: any) => Promise<void>;
  saving: boolean;
}

export default function HiringCms({
  hiring,
  setHiring,
  saveSection,
  saving
}: HiringCmsProps) {
  const currentHiring = hiring || defaultHiring;
  const positions = currentHiring.positions && currentHiring.positions.length > 0
    ? currentHiring.positions
    : defaultHiring.positions;
  const offersHi = currentHiring.offersHi || defaultHiring.offersHi;
  const offersEn = currentHiring.offersEn || defaultHiring.offersEn;

  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingPosition, setEditingPosition] = useState<JobPositionItem | null>(null);

  // Form state for adding/editing position
  const [positionForm, setPositionForm] = useState<JobPositionItem>({
    id: "",
    title: "",
    icon: "💼",
    category: "डिजिटल एवं मीडिया",
    location: "Kanpur, UP",
    type: "Full Time / On-Site",
    experience: "Freshers & Experienced"
  });

  // Filter positions
  const filteredPositions = positions.filter((p) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q)
    );
  });

  const handleOpenAdd = () => {
    setPositionForm({
      id: `pos-${Date.now()}`,
      title: "",
      icon: "💼",
      category: "डिजिटल एवं मीडिया",
      location: "Kanpur, UP",
      type: "Full Time / On-Site",
      experience: "Freshers & Experienced"
    });
    setEditingPosition(null);
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (pos: JobPositionItem) => {
    setPositionForm({ ...pos });
    setEditingPosition(pos);
    setIsAddModalOpen(true);
  };

  const handleSavePosition = () => {
    if (!positionForm.title.trim()) {
      alert("कृपया पद का शीर्षक (Job Title) दर्ज करें।");
      return;
    }

    if (editingPosition) {
      // Update existing
      const updated = positions.map((p) =>
        p.id === editingPosition.id ? positionForm : p
      );
      setHiring({
        ...currentHiring,
        positions: updated
      });
    } else {
      // Add new
      setHiring({
        ...currentHiring,
        positions: [...positions, positionForm]
      });
    }
    setIsAddModalOpen(false);
  };

  const handleDeletePosition = (id: string) => {
    if (!confirm("क्या आप वाकई इस पद को हटाना चाहते हैं?")) return;
    const updated = positions.filter((p) => p.id !== id);
    setHiring({
      ...currentHiring,
      positions: updated
    });
  };

  const handleMovePosition = (index: number, direction: "up" | "down") => {
    const newPositions = [...positions];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newPositions.length) return;
    const temp = newPositions[index];
    newPositions[index] = newPositions[targetIndex];
    newPositions[targetIndex] = temp;
    setHiring({
      ...currentHiring,
      positions: newPositions
    });
  };

  // Add/remove offer
  const handleAddOffer = () => {
    const newHi = prompt("नई सुविधा / अवसर (हिंदी में):");
    if (!newHi) return;
    const newEn = prompt("New Benefit / Offer (English):") || newHi;

    setHiring({
      ...currentHiring,
      offersHi: [...offersHi, newHi],
      offersEn: [...offersEn, newEn]
    });
  };

  const handleRemoveOffer = (index: number) => {
    if (!confirm("क्या आप वाकई इस बिंदु को हटाना चाहते हैं?")) return;
    setHiring({
      ...currentHiring,
      offersHi: offersHi.filter((_, i) => i !== index),
      offersEn: offersEn.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="space-y-8 text-left pb-16">
      {/* Top Banner with Save Action */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 border border-navy-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-accent-orange/20 border border-accent-orange/50 flex items-center justify-center text-accent-orange shadow-lg">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white font-hindi">
              करियर व भर्ती प्रबंधन (Careers & Hiring CMS)
            </h2>
            <p className="text-xs text-slate-400 font-hindi">
              वेबसाइट पर उपलब्ध सभी 7 पदों, सीधे ईमेल, फोन नंबर और सुविधाओं का प्रबंधन करें।
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => saveSection("hiring", currentHiring)}
          disabled={saving}
          className="px-6 py-3 rounded-xl bg-accent-orange hover:bg-accent-orange-hover text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-accent-orange/25 transition cursor-pointer disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? "सुरक्षित हो रहा है..." : "सभी बदलाव सुरक्षित करें (Save Hiring CMS)"}</span>
        </button>
      </div>

      {/* Basic Section Settings & Contact Channels */}
      <div className="p-6 rounded-3xl bg-navy-900 border border-navy-800 space-y-6">
        <h3 className="text-base font-bold text-white font-hindi flex items-center gap-2 border-b border-navy-800 pb-3">
          <Sparkles className="w-4 h-4 text-accent-gold" />
          <span>हेडर, संपर्क ईमेल एवं लोकेशन सेटिंग्स</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              हेडर बैज (Hindi)
            </label>
            <input
              type="text"
              value={currentHiring.badgeHi || ""}
              onChange={(e) => setHiring({ ...currentHiring, badgeHi: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white focus:border-accent-orange outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              Header Badge (English)
            </label>
            <input
              type="text"
              value={currentHiring.badgeEn || ""}
              onChange={(e) => setHiring({ ...currentHiring, badgeEn: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white focus:border-accent-orange outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              मुख्य शीर्षक (Heading Hindi)
            </label>
            <input
              type="text"
              value={currentHiring.headingHi || ""}
              onChange={(e) => setHiring({ ...currentHiring, headingHi: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white focus:border-accent-orange outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              Main Heading (English)
            </label>
            <input
              type="text"
              value={currentHiring.headingEn || ""}
              onChange={(e) => setHiring({ ...currentHiring, headingEn: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white focus:border-accent-orange outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-300 mb-1">
              टैगलाइन / विवरण (Tagline Hindi)
            </label>
            <textarea
              rows={2}
              value={currentHiring.taglineHi || ""}
              onChange={(e) => setHiring({ ...currentHiring, taglineHi: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white focus:border-accent-orange outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-300 mb-1">
              Tagline / Subtitle (English)
            </label>
            <textarea
              rows={2}
              value={currentHiring.taglineEn || ""}
              onChange={(e) => setHiring({ ...currentHiring, taglineEn: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white focus:border-accent-orange outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-accent-gold" />
              <span>सीधा आवेदन ईमेल 1 (Sales Email)</span>
            </label>
            <input
              type="email"
              value={currentHiring.email1 || ""}
              onChange={(e) => setHiring({ ...currentHiring, email1: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white focus:border-accent-orange outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-accent-orange" />
              <span>सीधा आवेदन ईमेल 2 (Election Email)</span>
            </label>
            <input
              type="email"
              value={currentHiring.email2 || ""}
              onChange={(e) => setHiring({ ...currentHiring, email2: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white focus:border-accent-orange outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>कॉल / व्हाट्सएप नंबर (Phone/WhatsApp)</span>
            </label>
            <input
              type="text"
              value={currentHiring.phone || ""}
              onChange={(e) => setHiring({ ...currentHiring, phone: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white focus:border-accent-orange outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              <span>जॉब लोकेशन (Job Location)</span>
            </label>
            <input
              type="text"
              value={currentHiring.location || ""}
              onChange={(e) => setHiring({ ...currentHiring, location: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white focus:border-accent-orange outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              योग्यता नोट (Eligibility Note Hindi)
            </label>
            <input
              type="text"
              value={currentHiring.eligibilityNoteHi || ""}
              onChange={(e) => setHiring({ ...currentHiring, eligibilityNoteHi: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white focus:border-accent-orange outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              Eligibility Note (English)
            </label>
            <input
              type="text"
              value={currentHiring.eligibilityNoteEn || ""}
              onChange={(e) => setHiring({ ...currentHiring, eligibilityNoteEn: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white focus:border-accent-orange outline-none"
            />
          </div>
        </div>
      </div>

      {/* Open Positions List (7 Roles) */}
      <div className="p-6 rounded-3xl bg-navy-900 border border-navy-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-navy-800 pb-4">
          <div>
            <h3 className="text-base font-bold text-white font-hindi flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-accent-gold" />
              <span>खुले पद (Open Positions List - {positions.length} पद)</span>
            </h3>
            <p className="text-xs text-slate-400">
              प्रत्येक पद का शीर्षक, इमोजी आइकॉन, श्रेणी एवं योग्यता संपादित करें।
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="पद खोजें..."
                className="pl-9 pr-3 py-1.5 rounded-xl bg-navy-950 border border-navy-700 text-xs text-white focus:border-accent-orange outline-none w-48"
              />
            </div>

            <button
              type="button"
              onClick={handleOpenAdd}
              className="px-4 py-2 rounded-xl bg-accent-orange hover:bg-accent-orange-hover text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-md"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>नया पद जोड़ें</span>
            </button>
          </div>
        </div>

        {/* Positions Cards */}
        <div className="space-y-3">
          {filteredPositions.map((pos, index) => (
            <div
              key={pos.id || `pos-${index}`}
              className="p-4 rounded-2xl bg-navy-950 border border-navy-800 hover:border-navy-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-navy-900 border border-navy-700 flex items-center justify-center text-xl flex-shrink-0">
                  {pos.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>{pos.title}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-navy-900 text-accent-gold border border-navy-800">
                      {pos.category}
                    </span>
                  </h4>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                    <span>📍 {pos.location}</span>
                    <span>•</span>
                    <span>💼 {pos.type}</span>
                    <span>•</span>
                    <span className="text-emerald-400">{pos.experience}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1.5 self-end sm:self-center">
                <button
                  type="button"
                  onClick={() => handleMovePosition(index, "up")}
                  disabled={index === 0}
                  className="p-1.5 rounded-lg bg-navy-900 hover:bg-navy-850 text-slate-400 hover:text-white border border-navy-800 disabled:opacity-30 cursor-pointer"
                  title="ऊपर ले जाएं"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleMovePosition(index, "down")}
                  disabled={index === positions.length - 1}
                  className="p-1.5 rounded-lg bg-navy-900 hover:bg-navy-850 text-slate-400 hover:text-white border border-navy-800 disabled:opacity-30 cursor-pointer"
                  title="नीचे ले जाएं"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenEdit(pos)}
                  className="p-1.5 rounded-lg bg-navy-900 hover:bg-navy-850 text-sky-400 hover:text-white border border-navy-800 cursor-pointer"
                  title="संपादित करें"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDeletePosition(pos.id)}
                  className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400 hover:text-white border border-red-900/50 cursor-pointer"
                  title="हटाएं"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* What We Offer Perks Manager */}
      <div className="p-6 rounded-3xl bg-navy-900 border border-navy-800 space-y-6">
        <div className="flex items-center justify-between border-b border-navy-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-white font-hindi flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>क्या सुविधाएँ व अवसर मिलेंगे (What We Offer Perks)</span>
            </h3>
            <p className="text-xs text-slate-400">वेतन, इंसेंटिव एवं कार्य वातावरण के बिंदु</p>
          </div>

          <button
            type="button"
            onClick={handleAddOffer}
            className="px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>नया बिंदु जोड़ें</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {offersHi.map((offer, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-navy-950 border border-navy-800 flex items-center justify-between gap-3"
            >
              <div className="space-y-1 text-xs">
                <div className="text-slate-200 font-medium">🇮🇳 {offer}</div>
                {offersEn[idx] && (
                  <div className="text-slate-400 text-[11px]">🇬🇧 {offersEn[idx]}</div>
                )}
              </div>
              <button
                type="button"
                onClick={() => handleRemoveOffer(idx)}
                className="p-1.5 rounded-lg bg-red-950/40 text-red-400 hover:text-white cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Add / Edit Position Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in text-left">
          <div className="bg-navy-900 border border-navy-700 rounded-3xl max-w-md w-full p-6 shadow-2xl relative space-y-5">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full bg-navy-800 hover:bg-navy-700 text-slate-400 hover:text-white transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-bold text-white font-hindi">
              {editingPosition ? "पद संपादित करें (Edit Position)" : "नया पद जोड़ें (Add New Position)"}
            </h3>

            <div className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  पद का नाम (Job Title) *
                </label>
                <input
                  type="text"
                  value={positionForm.title}
                  onChange={(e) => setPositionForm({ ...positionForm, title: e.target.value })}
                  placeholder="उदा. Social Media Handler"
                  className="w-full px-3.5 py-2 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white focus:border-accent-orange outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    इमोजी आइकॉन (Icon)
                  </label>
                  <input
                    type="text"
                    value={positionForm.icon}
                    onChange={(e) => setPositionForm({ ...positionForm, icon: e.target.value })}
                    placeholder="📱, 🎨, 🎥, 💼..."
                    className="w-full px-3.5 py-2 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white focus:border-accent-orange outline-none text-center"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    श्रेणी (Category)
                  </label>
                  <input
                    type="text"
                    value={positionForm.category}
                    onChange={(e) => setPositionForm({ ...positionForm, category: e.target.value })}
                    placeholder="क्रिएटिव / सेल्स / मीडिया"
                    className="w-full px-3.5 py-2 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white focus:border-accent-orange outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    स्थान (Location)
                  </label>
                  <input
                    type="text"
                    value={positionForm.location}
                    onChange={(e) => setPositionForm({ ...positionForm, location: e.target.value })}
                    placeholder="Kanpur, UP"
                    className="w-full px-3.5 py-2 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white focus:border-accent-orange outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    प्रकार (Type)
                  </label>
                  <input
                    type="text"
                    value={positionForm.type}
                    onChange={(e) => setPositionForm({ ...positionForm, type: e.target.value })}
                    placeholder="Full Time / On-Site"
                    className="w-full px-3.5 py-2 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white focus:border-accent-orange outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  आवश्यक अनुभव (Experience)
                </label>
                <input
                  type="text"
                  value={positionForm.experience}
                  onChange={(e) => setPositionForm({ ...positionForm, experience: e.target.value })}
                  placeholder="Freshers & Experienced"
                  className="w-full px-3.5 py-2 rounded-xl bg-navy-950 border border-navy-700 text-sm text-white focus:border-accent-orange outline-none"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-navy-800 text-slate-300 hover:text-white text-xs font-bold"
              >
                रद्द करें
              </button>
              <button
                type="button"
                onClick={handleSavePosition}
                className="px-5 py-2 rounded-xl bg-accent-orange hover:bg-accent-orange-hover text-white text-xs font-bold shadow-md"
              >
                सुरक्षित करें
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
