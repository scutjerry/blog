export const siteConfig = {
  name: "留白之间",
  shortName: "留白",
  description: "记录技术实践、设计思考与持续生长的个人笔记。",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  author: "JERRY",
  github: "https://github.com/scutjerry",
  nav: [
    { href: "/posts", label: "文章" },
    { href: "/categories", label: "分类" },
    { href: "/tags", label: "标签" },
    { href: "/search", label: "搜索" },
    { href: "/about", label: "关于" },
  ],
} as const;
