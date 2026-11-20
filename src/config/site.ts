// 生产构建固定使用正式域名，避免遗漏或误配构建环境变量时
// 让 canonical、sitemap 和 robots 指向错误地址；本地开发使用 localhost。
const siteUrl =
  process.env.NODE_ENV === "production"
    ? "https://blog.czr0000.xyz"
    : (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000");

export const siteConfig = {
  name: "留白之间",
  shortName: "留白",
  description: "记录技术实践、设计思考与持续生长的个人笔记。",
  url: siteUrl,
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
