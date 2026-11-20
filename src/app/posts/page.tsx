import type { Metadata } from "next";
import { PageHeading } from "@/components/page-heading";
import { PostCard } from "@/components/post-card";
import { getPublishedPosts } from "@/lib/content/posts";

export const metadata: Metadata = { title: "文章", description: "按时间浏览全部公开文章。" };

export default function PostsPage() {
  const posts = getPublishedPosts();
  return <div className="container page-shell"><PageHeading eyebrow={`${posts.length} 篇文章`} title="文章" description="按时间整理的技术实践、设计笔记与日常思考。" />{posts.length > 0 ? (<div className="post-list">{posts.map((post) => <PostCard key={post.slug} post={post} />)}</div>) : (<div className="empty-state"><strong>还没有发布任何文章</strong><p>第一篇文章正在路上。</p></div>)}</div>;
}
