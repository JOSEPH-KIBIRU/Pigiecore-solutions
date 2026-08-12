import { getServerClient } from "@/lib/supabase-server";
import { rateLimit } from "@/lib/rate-limit";
import { NextResponse } from "next/server";

export const maxDuration = 60;

const MODEL = "gemini-3.6-flash";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

interface NewsItem {
  title: string;
  link: string;
  pub: string;
  source: string;
}

const AGGREGATOR_URL = /(?:^|\.)news\.google\.com\/rss|(?:^|\.)bing\.com\/news\/apiclick/i;

function resolveLink(link: string): string {
  if (!link) return "";
  try {
    const u = new URL(link);
    if (u.hostname === "www.bing.com" && u.pathname.startsWith("/news/apiclick")) {
      const target = u.searchParams.get("url");
      if (target && /^https?:\/\//i.test(target)) return target;
      return "";
    }
    if (u.hostname === "news.google.com" && u.pathname.startsWith("/rss/articles")) {
      return "";
    }
    return link;
  } catch {
    return "";
  }
}

function stripHtml(html: string) {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function extractItems(xml: string): NewsItem[] {
  const items: NewsItem[] = [];
  const itemRe = /<item>([\s\S]*?)<\/item>/g;
  let m: RegExpExecArray | null;
  while ((m = itemRe.exec(xml))) {
    const block = m[1];
    const title = (block.match(/<title>(.*?)<\/title>/) || [])[1] || "";
    const link = resolveLink((block.match(/<link>(.*?)<\/link>/) || [])[1] || "");
    const pub = (block.match(/<pubDate>(.*?)<\/pubDate>/) || [])[1] || "";
    const descRaw =
      (block.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/) || [])[1] ||
      (block.match(/<description>(.*?)<\/description>/) || [])[1] ||
      "";
    const source = (block.match(/<source[^>]*>(.*?)<\/source>/) || [])[1] || "";
    const desc = stripHtml(descRaw);
    if (title) items.push({ title, link, pub, source, ...(desc ? { desc } : {}) });
  }
  return items;
}

async function fetchNews(topic: string): Promise<NewsItem[]> {
  const query = encodeURIComponent(topic);
  const sources: Array<{ url: string; label: string }> = [
    {
      url: `https://www.bing.com/news/search?q=${query}&format=RSS`,
      label: "Bing News",
    },
    {
      url: `https://news.google.com/rss/search?q=${query}&hl=en&gl=US&ceid=US:en`,
      label: "Google News",
    },
  ];

  for (const src of sources) {
    try {
      const res = await fetch(src.url, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; PigiecoreBot/1.0)" },
      });
      if (!res.ok) continue;
      const xml = await res.text();
      const items = extractItems(xml);
      if (items.length > 0) return items.slice(0, 10);
    } catch {
      // try next source
    }
  }
  return [];
}

function buildContext(items: NewsItem[]) {
  return items
    .map((item, i) => {
      const date = item.pub ? ` (${item.pub})` : "";
      const source = item.source ? ` - ${item.source}` : "";
      const desc = (item as NewsItem & { desc?: string }).desc
        ? `: ${(item as NewsItem & { desc?: string }).desc}`
        : "";
      return `${i + 1}. ${item.title}${source}${date}${item.link ? ` - ${item.link}` : ""}${desc}`;
    })
    .join("\n");
}

