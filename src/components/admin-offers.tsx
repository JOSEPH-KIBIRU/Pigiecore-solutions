"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  X,
  Pencil,
  Trash2,
  Check,
  AlertCircle,
  Loader2,
  Sparkles,
  Eye,
} from "lucide-react";

interface Offer {
  id: number;
  title: string;
  body: string | null;
  button_text: string | null;
  button_url: string | null;
  color_from: string;
  color_to: string;
  active: boolean;
  sort_order: number;
  created_at: string;
}

const emptyForm = {
  title: "",
  body: "",
  button_text: "",
  button_url: "",
  color_from: "#e11d48",
  color_to: "#7c3aed",
  active: true,
  sort_order: 0,
};

const PALETTES: { name: string; from: string; to: string }[] = [
  { name: "Rose → Violet", from: "#e11d48", to: "#7c3aed" },
  { name: "Amber → Rose", from: "#f59e0b", to: "#e11d48" },
  { name: "Emerald → Cyan", from: "#10b981", to: "#06b6d4" },
  { name: "Sky → Indigo", from: "#0ea5e9", to: "#6366f1" },
  { name: "Violet → Fuchsia", from: "#8b5cf6", to: "#d946ef" },
  { name: "Fuchsia → Rose", from: "#d946ef", to: "#fb7185" },
  { name: "Cyan → Blue", from: "#06b6d4", to: "#2563eb" },
  { name: "Orange → Red", from: "#f97316", to: "#ef4444" },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function isValidHex(value: string) {
  return /^#[0-9a-fA-F]{6}$/.test(value);
}

export default function AdminOffers() {
  const [items, setItems] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [actionMessage, setActionMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const inputCls = (field: string) =>
    `block w-full rounded-xl border bg-white px-4 py-3 text-slate-900 placeholder-slate-400 shadow-sm focus:ring-2 outline-none transition-all dark:bg-slate-800 dark:text-slate-100 ${
      fieldErrors[field]
        ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
        : "border-slate-300 focus:border-sky-500 focus:ring-sky-500/20 dark:border-slate-700"
    }`;

  async function fetchItems() {
    const res = await fetch("/api/offers");
    if (res.ok) {
      const data = await res.json();
      setItems(data);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchItems();
  }, []);

  function openNewForm() {
    setEditingId(null);
    setForm({ ...emptyForm });
    setFieldErrors({});
    setFormError("");
    setShowForm(true);
  }

  function openEditForm(item: Offer) {
    setEditingId(item.id);
    setForm({
      title: item.title,
      body: item.body ?? "",
      button_text: item.button_text ?? "",
      button_url: item.button_url ?? "",
      color_from: item.color_from,
      color_to: item.color_to,
      active: item.active,
      sort_order: item.sort_order,
    });
    setFieldErrors({});
    setFormError("");
    setShowForm(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    setActionMessage("");

    const nextErrors: Record<string, string> = {};
    if (!form.title.trim()) nextErrors.title = "Title is required";
    if (!isValidHex(form.color_from)) nextErrors.color_from = "Enter a valid hex color";
    if (!isValidHex(form.color_to)) nextErrors.color_to = "Enter a valid hex color";
    if (form.button_url && !form.button_text) nextErrors.button_text = "Add button text for the link";
    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSaving(true);
    try {
      const res = editingId
        ? await fetch(`/api/offers/${editingId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          })
        : await fetch("/api/offers", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          });
      const data = await res.json();
      if (!res.ok) {
        setFormError(data.error || "Failed to save offer");
        setSaving(false);
        return;
      }
      setShowForm(false);
      setEditingId(null);
      setActionMessage(`Offer "${data.title}" saved.`);
      fetchItems();
    } catch {
      setFormError("Network error");
    }
    setSaving(false);
  }

  async function handleDelete(item: Offer) {
    if (!window.confirm(`Delete offer "${item.title}"?`)) return;
    const res = await fetch(`/api/offers/${item.id}`, { method: "DELETE" });
    if (res.ok) {
      setItems((prev) => prev.filter((i) => i.id !== item.id));
      setActionMessage(`Offer "${item.title}" deleted.`);
    } else {
      const data = await res.json();
      setFormError(data.error || "Failed to delete offer");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Hero Offers</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Eye-catching pop-ups shown on the hero page
          </p>
        </div>
        <button onClick={openNewForm}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-sky-500/25">
          <Plus className="w-4 h-4" /> New Offer
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
              {editingId ? "Edit Offer" : "New Offer"}
            </h2>
            <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSave} noValidate className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Offer Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => { setForm((f) => ({ ...f, title: e.target.value })); if (fieldErrors.title) setFieldErrors((er) => ({ ...er, title: "" })); }}
                  placeholder="Get 20% off your first project"
                  className={inputCls("title")}
                />
                {fieldErrors.title && <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{fieldErrors.title}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Button Text</label>
                <input
                  type="text"
                  value={form.button_text}
                  onChange={(e) => { setForm((f) => ({ ...f, button_text: e.target.value })); if (fieldErrors.button_text) setFieldErrors((er) => ({ ...er, button_text: "" })); }}
                  placeholder="Claim Offer"
                  className={inputCls("button_text")}
                />
                {fieldErrors.button_text && <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{fieldErrors.button_text}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Offer Message</label>
              <textarea
                value={form.body}
                onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
                rows={3}
                placeholder="Short, well-crafted copy — free consultation, limited-time discount, launch bonus..."
                className={inputCls("body")}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Button Link</label>
              <input
                type="text"
                value={form.button_url}
                onChange={(e) => setForm((f) => ({ ...f, button_url: e.target.value }))}
                placeholder="#contact"
                className={inputCls("button_url")}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Gradient Colors</label>
              <div className="flex flex-wrap gap-2.5">
                {PALETTES.map((p) => (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, color_from: p.from, color_to: p.to }))}
                    title={p.name}
                    className={`w-10 h-10 rounded-full ring-2 ring-offset-2 transition-all dark:ring-offset-slate-900 ${
                      form.color_from === p.from && form.color_to === p.to
                        ? "ring-sky-500 scale-110"
                        : "ring-transparent hover:scale-105"
                    }`}
                    style={{ background: `linear-gradient(135deg, ${p.from}, ${p.to})` }}
                  />
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                <div>
                  <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Start color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={form.color_from}
                      onChange={(e) => setForm((f) => ({ ...f, color_from: e.target.value }))}
                      placeholder="#e11d48"
                      className={inputCls("color_from")}
                    />
                    <input
                      type="color"
                      value={isValidHex(form.color_from) ? form.color_from : "#e11d48"}
                      onChange={(e) => setForm((f) => ({ ...f, color_from: e.target.value }))}
                      className="w-12 h-12 rounded-lg border border-slate-300 bg-transparent p-1 dark:border-slate-700"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">End color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={form.color_to}
                      onChange={(e) => setForm((f) => ({ ...f, color_to: e.target.value }))}
                      placeholder="#7c3aed"
                      className={inputCls("color_to")}
                    />
                    <input
                      type="color"
                      value={isValidHex(form.color_to) ? form.color_to : "#7c3aed"}
                      onChange={(e) => setForm((f) => ({ ...f, color_to: e.target.value }))}
                      className="w-12 h-12 rounded-lg border border-slate-300 bg-transparent p-1 dark:border-slate-700"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={form.active}
                  onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))}
                  className="rounded border-slate-300 text-sky-500 focus:ring-sky-500"
                />
                Active (shown in the hero pop-up)
              </label>
            </div>

            <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-700 p-4">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wider">
                <Eye className="w-4 h-4" /> Pop-up Preview
              </div>
              <div
                className="relative rounded-2xl shadow-2xl p-6 text-white overflow-hidden max-w-md"
                style={{ background: `linear-gradient(135deg, ${form.color_from}, ${form.color_to})` }}
              >
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/25 flex items-center justify-center text-xs font-bold">X</div>
                <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white/80 mb-2">
                  <Sparkles className="w-4 h-4" /> Special Offer
                </div>
                <div className="text-lg font-bold leading-tight">{form.title || "Offer title"}</div>
                {form.body && <div className="mt-2 text-sm text-white/90 leading-relaxed">{form.body}</div>}
                {form.button_text && (
                  <div className="inline-block mt-4 rounded-full bg-white text-slate-900 px-5 py-2 text-sm font-semibold">
                    {form.button_text}
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3 pt-2 border-t border-slate-200 dark:border-slate-800">
              <button type="submit" disabled={saving}
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-sky-500/25 disabled:opacity-50">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                {saving ? "Saving..." : editingId ? "Update" : "Add Offer"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {loading ? (
          <div className="p-12 text-center text-slate-500 dark:text-slate-400">Loading offers...</div>
        ) : items.length === 0 ? (
          <div className="p-12 text-center text-slate-500 dark:text-slate-400">
            No offers yet. Craft your first hero pop-up!
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 px-6 py-4">
                <div
                  className="w-10 h-10 rounded-xl shrink-0"
                  style={{ background: `linear-gradient(135deg, ${item.color_from}, ${item.color_to})` }}
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">{item.title}</div>
                  <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                    {formatDate(item.created_at)}{item.button_url ? ` · links to ${item.button_url}` : ""}
                  </div>
                </div>
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  item.active ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400" : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                }`}>
                  {item.active ? "Active" : "Inactive"}
                </span>
                <button onClick={() => openEditForm(item)}
                  className="inline-flex items-center gap-1 text-xs text-sky-500 hover:text-sky-600 font-medium">
                  <Pencil className="w-3 h-3" /> Edit
                </button>
                <button onClick={() => handleDelete(item)}
                  className="inline-flex items-center gap-1 text-xs text-red-400 hover:text-red-500 font-medium">
                  <Trash2 className="w-3 h-3" /> Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}