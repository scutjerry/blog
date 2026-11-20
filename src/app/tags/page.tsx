import type { Metadata } from "next";
import Link from "next/link";
import { PageHeading } from "@/components/page-heading";
import { getTags } from "@/lib/content/posts";
import { toTagSlug } from "@/lib/tag-slug";

export const metadata: Metadata = { title: "标签", description: "按关键词探索文章。" };

export default function TagsPage() {
  const tags = getTags();
  return <div className="container page-shell"><PageHeading eyebrow={`${tags.length} 个关键词`} title="标签" description="标签连接跨越不同分类的相似问题，也记录兴趣如何变化。" />{tags.length > 0 ? (<div className="tag-cloud">{tags.map((tag) => <Link key={tag.name} href={`/tags/${toTagSlug(tag.name)}`}><span>#{tag.name}</span><small>{tag.count}</small></Link>)}</div>) : (<div className="empty-state"><strong>还没有标签</strong><p>文章的 tags 会自动汇总到这里。</p></div>)}</div>;
}
