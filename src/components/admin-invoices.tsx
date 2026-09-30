"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { FileText, Plus, X, Search, Download, Pencil, Trash2, Mail, Send, Loader2, Check, AlertCircle } from "lucide-react";

const SERVICES = [
  { value: "real-estate", label: "Real Estate Dashboard" },
  { value: "website", label: "Website Development" },
  { value: "logistics", label: "Logistics & Fleet Management" },
  { value: "salon", label: "Salon & Barber Booking" },
  { value: "school", label: "School Management System" },
  { value: "hospital", label: "Hospital Management System" },
  { value: "other", label: "Other" },
];

interface Invoice {
  id: number;
  created_at: string;
  client_name: string;
  client_email: string;
  client_phone: string | null;
  service: string;
  description: string | null;
  amount: number;
  vat_rate: number;
  vat_amount: number;
  total: number;
  invoice_number: string;
  status: string;
  payment_bank: string | null;
  payment_account_name: string | null;
  payment_account_number: string | null;
  payment_branch: string | null;
}

interface ClientOption {
  name: string;
  email: string;
  phone: string | null;
}

function formatCurrency(n: number) {
  return "KSh " + n.toLocaleString("en-KE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function generateInvoiceNumber(): string {
  const prefix = "PINV";
  const date = new Date();
  const d = date.getDate().toString().padStart(2, "0");
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const y = date.getFullYear().toString().slice(-2);
  const rand = Math.floor(Math.random() * 9999).toString().padStart(4, "0");
  return `${prefix}-${d}${m}${y}-${rand}`;
}

export default function AdminInvoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [clients, setClients] = useState<ClientOption[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState({
    client_name: "",
    client_email: "",
    client_phone: "",
    service: "website",
    description: "",
    amount: "",
    vat_rate: 16,
    payment_bank: "Equity Bank",
    payment_account_name: "Bomapulse Ventures",
    payment_account_number: "",
    payment_branch: "Nairobi",
  });

  const [formError, setFormError] = useState("");
  const [actionMessage, setActionMessage] = useState("");
  const [sendingId, setSendingId] = useState<number | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [vatInclusive, setVatInclusive] = useState(false);
  const [company, setCompany] = useState<{ company_name?: string; email?: string; phone?: string; address?: string; website?: string; tax_pin?: string; logo_url?: string; bank_name?: string; bank_account_name?: string; bank_account_number?: string; bank_branch?: string; notes?: string } | null>(null);

  useEffect(() => {
    fetchInvoices();
    fetchClients();
    fetchCompany();
  }, []);

  async function fetchInvoices() {
    setLoading(true);
    const { data, error } = await supabase
      .from("invoices")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);
    if (!error && data) setInvoices(data as Invoice[]);
    setLoading(false);
  }

  async function fetchClients() {
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("name, email, phone")
      .order("created_at", { ascending: false });
    if (!error && data) {
      const unique = data.filter((v, i, a) => a.findIndex((t) => t.email === v.email) === i);
      setClients(unique as ClientOption[]);
    }
  }

  function openNewForm() {
    setEditingId(null);
    setForm({ client_name: "", client_email: "", client_phone: "", service: "website", description: "", amount: "", vat_rate: 16, payment_bank: "Equity Bank", payment_account_name: "Bomapulse Ventures", payment_account_number: "", payment_branch: "Nairobi" });
    setVatInclusive(false);
    setFormError("");
    setFieldErrors({});
    setShowForm(true);
  }

  function openEditForm(inv: Invoice) {
    setEditingId(inv.id);
    setForm({
      client_name: inv.client_name,
      client_email: inv.client_email,
      client_phone: inv.client_phone ?? "",
      service: inv.service,
      description: inv.description ?? "",
      amount: String(inv.amount),
      vat_rate: inv.vat_rate,
      payment_bank: inv.payment_bank ?? "Equity Bank",
      payment_account_name: inv.payment_account_name ?? "Bomapulse Ventures",
      payment_account_number: inv.payment_account_number ?? "",
      payment_branch: inv.payment_branch ?? "",
    });
    setFormError("");
    setFieldErrors({});
    setShowForm(true);
  }

  const vatRate = form.vat_rate;
  const rawAmount = parseFloat(form.amount) || 0;
  const amountNum = vatInclusive ? rawAmount / (1 + vatRate / 100) : rawAmount;
  const vatAmount = amountNum * (vatRate / 100);
  const total = amountNum + vatAmount;

  async function fetchCompany() {
    const { data } = await supabase.from("company_settings").select("*").eq("id", 1).maybeSingle();
    if (data) { setCompany(data); setForm((f) => ({ ...f, payment_bank: data.bank_name || f.payment_bank, payment_account_name: data.bank_account_name || f.payment_account_name, payment_account_number: data.bank_account_number || f.payment_account_number, payment_branch: data.bank_branch || f.payment_branch })); }
  }

  async function saveInvoice() {
    const nextErrors: Record<string, string> = {};
    if (!form.client_name.trim()) {
      nextErrors.client_name = "Client name is required";
    }
    if (!form.client_email.trim()) {
      nextErrors.client_email = "Client email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.client_email.trim())) {
      nextErrors.client_email = "Please enter a valid email address";
    }
    if (form.client_phone && !/^(\+?\d{1,3}[-.\s]?)?\(?\d{3,4}\)?[-.\s]?\d{3}[-.\s]?\d{4,5}$/.test(form.client_phone)) {
      nextErrors.client_phone = "Please enter a valid phone number";
    }
    if (!form.amount) {
      nextErrors.amount = "Amount is required";
    } else if (amountNum <= 0) {
      nextErrors.amount = "Amount must be greater than 0";
    }
    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSaving(true);
    setFormError("");

    const payload = {
      client_name: form.client_name,
      client_email: form.client_email,
      client_phone: form.client_phone || null,
      service: form.service,
      description: form.description || null,
      amount: amountNum,
      vat_rate: vatRate,
      vat_amount: vatAmount,
      total,
      payment_bank: form.payment_bank || null,
      payment_account_name: form.payment_account_name || null,
      payment_account_number: form.payment_account_number || null,
      payment_branch: form.payment_branch || null,
    };

    let error;
    if (editingId) {
      ({ error } = await supabase.from("invoices").update(payload).eq("id", editingId));
    } else {
      const invoiceNumber = generateInvoiceNumber();
      ({ error } = await supabase.from("invoices").insert({
        ...payload,
        invoice_number: invoiceNumber,
        status: "pending",
      }));
    }

    if (error) {
      setFormError(error.message);
      setSaving(false);
      return;
    }

    setShowForm(false);
    setEditingId(null);
    fetchInvoices();
    setSaving(false);
  }

  async function updateStatus(id: number, status: string) {
    await supabase.from("invoices").update({ status }).eq("id", id);
    setInvoices((prev) => prev.map((inv) => (inv.id === id ? { ...inv, status } : inv)));
  }

  async function deleteInvoice(id: number) {
    if (!window.confirm("Delete this invoice?")) return;
    await supabase.from("invoices").delete().eq("id", id);
    setInvoices((prev) => prev.filter((inv) => inv.id !== id));
  }

  async function urlToDataUrl(url: string): Promise<string> {
    const res = await fetch(url);
    const blob = await res.blob();
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(String(reader.result));
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  async function buildPdf(inv: Invoice) {
    const { default: jsPDF } = await import("jspdf");
    const pdf = new jsPDF("p", "mm", "a4");
    const pageW = 182;
    const left = 14;
    const rightX = left + pageW;
    const ink = "#0f172a";
    const muted = "#6b7280";
    const brand = "#6b5cff";
    const rule = "#e5e7eb";

    let co: typeof company = company;
    if (!co) {
      try {
        const { data } = await supabase.from("company_settings").select("*").eq("id", 1).maybeSingle();
        if (data) { co = data; setCompany(data); }
      } catch { /* ignore */ }
    }

    let logoData: string | null = null;
    if (co?.logo_url) {
      try { logoData = await urlToDataUrl(co.logo_url as string); } catch { logoData = null; }
    }

    // ---------- Header ----------
    if (logoData) {
      try { pdf.addImage(logoData, "PNG", left, 12, 16, 16); } catch { logoData = null; }
    }
    if (!logoData) {
      pdf.setFillColor(brand);
      pdf.roundedRect(left, 12, 16, 16, 3, 3, "F");
      pdf.setTextColor("#ffffff");
      pdf.setFontSize(18);
      pdf.setFont("helvetica", "bold");
      pdf.text("P", left + 5.3, 23.8);
    }

    const nameX = left + 22;
    pdf.setTextColor(ink);
    pdf.setFontSize(15);
    pdf.setFont("helvetica", "bold");
    pdf.text(co?.company_name || "Pigiecore Solutions", nameX, 19);
    pdf.setFontSize(8);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(muted);
    pdf.text([co?.email || "support@pigiecore.co.ke", co?.phone || "0798118515"].join("  \u00b7  "), nameX, 24.5);

    pdf.setFontSize(8);
    pdf.setTextColor(muted);
    const rightLines = [
      co?.address || "Nairobi, Kenya",
      co?.website || "",
      co?.tax_pin ? "PIN: " + co.tax_pin : "",
    ].filter(Boolean) as string[];
    let ry = 16;
    rightLines.forEach((ln) => { pdf.text(ln, rightX, ry, { align: "right" }); ry += 4; });

    pdf.setDrawColor(rule);
    pdf.setLineWidth(0.3);
    pdf.line(left, 34, rightX, 34);

    // ---------- Title ----------
    pdf.setTextColor(ink);
    pdf.setFontSize(22);
    pdf.setFont("helvetica", "bold");
    pdf.text("INVOICE", left, 48);
    pdf.setFontSize(9);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(muted);
    pdf.text("#" + inv.invoice_number, left, 54);

    pdf.setFontSize(8);
    pdf.setTextColor(muted);
    pdf.text("INVOICE DATE", rightX, 45, { align: "right" });
    pdf.setFontSize(9);
    pdf.setTextColor(ink);
    pdf.text(formatDate(inv.created_at), rightX, 49.5, { align: "right" });

    // ---------- Bill To ----------
    let y = 66;
    pdf.setFontSize(8);
    pdf.setTextColor(muted);
    pdf.text("BILL TO", left, y);
    pdf.setTextColor(ink);
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "bold");
    pdf.text(inv.client_name, left, y + 6);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    pdf.setTextColor(muted);
    pdf.text(inv.client_email, left, y + 11.5);
    if (inv.client_phone) pdf.text(inv.client_phone, left, y + 17);

    y = 92;
    pdf.setDrawColor(rule);
    pdf.line(left, y, rightX, y);
    y += 2;

    // ---------- Items ----------
    pdf.setFillColor("#f5f3ff");
    pdf.rect(left, y, pageW, 9, "F");
    pdf.setTextColor(muted);
    pdf.setFontSize(8);
    pdf.text("DESCRIPTION", left + 4, y + 6);
    pdf.text("AMOUNT", rightX - 4, y + 6, { align: "right" });
    y += 14;

    pdf.setTextColor(ink);
    pdf.setFontSize(11);
    pdf.text(inv.description || inv.service, left + 4, y);
    pdf.text(formatCurrency(inv.amount), rightX - 4, y, { align: "right" });
    y += 7;
    pdf.setTextColor(muted);
    pdf.setFontSize(9);
    pdf.text("VAT (" + inv.vat_rate + "%)", left + 4, y);
    pdf.text(formatCurrency(inv.vat_amount), rightX - 4, y, { align: "right" });
    y += 6;
    pdf.setDrawColor(rule);
    pdf.line(left, y, rightX, y);

    // ---------- Totals ----------
    y += 5;
    const colX = rightX - 60;
    pdf.setFontSize(9);
    pdf.setTextColor(muted);
    pdf.text("Subtotal", colX, y);
    pdf.setTextColor(ink);
    pdf.text(formatCurrency(inv.amount), rightX - 4, y, { align: "right" });
    y += 5;
    pdf.setTextColor(muted);
    pdf.text("VAT (" + inv.vat_rate + "%)", colX, y);
    pdf.setTextColor(ink);
    pdf.text(formatCurrency(inv.vat_amount), rightX - 4, y, { align: "right" });
    y += 3;
    pdf.setFillColor(brand);
    pdf.roundedRect(colX, y, 60, 10, 1.5, 1.5, "F");
    pdf.setTextColor("#ffffff");
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    pdf.text("TOTAL", colX + 4, y + 6.6);
    pdf.setFontSize(11);
    pdf.text(formatCurrency(inv.total), rightX - 4, y + 6.6, { align: "right" });
    pdf.setFont("helvetica", "normal");
    y += 20;

    // ---------- Payment details ----------
    const cardH = 32;
    pdf.setFillColor("#f8fafc");
    pdf.setDrawColor(rule);
    pdf.roundedRect(left, y, pageW, cardH, 2, 2, "FD");
    pdf.setFillColor(brand);
    pdf.roundedRect(left + 5, y + 4.8, 2.5, 2.5, 0.5, 0.5, "F");
    pdf.setTextColor(ink);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(8);
    pdf.text("PAYMENT DETAILS", left + 10, y + 7.3);

    const bank = inv.payment_bank || co?.bank_name || "\u2014";
    const accName = inv.payment_account_name || co?.bank_account_name || "\u2014";
    const accNo = inv.payment_account_number || co?.bank_account_number || "\u2014";
    const branch = inv.payment_branch || co?.bank_branch || "\u2014";

    const l1 = left + 8;
    const v1 = left + 32;
    const l2 = left + 100;
    const v2 = left + 124;

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8);
    pdf.setTextColor(muted);
    pdf.text("Bank", l1, y + 15);
    pdf.text("Account Name", l2, y + 15);
    pdf.text("Account No.", l1, y + 23);
    pdf.text("Branch", l2, y + 23);

    pdf.setTextColor(ink);
    pdf.setFontSize(9);
    pdf.text(String(bank), v1, y + 15);
    pdf.text(String(accName), v2, y + 15);
    pdf.text(String(accNo), v1, y + 23);
    pdf.text(String(branch), v2, y + 23);

    // ---------- Footer ----------
    const footY = 278;
    pdf.setDrawColor(rule);
    pdf.line(left, footY, rightX, footY);
    pdf.setFontSize(8);
    pdf.setTextColor(muted);
    pdf.text([co?.company_name || "Pigiecore Solutions", co?.email || "support@pigiecore.co.ke", co?.phone || "0798118515"].join("  \u00b7  "), left + pageW / 2, footY + 6, { align: "center" });
    pdf.text(co?.notes || "Thank you for your business!", left + pageW / 2, footY + 11, { align: "center" });

    return pdf;
  }

  async function downloadPdf(inv: Invoice) {
    const pdf = await buildPdf(inv);
    pdf.save(`${inv.invoice_number}.pdf`);
  }

  async function emailInvoice(inv: Invoice) {
    setSendingId(inv.id);
    setFormError("");
    try {
      const pdf = await buildPdf(inv);
      const buffer = await pdf.output("arraybuffer");
      let binary = "";
      const bytes = new Uint8Array(buffer);
      const chunkSize = 0x8000;
      for (let i = 0; i < bytes.length; i += chunkSize) {
        binary += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + chunkSize)));
      }
      const pdfBase64 = btoa(binary);

      const res = await fetch("/api/send-invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: inv.client_email,
          subject: `Invoice ${inv.invoice_number} from Pigiecore Solutions`,
          message: `<p>Hi ${inv.client_name},</p><p>Please find your invoice <strong>${inv.invoice_number}</strong> for <strong>${formatCurrency(inv.total)}</strong> attached below.</p><p>Thank you for your business!</p><p>— Pigiecore Solutions</p>`,
          pdfBase64,
          fileName: `${inv.invoice_number}.pdf`,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to send email");
      }
      setActionMessage(`Invoice ${inv.invoice_number} sent to ${inv.client_email}`);
      updateStatus(inv.id, "sent");
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Failed to send email");
    }
    setSendingId(null);
  }

  const fieldCls = (field: string, extra = "") =>
    `block w-full rounded-lg border px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:ring-2 outline-none dark:bg-slate-800 dark:text-slate-100 ${extra} ${
      fieldErrors[field]
        ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
        : "border-slate-300 focus:border-sky-500 focus:ring-sky-500/20 dark:border-slate-700"
    }`;

  const filtered = invoices.filter(
    (inv) =>
      inv.client_name.toLowerCase().includes(search.toLowerCase()) ||
      inv.invoice_number.toLowerCase().includes(search.toLowerCase()) ||
      inv.client_email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Invoices</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Create and manage invoices</p>
        </div>
        <button onClick={openNewForm}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-sky-500/25">
          <Plus className="w-4 h-4" /> New Invoice
        </button>
      </div>

      {actionMessage && (
        <div className="mb-6 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-sm text-emerald-700 flex items-center gap-2 dark:bg-emerald-950/30 dark:border-emerald-800 dark:text-emerald-400">
          <Check className="w-4 h-4 shrink-0" /> {actionMessage}
        </div>
      )}
      {formError && (
        <div className="mb-6 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-600 flex items-center gap-2 dark:bg-red-950/30 dark:border-red-800 dark:text-red-400">
          <AlertCircle className="w-4 h-4 shrink-0" /> {formError}
        </div>
      )}

      {showForm && (
        <div className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              {editingId ? "Edit Invoice" : "New Invoice"}
            </h2>
            <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
              <X className="w-5 h-5" />
            </button>
          </div>

          {formError && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-600 dark:bg-red-950/30 dark:border-red-800 dark:text-red-400">{formError}</div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Client</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  value={form.client_name}
                  onChange={(e) => { setForm((f) => ({ ...f, client_name: e.target.value })); if (fieldErrors.client_name) setFieldErrors((er) => ({ ...er, client_name: "" })); }}
                  placeholder="Search or type client name..."
                  className={`w-full pl-9 pr-4 py-2 rounded-lg border text-sm text-slate-900 placeholder-slate-400 focus:ring-2 outline-none dark:bg-slate-800 dark:text-slate-100 ${fieldErrors.client_name ? "border-red-400 focus:border-red-500 focus:ring-red-500/20" : "border-slate-300 focus:border-sky-500 focus:ring-sky-500/20 dark:border-slate-700"}`}
                  list="client-suggestions"
                />
                <datalist id="client-suggestions">
                  {clients.map((c, i) => (
                    <option key={i} value={c.name} />
                  ))}
                </datalist>
              </div>
              {fieldErrors.client_name && (
                <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{fieldErrors.client_name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
              <input
                type="email"
                value={form.client_email}
                onChange={(e) => { setForm((f) => ({ ...f, client_email: e.target.value })); if (fieldErrors.client_email) setFieldErrors((er) => ({ ...er, client_email: "" })); }}
                className={fieldCls("client_email")}
              />
              {fieldErrors.client_email && (
                <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{fieldErrors.client_email}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Phone</label>
              <input
                type="tel"
                value={form.client_phone}
                onChange={(e) => { setForm((f) => ({ ...f, client_phone: e.target.value })); if (fieldErrors.client_phone) setFieldErrors((er) => ({ ...er, client_phone: "" })); }}
                className={fieldCls("client_phone")}
              />
              {fieldErrors.client_phone && (
                <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{fieldErrors.client_phone}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Service</label>
              <select value={form.service} onChange={(e) => setForm((f) => ({ ...f, service: e.target.value }))}
                className="block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
                {SERVICES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
              <input
                type="text"
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                className="block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                placeholder="Website redesign & deployment"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                {vatInclusive ? "Total (incl. VAT)" : "Amount (excl. VAT)"}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">KSh</span>
                <input
                  type="number"
                  value={form.amount}
                  onChange={(e) => { setForm((f) => ({ ...f, amount: e.target.value })); if (fieldErrors.amount) setFieldErrors((er) => ({ ...er, amount: "" })); }}
                  min="0"
                  step="0.01"
                  className={`block w-full pl-12 pr-3 py-2 rounded-lg border text-sm text-slate-900 placeholder-slate-400 focus:ring-2 outline-none dark:bg-slate-800 dark:text-slate-100 ${fieldErrors.amount ? "border-red-400 focus:border-red-500 focus:ring-red-500/20" : "border-slate-300 focus:border-sky-500 focus:ring-sky-500/20 dark:border-slate-700"}`}
                  placeholder="0.00"
                />
              </div>
              {fieldErrors.amount && (
                <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{fieldErrors.amount}</p>
              )}
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">VAT Rate (%)</label>
                <button
                  type="button"
                  onClick={() => setVatInclusive(!vatInclusive)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors shrink-0 ${
                    vatInclusive ? "bg-sky-500" : "bg-slate-300 dark:bg-slate-600"
                  }`}
                >
                  <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                    vatInclusive ? "translate-x-[18px]" : "translate-x-[2px]"
                  }`} />
                </button>
              </div>
              <input
                type="number"
                value={form.vat_rate}
                onChange={(e) => setForm((f) => ({ ...f, vat_rate: parseFloat(e.target.value) || 0 }))}
                min="0"
                max="100"
                step="0.5"
                className="block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />
              <p className="mt-1 text-[10px] text-slate-400 dark:text-slate-500">
                {vatInclusive ? "Amount entered includes VAT — system calculates backward" : "VAT is added on top of the amount"}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center dark:bg-emerald-950/30">
                <FileText className="w-4 h-4 text-emerald-500" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Payment Details</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Bank</label>
                <input
                  type="text"
                  value={form.payment_bank}
                  onChange={(e) => setForm((f) => ({ ...f, payment_bank: e.target.value }))}
                  className="block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Account Name</label>
                <input
                  type="text"
                  value={form.payment_account_name}
                  onChange={(e) => setForm((f) => ({ ...f, payment_account_name: e.target.value }))}
                  className="block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Account Number</label>
                <input
                  type="text"
                  value={form.payment_account_number}
                  onChange={(e) => setForm((f) => ({ ...f, payment_account_number: e.target.value }))}
                  placeholder="e.g. 011xxxxxxx"
                  className="block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Branch</label>
                <input
                  type="text"
                  value={form.payment_branch}
                  onChange={(e) => setForm((f) => ({ ...f, payment_branch: e.target.value }))}
                  className="block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800/50 mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-slate-500 dark:text-slate-400 uppercase">
                  <th className="pb-2">Description</th>
                  <th className="pb-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <td className="py-2 text-slate-900 dark:text-slate-100">{form.description || "Service fee"}</td>
                  <td className="py-2 text-right text-slate-900 dark:text-slate-100">{formatCurrency(amountNum)}</td>
                </tr>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <td className="py-2 text-slate-500 dark:text-slate-400">VAT ({vatRate}%)</td>
                  <td className="py-2 text-right text-slate-500 dark:text-slate-400">{formatCurrency(vatAmount)}</td>
                </tr>
                <tr>
                  <td className="pt-2 font-semibold text-slate-900 dark:text-white">{vatInclusive ? "Total (incl. VAT)" : "Total"}</td>
                  <td className="pt-2 text-right font-bold text-lg text-slate-900 dark:text-white">{formatCurrency(total)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button onClick={saveInvoice} disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-sky-500/25 disabled:opacity-50">
              {saving ? "Saving..." : editingId ? "Update Invoice" : "Generate Invoice"}
            </button>
            <button onClick={() => setShowForm(false)}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search invoices by client or number..."
          className="w-full max-w-xs pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" />
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {loading ? (
          <div className="p-12 text-center text-slate-500 dark:text-slate-400">Loading invoices...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-500 dark:text-slate-400">
            {search ? "No matches found." : "No invoices yet. Create your first one!"}
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {filtered.map((inv) => (
              <div key={inv.id} className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center text-white shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{inv.client_name}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{inv.invoice_number} &middot; {inv.client_email}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-slate-900 dark:text-white">{formatCurrency(inv.total)}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{formatDate(inv.created_at)}</div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    inv.status === "paid" ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400" :
                    inv.status === "cancelled" ? "bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400" :
                    "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400"
                  }`}>
                    {inv.status.charAt(0).toUpperCase() + inv.status.slice(1)}
                  </span>
                  {inv.status !== "paid" && inv.status !== "cancelled" && (
                    <>
                      <button onClick={() => updateStatus(inv.id, "paid")}
                        className="text-xs text-emerald-500 hover:text-emerald-600 font-medium">Mark Paid</button>
                      <button onClick={() => updateStatus(inv.id, "cancelled")}
                        className="text-xs text-red-500 hover:text-red-600 font-medium">Cancel</button>
                    </>
                  )}
                  <button onClick={() => openEditForm(inv)}
                    className="inline-flex items-center gap-1 text-xs text-sky-500 hover:text-sky-600 font-medium">
                    <Pencil className="w-3 h-3" /> Edit
                  </button>
                  <button onClick={() => downloadPdf(inv)}
                    className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-sky-500 font-medium">
                    <Download className="w-3 h-3" /> PDF
                  </button>
                  <button onClick={() => emailInvoice(inv)} disabled={sendingId === inv.id}
                    className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-emerald-500 font-medium disabled:opacity-50">
                    {sendingId === inv.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}
                    {sendingId === inv.id ? "Sending..." : "Email"}
                  </button>
                  <button onClick={() => deleteInvoice(inv.id)}
                    className="inline-flex items-center gap-1 text-xs text-red-400 hover:text-red-500 font-medium ml-auto">
                    <Trash2 className="w-3 h-3" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
