import { Inject, Injectable } from '@nestjs/common';
import { DATE_BASE } from 'src/constants/common';
import { IDataBase } from 'src/types/db';
import { QueryArticleDto } from './dto/query-article-dto';
import { Article, ARTICLE_STATUS } from './article.entity';
import {
  applyPagination,
  applySorting,
  checkIsUUID,
  getItemAndChek,
} from 'src/utils/common';
import { CreateArticleDto } from './dto/create-article-dto';
import { randomUUID } from 'node:crypto';
import { UpdateArticleDto } from './dto/update-article-dto';

@Injectable()
export class ArticleService {
  constructor(
    @Inject(DATE_BASE)
    private db: IDataBase,
  ) {}

  getArticles(query: QueryArticleDto) {
    let articles = this.db.articles;

    if (query.status) {
      articles = articles.filter((a) => a.status === query.status);
    }

    if (query.categoryId) {
      articles = articles.filter((a) => a.categoryId === query.categoryId);
    }

    if (query.tag) {
      articles = articles.filter((a) => a.tags.includes(query.tag));
    }

    articles = applySorting(articles, {
      sortBy: query.sortBy,
      order: query.order,
    });

    if (!query.page && !query.limit) {
      return articles;
    }

    return applyPagination(articles, {
      page: Number(query.page),
      limit: Number(query.limit),
    });
  }

  getArticleById(id: string): Article {
    checkIsUUID(id, 'Invalid articleId');

    const article = getItemAndChek<Article>({
      items: this.db.articles,
      id,
      errorText: 'Article not found',
    });

    return article;
  }

  createArticle(dto: CreateArticleDto): Article {
    const authorId = this.db.users.some((user) => user.id === dto.authorId)
      ? dto.authorId
      : null;
    const categoryId = this.db.categories.some(
      (category) => category.id === dto.categoryId,
    )
      ? dto.categoryId
      : null;

    const article = {
      id: randomUUID(),
      title: dto.title,
      content: dto.content,
      status: dto.status ?? ARTICLE_STATUS.draft,
      authorId,
      categoryId,
      tags: dto.tags ?? [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.db.articles.push(article);

    return article;
  }

  updateArticle(id: string, dto: UpdateArticleDto) {
    checkIsUUID(id, 'Invalid articleId');

    const article = getItemAndChek<Article>({
      items: this.db.articles,
      id,
      errorText: 'Article not found',
    });

    if (dto.authorId !== undefined) {
      const user = this.db.users.find((user) => user.id === dto.authorId);
      article.authorId = user ? user.id : null;
    }

    if (dto.categoryId !== undefined) {
      const category = this.db.categories.find(
        (category) => category.id === dto.categoryId,
      );
      article.categoryId = category ? category.id : null;
    }

    article.title = dto.title ?? article.title;
    article.content = dto.content ?? article.content;
    article.status = dto.status ?? article.status;
    article.tags = dto.tags ?? article.tags;
    article.updatedAt = Date.now();

    return article;
  }

  deleteArticle(id: string) {
    checkIsUUID(id, 'Invalid articleId');

    getItemAndChek<Article>({
      items: this.db.articles,
      id,
      errorText: 'Article not found',
    });

    this.db.articles = this.db.articles.filter((article) => article.id !== id);

    this.db.comments = this.db.comments.filter(
      (comment) => comment.articleId !== id,
    );
  }
}
