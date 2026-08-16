"use client";

import { useState, useEffect, useRef } from "react";
import { signIn, signOut, getCurrentUser } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import AdminInvoices from "@/components/admin-invoices";
import AdminUsers from "@/components/admin-users";
import AdminBlog from "@/components/admin-blog";
import AdminTestimonials from "@/components/admin-testimonials";
import AdminOffers from "@/components/admin-offers";
import Link from "next/link";
import {
  LayoutDashboard,
  MessageSquare,
  Mail,
  Calendar,
  ChevronDown,
  ChevronUp,
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  GripVertical,
  Search,
  X,
  AlertCircle,
  Home,
  Globe,
  Truck,
  Scissors,
  GraduationCap,
  Hospital,
  ImageIcon,
  FileText,
  Upload,
  Loader2,
  User as UserIcon,
  Newspaper,
  Quote as QuoteIcon,
  Megaphone,
  Menu,
} from "lucide-react";

interface Submission {
  id: number;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  budget: string | null;
  timeline: string | null;
  message: string;
  status: string | null;
  remarks: string | null;
}

interface Template {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  description: string;
  image_url: string | null;
  url: string | null;
  category: string;
  icon_name: string;
  gradient_from: string;
  gradient_to: string;
  preview_gradient: string;
  sort_order: number;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Home,
  Globe,
  Truck,
  Scissors,
  GraduationCap,
  Hospital,
};

const CATEGORIES = [
  { value: "real-estate", label: "Real Estate" },
  { value: "website", label: "Website Development" },
  { value: "logistics", label: "Logistics & Fleet" },
  { value: "salon", label: "Salon & Barber" },
  { value: "school", label: "School Management" },
  { value: "hospital", label: "Hospital Management" },
];

const ICON_OPTIONS = ["Home", "Globe", "Truck", "Scissors", "GraduationCap", "Hospital"];

const GRADIENT_PRESETS = [
  { value: "from-sky-400 via-blue-500 to-indigo-600", label: "Sky Blue", from: "sky-500", to: "blue-600" },
  { value: "from-violet-400 via-purple-500 to-fuchsia-600", label: "Purple", from: "violet-500", to: "purple-600" },
  { value: "from-emerald-400 via-teal-500 to-cyan-600", label: "Emerald", from: "emerald-500", to: "teal-600" },
  { value: "from-amber-400 via-orange-500 to-red-500", label: "Amber", from: "amber-500", to: "orange-600" },
  { value: "from-rose-400 via-pink-500 to-purple-600", label: "Rose", from: "rose-500", to: "pink-600" },
  { value: "from-teal-400 via-cyan-500 to-sky-600", label: "Teal", from: "teal-500", to: "cyan-600" },
];

const CONTACT_SERVICES: Record<string, string> = {
  "custom-software": "Custom business software",
  "saas-platform": "SaaS platform",
  "web-application": "Web application",
  "automation-integration": "Automation/integration",
  "other": "Other",
};

const TIMELINE_LABELS: Record<string, string> = {
  asap: "As soon as possible",
  "1-2-months": "1 – 2 months",
  "3-6-months": "3 – 6 months",
  "6-plus-months": "6+ months",
};

const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "templates", label: "Templates", icon: ImageIcon },
  { key: "invoices", label: "Invoices", icon: FileText },
  { key: "users", label: "Users", icon: UserIcon },
  { key: "blog", label: "Blog", icon: Newspaper },
  { key: "testimonials", label: "Testimonials", icon: QuoteIcon },
  { key: "offers", label: "Hero Offers", icon: Megaphone },
] as const;

