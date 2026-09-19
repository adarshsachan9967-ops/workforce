"use client";

import React, { useState, useEffect } from "react";
import {
  Upload,
  Image as ImageIcon,
  Copy,
  Check,
  Trash2,
  ExternalLink,
  RefreshCw,
  Folder,
  FileImage,
  Sparkles,
  AlertCircle
} from "lucide-react";

interface ImageKitFile {
  fileId: string;
  name: string;
  url: string;
  thumbnailUrl: string;
  height?: number;
  width?: number;
  size?: number;
  filePath?: string;
  createdAt?: string;
}

export default function MediaManagerCms() {
  const [files, setFiles] = useState<ImageKitFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const getAuthHeaders = (): Record<string, string> => {
    const token = typeof window !== "undefined" ? localStorage.getItem("wf_admin_token") || "" : "";
    const headers: Record<string, string> = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
      headers["x-admin-token"] = token;
    }
    return headers;
  };

  const fetchMedia = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/media?folder=workforce", {
        headers: getAuthHeaders(),
        credentials: "include",
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.files)) {
        setFiles(data.files);
      } else {
        setFiles([]);
      }
    } catch (err: any) {
      setError("ImageKit मीडिया लोड करने में त्रुटि।");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "workforce");

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: getAuthHeaders(),
        credentials: "include",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "अपलोड विफल रहा।");
      }

      setSuccessMsg(`"${file.name}" सफलतापूर्वक ImageKit (workforce) में अपलोड हो गया!`);
      await fetchMedia();
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err: any) {
      setError(err.message || "इमेज अपलोड करने में त्रुटि।");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const copyToClipboard = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleDelete = async (fileId: string, name: string) => {
    if (!confirm(`क्या आप इमेज "${name}" को ImageKit से हटाना चाहते हैं?`)) return;

    try {
      const res = await fetch(`/api/admin/media?fileId=${fileId}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setFiles((prev) => prev.filter((f) => f.fileId !== fileId));
      } else {
        alert(data.error || "हटाने में त्रुटि।");
      }
    } catch (err) {
      alert("इमेज हटाने में त्रुटि।");
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-navy-900 border border-navy-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-accent-orange/20 border border-accent-orange/30 text-accent-orange text-[10px] font-mono font-bold uppercase">
              IMAGEKIT CDN CLOUD
            </span>
            <span className="text-xs font-mono text-slate-400">Endpoint: https://ik.imagekit.io/avdarinn/workforce</span>
          </div>
          <h3 className="text-xl font-bold text-white font-hindi mt-1">
            इमेज व मीडिया प्रबंधन (ImageKit Media Manager)
          </h3>
          <p className="text-xs text-slate-400">
            वेबसाइट के लोगो, बैनर, उम्मीदवार फोटो और पोस्टर्स को सीधे ImageKit CDN क्लाउड में अपलोड व प्रबंधित करें।
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={fetchMedia}
            disabled={loading}
            className="p-3 rounded-xl bg-navy-800 hover:bg-navy-700 text-slate-300 hover:text-white border border-navy-700 cursor-pointer transition disabled:opacity-50"
            title="रिफ्रेश करें"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>

          <label className="px-5 py-3 rounded-xl bg-gradient-to-r from-accent-orange to-accent-orange-hover hover:brightness-110 text-white font-bold text-xs sm:text-sm shadow-xl shadow-accent-orange/20 flex items-center gap-2 cursor-pointer transition">
            <Upload className="w-4 h-4" />
            <span>{uploading ? "अपलोड हो रहा है..." : "नई इमेज अपलोड करें"}</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={uploading}
              onChange={handleFileUpload}
            />
          </label>
        </div>
      </div>

      {/* Status Messages */}
      {error && (
        <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs sm:text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400" />
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm flex items-center gap-3">
          <Sparkles className="w-5 h-5 flex-shrink-0 text-emerald-400" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Info Card */}
      <div className="p-4 rounded-2xl bg-navy-900/50 border border-navy-850 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Folder className="w-4 h-4 text-accent-gold" />
          <span>ImageKit फोल्डर: <strong className="text-white font-mono">/workforce</strong></span>
          <span className="text-slate-600">|</span>
          <span>कुल फाइलें: <strong className="text-accent-orange font-mono">{files.length}</strong></span>
        </div>
        <div className="text-[11px] text-slate-400">
          * किसी भी इमेज का URL कॉपी करके आप उसे हेडर लोगो, होमपेज या किसी भी सेक्शन में पेस्ट कर सकते हैं।
        </div>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="py-16 text-center text-slate-400">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto text-accent-orange mb-3" />
          <p className="text-sm">ImageKit मीडिया लोड हो रहा है...</p>
        </div>
      ) : files.length === 0 ? (
        <div className="p-12 rounded-3xl bg-navy-900/40 border border-dashed border-navy-800 text-center space-y-3">
          <FileImage className="w-12 h-12 mx-auto text-slate-600" />
          <h4 className="text-base font-bold text-slate-300">ImageKit फोल्डर /workforce में कोई इमेज नहीं है</h4>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            ऊपर दिए गए &quot;नई इमेज अपलोड करें&quot; बटन पर क्लिक करके वेबसाइट का लोगो, बैनर या अभियान फोटो अपलोड करें।
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {files.map((file) => {
            const isCopied = copiedId === file.fileId;
            return (
              <div
                key={file.fileId}
                className="rounded-2xl bg-navy-950 border border-navy-800 hover:border-navy-700 overflow-hidden group transition flex flex-col justify-between"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-navy-900 overflow-hidden flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={file.thumbnailUrl || file.url}
                    alt={file.name}
                    className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-navy-950/80 text-slate-300 hover:text-white backdrop-blur opacity-0 group-hover:opacity-100 transition"
                    title="पूरी इमेज देखें"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Details */}
                <div className="p-3.5 space-y-2 text-left">
                  <div className="truncate font-semibold text-xs text-white" title={file.name}>
                    {file.name}
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>{file.size ? `${(file.size / 1024).toFixed(1)} KB` : ""}</span>
                    {file.width && file.height && (
                      <span>{file.width}x{file.height}px</span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-navy-900 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => copyToClipboard(file.url, file.fileId)}
                      className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                        isCopied
                          ? "bg-emerald-600 text-white"
                          : "bg-navy-900 hover:bg-navy-850 text-slate-300 hover:text-white border border-navy-800"
                      }`}
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isCopied ? "कॉपी हो गया!" : "URL कॉपी"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(file.fileId, file.name)}
                      className="p-1.5 rounded-lg bg-navy-900 hover:bg-red-950 text-slate-500 hover:text-red-400 border border-navy-800 cursor-pointer transition"
                      title="हटाएं"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
