"use client";

import { useState, useEffect } from "react";
import {
  FileText,
  Plus,
  X,
  Pencil,
  Trash2,
  Check,
  AlertCircle,
  Loader2,
  Upload,
  ImageIcon,
  Eye,
  Sparkles,
} from "lucide-react";

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  cover_image_url: string | null;
  author: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
}

const emptyForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  cover_image_url: "",
  author: "Pigiecore Solutions",
  published: true,
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [actionMessage, setActionMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showImport, setShowImport] = useState(false);
  const [draftText, setDraftText] = useState("");

  function importDraft() {
    const lines = draftText.split(/\r?\n/).map((l) => l.trim());
    const titleLine =
      lines.find((l) => l.startsWith("#")) || lines.find((l) => l.length > 0) || "";
    const title = titleLine.replace(/^#+\s*/, "").trim();
    const body = lines.filter((l) => !l.startsWith("#"));
    const content = body.join("\n\n").replace(/\n{3,}/g, "\n\n").trim();
    const firstPara = body.find((l) => l.length > 0) || "";
    const excerpt =
      firstPara.length > 160 ? `${firstPara.slice(0, 157).trim()}…` : firstPara;

    setForm((f) => ({
      ...f,
      title: title || f.title,
      slug: slugify(title) || f.slug,
      excerpt: excerpt || f.excerpt,
      content: content || f.content,
    }));
    setFieldErrors((er) => ({ ...er, title: "" }));
    setShowImport(false);
    setDraftText("");
  }

  const inputCls = (field: string) =>
    `block w-full rounded-xl border bg-white px-4 py-3 text-slate-900 placeholder-slate-400 shadow-sm focus:ring-2 outline-none transition-all dark:bg-slate-800 dark:text-slate-100 ${
      fieldErrors[field]
        ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
        : "border-slate-300 focus:border-sky-500 focus:ring-sky-500/20 dark:border-slate-700"
    }`;

  async function fetchPosts() {
    const res = await fetch("/api/blog");
    if (res.ok) {
      const data = await res.json();
      setPosts(data);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  function openNewForm() {
    setEditingId(null);
    setForm({ ...emptyForm });
    setFieldErrors({});
    setFormError("");
    setSelectedFile(null);
    setShowForm(true);
  }

  function openEditForm(post: BlogPost) {
    setEditingId(post.id);
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt ?? "",
      content: post.content ?? "",
      cover_image_url: post.cover_image_url ?? "",
      author: post.author ?? "Pigiecore Solutions",
      published: post.published,
    });
    setFieldErrors({});
    setFormError("");
    setSelectedFile(null);
    setShowForm(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    setActionMessage("");

    const nextErrors: Record<string, string> = {};
    if (!form.title.trim()) nextErrors.title = "Title is required";
    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSaving(true);

    let coverImageUrl = form.cover_image_url;
    if (selectedFile) {
      setUploading(true);
      const fd = new FormData();
      fd.append("file", selectedFile);
      const uploadRes = await fetch("/api/upload", { method: "POST", body: fd });
      if (!uploadRes.ok) {
        const err = await uploadRes.json();
        setFormError(err.error || "Upload failed");
        setSaving(false);
        setUploading(false);
        return;
      }
      const { url } = await uploadRes.json();
      coverImageUrl = url;
      setUploading(false);
    }

    const payload = {
      title: form.title,
      slug: form.slug || slugify(form.title),
      excerpt: form.excerpt,
      content: form.content,
      cover_image_url: coverImageUrl || null,
      author: form.author,
      published: form.published,
    };

    try {
      const res = editingId
        ? await fetch(`/api/blog/${editingId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          })
        : await fetch("/api/blog", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
      const data = await res.json();
      if (!res.ok) {
        setFormError(data.error || "Failed to save post");
        setSaving(false);
        return;
      }
      setShowForm(false);
      setEditingId(null);
      setSelectedFile(null);
      setActionMessage(`Post "${data.title}" saved.`);
      fetchPosts();
    } catch {
      setFormError("Network error");
    }
    setSaving(false);
  }

  async function handleDelete(post: BlogPost) {
    if (!window.confirm(`Delete "${post.title}"?`)) return;
    const res = await fetch(`/api/blog/${post.id}`, { method: "DELETE" });
    if (res.ok) {
      setPosts((prev) => prev.filter((p) => p.id !== post.id));
      setActionMessage(`Post "${post.title}" deleted.`);
    } else {
      const data = await res.json();
      setFormError(data.error || "Failed to delete post");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Blog &amp; Insights</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Write articles and publish to /blog</p>
        </div>
        <button onClick={openNewForm}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-sky-500/25">
          <Plus className="w-4 h-4" /> New Post
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
              {editingId ? "Edit Post" : "New Post"}
            </h2>
            <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
              <X className="w-5 h-5" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setShowImport((v) => !v)}
            className="mb-6 inline-flex items-center gap-2 rounded-lg border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-600 hover:bg-sky-100 dark:border-sky-900 dark:bg-sky-950/30 dark:text-sky-400 dark:hover:bg-sky-950/50"
          >
            <Sparkles className="w-3.5 h-3.5" /> Import from AI draft
          </button>

          {showImport && (
            <div className="mb-6 rounded-xl border border-sky-200 bg-sky-50/50 p-4 dark:border-sky-900 dark:bg-sky-950/20">
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                Paste an article from Perplexity, Gemini, or Copilot. A line starting with{" "}
                <code className="text-sky-600 dark:text-sky-400">#</code> becomes the title;
                the first paragraph becomes the excerpt and slug are filled automatically.
              </p>
              <textarea
                value={draftText}
                onChange={(e) => setDraftText(e.target.value)}
                rows={6}
                placeholder={`# How custom software scales your business\n\nCustom software helps you automate repetitive tasks and grow without limits...`}
                className="block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 shadow-sm focus:ring-2 outline-none transition-all focus:border-sky-500 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={importDraft}
                  disabled={!draftText.trim()}
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-2 text-xs font-semibold text-white transition-all hover:shadow-lg hover:shadow-sky-500/25 disabled:opacity-50"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Fill the form
                </button>
                <button
                  type="button"
                  onClick={() => setShowImport(false)}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <form onSubmit={handleSave} noValidate className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => { setForm((f) => ({ ...f, title: e.target.value })); if (fieldErrors.title) setFieldErrors((er) => ({ ...er, title: "" })); }}
                placeholder="How custom software scales your business"
                className={inputCls("title")}
              />
              {fieldErrors.title && <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{fieldErrors.title}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Slug (URL)</label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm((f) => ({ ...f, slug: slugify(e.target.value) }))}
                  placeholder="auto-generated from title"
                  className={inputCls("slug")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Author</label>
                <input
                  type="text"
                  value={form.author}
                  onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
                  className={inputCls("author")}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Excerpt (short summary)</label>
                <button
                  type="button"
                  onClick={() => {
                    const firstPara = (form.content || "").split(/\n{2,}/)[0]?.trim() || "";
                    if (!firstPara) return;
                    const excerpt = firstPara.length > 160 ? `${firstPara.slice(0, 157).trim()}…` : firstPara;
                    setForm((f) => ({ ...f, excerpt }));
                  }}
                  className="text-xs font-semibold text-sky-500 hover:text-sky-600"
                >
                  Auto from content
                </button>
              </div>
              <input
                type="text"
                value={form.excerpt}
                onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                placeholder="One or two sentences shown in cards and search results"
                className={inputCls("excerpt")}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Content</label>
              <textarea
                value={form.content}
                onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                rows={10}
                placeholder="Write your article here. Blank lines become paragraphs."
                className={`${inputCls("content")} font-mono text-sm`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Cover Image</label>
              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
                  className="text-sm text-slate-500 dark:text-slate-400 file:mr-3 file:rounded-lg file:border-0 file:bg-sky-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-sky-600 hover:file:bg-sky-100 dark:file:bg-sky-950/30 dark:file:text-sky-400"
                />
                {uploading && <Loader2 className="w-4 h-4 animate-spin text-sky-500" />}
              </div>
              {form.cover_image_url && (
                <div className="mt-3 flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={form.cover_image_url} alt="Cover" className="w-24 h-16 object-cover rounded-lg" />
                  <button type="button" onClick={() => setForm((f) => ({ ...f, cover_image_url: "" }))}
                    className="text-xs text-red-500 hover:text-red-600 font-medium">Remove</button>
                </div>
              )}
            </div>

            <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
                className="rounded border-slate-300 text-sky-500 focus:ring-sky-500"
              />
              Published (visible on /blog)
            </label>

            <div className="flex gap-3 pt-2 border-t border-slate-200 dark:border-slate-800">
              <button type="submit" disabled={saving}
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-sky-500/25 disabled:opacity-50">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                {saving ? "Saving..." : editingId ? "Update Post" : "Publish Post"}
              </button>
              {editingId && form.published && (
                <a href={`/blog/${form.slug}`} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
                  <Eye className="w-4 h-4" /> View
                </a>
              )}
            </div>
          </form>
        </div>
      )}

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {loading ? (
          <div className="p-12 text-center text-slate-500 dark:text-slate-400">Loading posts...</div>
        ) : posts.length === 0 ? (
          <div className="p-12 text-center text-slate-500 dark:text-slate-400">
            No posts yet. Write your first article!
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {posts.map((post) => (
              <div key={post.id} className="flex items-center gap-4 px-6 py-4">
                {post.cover_image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={post.cover_image_url} alt="" className="w-16 h-12 object-cover rounded-lg shrink-0" />
                ) : (
                  <div className="w-16 h-12 rounded-lg bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center text-white shrink-0">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">{post.title}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    /blog/{post.slug} &middot; {formatDate(post.published_at || post.created_at)}
                  </div>
                </div>
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  post.published ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400" : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                }`}>
                  {post.published ? "Published" : "Draft"}
                </span>
                <button onClick={() => openEditForm(post)}
                  className="inline-flex items-center gap-1 text-xs text-sky-500 hover:text-sky-600 font-medium">
                  <Pencil className="w-3 h-3" /> Edit
                </button>
                <button onClick={() => handleDelete(post)}
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
