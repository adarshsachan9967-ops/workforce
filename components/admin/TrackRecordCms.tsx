"use client";

import React, { useState } from "react";
import {
  TrackRecordContent,
  VictoryLeaderItem,
  defaultHomepage
} from "@/lib/content-schema";
import {
  Trophy,
  Plus,
  Trash2,
  Save,
  ArrowUp,
  ArrowDown,
  Search,
  CheckCircle2,
  Medal,
  Award,
  Filter,
  X
} from "lucide-react";

interface TrackRecordCmsProps {
  trackRecord: TrackRecordContent;
  setTrackRecord: (tr: TrackRecordContent) => void;
  saveSection: (section: string, data: any) => Promise<void>;
  saving: boolean;
}

export default function TrackRecordCms({
  trackRecord,
  setTrackRecord,
  saveSection,
  saving
}: TrackRecordCmsProps) {
  const [filterElection, setFilterElection] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New item form
  const [newItem, setNewItem] = useState<Partial<VictoryLeaderItem>>({
    name: "",
    roleHi: "विधानसभा प्रत्याशी",
    roleEn: "Assembly Candidate",
    constituency: "उत्तर प्रदेश",
    election: "यूपी विधानसभा चुनाव 2022",
    partyBadge: "SP",
    status: "runner-up",
    highlight: "उपविजेता"
  });

  const items = trackRecord?.items && trackRecord.items.length > 0
    ? trackRecord.items
    : defaultHomepage.trackRecord!.items;

  const handleAddItem = () => {
    if (!newItem.name?.trim()) {
      alert("कृपया नेता / प्रत्याशी का नाम दर्ज करें।");
      return;
    }

    const created: VictoryLeaderItem = {
      id: `tr-${Date.now()}`,
      name: newItem.name.trim(),
      roleHi: newItem.roleHi || "जनप्रतिनिधि / प्रत्याशी",
      roleEn: newItem.roleEn || "Elected Representative / Candidate",
      constituency: newItem.constituency || "उत्तर प्रदेश",
      election: newItem.election || "विधानसभा चुनाव 2027",
      partyBadge: newItem.partyBadge || "SP",
      status: newItem.status as "winner" | "runner-up" | "featured" || "runner-up",
      highlight: newItem.highlight || (newItem.status === "winner" ? "विजयी" : "उपविजेता"),
      votes: newItem.votes || undefined
    };

    setTrackRecord({
      ...trackRecord,
      items: [created, ...items]
    });

    setIsAddModalOpen(false);
    setNewItem({
      name: "",
      roleHi: "विधानसभा प्रत्याशी",
      roleEn: "Assembly Candidate",
      constituency: "उत्तर प्रदेश",
      election: "यूपी विधानसभा चुनाव 2022",
      partyBadge: "SP",
      status: "runner-up",
      highlight: "उपविजेता"
    });
  };

  const handleDeleteItem = (id: string, name: string) => {
    if (!confirm(`क्या आप वाकई "${name}" का कार्ड हटाना चाहते हैं?`)) return;
    setTrackRecord({
      ...trackRecord,
      items: items.filter((i) => i.id !== id)
    });
  };

  const handleMoveItem = (fromIdx: number, toIdx: number) => {
    if (toIdx < 0 || toIdx >= items.length) return;
    const copy = [...items];
    const [moved] = copy.splice(fromIdx, 1);
    copy.splice(toIdx, 0, moved);
    setTrackRecord({
      ...trackRecord,
      items: copy
    });
  };

  const handleUpdateItem = (idx: number, patch: Partial<VictoryLeaderItem>) => {
    const copy = [...items];
    copy[idx] = { ...copy[idx], ...patch };
    setTrackRecord({
      ...trackRecord,
      items: copy
    });
  };

  const filteredItems = items.filter((item) => {
    let matchesCategory = true;
    if (filterElection === "lok-sabha") {
      matchesCategory = item.election?.includes("लोकसभा") || false;
    } else if (filterElection === "vidhan-sabha") {
      matchesCategory = item.election?.includes("विधानसभा") || item.election?.includes("एमएलसी") || false;
    } else if (filterElection === "local-body") {
      matchesCategory = item.election?.includes("पंचायत") || item.election?.includes("निगम") || item.election?.includes("निकाय") || false;
    }

    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;

    const matchesQuery =
      item.name?.toLowerCase().includes(q) ||
      item.roleHi?.toLowerCase().includes(q) ||
      item.constituency?.toLowerCase().includes(q) ||
      item.election?.toLowerCase().includes(q) ||
      item.highlight?.toLowerCase().includes(q) ||
      item.status?.toLowerCase().includes(q);

    return matchesCategory && matchesQuery;
  });

  return (
    <div className="space-y-6 text-left">
      {/* Top Header Card */}
      <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-navy-800 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Trophy className="w-5 h-5 text-accent-gold" />
              <h3 className="text-xl font-bold text-white font-hindi">
                चुनावी परिणाम व ट्रैक रिकॉर्ड प्रबंधन (Track Record & Victories CMS)
              </h3>
            </div>
            <p className="text-xs text-slate-400 max-w-2xl">
              होमपेज पर प्रदर्शित होने वाले सभी विजयी सांसद, विधायक, उपविजेता प्रत्याशी, एमएलसी व स्थानीय निकाय प्रतिनिधियों के कार्ड्स को यहाँ से जोड़ें, संपादित करें या हटाएं।
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-navy-800 hover:bg-navy-750 text-accent-gold text-xs font-bold flex items-center gap-2 border border-navy-700 cursor-pointer shadow-md"
            >
              <Plus className="w-4 h-4 text-accent-orange" />
              <span>+ नया विजयी / प्रत्याशी कार्ड जोड़ें (Add Card)</span>
            </button>

            <button
              type="button"
              disabled={saving}
              onClick={() => saveSection("trackRecord", trackRecord)}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-accent-orange to-accent-orange-hover hover:brightness-110 text-white font-bold text-xs sm:text-sm shadow-xl shadow-accent-orange/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? "सहेजा जा रहा है..." : "ट्रैक रिकॉर्ड सहेजें (Save Changes)"}</span>
            </button>
          </div>
        </div>

        {/* Section Header Controls */}
        <div className="p-5 rounded-2xl bg-navy-950 border border-navy-800 space-y-4">
          <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Award className="w-4 h-4 text-accent-orange" />
            <span>अनुभाग शीर्ष विवरण (Section Headers)</span>
          </h5>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">शीर्ष बैज (हिंदी)</label>
              <input
                type="text"
                value={trackRecord.badgeHi || ""}
                onChange={(e) => setTrackRecord({ ...trackRecord, badgeHi: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-navy-700 text-xs text-white font-hindi"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Section Badge (English)</label>
              <input
                type="text"
                value={trackRecord.badgeEn || ""}
                onChange={(e) => setTrackRecord({ ...trackRecord, badgeEn: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-navy-700 text-xs text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">मुख्य हेडिंग (हिंदी)</label>
              <input
                type="text"
                value={trackRecord.headingHi || ""}
                onChange={(e) => setTrackRecord({ ...trackRecord, headingHi: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-navy-700 text-xs text-white font-hindi font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Main Heading (English)</label>
              <input
                type="text"
                value={trackRecord.headingEn || ""}
                onChange={(e) => setTrackRecord({ ...trackRecord, headingEn: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-navy-700 text-xs text-white font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">उप-विवरण (हिंदी)</label>
              <textarea
                rows={2}
                value={trackRecord.subHi || ""}
                onChange={(e) => setTrackRecord({ ...trackRecord, subHi: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-navy-900 border border-navy-700 text-xs text-slate-300 font-hindi"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Subtitle (English)</label>
              <textarea
                rows={2}
                value={trackRecord.subEn || ""}
                onChange={(e) => setTrackRecord({ ...trackRecord, subEn: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-navy-900 border border-navy-700 text-xs text-slate-300"
              />
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-2">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "सभी कार्ड्स", count: items.length },
              { id: "lok-sabha", label: "लोकसभा चुनाव", count: items.filter(i => i.election?.includes("लोकसभा")).length },
              { id: "vidhan-sabha", label: "विधानसभा व एमएलसी", count: items.filter(i => i.election?.includes("विधानसभा") || i.election?.includes("एमएलसी")).length },
              { id: "local-body", label: "नगर निकाय व पंचायत", count: items.filter(i => i.election?.includes("पंचायत") || i.election?.includes("निगम") || i.election?.includes("निकाय")).length },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilterElection(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                  filterElection === tab.id
                    ? "bg-accent-orange text-white shadow-md shadow-accent-orange/20"
                    : "bg-navy-950 text-slate-300 hover:bg-navy-850 hover:text-white border border-navy-800"
                }`}
              >
                <span>{tab.label}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/30">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          <div className="w-full md:w-72 relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="नाम, क्षेत्र, परिणाम या चुनाव खोजें..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-navy-950 border border-navy-800 text-xs text-white placeholder-slate-500 focus:border-accent-orange focus:ring-1 focus:ring-accent-orange outline-none transition"
            />
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span>कुल कार्ड्स: {filteredItems.length} प्रदर्शित (कुल {items.length})</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => {
            const actualIdx = items.findIndex((i) => (i.id && i.id === item.id) || i.name === item.name);
            return (
              <div
                key={item.id || actualIdx}
                className="p-5 rounded-2xl bg-navy-900 border border-navy-800 hover:border-navy-700 transition shadow-lg space-y-3 relative group"
              >
                {/* Card Top Strip: Position, Status Badge, Reorder, Delete */}
                <div className="flex items-center justify-between border-b border-navy-800 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-navy-950 text-accent-gold border border-navy-700">
                      #{actualIdx + 1}
                    </span>
                    {item.status === "winner" && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>WINNER (विजयी)</span>
                      </span>
                    )}
                    {item.status === "runner-up" && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-950 text-amber-400 border border-amber-500/30">
                        <Medal className="w-3 h-3" />
                        <span>उपविजेता</span>
                      </span>
                    )}
                    {item.status === "featured" && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-950 text-sky-400 border border-sky-500/30">
                        <span>मजबूत अभियान</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={actualIdx <= 0}
                      onClick={() => handleMoveItem(actualIdx, actualIdx - 1)}
                      className="p-1 rounded bg-navy-950 hover:bg-navy-800 text-slate-300 disabled:opacity-30 cursor-pointer"
                      title="ऊपर ले जाएं"
                    >
                      <ArrowUp className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      disabled={actualIdx >= items.length - 1}
                      onClick={() => handleMoveItem(actualIdx, actualIdx + 1)}
                      className="p-1 rounded bg-navy-950 hover:bg-navy-800 text-slate-300 disabled:opacity-30 cursor-pointer"
                      title="नीचे ले जाएं"
                    >
                      <ArrowDown className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteItem(item.id, item.name)}
                      className="p-1 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 cursor-pointer ml-1"
                      title="कार्ड हटाएं"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Candidate Name & Status Selector */}
                <div className="space-y-2">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">नेता / प्रत्याशी का नाम</label>
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => handleUpdateItem(actualIdx, { name: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-xl bg-navy-950 border border-navy-700 text-xs text-white font-hindi font-bold"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">परिणाम स्थिति (Status)</label>
                      <select
                        value={item.status}
                        onChange={(e) => {
                          const newStatus = e.target.value as "winner" | "runner-up" | "featured";
                          let autoHighlight = item.highlight;
                          if (newStatus === "runner-up" && (!autoHighlight || autoHighlight.includes("विजयी"))) {
                            autoHighlight = "उपविजेता";
                          } else if (newStatus === "winner" && (!autoHighlight || autoHighlight.includes("उपविजेता"))) {
                            autoHighlight = "विजयी जनप्रतिनिधि";
                          }
                          handleUpdateItem(actualIdx, { status: newStatus, highlight: autoHighlight });
                        }}
                        className={`w-full px-2.5 py-1.5 rounded-xl border text-xs font-bold cursor-pointer bg-navy-950 ${
                          item.status === "winner"
                            ? "text-emerald-400 border-emerald-500/40"
                            : item.status === "runner-up"
                            ? "text-amber-400 border-amber-500/40"
                            : "text-sky-400 border-sky-500/40"
                        }`}
                      >
                        <option value="winner">🟢 WINNER (विजयी)</option>
                        <option value="runner-up">🟡 RUNNER-UP (उपविजेता)</option>
                        <option value="featured">🔵 FEATURED (मजबूत जनअभियान)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">हाइलाइट बैज (Star Text)</label>
                      <input
                        type="text"
                        value={item.highlight || ""}
                        placeholder="उदा. उपविजेता, विजयी विधायक"
                        onChange={(e) => handleUpdateItem(actualIdx, { highlight: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-xl bg-navy-950 border border-navy-700 text-xs text-accent-gold font-hindi"
                      />
                    </div>
                  </div>
                </div>

                {/* Role Hi & En */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">पद / भूमिका (हिंदी)</label>
                    <input
                      type="text"
                      value={item.roleHi}
                      onChange={(e) => handleUpdateItem(actualIdx, { roleHi: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-xl bg-navy-950 border border-navy-700 text-xs text-slate-200 font-hindi"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Role (English)</label>
                    <input
                      type="text"
                      value={item.roleEn}
                      onChange={(e) => handleUpdateItem(actualIdx, { roleEn: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-xl bg-navy-950 border border-navy-700 text-xs text-slate-200"
                    />
                  </div>
                </div>

                {/* Constituency & Election */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">क्षेत्र / विधानसभा / लोकसभा</label>
                    <input
                      type="text"
                      value={item.constituency}
                      onChange={(e) => handleUpdateItem(actualIdx, { constituency: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-xl bg-navy-950 border border-navy-700 text-xs text-slate-200 font-hindi"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">चुनाव नाम (Election)</label>
                    <input
                      type="text"
                      value={item.election}
                      onChange={(e) => handleUpdateItem(actualIdx, { election: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-xl bg-navy-950 border border-navy-700 text-xs text-slate-200 font-hindi"
                    />
                  </div>
                </div>

                {/* Party & Votes */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">पार्टी बैज (Party)</label>
                    <input
                      type="text"
                      value={item.partyBadge || ""}
                      placeholder="उदा. BJP, SP, INC"
                      onChange={(e) => handleUpdateItem(actualIdx, { partyBadge: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-xl bg-navy-950 border border-navy-700 text-xs text-slate-200 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">प्राप्त मत (वैकल्पिक)</label>
                    <input
                      type="text"
                      value={item.votes || ""}
                      placeholder="उदा. 2,82,000+ मत"
                      onChange={(e) => handleUpdateItem(actualIdx, { votes: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-xl bg-navy-950 border border-navy-700 text-xs text-slate-200"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Save Bar */}
      <div className="sticky bottom-4 z-30 p-4 rounded-2xl bg-navy-900/95 backdrop-blur-md border border-navy-700 shadow-2xl flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-accent-gold" />
          <span className="text-xs text-slate-300 hidden sm:inline font-hindi">
            परिवर्तन करने के बाद सहेजना न भूलें।
          </span>
        </div>

        <button
          type="button"
          disabled={saving}
          onClick={() => saveSection("trackRecord", trackRecord)}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-accent-orange to-accent-orange-hover hover:brightness-110 text-white font-bold text-xs sm:text-sm shadow-xl shadow-accent-orange/20 flex items-center gap-2 cursor-pointer disabled:opacity-50 ml-auto"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? "सहेजा जा रहा है..." : "ट्रैक रिकॉर्ड सहेजें (Save Changes)"}</span>
        </button>
      </div>

      {/* Modal: Add New Victory Card */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-navy-900 border border-navy-700 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-navy-800 pb-3">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-accent-gold" />
                <h4 className="text-base font-bold text-white font-hindi">
                  + नया विजयी नेता / प्रत्याशी कार्ड जोड़ें
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg bg-navy-800 hover:bg-navy-700 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-left">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">नेता / प्रत्याशी का नाम *</label>
                <input
                  type="text"
                  placeholder="उदा. सतीश कुमार निगम"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-navy-950 border border-navy-700 text-xs text-white font-hindi font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">परिणाम स्थिति (Status)</label>
                  <select
                    value={newItem.status}
                    onChange={(e) => {
                      const st = e.target.value as "winner" | "runner-up" | "featured";
                      const hl = st === "winner" ? "विजयी जनप्रतिनिधि" : (st === "runner-up" ? "उपविजेता" : "मजबूत जनअभियान");
                      setNewItem({ ...newItem, status: st, highlight: hl });
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-navy-700 text-xs text-white cursor-pointer font-bold"
                  >
                    <option value="winner">🟢 WINNER (विजयी)</option>
                    <option value="runner-up">🟡 RUNNER-UP (उपविजेता)</option>
                    <option value="featured">🔵 FEATURED (मजबूत जनअभियान)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">हाइलाइट टैग (Star Text)</label>
                  <input
                    type="text"
                    placeholder="उदा. उपविजेता"
                    value={newItem.highlight}
                    onChange={(e) => setNewItem({ ...newItem, highlight: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-navy-700 text-xs text-accent-gold font-hindi"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">पद / भूमिका (हिंदी)</label>
                  <input
                    type="text"
                    placeholder="उदा. पूर्व विधायक — कल्याणपुर"
                    value={newItem.roleHi}
                    onChange={(e) => setNewItem({ ...newItem, roleHi: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-navy-700 text-xs text-white font-hindi"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Role (English)</label>
                  <input
                    type="text"
                    placeholder="उदा. Former MLA — Kalyanpur"
                    value={newItem.roleEn}
                    onChange={(e) => setNewItem({ ...newItem, roleEn: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-navy-700 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">क्षेत्र / विधानसभा (Constituency)</label>
                  <input
                    type="text"
                    placeholder="उदा. कल्याणपुर, कानपुर"
                    value={newItem.constituency}
                    onChange={(e) => setNewItem({ ...newItem, constituency: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-navy-700 text-xs text-white font-hindi"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">चुनाव (Election)</label>
                  <input
                    type="text"
                    placeholder="उदा. यूपी विधानसभा चुनाव 2022"
                    value={newItem.election}
                    onChange={(e) => setNewItem({ ...newItem, election: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-navy-700 text-xs text-white font-hindi"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">पार्टी बैज (Party)</label>
                  <input
                    type="text"
                    placeholder="उदा. SP / BJP / INC"
                    value={newItem.partyBadge}
                    onChange={(e) => setNewItem({ ...newItem, partyBadge: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-navy-700 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">प्राप्त मत (वैकल्पिक)</label>
                  <input
                    type="text"
                    placeholder="उदा. 2,82,000+ मत"
                    value={newItem.votes}
                    onChange={(e) => setNewItem({ ...newItem, votes: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-navy-700 text-xs text-white"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-navy-800">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-navy-800 hover:bg-navy-750 text-slate-300 text-xs font-semibold"
              >
                रद्द करें
              </button>
              <button
                type="button"
                onClick={handleAddItem}
                className="px-5 py-2 rounded-xl bg-accent-orange hover:bg-accent-orange-hover text-white text-xs font-bold shadow-lg shadow-accent-orange/20"
              >
                कार्ड जोड़ें (Save Card)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
