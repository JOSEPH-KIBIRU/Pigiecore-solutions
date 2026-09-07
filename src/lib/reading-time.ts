const WORDS_PER_MINUTE = 200;

export function estimateReadingTime(markdown: string | null | undefined): number {
  if (!markdown) return 1;
  const cleaned = markdown
    .replace(/[#*`>_~\-\[\]()]/g, " ")
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const words = cleaned ? cleaned.split(" ").length : 0;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

export function formatReadingTime(minutes: number): string {
  return `${minutes} min read`;
}
