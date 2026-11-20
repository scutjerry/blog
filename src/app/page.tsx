import { PostCard } from "@/components/post-card";
import { getPublishedPosts } from "@/lib/content/posts";

export default function Home() {
  const posts = getPublishedPosts();

  return (
    <div className="container home-page">
      <header className="home-header">
        <p className="eyebrow">全部文章</p>
        <h1>{posts.length > 0 ? `${posts.length} 篇文章` : "文章"}</h1>
      </header>
      {posts.length > 0 ? (
        <div className="post-list">
          {posts.map((post) => <PostCard key={post.slug} post={post} />)}
        </div>
      ) : (
        <div className="empty-state">
          <strong>还没有发布文章</strong>
          <p>第一篇文章正在路上。</p>
        </div>
      )}
    </div>
  );
}
