import Link from "next/link";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <p className="footer-title">{siteConfig.name}</p>
          <p className="muted">保留好奇，也保留修改答案的余地。</p>
        </div>
        <div className="footer-links" aria-label="页脚链接">
          <Link href="/about">关于</Link>
          <a href={siteConfig.github} target="_blank" rel="noreferrer">GitHub</a>
        </div>
        <p className="footer-copy">© {new Date().getFullYear()} {siteConfig.author}</p>
      </div>
    </footer>
  );
}
