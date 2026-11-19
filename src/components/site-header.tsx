"use client";

import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden="true">留</span>
          <span>{siteConfig.name}</span>
        </Link>

        <nav className="desktop-nav" aria-label="主导航">
          {siteConfig.nav.slice(0, 3).map((item) => (
            <Link key={item.href} href={item.href}>{item.label}</Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link href="/search" className="icon-button" aria-label="搜索文章">
            <Search size={17} aria-hidden="true" />
          </Link>
          <ThemeToggle />
          <button
            type="button"
            className="icon-button mobile-menu-button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "关闭菜单" : "打开菜单"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" className="mobile-nav container" aria-label="移动端导航">
          {siteConfig.nav.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
