import { getServerClient } from "@/lib/supabase-server";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, ArrowLeft } from "lucide-react";
import { siteUrl } from "@/lib/site";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const dynamic = "force-dynamic";

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
  updated_at: string | null;
}

async function getPost(slug: string): Promise<BlogPost | null> {
  const supabase = await getServerClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();
  return (data as BlogPost | null) ?? null;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

const AGGREGATOR_URL = /news\.google\.com\/rss|bing\.com\/news\/apiclick/i;

function sourceChip(url: string) {
  const clean = url.replace(/[.,;:!?]+$/, "");
  if (AGGREGATOR_URL.test(clean)) return null;
  const label = clean.replace(/^https?:\/\//, "").split("/")[0];
  return (
    <a
      href={clean}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center align-baseline mx-1 rounded-full border border-slate-200 bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500 hover:border-sky-300 hover:text-sky-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:text-sky-400"
    >
      {label}
    </a>
  );
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    if (/^\*\*[^*]+\*\*$/.test(part)) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (/^\*[^*]+\*$/.test(part)) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (m) {
      if (AGGREGATOR_URL.test(m[2].replace(/[.,;:!?]+$/, ""))) {
        return <span key={i}>{m[1]}</span>;
      }
      return (
        <a key={i} href={m[2]} target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:text-sky-600 underline underline-offset-2">
          {m[1]}
        </a>
      );
    }
    const segments = part.split(/(https?:\/\/[^\s]+)/g);
    if (segments.length > 1) {
      return segments.map((seg, j) =>
        /^https?:\/\//.test(seg) ? (
          <span key={`${i}-${j}`}>{sourceChip(seg)}</span>
        ) : (
          <span key={`${i}-${j}`}>{seg}</span>
        )
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function renderContent(text: string) {
  const blocks = text.split(/\n{2,}/);
  return blocks.map((block, i) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    if (/^#{2,3}\s/.test(trimmed)) {
      const level = trimmed.startsWith("### ") ? 3 : 2;
      const label = trimmed.replace(/^#{2,3}\s+/, "");
      return level === 2 ? (
        <h2 key={i} className="mt-8 mb-3 text-2xl font-bold text-slate-900 dark:text-white">
          {renderInline(label)}
        </h2>
      ) : (
        <h3 key={i} className="mt-6 mb-2 text-xl font-semibold text-slate-900 dark:text-white">
          {renderInline(label)}
        </h3>
      );
    }

    if (trimmed.startsWith("> ")) {
      return (
        <blockquote key={i} className="mt-4 mb-4 border-l-4 border-sky-300 pl-4 italic text-slate-600 dark:border-sky-700 dark:text-slate-300">
          {renderInline(trimmed.slice(2))}
        </blockquote>
      );
    }

    if (/^[-*]\s/.test(trimmed)) {
      const items = trimmed.split(/\n/).map((l) => l.replace(/^[-*]\s+/, "")).filter(Boolean);
      return (
        <ul key={i} className="my-4 space-y-2 pl-5 list-disc">
          {items.map((item, j) => {
            const srcMatch = item.match(/^(.*?)\s*-\s+(https?:\/\/\S+)$/);
            return (
              <li key={j}>
                {srcMatch ? (
                  <>
                    {renderInline(srcMatch[1])}
                    {sourceChip(srcMatch[2])}
                  </>
                ) : (
                  renderInline(item)
                )}
              </li>
            );
          })}
        </ul>
      );
    }

    return (
      <p key={i} className="my-4">
        {renderInline(trimmed)}
      </p>
    );
  });
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt || `${post.title} — Pigiecore Solutions Insights`,
    keywords: ["software", "automation", "Pigiecore", "business growth"],
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      type: "article",
      url: `${siteUrl}/blog/${post.slug}`,
      images: post.cover_image_url ? [{ url: post.cover_image_url }] : undefined,
      publishedTime: post.published_at || post.created_at,
      modifiedTime: post.updated_at || undefined,
      authors: [post.author || "Pigiecore Solutions"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || undefined,
      images: post.cover_image_url ? [post.cover_image_url] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || undefined,
    image: post.cover_image_url || undefined,
    datePublished: post.published_at || post.created_at,
    author: { "@type": "Organization", name: post.author || "Pigiecore Solutions" },
    publisher: {
      "@type": "Organization",
      name: "Pigiecore Solutions",
      logo: { "@type": "ImageObject", url: `${siteUrl}/icon.svg` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${post.slug}`,
    },
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white dark:bg-slate-950 pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-sky-500 hover:text-sky-600 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Insights
        </Link>

        {post.cover_image_url && (
          <div className="rounded-2xl overflow-hidden mb-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.cover_image_url} alt={post.title} className="w-full object-cover max-h-[420px]" />
          </div>
        )}

        <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-4">
          {post.published_at && (
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-4 h-4" /> {formatDate(post.published_at)}
            </span>
          )}
          <span>&middot;</span>
          <span>{post.author || "Pigiecore Solutions"}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="mt-4 text-lg text-slate-500 dark:text-slate-400 leading-relaxed">{post.excerpt}</p>
        )}

        <div className="mt-8 border-t border-slate-200 dark:border-slate-800 pt-8 text-lg text-slate-700 dark:text-slate-300 leading-relaxed tracking-wide break-words overflow-hidden">
          {post.content ? renderContent(post.content) : null}
        </div>

        <div className="mt-12 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Need software like this for your business?{" "}
            <Link href="/#contact" className="text-sky-500 hover:text-sky-600 font-medium">
              Talk to Pigiecore Solutions
            </Link>
            .
          </p>
        </div>
      </div>
      </main>
      <Footer />
    </>
  );
}
