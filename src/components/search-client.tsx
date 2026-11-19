"use client";

import Fuse from "fuse.js";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { PostCard } from "@/components/post-card";
import type { PostSummary } from "@/types/post";

export function SearchClient({ posts }: { posts: PostSummary[] }) {
  const [query, setQuery] = useState("");
  const fuse = useMemo(() => new Fuse(posts, { keys: [{ name: "title", weight: 0.45 }, { name: "tags", weight: 0.25 }, { name: "category", weight: 0.15 }, { name: "description", weight: 0.15 }], threshold: 0.35, ignoreLocation: true }), [posts]);
  const results = query.trim() ? fuse.search(query.trim()).map(({ item }) => item) : posts;

  return (
    <div>
      <label className="search-box">
        <Search size={19} aria-hidden="true" />
        <span className="sr-only">搜索文章</span>
        <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索标题、标签或分类…" />
        <kbd>/</kbd>
      </label>
      <p className="search-summary">{query ? `找到 ${results.length} 篇相关文章` : `浏览全部 ${posts.length} 篇文章`}</p>
      {results.length ? <div className="post-list">{results.map((post) => <PostCard key={post.slug} post={post} compact />)}</div> : <div className="empty-state"><strong>没有找到相关内容</strong><p>试试更短的关键词，或从分类和标签开始浏览。</p></div>}
    </div>
  );
}
