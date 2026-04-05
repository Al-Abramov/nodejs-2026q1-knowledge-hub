import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DATE_BASE } from 'src/constants/common';
import { IDataBase } from 'src/types/db';
import { QueryCommentDto } from './dto/query-dto';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment-dto';
import { randomUUID } from 'node:crypto';
import { checkIsUUID, getItemAndChek } from 'src/utils/common';

@Injectable()
export class CommentService {
  constructor(
    @Inject(DATE_BASE)
    private db: IDataBase,
  ) {}

  getComments(query: QueryCommentDto): Comment[] {
    const { articleId } = query;

    return this.db.comments.filter(
      (comment) => comment.articleId === articleId,
    );
  }

  getCommentById(id: string) {
    checkIsUUID(id, 'Invalid commentId');

    const comment = getItemAndChek({
      items: this.db.comments,
      id,
      errorText: 'Comment not found',
    });

    return comment;
  }

  createComment(dto: CreateCommentDto): Comment {
    const articleExists = this.db.articles.some((a) => a.id === dto.articleId);

    if (!articleExists) {
      throw new UnprocessableEntityException('Article not found');
    }

    const comment = {
      id: randomUUID(),
      content: dto.content,
      articleId: dto.articleId,
      authorId: dto.authorId ?? null,
      createdAt: Date.now(),
    };

    this.db.comments.push(comment);

    return comment;
  }

  deleteComment(id: string) {
    checkIsUUID(id, 'Invalid commentId');

    getItemAndChek({
      items: this.db.comments,
      id,
      errorText: 'Comment not found',
    });

    this.db.comments = this.db.comments.filter((c) => c.id !== id);
  }
}
