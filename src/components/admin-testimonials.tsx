"use client";

import { useState, useEffect } from "react";
import {
  Star,
  Plus,
  X,
  Pencil,
  Trash2,
  Check,
  AlertCircle,
  Loader2,
  Quote,
} from "lucide-react";

interface Testimonial {
  id: number;
  client_name: string;
  company: string | null;
  role: string | null;
  content: string;
  rating: number;
  avatar_url: string | null;
  published: boolean;
  sort_order: number;
  created_at: string;
}

const emptyForm = {
  client_name: "",
  company: "",
  role: "",
  content: "",
  rating: 5,
  published: true,
  sort_order: 0,
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function AdminTestimonials() {
  const [items, setItems] = useState<Testimonial[]>([]);
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
    const res = await fetch("/api/testimonials");
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

  function openEditForm(item: Testimonial) {
    setEditingId(item.id);
    setForm({
      client_name: item.client_name,
      company: item.company ?? "",
      role: item.role ?? "",
      content: item.content,
      rating: item.rating,
      published: item.published,
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
    if (!form.client_name.trim()) nextErrors.client_name = "Client name is required";
    if (!form.content.trim()) nextErrors.content = "Testimonial content is required";
    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSaving(true);
    try {
      const res = editingId
        ? await fetch(`/api/testimonials/${editingId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          })
        : await fetch("/api/testimonials", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          });
      const data = await res.json();
      if (!res.ok) {
        setFormError(data.error || "Failed to save testimonial");
        setSaving(false);
        return;
      }
      setShowForm(false);
      setEditingId(null);
      setActionMessage(`Testimonial from ${data.client_name} saved.`);
      fetchItems();
    } catch {
      setFormError("Network error");
    }
    setSaving(false);
  }

  async function handleDelete(item: Testimonial) {
    if (!window.confirm(`Delete testimonial from ${item.client_name}?`)) return;
    const res = await fetch(`/api/testimonials/${item.id}`, { method: "DELETE" });
    if (res.ok) {
      setItems((prev) => prev.filter((i) => i.id !== item.id));
      setActionMessage(`Testimonial from ${item.client_name} deleted.`);
    } else {
      const data = await res.json();
      setFormError(data.error || "Failed to delete testimonial");
    }
  }

  function renderStars(rating: number) {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((n) => (
          <Star key={n} className={`w-4 h-4 ${n <= rating ? "text-amber-400 fill-amber-400" : "text-slate-300 dark:text-slate-600"}`} />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Testimonials</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Client reviews shown on the homepage</p>
        </div>
        <button onClick={openNewForm}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-sky-500/25">
          <Plus className="w-4 h-4" /> New Testimonial
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
              {editingId ? "Edit Testimonial" : "New Testimonial"}
            </h2>
            <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSave} noValidate className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Client Name</label>
                <input
                  type="text"
                  value={form.client_name}
                  onChange={(e) => { setForm((f) => ({ ...f, client_name: e.target.value })); if (fieldErrors.client_name) setFieldErrors((er) => ({ ...er, client_name: "" })); }}
                  placeholder="Jane Wanjiku"
                  className={inputCls("client_name")}
                />
                {fieldErrors.client_name && <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{fieldErrors.client_name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Company</label>
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                  placeholder="BomaPulse Ventures"
                  className={inputCls("company")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Role</label>
                <input
                  type="text"
                  value={form.role}
                  onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                  placeholder="Operations Manager"
                  className={inputCls("role")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Rating</label>
                <div className="flex items-center gap-1 py-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button key={n} type="button" onClick={() => setForm((f) => ({ ...f, rating: n }))}>
                      <Star className={`w-7 h-7 ${n <= form.rating ? "text-amber-400 fill-amber-400" : "text-slate-300 dark:text-slate-600"}`} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Testimonial</label>
              <textarea
                value={form.content}
                onChange={(e) => { setForm((f) => ({ ...f, content: e.target.value })); if (fieldErrors.content) setFieldErrors((er) => ({ ...er, content: "" })); }}
                rows={4}
                placeholder="Their software transformed how we manage our properties..."
                className={inputCls("content")}
              />
              {fieldErrors.content && <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{fieldErrors.content}</p>}
            </div>

            <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
                className="rounded border-slate-300 text-sky-500 focus:ring-sky-500"
              />
              Published (visible on homepage)
            </label>

            <div className="flex gap-3 pt-2 border-t border-slate-200 dark:border-slate-800">
              <button type="submit" disabled={saving}
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-sky-500/25 disabled:opacity-50">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                {saving ? "Saving..." : editingId ? "Update" : "Add Testimonial"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {loading ? (
          <div className="p-12 text-center text-slate-500 dark:text-slate-400">Loading testimonials...</div>
        ) : items.length === 0 ? (
          <div className="p-12 text-center text-slate-500 dark:text-slate-400">
            No testimonials yet. Add your first client review!
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 px-6 py-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center text-white font-semibold shrink-0">
                  {item.client_name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                    {item.client_name}{item.company ? ` — ${item.company}` : ""}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">{renderStars(item.rating)}</div>
                </div>
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  item.published ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400" : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                }`}>
                  {item.published ? "Published" : "Hidden"}
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
