import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeading } from "@/components/page-heading";
import { PostCard } from "@/components/post-card";
import { getCategories, getPostsByCategory } from "@/lib/content/posts";

export const dynamicParams = false;
type CategoryPageProps = { params: Promise<{ category: string }> };
export function generateStaticParams() { return getCategories().map(({ name }) => ({ category: name })); }
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> { const { category } = await params; const name = decodeURIComponent(category); return { title: `分类：${name}`, description: `浏览“${name}”分类下的文章。` }; }

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params; const name = decodeURIComponent(category); const posts = getPostsByCategory(name); if (!posts.length) notFound();
  return <div className="container page-shell"><PageHeading eyebrow="分类" title={name} description={`共 ${posts.length} 篇文章，沿着同一个主题继续阅读。`} /><div className="post-list">{posts.map((post) => <PostCard key={post.slug} post={post} />)}</div></div>;
}
