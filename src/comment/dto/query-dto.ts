import { IsUUID } from 'class-validator';

export class QueryCommentDto {
  @IsUUID()
  articleId: string;
}
