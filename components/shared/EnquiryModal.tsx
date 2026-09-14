"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { servicesData } from "@/data/servicesData";
import { X, Send, CheckCircle2, AlertCircle, Shield } from "lucide-react";
import ConstituencySelector from "@/components/shared/ConstituencySelector";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export default function EnquiryModal({ isOpen, onClose, defaultService }: EnquiryModalProps) {
  const { t, language } = useLanguage();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    assembly: "",
    district: "",
    state: "",
    services: defaultService ? [defaultService] : [],
    campaignRequirement: "",
    preferredTime: "किसी भी समय",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleServiceToggle = (serviceTitle: string) => {
    setFormData((prev) => {
      const exists = prev.services.includes(serviceTitle);
      if (exists) {
        return { ...prev, services: prev.services.filter((s) => s !== serviceTitle) };
      } else {
        return { ...prev, services: [...prev.services, serviceTitle] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "त्रुटि: कृपया पुनः प्रयास करें।");
      }

      onClose();
      router.push("/thank-you");
    } catch (err: any) {
      setError(err.message || "सबमिट करने में त्रुटि हुई। कृपया पुनः प्रयास करें।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-navy-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-navy-900 via-navy-850 to-navy-950 border border-navy-700/80 rounded-2xl shadow-2xl p-6 sm:p-8 my-8 text-slate-100">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-500 dark:text-slate-400 hover:text-navy-950 dark:hover:text-white p-2 rounded-lg bg-slate-100 dark:bg-navy-800/80 hover:bg-slate-200 dark:hover:bg-navy-750 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-orange/10 border border-accent-orange/30 text-accent-orange text-xs font-semibold uppercase tracking-wider mb-2">
            <span>🚩 UP Election 2027</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            {t.forms.title}
          </h2>
          <p className="text-sm text-slate-300 mt-1">
            {t.forms.sub}
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-lg bg-red-950/50 border border-red-500/40 text-red-300 text-sm flex items-center gap-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {t.forms.fullName}
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="उदा. रणविजय सिंह"
                className="w-full px-3.5 py-2.5 rounded-lg bg-navy-950/70 border border-navy-700 focus:border-accent-orange focus:ring-1 focus:ring-accent-orange text-white text-sm outline-none transition"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {t.forms.phone}
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="10-अंकीय मोबाइल नंबर"
                className="w-full px-3.5 py-2.5 rounded-lg bg-navy-950/70 border border-navy-700 focus:border-accent-orange focus:ring-1 focus:ring-accent-orange text-white text-sm outline-none transition"
              />
            </div>
          </div>

          <ConstituencySelector
            selectedAssembly={formData.assembly}
            selectedDistrict={formData.district}
            onSelect={(item) => {
              setFormData((prev) => ({
                ...prev,
                assembly: item.assembly,
                district: item.district,
                state: item.state
              }));
            }}
            onAssemblyChange={(val) => setFormData((prev) => ({ ...prev, assembly: val }))}
            onDistrictChange={(val) => setFormData((prev) => ({ ...prev, district: val }))}
            assemblyLabel={t.forms.assembly}
            districtLabel={t.forms.district}
            theme="dark"
          />

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              {t.forms.servicesRequired} (एक या अधिक चुनें)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-36 overflow-y-auto pr-1">
              {servicesData.map((s) => {
                const isSelected = formData.services.includes(s.titleHi) || formData.services.includes(s.titleEn);
                return (
                  <button
                    type="button"
                    key={s.id}
                    onClick={() => handleServiceToggle(language === "hi" ? s.titleHi : s.titleEn)}
                    className={`text-left text-xs p-2 rounded-lg border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-accent-orange/15 border-accent-orange text-accent-orange dark:text-accent-gold font-bold shadow-sm"
                        : "bg-slate-100 hover:bg-slate-200/80 border-slate-200 text-slate-700 dark:bg-navy-950/50 dark:border-navy-700/60 dark:text-slate-300 dark:hover:border-slate-500"
                    }`}
                  >
                    <span className="truncate block">{language === "hi" ? s.titleHi : s.titleEn}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {t.forms.email}
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="email@domain.com"
                className="w-full px-3.5 py-2.5 rounded-lg bg-navy-950/70 border border-navy-700 focus:border-accent-orange focus:ring-1 focus:ring-accent-orange text-white text-sm outline-none transition"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {t.forms.preferredTime}
              </label>
              <select
                value={formData.preferredTime}
                onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-navy-950/70 border border-navy-700 focus:border-accent-orange focus:ring-1 focus:ring-accent-orange text-white text-sm outline-none transition"
              >
                <option value="किसी भी समय">{t.forms.anyTime}</option>
                <option value="प्रातः (9:00 AM - 12:00 PM)">{t.forms.morning}</option>
                <option value="दोपहर (12:00 PM - 4:00 PM)">{t.forms.afternoon}</option>
                <option value="शाम (4:00 PM - 8:00 PM)">{t.forms.evening}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              {t.forms.campaignRequirement}
            </label>
            <textarea
              rows={2}
              value={formData.campaignRequirement}
              onChange={(e) => setFormData({ ...formData, campaignRequirement: e.target.value })}
              placeholder="वर्तमान अभियान स्थिति, प्राथमिकता और अपेक्षित समय-सीमा..."
              className="w-full px-3.5 py-2.5 rounded-lg bg-navy-950/70 border border-navy-700 focus:border-accent-orange focus:ring-1 focus:ring-accent-orange text-white text-sm outline-none transition"
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Shield className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>100% गोपनीय एवं कानून-सम्मत डेटा प्रक्रिया।</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-accent-orange to-accent-orange-hover hover:brightness-110 text-white font-semibold text-sm shadow-lg shadow-accent-orange/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? t.forms.submitting : t.forms.submit}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
