interface Bucket {
  count: number;
  resetAt: number;
}

const store = new Map<string, Bucket>();
const MAX_ENTRIES = 5000;

function getIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}

function prune() {
  if (store.size < MAX_ENTRIES) return;
  const now = Date.now();
  for (const [key, bucket] of store) {
    if (now >= bucket.resetAt) store.delete(key);
  }
  if (store.size >= MAX_ENTRIES) {
    const first = store.keys().next().value;
    if (first !== undefined) store.delete(first);
  }
}

export interface RateLimitResult {
  limited: boolean;
  retryAfter: number;
  remaining: number;
}

export function rateLimit(
  request: Request,
  key: string,
  limit: number,
  windowMs: number
): RateLimitResult {
  prune();
  const id = `${key}:${getIp(request)}`;
  const now = Date.now();
  const bucket = store.get(id);

  if (!bucket || now >= bucket.resetAt) {
    store.set(id, { count: 1, resetAt: now + windowMs });
    return { limited: false, retryAfter: 0, remaining: limit - 1 };
  }

  if (bucket.count >= limit) {
    return {
      limited: true,
      retryAfter: Math.ceil((bucket.resetAt - now) / 1000),
      remaining: 0,
    };
  }

  bucket.count += 1;
  return { limited: false, retryAfter: 0, remaining: limit - bucket.count };
}