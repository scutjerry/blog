import Link from "next/link";

export default function NotFound() {
  return <div className="container not-found"><p className="eyebrow">404 · 页面不存在</p><h1>这张纸还是空白的。</h1><p>链接可能已经移动，或者这篇文章还没有写下。</p><Link className="button button-primary" href="/">返回首页</Link></div>;
}
