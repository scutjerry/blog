# 留白之间

一个以阅读为中心的个人博客，使用 Next.js App Router、Tailwind CSS 和本地 MDX 构建。内容与代码共同存放在 GitHub，通过腾讯 EdgeOne Makers 自动部署。

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
- GitHub 地址

本地默认使用 `http://localhost:3000`。部署时需要在 EdgeOne Makers 的构建环境变量中设置站点的预览域名或自定义域名：

```env
NEXT_PUBLIC_SITE_URL=https://你的域名
```

## 部署到 EdgeOne Makers

1. 进入 [EdgeOne Makers](https://pages.edgeone.ai/)，注册或登录。
2. 导入 GitHub 仓库 `scutjerry/blog`，只授权需要部署的仓库。
3. Production Branch 选择 `main`。
4. Install Command 使用 `pnpm install --frozen-lockfile`。
5. Build Command 使用 `pnpm build`。
6. Output Directory 使用 `out`。
7. 在构建环境变量中设置 `NEXT_PUBLIC_SITE_URL`。
8. 首次部署成功后，每次推送 `main` 都会自动重新构建。
9. 可在域名管理中绑定自定义域名并申请免费 HTTPS 证书。

项目已配置 `output: "export"`、未优化图片和尾斜杠，构建结果可直接由静态托管平台提供。
