import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeading } from "@/components/page-heading";
import { PostCard } from "@/components/post-card";
import { getPostsByTag, getTagBySlug, getTags } from "@/lib/content/posts";
import { toTagSlug } from "@/lib/tag-slug";

export const dynamicParams = false;
type TagPageProps = { params: Promise<{ tag: string }> };

export function generateStaticParams() {
  return getTags().map(({ name }) => ({ tag: toTagSlug(name) }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  const item = getTagBySlug(decodeURIComponent(tag));
  if (!item) return {};
  return { title: `标签：${item.name}`, description: `浏览带有“${item.name}”标签的文章。` };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const item = getTagBySlug(decodeURIComponent(tag));
  if (!item) notFound();
  const posts = getPostsByTag(item.name);
  if (!posts.length) notFound();

  return <div className="container page-shell"><PageHeading eyebrow="标签" title={`#${item.name}`} description={`共 ${posts.length} 篇文章，从不同角度讨论这个关键词。`} /><div className="post-list">{posts.map((post) => <PostCard key={post.slug} post={post} />)}</div></div>;
}
