import "server-only";

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { z } from "zod";
import type { Post, PostSummary, TaxonomyItem } from "@/types/post";

const POSTS_DIRECTORY = path.join(process.cwd(), "content", "posts");

const frontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  category: z.string().min(1),
  tags: z.array(z.string().min(1)).default([]),
  draft: z.boolean().default(false),
  featured: z.boolean().default(false),
});

function loadPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIRECTORY)) return [];

  return fs
    .readdirSync(POSTS_DIRECTORY)
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const source = fs.readFileSync(path.join(POSTS_DIRECTORY, fileName), "utf8");
      const { data, content } = matter(source);
      const frontmatter = frontmatterSchema.parse(data);

      return {
        slug,
        content,
        ...frontmatter,
        readingMinutes: Math.max(1, Math.ceil(readingTime(content).minutes)),
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPublishedPosts(): PostSummary[] {
  return loadPosts()
    .filter((post) => !post.draft)
    .map((post) => {
      const { content, ...summary } = post;
      void content;
      return summary;
    });
}

export function getPostBySlug(slug: string): Post | undefined {
  return loadPosts().find((post) => post.slug === slug && !post.draft);
}

export function getFeaturedPosts(): PostSummary[] {
  return getPublishedPosts().filter((post) => post.featured);
}

export function getPostsByCategory(category: string): PostSummary[] {
  return getPublishedPosts().filter((post) => post.category === category);
}

export function getPostsByTag(tag: string): PostSummary[] {
  return getPublishedPosts().filter((post) => post.tags.includes(tag));
}

function countTaxonomy(values: string[]): TaxonomyItem[] {
  const counts = new Map<string, number>();
  values.forEach((value) => counts.set(value, (counts.get(value) ?? 0) + 1));
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, "zh-CN"));
}

export function getCategories(): TaxonomyItem[] {
  return countTaxonomy(getPublishedPosts().map((post) => post.category));
}

export function getTags(): TaxonomyItem[] {
  return countTaxonomy(getPublishedPosts().flatMap((post) => post.tags));
}

export function getAdjacentPosts(slug: string) {
  const posts = [...getPublishedPosts()].reverse();
  const index = posts.findIndex((post) => post.slug === slug);
  return {
    previous: index > 0 ? posts[index - 1] : undefined,
    next: index >= 0 && index < posts.length - 1 ? posts[index + 1] : undefined,
  };
}
