import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeading } from "@/components/page-heading";
import { PostCard } from "@/components/post-card";
import { getPostsByTag, getTags } from "@/lib/content/posts";

export const dynamicParams = false;
type TagPageProps = { params: Promise<{ tag: string }> };
export function generateStaticParams() { return getTags().map(({ name }) => ({ tag: name })); }
export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> { const { tag } = await params; const name = decodeURIComponent(tag); return { title: `标签：${name}`, description: `浏览带有“${name}”标签的文章。` }; }

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params; const name = decodeURIComponent(tag); const posts = getPostsByTag(name); if (!posts.length) notFound();
  return <div className="container page-shell"><PageHeading eyebrow="标签" title={`#${name}`} description={`共 ${posts.length} 篇文章，从不同角度讨论这个关键词。`} /><div className="post-list">{posts.map((post) => <PostCard key={post.slug} post={post} />)}</div></div>;
}
