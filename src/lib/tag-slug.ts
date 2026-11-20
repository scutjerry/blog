export function toTagSlug(tag: string): string {
  return tag
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[.\s_]+/g, "-")
    .replace(/[^a-z0-9\u4e00-\u9fff-]/g, "")
    .replace(/-{2,}/g, "-")
    .replace(/^-+|-+$/g, "");
}
