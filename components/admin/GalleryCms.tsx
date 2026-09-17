"use client";

import React, { useState } from "react";
import {
  GalleryContent,
  defaultGallery
} from "@/lib/content-schema";
import {
  GalleryItem,
  galleryCategories
} from "@/data/galleryData";
import {
  Camera,
  Plus,
  Trash2,
  Save,
  Upload,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Search,
  X
} from "lucide-react";

interface GalleryCmsProps {
  gallery: GalleryContent;
  setGallery: React.Dispatch<React.SetStateAction<GalleryContent>>;
  saveSection: (section: string, data: any) => Promise<void>;
  saving: boolean;
}

export default function GalleryCms({
  gallery,
  setGallery,
  saveSection,
  saving
}: GalleryCmsProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New item form state
  const [newItem, setNewItem] = useState<Partial<GalleryItem>>({
    src: "",
    category: "war-room",
    titleHi: "",
    titleEn: "",
    descHi: "",
    descEn: "",
    location: "उत्तर प्रदेश",
    tag: "अभियान"
  });

  const items = gallery.items || defaultGallery.items;
  const showContent = gallery.showImageContent ?? false;

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    onSuccess: (url: string) => void,
    fieldKey: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingField(fieldKey);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "workforce/gallery");
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.success && data.url) {
        onSuccess(data.url);
      } else {
        alert(data.error || "फोटो अपलोड विफल रहा। कृपया पुनः प्रयास करें।");
      }
    } catch (err: any) {
      alert("अपलोड त्रुटि: " + (err.message || "नेटवर्क समस्या"));
    } finally {
      setUploadingField(null);
      e.target.value = "";
    }
  };

  const handleToggleContent = () => {
    const updated = !showContent;
    setGallery({
      ...gallery,
      showImageContent: updated
    });
  };

  const handleAddItem = () => {
    if (!newItem.src) {
      alert("कृपया एक फोटो चुनें या URL दर्ज करें।");
      return;
    }
    const id = Date.now();
    const item: GalleryItem = {
      id,
      src: newItem.src || "/images/gallery/gallery-1.jpeg",
      category: (newItem.category as any) || "events",
      titleHi: newItem.titleHi || "नया चुनावी छायाचित्र",
      titleEn: newItem.titleEn || "New Campaign Photograph",
      descHi: newItem.descHi || "वर्कफोर्स इन्फोटेक के वास्तविक चुनावी अभियान का छायाचित्र।",
      descEn: newItem.descEn || "Authentic election campaign photograph by Workforce Infotech.",
      location: newItem.location || "उत्तर प्रदेश",
      tag: newItem.tag || "अभियान"
    };

    setGallery({
      ...gallery,
      items: [item, ...items]
    });

    setIsAddModalOpen(false);
    setNewItem({
      src: "",
      category: "war-room",
      titleHi: "",
      titleEn: "",
      descHi: "",
      descEn: "",
      location: "उत्तर प्रदेश",
      tag: "अभियान"
    });
  };

  const handleDeleteItem = (id: number) => {
    if (!confirm("क्या आप वाकई इस तस्वीर को गैलरी से हटाना चाहते हैं?")) return;
    setGallery({
      ...gallery,
      items: items.filter((i) => i.id !== id)
    });
  };

  const handleMoveItem = (fromIdx: number, toIdx: number) => {
    if (toIdx < 0 || toIdx >= items.length) return;
    const copy = [...items];
    const item = copy.splice(fromIdx, 1)[0];
    copy.splice(toIdx, 0, item);
    setGallery({
      ...gallery,
      items: copy
    });
  };

  const filteredItems = items.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;
    const matchesQuery =
      (item.titleHi && item.titleHi.toLowerCase().includes(q)) ||
      (item.titleEn && item.titleEn.toLowerCase().includes(q)) ||
      (item.descHi && item.descHi.toLowerCase().includes(q)) ||
      (item.descEn && item.descEn.toLowerCase().includes(q)) ||
      (item.tag && item.tag.toLowerCase().includes(q)) ||
      (item.location && item.location.toLowerCase().includes(q));
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="space-y-6 text-left">
      {/* Top Header Card with Toggle and Save */}
      <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-navy-800 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Camera className="w-5 h-5 text-accent-orange" />
              <h3 className="text-xl font-bold text-white font-hindi">संपूर्ण गैलरी प्रबंधन (Gallery CMS)</h3>
            </div>
            <p className="text-xs text-slate-400 max-w-2xl">
              वेबसाइट की फोटो गैलरी को यहाँ से प्रबंधित करें। नई तस्वीरें जोड़ें, मौजूदा तस्वीरों को संपादित करें या हटाएं, और यूज़र साइड पर टेक्स्ट विवरण दिखाने/छिपाने का टॉगल नियंत्रित करें।
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-navy-800 hover:bg-navy-750 text-accent-gold text-xs font-bold flex items-center gap-2 border border-navy-700 cursor-pointer shadow-md"
            >
              <Plus className="w-4 h-4 text-accent-orange" />
              <span>+ नई फोटो जोड़ें (Add Photo)</span>
            </button>

            <button
              type="button"
              disabled={saving}
              onClick={() => saveSection("gallery", gallery)}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-accent-orange to-accent-orange-hover hover:brightness-110 text-white font-bold text-xs sm:text-sm shadow-xl shadow-accent-orange/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? "सहेजा जा रहा है..." : "गैलरी परिवर्तन सहेजें (Save Gallery)"}</span>
            </button>
          </div>
        </div>

        {/* PROMINENT TOGGLE SWITCH: Show/Hide Image Content on User Side */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-navy-950 via-navy-920 to-navy-950 border border-navy-750 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white font-hindi">
                यूज़र साइड पर इमेज का विवरण/कंटेंट दिखाएं (Show Image Content on User Side)
              </span>
              {showContent ? (
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold">
                  दिख रहा है (Visible)
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold">
                  छिपा हुआ है (Hidden)
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 font-hindi leading-relaxed">
              {showContent
                ? "वर्तमान स्थिति: वेबसाइट पर हर फोटो के नीचे उसका शीर्षक, विवरण व लोकेशन बॉक्स प्रदर्शित हो रहा है।"
                : "वर्तमान स्थिति: वेबसाइट पर केवल स्वच्छ, उच्च-गुणवत्ता वाली तस्वीरें दिख रही हैं (विवरण बॉक्स छिपा है)। एडमिन में सारा विवरण सुरक्षित व प्रबंधित है।"}
            </p>
          </div>

          <button
            type="button"
            onClick={handleToggleContent}
            className={`relative inline-flex h-8 w-16 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              showContent ? "bg-emerald-500" : "bg-navy-700"
            }`}
            title="क्लिक करके टॉगल बदलें"
          >
            <span
              className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out flex items-center justify-center ${
                showContent ? "translate-x-8" : "translate-x-0"
              }`}
            >
              {showContent ? (
                <Eye className="w-4 h-4 text-emerald-600" />
              ) : (
                <EyeOff className="w-4 h-4 text-slate-500" />
              )}
            </span>
          </button>
        </div>

        {/* Category Filters & Search */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-2">
          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {galleryCategories.map((cat) => {
              const isSelected = activeCategory === cat.id;
              const count = cat.id === "all"
                ? items.length
                : items.filter((i) => i.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-accent-orange text-white shadow-md shadow-accent-orange/20"
                      : "bg-navy-950 text-slate-300 hover:bg-navy-800 border border-navy-800"
                  }`}
                >
                  <span>{cat.labelHi}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? "bg-black/20" : "bg-navy-900 text-slate-400"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="गैलरी में खोजें (शीर्षक, टैग, स्थान)..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-navy-950 border border-navy-750 text-xs text-white placeholder-slate-500 focus:border-accent-orange outline-none font-hindi"
            />
          </div>
        </div>
      </div>

      {/* Gallery Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const originalIdx = items.findIndex((i) => i.id === item.id);

          return (
            <div
              key={item.id}
              className="rounded-2xl bg-navy-900 border border-navy-800 overflow-hidden shadow-lg flex flex-col justify-between group hover:border-navy-700 transition"
            >
              {/* Card Media Preview Header */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-navy-950">
                <img
                  src={item.src}
                  alt={item.titleHi}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Badges Overlay */}
                <div className="absolute top-2 left-2 flex items-center gap-1.5 z-10">
                  <span className="px-2 py-0.5 rounded-md bg-navy-950/90 border border-navy-700 text-[10px] font-bold text-accent-gold uppercase">
                    {item.tag}
                  </span>
                  <span className="px-1.5 py-0.5 rounded-md bg-navy-900/85 text-[10px] font-mono text-slate-300">
                    #{item.id}
                  </span>
                </div>

                {/* Reorder Buttons Overlay */}
                <div className="absolute top-2 right-2 flex items-center gap-1 z-10 opacity-90">
                  <button
                    type="button"
                    disabled={originalIdx === 0}
                    onClick={() => handleMoveItem(originalIdx, originalIdx - 1)}
                    className="p-1 rounded bg-navy-950/80 hover:bg-navy-900 text-slate-300 hover:text-white disabled:opacity-30 cursor-pointer"
                    title="पहले लाएं"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={originalIdx === items.length - 1}
                    onClick={() => handleMoveItem(originalIdx, originalIdx + 1)}
                    className="p-1 rounded bg-navy-950/80 hover:bg-navy-900 text-slate-300 hover:text-white disabled:opacity-30 cursor-pointer"
                    title="बाद में लाएं"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Upload Change Overlay */}
                <div className="absolute bottom-2 right-2 z-10">
                  <label className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-navy-950/90 hover:bg-accent-orange text-white text-[10px] font-semibold cursor-pointer border border-navy-700 transition">
                    <Upload className="w-3 h-3" />
                    <span>{uploadingField === `item-${item.id}` ? "अपलोडिंग..." : "फोटो बदलें"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, (url) => {
                        const copy = [...items];
                        copy[originalIdx] = { ...copy[originalIdx], src: url };
                        setGallery({ ...gallery, items: copy });
                      }, `item-${item.id}`)}
                    />
                  </label>
                </div>
              </div>

              {/* Card Form Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                {/* Category & Tag Row */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 mb-0.5">कैटेगरी</label>
                    <select
                      value={item.category}
                      onChange={(e) => {
                        const copy = [...items];
                        copy[originalIdx] = { ...copy[originalIdx], category: e.target.value as any };
                        setGallery({ ...gallery, items: copy });
                      }}
                      className="w-full px-2 py-1.5 rounded-lg bg-navy-950 border border-navy-750 text-[11px] text-white"
                    >
                      <option value="war-room">वार रूम एवं डेटा</option>
                      <option value="leadership">राजनीतिक नेतृत्व</option>
                      <option value="media-studio">मीडिया व स्टूडियो</option>
                      <option value="ground-campaign">जमीनी अभियान</option>
                      <option value="events">रैलियां व सम्मेलन</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 mb-0.5">टैग (छोटा बैज)</label>
                    <input
                      type="text"
                      value={item.tag}
                      onChange={(e) => {
                        const copy = [...items];
                        copy[originalIdx] = { ...copy[originalIdx], tag: e.target.value };
                        setGallery({ ...gallery, items: copy });
                      }}
                      className="w-full px-2 py-1.5 rounded-lg bg-navy-950 border border-navy-750 text-[11px] text-white font-hindi"
                    />
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 mb-0.5">शीर्षक (हिंदी)</label>
                  <input
                    type="text"
                    value={item.titleHi}
                    onChange={(e) => {
                      const copy = [...items];
                      copy[originalIdx] = { ...copy[originalIdx], titleHi: e.target.value };
                      setGallery({ ...gallery, items: copy });
                    }}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-navy-950 border border-navy-750 text-xs text-white font-hindi font-medium"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 mb-0.5">विवरण (हिंदी)</label>
                  <textarea
                    rows={2}
                    value={item.descHi}
                    onChange={(e) => {
                      const copy = [...items];
                      copy[originalIdx] = { ...copy[originalIdx], descHi: e.target.value };
                      setGallery({ ...gallery, items: copy });
                    }}
                    className="w-full p-2 rounded-lg bg-navy-950 border border-navy-750 text-[11px] text-slate-300 font-hindi"
                  />
                </div>

                {/* Location & Delete Action */}
                <div className="pt-2 border-t border-navy-800 flex items-center justify-between gap-2">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="स्थान (Location)"
                      value={item.location || ""}
                      onChange={(e) => {
                        const copy = [...items];
                        copy[originalIdx] = { ...copy[originalIdx], location: e.target.value };
                        setGallery({ ...gallery, items: copy });
                      }}
                      className="w-full px-2 py-1 rounded bg-navy-950 border border-navy-750 text-[11px] text-sky-400 font-hindi"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteItem(item.id)}
                    className="p-1.5 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 cursor-pointer"
                    title="तस्वीर हटाएं"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Add New Image Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-navy-900 border border-navy-750 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-in fade-in">
            <div className="flex items-center justify-between border-b border-navy-800 pb-3">
              <h4 className="text-base font-bold text-white font-hindi flex items-center gap-2">
                <Camera className="w-4 h-4 text-accent-orange" />
                <span>गैलरी में नई तस्वीर जोड़ें</span>
              </h4>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {/* Image upload / src */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">तस्वीर चुनें या URL डालें *</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="/images/gallery/example.jpeg या https://..."
                    value={newItem.src || ""}
                    onChange={(e) => setNewItem({ ...newItem, src: e.target.value })}
                    className="flex-1 px-3 py-2 rounded-xl bg-navy-950 border border-navy-700 text-white font-mono text-xs"
                  />
                  <label className="px-3 py-2 rounded-xl bg-navy-800 hover:bg-navy-750 text-accent-orange font-bold cursor-pointer border border-navy-700 flex items-center gap-1">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingField === "newModal" ? "अपलोडिंग..." : "अपलोड"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, (url) => setNewItem({ ...newItem, src: url }), "newModal")}
                    />
                  </label>
                </div>
                {newItem.src && (
                  <div className="mt-2 relative aspect-video rounded-xl overflow-hidden bg-navy-950 border border-navy-800">
                    <img src={newItem.src} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* Category & Tag */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">कैटेगरी</label>
                  <select
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-navy-700 text-white"
                  >
                    <option value="war-room">वार रूम एवं डेटा</option>
                    <option value="leadership">राजनीतिक नेतृत्व</option>
                    <option value="media-studio">मीडिया व स्टूडियो</option>
                    <option value="ground-campaign">जमीनी अभियान</option>
                    <option value="events">रैलियां व सम्मेलन</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">टैग बैज</label>
                  <input
                    type="text"
                    value={newItem.tag || ""}
                    placeholder="उदा. वॉर रूम, लाइव इंटरव्यू"
                    onChange={(e) => setNewItem({ ...newItem, tag: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-navy-700 text-white font-hindi"
                  />
                </div>
              </div>

              {/* Title Hi */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">शीर्षक (हिंदी)</label>
                <input
                  type="text"
                  value={newItem.titleHi || ""}
                  placeholder="तस्वीर का मुख्य शीर्षक"
                  onChange={(e) => setNewItem({ ...newItem, titleHi: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-navy-700 text-white font-hindi"
                />
              </div>

              {/* Description Hi */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">विवरण (हिंदी)</label>
                <textarea
                  rows={2}
                  value={newItem.descHi || ""}
                  placeholder="तस्वीर का विस्तृत विवरण"
                  onChange={(e) => setNewItem({ ...newItem, descHi: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-navy-950 border border-navy-700 text-white font-hindi"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">स्थान (Location)</label>
                <input
                  type="text"
                  value={newItem.location || ""}
                  placeholder="उदा. लखनऊ / कानपुर, उत्तर प्रदेश"
                  onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-navy-700 text-white font-hindi"
                />
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
                तस्वीर जोड़ें
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
