import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeading } from "@/components/page-heading";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "关于", description: "关于作者与这个博客。" };
export default function AboutPage() {
  return <div className="container page-shell about-page"><PageHeading eyebrow="About" title={`你好，我是 ${siteConfig.author}。`} description="一名持续学习的开发者，也在练习把复杂的问题写得清楚。" /><div className="about-grid"><div className="prose"><h2>关于这个站点</h2><p>“{siteConfig.name}”是一块公开的个人工作台。我会在这里记录真实做过的项目、读过的书，以及关于界面和工具的思考。</p><p>文章不是不可修改的结论。发现更准确的表达或新的证据时，我会继续更新它们。</p><h2>联系</h2><p>如果某篇文章帮到了你，或者你发现了值得讨论的问题，欢迎通过 GitHub 联系。</p><p><a href={siteConfig.github}>访问 GitHub</a></p></div><aside className="about-note"><p className="eyebrow">写作原则</p><ol><li>先写清问题，再给答案。</li><li>区分事实、判断与假设。</li><li>保留失败过程和限制条件。</li><li>允许旧文章继续生长。</li></ol><Link className="text-link" href="/posts">浏览文章 <ArrowRight size={15} /></Link></aside></div></div>;
}
