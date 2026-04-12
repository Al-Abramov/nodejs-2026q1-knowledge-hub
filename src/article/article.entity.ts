export const ARTICLE_STATUS = {
  draft: 'draft',
  published: 'published',
  archived: 'archived',
} as const;

export type ArticleStatusType = keyof typeof ARTICLE_STATUS;

export interface Article {
  id: string;
  title: string;
  content: string;
  status: ArticleStatusType;
  authorId: string | null;
  categoryId: string | null;
  tags: string[];
  createdAt: number;
  updatedAt: number;
}
