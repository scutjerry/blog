import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getCategories, getPublishedPosts, getTags } from "@/lib/content/posts";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/posts", "/categories", "/tags", "/search", "/about"].map((route) => ({ url: `${siteConfig.url}${route}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: route === "" ? 1 : 0.7 }));
  const posts = getPublishedPosts().map((post) => ({ url: `${siteConfig.url}/posts/${post.slug}`, lastModified: new Date(`${post.updated ?? post.date}T00:00:00+08:00`), changeFrequency: "monthly" as const, priority: 0.8 }));
  const categories = getCategories().map(({ name }) => ({ url: `${siteConfig.url}/categories/${encodeURIComponent(name)}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.5 }));
  const tags = getTags().map(({ name }) => ({ url: `${siteConfig.url}/tags/${encodeURIComponent(name)}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.4 }));
  return [...staticRoutes, ...posts, ...categories, ...tags];
}
