import Link from "next/link";
import { ArrowRight, BookOpen, PenLine } from "lucide-react";
import { PostCard } from "@/components/post-card";
import { getFeaturedPosts, getPublishedPosts, getTags } from "@/lib/content/posts";
import { toTagSlug } from "@/lib/tag-slug";

export default function Home() {
  const posts = getPublishedPosts();
  const featured = getFeaturedPosts().slice(0, 2);
  const tags = getTags().slice(0, 6);

  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <p className="eyebrow">持续写作的个人空间</p>
          <h1>把零散的发现，<br />整理成可以重访的答案。</h1>
          <p className="hero-description">这里记录技术实践、界面设计与日常思考。文章会持续修订，因为好的答案也需要生长。</p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/posts">开始阅读 <ArrowRight size={16} /></Link>
            <Link className="button button-secondary" href="/about">认识作者</Link>
          </div>
        </div>
        <aside className="desk-note" aria-label="写作状态">
          <div className="desk-note-top"><PenLine size={18} /><span>编辑桌面</span></div>
          <p className="desk-date">NOV<br /><strong>19</strong></p>
          <div className="desk-rule" />
          <p className="desk-label">正在整理</p>
          <p className="desk-title">如何让个人知识保持流动，而不是逐渐积灰？</p>
          <div className="desk-status"><span /> 仍在书写</div>
        </aside>
      </section>

      <section className="warm-section">
        <div className="container section-block">
          <div className="section-header">
            <div><p className="eyebrow">编辑推荐</p><h2>值得从这里开始</h2></div>
            <BookOpen size={28} aria-hidden="true" />
          </div>
          {featured.length > 0 ? (
            <div className="featured-grid">{featured.map((post) => <PostCard key={post.slug} post={post} />)}</div>
          ) : (
            <div className="empty-state"><strong>还没有推荐文章</strong><p>在文章 Frontmatter 里加上 <code>featured: true</code>，它就会出现在这里。</p></div>
          )}
        </div>
      </section>

      <section className="container section-block latest-section">
        <div className="section-header">
          <div><p className="eyebrow">最近更新</p><h2>新写下的内容</h2></div>
          <Link className="text-link" href="/posts">查看全部 <ArrowRight size={15} /></Link>
        </div>
        {posts.length > 0 ? (
          <div className="post-list">{posts.slice(0, 5).map((post) => <PostCard key={post.slug} post={post} compact />)}</div>
        ) : (
          <div className="empty-state"><strong>这里还很安静</strong><p>在 content/posts 目录新建一个 .mdx 文件，推送后它就会出现在这里。</p></div>
        )}
        {tags.length > 0 && (
          <div className="topic-strip"><span className="muted">常写主题</span>{tags.map((tag) => <Link key={tag.name} className="tag" href={`/tags/${toTagSlug(tag.name)}`}>#{tag.name} <small>{tag.count}</small></Link>)}</div>
        )}
      </section>
    </>
  );
}
