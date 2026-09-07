import { getServerClient } from "@/lib/supabase-server";
import { siteUrl } from "@/lib/site";

export const revalidate = 300;

interface FeedPost {
  slug: string;
  title: string;
  excerpt: string | null;
  author: string | null;
  published_at: string | null;
}

function xmlEscape(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const supabase = await getServerClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("slug, title, excerpt, author, published_at")
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(20);

  const posts = (data as FeedPost[] | null) ?? [];

  const items = posts
    .map((post) => {
      const url = `${siteUrl}/blog/${post.slug}`;
      const date = post.published_at ? new Date(post.published_at).toUTCString() : "";
      const title = xmlEscape(post.title);
      const description = xmlEscape(post.excerpt || post.title);
      const author = xmlEscape(post.author || "Pigiecore Solutions");
      return `    <item>
      <title>${title}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      ${date ? `<pubDate>${date}</pubDate>` : ""}
      <description>${description}</description>
      <author>${author}</author>
    </item>`;
    })
    .join("\n");

  const lastBuild = posts[0]?.published_at
    ? new Date(posts[0].published_at).toUTCString()
    : new Date().toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Pigiecore Solutions — Insights &amp; Blog</title>
    <link>${siteUrl}/blog</link>
    <description>Guides and ideas on custom software, automation, and technology for growing businesses in Kenya.</description>
    <language>en</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
    },
  });
}
