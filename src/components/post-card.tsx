import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatDate } from "@/lib/format";
import type { PostSummary } from "@/types/post";

export function PostCard({ post, compact = false }: { post: PostSummary; compact?: boolean }) {
  return (
    <article className={compact ? "post-row" : "post-card"}>
      <div className="post-card-meta">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden="true">·</span>
        <Link href={`/categories/${encodeURIComponent(post.category)}`}>{post.category}</Link>
        <span aria-hidden="true">·</span>
        <span>{post.readingMinutes} 分钟</span>
      </div>
      <h2 className="post-card-title">
        <Link href={`/posts/${post.slug}`}>
          {post.title}<ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      </h2>
      {!compact && <p className="post-card-description">{post.description}</p>}
      <div className="tag-list" aria-label="文章标签">
        {post.tags.map((tag) => (
          <Link key={tag} className="tag" href={`/tags/${encodeURIComponent(tag)}`}>#{tag}</Link>
        ))}
      </div>
    </article>
  );
}
