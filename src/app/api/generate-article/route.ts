import { getServerClient } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

export const maxDuration = 60;

const MODEL = "gemini-2.5-flash";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

function buildPrompt(topic: string) {
  return `You are the blog writer for Pigiecore Solutions, a software and business automation company in Kenya.

Write a unique, SEO-friendly blog article about this topic: "${topic}"

Use the Google search results to get the LATEST and most up-to-date information. Prioritize the newest articles (this year) and include recent facts, stats, or examples when the search results provide them.

Cover: what the topic is, the key benefits (tied to growing a small/medium business), practical steps or examples, and a short conclusion with a gentle call to action to contact Pigiecore Solutions.

Rules:
- 700-1100 words.
- Write original sentences in simple, business-friendly English. Do NOT copy text from the sources.
- Output ONLY valid JSON with no markdown fences and no extra text, exactly in this shape:
{
  "title": "SEO title, under 60 characters, compelling, no double quotes",
  "excerpt": "One or two sentence summary, under 160 characters",
  "content": "Full article as plain text. Use '## ' for section headings. Separate paragraphs with a blank line. End the article with a 'Sources:' section listing 3-6 sources as '- Title - URL' lines.",
  "sources": ["https://example.com/article", "https://example.com/post"]
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

async function callGemini(key: string, topic: string, tool: unknown) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": key },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: buildPrompt(topic) }] }],
      tools: [tool],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 4096,
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
      sources: Array.isArray(parsed.sources) ? parsed.sources : [],
    };
  } catch {
    return { error: "Could not parse the article JSON from Gemini" };
  }
}

export async function POST(request: Request) {
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

    let result = await callGemini(key, topic.trim(), { google_search: {} });
    if (result.error) {
      result = await callGemini(key, topic.trim(), {
        google_search_retrieval: {
          dynamic_retrieval_config: {
            mode: "MODE_DYNAMIC",
            dynamic_threshold: 0.6,
          },
        },
      });
    }

    if (result.error) {
      const msg = String(result.error);
      const friendly = /grounding|search tool|not enabled|forbidden|quota/i.test(msg)
        ? "Google Search grounding is unavailable on this key. Get a free key at aistudio.google.com/apikey and add it as GEMINI_API_KEY."
        : msg;
      return NextResponse.json({ error: friendly }, { status: 502 });
    }

    return NextResponse.json(result);
  } catch (err) {
    console.error("generate-article error:", err);
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
