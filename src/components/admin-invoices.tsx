"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { FileText, Plus, X, Search, Download, Pencil, Trash2 } from "lucide-react";

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
  });

  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);
  const [vatInclusive, setVatInclusive] = useState(false);

  useEffect(() => {
    fetchInvoices();
    fetchClients();
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
    setForm({ client_name: "", client_email: "", client_phone: "", service: "website", description: "", amount: "", vat_rate: 16 });
    setVatInclusive(false);
    setFormError("");
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
    });
    setFormError("");
    setShowForm(true);
  }

  const vatRate = form.vat_rate;
  const rawAmount = parseFloat(form.amount) || 0;
  const amountNum = vatInclusive ? rawAmount / (1 + vatRate / 100) : rawAmount;
  const vatAmount = amountNum * (vatRate / 100);
  const total = amountNum + vatAmount;

  async function saveInvoice() {
    if (!form.client_name || !form.client_email || !form.amount) {
      setFormError("Client name, email, and amount are required");
      return;
    }
    if (amountNum <= 0) {
      setFormError("Amount must be greater than 0");
      return;
    }
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

  async function downloadPdf(inv: Invoice) {
    const { default: jsPDF } = await import("jspdf");

    const pdf = new jsPDF("p", "mm", "a4");
    const pageW = 190;
    const left = 10;
    let y = 20;

    function text(txt: string, size: number, x: number, opts?: { bold?: boolean; color?: string; align?: "left" | "right"; top?: number }) {
      pdf.setFontSize(size);
      pdf.setFont("helvetica", opts?.bold ? "bold" : "normal");
      if (opts?.color) pdf.setTextColor(opts.color);
      else pdf.setTextColor("#1e293b");
      const py = opts?.top ?? y;
      if (opts?.align === "right") {
        pdf.text(txt, x, py, { align: "right" });
      } else {
        pdf.text(txt, x, py);
      }
    }

    function line(yPos: number) {
      pdf.setDrawColor("#e2e8f0");
      pdf.setLineWidth(0.3);
      pdf.line(left, yPos, left + pageW, yPos);
    }

    // Header
    const hdrY = y;
    pdf.setFillColor("#0ea5e9");
    pdf.roundedRect(left, hdrY, 8, 8, 1, 1, "F");
    pdf.setTextColor("#ffffff");
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "bold");
    pdf.text("P", left + 2.5, hdrY + 6);
    pdf.setTextColor("#0f172a");
    pdf.setFontSize(16);
    pdf.setFont("helvetica", "bold");
    pdf.text("Pigiecore Solutions", left + 12, hdrY + 6);
    pdf.setFontSize(8);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor("#64748b");
    pdf.text("Custom Software Solutions", left + 12, hdrY + 11);

    text("INVOICE", 22, left + pageW, { bold: true, color: "#0f172a", align: "right" });
    y = hdrY + 10;
    text(`#${inv.invoice_number}`, 9, left + pageW, { color: "#64748b", align: "right" });
    y = hdrY + 20;
    line(y);
    y += 12;

    // Bill To
    const billY = y;
    text("BILL TO", 7, left, { color: "#94a3b8" });
    text(inv.client_name, 12, left, { bold: true, top: billY + 5 });
    text(inv.client_email, 10, left, { color: "#64748b", top: billY + 11 });
    let phoneOffset = 11;
    if (inv.client_phone) {
      text(inv.client_phone, 10, left, { color: "#64748b", top: billY + 17 });
      phoneOffset = 17;
    }

    text("DATE", 7, left + pageW, { color: "#94a3b8", align: "right", top: billY });
    text(formatDate(inv.created_at), 10, left + pageW, { color: "#64748b", align: "right", top: billY + 5 });
    y = billY + phoneOffset + 8;
    line(y);
    y += 6;

    // Table header
    pdf.setFillColor("#f8fafc");
    pdf.rect(left, y, pageW, 7, "F");
    text("DESCRIPTION", 7, left + 3, { color: "#94a3b8" });
    text("AMOUNT", 7, left + pageW - 3, { color: "#94a3b8", align: "right" });
    y += 10;

    // Items
    text(inv.description || inv.service, 11, left + 3);
    text(formatCurrency(inv.amount), 11, left + pageW - 3, { align: "right" });
    y += 8;
    text(`VAT (${inv.vat_rate}%)`, 10, left + 3, { color: "#64748b" });
    text(formatCurrency(inv.vat_amount), 10, left + pageW - 3, { color: "#64748b", align: "right" });
    y += 8;
    y += 4;

    // Total
    const subtotalW = 50;
    const totalX = left + pageW - subtotalW;
    text("Subtotal", 10, totalX, { color: "#64748b" });
    text(formatCurrency(inv.amount), 10, left + pageW, { color: "#64748b", align: "right" });
    y += 5;
    text(`VAT (${inv.vat_rate}%)`, 10, totalX, { color: "#64748b" });
    text(formatCurrency(inv.vat_amount), 10, left + pageW, { color: "#64748b", align: "right" });
    y += 4;
    line(y);
    y += 4;
    text("Total", 16, totalX, { bold: true, color: "#0f172a" });
    text(formatCurrency(inv.total), 16, left + pageW, { bold: true, color: "#0f172a", align: "right" });

    // Footer
    y = 270;
    line(y);
    y += 5;
    pdf.setFontSize(8);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor("#94a3b8");
    pdf.text("Pigiecore Solutions  \u00b7  hello@pigiecoresolutions.com  \u00b7  0798118515 / 0708469769", left + pageW / 2, y, { align: "center" });

    pdf.save(`${inv.invoice_number}.pdf`);
  }

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
                  onChange={(e) => setForm((f) => ({ ...f, client_name: e.target.value }))}
                  placeholder="Search or type client name..."
                  className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  list="client-suggestions"
                />
                <datalist id="client-suggestions">
                  {clients.map((c, i) => (
                    <option key={i} value={c.name} />
                  ))}
                </datalist>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
              <input
                type="email"
                value={form.client_email}
                onChange={(e) => setForm((f) => ({ ...f, client_email: e.target.value }))}
                className="block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Phone</label>
              <input
                type="tel"
                value={form.client_phone}
                onChange={(e) => setForm((f) => ({ ...f, client_phone: e.target.value }))}
                className="block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />
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
                  onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
                  min="0"
                  step="0.01"
                  className="block w-full pl-12 pr-3 py-2 rounded-lg border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  placeholder="0.00"
                />
              </div>
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
