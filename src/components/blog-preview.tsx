import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { getServerClient } from "@/lib/supabase-server";

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
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

export default async function BlogPreview() {
  const supabase = await getServerClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("id, slug, title, excerpt, cover_image_url, author, published_at, created_at")
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(3);

  const posts = (data as BlogPost[] | null) ?? [];

  return (
    <section id="blog" className="py-20 sm:py-28 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Latest Insights
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Practical guides and ideas on building software that grows your business.
          </p>
        </div>

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
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                    {post.title}
                  </h3>
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

        <div className="text-center mt-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-sky-600"
          >
            View all insights <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
