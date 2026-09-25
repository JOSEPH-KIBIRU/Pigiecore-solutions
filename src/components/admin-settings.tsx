"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Building2, Loader2, Upload, Check, AlertCircle, X } from "lucide-react";

interface CompanySettings {
  id?: number;
  company_name: string;
  email: string;
  phone: string;
  alt_phone: string;
  address: string;
  website: string;
  tax_pin: string;
  logo_url: string;
  bank_name: string;
  bank_account_name: string;
  bank_account_number: string;
  bank_branch: string;
  invoice_prefix: string;
  quote_prefix: string;
  notes: string;
}

const EMPTY: CompanySettings = {
  company_name: "Pigiecore Solutions",
  email: "",
  phone: "",
  alt_phone: "",
  address: "",
  website: "",
  tax_pin: "",
  logo_url: "",
  bank_name: "",
  bank_account_name: "",
  bank_account_number: "",
  bank_branch: "",
  invoice_prefix: "PINV",
  quote_prefix: "PQT",
  notes: "",
};

export default function AdminSettings() {
  const [form, setForm] = useState<CompanySettings>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("company_settings")
        .select("*")
        .eq("id", 1)
        .maybeSingle();
      if (!error && data) setForm({ ...EMPTY, ...data });
      else if (error) setError("Could not load settings. Have you run the SQL migration?");
      setLoading(false);
    })();
  }, []);

  function set<K extends keyof CompanySettings>(key: K, value: CompanySettings[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function uploadLogo(file: File) {
    setUploading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (!res.ok) throw new Error("Upload failed");
      const { url } = await res.json();
      set("logo_url", url);
    } catch {
      setError("Logo upload failed");
    }
    setUploading(false);
  }

  async function save() {
    setSaving(true);
    setMessage("");
    setError("");
    const { error } = await supabase
      .from("company_settings")
      .upsert({ id: 1, ...form, updated_at: new Date().toISOString() });
    if (error) setError(error.message);
    else setMessage("Company details saved.");
    setSaving(false);
  }

  const field =
    "block w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none";
  const label = "block text-xs font-medium text-slate-400 mb-1";

  if (loading) {
    return (
      <div className="p-12 text-center text-slate-400">
        <Loader2 className="w-5 h-5 animate-spin inline mr-2" /> Loading settings...
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Company Details</h1>
        <p className="text-sm text-slate-400 mt-1">
          These details appear on your invoices and quotations.
        </p>
      </div>

      {error && (
        <p className="mb-4 flex items-center gap-2 text-sm text-red-400">
          <AlertCircle className="w-4 h-4" /> {error}
        </p>
      )}
      {message && (
        <p className="mb-4 flex items-center gap-2 text-sm text-emerald-400">
          <Check className="w-4 h-4" /> {message}
        </p>
      )}

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-5">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-xl border border-slate-700 bg-slate-800 shrink-0">
            {form.logo_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={form.logo_url} alt="Company logo" className="h-full w-full object-contain" />
            ) : (
              <Building2 className="h-8 w-8 text-slate-500" />
            )}
          </div>
          <div>
            <input
              ref={fileRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) uploadLogo(f);
              }}
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800"
            >
              {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
              {form.logo_url ? "Change logo" : "Upload logo"}
            </button>
            {form.logo_url && (
              <button
                type="button"
                onClick={() => set("logo_url", "")}
                className="ml-3 inline-flex items-center gap-1 text-xs text-slate-400 hover:text-red-400"
              >
                <X className="h-3.5 w-3.5" /> Remove
              </button>
            )}
            <p className="mt-2 text-xs text-slate-500">PNG/JPEG/WebP/SVG, up to 5MB.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className={label}>Company name</label>
            <input className={field} value={form.company_name} onChange={(e) => set("company_name", e.target.value)} />
          </div>
          <div>
            <label className={label}>Email</label>
            <input className={field} value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="support@pigiecore.co.ke" />
          </div>
          <div>
            <label className={label}>Phone</label>
            <input className={field} value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="0798118515" />
          </div>
          <div>
            <label className={label}>Alternative phone</label>
            <input className={field} value={form.alt_phone} onChange={(e) => set("alt_phone", e.target.value)} placeholder="0708769459" />
          </div>
          <div>
            <label className={label}>Tax PIN / KRA</label>
            <input className={field} value={form.tax_pin} onChange={(e) => set("tax_pin", e.target.value)} />
          </div>
          <div className="sm:col-span-2">
            <label className={label}>Address</label>
            <input className={field} value={form.address} onChange={(e) => set("address", e.target.value)} placeholder="Nairobi, Kenya" />
          </div>
          <div className="sm:col-span-2">
            <label className={label}>Website</label>
            <input className={field} value={form.website} onChange={(e) => set("website", e.target.value)} placeholder="pigiecore.co.ke" />
          </div>
        </div>

        <div className="border-t border-slate-800 pt-5">
          <h2 className="text-sm font-semibold text-white mb-4">Bank details (for invoice payments)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={label}>Bank name</label>
              <input className={field} value={form.bank_name} onChange={(e) => set("bank_name", e.target.value)} />
            </div>
            <div>
              <label className={label}>Account name</label>
              <input className={field} value={form.bank_account_name} onChange={(e) => set("bank_account_name", e.target.value)} />
            </div>
            <div>
              <label className={label}>Account number</label>
              <input className={field} value={form.bank_account_number} onChange={(e) => set("bank_account_number", e.target.value)} />
            </div>
            <div>
              <label className={label}>Branch</label>
              <input className={field} value={form.bank_branch} onChange={(e) => set("bank_branch", e.target.value)} />
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-5">
          <h2 className="text-sm font-semibold text-white mb-4">Numbering</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={label}>Invoice prefix</label>
              <input className={field} value={form.invoice_prefix} onChange={(e) => set("invoice_prefix", e.target.value)} />
            </div>
            <div>
              <label className={label}>Quotation prefix</label>
              <input className={field} value={form.quote_prefix} onChange={(e) => set("quote_prefix", e.target.value)} />
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-5">
          <label className={label}>Footer notes</label>
          <textarea
            className={`${field} resize-none`}
            rows={3}
            value={form.notes}
            onChange={(e) => set("notes", e.target.value)}
            placeholder="Thank you for your business."
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={save}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-brand to-brand-hover px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
            Save details
          </button>
        </div>
      </div>
    </div>
  );
}
