"use client";

import { useState, useEffect } from "react";
import { Users as UsersIcon, Plus, Trash2, AlertCircle, Check, Loader2 } from "lucide-react";

interface AdminUser {
  id: string;
  email: string;
  created_at: string;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function AdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const inputCls = (field: string) =>
    `block w-full rounded-xl border bg-white px-4 py-3 text-slate-900 placeholder-slate-400 shadow-sm focus:ring-2 outline-none transition-all dark:bg-slate-800 dark:text-slate-100 ${
      fieldErrors[field]
        ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
        : "border-slate-300 focus:border-sky-500 focus:ring-sky-500/20 dark:border-slate-700"
    }`;

  async function fetchUsers() {
    const res = await fetch("/api/users");
    if (res.ok) {
      const data = await res.json();
      setUsers(data.users);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    setSuccess("");

    const nextErrors: Record<string, string> = {};
    if (!email.trim()) {
      nextErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = "Please enter a valid email address";
    }
    if (!password) {
      nextErrors.password = "Password is required";
    } else if (password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters";
    }
    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSaving(true);
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setFormError(data.error || "Failed to create user");
        setSaving(false);
        return;
      }
      setEmail("");
      setPassword("");
      setSuccess(`Account created for ${data.user.email}. They can sign in immediately.`);
      fetchUsers();
    } catch {
      setFormError("Network error");
    }
    setSaving(false);
  }

  async function handleDelete(id: string, userEmail: string) {
    if (!window.confirm(`Delete ${userEmail}? This permanently removes their account.`)) return;
    setDeletingId(id);
    setFormError("");
    setSuccess("");
    try {
      const res = await fetch("/api/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (!res.ok) {
        setFormError(data.error || "Failed to delete user");
        setDeletingId(null);
        return;
      }
      setUsers((prev) => prev.filter((u) => u.id !== id));
      setSuccess(`User ${userEmail} deleted.`);
    } catch {
      setFormError("Network error");
    }
    setDeletingId(null);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Users</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Create and manage admin accounts</p>
        </div>
        <button onClick={fetchUsers}
          className="text-sm text-sky-500 hover:text-sky-600 font-medium">
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>

      {formError && (
        <div className="mb-6 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-600 flex items-center gap-2 dark:bg-red-950/30 dark:border-red-800 dark:text-red-400">
          <AlertCircle className="w-4 h-4 shrink-0" /> {formError}
        </div>
      )}
      {success && (
        <div className="mb-6 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-sm text-emerald-700 flex items-center gap-2 dark:bg-emerald-950/30 dark:border-emerald-800 dark:text-emerald-400">
          <Check className="w-4 h-4 shrink-0" /> {success}
        </div>
      )}

      <div className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-sky-50 flex items-center justify-center dark:bg-sky-950/30">
            <Plus className="w-5 h-5 text-sky-500" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Create User</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">New accounts can sign in right away</p>
          </div>
        </div>

        <form onSubmit={handleCreate} noValidate className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (fieldErrors.email) setFieldErrors((er) => ({ ...er, email: "" })); }}
              placeholder="admin@pigiecore.com"
              className={inputCls("email")}
            />
            {fieldErrors.email && (
              <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{fieldErrors.email}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); if (fieldErrors.password) setFieldErrors((er) => ({ ...er, password: "" })); }}
              placeholder="At least 6 characters"
              className={inputCls("password")}
            />
            {fieldErrors.password && (
              <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{fieldErrors.password}</p>
            )}
          </div>
          <div className="md:col-span-2">
            <button type="submit" disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-sky-500/25 disabled:opacity-50">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              {saving ? "Creating..." : "Create User"}
            </button>
          </div>
        </form>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <UsersIcon className="w-5 h-5 text-slate-400" />
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Admin Accounts ({users.length})</h2>
        </div>
        {loading ? (
          <div className="p-12 text-center text-slate-500 dark:text-slate-400">Loading users...</div>
        ) : users.length === 0 ? (
          <div className="p-12 text-center text-slate-500 dark:text-slate-400">
            No users yet. Create the first admin account above.
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {users.map((u) => (
              <div key={u.id} className="flex items-center gap-4 px-6 py-4">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center text-white font-semibold text-sm shrink-0">
                  {u.email.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">{u.email}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Created {formatDate(u.created_at)}</div>
                </div>
                <button onClick={() => handleDelete(u.id, u.email)} disabled={deletingId === u.id}
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-200 text-slate-500 hover:border-red-300 hover:text-red-500 transition-all dark:border-slate-700 dark:text-slate-400 dark:hover:border-red-700 dark:hover:text-red-400 disabled:opacity-50">
                  {deletingId === u.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
