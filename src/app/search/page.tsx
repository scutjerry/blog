import type { Metadata } from "next";
import { PageHeading } from "@/components/page-heading";
import { SearchClient } from "@/components/search-client";
import { getPublishedPosts } from "@/lib/content/posts";

export const metadata: Metadata = { title: "搜索", description: "搜索文章标题、标签、分类和摘要。" };
export default function SearchPage() { return <div className="container page-shell search-page"><PageHeading eyebrow="本地搜索" title="寻找一个答案" description="搜索在浏览器中完成，不上传关键词，也不依赖外部服务。" /><SearchClient posts={getPublishedPosts()} /></div>; }
