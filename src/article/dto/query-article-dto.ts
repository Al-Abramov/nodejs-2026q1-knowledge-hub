import { IsOptional, IsEnum, IsString } from 'class-validator';
import { ARTICLE_STATUS, ArticleStatusType } from '../article.entity';

export class QueryArticleDto {
  @IsOptional()
  @IsEnum(ARTICLE_STATUS)
  status?: ArticleStatusType;

  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsString()
  tag?: string;
}
