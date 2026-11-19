# 留白之间

一个以阅读为中心的个人博客，使用 Next.js App Router、Tailwind CSS 和本地 MDX 构建。内容与代码共同存放在 GitHub，适合通过 Vercel 自动部署。

## 功能

- MDX 文章与构建时 Frontmatter 校验
- 文章列表、分类、标签和相邻文章
- Fuse.js 本地模糊搜索
- 亮色、暗色与跟随系统主题
- 响应式导航与文章排版
- 文章 Metadata、Sitemap 和 Robots.txt
- 草稿过滤与阅读时长

## 本地开发

```bash
pnpm install
pnpm dev
```

打开 <http://localhost:3000>。

部署前检查：

```bash
pnpm lint
pnpm typecheck
pnpm build
```

## 写一篇文章

在 `content/posts` 新建一个 `.mdx` 文件：

```mdx
---
title: "文章标题"
description: "一句清楚的文章摘要。"
date: "2026-11-19"
category: "前端开发"
tags:
  - Next.js
  - MDX
featured: false
draft: false
---

从这里开始写正文。
```

文件名就是文章 URL，例如 `my-post.mdx` 会生成 `/posts/my-post`。生产环境不会公开 `draft: true` 的文章。

## 个性化配置

编辑 `src/config/site.ts`，替换：

- 博客名称与描述
- 作者名称
- 邮箱
- GitHub 地址

本地可在 `.env.local` 设置站点地址：

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

部署到 Vercel 并绑定域名后，将 Production 环境变量改为正式 HTTPS 地址。

## 部署到 Vercel

1. 将项目推送到 GitHub。
2. 在 Vercel 选择 **Add New → Project**。
3. 导入 GitHub 仓库，Framework Preset 保持 **Next.js**。
4. Build Command 使用 `pnpm build`，Output Directory 留空。
5. 设置 `NEXT_PUBLIC_SITE_URL`。
6. 部署成功后，在 **Settings → Domains** 绑定自定义域名。

不需要配置 `output: "export"`；Vercel 会原生处理 Next.js 的静态生成结果。
