import type { Metadata } from "next";
import Link from "next/link";
import { PageHeading } from "@/components/page-heading";
import { getCategories } from "@/lib/content/posts";

export const metadata: Metadata = { title: "分类", description: "按主要领域浏览文章。" };

export default function CategoriesPage() {
  const categories = getCategories();
  return <div className="container page-shell"><PageHeading eyebrow="内容地图" title="分类" description="每篇文章只有一个主要归属，帮助你沿着明确的方向继续阅读。" /><div className="taxonomy-grid">{categories.map((item, index) => <Link className="taxonomy-card" key={item.name} href={`/categories/${encodeURIComponent(item.name)}`}><span>{String(index + 1).padStart(2, "0")}</span><h2>{item.name}</h2><p>{item.count} 篇文章</p></Link>)}</div></div>;
}
