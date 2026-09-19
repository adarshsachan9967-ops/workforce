"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield, Lock, Mail, ArrowRight, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@workforceinfotech.com");
  const [password, setPassword] = useState("Workforce@2027");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      if (data.token) {
        try {
          localStorage.setItem("wf_admin_token", data.token);
        } catch {}
      }

      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 min-h-[85vh] flex items-center justify-center p-4 bg-navy-950 bg-grid-pattern">
      <div className="max-w-md w-full p-8 rounded-3xl bg-navy-900 border border-navy-700 shadow-2xl space-y-6 text-left">
        
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-royal-blue to-navy-950 border border-accent-orange/40 flex items-center justify-center mx-auto text-accent-orange shadow-lg">
            <Lock className="w-7 h-7" />
          </div>
          <span className="text-xs font-mono text-accent-orange font-bold tracking-widest uppercase block">
            ADMIN SECURE PORTAL
          </span>
          <h1 className="text-2xl font-black text-white font-hindi">
            कंट्रोल सेंटर लॉगिन
          </h1>
          <p className="text-xs text-slate-400">
            Workforce Infotech Campaign Management Command Center
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-navy-950 border border-navy-700 focus:border-accent-orange text-white text-sm outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Security Key / Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-navy-950 border border-navy-700 focus:border-accent-orange text-white text-sm outline-none transition font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-accent-orange to-accent-orange-hover text-white font-bold text-sm shadow-xl shadow-accent-orange/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span>{loading ? "सत्यापन हो रहा है..." : "लॉगिन करें →"}</span>
          </button>
        </form>

        <div className="pt-4 border-t border-navy-800 text-center text-xs text-slate-500">
          <Link href="/" className="hover:text-accent-gold">
            ← वेबसाइट पर वापस जाएं
          </Link>
        </div>

      </div>
    </main>
  );
}
