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

当前线上配置（腾讯云中国站）：

| 项 | 值 |
| --- | --- |
| 项目名 | `liubai-blog-global` |
| 加速区域 | 全球可用区（不含中国大陆） |
| 生产分支 | `main` |
| 安装命令 | `pnpm install` |
| 构建命令 | `pnpm run build` |
| 输出目录 | `out` |
| 环境变量 | `NEXT_PUBLIC_SITE_URL=https://blog.czr0000.xyz` |
| 自定义域名 | `blog.czr0000.xyz`（待 DNS 生效后完成归属验证） |

重新部署步骤：

1. 进入 [EdgeOne Makers 控制台](https://console.cloud.tencent.com/edgeone/makers)。
2. 导入 GitHub 仓库 `scutjerry/blog`，只授权需要部署的仓库。
3. Production Branch 选择 `main`。
4. 构建设置使用上表命令与输出目录。
5. 在环境变量中设置 `NEXT_PUBLIC_SITE_URL`。
6. 首次部署成功后，每次推送 `main` 都会自动重新构建。

### 域名与 DNS 注意事项

- EdgeOne 的默认域名（`*.edgeone.dev` / `*.edgeone.cool`）是**限时签名预览地址**，不能作为公开站点使用，必须绑定自定义域名。
- 加速区域选择"含中国大陆"时，自定义域名必须完成 ICP 备案；未备案请选择"不含中国大陆"。
- 绑定域名需先通过 TXT 记录验证归属权，再由域名解析商添加 CNAME 记录，HTTPS 证书由 EdgeOne 自动签发。
- 修改域名的 NS（DNS 服务器）通常需要 24–48 小时生效。

项目已配置 `output: "export"`、未优化图片和尾斜杠，构建结果可直接由静态托管平台提供。