function serviceLabel(value: string | null) {
  return (
    CONTACT_SERVICES[value ?? ""] ??
    CATEGORIES.find((c) => c.value === value)?.label ??
    value ??
    "\u2014"
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const emptyTemplate = {
  name: "",
  description: "",
  image_url: "",
  url: "",
  category: "real-estate",
  icon_name: "Home",
  gradient_from: "sky-500",
  gradient_to: "blue-600",
  preview_gradient: "from-sky-400 via-blue-500 to-indigo-600",
  sort_order: 0,
};

const IDLE_TIMEOUT_MS = 120000;
const WARN_BEFORE_MS = 30000;

export default function AdminPage() {
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"dashboard" | "templates" | "invoices" | "users" | "blog" | "testimonials" | "offers">("dashboard");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginFieldErrors, setLoginFieldErrors] = useState<Record<string, string>>({});
  const [showLogoutWarn, setShowLogoutWarn] = useState(false);
  const [logoutCountdown, setLogoutCountdown] = useState<number | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [subLoading, setSubLoading] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [templates, setTemplates] = useState<Template[]>([]);
  const [tplLoading, setTplLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ ...emptyTemplate });
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const inactivityRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const warnActiveRef = useRef(false);

  function clearCountdown() {
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
    }
  }

  async function doLogout() {
    warnActiveRef.current = false;
    clearCountdown();
    setShowLogoutWarn(false);
    setLogoutCountdown(null);
    await signOut().catch(() => {});
    setUser(null);
    setSubmissions([]);
    setTemplates([]);
  }

  function cancelLogout() {
    warnActiveRef.current = false;
    clearCountdown();
    setShowLogoutWarn(false);
    setLogoutCountdown(null);
    resetInactivityTimer();
  }

  function resetInactivityTimer() {
    if (inactivityRef.current) clearTimeout(inactivityRef.current);
    inactivityRef.current = setTimeout(() => {
      warnActiveRef.current = true;
      setShowLogoutWarn(true);
      setLogoutCountdown(Math.round(WARN_BEFORE_MS / 1000));
      countdownRef.current = setInterval(() => {
        setLogoutCountdown((c) => {
          if (c === null || c <= 1) {
            clearCountdown();
            doLogout();
            return null;
          }
          return c - 1;
        });
      }, 1000);
    }, IDLE_TIMEOUT_MS - WARN_BEFORE_MS);
  }

  useEffect(() => {
    getCurrentUser().then((u) => {
      setUser(u);
      setLoading(false);
      if (u) {
        fetchSubmissions();
        fetchTemplates();
        resetInactivityTimer();
      }
    });
    return () => {
      if (inactivityRef.current) clearTimeout(inactivityRef.current);
      clearCountdown();
    };
  }, []);

  useEffect(() => {
    if (!user) return;
    const events = ["mousedown", "keydown", "scroll", "touchstart", "mousemove"] as const;
    function handleActivity() {
      if (warnActiveRef.current) cancelLogout();
      else resetInactivityTimer();
    }
    events.forEach((e) => window.addEventListener(e, handleActivity));
    return () => events.forEach((e) => window.removeEventListener(e, handleActivity));
  }, [user]);

  async function fetchSubmissions() {
    setSubLoading(true);
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);
    if (!error && data) setSubmissions(data as Submission[]);
    setSubLoading(false);
  }

  async function fetchTemplates() {
    setTplLoading(true);
    const res = await fetch("/api/templates");
    if (res.ok) {
      const data = await res.json();
      setTemplates(data);
    }
    setTplLoading(false);
  }

  async function updateSubmission(id: number, updates: Record<string, string | null>) {
    const { error } = await supabase.from("contact_submissions").update(updates).eq("id", id);
    if (!error) {
      setSubmissions((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    const nextErrors: Record<string, string> = {};
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginEmail.trim());
    if (!loginEmail.trim()) {
      nextErrors.email = "Email address is required";
    } else if (!emailValid) {
      nextErrors.email = "Please enter a valid email address";
    }
    if (!loginPassword) {
      nextErrors.password = "Password is required";
    }
    setLoginFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    try {
      const rl = await fetch("/api/login-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail.trim() }),
      });
      if (rl.status === 429) {
        const data = await rl.json().catch(() => null);
        setLoginError(data?.error || "Too many login attempts. Please try again later.");
        return;
      }

      await signIn(loginEmail, loginPassword);
      const u = await getCurrentUser();
      if (u) {
        setUser(u);
        fetchSubmissions();
        fetchTemplates();
        resetInactivityTimer();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setLoginError(msg);
    }
  }

  function openAddForm() {
    setForm({ ...emptyTemplate });
    setEditingId(null);
    setFormError("");
    setSelectedFile(null);
    setShowForm(true);
  }

  function openEditForm(tpl: Template) {
    setForm({
      name: tpl.name,
      description: tpl.description,
      image_url: tpl.image_url ?? "",
      url: tpl.url ?? "",
      category: tpl.category,
      icon_name: tpl.icon_name,
      gradient_from: tpl.gradient_from,
      gradient_to: tpl.gradient_to,
      preview_gradient: tpl.preview_gradient,
      sort_order: tpl.sort_order,
    });
    setEditingId(tpl.id);
    setFormError("");
    setSelectedFile(null);
    setShowForm(true);
  }

  async function saveTemplate() {
    if (!form.name || !form.description) {
      setFormError("Name and description are required");
      return;
    }
    setSaving(true);
    setFormError("");

    let imageUrl = form.image_url;

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
      imageUrl = url;
      setUploading(false);
    }

    const body = {
      ...form,
      image_url: imageUrl || null,
      url: form.url || null,
      sort_order: Number(form.sort_order) || 0,
    };

    try {
      if (editingId) {
        const res = await fetch(`/api/templates/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (!res.ok) {
          const err = await res.json();
          setFormError(err.error || "Failed to update");
          setSaving(false);
          return;
        }
      } else {
        const res = await fetch("/api/templates", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (!res.ok) {
          const err = await res.json();
          setFormError(err.error || "Failed to create");
          setSaving(false);
          return;
        }
      }
      setShowForm(false);
      setSelectedFile(null);
      fetchTemplates();
    } catch {
      setFormError("Network error");
    }
    setSaving(false);
  }

  async function deleteTemplate(id: number) {
    if (!window.confirm("Delete this template?")) return;
    const res = await fetch(`/api/templates/${id}`, { method: "DELETE" });
    if (res.ok) fetchTemplates();
  }

  function setGradientPreset(preset: (typeof GRADIENT_PRESETS)[number]) {
    setForm((f) => ({
      ...f,
      preview_gradient: preset.value,
      gradient_from: preset.from,
      gradient_to: preset.to,
    }));
  }

  const filteredSubmissions = submissions.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.phone ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.service ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.budget ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.timeline ?? "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const monthCount = submissions.filter((s) => {
    const d = new Date(s.created_at);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="text-slate-500 dark:text-slate-400">Loading...</div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center py-20">
        <div className="w-full max-w-md px-4">
          <div className="mb-8 text-center">
            <div className="w-14 h-14 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-sky-500/25">
              <span className="text-white font-bold text-2xl">P</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome Back</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Sign in to manage your site
            </p>
          </div>

          <form onSubmit={handleLogin} noValidate className="space-y-4 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email</label>
              <input type="email" id="email" value={loginEmail}
                onChange={(e) => { setLoginEmail(e.target.value); if (loginFieldErrors.email) setLoginFieldErrors((er) => ({ ...er, email: "" })); }}
                className={`block w-full rounded-xl border bg-white px-4 py-3 text-slate-900 placeholder-slate-400 shadow-sm focus:ring-2 outline-none transition-all dark:bg-slate-800 dark:text-slate-100 ${
                  loginFieldErrors.email
                    ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                    : "border-slate-300 focus:border-sky-500 focus:ring-sky-500/20 dark:border-slate-700"
                }`}
                placeholder="admin@pigiecore.com" />
              {loginFieldErrors.email && (
                <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{loginFieldErrors.email}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Password</label>
              <input type="password" id="password" value={loginPassword}
                onChange={(e) => { setLoginPassword(e.target.value); if (loginFieldErrors.password) setLoginFieldErrors((er) => ({ ...er, password: "" })); }}
                className={`block w-full rounded-xl border bg-white px-4 py-3 text-slate-900 placeholder-slate-400 shadow-sm focus:ring-2 outline-none transition-all dark:bg-slate-800 dark:text-slate-100 ${
                  loginFieldErrors.password
                    ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                    : "border-slate-300 focus:border-sky-500 focus:ring-sky-500/20 dark:border-slate-700"
                }`}
                placeholder="Enter your password" />
              {loginFieldErrors.password && (
                <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{loginFieldErrors.password}</p>
              )}
            </div>
            {loginError && (
              <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> {loginError}
              </p>
            )}
            <button type="submit"
              className="w-full inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-sky-500/25">
              Sign In
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-400 dark:text-slate-500">
            <Link href="/" className="hover:text-sky-500 transition-colors">← Back to homepage</Link>
          </p>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex">
      <aside className="w-64 shrink-0 bg-white border-r border-slate-200 dark:bg-slate-900 dark:border-slate-800 hidden lg:flex flex-col">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-base">P</span>
            </div>
            <span className="font-bold text-slate-900 dark:text-white">PigieCore</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <button key={item.key} onClick={() => setActiveTab(item.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${
                  activeTab === item.key
                    ? "bg-sky-50 text-sky-600 dark:bg-sky-950/30 dark:text-sky-400"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                }`}>
                <Icon className="w-5 h-5" /> {item.label}
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <div className="text-sm text-slate-500 dark:text-slate-400 mb-2 truncate">{user.email}</div>
          <button onClick={async () => { await signOut(); setUser(null); }}
            className="w-full text-sm text-slate-500 hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400 transition-colors text-left">
            Sign Out
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <div className="lg:hidden bg-white border-b border-slate-200 dark:bg-slate-900 dark:border-slate-800 p-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="font-bold text-slate-900 dark:text-white text-sm">PigieCore</span>
          </Link>
          <button
            onClick={() => setMobileNavOpen((v) => !v)}
            aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileNavOpen}
            className="inline-flex items-center justify-center w-10 h-10 rounded-xl text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
          >
            {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        {mobileNavOpen && (
          <nav className="lg:hidden bg-white border-b border-slate-200 dark:bg-slate-900 dark:border-slate-800 px-3 pb-4 space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <button key={item.key}
                  onClick={() => { setActiveTab(item.key); setMobileNavOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${
                    activeTab === item.key
                      ? "bg-sky-50 text-sky-600 dark:bg-sky-950/30 dark:text-sky-400"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                  }`}>
                  <Icon className="w-5 h-5" /> {item.label}
                </button>
              );
            })}
            <div className="pt-3 mt-1 border-t border-slate-200 dark:border-slate-800 px-4 flex items-center justify-between">
              <span className="text-sm text-slate-500 dark:text-slate-400 truncate max-w-[60%]">{user.email}</span>
              <button onClick={async () => { await signOut(); setUser(null); setMobileNavOpen(false); }}
                className="text-sm text-slate-500 hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400 transition-colors">
                Sign Out
              </button>
            </div>
          </nav>
        )}

        <div className="p-4 sm:p-6 lg:p-8">
          {activeTab === "dashboard" && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage your enquiries</p>
                </div>
                <button onClick={fetchSubmissions} disabled={subLoading}
                  className="text-sm text-sky-500 hover:text-sky-600 font-medium disabled:opacity-50">
                  {subLoading ? "Refreshing..." : "Refresh"}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-sky-50 flex items-center justify-center dark:bg-sky-950/30">
                      <MessageSquare className="w-5 h-5 text-sky-500" />
                    </div>
                    <div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">Total Enquiries</div>
                      <div className="text-2xl font-bold text-slate-900 dark:text-white">{submissions.length}</div>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center dark:bg-emerald-950/30">
                      <Calendar className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">This Month</div>
                      <div className="text-2xl font-bold text-slate-900 dark:text-white">{monthCount}</div>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center dark:bg-amber-950/30">
                      <Mail className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">Unread</div>
                      <div className="text-2xl font-bold text-slate-900 dark:text-white">{submissions.length}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search enquiries..."
                  className="w-full max-w-xs pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" />
              </div>

              <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                {subLoading && submissions.length === 0 ? (
                  <div className="p-12 text-center text-slate-500 dark:text-slate-400">Loading enquiries...</div>
                ) : filteredSubmissions.length === 0 ? (
                  <div className="p-12 text-center text-slate-500 dark:text-slate-400">
                    {searchQuery ? "No matches found." : "No enquiries yet. Make sure the contact_submissions table exists in PostgreSQL."}
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredSubmissions.map((sub) => (
                      <div key={sub.id}>
                        <button onClick={() => setExpandedId(expandedId === sub.id ? null : sub.id)}
                          className="w-full flex items-center gap-4 px-6 py-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center text-white font-semibold text-sm shrink-0">
                            {sub.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">{sub.name}</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 truncate">{sub.email}</div>
                          </div>
                          <div className="hidden sm:flex items-center gap-2">
                            <span className="text-xs text-slate-400 dark:text-slate-500">
                              {serviceLabel(sub.service)}
                            </span>
                            {sub.status && sub.status !== "new" && (
                              <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${
                                sub.status === "replied_email" ? "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400" :
                                sub.status === "called" ? "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400" :
                                "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400"
                              }`}>
                                {sub.status === "replied_email" ? "Emailed" : sub.status === "called" ? "Called" : "Responded"}
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-400 dark:text-slate-500 shrink-0">
                            {formatDate(sub.created_at)}
                          </div>
                          {expandedId === sub.id ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                        </button>
                        {expandedId === sub.id && (
                          <div className="px-6 pb-4 pl-[60px] space-y-3">
                            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                              {sub.message}
                            </div>
                            {sub.phone && (
                              <div className="text-xs text-slate-500 dark:text-slate-400">
                                Phone: <a href={`tel:${sub.phone}`} className="text-sky-500 hover:text-sky-600">{sub.phone}</a>
                              </div>
                            )}
                            {sub.budget && (
                              <div className="text-xs text-slate-500 dark:text-slate-400">
                                Estimated Budget: {sub.budget}
                              </div>
                            )}
                            {sub.timeline && (
                              <div className="text-xs text-slate-500 dark:text-slate-400">
                                Timeline: {TIMELINE_LABELS[sub.timeline] ?? sub.timeline}
                              </div>
                            )}
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Status:</span>
                              <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
                                sub.status === "replied_email"
                                  ? "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400"
                                  : sub.status === "called"
                                  ? "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400"
                                  : sub.status === "responded"
                                  ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400"
                                  : "bg-slate-50 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                              }`}>
                                {sub.status === "replied_email" ? "Reply via Email" : sub.status === "called" ? "Called" : sub.status === "responded" ? "Responded" : "New"}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <button onClick={() => updateSubmission(sub.id, { status: "replied_email" })}
                                className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-all ${
                                  sub.status === "replied_email"
                                    ? "bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-950/30 dark:border-blue-700 dark:text-blue-400"
                                    : "border-slate-200 text-slate-500 hover:border-blue-300 hover:text-blue-500 dark:border-slate-700 dark:text-slate-400"
                                }`}>
                                <Mail className="w-3.5 h-3.5" /> Reply via Email
                              </button>
                              <button onClick={() => updateSubmission(sub.id, { status: "called" })}
                                className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-all ${
                                  sub.status === "called"
                                    ? "bg-amber-50 border-amber-200 text-amber-600 dark:bg-amber-950/30 dark:border-amber-700 dark:text-amber-400"
                                    : "border-slate-200 text-slate-500 hover:border-amber-300 hover:text-amber-500 dark:border-slate-700 dark:text-slate-400"
                                }`}>
                                Called
                              </button>
                              <button onClick={() => updateSubmission(sub.id, { status: "responded" })}
                                className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-all ${
                                  sub.status === "responded"
                                    ? "bg-emerald-50 border-emerald-200 text-emerald-600 dark:bg-emerald-950/30 dark:border-emerald-700 dark:text-emerald-400"
                                    : "border-slate-200 text-slate-500 hover:border-emerald-300 hover:text-emerald-500 dark:border-slate-700 dark:text-slate-400"
                                }`}>
                                Responded
                              </button>
                              <button onClick={() => updateSubmission(sub.id, { status: null })}
                                className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-all ${
                                  !sub.status
                                    ? "bg-slate-50 border-slate-300 text-slate-600 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-300"
                                    : "border-slate-200 text-slate-500 hover:border-slate-300 dark:border-slate-700 dark:text-slate-400"
                                }`}>
                                Mark New
                              </button>
                            </div>
                            <div>
                              <label className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-1">Remarks</label>
                              <input
                                type="text"
                                defaultValue={sub.remarks ?? ""}
                                onBlur={(e) => updateSubmission(sub.id, { remarks: e.target.value || null })}
                                placeholder="Add internal notes..."
                                className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-700 placeholder-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:placeholder-slate-500"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "templates" && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Templates</h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage your showcase templates</p>
                </div>
                <button onClick={openAddForm}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-sky-500/25">
                  <Plus className="w-4 h-4" /> Add Template
                </button>
              </div>

              {showForm && (
                <div className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                      {editingId ? "Edit Template" : "New Template"}
                    </h2>
                    <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {formError && (
                    <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-600 flex items-center gap-2 dark:bg-red-950/30 dark:border-red-800 dark:text-red-400">
                      <AlertCircle className="w-4 h-4" /> {formError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Name</label>
                      <input type="text" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        className="block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                        placeholder="e.g. Real Estate Dashboard" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Category</label>
                      <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                        className="block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
                        {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
                      <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={3}
                        className="block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none resize-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                        placeholder="Describe the template..." />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Icon</label>
                      <select value={form.icon_name} onChange={(e) => setForm((f) => ({ ...f, icon_name: e.target.value }))}
                        className="block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
                        {ICON_OPTIONS.map((icon) => <option key={icon} value={icon}>{icon}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Image</label>
                      <div className="flex items-start gap-4">
                        {(selectedFile ? URL.createObjectURL(selectedFile) : form.image_url) ? (
                          <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 shrink-0 bg-slate-100 dark:bg-slate-800">
                            <img
                              src={selectedFile ? URL.createObjectURL(selectedFile) : form.image_url}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => { setSelectedFile(null); setForm((f) => ({ ...f, image_url: "" })); }}
                              className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-slate-900/60 text-white flex items-center justify-center hover:bg-slate-900/80"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <div className="w-24 h-24 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center shrink-0 bg-slate-50 dark:bg-slate-800/50">
                            <ImageIcon className="w-8 h-8 text-slate-300 dark:text-slate-600" />
                          </div>
                        )}
                        <div className="flex-1">
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/png,image/jpeg,image/webp,image/gif"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                setSelectedFile(file);
                                setForm((f) => ({ ...f, image_url: "" }));
                              }
                            }}
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
                          >
                            <Upload className="w-4 h-4" />
                            {selectedFile ? "Change File" : "Upload Image"}
                          </button>
                          <p className="mt-1.5 text-xs text-slate-400 dark:text-slate-500">
                            PNG, JPEG, WebP or GIF. Max 5MB.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Demo URL</label>
                      <input type="url" value={form.url} onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))}
                        className="block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                        placeholder="https://demo.example.com" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Gradient Preset</label>
                      <div className="flex flex-wrap gap-2">
                        {GRADIENT_PRESETS.map((preset) => (
                          <button key={preset.value} onClick={() => setGradientPreset(preset)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                              form.preview_gradient === preset.value
                                ? "border-sky-500 ring-2 ring-sky-500/20 text-sky-600 dark:text-sky-400"
                                : "border-slate-200 text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:text-slate-400"
                            }`}>
                            {preset.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Sort Order</label>
                      <input type="number" value={form.sort_order} onChange={(e) => setForm((f) => ({ ...f, sort_order: Number(e.target.value) || 0 }))}
                        className="block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                    <button onClick={saveTemplate} disabled={saving || uploading}
                      className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-sky-500/25 disabled:opacity-50">
                      {uploading ? "Uploading..." : saving ? "Saving..." : editingId ? "Update Template" : "Create Template"}
                    </button>
                    <button onClick={() => setShowForm(false)}
                      className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {tplLoading && templates.length === 0 ? (
                <div className="text-center py-12 text-slate-500 dark:text-slate-400">Loading templates...</div>
              ) : templates.length === 0 ? (
                <div className="text-center py-12 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                  <ImageIcon className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-500 dark:text-slate-400 mb-4">No templates yet. Add your first one!</p>
                  <button onClick={openAddForm}
                    className="inline-flex items-center gap-2 rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-white hover:bg-sky-600">
                    <Plus className="w-4 h-4" /> Add Template
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {templates.map((tpl) => {
                    const Icon = ICON_MAP[tpl.icon_name] || Home;
                    return (
                      <div key={tpl.id} className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden dark:border-slate-800 dark:bg-slate-900">
                        <div className={`bg-gradient-to-br ${tpl.preview_gradient} p-6 flex items-center justify-center min-h-[160px] relative`}>
                          <div className="absolute top-3 left-3 flex gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-white/30"></span>
                            <span className="w-2 h-2 rounded-full bg-white/30"></span>
                            <span className="w-2 h-2 rounded-full bg-white/30"></span>
                          </div>
                          {tpl.image_url ? (
                            <img src={tpl.image_url} alt={tpl.name} className="w-full h-full object-contain rounded-lg" />
                          ) : (
                            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                              <Icon className="w-7 h-7 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="font-semibold text-slate-900 dark:text-white text-sm">{tpl.name}</h3>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{CATEGORIES.find((c) => c.value === tpl.category)?.label || tpl.category}</p>
                            </div>
                            <span className="text-[10px] text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                              #{tpl.sort_order}
                            </span>
                          </div>
                          <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 line-clamp-2">{tpl.description}</p>
                          <div className="mt-3 flex items-center gap-2">
                            <button onClick={() => openEditForm(tpl)}
                              className="inline-flex items-center gap-1 text-xs text-sky-500 hover:text-sky-600 font-medium">
                              <Pencil className="w-3.5 h-3.5" /> Edit
                            </button>
                            <button onClick={() => deleteTemplate(tpl.id)}
                              className="inline-flex items-center gap-1 text-xs text-red-500 hover:text-red-600 font-medium">
                              <Trash2 className="w-3.5 h-3.5" /> Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
          {activeTab === "invoices" && (
            <AdminInvoices />
          )}
          {activeTab === "users" && (
            <AdminUsers />
          )}
          {activeTab === "blog" && (
            <AdminBlog />
          )}
          {activeTab === "testimonials" && (
            <AdminTestimonials />
          )}
          {activeTab === "offers" && (
            <AdminOffers />
          )}
        </div>
      </div>

      {showLogoutWarn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-900 dark:border dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Session expiring soon
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              You have been inactive. You will be signed out in{" "}
              <span className="font-semibold text-red-500">{logoutCountdown}s</span> unless you
              continue working.
            </p>
            <div className="mt-5 flex items-center justify-between gap-3">
              <button
                onClick={cancelLogout}
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-sky-500/25"
              >
                Stay Signed In
              </button>
              <button
                onClick={doLogout}
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
