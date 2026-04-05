"use client";

import { useState, useEffect, useCallback } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase";
import type { SupabaseClient, Session } from "@supabase/supabase-js";

interface Submission {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  city: string | null;
  sqft: string | null;
  inspection_type: string | null;
  preferred_date: string | null;
  message: string | null;
  status: "new" | "read" | "contacted";
  email_sent: boolean;
  confirmation_sent: boolean;
}

const statusConfig = {
  new: { label: "New", classes: "bg-teal/10 text-teal" },
  read: { label: "Read", classes: "bg-gray-100 text-gray-600" },
  contacted: { label: "Contacted", classes: "bg-green-50 text-green-700" },
};

const inputClasses =
  "w-full bg-white border border-navy/[0.08] rounded-lg py-3 px-4 text-sm text-charcoal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-colors duration-200";

export default function AdminPage() {
  const [supabase] = useState<SupabaseClient | null>(() =>
    createBrowserSupabaseClient()
  );
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const fetchSubmissions = useCallback(async () => {
    if (!supabase) return;
    const { data } = await supabase
      .from("submissions")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setSubmissions(data);
  }, [supabase]);

  useEffect(() => {
    if (session) fetchSubmissions();
  }, [session, fetchSubmissions]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    setLoginError("");
    setLoginLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });
    setLoginLoading(false);
    if (error) setLoginError(error.message);
  }

  async function cycleStatus(id: string, currentStatus: string) {
    if (!supabase) return;
    const next =
      currentStatus === "new"
        ? "read"
        : currentStatus === "read"
          ? "contacted"
          : "new";
    await supabase.from("submissions").update({ status: next }).eq("id", id);
    setSubmissions((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: next as Submission["status"] } : s
      )
    );
  }

  async function handleSignOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
    setSession(null);
    setSubmissions([]);
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500 text-sm">Loading...</p>
      </div>
    );
  }

  // Not configured
  if (!supabase) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="font-heading text-xl font-bold text-navy mb-3">
            Admin Not Configured
          </h1>
          <p className="text-gray-600 text-sm">
            Supabase environment variables are not set.
          </p>
        </div>
      </div>
    );
  }

  // Login form
  if (!session) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <h1 className="font-heading text-xl font-bold text-navy mb-6 text-center">
            Admin Login
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="login-email"
                className="block text-sm font-medium text-navy mb-1.5"
              >
                Email
              </label>
              <input
                type="email"
                id="login-email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className={inputClasses}
                required
              />
            </div>
            <div>
              <label
                htmlFor="login-password"
                className="block text-sm font-medium text-navy mb-1.5"
              >
                Password
              </label>
              <input
                type="password"
                id="login-password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className={inputClasses}
                required
              />
            </div>
            {loginError && (
              <p className="text-red-600 text-xs">{loginError}</p>
            )}
            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-navy text-white text-sm font-semibold px-6 py-3 rounded-lg hover:bg-navy-light transition-colors duration-200 disabled:opacity-60"
            >
              {loginLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Submissions list
  return (
    <section className="py-10 px-6">
      <div className="max-w-[1140px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-heading text-xl font-bold text-navy">
            Submissions
          </h1>
          <button
            onClick={handleSignOut}
            className="text-sm text-gray-500 hover:text-navy transition-colors"
          >
            Sign Out
          </button>
        </div>

        {submissions.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-16">
            No submissions yet.
          </p>
        ) : (
          <div className="space-y-3">
            {submissions.map((sub) => {
              const isExpanded = expandedId === sub.id;
              const config = statusConfig[sub.status];

              return (
                <div
                  key={sub.id}
                  className="bg-white border border-navy/[0.06] rounded-lg overflow-hidden"
                >
                  {/* Row summary */}
                  <button
                    onClick={() =>
                      setExpandedId(isExpanded ? null : sub.id)
                    }
                    className="w-full text-left px-5 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-xs text-gray-400 shrink-0 w-[130px]">
                      {formatDate(sub.created_at)}
                    </span>
                    <span className="text-sm font-medium text-navy truncate min-w-0 flex-1">
                      {sub.name}
                    </span>
                    <span className="text-xs text-gray-500 truncate hidden sm:block max-w-[180px]">
                      {sub.email}
                    </span>
                    <span className="text-xs text-gray-500 truncate hidden md:block max-w-[120px]">
                      {sub.phone || "—"}
                    </span>
                    <span className="text-xs text-gray-500 truncate hidden lg:block max-w-[160px]">
                      {sub.inspection_type || "—"}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        cycleStatus(sub.id, sub.status);
                      }}
                      className={`text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ${config.classes}`}
                    >
                      {config.label}
                    </button>
                    <svg
                      className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>

                  {/* Expanded details */}
                  {isExpanded && (
                    <div className="px-5 pb-5 pt-1 border-t border-navy/[0.04]">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
                        <div>
                          <span className="text-gray-400 text-xs">Name</span>
                          <p className="text-charcoal">{sub.name}</p>
                        </div>
                        <div>
                          <span className="text-gray-400 text-xs">Email</span>
                          <p className="text-charcoal">
                            <a
                              href={`mailto:${sub.email}`}
                              className="text-teal hover:underline"
                            >
                              {sub.email}
                            </a>
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-400 text-xs">Phone</span>
                          <p className="text-charcoal">
                            {sub.phone ? (
                              <a
                                href={`tel:${sub.phone}`}
                                className="text-teal hover:underline"
                              >
                                {sub.phone}
                              </a>
                            ) : (
                              "—"
                            )}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-400 text-xs">
                            Inspection Type
                          </span>
                          <p className="text-charcoal">
                            {sub.inspection_type || "—"}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-400 text-xs">
                            Property Address
                          </span>
                          <p className="text-charcoal">
                            {[sub.address, sub.city]
                              .filter(Boolean)
                              .join(", ") || "—"}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-400 text-xs">
                            Square Footage
                          </span>
                          <p className="text-charcoal">{sub.sqft || "—"}</p>
                        </div>
                        <div>
                          <span className="text-gray-400 text-xs">
                            Preferred Date
                          </span>
                          <p className="text-charcoal">
                            {sub.preferred_date || "—"}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-400 text-xs">
                            Email Delivery
                          </span>
                          <p className="text-charcoal text-xs space-x-3">
                            <span>
                              Notification:{" "}
                              {sub.email_sent ? (
                                <span className="text-green-600">✓</span>
                              ) : (
                                <span className="text-red-400">✗</span>
                              )}
                            </span>
                            <span>
                              Confirmation:{" "}
                              {sub.confirmation_sent ? (
                                <span className="text-green-600">✓</span>
                              ) : (
                                <span className="text-red-400">✗</span>
                              )}
                            </span>
                          </p>
                        </div>
                      </div>
                      {sub.message && (
                        <div className="mt-4 pt-3 border-t border-navy/[0.04]">
                          <span className="text-gray-400 text-xs">
                            Message
                          </span>
                          <p className="text-charcoal text-sm whitespace-pre-wrap mt-1">
                            {sub.message}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
