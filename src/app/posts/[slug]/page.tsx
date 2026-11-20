import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { MdxContent } from "@/components/mdx-content";
import { formatDate } from "@/lib/format";
import { getAdjacentPosts, getPostBySlug, getPublishedPosts } from "@/lib/content/posts";
import { toTagSlug } from "@/lib/tag-slug";

export const dynamicParams = false;

type PostPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  const posts = getPublishedPosts();
  return posts.length
    ? posts.map((post) => ({ slug: post.slug }))
    : [{ slug: "_empty" }];
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.description, openGraph: { type: "article", title: post.title, description: post.description, publishedTime: post.date, modifiedTime: post.updated } };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  const adjacent = getAdjacentPosts(slug);

  return (
    <article className="article-shell container">
      <header className="article-header">
        <Link className="back-link" href="/posts"><ArrowLeft size={15} />全部文章</Link>
        <div className="post-card-meta"><time dateTime={post.date}>{formatDate(post.date)}</time><span>·</span><Link href={`/categories/${encodeURIComponent(post.category)}`}>{post.category}</Link><span>·</span><span>{post.readingMinutes} 分钟阅读</span></div>
        <h1>{post.title}</h1>
        <p>{post.description}</p>
        <div className="tag-list">{post.tags.map((tag) => <Link key={tag} className="tag" href={`/tags/${toTagSlug(tag)}`}>#{tag}</Link>)}</div>
      </header>
      <div className="prose"><MdxContent source={post.content} /></div>
      <nav className="post-navigation" aria-label="相邻文章">
        {adjacent.previous ? <Link href={`/posts/${adjacent.previous.slug}`}><span><ArrowLeft size={15} />上一篇</span><strong>{adjacent.previous.title}</strong></Link> : <span />}
        {adjacent.next ? <Link className="next-post" href={`/posts/${adjacent.next.slug}`}><span>下一篇<ArrowRight size={15} /></span><strong>{adjacent.next.title}</strong></Link> : <span />}
      </nav>
    </article>
  );
}