function buildPrompt(topic: string, context: string, concise = false) {
  return `You are the blog writer for Pigiecore Solutions, a software and business automation company in Kenya.

Write a unique, SEO-friendly blog article about this topic: "${topic}"

Below are the LATEST news articles about this topic, ordered from newest to oldest. Use them as your sources.

NEWS SOURCES:
${context}

Rules:
- Write ${concise ? "500-700" : "700-1100"} words in original sentences, simple business-friendly English. Do NOT copy text from the sources.
- Base the article on the news sources and reference the newest developments in your own words.
- Write every point in your own voice with your own expertise and practical examples. Do NOT use phrases like "as covered in", "according to a report", or "recently reported".
- End the article with a "Sources:" section listing 3-6 sources as "- Title" lines. Only append " - URL" when that source line in NEWS SOURCES above includes a real article URL. Never invent, guess, or reuse a URL that is not listed above.
- Never include news.google.com or bing.com/news/apiclick redirect links anywhere in the article.
- Output ONLY valid JSON with no markdown fences and no extra text, exactly in this shape:
{
  "title": "SEO title, under 60 characters, compelling, no double quotes",
  "excerpt": "One or two sentence summary, under 160 characters",
  "content": "Full article as plain text. Use '## ' for section headings. Separate paragraphs with a blank line. End with the Sources: section.",
  "sources": ["https://real-publisher.com/article"]
}`;
}

function extractJson(text: string): unknown {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const raw = fenced ? fenced[1] : text;
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("No JSON object in response");
  return JSON.parse(raw.slice(start, end + 1));
}

async function callGemini(key: string, topic: string, context: string, concise = false) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": key },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: buildPrompt(topic, context, concise) }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 8000,
        responseMimeType: "application/json",
      },
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    const msg = data?.error?.message || `Gemini API error ${res.status}`;
    return { error: msg };
  }

  const text = data?.candidates?.[0]?.content?.parts
    ?.map((p: { text?: string }) => p.text ?? "")
    .join("") as string | undefined;

  if (!text) {
    return { error: "Gemini returned no content" };
  }

  try {
    const parsed = extractJson(text) as {
      title?: string;
      excerpt?: string;
      content?: string;
      sources?: string[];
    };
    return {
      title: parsed.title || "",
      excerpt: parsed.excerpt || "",
      content: parsed.content || "",
      sources: Array.isArray(parsed.sources)
        ? parsed.sources.filter(
            (s): s is string => typeof s === "string" && !AGGREGATOR_URL.test(s.replace(/[.,;:!?]+$/, ""))
          )
        : [],
    };
  } catch {
    return { error: "Could not parse the article JSON from Gemini" };
  }
}

export async function POST(request: Request) {
  const rl = rateLimit(request, "generate-article", 3, 60 * 60 * 1000);
  if (rl.limited) {
    return NextResponse.json(
      { error: "Too many article requests. Please wait and try again." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
    );
  }

  const supabase = await getServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "GEMINI_API_KEY is not configured on the server" },
      { status: 500 }
    );
  }

  try {
    const { topic } = await request.json();
    if (!topic || typeof topic !== "string" || !topic.trim()) {
      return NextResponse.json({ error: "A topic is required" }, { status: 400 });
    }
    if (topic.length > 300) {
      return NextResponse.json(
        { error: "Topic is too long (max 300 characters)" },
        { status: 400 }
      );
    }

    const news = await fetchNews(topic.trim());
    if (news.length === 0) {
      return NextResponse.json(
        { error: "No recent news articles found for this topic. Try rewording it." },
        { status: 422 }
      );
    }

    const result = await callGemini(key, topic.trim(), buildContext(news));
    if (result.error && /parse|JSON/i.test(String(result.error))) {
      const retry = await callGemini(key, topic.trim(), buildContext(news), true);
      if (!retry.error) return NextResponse.json(retry);
      return NextResponse.json(
        { error: "The AI returned an incomplete article. Please try again." },
        { status: 502 }
      );
    }
    if (result.error) {
      const msg = String(result.error);
      const friendly = /quota|plan|billing|rate|daily limit/i.test(msg)
        ? "The free Gemini tier's daily limit was reached. Try again later or visit aistudio.google.com for your quota."
        : msg;
      return NextResponse.json({ error: friendly }, { status: 502 });
    }

    return NextResponse.json(result);
  } catch (err) {
    console.error("generate-article error:", err);
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
