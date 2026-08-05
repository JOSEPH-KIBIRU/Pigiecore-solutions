import { getServerClient } from "@/lib/supabase-server";
import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Insights & Blog",
  description:
    "Insights, guides, and tips on custom software, business automation, and technology from Pigiecore Solutions.",
  keywords: [
    "software blog",
    "business automation",
    "custom software Kenya",
    "web development insights",
    "Pigiecore blog",
  ],
  openGraph: {
    title: "Insights & Blog | Pigiecore Solutions",
    description:
      "Practical guides on building software that grows your business.",
    type: "website",
    url: "https://pigiecore.co.ke/blog",
  },
  alternates: {
    canonical: "/blog",
  },
};

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  cover_image_url: string | null;
  author: string | null;
  published_at: string | null;
  created_at: string;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function BlogPage() {
  const supabase = await getServerClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });

  const posts = (data as BlogPost[] | null) ?? [];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="bg-gradient-to-br from-sky-600 via-blue-600 to-indigo-700">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-100 mb-4">
              Insights
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Insights &amp; Blog
            </h1>
            <p className="mt-4 text-lg text-sky-100/90 max-w-2xl mx-auto">
              Guides and ideas on building software that grows your business.
            </p>
          </div>
        </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {error ? (
          <p className="text-center text-slate-500 dark:text-slate-400">
            Something went wrong loading posts.
          </p>
        ) : posts.length === 0 ? (
          <p className="text-center text-slate-500 dark:text-slate-400">
            No posts yet. Check back soon!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 dark:border-slate-800 dark:bg-slate-900"
              >
                {post.cover_image_url ? (
                  <div className="aspect-[16/9] overflow-hidden bg-slate-100 dark:bg-slate-800">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.cover_image_url}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="aspect-[16/9] bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center">
                    <span className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white/25 backdrop-blur-sm text-2xl font-bold text-white">P</span>
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-3">
                    {post.published_at && (
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> {formatDate(post.published_at)}
                      </span>
                    )}
                    <span>{post.author || "Pigiecore Solutions"}</span>
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-sky-500">
                    Read more <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      </main>
      <Footer />
    </>
  );
}
