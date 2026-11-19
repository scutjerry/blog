export type PostFrontmatter = {
  title: string;
  description: string;
  date: string;
  updated?: string;
  category: string;
  tags: string[];
  draft: boolean;
  featured: boolean;
};

export type Post = PostFrontmatter & {
  slug: string;
  content: string;
  readingMinutes: number;
};

export type PostSummary = Omit<Post, "content">;

export type TaxonomyItem = {
  name: string;
  count: number;
};
